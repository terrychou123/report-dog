/**
 * 住宿型照顧機構評鑑項目 30「侵入性照護技術管理」自訂補充分頁
 *
 * 新增 1 個工作分頁：
 *   1. 侵入性技術稽核辦法
 */
import type { SheetData } from "../excel-template-builder";
import { buildPolicyDocSheet } from "./nursing-home-policy-template";

function buildInvasiveCarePolicy(): SheetData {
  return buildPolicyDocSheet({
    name: "侵入性技術稽核辦法",
    instTitle: "侵入性照護技術管理及稽核辦法",
    chapters: [
      {
        name: "第一章　總則",
        articles: [
          {
            number: "第一條",
            title: "（目的）",
            body: "為確保護理人員執行侵入性照護技術之安全性及標準化，降低相關照護風險（感染、傷害），制定本辦法。",
          },
          {
            number: "第二條",
            title: "（侵入性照護技術範圍）",
            body: "本辦法涵蓋下列侵入性照護技術：\n一、鼻胃管插管及灌食\n二、留置導尿管護理\n三、傷口評估及換藥\n四、靜脈注射及點滴護理（依護理師執業範圍）\n五、抽痰（含口腔、鼻腔及氣切）\n六、血糖監測（扎指採血）",
          },
        ],
      },
      {
        name: "第二章　技術標準",
        articles: [
          {
            number: "第三條",
            title: "（標準作業程序）",
            body: "每項侵入性技術應訂有書面標準作業程序（SOP），SOP 應符合最新護理照護指引，並至少每兩年更新一次。所有護理人員應於執業前通過該技術之能力評核。",
          },
          {
            number: "第四條",
            title: "（感染預防原則）",
            body: "執行侵入性照護技術時，必須遵守：\n一、無菌技術（換藥、導尿管護理）\n二、一次性耗材不重複使用\n三、正確廢棄銳器（針頭入收集桶）\n四、接觸前後手部衛生\n五、標準預防措施（PPE 依需求使用）",
          },
        ],
      },
      {
        name: "第三章　能力訓練與評核",
        articles: [
          {
            number: "第五條",
            title: "（新進護理師評核）",
            body: "新進護理師應於到職後三個月內，完成本機構所有侵入性照護技術之能力評核（筆試 + 技術操作）。未通過者應接受補訓後重新評核，評核結果記錄於個人訓練檔案。",
          },
          {
            number: "第六條",
            title: "（年度能力複訓）",
            body: "護理師每年應至少接受一次侵入性技術複訓，重點技術（鼻胃管灌食、傷口照護）每年辦理技術更新訓練及技術稽核，訓練紀錄保存於「侵入性照護技術稽核表」。",
          },
        ],
      },
      {
        name: "第四章　稽核機制",
        articles: [
          {
            number: "第七條",
            title: "（稽核頻率）",
            body: "護理長每季進行侵入性照護技術稽核（包括現場觀察及紀錄查核），每項技術每年至少稽核一次。稽核結果反饋工作人員，缺失項目限期改善，並追蹤再稽核。",
          },
          {
            number: "第八條",
            title: "（感染相關監測）",
            body: "每月統計因侵入性管路相關之感染事件（導尿管相關泌尿道感染 CAUTI、傷口感染），納入感染事件監測系統，提送品質改善會議分析。",
          },
        ],
      },
      {
        name: "第五章　附則",
        articles: [
          {
            number: "第九條",
            title: "（施行日期）",
            body: "本辦法自核定日起施行。",
          },
        ],
      },
    ],
  });
}

export function buildNursingHomeItem30CustomSheets(): SheetData[] {
  return [buildInvasiveCarePolicy()];
}
