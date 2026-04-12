/**
 * classify-blog-covers.ts
 * 讀取 scripts/blog-posts/*.json，依標題/slug/tags 關鍵字推薦最適合的封面模板，
 * 輸出 Markdown 對照表供人工審核。
 *
 * 執行方式：
 *   npx tsx scripts/classify-blog-covers.ts > scripts/blog-cover-template-mapping.md
 */

import * as fs from "fs";
import * as path from "path";

// ── 模板類型定義 ──────────────────────────────────────────────────
type CoverTemplate =
  | "standard"
  | "chart"
  | "checklist"
  | "timeline"
  | "quote"
  | "vs";

const TEMPLATE_LABELS: Record<CoverTemplate, string> = {
  standard: "📋 標準",
  chart: "📊 Chart（數據）",
  checklist: "✅ Checklist（清單）",
  timeline: "📅 Timeline（時程）",
  quote: "💬 Quote（訪談）",
  vs: "⚖️ VS（對比）",
};

// ── 關鍵字規則（依優先順序判斷） ─────────────────────────────────
// slug 與 title 均會比對（slug 全小寫、title 保留原始大小寫）
const RULES: Array<{
  template: CoverTemplate;
  slugPatterns: RegExp[];
  titlePatterns: RegExp[];
  tagPatterns: RegExp[];
}> = [
  // 1. VS 對比（最明確，優先判斷）
  // 注意：僅 slug/tag 帶 vs/comparison/dual 才觸發，標題「對比」太廣泛不單獨觸發
  {
    template: "vs",
    slugPatterns: [/\bvs\b/, /comparison/, /dual.version/],
    titlePatterns: [/\bvs\b/],              // 標題僅匹配英文 vs（避免「效率對比」誤判）
    tagPatterns: [/^vs$/, /差異比較/, /差異比較/],
  },
  // 2. Timeline 時程（優先於 Quote，避免 90day+PFM訪談 的文章被誤捕）
  {
    template: "timeline",
    slugPatterns: [/90day/, /timeline/, /countdown/, /3month/, /prep.timeline/],
    titlePatterns: [/90天/, /三個月/, /3個月/, /倒數/, /時程表/, /階段規劃/, /準備計畫/],
    tagPatterns: [/時程/, /倒數/, /90天/],
  },
  // 3. Checklist 自評清單（優先於 Quote，避免「自評表…委員一眼看出」被誤捕）
  {
    template: "checklist",
    slugPatterns: [/self.checklist/, /self.eval/, /selfeval/, /checklist/],
    titlePatterns: [
      /自我檢核/,
      /自評表/,      // 比「自評」更精確，避免過廣
      /自我評估/,
      /檢核表/,
      /FAQ/,
      /常見問題/,
      /清單/,
      /檢查清單/,
    ],
    tagPatterns: [/自評/, /清單/, /自我檢核/],
  },
  // 4. Quote 訪談（委員第一人稱視角 / 訪談故事）
  // 標籤規則：排除 PFM訪談（評鑑術語）；僅匹配 委員觀點/委員訪談/評鑑委員
  {
    template: "quote",
    slugPatterns: [
      /inspector/,
      /evaluator.perspective/,
      /interview/,
      /perspective/,
    ],
    titlePatterns: [
      /委員.*在看什麼/,   // 「委員到底在看什麼」類
      /委員.*視角/,
      /委員.*觀點/,
      /委員.*問什麼/,     // 「委員會問什麼」類
      /委員.*訪談/,
      /訪談.*故事/,
      /真實.*故事/,
      /怎麼看\？/,
    ],
    tagPatterns: [/^委員觀點$/, /^評鑑委員$/, /^委員訪談$/],  // 精確匹配，排除 PFM訪談
  },
  // 5. Chart 數據排行（top10、缺失盤點、品管指標）
  {
    template: "chart",
    slugPatterns: [
      /top10/,
      /top-10/,
      /deficiencies/,
      /quality.indicator/,
      /pdca/,
      /statistics/,
      /ranking/,
    ],
    titlePatterns: [
      /十大/,
      /10大/,
      /最常見.*缺失/,
      /品管指標/,
      /PDCA/,
      /常見缺失/,
      /失分/,
      /扣分/,
      /常被扣/,
    ],
    tagPatterns: [/品管/, /缺失/, /PDCA/, /top10/, /失分/],
  },
];

// ── 分類函式 ─────────────────────────────────────────────────────
interface ArticleData {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  coverImageUrl: string;
}

