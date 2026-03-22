import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { db } from '@/db';
import { reports, clients, clientReports } from '@/db/schema';
import { eq, and, inArray, or, sql } from 'drizzle-orm';
import OpenAI from 'openai';
import { processContent } from '@/lib/ai/content-utils';
import { getProfile } from '@/lib/ai/evaluation-profiles';

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});

function buildSystemPrompt(profileId: string): string {
  const profile = getProfile(profileId);
  if (!profile) throw new Error(`Unknown profile: ${profileId}`);

  const criteriaText = profile.sections
    .map((section) => {
      const items = section.items
        .map((item) => {
          const criteriaList = item.criteria
            .map((c, i) => `  ${i + 1}. ${c}`)
            .join('\n');
          return `【${section.shortCode}${item.id}】${item.title}（負責：${item.responsible}）\n${criteriaList}`;
        })
        .join('\n\n');
      return `### ${section.name}\n\n${items}`;
    })
    .join('\n\n');

  return `你是日間照顧機構評鑑專家，依據「${profile.description}」進行分析。

以下是完整的 ${profile.sections.reduce((n, s) => n + s.items.length, 0)} 項評鑑指標：

${criteriaText}

請根據使用者提供的文件，從以下五個面向逐項分析：

## 一、缺少的資料
找出評鑑基準要求但文件中完全未提及的項目。標示項次（如「權1」「專5」「管29」「安38」）、評鑑項目名稱、缺少的具體基準。

## 二、不合理或矛盾之處
找出文件內容與評鑑基準不符，或文件內部互相矛盾的地方。引用具體文件內容說明。標示對應項次。

## 三、應追蹤改進但未追蹤
找出文件提到問題、異常或待改善事項，但未見後續追蹤、分析或改善方案的項目。標示對應項次。

## 四、符合評鑑的項目
確認文件中已良好對應的評鑑項目，給予正面回饋。列出項次與具體符合內容。

## 五、改善建議與優先順序
針對缺漏或問題項目提出具體可行的改善建議，按急迫性排序（高→中→低）。

分析規則：
- 每個發現都必須標示對應的評鑑項次（如「權1」「專5」「管29」「安38」）
- 引用報告中的具體內容作為證據
- 使用繁體中文
- 如果文件不足以判斷某項，明確標示「無法判斷」而非猜測
- 以條列清楚、結構化方式呈現`;
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { reportIds, profileId } = await req.json();
  if (!Array.isArray(reportIds) || reportIds.length < 1 || reportIds.length > 50) {
    return NextResponse.json({ error: '請提供 1 至 50 份報告 ID' }, { status: 400 });
  }
  if (!profileId || typeof profileId !== 'string') {
    return NextResponse.json({ error: '請指定評鑑類型' }, { status: 400 });
  }

  let systemPrompt: string;
  try {
    systemPrompt = buildSystemPrompt(profileId);
  } catch {
    return NextResponse.json({ error: '不支援的評鑑類型' }, { status: 400 });
  }

  // Fetch reports accessible to the user (own + shared via tags)
  const ownReports = await db
    .select()
    .from(reports)
    .where(and(inArray(reports.id, reportIds), eq(reports.userId, userId)));

  const sharedReports = await db
    .selectDistinct({
      id: reports.id,
      userId: reports.userId,
      lastEditedByUserId: reports.lastEditedByUserId,
      title: reports.title,
      content: reports.content,
      fileType: reports.fileType,
      fileUrl: reports.fileUrl,
      sortOrder: reports.sortOrder,
      createdAt: reports.createdAt,
      updatedAt: reports.updatedAt,
    })
    .from(reports)
    .innerJoin(clientReports, eq(clientReports.reportId, reports.id))
    .innerJoin(clients, eq(clientReports.clientId, clients.id))
    .where(
      and(
        inArray(reports.id, reportIds),
        or(
          sql`${userId} = ANY(${clients.viewers})`,
          sql`${userId} = ANY(${clients.editors})`
        )
      )
    );

  const seen = new Set<string>(ownReports.map((r) => r.id));
  const reportList = [...ownReports];
  for (const r of sharedReports) {
    if (!seen.has(r.id)) {
      seen.add(r.id);
      reportList.push(r);
    }
  }

  if (reportList.length < 1) {
    return NextResponse.json({ error: '找不到報告' }, { status: 404 });
  }

  if (reportList.length >= 2) {
    systemPrompt += `\n\n## 六、報告間一致性檢查\n針對多份報告之間進行交叉比對：\n- 矛盾之處：不同報告中互相矛盾或衝突的內容\n- 缺漏之處：某份報告提及但其他報告未跟進的重要資訊\n- 不一致之處：邏輯上應相互呼應但不一致的內容\n- 一致之處：各報告之間良好銜接的部分`;
  }

  const MAX_PER_REPORT = 8000;
  const MAX_TOTAL = 100000;

  let totalChars = 0;
  const sections: string[] = [];

  for (const report of reportList) {
    if (totalChars >= MAX_TOTAL) break;
    const processed = processContent(report.content, report.fileType);
    const truncated = processed.slice(0, MAX_PER_REPORT);
    const remaining = MAX_TOTAL - totalChars;
    const chunk = truncated.slice(0, remaining);
    totalChars += chunk.length;
    sections.push(`## 報告：${report.title}\n\n${chunk}`);
  }

  const userContent = `請依照評鑑基準分析以下 ${sections.length} 份文件：\n\n${sections.join('\n\n---\n\n')}`;

  let stream: Awaited<ReturnType<typeof openai.chat.completions.create>>;
  try {
    stream = await openai.chat.completions.create({
      model: 'anthropic/claude-sonnet-4.6',
      stream: true,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userContent },
      ],
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'AI 服務暫時無法使用';
    return NextResponse.json({ error: `AI 分析失敗：${message}` }, { status: 502 });
  }

  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content || '';
          if (text) controller.enqueue(new TextEncoder().encode(text));
        }
        controller.close();
      } catch (e) {
        controller.error(e);
      }
    },
  });

  return new Response(readable, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
