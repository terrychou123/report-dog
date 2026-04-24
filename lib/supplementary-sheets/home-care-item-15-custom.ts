/**
 * 居家照顧評鑑項目 15「機構行政管理」自訂補充分頁
 *
 * 產生 3 個工作分頁：
 *   1. 機構組織章程
 *   2. 行政管理規定
 *   3. 行政作業 SOP 總表
 *
 * 法源依據：
 *   - 長期照顧服務法 §23（機構設立與管理）
 *   - 長期照顧服務機構設立許可及管理辦法
 *   - 社會團體法人登記設立相關規定
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

// ─── Sheet 1：機構組織章程 ────────────────────────────────────────────────────
function buildOrganizationCharterSheet(): SheetData {
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

  push(["___________居家服務機構　組織章程", ""], TITLE_ROW_HEIGHT);
  setTitleRow(cs, merge, r - 1, NC);

  push(["制定日期：中華民國　　年　　月　　日　　版次：第 1 版　　核定人：___________", ""], DATA_ROW_BASE_HEIGHT);
  setMergedData(cs, merge, r - 1, NC);

  push(["第一章　總則", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const arts: [string, string, number][] = [
    ["第一條\n（機構名稱）",
      "本機構名稱為___________居家服務機構（以下簡稱本機構）。",
      rowH(2)],
    ["第二條\n（服務宗旨）",
      "本機構依據《長期照顧服務法》設立，以提供失能個案高品質之居家照顧服務，維護個案尊嚴與生活品質，支持家庭照顧者，減輕家庭照顧負擔為宗旨。",
      rowH(3)],
    ["第三條\n（機構地址）",
      "本機構主事務所設於：___________市（縣）___________路（街）___段___巷___弄___號___樓。",
      rowH(2)],
    ["第四條\n（服務地區）",
      "本機構服務地區以___________縣（市）___________區（鄉、鎮）為主，得視業務需要及主管機關核定範圍調整。",
      rowH(2)],
    ["第五條\n（服務項目）",
      "本機構依許可證明核定之服務項目提供服務，主要包括：\n一、身體照顧服務（協助沐浴、更衣、床上擦浴、協助進食等）。\n二、日常生活照顧服務（家務協助、餐飲服務、陪同就醫等）。\n三、其他經主管機關核定之服務項目。",
      rowH(6)],
  ];

  arts.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["第二章　組織架構", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const arts2: [string, string, number][] = [
    ["第六條\n（負責人）",
      "本機構設業務負責人一人，綜理機構業務，對外代表機構，並對主管機關負責。負責人資格應符合《長期照顧服務機構設立許可及管理辦法》規定。",
      rowH(3)],
    ["第七條\n（組織編制）",
      "本機構設下列職位：\n一、業務負責人：一人（依規定應為全職）。\n二、居家服務督導員：依服務使用人數依法配置（每六十人一名，專任）。\n三、照顧服務員：依個案數及服務時數適當配置。\n四、行政人員：視業務需要設置。",
      rowH(7)],
    ["第八條\n（職務代理）",
      "業務負責人因故不能執行職務時，應事先指定具備資格之人員代理，並通知主管機關備查。",
      rowH(2)],
  ];

  arts2.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["第三章　會議與文書", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const arts3: [string, string, number][] = [
    ["第九條\n（行政會議）",
      "本機構每季至少召開一次行政會議，由業務負責人主持，議題包括服務品質、人員訓練、財務狀況及重要行政事項，會議應製作紀錄存檔。",
      rowH(3)],
    ["第十條\n（文書管理）",
      "本機構各項重要文書（合約、執照、規章、人員資料、個案資料等）應集中保管，非相關人員不得查閱，保存期限依相關法規辦理。",
      rowH(3)],
  ];

  arts3.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["第四章　附則", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  push(["第十一條\n（修訂）",
    "本章程由業務負責人核定後實施，修訂時向主管機關報備。"], rowH(2));
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  push(["負責人簽章：___________　　日期：中華民國　　年　　月　　日", ""], DATA_ROW_BASE_HEIGHT);
  setMergedData(cs, merge, r - 1, NC);

  return {
    name: "機構組織章程",
    data,
    config: { columnlen: { "0": 180, "1": 680 }, rowlen, merge },
    cellStyles: cs,
  };
}

// ─── Sheet 2：行政管理規定 ────────────────────────────────────────────────────
function buildAdminRulesSheet(): SheetData {
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

  push(["___________居家服務機構　行政管理規定", ""], TITLE_ROW_HEIGHT);
  setTitleRow(cs, merge, r - 1, NC);

  push(["制定日期：中華民國　　年　　月　　日　　版次：第 1 版　　核定人：___________", ""], DATA_ROW_BASE_HEIGHT);
  setMergedData(cs, merge, r - 1, NC);

  push(["一、人員管理", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const sec1: [string, string, number][] = [
    ["1-1\n（到離職管理）",
      "新進人員到職前應完成資格審查（含查驗資格證書）、健康檢查（含胸部 X 光）及身分背景確認，到職後三日內完成職前訓練。離職人員應辦理業務交接，並歸還所持有之個案資料與機構財物。",
      rowH(5)],
    ["1-2\n（排班管理）",
      "督導員依個案需求安排照服員排班，確保人力配置符合個案服務計畫，排班異動應提前通知照服員及個案。",
      rowH(3)],
    ["1-3\n（出缺勤管理）",
      "照服員請假應至少二十四小時前以電話或書面告知督導員；緊急情況得事後補辦請假。督導員應安排代班，確保個案服務不中斷。",
      rowH(3)],
  ];
  sec1.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["二、文書管理", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const sec2: [string, string, number][] = [
    ["2-1\n（文件分類）",
      "機構文件依性質分類保管：\n一、行政類（章程、許可證、保險、財務）。\n二、人員類（到職資料、訓練記錄、考核）。\n三、個案類（評估、服務計畫、服務紀錄）。\n四、申訴/事故類（申訴記錄、緊急事件記錄）。",
      rowH(6)],
    ["2-2\n（文件保存期限）",
      "各類文件保存期限：\n一、個案服務紀錄：服務終止後七年。\n二、人員資料：離職後三年。\n三、財務憑證：十年。\n四、會議紀錄：五年。\n期限屆滿後依隱私保護規定銷毀。",
      rowH(7)],
  ];
  sec2.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["三、對外關係", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const sec3: [string, string, number][] = [
    ["3-1\n（政府申報）",
      "各項政府申報（含評鑑資料、統計報表、人員變動）由業務負責人或指定人員依規定期限辦理，不得逾期。",
      rowH(3)],
    ["3-2\n（公告事項）",
      "下列事項應於機構明顯處公告：\n一、機構名稱、地址、許可字號、業務負責人姓名。\n二、服務項目、收費標準。\n三、申訴管道（含主管機關申訴電話）。\n四、投保公共意外責任險證明。",
      rowH(6)],
  ];
  sec3.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["四、附則", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  push(["4-1\n（修訂）",
    "本規定由機構負責人核定後實施，修訂時亦同。"], rowH(2));
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  push(["負責人簽章：___________　　日期：中華民國　　年　　月　　日", ""], DATA_ROW_BASE_HEIGHT);
  setMergedData(cs, merge, r - 1, NC);

  return {
    name: "行政管理規定",
    data,
    config: { columnlen: { "0": 180, "1": 680 }, rowlen, merge },
    cellStyles: cs,
  };
}

// ─── Sheet 3：行政作業 SOP 總表 ────────────────────────────────────────────────
function buildAdminSopIndexSheet(): SheetData {
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

  push(["___________居家服務機構　行政作業 SOP 總表"], TITLE_ROW_HEIGHT);
  merge[`${r - 1}_0`] = { r: r - 1, c: 0, rs: 1, cs: 6 };
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true };

  push(["制定日期：中華民國　　年　　月　　日　　版次：第 1 版　　核定人：___________"], DATA_ROW_BASE_HEIGHT);
  merge[`${r - 1}_0`] = { r: r - 1, c: 0, rs: 1, cs: 6 };
  cs[`${r - 1}_0`] = { ht: 0, vt: 0 };

  push(["說明：本表為本機構行政作業標準作業程序（SOP）清冊，各 SOP 詳細內容另行保存於各 SOP 文件夾（紙本或電子檔），本表記錄各 SOP 之版本與管控狀態。"], rowH(3));
  merge[`${r - 1}_0`] = { r: r - 1, c: 0, rs: 1, cs: 6 };
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, tb: 2 };

  const headers = ["編號", "SOP 名稱", "適用範圍", "版次", "最新修訂日期", "核定人"];
  push(headers, SECTION_HEADER_HEIGHT);
  for (let c = 0; c < 6; c++) cs[`${r - 1}_${c}`] = { ht: 0, vt: 0, bold: true, bg: "#EFEFEF" };

  const sops = [
    ["HC-ADM-001", "個案入案作業程序", "督導員、行政", "1.0", "___/___/___", "___"],
    ["HC-ADM-002", "個別服務計畫建立程序", "督導員", "1.0", "___/___/___", "___"],
    ["HC-ADM-003", "排班與代班管理程序", "督導員、行政", "1.0", "___/___/___", "___"],
    ["HC-ADM-004", "服務費用收退費程序", "行政", "1.0", "___/___/___", "___"],
    ["HC-ADM-005", "申訴案件受理與處理程序", "督導員、行政", "1.0", "___/___/___", "___"],
    ["HC-ADM-006", "緊急事件通報程序", "全體人員", "1.0", "___/___/___", "___"],
    ["HC-ADM-007", "人員到離職作業程序", "行政", "1.0", "___/___/___", "___"],
    ["HC-ADM-008", "文件管理與銷毀程序", "行政", "1.0", "___/___/___", "___"],
    ["HC-ADM-009", "結案與轉介作業程序", "督導員", "1.0", "___/___/___", "___"],
    ["HC-ADM-010", "政府申報作業程序", "行政", "1.0", "___/___/___", "___"],
    ["HC-ADM-011", "感染管制作業程序", "全體人員", "1.0", "___/___/___", "___"],
    ["HC-ADM-012", "個案資料保護與銷毀程序", "全體人員", "1.0", "___/___/___", "___"],
  ];

  sops.forEach((row) => {
    push(row, DATA_ROW_BASE_HEIGHT);
    for (let c = 0; c < 6; c++) cs[`${r - 1}_${c}`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["備註：如需新增 SOP，於本表末行填寫後，呈負責人核定；修訂現有 SOP，於「最新修訂日期」欄更新，原版本保存備查。"], rowH(3));
  merge[`${r - 1}_0`] = { r: r - 1, c: 0, rs: 1, cs: 6 };
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, tb: 2 };

  return {
    name: "行政作業SOP總表",
    data,
    config: {
      columnlen: { "0": 120, "1": 200, "2": 120, "3": 60, "4": 110, "5": 80 },
      rowlen,
      merge,
    },
    cellStyles: cs,
  };
}

/** 產生項目 15「機構行政管理」的 3 個自訂補充分頁 */
export function buildHomeCareItem15CustomSheets(): SheetData[] {
  return [
    buildOrganizationCharterSheet(),
    buildAdminRulesSheet(),
    buildAdminSopIndexSheet(),
  ];
}