function classify(article: ArticleData): {
  template: CoverTemplate;
  reason: string;
} {
  const slugLower = article.slug.toLowerCase();
  const titleStr = article.title;
  const tagsStr = article.tags.join(" ");

  for (const rule of RULES) {
    const slugMatch = rule.slugPatterns.find((p) => p.test(slugLower));
    const titleMatch = rule.titlePatterns.find((p) => p.test(titleStr));
    const tagMatch = rule.tagPatterns.find((p) => p.test(tagsStr));

    if (slugMatch || titleMatch || tagMatch) {
      const reasons: string[] = [];
      if (slugMatch) reasons.push(`slug 含「${slugMatch.source}」`);
      if (titleMatch) reasons.push(`標題含「${titleMatch.source}」`);
      if (tagMatch) reasons.push(`標籤含「${tagMatch.source}」`);
      return { template: rule.template, reason: reasons.join("、") };
    }
  }

  // 預設為標準封面
  return { template: "standard", reason: "無特殊關鍵字，歸入標準封面" };
}

// ── 主程式 ────────────────────────────────────────────────────────
function main() {
  const blogPostsDir = path.join(__dirname, "blog-posts");
  const files = fs
    .readdirSync(blogPostsDir)
    .filter((f) => f.endsWith(".json"))
    .sort((a, b) => {
      // 依 article-N 的 N 排序
      const na = parseInt(a.match(/article-(\d+)/)?.[1] ?? "0", 10);
      const nb = parseInt(b.match(/article-(\d+)/)?.[1] ?? "0", 10);
      return na - nb;
    });

  const results: Array<{
    fileNo: number;
    filename: string;
    article: ArticleData;
    template: CoverTemplate;
    reason: string;
  }> = [];

  for (const filename of files) {
    const filePath = path.join(blogPostsDir, filename);
    const raw = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const article: ArticleData = {
      slug: raw.slug ?? "",
      title: raw.title ?? "",
      category: raw.category ?? "",
      tags: Array.isArray(raw.tags) ? raw.tags : [],
      coverImageUrl: raw.coverImageUrl ?? "",
    };

    const { template, reason } = classify(article);
    const fileNo = parseInt(filename.match(/article-(\d+)/)?.[1] ?? "0", 10);

    results.push({ fileNo, filename, article, template, reason });
  }

  // ── 統計摘要 ──────────────────────────────────────────────────
  const stats: Record<CoverTemplate, number> = {
    standard: 0,
    chart: 0,
    checklist: 0,
    timeline: 0,
    quote: 0,
    vs: 0,
  };
  for (const r of results) stats[r.template]++;

  // ── 輸出 Markdown ─────────────────────────────────────────────
  const lines: string[] = [];

  lines.push("# /blog 封面模板分類對照表");
  lines.push("");
  lines.push(`> 自動產生於 ${new Date().toISOString().slice(0, 10)}，共 ${results.length} 篇`);
  lines.push("> 分類邏輯依 slug / 標題 / 標籤關鍵字推斷，**請人工確認後再執行重新生成**");
  lines.push("");

  // 統計表
  lines.push("## 統計摘要");
  lines.push("");
  lines.push("| 模板 | 篇數 | 說明 |");
  lines.push("|---|---|---|");
  lines.push(`| ${TEMPLATE_LABELS.standard} | ${stats.standard} | 通用指南、總攻略、逐條拆解 |`);
  lines.push(`| ${TEMPLATE_LABELS.checklist} | ${stats.checklist} | 自評清單、自我檢核、FAQ |`);
  lines.push(`| ${TEMPLATE_LABELS.chart} | ${stats.chart} | TOP10 缺失、品管指標、數據排行 |`);
  lines.push(`| ${TEMPLATE_LABELS.timeline} | ${stats.timeline} | 90 天倒數、三階段、準備時程 |`);
  lines.push(`| ${TEMPLATE_LABELS.quote} | ${stats.quote} | 委員觀點、訪談故事 |`);
  lines.push(`| ${TEMPLATE_LABELS.vs} | ${stats.vs} | 對比分析、差異比較 |`);
  lines.push(`| **合計** | **${results.length}** | |`);
  lines.push("");

  // 各模板詳細列表
  const templateOrder: CoverTemplate[] = [
    "vs",
    "quote",
    "timeline",
    "checklist",
    "chart",
    "standard",
  ];

  for (const tmpl of templateOrder) {
    const group = results.filter((r) => r.template === tmpl);
    if (group.length === 0) continue;

    lines.push(`## ${TEMPLATE_LABELS[tmpl]}（${group.length} 篇）`);
    lines.push("");
    lines.push("| # | 文章 slug | 標題 | 機構類型 | 封面 SVG | 分類依據 |");
    lines.push("|---|---|---|---|---|---|");

    for (const r of group) {
      const svgFile = path.basename(r.article.coverImageUrl);
      lines.push(
        `| ${r.fileNo} | \`${r.article.slug}\` | ${r.article.title} | ${r.article.category} | \`${svgFile}\` | ${r.reason} |`
      );
    }

    lines.push("");
  }

  // 輸出至 stdout
  console.log(lines.join("\n"));
}

main();
