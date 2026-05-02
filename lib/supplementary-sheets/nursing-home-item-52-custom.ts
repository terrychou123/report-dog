/**
 * 住宿型照顧機構評鑑項目 52「疏散避難通道及設施維護」自訂補充分頁
 *
 * 新增 1 個工作分頁：
 *   1. 疏散通道淨空管理規範
 */
import type { SheetData } from "../excel-template-builder";
import { buildPolicyDocSheet } from "./nursing-home-policy-template";

function buildEvacuationCorridorPolicy(): SheetData {
  return buildPolicyDocSheet({
    name: "疏散通道淨空管理規範",
    instTitle: "疏散避難通道及設施維護管理規範",
    chapters: [
      {
        name: "第一章　總則",
        articles: [
          {
            number: "第一條",
            title: "（目的）",
            body: "為確保機構疏散避難通道隨時保持暢通，相關設施功能正常，保障緊急疏散效率，依《消防法》及相關規定制定本規範。",
          },
        ],
      },
      {
        name: "第二章　疏散通道管理",
        articles: [
          {
            number: "第二條",
            title: "（淨空要求）",
            body: "下列疏散相關區域應隨時保持淨空：\n一、走廊（含所有樓層走廊）：不得堆放物品，寬度符合法規最低標準\n二、緊急出口前方及通道：不得停放輪椅、床具或其他設備\n三、樓梯間：嚴禁堆放任何物品\n四、防火門前後：不得以任何方式阻擋防火門關閉",
          },
          {
            number: "第三條",
            title: "（日常巡查）",
            body: "每班次護理師或照顧服務員應確認負責樓層之疏散通道淨空，發現阻塞立即清除。防火管理人每月進行一次全面疏散通道巡查，填寫「疏散通道及設施月巡查表」。",
          },
        ],
      },
      {
        name: "第三章　疏散設施維護",
        articles: [
          {
            number: "第四條",
            title: "（緊急照明維護）",
            body: "緊急照明燈（停電自動亮起）應：\n一、每月測試一次（切斷電源確認自動點亮，持續一分鐘以上）\n二、照明燈具損壞時二十四小時內更換\n三、每年委請廠商全面功能測試",
          },
          {
            number: "第五條",
            title: "（出口指示標示）",
            body: "出口指示燈及疏散方向標示應：\n一、每月確認亮度正常、方向箭頭清楚\n二、標示損壞時七個工作日內更換\n三、新增或調整疏散路線時，同步更新所有相關標示",
          },
          {
            number: "第六條",
            title: "（防火門功能）",
            body: "防火門（尤其是等待救援空間防火門甲種）應：\n一、每月確認閉門器功能正常（可自動完全關閉）\n二、確認門縫密封膠條完整\n三、防火門不得固定開啟（不得以門擋阻止關閉）\n四、發現閉門器損壞立即報修，設立臨時人員守護",
          },
        ],
      },
      {
        name: "第四章　附則",
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

export function buildNursingHomeItem52CustomSheets(): SheetData[] {
  return [buildEvacuationCorridorPolicy()];
}
