import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { db } from '@/db';
import { reports } from '@/db/schema';
import { eq, and, inArray } from 'drizzle-orm';
import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});

const SYSTEM_PROMPT = `你是一位專業的長照評估專家。你將收到來自同一個案的多份報告，請仔細分析這些報告之間的一致性。

請從以下幾個維度進行分析：

1. **矛盾之處**：找出不同報告中互相矛盾或衝突的內容
2. **缺漏之處**：找出某份報告提及但其他報告未跟進或未反應的重要資訊
3. **不一致之處**：找出邏輯上應該相互呼應但卻不一致的內容（如：身體評估有吞嚥問題，但飲食紀錄未提供特製飲食）
4. **一致之處**：確認各報告之間良好銜接的部分
5. **改善建議**：針對發現的問題提出具體改善建議

分析時請：
- 引用具體報告名稱與相關內容
- 使用繁體中文回覆
- 條列清楚，結構化呈現
- 提供具體可行的建議`;

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function excelJsonToText(jsonStr: string): string {
  try {
    const data = JSON.parse(jsonStr);
    if (Array.isArray(data)) {
      return data
        .map((row: Record<string, unknown>) =>
          Object.entries(row)
            .map(([k, v]) => `${k}: ${v}`)
            .join('、')
        )
        .join('\n');
    }
    return JSON.stringify(data, null, 2);
  } catch {
    return jsonStr;
  }
}

function processContent(content: string | null, fileType: string | null): string {
  if (!content) return '';
  const type = fileType?.toLowerCase() ?? '';
  if (type === 'word' || type === 'docx') return stripHtml(content);
  if (type === 'excel' || type === 'xlsx' || type === 'csv') return excelJsonToText(content);
  return content;
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { reportIds } = await req.json();
  if (!Array.isArray(reportIds) || reportIds.length < 2 || reportIds.length > 10) {
    return NextResponse.json({ error: '請提供 2 至 10 份報告 ID' }, { status: 400 });
  }

  const reportList = await db
    .select()
    .from(reports)
    .where(and(inArray(reports.id, reportIds), eq(reports.userId, userId)));

  if (reportList.length < 2) {
    return NextResponse.json({ error: '找不到足夠的報告' }, { status: 404 });
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

  const userContent = `請分析以下 ${sections.length} 份報告的一致性：\n\n${sections.join('\n\n---\n\n')}`;

  const stream = await openai.chat.completions.create({
    model: 'anthropic/claude-sonnet-4.6',
    stream: true,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userContent },
    ],
  });

  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content || '';
        if (text) controller.enqueue(new TextEncoder().encode(text));
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
