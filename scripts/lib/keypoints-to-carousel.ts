// 文章重點 → Carousel 資料轉換器
// 輸入 ArticleKeypoints，輸出可直接餵給 generate-carousel.ts 的 CarouselArticleData

import type { ArticleKeypoints, KeyPoint } from "./article-keypoints-extractor";
import type { CarouselArticleData, DeficiencyItem } from "./carousel-types";

// ─── 類型判斷 ──────────────────────────────────────────────────────────────────

/**
 * 判斷是否為「TOP N 缺失」類文章（有 rank 的 keyPoints）
 */
function isDeficiencyType(kp: ArticleKeypoints): boolean {
  const allKps = kp.sections.flatMap((s) => s.keyPoints);
  return allKps.some((p) => p.rank !== undefined);
}

// ─── 輔助函式 ──────────────────────────────────────────────────────────────────

/**
 * 從 title 欄位自動拆成兩行（以中間空格或標點分割，每行約 8 字）
 * 例："日照中心評鑑常見缺失 TOP 10：整合多年度真實扣分紀錄"
 *  → "評鑑缺失\nTOP 10"
 */
function splitTitle(title: string): string {
  // 嘗試在「TOP N」位置切
  const topMatch = title.match(/(.*)?(TOP\s*\d+)(.*)?/i);
  if (topMatch) {
    const before = topMatch[1].trim();
    const top = topMatch[2].trim();
    return `${before || "評鑑缺失"}\n${top}`;
  }
  // 嘗試在冒號位置切
  if (title.includes("：")) {
    const [a, b] = title.split("：", 2);
    if (a.length <= 10 && b.length <= 12) return `${a.trim()}\n${b.trim()}`;
  }
  // fallback：前 8 字 + 後段
  const mid = Math.floor(title.length / 2);
  return `${title.slice(0, mid)}\n${title.slice(mid)}`;
}

/**
 * 從文章 slug 組合 blog URL
 */
function makeBlogUrl(slug: string): string {
  return `reportwang.com/blog/${slug}`;
}

/**
 * 從 tags 過濾出適合 carousel pill 的 2-3 個標籤（≤5 中文字）
 */
function selectTagPills(tags: string[], count = 3): string[] {
  return tags
    .filter((t) => t.replace(/\s/g, "").length <= 8) // 最多 8 字（英文可以長一點）
    .slice(0, count);
}

/**
 * 從 keyPoints 決定「highlightNumber」和「highlightLabel」
 */
function detectHighlight(kp: ArticleKeypoints): { number: string; label: string } {
  const allKps = kp.sections.flatMap((s) => s.keyPoints);
  const rankedKps = allKps.filter((p) => p.rank !== undefined);

  if (rankedKps.length > 0) {
    return {
      number: String(rankedKps.length),
      label: "大常見缺失",
    };
  }
  // 一般攻略文章：用段落數
  return {
    number: String(kp.sections.length),
    label: "大重點",
  };
}

/**
 * 將 KeyPoint 轉換為 DeficiencyItem（carousel 用）
 * 若無 rank，以 index+1 代替
 */
function toDeficiencyItem(kp: KeyPoint, index: number): DeficiencyItem {
  return {
    rank: kp.rank ?? index + 1,
    articleRef: kp.articleRef ?? `第${index + 1}項`,
    title: kp.title,
    responsible: kp.responsible ?? "機構",
    shortDesc: kp.description,
  };
}

/**
 * 產生 carousel 用的 hashtag 字串
 */
function generateHashtags(category: string, tags: string[]): string {
  const categoryTag = category.replace(/\s/g, "");
  const tagList = tags.map((t) => `#${t.replace(/\s/g, "")}`).join(" ");
  return `#${categoryTag}評鑑 #${categoryTag} #長照 #評鑑準備 #報告汪 #長照評鑑 ${tagList}`;
}

// ─── 主要轉換函式 ──────────────────────────────────────────────────────────────

/**
 * 將 ArticleKeypoints 轉換為 CarouselArticleData
 *
 * - 若文章有 rank（TOP N 缺失型）：按 rank 排序取前 10 項
 * - 若文章無 rank（攻略/指南型）：取各章節重點合併，最多 10 項
 *
 * 回傳的 data 可直接存為 carousel-data/*.ts 或傳給 generate-carousel.ts
 */
export function keypointsToCarousel(kp: ArticleKeypoints): CarouselArticleData {
  const allKps = kp.sections.flatMap((s) => s.keyPoints);

  // 決定要用哪些 keyPoints 作為 items
  let selectedKps: KeyPoint[];
  if (isDeficiencyType(kp)) {
    // 按 rank 排序，最多取 10 項
    selectedKps = [...allKps]
      .filter((p) => p.rank !== undefined)
      .sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99))
      .slice(0, 10);
  } else {
    // 攻略型：依章節順序取，最多 10 項
    selectedKps = allKps.slice(0, 10);
  }

  const items: DeficiencyItem[] = selectedKps.map((kp, i) => toDeficiencyItem(kp, i));
  const highlight = detectHighlight(kp);

  // 自查清單：優先用解析出的 checklistItems，不夠就從 items 補
  let checklistItems = kp.checklistItems.slice(0, 10);
  if (checklistItems.length < items.length) {
    // 用 items 補足
    const extra = items
      .slice(checklistItems.length)
      .map((item) => `${item.title}（${item.articleRef}）`);
    checklistItems = [...checklistItems, ...extra].slice(0, 10);
  }

  return {
    slug: kp.slug,
    title: splitTitle(kp.title),
    subtitle: kp.excerpt.slice(0, 40) + (kp.excerpt.length > 40 ? "…" : ""),
    category: kp.category,
    highlightNumber: highlight.number,
    highlightLabel: highlight.label,
    tags: selectTagPills(kp.tags, 3),
    audience: `適用對象：${kp.category}主任・社工・評鑑準備團隊`,
    items,
    blogUrl: makeBlogUrl(kp.slug),
    checklistItems,
    hashTags: generateHashtags(kp.category, kp.tags),
  };
}
