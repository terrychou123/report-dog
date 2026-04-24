/**
 * FortuneSheet 版面工具包：提供客製補充分頁共用的樣式 helper、版面常數
 * 與高階 sheet builder，避免各 `daycare-item-*-custom.ts` 重複宣告。
 *
 * 適用於與 item-24 / item-45 風格一致的分頁（title + note + header + 資料列
 * 或政策條文列）。item-3 的定型化契約因使用不同版面（section-header 底色、
 * rowH 行高公式）保留各自的 local helper，不使用本模組。
 *
 * @see ./README.md — 兩條產線、兩種風格族群、cellStyles 欄位語意完整說明
 */
import type { SheetData } from "../excel-template-builder";

// ─── 型別 ────────────────────────────────────────────────────────────────────

export type CellStyleMap = Record<
  string,
  { fc?: string; bg?: string; bold?: boolean; ht?: number; vt?: number; tb?: number }
>;

export type MergeMap = Record<string, { r: number; c: number; rs: number; cs: number }>;

// ─── 版面常數（與 excel-template-builder 對齊） ──────────────────────────────

export const HEADER_ROW_HEIGHT = 26;
export const TITLE_ROW_HEIGHT = 30;
export const DATA_ROW_BASE_HEIGHT = 30;
export const NOTE_ROW_HEIGHT = 22;
export const POLICY_SECTION_HEIGHT = 54;
export const PIXELS_PER_BULLET_LINE = 24;
export const SECTION_ROW_PADDING = 16;

/** 以 bullet 條目數估算政策條文列的列高 */
export function sectionRowHeight(numBullets: number): number {
  return Math.max(POLICY_SECTION_HEIGHT, numBullets * PIXELS_PER_BULLET_LINE + SECTION_ROW_PADDING);
}

// ─── 列樣式 helper（就地改寫傳入的 cellStyles / merge） ──────────────────────

/** 主標題列：合併整列、置中、粗體 */
export function setTitleRow(
  cellStyles: CellStyleMap,
  merge: MergeMap,
  rowIndex: number,
  numCols: number,
) {
  cellStyles[`${rowIndex}_0`] = { ht: 0, vt: 0, bold: true };
  merge[`${rowIndex}_0`] = { r: rowIndex, c: 0, rs: 1, cs: numCols };
}

/** 說明列：合併整列、靠左、灰字、自動換行 */
export function setNoteRow(
  cellStyles: CellStyleMap,
  merge: MergeMap,
  rowIndex: number,
  numCols: number,
) {
  cellStyles[`${rowIndex}_0`] = { ht: 1, vt: 0, fc: "#666666", tb: 2 };
  merge[`${rowIndex}_0`] = { r: rowIndex, c: 0, rs: 1, cs: numCols };
}

/** 表頭列：全欄置中、粗體 */
export function setHeaderRow(cellStyles: CellStyleMap, rowIndex: number, numCols: number) {
  for (let c = 0; c < numCols; c++) {
    cellStyles[`${rowIndex}_${c}`] = { ht: 0, vt: 0, bold: true };
  }
}

/** 資料列：全欄靠左、上對齊、自動換行 */
export function setDataRow(cellStyles: CellStyleMap, rowIndex: number, numCols: number) {
  for (let c = 0; c < numCols; c++) {
    cellStyles[`${rowIndex}_${c}`] = { ht: 1, vt: 1, tb: 2 };
  }
}

/** 政策條文列：col 0 粗體標籤，col 1 合併到末欄作為內容區 */
export function setPolicyRow(
  cellStyles: CellStyleMap,
  merge: MergeMap,
  rowIndex: number,
  numCols: number,
) {
  cellStyles[`${rowIndex}_0`] = { ht: 1, vt: 1, bold: true, tb: 2 };
  cellStyles[`${rowIndex}_1`] = { ht: 1, vt: 1, tb: 2 };
  if (numCols > 2) {
    merge[`${rowIndex}_1`] = { r: rowIndex, c: 1, rs: 1, cs: numCols - 1 };
  }
}

