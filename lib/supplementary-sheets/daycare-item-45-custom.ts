/**
 * 日照評鑑項目 45「機構權益保障（監視錄影設備）」自訂補充分頁
 *
 * 內容不套用通用 archetype，因為範本由「政策條文 / 查核表單 / SOP 流程」
 * 等異質版型組成。共產生 6 個獨立工作分頁。
 */
import type { SheetData } from "../excel-template-builder";

const HEADER_ROW_HEIGHT = 26;
const TITLE_ROW_HEIGHT = 30;
const DATA_ROW_BASE_HEIGHT = 30;
const NOTE_ROW_HEIGHT = 22;
const POLICY_SECTION_HEIGHT = 54;
const PIXELS_PER_BULLET_LINE = 24;
const SECTION_ROW_PADDING = 16;

function sectionRowHeight(numBullets: number): number {
  return Math.max(POLICY_SECTION_HEIGHT, numBullets * PIXELS_PER_BULLET_LINE + SECTION_ROW_PADDING);
}

type CellStyleMap = Record<
  string,
  { fc?: string; bg?: string; bold?: boolean; ht?: number; vt?: number; tb?: number }
>;
type MergeMap = Record<string, { r: number; c: number; rs: number; cs: number }>;

/**
 * 工具：產生「主標題列」樣式（合併整列、置中、粗體）
 */
function setTitleRow(
  cellStyles: CellStyleMap,
  merge: MergeMap,
  rowIndex: number,
  numCols: number,
) {
  cellStyles[`${rowIndex}_0`] = { ht: 0, vt: 0, bold: true };
  merge[`${rowIndex}_0`] = { r: rowIndex, c: 0, rs: 1, cs: numCols };
}

/**
 * 工具：產生「說明列」樣式（合併整列、靠左、灰字）
 */
function setNoteRow(
  cellStyles: CellStyleMap,
  merge: MergeMap,
  rowIndex: number,
  numCols: number,
) {
  cellStyles[`${rowIndex}_0`] = { ht: 1, vt: 0, fc: "#666666", tb: 2 };
  merge[`${rowIndex}_0`] = { r: rowIndex, c: 0, rs: 1, cs: numCols };
}

/**
 * 工具：產生「表頭列」樣式（置中、粗體）
 */
function setHeaderRow(cellStyles: CellStyleMap, rowIndex: number, numCols: number) {
  for (let c = 0; c < numCols; c++) {
    cellStyles[`${rowIndex}_${c}`] = { ht: 0, vt: 0, bold: true };
  }
}

/**
 * 工具：產生「資料列」樣式（靠左、上對齊、自動換行）
 */
function setDataRow(cellStyles: CellStyleMap, rowIndex: number, numCols: number) {
  for (let c = 0; c < numCols; c++) {
    cellStyles[`${rowIndex}_${c}`] = { ht: 1, vt: 1, tb: 2 };
  }
}

