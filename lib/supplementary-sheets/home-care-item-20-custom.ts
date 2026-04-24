/**
 * 居家照顧評鑑項目 20「人員績效管理」自訂補充分頁
 *
 * 產生 2 個工作分頁：
 *   1. 人員考核制度（純條文 NC=2）
 *   2. 評核項目表（5 欄評核標準清單）
 *
 * 法源依據：
 *   - 勞動基準法（考核制度不得違反解僱保護規定）
 *   - 長期照顧服務機構設立許可及管理辦法 §15（人員管理）
 *   - 長期照顧服務機構評鑑基準（人員績效管理）
 */
import type { SheetData } from "../excel-template-builder";

const TITLE_ROW_HEIGHT = 32;
const SECTION_HEADER_HEIGHT = 26;
const DATA_ROW_BASE_HEIGHT = 30;

type CellStyleMap = Record<string, { fc?: string; bg?: string; bold?: boolean; ht?: number; vt?: number; tb?: number }>;
type MergeMap = Record<string, { r: number; c: number; rs: number; cs: number }>;

function rowH(numLines: number): number {
  return Math.max(DATA_ROW_BASE_HEIGHT, numLines * 20 + 10);
}

function setTitleRow(cs: CellStyleMap, merge: MergeMap, r: number, nc: number) {
  cs[`${r}_0`] = { ht: 0, vt: 0, bold: true };
  merge[`${r}_0`] = { r, c: 0, rs: 1, cs: nc };
}

function setSectionHeader(cs: CellStyleMap, merge: MergeMap, r: number, nc: number) {
  cs[`${r}_0`] = { ht: 0, vt: 0, bold: true, bg: "#EFEFEF" };
  merge[`${r}_0`] = { r, c: 0, rs: 1, cs: nc };
}

function setMergedData(cs: CellStyleMap, merge: MergeMap, r: number, nc: number) {
  cs[`${r}_0`] = { ht: 0, vt: 0, tb: 2 };
  merge[`${r}_0`] = { r, c: 0, rs: 1, cs: nc };
}

