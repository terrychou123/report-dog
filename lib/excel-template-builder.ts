/**
 * Builds FortuneSheet-compatible SheetData[] JSON for evaluation template items.
 * The JSON is stored in report_templates.content with fileType='excel'.
 * FortuneEditor (components/fortune-editor-inner.tsx) reads this format directly.
 *
 * Each item produces:
 *   Sheet 0: "檢核表" — the self-assessment checklist (original format)
 *   Sheet 1+: supplementary document templates derived from criteria descriptions
 */
import type { SupplementarySheetDef } from './supplementary-sheet-types';

const MAX_SHEET_NAME_LENGTH = 20;
export function truncateSheetName(name: string): string {
  return name.length > MAX_SHEET_NAME_LENGTH ? name.slice(0, MAX_SHEET_NAME_LENGTH) : name;
}

export type SheetData = {
  name: string;
  data: string[][];
  config?: {
    columnlen?: Record<string, number>;
    rowlen?: Record<string, number>;
    merge?: Record<string, { r: number; c: number; rs: number; cs: number }>;
  };
  cellStyles?: Record<string, { fc?: string; bg?: string; bold?: boolean; ht?: number; vt?: number; tb?: number }>;
};

export type EvaluationItem = {
  id: number;
  title: string;
  responsible: string;
  criteria: string[];
  reviewMethod: string;
  /** 可選附件提示，會填入「佐證資料」欄位 */
  attachments?: string[];
  /** 準備要訣，由種子腳本從 lib/evaluation-tips 注入 */
  tip?: string;
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

// 取消底色：不設定底色常數（預設白底）
// 取消特殊字色：不設定字色（預設黑色）
const HEADER_ROW_HEIGHT = 26;
const DATA_ROW_BASE_HEIGHT = 30;
const CRITERIA_LINE_HEIGHT = 18;

// 準備要訣列每行估計字元數（依總欄寬 ~1106px，每中文字約 14px，含內距）
const TIP_CHARS_PER_LINE = 50;
// 準備要訣列最小高度
const TIP_ROW_MIN_HEIGHT = 36;

/**
 * Builds a single SheetData representing one evaluation template item.
 * Layout: [Header row] [Data row] [Review method row] [準備要訣 row (optional)]
 *
 * 對齊規則：
 * - Header 全部置中（ht:0）
 * - Data 大部分置中，但 col 2（基準說明）靠左（ht:1）
 * - 審查方式列：靠左（ht:1），合併 7 欄
 * - 準備要訣列：靠左（ht:1），淺綠底，自動換行（tb:2），合併 7 欄（有 tip 時才加入）
 */
export function buildItemSheetData(item: EvaluationItem): SheetData {
  const COLS = 7;

  // Row 0: 表頭列
  const headers = ["代碼", "基準", "基準說明（符合項目）", "自評結果", "佐證資料", "改善計畫", "備註"];

  // Row 1: 資料列 — 基準說明以換行分隔各評鑑項目
  const criteriaText = item.criteria.map((c, i) => `${i + 1}. ${c}`).join("\n");
  // 若有附件提示，填入「佐證資料」欄位（column 4）
  const attachmentText = item.attachments?.length
    ? item.attachments.map((a, i) => `${i + 1}. ${a}`).join("\n")
    : "";
  const dataRow = [String(item.id), item.title, criteriaText, "", attachmentText, "", ""];

  // Row 2: 審查方式列（合併 7 欄）
  const reviewRow = [`審查方式：${item.reviewMethod}`, "", "", "", "", "", ""];

  const data: string[][] = [headers, dataRow, reviewRow];

  const cellStyles: Record<string, { fc?: string; bg?: string; ht?: number; vt?: number; tb?: number }> = {};

  // 表頭列：全部置中
  for (let c = 0; c < COLS; c++) {
    cellStyles[`0_${c}`] = { ht: 0, vt: 0 };
  }

  // 資料列：大部分置中，基準說明（col 2）靠左
  for (let c = 0; c < COLS; c++) {
    cellStyles[`1_${c}`] = c === 2
      ? { ht: 1, vt: 0, tb: 2 }   // 基準說明靠左、自動換行
      : { ht: 0, vt: 0 };          // 其他欄位置中
  }

  // 審查方式列：靠左
  cellStyles["2_0"] = { ht: 1, vt: 0 };

  const mergeConfig: Record<string, { r: number; c: number; rs: number; cs: number }> = {
    "2_0": { r: 2, c: 0, rs: 1, cs: COLS },
  };

  const rowlen: Record<string, number> = {
    "0": HEADER_ROW_HEIGHT,
    "1": Math.max(DATA_ROW_BASE_HEIGHT, item.criteria.length * CRITERIA_LINE_HEIGHT),
    "2": HEADER_ROW_HEIGHT,
  };

  // 準備要訣列（條件性）：有 tip 時才加入 Row 3
  if (item.tip) {
    const tipText = `準備要訣：${item.tip}`;
    data.push([tipText, "", "", "", "", "", ""]);

    // 靠左、淺綠底、自動換行（tb:2）
    cellStyles["3_0"] = { ht: 1, vt: 0, bg: "#e8f5e9", tb: 2 };

    mergeConfig["3_0"] = { r: 3, c: 0, rs: 1, cs: COLS };

    // 依文字長度動態計算列高
    const estimatedLines = Math.ceil(tipText.length / TIP_CHARS_PER_LINE);
    rowlen["3"] = Math.max(TIP_ROW_MIN_HEIGHT, estimatedLines * CRITERIA_LINE_HEIGHT);
  }

  return {
    name: "檢核表",
    data,
    config: {
      columnlen: COL_WIDTHS,
      rowlen,
      merge: mergeConfig,
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

// ─── Supplementary sheet builder ──────────────────────────────────────────────


/**
 * Default column widths per archetype (pixels). Applied when ColumnDef.width is absent.
 */
const ARCHETYPE_DEFAULT_COL_WIDTH: Record<string, number> = {
  'daily-record': 110,
  'case-assessment': 130,
  'inspection-checklist': 120,
  'incident-log': 120,
  'meeting-minutes': 140,
  'training-record': 130,
  'inventory-list': 130,
  'care-plan': 140,
};

/**
 * Builds a single supplementary document template SheetData from a SupplementarySheetDef.
 * Layout: [Title row] [Header row] [prefillRows empty data rows]
 */
export function buildSupplementarySheetData(
  def: SupplementarySheetDef,
): SheetData {
  const cols = def.columns;
  const numCols = cols.length;
  const prefillRows = def.prefillRows ?? 5;

  // Row 0: title (merged across all columns)
  const titleRow = cols.map((_, i) => (i === 0 ? def.sheetName : ""));

  // Row 1: column headers
  const headerRow = cols.map((c) => c.header);

  // Data rows
  const dataRows: string[][] = Array.from({ length: prefillRows }, () =>
    Array(numCols).fill("")
  );

  // Apply prefillCells into data rows
  if (def.prefillCells) {
    for (const cell of def.prefillCells) {
      if (cell.row < dataRows.length && cell.col < numCols) {
        dataRows[cell.row][cell.col] = cell.value;
      }
    }
  }

  const data: string[][] = [titleRow, headerRow, ...dataRows];

  const cellStyles: Record<string, { fc?: string; bg?: string; ht?: number; vt?: number; bold?: boolean; tb?: number }> = {};

  // Title row: 置中（無底色）
  cellStyles["0_0"] = { ht: 0, vt: 0 };

  // Header row: 置中，黑色字（無底色）
  for (let c = 0; c < numCols; c++) {
    cellStyles[`1_${c}`] = { ht: 0, vt: 0 };
  }

  const defaultColWidth = ARCHETYPE_DEFAULT_COL_WIDTH[def.archetype] ?? 120;
  const columnlen: Record<string, number> = {};
  cols.forEach((col, i) => {
    columnlen[String(i)] = col.width ?? defaultColWidth;
  });

  const rowlen: Record<string, number> = {
    "0": HEADER_ROW_HEIGHT,
    "1": HEADER_ROW_HEIGHT,
  };
  for (let r = 0; r < prefillRows; r++) {
    rowlen[String(2 + r)] = DATA_ROW_BASE_HEIGHT;
  }

  return {
    name: truncateSheetName(def.sheetName),
    data,
    config: {
      columnlen,
      rowlen,
      merge: {
        "0_0": { r: 0, c: 0, rs: 1, cs: numCols },
      },
    },
    cellStyles,
  };
}

/**
 * Builds a complete multi-sheet workbook for one evaluation item.
 * Returns [檢核表, ...supplementary sheets].
 * If defs is empty or undefined, returns just the checklist sheet.
 */
export function buildItemMultiSheetData(
  item: EvaluationItem,
  defs: SupplementarySheetDef[] = [],
): SheetData[] {
  const checklist = buildItemSheetData(item);
  const supplementary = defs.map((def) => buildSupplementarySheetData(def));
  return [checklist, ...supplementary];
}
