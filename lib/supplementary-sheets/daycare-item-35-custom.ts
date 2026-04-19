/**
 * 日照評鑑項目 35「意外或緊急事件處理情形」自訂補充分頁
 *
 * 共產生 1 個工作分頁：緊急事故處理同意書
 * （內容來自項目 3 定型化契約附件五，去除「附件五：」前綴後移植）
 */
import type { SheetData } from "../excel-template-builder";
import { buildAnnex5Sheet } from "./daycare-item-3-custom";

export function buildDaycareItem35CustomSheets(): SheetData[] {
  return [
    buildAnnex5Sheet({ sheetName: "緊急事故處理同意書", titleText: "緊急事故處理同意書" }),
  ];
}
