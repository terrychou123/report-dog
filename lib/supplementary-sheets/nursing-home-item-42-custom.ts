/**
 * 住宿型照顧機構評鑑項目 42「餐廳及廚房衛生管理」自訂補充分頁
 *
 * 新增 2 個工作分頁：
 *   1. 廚房食品衛生作業規範
 *   2. HACCP 自主管理查核表
 */
import type { SheetData } from "../excel-template-builder";
import { buildPolicyDocSheet } from "./nursing-home-policy-template";
import { buildTableSheet } from "./sheet-style-kit";

function buildKitchenHygienePolicy(): SheetData {
  return buildPolicyDocSheet({
    name: "廚房食品衛生作業規範",
    instTitle: "餐廳及廚房食品衛生管理作業規範",
    chapters: [
      {
        name: "第一章　總則",
        articles: [
          {
            number: "第一條",
            title: "（目的）",
            body: "為確保機構廚房食品衛生安全，預防食物中毒及腸胃道感染，依《食品安全衛生管理法》及相關規定制定本規範。",
          },
        ],
      },
      {
        name: "第二章　食材管理",
        articles: [
          {
            number: "第二條",
            title: "（採購原則）",
            body: "食材應向合法廠商採購，驗收時確認：\n一、外觀正常（無腐爛、變質、異味）\n二、包裝完整、標示清楚（生產日期、有效期限）\n三、冷藏/冷凍品之運送溫度符合規定（冷藏 ≤ 7°C，冷凍 ≤ -18°C）\n驗收紀錄填入「食材進貨及儲存檢查紀錄表」。",
          },
          {
            number: "第三條",
            title: "（儲存管理）",
            body: "食材儲存應遵守：\n一、生熟分開（不同冰格或不同冰箱）\n二、食物離地儲存（至少 15 公分）\n三、先進先出（FIFO）原則\n四、熟食加蓋保存\n五、每日監測冰箱溫度（冷藏 0–7°C，冷凍 ≤ -18°C）並紀錄",
          },
        ],
      },
      {
        name: "第三章　烹調作業",
        articles: [
          {
            number: "第四條",
            title: "（烹調衛生）",
            body: "烹調時應確保：\n一、食物中心溫度達 75°C 以上（禽肉類 85°C）\n二、再加熱食物溫度達 75°C 以上\n三、解凍食材在冰箱解凍或流動冷水下解凍，不得在室溫解凍\n四、生食與熟食使用不同砧板及刀具（顏色區分）",
          },
          {
            number: "第五條",
            title: "（廚工個人衛生）",
            body: "廚工應遵守：\n一、進廚房前完成手部衛生\n二、穿著清潔工作服、帽及圍裙\n三、身體不適（腸胃炎、發燒、皮膚感染）時不得進入廚房作業\n四、每年至少完成一次食品衛生安全訓練\n五、每年健康檢查（含胸部 X 光、腸道傳染病檢查）",
          },
        ],
      },
      {
        name: "第四章　環境衛生",
        articles: [
          {
            number: "第六條",
            title: "（廚房環境清潔）",
            body: "廚房環境清潔作業：\n一、每次使用後：清潔工作台、爐台、切菜板\n二、每日：清潔地板、油煙過濾網（重污時）\n三、每週：清潔冰箱內外、冷凍庫\n四、每月：廚房全面大掃除（含排水溝、油煙機）\n填寫「廚房環境衛生日常查核表」。",
          },
        ],
      },
      {
        name: "第五章　附則",
        articles: [
          {
            number: "第七條",
            title: "（施行日期）",
            body: "本規範自核定日起施行。",
          },
        ],
      },
    ],
  });
}

function buildHaccpSheet(): SheetData {
  return buildTableSheet({
    sheetName: "HACCP 自主管理查核表",
    title: "HACCP 食品安全危害分析自主管理查核表（每日）",
    note: "115 年度衛福部住宿型機構評鑑 C4 項目｜每日記錄關鍵控制點（CCP）監測，確保食品衛生安全",
    headers: [
      "日期",
      "驗收溫度（冷藏 ≤7°C）",
      "冷藏庫溫度（0–7°C）",
      "冷凍庫溫度（≤-18°C）",
      "食物中心溫度（≥75°C）",
      "廚工手部衛生執行",
      "生熟分開確認",
      "食材外觀正常",
      "查核人員",
      "異常說明及處置",
    ],
    samples: [
      [
        "115/01/15",
        "驗收 5°C ✓",
        "4°C ✓",
        "-20°C ✓",
        "78°C ✓",
        "✓",
        "✓",
        "✓",
        "廚工○○○",
        "無",
      ],
    ],
    blankRows: 20,
    columnWidths: [80, 110, 110, 120, 120, 110, 100, 100, 90, 150],
  });
}

export function buildNursingHomeItem42CustomSheets(): SheetData[] {
  return [buildKitchenHygienePolicy(), buildHaccpSheet()];
}
