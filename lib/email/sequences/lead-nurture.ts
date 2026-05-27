/**
 * Lead nurture 三封信序列
 *
 * 時程：
 *   Email 1（stage 0→1）：建立後 ≥1 天 — 備評模板使用提示
 *   Email 2（stage 1→2）：Email 1 後 ≥3 天 — 機構案例分享
 *   Email 3（stage 2→3）：Email 2 後 ≥4 天 — AI 評鑑分析試用 CTA
 *
 * 適用來源：download（下載 gate）+ newsletter（電子報訂閱）
 */
import { Resend } from "resend";
import { db } from "@/db";
import { leads } from "@/db/schema";
import { and, isNull, lte, eq, sql } from "drizzle-orm";
import { signUnsubscribeToken } from "../unsubscribe-token";

const BATCH_LIMIT = 50; // 每個 stage 每次 cron 最多寄 N 封，避免打爆 Resend 速率限制

let _resend: Resend | null = null;
function getResend(): Resend {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error("RESEND_API_KEY 環境變數未設定");
    _resend = new Resend(key);
  }
  return _resend;
}

// ─── email header helpers ────────────────────────────────────────────────────

function buildHeaders(unsubUrl: string): Record<string, string> {
  const inbox = process.env.UNSUBSCRIBE_INBOX_ADDRESS;
  return inbox
    ? {
        "List-Unsubscribe": `<mailto:${inbox}>, <${unsubUrl}>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      }
    : {
        "List-Unsubscribe": `<${unsubUrl}>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      };
}

const FROM = () => process.env.FROM_EMAIL ?? "報告汪 <noreply@reportwang.com>";
const REPLY_TO = () => process.env.UNSUBSCRIBE_REPLY_TO;

function unsubFooter(unsubUrl: string): string {
  return `
<hr style="border:none;border-top:1px solid #e5e7eb;margin:28px 0" />
<p style="font-size:12px;color:#9ca3af;line-height:1.6">
  如不再希望收到此電子報，請
  <a href="${unsubUrl}" style="color:#6b7280">點此退訂</a>，
  或直接回覆本信告知退訂。
</p>`.trim();
}

function unsubFooterText(unsubUrl: string): string {
  return `\n\n---\n如不再希望收到此電子報，請至以下連結退訂：\n${unsubUrl}\n或直接回覆本信告知退訂。`;
}

// ─── Email 1：備評模板使用提示 ───────────────────────────────────────────────

function buildEmail1(
  source: string,
  meta: { fileName?: string; file?: string } | null,
) {
  const isDownload = source === "download";
  const templateName = meta?.fileName ?? "評鑑備審模板";

  const subject = isDownload
    ? `你下載的「${templateName}」怎麼用？這裡有說明`
    : "備評準備清單：三個最常被忽略的文件";

  const html = `
<div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:24px;color:#374151">
  <h2 style="font-size:18px;font-weight:700;margin-bottom:12px">
    ${isDownload ? `📋 你的「${templateName}」使用提示` : "📋 備評前，這三樣文件很多機構都會漏"}
  </h2>

  ${isDownload ? `
  <p style="line-height:1.7;color:#4b5563">
    你上次下載的「${templateName}」——有沒有開始用了？
    這份模板的設計邏輯是對應 115 年衛福部評鑑基準逐條核對，但光有表格不夠，
    還需要搭配以下三類文件才能讓評鑑委員看清楚你的機構真的做到了：
  </p>` : `
  <p style="line-height:1.7;color:#4b5563">
    評鑑準備最怕的不是文件太少，而是花了時間整理，評鑑委員卻說「這個跟基準對不上」。
    以下三類文件是最容易被漏掉的：
  </p>`}

  <ul style="padding-left:20px;line-height:2;color:#4b5563">
    <li><strong>改善計畫追蹤表：</strong>前次評鑑委員的建議改善事項，要有書面追蹤紀錄與完成確認，光口頭說改好是不夠的</li>
    <li><strong>跨專業會議紀錄：</strong>護理、社工、復健、營養等各專業出席的服務品質會議紀錄，出席名單要有簽名</li>
    <li><strong>服務對象簽名同意書：</strong>個別化服務計畫評值時，需要服務對象或家屬參與並有書面同意紀錄</li>
  </ul>

  <p style="line-height:1.7;color:#4b5563">
    報告汪提供各機構類型的 115 年度評鑑備審模板，已整合上述查核重點，可直接下載使用：
  </p>

  <div style="margin:20px 0">
    <a href="https://reportwang.com/downloads"
       style="background:#2563eb;color:#fff;text-decoration:none;padding:10px 22px;border-radius:6px;font-weight:600;display:inline-block">
      下載完整備審模板
    </a>
  </div>

  <p style="font-size:13px;color:#6b7280;line-height:1.6">
    有任何評鑑準備的問題，也歡迎直接回覆本信，我們會盡快回覆你。
  </p>

  UNSUB_FOOTER
</div>`.trim();

  const text =
    (isDownload
      ? `你上次下載的「${templateName}」——有沒有開始用了？`
      : "備評前，這三樣文件很多機構都會漏。") +
    `\n\n重點備審文件：\n1. 改善計畫追蹤表\n2. 跨專業會議紀錄（含簽名）\n3. 服務對象簽名同意書\n\n下載完整備審模板：https://reportwang.com/downloads`;

  return { subject, html, text };
}

