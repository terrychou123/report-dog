/**
 * 日照評鑑項目 24「工作手冊及行政規範」自訂補充分頁
 *
 * 新增第一章「組織概況」（2 分頁）+ 第二章「人事管理」（5 分頁），
 * 模擬一間小型日間照顧中心（30 位長者、8 位員工）的工作手冊範本。
 * 共產生 7 個獨立工作分頁。
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

function setTitleRow(cellStyles: CellStyleMap, merge: MergeMap, rowIndex: number, numCols: number) {
  cellStyles[`${rowIndex}_0`] = { ht: 0, vt: 0, bold: true };
  merge[`${rowIndex}_0`] = { r: rowIndex, c: 0, rs: 1, cs: numCols };
}

function setNoteRow(cellStyles: CellStyleMap, merge: MergeMap, rowIndex: number, numCols: number) {
  cellStyles[`${rowIndex}_0`] = { ht: 1, vt: 0, fc: "#666666", tb: 2 };
  merge[`${rowIndex}_0`] = { r: rowIndex, c: 0, rs: 1, cs: numCols };
}

function setHeaderRow(cellStyles: CellStyleMap, rowIndex: number, numCols: number) {
  for (let c = 0; c < numCols; c++) {
    cellStyles[`${rowIndex}_${c}`] = { ht: 0, vt: 0, bold: true };
  }
}

function setDataRow(cellStyles: CellStyleMap, rowIndex: number, numCols: number) {
  for (let c = 0; c < numCols; c++) {
    cellStyles[`${rowIndex}_${c}`] = { ht: 1, vt: 1, tb: 2 };
  }
}

/** 政策條文列：col 0 粗體標籤，col 1 起合併為內容區（適用複合型分頁） */
function setPolicyRow(
  cellStyles: CellStyleMap,
  merge: MergeMap,
  rowIndex: number,
  numCols: number,
) {
  cellStyles[`${rowIndex}_0`] = { ht: 1, vt: 1, bold: true, tb: 2 };
  cellStyles[`${rowIndex}_1`] = { ht: 1, vt: 1, tb: 2 };
  if (numCols > 2) {
    merge[`${rowIndex}_1`] = { r: rowIndex, c: 1, rs: 1, cs: numCols - 1 };
  }
}

// ─── 共用：表格型分頁（title + note + header + samples + blanks） ─────────
function buildTableSheet(params: {
  sheetName: string;
  title: string;
  note: string;
  headers: string[];
  samples: string[][];
  blankRows: number;
  blankTemplate?: string[];
  columnWidths: number[];
}): SheetData {
  const numCols = params.headers.length;
  const data: string[][] = [];
  const cellStyles: CellStyleMap = {};
  const merge: MergeMap = {};
  const rowlen: Record<string, number> = {};

  data.push([params.title, ...Array(numCols - 1).fill("")]);
  setTitleRow(cellStyles, merge, 0, numCols);
  rowlen["0"] = TITLE_ROW_HEIGHT;

  data.push([params.note, ...Array(numCols - 1).fill("")]);
  setNoteRow(cellStyles, merge, 1, numCols);
  rowlen["1"] = NOTE_ROW_HEIGHT;

  data.push(params.headers);
  setHeaderRow(cellStyles, 2, numCols);
  rowlen["2"] = HEADER_ROW_HEIGHT;

  let rowIdx = 3;
  for (const sample of params.samples) {
    data.push(sample);
    setDataRow(cellStyles, rowIdx, numCols);
    rowlen[String(rowIdx)] = DATA_ROW_BASE_HEIGHT;
    rowIdx++;
  }
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

  return { name: params.sheetName, data, config: { columnlen, rowlen, merge }, cellStyles };
}

// ─── 共用：純政策條文分頁（2 欄：規定事項 / 規定內容） ───────────────────
function buildPolicyOnlySheet(params: {
  sheetName: string;
  title: string;
  note: string;
  sections: Array<{ label: string; bullets: string[] }>;
}): SheetData {
  const numCols = 2;
  const data: string[][] = [];
  const cellStyles: CellStyleMap = {};
  const merge: MergeMap = {};
  const rowlen: Record<string, number> = {};

  data.push([params.title, ""]);
  setTitleRow(cellStyles, merge, 0, numCols);
  rowlen["0"] = TITLE_ROW_HEIGHT;

  data.push([params.note, ""]);
  setNoteRow(cellStyles, merge, 1, numCols);
  rowlen["1"] = NOTE_ROW_HEIGHT;

  data.push(["規定事項", "規定內容"]);
  setHeaderRow(cellStyles, 2, numCols);
  rowlen["2"] = HEADER_ROW_HEIGHT;

  let rowIdx = 3;
  for (const s of params.sections) {
    const bulletText = s.bullets.map((b) => `• ${b}`).join("\n");
    data.push([s.label, bulletText]);
    cellStyles[`${rowIdx}_0`] = { ht: 1, vt: 1, bold: true, tb: 2 };
    cellStyles[`${rowIdx}_1`] = { ht: 1, vt: 1, tb: 2 };
    rowlen[String(rowIdx)] = sectionRowHeight(s.bullets.length);
    rowIdx++;
  }

  return {
    name: params.sheetName,
    data,
    config: { columnlen: { "0": 160, "1": 620 }, rowlen, merge },
    cellStyles,
  };
}

