/**
 * 住宿型照顧機構評鑑項目 61「服務對象財物及遺物管理」自訂補充分頁
 *
 * 新增 1 個工作分頁：
 *   1. 財物及遺物保管辦法
 */
import type { SheetData } from "../excel-template-builder";
import { buildPolicyDocSheet } from "./nursing-home-policy-template";

function buildPropertyManagementPolicy(): SheetData {
  return buildPolicyDocSheet({
    name: "財物及遺物保管辦法",
    instTitle: "服務對象財物及遺物保管管理辦法",
    chapters: [
      {
        name: "第一章　總則",
        articles: [
          {
            number: "第一條",
            title: "（目的）",
            body: "為保障服務對象財物安全，防止遺失或盜竊，並對離院（含死亡）服務對象之遺物妥善處理，制定本辦法。",
          },
        ],
      },
      {
        name: "第二章　財物保管",
        articles: [
          {
            number: "第二條",
            title: "（入住財物清點）",
            body: "服務對象入住時，社工師應協助進行財物清點，建立「服務對象財物管理紀錄表」，記載：\n一、現金（建議存放貴重物品保管箱）\n二、貴重物品（金飾、手錶、手機等）\n三、身分證件、健保卡、存摺\n清點完成由服務對象（或家屬）及社工師共同簽名確認。",
          },
          {
            number: "第三條",
            title: "（財物安全管理）",
            body: "財物安全措施：\n一、現金及貴重物品應置於有鎖之保管箱或護理站保險箱\n二、工作人員不得未經授權接觸服務對象財物\n三、服務對象零用金由社工師記帳管理，每月結算並讓服務對象（或家屬）確認",
          },
          {
            number: "第四條",
            title: "（財物取用）",
            body: "每次為服務對象取用零用金，均應填寫「財物取用紀錄」，記載取用日期、金額、用途及取用人。服務對象本人或其授權之家屬取用時同樣需登記。",
          },
        ],
      },
      {
        name: "第三章　遺物處理",
        articles: [
          {
            number: "第五條",
            title: "（離院遺物處理）",
            body: "服務對象出院（含轉機構）或死亡後，社工師應於家屬到達時共同清點遺物，填寫「遺物清點清冊」（雙方簽名），並完整移交家屬。認知障礙個案轉介時，遺物一併隨同移轉至接受機構。",
          },
          {
            number: "第六條",
            title: "（無人認領遺物）",
            body: "服務對象無家屬或家屬失聯時，遺物應妥善保管，並：\n一、積極聯繫社會局協助尋找家屬或法定繼承人\n二、遺物保管期限依主管機關規定辦理\n三、逾期無人認領之遺物依法律程序辦理",
          },
        ],
      },
      {
        name: "第四章　附則",
        articles: [
          {
            number: "第七條",
            title: "（施行日期）",
            body: "本辦法自核定日起施行。",
          },
        ],
      },
    ],
  });
}

export function buildNursingHomeItem61CustomSheets(): SheetData[] {
  return [buildPropertyManagementPolicy()];
}
