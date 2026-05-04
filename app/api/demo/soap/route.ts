import { NextRequest, NextResponse } from 'next/server';
import { createOpenRouterClient } from '@/lib/ai/openrouter-client';
import { getClientIpHash, checkAndRecordPublicUsage } from '@/lib/ai/public-usage-limit';

const DEMO_LIMIT = 3; // 每個 IP 每 UTC 日最多 3 次

const SOAP_SYSTEM_PROMPT = `你是一位長照護理紀錄專家。請將使用者提供的護理紀錄改寫為標準 SOAP 格式，並嚴格按照以下格式輸出（不得有多餘說明或開頭語）：

S（主觀資料 Subjective）：
[個案或家屬的主訴、感受、自我陳述]

O（客觀資料 Objective）：
[可測量的數據：生命徵象、傷口描述、觀察到的行為或身體狀況]

A（評估 Assessment）：
[護理問題或健康狀況的分析與判斷]

P（計畫 Plan）：
[後續處置、衛教、追蹤或轉介計畫]

注意：
- 每個段落開頭必須是「S（主觀資料 Subjective）：」等完整標題
- 內容忠實於原文，不可自行添加未提及的資訊
- 使用繁體中文`;

export async function POST(req: NextRequest) {
  // 1. 解析請求
  let rawNote: string;
  try {
    const body = await req.json();
    rawNote = body?.rawNote;
  } catch {
    return NextResponse.json({ error: '無效的請求格式' }, { status: 400 });
  }

  if (!rawNote || typeof rawNote !== 'string') {
    return NextResponse.json({ error: '請提供護理記錄內容' }, { status: 400 });
  }

  if (rawNote.length > 600) {
    return NextResponse.json({ error: '護理記錄內容不得超過 600 字' }, { status: 400 });
  }

  // 2. IP 限流（PUBLIC_DEMO_SALT 缺值時會 throw → 500）
  let ipHash: string;
  try {
    ipHash = getClientIpHash(req);
  } catch (e) {
    console.error('IP hash 失敗：', e);
    return NextResponse.json({ error: '服務暫時無法使用' }, { status: 500 });
  }

  const usage = await checkAndRecordPublicUsage(ipHash, 'demo-soap', DEMO_LIMIT);
  if (!usage.allowed) {
    return NextResponse.json(
      {
        error: '今日免費體驗次數已用完，明天 UTC 00:00 自動重置',
        code: 'DEMO_LIMIT_REACHED',
        used: usage.used,
        limit: usage.limit,
        remaining: 0,
      },
      { status: 429 },
    );
  }

  // 3. 呼叫 AI 並串流回傳
  const openai = createOpenRouterClient();
  let stream: Awaited<ReturnType<typeof openai.chat.completions.create>>;
  try {
    stream = await openai.chat.completions.create({
      model: 'anthropic/claude-sonnet-4.6',
      stream: true,
      max_tokens: 800,
      messages: [
        { role: 'system', content: SOAP_SYSTEM_PROMPT },
        { role: 'user', content: rawNote },
      ],
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'AI 服務暫時無法使用';
    return NextResponse.json({ error: `AI 轉換失敗：${message}` }, { status: 502 });
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
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      // 回傳剩餘次數供前端顯示（已用過這次，所以 remaining 已減）
      'X-Demo-Remaining': String(usage.remaining),
      'X-Demo-Limit': String(usage.limit),
    },
  });
}