// ─── Email 2：機構案例分享 ────────────────────────────────────────────────────

function buildEmail2() {
  const subject = "同類機構這樣用報告汪準備評鑑，來看他們怎麼說";

  const html = `
<div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:24px;color:#374151">
  <h2 style="font-size:18px;font-weight:700;margin-bottom:12px">
    💬 他們怎麼用報告汪準備評鑑的？
  </h2>

  <p style="line-height:1.7;color:#4b5563">
    評鑑準備最耗時的，往往不是不知道要做什麼，而是文件散落在各處、不知道哪一份才是最新版，
    或是打開 Word 檔卻不確定這段描述有沒有對到評鑑委員真正在查的那一條。
  </p>

  <div style="background:#f8fafc;border-left:3px solid #2563eb;padding:16px 20px;border-radius:0 8px 8px 0;margin:20px 0">
    <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#1e40af">日照中心主任</p>
    <p style="margin:0;line-height:1.7;color:#374151;font-style:italic">
      「以前準備評鑑要花兩週整理文件，現在用報告汪把現有的評鑑報告上傳之後，
      AI 會幫我找出哪幾條基準還缺佐證，我只需要補那幾個地方就好，省了大半時間。」
    </p>
  </div>

  <div style="background:#f8fafc;border-left:3px solid #16a34a;padding:16px 20px;border-radius:0 8px 8px 0;margin:20px 0">
    <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#15803d">住宿型機構護理主管</p>
    <p style="margin:0;line-height:1.7;color:#374151;font-style:italic">
      「最有用的是評鑑五面向分析——它把我的報告逐條對照評鑑指標，
      直接告訴我哪些地方邏輯矛盾、哪些應追蹤沒追蹤，
      比自己看少漏掉很多。」
    </p>
  </div>

  <p style="line-height:1.7;color:#4b5563">
    如果你還沒有試過，現在可以免費建立帳號，上傳一份評鑑報告，
    看看 AI 幫你找到哪些遺漏之處：
  </p>

  <div style="margin:20px 0">
    <a href="https://reportwang.com/auth/sign-up"
       style="background:#2563eb;color:#fff;text-decoration:none;padding:10px 22px;border-radius:6px;font-weight:600;display:inline-block">
      免費試用報告汪
    </a>
    <a href="https://reportwang.com/testimonial"
       style="display:inline-block;margin-left:12px;color:#2563eb;text-decoration:underline;font-size:14px">
      看更多使用者分享
    </a>
  </div>

  UNSUB_FOOTER
</div>`.trim();

  const text =
    "他們怎麼用報告汪準備評鑑？" +
    "\n\n日照中心主任：「以前準備評鑑要花兩週整理文件，現在 AI 幫我找出哪幾條基準還缺佐證，省了大半時間。」" +
    "\n\n如果你還沒有試過，現在可以免費建立帳號：https://reportwang.com/auth/sign-up" +
    "\n看更多使用者分享：https://reportwang.com/testimonial";

  return { subject, html, text };
}

// ─── Email 3：AI 評鑑分析試用 CTA ─────────────────────────────────────────────

function buildEmail3() {
  const subject = "上傳評鑑報告，AI 幫你找出缺漏（免費，不需信用卡）";

  const html = `
<div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:24px;color:#374151">
  <h2 style="font-size:18px;font-weight:700;margin-bottom:12px">
    🤖 評鑑報告的「看不見的缺漏」，AI 幫你找
  </h2>

  <p style="line-height:1.7;color:#4b5563">
    很多機構的評鑑文件其實寫得很完整，但評鑑委員翻到某一條還是會說「這裡的佐證不夠具體」——
    原因通常是：描述和基準要求之間有一個細微的落差，自己看看不出來。
  </p>

  <p style="line-height:1.7;color:#4b5563">
    報告汪的 <strong>AI 評鑑五面向分析</strong> 可以做到的事：
  </p>

  <ul style="padding-left:20px;line-height:2;color:#4b5563">
    <li>上傳你既有的評鑑報告（Word / Excel 皆可）</li>
    <li>AI 逐條比對 115 年衛福部評鑑基準</li>
    <li>找出「缺少資料」「不合理或矛盾」「應追蹤未追蹤」「符合項目」「改善建議」五個面向的問題</li>
    <li>直接點出哪幾條基準的說明需要補強，不用從頭逐條自查</li>
  </ul>

  <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:16px 20px;margin:20px 0">
    <p style="margin:0;font-size:13px;color:#1e40af;font-weight:600">免費方案包含</p>
    <p style="margin:4px 0 0;font-size:13px;color:#1d4ed8;line-height:1.6">
      每日 1 次 AI 評鑑分析・無限份報告上傳・115 年各機構類型評鑑範本匯入
    </p>
  </div>

  <div style="margin:20px 0">
    <a href="https://reportwang.com/auth/sign-up"
       style="background:#2563eb;color:#fff;text-decoration:none;padding:12px 28px;border-radius:6px;font-weight:700;font-size:15px;display:inline-block">
      免費建立帳號，立即試用 AI 分析
    </a>
  </div>

  <p style="font-size:13px;color:#6b7280;line-height:1.6">
    不需要信用卡，30 秒完成註冊。如有問題歡迎直接回覆本信。
  </p>

  UNSUB_FOOTER
</div>`.trim();

  const text =
    "報告汪的 AI 評鑑五面向分析：上傳既有評鑑報告，AI 逐條比對評鑑基準，找出缺漏。" +
    "\n\n免費建立帳號：https://reportwang.com/auth/sign-up" +
    "\n不需信用卡，30 秒完成註冊。";

  return { subject, html, text };
}