// ═════════════════════════════════════════════════════════════════════════════
// 第一章：組織概況
// ═════════════════════════════════════════════════════════════════════════════

// Sheet 1: 組織架構圖
function buildOrgChartSheet(): SheetData {
  return buildTableSheet({
    sheetName: "組織架構圖",
    title: "○○日間照顧中心組織架構圖（範本）",
    note: "請依實際組織狀況修改；兼任職務請於「備註」欄說明。（核可日期：　年　月　日，負責人：　　　　）",
    headers: ["組織層級", "職稱", "員額（人）", "主要職責摘要 / 備註"],
    samples: [
      ["第一層（負責人）", "主任（負責人）", "1", "統籌機構行政、業務督導、對外代表；兼任行政督導"],
      ["第二層（專業人員）", "社工督導（社工師）", "1", "服務計畫擬定、家屬溝通、督導照服員；兼督導職"],
      ["第二層（專業人員）", "護理師", "1", "健康評估、用藥管理、急救處置"],
      ["第三層（直接服務）", "照顧服務員", "4", "日常生活協助、活動帶領、異常通報"],
      ["行政支援", "行政助理", "1", "文書、收費、差勤管理協助；兼任收費業務"],
      ["外包 / 委辦", "廚工", "1", "膳食製備（委外廠商，非正式員工）"],
      ["外包 / 委辦", "復康巴士司機", "2", "長者接送業務（委外廠商，非正式員工）"],
    ],
    blankRows: 3,
    columnWidths: [160, 160, 80, 320],
  });
}

// Sheet 2: 各職系職掌說明
function buildDutyDescSheet(): SheetData {
  const numCols = 3;
  const data: string[][] = [];
  const cellStyles: CellStyleMap = {};
  const merge: MergeMap = {};
  const rowlen: Record<string, number> = {};

  data.push(["各職系人員職掌說明（範本）", "", ""]);
  setTitleRow(cellStyles, merge, 0, numCols);
  rowlen["0"] = TITLE_ROW_HEIGHT;

  data.push([
    "請依服務單位實際分工調整，確認每位員工已簽名確認職掌書。（最近審閱日期：　年　月　日）",
    "",
    "",
  ]);
  setNoteRow(cellStyles, merge, 1, numCols);
  rowlen["1"] = NOTE_ROW_HEIGHT;

  data.push(["職稱", "主要職責", "兼任職務 / 備註"]);
  setHeaderRow(cellStyles, 2, numCols);
  rowlen["2"] = HEADER_ROW_HEIGHT;

  const roles: Array<[string, string, string, number]> = [
    [
      "主任（負責人）",
      "1. 統籌機構行政及業務運作\n2. 對外代表機構（主管機關、家屬、社區）\n3. 核定預算、簽核公文\n4. 員工績效考核與任免\n5. 緊急事件最終決策",
      "兼任行政督導",
      5,
    ],
    [
      "社工督導（社工師）",
      "1. 訂定個案服務計畫並定期評估\n2. 家屬溝通與關係維繫\n3. 督導照服員服務品質\n4. 活動設計與社區連結\n5. 保護性案件通報",
      "兼任督導職",
      5,
    ],
    [
      "護理師",
      "1. 入案健康評估與個別健康計畫\n2. 協助用藥管理及服藥紀錄\n3. 急救處置（CPR / AED）\n4. 感染控制衛教\n5. 與醫療機構溝通協調",
      "",
      5,
    ],
    [
      "照顧服務員（4人）",
      "1. 協助日常生活：盥洗、如廁、進食\n2. 帶領日常活動與康復訓練\n3. 異常狀況即時通報護理師 / 社工\n4. 環境整潔維護",
      "由社工督導督導",
      4,
    ],
    [
      "行政助理",
      "1. 文書處理、公文收發\n2. 費用收取與帳務紀錄\n3. 接待來訪家屬\n4. 排班及差勤管理協助",
      "兼任收費業務",
      4,
    ],
  ];

  let rowIdx = 3;
  for (const [title, duties, note, bulletCount] of roles) {
    data.push([title, duties, note]);
    cellStyles[`${rowIdx}_0`] = { ht: 0, vt: 1, bold: true };
    cellStyles[`${rowIdx}_1`] = { ht: 1, vt: 1, tb: 2 };
    cellStyles[`${rowIdx}_2`] = { ht: 0, vt: 1 };
    rowlen[String(rowIdx)] = sectionRowHeight(bulletCount);
    rowIdx++;
  }
  for (let i = 0; i < 3; i++) {
    data.push(["", "", ""]);
    setDataRow(cellStyles, rowIdx, numCols);
    rowlen[String(rowIdx)] = DATA_ROW_BASE_HEIGHT;
    rowIdx++;
  }

  return {
    name: "各職系職掌說明",
    data,
    config: { columnlen: { "0": 140, "1": 460, "2": 140 }, rowlen, merge },
    cellStyles,
  };
}

// ═════════════════════════════════════════════════════════════════════════════
// 第二章：人事管理
// ═════════════════════════════════════════════════════════════════════════════