// ─── Sheet 1: 監視錄影設置辦法 ─────────────────────────────────────────
function buildPolicySheet(): SheetData {
  const numCols = 2;
  const data: string[][] = [];
  const cellStyles: CellStyleMap = {};
  const merge: MergeMap = {};
  const rowlen: Record<string, number> = {};

  // Row 0: 主標題
  data.push(["監視錄影設備設置及資訊管理利用辦法（範本）", ""]);
  setTitleRow(cellStyles, merge, 0, numCols);
  rowlen["0"] = TITLE_ROW_HEIGHT;

  const sections: Array<{ title: string; bullets: string[] }> = [
    {
      title: "宗旨",
      bullets: [
        "為維護受照顧者及工作人員安全，保障個人隱私，並確保錄影資料之妥善管理與利用，特訂定本辦法。",
      ],
    },
    {
      title: "攝影範圍限制",
      bullets: [
        "開放區域：出入口、公共活動區、走廊、備餐區。",
        "隱私禁區：嚴禁於浴室、廁所、更衣室、臥榻床位及其他涉及私人隱私之空間設置鏡頭。",
      ],
    },
    {
      title: "專責管理人員",
      bullets: [
        "由機構負責人指定專人（如行政組長或資訊人員）負責設備操作、管理及維護。",
        "人員異動時，應列入交代清冊，並重設存取密碼。",
      ],
    },
    {
      title: "影像儲存與保護",
      bullets: [
        "錄影影像應至少保存 30 日，屆期自動循環覆寫。",
        "主機應設於獨立空間或加鎖櫃內，非經授權不得接觸。",
      ],
    },
    {
      title: "調閱權限與程序",
      bullets: [
        "僅限負責人或專責人員因安全、爭議調查之需方得調閱。",
        "家屬或第三方申請調閱需填寫申請表，並經負責人核准。",
      ],
    },
    {
      title: "設備維護與異常處置",
      bullets: [
        "專責人員應每月進行自主檢查。",
        "發生設備損壞或資料外洩時，應於 24 小時內通報主管機關並執行修復 SOP。",
      ],
    },
  ];

  sections.forEach((s, idx) => {
    const row = idx + 1;
    const bulletText = s.bullets.map((b) => `• ${b}`).join("\n");
    data.push([`${idx + 1}. ${s.title}`, bulletText]);
    // Col 0（編號+標題）：靠左、上對齊、粗體
    cellStyles[`${row}_0`] = { ht: 1, vt: 1, bold: true, tb: 2 };
    // Col 1（內容）：靠左、上對齊、自動換行
    cellStyles[`${row}_1`] = { ht: 1, vt: 1, tb: 2 };
    rowlen[String(row)] = sectionRowHeight(s.bullets.length);
  });

  return {
    name: "監視錄影設置辦法",
    data,
    config: {
      columnlen: { "0": 200, "1": 620 },
      rowlen,
      merge,
    },
    cellStyles,
  };
}

// ─── 共用：表格分頁（title + note + header + samples + blanks） ─────
function buildTableSheet(params: {
  sheetName: string;
  title: string;
  note: string;
  headers: string[];
  samples: string[][];
  blankRows: number;
  blankTemplate?: string[]; // 空白列預填文字（如 "□正常"）
  columnWidths: number[];
}): SheetData {
  const numCols = params.headers.length;
  const data: string[][] = [];
  const cellStyles: CellStyleMap = {};
  const merge: MergeMap = {};
  const rowlen: Record<string, number> = {};

  // Row 0: 主標題
  data.push([params.title, ...Array(numCols - 1).fill("")]);
  setTitleRow(cellStyles, merge, 0, numCols);
  rowlen["0"] = TITLE_ROW_HEIGHT;

  // Row 1: 說明列
  data.push([params.note, ...Array(numCols - 1).fill("")]);
  setNoteRow(cellStyles, merge, 1, numCols);
  rowlen["1"] = NOTE_ROW_HEIGHT;

  // Row 2: 表頭
  data.push(params.headers);
  setHeaderRow(cellStyles, 2, numCols);
  rowlen["2"] = HEADER_ROW_HEIGHT;

  // 示範列 + 空白列
  let rowIdx = 3;
  params.samples.forEach((sample) => {
    data.push(sample);
    setDataRow(cellStyles, rowIdx, numCols);
    rowlen[String(rowIdx)] = DATA_ROW_BASE_HEIGHT;
    rowIdx++;
  });
  const blank = params.blankTemplate ?? Array(numCols).fill("");
  for (let i = 0; i < params.blankRows; i++) {
    data.push([...blank]);
    setDataRow(cellStyles, rowIdx, numCols);
    rowlen[String(rowIdx)] = DATA_ROW_BASE_HEIGHT;
    rowIdx++;
  }

  const columnlen: Record<string, number> = {};
  params.columnWidths.forEach((w, i) => {
    columnlen[String(i)] = w;
  });

  return {
    name: params.sheetName,
    data,
    config: { columnlen, rowlen, merge },
    cellStyles,
  };
}

