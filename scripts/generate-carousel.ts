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
  "daycare-evaluation-45-items-guide-2026": "./carousel-data/daycare-evaluation-45-items-guide-2026",
  "elderly-welfare-eval-77-guide": "./carousel-data/elderly-welfare-eval-77-guide",
  "elderly-welfare-eval-90day-plan": "./carousel-data/elderly-welfare-eval-90day-plan",
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

  // 確保資料完整：此腳本需要剛好 10 項缺失與 10 項清單
  if (data.items.length < 10 || data.checklistItems.length < 10) {
    throw new Error(
      `資料不足：${slug} 需各至少 10 項，目前 items=${data.items.length}，checklistItems=${data.checklistItems.length}`
    );
  }

  const outputDir = makeOutputDir(slug);

  // ─── 產生 10 張 SVG（對齊 blog SVG 低密度排版）────────────────────────
  const slides: CarouselSlide[] = [
    // Slide 1：封面
    {
      index: 0,
      filename: "slide-01-cover.jpg",
      svgContent: renderCoverSlide(data),
    },
    // Slide 2：總覽 #1-5（單欄）
    {
      index: 1,
      filename: "slide-02-overview-1-5.jpg",
      svgContent: renderOverviewSlide(data.items.slice(0, 5), "# 1 – 5"),
    },
    // Slide 3：總覽 #6-10（單欄）
    {
      index: 2,
      filename: "slide-03-overview-6-10.jpg",
      svgContent: renderOverviewSlide(data.items.slice(5, 10), "# 6 – 10"),
    },
    // Slide 4：詳解 #1-3
    {
      index: 3,
      filename: "slide-04-detail-1-3.jpg",
      svgContent: renderDetailSlide(data.items.slice(0, 3), "缺失 #1 – #3"),
    },
    // Slide 5：詳解 #4-6
    {
      index: 4,
      filename: "slide-05-detail-4-6.jpg",
      svgContent: renderDetailSlide(data.items.slice(3, 6), "缺失 #4 – #6"),
    },
    // Slide 6：詳解 #7-8
    {
      index: 5,
      filename: "slide-06-detail-7-8.jpg",
      svgContent: renderDetailSlide(data.items.slice(6, 8), "缺失 #7 – #8"),
    },
    // Slide 7：詳解 #9-10
    {
      index: 6,
      filename: "slide-07-detail-9-10.jpg",
      svgContent: renderDetailSlide(data.items.slice(8, 10), "缺失 #9 – #10"),
    },
    // Slide 8：自查清單 1-5（單欄）
    {
      index: 7,
      filename: "slide-08-checklist-1-5.jpg",
      svgContent: renderChecklistSlide(data.checklistItems.slice(0, 5), "確認項目 1 – 5"),
    },
    // Slide 9：自查清單 6-10（單欄）
    {
      index: 8,
      filename: "slide-09-checklist-6-10.jpg",
      svgContent: renderChecklistSlide(data.checklistItems.slice(5, 10), "確認項目 6 – 10"),
    },
    // Slide 10：CTA
    {
      index: 9,
      filename: "slide-10-cta.jpg",
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
