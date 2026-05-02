/**
 * 住宿型照顧機構評鑑項目 14「辦理團體活動及社區參與」自訂補充分頁
 *
 * 新增 1 個工作分頁：
 *   1. 活動計畫管理辦法
 */
import type { SheetData } from "../excel-template-builder";
import { buildPolicyDocSheet } from "./nursing-home-policy-template";

function buildActivityPlanPolicy(): SheetData {
  return buildPolicyDocSheet({
    name: "活動計畫管理辦法",
    instTitle: "團體活動及社區參與計畫管理辦法",
    chapters: [
      {
        name: "第一章　總則",
        articles: [
          {
            number: "第一條",
            title: "（目的）",
            body: "為豐富服務對象日常生活，促進身心靈健康，維持社會參與及生活品質，制定本辦法。",
          },
        ],
      },
      {
        name: "第二章　活動規劃",
        articles: [
          {
            number: "第二條",
            title: "（月度活動計畫）",
            body: "社工師應於每月底前制定次月活動計畫，張貼於交誼廳公告欄，並納入服務對象每日作息表。活動應多元，涵蓋：\n一、認知促進（懷舊療法、拼圖、閱讀）\n二、身體活動（伸展操、音樂律動）\n三、社交互動（慶生會、節慶活動）\n四、創意藝術（繪畫、手工藝）\n五、靈性與文化活動（宗教節日、多元文化體驗）",
          },
          {
            number: "第三條",
            title: "（個別化參與）",
            body: "活動設計應考量服務對象個別能力（認知、肢體功能），提供適當難度與支援。失能程度較高者（臥床、重度認知障礙），應有個別化床旁活動或一對一互動。",
          },
          {
            number: "第四條",
            title: "（社區參與）",
            body: "機構應定期安排社區外出活動（視能力及安全評估），或邀請社區志工、學生、藝術家入機構，豐富服務對象社會接觸。每年至少辦理二次社區參與活動。",
          },
        ],
      },
      {
        name: "第三章　紀錄與評估",
        articles: [
          {
            number: "第五條",
            title: "（活動紀錄）",
            body: "每次活動填寫「團體社區活動辦理紀錄表」，記載：活動日期、類型、參與人數、活動概況及服務對象反應。每季彙整活動參與率，作為服務品質指標之一。",
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

export function buildNursingHomeItem14CustomSheets(): SheetData[] {
  return [buildActivityPlanPolicy()];
}
