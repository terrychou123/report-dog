/**
 * 居家照顧評鑑項目 12「督導與訪視」自訂補充分頁
 *
 * 產生 1 個工作分頁：
 *   1. 居家服務督導制度（督導資格、職責、訪視頻率）
 *
 * 法源依據：
 *   - 長期照顧服務機構設立標準 §10 附件一（居家服務督導員配置：每 60 人設 1 名專任督導）
 *   - 照顧服務員技術士技能檢定規範（督導員資格）
 *   - 衛生福利部居家服務督導員工作手冊
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

function buildSupervisionSystemSheet(): SheetData {
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

  push(["___________居家服務機構　居家服務督導制度", ""], TITLE_ROW_HEIGHT);
  setTitleRow(cs, merge, r - 1, NC);

  push(["制定日期：中華民國　　年　　月　　日　　版次：第 1 版　　核定人：___________", ""], DATA_ROW_BASE_HEIGHT);
  setMergedData(cs, merge, r - 1, NC);

  push(["第一章　總則", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const chap1: [string, string, number][] = [
    ["第一條\n（目的）",
      "為確保居家服務品質、支持照顧服務員專業發展及保障個案安全，建立系統性督導機制，依《長期照顧服務機構設立標準》附件一人員配置規定，制定本制度。",
      rowH(3)],
    ["第二條\n（適用範圍）",
      "本制度適用於本機構全體居家服務督導員（以下簡稱督導員）及其所督導之照顧服務員。",
      rowH(2)],
  ];

  chap1.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["第二章　督導員資格與配置", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const chap2: [string, string, number][] = [
    ["第三條\n（督導員資格）",
      "督導員應符合下列資格之一：\n一、取得照顧服務員職類乙級技術士證（或訓練及格）並具備三年以上相關服務工作經驗。\n二、大專以上社會工作、護理、照顧服務員相關科系畢業，並具備二年以上相關服務工作經驗。\n三、護理師（士）資格。\n四、主管機關認定之其他同等資格。",
      rowH(8)],
    ["第四條\n（人力配置）",
      "依《長期照顧服務機構設立標準》附件一規定：\n每服務六十名使用者應置專任居家服務督導員一人，未滿六十名以六十名計算。\n業務負責人具督導員資格者，得以督導員身分與督導員人力合併計算，但不得影響業務負責人本身職責之執行。",
      rowH(5)],
    ["第五條\n（督導員名冊）",
      "機構應維持「督導員人員名冊」，記錄每位督導員之姓名、資格證書字號、到職日期及負責督導之照服員名單，並每季更新。",
      rowH(3)],
  ];

  chap2.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["第三章　督導員職責", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const chap3: [string, string, number][] = [
    ["第六條\n（個案管理職責）",
      "一、辦理新個案入案評估，協助建立個別服務計畫。\n二、定期評估個案需求變化，每半年至少一次重新評估並更新服務計畫。\n三、協調個案、家屬與照服員間之溝通。\n四、發生緊急事件時擔任第一聯絡窗口。",
      rowH(6)],
    ["第七條\n（照服員督導職責）",
      "一、辦理新進照服員職前教育訓練（含服務規範、安全守則、緊急處置）。\n二、依訪視頻率規定執行定期訪視。\n三、於訪視時進行服務品質查核、照服員工作指導及個案狀況確認。\n四、處理照服員反映之服務困難或緊急狀況。\n五、維護照服員服務紀錄之完整性與正確性。",
      rowH(7)],
    ["第八條\n（行政職責）",
      "一、按時完成督導訪視記錄並呈交主管。\n二、彙整申訴案件、緊急事件等紀錄，每季提出分析報告。\n三、協助評鑑準備，備齊督導相關佐證文件。",
      rowH(4)],
  ];

  chap3.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["第四章　訪視頻率規定", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const chap4: [string, string, number][] = [
    ["第九條\n（一般個案訪視）",
      "督導員對每一在案個案之訪視頻率：\n一、新入案個案：入案後一個月內完成首次督導訪視。\n二、一般個案：每三個月至少訪視一次（每年不少於四次）。\n三、高風險個案（獨居、重度失能、認知症等）：每個月至少訪視一次。\n訪視類型包括電話訪視、書面訪視及親自入戶訪視，但每年至少應有一次親自入戶訪視。",
      rowH(8)],
    ["第十條\n（新進照服員\n訪視）",
      "新進照服員到職後三個月內，督導員應每月至少完成一次入戶觀察，確認服務執行是否符合規範，提供即時指導與回饋，結果記錄於督導訪視記錄表。",
      rowH(4)],
    ["第十一條\n（訪視記錄）",
      "每次督導訪視均應完成「督導訪視記錄表」，記錄訪視日期、方式、訪視內容（個案狀況、服務品質、異常事項）及後續改善措施，由督導員簽名後存入個案服務資料夾。",
      rowH(4)],
  ];

  chap4.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["第五章　附則", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  push(["第十二條\n（修訂）",
    "本制度由機構負責人核定後實施，修訂時亦同。",
    rowH(2)]);
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  push(["負責人簽章：___________　　日期：中華民國　　年　　月　　日", ""], DATA_ROW_BASE_HEIGHT);
  setMergedData(cs, merge, r - 1, NC);

  return {
    name: "居家服務督導制度",
    data,
    config: { columnlen: { "0": 180, "1": 680 }, rowlen, merge },
    cellStyles: cs,
  };
}

/** 產生項目 12「督導與訪視」的 1 個自訂補充分頁 */
export function buildHomeCareItem12CustomSheets(): SheetData[] {
  return [buildSupervisionSystemSheet()];
}