// ─── Sheet 2: 保養維護紀錄表 ─────────────────────────────────────────
function buildMaintenanceSheet(): SheetData {
  return buildTableSheet({
    sheetName: "保養維護紀錄表",
    title: "監視錄影設備定期保養維護紀錄表",
    note: "評鑑要點：需每月執行，且留存至少一年紀錄。",
    headers: [
      "檢查日期",
      "鏡頭清潔",
      "錄影連續性",
      "儲存容量剩餘",
      "設備狀態",
      "檢查人",
      "備註",
    ],
    samples: [
      ["114/01/05", "□正常", "□正常", "__%", "□良好", "王小明", ""],
      ["114/02/05", "□正常", "□正常", "__%", "□良好", "王小明", ""],
    ],
    blankRows: 10,
    blankTemplate: ["", "□正常", "□正常", "__%", "□良好", "", ""],
    columnWidths: [110, 90, 100, 110, 90, 100, 160],
  });
}

// ─── Sheet 3: 調閱申請紀錄表 ─────────────────────────────────────────
function buildQuerySheet(): SheetData {
  return buildTableSheet({
    sheetName: "調閱申請紀錄表",
    title: "監視錄影資料查閱／調閱申請紀錄表",
    note: "評鑑要點：應包含日期、人員、目的及核可簽名。",
    headers: [
      "申請日期",
      "查閱人員",
      "查閱時間區段",
      "查閱目的",
      "授權核可簽署",
      "備註",
    ],
    samples: [
      [
        "114/01/10",
        "李專員",
        "114/01/09 14:00-15:00",
        "調查長輩跌倒經過",
        "（負責人蓋章）",
        "影像存檔另存備份",
      ],
    ],
    blankRows: 8,
    columnWidths: [110, 100, 180, 220, 140, 160],
  });
}

// ─── Sheet 4: 專責人員職掌表 ─────────────────────────────────────────
function buildDutySheet(): SheetData {
  const numCols = 2;
  const data: string[][] = [];
  const cellStyles: CellStyleMap = {};
  const merge: MergeMap = {};
  const rowlen: Record<string, number> = {};

  // Row 0: 主標題
  data.push(["監視器專責管理人員職掌表（納入工作說明書）", ""]);
  setTitleRow(cellStyles, merge, 0, numCols);
  rowlen["0"] = TITLE_ROW_HEIGHT;

  // Row 1: 姓名欄（Col 0 = 「姓名」標籤粗體，Col 1 = 空白填寫區）
  data.push(["姓名", ""]);
  cellStyles["1_0"] = { ht: 0, vt: 0, bold: true };
  cellStyles["1_1"] = { ht: 1, vt: 0 };
  rowlen["1"] = HEADER_ROW_HEIGHT;

  // Row 2: 表頭
  data.push(["職責項目", "內容"]);
  setHeaderRow(cellStyles, 2, numCols);
  rowlen["2"] = HEADER_ROW_HEIGHT;

  // Row 3~6: 4 項職責
  const duties = [
    "每日確認錄影燈號是否正常。",
    "每月執行設備清潔與儲存空間盤點。",
    "控管機房／主機櫃鑰匙。",
    "辦理資料調閱登記作業。",
  ];
  duties.forEach((d, i) => {
    const row = 3 + i;
    data.push([String(i + 1), d]);
    cellStyles[`${row}_0`] = { ht: 0, vt: 0, bold: true };
    cellStyles[`${row}_1`] = { ht: 1, vt: 1, tb: 2 };
    rowlen[String(row)] = DATA_ROW_BASE_HEIGHT;
  });

  return {
    name: "專責人員職掌表",
    data,
    config: {
      columnlen: { "0": 120, "1": 540 },
      rowlen,
      merge,
    },
    cellStyles,
  };
}

