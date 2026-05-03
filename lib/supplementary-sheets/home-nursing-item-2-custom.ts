/**
 * 居家護理所評鑑項目 2「感染管制作業與器材維護管理」自訂補充分頁
 *
 * 產生 3 個工作分頁：
 *   1. 感染管制作業手冊（政策條文 NC=2，6 章）
 *   2. 感控手冊版本登記表（7 欄，含 3 列範例）
 *   3. 流感疫苗接種記錄表（8 欄，含 3 列範例，附試評說明）
 *
 * 法源依據：
 *   - 護理人員法 §14、§19
 *   - 醫療機構執行感染控制措施及查核辦法
 *   - 傳染病防治法 §37
 *   - 衛生福利部疾管署感染管制相關指引（手部衛生/傳染病/肺結核/疥瘡）
 */
import type { SheetData } from "../excel-template-builder";

const TITLE_ROW_HEIGHT = 32;
const SECTION_HEADER_HEIGHT = 26;
const DATA_ROW_BASE_HEIGHT = 30;
const HEADER_ROW_HEIGHT = 26;

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

// ─── Sheet 1：感染管制作業手冊（純條文 NC=2）──────────────────────────────────
function buildHomeNursingInfectionControlManual(): SheetData {
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

  push(["___________居家護理所　中華民國___年度感染管制作業手冊", ""], TITLE_ROW_HEIGHT);
  setTitleRow(cs, merge, r - 1, NC);

  push(["制定日期：中華民國　　年　　月　　日　　版次：第 1 版　　核定人（負責護理人員）：___________", ""], DATA_ROW_BASE_HEIGHT);
  setMergedData(cs, merge, r - 1, NC);

  // 第一章 總則
  push(["第一章　總則", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const chap1: [string, string, number][] = [
    ["第一條\n（目的）",
      "為預防感染症於居家護理訪視過程中傳播，保障個案及護理人員之健康安全，依《護理人員法》第十四條、第十九條、《醫療機構執行感染控制措施及查核辦法》及衛生福利部疾病管制署相關感染管制指引，制定本手冊。",
      rowH(3)],
    ["第二條\n（負責人員）",
      "本所指定___________（職稱：感控負責人）擔任感染管制負責人，負責推動本手冊之修訂、執行、監測及改善，並確保所有護理人員落實感染管制措施。",
      rowH(2)],
    ["第三條\n（適用對象）",
      "本所全體護理人員（含專任、兼任及臨時代理人員）於執行居家護理訪視服務時，均須遵守本手冊之規定。",
      rowH(2)],
  ];
  chap1.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  // 第二章 手部衛生
  push(["第二章　手部衛生作業規範（WHO 六步驟）", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const chap2: [string, string, number][] = [
    ["第四條\n（執行時機）",
      "護理人員應依 WHO「手部衛生五大時機（My 5 Moments）」執行手部衛生：\n① 接觸個案前\n② 執行清潔／無菌操作前\n③ 接觸個案體液後\n④ 接觸個案後\n⑤ 接觸個案周遭環境後",
      rowH(7)],
    ["第五條\n（執行步驟）",
      "（含洗手乳洗手：20–30 秒；75% 酒精乾洗手：20–30 秒）\n步驟 1：掌心對掌心搓揉。\n步驟 2：手指交扣搓揉手背。\n步驟 3：手指交扣搓揉掌心。\n步驟 4：四指扣握拇指旋轉。\n步驟 5：弓形手指搓揉掌心（指甲清潔）。\n步驟 6：握住手腕旋轉搓揉。\n有流水可用洗手乳洗手後以乾淨紙巾擦乾；無流水時以 75% 酒精乾洗手替代。",
      rowH(10)],
  ];
  chap2.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  // 第三章 消毒滅菌
  push(["第三章　消毒滅菌及護理器材清潔規範", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const chap3: [string, string, number][] = [
    ["第六條\n（常用器材清潔消毒）",
      "一、體溫計（非接觸式除外）：使用後以 75% 酒精棉片擦拭，晾乾備用。\n二、血壓計袖帶：每位個案使用後以 75% 酒精棉片擦拭，如有血液或體液污染則立即更換；每週至少全面清潔一次。\n三、聽診器：使用後以酒精棉片擦拭耳件及膜片，避免以酒精浸泡。\n四、傷口換藥用品：採單次使用包裝，使用後依感染性廢棄物規定處理；換藥托盤每次使用後清潔，每週消毒一次。\n五、輸液幫浦：每次使用後以酒精棉片擦拭外表面；每季由廠商保養校正，並記錄於「醫療器材盤點維護記錄表」。\n六、血糖機及採血針：採血針單次使用後立即放入銳利器材容器；血糖機以酒精棉片擦拭。",
      rowH(12)],
    ["第七條\n（重複使用醫療器材）",
      "本所如使用可重複使用之護理器材，依「醫療機構執行感染控制措施及查核辦法」規定辦理消毒滅菌：\n一、低危性器材（接觸完整皮膚）：清潔後以酒精或低濃度消毒劑擦拭。\n二、半關鍵性器材（接觸黏膜或非完整皮膚）：清潔後以高濃度消毒劑或低溫滅菌處理。\n三、關鍵性器材（進入無菌組織）：一律採用滅菌方式（高壓蒸汽或低溫滅菌），並記錄滅菌日期及有效期限。",
      rowH(8)],
  ];
  chap3.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  // 第四章 傳染病（含肺結核、疥瘡）
  push(["第四章　傳染病訪視作業規範（含肺結核、疥瘡）", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const chap4: [string, string, number][] = [
    ["第八條\n（一般傳染病防護）",
      "護理人員訪視傳染病個案或疑似傳染病個案時，依傳播途徑採取對應防護：\n一、飛沫傳播（流感、新冠肺炎等）：外科口罩（確診者配 N95）、手套，必要時護目鏡。\n二、接觸傳播（腸胃炎、皮膚感染等）：手套、防水圍裙，充分手部衛生。\n三、空氣傳播（肺結核等）：依第九條辦理。\n訪視完畢脫除 PPE 後立即執行手部衛生，器材另行清潔消毒後帶回本所。",
      rowH(10)],
    ["第九條\n（肺結核訪視規範）",
      "訪視疑似或確診肺結核個案時，護理人員應：\n一、配戴 N95 口罩，確認完整佩戴並執行密合測試。\n二、盡量減少密閉空間停留時間，建議開窗通風。\n三、訪視後脫除 N95 口罩，執行手部衛生；訪視器材單獨清潔消毒。\n四、護理人員出現疑似結核病症狀（持續咳嗽逾二週、咳血等）應主動就醫並通報負責護理人員。\n五、依《傳染病防治法》第三十七條及疾管署肺結核感染管制指引辦理通報。",
      rowH(8)],
    ["第十條\n（疥瘡訪視規範）",
      "訪視疑似或確診疥瘡個案時，護理人員應：\n一、配戴手套及長袖防護衣（或一次性防水圍裙）。\n二、訪視後脫除 PPE 後立即洗手；衣物分開清洗（60°C 以上熱水）。\n三、訪視用品（測量器材等）以酒精棉片充分擦拭，必要時以密封袋隔離至少 72 小時。\n四、護理人員出現皮膚搔癢或疑似疥瘡症狀，立即通報負責護理人員並就醫診治。\n五、依疾管署疥瘡感染管制指引辦理追蹤管理。",
      rowH(8)],
  ];
  chap4.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  // 第五章 感染性醫療廢棄物
  push(["第五章　感染性醫療廢棄物處理規範", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const chap5: [string, string, number][] = [
    ["第十一條\n（廢棄物分類）",
      "居家護理訪視過程產生之感染性廢棄物，依《廢棄物清理法》及衛生主管機關規定分類：\n一、感染性廢棄物（代碼 B-1101）：血液、體液污染之廢棄物（手套、紗布、換藥廢料等），裝入橘色感染性廢棄物袋密封。\n二、銳利器材（代碼 B-1103）：使用後針頭、刀片，立即放入硬質銳利器材容器（禁止回套針帽）。\n三、一般廢棄物：未受污染之廢棄物（包材、擦拭紙等），依個案家庭一般垃圾處理。",
      rowH(10)],
    ["第十二條\n（廢棄物清運）",
      "一、感染性廢棄物由護理人員帶回本所，集中至感染性廢棄物暫存處，委由持有合法許可之清除機構定期清運。\n二、銳利器材容器裝滿三分之二即封口送清運，不得過滿。\n三、每次清運後填寫「醫療廢棄物處理記錄表」，記錄清運日期、廢棄物種類、數量/重量、清除廠商及清除單號。\n四、清除廠商許可文件每年更新確認，留存備查。",
      rowH(8)],
  ];
  chap5.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  // 第六章 附則
  push(["第六章　附則", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const chap6: [string, string, number][] = [
    ["第十三條\n（教育訓練）",
      "每年至少辦理一次感染管制教育訓練，新進護理人員職前必修。訓練內容涵蓋：手部衛生 WHO 六步驟、個人防護裝備使用、傳染病/肺結核/疥瘡訪視規範、感染性廢棄物處理及感染事件通報流程。訓練記錄留存備查。",
      rowH(3)],
    ["第十四條\n（監測與審查）",
      "負責護理人員每半年抽查至少三名護理人員之感染管制執行情形（含手部衛生、PPE 使用、廢棄物處理），結果彙整於「感染管制作業查核表」，每年召開感染管制審查（或納入品質改善會議）。",
      rowH(3)],
    ["第十五條\n（修訂）",
      "本手冊每年至少修訂一次，依衛生主管機關最新指引更新，版次變動記錄於「感控手冊版本登記表」，由負責護理人員核定後實施。",
      rowH(2)],
  ];
  chap6.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["負責護理人員簽章：___________　　日期：中華民國　　年　　月　　日", ""], DATA_ROW_BASE_HEIGHT);
  setMergedData(cs, merge, r - 1, NC);

  return {
    name: "感染管制作業手冊",
    data,
    config: { columnlen: { "0": 180, "1": 680 }, rowlen, merge },
    cellStyles: cs,
  };
}

// ─── Sheet 2：感控手冊版本登記表（7 欄，含 3 列範例）────────────────────────
function buildInfectionManualVersionLog(): SheetData {
  const NC = 7;
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

  push(["___________居家護理所　感染管制作業手冊版本登記表"], TITLE_ROW_HEIGHT);
  merge[`${r - 1}_0`] = { r: r - 1, c: 0, rs: 1, cs: NC };
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true };

  const headers = ["版次", "修訂日期", "修訂內容摘要", "提案人", "審核人", "生效日期", "備註"];
  push(headers, HEADER_ROW_HEIGHT);
  for (let c = 0; c < NC; c++) cs[`${r - 1}_${c}`] = { ht: 0, vt: 0, bold: true, bg: "#EFEFEF" };

  // 3 個範例列
  const examples: string[][] = [
    ["v1.0", "2024-01-15", "初版建立，涵蓋手部衛生、一般感染管制規範", "護理師甲", "負責護理人員", "2024-01-15", "依居家護理所設立規定制定"],
    ["v1.1", "2024-07-01", "增列肺結核及疥瘡訪視作業規範章節", "護理師乙", "負責護理人員", "2024-07-01", "配合疾管署最新指引更新"],
    ["v1.2", "2025-01-10", "對齊 115 年度居家護理所評鑑基準，增列消毒滅菌及廢棄物處理章節", "護理師丙", "負責護理人員", "2025-01-10", "年度評鑑前修訂"],
  ];
  examples.forEach((row) => {
    push(row, rowH(2));
    for (let c = 0; c < NC; c++) cs[`${r - 1}_${c}`] = { ht: 0, vt: 0, tb: 2 };
  });

  // 空白列供填寫
  for (let i = 0; i < 5; i++) {
    push(Array(NC).fill(""), DATA_ROW_BASE_HEIGHT);
    for (let c = 0; c < NC; c++) cs[`${r - 1}_${c}`] = { ht: 0, vt: 0 };
  }

  return {
    name: "感控手冊版本登記表",
    data,
    config: {
      columnlen: { "0": 70, "1": 110, "2": 300, "3": 100, "4": 130, "5": 110, "6": 160 },
      rowlen,
      merge,
    },
    cellStyles: cs,
  };
}

// ─── Sheet 3：流感疫苗接種記錄表（8 欄，含 3 列範例）────────────────────────
function buildFluVaccinationRecord(): SheetData {
  const NC = 8;
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

  push(["___________居家護理所　工作人員流感疫苗接種記錄表　【試評項目，本年度不計分】"], TITLE_ROW_HEIGHT);
  merge[`${r - 1}_0`] = { r: r - 1, c: 0, rs: 1, cs: NC };
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true };

  // 說明列（黃底提示）
  push(["說明：符合公費流感疫苗接種資格之工作人員，接種率應達 80% 以上（排除經醫師評估具禁忌症者需有評估記錄）。本項為試評項目，建議仍妥善備妥記錄。"], rowH(2));
  merge[`${r - 1}_0`] = { r: r - 1, c: 0, rs: 1, cs: NC };
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, tb: 2, bg: "#FFF9C4" };

  const headers = ["員工姓名", "職稱", "接種資格確認", "接種日期", "接種廠牌/劑次", "接種地點", "禁忌症評估", "不良反應追蹤"];
  push(headers, HEADER_ROW_HEIGHT);
  for (let c = 0; c < NC; c++) cs[`${r - 1}_${c}`] = { ht: 0, vt: 0, bold: true, bg: "#EFEFEF" };

  // 3 個範例列
  const examples: string[][] = [
    ["護理師甲", "護理師", "符合（醫事人員）", "2025-10-15", "台灣東洋/第 1 劑", "某某診所", "無禁忌症", "無"],
    ["護理師乙", "護理師", "符合（長照機構服務人員）", "2025-10-20", "賽諾菲/第 1 劑", "衛生所免費施打", "無禁忌症", "接種當日輕微手臂痠痛，隔日緩解"],
    ["護理師丙", "護理師", "符合但有禁忌症", "—", "—", "—", "有禁忌症（蛋白質嚴重過敏），醫師評估建議免接種", "—"],
  ];
  examples.forEach((row) => {
    push(row, rowH(2));
    for (let c = 0; c < NC; c++) cs[`${r - 1}_${c}`] = { ht: 0, vt: 0, tb: 2 };
  });

  // 空白列
  for (let i = 0; i < 10; i++) {
    push(Array(NC).fill(""), DATA_ROW_BASE_HEIGHT);
    for (let c = 0; c < NC; c++) cs[`${r - 1}_${c}`] = { ht: 0, vt: 0 };
  }

  // 統計列
  push(["統計：接種資格人數：___　　已接種：___　　有禁忌症（排除）：___　　接種率（排除禁忌症後）：____%"], DATA_ROW_BASE_HEIGHT);
  merge[`${r - 1}_0`] = { r: r - 1, c: 0, rs: 1, cs: NC };
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, tb: 2, bg: "#EFEFEF" };

  push(["負責護理人員簽章：___________　　統計日期：中華民國　　年　　月　　日"], DATA_ROW_BASE_HEIGHT);
  merge[`${r - 1}_0`] = { r: r - 1, c: 0, rs: 1, cs: NC };
  cs[`${r - 1}_0`] = { ht: 0, vt: 0 };

  return {
    name: "流感疫苗接種記錄表",
    data,
    config: {
      columnlen: { "0": 100, "1": 90, "2": 160, "3": 110, "4": 150, "5": 150, "6": 230, "7": 160 },
      rowlen,
      merge,
    },
    cellStyles: cs,
  };
}

/** 產生項目 2「感染管制作業與器材維護管理」的 3 個自訂補充分頁 */
export function buildHomeNursingItem2CustomSheets(): SheetData[] {
  return [
    buildHomeNursingInfectionControlManual(),
    buildInfectionManualVersionLog(),
    buildFluVaccinationRecord(),
  ];
}
