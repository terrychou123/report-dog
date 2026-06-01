/**
 * 一次性腳本：改善兩篇高跳出 blog 文章的開頭結構
 * 目標：elderly-welfare-eval-interview-preparation (FB 75% 跳出)
 *       daycare-post-evaluation-action-plan-2026 (FB 80% 跳出)
 *
 * 改善策略（對標模範生 home-care-document-ai 27% 跳出）：
 * 1. 加開頭 blockquote TL;DR（FB 用戶掃前幾行）
 * 2. elderly-welfare: 裸 <img> → <figure><figcaption>（視覺斷點）
 * 3. 補強 延伸閱讀 三向連結（school + product + blog姊妹文）
 *
 * 用法：npx dotenv -e .env.local -- npx tsx scripts/improve-high-bounce-blogs.ts
 */
import { db } from "../db/index";
import { blogPosts } from "../db/schema";
import { eq } from "drizzle-orm";

// ─────────────────────────────────────────────
// 1. 老人福利機構評鑑訪談準備
// ─────────────────────────────────────────────
async function improveElderlyWelfareInterview() {
  const slug = "elderly-welfare-eval-interview-preparation";
  const rows = await db
    .select({ content: blogPosts.content })
    .from(blogPosts)
    .where(eq(blogPosts.slug, slug));

  if (!rows.length || !rows[0].content) {
    console.log(`❌ 找不到文章：${slug}`);
    return;
  }

  let content = rows[0].content;

  // ① 開頭加 blockquote TL;DR（在第一個 <h2> 前插入）
  const tldr = `<blockquote>
  <strong>本文重點：</strong>老人福利機構評鑑訪談分主管、工作人員、服務對象三種模式，委員提問直指數字、流程與現場操作。本文整理 A–F 六大區塊典型訪談問題與應答準備策略，幫助各職類主管精準備答、不被追問打亂節奏。
</blockquote>

`;
  if (!content.includes("本文重點：")) {
    content = content.replace(
      "<h2>評鑑訪談的 3 種模式</h2>",
      tldr + "<h2>評鑑訪談的 3 種模式</h2>"
    );
  }

  // ② 裸 <img> → <figure><figcaption>
  const imgFigures: [string, string, string][] = [
    [
      "/blog/elderly-welfare-eval-interview-overview.svg",
      "評鑑訪談3種模式說明",
      "圖：主管訪談、工作人員訪談、服務對象訪談三種模式，各有不同應對策略",
    ],
    [
      "/blog/elderly-welfare-eval-interview-a.svg",
      "A區常見訪談問題",
      "圖：A 區（經營管理效能）15 項——制度細節、人員配比、訓練時數是委員最常追問的三個方向",
    ],
    [
      "/blog/elderly-welfare-eval-interview-bc.svg",
      "B/C區常見訪談問題",
      "圖：B 區（專業照護，40% 配分）與 C 區（安全環境）——數字要能背、設備要能現場示範",
    ],
    [
      "/blog/elderly-welfare-eval-interview-d.svg",
      "D區常見訪談問題",
      "圖：D 區（個案權益保障）9 項——社工須熟知每位個案的文件狀態與申訴管道",
    ],
    [
      "/blog/elderly-welfare-eval-interview-tips.svg",
      "5大應對技巧",
      "圖：評鑑訪談 5 大應對技巧——數字背誦、文件快速定位、設備演練、基層模擬、職類分工",
    ],
    [
      "/blog/elderly-welfare-eval-interview-collab.svg",
      "多人協作備訪分工",
      "圖：各職類分工備答對照表——行政（A/E/F）、社工（B1–B8/D1–D7）、護理（B9–B24/D8）、照服（B25–B27）各負其責",
    ],
  ];

  for (const [src, alt, caption] of imgFigures) {
    const bare = `<img src="${src}" alt="${alt}" />`;
    const figure = `<figure style="margin: 2rem 0;">
  <img src="${src}" alt="${alt}" style="width:100%;border-radius:12px;" />
  <figcaption style="text-align:center;font-size:0.875rem;color:#64748b;margin-top:0.5rem;">${caption}</figcaption>
</figure>`;
    if (content.includes(bare)) {
      content = content.replaceAll(bare, figure);
    }
  }

  // ③ 補強 延伸閱讀（加 product page + downloads）
  const oldReading = `<ul>
  <li><a href="/school/elderly-welfare">老人福利機構評鑑完整學習資源</a></li>
  <li><a href="/blog/elderly-welfare-eval-77-guide">老人福利機構評鑑 77 項全指南</a></li>
</ul>`;
  const newReading = `<ul>
  <li><a href="/school/elderly-welfare">老人福利機構評鑑完整學習資源</a></li>
  <li><a href="/blog/elderly-welfare-eval-77-guide">老人福利機構評鑑 77 項全指南</a></li>
  <li><a href="/elderly-welfare">報告汪老人福利機構評鑑功能介紹</a></li>
  <li><a href="/downloads">免費下載老人福利機構評鑑備審文件模板</a></li>
</ul>`;
  if (content.includes(oldReading)) {
    content = content.replace(oldReading, newReading);
  }

  await db.update(blogPosts).set({ content }).where(eq(blogPosts.slug, slug));
  console.log(`✅ elderly-welfare-eval-interview-preparation 已更新`);
}

