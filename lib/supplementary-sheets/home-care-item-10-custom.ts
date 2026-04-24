/**
 * 居家照顧評鑑項目 10「緊急事件處理」自訂補充分頁
 *
 * 產生 4 個工作分頁：
 *   1. 跌倒事件處理 SOP
 *   2. 急症事件處理 SOP
 *   3. 個案失蹤處理 SOP（純條文）
 *   4. 緊急聯絡窗口表（5 欄聯絡清單）
 *
 * 法源依據：
 *   - 長期照顧服務機構設立標準 §16（緊急事故應變措施）
 *   - 長期照顧服務法 §37（事故通報義務）
 *   - 衛生福利部居家服務督導員工作手冊（緊急事件處理建議）
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

// ─── Sheet 1：跌倒事件處理 SOP ────────────────────────────────────────────────
function buildFallSopSheet(): SheetData {
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

  push(["___________居家服務機構　跌倒事件處理標準作業程序（SOP）", ""], TITLE_ROW_HEIGHT);
  setTitleRow(cs, merge, r - 1, NC);

  push(["制定日期：中華民國　　年　　月　　日　　版次：第 1 版　　核定人：___________", ""], DATA_ROW_BASE_HEIGHT);
  setMergedData(cs, merge, r - 1, NC);

  push(["一、適用情形", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  push(["說明", "照顧服務員執行入戶服務期間，個案發生跌倒事件（包含跌倒後才被發現）。"], DATA_ROW_BASE_HEIGHT);
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  push(["二、立即處置步驟", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const steps: [string, string, number][] = [
    ["步驟 1\n（評估傷勢）",
      "【不要立即移動個案】先觀察並詢問個案傷勢：\n・是否有意識？能否回應？\n・是否有頭部撞傷、頸部疼痛？\n・是否有肢體嚴重疼痛、變形（疑似骨折）？\n・是否有出血？",
      rowH(6)],
    ["步驟 2\n（判斷是否叫救護車）",
      "若有以下任一情況，立即撥打 119：\n・意識不清或失去意識\n・疑似頭部撞傷或頸部受傷\n・疑似骨折（肢體變形、劇烈疼痛無法移動）\n・大量出血無法止血\n・個案自述嚴重疼痛或感覺不適\n若無上述情況，協助個案移至安全舒適位置後，進行後續通報。",
      rowH(9)],
    ["步驟 3\n（通報督導員）",
      "立即撥打督導員電話（見「緊急聯絡窗口表」），告知：\n・事件發生時間、地點\n・個案跌倒原因（如有所見）\n・個案當前狀態\n・是否已呼叫 119\n若督導員未接聽，依緊急聯絡窗口表之備用聯絡人順序繼續聯繫。",
      rowH(7)],
    ["步驟 4\n（通報家屬）",
      "督導員指示或照服員自行通知個案緊急聯絡人（家屬），告知事件發生情形及個案目前狀態。若個案需送醫，告知送往之醫院名稱。",
      rowH(3)],
    ["步驟 5\n（填寫事件紀錄）",
      "服務結束後二十四小時內，照服員填寫「緊急事件通報記錄表」，督導員完成審核並簽名。必要時（有明顯傷害或送醫）依機構程序通報主管機關。",
      rowH(3)],
  ];

  steps.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["三、跌倒後追蹤", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  push(["追蹤事項",
    "督導員應於事件發生後七日內訪視個案，確認以下事項：\n一、個案身體狀況是否已恢復或接受適當醫療。\n二、跌倒原因分析（環境因素、個案身體狀況等）。\n三、是否需調整居家環境（移除危險物品、加裝扶手等）。\n四、是否需修訂個別服務計畫。\n五、將追蹤結果記錄於「緊急事件追蹤改善紀錄表」。"], rowH(7));
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  push(["四、訓練要求", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  push(["訓練規定",
    "本 SOP 應列為職前訓練必修課程，並每年辦理一次實地演練，演練紀錄保存於訓練記錄表。"], rowH(2));
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  push(["負責人簽章：___________　　日期：中華民國　　年　　月　　日", ""], DATA_ROW_BASE_HEIGHT);
  setMergedData(cs, merge, r - 1, NC);

  return {
    name: "跌倒事件處理SOP",
    data,
    config: { columnlen: { "0": 180, "1": 680 }, rowlen, merge },
    cellStyles: cs,
  };
}

// ─── Sheet 2：急症事件處理 SOP ────────────────────────────────────────────────
function buildAcuteIllnessSopSheet(): SheetData {
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

  push(["___________居家服務機構　急症事件處理標準作業程序（SOP）", ""], TITLE_ROW_HEIGHT);
  setTitleRow(cs, merge, r - 1, NC);

  push(["制定日期：中華民國　　年　　月　　日　　版次：第 1 版　　核定人：___________", ""], DATA_ROW_BASE_HEIGHT);
  setMergedData(cs, merge, r - 1, NC);

  push(["一、適用情形", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  push(["說明", "照顧服務員執行入戶服務期間，個案發生急症（心肌梗塞、腦中風、呼吸困難、意識喪失、嚴重過敏等）。"], rowH(3));
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  push(["二、緊急警示症狀辨識", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  push(["警示症狀",
    "發現以下任一症狀應視為緊急，立即撥 119：\n・意識不清、呼之不應、叫不醒\n・呼吸困難、喘鳴、嘴唇或指甲發紫\n・胸痛或胸悶（尤其伴隨冒冷汗、手臂痠痛）\n・口眼歪斜、單側肢體無力、語言不清（中風三徵兆）\n・嚴重嘔吐、血便、黑便\n・體溫高達 39°C 以上且意識改變\n・嚴重過敏反應（呼吸困難、全身蕁麻疹、血壓驟降）"], rowH(10));
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  push(["三、立即處置步驟", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const steps: [string, string, number][] = [
    ["步驟 1\n（撥打 119）",
      "立即撥打 119，告知：個案姓名、地址（完整門牌）、症狀描述、意識狀態。保持電話通話，依救護員指示行動。",
      rowH(4)],
    ["步驟 2\n（基本急救）",
      "若個案無意識且無呼吸：\n・若受過 CPR 訓練，立即開始心肺復甦術（30 次按壓：2 次吹氣）。\n・若現場有 AED，立即使用。\n若個案有意識：協助其取舒適姿勢，勿給予飲食，維持呼吸道暢通，陪伴至救護員到達。",
      rowH(7)],
    ["步驟 3\n（通報督導員）",
      "在等待救護車期間或送醫後，立即聯繫督導員，告知個案狀況及送往之醫院。",
      rowH(2)],
    ["步驟 4\n（通報家屬）",
      "由督導員或照服員立即通知個案緊急聯絡人（家屬），告知個案狀況及送往醫院名稱地址。",
      rowH(2)],
    ["步驟 5\n（事件紀錄）",
      "服務結束後二十四小時內填寫「緊急事件通報記錄表」，督導員簽核後，重大傷亡事件依規定通報主管機關。",
      rowH(2)],
  ];

  steps.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["四、訓練要求", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  push(["訓練規定",
    "照顧服務員應完成急救訓練（含 CPR+AED 操作），建議每二年更新訓練認證。本 SOP 列為職前訓練必修。"], rowH(2));
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  push(["負責人簽章：___________　　日期：中華民國　　年　　月　　日", ""], DATA_ROW_BASE_HEIGHT);
  setMergedData(cs, merge, r - 1, NC);

  return {
    name: "急症事件處理SOP",
    data,
    config: { columnlen: { "0": 180, "1": 680 }, rowlen, merge },
    cellStyles: cs,
  };
}

// ─── Sheet 3：個案失蹤處理 SOP（純條文 NC=2）────────────────────────────────
function buildMissingSopSheet(): SheetData {
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

  push(["___________居家服務機構　個案失蹤處理標準作業程序（SOP）", ""], TITLE_ROW_HEIGHT);
  setTitleRow(cs, merge, r - 1, NC);

  push(["制定日期：中華民國　　年　　月　　日　　版次：第 1 版　　核定人：___________", ""], DATA_ROW_BASE_HEIGHT);
  setMergedData(cs, merge, r - 1, NC);

  push(["一、適用情形", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  push(["說明", "照顧服務員抵達個案住所後發現個案不在，或服務中個案未告知而離開，且無法透過電話聯繫到個案，且家屬不知個案行蹤。"], rowH(4));
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  push(["二、立即處置步驟", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const steps: [string, string, number][] = [
    ["步驟 1\n（初步確認）",
      "在住所周圍（門口、樓梯間、附近走廊）尋找個案，詢問鄰居是否見到個案，確認非其他合理原因（如個案外出散步、自行就醫等）。",
      rowH(3)],
    ["步驟 2\n（通報督導員）",
      "確認無法聯繫個案後（等待十五分鐘仍無音訊），立即通報督導員，告知：\n・發現個案失蹤的時間與情況\n・個案近日健康與認知狀況\n・個案常去場所",
      rowH(5)],
    ["步驟 3\n（通報家屬）",
      "督導員立即通知個案緊急聯絡人（家屬），請其協助尋找或提供可能去向。",
      rowH(2)],
    ["步驟 4\n（通報警察）",
      "如有認知症（失智症）病史、或一小時內仍無音訊：\n・撥打 110 報案，提供個案：姓名、身分證字號、年齡、身高體重、外觀特徵、最後著裝、可能去向。\n・同時通報本縣市「遊走老人協尋系統」（如各縣市社會局設有者）。",
      rowH(6)],
    ["步驟 5\n（持續追蹤）",
      "照服員留守原住所等待個案返回，直至督導員或家屬抵達為止（如需離開，應告知督導員）。找到個案後，督導員評估個案安全，並填寫「緊急事件通報記錄表」。",
      rowH(4)],
  ];

  steps.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["三、聯絡窗口", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  push(["說明",
    "緊急聯絡窗口清單詳見「緊急聯絡窗口表」分頁，照服員應隨身攜帶或熟記，每半年由督導員更新。"], rowH(2));
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  push(["負責人簽章：___________　　日期：中華民國　　年　　月　　日", ""], DATA_ROW_BASE_HEIGHT);
  setMergedData(cs, merge, r - 1, NC);

  return {
    name: "個案失蹤處理SOP",
    data,
    config: { columnlen: { "0": 180, "1": 680 }, rowlen, merge },
    cellStyles: cs,
  };
}

// ─── Sheet 4：緊急聯絡窗口表（5 欄）────────────────────────────────────────
function buildEmergencyContactSheet(): SheetData {
  const NC = 5;
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

  push(["___________居家服務機構　緊急聯絡窗口表"], TITLE_ROW_HEIGHT);
  merge[`${r - 1}_0`] = { r: r - 1, c: 0, rs: 1, cs: NC };
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true };

  push(["說明：本清單各欄位由督導員填寫後發給照顧服務員，每半年更新一次，照服員應隨身攜帶。"], DATA_ROW_BASE_HEIGHT);
  merge[`${r - 1}_0`] = { r: r - 1, c: 0, rs: 1, cs: NC };
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, tb: 2 };

  const headers = ["聯絡對象", "姓名", "電話", "備用電話", "備註"];
  push(headers, SECTION_HEADER_HEIGHT);
  for (let c = 0; c < NC; c++) cs[`${r - 1}_${c}`] = { ht: 0, vt: 0, bold: true, bg: "#EFEFEF" };

  const contacts = [
    ["督導員（主）", "___________", "___________", "___________", ""],
    ["督導員（備用）", "___________", "___________", "___________", ""],
    ["機構主任/負責人", "___________", "___________", "___________", ""],
    ["火警 / 急救", "119", "—", "—", ""],
    ["警察", "110", "—", "—", ""],
    ["個案家屬（第一聯絡人）", "___________", "___________", "___________", ""],
    ["個案家屬（第二聯絡人）", "___________", "___________", "___________", ""],
    ["縣市社會局申訴", "___________", "—", "—", ""],
  ];

  contacts.forEach((row) => {
    push(row, DATA_ROW_BASE_HEIGHT);
    for (let c = 0; c < NC; c++) cs[`${r - 1}_${c}`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["負責人簽章：___________　　日期：中華民國　　年　　月　　日"], DATA_ROW_BASE_HEIGHT);
  merge[`${r - 1}_0`] = { r: r - 1, c: 0, rs: 1, cs: NC };
  cs[`${r - 1}_0`] = { ht: 0, vt: 0 };

  return {
    name: "緊急聯絡窗口表",
    data,
    config: {
      columnlen: { "0": 160, "1": 120, "2": 120, "3": 120, "4": 200 },
      rowlen,
      merge,
    },
    cellStyles: cs,
  };
}

/** 產生項目 10「緊急事件處理」的 4 個自訂補充分頁 */
export function buildHomeCareItem10CustomSheets(): SheetData[] {
  return [
    buildFallSopSheet(),
    buildAcuteIllnessSopSheet(),
    buildMissingSopSheet(),
    buildEmergencyContactSheet(),
  ];
}
