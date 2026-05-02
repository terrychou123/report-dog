/**
 * 住宿型照顧機構評鑑項目 13「跨專業整合照護服務」自訂補充分頁
 *
 * 新增 1 個工作分頁：
 *   1. 跨專業團隊運作規範
 */
import type { SheetData } from "../excel-template-builder";
import { buildPolicyDocSheet } from "./nursing-home-policy-template";

function buildInterdisciplinaryPolicy(): SheetData {
  return buildPolicyDocSheet({
    name: "跨專業團隊運作規範",
    instTitle: "跨專業整合照護團隊運作規範",
    chapters: [
      {
        name: "第一章　總則",
        articles: [
          {
            number: "第一條",
            title: "（目的）",
            body: "為整合護理、社工、復健、營養、醫療等各專業人員之評估與照護計畫，提供服務對象全人、連續性之照護，制定本規範。",
          },
          {
            number: "第二條",
            title: "（團隊成員）",
            body: "跨專業照護團隊成員包含：\n一、護理師（主責協調者）\n二、社工師\n三、物理治療師、職能治療師（視服務對象需求）\n四、營養師\n五、兼任醫師（定期到診）\n六、照顧服務員（日常照護資訊提供者）",
          },
        ],
      },
      {
        name: "第二章　定期討論機制",
        articles: [
          {
            number: "第三條",
            title: "（照護計畫討論頻率）",
            body: "跨專業照護計畫討論依下列頻率辦理：\n一、新入住個案：入住後二十一日內舉行第一次跨專業討論\n二、定期評值：每六個月至少一次\n三、即時討論：服務對象狀況顯著改變時（如急性住院後返院）",
          },
          {
            number: "第四條",
            title: "（討論內容）",
            body: "每次討論應包含：\n一、各專業評估摘要（身體、心理、社會、靈性、功能）\n二、照護問題及優先順序\n三、個別化照護目標（短期 / 長期）\n四、各職類負責之照護措施\n五、服務對象及家屬意見（建議邀請出席或事先蒐集）\n討論結果記錄於「跨專業照護計畫討論紀錄表」。",
          },
        ],
      },
      {
        name: "第三章　轉介與照會",
        articles: [
          {
            number: "第五條",
            title: "（內部轉介）",
            body: "護理師發現服務對象有其他專業照護需求時（如復健訓練、社工輔導、營養評估），應填寫「轉介照會紀錄表」，轉介至相關專業人員，並於七個工作日內回報評估結果。",
          },
          {
            number: "第六條",
            title: "（外部轉介）",
            body: "需外部資源（如法律扶助、心理諮商、社福補助）時，社工師負責聯繫及轉介，並追蹤結果記錄於轉介紀錄表。",
          },
        ],
      },
      {
        name: "第四章　附則",
        articles: [
          {
            number: "第七條",
            title: "（施行日期）",
            body: "本規範自核定日起施行。",
          },
        ],
      },
    ],
  });
}

export function buildNursingHomeItem13CustomSheets(): SheetData[] {
  return [buildInterdisciplinaryPolicy()];
}
