/**
 * 住宿型照顧機構評鑑項目 46「緊急發電及停電應變」自訂補充分頁
 *
 * 新增 1 個工作分頁：
 *   1. 緊急發電管理辦法
 */
import type { SheetData } from "../excel-template-builder";
import { buildPolicyDocSheet } from "./nursing-home-policy-template";

function buildEmergencyPowerPolicy(): SheetData {
  return buildPolicyDocSheet({
    name: "緊急發電管理辦法",
    instTitle: "緊急發電設備及停電應變管理辦法",
    chapters: [
      {
        name: "第一章　總則",
        articles: [
          {
            number: "第一條",
            title: "（目的）",
            body: "為確保停電時機構能維持生命維持設備之持續運作，保障服務對象安全，制定本辦法。",
          },
          {
            number: "第二條",
            title: "（緊急電力設備）",
            body: "機構應備有下列緊急電力設備：\n一、緊急發電機（供電範圍：護理站、走廊照明、緊急呼叫系統）\n二、不斷電系統（UPS，供氧氣製造機、抽痰機等生命維持設備）\n三、電池供電型緊急照明（EL 燈）",
          },
        ],
      },
      {
        name: "第二章　定期試運轉",
        articles: [
          {
            number: "第三條",
            title: "（每月試運轉）",
            body: "緊急發電機應每月至少試運轉一次，每次至少三十分鐘（含負載測試），確認：\n一、自動或手動啟動正常\n二、供電範圍符合設計（關鍵設備均有電）\n三、運作時無異常噪音或警示燈\n試運轉紀錄填入「緊急發電設備試運轉紀錄表」，異常立即通報廠商維修。",
          },
          {
            number: "第四條",
            title: "（燃料管理）",
            body: "發電機燃料（柴油）應：\n一、維持至少可連續運作七十二小時之庫存量\n二、每月確認燃料存量\n三、儲存於符合規定之儲油設施，遠離火源",
          },
        ],
      },
      {
        name: "第三章　停電應變",
        articles: [
          {
            number: "第五條",
            title: "（停電時應變步驟）",
            body: "停電發生時，護理師應立即：\n一、確認是否為全面停電或局部停電\n二、啟動緊急發電機（如未自動啟動）\n三、確認生命維持設備（氧氣機、抽痰機）電力正常\n四、確認緊急照明及呼叫系統運作\n五、通知業務負責人及台電報修",
          },
          {
            number: "第六條",
            title: "（服務對象安全確認）",
            body: "停電時護理師應逐一確認服務對象狀況，特別注意：\n一、依賴電動床（重新設定位置）\n二、使用制氧機者（確認備用氧氣量）\n三、使用抽痰機者（確認備用設備）\n四、認知障礙服務對象（防止驚慌離床）",
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

export function buildNursingHomeItem46CustomSheets(): SheetData[] {
  return [buildEmergencyPowerPolicy()];
}
