/**
 * 住宿型照顧機構評鑑項目 15「結合社區資源提供服務」自訂補充分頁
 *
 * 新增 1 個工作分頁：
 *   1. 社區資源連結辦法
 */
import type { SheetData } from "../excel-template-builder";
import { buildPolicyDocSheet } from "./nursing-home-policy-template";

function buildCommunityResourcePolicy(): SheetData {
  return buildPolicyDocSheet({
    name: "社區資源連結辦法",
    instTitle: "社區資源連結及轉介管理辦法",
    chapters: [
      {
        name: "第一章　總則",
        articles: [
          {
            number: "第一條",
            title: "（目的）",
            body: "為提供服務對象完整之社會支持，善用社區既有資源，補充機構服務之不足，制定本辦法。",
          },
        ],
      },
      {
        name: "第二章　資源清單管理",
        articles: [
          {
            number: "第二條",
            title: "（資源清單建立）",
            body: "社工師應建立「社區資源名冊」，涵蓋：\n一、醫療資源（合作醫院、診所、牙科、眼科）\n二、法律資源（法律扶助基金會、公益律師）\n三、心理輔導（縣市心理衛生中心）\n四、宗教及靈性資源（各宗教機構、靈性關懷志工）\n五、社福資源（社會局、老人保護熱線）\n六、志工及學校（社區志工隊、大專院校服務學習）",
          },
          {
            number: "第三條",
            title: "（資源更新）",
            body: "社區資源名冊應每半年更新一次，確認聯絡資訊正確及資源仍可使用，並記錄更新日期。",
          },
        ],
      },
      {
        name: "第三章　資源轉介",
        articles: [
          {
            number: "第四條",
            title: "（轉介程序）",
            body: "社工師依服務對象需求評估，連結適當社區資源：\n一、與服務對象及家屬說明資源內容及使用方式\n二、取得服務對象同意後進行轉介\n三、填寫「社區資源轉介紀錄表」，記錄轉介原因、轉介對象及後續追蹤\n四、轉介後三十日內追蹤使用情形及滿意度",
          },
        ],
      },
      {
        name: "第四章　合作關係維護",
        articles: [
          {
            number: "第五條",
            title: "（合作機構聯繫）",
            body: "與重要社區資源（志工團體、宗教機構）應維持定期聯繫（至少每半年一次），確認合作關係及活動安排。合作協議以書面確認。",
          },
        ],
      },
      {
        name: "第五章　附則",
        articles: [
          {
            number: "第六條",
            title: "（施行日期）",
            body: "本辦法自核定日起施行。",
          },
        ],
      },
    ],
  });
}

export function buildNursingHomeItem15CustomSheets(): SheetData[] {
  return [buildCommunityResourcePolicy()];
}
