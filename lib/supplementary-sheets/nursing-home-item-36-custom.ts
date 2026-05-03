/**
 * 住宿型照顧機構評鑑項目 36「自我照顧能力維持及輔具使用」自訂補充分頁
 *
 * 新增 3 個工作分頁：
 *   1. 自我照顧能力促進辦法
 *   2. 輔具需求評估書
 *   3. 輔具清單和維護紀錄
 */
import type { SheetData } from "../excel-template-builder";
import { buildPolicyDocSheet } from "./nursing-home-policy-template";
import { buildTableSheet } from "./sheet-style-kit";

function buildSelfCarePolicy(): SheetData {
  return buildPolicyDocSheet({
    name: "自我照顧能力促進辦法",
    instTitle: "自我照顧能力維持及輔具使用管理辦法",
    chapters: [
      {
        name: "第一章　總則",
        articles: [
          {
            number: "第一條",
            title: "（目的）",
            body: "以「維持服務對象最大獨立功能」為目標，避免過度照護造成依賴，透過輔具使用及能力訓練維持自我照顧能力，制定本辦法。",
          },
        ],
      },
      {
        name: "第二章　功能評估",
        articles: [
          {
            number: "第二條",
            title: "（ADL 評估）",
            body: "使用「Barthel Index 日常生活功能量表」評估服務對象自我照顧能力（進食、如廁、沐浴、行走、穿脫衣物等），每半年評估一次，功能變化時即時重評。",
          },
          {
            number: "第三條",
            title: "（輔具評估）",
            body: "物理治療師或職能治療師應評估服務對象輔具需求，建議適當輔具種類（助行器、四腳拐、輪椅、防滑餐具、穿衣輔具等），紀錄於個別化服務計畫。",
          },
        ],
      },
      {
        name: "第三章　促進措施",
        articles: [
          {
            number: "第四條",
            title: "（能力維持原則）",
            body: "工作人員應遵循「最少必要協助」原則：\n一、服務對象能自行完成的動作，工作人員僅從旁監督或指導，不代勞\n二、提供適當輔具取代人力協助\n三、訓練及鼓勵服務對象嘗試自我照顧，給予時間及正向回饋",
          },
          {
            number: "第五條",
            title: "（輔具管理）",
            body: "機構應建立「輔具清單」，記載各輔具之種類、規格、借用人及維護狀態。輔具應定期（至少每季）檢查功能，損壞或不合適者立即更換。服務對象自備輔具亦納入管理範疇。",
          },
        ],
      },
      {
        name: "第四章　附則",
        articles: [
          {
            number: "第六條",
            title: "（施行日期）",
            body: "本辦法自核定日起施行。",
          },
        ],
      },
    ],
  });
}

function buildAssistiveDeviceAssessmentSheet(): SheetData {
  return buildTableSheet({
    sheetName: "輔具需求評估書",
    title: "輔具需求評估書",
    note: "115 年度衛福部住宿型機構評鑑 B27 項目｜由物理治療師或職能治療師評估服務對象輔具需求，建議適當輔具種類，紀錄於個別化服務計畫",
    headers: [
      "服務對象姓名",
      "評估日期",
      "評估治療師（職類：物理治療師／職能治療師）",
      "目前 ADL 狀況（Barthel Index 分數）",
      "功能限制描述",
      "建議輔具種類（助行器／四腳拐／輪椅／防滑餐具／穿衣輔具等）",
      "規格／尺寸建議",
      "使用部位／場景",
      "使用訓練需求",
      "預定複評日期",
      "備註",
    ],
    samples: [
      [
        "○○○",
        "115/03/10",
        "職能治療師○○○",
        "45 分",
        "右側肢體無力，行走不穩，進食握力不足",
        "四腳拐（移動用）、防滑餐具一組",
        "四腳拐：中型；防滑碗：直徑 15cm",
        "走廊移位、餐廳用餐",
        "需個別訓練 2 次，教導正確使用姿勢",
        "115/09/10",
        "",
      ],
    ],
    blankRows: 15,
    columnWidths: [90, 90, 130, 130, 140, 200, 130, 130, 130, 100, 100],
  });
}

function buildAssistiveDeviceMaintenanceSheet(): SheetData {
  return buildTableSheet({
    sheetName: "輔具清單和維護紀錄",
    title: "輔具清單和維護紀錄",
    note: "115 年度衛福部住宿型機構評鑑 B27 項目｜記載各輔具之種類、規格、借用人及維護狀態；至少每季檢查功能，損壞或不合適者立即更換",
    headers: [
      "編號",
      "輔具種類",
      "規格／廠牌型號",
      "取得來源（機構購入／個案自備）",
      "取得日期",
      "配置位置",
      "借用人／使用者",
      "領用日期",
      "歸還日期",
      "上次檢查日期（至少每季）",
      "檢查狀態（正常／維修／汰換）",
      "處理結果與責任人員",
      "備註",
    ],
    samples: [
      [
        "A001",
        "四腳拐",
        "中型鋁合金四腳拐",
        "機構購入",
        "114/06/01",
        "2F 東側走廊",
        "○○○",
        "115/03/10",
        "",
        "115/03/31",
        "正常",
        "護理師○○○確認功能完整",
        "",
      ],
    ],
    blankRows: 20,
    columnWidths: [60, 110, 140, 130, 90, 110, 110, 90, 90, 110, 110, 140, 100],
  });
}

export function buildNursingHomeItem36CustomSheets(): SheetData[] {
  return [
    buildSelfCarePolicy(),
    buildAssistiveDeviceAssessmentSheet(),
    buildAssistiveDeviceMaintenanceSheet(),
  ];
}
