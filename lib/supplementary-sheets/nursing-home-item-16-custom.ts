/**
 * 住宿型照顧機構評鑑項目 16「促進服務對象與家屬互動」自訂補充分頁
 *
 * 新增 2 個工作分頁：
 *   1. 家屬互動辦法
 *   2. 家屬滿意度調查紀錄表
 */
import type { SheetData } from "../excel-template-builder";
import { buildPolicyDocSheet } from "./nursing-home-policy-template";
import { buildTableSheet } from "./sheet-style-kit";

function buildFamilyInteractionPolicy(): SheetData {
  return buildPolicyDocSheet({
    name: "家屬互動辦法",
    instTitle: "促進服務對象與家屬互動管理辦法",
    chapters: [
      {
        name: "第一章　總則",
        articles: [
          {
            number: "第一條",
            title: "（目的）",
            body: "為維繫服務對象與家屬之情感連結，促進家屬參與照護決策，增進彼此溝通，制定本辦法。",
          },
        ],
      },
      {
        name: "第二章　探視及聯繫",
        articles: [
          {
            number: "第二條",
            title: "（探視政策）",
            body: "機構歡迎家屬定期探視，依下列規定辦理：\n一、開放時間：_________（機構自訂，通常不限制，傳染病期間除外）\n二、每次探視請至護理站登記，以掌握服務對象訪客紀錄\n三、疫情管制期間依機構公告辦理",
          },
          {
            number: "第三條",
            title: "（定期聯繫）",
            body: "護理師或社工師應於下列時機主動聯繫家屬：\n一、服務對象健康狀況顯著改變時（立即聯繫）\n二、定期照護計畫評值後（說明計畫調整）\n三、重要節日前後（節日活動說明）\n四、每月至少一次例行聯繫（社工師負責），了解家屬意見",
          },
        ],
      },
      {
        name: "第三章　家屬參與活動",
        articles: [
          {
            number: "第四條",
            title: "（家屬日及座談會）",
            body: "機構每年至少辦理二次家屬座談會（家屬日），說明機構近況、服務改善計畫，並蒐集家屬意見。座談會後應填寫紀錄，意見提送品質改善會議。",
          },
          {
            number: "第五條",
            title: "（家屬參與照護討論）",
            body: "進行服務對象照護計畫評值時，應邀請家屬參與，讓家屬了解照護目標並表達意見。認知障礙服務對象尤應確保家屬在照護決策中的角色。",
          },
        ],
      },
      {
        name: "第四章　家屬意見處理",
        articles: [
          {
            number: "第六條",
            title: "（家屬申訴）",
            body: "家屬意見及申訴依「服務對象申訴及意見處理作業規範」辦理，社工師為家屬申訴之主要受理窗口。所有意見及回應紀錄於「家屬電訪及會談紀錄表」。",
          },
        ],
      },
      {
        name: "第五章　附則",
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

function buildFamilySatisfactionSheet(): SheetData {
  return buildTableSheet({
    sheetName: "家屬滿意度調查紀錄表",
    title: "家屬滿意度調查紀錄彙整表",
    note: "115 年度衛福部住宿型機構評鑑 B7 項目｜每年至少辦理一次家屬滿意度調查，彙整結果提送品質改善會議",
    headers: [
      "調查時間",
      "發放份數",
      "回收份數",
      "回收率（%）",
      "整體滿意度（滿分5分）",
      "護理照護滿意度",
      "生活照顧滿意度",
      "溝通與服務滿意度",
      "環境設施滿意度",
      "主要讚賞事項",
      "主要改善建議",
      "後續改善措施",
    ],
    samples: [
      [
        "115年度（115/10）",
        "45",
        "38",
        "84%",
        "4.2",
        "4.3",
        "4.1",
        "3.9",
        "4.0",
        "護理師態度親切",
        "餐食口味多樣性",
        "每季更新菜單，邀請家屬試菜",
      ],
    ],
    blankRows: 5,
    columnWidths: [100, 80, 80, 80, 130, 110, 110, 120, 110, 160, 160, 160],
  });
}

export function buildNursingHomeItem16CustomSheets(): SheetData[] {
  return [buildFamilyInteractionPolicy(), buildFamilySatisfactionSheet()];
}
