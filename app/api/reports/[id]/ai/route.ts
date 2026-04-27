import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type OpenAI from "openai";
import { createOpenRouterClient } from "@/lib/ai/openrouter-client";

type Message = { role: "user" | "assistant"; content: string; reasoning_details?: unknown };

type ORMessage = OpenAI.Chat.ChatCompletionMessage & { reasoning_details?: unknown };

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const openai = createOpenRouterClient();

  const body = await req.json();
  const { paragraph, instruction, history = [], soap = false } = body as {
    paragraph: string;
    instruction: string;
    history: Message[];
    soap?: boolean;
  };

  if (!paragraph || (!instruction && !soap)) {
    return NextResponse.json({ error: "paragraph and instruction are required" }, { status: 400 });
  }

  let systemContent =
    "你是一位專業的報告編輯助手，專門協助社工、心理師和顧問修改個案報告。請根據使用者的指令修改提供的段落。只回傳修改後的段落文字，不要加任何前言或解釋。保持繁體中文書寫。";

  if (soap) {
    systemContent +=
      "\n\n使用者已啟用 SOAP 模式。請將段落改寫為四段式專業紀錄格式：\n" +
      "- S（主觀）：個案／家屬親口表述，盡量逐字引述並加引號\n" +
      "- O（客觀）：可重複測得的數值、量表分數、觀察事實（含時間、單位）\n" +
      "- A（評估）：整合 S 與 O 的專業判斷與問題判定\n" +
      "- P（計畫）：診斷性／治療性／衛教性／評值性措施，含執行頻率與下次評值時點\n\n" +
      "若使用者同時提供自由指令，請在保持 SOAP 結構的前提下融入該指令的調性與詳簡偏好。\n" +
      "若原始段落資訊不足以填滿某段，請以「（資料不足，待補充）」標示，不得編造。";
  }

  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: systemContent,
    },
    {
      role: "user",
      content: `以下是需要修改的段落：\n\n${paragraph}`,
    },
  ];

  // 加入對話歷史，保留 reasoning_details 供多輪推理
  for (const msg of history) {
    const m: OpenAI.Chat.ChatCompletionMessageParam = { role: msg.role, content: msg.content };
    if (msg.role === "assistant" && msg.reasoning_details) {
      Object.assign(m, { reasoning_details: msg.reasoning_details });
    }
    messages.push(m);
  }

  // 加入當前指令（SOAP 模式且無自由指令時自動補上預設文字）
  const effectiveInstruction = instruction?.trim() || "請以 SOAP 格式改寫此段落";
  messages.push({ role: "user", content: effectiveInstruction });

  const response = await openai.chat.completions.create({
    model: "anthropic/claude-sonnet-4.6",
    messages,
    ...({ reasoning: { enabled: true } } as Record<string, unknown>),
  });

  const assistantMsg = response.choices[0]?.message as ORMessage | undefined;
  const revised = assistantMsg?.content?.trim() ?? "";
  const reasoning_details = assistantMsg?.reasoning_details;

  return NextResponse.json({ revised, reasoning_details });
}
