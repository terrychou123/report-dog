// Instagram 輪播圖生成腳本
// 用法：npm run generate:carousel -- [slug]
// 範例：npm run generate:carousel -- daycare-evaluation-top10-deficiencies-2026

import * as path from "path";
import type { CarouselSlide } from "./lib/carousel-types";
import { buildCarousel, makeOutputDir, INSTAGRAM_CONFIG } from "./lib/carousel-builder";
import {
  renderCoverSlide,
  renderOverviewSlide,
  renderDetailSlide,
  renderChecklistSlide,
  renderCtaSlide,
} from "./lib/carousel-templates";

// ─── slug 對應到資料檔的 map ────────────────────────────────────────────────
// 新增文章時，在此加入對應關係，並在 carousel-data/ 建立同名 .ts 檔
const SLUG_TO_DATA: Record<string, string> = {
  "daycare-evaluation-top10-deficiencies-2026": "./carousel-data/daycare-top10-deficiencies",
};

// ─── 產生 Instagram caption 文案 ────────────────────────────────────────────
function generateCaption(data: Awaited<ReturnType<typeof loadData>>): string {
  const itemList = data.items
    .map((item) => `${item.rank}. ${item.title}（${item.articleRef}）`)
    .join("\n");

  return `🔍 日照評鑑 TOP 10 常見缺失

整合多年度真實扣分紀錄，你的機構中了幾項？👇

${itemList}

📖 完整文章（含每項快速解法）：
${data.blogUrl}

🤖 用 AI 自動比對評鑑基準，找出文件缺漏：
reportwang.com

${data.hashTags}`;
}

// ─── 動態載入文章資料 ──────────────────────────────────────────────────────
async function loadData(slug: string) {
  const dataPath = SLUG_TO_DATA[slug];
  if (!dataPath) {
    throw new Error(
      `找不到 slug "${slug}" 的資料檔。\n可用的 slug：\n${Object.keys(SLUG_TO_DATA)
        .map((s) => `  - ${s}`)
        .join("\n")}`
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const mod = require(path.resolve(__dirname, `${dataPath}.ts`));
  return mod.data as import("./lib/carousel-types").CarouselArticleData;
}

// ─── 主邏輯 ──────────────────────────────────────────────────────────────────
async function main() {
  // 解析 slug 參數（預設用第一篇）
  const slug = process.argv[2] ?? "daycare-evaluation-top10-deficiencies-2026";

  console.log(`\n📸 開始生成輪播圖：${slug}`);

  const data = await loadData(slug);
  const outputDir = makeOutputDir(slug);

  // ─── 產生 7 張 SVG ──────────────────────────────────────────────────────
  const slides: CarouselSlide[] = [
    // Slide 1：封面
    {
      index: 0,
      filename: "slide-01-cover.jpg",
      svgContent: renderCoverSlide(data),
    },
    // Slide 2：10 項總覽
    {
      index: 1,
      filename: "slide-02-overview.jpg",
      svgContent: renderOverviewSlide(data),
    },
    // Slide 3：缺失 #1-4 詳細說明
    {
      index: 2,
      filename: "slide-03-deficiencies-1-4.jpg",
      svgContent: renderDetailSlide(data.items.slice(0, 4), "缺失 #1 – #4"),
    },
    // Slide 4：缺失 #5-7 詳細說明
    {
      index: 3,
      filename: "slide-04-deficiencies-5-7.jpg",
      svgContent: renderDetailSlide(data.items.slice(4, 7), "缺失 #5 – #7"),
    },
    // Slide 5：缺失 #8-10 詳細說明
    {
      index: 4,
      filename: "slide-05-deficiencies-8-10.jpg",
      svgContent: renderDetailSlide(data.items.slice(7, 10), "缺失 #8 – #10"),
    },
    // Slide 6：自查清單
    {
      index: 5,
      filename: "slide-06-checklist.jpg",
      svgContent: renderChecklistSlide(data),
    },
    // Slide 7：CTA
    {
      index: 6,
      filename: "slide-07-cta.jpg",
      svgContent: renderCtaSlide(data),
    },
  ];

  // ─── 轉換 SVG → JPG 並輸出 ───────────────────────────────────────────────
  await buildCarousel(slides, { ...INSTAGRAM_CONFIG, outputDir }, generateCaption(data));
}

main().catch((err) => {
  console.error("❌ 生成失敗：", err.message);
  process.exit(1);
});
