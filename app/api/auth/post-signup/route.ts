import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { leads } from "@/db/schema";
import { and, eq, isNotNull } from "drizzle-orm";
import { getClientIpHash } from "@/lib/ai/public-usage-limit";
import { sendNewsletterWelcome } from "@/lib/email/resend";

// 僅供 /auth/confirm 驗證成功後呼叫；不接受任何 body 參數（email 從 session 取，防偽造）
export async function POST(req: NextRequest): Promise<NextResponse> {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user?.email) {
    return NextResponse.json({ error: "未登入" }, { status: 401 });
  }

  // 使用者在註冊表單未打勾時跳過
  if (!user.user_metadata?.newsletter_opt_in) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const normalizedEmail = user.email.toLowerCase().trim();

  // 已退訂者不重新訂閱
  const [unsubscribed] = await db
    .select({ id: leads.id })
    .from(leads)
    .where(and(eq(leads.email, normalizedEmail), eq(leads.source, "newsletter"), isNotNull(leads.unsubscribedAt)))
    .limit(1);
  if (unsubscribed) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  let ipHash: string | null = null;
  try {
    ipHash = getClientIpHash(req);
  } catch {
    // PUBLIC_DEMO_SALT 未設時 fallback
  }

  // 寫入 leads，衝突時升級為已驗證狀態（footer 先訂的也一併更新）
  await db
    .insert(leads)
    .values({
      email: normalizedEmail,
      source: "newsletter",
      confirmed: true,
      confirmedAt: new Date(),
      ipHash,
      userAgent: req.headers.get("user-agent") ?? undefined,
    })
    .onConflictDoUpdate({
      target: [leads.email, leads.source],
      set: {
        confirmed: true,
        confirmedAt: new Date(),
        ipHash,
        userAgent: req.headers.get("user-agent") ?? undefined,
      },
    });

  // 寄送歡迎信（失敗不阻斷，DB 記錄已寫入）
  try {
    await sendNewsletterWelcome(normalizedEmail);
  } catch (err) {
    console.error("[post-signup] 歡迎信寄送失敗：", err);
  }

  return NextResponse.json({ ok: true });
}
