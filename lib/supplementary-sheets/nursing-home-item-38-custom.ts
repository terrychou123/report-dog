/**
 * 住宿型照顧機構評鑑項目 38「管灌飲食照護」自訂補充分頁
 *
 * 新增 1 個工作分頁：
 *   1. 管灌飲食作業規範
 */
import type { SheetData } from "../excel-template-builder";
import { buildPolicyDocSheet } from "./nursing-home-policy-template";

function buildTubeFeedingPolicy(): SheetData {
  return buildPolicyDocSheet({
    name: "管灌飲食作業規範",
    instTitle: "管灌飲食照護作業規範",
    chapters: [
      {
        name: "第一章　總則",
        articles: [
          {
            number: "第一條",
            title: "（目的）",
            body: "為確保接受鼻胃管灌食之服務對象獲得安全、適量之營養供應，預防管灌相關併發症，制定本規範。",
          },
        ],
      },
      {
        name: "第二章　灌食前準備",
        articles: [
          {
            number: "第二條",
            title: "（管路位置確認）",
            body: "每次灌食前護理師應確認鼻胃管位置正確（三種方式擇一：抽取胃液確認 pH ≤ 4、聽氣過水聲、觀察管路刻度未移位），確認後方可灌食，並記錄確認方式及結果。",
          },
          {
            number: "第三條",
            title: "（灌食前評估）",
            body: "灌食前評估服務對象：\n一、胃殘餘量（管灌配方，抽回量 ≥ 200 ml 時暫停灌食通知醫師）\n二、腹脹及腸蠕動音\n三、意識及呼吸狀況",
          },
        ],
      },
      {
        name: "第三章　灌食執行",
        articles: [
          {
            number: "第四條",
            title: "（灌食姿勢）",
            body: "灌食時及灌食後三十分鐘，服務對象應保持床頭抬高 30–45 度，預防逆流及吸入性肺炎。完全臥床無法配合者應以最大可能角度抬高。",
          },
          {
            number: "第五條",
            title: "（灌食速度及量）",
            body: "依醫師及營養師處方執行灌食：\n一、單次灌食量（Bolus）：依處方量，通常不超過 400 ml，給予時間不少於十五至二十分鐘\n二、連續輸注（Drip）：使用管灌泵浦依設定速度輸注\n三、灌食前後以 30 ml 溫開水沖管，防止管路堵塞",
          },
          {
            number: "第六條",
            title: "（管灌配方管理）",
            body: "管灌配方應：\n一、開封後四十八小時內使用，超時廢棄\n二、儲存於陰涼處，已開封者冷藏\n三、每次灌食記錄配方種類、量及灌食時間於「管灌飲食計畫及執行紀錄表」",
          },
        ],
      },
      {
        name: "第四章　異常處理",
        articles: [
          {
            number: "第七條",
            title: "（常見併發症處理）",
            body: "出現下列情形應立即處置：\n一、嘔吐或反流：暫停灌食，放低頭部，清除口腔分泌物\n二、腹瀉（每日 ≥ 3 次稀水便）：通知醫師，考慮更換配方或減慢速度\n三、管路堵塞：以溫水沖管，無法疏通時通知護理師更換\n四、鼻胃管意外脫出：立即通知護理師，不得自行重新插管",
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

export function buildNursingHomeItem38CustomSheets(): SheetData[] {
  return [buildTubeFeedingPolicy()];
}
