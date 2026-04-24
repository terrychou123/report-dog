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
import { buildHomeCareItem2CustomSheets } from "./home-care-item-2-custom";
import { buildHomeCareItem3CustomSheets } from "./home-care-item-3-custom";
import { buildHomeCareItem4CustomSheets } from "./home-care-item-4-custom";
import { buildHomeCareItem9CustomSheets } from "./home-care-item-9-custom";
import { buildHomeCareItem10CustomSheets } from "./home-care-item-10-custom";
import { buildHomeCareItem12CustomSheets } from "./home-care-item-12-custom";
import { buildHomeCareItem14CustomSheets } from "./home-care-item-14-custom";
import { buildHomeCareItem15CustomSheets } from "./home-care-item-15-custom";
import { buildHomeCareItem18CustomSheets } from "./home-care-item-18-custom";
import { buildHomeCareItem20CustomSheets } from "./home-care-item-20-custom";
import { buildHomeCareItem22CustomSheets } from "./home-care-item-22-custom";
import { buildHomeCareItem26CustomSheets } from "./home-care-item-26-custom";
import { buildHomeCareItem27CustomSheets } from "./home-care-item-27-custom";
import { buildHomeCareItem29CustomSheets } from "./home-care-item-29-custom";
import { buildHomeCareItem30CustomSheets } from "./home-care-item-30-custom";
import { buildNursingHomeItem65CustomSheets } from "./nursing-home-item-65-custom";

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
  "home-care": {
    2:  buildHomeCareItem2CustomSheets,
    3:  buildHomeCareItem3CustomSheets,
    4:  buildHomeCareItem4CustomSheets,
    9:  buildHomeCareItem9CustomSheets,
    10: buildHomeCareItem10CustomSheets,
    12: buildHomeCareItem12CustomSheets,
    14: buildHomeCareItem14CustomSheets,
    15: buildHomeCareItem15CustomSheets,
    18: buildHomeCareItem18CustomSheets,
    20: buildHomeCareItem20CustomSheets,
    22: buildHomeCareItem22CustomSheets,
    26: buildHomeCareItem26CustomSheets,
    27: buildHomeCareItem27CustomSheets,
    29: buildHomeCareItem29CustomSheets,
    30: buildHomeCareItem30CustomSheets,
  },
  "nursing-home": {
    65: buildNursingHomeItem65CustomSheets,
  },
};

/**
 * 取得指定機構類型 + 項目 id 的自訂分頁；若無註冊則回傳空陣列。
 */
export function getCustomSheets(facilityType: string, itemId: number): SheetData[] {
  const builder = CUSTOM_SHEET_BUILDERS[facilityType]?.[itemId];
  return builder ? builder() : [];
}

/**
 * 回傳指定機構類型已註冊客製 builder 的所有項目 id。
 */
export function listCustomSheetItemIds(facilityType: string): number[] {
  return Object.keys(CUSTOM_SHEET_BUILDERS[facilityType] ?? {}).map(Number);
}
