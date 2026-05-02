/**
 * 住宿型照顧機構評鑑項目 45「電梯及機械升降設備安全」自訂補充分頁
 *
 * 新增 1 個工作分頁：
 *   1. 電梯安全管理辦法
 */
import type { SheetData } from "../excel-template-builder";
import { buildPolicyDocSheet } from "./nursing-home-policy-template";

function buildElevatorSafetyPolicy(): SheetData {
  return buildPolicyDocSheet({
    name: "電梯安全管理辦法",
    instTitle: "電梯及機械升降設備安全管理辦法",
    chapters: [
      {
        name: "第一章　總則",
        articles: [
          {
            number: "第一條",
            title: "（目的）",
            body: "為確保機構電梯及機械升降設備安全運作，保障服務對象及工作人員移動安全，依《電梯安全法》及相關規定制定本辦法。",
          },
        ],
      },
      {
        name: "第二章　定期檢查",
        articles: [
          {
            number: "第二條",
            title: "（定期安全檢查）",
            body: "電梯應依法定頻率委請合格電梯廠商辦理定期安全檢查及保養，取得「電梯定期安全檢查合格紀錄」。結果不合格時應立即停用並修繕，完成後重新取得合格紀錄方可恢復使用。",
          },
          {
            number: "第三條",
            title: "（日常檢查）",
            body: "行政人員每月進行電梯日常自主檢查：\n一、門開關動作正常（無卡頓）\n二、按鈕及指示燈功能正常\n三、緊急對講機可通話\n四、緊急照明燈正常\n五、電梯廂內無異常噪音或震動\n檢查結果記錄於「電梯定期安全檢查紀錄表」。",
          },
        ],
      },
      {
        name: "第三章　故障處理",
        articles: [
          {
            number: "第四條",
            title: "（電梯故障應變）",
            body: "電梯發生故障時：\n一、立即封鎖電梯使用（張貼故障告示）\n二、通知維修廠商（廠商維修電話公告於電梯機房及行政室）\n三、有人員被困時：通知維修廠商並透過對講機安撫被困者，勿強行打開門\n四、修復後由廠商確認可安全使用後方可恢復\n故障及維修紀錄記錄於「電梯故障及維修紀錄表」。",
          },
          {
            number: "第五條",
            title: "（火災時管理）",
            body: "火災警報啟動時，電梯應自動下降至一樓並停用（消防功能）。工作人員應提醒所有人員改走樓梯疏散，不得使用電梯。消防演練時應同步測試電梯消防功能。",
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

export function buildNursingHomeItem45CustomSheets(): SheetData[] {
  return [buildElevatorSafetyPolicy()];
}
