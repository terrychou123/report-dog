/**
 * 居家照顧評鑑項目 3「個案隱私保護」自訂補充分頁
 *
 * 產生 1 個工作分頁：
 *   1. 個案隱私保護規定（含個資蒐集/使用/保管/銷毀全流程）
 *
 * 法源依據：
 *   - 個人資料保護法 §8（蒐集個資之告知義務）
 *   - 個人資料保護法 §17（公務機關建立個資檔案應公告）
 *   - 長期照顧服務法 §36（機構保密義務）
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

function buildPrivacyPolicySheet(): SheetData {
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

  push(["___________居家服務機構　個案隱私保護規定", ""], TITLE_ROW_HEIGHT);
  setTitleRow(cs, merge, r - 1, NC);

  push(["制定日期：中華民國　　年　　月　　日　　版次：第 1 版　　核定人：___________", ""], DATA_ROW_BASE_HEIGHT);
  setMergedData(cs, merge, r - 1, NC);

  push(["第一章　總則", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const chap1: [string, string, number][] = [
    ["第一條\n（目的）",
      "為確保本機構服務個案之隱私權及個人資料安全，依《個人資料保護法》、《長期照顧服務法》第三十六條及相關法規，制定本規定。",
      rowH(3)],
    ["第二條\n（定義）",
      "本規定所稱個人資料，包括個案之姓名、出生日期、身分證統一編號、護照號碼、特徵、指紋、婚姻狀況、家庭狀況、教育程度、職業、病歷、醫療、健康、基因、性生活、健康保險、聯絡方式、財務情況及其他可直接或間接識別個案之資料。",
      rowH(6)],
  ];

  chap1.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["第二章　個人資料蒐集", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const chap2: [string, string, number][] = [
    ["第三條\n（蒐集目的與範圍）",
      "本機構蒐集個案個人資料之目的限於提供長照服務、緊急事故通報、與政府機關往來、統計分析及其他依法令規定事項。蒐集之個資種類包括：\n一、基本識別資料（姓名、身分證字號、出生年月日、聯絡電話）\n二、健康與照護資料（病歷、身心障礙等級、照護需求評估）\n三、家屬與緊急聯絡人資料\n四、服務費用及保險資料",
      rowH(8)],
    ["第四條\n（告知義務）",
      "蒐集個案個人資料前，應依《個人資料保護法》第八條規定，告知個案或其代理人蒐集目的、利用期間、地區、對象及方式，以及個案得行使之查詢、閱覽、複製、補充更正、刪除及停止蒐集利用等權利。",
      rowH(5)],
    ["第五條\n（同意取得）",
      "非依法律規定得蒐集之個人資料，應取得個案或其代理人書面同意（如服務契約中之個資授權同意書）。敏感性個資（病歷、醫療等）應另行以書面取得明示同意。",
      rowH(4)],
  ];

  chap2.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["第三章　個人資料保管", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const chap3: [string, string, number][] = [
    ["第六條\n（資料保管責任）",
      "個案紙本資料存放於專用鎖檔案櫃，鑰匙由主管保管；電子資料存放於有密碼保護之系統，設定存取權限，僅授權人員得查閱。",
      rowH(3)],
    ["第七條\n（保密義務）",
      "服務人員因業務知悉個案個人資料，負有保密義務，不得於職務以外之場合洩漏個案相關資訊，於職務終止後亦同。入戶服務時不得拍照、錄音或錄影（個案書面同意者除外）。",
      rowH(4)],
    ["第八條\n（資料查閱限制）",
      "個案資料查閱應以業務需要為限，查閱時需登錄查閱記錄。未經主管核准，不得攜帶或傳遞個案資料至機構外。",
      rowH(3)],
    ["第九條\n（資料傳送安全）",
      "傳真個案資料前，應事先確認對方身分及傳真號碼；以電子郵件傳送時，應加密處理；不得以社群媒體、通訊軟體之公開管道傳送個案個人資料。",
      rowH(3)],
  ];

  chap3.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["第四章　個人資料銷毀", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const chap4: [string, string, number][] = [
    ["第十條\n（保存期限）",
      "個案服務紀錄保存至服務關係終止後七年（醫事照護紀錄依相關醫事法規辦理），期限屆滿後依本規定銷毀。",
      rowH(3)],
    ["第十一條\n（銷毀方式）",
      "紙本個人資料應使用碎紙機銷毀，不得整份丟棄；電子資料應以格式化或覆寫方式使其無法復原，並填寫「個人資料銷毀登錄表」留存備查。",
      rowH(3)],
  ];

  chap4.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["第五章　安全事故處理", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  push(["第十二條\n（資料外洩通報）",
    "如發生個人資料外洩、竊取、竄改或其他侵害事件，應立即通報主管，主管應於確認後二十四小時內通報主管機關，並以適當方式（電話、書面）通知受影響之個案或其家屬。"], rowH(4));
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  push(["第六章　附則", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  push(["第十三條\n（修訂）",
    "本規定由機構負責人核定後實施，依法令修訂時亦同。"], rowH(2));
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  push(["負責人簽章：___________　　日期：中華民國　　年　　月　　日", ""], DATA_ROW_BASE_HEIGHT);
  setMergedData(cs, merge, r - 1, NC);

  return {
    name: "個案隱私保護規定",
    data,
    config: { columnlen: { "0": 180, "1": 680 }, rowlen, merge },
    cellStyles: cs,
  };
}

/** 產生項目 3「個案隱私保護」的 1 個自訂補充分頁 */
export function buildHomeCareItem3CustomSheets(): SheetData[] {
  return [buildPrivacyPolicySheet()];
}
