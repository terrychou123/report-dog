// 文章重點抓取 CLI 入口腳本
//
// 用法：
//   npm run extract:keypoints -- --slug <slug>              # 單篇抓取 + 輸出 JSON
//   npm run extract:keypoints -- --slug <slug> --carousel   # 抓取 + 生成 carousel 資料
//   npm run extract:keypoints -- --slug <slug> --svg-plan   # 抓取 + 生成 SVG 計畫 JSON
//   npm run extract:keypoints -- --slug <slug> --svg        # 抓取 + 直接生成 SVG 檔案
//   npm run extract:keypoints -- --all --stats              # 掃描全部文章，輸出統計

import * as fs from "fs";
import * as path from "path";
import { extractKeypoints, type ArticleJson } from "./lib/article-keypoints-extractor";
import { keypointsToCarousel } from "./lib/keypoints-to-carousel";
import { keypointsToSvgPlan, formatSvgPlanReport } from "./lib/keypoints-to-svg-plan";
import { renderSvgPlanItem } from "./lib/svg-renderer";

const BLOG_POSTS_DIR = path.resolve(__dirname, "blog-posts");
const CAROUSEL_DATA_DIR = path.resolve(__dirname, "carousel-data");
const GENERATE_CAROUSEL_PATH = path.resolve(__dirname, "generate-carousel.ts");
const PUBLIC_BLOG_DIR = path.resolve(__dirname, "../public/blog");

// ─── 工具函式 ──────────────────────────────────────────────────────────────────

function loadArticle(slug: string): ArticleJson {
  // 支援直接傳 slug 或 slug.json
  const baseName = slug.replace(/\.json$/, "");

  // 先在 blog-posts 目錄搜尋對應 slug 的 JSON 檔
  const files = fs.readdirSync(BLOG_POSTS_DIR).filter((f) => f.endsWith(".json"));
  for (const file of files) {
    const content = fs.readFileSync(path.join(BLOG_POSTS_DIR, file), "utf-8");
    const article: ArticleJson = JSON.parse(content);
    if (article.slug === baseName) return article;
  }
  throw new Error(`找不到 slug="${baseName}" 的文章 JSON`);
}

function loadAllArticles(): ArticleJson[] {
  const files = fs.readdirSync(BLOG_POSTS_DIR).filter((f) => f.endsWith(".json"));
  return files.map((f) => {
    const content = fs.readFileSync(path.join(BLOG_POSTS_DIR, f), "utf-8");
    return JSON.parse(content) as ArticleJson;
  });
}

/** 將 CarouselArticleData 轉為 TypeScript 原始碼字串（可直接存成 .ts 檔） */
function carouselDataToTs(data: ReturnType<typeof keypointsToCarousel>): string {
  const json = JSON.stringify(data, null, 2)
    .replace(/"([a-zA-Z_]\w*)":/g, "$1:"); // 移除鍵名引號（簡化格式）

  return `// 自動生成：${data.slug} 輪播圖內容資料
// 由 extract-article-keypoints.ts 抓取，請依實際需求調整各欄位
import type { CarouselArticleData } from "../lib/carousel-types";

export const data: CarouselArticleData = ${json};
`;
}

// ─── 自動更新 SLUG_TO_DATA ──────────────────────────────────────────────────

/**
 * 在 generate-carousel.ts 的 SLUG_TO_DATA 中自動加入新 slug。
 * 若 slug 已存在則跳過。
 */
