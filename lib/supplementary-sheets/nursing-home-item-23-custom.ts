/**
 * 住宿型照顧機構評鑑項目 23「疼痛評估及處理」自訂補充分頁
 *
 * 新增 1 個工作分頁：
 *   1. 疼痛評估與管理規範
 */
import type { SheetData } from "../excel-template-builder";
import { buildPolicyDocSheet } from "./nursing-home-policy-template";

function buildPainManagementPolicy(): SheetData {
  return buildPolicyDocSheet({
    name: "疼痛評估與管理規範",
    instTitle: "疼痛評估及處理管理規範",
    chapters: [
      {
        name: "第一章　總則",
        articles: [
          {
            number: "第一條",
            title: "（目的）",
            body: "為確保服務對象之疼痛獲得及時、有效之評估與介入，提升生活品質，制定本規範。",
          },
          {
            number: "第二條",
            title: "（疼痛為第五生命徵象）",
            body: "本機構將疼痛視為「第五生命徵象」，工作人員應主動評估，不可忽視服務對象之疼痛訴求。",
          },
        ],
      },
      {
        name: "第二章　疼痛評估",
        articles: [
          {
            number: "第三條",
            title: "（評估工具）",
            body: "依服務對象認知狀態選用適當評估工具：\n一、可言語表達者：視覺類比量表（VAS，0–10 分）或數字評分量表（NRS）\n二、輕度認知障礙者：臉譜疼痛量表（FPS）\n三、無法自我表達者（中重度認知障礙、昏迷）：行為疼痛觀察量表（如 CPOT、DOLOPLUS）",
          },
          {
            number: "第四條",
            title: "（評估頻率）",
            body: "疼痛評估頻率：\n一、入住初評：入住後四十八小時內\n二、定期評估：每月一次（一般個案）\n三、有疼痛主訴者：每日評估至疼痛控制達標（VAS ≤ 3 分）\n四、疼痛介入後：三十至六十分鐘後追蹤評估",
          },
        ],
      },
      {
        name: "第三章　疼痛處置",
        articles: [
          {
            number: "第五條",
            title: "（介入措施）",
            body: "依疼痛評估結果採取：\n一、輕度疼痛（NRS 1–3）：非藥物措施（姿勢調整、熱敷、按摩、放鬆技巧）\n二、中度疼痛（NRS 4–6）：通知醫師，依醫囑給予止痛藥；同時輔以非藥物措施\n三、重度疼痛（NRS 7–10）：立即通知醫師，評估是否需緊急處置\n四、難以控制之慢性疼痛：轉介疼痛專科或安寧緩和醫療諮詢",
          },
          {
            number: "第六條",
            title: "（非藥物措施）",
            body: "護理師及照顧服務員應學習並靈活運用下列非藥物疼痛管理技術：\n一、姿勢調整及體位擺放\n二、冷熱敷（依適應症）\n三、音樂療法及放鬆訓練\n四、轉移注意力技術（懷舊、互動）\n五、物理治療師協助之徒手治療（依個案需求）",
          },
          {
            number: "第七條",
            title: "（疼痛控制目標）",
            body: "目標：服務對象疼痛評分維持在 NRS ≤ 3 分（或依個案可接受程度），並以不影響日常活動為準。每季彙整疼痛管理成效，提送品質改善會議。",
          },
        ],
      },
      {
        name: "第四章　附則",
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

export function buildNursingHomeItem23CustomSheets(): SheetData[] {
  return [buildPainManagementPolicy()];
}
