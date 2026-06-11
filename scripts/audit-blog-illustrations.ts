/**
 * 稽核所有已發布 blog_posts 的內文插圖密度
 *
 * 密度標準：每 450 個去標籤後字元 1 張插圖，同時不超過主要 h2 段數
 * 三級缺口：
 *   Tier 1 — 0 張插圖
 *   Tier 2 — 有插圖但仍缺 ≥5 張
 *   Tier 3 — 缺 3–4 張
 *   OK     — 缺 <3 張（合格）
 *
 * 執行：
 *   npm run audit:blog-illustrations
 *   npm run audit:blog-illustrations -- --tier=1       # 只顯示 Tier 1
 *   npm run audit:blog-illustrations -- --slug=foo     # 單篇詳細
 *   npm run audit:blog-illustrations -- --csv          # 輸出 CSV 格式（方便排序）
 */

import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq } from "drizzle-orm";

// ─── 分析工具函數 ────────────────────────────────────────────────────────────

/** 去除 HTML 標籤後取得文字長度（CJK 字元導向） */
function textLength(html: string): number {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, "")
    .length;
}

/** 計算 HTML 中 pattern 出現次數 */
function countPattern(html: string, re: RegExp): number {
  return (html.match(re) || []).length;
}

/**
 * 判斷 h2 是否為 FAQ 段落（跳過 FAQ 的 h2）
 * FAQ 判定：標題含「常見問題」「FAQ」「Q&A」「問答」
 */
function isFaqH2(h2text: string): boolean {
  return /常見問題|FAQ|Q&A|問答/i.test(h2text);
}

/** 計算非 FAQ 的主要 h2 數量（近似：直接數 h2，不做逐一解析） */
function mainH2Count(html: string): number {
  // 用 /<h2[^>]*>([^<]*)</i 嘗試提取 h2 文字，再排除 FAQ
  const h2s = html.match(/<h2[^>]*>([^<]*(?:<[^/][^>]*>[^<]*<\/[^>]+>[^<]*)*)<\/h2>/gi) || [];
  // 若無法解析（有 nested elements），降回純計數，不扣 FAQ
  if (h2s.length === 0) {
    return countPattern(html, /<h2/gi);
  }
  const nonFaq = h2s.filter((h) => {
    const text = h.replace(/<[^>]+>/g, "");
    return !isFaqH2(text);
  });
  return nonFaq.length;
}

interface PostStats {
  slug: string;
  title: string;
  textLen: number;
  h2: number;
  mainH2: number;       // 非 FAQ 的 h2 數
  actual: number;       // 現有內文插圖數（/blog/ img 引用）
  target: number;       // 目標插圖數
  deficit: number;
  tier: "1" | "2" | "3" | "ok";
}

function computeStats(
  slug: string,
  title: string,
  content: string
): PostStats {
  const len = textLength(content);
  const h2 = countPattern(content, /<h2/gi);
  const mH2 = mainH2Count(content);
  // 內文插圖：<img src="/blog/... 排除封面（封面在獨立欄位，不在 content）
  const actual = countPattern(content, /<img[^>]+src="\/blog\//gi);
  // 目標：min(非FAQ h2數, floor(字數/450))；文章很短（<600字）至少 1
  const byDensity = Math.floor(len / 450);
  const target = len < 600 ? 1 : Math.min(mH2 > 0 ? mH2 : h2, byDensity);
  const deficit = Math.max(0, target - actual);
  let tier: PostStats["tier"];
  if (actual === 0 && len > 1200) tier = "1";
  else if (deficit >= 5) tier = "2";
  else if (deficit >= 3) tier = "3";
  else tier = "ok";
  return { slug, title, textLen: len, h2, mainH2: mH2, actual, target, deficit, tier };
}

// ─── 主程式 ──────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const filterTier = args.find((a) => a.startsWith("--tier="))?.split("=")[1];
  const filterSlug = args.find((a) => a.startsWith("--slug="))?.split("=")[1];
  const csvMode = args.includes("--csv");

  let rows;
  if (filterSlug) {
    rows = await db
      .select({ slug: blogPosts.slug, title: blogPosts.title, content: blogPosts.content })
      .from(blogPosts)
      .where(eq(blogPosts.slug, filterSlug));
  } else {
    rows = await db
      .select({ slug: blogPosts.slug, title: blogPosts.title, content: blogPosts.content })
      .from(blogPosts)
      .where(eq(blogPosts.status, "published"));
  }

  const all = rows.map((r) =>
    computeStats(r.slug, r.title ?? "", r.content ?? "")
  );

  // 單篇詳細模式
  if (filterSlug) {
    const s = all[0];
    if (!s) { console.log(`❌ 找不到 slug: ${filterSlug}`); process.exit(1); }
    console.log(`\n📄 ${s.slug}`);
    console.log(`   標題     : ${s.title}`);
    console.log(`   字數     : ${s.textLen}`);
    console.log(`   h2 總數  : ${s.h2}`);
    console.log(`   非FAQ h2 : ${s.mainH2}`);
    console.log(`   目前插圖 : ${s.actual}`);
    console.log(`   目標插圖 : ${s.target}`);
    console.log(`   缺口     : ${s.deficit}`);
    console.log(`   Tier     : ${s.tier.toUpperCase()}`);
    process.exit(0);
  }

  // 彙總
  const t1 = all.filter((s) => s.tier === "1");
  const t2 = all.filter((s) => s.tier === "2");
  const t3 = all.filter((s) => s.tier === "3");
  const ok = all.filter((s) => s.tier === "ok");
  const needFix = [...t1, ...t2, ...t3].sort((a, b) => b.deficit - a.deficit);

  if (csvMode) {
    console.log("tier,slug,textLen,mainH2,actual,target,deficit");
    for (const s of needFix) {
      console.log(`${s.tier},${s.slug},${s.textLen},${s.mainH2},${s.actual},${s.target},${s.deficit}`);
    }
    process.exit(0);
  }

  // 人類友善輸出
  console.log("\n=== Blog 內文插圖密度稽核 ===");
  console.log(`總已發布篇數 : ${all.length}`);
  console.log(`Tier 1 (0 張): ${t1.length}`);
  console.log(`Tier 2 (缺≥5): ${t2.length}`);
  console.log(`Tier 3 (缺3-4): ${t3.length}`);
  console.log(`合格 (缺<3)  : ${ok.length}`);
  console.log(`需補齊總數   : ${needFix.length}`);

  const tiers = filterTier ? [filterTier] : ["1", "2", "3"];

  for (const t of tiers) {
    const group = all.filter((s) => s.tier === t);
    if (group.length === 0) continue;
    const label: Record<string, string> = {
      "1": "Tier 1 — 0 張插圖",
      "2": "Tier 2 — 缺 ≥5 張",
      "3": "Tier 3 — 缺 3–4 張",
    };
    console.log(`\n--- ${label[t]} (${group.length} 篇) ---`);
    console.log("缺口\t現有\t目標\t字數\th2\tslug");
    for (const s of group.sort((a, b) => b.deficit - a.deficit)) {
      console.log(`${s.deficit}\t${s.actual}\t${s.target}\t${s.textLen}\t${s.mainH2}\t${s.slug}`);
    }
  }

  // 如果全部 OK
  if (needFix.length === 0) {
    console.log("\n✅ 所有文章插圖密度均符合標準，無需補齊。");
  }
}

main().catch(console.error).finally(() => process.exit(0));
