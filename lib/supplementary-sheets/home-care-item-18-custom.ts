/**
 * 居家照顧評鑑項目 18「人員訓練」自訂補充分頁
 *
 * 產生 2 個工作分頁：
 *   1. 年度教育訓練計畫（課程架構、時數分配）
 *   2. 職前訓練課程大綱（服務規範、安全守則、緊急處置）
 *
 * 法源依據：
 *   - 照顧服務員訓練實施計畫（衛生福利部）
 *   - 長期照顧服務機構設立許可及管理辦法 §14（在職訓練時數）
 *   - 職業安全衛生法 §32（勞工安全衛生訓練）
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

// ─── Sheet 1：年度教育訓練計畫 ────────────────────────────────────────────────
function buildAnnualTrainingPlanSheet(): SheetData {
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

  push([`___________居家服務機構　中華民國___年度教育訓練計畫`], TITLE_ROW_HEIGHT);
  merge[`${r - 1}_0`] = { r: r - 1, c: 0, rs: 1, cs: 7 };
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true };

  push(["制定日期：中華民國　　年　　月　　日　　核定人：___________"], DATA_ROW_BASE_HEIGHT);
  merge[`${r - 1}_0`] = { r: r - 1, c: 0, rs: 1, cs: 7 };
  cs[`${r - 1}_0`] = { ht: 0, vt: 0 };

  push(["一、訓練目標"], SECTION_HEADER_HEIGHT);
  merge[`${r - 1}_0`] = { r: r - 1, c: 0, rs: 1, cs: 7 };
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, bg: "#EFEFEF" };

  push([
    "本年度訓練目標：確保全體照顧服務員及督導員達成法定在職訓練時數（依衛生福利部規定），強化身體照顧技能、緊急事件處理能力及個案權益保障知能，以提升服務品質。"
  ], rowH(4));
  merge[`${r - 1}_0`] = { r: r - 1, c: 0, rs: 1, cs: 7 };
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, tb: 2 };

  push(["二、年度課程計畫表"], SECTION_HEADER_HEIGHT);
  merge[`${r - 1}_0`] = { r: r - 1, c: 0, rs: 1, cs: 7 };
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, bg: "#EFEFEF" };

  const headers = ["期數", "預定辦理月份", "課程名稱", "訓練對象", "講師/外訓機構", "時數", "辦理方式"];
  push(headers, SECTION_HEADER_HEIGHT);
  for (let c = 0; c < 7; c++) cs[`${r - 1}_${c}`] = { ht: 0, vt: 0, bold: true, bg: "#EFEFEF" };

  const courses = [
    ["第1期", "2月", "個案權益保障與隱私保護（含通報義務）", "全體人員", "督導員（內訓）", "2H", "集中講授"],
    ["第2期", "4月", "緊急事件處理實地演練（跌倒、急症、失蹤）", "照顧服務員", "督導員（內訓）", "3H", "實地演練"],
    ["第3期", "4月", "感染管制與手部衛生（含PPE穿脫）", "全體人員", "護理師或外訓", "2H", "講授+示範"],
    ["第4期", "6月", "身體照顧技巧更新（翻身擺位、移位）", "照顧服務員", "物理治療師/外訓", "3H", "實作訓練"],
    ["第5期", "7月", "認知症照顧技巧", "照顧服務員、督導員", "外聘專家", "3H", "講授+示範"],
    ["第6期", "9月", "職業安全衛生（職業傷害預防、針扎等）", "全體人員", "督導員（內訓）", "2H", "集中講授"],
    ["第7期", "10月", "服務品質改善與個案服務計畫撰寫", "督導員", "外聘顧問或外訓", "3H", "研討"],
    ["第8期", "12月", "年度服務品質檢討與次年目標設定", "全體人員", "業務負責人主持", "2H", "工作坊"],
  ];

  courses.forEach((row) => {
    push(row, DATA_ROW_BASE_HEIGHT);
    for (let c = 0; c < 7; c++) cs[`${r - 1}_${c}`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["三、訓練時數統計（依人員類別）"], SECTION_HEADER_HEIGHT);
  merge[`${r - 1}_0`] = { r: r - 1, c: 0, rs: 1, cs: 7 };
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, bg: "#EFEFEF" };

  const hoursHeaders = ["人員類別", "法定最低時數（時/年）", "本年度計畫時數（時）", "達標標準說明"];
  push(hoursHeaders, SECTION_HEADER_HEIGHT);
  for (let c = 0; c < 4; c++) cs[`${r - 1}_${c}`] = { ht: 0, vt: 0, bold: true, bg: "#EFEFEF" };
  merge[`${r - 1}_3`] = { r: r - 1, c: 3, rs: 1, cs: 4 };

  const hoursRows = [
    ["照顧服務員", "20（含職前訓練計入之年度）", "20+", "依衛生福利部照顧服務員訓練計畫規定"],
    ["居家服務督導員", "20", "20+", "依衛生福利部規定在職訓練時數"],
    ["行政人員", "8", "8+", "含個資保護、緊急事件等共同課程"],
  ];
  hoursRows.forEach((row) => {
    const padded = [...row];
    push(padded, DATA_ROW_BASE_HEIGHT);
    for (let c = 0; c < 4; c++) cs[`${r - 1}_${c}`] = { ht: 0, vt: 0, tb: 2 };
    merge[`${r - 1}_3`] = { r: r - 1, c: 3, rs: 1, cs: 4 };
  });

  push(["四、注意事項"], SECTION_HEADER_HEIGHT);
  merge[`${r - 1}_0`] = { r: r - 1, c: 0, rs: 1, cs: 7 };
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, bg: "#EFEFEF" };

  push(["一、訓練課程若因故調整，需由督導員或業務負責人於課程計畫表中說明修訂原因及補辦日期，並保存修訂紀錄。\n二、每次訓練均需填寫「教育訓練記錄表」（含出席簽到、課程內容摘要），結訓後存檔備查。\n三、人員個別訓練時數達不到法定標準時，督導員應另安排補訓。"], rowH(5));
  merge[`${r - 1}_0`] = { r: r - 1, c: 0, rs: 1, cs: 7 };
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, tb: 2 };

  push(["負責人簽章：___________　　日期：中華民國　　年　　月　　日"], DATA_ROW_BASE_HEIGHT);
  merge[`${r - 1}_0`] = { r: r - 1, c: 0, rs: 1, cs: 7 };
  cs[`${r - 1}_0`] = { ht: 0, vt: 0 };

  return {
    name: "年度教育訓練計畫",
    data,
    config: {
      columnlen: { "0": 60, "1": 100, "2": 200, "3": 120, "4": 140, "5": 50, "6": 100 },
      rowlen,
      merge,
    },
    cellStyles: cs,
  };
}

// ─── Sheet 2：職前訓練課程大綱 ────────────────────────────────────────────────
function buildOrientationTrainingSheet(): SheetData {
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

  push(["___________居家服務機構　新進照顧服務員職前訓練課程大綱", ""], TITLE_ROW_HEIGHT);
  setTitleRow(cs, merge, r - 1, NC);

  push(["制定日期：中華民國　　年　　月　　日　　版次：第 1 版　　核定人：___________", ""], DATA_ROW_BASE_HEIGHT);
  setMergedData(cs, merge, r - 1, NC);

  push(["訓練目標", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  push(["目標說明",
    "新進照顧服務員到職後應完成職前訓練，確保其了解本機構服務規範、安全守則及緊急處置程序，具備獨立入戶服務前之基本知能。職前訓練總時數不少於 8 小時（其中實地演練不少於 2 小時）。",
    rowH(4)]);
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  push(["一、服務規範", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const sec1: [string, string, number][] = [
    ["1-1\n服務倫理",
      "個案尊嚴保障、無歧視無虐待無剝削規定（含通報義務）、保密義務、申訴管道介紹。\n時數：1 小時",
      rowH(4)],
    ["1-2\n服務範疇",
      "允許與禁止之服務項目（依「家務協助服務範疇規定」）、如何處理超範疇要求。\n時數：1 小時",
      rowH(3)],
    ["1-3\n服務紀錄規範",
      "服務紀錄填寫格式、填寫要點（時間、內容、異常狀況）、電子/書面紀錄保存規定。\n時數：0.5 小時",
      rowH(3)],
    ["1-4\n個案隱私保護",
      "入戶服務之隱私保護注意事項（禁止拍照/錄音/討論個案隱私、文件保管）。\n時數：0.5 小時",
      rowH(3)],
  ];
  sec1.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["二、安全守則", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const sec2: [string, string, number][] = [
    ["2-1\n入戶安全",
      "進入個案住所之安全確認（瓦斯、電器、逃生路線）、發現異常之通報程序。\n時數：0.5 小時",
      rowH(3)],
    ["2-2\n人體工學與\n職業傷害預防",
      "正確的移位、翻身、搬運姿勢，預防照服員腰背傷害；針扎及銳物傷害預防。\n時數：1 小時（含實作示範）",
      rowH(3)],
    ["2-3\n感染預防",
      "個人防護裝備使用（手套、口罩）、手部衛生六步驟（依 WHO 標準）、傳染病認識。\n時數：0.5 小時",
      rowH(3)],
  ];
  sec2.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["三、緊急處置", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const sec3: [string, string, number][] = [
    ["3-1\n緊急事件\n識別與分類",
      "認識緊急警示症狀（跌倒、急症、失蹤），學習如何判斷事件嚴重程度，決定是否需要 119。\n時數：0.5 小時",
      rowH(3)],
    ["3-2\n緊急 SOP\n實地演練",
      "依本機構「跌倒事件處理 SOP」、「急症事件處理 SOP」、「個案失蹤處理 SOP」逐項演練，熟記緊急聯絡窗口清單。\n時數：2 小時（全程實地演練）",
      rowH(4)],
    ["3-3\n通報與紀錄",
      "緊急事件通報流程（誰、何時、告知什麼）、事後填寫「緊急事件通報記錄表」要點。\n時數：0.5 小時",
      rowH(3)],
  ];
  sec3.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["【訓練完成確認】", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  push(["確認事項",
    "□ 已完成上述所有職前訓練課程（合計不少於 8 小時）\n□ 已閱讀並了解「個案基本權益保障規定」\n□ 已閱讀並了解「家務協助服務範疇規定」\n□ 已閱讀並了解三項緊急事件處理 SOP，並演練完成\n□ 持有「緊急聯絡窗口清單」",
    rowH(7)]);
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  const sigFields: [string, string][] = [
    ["學員姓名：", "___________"],
    ["訓練日期：", "中華民國　　年　　月　　日 至 中華民國　　年　　月　　日"],
    ["訓練講師：", "___________　（督導員簽名）"],
    ["業務負責人：", "___________　（簽名確認）"],
  ];
  sigFields.forEach(([label, val]) => {
    push([label, val], DATA_ROW_BASE_HEIGHT);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0 };
  });

  return {
    name: "職前訓練課程大綱",
    data,
    config: { columnlen: { "0": 140, "1": 720 }, rowlen, merge },
    cellStyles: cs,
  };
}

/** 產生項目 18「人員訓練」的 2 個自訂補充分頁 */
export function buildHomeCareItem18CustomSheets(): SheetData[] {
  return [
    buildAnnualTrainingPlanSheet(),
    buildOrientationTrainingSheet(),
  ];
}
