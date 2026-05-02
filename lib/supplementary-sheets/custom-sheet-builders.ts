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
import { buildNursingHomeItem1CustomSheets } from "./nursing-home-item-1-custom";
import { buildNursingHomeItem2CustomSheets } from "./nursing-home-item-2-custom";
import { buildNursingHomeItem3CustomSheets } from "./nursing-home-item-3-custom";
import { buildNursingHomeItem4CustomSheets } from "./nursing-home-item-4-custom";
import { buildNursingHomeItem5CustomSheets } from "./nursing-home-item-5-custom";
import { buildNursingHomeItem6CustomSheets } from "./nursing-home-item-6-custom";
import { buildNursingHomeItem7CustomSheets } from "./nursing-home-item-7-custom";
import { buildNursingHomeItem8CustomSheets } from "./nursing-home-item-8-custom";
import { buildNursingHomeItem9CustomSheets } from "./nursing-home-item-9-custom";
import { buildNursingHomeItem10CustomSheets } from "./nursing-home-item-10-custom";
import { buildNursingHomeItem11CustomSheets } from "./nursing-home-item-11-custom";
import { buildNursingHomeItem12CustomSheets } from "./nursing-home-item-12-custom";
import { buildNursingHomeItem13CustomSheets } from "./nursing-home-item-13-custom";
import { buildNursingHomeItem14CustomSheets } from "./nursing-home-item-14-custom";
import { buildNursingHomeItem15CustomSheets } from "./nursing-home-item-15-custom";
import { buildNursingHomeItem16CustomSheets } from "./nursing-home-item-16-custom";
import { buildNursingHomeItem17CustomSheets } from "./nursing-home-item-17-custom";
import { buildNursingHomeItem18CustomSheets } from "./nursing-home-item-18-custom";
import { buildNursingHomeItem19CustomSheets } from "./nursing-home-item-19-custom";
import { buildNursingHomeItem20CustomSheets } from "./nursing-home-item-20-custom";
import { buildNursingHomeItem21CustomSheets } from "./nursing-home-item-21-custom";
import { buildNursingHomeItem22CustomSheets } from "./nursing-home-item-22-custom";
import { buildNursingHomeItem23CustomSheets } from "./nursing-home-item-23-custom";
import { buildNursingHomeItem24CustomSheets } from "./nursing-home-item-24-custom";
import { buildNursingHomeItem25CustomSheets } from "./nursing-home-item-25-custom";
import { buildNursingHomeItem26CustomSheets } from "./nursing-home-item-26-custom";
import { buildNursingHomeItem27CustomSheets } from "./nursing-home-item-27-custom";
import { buildNursingHomeItem28CustomSheets } from "./nursing-home-item-28-custom";
import { buildNursingHomeItem29CustomSheets } from "./nursing-home-item-29-custom";
import { buildNursingHomeItem30CustomSheets } from "./nursing-home-item-30-custom";
import { buildNursingHomeItem31CustomSheets } from "./nursing-home-item-31-custom";
import { buildNursingHomeItem32CustomSheets } from "./nursing-home-item-32-custom";
import { buildNursingHomeItem33CustomSheets } from "./nursing-home-item-33-custom";
import { buildNursingHomeItem34CustomSheets } from "./nursing-home-item-34-custom";
import { buildNursingHomeItem35CustomSheets } from "./nursing-home-item-35-custom";
import { buildNursingHomeItem36CustomSheets } from "./nursing-home-item-36-custom";
import { buildNursingHomeItem37CustomSheets } from "./nursing-home-item-37-custom";
import { buildNursingHomeItem38CustomSheets } from "./nursing-home-item-38-custom";
import { buildNursingHomeItem39CustomSheets } from "./nursing-home-item-39-custom";
import { buildNursingHomeItem40CustomSheets } from "./nursing-home-item-40-custom";
import { buildNursingHomeItem41CustomSheets } from "./nursing-home-item-41-custom";
import { buildNursingHomeItem42CustomSheets } from "./nursing-home-item-42-custom";
import { buildNursingHomeItem43CustomSheets } from "./nursing-home-item-43-custom";
import { buildNursingHomeItem44CustomSheets } from "./nursing-home-item-44-custom";
import { buildNursingHomeItem45CustomSheets } from "./nursing-home-item-45-custom";
import { buildNursingHomeItem46CustomSheets } from "./nursing-home-item-46-custom";
import { buildNursingHomeItem47CustomSheets } from "./nursing-home-item-47-custom";
import { buildNursingHomeItem48CustomSheets } from "./nursing-home-item-48-custom";
import { buildNursingHomeItem49CustomSheets } from "./nursing-home-item-49-custom";
import { buildNursingHomeItem50CustomSheets } from "./nursing-home-item-50-custom";
import { buildNursingHomeItem51CustomSheets } from "./nursing-home-item-51-custom";
import { buildNursingHomeItem52CustomSheets } from "./nursing-home-item-52-custom";
import { buildNursingHomeItem53CustomSheets } from "./nursing-home-item-53-custom";
import { buildNursingHomeItem54CustomSheets } from "./nursing-home-item-54-custom";
import { buildNursingHomeItem55CustomSheets } from "./nursing-home-item-55-custom";
import { buildNursingHomeItem56CustomSheets } from "./nursing-home-item-56-custom";
import { buildNursingHomeItem57CustomSheets } from "./nursing-home-item-57-custom";
import { buildNursingHomeItem58CustomSheets } from "./nursing-home-item-58-custom";
import { buildNursingHomeItem59CustomSheets } from "./nursing-home-item-59-custom";
import { buildNursingHomeItem60CustomSheets } from "./nursing-home-item-60-custom";
import { buildNursingHomeItem61CustomSheets } from "./nursing-home-item-61-custom";
import { buildNursingHomeItem62CustomSheets } from "./nursing-home-item-62-custom";
import { buildNursingHomeItem63CustomSheets } from "./nursing-home-item-63-custom";
import { buildNursingHomeItem64CustomSheets } from "./nursing-home-item-64-custom";
import { buildNursingHomeItem65CustomSheets } from "./nursing-home-item-65-custom";
import { buildNursingHomeItem66CustomSheets } from "./nursing-home-item-66-custom";

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
    1:  buildNursingHomeItem1CustomSheets,
    2:  buildNursingHomeItem2CustomSheets,
    3:  buildNursingHomeItem3CustomSheets,
    4:  buildNursingHomeItem4CustomSheets,
    5:  buildNursingHomeItem5CustomSheets,
    6:  buildNursingHomeItem6CustomSheets,
    7:  buildNursingHomeItem7CustomSheets,
    8:  buildNursingHomeItem8CustomSheets,
    9:  buildNursingHomeItem9CustomSheets,
    10: buildNursingHomeItem10CustomSheets,
    11: buildNursingHomeItem11CustomSheets,
    12: buildNursingHomeItem12CustomSheets,
    13: buildNursingHomeItem13CustomSheets,
    14: buildNursingHomeItem14CustomSheets,
    15: buildNursingHomeItem15CustomSheets,
    16: buildNursingHomeItem16CustomSheets,
    17: buildNursingHomeItem17CustomSheets,
    18: buildNursingHomeItem18CustomSheets,
    19: buildNursingHomeItem19CustomSheets,
    20: buildNursingHomeItem20CustomSheets,
    21: buildNursingHomeItem21CustomSheets,
    22: buildNursingHomeItem22CustomSheets,
    23: buildNursingHomeItem23CustomSheets,
    24: buildNursingHomeItem24CustomSheets,
    25: buildNursingHomeItem25CustomSheets,
    26: buildNursingHomeItem26CustomSheets,
    27: buildNursingHomeItem27CustomSheets,
    28: buildNursingHomeItem28CustomSheets,
    29: buildNursingHomeItem29CustomSheets,
    30: buildNursingHomeItem30CustomSheets,
    31: buildNursingHomeItem31CustomSheets,
    32: buildNursingHomeItem32CustomSheets,
    33: buildNursingHomeItem33CustomSheets,
    34: buildNursingHomeItem34CustomSheets,
    35: buildNursingHomeItem35CustomSheets,
    36: buildNursingHomeItem36CustomSheets,
    37: buildNursingHomeItem37CustomSheets,
    38: buildNursingHomeItem38CustomSheets,
    39: buildNursingHomeItem39CustomSheets,
    40: buildNursingHomeItem40CustomSheets,
    41: buildNursingHomeItem41CustomSheets,
    42: buildNursingHomeItem42CustomSheets,
    43: buildNursingHomeItem43CustomSheets,
    44: buildNursingHomeItem44CustomSheets,
    45: buildNursingHomeItem45CustomSheets,
    46: buildNursingHomeItem46CustomSheets,
    47: buildNursingHomeItem47CustomSheets,
    48: buildNursingHomeItem48CustomSheets,
    49: buildNursingHomeItem49CustomSheets,
    50: buildNursingHomeItem50CustomSheets,
    51: buildNursingHomeItem51CustomSheets,
    52: buildNursingHomeItem52CustomSheets,
    53: buildNursingHomeItem53CustomSheets,
    54: buildNursingHomeItem54CustomSheets,
    55: buildNursingHomeItem55CustomSheets,
    56: buildNursingHomeItem56CustomSheets,
    57: buildNursingHomeItem57CustomSheets,
    58: buildNursingHomeItem58CustomSheets,
    59: buildNursingHomeItem59CustomSheets,
    60: buildNursingHomeItem60CustomSheets,
    61: buildNursingHomeItem61CustomSheets,
    62: buildNursingHomeItem62CustomSheets,
    63: buildNursingHomeItem63CustomSheets,
    64: buildNursingHomeItem64CustomSheets,
    65: buildNursingHomeItem65CustomSheets,
    66: buildNursingHomeItem66CustomSheets,
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
