#!/usr/bin/env tsx
/**
 * 14 機構 × 三類內容覆蓋矩陣
 *
 * 輸出每種機構目前有哪些內容類型、缺什麼，協助找 P1 內容補洞優先順序。
 *
 * 用法：
 *   npx tsx scripts/audit-facility-content-coverage.ts
 *   npx tsx scripts/audit-facility-content-coverage.ts --json
 *   npx tsx scripts/audit-facility-content-coverage.ts --facility=elderly-welfare
 */
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { FACILITY_MAP, getFacilityInfoFromPost } from "../lib/blog-facility-map";

// ── CLI args ──────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const jsonMode = args.includes("--json");
const facilityArg = args.find((a) => a.startsWith("--facility="))?.split("=")[1];

// ── schoolPath → facilityKey 反向對照 ───────────────────────────────────────
const schoolPathToKey = new Map<string, string>(
  Object.entries(FACILITY_MAP).map(([key, info]) => [info.schoolPath, key])
);

// ── 內容類型定義 ──────────────────────────────────────────────────────────────
type ContentType = "cornerstone" | "pdca" | "checklist" | "care-plan" | "guide-faq" | "other";

/**
 * 依 slug 特徵偵測內容類型。
 * 優先順序：cornerstone > pdca > checklist > care-plan > guide-faq > other
 */
function detectContentType(slug: string): ContentType {
  if (slug.includes("criteria-full") || /eval-115/.test(slug)) return "cornerstone";
  if (slug.includes("pdca")) return "pdca";
  if (slug.includes("checklist") || slug.includes("self-check") || slug.includes("download")) return "checklist";
  if (
    slug.includes("care-plan") ||
    slug.includes("case-records") ||
    slug.includes("isp-writing") ||
    slug.includes("care-plan-writing") ||
    slug.includes("care-plan-complete")
  ) return "care-plan";
  if (
    slug.includes("faq") ||
    slug.includes("guide") ||
    slug.includes("interview") ||
    slug.includes("survival") ||
    slug.includes("director") ||
    slug.includes("prep")
  ) return "guide-faq";
  return "other";
}

// ── 型別 ─────────────────────────────────────────────────────────────────────
type PostRow = {
  slug: string;
  title: string;
  category: string | null;
  tags: string[] | null;
};

type FacilityCoverage = {
  facilityKey: string;
  schoolName: string;
  total: number;
  byType: Record<ContentType, string[]>; // contentType → slug 列表
  hasCornerstone: boolean;
  hasPdca: boolean;
  hasChecklist: boolean;
};

