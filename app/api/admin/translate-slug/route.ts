import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin";
import { createOpenRouterClient } from "@/lib/ai/openrouter-client";
import { validateSlug, sanitizeSlug } from "@/lib/class/slug";

export async function POST(req: NextRequest) {
  const result = await requireAdminApi();
  if (result instanceof NextResponse) return result;

  const body = await req.json();
  const title = typeof body.title === "string" ? body.title.trim() : "";
  if (!title || title.length > 200) {
    return NextResponse.json({ error: "title 不可為空且長度不超過 200 字" }, { status: 400 });
  }

  const client = createOpenRouterClient();

  const completion = await client.chat.completions.create({
    model: "anthropic/claude-haiku-4.5",
    max_tokens: 50,
    temperature: 0.3,
    messages: [
      {
        role: "user",
        content: `將以下標題翻譯為簡潔的英文 URL slug。只輸出 slug 本身，3–5 個英文單字，全小寫，用 - 分隔，不含任何其他文字或標點符號。\n\n標題：${title}`,
      },
    ],
  });

  const raw = (completion.choices[0]?.message?.content ?? "").trim();

  // 驗證 AI 輸出是否合規；不合規則嘗試 sanitize
  const slug = validateSlug(raw) ? raw : sanitizeSlug(raw);
  if (!slug) {
    return NextResponse.json({ error: "無法產生有效 slug，請手動輸入" }, { status: 502 });
  }

  return NextResponse.json({ slug });
}
