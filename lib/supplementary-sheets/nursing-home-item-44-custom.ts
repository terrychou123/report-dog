/**
 * 住宿型照顧機構評鑑項目 44「藥品及醫療器材安全管理」自訂補充分頁
 *
 * 新增 1 個工作分頁：
 *   1. 急救設備管理 SOP
 */
import type { SheetData } from "../excel-template-builder";
import { buildPolicyDocSheet } from "./nursing-home-policy-template";

function buildEmergencyEquipmentSop(): SheetData {
  return buildPolicyDocSheet({
    name: "急救設備管理 SOP",
    instTitle: "急救設備（AED、急救箱、氧氣設備）管理標準作業程序（SOP）",
    chapters: [
      {
        name: "第一章　總則",
        articles: [
          {
            number: "第一條",
            title: "（目的）",
            body: "為確保機構急救設備之完整性與功能正常，在緊急醫療情況發生時能立即有效使用，制定本 SOP。",
          },
          {
            number: "第二條",
            title: "（設備範圍）",
            body: "本 SOP 涵蓋：\n一、自動體外心臟去顫器（AED）\n二、急救箱（藥品及耗材）\n三、氧氣設備（氧氣鋼瓶、製氧機）\n四、吸痰設備\n五、血糖機及相關耗材（放置於護理站）",
          },
        ],
      },
      {
        name: "第二章　AED 管理",
        articles: [
          {
            number: "第三條",
            title: "（AED 設置位置）",
            body: "AED 應設置於機構最易取得之位置（護理站或大廳），並有清楚標示。所有工作人員應知悉 AED 位置。",
          },
          {
            number: "第四條",
            title: "（AED 定期檢查）",
            body: "護理師應每月確認 AED：\n一、指示燈正常（綠燈表示就緒）\n二、電池電量充足（依設備顯示或廠商規定更換）\n三、電極片有效期限（未過期、包裝完整）\n四、設備外觀無損壞\n檢查結果記錄於「急救設備定期檢查表」。AED 每兩年由廠商提供技術維護。",
          },
        ],
      },
      {
        name: "第三章　急救箱管理",
        articles: [
          {
            number: "第五條",
            title: "（急救箱內容物）",
            body: "急救箱應備有：\n一、緊急止血材料（紗布、繃帶、止血帶）\n二、外傷清潔材料（生理食鹽水、碘酒棉棒）\n三、緊急用藥（依醫師指示備用；不可自行增添處方藥）\n四、手套、護目鏡\n五、急救卡（含當地醫院電話、119）",
          },
          {
            number: "第六條",
            title: "（急救箱定期補充）",
            body: "護理師每月檢查急救箱，補充耗用品，更換近效期（一個月內）藥品及材料，並填寫「急救設備定期檢查表」。急救箱使用後應立即補充至完備。",
          },
        ],
      },
      {
        name: "第四章　氧氣設備管理",
        articles: [
          {
            number: "第七條",
            title: "（氧氣設備安全）",
            body: "氧氣設備管理要點：\n一、氧氣鋼瓶儲存於通風良好、遠離明火及高溫處\n二、鋼瓶固定防止傾倒（使用固定架）\n三、製氧機每月確認運作正常、濾網清潔\n四、緊急氧氣鋼瓶每週確認壓力計讀數（壓力充足）\n五、氧氣濃度計（如有）每月校正",
          },
        ],
      },
      {
        name: "第五章　附則",
        articles: [
          {
            number: "第八條",
            title: "（員工訓練）",
            body: "所有護理人員應每兩年接受一次 CPR 及 AED 使用訓練（含技術評核），照顧服務員至少每兩年接受基礎急救訓練，訓練結果記錄存檔。",
          },
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

export function buildNursingHomeItem44CustomSheets(): SheetData[] {
  return [buildEmergencyEquipmentSop()];
}
