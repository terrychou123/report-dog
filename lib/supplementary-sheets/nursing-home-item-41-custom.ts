/**
 * 住宿型照顧機構評鑑項目 41「浴廁及盥洗設備安全」自訂補充分頁
 *
 * 新增 1 個工作分頁：
 *   1. 浴廁清潔消毒作業 SOP
 */
import type { SheetData } from "../excel-template-builder";
import { buildPolicyDocSheet } from "./nursing-home-policy-template";

function buildBathroomCleaningSop(): SheetData {
  return buildPolicyDocSheet({
    name: "浴廁清潔消毒作業 SOP",
    instTitle: "浴廁及盥洗設備清潔消毒作業標準作業程序（SOP）",
    chapters: [
      {
        name: "第一章　總則",
        articles: [
          {
            number: "第一條",
            title: "（目的）",
            body: "為維護浴廁及盥洗設備之清潔衛生，預防跌倒及感染，確保服務對象如廁安全，制定本 SOP。",
          },
        ],
      },
      {
        name: "第二章　清潔作業",
        articles: [
          {
            number: "第二條",
            title: "（清潔頻率）",
            body: "浴廁清潔頻率：\n一、馬桶、扶手、水龍頭等高接觸面：每日至少清潔消毒兩次（早晚班）\n二、地板：每日至少一次，使用後即時清理水漬防滑\n三、浴缸或沐浴椅：每次使用後立即清潔消毒\n四、每週大掃除：全面清潔含排水孔、角落及牆壁",
          },
          {
            number: "第三條",
            title: "（清潔劑及消毒劑）",
            body: "使用原則：\n一、一般清潔：中性清潔劑，配合清水沖洗\n二、消毒：含氯消毒劑（次氯酸鈉，有效濃度 500 ppm）或醫院級次氯酸水\n三、有感染個案時：加強消毒頻率至每次使用後，並使用 1000 ppm 含氯消毒劑\n四、消毒劑應依製造商指示稀釋並確保接觸時間",
          },
          {
            number: "第四條",
            title: "（個人防護）",
            body: "執行浴廁清潔之工作人員應配戴：防水手套、防水圍裙（視需要），清潔完成後脫除手套並執行手部衛生。",
          },
        ],
      },
      {
        name: "第三章　安全設施維護",
        articles: [
          {
            number: "第五條",
            title: "（每日安全確認）",
            body: "照顧服務員每日確認：\n一、防滑墊/防滑地板乾燥且完整（無破損、捲起）\n二、扶手固定牢固（無鬆動）\n三、緊急呼叫系統（拉繩/按鈕）功能正常\n四、溫控設備（恆溫熱水器）設定正確（水溫不超過 42°C）\n發現問題應立即通報行政組維修，並暫停使用問題浴廁。",
          },
        ],
      },
      {
        name: "第四章　紀錄",
        articles: [
          {
            number: "第六條",
            title: "（清潔紀錄）",
            body: "每次清潔作業後填寫「浴廁清潔消毒紀錄表」，記錄清潔時間、使用消毒劑及執行人員。護理長每週抽查一次清潔紀錄及實際清潔狀況。",
          },
        ],
      },
      {
        name: "第五章　附則",
        articles: [
          {
            number: "第七條",
            title: "（施行日期）",
            body: "本 SOP 自核定日起施行。",
          },
        ],
      },
    ],
  });
}

export function buildNursingHomeItem41CustomSheets(): SheetData[] {
  return [buildBathroomCleaningSop()];
}