// ─── 傳送單封 nurture 信 ─────────────────────────────────────────────────────

async function sendNurtureEmail(
  email: string,
  source: string,
  stage: number,
  meta: { fileName?: string; file?: string } | null,
): Promise<void> {
  const token = signUnsubscribeToken(email, source);
  const unsubUrl = `https://reportwang.com/api/newsletter/unsubscribe?token=${token}`;
  const headers = buildHeaders(unsubUrl);
  const replyTo = REPLY_TO();

  let subject: string;
  let html: string;
  let text: string;

  if (stage === 1) {
    ({ subject, html, text } = buildEmail1(source, meta));
  } else if (stage === 2) {
    ({ subject, html, text } = buildEmail2());
  } else {
    ({ subject, html, text } = buildEmail3());
  }

  // 把 UNSUB_FOOTER placeholder 換成實際 footer
  html = html.replace("UNSUB_FOOTER", unsubFooter(unsubUrl));
  text = text + unsubFooterText(unsubUrl);

  await getResend().emails.send({
    from: FROM(),
    to: email,
    ...(replyTo ? { replyTo } : {}),
    headers,
    subject,
    html,
    text,
  });
}

// ─── 主入口：執行序列（由 cron 呼叫）────────────────────────────────────────

export interface NurtureResult {
  sent: number;
  errors: number;
  stages: Record<1 | 2 | 3, { sent: number; errors: number }>;
}

export async function runLeadNurtureSequence(): Promise<NurtureResult> {
  const result: NurtureResult = {
    sent: 0,
    errors: 0,
    stages: { 1: { sent: 0, errors: 0 }, 2: { sent: 0, errors: 0 }, 3: { sent: 0, errors: 0 } },
  };

  const now = new Date();

  // 每個 stage 的送出條件
  const stageCriteria = [
    {
      stage: 1 as const,
      // stage 0 → 1：建立超過 1 天（避免與 welcome 信同天）
      filter: and(
        isNull(leads.unsubscribedAt),
        eq(leads.nurtureStage, 0),
        lte(leads.createdAt, new Date(now.getTime() - 24 * 60 * 60 * 1000)),
      ),
    },
    {
      stage: 2 as const,
      // stage 1 → 2：最後一封 nurture 信超過 3 天
      filter: and(
        isNull(leads.unsubscribedAt),
        eq(leads.nurtureStage, 1),
        lte(leads.nurtureSentAt, new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)),
      ),
    },
    {
      stage: 3 as const,
      // stage 2 → 3：最後一封 nurture 信超過 4 天（共約 7 天後 Email 3）
      filter: and(
        isNull(leads.unsubscribedAt),
        eq(leads.nurtureStage, 2),
        lte(leads.nurtureSentAt, new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000)),
      ),
    },
  ] as const;

  for (const { stage, filter } of stageCriteria) {
    const rows = await db
      .select({
        id: leads.id,
        email: leads.email,
        source: leads.source,
        sourceMetadata: leads.sourceMetadata,
      })
      .from(leads)
      .where(filter)
      .limit(BATCH_LIMIT);

    for (const row of rows) {
      try {
        await sendNurtureEmail(
          row.email,
          row.source,
          stage,
          row.sourceMetadata as { fileName?: string; file?: string } | null,
        );
        await db
          .update(leads)
          .set({ nurtureStage: stage, nurtureSentAt: now })
          .where(eq(leads.id, row.id));
        result.sent++;
        result.stages[stage].sent++;
      } catch (err) {
        console.error(`[nurture] stage ${stage} 寄送失敗 ${row.email}:`, err);
        result.errors++;
        result.stages[stage].errors++;
      }
    }
  }

  return result;
}
