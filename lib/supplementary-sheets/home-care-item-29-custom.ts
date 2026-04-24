/**
 * 居家照顧評鑑項目 29「品質監測機制」自訂補充分頁
 *
 * 產生 2 個工作分頁：
 *   1. 品質指標監測辦法（純條文 NC=2）
 *   2. 品質指標清單（5 欄）
 *
 * 法源依據：
 *   - 長期照顧服務機構評鑑基準（品質監測）
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

// ─── Sheet 1：品質指標監測辦法（純條文 NC=2）────────────────────────────────
function buildQualityMonitoringSheet(): SheetData {
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

  push(["___________居家服務機構　品質指標監測辦法", ""], TITLE_ROW_HEIGHT);
  setTitleRow(cs, merge, r - 1, NC);

  push(["制定日期：中華民國　　年　　月　　日　　版次：第 1 版　　核定人：___________", ""], DATA_ROW_BASE_HEIGHT);
  setMergedData(cs, merge, r - 1, NC);

  push(["第一章　總則", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const chap1: [string, string, number][] = [
    ["第一條\n（目的）",
      "為建立系統性之服務品質監測機制，及時發現服務問題並採取改善行動，確保居家服務品質持續提升，制定本辦法。監測指標清單詳見「品質指標清單」分頁。",
      rowH(3)],
    ["第二條\n（監測週期）",
      "品質指標監測以季為基本週期，每季結束後十五個工作日內完成數據彙整與呈報。年度總結報告應於次年一月底前完成。",
      rowH(3)],
  ];
  chap1.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["第二章　數據呈報機制", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const chap2: [string, string, number][] = [
    ["第三條\n（季報）",
      "每季結束後，督導員完成品質指標數據蒐集，填寫「品質指標季度彙整表」，包含：\n一、各指標之本季實際值。\n二、與上季及目標值之比較分析。\n三、未達目標指標之原因說明及初步改善措施建議。\n彙整表應提交業務負責人審閱，並存入品質管理資料夾。",
      rowH(7)],
    ["第四條\n（年度報告）",
      "每年十二月，由業務負責人召開年度品質監測檢討會議，完成年度品質指標總結報告，內容包括：\n一、全年各指標趨勢分析（圖表呈現）。\n二、達成目標之指標說明。\n三、未達目標指標之根本原因分析及次年改善計畫。\n年度報告應提交服務品質改善計畫，作為次年計畫依據。",
      rowH(8)],
  ];
  chap2.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["第三章　品質問題即時改善", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  push(["第五條\n（即時改善觸發）",
    "以下情形應觸發即時（非等待季報週期）改善行動：\n一、某指標單次數據明顯惡化（如本季相較上季下降超過 10%）。\n二、發生重大安全事件（如個案死亡、嚴重傷害）。\n三、收到多件類似申訴（三件以上相同類型申訴發生於同一個月）。\n督導員應於五個工作日內完成即時改善分析報告，提交主管核定後執行改善措施，並記錄於「品質問題改善行動追蹤表」。",
    rowH(9)]);
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  push(["第四章　附則", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  push(["第六條\n（修訂）",
    "本辦法由機構負責人核定後實施，修訂時亦同。",
    rowH(2)]);
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  push(["負責人簽章：___________　　日期：中華民國　　年　　月　　日", ""], DATA_ROW_BASE_HEIGHT);
  setMergedData(cs, merge, r - 1, NC);

  return {
    name: "品質指標監測辦法",
    data,
    config: { columnlen: { "0": 180, "1": 680 }, rowlen, merge },
    cellStyles: cs,
  };
}

// ─── Sheet 2：品質指標清單（5 欄）───────────────────────────────────────────
function buildMetricsListSheet(): SheetData {
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

  push(["___________居家服務機構　品質指標清單"], TITLE_ROW_HEIGHT);
  merge[`${r - 1}_0`] = { r: r - 1, c: 0, rs: 1, cs: NC };
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true };

  push(["說明：以下品質指標應每季蒐集數據，數據來源說明如各指標欄位。負責人員：督導員負責照護類指標，行政人員負責行政類指標。"], rowH(2));
  merge[`${r - 1}_0`] = { r: r - 1, c: 0, rs: 1, cs: NC };
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, tb: 2 };

  const headers = ["指標類別", "指標名稱", "計算公式", "資料來源", "目標值"];
  push(headers, SECTION_HEADER_HEIGHT);
  for (let c = 0; c < NC; c++) cs[`${r - 1}_${c}`] = { ht: 0, vt: 0, bold: true, bg: "#EFEFEF" };

  const metrics = [
    ["照護品質", "緊急事件發生率", "緊急事件次數 / 服務人日 × 100", "緊急事件通報記錄表", "逐年監測趨勢"],
    ["照護品質", "個案跌倒率", "跌倒事件次數 / 服務人日 × 100", "緊急事件通報記錄表", "逐年監測趨勢"],
    ["照護品質", "服務紀錄完整率", "無缺漏紀錄份數 / 抽查總份數 × 100%", "服務紀錄抽查", "≥98%"],
    ["服務流程", "訪視達標率", "實際訪視次數 / 計畫訪視次數 × 100%", "督導訪視記錄表", "≥95%"],
    ["服務流程", "個別服務計畫更新率", "按時更新計畫份數 / 應更新計畫總數 × 100%", "服務計畫清冊", "≥95%"],
    ["使用者回饋", "個案整體滿意度", "滿意度問卷平均分數（百分制）", "滿意度問卷（每半年）", "≥85 分"],
    ["人力資源", "照服員到班準時率", "準時到達次數 / 服務總次數 × 100%", "排班紀錄、服務紀錄", "≥95%"],
    ["人力資源", "照服員年留任率", "年底在職人數 / 年初在職人數 × 100%", "人員資料", "≥80%"],
    ["申訴處理", "申訴案件及時回覆率", "七日內回覆件數 / 申訴總件數 × 100%", "申訴案件記錄表", "100%"],
    ["感染管制", "手部衛生稽核合格率", "稽核合格人次 / 稽核總人次 × 100%", "手部衛生稽核表", "≥90%"],
  ];
  metrics.forEach((row) => {
    push(row, DATA_ROW_BASE_HEIGHT);
    for (let c = 0; c < NC; c++) cs[`${r - 1}_${c}`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["負責人簽章：___________　　日期：中華民國　　年　　月　　日"], DATA_ROW_BASE_HEIGHT);
  merge[`${r - 1}_0`] = { r: r - 1, c: 0, rs: 1, cs: NC };
  cs[`${r - 1}_0`] = { ht: 0, vt: 0 };

  return {
    name: "品質指標清單",
    data,
    config: { columnlen: { "0": 100, "1": 160, "2": 200, "3": 160, "4": 140 }, rowlen, merge },
    cellStyles: cs,
  };
}

/** 產生項目 29「品質監測機制」的 2 個自訂補充分頁 */
export function buildHomeCareItem29CustomSheets(): SheetData[] {
  return [
    buildQualityMonitoringSheet(),
    buildMetricsListSheet(),
  ];
}
