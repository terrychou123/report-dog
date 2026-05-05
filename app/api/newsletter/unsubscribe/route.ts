import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { leads } from "@/db/schema";
import { and, eq, isNull } from "drizzle-orm";
import { verifyUnsubscribeToken } from "@/lib/email/unsubscribe-token";

async function doUnsubscribe(token: string): Promise<"ok" | "invalid" | "not_found"> {
  const payload = verifyUnsubscribeToken(token);
  if (!payload) return "invalid";

  const result = await db
    .update(leads)
    .set({ unsubscribedAt: new Date(), unsubscribeSource: "one_click" })
    .where(and(eq(leads.email, payload.email), eq(leads.source, payload.source), isNull(leads.unsubscribedAt)))
    .returning({ id: leads.id });

  // 已退訂也視為成功（idempotent）
  if (result.length === 0) {
    const [existing] = await db
      .select({ id: leads.id })
      .from(leads)
      .where(and(eq(leads.email, payload.email), eq(leads.source, payload.source)))
      .limit(1);
    return existing ? "ok" : "not_found";
  }

  return "ok";
}

// GET：瀏覽器點退訂連結 → redirect 確認頁（不直接退訂，防止 email 掃描器誤觸）
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token") ?? "";
  if (!token) {
    return NextResponse.redirect(new URL("/newsletter/unsubscribed?ok=0", req.url));
  }
  return NextResponse.redirect(
    new URL(`/newsletter/unsubscribe?token=${encodeURIComponent(token)}`, req.url)
  );
}

// POST：
// - RFC 8058 List-Unsubscribe-Post（body = "List-Unsubscribe=One-Click"）→ 回 JSON
// - 確認頁表單提交 → 執行退訂 → redirect
export async function POST(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token") ?? "";

  let body = "";
  try { body = await req.text(); } catch { /* ignore */ }
  const isOneClick = body.trim() === "List-Unsubscribe=One-Click";

  const status = await doUnsubscribe(token);

  if (isOneClick) {
    if (status === "invalid") return NextResponse.json({ error: "invalid token" }, { status: 400 });
    return NextResponse.json({ ok: true });
  }

  // 表單提交走 redirect
  const dest = status === "ok" ? "/newsletter/unsubscribed?ok=1" : "/newsletter/unsubscribed?ok=0";
  return NextResponse.redirect(new URL(dest, req.url), 303);
}
