/**
 * 住宿型照顧機構評鑑項目 4「前次評鑑（查核）缺失改善情形」自訂補充分頁
 *
 * 新增 1 個工作分頁：
 *   1. 缺失改善管理辦法
 */
import type { SheetData } from "../excel-template-builder";
import { buildPolicyDocSheet } from "./nursing-home-policy-template";

function buildDeficiencyImprovementPolicy(): SheetData {
  return buildPolicyDocSheet({
    name: "缺失改善管理辦法",
    instTitle: "評鑑（查核）缺失改善管理辦法",
    chapters: [
      {
        name: "第一章　總則",
        articles: [
          {
            number: "第一條",
            title: "（目的）",
            body: "為確保機構於評鑑、查核或督導後，能有效追蹤及改善被指出之缺失，防止重複發生，持續提升照護品質，制定本辦法。",
          },
        ],
      },
      {
        name: "第二章　缺失彙整與分析",
        articles: [
          {
            number: "第二條",
            title: "（缺失清冊建立）",
            body: "評鑑或查核結果公布後，行政組應於十個工作日內建立「缺失改善追蹤清冊」，依缺失等級（重大、一般）分類，並指定各項缺失之改善負責人員。",
          },
          {
            number: "第三條",
            title: "（根本原因分析）",
            body: "重大缺失項目應由業務負責人召集相關人員進行根本原因分析（RCA），找出系統性問題，避免僅做表面修正。分析結果記錄於改善計畫中。",
          },
        ],
      },
      {
        name: "第三章　改善計畫訂定",
        articles: [
          {
            number: "第四條",
            title: "（改善計畫內容）",
            body: "每項缺失之改善計畫應包含：\n一、缺失描述（評鑑原文）\n二、根本原因分析摘要\n三、具體改善措施（可量化）\n四、負責人員\n五、完成期限\n六、成效衡量指標",
          },
          {
            number: "第五條",
            title: "（時限要求）",
            body: "一般缺失應於三個月內完成改善；重大缺失應於六十日內完成改善或提出階段性改善證明，並向主管機關報告進度。",
          },
        ],
      },
      {
        name: "第四章　追蹤與驗證",
        articles: [
          {
            number: "第六條",
            title: "（月度追蹤）",
            body: "業務負責人每月審閱缺失改善進度，未按時完成者應要求說明並加強督導。進度更新紀錄於「評鑑缺失改善追蹤表」，業務負責人簽核。",
          },
          {
            number: "第七條",
            title: "（成效驗證）",
            body: "改善完成後，應由業務負責人或品質管理人員進行成效驗證（如稽核數據比較、現場查看），確認缺失已實質改善，並在追蹤清冊標記「完成驗證」及日期。",
          },
          {
            number: "第八條",
            title: "（持續監測）",
            body: "改善後六個月內應持續監測相關品質指標，確認缺失未再復發。監測結果納入品質改善季報。",
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

export function buildNursingHomeItem4CustomSheets(): SheetData[] {
  return [buildDeficiencyImprovementPolicy()];
}
