/**
 * 居家護理所評鑑項目 3「居家訪視人員安全管理」自訂補充分頁
 *
 * 產生 2 個工作分頁：
 *   1. 居家訪視人員安全管理辦法（NC=2，政策條文，含 4 種事件 SOP）
 *   2. 緊急事件檢討分析與防範改善追蹤表（NC=13，含 2 筆範例）
 *
 * 對應評鑑基準：
 *   - criteria[0]：訂有居家訪視人員安全管理辦法（含車禍、不安全情境、動物咬傷、尖銳物扎刺傷處理流程，提供安全配備與預防作為）
 *   - criteria[2]：緊急事件之檢討分析與防範改善
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

function setSubSectionHeader(cs: CellStyleMap, merge: MergeMap, r: number, nc: number) {
  cs[`${r}_0`] = { ht: 0, vt: 0, bold: true, bg: "#F7F7F7" };
  merge[`${r}_0`] = { r, c: 0, rs: 1, cs: nc };
}

function setMergedData(cs: CellStyleMap, merge: MergeMap, r: number, nc: number) {
  cs[`${r}_0`] = { ht: 0, vt: 0, tb: 2 };
  merge[`${r}_0`] = { r, c: 0, rs: 1, cs: nc };
}

// ─── Sheet 1：居家訪視人員安全管理辦法（NC=2，純條文 SOP）────────────────────
function buildHomeVisitSafetyPolicySheet(): SheetData {
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

  push(["___________居家護理所　居家訪視人員安全管理辦法", ""], TITLE_ROW_HEIGHT);
  setTitleRow(cs, merge, r - 1, NC);

  push(["制定日期：中華民國　　年　　月　　日　　版次：第 1 版　　核定人（負責護理人員）：___________", ""], DATA_ROW_BASE_HEIGHT);
  setMergedData(cs, merge, r - 1, NC);

  // 一、目的與依據
  push(["一、目的與依據", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  push(
    ["第一條\n（目的）",
      "為保障本所居家訪視護理人員之人身安全，降低訪視過程中發生意外事故之風險，並建立事件發生後之即時處置、通報及後續改善機制，依《護理人員法》、《職業安全衛生法》及衛生主管機關居家護理所評鑑相關規定，訂定本辦法。"],
    rowH(3));
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  // 二、適用對象
  push(["二、適用對象", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  push(
    ["第二條\n（適用對象）",
      "本所所有執行居家訪視業務之專任、兼任及代理護理人員、實習生及隨行助理，均應遵守本辦法之規定。"],
    rowH(2));
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  // 三、安全配備
  push(["三、安全配備", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  push(
    ["第三條\n（個人安全配備）",
      "護理人員執行居家訪視時，應隨身攜帶以下安全配備：\n① 機構識別證與名牌\n② 智慧手機（內建定位功能，並加入機構緊急聯絡群組）\n③ 防身警報器或哨子\n④ 手電筒（供夜間或暗處使用）\n⑤ 一次性手套、外科口罩、N95 口罩、防水圍裙\n⑥ 隨身銳器回收盒（硬殼材質）\n⑦ 75% 酒精乾洗手\n⑧ 隨身急救包（含 OK 繃、紗布、優碘、生理食鹽水）\n⑨ 機車安全帽及反光背心（騎機車者）\n⑩ 動物驅避噴劑（視訪視區域由機構提供）"],
    rowH(12));
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  push(
    ["第四條\n（車輛與行車安全）",
      "使用機車或汽車訪視者，車輛應定期保養，出發前確認煞車、燈號正常；雨天、夜間或路況不佳時，應評估改派或採結伴訪視；不得駕駛未投保強制責任險或保險逾期之車輛。"],
    rowH(3));
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  // 四、訪視前準備
  push(["四、訪視前準備", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  push(
    ["第五條\n（路線與環境評估）",
      "護理人員訪視前應透過個案管理系統確認：個案地址與樓層、家中是否飼養犬隻、家庭關係風險（家暴史、精神疾患、藥酒癮等）及其他系統註記之高風險因子；如屬高風險個案，訪視前須主動告知督導員並於系統標註。"],
    rowH(4));
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  push(
    ["第六條\n（聯繫家屬與行程登錄）",
      "① 訪視前一日以電話確認家屬在家陪同（首次訪視必要）\n② 出發時於機構 LINE 工作群組打卡通報（含預估到達時間）\n③ 抵達個案家後再次打卡\n④ 預估離開時間逾 30 分鐘未回報，督導員應主動聯繫確認安全"],
    rowH(5));
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  // 五、事件處理流程
  push(["五、事件處理流程", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  type ScenarioRow = [string, string, number];
  const scenarios: Array<{ title: string; rows: ScenarioRow[] }> = [
    {
      title: "（一）車禍",
      rows: [
        ["立即處置",
          "① 將車輛盡速移至路肩並開啟警示燈，關閉引擎\n② 自身有外傷立即按壓止血；疑似骨折或頸部受傷勿強行移動\n③ 無人傷亡時確認現場安全後下車；若有人傷亡立即撥打 119\n④ 不與對方爭吵，保持冷靜等待警方到場",
          rowH(5)],
        ["通報",
          "① 撥打 110 報案（如有傷亡同時撥 119）\n② 以 LINE 通報督導員（附上座標截圖、傷勢狀況、對方車牌）\n③ 重傷或意識改變者，由督導員轉報負責護理人員並協助送醫",
          rowH(4)],
        ["後續處理",
          "① 取得警方交通事故初判表、診斷書及車輛估價單存檔\n② 24 小時內填寫「人員安全事件通報記錄表」\n③ 申辦勞保職災、機車強制責任險及第三人責任險理賠\n④ 事件納入「緊急事件檢討分析與防範改善追蹤表」追蹤",
          rowH(5)],
      ],
    },
    {
      title: "（二）不安全情境（人身安全）",
      rows: [
        ["立即處置",
          "遭遇口頭威脅、肢體攻擊、性騷擾或精神症狀發作之個案或家屬時：\n① 保持冷靜，不與對方正面對峙，不背對家屬\n② 以「我先去拿東西」或「車上有資料」等理由迅速退至門外\n③ 按下手機緊急聯絡功能或啟動防身警報器引起注意",
          rowH(5)],
        ["通報",
          "① 脫離現場 5 分鐘內電話通報督導員，說明對方行為與個案現況\n② 情節嚴重（持械威脅、肢體攻擊、性騷擾）立即報警 110，不要返回個案家\n③ 同步通報負責護理人員",
          rowH(4)],
        ["後續處理",
          "① 督導員當日與當事護理人員進行事後關懷，必要時提供心理支持或 EAP 轉介\n② 評估是否改為雙人訪視或結案轉介，並於個案管理系統更新風險註記\n③ 7 日內填寫通報記錄表並列入「緊急事件檢討分析與防範改善追蹤表」",
          rowH(4)],
      ],
    },
    {
      title: "（三）動物咬傷",
      rows: [
        ["立即處置",
          "① 立即離開動物攻擊範圍至安全處\n② 以肥皂與大量清水沖洗傷口至少 15 分鐘，再以優碘消毒\n③ 以無菌紗布或敷料覆蓋傷口，不可緊縛傷肢\n④ 確認動物來源（家犬/流浪犬/野生動物）並記錄",
          rowH(5)],
        ["通報",
          "① 電話通報督導員，說明受傷部位與傷勢\n② 前往急診或診所就醫，依醫囑評估是否需施打破傷風疫苗或狂犬病暴露後預防接種（PEP）\n③ 向家屬詢問動物近期是否有狂犬病疫苗接種紀錄",
          rowH(4)],
        ["後續處理",
          "① 留存就醫診斷書及預防接種紀錄\n② 依醫囑完成後續追蹤（如有 PEP 需於 0、3、7、14、28 日接種完畢）\n③ 個案管理系統標註「家中飼養動物，訪視前請家屬隔離」\n④ 申辦勞保職災保險理賠",
          rowH(5)],
      ],
    },
    {
      title: "（四）尖銳物扎刺傷",
      rows: [
        ["立即處置",
          "① 在不擠壓傷口的情況下，以流動清水沖洗傷口至少 5 分鐘\n② 以優碘或 75% 酒精消毒，以無菌敷料覆蓋；不可吸吮傷口\n③ 保留肇因物品（針頭、刀片等）並記錄扎刺深度、時間及肇因物品\n④ 立即電話通報督導員及感控負責人",
          rowH(5)],
        ["通報",
          "① 30 分鐘內前往急診或指定醫院，進行 HBV、HCV、HIV 暴露源評估\n② 必要時由醫師評估是否開立暴露後預防用藥（PEP，尤其 HIV 須於 72 小時內開始）\n③ 填寫「銳器扎傷暴露事件追蹤單」",
          rowH(4)],
        ["後續處理",
          "① 依衛生主管機關指引完成 0、1、3、6 個月血清追蹤檢驗\n② 檢討針頭銳器處置流程（是否回套針帽、銳器盒位置是否適當、是否於不穩定環境執行操作）\n③ 改善措施列入「緊急事件檢討分析與防範改善追蹤表」，結案後由負責護理人員簽核\n④ 申辦勞保職災保險理賠",
          rowH(5)],
      ],
    },
  ];

  scenarios.forEach((scenario) => {
    push([scenario.title, ""], SECTION_HEADER_HEIGHT);
    setSubSectionHeader(cs, merge, r - 1, NC);

    scenario.rows.forEach(([label, content, height]) => {
      push([label, content], height);
      cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
      cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
    });
  });

  // 六、通報流程
  push(["六、通報流程", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  push(
    ["第七條\n（通報層級）",
      "① 第一線（護理人員）：事件發生後 5 分鐘內電話通報直屬督導員\n② 督導員：30 分鐘內通報負責護理人員，重大事件（住院、死亡、傷害他人）另通報機構負責人\n③ 重大事件：24 小時內電話通報地方衛生主管機關（衛生局護理及健康照護科），7 日內補送書面通報\n④ 同步通報相關保險窗口（勞保職災、強制責任險、團體保險）辦理理賠"],
    rowH(6));
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  // 七、預防作為
  push(["七、預防作為", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  push(
    ["第八條\n（教育訓練）",
      "每年至少辦理 2 小時以上之居家訪視人員安全教育訓練，內容涵蓋本辦法各類事件 SOP、CPR 複訓、防身術基礎及家暴辨識；新進護理人員職前訓練必修，訓練紀錄留存備查。"],
    rowH(3));
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  push(
    ["第九條\n（結伴與分流）",
      "高風險個案（系統標記紅色）一律採雙人訪視；夜間、偏遠地區或首次訪視亦優先安排雙人；女性護理人員獨自夜訪時，應請家屬同住陪同或機構安排同行人員。"],
    rowH(3));
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  push(
    ["第十條\n（定期檢討）",
      "每季召開一次人員安全檢討會議，連結「緊急事件檢討分析與防範改善追蹤表」覆核改善成效；每年進行一次年度總檢討，視需要修訂本辦法。"],
    rowH(3));
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  // 八、修訂紀錄
  push(["八、修訂紀錄", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  push(["版次", "修訂日期　　　修訂內容　　　　　　　　　　　　　　　　　　　修訂人"], HEADER_ROW_HEIGHT);
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, bg: "#EFEFEF" };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, bold: true, bg: "#EFEFEF" };

  push(["v1.0", "2025-01-10　　　初版制定　　　　　　　　　　　　　　　　　　　負責護理人員"], DATA_ROW_BASE_HEIGHT);
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, tb: 2 };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  push(["v1.1", "2025-07-15　　　增列動物咬傷及尖銳物扎刺傷處置流程　　　　　負責護理人員"], DATA_ROW_BASE_HEIGHT);
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, tb: 2 };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  for (let i = 0; i < 3; i++) {
    push(["", ""], DATA_ROW_BASE_HEIGHT);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0 };
  }

  push(["負責護理人員簽章：___________　　日期：中華民國　　年　　月　　日", ""], DATA_ROW_BASE_HEIGHT);
  setMergedData(cs, merge, r - 1, NC);

  return {
    name: "居家訪視人員安全管理辦法",
    data,
    config: { columnlen: { "0": 180, "1": 680 }, rowlen, merge },
    cellStyles: cs,
  };
}

// ─── Sheet 2：緊急事件檢討分析與防範改善追蹤表（NC=13）─────────────────────
function buildIncidentReviewSheet(): SheetData {
  const NC = 13;
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

  // 標題
  push(["___________居家護理所　緊急事件檢討分析與防範改善追蹤表", ...Array(NC - 1).fill("")], TITLE_ROW_HEIGHT);
  merge[`${r - 1}_0`] = { r: r - 1, c: 0, rs: 1, cs: NC };
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true };

  // 說明列（黃底）
  push([
    "說明：本表由督導員於每次緊急事件結案後 7 日內填寫，每季召開檢討會議覆核成效，每年彙整年度報告。原因分析建議採「根本原因＋近端原因」雙層寫法。",
    ...Array(NC - 1).fill(""),
  ], rowH(2));
  merge[`${r - 1}_0`] = { r: r - 1, c: 0, rs: 1, cs: NC };
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, tb: 2, bg: "#FFF9C4" };

  // 表頭
  const headers = [
    "事件編號",
    "事件日期",
    "事件類型",
    "當事人員",
    "事件簡述",
    "原因分析（根本＋近端）",
    "改善措施",
    "負責人",
    "預定完成日",
    "實際完成日",
    "成效追蹤紀錄",
    "是否再發生",
    "備註",
  ];
  push(headers, HEADER_ROW_HEIGHT);
  for (let c = 0; c < NC; c++) {
    cs[`${r - 1}_${c}`] = { ht: 0, vt: 0, bold: true, bg: "#EFEFEF" };
  }

  // 範例 1：動物咬傷
  const ex1 = [
    "SAF-2025-007",
    "2025-11-12",
    "動物咬傷",
    "護理師甲",
    "前往陳○○宅執行 PICC 換藥，個案家中飼養之中型犬未拴繩，於玄關撲咬護理師左小腿，造成皮膚撕裂傷約 3 公分。",
    "根本原因：訪視前未確認家屬是否將寵物隔離；個案管理系統未標註飼養犬隻。\n近端原因：護理師抵達時家屬在廚房，犬隻無人約束。",
    "① 訪視前一日由督導員提醒家屬將寵物隔離於房間\n② 個案管理系統「家庭環境風險」欄位新增「飼養動物」必填項\n③ 全所護理人員配發動物驅避噴劑\n④ 11 月份月會宣導動物咬傷 SOP",
    "督導員李○○",
    "2025-11-19",
    "2025-11-30",
    "2025-12-15：護理師甲傷口癒合良好，已完成破傷風與狂犬病 PEP 第 1、3 劑；後續 3 次訪視家屬均事先將犬隻隔離。\n2026-02-15 季追蹤：類似事件 0 件。",
    "否",
    "已申請勞保職災給付",
  ];
  push(ex1, rowH(5));
  for (let c = 0; c < NC; c++) {
    cs[`${r - 1}_${c}`] = { ht: 0, vt: 0, tb: 2 };
  }

  // 範例 2：車禍
  const ex2 = [
    "SAF-2025-008",
    "2025-11-28",
    "車禍",
    "護理師乙",
    "機車訪視林○○宅途中，於○○路與○○街口遭右轉小客車擦撞，護理師乙左手肘擦傷及機車左後照鏡損壞，無骨折。",
    "根本原因：當日連續排 6 件訪視，行程緊湊；該路口為事故熱點但未於事前提醒。\n近端原因：對方未打方向燈右轉；雨後路面濕滑。",
    "① 排訪視班表時每日上限調整為 5 件並預留 20 分鐘緩衝\n② 將事故熱點納入「高風險路段地圖」並於工作群組公告\n③ 重新確認全所護理人員機車強制責任險效期\n④ 雨天訪視改派汽車或請家屬接送",
    "護理長王○○",
    "2025-12-05",
    "2025-12-20",
    "2025-12-31：護理師乙已休養完畢並回診確認無後遺症，理賠完成；班表上限已落實 4 週。\n2026-03-31 季追蹤：同路段事故 0 件，雨天改派率 100%。",
    "否",
    "警方初判表、診斷書、機車維修估價單留檔",
  ];
  push(ex2, rowH(5));
  for (let c = 0; c < NC; c++) {
    cs[`${r - 1}_${c}`] = { ht: 0, vt: 0, tb: 2 };
  }

  // 空白填寫列
  for (let i = 0; i < 5; i++) {
    push(Array(NC).fill(""), rowH(4));
    for (let c = 0; c < NC; c++) {
      cs[`${r - 1}_${c}`] = { ht: 0, vt: 0 };
    }
  }

  // 簽章列
  push(["負責護理人員簽章：___________　　覆核日期：中華民國　　年　　月　　日", ...Array(NC - 1).fill("")], DATA_ROW_BASE_HEIGHT);
  merge[`${r - 1}_0`] = { r: r - 1, c: 0, rs: 1, cs: NC };
  cs[`${r - 1}_0`] = { ht: 0, vt: 0 };

  return {
    name: "緊急事件檢討分析與防範改善追蹤表",
    data,
    config: {
      columnlen: {
        "0": 90,
        "1": 100,
        "2": 130,
        "3": 90,
        "4": 220,
        "5": 240,
        "6": 240,
        "7": 90,
        "8": 100,
        "9": 100,
        "10": 220,
        "11": 80,
        "12": 140,
      },
      rowlen,
      merge,
    },
    cellStyles: cs,
  };
}

/** 產生項目 3「居家訪視人員安全管理」的 2 個自訂補充分頁 */
export function buildHomeNursingItem3CustomSheets(): SheetData[] {
  return [
    buildHomeVisitSafetyPolicySheet(),
    buildIncidentReviewSheet(),
  ];
}