// ── 主邏輯 ────────────────────────────────────────────────────────────────────
async function main() {
  // 撈全部已發佈文章（不含 content 大欄位）
  const posts: PostRow[] = await db
    .select({
      slug: blogPosts.slug,
      title: blogPosts.title,
      category: blogPosts.category,
      tags: blogPosts.tags,
    })
    .from(blogPosts)
    .where(eq(blogPosts.status, "published"));

  // 初始化 14 種機構的覆蓋物件
  const EMPTY_BY_TYPE = (): Record<ContentType, string[]> => ({
    cornerstone: [],
    pdca: [],
    checklist: [],
    "care-plan": [],
    "guide-faq": [],
    other: [],
  });

  const coverageMap = new Map<string, FacilityCoverage>();
  for (const [key, info] of Object.entries(FACILITY_MAP)) {
    coverageMap.set(key, {
      facilityKey: key,
      schoolName: info.schoolName,
      total: 0,
      byType: EMPTY_BY_TYPE(),
      hasCornerstone: false,
      hasPdca: false,
      hasChecklist: false,
    });
  }

  // 無法歸類的文章（可能是跨機構通用或待補標籤）
  const unclassified: PostRow[] = [];

  // 依文章分類到對應機構
  for (const post of posts) {
    const facilityInfo = getFacilityInfoFromPost(post.category, post.tags, post.slug);
    const facilityKey = facilityInfo
      ? (schoolPathToKey.get(facilityInfo.schoolPath) ?? null)
      : null;

    if (!facilityKey || !coverageMap.has(facilityKey)) {
      unclassified.push(post);
      continue;
    }

    const coverage = coverageMap.get(facilityKey)!;
    const contentType = detectContentType(post.slug);

    coverage.total++;
    coverage.byType[contentType].push(post.slug);
    if (contentType === "cornerstone") coverage.hasCornerstone = true;
    if (contentType === "pdca") coverage.hasPdca = true;
    if (contentType === "checklist") coverage.hasChecklist = true;
  }

  // 篩選指定機構（--facility= 參數）
  let coverageList = Array.from(coverageMap.values());
  if (facilityArg) {
    if (!coverageMap.has(facilityArg)) {
      console.error(`未知的 facility: ${facilityArg}`);
      console.error(`可用值: ${Array.from(coverageMap.keys()).join(", ")}`);
      process.exit(1);
    }
    coverageList = coverageList.filter((c) => c.facilityKey === facilityArg);
  }

  // ── JSON 模式 ──────────────────────────────────────────────────────────────
  if (jsonMode) {
    console.log(JSON.stringify({ coverageList, unclassified: unclassified.map((p) => p.slug) }, null, 2));
    return;
  }

  // ── 人類可讀模式 ───────────────────────────────────────────────────────────
  const GAP_EMOJI = (has: boolean) => (has ? "✅" : "❌");

  console.log("\n=== 14 機構 × 三類內容覆蓋矩陣 ===");
  console.log("  機構類型".padEnd(48) + "共幾篇  cornerstone  pdca  checklist");
  console.log("─".repeat(90));

  // 依缺口多寡排序（缺越多越優先）
  const sorted = [...coverageList].sort((a, b) => {
    const gapA = [a.hasCornerstone, a.hasPdca, a.hasChecklist].filter((x) => !x).length;
    const gapB = [b.hasCornerstone, b.hasPdca, b.hasChecklist].filter((x) => !x).length;
    return gapB - gapA || a.facilityKey.localeCompare(b.facilityKey);
  });

  for (const c of sorted) {
    const name = c.schoolName.replace("評鑑小教室", "").padEnd(26);
    const total = String(c.total).padStart(3);
    const cs = GAP_EMOJI(c.hasCornerstone);
    const pd = GAP_EMOJI(c.hasPdca);
    const ck = GAP_EMOJI(c.hasChecklist);
    console.log(`  ${name} ${total}篇     ${cs}           ${pd}     ${ck}`);
  }

  console.log("─".repeat(90));

  // ── 缺口摘要 ────────────────────────────────────────────────────────────────
  const missingCornerstone = sorted.filter((c) => !c.hasCornerstone).map((c) => c.facilityKey);
  const missingPdca = sorted.filter((c) => !c.hasPdca).map((c) => c.facilityKey);
  const missingChecklist = sorted.filter((c) => !c.hasChecklist).map((c) => c.facilityKey);

  console.log("\n📌 缺 cornerstone（{機構}-115-criteria-full）:");
  if (missingCornerstone.length === 0) {
    console.log("  全部齊備 🎉");
  } else {
    missingCornerstone.forEach((k) => console.log(`  ❌ ${k}`));
  }

  console.log("\n📌 缺 PDCA 指南（slug 含 'pdca'）:");
  if (missingPdca.length === 0) {
    console.log("  全部齊備 🎉");
  } else {
    missingPdca.forEach((k) => console.log(`  ❌ ${k}`));
  }

  console.log("\n📌 缺 下載/自評清單（slug 含 'checklist'/'download'）:");
  if (missingChecklist.length === 0) {
    console.log("  全部齊備 🎉");
  } else {
    missingChecklist.forEach((k) => console.log(`  ❌ ${k}`));
  }

  // ── 詳細文章清單（--facility= 模式下顯示） ──────────────────────────────────
  if (facilityArg && coverageList.length === 1) {
    const c = coverageList[0];
    console.log(`\n\n=== ${c.schoolName} 詳細文章 ===`);
    for (const [type, slugs] of Object.entries(c.byType)) {
      if (slugs.length === 0) continue;
      console.log(`\n[${type}]`);
      slugs.forEach((s) => console.log(`  /blog/${s}`));
    }
  }

  // ── 無法歸類的文章 ────────────────────────────────────────────────────────
  console.log(`\n\n⚠️  無法歸類文章（${unclassified.length} 篇，可能是通用/待補標籤）:`);
  if (unclassified.length > 0) {
    unclassified.slice(0, 20).forEach((p) => console.log(`  ${p.slug}`));
    if (unclassified.length > 20) console.log(`  ... 另有 ${unclassified.length - 20} 篇`);
  }

  console.log(`\n總計：已發佈 ${posts.length} 篇，已歸類 ${posts.length - unclassified.length} 篇，未歸類 ${unclassified.length} 篇`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