// ─── Sheet 5: 異常處置SOP ───────────────────────────────────────────
function buildSOPSheet(): SheetData {
  const numCols = 2;
  const data: string[][] = [];
  const cellStyles: CellStyleMap = {};
  const merge: MergeMap = {};
  const rowlen: Record<string, number> = {};

  // Row 0: 主標題
  data.push(["SOP 流程圖：監視器異常處置", ""]);
  setTitleRow(cellStyles, merge, 0, numCols);
  rowlen["0"] = TITLE_ROW_HEIGHT;

  const steps: Array<{ step: string; bullets: string[] }> = [
    {
      step: "① 異常發現",
      bullets: ["由專責人員每日點檢或維護檢查時發現異常狀況。"],
    },
    {
      step: "② 初步判斷",
      bullets: [
        "硬體損壞（鏡頭模糊、硬碟故障、無法錄影）→ 進入報修流程。",
        "資安外洩（影像遭外流、系統遭駭、未經授權之拷貝）→ 進入資安應變流程。",
      ],
    },
    {
      step: "③ 通報程序",
      bullets: [
        "對內：立即陳報機構負責人。",
        "對外（資安外洩）：24 小時內通報所在地社會局／長照中心。",
        "對外（刑事案件）：如涉及竊盜或蓄意破壞，向轄區派出所報案。",
      ],
    },
    {
      step: "④ 緊急補救",
      bullets: ["修復設備、更換帳號密碼、追蹤流向。"],
    },
    {
      step: "⑤ 結案與追蹤",
      bullets: ["作成異常處理紀錄並存檔（備評）。"],
    },
  ];

  steps.forEach((s, idx) => {
    const row = idx + 1;
    const bulletText = s.bullets.map((b) => `• ${b}`).join("\n");
    data.push([s.step, bulletText]);
    cellStyles[`${row}_0`] = { ht: 0, vt: 1, bold: true };
    cellStyles[`${row}_1`] = { ht: 1, vt: 1, tb: 2 };
    rowlen[String(row)] = sectionRowHeight(s.bullets.length);
  });

  return {
    name: "異常處置SOP",
    data,
    config: {
      columnlen: { "0": 140, "1": 640 },
      rowlen,
      merge,
    },
    cellStyles,
  };
}

// ─── Sheet 6: 異常處理紀錄表 ─────────────────────────────────────────
function buildIncidentSheet(): SheetData {
  return buildTableSheet({
    sheetName: "異常處理紀錄表",
    title: "附件：監視錄影系統異常／損壞處理紀錄表",
    note: "可與「保養紀錄表」放一起，專門處理突發狀況。",
    headers: [
      "發生／發現日期",
      "異常類型",
      "異常狀況描述",
      "處置措施與結果",
      "通報情形",
      "經辦人",
      "負責人",
    ],
    samples: [
      [
        "115/05/20",
        "□設備損壞 □影像外洩",
        "2 號鏡頭遭長輩誤觸移位，畫面全黑。",
        "已調整角度並加裝保護罩，測試錄影正常。",
        "□不需通報 □已通報（單位：     ）",
        "王大明",
        "（簽章）",
      ],
      [
        "115/06/15",
        "□設備損壞 □影像外洩",
        "硬碟故障，無法讀取近 3 日影像。",
        "聯繫廠商更換新硬碟，並恢復錄影功能。",
        "□不需通報 □已通報（單位：     ）",
        "王大明",
        "（簽章）",
      ],
    ],
    blankRows: 8,
    blankTemplate: [
      "",
      "□設備損壞 □影像外洩",
      "",
      "",
      "□不需通報 □已通報（單位：     ）",
      "",
      "",
    ],
    columnWidths: [120, 150, 220, 220, 180, 100, 120],
  });
}

/**
 * 產生日照項目 45 的 6 個自訂補充分頁
 */
export function buildDaycareItem45CustomSheets(): SheetData[] {
  return [
    buildPolicySheet(),
    buildMaintenanceSheet(),
    buildQuerySheet(),
    buildDutySheet(),
    buildSOPSheet(),
    buildIncidentSheet(),
  ];
}
