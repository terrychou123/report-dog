/**
 * 住宿型照顧機構評鑑項目 35「失禁服務對象定時如廁計畫」自訂補充分頁
 *
 * 新增 1 個工作分頁：
 *   1. 定時如廁訓練辦法
 *
 * 115 年度評鑑新增項目 B26（失禁服務對象定時如廁計畫）
 */
import type { SheetData } from "../excel-template-builder";
import { buildPolicyDocSheet } from "./nursing-home-policy-template";

function buildToiletingTrainingPolicy(): SheetData {
  return buildPolicyDocSheet({
    name: "定時如廁訓練辦法",
    instTitle: "失禁服務對象定時如廁計畫管理辦法",
    chapters: [
      {
        name: "第一章　總則",
        articles: [
          {
            number: "第一條",
            title: "（目的）",
            body: "對有失禁之服務對象，透過個別化定時如廁計畫，減少尿布依賴，恢復部分自主排尿排便能力，提升服務對象尊嚴與生活品質，依 115 年度評鑑基準 B26 制定本辦法。",
          },
        ],
      },
      {
        name: "第二章　評估",
        articles: [
          {
            number: "第二條",
            title: "（失禁評估）",
            body: "護理師應對新入住服務對象進行排泄功能評估，記錄：\n一、失禁類型（尿失禁、大便失禁、混合型）\n二、失禁頻率及時間分佈\n三、認知及肢體能力（能否配合如廁）\n四、現行排尿排便輔助方式（尿布、導尿管）",
          },
          {
            number: "第三條",
            title: "（計畫對象）",
            body: "下列服務對象應優先擬定定時如廁計畫：\n一、尿失禁但可配合移位如廁者\n二、已移除導尿管者（配合管路移除促進計畫）\n三、使用尿布但仍有部分自主排尿能力者",
          },
        ],
      },
      {
        name: "第三章　計畫執行",
        articles: [
          {
            number: "第四條",
            title: "（如廁時間設定）",
            body: "依排泄評估結果，設定個別化如廁時間（一般每二至三小時一次）：\n一、起床後、餐前後、睡前為基本如廁時間點\n二、依服務對象失禁型態（急迫型/壓力型/功能型）調整間隔",
          },
          {
            number: "第五條",
            title: "（執行方式）",
            body: "照顧服務員依定時如廁計畫：\n一、於預定時間協助服務對象移位至馬桶或便盆\n二、給予足夠如廁時間（至少五分鐘）\n三、如廁成功給予正向鼓勵\n四、失敗時紀錄（記錄原因：不願意、無尿意等）",
          },
          {
            number: "第六條",
            title: "（成效評估）",
            body: "定時如廁計畫應每月評估成效（如廁成功率、尿布更換減少量），由護理師調整計畫。每季於品質改善會議報告定時如廁計畫成效及參與率。",
          },
        ],
      },
      {
        name: "第四章　附則",
        articles: [
          {
            number: "第七條",
            title: "（教育訓練）",
            body: "照顧服務員應接受定時如廁照護技術訓練，學習正確如廁協助方式及心理支持技巧，訓練結果記錄於個人訓練紀錄。",
          },
          {
            number: "第八條",
            title: "（施行日期）",
            body: "本辦法自核定日起施行。",
          },
        ],
      },
    ],
  });
}

export function buildNursingHomeItem35CustomSheets(): SheetData[] {
  return [buildToiletingTrainingPolicy()];
}
