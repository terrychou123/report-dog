import { Resend } from "resend";

let _client: Resend | null = null;

export function getResend(): Resend {
  if (!_client) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error("RESEND_API_KEY 環境變數未設定");
    _client = new Resend(key);
  }
  return _client;
}

export async function sendNewsletterWelcome(email: string): Promise<void> {
  const from = process.env.FROM_EMAIL ?? "報告汪 <noreply@reportwang.com>";
  await getResend().emails.send({
    from,
    to: email,
    subject: "歡迎訂閱報告汪電子報",
    html: `
<div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px;color:#374151">
  <h1 style="font-size:20px;font-weight:700;margin-bottom:8px">感謝訂閱報告汪電子報 🐶</h1>
  <p style="color:#6b7280;line-height:1.6">
    您已成功訂閱。我們會定期分享長照評鑑準備技巧、法規更新與實用範本，幫助您在評鑑上事半功倍。
  </p>
  <div style="margin:24px 0">
    <a href="https://reportwang.com/downloads"
       style="background:#2563eb;color:#fff;text-decoration:none;padding:10px 20px;border-radius:6px;font-weight:600;display:inline-block">
      下載免費評鑑自我檢核表
    </a>
  </div>
  <p style="font-size:12px;color:#9ca3af">
    若您未曾訂閱，請忽略此信。如需退訂，請回覆此郵件。
  </p>
</div>
    `.trim(),
  });
}