// Sheet 3: 聘用規定
function buildHiringSheet(): SheetData {
  return buildPolicyOnlySheet({
    sheetName: "聘用規定",
    title: "人事聘用規定（範本）",
    note: "依《勞動基準法》、《性別工作平等法》、《長期照顧服務法》訂定；最近審閱：　年　月　日",
    sections: [
      {
        label: "一、任用資格",
        bullets: [
          "照顧服務員：持有照顧服務員職類技術士證或完成 90 小時訓練。",
          "護理師：持有本國護理師（或護士）執照，並向護理師公會辦理登錄。",
          "社工師：持有社會工作師執照，或符合主管機關規定之社工相關資格。",
          "行政人員：高中職（含）以上學歷，具相關工作經驗者優先。",
        ],
      },
      {
        label: "二、招募流程",
        bullets: [
          "公告職缺（政府就業平台、機構官網或內部推薦）。",
          "審查應徵資料 → 初試（電話）→ 複試（現場面試）→ 錄取通知。",
          "到職前須完成背景查核（良民證）及健康檢查（含胸部 X 光）。",
        ],
      },
      {
        label: "三、試用期",
        bullets: [
          "試用期為到職後 3 個月（全職）/ 1 個月（兼職）。",
          "試用期間，雙方均可提前終止契約，無須支付資遣費。",
          "試用期屆滿，主管完成評估後正式確認任用。",
        ],
      },
      {
        label: "四、勞動契約",
        bullets: [
          "到職日起 3 日內簽訂書面勞動契約，留存員工簽名正本。",
          "契約應載明：工作內容、薪資、工時、休假制度及保密義務。",
          "不得以口頭約定取代書面契約。",
        ],
      },
      {
        label: "五、到職報到程序",
        bullets: [
          "繳交學歷、證照、身分證影本、健康檢查表、緊急聯絡人資料。",
          "完成職前教育訓練（機構介紹、工作手冊閱讀、個資保護說明）。",
          "配發識別證、員工手冊、相關表單，確認打卡方式。",
        ],
      },
      {
        label: "六、離職與交接",
        bullets: [
          "月薪制員工離職須於 30 日前提出書面申請。",
          "離職前完成業務交接清冊（含個案資料、器材、帳務移交）。",
          "歸還識別證、鑰匙、員工手冊及機構財物。",
          "離職後保密義務持續有效（服務對象個人資料永久保密）。",
        ],
      },
    ],
  });
}

// Sheet 4: 福利制度
function buildBenefitsSheet(): SheetData {
  return buildPolicyOnlySheet({
    sheetName: "福利制度",
    title: "員工福利制度（範本）",
    note: "依《勞動基準法》、《勞工退休金條例》、《性別工作平等法》訂定；最近審閱：　年　月　日",
    sections: [
      {
        label: "一、社會保險",
        bullets: [
          "勞工保險：到職日起投保，月投保薪資依實際薪資申報。",
          "全民健康保險：同上，以機構為投保單位辦理。",
          "雇主依規定負擔保費機構份額（勞保 70%、健保 60%）。",
        ],
      },
      {
        label: "二、勞工退休金",
        bullets: [
          "依勞退新制，每月提繳員工薪資 6% 至個人退休金帳戶。",
          "員工可自願追加提繳（上限 6%），享所得稅扣除優惠。",
        ],
      },
      {
        label: "三、特別休假",
        bullets: [
          "年資 6 個月以上：3 天；1 年：7 天；2 年：10 天；3 年：14 天；5 年：15 天。",
          "年資 10 年以上每年增加 1 天，最多 30 天。",
          "年底未使用之特休，折算薪資給付或協商遞延（以機構政策為準）。",
        ],
      },
      {
        label: "四、各類假別",
        bullets: [
          "事假：全年 14 天（不給薪）。",
          "病假：有就醫證明 30 天給半薪，超過 30 天不給薪（最多 1 年）。",
          "婚假：8 天（給薪）。喪假：依親等 3–8 天（給薪）。",
          "產假：8 週（雇主全額給付）；陪產假：7 天（給薪）。",
          "公假：因業務或政府要求，全薪給付。",
        ],
      },
      {
        label: "五、年終獎金",
        bullets: [
          "每年 1 月依前年度考核等第核發；年資未滿 1 年者按比例計算。",
          "發放標準由負責人視機構年度盈餘及考核等第決定。",
        ],
      },
      {
        label: "六、教育訓練補助",
        bullets: [
          "機構負擔法定在職訓練費用（如照服員訓練、護理繼續教育積分）。",
          "員工自願進修與職務相關課程，申請補助最高 3,000 元/年，需事前核准並附憑據核銷。",
        ],
      },
      {
        label: "七、職工健康檢查",
        bullets: [
          "新進員工到職前須完成胸部 X 光及一般身體檢查。",
          "在職員工每 2 年補助一次健康檢查（補助上限 1,500 元，需附收據）。",
        ],
      },
    ],
  });
}

