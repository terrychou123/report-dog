/**
 * 居家照顧評鑑項目 22「收退費管理」自訂補充分頁
 *
 * 產生 1 個工作分頁：
 *   1. 退費規定（退費條件、比例、申請程序）
 *
 * 法源依據：
 *   - 長期照顧服務法 §35（收費標準由主管機關核定）
 *   - 消費者保護法 §19（七日猶豫期）
 *   - 社區式服務類長期照顧服務機構定型化契約範本 §22（退費結算）
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

function buildRefundPolicySheet(): SheetData {
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

  push(["___________居家服務機構　退費規定", ""], TITLE_ROW_HEIGHT);
  setTitleRow(cs, merge, r - 1, NC);

  push(["制定日期：中華民國　　年　　月　　日　　版次：第 1 版　　核定人：___________", ""], DATA_ROW_BASE_HEIGHT);
  setMergedData(cs, merge, r - 1, NC);

  push(["第一章　總則", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const chap1: [string, string, number][] = [
    ["第一條\n（目的）",
      "為保障個案及家屬之消費權益，明確規範退費條件、計算方式及申請程序，依《長期照顧服務法》第三十五條及《消費者保護法》相關規定，制定本規定。",
      rowH(3)],
    ["第二條\n（適用範圍）",
      "本規定適用於本機構收取之所有服務費用，包括：政府補助部分負擔費用、自費服務費用。",
      rowH(2)],
  ];
  chap1.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["第二章　退費條件", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const chap2: [string, string, number][] = [
    ["第三條\n（個案主動終止）",
      "個案或家屬依契約條款提出終止服務申請：\n一、服務尚未開始（締約後七日猶豫期內）：全額退費，不扣手續費。\n二、服務已開始，個案主動終止：退還已繳付但尚未提供服務部分之費用，依下列方式計算：\n　退費金額 = 已繳費用 ÷ 應服務總時數 × 尚未服務之時數\n三、退費應於終止服務確認後七個工作日內完成，以原繳費方式退還，或由雙方合意另行辦理。",
      rowH(9)],
    ["第四條\n（機構主動終止）",
      "本機構因下列情形終止服務，應退還已繳付但未提供服務之全額費用（無需扣除任何費用）：\n一、機構許可證遭廢止或撤銷。\n二、機構停業或歇業（應於終止前二個月通知個案及家屬）。\n三、本機構可歸責之事由致服務無法繼續。",
      rowH(6)],
    ["第五條\n（個案死亡）",
      "個案死亡，服務自然終止，退還死亡日起尚未提供服務之費用，退費對象為其法定繼承人或家屬，應於確認後七個工作日內辦理。",
      rowH(3)],
    ["第六條\n（服務未遞之處理）",
      "照顧服務員因可歸責於本機構事由（如排班疏失）未能提供服務，全額退回該次服務費用，或折抵下次服務費用（由個案選擇）。\n因個案臨時取消（服務前二十四小時以內），本機構得依契約收取服務未遞處理費（金額見服務契約），已收取之服務費扣除服務未遞處理費後退還。",
      rowH(6)],
  ];
  chap2.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["第三章　退費申請程序", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const chap3: [string, string, number][] = [
    ["第七條\n（申請方式）",
      "退費申請方式：\n一、口頭申請：告知督導員，督導員記錄於服務紀錄後轉交行政人員。\n二、書面申請：填寫「退費申請書」（機構提供），親送或郵寄、電子郵件送達。",
      rowH(5)],
    ["第八條\n（審核與通知）",
      "行政人員收到退費申請後，三個工作日內完成費用核算，並以電話或書面告知退費金額及退款時程。如申請人對退費金額有異議，得依申訴程序提出申訴。",
      rowH(4)],
    ["第九條\n（退款方式）",
      "退費以下列方式辦理（由申請人選擇）：\n一、匯款至指定帳戶（七個工作日內完成）。\n二、開立即期支票由申請人親自領取（三個工作日內備妥）。\n三、現金（限五千元以下小額退費）。\n退費憑證（收據或匯款水單）應交付申請人留存，機構保存副本。",
      rowH(7)],
  ];
  chap3.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["第四章　公告與告知", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  push(["第十條\n（告知義務）",
    "本退費規定應於服務契約中載明，並於個案入案時口頭說明，確保個案及家屬充分知悉退費權利。本規定全文應張貼於機構明顯處供查閱。"], rowH(3));
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  push(["第五章　附則", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  push(["第十一條\n（修訂）",
    "本規定由機構負責人核定後實施，修訂時亦同。"], rowH(2));
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  push(["負責人簽章：___________　　日期：中華民國　　年　　月　　日", ""], DATA_ROW_BASE_HEIGHT);
  setMergedData(cs, merge, r - 1, NC);

  return {
    name: "退費規定",
    data,
    config: { columnlen: { "0": 180, "1": 680 }, rowlen, merge },
    cellStyles: cs,
  };
}

/** 產生項目 22「收退費管理」的 1 個自訂補充分頁 */
export function buildHomeCareItem22CustomSheets(): SheetData[] {
  return [buildRefundPolicySheet()];
}