function updateSlugToData(slug: string) {
  const content = fs.readFileSync(GENERATE_CAROUSEL_PATH, "utf-8");
  const dataPath = `./carousel-data/${slug}`;

  // 已存在：跳過
  if (content.includes(`"${slug}"`)) {
    console.log(`   ℹ  SLUG_TO_DATA 已包含 "${slug}"，跳過更新`);
    return;
  }

  // 找到 SLUG_TO_DATA 的結尾 "};" 並在前面插入新行
  const updated = content.replace(
    /^(const SLUG_TO_DATA[^{]*\{)(.*?)(^\};)/ms,
    (match, open, body, close) => {
      // 移除 body 最後的換行空白，加上逗號（如果最後一行沒有逗號）
      const trimmed = body.trimEnd();
      const needComma = trimmed.length > 0 && !trimmed.endsWith(",");
      const comma = needComma ? "," : "";
      return `${open}${body.trimEnd()}${comma}\n  "${slug}": "${dataPath}",\n${close}`;
    }
  );

  if (updated === content) {
    console.log(`   ⚠️  無法自動更新 SLUG_TO_DATA，請手動加入：`);
    console.log(`   "${slug}": "${dataPath}"`);
    return;
  }

  fs.writeFileSync(GENERATE_CAROUSEL_PATH, updated, "utf-8");
  console.log(`   ✅ 已自動更新 generate-carousel.ts 的 SLUG_TO_DATA`);
}

// ─── 主邏輯 ──────────────────────────────────────────────────────────────────

function parseArgs() {
  const args = process.argv.slice(2);
  const result = {
    slug: "",
    all: false,
    carousel: false,
    svgPlan: false,
    svg: false,
    stats: false,
  };
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--slug": result.slug = args[++i] ?? ""; break;
      case "--all": result.all = true; break;
      case "--carousel": result.carousel = true; break;
      case "--svg-plan": result.svgPlan = true; break;
      case "--svg": result.svg = true; break;
      case "--stats": result.stats = true; break;
    }
  }
  return result;
}

