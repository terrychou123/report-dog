/**
 * 住宿型照顧機構評鑑項目 29「服務對象健康檢查」自訂補充分頁
 *
 * 新增 1 個工作分頁：
 *   1. 年度健康檢查實施計畫
 */
import type { SheetData } from "../excel-template-builder";
import { buildPolicyDocSheet } from "./nursing-home-policy-template";

function buildHealthCheckPlan(): SheetData {
  return buildPolicyDocSheet({
    name: "年度健康檢查實施計畫",
    instTitle: "服務對象年度健康檢查實施計畫",
    chapters: [
      {
        name: "第一章　總則",
        articles: [
          {
            number: "第一條",
            title: "（目的）",
            body: "為早期偵測服務對象之健康問題，透過定期健康檢查提供預防性及早期介入，制定本計畫。",
          },
        ],
      },
      {
        name: "第二章　健康檢查內容",
        articles: [
          {
            number: "第二條",
            title: "（基本健康評估）",
            body: "所有服務對象每年應完成下列健康評估：\n一、生命徵象量測（血壓、脈搏、呼吸、體溫）\n二、身高體重及 BMI 計算\n三、視力及聽力初步評估\n四、牙齒口腔健康評估\n五、認知功能篩檢（如 MMSE 或 SPMSQ）",
          },
          {
            number: "第三條",
            title: "（實驗室檢查）",
            body: "依醫師評估需求及保險給付規定，每年至少安排下列檢查（依個案情況調整）：\n一、血液常規（CBC、生化、肝腎功能）\n二、血脂及血糖（糖尿病個案每三個月一次）\n三、甲狀腺功能（老年婦女）\n四、胸部 X 光\n五、尿液常規",
          },
          {
            number: "第四條",
            title: "（新入住健康評估）",
            body: "新入住服務對象應於入住後三十日內完成更完整之基礎健康評估，包含現況疾病清單、用藥史、過敏史、家族病史及功能評估（ADL、IADL），作為後續照護之基準值。",
          },
        ],
      },
      {
        name: "第三章　計畫執行",
        articles: [
          {
            number: "第五條",
            title: "（辦理時程）",
            body: "年度健康檢查應於每年四月至六月間集中辦理，或依服務對象入住週年日分散安排，確保全體服務對象每年至少完成一次。護理師負責彙整檢查排程及追蹤完成情形。",
          },
          {
            number: "第六條",
            title: "（結果追蹤）",
            body: "健康檢查結果應由醫師閱讀並提出處置建議：\n一、異常值：通知服務對象及家屬，擬定後續追蹤及治療計畫\n二、更新個別化服務計畫（如發現新問題）\n三、轉介專科門診（視異常項目）\n所有追蹤處置紀錄於「健康檢查紀錄管理表」。",
          },
        ],
      },
      {
        name: "第四章　附則",
        articles: [
          {
            number: "第七條",
            title: "（施行日期）",
            body: "本計畫自核定日起施行。",
          },
        ],
      },
    ],
  });
}

export function buildNursingHomeItem29CustomSheets(): SheetData[] {
  return [buildHealthCheckPlan()];
}
