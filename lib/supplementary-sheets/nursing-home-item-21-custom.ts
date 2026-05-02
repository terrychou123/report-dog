/**
 * 住宿型照顧機構評鑑項目 21「跌倒預防及處理」自訂補充分頁
 *
 * 新增 2 個工作分頁：
 *   1. 跌倒防治計畫
 *   2. 跌倒事件分析報告表
 */
import type { SheetData } from "../excel-template-builder";
import { buildPolicyDocSheet } from "./nursing-home-policy-template";
import { buildTableSheet } from "./sheet-style-kit";

function buildFallPreventionPlan(): SheetData {
  return buildPolicyDocSheet({
    name: "跌倒防治計畫",
    instTitle: "跌倒預防及處理計畫",
    chapters: [
      {
        name: "第一章　總則",
        articles: [
          {
            number: "第一條",
            title: "（目的）",
            body: "為降低服務對象跌倒發生率及跌倒相關傷害，透過系統性評估、環境改善及個別化預防措施，制定本計畫。",
          },
        ],
      },
      {
        name: "第二章　風險評估",
        articles: [
          {
            number: "第二條",
            title: "（評估時機）",
            body: "跌倒風險評估應於下列時機進行：\n一、入住時（入住後二十四小時內完成初評）\n二、每六個月定期重新評估\n三、服務對象狀況改變時（如急性住院後、跌倒事件後）",
          },
          {
            number: "第三條",
            title: "（評估工具）",
            body: "採用「Morse 跌倒評估量表」或「Berg 平衡測試」等標準化工具，分數 ≥ 高風險閾值者列為高跌倒風險個案，實施強化預防措施。",
          },
        ],
      },
      {
        name: "第三章　預防措施",
        articles: [
          {
            number: "第四條",
            title: "（環境安全措施）",
            body: "機構應確保：\n一、走廊、浴廁、寢室地板乾燥、防滑\n二、足夠之照明（夜間廊道保持常夜燈）\n三、輔助設備（扶手、防滑墊）安裝確認及定期檢查\n四、床欄使用（依服務對象需求及意願）\n環境安全每月巡查並紀錄。",
          },
          {
            number: "第五條",
            title: "（高風險個案措施）",
            body: "高跌倒風險個案應執行：\n一、床鈴或呼叫器功能確認及教導使用\n二、如廁協助（定時如廁計畫）\n三、用藥評估（鎮靜藥、降壓藥、利尿劑等跌倒高風險藥物）\n四、適當輔具使用（助行器、輪椅）\n五、床位環境調整（降低床高、加床邊護墊）\n六、服務對象及家屬跌倒預防教育",
          },
        ],
      },
      {
        name: "第四章　跌倒事件處理",
        articles: [
          {
            number: "第六條",
            title: "（即時處置）",
            body: "發現跌倒時，護理師應：\n一、立即評估服務對象意識及受傷情形\n二、若有骨折或意識改變，立即通知醫師及家屬，視需要送醫\n三、填寫「跌倒事件監測紀錄表」（事件發生後二十四小時內）\n四、通知業務負責人",
          },
          {
            number: "第七條",
            title: "（事件分析）",
            body: "每次跌倒事件應進行分析，填寫「跌倒事件分析報告表」，內容包括：\n一、事件原因分析（環境、服務對象因素、藥物等）\n二、預防措施是否有效執行\n三、改善建議\n每季彙整跌倒發生率及事件分析結果，提送品質改善會議。",
          },
        ],
      },
      {
        name: "第五章　附則",
        articles: [
          {
            number: "第八條",
            title: "（施行日期）",
            body: "本計畫自核定日起施行。",
          },
        ],
      },
    ],
  });
}

function buildFallAnalysisSheet(): SheetData {
  return buildTableSheet({
    sheetName: "跌倒事件分析報告表",
    title: "跌倒事件分析報告表",
    note: "115 年度衛福部住宿型機構評鑑 B12 項目｜每次跌倒事件進行原因分析及改善，每季彙整送品質改善會議",
    headers: [
      "事件日期時間",
      "服務對象姓名",
      "跌倒地點",
      "有無受傷（部位）",
      "跌倒情境描述",
      "高風險評估結果（Morse 分數）",
      "跌倒前已執行預防措施",
      "原因分析（環境/個人/藥物）",
      "改善措施",
      "改善完成日期",
      "分析人員",
    ],
    samples: [
      [
        "115/02/10 02:30",
        "○○○",
        "寢室（床邊）",
        "有（右手腕挫傷）",
        "夜間下床如廁，未呼叫工作人員",
        "高風險（58分）",
        "床欄已放低、呼叫鈴已說明",
        "服務對象習慣自行如廁、夜間光線不足",
        "加強夜間如廁陪伴計畫、安裝床邊感應燈",
        "115/02/17",
        "護理師○○○",
      ],
    ],
    blankRows: 10,
    columnWidths: [110, 90, 90, 110, 160, 130, 150, 160, 160, 110, 100],
  });
}

export function buildNursingHomeItem21CustomSheets(): SheetData[] {
  return [buildFallPreventionPlan(), buildFallAnalysisSheet()];
}
