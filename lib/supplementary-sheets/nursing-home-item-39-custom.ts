/**
 * 住宿型照顧機構評鑑項目 39「建築物安全維護」自訂補充分頁
 *
 * 新增 1 個工作分頁：
 *   1. 建築物安全自主管理辦法
 */
import type { SheetData } from "../excel-template-builder";
import { buildPolicyDocSheet } from "./nursing-home-policy-template";

function buildBuildingSafetyPolicy(): SheetData {
  return buildPolicyDocSheet({
    name: "建築物安全自主管理辦法",
    instTitle: "建築物安全維護自主管理辦法",
    chapters: [
      {
        name: "第一章　總則",
        articles: [
          {
            number: "第一條",
            title: "（目的）",
            body: "為確保機構建築物之安全、符合法定標準，定期維護設施設備，保障服務對象及工作人員安全，依《建築法》及相關規定制定本辦法。",
          },
        ],
      },
      {
        name: "第二章　定期申報及檢查",
        articles: [
          {
            number: "第二條",
            title: "（公共安全申報）",
            body: "機構應依《建築法》規定，委請合格建築師或相關技師每年（或主管機關規定之頻率）辦理「公共安全申報」，申報結果存檔並依期限向建管機關申報，不得逾期。",
          },
          {
            number: "第三條",
            title: "（設施定期自主檢查）",
            body: "行政組應每月進行建築物安全自主巡查，查核項目包含：\n一、結構安全（牆面龜裂、地板沉陷、天花板滲漏）\n二、無障礙設施（斜坡道、扶手、輪椅迴轉空間）\n三、逃生門通暢性\n四、防火門閉門器功能\n五、緊急照明燈及出口指示燈\n巡查結果填入「建築物安全維護定期檢查表」。",
          },
        ],
      },
      {
        name: "第三章　維護保養",
        articles: [
          {
            number: "第四條",
            title: "（設備保養計畫）",
            body: "機構應訂定年度設施設備保養計畫，涵蓋：\n一、電梯半年保養（由合格廠商執行並取得保養紀錄）\n二、空調系統每季保養\n三、緊急廣播及消防設備半年保養\n四、水電管線每年定期檢查",
          },
          {
            number: "第五條",
            title: "（缺失修繕）",
            body: "巡查發現安全缺失，應依緊急程度分類：\n一、立即性安全威脅（如結構破損、逃生門鎖死）：二十四小時內啟動修繕\n二、一般缺失：七個工作日內完成修繕並紀錄\n修繕完成後業務負責人驗收確認。",
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

export function buildNursingHomeItem39CustomSheets(): SheetData[] {
  return [buildBuildingSafetyPolicy()];
}
