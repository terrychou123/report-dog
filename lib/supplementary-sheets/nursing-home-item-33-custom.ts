/**
 * 住宿型照顧機構評鑑項目 33「促進日常活動及下床」自訂補充分頁
 *
 * 新增 1 個工作分頁：
 *   1. 下床活動促進辦法
 */
import type { SheetData } from "../excel-template-builder";
import { buildPolicyDocSheet } from "./nursing-home-policy-template";

function buildMobilizationPolicy(): SheetData {
  return buildPolicyDocSheet({
    name: "下床活動促進辦法",
    instTitle: "促進日常活動及下床管理辦法",
    chapters: [
      {
        name: "第一章　總則",
        articles: [
          {
            number: "第一條",
            title: "（目的）",
            body: "為預防服務對象因長期臥床導致廢用症候群（肌力衰退、壓傷、靜脈血栓），積極促進服務對象下床活動及功能維持，制定本辦法。",
          },
        ],
      },
      {
        name: "第二章　促進措施",
        articles: [
          {
            number: "第二條",
            title: "（下床評估）",
            body: "護理師於入住後及每次功能評估時，評估服務對象下床活動之安全性及能力（可行走、輔具協助、輪椅、完全臥床），紀錄於個別化服務計畫。",
          },
          {
            number: "第三條",
            title: "（每日下床目標）",
            body: "依服務對象能力，設定每日下床活動目標：\n一、可行走者：每日至少二次離床走動（含餐廳用餐）\n二、輪椅使用者：每日至少二次離開床鋪至輪椅活動，坐姿維持不低於二小時\n三、部分臥床者：每日坐起床邊至少一次，視能力增加時間\n四、完全臥床者：每兩小時翻身，進行被動關節運動",
          },
          {
            number: "第四條",
            title: "（復健配合）",
            body: "物理治療師、職能治療師應依服務對象需求提供功能訓練（步態訓練、轉位技術），工作人員應依治療師建議在日常照護中落實功能維持活動。",
          },
          {
            number: "第五條",
            title: "（紀錄）",
            body: "每日下床活動情形填入「服務對象下床活動紀錄表」，護理師每週查閱，確認目標達成率；未達目標者評估障礙原因（疼痛、裝備不適、意願低落），調整計畫。",
          },
        ],
      },
      {
        name: "第三章　附則",
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

export function buildNursingHomeItem33CustomSheets(): SheetData[] {
  return [buildMobilizationPolicy()];
}
