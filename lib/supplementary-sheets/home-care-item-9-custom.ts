/**
 * 居家照顧評鑑項目 9「日常生活協助」自訂補充分頁
 *
 * 產生 1 個工作分頁：
 *   1. 家務協助服務範疇規定（允許/禁止事項清單＋爭議處理）
 *
 * 法源依據：
 *   - 長期照顧服務法 §11（服務項目：日常生活照顧服務）
 *   - 照顧服務員訓練實施計畫（服務範圍界定）
 *   - 衛生福利部居家服務補助辦法（核定服務項目）
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

function buildServiceScopeSheet(): SheetData {
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

  push(["___________居家服務機構　家務協助服務範疇規定", ""], TITLE_ROW_HEIGHT);
  setTitleRow(cs, merge, r - 1, NC);

  push(["制定日期：中華民國　　年　　月　　日　　版次：第 1 版　　核定人：___________", ""], DATA_ROW_BASE_HEIGHT);
  setMergedData(cs, merge, r - 1, NC);

  push(["第一章　總則", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const chap1: [string, string, number][] = [
    ["第一條\n（目的）",
      "為明確界定本機構照顧服務員提供家務協助服務之範疇，避免服務逾越專業分工界限，保障個案安全及照顧服務員之勞動權益，依《長期照顧服務法》第十一條及相關規定，制定本規定。",
      rowH(4)],
    ["第二條\n（適用範圍）",
      "本規定適用於本機構提供家務及日常生活照顧服務（衛生福利部長期照顧服務給付及支付基準表 BA碼服務）之作業。",
      rowH(3)],
  ];

  chap1.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["第二章　服務項目（允許範疇）", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const chap2: [string, string, number][] = [
    ["第三條\n（餐飲服務）",
      "包括：備餐（食材切備、烹飪）、餐後收拾餐具、協助個案進食、清洗餐具及廚具。\n說明：僅限個案本人及同住家屬之合理餐食準備，不含辦理大型宴席或為非同住家屬烹飪。",
      rowH(5)],
    ["第四條\n（居家清潔服務）",
      "包括：個案使用空間之打掃（廚房、浴室、臥室、客廳）、吸塵拖地、清潔浴廁、整理個案衣物及臥具。\n說明：清潔範圍以個案日常使用之居住空間為限，不含大規模清理（如整棟裝潢清潔、屋頂清洗）。",
      rowH(5)],
    ["第五條\n（洗衣服務）",
      "包括：個案個人衣物及床單清洗（機洗或手洗）、晾曬、折疊收納。\n說明：限個案本人衣物，不含大量家庭成員衣物之清洗（如每次超過一般洗衣機一桶之合理量）。",
      rowH(4)],
    ["第六條\n（購物與生活協助）",
      "包括：代為採購個案日常必需之食材、藥品、日用品；陪同個案外出就醫、購物、散步等。\n說明：採購費用須由個案或家屬預先提供或事後結算，照服員不得自行墊付大額費用。",
      rowH(4)],
    ["第七條\n（居家安全協助）",
      "包括：確認個案居住環境無立即危險（電器未關、瓦斯未關等）、回報環境設備損壞問題。",
      rowH(3)],
  ];

  chap2.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["第三章　服務禁止事項（超越服務範疇）", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  push(["第八條\n（醫療行為禁止）",
    "照顧服務員不得執行任何醫療或護理行為，包括：\n一、傷口換藥（含壓傷清創）。\n二、管灌餵食（鼻胃管、胃造口）。\n三、導尿、灌腸。\n四、施打針劑（含胰島素自我注射以外）。\n五、調整藥物劑量。\n如個案有上述需求，應通報督導員，安排護理師或醫事人員提供服務。",
    rowH(9)]);
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  push(["第九條\n（其他超範疇\n禁止事項）",
    "照顧服務員不得執行下列事項：\n一、為個案以外之非同住家屬提供家事服務（如為其他子女清潔或烹飪）。\n二、替個案或家屬辦理任何財務、金融、法律事務。\n三、提供個案尚未核定或支付額度以外之服務（如僅核定家務服務但要求照服員執行沐浴）。\n四、在服務時間以外留宿或長時間陪伴。",
    rowH(7)]);
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  push(["第四章　爭議處理", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  const chap4: [string, string, number][] = [
    ["第十條\n（現場爭議處理）",
      "照顧服務員於服務現場遇個案或家屬要求超出服務範疇之事項時，應：\n一、以禮貌、堅定之態度向個案或家屬說明服務範疇限制。\n二、如對方仍堅持，立即以電話聯繫督導員，由督導員出面協調說明。\n三、不得在未獲機構授權之情況下自行承諾提供超範疇服務。",
      rowH(6)],
    ["第十一條\n（爭議紀錄）",
      "督導員應將服務範疇爭議案件登錄於「服務範疇爭議案件紀錄表」，並於三個工作日內完成回應，如需調整服務計畫，應通知個案管理員更新照顧計畫。",
      rowH(3)],
  ];

  chap4.forEach(([id, content, h]) => {
    push([id, content], h);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
    cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
  });

  push(["第五章　附則", ""], SECTION_HEADER_HEIGHT);
  setSectionHeader(cs, merge, r - 1, NC);

  push(["第十二條\n（宣導與公告）",
    "本規定應於個案入案時說明，並張貼於機構明顯處；新進照顧服務員應於職前訓練中完成本規定之學習，並簽署知悉確認書。",
    rowH(3)]);
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  push(["第十三條\n（修訂）",
    "本規定由機構負責人核定後實施，修訂時亦同。",
    rowH(2)]);
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
  cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };

  push(["負責人簽章：___________　　日期：中華民國　　年　　月　　日", ""], DATA_ROW_BASE_HEIGHT);
  setMergedData(cs, merge, r - 1, NC);

  return {
    name: "家務協助服務範疇規定",
    data,
    config: { columnlen: { "0": 180, "1": 680 }, rowlen, merge },
    cellStyles: cs,
  };
}

/** 產生項目 9「日常生活協助」的 1 個自訂補充分頁 */
export function buildHomeCareItem9CustomSheets(): SheetData[] {
  return [buildServiceScopeSheet()];
}
