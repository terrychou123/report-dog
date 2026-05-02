/**
 * 住宿型照顧機構評鑑項目 7「業務負責人資格及執業情形」自訂補充分頁
 *
 * 新增 1 個工作分頁：
 *   1. 負責人職責規定
 */
import type { SheetData } from "../excel-template-builder";
import { buildPolicyDocSheet } from "./nursing-home-policy-template";

function buildDirectorDutiesPolicy(): SheetData {
  return buildPolicyDocSheet({
    name: "負責人職責規定",
    instTitle: "業務負責人職責規定",
    chapters: [
      {
        name: "第一章　總則",
        articles: [
          {
            number: "第一條",
            title: "（目的）",
            body: "為明確業務負責人之職責範疇，確保其積極投入機構服務品質管理，依《長期照顧服務機構設立許可及管理辦法》相關規定，制定本規定。",
          },
          {
            number: "第二條",
            title: "（資格要求）",
            body: "業務負責人應符合下列資格之一，並取得主管機關同意：\n一、護理師（士）執照，並具備一定年資之長照機構照護管理經驗\n二、社工師執照，並具備相關資格條件\n三、其他依法令規定之資格",
          },
        ],
      },
      {
        name: "第二章　職責範疇",
        articles: [
          {
            number: "第三條",
            title: "（服務品質督導）",
            body: "業務負責人應：\n一、每月至少一次親自查看服務對象實際照護情形，並填寫「負責人月度巡查紀錄表」\n二、主持或參與服務品質改善會議\n三、審閱品質指標報告（跌倒率、壓傷率、感染率、非計畫性住院率等），指導改善",
          },
          {
            number: "第四條",
            title: "（危機處置決策）",
            body: "業務負責人應擔任重大危機事件之最終決策者，包括：緊急疏散決策、重大感染事件應變、媒體危機處理及向主管機關通報之責任人。",
          },
          {
            number: "第五條",
            title: "（工作人員管理）",
            body: "業務負責人應確保機構人力設置符合法定標準，並負責：\n一、核定年度教育訓練計畫\n二、批准新進人員之任用及不適任人員之處置\n三、調解工作人員重大勞資糾紛",
          },
          {
            number: "第六條",
            title: "（在職教育）",
            body: "業務負責人應每年完成主管機關或相關機構辦理之長照管理教育訓練至少十二小時，訓練紀錄保存於「負責人在職訓練紀錄表」。",
          },
        ],
      },
      {
        name: "第三章　代理",
        articles: [
          {
            number: "第七條",
            title: "（代理規定）",
            body: "業務負責人因故不在時，應指定具備適當資格之人員代理，並事先向主管機關備查（超過一個月以上之代理須依規定辦理）。代理期間代理人承擔相同職責。",
          },
        ],
      },
      {
        name: "第四章　附則",
        articles: [
          {
            number: "第八條",
            title: "（施行日期）",
            body: "本規定自核定日起施行。",
          },
        ],
      },
    ],
  });
}

export function buildNursingHomeItem7CustomSheets(): SheetData[] {
  return [buildDirectorDutiesPolicy()];
}
