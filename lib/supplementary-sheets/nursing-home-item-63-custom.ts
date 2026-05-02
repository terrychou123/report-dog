/**
 * 住宿型照顧機構評鑑項目 63「服務對象宗教信仰及文化需求」自訂補充分頁
 *
 * 新增 1 個工作分頁：
 *   1. 宗教文化照護辦法
 *
 * 115 年度 D9：新增宗教信仰及文化需求（含多元文化及族群適切照護）
 */
import type { SheetData } from "../excel-template-builder";
import { buildPolicyDocSheet } from "./nursing-home-policy-template";

function buildReligiousCulturalCarePolicy(): SheetData {
  return buildPolicyDocSheet({
    name: "宗教文化照護辦法",
    instTitle: "服務對象宗教信仰及文化需求照護辦法",
    chapters: [
      {
        name: "第一章　總則",
        articles: [
          {
            number: "第一條",
            title: "（目的）",
            body: "尊重服務對象之宗教信仰、文化背景及族群習俗，提供文化敏感度照護，使服務對象在機構中仍能維持信仰生活及文化認同，依 115 年度評鑑基準 D9 制定本辦法。",
          },
        ],
      },
      {
        name: "第二章　評估與記錄",
        articles: [
          {
            number: "第二條",
            title: "（入住評估）",
            body: "社工師於入住評估時，應了解並記錄：\n一、服務對象之宗教信仰（佛教、道教、基督宗教、伊斯蘭教、原住民傳統信仰等）\n二、重要宗教節日及儀式需求\n三、飲食禁忌（素食、清真食品 Halal 等）\n四、文化習俗（節日慶祝、祭祖習慣、語言偏好）\n評估結果納入個別化服務計畫。",
          },
        ],
      },
      {
        name: "第三章　照護措施",
        articles: [
          {
            number: "第三條",
            title: "（宗教活動支持）",
            body: "機構應支持服務對象之宗教實踐：\n一、提供靜思、祈禱之私人空間或安靜時段\n二、協助宗教讀物、念珠、聖像等宗教物品之放置\n三、配合宗教節日安排相關活動（如佛誕、聖誕、開齋節）\n四、邀請或安排宗教人士（神職人員、志工）定期到訪",
          },
          {
            number: "第四條",
            title: "（文化適切飲食）",
            body: "應依服務對象文化需求提供適切飲食：\n一、素食個案：提供全素或蛋奶素選項\n二、伊斯蘭清真飲食：確認食材及烹調方式符合清真標準\n三、節慶飲食：節日時提供傳統節慶食物（如清明粿、端午粽）\n四、原住民個案：尊重其傳統飲食習慣",
          },
          {
            number: "第五條",
            title: "（臨終靈性關懷）",
            body: "服務對象進入生命末期時，社工師應：\n一、主動詢問是否需要宗教人員到訪給予靈性關懷\n二、協助安排宗教儀式（臨終祈禱、念佛、灑聖水等）\n三、尊重服務對象對身後事之宗教及文化期望",
          },
        ],
      },
      {
        name: "第四章　多元文化能力",
        articles: [
          {
            number: "第六條",
            title: "（工作人員訓練）",
            body: "機構每年辦理文化敏感度及多元文化照護訓練，內容包括：\n一、台灣主要宗教信仰介紹\n二、原住民族及新住民文化習俗\n三、跨文化溝通技巧\n訓練記錄存檔。",
          },
        ],
      },
      {
        name: "第五章　附則",
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

export function buildNursingHomeItem63CustomSheets(): SheetData[] {
  return [buildReligiousCulturalCarePolicy()];
}
