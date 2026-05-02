/**
 * 住宿型照顧機構評鑑項目 3「業務計畫訂定與執行」自訂補充分頁
 *
 * 新增 1 個工作分頁：
 *   1. 業務計畫管理辦法
 */
import type { SheetData } from "../excel-template-builder";
import { buildPolicyDocSheet } from "./nursing-home-policy-template";

function buildBusinessPlanPolicy(): SheetData {
  return buildPolicyDocSheet({
    name: "業務計畫管理辦法",
    instTitle: "年度業務計畫訂定與執行管理辦法",
    chapters: [
      {
        name: "第一章　總則",
        articles: [
          {
            number: "第一條",
            title: "（目的）",
            body: "為確保機構年度業務計畫之有效訂定、執行、追蹤及檢討，提升整體服務品質，制定本辦法。",
          },
          {
            number: "第二條",
            title: "（訂定原則）",
            body: "年度業務計畫應依機構使命與服務對象需求訂定，並納入法規要求、主管機關政策方向及前年度檢討改善事項。",
          },
        ],
      },
      {
        name: "第二章　計畫訂定",
        articles: [
          {
            number: "第三條",
            title: "（訂定時程）",
            body: "年度業務計畫應於每年十二月底前完成訂定，經業務負責人核定後，於次年一月公告並實施。",
          },
          {
            number: "第四條",
            title: "（計畫內容）",
            body: "年度業務計畫應涵蓋下列項目：\n一、年度目標與服務量預估\n二、服務品質改善指標（跌倒率、壓傷率、感染率等）\n三、人力資源發展計畫（招募、訓練）\n四、設施設備維護與更新計畫\n五、財務收支預算概估\n六、前年度缺失改善追蹤",
          },
          {
            number: "第五條",
            title: "（跨部門參與）",
            body: "計畫訂定應由護理、社工、行政等各職類代表共同參與，並以會議方式討論及確認，會議紀錄存檔備查。",
          },
        ],
      },
      {
        name: "第三章　執行與追蹤",
        articles: [
          {
            number: "第六條",
            title: "（月報追蹤）",
            body: "各項計畫應指定負責人員，每月填報執行進度。業務負責人每月審閱執行情形，落後項目應說明原因並提出改善措施。",
          },
          {
            number: "第七條",
            title: "（季度報告）",
            body: "每季應提出業務計畫執行報告，送服務品質改善會議討論，重大偏差需提出調整方案，並記錄於「業務計畫執行進度追蹤表」。",
          },
        ],
      },
      {
        name: "第四章　年度檢討",
        articles: [
          {
            number: "第八條",
            title: "（年終評估）",
            body: "每年十一月至十二月進行年度業務計畫成果評估，分析目標達成率、未達成原因及改善策略，作為次年計畫訂定之依據。",
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

export function buildNursingHomeItem3CustomSheets(): SheetData[] {
  return [buildBusinessPlanPolicy()];
}
