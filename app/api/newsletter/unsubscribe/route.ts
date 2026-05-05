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

// GET：瀏覽器點退訂連結 → 執行退訂 → redirect 確認頁
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token") ?? "";
  const status = await doUnsubscribe(token);
  const dest = status === "ok"
    ? "/newsletter/unsubscribed?ok=1"
    : "/newsletter/unsubscribed?ok=0";
  return NextResponse.redirect(new URL(dest, req.url));
}

// POST：Gmail/Apple Mail List-Unsubscribe-Post 一鍵退訂
export async function POST(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token") ?? "";
  const status = await doUnsubscribe(token);
  if (status === "invalid") return NextResponse.json({ error: "invalid token" }, { status: 400 });
  return NextResponse.json({ ok: true });
}
