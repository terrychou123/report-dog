/**
 * 居家照顧評鑑項目 26「感染管制」自訂補充分頁
 *
 * 產生 3 個工作分頁：
 *   1. 感染管制計畫（純條文 NC=2）
 *   2. 入戶感染管制SOP（純條文 NC=2）
 *   3. PPE防護表（5 欄）
 *
 * 法源依據：
 *   - 傳染病防治法 §37（醫事機構感染管制義務）
 *   - 長照機構感染管制措施指引（衛生福利部）
 *   - WHO 手部衛生六步驟（全球標準）
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

// ─── Sheet 1：感染管制計畫（純條文 NC=2）────────────────────────────────────
function buildInfectionControlPlanSheet(): SheetData {
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

  push(["___________居家服務機構　中華民國___年度感染管制計畫", ""], TITLE_ROW_HEIGHT);
  setTitleRow(cs, merge, r - 1, NC);

  push(["制定日期：中華民國　　年　　月　　日　　版次：第 1 版　　核定人：___________", ""], DATA_ROW_BASE_HEIGHT);
  setMergedData(cs, merge, r - 1, NC);

  push(["第一章　總則", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const chap1: [string, string, number][] = [
    ["第一條\n（目的）",
      "為預防感染症於居家服務過程中傳播，保障個案及服務人員之健康安全，依《傳染病防治法》第三十七條及衛生福利部長期照顧機構感染管制措施指引，制定本計畫。",
      rowH(3)],
    ["第二條\n（負責人員）",
      "本機構指定___________（職稱：___________）擔任感染管制負責人，負責推動本計畫之執行、監測及改善。",
      rowH(2)],
  ];
  chap1.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["第二章　感染管制措施", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const chap2: [string, string, number][] = [
    ["第三條\n（人員健康管理）",
      "一、照顧服務員於入戶服務前，如出現發燒（≥38°C）、腹瀉（一日三次以上）、嘔吐、皮膚潰瘍、上呼吸道感染症狀（咳嗽合併有痰、流鼻水）等，應立即通報督導員，暫停入戶服務，並就醫確認。\n二、確診法定傳染病（依《傳染病防治法》規定之一至四類傳染病）之人員，依規定停止入戶服務，取得醫師康復或解除隔離證明後方可復工。\n三、新進人員到職前應完成健康檢查（含胸部 X 光），並每年定期進行。",
      rowH(8)],
    ["第四條\n（標準預防措施）",
      "全體服務人員應落實以下標準預防措施（適用所有個案，不論其感染狀態）：\n一、手部衛生：依 WHO 六步驟於接觸前後執行洗手或手部酒精消毒（詳見「入戶感染管制SOP」分頁）。\n二、個人防護裝備（PPE）：依服務類型選用適當防護（詳見「PPE防護表」分頁）。\n三、環境及器材清潔消毒：依規定頻率清潔常接觸表面，消毒方式依各器材規定辦理。",
      rowH(6)],
    ["第五條\n（額外防護措施）",
      "當個案確診或疑似感染特殊病原體時（如流感、COVID-19、結核病、疥瘡等），督導員應評估是否需要採取額外防護措施（飛沫防護、接觸防護），並通知照服員，必要時暫停服務並通知家屬安排就醫。",
      rowH(4)],
  ];
  chap2.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["第三章　感染事件通報與處理", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const chap3: [string, string, number][] = [
    ["第六條\n（感染事件通報）",
      "發現下列情形時，照服員應立即通報督導員：\n一、個案出現疑似傳染病症狀（急性腸胃炎、呼吸道感染群聚、皮膚感染等）。\n二、照服員本身確診傳染病，且在確診前曾服務個案。\n督導員評估後，如符合《傳染病防治法》規定之通報情形，應依規定通報衛生主管機關，並記錄於「感染事件通報記錄表」。",
      rowH(8)],
    ["第七條\n（感染事件調查）",
      "感染事件通報後，督導員應：\n一、盤查可能感染來源及傳播途徑。\n二、確認是否有其他個案或服務人員受到影響。\n三、即刻採取相應的感染防控措施（如強化清潔消毒、換用防護裝備等）。\n四、追蹤個案後續情況，至少確認三次（七日）。",
      rowH(7)],
  ];
  chap3.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["第四章　教育訓練", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  push(["第八條\n（訓練規定）",
    "每年至少辦理一次感染管制教育訓練，新進人員職前訓練必修，訓練內容涵蓋：手部衛生、PPE 使用、個案感染症狀辨識、通報流程。訓練記錄存入教育訓練記錄表。"], rowH(3));
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  push(["第五章　監測與改善", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  push(["第九條\n（稽核頻率）",
    "督導員每季應抽查至少五名照服員之感染管制執行情形（含手部衛生、PPE 使用及器材清潔），結果記錄於「入戶手部衛生防護稽核表」，並於年度感染管制報告中彙整說明。"], rowH(3));
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  push(["第六章　附則", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  push(["第十條\n（修訂）",
    "本計畫每年至少修訂一次，依衛生主管機關最新指引更新，由負責人核定後實施。"], rowH(2));
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  push(["負責人簽章：___________　　日期：中華民國　　年　　月　　日", ""], DATA_ROW_BASE_HEIGHT);
  setMergedData(cs, merge, r - 1, NC);

  return {
    name: "感染管制計畫",
    data,
    config: { columnlen: { "0": 180, "1": 680 }, rowlen, merge },
    cellStyles: cs,
  };
}

// ─── Sheet 2：入戶感染管制SOP（純條文 NC=2）─────────────────────────────────
function buildInfectionControlSopSheet(): SheetData {
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

  push(["___________居家服務機構　入戶服務感染管制標準作業程序（SOP）", ""], TITLE_ROW_HEIGHT);
  setTitleRow(cs, merge, r - 1, NC);

  push(["制定日期：中華民國　　年　　月　　日　　版次：第 1 版　　核定人：___________", ""], DATA_ROW_BASE_HEIGHT);
  setMergedData(cs, merge, r - 1, NC);

  push(["一、手部衛生（WHO 六步驟）", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const sec1: [string, string, number][] = [
    ["執行時機",
      "應洗手（或使用酒精乾洗手）之五個時機（WHO My 5 Moments）：\n① 接觸個案前\n② 執行清潔/無菌操作前\n③ 接觸個案體液後\n④ 接觸個案後\n⑤ 接觸個案周遭環境後",
      rowH(7)],
    ["洗手步驟",
      "（含洗手乳：20–30 秒；酒精乾洗手：20–30 秒）\n步驟 1：掌心對掌心搓揉。\n步驟 2：手指交扣搓揉手背。\n步驟 3：手指交扣搓揉掌心。\n步驟 4：四指扣握拇指旋轉。\n步驟 5：弓形手指搓揉掌心（指甲清潔）。\n步驟 6：握住手腕旋轉搓揉。\n注意：流水洗手後以乾淨紙巾擦乾；如無流水，可使用 75% 酒精乾洗手替代。",
      rowH(10)],
  ];
  sec1.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["二、個人防護裝備（PPE）使用規定", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  push(["PPE 選用原則",
    "依服務類型選用適當防護裝備，各服務類型所需 PPE 詳見「PPE防護表」分頁。一般原則：\n一、一般家務協助（備餐、清潔）：建議戴手套及口罩。\n二、身體清潔照護：必須戴手套、外科口罩，建議穿防水圍裙。\n三、大小便協助：必須戴手套、口罩、防水圍裙。\n四、個案有疑似傳染病症狀：必須戴 N95 口罩、手套、防水圍裙，立即通報督導員。"], rowH(8));
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  push(["PPE 穿脫順序",
    "穿戴順序（由外到內，防止污染）：手部衛生 → 穿圍裙 → 戴口罩 → 戴手套\n脫除順序（由內到外，防止自我污染）：脫手套 → 手部衛生 → 脫圍裙 → 脫口罩 → 手部衛生\n脫除後立即丟棄於一般垃圾（非重複使用之 PPE），手部衛生後方可接觸其他物品。"], rowH(6));
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  push(["三、服務器材清潔與消毒", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const sec3: [string, string, number][] = [
    ["3-1\n清潔用具",
      "拖把、抹布使用後以清水沖洗乾淨，晾乾備用；不同個案之清潔用具建議分開使用，如共用，每次使用後以 1:100 稀釋漂白水浸泡十分鐘後沖洗晾乾。",
      rowH(4)],
    ["3-2\n照護用品",
      "體溫計：使用後以酒精棉片擦拭；血壓計袖帶：定期以酒精棉片擦拭（每週至少一次，或個案間使用後）；輪椅、助行器：定期（每週）以清水擦拭，污染後立即清潔。",
      rowH(4)],
    ["3-3\n廢棄物處理",
      "污染之廢棄物（使用後手套、口罩、紙尿布等）裝入垃圾袋後綁緊，依個案家庭垃圾處理規定丟棄。血液、體液污染之物品依地方衛生機關規定處理（如雙層包裝後丟棄）。",
      rowH(4)],
  ];
  sec3.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["四、感染事件通報流程", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  push(["通報步驟",
    "步驟 1：照服員發現個案或自身出現疑似傳染病症狀，立即通報督導員（電話聯繫）。\n步驟 2：督導員評估後，如符合通報標準，二十四小時內通報主管機關衛生局（傳染病通報專線：1922）。\n步驟 3：填寫「感染事件通報記錄表」，記錄事件經過、涉及人員、採取措施。\n步驟 4：追蹤個案後續情形，至少七日。\n步驟 5：事件結案後於月報或季報中彙整，作為感染管制改善參考。"], rowH(8));
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  push(["負責人簽章：___________　　日期：中華民國　　年　　月　　日", ""], DATA_ROW_BASE_HEIGHT);
  setMergedData(cs, merge, r - 1, NC);

  return {
    name: "入戶感染管制SOP",
    data,
    config: { columnlen: { "0": 180, "1": 680 }, rowlen, merge },
    cellStyles: cs,
  };
}

// ─── Sheet 3：PPE防護表（5 欄）───────────────────────────────────────────────
function buildPPETableSheet(): SheetData {
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

  push(["___________居家服務機構　入戶服務個人防護裝備（PPE）防護表"], TITLE_ROW_HEIGHT);
  merge[`${r - 1}_0`] = { r: r - 1, c: 0, rs: 1, cs: NC };
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true };

  push(["說明：依服務類型選用最低必要防護標準；個案有疑似傳染病症狀時，依第四列規定執行並立即通報督導員。"], rowH(2));
  merge[`${r - 1}_0`] = { r: r - 1, c: 0, rs: 1, cs: NC };
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, tb: 2 };

  const headers = ["服務類型", "手套", "口罩", "防水圍裙", "備註"];
  push(headers, SECTION_HEADER_HEIGHT);
  for (let c = 0; c < NC; c++) cs[`${r - 1}_${c}`] = { ht: 0, vt: 0, bold: true, bg: "#EFEFEF" };

  const ppeRows = [
    ["一般家務\n（備餐、清潔）", "建議", "建議\n（流感季必戴）", "依需要", ""],
    ["身體清潔\n（沐浴、擦浴）", "必戴\n（乳膠/丁腈）", "必戴\n（外科口罩）", "建議", "接觸皮膚分泌物時"],
    ["大小便協助\n（尿布更換）", "必戴", "必戴", "必戴", "接觸排泄物"],
    ["個案有疑似\n傳染病症狀", "必戴", "必戴 N95", "必戴", "立即通報督導員"],
    ["傷口照護\n（授權護理行為）", "無菌手套", "外科口罩", "依需要", "依護理師指示"],
  ];
  ppeRows.forEach((row) => {
    push(row, rowH(2));
    for (let c = 0; c < NC; c++) cs[`${r - 1}_${c}`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["負責人簽章：___________　　日期：中華民國　　年　　月　　日"], DATA_ROW_BASE_HEIGHT);
  merge[`${r - 1}_0`] = { r: r - 1, c: 0, rs: 1, cs: NC };
  cs[`${r - 1}_0`] = { ht: 0, vt: 0 };

  return {
    name: "PPE防護表",
    data,
    config: { columnlen: { "0": 160, "1": 120, "2": 130, "3": 100, "4": 150 }, rowlen, merge },
    cellStyles: cs,
  };
}

/** 產生項目 26「感染管制」的 3 個自訂補充分頁 */
export function buildHomeCareItem26CustomSheets(): SheetData[] {
  return [
    buildInfectionControlPlanSheet(),
    buildInfectionControlSopSheet(),
    buildPPETableSheet(),
  ];
}
