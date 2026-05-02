/**
 * 住宿型照顧機構評鑑項目 26「非計畫性住院管理」自訂補充分頁
 *
 * 新增 1 個工作分頁：
 *   1. 非計畫性住院檢討規範
 */
import type { SheetData } from "../excel-template-builder";
import { buildPolicyDocSheet } from "./nursing-home-policy-template";

function buildUnplannedHospitalizationPolicy(): SheetData {
  return buildPolicyDocSheet({
    name: "非計畫性住院檢討規範",
    instTitle: "非計畫性住院管理及檢討規範",
    chapters: [
      {
        name: "第一章　總則",
        articles: [
          {
            number: "第一條",
            title: "（定義）",
            body: "「非計畫性住院」指服務對象因急性疾病、跌倒傷害或其他緊急醫療狀況，未事先計畫而需緊急住院之情形，不含預先安排之手術或檢查。",
          },
          {
            number: "第二條",
            title: "（目的）",
            body: "透過系統性記錄、分析非計畫性住院事件，找出可預防因素，降低住院率，提升服務對象照護品質。",
          },
        ],
      },
      {
        name: "第二章　紀錄與通報",
        articles: [
          {
            number: "第三條",
            title: "（事件紀錄）",
            body: "每次非計畫性住院應於住院後二十四小時內，由護理師填寫「非計畫性住院監測紀錄表」，記載：\n一、住院原因（診斷）\n二、相關照護背景（跌倒評估分數、近期體重變化、感染監測等）\n三、住院前七天之照護紀錄摘要",
          },
          {
            number: "第四條",
            title: "（返院銜接）",
            body: "服務對象自醫院返回機構時，護理師應：\n一、取得住院摘要及出院醫囑\n二、重新進行全面評估（ADL、跌倒風險、壓傷等）\n三、更新個別化服務計畫\n四、確認用藥調整並執行",
          },
        ],
      },
      {
        name: "第三章　原因分析與改善",
        articles: [
          {
            number: "第五條",
            title: "（個案分析）",
            body: "每次非計畫性住院應進行個案原因分析，探討：\n一、住院原因是否與機構照護品質有關（壓傷感染、用藥錯誤、跌倒等）\n二、是否有可辨識之早期預警徵象被忽略\n三、早期介入是否可預防此次住院",
          },
          {
            number: "第六條",
            title: "（統計分析）",
            body: "每季統計非計畫性住院率（住院次數 / 每千住民日），分析住院主要原因分佈，提送品質改善會議。若住院率顯著高於上季或業界標準，應啟動深度根本原因分析，並擬定改善計畫。",
          },
        ],
      },
      {
        name: "第四章　合作醫院連結",
        articles: [
          {
            number: "第七條",
            title: "（合作機制）",
            body: "機構應與合作醫院建立連續性照護機制，包括：\n一、服務對象住院期間之資訊共享（提供護理摘要）\n二、出院前通知機構，確保返院照護準備就緒\n三、定期與合作醫院醫療人員溝通高風險個案管理策略",
          },
        ],
      },
      {
        name: "第五章　附則",
        articles: [
          {
            number: "第八條",
            title: "（施行日期）",
            body: "本規範自核定日起施行。",
          },
        ],
      },
    ],
  });
}

export function buildNursingHomeItem26CustomSheets(): SheetData[] {
  return [buildUnplannedHospitalizationPolicy()];
}
