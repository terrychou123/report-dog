/**
 * 日照評鑑項目 4「個人資料管理與保密性」自訂補充分頁
 *
 * 共產生 2 個工作分頁：肖像權意願書、個人資料授權同意書
 * （內容來自項目 3 定型化契約附件，去除「附件X：」前綴後移植）
 */
import type { SheetData } from "../excel-template-builder";
import { buildAnnex1Sheet, buildAnnex2Sheet } from "./daycare-item-3-custom";

export function buildDaycareItem4CustomSheets(): SheetData[] {
  return [
    buildAnnex1Sheet({ sheetName: "肖像權意願書", titleText: "肖像授權意願書" }),
    buildAnnex2Sheet({ sheetName: "個人資料授權同意書", titleText: "個人資料授權同意書" }),
  ];
}