async function main() {
  const opts = parseArgs();

  // ── 模式 A：全量掃描 + 統計 ────────────────────────────────────────────────
  if (opts.all) {
    console.log("\n📊 掃描全部文章...\n");
    const articles = loadAllArticles();
    let totalChars = 0;
    let totalKps = 0;
    let errorCount = 0;

    const rows: string[] = [
      "slug\tcategory\tcharCount\tsections\tkeyPoints\testimatedSvgs\tchecklistItems"
    ];

    for (const article of articles) {
      try {
        const kp = extractKeypoints(article);
        totalChars += kp.stats.charCount;
        totalKps += kp.stats.keyPointCount;
        if (opts.stats) {
          rows.push([
            kp.slug,
            kp.category,
            kp.stats.charCount,
            kp.stats.sectionCount,
            kp.stats.keyPointCount,
            kp.stats.estimatedSvgCount,
            kp.checklistItems.length,
          ].join("\t"));
        }
      } catch (err) {
        errorCount++;
        console.error(`  ⚠️  ${article.slug}: ${(err as Error).message}`);
      }
    }

    if (opts.stats) {
      console.log(rows.join("\n"));
      console.log();
    }

    console.log(`✅ 掃描完成`);
    console.log(`   文章數：${articles.length}`);
    console.log(`   解析錯誤：${errorCount}`);
    console.log(`   平均字數：${articles.length > 0 ? Math.round(totalChars / articles.length) : "N/A"}`);
    console.log(`   平均重點數：${articles.length > 0 ? Math.round(totalKps / articles.length) : "N/A"}`);
    return;
  }

  // ── 模式 B：單篇抓取 ────────────────────────────────────────────────────────
  if (!opts.slug) {
    console.error("❌ 請指定 --slug <slug> 或 --all");
    console.error("   範例：npm run extract:keypoints -- --slug daycare-evaluation-top10-deficiencies-2026 --carousel");
    process.exit(1);
  }

  console.log(`\n🔍 抓取文章重點：${opts.slug}\n`);

  const article = loadArticle(opts.slug);
  const kp = extractKeypoints(article);

  // 基本輸出
  console.log(`📄 ${kp.title}`);
  console.log(`   分類：${kp.category}`);
  console.log(`   字數：${kp.stats.charCount}`);
  console.log(`   章節：${kp.stats.sectionCount}`);
  console.log(`   重點：${kp.stats.keyPointCount}`);
  console.log(`   建議插圖：${kp.stats.estimatedSvgCount} 張`);
  console.log(`   自查清單：${kp.checklistItems.length} 項`);
  console.log();

  if (kp.summary) {
    console.log(`📝 重點摘要：`);
    console.log(`   ${kp.summary.slice(0, 100)}...`);
    console.log();
  }

  console.log(`📌 抓到的重點：`);
  const allKps = kp.sections.flatMap((s) => s.keyPoints);
  for (const p of allKps.slice(0, 10)) {
    const rank = p.rank ? `#${p.rank} ` : "";
    const ref = p.articleRef ? `[${p.articleRef}] ` : "";
    const resp = p.responsible ? `（${p.responsible}）` : "";
    console.log(`   ${rank}${ref}${p.title}${resp}`);
    console.log(`      → ${p.description}`);
  }
  if (allKps.length > 10) {
    console.log(`   ... 共 ${allKps.length} 項（只顯示前 10）`);
  }

  if (kp.checklistItems.length > 0) {
    console.log();
    console.log(`☑  自查清單：`);
    kp.checklistItems.slice(0, 5).forEach((item) => console.log(`   ☐ ${item}`));
    if (kp.checklistItems.length > 5) console.log(`   ... 共 ${kp.checklistItems.length} 項`);
  }

  // ── Carousel 資料生成 ──────────────────────────────────────────────────────
  if (opts.carousel) {
    console.log("\n🎠 生成 Carousel 資料...");
    const carouselData = keypointsToCarousel(kp);
    const tsCode = carouselDataToTs(carouselData);

    // 存入 carousel-data/ 目錄
    if (!fs.existsSync(CAROUSEL_DATA_DIR)) {
      fs.mkdirSync(CAROUSEL_DATA_DIR, { recursive: true });
    }
    const outPath = path.resolve(CAROUSEL_DATA_DIR, `${kp.slug}.ts`);
    if (!outPath.startsWith(CAROUSEL_DATA_DIR + path.sep) && outPath !== CAROUSEL_DATA_DIR) {
      throw new Error(`Path traversal detected in slug: ${kp.slug}`);
    }
    fs.writeFileSync(outPath, tsCode, "utf-8");
    console.log(`   ✅ 已儲存：${outPath}`);
    console.log();
    console.log(`   封面：${carouselData.title.replace("\n", " / ")}`);
    console.log(`   副標：${carouselData.subtitle}`);
    console.log(`   項目數：${carouselData.items.length}`);
    console.log(`   清單項：${carouselData.checklistItems.length}`);

    // 自動更新 generate-carousel.ts 的 SLUG_TO_DATA
    updateSlugToData(kp.slug);
  }

  // ── SVG 計畫生成 ──────────────────────────────────────────────────────────
  if (opts.svgPlan) {
    console.log("\n🖼  生成 SVG 插圖計畫...");
    const plan = keypointsToSvgPlan(kp);
    console.log(formatSvgPlanReport(plan));

    // 存為 JSON 計畫檔
    const planPath = path.join(CAROUSEL_DATA_DIR, `${kp.slug}-svg-plan.json`);
    fs.writeFileSync(planPath, JSON.stringify(plan, null, 2), "utf-8");
    console.log(`\n   ✅ SVG 計畫已儲存：${planPath}`);
  }

  // ── SVG 直接生成 ──────────────────────────────────────────────────────────
  if (opts.svg) {
    console.log("\n🖼  生成 SVG 插圖...");
    const plan = keypointsToSvgPlan(kp);

    // 確保輸出目錄存在
    if (!fs.existsSync(PUBLIC_BLOG_DIR)) {
      fs.mkdirSync(PUBLIC_BLOG_DIR, { recursive: true });
    }

    let count = 0;

    /** 安全寫入：驗證路徑不超出輸出目錄（防止含 ../ 的 slug） */
    function safeWriteSvg(filename: string, content: string): string {
      const resolved = path.resolve(PUBLIC_BLOG_DIR, filename);
      if (!resolved.startsWith(PUBLIC_BLOG_DIR + path.sep) && resolved !== PUBLIC_BLOG_DIR) {
        throw new Error(`Path traversal detected in filename: ${filename}`);
      }
      fs.writeFileSync(resolved, content, "utf-8");
      return resolved;
    }

    // 封面圖
    const coverSvg = renderSvgPlanItem(plan.coverSvg, kp);
    safeWriteSvg(plan.coverSvg.filename, coverSvg);
    console.log(`   ✅ ${plan.coverSvg.filename}  [封面 1200×630]`);
    count++;

    // 內文插圖
    for (const item of plan.inlineSvgs) {
      const svg = renderSvgPlanItem(item, kp);
      safeWriteSvg(item.filename, svg);
      console.log(`   ✅ ${item.filename}  [${item.template}]`);
      count++;
    }

    console.log();
    console.log(`   共生成 ${count} 張 SVG → public/blog/`);
    console.log(`   ⚠️  自動生成的 SVG 為草稿，建議用瀏覽器開啟確認排版後再 commit`);
  }
}

main().catch((err) => {
  console.error("❌ 執行失敗：", err.message);
  process.exit(1);
});
