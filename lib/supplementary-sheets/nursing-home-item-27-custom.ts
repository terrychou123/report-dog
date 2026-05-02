/**
 * 住宿型照顧機構評鑑項目 27「非計畫性體重變化管理」自訂補充分頁
 *
 * 新增 1 個工作分頁：
 *   1. 體重異常處置 SOP
 */
import type { SheetData } from "../excel-template-builder";
import { buildPolicyDocSheet } from "./nursing-home-policy-template";

function buildWeightChangeSop(): SheetData {
  return buildPolicyDocSheet({
    name: "體重異常處置 SOP",
    instTitle: "非計畫性體重變化管理及處置標準作業程序（SOP）",
    chapters: [
      {
        name: "第一章　總則",
        articles: [
          {
            number: "第一條",
            title: "（目的）",
            body: "為早期偵測並介入服務對象之非計畫性體重變化（尤其是體重減輕），預防營養不良及相關健康惡化，制定本 SOP。",
          },
          {
            number: "第二條",
            title: "（異常體重變化定義）",
            body: "下列情形屬需啟動本 SOP 之非計畫性體重變化：\n一、一個月內體重減輕 ≥ 5%\n二、三個月內體重減輕 ≥ 7.5%\n三、六個月內體重減輕 ≥ 10%\n四、一個月內體重增加 ≥ 5%（疑似水腫）",
          },
        ],
      },
      {
        name: "第二章　體重監測",
        articles: [
          {
            number: "第三條",
            title: "（測量頻率）",
            body: "服務對象體重應每月測量一次，於固定時間（早晨空腹、穿著輕薄衣物）以固定磅秤測量，並記錄於「體重監測追蹤紀錄表」。",
          },
          {
            number: "第四條",
            title: "（趨勢分析）",
            body: "護理師每月比較體重變化幅度，計算與前月及三個月前之百分比變化。達到異常閾值時立即通報護理長，並啟動評估程序。",
          },
        ],
      },
      {
        name: "第三章　評估與介入",
        articles: [
          {
            number: "第五條",
            title: "（原因評估）",
            body: "發現非計畫性體重減輕時，護理師應評估可能原因：\n一、食慾不振（感染、藥物副作用、憂鬱）\n二、吞嚥困難（誤嚥風險）\n三、口腔問題（義齒不合、疼痛）\n四、消化吸收問題\n五、情緒或環境因素",
          },
          {
            number: "第六條",
            title: "（通知醫師及轉介）",
            body: "確認非計畫性體重減輕後，應：\n一、通知醫師評估，排除急性疾病原因\n二、轉介營養師進行個別化飲食計畫調整\n三、視情況轉介牙科（口腔問題）或語言治療師（吞嚥問題）\n四、吞嚥困難個案調整食物質地（軟質/半流質）",
          },
          {
            number: "第七條",
            title: "（介入措施）",
            body: "營養介入應包含：\n一、增加熱量密度（添加健康油脂、蛋白質補充品）\n二、調整餐食份量及頻率（少量多餐）\n三、提供喜好食物（依文化及個人偏好）\n四、協助進食（有需要者提供餵食輔助）\n介入後每兩週追蹤體重，直到穩定為止。",
          },
        ],
      },
      {
        name: "第四章　統計與檢討",
        articles: [
          {
            number: "第八條",
            title: "（月報統計）",
            body: "每月統計非計畫性體重減輕發生率，提送品質改善會議，分析原因及介入成效。",
          },
        ],
      },
      {
        name: "第五章　附則",
        articles: [
          {
            number: "第九條",
            title: "（施行日期）",
            body: "本 SOP 自核定日起施行。",
          },
        ],
      },
    ],
  });
}

export function buildNursingHomeItem27CustomSheets(): SheetData[] {
  return [buildWeightChangeSop()];
}
