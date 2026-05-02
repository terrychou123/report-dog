/**
 * 住宿型照顧機構評鑑項目 12「新入住服務對象適應輔導」自訂補充分頁
 *
 * 新增 1 個工作分頁：
 *   1. 新住民適應輔導 SOP
 */
import type { SheetData } from "../excel-template-builder";
import { buildPolicyDocSheet } from "./nursing-home-policy-template";

function buildAdaptationSop(): SheetData {
  return buildPolicyDocSheet({
    name: "新住民適應輔導 SOP",
    instTitle: "新入住服務對象適應輔導標準作業程序（SOP）",
    chapters: [
      {
        name: "第一章　總則",
        articles: [
          {
            number: "第一條",
            title: "（目的）",
            body: "為協助新入住服務對象盡快適應機構生活環境，減少入住初期之焦慮及適應困難，確保其身心安全，制定本 SOP。",
          },
          {
            number: "第二條",
            title: "（適用範圍）",
            body: "本 SOP 適用於所有新入住之服務對象，自入住當日起持續至入住後一個月。",
          },
        ],
      },
      {
        name: "第二章　入住當日",
        articles: [
          {
            number: "第三條",
            title: "（環境介紹）",
            body: "入住當日，由社工師或護理師陪同服務對象及家屬進行環境介紹：\n一、寢室環境（床位、儲物、呼叫鈴使用）\n二、盥洗設施、公共空間（交誼廳、餐廳）位置\n三、機構生活作息（用餐時間、活動時間、探視時間）\n四、緊急呼叫程序說明\n介紹完成後請服務對象或家屬確認瞭解。",
          },
          {
            number: "第四條",
            title: "（初期評估）",
            body: "入住當日護理師應完成：\n一、生命徵象評估\n二、藥品清點核對（與家屬確認）\n三、皮膚完整性評估（壓傷初評）\n四、緊急聯絡人確認",
          },
        ],
      },
      {
        name: "第三章　入住後第一週",
        articles: [
          {
            number: "第五條",
            title: "（適應觀察）",
            body: "入住後第一週，照顧服務員應每日觀察並回報服務對象之：\n一、用餐情形（食慾、進食量）\n二、睡眠狀況（入眠困難、夜間徘徊）\n三、情緒反應（哭泣、焦慮、退縮）\n四、社交互動（與其他住民及工作人員之互動）\n異常情形立即通知護理師及社工師。",
          },
          {
            number: "第六條",
            title: "（個別輔導）",
            body: "社工師應於入住後三至七日內主動拜訪服務對象（及家屬），瞭解適應困難點，提供情感支持，並視需要安排：\n一、認識其他住民之交誼活動\n二、宗教或文化需求安排\n三、與家屬溝通探視頻率建議",
          },
        ],
      },
      {
        name: "第四章　入住後一個月評估",
        articles: [
          {
            number: "第七條",
            title: "（一個月評估）",
            body: "入住後一個月，社工師應進行正式適應狀況評估，填寫「入住適應輔導紀錄表」，評估內容包括：\n一、情緒及心理適應程度\n二、日常生活參與度\n三、與其他住民及工作人員關係\n四、適應困難問題及後續輔導計畫",
          },
          {
            number: "第八條",
            title: "（持續追蹤）",
            body: "適應困難個案（評估後仍有明顯困難）應擬定個別化輔導計畫，由社工師持續追蹤至適應良好為止，並每月記錄追蹤狀況。",
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

export function buildNursingHomeItem12CustomSheets(): SheetData[] {
  return [buildAdaptationSop()];
}
