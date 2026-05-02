/**
 * 住宿型照顧機構評鑑項目 48「等待救援空間設置」自訂補充分頁
 *
 * 新增 1 個工作分頁：
 *   1. 等待救援空間維護辦法
 *
 * 115 年度新增：等待救援空間需符合不燃材料/防火門（甲種）/防排煙三項構造要求
 */
import type { SheetData } from "../excel-template-builder";
import { buildPolicyDocSheet } from "./nursing-home-policy-template";

function buildRescueAreaPolicy(): SheetData {
  return buildPolicyDocSheet({
    name: "等待救援空間維護辦法",
    instTitle: "等待救援空間設置及維護管理辦法",
    chapters: [
      {
        name: "第一章　總則",
        articles: [
          {
            number: "第一條",
            title: "（目的）",
            body: "為保障無法垂直疏散之服務對象（C/D 類）在火災或緊急疏散時之暫時安全，確保等待救援空間（防火區劃）符合標準並隨時可用，依 115 年度評鑑基準 C10 制定本辦法。",
          },
          {
            number: "第二條",
            title: "（構造要求）",
            body: "等待救援空間應同時符合以下三項構造要求（115 年度新增）：\n一、牆壁及天花板以不燃材料（混凝土、磚材等）構成\n二、出入口裝設甲種防火門（耐火時限符合規定）\n三、具備防排煙功能（自然或機械排煙系統）\n現有等待救援空間如不符合上述要求，應列為改善事項，並於評鑑前提出改善計畫。",
          },
        ],
      },
      {
        name: "第二章　定期維護",
        articles: [
          {
            number: "第三條",
            title: "（月度巡查）",
            body: "防火管理人每月確認等待救援空間：\n一、空間淨空（無堆放物品，保持足夠容納輪椅及擔架之空間）\n二、甲種防火門功能正常（可自動完全閉合，無變形）\n三、防排煙設備功能正常（排煙口不被阻塞）\n四、空間標示清楚（「等待救援區域」標示於門外醒目處）\n巡查結果記錄於「等待救援空間查核表」。",
          },
          {
            number: "第四條",
            title: "（年度功能測試）",
            body: "每年配合消防演練，測試等待救援空間實際使用狀況：\n一、移動模擬C/D類服務對象至等待救援空間（演習）\n二、確認工作人員知悉各樓層等待救援空間位置\n三、確認消防員可從外部識別有人員等待救援（如白板標示系統）",
          },
        ],
      },
      {
        name: "第三章　服務對象知悉",
        articles: [
          {
            number: "第五條",
            title: "（告知義務）",
            body: "機構應告知服務對象（及家屬）等待救援空間位置及用途，並於個別化疏散策略中標明C/D類服務對象應前往之等待救援空間。告知紀錄保存於個案服務計畫。",
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

export function buildNursingHomeItem48CustomSheets(): SheetData[] {
  return [buildRescueAreaPolicy()];
}
