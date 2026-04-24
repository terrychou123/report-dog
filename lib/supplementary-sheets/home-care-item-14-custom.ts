/**
 * 居家照顧評鑑項目 14「結案與轉介」自訂補充分頁
 *
 * 產生 1 個工作分頁：
 *   1. 結案標準與程序（結案條件、摘要告知、轉介書面要素）
 *
 * 法源依據：
 *   - 長期照顧服務法 §19（服務終止之告知義務）
 *   - 長期照顧服務機構評鑑基準（結案/轉介紀錄保存要求）
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

function buildCaseClosure(): SheetData {
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

  push(["___________居家服務機構　結案標準與程序", ""], TITLE_ROW_HEIGHT);
  setTitleRow(cs, merge, r - 1, NC);

  push(["制定日期：中華民國　　年　　月　　日　　版次：第 1 版　　核定人：___________", ""], DATA_ROW_BASE_HEIGHT);
  setMergedData(cs, merge, r - 1, NC);

  push(["第一章　總則", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const chap1: [string, string, number][] = [
    ["第一條\n（目的）",
      "為確保個案結案或轉介過程妥善辦理，保障個案持續獲得適切照護，依《長期照顧服務法》第十九條規定，制定本程序。",
      rowH(3)],
  ];
  chap1.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["第二章　結案條件", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const chap2: [string, string, number][] = [
    ["第二條\n（個案主動申請結案）",
      "個案或家屬主動提出終止服務申請，應以書面或口頭方式提出（口頭申請由照服員或督導員於服務紀錄中載明），並確認已告知相關轉介或後續照護資訊。",
      rowH(4)],
    ["第三條\n（機構評估結案）",
      "機構得依下列情形主動提出結案，並於執行前七日（緊急情況不在此限）以書面通知個案及家屬：\n一、個案失聯超過三十日，經多方聯繫仍無回應。\n二、個案長期住院（連續住院超過九十日）或入住住宿型機構。\n三、個案死亡。\n四、個案健康狀況明顯改善，照護需求消失且個案意願終止服務。\n五、個案積欠費用超過六十日，經催繳後仍未繳付。\n六、個案或家屬重複發生妨礙服務提供之重大違規行為。",
      rowH(10)],
  ];
  chap2.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["第三章　結案程序", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const chap3: [string, string, number][] = [
    ["第四條\n（結案評估）",
      "辦理結案前，督導員應完成最終個案狀況評估，內容包括：\n一、個案目前身心健康狀態。\n二、是否需轉介其他長照服務。\n三、是否需通報主管機關（如疑似虐待、財務剝削等情形）。",
      rowH(5)],
    ["第五條\n（結案告知）",
      "結案前督導員應：\n一、親自或以電話方式向個案及家屬說明結案原因及後續資源。\n二、提供書面結案摘要（如個案服務摘要函），包含：服務期間、主要服務內容、個案狀況摘要、後續建議事項。\n三、告知申訴管道，確保個案對結案決定有異議時得提出申訴。",
      rowH(7)],
    ["第六條\n（費用結算）",
      "結案時應完成費用結算，退款或補繳應於結案後七個工作日內完成，並開立憑證給個案或家屬。",
      rowH(3)],
    ["第七條\n（結案紀錄）",
      "完成結案後，督導員應填寫「結案/轉介記錄表」，記錄結案原因、結案日期、個案最終狀況及後續轉介情形，並由主管簽核存入個案資料夾，保存七年。",
      rowH(4)],
  ];
  chap3.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["第四章　轉介程序", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const chap4: [string, string, number][] = [
    ["第八條\n（轉介類型）",
      "結案後有照護需求之個案，應依個案需求辦理以下轉介：\n一、住宿型機構（如護理之家、長照機構）。\n二、日照中心（適用身體狀況較佳之個案）。\n三、醫療機構（如需持續復健、護理照護）。\n四、其他社福資源（如獨居老人關懷訪視、送餐服務）。",
      rowH(7)],
    ["第九條\n（轉介書面文件）",
      "辦理轉介時，應備具下列書面資料（依受轉介單位要求）：\n一、轉介單（含轉介原因、個案基本資料、主要診斷或失能狀況）。\n二、個案服務摘要（服務期間、主要問題、已執行之服務）。\n三、個案同意書（個案或家屬簽署同意資料移交）。\n轉介文件副本存入個案資料夾。",
      rowH(7)],
    ["第十條\n（轉介後追蹤）",
      "轉介後一個月內，督導員應以電話方式確認個案是否已順利銜接服務，並記錄於「轉介後追蹤紀錄表」。",
      rowH(2)],
  ];
  chap4.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["第五章　附則", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  push(["第十一條\n（修訂）",
    "本程序由機構負責人核定後實施，修訂時亦同。",
    rowH(2)]);
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  push(["負責人簽章：___________　　日期：中華民國　　年　　月　　日", ""], DATA_ROW_BASE_HEIGHT);
  setMergedData(cs, merge, r - 1, NC);

  return {
    name: "結案標準與程序",
    data,
    config: { columnlen: { "0": 180, "1": 680 }, rowlen, merge },
    cellStyles: cs,
  };
}

/** 產生項目 14「結案與轉介」的 1 個自訂補充分頁 */
export function buildHomeCareItem14CustomSheets(): SheetData[] {
  return [buildCaseClosure()];
}
