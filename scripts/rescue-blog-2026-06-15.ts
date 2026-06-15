/**
 * 一次性腳本：高跳出 blog 救援第二批（接續 improve-high-bounce-blogs.ts）
 * 目標：home-nursing-pdca-writing-2026 (75% 跳出)
 *       psychiatric-nursing-home-individualized-care-plan-2026 (72% 跳出)
 *
 * 改善策略（對標模範生 home-care-document-ai 27% 跳出）：
 * 1. 開頭加 <blockquote>本文重點：...</blockquote>（FB 用戶掃前幾行）
 * 2. 文末補強/新增「延伸閱讀」三向連結 + 綠色 CTA 區塊
 * 3. home-nursing-pdca：延伸閱讀加入 /demo（SOAP AI 改寫體驗，與本文主題高度相關，
 *    填補 /demo 上線以來零內部連結的缺口）
 *
 * 用法：npx dotenv -e .env.local -- npx tsx scripts/rescue-blog-2026-06-15.ts
 */
import { db } from "../db/index";
import { blogPosts } from "../db/schema";
import { eq } from "drizzle-orm";

// ─────────────────────────────────────────────
// 1. 居家護理所 PDCA 報告撰寫
// ─────────────────────────────────────────────
async function rescueHomeNursingPdca() {
  const slug = "home-nursing-pdca-writing-2026";
  const rows = await db
    .select({ content: blogPosts.content })
    .from(blogPosts)
    .where(eq(blogPosts.slug, slug));

  if (!rows.length || !rows[0].content) {
    console.log(`❌ 找不到文章：${slug}`);
    return;
  }

  let content = rows[0].content;

  // ① 開頭加 blockquote 本文重點
  const tldr = `<blockquote><strong>本文重點：</strong>PDCA（Plan-Do-Check-Act）同時是居家護理所評鑑 A5 品質指標與 B2 照護計畫的核心管理工具，但多數機構只做到「形式存在」。本文拆解 PDCA 在照護計畫與品質指標管理中的具體應用，提供壓瘡、糖尿病足、鼻胃管、失智症 BPSD 4 種 case type 的完整 P-D-C-A 範例與量化數據，並說明甲乙等機構在「A（改善）」環節的關鍵差距。</blockquote>

`;
  const firstHeading = "<h2>為什麼 PDCA 在評鑑中那麼重要？</h2>";
  if (!content.includes("本文重點：") && content.includes(firstHeading)) {
    content = content.replace(firstHeading, tldr + firstHeading);
  }

  // ② 文末補強延伸閱讀（含 /demo）+ 綠色 CTA 區塊
  const marker = "<!-- illus-injected:home-nursing-pdca-writing-2026 -->";
  const closing = `<hr />
<p><strong>延伸閱讀：</strong></p>
<ul>
  <li><a href="/school/home-nursing">居家護理所評鑑小教室——115 年度基準完整解析</a></li>
  <li><a href="/blog/home-nursing-quality-indicators-2026">A5 品質指標實務教學</a></li>
  <li><a href="/demo">免費體驗：護理記錄 AI 一鍵改寫成 SOAP 格式</a></li>
</ul>
<p style="margin-top: 2rem; padding: 1.5rem; background: #f0fdf4; border-radius: 12px; border: 1px solid #bbf7d0;">
  <strong>想讓 PDCA 從「裝飾性」變「功能性」？</strong><br />
  <a href="/auth/sign-up" style="color: #16a34a; font-weight: 600;">免費試用報告汪</a>——AI 輔助撰寫品質指標報告與改善計畫，追蹤提醒到期不漏項，讓 Check 與 Act 不再只是形式。
</p>

`;
  if (!content.includes("延伸閱讀：") && content.includes(marker)) {
    content = content.replace(marker, closing + marker);
  }

  await db.update(blogPosts).set({ content }).where(eq(blogPosts.slug, slug));
  console.log(`✅ ${slug} 已更新`);
}

// ─────────────────────────────────────────────
// 2. 精神護理之家 B1.1 個別化照護計畫
// ─────────────────────────────────────────────
async function rescuePsychiatricCarePlan() {
  const slug = "psychiatric-nursing-home-individualized-care-plan-2026";
  const rows = await db
    .select({ content: blogPosts.content })
    .from(blogPosts)
    .where(eq(blogPosts.slug, slug));

  if (!rows.length || !rows[0].content) {
    console.log(`❌ 找不到文章：${slug}`);
    return;
  }

  let content = rows[0].content;

  // ① 開頭加 blockquote 本文重點
  const tldr = `<blockquote><strong>本文重點：</strong>B1.1 個別化照護計畫是一條以「入住日」為起點的時間軸——入住 72 小時內完成六大面向評估、1 週內落實適應輔導、每月追蹤體重、每 3 個月定期再評估、每半年與家屬共同討論修訂。本文逐一拆解每個時間節點的文件要求與常見缺失，幫助機構在評鑑委員抽查 3 位住民病歷時，每一份紀錄都經得起時間軸查核。</blockquote>

`;
  const firstHeading = "<h2>B1.1的評鑑邏輯：從入住那天起的時間軸管理</h2>";
  if (!content.includes("本文重點：") && content.includes(firstHeading)) {
    content = content.replace(firstHeading, tldr + firstHeading);
  }

  // ② 延伸閱讀已是三向連結，補一個綠色 CTA 區塊（對標模範生文末樣式）
  const marker = "<!-- illus-injected:psychiatric-nursing-home-individualized-care-plan-2026 -->";
  const closing = `<p style="margin-top: 2rem; padding: 1.5rem; background: #f0fdf4; border-radius: 12px; border: 1px solid #bbf7d0;">
  <strong>想在評鑑前先找出 B1.1 的文件缺口？</strong><br />
  <a href="/auth/sign-up" style="color: #16a34a; font-weight: 600;">免費試用報告汪</a>——AI 自我查核依 115 年度精神護理之家 36 項評鑑基準逐條比對，並用標籤與追蹤功能管理每位住民的入住評估、定期評估與體重追蹤時程。
</p>

`;
  if (!content.includes("先找出 B1.1 的文件缺口") && content.includes(marker)) {
    content = content.replace(marker, closing + marker);
  }

  await db.update(blogPosts).set({ content }).where(eq(blogPosts.slug, slug));
  console.log(`✅ ${slug} 已更新`);
}

// ─────────────────────────────────────────────
async function main() {
  await rescueHomeNursingPdca();
  await rescuePsychiatricCarePlan();
  console.log("✅ 完成。請呼叫 /api/revalidate-blog 清除 blog 快取。");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