// Sheet 5: 差勤管理（政策 + 請假紀錄表複合版型）
function buildAttendanceSheet(): SheetData {
  const numCols = 7;
  const data: string[][] = [];
  const cellStyles: CellStyleMap = {};
  const merge: MergeMap = {};
  const rowlen: Record<string, number> = {};

  // ── 政策區 ─────────────────────────────────────────────────────────────
  data.push(["差勤管理規定（範本）", ...Array(numCols - 1).fill("")]);
  setTitleRow(cellStyles, merge, 0, numCols);
  rowlen["0"] = TITLE_ROW_HEIGHT;

  data.push([
    "依《勞動基準法》及本中心差勤管理要點辦理；最近審閱：　年　月　日",
    ...Array(numCols - 1).fill(""),
  ]);
  setNoteRow(cellStyles, merge, 1, numCols);
  rowlen["1"] = NOTE_ROW_HEIGHT;

  // 政策表頭（col 1 合併至 col numCols-1）
  let rowIdx = 2;
  data.push(["規定事項", "規定內容", ...Array(numCols - 2).fill("")]);
  setHeaderRow(cellStyles, rowIdx, 2);
  merge[`${rowIdx}_1`] = { r: rowIdx, c: 1, rs: 1, cs: numCols - 1 };
  rowlen[String(rowIdx)] = HEADER_ROW_HEIGHT;
  rowIdx++;

  const policySections: Array<{ label: string; bullets: string[] }> = [
    {
      label: "出勤時間",
      bullets: [
        "正常上班時間：週一至週五 08:00–17:00，午休 12:00–13:00。",
        "出勤以簽到簿或電子打卡紀錄為準，不得代打卡。",
      ],
    },
    {
      label: "加班補休",
      bullets: [
        "加班需事前填寫申請單，由主管核准後方可執行。",
        "補休應於 1 個月內完成，逾期依勞基法規定給付加班費。",
      ],
    },
    {
      label: "請假程序",
      bullets: [
        "填寫紙本或線上請假單 → 主管核准 → 行政記錄 → 安排代班。",
        "事假提前 1 天告知；急病假於當日出勤前通知（事後補單）。",
      ],
    },
    {
      label: "缺勤處理",
      bullets: [
        "未請假或未獲核准缺勤視為曠工，按日扣薪。",
        "連續曠工 3 日以上，機構得依《勞動基準法》終止勞動契約。",
      ],
    },
  ];

  for (const s of policySections) {
    const bulletText = s.bullets.map((b) => `• ${b}`).join("\n");
    data.push([s.label, bulletText, ...Array(numCols - 2).fill("")]);
    setPolicyRow(cellStyles, merge, rowIdx, numCols);
    rowlen[String(rowIdx)] = sectionRowHeight(s.bullets.length);
    rowIdx++;
  }

  // ── 請假紀錄表 ────────────────────────────────────────────────────────
  data.push(["附表：請假申請紀錄表（請逐月填報）", ...Array(numCols - 1).fill("")]);
  setTitleRow(cellStyles, merge, rowIdx, numCols);
  rowlen[String(rowIdx)] = TITLE_ROW_HEIGHT;
  rowIdx++;

  data.push(["請保留紙本請假單或佐證文件，以備評鑑查閱。", ...Array(numCols - 1).fill("")]);
  setNoteRow(cellStyles, merge, rowIdx, numCols);
  rowlen[String(rowIdx)] = NOTE_ROW_HEIGHT;
  rowIdx++;

  data.push(["員工姓名", "假別", "起始日期", "結束日期", "天數", "代班人員", "主管核准"]);
  setHeaderRow(cellStyles, rowIdx, numCols);
  rowlen[String(rowIdx)] = HEADER_ROW_HEIGHT;
  rowIdx++;

  const samples = [
    ["王○明", "事假", "115/03/10", "115/03/10", "1", "林○芬", "（主管簽章）"],
    ["陳○惠", "病假", "115/03/18", "115/03/19", "2", "黃○娟", "（主管簽章）"],
  ];
  for (const sample of samples) {
    data.push(sample);
    setDataRow(cellStyles, rowIdx, numCols);
    rowlen[String(rowIdx)] = DATA_ROW_BASE_HEIGHT;
    rowIdx++;
  }
  for (let i = 0; i < 10; i++) {
    data.push(Array(numCols).fill(""));
    setDataRow(cellStyles, rowIdx, numCols);
    rowlen[String(rowIdx)] = DATA_ROW_BASE_HEIGHT;
    rowIdx++;
  }

  return {
    name: "差勤管理",
    data,
    config: {
      columnlen: { "0": 130, "1": 100, "2": 110, "3": 110, "4": 70, "5": 110, "6": 110 },
      rowlen,
      merge,
    },
    cellStyles,
  };
}

