/**
 * 住宿型照顧機構評鑑項目 11「個案服務計畫評值」自訂補充分頁
 *
 * 新增 1 個工作分頁：
 *   1. 個案服務計畫作業規範
 */
import type { SheetData } from "../excel-template-builder";
import { buildPolicyDocSheet } from "./nursing-home-policy-template";

function buildCarePlanPolicy(): SheetData {
  return buildPolicyDocSheet({
    name: "個案服務計畫作業規範",
    instTitle: "個別化服務計畫（ICP）訂定、評值及修訂作業規範",
    chapters: [
      {
        name: "第一章　總則",
        articles: [
          {
            number: "第一條",
            title: "（目的）",
            body: "為確保每位服務對象均能獲得個別化、以人為本之照護計畫，依服務對象需求及意願訂定、定期評值，制定本規範。",
          },
        ],
      },
      {
        name: "第二章　計畫訂定",
        articles: [
          {
            number: "第二條",
            title: "（訂定時限）",
            body: "服務對象入住後十四個工作日內，應完成「個別化服務計畫（ICP）」初版，由護理師、社工師、復健治療師（如有）共同參與評估。",
          },
          {
            number: "第三條",
            title: "（評估內容）",
            body: "初版計畫應涵蓋全人評估：\n一、身體功能（ADL、IADL、跌倒風險、壓傷風險）\n二、認知心理（認知評估、情緒狀態）\n三、社會支持（家庭狀況、資源需求）\n四、靈性與文化需求\n五、服務對象本人意願及目標（如可表達）",
          },
          {
            number: "第四條",
            title: "（服務對象參與）",
            body: "計畫訂定應盡可能納入服務對象本人及家屬之意見，並取得知情同意簽名。認知障礙服務對象應由法定代理人參與並簽名。",
          },
        ],
      },
      {
        name: "第三章　計畫評值",
        articles: [
          {
            number: "第五條",
            title: "（定期評值）",
            body: "個別化服務計畫應至少每六個月重新評值一次，評值內容包括：\n一、原定目標達成情形\n二、功能狀態變化（與前次比較）\n三、照護問題是否解決或新增\n四、計畫目標及措施是否需調整",
          },
          {
            number: "第六條",
            title: "（即時修訂）",
            body: "下列情形應即時修訂服務計畫（不等待定期評值）：\n一、服務對象功能狀態顯著變化（如跌倒後、中風後）\n二、醫療診斷或用藥重大改變\n三、服務對象或家屬要求調整照護目標",
          },
        ],
      },
      {
        name: "第四章　計畫執行與查核",
        articles: [
          {
            number: "第七條",
            title: "（一致性查核）",
            body: "護理長每季應抽查至少三份個案服務計畫，確認實際照護內容（護理紀錄）與計畫描述一致，不一致者應追蹤修正。",
          },
        ],
      },
      {
        name: "第五章　附則",
        articles: [
          {
            number: "第八條",
            title: "（施行日期）",
            body: "本規範自核定日起施行。",
          },
        ],
      },
    ],
  });
}

export function buildNursingHomeItem11CustomSheets(): SheetData[] {
  return [buildCarePlanPolicy()];
}
