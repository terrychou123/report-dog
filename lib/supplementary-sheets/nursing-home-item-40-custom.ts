/**
 * 住宿型照顧機構評鑑項目 40「寢室及生活空間環境管理」自訂補充分頁
 *
 * 新增 1 個工作分頁：
 *   1. 寢室空間管理辦法
 */
import type { SheetData } from "../excel-template-builder";
import { buildPolicyDocSheet } from "./nursing-home-policy-template";

function buildBedroomManagementPolicy(): SheetData {
  return buildPolicyDocSheet({
    name: "寢室空間管理辦法",
    instTitle: "寢室及生活空間環境管理辦法",
    chapters: [
      {
        name: "第一章　總則",
        articles: [
          {
            number: "第一條",
            title: "（目的）",
            body: "為確保服務對象生活空間安全、舒適且符合法定標準，保障其隱私及生活品質，制定本辦法。",
          },
        ],
      },
      {
        name: "第二章　空間標準",
        articles: [
          {
            number: "第二條",
            title: "（每人空間標準）",
            body: "寢室每位服務對象應享有法定最低床位空間（依現行規定），並確保：\n一、床位間有適當隱私設施（隱私簾或隔板）\n二、個人置物空間（床頭櫃或個人儲物箱）\n三、緊急呼叫系統（床旁可達到）",
          },
          {
            number: "第三條",
            title: "（環境舒適度）",
            body: "寢室環境應維持：\n一、溫度：夏季 25–28°C，冬季 20–24°C（視個案需求調整）\n二、濕度：40–60%\n三、通風：定期開窗通風或空調循環，保持空氣新鮮\n四、照明：日間充足自然光，夜間常夜燈不影響睡眠",
          },
        ],
      },
      {
        name: "第三章　隱私維護",
        articles: [
          {
            number: "第四條",
            title: "（個人空間尊重）",
            body: "工作人員進入服務對象寢室前應敲門告知；進行個人照護（換衣、檢查身體）時應拉起隱私簾或關閉房門，確保僅必要人員在場。",
          },
          {
            number: "第五條",
            title: "（個人物品管理）",
            body: "服務對象個人物品（衣物、照片、宗教用品）應妥善保管，工作人員不得未經同意移動或丟棄。整理服務對象物品時應徵得本人或家屬同意。",
          },
        ],
      },
      {
        name: "第四章　環境巡查",
        articles: [
          {
            number: "第六條",
            title: "（日常巡查）",
            body: "每班次照顧服務員應確認寢室：\n一、地板乾燥無積水、無障礙物\n二、床欄完好可操作\n三、呼叫鈴（繩/按鈕）於服務對象可及位置\n四、輔助設備（移動式扶手、輪椅）位置適當\n環境問題應立即回報並修繕。",
          },
        ],
      },
      {
        name: "第五章　附則",
        articles: [
          {
            number: "第七條",
            title: "（施行日期）",
            body: "本辦法自核定日起施行。",
          },
        ],
      },
    ],
  });
}

export function buildNursingHomeItem40CustomSheets(): SheetData[] {
  return [buildBedroomManagementPolicy()];
}
