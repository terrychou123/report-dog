/**
 * 住宿型照顧機構評鑑項目 64「加分①：創新或配合政策執行」自訂補充分頁
 *
 * 新增 2 個工作分頁：
 *   1. 創新或政策配合計畫書
 *   2. 創新方案執行紀錄表
 *
 * 115 年度加分項目（+2 分）：長服法 §46 相關規定或衛福部政策配合
 * 注意：此項目在 nursingHomeDefs 無 key，所有內容來自本 custom builder。
 */
import type { SheetData } from "../excel-template-builder";
import { buildPolicyDocSheet } from "./nursing-home-policy-template";
import { buildTableSheet } from "./sheet-style-kit";

function buildInnovationPlanDoc(): SheetData {
  return buildPolicyDocSheet({
    name: "創新或政策配合計畫書",
    instTitle: "創新服務或政策配合執行計畫書",
    metaNote: "本計畫書適用於 115 年度評鑑加分項目①（創新或配合政策執行，+2 分）\n計畫核定日期：中華民國　　年　　月　　日　　核定人：___________（負責人）",
    chapters: [
      {
        name: "第一章　計畫背景",
        articles: [
          {
            number: "第一節",
            title: "（計畫依據）",
            body: "本計畫依《長期照顧服務法》第四十六條（鼓勵創新或研究）或衛生福利部 115 年度長期照顧政策方向，規劃本機構之創新服務或政策配合方案。",
          },
          {
            number: "第二節",
            title: "（問題分析）",
            body: "（請填入）\n本機構發現之服務問題或改善需求：\n___________（描述現況問題，如：服務對象憂鬱比率偏高；照護人力壓力大；數位化程度不足等）",
          },
        ],
      },
      {
        name: "第二章　計畫目標",
        articles: [
          {
            number: "第三節",
            title: "（創新方向）",
            body: "（選擇適用項目並填入具體說明）\n□ 科技輔助照護（如：AI 跌倒偵測、智慧床墊）\n□ 創新活動治療模式（如：團體音樂療法、懷舊治療）\n□ 失禁照護創新方案（配合定時如廁計畫強化）\n□ 配合衛福部特定政策（如：___________政策）\n□ 其他：___________",
          },
          {
            number: "第四節",
            title: "（預期成效）",
            body: "（請填入可量化之目標）\n一、目標指標：___________\n二、基準值（計畫前）：___________\n三、預期達成值：___________\n四、評估時間點：___________",
          },
        ],
      },
      {
        name: "第三章　執行計畫",
        articles: [
          {
            number: "第五節",
            title: "（執行步驟）",
            body: "（請填入具體執行步驟）\n一、準備階段（___月至___月）：___________\n二、執行階段（___月至___月）：___________\n三、評估階段（___月至___月）：___________",
          },
          {
            number: "第六節",
            title: "（資源需求）",
            body: "所需資源：\n一、人力：___________\n二、設備或材料：___________\n三、預算估計：新台幣___________元\n四、外部合作單位：___________",
          },
        ],
      },
      {
        name: "第四章　附則",
        articles: [
          {
            number: "第七節",
            title: "（計畫期限）",
            body: "本計畫執行期限：自中華民國　　年　　月起至　　年　　月止。",
          },
        ],
      },
    ],
  });
}

function buildInnovationRecordSheet(): SheetData {
  return buildTableSheet({
    sheetName: "創新方案執行紀錄表",
    title: "創新服務或政策配合方案執行紀錄表",
    note: "115 年度衛福部住宿型機構評鑑加分項目①（+2 分）｜逐月記錄創新方案執行進度及成效",
    headers: [
      "月份",
      "本月執行項目",
      "參與人員",
      "受益服務對象人數",
      "執行情形摘要",
      "量化指標數據",
      "遭遇困難",
      "調整措施",
      "負責人員",
    ],
    samples: [
      [
        "115年1月",
        "啟動 AI 跌倒偵測系統試行（二樓）",
        "護理長、IT 廠商",
        "20",
        "安裝完成，工作人員完成操作訓練",
        "跌倒偵測準確率 85%（試行初期）",
        "部分服務對象對攝影機有疑慮",
        "加強告知及隱私說明",
        "護理長○○○",
      ],
    ],
    blankRows: 12,
    columnWidths: [70, 160, 100, 100, 180, 130, 130, 130, 90],
  });
}

export function buildNursingHomeItem64CustomSheets(): SheetData[] {
  return [buildInnovationPlanDoc(), buildInnovationRecordSheet()];
}
