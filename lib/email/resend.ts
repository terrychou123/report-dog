import { Resend } from "resend";
import { db } from "@/db";
import { leads } from "@/db/schema";
import { and, eq, isNotNull } from "drizzle-orm";
import { signUnsubscribeToken } from "./unsubscribe-token";

let _client: Resend | null = null;

function getResend(): Resend {
  if (!_client) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error("RESEND_API_KEY 環境變數未設定");
    _client = new Resend(key);
  }
  return _client;
}

export async function sendNewsletterWelcome(email: string): Promise<void> {
  // 已退訂者不重送歡迎信
  const [existing] = await db
    .select({ unsubscribedAt: leads.unsubscribedAt })
    .from(leads)
    .where(and(eq(leads.email, email), eq(leads.source, "newsletter"), isNotNull(leads.unsubscribedAt)))
    .limit(1);
  if (existing) {
    console.log("[resend] 跳過歡迎信（已退訂）：", email);
    return;
  }

  const from = process.env.FROM_EMAIL ?? "報告汪 <noreply@reportwang.com>";
  const replyTo = process.env.UNSUBSCRIBE_REPLY_TO;
  const inboxAddress = process.env.UNSUBSCRIBE_INBOX_ADDRESS;
  const token = signUnsubscribeToken(email, "newsletter");
  const unsubscribeUrl = `https://reportwang.com/api/newsletter/unsubscribe?token=${token}`;

  const headers: Record<string, string> = {};
  if (inboxAddress) {
    headers["List-Unsubscribe"] = `<mailto:${inboxAddress}>, <${unsubscribeUrl}>`;
    headers["List-Unsubscribe-Post"] = "List-Unsubscribe=One-Click";
  } else {
    // 至少加單欄退訂連結 header（無 Resend inbox 時）
    headers["List-Unsubscribe"] = `<${unsubscribeUrl}>`;
    headers["List-Unsubscribe-Post"] = "List-Unsubscribe=One-Click";
  }

  await getResend().emails.send({
    from,
    to: email,
    ...(replyTo ? { replyTo } : {}),
    headers,
    subject: "歡迎訂閱報告汪電子報",
    html: `
<div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px;color:#374151">
  <h1 style="font-size:20px;font-weight:700;margin-bottom:8px">感謝訂閱報告汪電子報 🐶</h1>
  <p style="color:#6b7280;line-height:1.6">
    您已成功訂閱。我們會不定期分享長照評鑑準備技巧、法規更新與實用範本，幫助您在評鑑上事半功倍。
  </p>
  <div style="margin:24px 0">
    <a href="https://reportwang.com/downloads"
       style="background:#2563eb;color:#fff;text-decoration:none;padding:10px 20px;border-radius:6px;font-weight:600;display:inline-block">
      下載免費評鑑自我檢核表
    </a>
  </div>
  <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0" />
  <p style="font-size:12px;color:#9ca3af;line-height:1.6">
    如不再希望收到此電子報，請
    <a href="${unsubscribeUrl}" style="color:#6b7280">點此退訂</a>，
    或直接回覆本信告知退訂。
  </p>
</div>
    `.trim(),
    text: `感謝訂閱報告汪電子報！\n\n我們會不定期分享長照評鑑準備技巧、法規更新與實用範本。\n\n如不再希望收到此電子報，請至以下連結退訂：\n${unsubscribeUrl}\n\n或直接回覆本信告知退訂。`,
  });
}
