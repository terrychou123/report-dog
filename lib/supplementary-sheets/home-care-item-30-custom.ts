/**
 * 居家照顧評鑑項目 30「機構自評」自訂補充分頁
 *
 * 產生 2 個工作分頁：
 *   1. 機構自評辦法
 *   2. 自評改善計畫
 *
 * 法源依據：
 *   - 長期照顧服務機構評鑑辦法 §5（機構自評義務）
 *   - 長期照顧服務機構評鑑基準（自評填報規定）
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

// ─── Sheet 1：機構自評辦法 ────────────────────────────────────────────────────
function buildSelfAssessmentProcedureSheet(): SheetData {
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

  push(["___________居家服務機構　機構自評辦法", ""], TITLE_ROW_HEIGHT);
  setTitleRow(cs, merge, r - 1, NC);

  push(["制定日期：中華民國　　年　　月　　日　　版次：第 1 版　　核定人：___________", ""], DATA_ROW_BASE_HEIGHT);
  setMergedData(cs, merge, r - 1, NC);

  push(["第一章　總則", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const chap1: [string, string, number][] = [
    ["第一條\n（目的）",
      "為落實本機構定期進行服務品質之機構自評，及早發現問題並採取改善措施，以提升服務品質、迎接正式評鑑，依《長期照顧服務機構評鑑辦法》第五條規定，制定本辦法。",
      rowH(3)],
    ["第二條\n（自評週期）",
      "本機構每年至少辦理一次機構自評，時間安排如下：\n一、例行年度自評：每年九月至十月辦理，使機構有充足時間於正式評鑑前完成改善。\n二、臨時自評：如遇重大服務缺失事件、主管機關查核後、評鑑前六個月內，得額外辦理臨時自評。",
      rowH(5)],
  ];
  chap1.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["第二章　自評參與人員", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const chap2: [string, string, number][] = [
    ["第三條\n（召集人）",
      "業務負責人擔任自評召集人，統籌規劃自評工作，核定自評報告及改善計畫。",
      rowH(2)],
    ["第四條\n（評估小組）",
      "自評工作由下列人員組成評估小組：\n一、業務負責人：統籌、核定報告。\n二、督導員：負責照護品質（個案權益、服務執行、督導訪視）各大項自評。\n三、行政人員：負責行政管理（財務、人事、文書）各大項自評。\n四、外部顧問或同業夥伴（可選）：提供客觀意見。",
      rowH(7)],
  ];
  chap2.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["第三章　自評方式與工具", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const chap3: [string, string, number][] = [
    ["第五條\n（自評工具）",
      "使用主管機關公布之「長期照顧服務機構評鑑基準」作為自評工具，逐項填寫自評結果，自評分數以 A（完全符合）、B（大部分符合）、C（部分符合）、D（不符合）四等第標記。",
      rowH(4)],
    ["第六條\n（佐證資料蒐集）",
      "自評過程中，各評估小組成員應蒐集每個評鑑項目之佐證文件，確認文件齊全性（至少達到評鑑要求之 80% 以上），並記錄現有文件清單及缺漏文件。",
      rowH(3)],
    ["第七條\n（問題訪談）",
      "由督導員對隨機抽樣之三至五名照顧服務員進行訪談，確認其是否熟知機構規定（含申訴機制、緊急事件程序、隱私保護規定等）。訪談結果記錄於自評報告中。",
      rowH(4)],
  ];
  chap3.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["第四章　自評報告與呈報", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const chap4: [string, string, number][] = [
    ["第八條\n（自評報告內容）",
      "自評報告應包含：\n一、自評辦理日期、參與人員。\n二、各評鑑基準之自評評分及說明。\n三、佐證文件蒐集情形摘要。\n四、發現問題（評分為 C 或 D 者）清單。\n五、改善計畫（見次頁「自評改善計畫」）。",
      rowH(7)],
    ["第九條\n（報告呈報）",
      "自評報告完成後，由業務負責人核定並存入品質管理資料夾（紙本或電子檔），如主管機關要求提交，依規定辦理。自評報告保存五年。",
      rowH(3)],
  ];
  chap4.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["第五章　附則", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  push(["第十條\n（修訂）",
    "本辦法由機構負責人核定後實施，修訂時亦同。",
    rowH(2)]);
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  push(["負責人簽章：___________　　日期：中華民國　　年　　月　　日", ""], DATA_ROW_BASE_HEIGHT);
  setMergedData(cs, merge, r - 1, NC);

  return {
    name: "機構自評辦法",
    data,
    config: { columnlen: { "0": 180, "1": 680 }, rowlen, merge },
    cellStyles: cs,
  };
}

// ─── Sheet 2：自評改善計畫 ─────────────────────────────────────────────────────
function buildSelfAssessmentImprovementSheet(): SheetData {
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

  push([`___________居家服務機構　中華民國___年度自評改善計畫`], TITLE_ROW_HEIGHT);
  merge[`${r - 1}_0`] = { r: r - 1, c: 0, rs: 1, cs: 7 };
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true };

  push(["自評辦理日期：中華民國　　年　　月　　日　　核定人：___________"], DATA_ROW_BASE_HEIGHT);
  merge[`${r - 1}_0`] = { r: r - 1, c: 0, rs: 1, cs: 7 };
  cs[`${r - 1}_0`] = { ht: 0, vt: 0 };

  push(["說明：本計畫依年度機構自評發現之評分 C/D 項目，逐一訂定改善措施與完成時程，由業務負責人核定後追蹤執行情形。"], rowH(3));
  merge[`${r - 1}_0`] = { r: r - 1, c: 0, rs: 1, cs: 7 };
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, tb: 2 };

  const headers = ["評鑑項目", "問題說明（自評結果）", "根本原因分析", "改善措施", "負責人員", "預定完成日期", "改善結果（追蹤）"];
  push(headers, SECTION_HEADER_HEIGHT);
  for (let c = 0; c < 7; c++) cs[`${r - 1}_${c}`] = { ht: 0, vt: 0, bold: true, bg: "#EFEFEF" };

  const exampleRows = [
    ["項目 4\n申訴機制", "申訴管道公告位置不明顯，個案不知如何申訴（評分 C）", "申訴告示板尺寸過小，且未於服務說明中提及", "重新製作 A3 大尺寸申訴告示板，更新服務說明書加入申訴管道說明，職前訓練增列申訴介紹", "督導員", "___/___/___", "□ 完成　□ 待追蹤"],
    ["項目 10\n緊急事件", "照服員無法完整背誦緊急事件處理步驟（評分 C）", "緊急 SOP 未定期複習演練，照服員只靠職前訓練", "新增每半年一次 SOP 複習演練；製作隨身版緊急處置提示卡發給每位照服員", "督導員", "___/___/___", "□ 完成　□ 待追蹤"],
    ["項目 26\n感染管制", "抽查部分照服員手部衛生步驟不正確（評分 C）", "手部衛生訓練頻率不足，執行時間壓縮", "新增每季一次手部衛生實作稽核；服務包包內加入速乾洗手液提示卡", "督導員", "___/___/___", "□ 完成　□ 待追蹤"],
    ["（依自評結果填寫）", "", "", "", "", "", ""],
    ["（依自評結果填寫）", "", "", "", "", "", ""],
    ["（依自評結果填寫）", "", "", "", "", "", ""],
    ["（依自評結果填寫）", "", "", "", "", "", ""],
    ["（依自評結果填寫）", "", "", "", "", "", ""],
  ];

  exampleRows.forEach((row) => {
    push(row, rowH(3));
    for (let c = 0; c < 7; c++) cs[`${r - 1}_${c}`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["追蹤說明：每一改善措施應於預定完成日期後三十日內確認結果，督導員填寫「自評問題改善計畫追蹤表」，由業務負責人審閱後存檔。"], rowH(2));
  merge[`${r - 1}_0`] = { r: r - 1, c: 0, rs: 1, cs: 7 };
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, tb: 2 };

  push(["負責人簽章：___________　　日期：中華民國　　年　　月　　日"], DATA_ROW_BASE_HEIGHT);
  merge[`${r - 1}_0`] = { r: r - 1, c: 0, rs: 1, cs: 7 };
  cs[`${r - 1}_0`] = { ht: 0, vt: 0 };

  return {
    name: "自評改善計畫",
    data,
    config: {
      columnlen: { "0": 100, "1": 160, "2": 140, "3": 180, "4": 80, "5": 100, "6": 100 },
      rowlen,
      merge,
    },
    cellStyles: cs,
  };
}

/** 產生項目 30「機構自評」的 2 個自訂補充分頁 */
export function buildHomeCareItem30CustomSheets(): SheetData[] {
  return [
    buildSelfAssessmentProcedureSheet(),
    buildSelfAssessmentImprovementSheet(),
  ];
}