// Sheet 6: 考績獎勵（政策 + 考核紀錄表複合版型）
function buildPerformanceSheet(): SheetData {
  const numCols = 6;
  const data: string[][] = [];
  const cellStyles: CellStyleMap = {};
  const merge: MergeMap = {};
  const rowlen: Record<string, number> = {};

  // ── 政策區 ─────────────────────────────────────────────────────────────
  data.push(["考績獎勵規定（範本）", ...Array(numCols - 1).fill("")]);
  setTitleRow(cellStyles, merge, 0, numCols);
  rowlen["0"] = TITLE_ROW_HEIGHT;

  data.push([
    "考核結果作為薪資調整、獎勵及晉升依據；最近審閱：　年　月　日",
    ...Array(numCols - 1).fill(""),
  ]);
  setNoteRow(cellStyles, merge, 1, numCols);
  rowlen["1"] = NOTE_ROW_HEIGHT;

  let rowIdx = 2;
  data.push(["規定事項", "規定內容", ...Array(numCols - 2).fill("")]);
  setHeaderRow(cellStyles, rowIdx, 2);
  merge[`${rowIdx}_1`] = { r: rowIdx, c: 1, rs: 1, cs: numCols - 1 };
  rowlen[String(rowIdx)] = HEADER_ROW_HEIGHT;
  rowIdx++;

  const policySections: Array<{ label: string; bullets: string[] }> = [
    {
      label: "考核週期",
      bullets: [
        "期中考核：每年 6 月，由直屬主管完成。",
        "年終考核：每年 12 月，作為全年等第依據。",
      ],
    },
    {
      label: "評核向度",
      bullets: [
        "服務品質（30%）：服務態度、案主滿意度、記錄品質。",
        "工作態度（25%）：出缺勤、團隊協作、配合度。",
        "專業知識（25%）：在職訓練出席率、專業能力展現。",
        "學習成長（10%）：自主學習、建議改善。",
        "出勤紀錄（10%）：遲到早退次數、請假天數。",
      ],
    },
    {
      label: "考核等第",
      bullets: [
        "優等（90 分以上）：核發績效獎金或調薪。",
        "甲等（80–89 分）：正常年度調薪。",
        "乙等（70–79 分）：不調薪，列入輔導計畫。",
        "丙等（70 分以下）：停止調薪；連續兩次丙等得依勞基法終止契約。",
      ],
    },
    {
      label: "申訴程序",
      bullets: [
        "對考核結果有異議者，於公布後 7 日內向機構負責人提書面申訴。",
        "負責人於 14 日內作成決定，申訴期間考核結果暫緩生效。",
      ],
    },
  ];

  for (const s of policySections) {
    const bulletText = s.bullets.map((b) => `• ${b}`).join("\n");
    data.push([s.label, bulletText, ...Array(numCols - 2).fill("")]);
    setPolicyRow(cellStyles, merge, rowIdx, numCols);
    rowlen[String(rowIdx)] = sectionRowHeight(s.bullets.length);
    rowIdx++;
  }

  // ── 考核紀錄表 ────────────────────────────────────────────────────────
  data.push(["附表：年度考核紀錄", ...Array(numCols - 1).fill("")]);
  setTitleRow(cellStyles, merge, rowIdx, numCols);
  rowlen[String(rowIdx)] = TITLE_ROW_HEIGHT;
  rowIdx++;

  data.push([
    "期中與年終考核分數均需填入，最終等第以年終考核為準。",
    ...Array(numCols - 1).fill(""),
  ]);
  setNoteRow(cellStyles, merge, rowIdx, numCols);
  rowlen[String(rowIdx)] = NOTE_ROW_HEIGHT;
  rowIdx++;

  data.push(["員工姓名", "職稱", "期中考核（分）", "年終考核（分）", "年度等第", "主管簽章"]);
  setHeaderRow(cellStyles, rowIdx, numCols);
  rowlen[String(rowIdx)] = HEADER_ROW_HEIGHT;
  rowIdx++;

  const samples = [
    ["王○明", "照顧服務員", "85", "88", "甲等", "（主管簽章）"],
    ["陳○惠", "護理師", "92", "91", "優等", "（主管簽章）"],
  ];
  for (const sample of samples) {
    data.push(sample);
    setDataRow(cellStyles, rowIdx, numCols);
    rowlen[String(rowIdx)] = DATA_ROW_BASE_HEIGHT;
    rowIdx++;
  }
  for (let i = 0; i < 8; i++) {
    data.push(Array(numCols).fill(""));
    setDataRow(cellStyles, rowIdx, numCols);
    rowlen[String(rowIdx)] = DATA_ROW_BASE_HEIGHT;
    rowIdx++;
  }

  return {
    name: "考績獎勵",
    data,
    config: {
      columnlen: { "0": 110, "1": 110, "2": 120, "3": 120, "4": 100, "5": 110 },
      rowlen,
      merge,
    },
    cellStyles,
  };
}