// ─── Sheet 1：人員考核制度（純條文 NC=2）────────────────────────────────────
function buildPerformanceSystemSheet(): SheetData {
  const NC = 2;
  const data: string[][] = [];
  const cs: CellStyleMap = {};
  const merge: MergeMap = {};
  const rowlen: Record<string, number> = {};
  let r = 0;

  const push = (row: string[], height: number) => {
    data.push(row);
    rowlen[String(r)] = height;
    r++;
  };

  push(["___________居家服務機構　人員考核制度及評核標準", ""], TITLE_ROW_HEIGHT);
  setTitleRow(cs, merge, r - 1, NC);

  push(["制定日期：中華民國　　年　　月　　日　　版次：第 1 版　　核定人：___________", ""], DATA_ROW_BASE_HEIGHT);
  setMergedData(cs, merge, r - 1, NC);

  push(["第一章　總則", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const chap1: [string, string, number][] = [
    ["第一條\n（目的）",
      "為激勵人員積極提升服務品質，建立公平、透明之績效評核機制，並作為人員晉用、獎懲、訓練及調整之依據，制定本制度。",
      rowH(3)],
    ["第二條\n（適用對象）",
      "本制度適用於本機構全體正式員工（含督導員、照顧服務員、行政人員）。試用期人員另依試用期評估規定辦理。",
      rowH(3)],
  ];
  chap1.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["第二章　考核頻率與方式", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const chap2: [string, string, number][] = [
    ["第三條\n（定期考核）",
      "每年辦理一次年度考核（以每年十二月為考核基準期），由直屬督導員或業務負責人進行，考核結果應於次年一月底前完成並告知受考核人員。",
      rowH(3)],
    ["第四條\n（試用期考核）",
      "新進人員到職後三個月為試用期，試用期屆滿前由督導員完成試用期評估，結果分為「通過試用期」或「延長試用期（最長再一個月）」，並告知當事人。",
      rowH(4)],
    ["第五條\n（考核方式）",
      "考核方式包括：\n一、直屬督導員評分（占 50%）：依督導訪視紀錄及日常服務觀察。\n二、個案或家屬滿意度（占 30%）：取自年度滿意度調查中對個別照服員之評項。\n三、訓練出席與時數（占 20%）：依教育訓練記錄表統計。\n評核項目及配分詳見「評核項目表」分頁。",
      rowH(7)],
  ];
  chap2.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["第三章　考核結果與運用", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const chap3: [string, string, number][] = [
    ["第六條\n（成績等級）",
      "考核總分等級如下：\n・優等（90 分以上）：列入晉薪、獎勵之優先考量。\n・甲等（80–89 分）：維持現況。\n・乙等（70–79 分）：提供輔導計畫，三個月後複評。\n・丙等（60–69 分）：進入績效改善計畫（PIP），主管每月輔導，三個月後複評。\n・丁等（60 分以下）：依情節嚴重程度給予書面警告或依《勞動基準法》辦理終止勞動契約程序。",
      rowH(9)],
    ["第七條\n（考核結果\n告知）",
      "考核完成後，督導員應與受考核人員進行一對一面談，說明考核結果、優點及待改進事項，受考核人員應於考核表上簽名確認（如有異議，得於七日內以書面提出申覆）。",
      rowH(4)],
  ];
  chap3.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["第四章　附則", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  push(["第八條\n（修訂）",
    "本制度由機構負責人核定後實施，修訂時亦同。",
    rowH(2)]);
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  push(["負責人簽章：___________　　日期：中華民國　　年　　月　　日", ""], DATA_ROW_BASE_HEIGHT);
  setMergedData(cs, merge, r - 1, NC);

  return {
    name: "人員考核制度",
    data,
    config: { columnlen: { "0": 180, "1": 680 }, rowlen, merge },
    cellStyles: cs,
  };
}

// ─── Sheet 2：評核項目表（5 欄）──────────────────────────────────────────────
function buildPerformanceCriteriaSheet(): SheetData {
  const NC = 5;
  const data: string[][] = [];
  const cs: CellStyleMap = {};
  const merge: MergeMap = {};
  const rowlen: Record<string, number> = {};
  let r = 0;

  const push = (row: string[], height: number) => {
    data.push(row);
    rowlen[String(r)] = height;
    r++;
  };

  push(["___________居家服務機構　人員考核評核項目表"], TITLE_ROW_HEIGHT);
  merge[`${r - 1}_0`] = { r: r - 1, c: 0, rs: 1, cs: NC };
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true };

  push(["說明：各項目採五點量表（5=優秀、4=良好、3=尚可、2=待改進、1=不佳），總分為各項加權後之百分制分數。"], rowH(3));
  merge[`${r - 1}_0`] = { r: r - 1, c: 0, rs: 1, cs: NC };
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, tb: 2 };

  const tableHeaders = ["評核向度", "評核項目", "照服員（權重）", "督導員（權重）", "說明"];
  push(tableHeaders, SECTION_HEADER_HEIGHT);
  for (let c = 0; c < NC; c++) cs[`${r - 1}_${c}`] = { ht: 0, vt: 0, bold: true, bg: "#EFEFEF" };

  const criteria = [
    ["服務品質", "服務技術與正確執行率", "25%", "20%", "督導訪視觀察、個案回饋"],
    ["服務品質", "服務紀錄完整性與正確性", "15%", "10%", "紀錄抽查"],
    ["個案互動", "對個案的尊重與耐心", "20%", "15%", "個案/家屬滿意度"],
    ["出勤管理", "出勤準時及請假管理", "10%", "10%", "出勤紀錄"],
    ["團隊合作", "與督導員及同事之溝通協作", "10%", "15%", "督導員評分"],
    ["學習與成長", "訓練課程出席及學習態度", "10%", "10%", "訓練紀錄"],
    ["服務倫理", "個案隱私保護及規範遵守", "10%", "10%", "督導訪視觀察"],
    ["管理能力", "個案管理與資源協調（督導員專項）", "—", "10%", "主管評分"],
  ];

  criteria.forEach((row) => {
    push(row, DATA_ROW_BASE_HEIGHT);
    for (let c = 0; c < NC; c++) cs[`${r - 1}_${c}`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["負責人簽章：___________　　日期：中華民國　　年　　月　　日"], DATA_ROW_BASE_HEIGHT);
  merge[`${r - 1}_0`] = { r: r - 1, c: 0, rs: 1, cs: NC };
  cs[`${r - 1}_0`] = { ht: 0, vt: 0 };

  return {
    name: "評核項目表",
    data,
    config: { columnlen: { "0": 120, "1": 220, "2": 120, "3": 120, "4": 180 }, rowlen, merge },
    cellStyles: cs,
  };
}

/** 產生項目 20「人員績效管理」的 2 個自訂補充分頁 */
export function buildHomeCareItem20CustomSheets(): SheetData[] {
  return [
    buildPerformanceSystemSheet(),
    buildPerformanceCriteriaSheet(),
  ];
}