// ─── 高階 sheet builder ─────────────────────────────────────────────────────

/**
 * 表格型分頁：Row 0 主標題、Row 1 說明、Row 2 表頭、Row 3+ 示範列 + 空白列。
 */
export function buildTableSheet(params: {
  sheetName: string;
  title: string;
  note: string;
  headers: string[];
  samples: string[][];
  blankRows: number;
  /** 空白列預填文字（如每欄預填「□正常」） */
  blankTemplate?: string[];
  columnWidths: number[];
}): SheetData {
  const numCols = params.headers.length;
  const data: string[][] = [];
  const cellStyles: CellStyleMap = {};
  const merge: MergeMap = {};
  const rowlen: Record<string, number> = {};

  data.push([params.title, ...Array(numCols - 1).fill("")]);
  setTitleRow(cellStyles, merge, 0, numCols);
  rowlen["0"] = TITLE_ROW_HEIGHT;

  data.push([params.note, ...Array(numCols - 1).fill("")]);
  setNoteRow(cellStyles, merge, 1, numCols);
  rowlen["1"] = NOTE_ROW_HEIGHT;

  data.push(params.headers);
  setHeaderRow(cellStyles, 2, numCols);
  rowlen["2"] = HEADER_ROW_HEIGHT;

  let rowIdx = 3;
  for (const sample of params.samples) {
    data.push(sample);
    setDataRow(cellStyles, rowIdx, numCols);
    rowlen[String(rowIdx)] = DATA_ROW_BASE_HEIGHT;
    rowIdx++;
  }
  const blank = params.blankTemplate ?? Array(numCols).fill("");
  for (let i = 0; i < params.blankRows; i++) {
    data.push([...blank]);
    setDataRow(cellStyles, rowIdx, numCols);
    rowlen[String(rowIdx)] = DATA_ROW_BASE_HEIGHT;
    rowIdx++;
  }

  const columnlen: Record<string, number> = {};
  params.columnWidths.forEach((w, i) => {
    columnlen[String(i)] = w;
  });

  return { name: params.sheetName, data, config: { columnlen, rowlen, merge }, cellStyles };
}

/**
 * 純政策條文分頁（固定 2 欄：規定事項 / 規定內容）。
 * Row 0 標題、Row 1 說明、Row 2 固定表頭、Row 3+ 每節 label + bullets。
 */
export function buildPolicyOnlySheet(params: {
  sheetName: string;
  title: string;
  note: string;
  sections: Array<{ label: string; bullets: string[] }>;
}): SheetData {
  const numCols = 2;
  const data: string[][] = [];
  const cellStyles: CellStyleMap = {};
  const merge: MergeMap = {};
  const rowlen: Record<string, number> = {};

  data.push([params.title, ""]);
  setTitleRow(cellStyles, merge, 0, numCols);
  rowlen["0"] = TITLE_ROW_HEIGHT;

  data.push([params.note, ""]);
  setNoteRow(cellStyles, merge, 1, numCols);
  rowlen["1"] = NOTE_ROW_HEIGHT;

  data.push(["規定事項", "規定內容"]);
  setHeaderRow(cellStyles, 2, numCols);
  rowlen["2"] = HEADER_ROW_HEIGHT;

  let rowIdx = 3;
  for (const s of params.sections) {
    const bulletText = s.bullets.map((b) => `• ${b}`).join("\n");
    data.push([s.label, bulletText]);
    cellStyles[`${rowIdx}_0`] = { ht: 1, vt: 1, bold: true, tb: 2 };
    cellStyles[`${rowIdx}_1`] = { ht: 1, vt: 1, tb: 2 };
    rowlen[String(rowIdx)] = sectionRowHeight(s.bullets.length);
    rowIdx++;
  }

  return {
    name: params.sheetName,
    data,
    config: { columnlen: { "0": 160, "1": 620 }, rowlen, merge },
    cellStyles,
  };
}
