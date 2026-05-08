// 文章重點 → SVG 插圖計畫生成器
// 根據 ArticleKeypoints 產出 SVG 生成建議，供 svg-illustration skill 或 gen-article-svgs.py 使用

import type { ArticleKeypoints } from "./article-keypoints-extractor";

// ─── 輸出介面 ──────────────────────────────────────────────────────────────────

export type SvgTemplateType =
  | "cover"       // 封面圖 1200x630
  | "list3"       // 直列清單 3 項
  | "list4"       // 直列清單 4 項
  | "list5"       // 直列清單 5 項
  | "flow3"       // 流程圖 3 步驟
  | "flow4"       // 流程圖 4 步驟
  | "checklist"   // 檢核表（雙欄）
  | "categories"; // 2x2 分類卡片

export interface SvgPlanItem {
  /** 建議的 SVG 檔名（不含路徑） */
  filename: string;
  /** SVG 模板類型 */
  template: SvgTemplateType;
  /** 建議的 alt 文字 */
  alt: string;
  /** 插入位置建議（在哪個 H2 後面） */
  insertAfterSection: string;
  /** 填入內容的標題列表（每項的粗體主標） */
  labels: string[];
  /** 填入內容的說明列表（每項的說明文字） */
  descriptions: string[];
  /** SVG 圖表主標題（list/flow/checklist 頂部大字） */
  svgTitle?: string;
  /** SVG 副標題（flow/checklist/categories 用） */
  svgSubtitle?: string;
  /** 右側小標籤（list 每行右側 pill 上行；flow 底部 pill） */
  pills?: string[];
  /** 負責人標籤（list 每行右側 pill 下行） */
  responsibles?: string[];
}

export interface SvgPlan {
  slug: string;
  coverSvg: SvgPlanItem;
  inlineSvgs: SvgPlanItem[];
  /** 估計總字數 */
  charCount: number;
  /** 建議插圖總數（含封面） */
  totalSvgCount: number;
}

// ─── 模板選擇邏輯 ──────────────────────────────────────────────────────────────

/**
 * 根據 keyPoints 數量選擇最合適的 SVG 模板
 */
function chooseTemplate(keyPointCount: number, sectionTitle: string): SvgTemplateType {
  // FAQ 章節 → 不建議插圖（在解析時已跳過）
  if (sectionTitle.includes("FAQ") || sectionTitle.includes("常見問題")) return "list3";

  // 自查清單章節 → checklist
  if (sectionTitle.includes("清單") || sectionTitle.includes("checklist")) return "checklist";

  // 流程類章節 → flow
  if (
    sectionTitle.includes("步驟") ||
    sectionTitle.includes("流程") ||
    sectionTitle.includes("時程") ||
    sectionTitle.includes("時間軸")
  ) {
    return keyPointCount >= 4 ? "flow4" : "flow3";
  }

  // 依 keyPoints 數量選擇直列清單
  if (keyPointCount >= 5) return "list5";
  if (keyPointCount >= 4) return "list4";
  return "list3";
}

/**
 * 從 slug 和 section index 生成 SVG 檔名
 * 例：daycare-top10-deficiencies → daycare-top10-01-overview.svg
 */
function makeFilename(slug: string, index: number, label: string): string {
  // 取 slug 的前段（最多 20 字元）
  const slugPrefix = slug.replace(/[-_]\d{4}$/, "").slice(0, 24);
  const idx = String(index).padStart(2, "0");
  // 將 label 轉為安全 slug
  const labelSlug = label
    .replace(/[^\w\u4e00-\u9fff]/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 15);
  return `${slugPrefix}-${idx}-${labelSlug}.svg`;
}

// ─── 主要生成函式 ──────────────────────────────────────────────────────────────