// Sheet 7: 職災通報流程（SOP + 通報紀錄表複合版型）
function buildIncidentSOPSheet(): SheetData {
  const numCols = 7;
  const data: string[][] = [];
  const cellStyles: CellStyleMap = {};
  const merge: MergeMap = {};
  const rowlen: Record<string, number> = {};

  // ── SOP 區 ─────────────────────────────────────────────────────────────
  data.push(["職業災害通報與處理 SOP（範本）", ...Array(numCols - 1).fill("")]);
  setTitleRow(cellStyles, merge, 0, numCols);
  rowlen["0"] = TITLE_ROW_HEIGHT;

  data.push([
    "依《職業安全衛生法》第 37 條：嚴重職災（死亡 / 重傷）須於 8 小時內通報勞動部；一般職災 24 小時內通知地方主管機關。",
    ...Array(numCols - 1).fill(""),
  ]);
  setNoteRow(cellStyles, merge, 1, numCols);
  rowlen["1"] = NOTE_ROW_HEIGHT + 8;

  let rowIdx = 2;
  data.push(["處理步驟", "說明與時限要求", ...Array(numCols - 2).fill("")]);
  setHeaderRow(cellStyles, rowIdx, 2);
  merge[`${rowIdx}_1`] = { r: rowIdx, c: 1, rs: 1, cs: numCols - 1 };
  rowlen[String(rowIdx)] = HEADER_ROW_HEIGHT;
  rowIdx++;

  const steps: Array<{ step: string; bullets: string[] }> = [
    {
      step: "① 立即處置",
      bullets: [
        "停止危險作業，協助傷者就醫（視情況撥打 119 或陪同就診）。",
        "通知現場人員維持秩序，避免二次傷害。",
      ],
    },
    {
      step: "② 保全現場",
      bullets: [
        "維持現場狀態，以照片記錄事故位置、設備及環境。",
        "非必要不移動器物，待機關查驗後方可清理。",
      ],
    },
    {
      step: "③ 對內通報",
      bullets: [
        "立即以電話告知機構負責人（不得超過 1 小時）。",
        "由負責人決定是否啟動緊急應變程序。",
      ],
    },
    {
      step: "④ 對外通報",
      bullets: [
        "嚴重職災（死亡 / 重傷 / 1 人以上住院）→ 8 小時內電話通報勞動部職安署（02-8995-6666）。",
        "一般職災 → 24 小時內通知所在地社會局 / 長照管理中心。",
        "涉及個資外洩或公共安全，另行依個資法及消防法通報。",
      ],
    },
    {
      step: "⑤ 後續調查與改善",
      bullets: [
        "配合主管機關調查事故原因，提出書面改善措施。",
        "協助傷者辦理勞保職災給付申請。",
        "填寫職災通報紀錄表（見附表），存入人事檔案，留存 5 年。",
      ],
    },
  ];

  for (const s of steps) {
    const bulletText = s.bullets.map((b) => `• ${b}`).join("\n");
    data.push([s.step, bulletText, ...Array(numCols - 2).fill("")]);
    cellStyles[`${rowIdx}_0`] = { ht: 0, vt: 1, bold: true };
    cellStyles[`${rowIdx}_1`] = { ht: 1, vt: 1, tb: 2 };
    merge[`${rowIdx}_1`] = { r: rowIdx, c: 1, rs: 1, cs: numCols - 1 };
    rowlen[String(rowIdx)] = sectionRowHeight(s.bullets.length);
    rowIdx++;
  }

  // ── 通報紀錄表 ────────────────────────────────────────────────────────
  data.push(["附表：職業災害事件通報紀錄表", ...Array(numCols - 1).fill("")]);
  setTitleRow(cellStyles, merge, rowIdx, numCols);
  rowlen[String(rowIdx)] = TITLE_ROW_HEIGHT;
  rowIdx++;

  data.push([
    "請於事故處理後 24 小時內完成填寫，並由負責人簽章後存檔。",
    ...Array(numCols - 1).fill(""),
  ]);
  setNoteRow(cellStyles, merge, rowIdx, numCols);
  rowlen[String(rowIdx)] = NOTE_ROW_HEIGHT;
  rowIdx++;

  data.push(["發生日期", "員工姓名", "事故類型", "事故簡述", "處置措施", "通報機關", "負責人簽章"]);
  setHeaderRow(cellStyles, rowIdx, numCols);
  rowlen[String(rowIdx)] = HEADER_ROW_HEIGHT;
  rowIdx++;

  const samples = [
    [
      "115/05/03",
      "王○明",
      "跌倒傷害",
      "搬運輔具時滑倒，左手腕扭傷，送醫診治。",
      "協助就醫、填寫職災通報單、申請勞保給付。",
      "地方社會局（已通報）",
      "（負責人簽章）",
    ],
  ];
  for (const sample of samples) {
    data.push(sample);
    setDataRow(cellStyles, rowIdx, numCols);
    rowlen[String(rowIdx)] = DATA_ROW_BASE_HEIGHT + 10;
    rowIdx++;
  }
  const blankTemplate = [
    "",
    "",
    "□跌倒 □燙傷 □物體打擊 □其他",
    "",
    "",
    "□地方社會局 □勞動部 □無需通報",
    "",
  ];
  for (let i = 0; i < 8; i++) {
    data.push([...blankTemplate]);
    setDataRow(cellStyles, rowIdx, numCols);
    rowlen[String(rowIdx)] = DATA_ROW_BASE_HEIGHT;
    rowIdx++;
  }

  return {
    name: "職災通報流程",
    data,
    config: {
      columnlen: { "0": 100, "1": 100, "2": 140, "3": 200, "4": 180, "5": 160, "6": 110 },
      rowlen,
      merge,
    },
    cellStyles,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// [補] 工作手冊缺失節（依法規第 24 項 criteria 2 補齊）
// 法規明文要求工作手冊應包含：個資保護、員工申訴相關流程、緊急事件求助與通報聯繫窗口
// ─────────────────────────────────────────────────────────────────────────────

/** [補] 個資保護政策 */
function build補_個資保護政策Sheet(): SheetData {
  const numCols = 2;
  const cellStyles: CellStyleMap = {};
  const merge: MergeMap = {};
  const rowlen: Record<string, number> = {};
  let rowIdx = 0;

  const data: string[][] = [];

  // 標題列
  data.push(['[補] 個人資料保護政策', '']);
  setTitleRow(cellStyles, merge, rowIdx, numCols);
  rowlen[String(rowIdx)] = TITLE_ROW_HEIGHT;
  rowIdx++;

  // 法規依據說明
  data.push(['依個人資料保護法及長期照顧服務法相關規定，本機構訂定以下個資保護規範。\n本文件為工作手冊第三章「個人資料保護」，至少每年審閱一次。', '']);
  setNoteRow(cellStyles, merge, rowIdx, numCols);
  rowlen[String(rowIdx)] = 60;
  rowIdx++;

  const sections = [
    {
      title: '一、個資蒐集目的',
      content: '1. 蒐集目的：提供長期照顧服務、機構管理、政府申報及評鑑所需\n2. 蒐集項目：個案姓名、身分證號、聯絡資訊、健康狀況、照顧計畫及相關評估紀錄\n3. 非必要資料不得蒐集；蒐集前應取得當事人或法定代理人書面同意',
    },
    {
      title: '二、個資利用範圍',
      content: '1. 限本機構服務提供所需範圍內利用\n2. 不得將個資提供予無關第三方；委外時需簽訂保密協定\n3. 員工離職後應繼續遵守保密義務',
    },
    {
      title: '三、個資保存期限',
      content: '1. 長照服務紀錄依長照服務法第 38 條規定保存 7 年\n2. 超過保存期限之資料，以確保無法還原之方式銷毀（紙本碎紙、電子永久刪除）',
    },
    {
      title: '四、當事人權利（個資法第 3 條）',
      content: '當事人得就其個人資料行使下列權利：\n1. 查詢或請求閱覽\n2. 請求製給複製本\n3. 請求補充或更正\n4. 請求停止蒐集、處理或利用\n5. 請求刪除（若無保存義務衝突）\n申請方式：填寫「個案資料借閱申請表」，經主管核准後執行',
    },
    {
      title: '五、資安保護措施',
      content: '1. 紙本個案資料鎖存於專用文件櫃，非授權人員不得取閱\n2. 電子系統設有帳號密碼管控，每人一帳號，定期更換密碼\n3. 辦公電腦設置螢幕自動鎖定（閒置 5 分鐘）\n4. 機密文件列印後不得遺忘於印表機',
    },
    {
      title: '六、個資外洩通報流程',
      content: '1. 發現個資外洩或疑似外洩時，立即通報主管\n2. 主管評估影響範圍，若屬重大外洩，24 小時內通報主管機關\n3. 通知受影響當事人，說明事件及因應措施\n4. 紀錄外洩事件處理情形並追蹤改善',
    },
    {
      title: '七、本政策審閱紀錄',
      content: '審閱日期：___________　審閱人：___________　版次：___________',
    },
  ];

  for (const section of sections) {
    // 節標題列
    data.push([section.title, '']);
    cellStyles[`${rowIdx}_0`] = { bold: true, ht: 1, vt: 0 };
    merge[`${rowIdx}_0`] = { r: rowIdx, c: 0, rs: 1, cs: numCols };
    rowlen[String(rowIdx)] = HEADER_ROW_HEIGHT;
    rowIdx++;

    // 內容列
    const lines = section.content.split('\n').length;
    data.push(['', section.content]);
    setDataRow(cellStyles, rowIdx, numCols);
    rowlen[String(rowIdx)] = sectionRowHeight(lines);
    rowIdx++;
  }

  return {
    name: '[補] 個資保護政策',
    data,
    config: {
      columnlen: { '0': 160, '1': 620 },
      rowlen,
      merge,
    },
    cellStyles,
  };
}

/** [補] 員工申訴流程 */
function build補_員工申訴流程Sheet(): SheetData {
  const numCols = 2;
  const cellStyles: CellStyleMap = {};
  const merge: MergeMap = {};
  const rowlen: Record<string, number> = {};
  let rowIdx = 0;

  const data: string[][] = [];

  data.push(['[補] 員工申訴流程', '']);
  setTitleRow(cellStyles, merge, rowIdx, numCols);
  rowlen[String(rowIdx)] = TITLE_ROW_HEIGHT;
  rowIdx++;

  data.push(['依性別工作平等法、勞動基準法及本機構工作規則訂定，適用全體員工（含工作人員間、工作人員與個案/家屬間）。\n本文件為工作手冊第四章「員工申訴」，至少每年審閱一次。', '']);
  setNoteRow(cellStyles, merge, rowIdx, numCols);
  rowlen[String(rowIdx)] = 60;
  rowIdx++;

  const sections = [
    {
      title: '一、申訴管道',
      content: '1. 書面申訴：填寫「員工申訴表」，投入機構申訴箱（設於___________）\n2. 電子申訴：發送郵件至申訴信箱 ___________（由主管機關指定）\n3. 電話申訴：聯絡業務負責人/督導 ___________\n4. 外部管道：臺北市政府社會局 ___________、勞動局 ___________',
    },
    {
      title: '二、受理流程',
      content: '1. 收到申訴後 3 個工作日內確認受理，並通知申訴人\n2. 指定申訴調查委員（需迴避與事件相關人員）\n3. 調查期間不超過 30 日（複雜案件得延長 30 日）\n4. 調查結果書面通知申訴人，並說明處理結果及後續追蹤計畫',
    },
    {
      title: '三、處理時限',
      content: '1. 受理確認：3 個工作日\n2. 初步調查：10 個工作日\n3. 最終結論通知：30 個工作日（自受理日起）\n4. 若無法在時限內完成，需向申訴人說明原因',
    },
    {
      title: '四、保密原則',
      content: '1. 申訴案件相關資訊限參與處理人員知悉\n2. 調查紀錄存放於申訴專用文件櫃，非授權人員不得取閱\n3. 申訴人身分及申訴內容除法規要求外，不得對外揭露',
    },
    {
      title: '五、不利對待禁止',
      content: '1. 機構不得因員工提出申訴而給予解僱、降調、減薪、不當調職等不利處分\n2. 如受到不利對待，員工得向臺北市政府勞動局或社會局提出申訴\n3. 任何阻礙申訴或報復申訴人之行為，依法追究責任',
    },
    {
      title: '六、本流程審閱紀錄',
      content: '審閱日期：___________　審閱人：___________　版次：___________',
    },
  ];

  for (const section of sections) {
    data.push([section.title, '']);
    cellStyles[`${rowIdx}_0`] = { bold: true, ht: 1, vt: 0 };
    merge[`${rowIdx}_0`] = { r: rowIdx, c: 0, rs: 1, cs: numCols };
    rowlen[String(rowIdx)] = HEADER_ROW_HEIGHT;
    rowIdx++;

    const lines = section.content.split('\n').length;
    data.push(['', section.content]);
    setDataRow(cellStyles, rowIdx, numCols);
    rowlen[String(rowIdx)] = sectionRowHeight(lines);
    rowIdx++;
  }

  return {
    name: '[補] 員工申訴流程',
    data,
    config: {
      columnlen: { '0': 160, '1': 620 },
      rowlen,
      merge,
    },
    cellStyles,
  };
}

/** [補] 緊急事件聯繫窗口（含職安法 8hr 通報、長照法 24hr 通報等法定時限） */
function build補_緊急聯繫窗口Sheet(): SheetData {
  const numCols = 4;
  const cellStyles: CellStyleMap = {};
  const merge: MergeMap = {};
  const rowlen: Record<string, number> = {};
  let rowIdx = 0;

  const data: string[][] = [];

  data.push(['[補] 緊急事件聯繫窗口', '', '', '']);
  setTitleRow(cellStyles, merge, rowIdx, numCols);
  rowlen[String(rowIdx)] = TITLE_ROW_HEIGHT;
  rowIdx++;

  data.push(['依長期照顧服務法第 19 條、職業安全衛生法第 37 條及長期照顧服務機構設立許可及管理辦法第 36 條，本機構訂定緊急事件通報聯繫窗口。\n法定通報時限：嚴重職業災害 8hr 內通報勞動部；服務對象事故 24hr 內通知地方主管機關；重大服務事故 2hr 內通報主管機關。', '', '', '']);
  setNoteRow(cellStyles, merge, rowIdx, numCols);
  rowlen[String(rowIdx)] = 80;
  rowIdx++;

  // 欄頭列
  data.push(['聯繫對象', '聯繫電話', '通報時限', '備註']);
  setHeaderRow(cellStyles, rowIdx, numCols);
  rowlen[String(rowIdx)] = HEADER_ROW_HEIGHT;
  rowIdx++;

  const contacts = [
    ['【機構內部】業務負責人', '___________', '立即', '24 小時聯絡'],
    ['【機構內部】值班督導/護理師', '___________', '立即', ''],
    ['【醫療】119 急救', '119', '立即', '情況危急時先撥 119'],
    ['【警察】110', '110', '立即', '犯罪/暴力事件'],
    ['【主管機關】臺北市政府社會局', '(02)27208889', '24hr 內', '服務對象事故；重大事故 2hr 內'],
    ['【主管機關】臺北市政府勞動局', '1999 轉 2', '8hr 內（嚴重職災）', '職業災害通報'],
    ['【中央】勞動部職安署', '0800-085-151', '8hr 內（嚴重職災）', '致死或重傷職災'],
    ['【衛生】疾管署疫情通報', '1922', '依疾病通報時限', '法定傳染病、群聚感染'],
    ['【家屬聯絡】個案緊急聯絡人', '___________', '事件發生後盡速', '見個案照顧計畫'],
  ];

  for (const contact of contacts) {
    data.push(contact);
    setDataRow(cellStyles, rowIdx, numCols);
    rowlen[String(rowIdx)] = DATA_ROW_BASE_HEIGHT;
    rowIdx++;
  }

  // 備注列
  data.push(['注意事項：通報後應留存通報紀錄（時間、受理人、通報內容），並於事後進行事件檢討分析（見意外事件報告表及事件檢討分析報告表）。', '', '', '']);
  setNoteRow(cellStyles, merge, rowIdx, numCols);
  rowlen[String(rowIdx)] = NOTE_ROW_HEIGHT * 2;
  rowIdx++;

  return {
    name: '[補] 緊急事件聯繫窗口',
    data,
    config: {
      columnlen: { '0': 240, '1': 160, '2': 180, '3': 200 },
      rowlen,
      merge,
    },
    cellStyles,
  };
}

// ─────────────────────────────────────────────────────────────────────────────

export function buildDaycareItem24CustomSheets(): SheetData[] {
  return [
    buildOrgChartSheet(),
    buildDutyDescSheet(),
    buildHiringSheet(),
    buildBenefitsSheet(),
    buildAttendanceSheet(),
    buildPerformanceSheet(),
    buildIncidentSOPSheet(),
    // [補] 法規第 24 項缺漏的 3 節：個資保護、員工申訴、緊急聯繫窗口
    build補_個資保護政策Sheet(),
    build補_員工申訴流程Sheet(),
    build補_緊急聯繫窗口Sheet(),
  ];
}
