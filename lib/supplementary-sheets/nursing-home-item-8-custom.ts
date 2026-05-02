/**
 * 住宿型照顧機構評鑑項目 8「聘用工作人員設置情形」自訂補充分頁
 *
 * 新增 1 個工作分頁：
 *   1. 人力配置與排班規範
 */
import type { SheetData } from "../excel-template-builder";
import { buildPolicyDocSheet } from "./nursing-home-policy-template";

function buildStaffingPolicy(): SheetData {
  return buildPolicyDocSheet({
    name: "人力配置與排班規範",
    instTitle: "工作人員人力配置與排班管理規範",
    chapters: [
      {
        name: "第一章　總則",
        articles: [
          {
            number: "第一條",
            title: "（目的）",
            body: "為確保機構各職類工作人員之設置符合法定標準，排班合理，保障服務對象照護品質，依《長期照顧服務機構設立許可及管理辦法》及相關規定制定本規範。",
          },
        ],
      },
      {
        name: "第二章　法定人力設置基準",
        articles: [
          {
            number: "第二條",
            title: "（護理人員設置）",
            body: "護理人員設置應符合：\n一、日班護病比：每___名服務對象配置 1 名護理師（依主管機關規定填入）\n二、夜班護病比：每___名服務對象配置 1 名護理師\n三、護理長：專任 1 名（依床位數規定）\n每日排班確保各時段護病比達標，不足時應立即補位並通報負責人。",
          },
          {
            number: "第三條",
            title: "（社工師設置）",
            body: "社工師（社工員）依法設置，並持有社工師（員）證書及執業登錄；外縣市執業登錄者依規定辦理。負責個案管理、家屬溝通、社區資源連結及申訴受理。",
          },
          {
            number: "第四條",
            title: "（兼任專業人員）",
            body: "兼任人員（醫師、物理治療師、職能治療師、營養師）應依規定設置，並保存：\n一、聘用合約書（含到診日期、頻率）\n二、到勤紀錄表（每次服務簽名）\n三、各人員執業執照影本",
          },
          {
            number: "第五條",
            title: "（照顧服務員設置）",
            body: "照顧服務員應持有：照顧服務員訓練結業證書或同等資格。\n設置數量：依機構床位數及服務對象失能程度設置，日班及夜班均應符合服務對象照護需求。",
          },
        ],
      },
      {
        name: "第三章　排班管理",
        articles: [
          {
            number: "第六條",
            title: "（排班原則）",
            body: "排班應符合：\n一、各時段人力達法定設置基準\n二、避免連續超時工作（單次值班不超過十二小時，緊急情況除外）\n三、臨時請假應有備援人員安排\n四、排班表至少提前一週公告，並保存三個月備查",
          },
          {
            number: "第七條",
            title: "（假勤管理）",
            body: "工作人員請假應依機構請假規則辦理。護理師請假，業務負責人應確保補位，不得以護病比不達標方式維持照護。照顧服務員請假，由其他班次或備援人員補位。",
          },
        ],
      },
      {
        name: "第四章　附則",
        articles: [
          {
            number: "第八條",
            title: "（施行日期）",
            body: "本規範自核定日起施行。",
          },
        ],
      },
    ],
  });
}

export function buildNursingHomeItem8CustomSheets(): SheetData[] {
  return [buildStaffingPolicy()];
}