// ─────────────────────────────────────────────
// 2. 日照評鑑後 30 天行動計畫
// ─────────────────────────────────────────────
async function improveDaycarePostEval() {
  const slug = "daycare-post-evaluation-action-plan-2026";
  const rows = await db
    .select({ content: blogPosts.content })
    .from(blogPosts)
    .where(eq(blogPosts.slug, slug));

  if (!rows.length || !rows[0].content) {
    console.log(`❌ 找不到文章：${slug}`);
    return;
  }

  let content = rows[0].content;

  // ① 開頭加 blockquote TL;DR（在第一個 <h2> 前插入）
  const tldr = `<blockquote>
  <strong>本文重點：</strong>評鑑委員一走不代表結束。本文提供完整 30 天行動計畫——48 小時整理口頭反饋、第 1 週建立改善計畫、第 2–4 週執行改善、第 30 天確認成效。同時為下次評鑑的第 27 條「前次評鑑建議改善情形」提前佈局，避免三年後要重建的高成本。
</blockquote>

`;
  if (!content.includes("本文重點：")) {
    content = content.replace(
      "<h2>評鑑後的黃金 30 天：為什麼不能立刻放鬆？</h2>",
      tldr + "<h2>評鑑後的黃金 30 天：為什麼不能立刻放鬆？</h2>"
    );
  }

  // ② 補強 延伸閱讀（加 blog 姊妹文）
  const oldReading = `<ul>
  <li><a href="/school/daycare">日間照顧中心評鑑小教室 — 完整基準解析與準備技巧</a></li>
  <li><a href="/day-care">日照中心評鑑報告管理功能介紹</a></li>
  <li><a href="/downloads">免費下載日照評鑑備審文件模板（Excel 版）</a></li>
</ul>`;
  const newReading = `<ul>
  <li><a href="/school/daycare">日間照顧中心評鑑小教室 — 完整基準解析與準備技巧</a></li>
  <li><a href="/day-care">日照中心評鑑報告管理功能介紹</a></li>
  <li><a href="/blog/daycare-evaluation-45-items-guide-2026">日照中心評鑑 45 項全指南（115 年度）</a></li>
  <li><a href="/downloads">免費下載日照評鑑備審文件模板（Excel 版）</a></li>
</ul>`;
  if (content.includes(oldReading)) {
    content = content.replace(oldReading, newReading);
  }

  await db.update(blogPosts).set({ content }).where(eq(blogPosts.slug, slug));
  console.log(`✅ daycare-post-evaluation-action-plan-2026 已更新`);
}

// ─────────────────────────────────────────────
async function main() {
  await improveElderlyWelfareInterview();
  await improveDaycarePostEval();
  console.log("✅ 完成。請呼叫 /api/revalidate-blog 清除 blog 快取。");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
