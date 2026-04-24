/**
 * 居家照顧評鑑項目 2「個案基本權益維護」自訂補充分頁
 *
 * 產生 8 個工作分頁：
 *   1. 個案權益保障規定（含無歧視、無虐待、無剝削條款）
 *   2. 個案權益聲明書（告知後簽署）
 *   3. 居家服務定型化契約（主契約第 1–23 條）
 *   4. 附件一 肖像權意願書
 *   5. 附件二 個資授權同意書
 *   6. 附件三 委託簽約同意書
 *   7. 附件四 服務項目費用表
 *   8. 附件五 緊急事故處理同意書
 *
 * 法源依據：
 *   - 長期照顧服務法 §17（機構應保障使用者權利）
 *   - 長期照顧服務法 §42（應簽訂書面契約）
 *   - 居家式服務類長期照顧服務機構定型化契約應記載及不得記載事項
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

// ─── Sheet 1：個案權益保障規定 ────────────────────────────────────────────────
function buildRightsPolicySheet(): SheetData {
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

  push(["___________居家服務機構　個案基本權益保障規定", ""], TITLE_ROW_HEIGHT);
  setTitleRow(cs, merge, r - 1, NC);

  push(["制定日期：中華民國　　年　　月　　日　　版次：第 1 版　　核定人：___________", ""], DATA_ROW_BASE_HEIGHT);
  setMergedData(cs, merge, r - 1, NC);

  push(["第一章　總則", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const chap1: [string, string, number][] = [
    ["第一條\n（目的）",
      "為保障接受本機構居家服務之個案（以下簡稱個案）之基本尊嚴與合法權益，依《長期照顧服務法》第十七條及相關法規，制定本規定。",
      rowH(3)],
    ["第二條\n（適用範圍）",
      "本規定適用於本機構全體服務人員（含照顧服務員、督導員、行政人員及志工）對個案提供服務之行為規範。",
      rowH(3)],
  ];

  chap1.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["第二章　基本權益保障", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const chap2: [string, string, number][] = [
    ["第三條\n（尊嚴保障）",
      "服務人員應尊重個案之人格尊嚴，不得以言語、行為或態度貶損個案之自尊，服務過程應保持禮貌、耐心，維護個案之自主性與尊嚴感。",
      rowH(3)],
    ["第四條\n（無歧視原則）",
      "本機構及服務人員不得因個案之種族、性別、年齡、身心障礙程度、宗教信仰、政治立場、家庭背景、經濟狀況或疾病種類等因素，對其提供之服務有所歧視或差別待遇。",
      rowH(4)],
    ["第五條\n（禁止虐待）",
      "嚴禁任何形式之虐待行為，包括但不限於：\n一、身體虐待：毆打、抓傷、推擠、不當約束或其他造成身體傷害之行為。\n二、精神虐待：恐嚇、威脅、侮辱、嘲笑、忽視溝通需求之行為。\n三、性虐待：任何未經同意之性相關接觸或行為。\n四、疏忽：刻意忽略個案之照顧需求，致使其健康或安全受危害。\n服務人員發現任何疑似虐待情事，應立即通報督導員，督導員應依《老人福利法》第四十三條規定辦理通報。",
      rowH(10)],
    ["第六條\n（禁止剝削）",
      "服務人員不得向個案、其家屬或關係人有下列行為：\n一、借貸金錢或財物。\n二、要求餽贈、接受饋贈（節慶小禮物不在此限，但應於服務紀錄中登記）。\n三、從事不當商業推銷。\n四、以任何方式從個案處謀取不當利益。",
      rowH(7)],
    ["第七條\n（自主與知情同意）",
      "提供服務前應充分告知個案及其家屬服務內容、方式、費用及可能風險，取得同意後方可執行。個案有權拒絕特定服務，服務人員應予尊重，並記錄於服務紀錄中，不得強迫。",
      rowH(4)],
    ["第八條\n（申訴權利）",
      "個案及其家屬對服務有任何不滿或意見，得依本機構公告之申訴程序反映，不因申訴行為受到任何不利對待。申訴管道詳如本機構「個案申訴處理程序」。",
      rowH(3)],
  ];

  chap2.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["第三章　違規處理", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const chap3: [string, string, number][] = [
    ["第九條\n（違規通報）",
      "任何服務人員知悉同仁有違反本規定之情事，應立即通報主管，不得隱匿。",
      rowH(2)],
    ["第十條\n（違規懲處）",
      "違反本規定之服務人員，視情節輕重予以書面警告、停職、終止勞動契約或依法移送司法機關處理。",
      rowH(2)],
  ];

  chap3.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["第四章　附則", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  push(["第十一條\n（宣導與訓練）",
    "本規定應列為新進人員職前訓練必修課程，並每年至少辦理一次在職教育訓練，確保全體人員熟知並落實本規定。"], rowH(3));
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  push(["第十二條\n（修訂）",
    "本規定由機構負責人核定後實施，修訂時亦同。"], rowH(2));
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  push(["負責人簽章：___________　　日期：中華民國　　年　　月　　日", ""], DATA_ROW_BASE_HEIGHT);
  setMergedData(cs, merge, r - 1, NC);

  return {
    name: "個案權益保障規定",
    data,
    config: { columnlen: { "0": 180, "1": 680 }, rowlen, merge },
    cellStyles: cs,
  };
}

// ─── Sheet 2：個案權益聲明書 ──────────────────────────────────────────────────
function buildRightsStatementSheet(): SheetData {
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

  push(["___________居家服務機構　個案基本權益聲明書", ""], TITLE_ROW_HEIGHT);
  setTitleRow(cs, merge, r - 1, NC);

  push(["本機構告知本聲明書，向個案及其家屬（簽約者）說明本機構保障個案基本權益之承諾，請詳閱後於確認欄簽署。", ""], rowH(3));
  setMergedData(cs, merge, r - 1, NC);

  push(["【個案基本權益事項】", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const rights: [string, string, number][] = [
    ["一、尊嚴保障", "本機構承諾所有服務人員以尊重、禮貌之態度提供服務，維護個案人格尊嚴與自主性。", rowH(2)],
    ["二、無歧視服務", "本機構不因性別、宗教、種族、疾病種類、經濟狀況等任何因素，對個案服務有差別待遇。", rowH(2)],
    ["三、禁止虐待", "嚴禁任何形式之身體、精神、性或疏忽虐待，如有疑慮請立即向督導員反映。", rowH(2)],
    ["四、禁止剝削", "服務人員不得向個案或家屬借貸、索討財物或進行不當推銷。", rowH(2)],
    ["五、知情同意", "服務前將充分告知服務內容及注意事項，個案有權拒絕特定服務。", rowH(2)],
    ["六、申訴管道", "如對服務有任何不滿，得透過電話___________或親自至機構提出申訴，本機構保障申訴人之安全與隱私。", rowH(3)],
    ["七、主管機關申訴", "亦可向主管機關申訴：___________縣（市）政府社會局 申訴專線：___________", rowH(2)],
  ];

  rights.forEach(([title, content, h]) => {
    push([title, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["【確認簽署】", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  push(["本人已充分閱讀並瞭解上述個案基本權益事項，並確認本機構已向本人說明。", ""], rowH(3));
  setMergedData(cs, merge, r - 1, NC);

  const sigFields: [string, string][] = [
    ["個案姓名：", "___________"],
    ["簽約者（家屬）姓名：", "___________　　與個案關係：___________"],
    ["簽名：", "___________　（簽名或蓋章）"],
    ["日期：", "中華民國　　年　　月　　日"],
    ["告知人員：", "___________　（服務人員簽名）"],
  ];

  sigFields.forEach(([label, val]) => {
    push([label, val], DATA_ROW_BASE_HEIGHT);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0 };
  });

  return {
    name: "個案權益聲明書",
    data,
    config: { columnlen: { "0": 220, "1": 640 }, rowlen, merge },
    cellStyles: cs,
  };
}

// ─── Sheet 3：居家服務定型化契約（主契約第 1–23 條）─────────────────────────
function buildServiceContractSheet(): SheetData {
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

  push(["居家式服務類長期照顧服務機構定型化契約範本", ""], TITLE_ROW_HEIGHT);
  setTitleRow(cs, merge, r - 1, NC);

  push(["【簽約前注意事項】", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const preNotes: [string, string, number][] = [
    ["一",
      "簽約者辦理長期照顧服務使用者（以下稱使用者）接受居家式服務類（以下稱居家式）長期照顧服務機構（以下稱長照機構）提供之居家式長照服務時，有權將契約書攜回詳細審視。長照機構並應遵守下列事項：\n（一）參酌消費者保護法第十一條之一規定，長照機構與簽約者簽約前，應提供三十日以內之合理期間，供簽約者或使用者審閱全部條款內容。長照機構違反該規定者，其條款不構成契約之內容。但簽約者得主張該等條款仍構成契約之內容。本契約之審閱期間定為___日（至少三日審閱期）應屬合理期限，但簽約者要求更長時（但限三十日以內），長照機構亦應同意之。\n（二）長照機構應告知簽約者或使用者有關本契約一切之權利義務事項，並提供契約條款、肖像意願書（如附件一）及個資授權書（如附件二）之文件。",
      rowH(10)],
    ["二",
      "長照機構應確保廣告內容之真實，以及重要交易資訊應公開及透明化，其對使用者所負之義務不得低於廣告之內容。契約內容不得違反法律強制禁止規定或公序良俗。",
      rowH(3)],
    ["三",
      "本契約範本僅供長照機構及簽約者參考。本契約雖為定型化契約之一種，惟長照機構或簽約者仍得針對個別狀況，經雙方合議定其內容。雙方不得以本契約內容為主管機關所定為由，主張無法修改，亦不得為有利於己之修正後宣稱為政府機關版本，而主張不得修改。",
      rowH(4)],
    ["四",
      "長照機構應提供長照機構提供服務所在地主管機關申訴專線：___________、申訴傳真電話：___________、或線上申訴電子信箱或網址：___________；長照機構申訴管道（電話、傳真、電子信箱或線上申訴網址）。",
      rowH(3)],
    ["五",
      "如使用者無法表達意願時，由簽約者代為簽署，使用者委託簽約者之同意書如附件三。",
      rowH(2)],
  ];

  preNotes.forEach(([num, content, h]) => {
    push([num, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["本契約及附件於中華民國___年___月___日經簽約者攜回審閱（至少三日審閱期）。但必要時，應給予即時或合理之審閱期間。\n簽約者已行使審閱權利並充分瞭解契約內容及其附件，審閱無誤。", ""], rowH(4));
  setMergedData(cs, merge, r - 1, NC);

  push(["長照機構簽章：___________　　　簽約者簽章：___________", ""], DATA_ROW_BASE_HEIGHT);
  setMergedData(cs, merge, r - 1, NC);

  push(["【立契約當事人】", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const partyRows: [string, string][] = [
    ["簽約者：", "___________　○使用者本人　○家屬，關係___________　○其他___________"],
    ["長照機構：", "___________"],
  ];
  partyRows.forEach(([label, val]) => {
    push([label, val], DATA_ROW_BASE_HEIGHT);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0 };
  });

  push(["茲為使用者___________居家式長照服務事宜，經簽約者及長照機構雙方同意依本契約條款履行並簽立條款如下：", ""], rowH(2));
  setMergedData(cs, merge, r - 1, NC);

  push(["【契約條款】", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const articles: [string, string, number][] = [
    ["第一條\n（雙方當事人\n給付義務）",
      "長照機構派員至使用者住居所（位於___縣（市）___鄉（鎮、市、區）___路（街）___段___巷___弄___號___樓）或其指定之其他居所，依第三條所定服務項目及內容提供居家式長照服務，簽約者依第六條所定服務費用繳費，供使用者預計自___年___月___日起使用服務。\n依使用者需求合意變動前項服務住居所時，應於契約內記載變動內容。",
      rowH(6)],
    ["第二條\n（契約期間）",
      "□一、定期契約：本契約期間自簽訂之日起至___年___月___日為止。\n□二、不定期契約：本契約自簽訂之日起生效。\n本契約及附件於中華民國___年___月___日經簽約者攜回___日審閱（至少三日審閱期）。但必要時，應給予即時或合理之審閱期間。（簽約者簽名___________）",
      rowH(5)],
    ["第三條\n（服務項目\n及內容）",
      "長照機構提供使用者長服法第十條之居家式長照服務或第十三條第一項第三款之喘息服務，其項目如下：\n□一、方案一：長照機構提供政府補助之服務（如各縣市長照管理中心核定之照顧計畫）；收費標準依長照給付辦法規定。\n□二、方案二：長照機構提供自費服務，應載明其服務項目、數量及其他內容（附件四）；收費標準由所在地主管機關依長服法第三十五條核定。\n採方案一之使用者於接受主管機關再次評估後，如補助額度與內容有變者，應變更契約或附件。\n簽約者於締約時，如提供使用者之醫療資料記載醫囑事項，長照機構應以其既有設施及人力依醫囑事項辦理。",
      rowH(9)],
    ["第四條\n（廣告內容）",
      "長照機構應確保廣告內容之真實，對使用者所負之義務不得低於廣告之內容，廣告與文宣均視為契約內容之一部分。",
      rowH(3)],
    ["第五條\n（許可立案等\n相關資訊之\n揭示與提供）",
      "長照機構應將設立許可證書、收費標準、服務項目、服務使用須知，與長照機構提供服務所在地主管機關所設之陳情、申訴、調處及爭議處理機制之資訊，揭示於機構內明顯處所，並主動提供簽約者及使用者參閱。",
      rowH(4)],
    ["第六條\n（服務費用\n收取及繳納）",
      "簽約者應繳納長期照顧費，其數額及繳費方式如下：\n一、長期照顧費：\n□（一）方案一：按照額計畫內照顧組合之項目及使用頻率，在核定額度內之每月使用之部分負擔為新臺幣___元（依據使用者之福利身分別）；超出核定額度或因可歸責之事由，依方案二收費。使用項目、頻率及費用如附件四。\n□（二）方案二：依第三條服務項目及內容之方案二計算費用，為每月/日新臺幣___元。使用項目、頻率及費用如附件四。\n二、簽約者應於每月___日前繳納□前月□當月長期照顧費。繳費方式如下，簽約者繳費後，長照機構應開立收據予簽約者：\n□（一）簽約者透過金融機構轉帳至長照機構指定銀行帳號。\n□（二）簽約者親自至長照機構繳交費用。\n□（三）其他方式：___________。\n長照機構除本契約另有約定外，不得向簽約者或使用者請求額外之費用。但收費標準以外之其他核定服務衍生費用（如代購食材、耗材及相關項目），由簽約者支付。\n使用者因故需臨時取消服務時，應於服務時間一日前通知長照機構。但有緊急情況者，不在此限。",
      rowH(14)],
    ["第七條\n（服務不中斷\n義務）",
      "長照機構於知悉提供服務之人員離職時，應於___日前告知簽約者及使用者，並應於五日內儘速安排接替人員，避免服務中斷。\n長照機構臨時異動服務時間，應於合理時間前通知簽約者及使用者，並安善協調安排提供服務。\n長照機構應依約定時間抵達使用者住居所；如因天災、事變或其他不可抗力或不可歸責於長照機構之事由，致未能依時履約，應調整服務時間，不得無故中斷服務。",
      rowH(7)],
    ["第八條\n（使用者隱私\n之保密）",
      "長照機構及其提供服務之人員對於因業務而知悉或持有他人之秘密，非依法律規定，不得洩漏。但長照機構依法應通報或提供相關資料者，不在此限。",
      rowH(3)],
    ["第九條\n（家屬在場）",
      "長照機構提供使用者醫事照護服務時，經長照機構認定需有家屬或照顧者在場時，簽約者應協助配合。",
      rowH(2)],
    ["第十條\n（禁止不正當\n利益行為）",
      "長照機構及其提供服務之人員不得向簽約者、使用者或其家屬有不當推銷、借貸、金錢、財物或利益往來之行為，或有不當對價之關係，亦不得接受其饋贈財物。",
      rowH(3)],
    ["第十一條\n（服務費用\n調整）",
      "□一、定期契約：\n（一）依據長照給付辦法收取服務費用者，應依該辦法收取，不得調整費用。\n（二）非依長照給付辦法收取服務費用者，長照機構調整收費標準，應報所在地主管機關核定；長照機構於契約期限內調整收費標準，非經簽約者同意，不得調整本契約所定之服務費用。\n□二、不定期契約：\n（一）依據長照給付辦法收取服務費用者，應依該辦法收取，不得調整費用。\n（二）非依長照給付辦法收取服務費用者，長照機構調整收費標準，應報所在地主管機關核定後通知簽約者；長照機構應於調整費用前二個月通知簽約者，簽約者應於一個月內回復是否同意。簽約者不同意調整收費或未依限表示同意者，依第十五條第二項第四款辦理。",
      rowH(12)],
    ["第十二條\n（緊急事故\n處理流程）",
      "長照機構應訂定急、重、傷病或其他緊急事故處理流程，於雙方簽訂本契約時交付簽約者收執。\n使用者接受服務時發生急、重、傷病或其他緊急事故，長照機構負有依前項處理流程之作為義務。\n長照機構違反前二項義務致使用者受有損害時，應負賠償責任。簽約者受有其他損害，另得請求賠償。（緊急事故處理同意書如附件五）",
      rowH(6)],
    ["第十三條\n（緊急聯絡人\n之指定）",
      "使用者發生急、重、傷病或其他緊急事故之服務事項，應通知簽約者指定之緊急聯絡人（緊急事故處理同意書如附件五）。\n緊急聯絡人經長照機構通知後未及時回復、處理，或無法聯絡，長照機構應依當時情形為必要之處置（如使用者須緊急送醫時，迅速逕送距離使用者最近或由救護車逕送合適之醫療機構）；緊急聯絡人、簽約者或使用者無正當理由者，不得提出異議。",
      rowH(6)],
    ["第十四條\n（契約終止）",
      "使用者應於約定使用服務日或契約生效日起___日內接受服務。如無正當理由居期仍未接受服務者，長照機構得終止契約。\n簽約者得在不違反使用者意思或最佳利益下，自使用者使用服務之日起三十日內主動終止契約，長照機構不得拒絕，簽約者應依使用者實際使用服務次數支付服務費用。\n長照機構除經許可停業或歇業，或有第十五條所定情形之一，不得終止契約；契約終止時，長照機構應通知簽約者或依法應負照顧之人，並通知地方主管機關或社區整合型服務中心備查。",
      rowH(7)],
    ["第十五條\n（長照機構\n提前終止契約）",
      "簽約者於訂立契約時，以詐術使長照機構誤信使用者符合接受服務條件，或為其他虛偽之意思表示，使長照機構誤信而有受損害之虞者，長照機構得終止契約。\n使用者接受服務後有下列情形之一者，長照機構得終止契約：\n一、使用者失蹤逾二個月或搬離長照機構特約服務區域。\n二、健康狀況改變，致不符合接受服務條件。\n三、簽約者積欠第六條服務費用達一個月之總額，經長照機構___（最少一個月）催告，屆期仍未繳費。\n四、簽約者不同意依第十一條第二款第二目規定調整收費或未依限表示同意。\n使用者接受服務後有下列情形之一者，長照機構得先暫停服務且通報，並採取必要之措施或處置，經相當時間仍未改善時，亦得終止契約：\n一、簽約者要求從事本契約約定以外不合理之服務，且經說明仍不接受。\n二、使用者入住住宿式機構、住院、出國。\n三、使用者失聯逾一個月。\n四、簽約者、使用者或其家屬之性騷擾、言語重大侮辱或其他不當行為，致長照機構提供服務人員之生命、身體、自由、財產、人格等法益有受重大損害之虞。\n五、使用者環境具危險性或其他緊急情況，致長照機構提供服務之人員有危險之虞。危險原因消失時，長照機構應即恢復提供服務。\n長照機構依第一項至第三項規定提前終止本契約，應通知簽約者或依法應負照顧之人知悉，並通報地方主管機關或社區整合型服務中心備查。",
      rowH(22)],
    ["第十六條\n（簽約者\n提前終止契約）",
      "簽約者應於一個月前通知長照機構終止契約，但有下列情形者，得逕行通知終止契約：\n一、長照機構於訂立契約時為虛偽之意思表示，使簽約者誤信而有受損害之虞。\n二、長照機構提供服務之人員對簽約者、使用者或其家屬實施暴行或有重大侮辱。\n三、長照機構提供服務之人員罹患法定傳染病，有傳染之虞。但長照機構已依中央衛生主管機關之規定將該提供服務之人員送醫診治、採取必要之隔離或防護措施者，不在此限。\n四、長照機構停業或歇業，未於二個月前通知簽約者。\n簽約者及使用者因前項契約終止受有損害，得向長照機構請求損害賠償。",
      rowH(10)],
    ["第十七條\n（契約終止時\n費用之結算）",
      "契約終止時，長照機構應於契約終止當日起七個工作日內，將簽約者依第六條已繳之服務費用，按契約終止後之日數比例退還之。",
      rowH(3)],
    ["第十八條\n（使用者\n死亡之處理）",
      "長照機構提供服務時發現使用者死亡，且使用者家屬不在場，長照機構應報請警方處理，並立即通知簽約者或緊急聯絡人。",
      rowH(2)],
    ["第十九條\n（爭議處理）",
      "若簽約者或使用者與長照機構產生糾紛，應於雙方合意下以___________縣（市）主管機關所訂之陳情、申訴及調處機制處理。\n長照機構有長服法第五十九條第一項第一款「因管理之明顯疏失，情節重大，致接受長照服務者傷亡」及第二款「所屬之長照人員提供長照服務，違反本法規定，且情節重大，並可歸責於該機構」之情形之一者，依該條第二項規定之爭議處理機制辦理。",
      rowH(7)],
    ["第二十條\n（法院管轄）",
      "簽約者及長照機構雙方因本契約涉訟時，同意以○○地方法院為第一審管轄法院。但不排除消費者保護法第四十七條或民事訴訟法第四百三十六條之九管轄法院之適用。",
      rowH(3)],
    ["第二十一條\n（附件及服務\n使用須知之效力）",
      "簽約者及長照機構雙方依本契約所定附件經簽約者審閱後，視為契約之一部分，與契約有同一效力。",
      rowH(2)],
    ["第二十二條\n（契約協議補充）",
      "本契約未盡事宜，悉依相關法令處理，並得由簽約者及長照機構雙方隨時協議補充之。",
      rowH(2)],
    ["第二十三條\n（契約書之收執）",
      "本契約書一式___份，經簽約者及長照機構雙方及緊急聯絡人簽名或蓋章後生效，各執一份為憑。如送法院公證，其所需費用除另有約定外，由簽約者及長照機構雙方平均分擔。",
      rowH(3)],
  ];

  articles.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["【簽約者資料】", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const signatoryFields: [string, string][] = [
    ["簽約者姓名：", "○使用者本人　○家屬，關係___________　○其他___________"],
    ["國民身分證字號：", "___________"],
    ["戶籍地址：", "___________"],
    ["聯絡地址：", "___________"],
    ["聯絡電話：", "___________"],
    ["行動電話：", "___________"],
    ["電子郵件信箱：", "___________ （如無，可不填寫）"],
  ];
  signatoryFields.forEach(([label, val]) => {
    push([label, val], DATA_ROW_BASE_HEIGHT);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0 };
  });

  push(["【長照機構資料】", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const institutionFields: [string, string][] = [
    ["長照機構名稱：", "___________"],
    ["機構負責人：", "___________"],
    ["機構負責人國民身分證字號／長照機構統一編號：", "___________"],
    ["機構地址：", "___________"],
    ["電話：", "___________"],
    ["電子郵件信箱：", "___________ （如無，可不填寫）"],
  ];
  institutionFields.forEach(([label, val]) => {
    push([label, val], DATA_ROW_BASE_HEIGHT);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0 };
  });

  push(["【服務使用者資料】", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const userFields: [string, string][] = [
    ["服務使用者姓名：", "___________"],
    ["國民身分證字號：", "___________"],
    ["戶籍地址：", "___________"],
    ["聯絡地址：", "___________"],
    ["聯絡電話：", "___________"],
  ];
  userFields.forEach(([label, val]) => {
    push([label, val], DATA_ROW_BASE_HEIGHT);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0 };
  });

  push(["【緊急聯絡人資料】", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const emergencyFields: [string, string][] = [
    ["緊急聯絡人姓名：", "___________"],
    ["國民身分證字號：", "___________"],
    ["戶籍地址：", "___________"],
    ["聯絡電話：", "___________"],
    ["行動電話：", "___________"],
    ["電子郵件信箱：", "___________ （如無，可不填寫）"],
  ];
  emergencyFields.forEach(([label, val]) => {
    push([label, val], DATA_ROW_BASE_HEIGHT);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0 };
  });

  push(["中華民國　　年　　月　　日", ""], DATA_ROW_BASE_HEIGHT);
  setMergedData(cs, merge, r - 1, NC);

  return {
    name: "居家服務定型化契約",
    data,
    config: { columnlen: { "0": 180, "1": 680 }, rowlen, merge },
    cellStyles: cs,
  };
}

// ─── Sheet 4：附件一 肖像權意願書 ────────────────────────────────────────────
function buildContractAttachment1Sheet(): SheetData {
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

  push(["附件一：___________長期照顧服務機構　肖像授權意願書", ""], TITLE_ROW_HEIGHT);
  setTitleRow(cs, merge, r - 1, NC);

  push(["本人___________　□同意　□不同意　貴機構得以拍攝記錄服務對象___________，並同意授權由貴機構使用服務對象非涉及隱私部位之肖像，基於非營利目的得以影像存檔、公告欄、紙本文宣、網站等管道公開發表或展示。\n前項所為之公開發表，貴機構應以服務對象個人形象為優先考量，且不得發表於非正當或違反社會風俗之管道，倘有明顯不利於服務對象情事，簽署人得以立即終止貴機構使用其肖像權。", ""], rowH(6));
  setMergedData(cs, merge, r - 1, NC);

  push(["【簽署人資訊】", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const sigFields: [string, string][] = [
    ["簽署人簽章：", "___________"],
    ["與服務對象關係：", "___________"],
    ["聯絡方式：", "___________"],
  ];
  sigFields.forEach(([label, val]) => {
    push([label, val], DATA_ROW_BASE_HEIGHT);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0 };
  });

  push(["中華民國　　　年　　　月　　　日", ""], DATA_ROW_BASE_HEIGHT);
  setMergedData(cs, merge, r - 1, NC);

  return {
    name: "附件一 肖像權意願書",
    data,
    config: { columnlen: { "0": 180, "1": 680 }, rowlen, merge },
    cellStyles: cs,
  };
}

// ─── Sheet 5：附件二 個資授權同意書 ──────────────────────────────────────────
function buildContractAttachment2Sheet(): SheetData {
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

  push(["附件二：個人資料授權同意書", ""], TITLE_ROW_HEIGHT);
  setTitleRow(cs, merge, r - 1, NC);

  push(["本同意書說明___________（長照機構名稱）將如何處理本表單所蒐集到的所有個人資料。當您勾選「我同意」並簽署本同意書時，表示您已閱讀、瞭解並同意接受本同意書之所有內容及其後修改變更規定。若您有法定代理人，應於您的法定代理人閱讀、瞭解並同意本同意書之所有內容及其後修改變更規定後，方得使用本服務，但若您已接受本服務，視為您已取得法定代理人之同意，並遵守以下所有規範。", ""], rowH(6));
  setMergedData(cs, merge, r - 1, NC);

  const sections: [string, string, number][] = [
    ["一、基本資料之\n蒐集、更新及保管",
      "（一）蒐集您的個人資料在中華民國「個人資料保護法」與相關法令之規範下，蒐集、處理及利用您的個人資料。\n（二）請於申請時提供您本人正確、最新及完整的個人資料。\n（三）因執行業務所蒐集您的個人資料包括姓名、身分證字號、性別、生日、血型、戶籍地址、通訊地址、電話等。\n（四）若您的個人資料有任何異動，請主動申請更正，使其保持正確、最新及完整。\n（五）若您提供錯誤、不實、不完整或具誤導性的資料，將可能導致損失相關權益。",
      rowH(9)],
    ["二、蒐集個人資料\n之目的",
      "（一）為「提供長期照顧服務」之業務，需蒐集您的個人資料。\n（二）當您的個人資料使用方式與當初本機構蒐集的目的不同時，我們會在使用前先徵求您的書面同意，您可以拒絕。\n（三）本機構利用您的個人資料期間為即日起至服務中止日止，利用地區為台灣地區。",
      rowH(6)],
    ["三、基本資料之保密",
      "本機構如違反「個人資料保護法」規定或因天災、事變或其他不可抗力所致者，致您的個人資料被竊取、洩漏、竄改、遭其他侵害者，將於查明後以電話、信函、電子郵件或網站公告等方法，擇適當方式通知您。",
      rowH(4)],
    ["四、同意書之效力",
      "（一）當您勾選「我同意」並簽署本同意書時，即表示您已閱讀、瞭解並同意本同意書之所有內容。\n（二）您自本同意書取得的任何建議或資訊，無論是書面或口頭形式，除非本同意書條款有明確規定，均不構成本同意條款以外之任何保證。",
      rowH(4)],
    ["五、準據法與管轄\n法院",
      "本同意書之解釋與適用，以及本同意書有關之爭議，均應依照中華民國法律予以處理，並以___________法院為管轄法院。",
      rowH(3)],
  ];

  sections.forEach(([title, content, h]) => {
    push([title, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["□已閱讀並接受上述同意書內容。服務使用者或簽約者簽名（請親簽）：___________", ""], DATA_ROW_BASE_HEIGHT);
  setMergedData(cs, merge, r - 1, NC);

  push(["年　　　月　　　日", ""], DATA_ROW_BASE_HEIGHT);
  setMergedData(cs, merge, r - 1, NC);

  return {
    name: "附件二 個資授權同意書",
    data,
    config: { columnlen: { "0": 200, "1": 660 }, rowlen, merge },
    cellStyles: cs,
  };
}

// ─── Sheet 6：附件三 委託簽約同意書 ──────────────────────────────────────────
function buildContractAttachment3Sheet(): SheetData {
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

  push(["附件三：使用者委託簽約者同意書", ""], TITLE_ROW_HEIGHT);
  setTitleRow(cs, merge, r - 1, NC);

  push(["使用者___________同意委託簽約者___________與貴機構___________簽定「居家式服務類長期照顧服務契約書」一案，特立此書為憑。\n此致\n　　　　　___________機構（名稱）", ""], rowH(5));
  setMergedData(cs, merge, r - 1, NC);

  push(["【簽約者資料】", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const signatoryFields: [string, string][] = [
    ["簽約者：", "___________　（簽名或蓋章）"],
    ["國民身分證統一編號：", "___________"],
    ["戶籍地址：", "___________"],
    ["聯絡地址：", "___________"],
    ["電話：", "___________"],
  ];
  signatoryFields.forEach(([label, val]) => {
    push([label, val], DATA_ROW_BASE_HEIGHT);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0 };
  });

  push(["【服務使用者資料】", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const userFields: [string, string][] = [
    ["服務使用者：", "___________　（簽名或蓋章）"],
    ["國民身分證統一編號：", "___________"],
    ["戶籍地址：", "___________"],
    ["聯絡地址：", "___________"],
    ["電話：", "___________"],
  ];
  userFields.forEach(([label, val]) => {
    push([label, val], DATA_ROW_BASE_HEIGHT);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0 };
  });

  push(["中華民國　　年　　月　　日", ""], DATA_ROW_BASE_HEIGHT);
  setMergedData(cs, merge, r - 1, NC);

  return {
    name: "附件三 委託簽約同意書",
    data,
    config: { columnlen: { "0": 220, "1": 640 }, rowlen, merge },
    cellStyles: cs,
  };
}

// ─── Sheet 7：附件四 服務項目費用表（6 欄）───────────────────────────────────
function buildContractAttachment4Sheet(): SheetData {
  const NC = 6;
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

  push(["附件四：服務項目、頻率及費用", "", "", "", "", ""], TITLE_ROW_HEIGHT);
  merge[`${r - 1}_0`] = { r: r - 1, c: 0, rs: 1, cs: NC };
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true };

  // Table 1：身體照顧、日常生活及家務服務
  push(["□一、身體照顧、日常生活及家務服務。開始日期：___年___月___日", "", "", "", "", ""], SECTION_HEADER_HEIGHT);
  merge[`${r - 1}_0`] = { r: r - 1, c: 0, rs: 1, cs: NC };
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, bg: "#EFEFEF" };

  push(["服務項目", "單價（元）", "部分負擔費用（元）", "服務頻率（次/週或次/月）", "費用總計（元/週或元/月）", "備註"], SECTION_HEADER_HEIGHT);
  for (let c = 0; c < NC; c++) cs[`${r - 1}_${c}`] = { ht: 0, vt: 0, bold: true, bg: "#EFEFEF" };

  for (let i = 1; i <= 5; i++) {
    push([`${i}.`, "", "", "", "", ""], DATA_ROW_BASE_HEIGHT);
    for (let c = 0; c < NC; c++) cs[`${r - 1}_${c}`] = { ht: 0, vt: 0, tb: 2 };
  }

  // Table 2：其他（如居家喘息服務）
  push(["□二、其他：如居家喘息服務等。開始日期：___年___月___日", "", "", "", "", ""], SECTION_HEADER_HEIGHT);
  merge[`${r - 1}_0`] = { r: r - 1, c: 0, rs: 1, cs: NC };
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, bg: "#EFEFEF" };

  push(["服務項目", "單價（元）", "部分負擔費用", "服務頻率（次/週或次/月）", "費用總計（元/週或元/月）", "備註"], SECTION_HEADER_HEIGHT);
  for (let c = 0; c < NC; c++) cs[`${r - 1}_${c}`] = { ht: 0, vt: 0, bold: true, bg: "#EFEFEF" };

  for (let i = 1; i <= 3; i++) {
    push([`${i}.`, "", "", "", "", ""], DATA_ROW_BASE_HEIGHT);
    for (let c = 0; c < NC; c++) cs[`${r - 1}_${c}`] = { ht: 0, vt: 0, tb: 2 };
  }

  return {
    name: "附件四 服務項目費用表",
    data,
    config: { columnlen: { "0": 160, "1": 100, "2": 120, "3": 140, "4": 140, "5": 80 }, rowlen, merge },
    cellStyles: cs,
  };
}

// ─── Sheet 8：附件五 緊急事故處理同意書 ──────────────────────────────────────
function buildContractAttachment5Sheet(): SheetData {
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

  push(["附件五：緊急事故處理同意書", ""], TITLE_ROW_HEIGHT);
  setTitleRow(cs, merge, r - 1, NC);

  push(["簽約者___________就貴機構（長照機構名稱：___________，地址：___________）於提供服務期間，服務使用者___________因發生急、重、傷病或其他必要之服務通知事項，同意緊急聯絡人如經貴機構通知後未及時處理者，貴機構得辦理下列事項：\n一、服務使用者須緊急送醫時，由救護車逕送合適之醫療機構。\n二、___________\n三、___________\n四、___________", ""], rowH(8));
  setMergedData(cs, merge, r - 1, NC);

  push(["【立同意書人資料】", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const consentorFields: [string, string][] = [
    ["立同意書人：", "___________　（簽名或蓋章）"],
    ["國民身分證統一編號：", "___________"],
    ["戶籍地址：", "___________"],
    ["聯絡地址：", "___________"],
    ["聯絡電話：", "___________"],
  ];
  consentorFields.forEach(([label, val]) => {
    push([label, val], DATA_ROW_BASE_HEIGHT);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0 };
  });

  push(["【第一緊急聯絡人資料】", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const contact1Fields: [string, string][] = [
    ["第一緊急聯絡人：", "___________　（簽名或蓋章）"],
    ["國民身分證統一編號：", "___________"],
    ["戶籍地址：", "___________"],
    ["聯絡地址：", "___________"],
    ["聯絡電話：", "___________"],
  ];
  contact1Fields.forEach(([label, val]) => {
    push([label, val], DATA_ROW_BASE_HEIGHT);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0 };
  });

  push(["【第二緊急聯絡人資料】（如有）", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const contact2Fields: [string, string][] = [
    ["第○緊急聯絡人：", "___________　（簽名或蓋章）"],
    ["國民身分證統一編號：", "___________"],
    ["戶籍地址：", "___________"],
    ["聯絡地址：", "___________"],
    ["聯絡電話：", "___________"],
  ];
  contact2Fields.forEach(([label, val]) => {
    push([label, val], DATA_ROW_BASE_HEIGHT);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0 };
  });

  push(["中華民國　　年　　月　　日", ""], DATA_ROW_BASE_HEIGHT);
  setMergedData(cs, merge, r - 1, NC);

  return {
    name: "附件五 緊急事故處理同意書",
    data,
    config: { columnlen: { "0": 220, "1": 640 }, rowlen, merge },
    cellStyles: cs,
  };
}

/** 產生項目 2「個案基本權益維護」的 8 個自訂補充分頁 */
export function buildHomeCareItem2CustomSheets(): SheetData[] {
  return [
    buildRightsPolicySheet(),
    buildRightsStatementSheet(),
    buildServiceContractSheet(),
    buildContractAttachment1Sheet(),
    buildContractAttachment2Sheet(),
    buildContractAttachment3Sheet(),
    buildContractAttachment4Sheet(),
    buildContractAttachment5Sheet(),
  ];
}
