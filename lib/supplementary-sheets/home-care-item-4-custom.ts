/**
 * 居家照顧評鑑項目 4「申訴機制」自訂補充分頁
 *
 * 產生 1 個工作分頁：
 *   1. 個案申訴處理程序（受理方式、處理時程、申訴人保護、再申訴、主管機關通道）
 *
 * 法源依據：
 *   - 老人福利法 §43（陳情申訴）
 *   - 長期照顧服務法 §44（服務爭議處理）
 *   - 消費者保護法 §43（申訴時效）
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

function buildComplaintProcedureSheet(): SheetData {
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

  push(["___________居家服務機構　個案申訴處理程序", ""], TITLE_ROW_HEIGHT);
  setTitleRow(cs, merge, r - 1, NC);

  push(["制定日期：中華民國　　年　　月　　日　　版次：第 1 版　　核定人：___________", ""], DATA_ROW_BASE_HEIGHT);
  setMergedData(cs, merge, r - 1, NC);

  push(["第一章　總則", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const chap1: [string, string, number][] = [
    ["第一條\n（目的）",
      "為提供個案及其家屬有效之申訴管道，保障其合法權益，並落實服務品質改善，依《老人福利法》第四十三條及《長期照顧服務法》第四十四條，制定本程序。",
      rowH(3)],
    ["第二條\n（適用對象）",
      "凡本機構現服務中或已結案（結案後三個月內）之個案及其家屬，對本機構所提供之服務內容、服務人員態度、收費標準、行政作業或其他相關事項有異議者，均得依本程序提出申訴。",
      rowH(4)],
  ];

  chap1.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["第二章　申訴管道", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const chap2: [string, string, number][] = [
    ["第三條\n（申訴管道）",
      "本機構提供下列多元申訴管道，申訴人得擇一使用：\n一、電話申訴：___________（服務時間：週一至週五 上午 8:00 至下午 5:00）\n二、書面申訴：填寫「申訴書」（可至機構索取或自行書寫）親送或郵寄至本機構。\n三、電子信箱：___________\n四、機構意見箱：設置於___________（公告位置）。\n五、向主管機關申訴：___________縣（市）政府社會局/處，電話：___________。\n本機構應於明顯處公告上述申訴管道資訊，並於服務契約中告知個案及家屬。",
      rowH(10)],
  ];

  chap2.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["第三章　申訴受理與處理時程", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const chap3: [string, string, number][] = [
    ["第四條\n（受理登錄）",
      "收到申訴後，承辦人員應於一個工作日內填寫「申訴案件處理記錄表」，登錄申訴日期、申訴人姓名、聯絡方式、申訴事由及受理人員，並告知申訴人受理結果通知時程。",
      rowH(4)],
    ["第五條\n（處理時程）",
      "本機構應依下列時程處理申訴：\n一、一般申訴案件：自受理日起七個工作日內完成調查，十個工作日內以書面或電話通知申訴人處理結果。\n二、複雜案件（需外部調查或跨單位協調）：自受理日起三十日內完成，並於十個工作日內告知申訴人預計完成期限。\n三、緊急案件（涉及人身安全或重大損害）：應於受理當日啟動緊急處理機制，二十四小時內告知申訴人初步回應。",
      rowH(8)],
    ["第六條\n（調查程序）",
      "調查應客觀、公正，調查過程包括：\n一、詢問申訴人補充說明（必要時）。\n二、訪談相關服務人員。\n三、查閱服務紀錄、錄音或其他佐證資料。\n四、必要時邀請第三方協調。\n調查結果應形成書面，由督導員或主管簽核。",
      rowH(7)],
    ["第七條\n（回覆告知）",
      "處理結果應以書面或申訴人偏好之方式告知，內容包括：\n一、申訴事由摘要。\n二、調查結論。\n三、改善措施或補救方式。\n四、如對結果有異議之再申訴管道。",
      rowH(6)],
  ];

  chap3.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["第四章　申訴人保護", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const chap4: [string, string, number][] = [
    ["第八條\n（申訴人保護）",
      "本機構嚴禁因申訴行為對申訴人進行任何報復或不利對待，包括但不限於：\n一、拒絕或降低服務品質。\n二、言語或肢體恐嚇。\n三、對申訴人家屬施壓。\n違反本條規定之人員，依本機構「個案基本權益保障規定」第十章辦理懲處。",
      rowH(7)],
    ["第九條\n（隱私保護）",
      "申訴案件相關資料應依保密原則處理，非相關人員不得查閱，案件資料保存於鎖定之專用檔案，保存期間為結案後三年。",
      rowH(3)],
  ];

  chap4.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["第五章　再申訴", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  push(["第十條\n（再申訴管道）",
    "申訴人對本機構處理結果不滿意者，得於收到回覆後十五日內：\n一、向本機構負責人提出再申訴，由負責人於十五個工作日內另行調查後書面回覆。\n二、直接向主管機關提出申訴：___________縣（市）政府社會局/處，電話：___________。\n三、依《長期照顧服務法》第四十四條規定，向主管機關申請調處。"], rowH(7));
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  push(["第六章　統計與改善", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  push(["第十一條\n（定期統計）",
    "本機構應每季彙整申訴案件，統計案件數量、申訴類別、處理時效及改善措施執行情形，提送主管審閱，並作為服務品質改善之依據。"], rowH(3));
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  push(["第七章　附則", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  push(["第十二條\n（修訂）",
    "本程序由機構負責人核定後實施，修訂時亦同。"], rowH(2));
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  push(["負責人簽章：___________　　日期：中華民國　　年　　月　　日", ""], DATA_ROW_BASE_HEIGHT);
  setMergedData(cs, merge, r - 1, NC);

  return {
    name: "個案申訴處理程序",
    data,
    config: { columnlen: { "0": 180, "1": 680 }, rowlen, merge },
    cellStyles: cs,
  };
}

/** 產生項目 4「申訴機制」的 1 個自訂補充分頁 */
export function buildHomeCareItem4CustomSheets(): SheetData[] {
  return [buildComplaintProcedureSheet()];
}
