/**
 * 住宿型照顧機構評鑑項目 66「扣分③：評鑑期間之違規及重大負面事件」自訂補充分頁
 *
 * 新增 2 個工作分頁：
 *   1. 違規及重大負面事件處理 SOP
 *   2. 違規事件紀錄與檢討表
 *
 * 115 年度扣分項目（-2 分）：評鑑期間有違規或重大負面事件
 * 目的：提供機構主動管理違規風險之文件
 * 注意：此項目在 nursingHomeDefs 無 key，所有內容來自本 custom builder。
 */
import type { SheetData } from "../excel-template-builder";
import { buildPolicyDocSheet } from "./nursing-home-policy-template";
import { buildTableSheet } from "./sheet-style-kit";

function buildViolationHandlingSop(): SheetData {
  return buildPolicyDocSheet({
    name: "違規及重大負面事件處理SOP",
    instTitle: "違規及重大負面事件預防與處理標準作業程序（SOP）",
    metaNote: "本 SOP 目的在於主動預防評鑑期間發生扣分事件，並確保發生後之妥善處理\n核定日期：中華民國　　年　　月　　日　　核定人：___________（負責人）",
    chapters: [
      {
        name: "第一章　違規及重大負面事件定義",
        articles: [
          {
            number: "第一條",
            title: "（扣分事件類型）",
            body: "依 115 年度評鑑基準，下列事項屬扣分項目（-2 分）：\n一、超收費用（超出公告收費標準）\n二、違規廣告（不實或誇大宣傳）\n三、違規使用空間（未申報用途與實際不符）\n四、服務對象人身安全受侵害事件（工作人員不當對待）\n五、評鑑期間資料造假或重大不實申報\n六、其他違反長照服務法規之事項",
          },
        ],
      },
      {
        name: "第二章　預防措施",
        articles: [
          {
            number: "第二條",
            title: "（評鑑前自主查核）",
            body: "每年評鑑前（至少提前三個月）由業務負責人帶領進行自主查核：\n一、收費明細表是否符合公告標準\n二、行銷及招募宣傳材料是否符合法規（無誇大或不實內容）\n三、機構空間使用是否符合申請用途\n四、服務對象人身安全及尊嚴保護機制是否落實\n查核紀錄保存並提送服務品質改善會議。",
          },
          {
            number: "第三條",
            title: "（工作人員合規教育）",
            body: "每年辦理法規遵循教育訓練，確保工作人員了解：\n一、長照機構收費規定\n二、禁止對服務對象不當對待之法律義務\n三、廣告宣傳內容之法規限制\n四、資料申報之誠實義務",
          },
        ],
      },
      {
        name: "第三章　事件發生後處理",
        articles: [
          {
            number: "第四條",
            title: "（立即處置）",
            body: "重大負面事件發生後，業務負責人應立即：\n一、確認事件事實及影響範圍\n二、採取保護服務對象安全之措施（如隔離涉嫌人員）\n三、依規定時限向主管機關通報\n四、通知服務對象家屬\n五、保存相關書面及影像紀錄",
          },
          {
            number: "第五條",
            title: "（主動通報）",
            body: "機構應在事件發現後，依主管機關規定時限主動通報（不等待主管機關查核）。主動通報可彰顯機構合規意識，並爭取主動改善空間。通報紀錄留存備查。",
          },
          {
            number: "第六條",
            title: "（根本原因分析）",
            body: "事件結束後十四個工作日內，召開事件檢討會議，進行根本原因分析，訂定具體改善措施，確保同類事件不再發生。分析結果納入下一年度風險管理計畫。",
          },
        ],
      },
      {
        name: "第四章　附則",
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

function buildViolationRecordSheet(): SheetData {
  return buildTableSheet({
    sheetName: "違規事件紀錄與檢討表",
    title: "違規及重大負面事件紀錄與檢討表",
    note: "115 年度衛福部住宿型機構評鑑扣分項目③（-2 分）｜主動記錄並改善任何違規或負面事件，避免評鑑期間發生",
    headers: [
      "發現日期",
      "事件類型",
      "事件描述",
      "影響對象",
      "主管機關通報（Y/N 及時間）",
      "家屬通知（Y/N 及時間）",
      "立即處置措施",
      "根本原因分析",
      "改善措施",
      "改善期限",
      "驗證結果",
    ],
    samples: [
      [
        "115/02/20",
        "收費爭議",
        "服務對象家屬反映部分費用項目說明不清",
        "服務對象○○○及家屬",
        "N（非法定通報事項，內部處理）",
        "Y（115/02/20）",
        "與家屬說明費用明細，提供完整費用清單",
        "費用說明文件不夠清晰",
        "重新設計費用說明書，增加逐項說明欄位",
        "115/03/20",
        "已完成，家屬確認滿意",
      ],
    ],
    blankRows: 8,
    columnWidths: [90, 110, 180, 100, 130, 120, 160, 160, 160, 90, 110],
  });
}

export function buildNursingHomeItem66CustomSheets(): SheetData[] {
  return [buildViolationHandlingSop(), buildViolationRecordSheet()];
}
