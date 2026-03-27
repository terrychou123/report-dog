/**
 * Type definitions for supplementary document template sheets.
 * Each evaluation item (基準) generates one checklist sheet (檢核表) plus
 * zero or more supplementary document templates derived from its criteria (基準說明).
 */

/**
 * Document archetypes — each maps to a specific layout pattern.
 * daily-record:        Date-indexed rows (飲食紀錄, 體溫紀錄, 服藥紀錄)
 * case-assessment:     Patient assessment form (身體評估, 認知評估, 吞嚥評估)
 * inspection-checklist: Pass/fail inspection sheet (環境衛生, 設備點檢, 安全查核)
 * incident-log:        Event/incident record (緊急事件, 跌倒紀錄, 投訴紀錄)
 * meeting-minutes:     Meeting record (個案研討, 家屬會議, 工作會報)
 * training-record:     Staff training log (教育訓練, 在職訓練)
 * inventory-list:      Asset or resource roster (藥物清冊, 設備清單, 人員名冊)
 * care-plan:           Structured care plan (照顧計畫, 復健計畫, 出院計畫)
 */
export type SheetArchetype =
  | 'daily-record'
  | 'case-assessment'
  | 'inspection-checklist'
  | 'incident-log'
  | 'meeting-minutes'
  | 'training-record'
  | 'inventory-list'
  | 'care-plan';

export type ColumnDef = {
  header: string;
  /** Width in pixels. Default varies by archetype. */
  width?: number;
};

export type SupplementarySheetDef = {
  /** Tab name shown in the workbook, e.g. "每日飲食紀錄表" */
  sheetName: string;
  archetype: SheetArchetype;
  columns: ColumnDef[];
  /**
   * Which criteria index (0-based) in item.criteria this sheet supports.
   * Used for documentation/traceability; not enforced at runtime.
   */
  criteriaIndex?: number;
  /** How many pre-filled empty data rows to create. Defaults to 5. */
  prefillRows?: number;
};

/**
 * Map from evaluation item id to its supplementary sheet definitions.
 * Items with no supplementary sheets (e.g. purely behavioural criteria) are omitted.
 */
export type SupplementaryDefsMap = Record<number, SupplementarySheetDef[]>;
