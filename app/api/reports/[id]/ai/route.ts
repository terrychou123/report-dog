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
  const { paragraph, instruction, history = [] } = body as {
    paragraph: string;
    instruction: string;
    history: Message[];
  };

  if (!paragraph || !instruction) {
    return NextResponse.json({ error: "paragraph and instruction are required" }, { status: 400 });
  }

  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    {
      role: "system",
      content:
        "你是一位專業的報告編輯助手，專門協助社工、心理師和顧問修改個案報告。請根據使用者的指令修改提供的段落。只回傳修改後的段落文字，不要加任何前言或解釋。保持繁體中文書寫。",
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

  // 加入當前指令
  messages.push({ role: "user", content: instruction });

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
