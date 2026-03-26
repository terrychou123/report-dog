/**
 * Builds FortuneSheet-compatible SheetData[] JSON for evaluation template items.
 * The JSON is stored in report_templates.content with fileType='excel'.
 * FortuneEditor (components/fortune-editor-inner.tsx) reads this format directly.
 */

export type SheetData = {
  name: string;
  data: string[][];
  config?: {
    columnlen?: Record<string, number>;
    rowlen?: Record<string, number>;
    merge?: Record<string, { r: number; c: number; rs: number; cs: number }>;
  };
  cellStyles?: Record<string, { fc?: string; bg?: string; bold?: boolean; ht?: number; vt?: number }>;
};

export type EvaluationItem = {
  id: number;
  title: string;
  responsible: string;
  criteria: string[];
  reviewMethod: string;
};

// Column widths in pixels (matching excel-checklist-builder.ts ratios)
const COL_WIDTHS: Record<string, number> = {
  "0": 84,   // 代碼 (12 chars)
  "1": 196,  // 基準 (28 chars)
  "2": 434,  // 基準說明 (62 chars)
  "3": 84,   // 自評結果 (12 chars)
  "4": 154,  // 佐證資料 (22 chars)
  "5": 154,  // 改善計畫 (22 chars)
  "6": 126,  // 備註 (18 chars)
};

const HEADER_BG = "#4472C4";
const HEADER_FC = "#FFFFFF";
const SUBHEADER_BG = "#FCE4D6";
const TITLE_ROW_HEIGHT = 34;
const HEADER_ROW_HEIGHT = 26;
const DATA_ROW_BASE_HEIGHT = 30;
const CRITERIA_LINE_HEIGHT = 18;

/**
 * Builds a single SheetData representing one evaluation template item.
 * Layout: [Title row (merged A-G)] [Header row] [Criteria rows...] [Review method row]
 */
export function buildItemSheetData(item: EvaluationItem): SheetData {
  const COLS = 7;

  // Row 0: title (merged across all columns)
  const titleText = item.title;

  // Row 1: column headers
  const headers = ["代碼", "基準", "基準說明（符合項目）", "自評結果", "佐證資料", "改善計畫", "備註"];

  // Row 2: data row — criteria joined by newlines in column C
  const criteriaText = item.criteria.map((c, i) => `${i + 1}. ${c}`).join("\n");
  const dataRow = [String(item.id), item.title, criteriaText, "", "", "", ""];

  // Row 3: review method subheader
  const reviewRow = [`審查方式：${item.reviewMethod}`, "", "", "", "", "", ""];

  const data: string[][] = [
    Array(COLS).fill("").map((_, i) => (i === 0 ? titleText : "")),
    headers,
    dataRow,
    reviewRow,
  ];

  const cellStyles: Record<string, { fc?: string; bg?: string; ht?: number; vt?: number }> = {};

  // Title row: merged, centered, bold bg
  cellStyles["0_0"] = { bg: SUBHEADER_BG, ht: 0, vt: 1 };

  // Header row: blue bg, white text, centered
  for (let c = 0; c < COLS; c++) {
    cellStyles[`1_${c}`] = { bg: HEADER_BG, fc: HEADER_FC, ht: 0, vt: 1 };
  }

  // Review row: peach bg, spanning
  cellStyles["3_0"] = { bg: SUBHEADER_BG, vt: 1 };

  const rowlen: Record<string, number> = {
    "0": TITLE_ROW_HEIGHT,
    "1": HEADER_ROW_HEIGHT,
    "2": Math.max(DATA_ROW_BASE_HEIGHT, item.criteria.length * CRITERIA_LINE_HEIGHT),
    "3": HEADER_ROW_HEIGHT,
  };

  return {
    name: item.title.length > 20 ? item.title.slice(0, 20) : item.title,
    data,
    config: {
      columnlen: COL_WIDTHS,
      rowlen,
      merge: {
        "0_0": { r: 0, c: 0, rs: 1, cs: COLS },
        "3_0": { r: 3, c: 0, rs: 1, cs: COLS },
      },
    },
    cellStyles,
  };
}

/**
 * Builds SheetData[] for a group of items under the same responsible person.
 * Each item gets its own sheet tab.
 */
export function buildResponsibleGroupSheetData(items: EvaluationItem[]): SheetData[] {
  return items.map((item) => buildItemSheetData(item));
}

/**
 * Serializes SheetData[] to JSON string for storage in report_templates.content
 */
export function serializeSheetData(sheets: SheetData[]): string {
  return JSON.stringify(sheets);
}
