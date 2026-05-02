/**
 * 住宿型照顧機構評鑑項目 60「服務對象居家情境及監視設備管理」自訂補充分頁
 *
 * 新增 1 個工作分頁：
 *   1. 監視設備管理辦法
 *
 * 115 年度新增：熱影像偵測設備整合、監視設備與居家情境結合（D6 重新詮釋）
 */
import type { SheetData } from "../excel-template-builder";
import { buildPolicyDocSheet } from "./nursing-home-policy-template";

function buildSurveillancePolicy(): SheetData {
  return buildPolicyDocSheet({
    name: "監視設備管理辦法",
    instTitle: "監視設備設置及管理辦法（含熱影像偵測）",
    chapters: [
      {
        name: "第一章　總則",
        articles: [
          {
            number: "第一條",
            title: "（目的）",
            body: "為兼顧服務對象安全監測與個人隱私保護，規範機構監視攝影設備之設置、告知及影像管理，依 115 年度評鑑基準 D6 制定本辦法。",
          },
        ],
      },
      {
        name: "第二章　設置規範",
        articles: [
          {
            number: "第二條",
            title: "（可設置區域）",
            body: "監視攝影設備（含熱影像偵測器）可設置於：\n一、公共走廊、大廳、交誼廳\n二、寢室（需書面同意，且不得涵蓋換衣或如廁範圍）\n三、護理站、倉庫、藥品室（內部管理用途）",
          },
          {
            number: "第三條",
            title: "（禁止設置區域）",
            body: "以下區域絕對禁止設置任何監視設備（無論任何理由）：\n一、浴廁及盥洗室（含個人衛浴）\n二、更衣室\n三、護理師及工作人員休息室",
          },
          {
            number: "第四條",
            title: "（告知義務）",
            body: "服務對象入住時，機構應書面告知：\n一、機構設有監視設備之區域及目的\n二、熱影像偵測設備之功能說明（非視覺影像，用於偵測跌倒或異常狀況）\n三、影像保存期限及調閱規範\n如需於寢室設置，應另取得服務對象及家屬之書面同意（個別填寫同意書）。",
          },
        ],
      },
      {
        name: "第三章　影像管理",
        articles: [
          {
            number: "第五條",
            title: "（影像保存）",
            body: "一般監視影像保存至少三十天，超時自動覆蓋。發生意外事件時應立即備份相關影像（至少保存至事件調查結束）。",
          },
          {
            number: "第六條",
            title: "（影像調閱）",
            body: "監視影像調閱須經業務負責人授權：\n一、事故調查：由業務負責人決定提供範圍\n二、家屬要求：需具體事由，業務負責人審核後決定\n三、主管機關查核：配合依法提供\n所有調閱均應填寫「監視設備調閱申請紀錄」。",
          },
        ],
      },
      {
        name: "第四章　附則",
        articles: [
          {
            number: "第七條",
            title: "（施行日期）",
            body: "本辦法自核定日起施行。",
          },
        ],
      },
    ],
  });
}

export function buildNursingHomeItem60CustomSheets(): SheetData[] {
  return [buildSurveillancePolicy()];
}
