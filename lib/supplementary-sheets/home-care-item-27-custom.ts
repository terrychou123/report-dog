/**
 * 居家照顧評鑑項目 27「服務品質改善」自訂補充分頁
 *
 * 產生 2 個工作分頁：
 *   1. 品質改善計畫（純條文 NC=2，PDCA 架構）
 *   2. 品質指標目標表（4 欄）
 *
 * 法源依據：
 *   - 長期照顧服務機構評鑑基準（品質管理）
 *   - 衛生福利部長照服務品質評估指標
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

// ─── Sheet 1：品質改善計畫（純條文 NC=2）────────────────────────────────────
function buildQualityImprovementPlanSheet(): SheetData {
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

  push(["___________居家服務機構　中華民國___年度服務品質改善計畫", ""], TITLE_ROW_HEIGHT);
  setTitleRow(cs, merge, r - 1, NC);

  push(["制定日期：中華民國　　年　　月　　日　　版次：第 1 版　　核定人：___________", ""], DATA_ROW_BASE_HEIGHT);
  setMergedData(cs, merge, r - 1, NC);

  push(["第一章　計畫目標與範圍", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const chap1: [string, string, number][] = [
    ["第一條\n（計畫目標）",
      "本年度服務品質改善計畫以「提升個案滿意度、降低緊急事件發生率、確保服務紀錄完整性」為三大核心目標，採 PDCA（計畫-執行-查核-改善）循環持續推動品質提升。",
      rowH(3)],
    ["第二條\n（適用範圍）",
      "本計畫適用於本機構提供之所有居家服務，涵蓋照顧服務員執行面、督導管理面及行政作業面。品質指標詳見「品質指標目標表」分頁。",
      rowH(3)],
  ];
  chap1.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["第二章　年度改善行動計畫（PDCA）", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const chap2: [string, string, number][] = [
    ["P（計畫）\n問題識別",
      "每年一月：\n一、彙整上年度品質指標數據、申訴案件、緊急事件及滿意度調查結果。\n二、針對未達目標之指標，進行根本原因分析（RCA）。\n三、依優先順序訂定本年度改善主題及行動計畫（含負責人、完成時程）。",
      rowH(7)],
    ["D（執行）\n改善推動",
      "二月至九月：\n一、依行動計畫執行改善措施（如加強訓練、調整 SOP、改善排班制度等）。\n二、每季（三月、六月、九月）追蹤品質指標數據，由督導員填寫「品質改善計畫執行追蹤表」，提交主管審閱。",
      rowH(6)],
    ["C（查核）\n成效評估",
      "十月至十一月：\n一、辦理年度滿意度調查（覆蓋率應達服務個案之七成以上）。\n二、彙整全年品質指標實際達成情形，計算達成率。\n三、召開品質改善年度檢討會議，分析各指標達標情形及改善成效。",
      rowH(6)],
    ["A（改善）\n標準化與滾動",
      "十二月：\n一、已達目標之改善措施，納入機構 SOP 或規定予以標準化。\n二、未達目標之指標，分析原因後納入次年度改善計畫。\n三、完成次年度品質改善計畫草案，送主管核定。",
      rowH(6)],
  ];
  chap2.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["第三章　附則", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  push(["第三條\n（修訂）",
    "本計畫由機構負責人核定後實施，修訂時亦同。"], rowH(2));
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  push(["負責人簽章：___________　　日期：中華民國　　年　　月　　日", ""], DATA_ROW_BASE_HEIGHT);
  setMergedData(cs, merge, r - 1, NC);

  return {
    name: "品質改善計畫",
    data,
    config: { columnlen: { "0": 180, "1": 680 }, rowlen, merge },
    cellStyles: cs,
  };
}

// ─── Sheet 2：品質指標目標表（4 欄）─────────────────────────────────────────
function buildQualityIndicatorsTableSheet(): SheetData {
  const NC = 4;
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

  push(["___________居家服務機構　中華民國___年度品質指標目標表"], TITLE_ROW_HEIGHT);
  merge[`${r - 1}_0`] = { r: r - 1, c: 0, rs: 1, cs: NC };
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true };

  push(["說明：以下為本年度追蹤之品質指標、計算方式及目標值，每季彙整數據後填入「品質改善計畫執行追蹤表」。"], rowH(2));
  merge[`${r - 1}_0`] = { r: r - 1, c: 0, rs: 1, cs: NC };
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, tb: 2 };

  const headers = ["品質指標名稱", "計算方式", "基準值（上年度/預估）", "本年目標值"];
  push(headers, SECTION_HEADER_HEIGHT);
  for (let c = 0; c < NC; c++) cs[`${r - 1}_${c}`] = { ht: 0, vt: 0, bold: true, bg: "#EFEFEF" };

  const indicators = [
    ["個案滿意度", "滿意度問卷總分 ÷ 問卷份數（%）", "___分", "≥85 分"],
    ["照服員出勤準時率", "準時到達次數 ÷ 服務總次數（%）", "___%", "≥95%"],
    ["服務紀錄完整率", "無缺漏紀錄份數 ÷ 抽查總份數（%）", "___%", "≥98%"],
    ["緊急事件發生率", "緊急事件次數 ÷ 服務人日數（次/百人日）", "___次", "≤ 上年度水準"],
    ["申訴案件處理及時率", "七日內回覆件數 ÷ 申訴總件數（%）", "___%", "100%"],
    ["人員留任率（照服員）", "年底在職人數 ÷ 年初在職人數（%）", "___%", "≥80%"],
    ["督導訪視達標率", "實際訪視次數 ÷ 計畫訪視次數（%）", "___%", "≥95%"],
  ];
  indicators.forEach((row) => {
    push(row, DATA_ROW_BASE_HEIGHT);
    for (let c = 0; c < NC; c++) cs[`${r - 1}_${c}`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["負責人簽章：___________　　日期：中華民國　　年　　月　　日"], DATA_ROW_BASE_HEIGHT);
  merge[`${r - 1}_0`] = { r: r - 1, c: 0, rs: 1, cs: NC };
  cs[`${r - 1}_0`] = { ht: 0, vt: 0 };

  return {
    name: "品質指標目標表",
    data,
    config: { columnlen: { "0": 180, "1": 240, "2": 180, "3": 140 }, rowlen, merge },
    cellStyles: cs,
  };
}

/** 產生項目 27「服務品質改善」的 2 個自訂補充分頁 */
export function buildHomeCareItem27CustomSheets(): SheetData[] {
  return [
    buildQualityImprovementPlanSheet(),
    buildQualityIndicatorsTableSheet(),
  ];
}
