/**
 * 住宿型照顧機構評鑑項目 36「自我照顧能力維持及輔具使用」自訂補充分頁
 *
 * 新增 1 個工作分頁：
 *   1. 自我照顧能力促進辦法
 */
import type { SheetData } from "../excel-template-builder";
import { buildPolicyDocSheet } from "./nursing-home-policy-template";

function buildSelfCarePolicy(): SheetData {
  return buildPolicyDocSheet({
    name: "自我照顧能力促進辦法",
    instTitle: "自我照顧能力維持及輔具使用管理辦法",
    chapters: [
      {
        name: "第一章　總則",
        articles: [
          {
            number: "第一條",
            title: "（目的）",
            body: "以「維持服務對象最大獨立功能」為目標，避免過度照護造成依賴，透過輔具使用及能力訓練維持自我照顧能力，制定本辦法。",
          },
        ],
      },
      {
        name: "第二章　功能評估",
        articles: [
          {
            number: "第二條",
            title: "（ADL 評估）",
            body: "使用「Barthel Index 日常生活功能量表」評估服務對象自我照顧能力（進食、如廁、沐浴、行走、穿脫衣物等），每半年評估一次，功能變化時即時重評。",
          },
          {
            number: "第三條",
            title: "（輔具評估）",
            body: "物理治療師或職能治療師應評估服務對象輔具需求，建議適當輔具種類（助行器、四腳拐、輪椅、防滑餐具、穿衣輔具等），紀錄於個別化服務計畫。",
          },
        ],
      },
      {
        name: "第三章　促進措施",
        articles: [
          {
            number: "第四條",
            title: "（能力維持原則）",
            body: "工作人員應遵循「最少必要協助」原則：\n一、服務對象能自行完成的動作，工作人員僅從旁監督或指導，不代勞\n二、提供適當輔具取代人力協助\n三、訓練及鼓勵服務對象嘗試自我照顧，給予時間及正向回饋",
          },
          {
            number: "第五條",
            title: "（輔具管理）",
            body: "機構應建立「輔具清單」，記載各輔具之種類、規格、借用人及維護狀態。輔具應定期（至少每季）檢查功能，損壞或不合適者立即更換。服務對象自備輔具亦納入管理範疇。",
          },
        ],
      },
      {
        name: "第四章　附則",
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

export function buildNursingHomeItem36CustomSheets(): SheetData[] {
  return [buildSelfCarePolicy()];
}
