/**
 * 居家護理所評鑑項目 4「個案緊急或意外事件處理」自訂補充分頁
 *
 * 產生 1 個工作分頁：
 *   1. 個案緊急及意外事件預防及處理辦法（NC=2，政策條文，含 4 種事件 SOP）
 *
 * 對應評鑑基準：
 *   - criteria[0]：訂有個案緊急及意外事件預防及處理辦法，內容至少包含
 *     生命徵象惡化、跌倒、造廔口（氣管、胃、腸、膀胱等）及管路異常等事件之處理流程
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

// ─── Sheet 1：個案緊急及意外事件預防及處理辦法（NC=2，純條文 SOP）──────────────
function buildIncidentPreventionPolicySheet(): SheetData {
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

  push(["___________居家護理所　個案緊急及意外事件預防及處理辦法", ""], TITLE_ROW_HEIGHT);
  setTitleRow(cs, merge, r - 1, NC);

  push(["制定日期：中華民國　　年　　月　　日　　版次：第 1 版　　核定人（負責護理人員）：___________", ""], DATA_ROW_BASE_HEIGHT);
  setMergedData(cs, merge, r - 1, NC);

  // 一、目的與依據
  push(["一、目的與依據", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  push(
    ["第一條\n（目的）",
      "為保障本所收案個案於居家照護期間之安全，降低緊急及意外事件之發生率，並建立事件發生後之即時處置、通報及後續改善機制，依《護理人員法》、《居家護理所設置標準》及衛生福利部 115 年度居家護理所評鑑基準 A4 相關規定，訂定本辦法。"],
    rowH(3));
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  // 二、適用範圍
  push(["二、適用範圍", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  push(
    ["第二條\n（適用對象）",
      "本所所有在案個案（含有效收案中及結案前 30 日內），以及執行居家訪視業務之專任、兼任及代理護理人員均適用本辦法。"],
    rowH(2));
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  // 三、預防原則
  push(["三、預防原則", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  push(
    ["第三條\n（風險評估）",
      "① 收案時由護理人員對個案進行全人風險評估，涵蓋生命徵象基準值、跌倒風險（Morse/STRATIFY）、管路在留類型、造廔口種類及癒合狀況\n② 每 6 個月或個案病況改變時重新評估並更新照護計畫\n③ 高風險個案（如 SpO₂ 不穩定、多重管路、首次置廔後追蹤期）列入加強追蹤名單，提高訪視頻率"],
    rowH(5));
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  push(
    ["第四條\n（家屬衛教）",
      "① 收案時及每次訪視後，向主要照顧者說明各類緊急徵兆之觀察重點（如痰液增多、造廔口周圍發紅、管路固定膠布鬆動等）\n② 提供本所 24 小時緊急聯絡電話，並確認個案家中有急救所需基本物品（含氧氣鋼瓶位置、吸球、備用管路材料等）\n③ 衛教紀錄留存於個案護理記錄"],
    rowH(4));
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  push(
    ["第五條\n（訪視前檢核）",
      "每次訪視前確認攜帶對應管路/造廔口換藥所需器材及備用管路（含相同型號與尺寸），並預先查閱上次訪視紀錄，了解個案近期病況變化與未解決問題。"],
    rowH(3));
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  // 四、事件處理流程
  push(["四、事件處理流程", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  type ScenarioRow = [string, string, number];
  const scenarios: Array<{ title: string; rows: ScenarioRow[] }> = [
    {
      title: "（一）生命徵象惡化",
      rows: [
        ["立即處置",
          "評估觸發條件（任一即啟動流程）：\n• 意識改變：Glasgow Coma Scale ≤13 或突發性躁動、嗜睡\n• 呼吸窘迫：呼吸頻率 <8 或 >30 次/分、SpO₂ <90%、發紺\n• 血壓異常：收縮壓 <90 mmHg 或 >180 mmHg\n• 心跳異常：脈搏 <50 或 >130 次/分、心律不整\n• 體溫：≥38.5°C 或 <35°C\n\n立即處置步驟：\n① 保持呼吸道暢通，協助個案採舒適體位（呼吸窘迫者抬高床頭 30–45°）\n② 呼叫家屬在場，確認個案意識及安全\n③ 必要時給予可用之家用氧氣（依醫囑）\n④ 無法緩解或出現無反應/無呼吸/無脈搏，立即啟動 BLS 並呼叫 119",
          rowH(14)],
        ["通報",
          "① 撥打 119 並通報督導員（同步進行，不可因等待回電延誤急救）\n② 督導員轉報負責護理人員及主治醫師（依轉介醫院值班流程）\n③ 家屬不在場時，立即聯繫緊急聯絡人\n④ 若個案送醫，協助護送或提供完整護理記錄交接文件",
          rowH(5)],
        ["後續處理",
          "① 訪視當日完成「個案緊急事件處理記錄表」，記錄時序、處置細節與個案反應\n② 向接手醫療機構進行口頭與書面交接\n③ 事件後 7 日內召開個案檢討，評估照護計畫是否需調整\n④ 重大事件（非計畫性住院、死亡）24 小時內電話通報地方衛生主管機關，7 日內補書面",
          rowH(5)],
      ],
    },
    {
      title: "（二）跌倒",
      rows: [
        ["立即處置",
          "① 勿立即移動個案，先評估 ABCD（Airway/Breathing/Circulation/Disability）\n② 確認意識狀態、頭頸部有無疼痛或變形（疑似頸椎損傷者勿搬動）\n③ 檢視全身外傷：出血部位按壓止血；疑似骨折（肢體變形、無法承重、劇痛）勿強行活動\n④ 管路/造廔口是否因跌倒拉扯脫落或移位，先確認再處理其他傷勢\n⑤ 疑似頭部外傷：觀察意識、瞳孔、嘔吐，若有意識喪失或持續頭痛立即呼叫 119",
          rowH(8)],
        ["通報",
          "① 有外傷或疑似骨折者呼叫 119；輕微皮膚擦傷且意識清晰可先電話諮詢督導員評估\n② 電話通報督導員，說明跌倒場景、傷勢、目前意識及生命徵象\n③ 督導員轉報負責護理人員，由負責護理人員決定是否通報主治醫師",
          rowH(4)],
        ["後續處理",
          "① 訪視當日完成「個案緊急事件處理記錄表」\n② 評估跌倒原因（環境因素、藥物影響、視力、肌力、鞋具等），修訂個別照護計畫\n③ 與家屬討論居家安全環境改善措施（扶手、防滑墊、夜間照明、呼叫器位置）\n④ 必要時轉介物理/職能治療師進行居家安全評估",
          rowH(5)],
      ],
    },
    {
      title: "（三）造廔口異常",
      rows: [
        ["立即處置",
          "依造廔口類型分別處理：\n\n【氣管造廔（氣切）】\n• 滲漏/感染：更換氣切固定帶與內管，清潔造口周圍皮膚，必要時抽痰；分泌物異常（惡臭、膿性、血性）記錄並通報\n• 阻塞：先嘗試清潔內管（可取出者）或以生理食鹽水滴入稀釋痰液後抽痰；無改善且 SpO₂ 下降立即呼叫 119\n• 脫管（partial/total）：保持冷靜，以手固定套管開口位置維持氣道，立即呼叫 119；備用氣切套管在場時可在督導員電話指示下協助重置\n\n【胃造廔（PEG/胃造口）】\n• 滲漏/周圍皮膚損傷：確認固定盤位置是否過緊或過鬆，清潔皮膚後更換敷料；若膿性分泌物或腹膜刺激徵兆（腹壁僵硬、壓痛）立即送醫\n• 阻塞：停止灌食，以 30 mL 溫開水脈衝式沖洗；無法通暢應通報醫師，切勿強行推注\n• 意外滑脫：立即以乾淨紗布覆蓋造口，不可放置任何替代物插入；4 小時內未處理造口將開始收縮，立即送醫\n\n【腸造口（結腸/迴腸造口）】\n• 造口脫垂/回縮：協助個案仰臥，減少腹壓；以溼紗布覆蓋（脫垂），通報醫師\n• 造口出血：少量（黏膜接觸性）用溼紗布輕壓觀察；持續出血或鮮紅大量出血送醫\n• 造口周圍皮膚損傷：移除底盤，評估皮膚狀態，選用適當造口用品（凸面底盤/皮膚保護膜）重新貼合\n\n【膀胱造廔（Suprapubic Catheter）】\n• 引流不良：確認管路無彎折、尿袋位置低於膀胱；以無菌生理食鹽水 10 mL 輕柔沖洗；無改善通報醫師\n• 意外脫管：立即以無菌敷料覆蓋造廔口，通知家屬並立即送醫（造廔口同樣可在數小時內縮小）",
          rowH(38)],
        ["通報",
          "① 脫管、嚴重阻塞、疑似感染（發燒、造口周圍紅腫化膿）：電話通報督導員及主治醫師，依醫囑決定處置或立即送醫\n② 氣切脫管或 SpO₂ 無法維持：立即呼叫 119，同步通報督導員\n③ 一般滲漏/皮膚問題處置後穩定：訪視記錄中詳述，回所後向督導員口頭回報",
          rowH(5)],
        ["後續處理",
          "① 訪視當日完成護理記錄，記錄造廔口外觀、滲漏量/性質、皮膚評估、處置方式及個案/家屬反應\n② 異常事件填寫「個案緊急事件處理記錄表」\n③ 衛教主要照顧者辨識異常徵兆及日常照護重點（固定盤更換頻率、周圍皮膚清潔、觀察分泌物變化）\n④ 脫管事件後 7 日內召開個案照護檢討，評估材料選用與照顧者能力",
          rowH(5)],
      ],
    },
    {
      title: "（四）管路異常",
      rows: [
        ["立即處置",
          "依管路類型分別處理：\n\n【鼻胃管（NG Tube）】\n• 滑脫：立即停止灌食，標記管路刻度確認是否移位；疑似滑出（外露增長、咳嗆）停止使用，聯繫醫師開立更換醫囑\n• 阻塞：以 20–30 mL 溫開水脈衝式沖洗，不可強行推注；確認灌食後擺位（床頭抬高 30° 以上）\n• 誤入氣管疑慮：立即停止使用，立即呼叫督導員並送醫確認位置（X 光）；切勿在未確認位置前灌食\n\n【導尿管（Foley Catheter）】\n• 引流不良/阻塞：確認管路無彎折、尿袋低於膀胱；以無菌生理食鹽水 10 mL 輕柔沖洗；4 小時以上無尿且下腹膨隆（急性尿滯留）立即送醫\n• 意外拔管（球囊破裂/拉扯）：觀察尿道口出血及個案不適，無出血且有自解尿液者通報醫師後安排更換；大量出血或無法自解送醫\n• 感染徵兆（尿液混濁/惡臭/發燒）：記錄尿液性狀，通報醫師，並採集中段尿培養（依醫囑）\n\n【PICC（周邊置入中央靜脈導管）】\n• 滑脫/移位：立即以無菌紗布覆蓋穿刺點並按壓；量測外露管長與上次記錄比較；通報醫師確認是否需 X 光確認位置或重置\n• 疑似感染（穿刺點紅腫、沿靜脈發紅、發燒/寒顫）：暫停使用，通報醫師，依醫囑評估拔除及血液培養\n• 阻塞：以 10 mL 注射針筒脈衝式沖洗（不可強行推注）；無法通暢時通報醫師，可評估使用尿激酶（依醫囑）\n\n【引流管（JP/Drainage）】\n• 引流減少或停止：確認引流球未鬆開或管路彎折；評估引流量，若 24 小時引流 <30 mL 且疑似阻塞通報醫師\n• 意外脫管：立即以無菌敷料覆蓋引流口按壓，通報醫師\n• 引流液性狀改變（由漿液→血性/膿性）：記錄顏色、量及氣味，通報醫師",
          rowH(38)],
        ["通報",
          "① 重大管路事件（NG 誤入氣管、PICC 疑感染、急性尿滯留、引流管脫管）：立即電話通報督導員及主治醫師，依醫囑決定立即送醫或到府重置\n② 管路滑脫且無法立即處理：通報督導員後協調換管時間，告知家屬注意事項\n③ 一般阻塞/滲漏經處置後穩定：訪視記錄詳述，回所後向督導員口頭回報",
          rowH(5)],
        ["後續處理",
          "① 訪視當日完成護理記錄（管路種類/型號/刻度、異常描述、處置方式、個案反應）\n② 意外脫管或感染事件填寫「個案緊急事件處理記錄表」\n③ 衛教主要照顧者辨識管路異常徵兆（滲漏、固定膠布鬆動、引流量異常、個案不適）及緊急聯絡管道\n④ 反覆脫管或感染事件於個案管理系統標記高風險並提升訪視頻率",
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

  // 五、通報流程
  push(["五、通報流程", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  push(
    ["第六條\n（通報層級）",
      "① 第一線（護理人員）：事件發生後立即電話通報督導員\n② 督導員：30 分鐘內通報負責護理人員；有生命危險、非計畫性住院或死亡事件另通報機構負責人\n③ 重大事件：24 小時內電話通報地方衛生主管機關（衛生局護理及健康照護科），7 日內補送書面通報\n④ 緊急送醫時，協助提供完整護理交接記錄（管路種類、最後一次換藥時間、個案過敏史）"],
    rowH(6));
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  // 六、檢討與改善
  push(["六、檢討與改善", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  push(
    ["第七條\n（定期檢討）",
      "① 每季召開個案照護品質檢討會議，連結「個案緊急事件處理記錄表」（A4 archetype 分頁）覆核事件改善成效\n② 每年彙整年度緊急事件統計分析，連結 A5「機構經營指標監測」之「個案非計畫性住院率」及「急診使用率」指標進行趨勢分析\n③ 改善措施追蹤至結案，結案後由負責護理人員簽核"],
    rowH(5));
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  // 七、修訂紀錄
  push(["七、修訂紀錄", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  push(["版次", "修訂日期　　　修訂內容　　　　　　　　　　　　　　　　　　　修訂人"], HEADER_ROW_HEIGHT);
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, bg: "#EFEFEF" };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, bold: true, bg: "#EFEFEF" };

  push(["v1.0", "2025-01-10　　　初版制定（含 4 類事件 SOP）　　　　　　　　　負責護理人員"], DATA_ROW_BASE_HEIGHT);
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, tb: 2 };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  push(["v1.1", "2025-07-15　　　增列膀胱造廔及 PICC 處置細則　　　　　　　　負責護理人員"], DATA_ROW_BASE_HEIGHT);
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
    name: "個案緊急及意外事件預防及處理辦法",
    data,
    config: { columnlen: { "0": 180, "1": 680 }, rowlen, merge },
    cellStyles: cs,
  };
}

/** 產生項目 4「個案緊急或意外事件處理」的 1 個自訂補充分頁 */
export function buildHomeNursingItem4CustomSheets(): SheetData[] {
  return [buildIncidentPreventionPolicySheet()];
}
