/**
 * 住宿型照顧機構評鑑項目 65「加分②：機構內空氣品質管理」自訂補充分頁
 *
 * 新增 2 個工作分頁：
 *   1. 空氣品質管理辦法
 *   2. 空氣品質監測紀錄表
 *
 * 115 年度新增加分項目（+1 分）：室內 CO₂ < 1000 ppm
 * 注意：此項目在 nursingHomeDefs 無 key，所有內容來自本 custom builder。
 */
import type { SheetData } from "../excel-template-builder";
import { buildPolicyDocSheet } from "./nursing-home-policy-template";
import { buildTableSheet } from "./sheet-style-kit";

function buildAirQualityPolicy(): SheetData {
  return buildPolicyDocSheet({
    name: "空氣品質管理辦法",
    instTitle: "機構內室內空氣品質管理辦法",
    chapters: [
      {
        name: "第一章　總則",
        articles: [
          {
            number: "第一條",
            title: "（目的）",
            body: "為維護機構室內空氣品質，確保服務對象及工作人員吸入健康的空氣，依 115 年度評鑑加分基準（室內 CO₂ < 1000 ppm）制定本辦法，並對外展現機構對環境健康之重視。",
          },
          {
            number: "第二條",
            title: "（標準值）",
            body: "機構室內空氣品質目標：\n一、CO₂（二氧化碳）：< 1000 ppm（通風良好之評鑑標準）\n二、PM2.5（細懸浮微粒）：< 15 μg/m³（室內）\n三、相對濕度：40–60%\n四、溫度：依季節適當範圍（夏 24–28°C，冬 20–24°C）",
          },
        ],
      },
      {
        name: "第二章　監測規定",
        articles: [
          {
            number: "第三條",
            title: "（監測設備）",
            body: "機構應配備 CO₂ 濃度監測儀（可即時顯示），設置於：\n一、各樓層護理站\n二、主要公共空間（交誼廳、餐廳）\n三、人員密集之寢室（可移動式監測）\n監測儀應定期校正（至少每年一次）。",
          },
          {
            number: "第四條",
            title: "（監測頻率）",
            body: "空氣品質監測：\n一、定時監測：每日上午（人員活動高峰）及下午各量測一次，填入「空氣品質監測紀錄表」\n二、異常警示：CO₂ ≥ 1000 ppm 時立即採取通風措施\n三、月報：每月統計超標次數及原因，提送品質改善會議",
          },
        ],
      },
      {
        name: "第三章　改善措施",
        articles: [
          {
            number: "第五條",
            title: "（常態通風管理）",
            body: "維持室內空氣品質之日常措施：\n一、每日定時開窗通風（至少兩次，每次十五分鐘）\n二、確認空調系統外氣引入量符合設計（定期清洗濾網）\n三、活動人員密集場所（餐廳、交誼廳）活動期間加強通風",
          },
          {
            number: "第六條",
            title: "（超標改善）",
            body: "CO₂ 超過 1000 ppm 時應：\n一、立即開窗或開啟新鮮空氣引入設備\n二、移動部分人員至通風較好空間\n三、分析原因（通風設備故障、人員過密等）\n四、若持續超標，評估安裝全熱交換器或加強機械通風",
          },
        ],
      },
      {
        name: "第四章　附則",
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

function buildAirQualityMonitoringSheet(): SheetData {
  return buildTableSheet({
    sheetName: "空氣品質監測紀錄表",
    title: "室內空氣品質（CO₂）每日監測紀錄表",
    note: "115 年度衛福部住宿型機構評鑑加分項目②（+1 分）｜CO₂ 目標值 < 1000 ppm，每日量測並記錄",
    headers: [
      "日期",
      "量測時段",
      "量測地點",
      "CO₂（ppm）",
      "相對濕度（%）",
      "溫度（°C）",
      "是否超標（Y/N）",
      "已採通風措施",
      "量測人員",
    ],
    samples: [
      ["115/01/15", "上午 10:00", "三樓交誼廳", "820", "55%", "22°C", "N", "——", "護理師○○○"],
      ["115/01/15", "下午 14:00", "三樓交誼廳", "980", "57%", "23°C", "N（接近上限）", "開窗通風 15 分鐘", "護理師○○○"],
      ["115/01/20", "上午 10:00", "二樓餐廳", "1050", "58%", "22°C", "Y（超標）", "立即開窗及開空調新鮮空氣", "護理長○○○"],
    ],
    blankRows: 20,
    columnWidths: [80, 90, 110, 90, 100, 90, 100, 160, 100],
  });
}

export function buildNursingHomeItem65CustomSheets(): SheetData[] {
  return [buildAirQualityPolicy(), buildAirQualityMonitoringSheet()];
}
