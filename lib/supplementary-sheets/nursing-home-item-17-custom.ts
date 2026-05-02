/**
 * 住宿型照顧機構評鑑項目 17「例行醫療照護及就醫安排」自訂補充分頁
 *
 * 新增 1 個工作分頁：
 *   1. 例行醫療作業規範
 */
import type { SheetData } from "../excel-template-builder";
import { buildPolicyDocSheet } from "./nursing-home-policy-template";

function buildRoutineMedicalPolicy(): SheetData {
  return buildPolicyDocSheet({
    name: "例行醫療作業規範",
    instTitle: "例行醫療照護及就醫安排作業規範",
    chapters: [
      {
        name: "第一章　總則",
        articles: [
          {
            number: "第一條",
            title: "（目的）",
            body: "為確保服務對象定期獲得適切之醫療照護，並有序安排就醫程序，制定本規範。",
          },
        ],
      },
      {
        name: "第二章　醫師定期診視",
        articles: [
          {
            number: "第二條",
            title: "（定期診視頻率）",
            body: "兼任醫師應依聘用合約及法規規定定期到診（至少每月___次），每次診視應：\n一、評估服務對象整體健康狀況\n二、更新或確認慢性病用藥處方\n三、針對護理師提報之異常狀況予以評估處置\n四、簽署必要之醫療醫囑",
          },
          {
            number: "第三條",
            title: "（診視紀錄）",
            body: "每次醫師診視應填寫「醫師巡診診察紀錄表」，記載診視日期、服務對象狀況、醫囑內容及簽名。護理師應依醫囑執行並追蹤成效。",
          },
        ],
      },
      {
        name: "第三章　慢性病管理",
        articles: [
          {
            number: "第四條",
            title: "（用藥管理）",
            body: "慢性病用藥應：\n一、依醫師處方定期取藥，確保不斷藥\n二、每次診視時由醫師確認是否需調整用藥\n三、多重用藥（≥ 5 種）個案每半年進行藥師藥事照護評估",
          },
          {
            number: "第五條",
            title: "（定期專科檢查）",
            body: "護理師應依服務對象病史及需求，協助安排定期專科追蹤（如眼科、牙科、心臟科），追蹤安排及結果記錄於護理紀錄及個別化服務計畫。",
          },
        ],
      },
      {
        name: "第四章　就醫安排",
        articles: [
          {
            number: "第六條",
            title: "（非緊急就醫）",
            body: "服務對象需非緊急就醫時，護理師應：\n一、告知家屬並確認陪同意願\n二、準備就醫所需文件（健保卡、藥袋、過去病歷摘要）\n三、安排機構交通或協助家屬安排\n四、就醫後紀錄診斷及醫囑調整",
          },
          {
            number: "第七條",
            title: "（牙科及眼科定期健診）",
            body: "應每年至少一次協助服務對象進行牙科及眼科檢查，紀錄檢查結果及後續追蹤事項。若機構有巡迴醫療服務，應積極配合安排。",
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

export function buildNursingHomeItem17CustomSheets(): SheetData[] {
  return [buildRoutineMedicalPolicy()];
}
