/**
 * 住宿型照顧機構評鑑項目 20「藥事照護服務」自訂補充分頁
 *
 * 新增 1 個工作分頁：
 *   1. 藥事照護服務規範
 *
 * 法源依據：
 *   - 藥師法（藥師執業範疇）
 *   - 長照服務機構設立許可及管理辦法（藥師訪視規定）
 */
import type { SheetData } from "../excel-template-builder";
import { buildPolicyDocSheet } from "./nursing-home-policy-template";

function buildPharmaceuticalCarePolicy(): SheetData {
  return buildPolicyDocSheet({
    name: "藥事照護服務規範",
    instTitle: "藥事照護服務規範（藥師訪視及遠距服務）",
    chapters: [
      {
        name: "第一章　總則",
        articles: [
          {
            number: "第一條",
            title: "（目的）",
            body: "為提升服務對象用藥安全，透過藥師定期藥事照護評估，降低多重用藥風險及潛在不適當用藥，依《藥師法》及相關規定制定本規範。",
          },
        ],
      },
      {
        name: "第二章　服務內容",
        articles: [
          {
            number: "第二條",
            title: "（藥師訪視頻率）",
            body: "機構應聘請或委託藥師定期提供藥事照護服務（到院訪視或遠距視訊），頻率：每月至少一次，多重用藥個案（≥ 5 種藥品）至少每月評估。",
          },
          {
            number: "第三條",
            title: "（藥事照護項目）",
            body: "藥師執行藥事照護應包含：\n一、用藥清單審查（確認藥品適應症、劑量、交互作用）\n二、多重用藥評估（潛在不適當用藥篩查，如 Beers criteria）\n三、藥品儲存環境查核\n四、工作人員用藥疑問解答\n五、服務對象用藥教育（依認知能力調整說明方式）",
          },
          {
            number: "第四條",
            title: "（建議與追蹤）",
            body: "藥師評估後提出書面建議，護理師轉達給主治醫師，並追蹤醫師回應及用藥調整情形，紀錄於「藥師藥事照護服務紀錄表」。",
          },
        ],
      },
      {
        name: "第三章　藥物不良反應管理",
        articles: [
          {
            number: "第五條",
            title: "（ADR 通報）",
            body: "發現疑似藥物不良反應（ADR）時，護理師應：\n一、立即通知醫師評估\n二、在藥師協助下，評估是否通報衛福部藥物安全監測系統（AERS）\n三、ADR 紀錄保存於個案藥歷，作為日後用藥禁忌依據",
          },
        ],
      },
      {
        name: "第四章　附則",
        articles: [
          {
            number: "第六條",
            title: "（施行日期）",
            body: "本規範自核定日起施行。",
          },
        ],
      },
    ],
  });
}

export function buildNursingHomeItem20CustomSheets(): SheetData[] {
  return [buildPharmaceuticalCarePolicy()];
}
