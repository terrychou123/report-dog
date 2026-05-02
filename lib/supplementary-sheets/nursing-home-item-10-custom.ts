/**
 * 住宿型照顧機構評鑑項目 10「服務品質改善會議及檢討機制」自訂補充分頁
 *
 * 新增 1 個工作分頁：
 *   1. 服務品質管理辦法
 */
import type { SheetData } from "../excel-template-builder";
import { buildPolicyDocSheet } from "./nursing-home-policy-template";

function buildQualityManagementPolicy(): SheetData {
  return buildPolicyDocSheet({
    name: "服務品質管理辦法",
    instTitle: "服務品質管理辦法",
    chapters: [
      {
        name: "第一章　總則",
        articles: [
          {
            number: "第一條",
            title: "（目的）",
            body: "為系統性監測、分析及持續改善本機構之服務品質，建立跨專業品質指標管理機制，制定本辦法。",
          },
        ],
      },
      {
        name: "第二章　品質指標",
        articles: [
          {
            number: "第二條",
            title: "（核心品質指標）",
            body: "本機構應定期追蹤下列品質指標：\n一、跌倒發生率（跌倒次數 / 每千住民日）\n二、壓力性損傷發生率（新生壓傷 / 每千住民日）\n三、尿路感染率\n四、非計畫性住院率\n五、非計畫性體重減輕率（月減輕 ≥ 5%）\n六、身體約束使用率\n七、管路移除率（鼻胃管、導尿管）\n八、服務對象滿意度（每年至少一次調查）",
          },
          {
            number: "第三條",
            title: "（指標蒐集頻率）",
            body: "各品質指標應每月蒐集一次，由護理長彙整，並與前月及目標值比較。顯著異常（超出警示值）應立即啟動根本原因分析。",
          },
        ],
      },
      {
        name: "第三章　品質改善會議",
        articles: [
          {
            number: "第四條",
            title: "（會議頻率）",
            body: "服務品質改善會議每季至少召開一次，由業務負責人主持，護理、社工、復健、營養等各職類代表出席。",
          },
          {
            number: "第五條",
            title: "（會議內容）",
            body: "會議應討論：\n一、上季品質指標數據分析（達標 / 未達標）\n二、異常指標之根本原因分析及改善措施\n三、前季決議事項執行追蹤\n四、重大事件案例分析\n五、次季品質目標調整\n會議紀錄於兩週內完成，決議事項指定責任人及完成期限。",
          },
          {
            number: "第六條",
            title: "（決議追蹤）",
            body: "每項決議事項應在「服務品質改善會議紀錄表」的追蹤欄記錄完成進度，於下次會議報告結果。未完成者說明延誤原因並修訂期限。",
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

export function buildNursingHomeItem10CustomSheets(): SheetData[] {
  return [buildQualityManagementPolicy()];
}
