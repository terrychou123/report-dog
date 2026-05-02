/**
 * 住宿型照顧機構評鑑項目 32「疫苗注射服務」自訂補充分頁
 *
 * 新增 2 個工作分頁：
 *   1. 疫苗接種服務政策
 *   2. 疫苗異常反應通報表
 */
import type { SheetData } from "../excel-template-builder";
import { buildPolicyDocSheet } from "./nursing-home-policy-template";
import { buildTableSheet } from "./sheet-style-kit";

function buildVaccinationPolicy(): SheetData {
  return buildPolicyDocSheet({
    name: "疫苗接種服務政策",
    instTitle: "服務對象疫苗接種服務政策",
    chapters: [
      {
        name: "第一章　總則",
        articles: [
          {
            number: "第一條",
            title: "（目的）",
            body: "為提升服務對象對疫苗可預防疾病之保護力，積極辦理定期疫苗接種，並確保接種安全，制定本政策。",
          },
        ],
      },
      {
        name: "第二章　疫苗種類與頻率",
        articles: [
          {
            number: "第二條",
            title: "（流感疫苗）",
            body: "流感疫苗每年辦理一次（通常於每年十至十一月），目標為全體服務對象（除醫師評估有禁忌症者外）。接種率目標 ≥ 75%。機構應同時提供工作人員流感疫苗接種。",
          },
          {
            number: "第三條",
            title: "（其他疫苗）",
            body: "依醫師評估及疾管署建議，視情況辦理：\n一、肺炎鏈球菌疫苗（未接種之老年人優先）\n二、COVID-19 疫苗（依疾管署公告時程）\n三、帶狀疱疹疫苗（年齡及符合條件者）",
          },
        ],
      },
      {
        name: "第三章　接種程序",
        articles: [
          {
            number: "第四條",
            title: "（接種前評估）",
            body: "每次接種前，護理師應：\n一、確認服務對象健康狀況（無急性發燒、急性病）\n二、確認過敏史（尤其對蛋或疫苗成份）\n三、取得服務對象或家屬之知情同意\n四、核對禁忌症（依疫苗說明書）",
          },
          {
            number: "第五條",
            title: "（接種後觀察）",
            body: "接種後應觀察至少三十分鐘，注意局部及全身反應。發現疑似嚴重過敏反應（蕁麻疹、呼吸困難、血壓下降）應立即急救並通知醫師及送醫。",
          },
        ],
      },
      {
        name: "第四章　拒絕接種處理",
        articles: [
          {
            number: "第六條",
            title: "（拒絕接種）",
            body: "服務對象或家屬拒絕接種時，護理師應說明接種之重要性及風險，並記錄拒絕原因，請服務對象或家屬簽署「疫苗拒絕接種聲明書」。拒絕接種者不得強迫。",
          },
        ],
      },
      {
        name: "第五章　附則",
        articles: [
          {
            number: "第七條",
            title: "（施行日期）",
            body: "本政策自核定日起施行。",
          },
        ],
      },
    ],
  });
}

function buildVaccineAdverseEventSheet(): SheetData {
  return buildTableSheet({
    sheetName: "疫苗異常反應通報表",
    title: "疫苗接種後異常反應通報紀錄表",
    note: "115 年度衛福部住宿型機構評鑑 B23 項目｜接種後出現疑似不良反應時填寫，嚴重反應應通報疾管署",
    headers: [
      "接種日期",
      "服務對象姓名",
      "接種疫苗種類",
      "廠牌及批號",
      "接種部位",
      "接種護理師",
      "發現反應日期時間",
      "反應類型",
      "反應描述",
      "處置措施",
      "轉醫院（Y/N）",
      "疾管署通報（Y/N）",
      "預後結果",
    ],
    samples: [
      [
        "115/10/20",
        "○○○",
        "流感疫苗",
        "○○廠 批號：XXXXXX",
        "左手臂",
        "護理師○○○",
        "115/10/20 15:30",
        "局部紅腫熱痛",
        "接種部位紅腫約 5 公分",
        "冰敷，觀察無惡化",
        "N",
        "N（局部反應，未達通報標準）",
        "48 小時後自行緩解",
      ],
    ],
    blankRows: 10,
    columnWidths: [90, 90, 110, 130, 90, 100, 120, 120, 160, 130, 90, 130, 120],
  });
}

export function buildNursingHomeItem32CustomSheets(): SheetData[] {
  return [buildVaccinationPolicy(), buildVaccineAdverseEventSheet()];
}
