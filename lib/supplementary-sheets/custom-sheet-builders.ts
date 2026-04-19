/**
 * 自訂補充分頁註冊表。
 *
 * 某些評鑑項目的補充文件內容（如政策條文、SOP 流程）無法套用 archetype
 * 式的表格版型，需要逐分頁客製。此註冊表讓 seed 腳本能在
 * `buildItemMultiSheetData` 的結果後方，串接該項目的客製分頁。
 */
import type { SheetData } from "../excel-template-builder";
import { buildDaycareItem3CustomSheets } from "./daycare-item-3-custom";
import { buildDaycareItem4CustomSheets } from "./daycare-item-4-custom";
import { buildDaycareItem24CustomSheets } from "./daycare-item-24-custom";
import { buildDaycareItem35CustomSheets } from "./daycare-item-35-custom";
import { buildDaycareItem45CustomSheets } from "./daycare-item-45-custom";

type CustomSheetBuilder = () => SheetData[];

/**
 * 以「機構類型 → 評鑑項目 id → 客製 builder」做兩層查找。
 */
const CUSTOM_SHEET_BUILDERS: Record<string, Record<number, CustomSheetBuilder>> = {
  daycare: {
    3:  buildDaycareItem3CustomSheets,
    4:  buildDaycareItem4CustomSheets,
    24: buildDaycareItem24CustomSheets,
    35: buildDaycareItem35CustomSheets,
    45: buildDaycareItem45CustomSheets,
  },
};

/**
 * 取得指定機構類型 + 項目 id 的自訂分頁；若無註冊則回傳空陣列。
 */
export function getCustomSheets(facilityType: string, itemId: number): SheetData[] {
  const builder = CUSTOM_SHEET_BUILDERS[facilityType]?.[itemId];
  return builder ? builder() : [];
}
