/**
 * 住宿型照顧機構評鑑項目 59「服務對象自主選擇及參與決策」自訂補充分頁
 *
 * 新增 1 個工作分頁：
 *   1. 服務對象自主決定辦法
 *
 * 115 年度新增：認知障礙個案之自主能力維持（D5 重新詮釋）
 */
import type { SheetData } from "../excel-template-builder";
import { buildPolicyDocSheet } from "./nursing-home-policy-template";

function buildAutonomyPolicy(): SheetData {
  return buildPolicyDocSheet({
    name: "服務對象自主決定辦法",
    instTitle: "服務對象自主選擇及參與照護決策辦法",
    chapters: [
      {
        name: "第一章　總則",
        articles: [
          {
            number: "第一條",
            title: "（目的）",
            body: "尊重服務對象之自主決定權，促進其積極參與照護計畫之制定，維持認知障礙個案之殘存自主能力，依 115 年度評鑑基準 D5 制定本辦法。",
          },
        ],
      },
      {
        name: "第二章　日常生活自主選擇",
        articles: [
          {
            number: "第二條",
            title: "（選擇範疇）",
            body: "應尊重服務對象在以下日常生活事項之自主選擇：\n一、起床及就寢時間（在合理範圍內）\n二、飲食選擇（食物偏好、飲食習慣）\n三、活動及休閒安排（參與或拒絕特定活動）\n四、就寢前個人習慣（如廁、清潔程序）\n五、訪客接待（決定見或不見特定訪客）",
          },
          {
            number: "第三條",
            title: "（記錄服務對象偏好）",
            body: "護理師或社工師應於入住評估時詳細記錄服務對象之生活習慣及偏好，納入個別化服務計畫，並定期更新。工作人員在日常照護中應遵循計畫中的偏好資訊。",
          },
        ],
      },
      {
        name: "第三章　醫療決策參與",
        articles: [
          {
            number: "第四條",
            title: "（知情同意）",
            body: "進行任何重大醫療或照護措施前，應向服務對象（及家屬）說明：\n一、建議措施之目的及預期效果\n二、可能之風險及副作用\n三、替代方案\n四、拒絕的後果\n確認理解後取得書面知情同意。",
          },
          {
            number: "第五條",
            title: "（認知障礙個案）",
            body: "對認知障礙服務對象：\n一、評估其在特定決策上之理解及表達能力（行為觀察法）\n二、優先尊重其可理解範圍內的偏好表達（如點頭/搖頭）\n三、決策能力不足時，由法定代理人（配偶、子女）代為決策\n四、維持其殘存自主能力（如選擇要穿哪件衣服）",
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

export function buildNursingHomeItem59CustomSheets(): SheetData[] {
  return [buildAutonomyPolicy()];
}
