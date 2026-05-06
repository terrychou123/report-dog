import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { leads } from "@/db/schema";
import { sql } from "drizzle-orm";
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

  let ipHash: string | null = null;
  try {
    ipHash = getClientIpHash(req);
  } catch {
    // PUBLIC_DEMO_SALT 未設時 fallback
  }

  // Atomic upsert：僅在「未 confirmed」或「已退訂」時才 UPDATE，RETURNING 有 row 才寄歡迎信
  // setWhere 不命中（已 confirmed 且未退訂）時不 UPDATE 也不 RETURNING，避免重複寄信的 race
  const result = await db
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
        // 保留首次驗證時間，若不存在才寫入
        confirmedAt: sql`COALESCE(${leads.confirmedAt}, NOW())`,
        ipHash,
        userAgent: req.headers.get("user-agent") ?? undefined,
        // 已退訂者透過 Email 驗證重新訂閱時清空退訂欄位
        unsubscribedAt: null,
        unsubscribeSource: null,
        unsubscribeMessageId: null,
      },
      setWhere: sql`${leads.confirmed} = false OR ${leads.unsubscribedAt} IS NOT NULL`,
    })
    .returning({ id: leads.id });

  // 只有 INSERT 或 setWhere 命中（未 confirmed 或已退訂者）才寄歡迎信
  if (result.length > 0) {
    try {
      await sendNewsletterWelcome(normalizedEmail);
    } catch (err) {
      console.error("[post-signup] 歡迎信寄送失敗：", err);
    }
  }

  return NextResponse.json({ ok: true });
}