export function keypointsToSvgPlan(kp: ArticleKeypoints): SvgPlan {
  const slugBase = kp.slug.replace(/[-_]\d{4}$/, "").slice(0, 20);

  // ── 封面圖 ─────────────────────────────────────────────────────────────────
  const coverSvg: SvgPlanItem = {
    filename: `${slugBase}-cover.svg`,
    template: "cover",
    alt: `${kp.title} 封面圖`,
    insertAfterSection: "cover",
    labels: [kp.title],
    descriptions: [kp.excerpt.slice(0, 60)],
  };

  // ── 內文插圖：依章節生成 ──────────────────────────────────────────────────
  const inlineSvgs: SvgPlanItem[] = [];
  let svgIndex = 1;

  // 計算每個章節應放幾張圖
  // 規則：每 300-500 字放 1 張，至少每個 H2 章節 1 張
  const charPerSection = kp.stats.charCount / Math.max(kp.sections.length, 1);
  const svgsPerSection = Math.max(1, Math.round(charPerSection / 400));

  for (const section of kp.sections) {
    // FAQ、延伸閱讀章節跳過
    if (
      section.title.includes("FAQ") ||
      section.title.includes("延伸閱讀") ||
      section.title.includes("常見問題")
    ) continue;

    const kps = section.keyPoints;

    if (kps.length === 0) {
      // 無 keyPoints 的章節：建議 1 張 list3 佔位
      inlineSvgs.push({
        filename: makeFilename(kp.slug, svgIndex++, section.title),
        template: "list3",
        alt: `${section.title} 示意圖`,
        insertAfterSection: section.title,
        labels: [section.title],
        descriptions: [],
      });
      continue;
    }

    // 有 keyPoints：最多分 2 張（避免內容過少的假圖）
    const maxSvgs = Math.min(svgsPerSection, 2);
    const chunkSize = Math.ceil(kps.length / maxSvgs);

    for (let i = 0; i < Math.min(maxSvgs, Math.ceil(kps.length / chunkSize)); i++) {
      const chunk = kps.slice(i * chunkSize, (i + 1) * chunkSize);
      if (chunk.length === 0) break;

      const template = chooseTemplate(chunk.length, section.title);
      const labels = chunk.map((p) =>
        p.articleRef ? `${p.articleRef} ${p.title}` : p.title
      );
      const descriptions = chunk.map((p) => p.description.slice(0, 40));
      const pills = chunk.map((p) => p.articleRef ?? `第${(p.rank ?? 0) || (kps.indexOf(p) + 1)}項`);
      const responsibles = chunk.map((p) => p.responsible ?? "");

      // svgTitle：章節名稱（流程/清單類用描述性標題）
      const isFlow = template === "flow3" || template === "flow4";
      const svgTitle = isFlow
        ? section.title.slice(0, 20)
        : `${kp.category}評鑑 — ${section.title.slice(0, 12)}`;
      const svgSubtitle = isFlow ? `${kp.category}評鑑準備重點` : "";

      inlineSvgs.push({
        filename: makeFilename(kp.slug, svgIndex++, `${section.title.slice(0, 8)}-${i + 1}`),
        template,
        alt: `${section.title} ${i > 0 ? `（${i + 1}）` : ""}示意圖`,
        insertAfterSection: section.title,
        labels,
        descriptions,
        svgTitle,
        svgSubtitle,
        pills,
        responsibles,
      });
    }
  }

  // ── 自查清單插圖（若有 checklistItems） ────────────────────────────────────
  if (kp.checklistItems.length > 0) {
    inlineSvgs.push({
      filename: makeFilename(kp.slug, svgIndex++, "checklist"),
      template: "checklist",
      alt: `${kp.title} 自查清單`,
      insertAfterSection: "自查清單",
      labels: kp.checklistItems.slice(0, 10),
      descriptions: [],
      svgTitle: `${kp.category}評鑑自查清單`,
      svgSubtitle: "評鑑前必備確認項目",
    });
  }

  return {
    slug: kp.slug,
    coverSvg,
    inlineSvgs,
    charCount: kp.stats.charCount,
    totalSvgCount: 1 + inlineSvgs.length,
  };
}

/** 將 SvgPlan 格式化為人類可讀的文字報告 */
export function formatSvgPlanReport(plan: SvgPlan): string {
  const lines: string[] = [
    `📸 SVG 插圖計畫：${plan.slug}`,
    `   總字數：${plan.charCount} 字`,
    `   建議插圖：${plan.totalSvgCount} 張（含封面 1 張 + 內文 ${plan.inlineSvgs.length} 張）`,
    "",
    `封面圖：`,
    `  ${plan.coverSvg.filename}  [${plan.coverSvg.template}]`,
    "",
    `內文插圖：`,
  ];

  for (const svg of plan.inlineSvgs) {
    lines.push(`  ${String(lines.length - 5).padStart(2, "0")}. ${svg.filename}`);
    lines.push(`      模板：${svg.template}`);
    lines.push(`      插入位置：${svg.insertAfterSection}`);
    lines.push(`      內容：${svg.labels.slice(0, 3).join("、")}${svg.labels.length > 3 ? "…" : ""}`);
  }

  return lines.join("\n");
}
