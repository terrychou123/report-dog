import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { leads } from "@/db/schema";
import { and, eq, isNotNull } from "drizzle-orm";
import { getClientIpHash } from "@/lib/ai/public-usage-limit";
import { sendNewsletterWelcome } from "@/lib/email/resend";
import { isRateLimited, getClientIp } from "@/lib/rate-limit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  // 每個 IP 每 5 分鐘最多 1 次訂閱（防止同一 IP 刷 Resend 配額）
  if (isRateLimited(`newsletter:${getClientIp(req)}`, 1, 5 * 60_000)) {
    return NextResponse.json({ error: "請求過於頻繁，請稍後再試" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "無效的請求格式" }, { status: 400 });
  }

  const { email } = body as { email?: string };

  if (!email || typeof email !== "string" || email.length > 320 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "請輸入有效的 Email 地址" }, { status: 400 });
  }

  let ipHash: string | null = null;
  try {
    ipHash = getClientIpHash(req);
  } catch {
    // fallback
  }

  const normalizedEmail = email.toLowerCase().trim();

  // 已退訂者不重新寫入，直接回成功（不洩漏訂閱狀態）
  const [unsubscribed] = await db
    .select({ id: leads.id })
    .from(leads)
    .where(and(eq(leads.email, normalizedEmail), eq(leads.source, "newsletter"), isNotNull(leads.unsubscribedAt)))
    .limit(1);
  if (unsubscribed) return NextResponse.json({ ok: true });

  await db
    .insert(leads)
    .values({
      email: normalizedEmail,
      source: "newsletter",
      ipHash,
      userAgent: req.headers.get("user-agent") ?? undefined,
    })
    .onConflictDoUpdate({
      target: [leads.email, leads.source],
      set: {
        ipHash,
        userAgent: req.headers.get("user-agent") ?? undefined,
      },
    });

  // 寄送歡迎信（失敗不阻斷，DB 記錄已寫入）
  try {
    await sendNewsletterWelcome(normalizedEmail);
  } catch (err) {
    console.error("[newsletter] 歡迎信寄送失敗：", err);
  }

  // 永遠回傳成功，不洩漏「此 email 是否已訂閱」
  return NextResponse.json({ ok: true });
}
