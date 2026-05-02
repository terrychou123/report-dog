/**
 * 住宿型照顧機構評鑑項目 37「膳食及個別化飲食照護」自訂補充分頁
 *
 * 新增 2 個工作分頁：
 *   1. 膳食營養管理辦法
 *   2. 特殊飲食調整 SOP
 *
 * 115 年度 B28：合併膳食菜單 + 個別化飲食 + 適宜餐具
 */
import type { SheetData } from "../excel-template-builder";
import { buildPolicyDocSheet } from "./nursing-home-policy-template";

function buildNutritionPolicy(): SheetData {
  return buildPolicyDocSheet({
    name: "膳食營養管理辦法",
    instTitle: "膳食及個別化飲食照護管理辦法",
    chapters: [
      {
        name: "第一章　總則",
        articles: [
          {
            number: "第一條",
            title: "（目的）",
            body: "為確保服務對象獲得均衡、適口且符合個別需求之飲食，維持良好營養狀態及生活品質，依《食品安全衛生管理法》及相關規定制定本辦法。",
          },
        ],
      },
      {
        name: "第二章　菜單管理",
        articles: [
          {
            number: "第二條",
            title: "（循環菜單）",
            body: "機構應建立每季循環菜單，由營養師審核確認熱量及營養素達成（一般成人每日約 1600–2000 kcal，蛋白質 ≥ 1.0 g/kg/day）。菜單公告於餐廳，並讓服務對象可預知餐食內容。",
          },
          {
            number: "第三條",
            title: "（菜單多樣性）",
            body: "菜單設計應：\n一、涵蓋六大類食物（全榖雜糧、豆魚蛋肉、乳品、蔬菜、水果、油脂）\n二、每週至少提供一次喜慶節日或主題餐食\n三、考量服務對象文化及宗教飲食需求（素食、無豬肉等）",
          },
        ],
      },
      {
        name: "第三章　個別化飲食",
        articles: [
          {
            number: "第四條",
            title: "（飲食質地分類）",
            body: "依服務對象吞嚥能力提供適當飲食質地：\n一、一般飲食：無吞嚥困難\n二、剪碎/切小塊飲食：輕度咀嚼困難\n三、軟質飲食：中度咀嚼或吞嚥困難\n四、半流質飲食：嚴重咀嚼困難\n五、流質/管灌飲食：無法經口進食",
          },
          {
            number: "第五條",
            title: "（特殊疾病飲食）",
            body: "依醫師及營養師指示提供特殊治療飲食：\n一、糖尿病飲食（低糖、低精緻糖）\n二、腎臟病飲食（限鉀、限磷、限蛋白質）\n三、低鈉飲食（高血壓、心臟病）\n四、高纖維飲食（便秘）",
          },
          {
            number: "第六條",
            title: "（適宜餐具）",
            body: "依服務對象手部功能提供適宜輔助餐具：\n一、加厚握柄餐具（手部精細動作困難）\n二、防滑碗盤（防止滑動）\n三、附吸管或杯蓋水杯（液體控制困難）\n餐具需求由職能治療師評估建議。",
          },
        ],
      },
      {
        name: "第四章　飲食照護記錄",
        articles: [
          {
            number: "第七條",
            title: "（進食觀察）",
            body: "照顧服務員應觀察服務對象每餐進食狀況（進食比例），進食量不足六成時通報護理師及營養師，分析原因並調整飲食計畫。",
          },
        ],
      },
      {
        name: "第五章　附則",
        articles: [
          {
            number: "第八條",
            title: "（施行日期）",
            body: "本辦法自核定日起施行。",
          },
        ],
      },
    ],
  });
}

function buildSpecialDietSop(): SheetData {
  return buildPolicyDocSheet({
    name: "特殊飲食調整 SOP",
    instTitle: "特殊飲食調整及吞嚥困難照護標準作業程序（SOP）",
    chapters: [
      {
        name: "第一章　吞嚥困難評估",
        articles: [
          {
            number: "第一條",
            title: "（評估時機）",
            body: "下列情形應立即進行吞嚥篩檢（護理師執行）：\n一、新入住（有吸入性肺炎病史或腦血管疾病者）\n二、出現嗆咳、咳嗽增加、用餐時間延長\n三、急性中風後返院\n四、發燒原因不明（懷疑吸入性肺炎）",
          },
          {
            number: "第二條",
            title: "（進階評估）",
            body: "篩檢陽性者轉介語言治療師進行正式吞嚥評估，必要時安排吞嚥攝影（VFSS）確認安全進食方式。",
          },
        ],
      },
      {
        name: "第二章　飲食質地調整程序",
        articles: [
          {
            number: "第三條",
            title: "（調整流程）",
            body: "飲食質地調整流程：\n一、護理師或語言治療師評估並決定合適飲食質地（參考 IDDSI 標準）\n二、填寫「個別化飲食照護計畫書」，更新個案飲食卡\n三、通知廚房依調整後質地準備餐食\n四、確認服務對象及家屬了解飲食調整原因",
          },
          {
            number: "第四條",
            title: "（液體稠化）",
            body: "吞嚥困難個案飲用液體應依建議稠度加入食品級稠化粉，稠化後確認濃稠度符合要求（蜂蜜狀/布丁狀）。記錄稠化粉使用量及液體稠度等級。",
          },
        ],
      },
      {
        name: "第三章　進食協助",
        articles: [
          {
            number: "第五條",
            title: "（安全進食姿勢）",
            body: "吞嚥困難個案進食時應：\n一、坐姿（頭部微向前傾）或半坐臥位（床頭抬高 60–90 度）\n二、每口食物量小（約一湯匙）\n三、確認口腔清空再進食下一口\n四、進食後保持直立坐姿至少三十分鐘防止逆流",
          },
        ],
      },
      {
        name: "第四章　附則",
        articles: [
          {
            number: "第六條",
            title: "（施行日期）",
            body: "本 SOP 自核定日起施行。",
          },
        ],
      },
    ],
  });
}

export function buildNursingHomeItem37CustomSheets(): SheetData[] {
  return [buildNutritionPolicy(), buildSpecialDietSop()];
}
