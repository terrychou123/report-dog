/**
 * 居家護理所評鑑補充文件定義
 * 115年度居家護理所評鑑基準（8項）
 */
import type { SupplementaryDefsMap } from '../supplementary-sheet-types';

export const homeNursingDefs: SupplementaryDefsMap = {

  /** 1. A1 社區資源盤點與運用 */
  1: [
    {
      sheetName: '社區資源清單',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '資源類別', width: 120 },
        { header: '機構/單位名稱', width: 180 },
        { header: '服務項目', width: 180 },
        { header: '聯絡方式', width: 150 },
        { header: '更新日期', width: 100 },
        { header: '備註', width: 130 },
      ],
    },
    {
      sheetName: '轉介追蹤記錄表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      columns: [
        { header: '轉介日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '轉介原因', width: 180 },
        { header: '轉介單位', width: 160 },
        { header: '追蹤日期', width: 100 },
        { header: '追蹤結果', width: 180 },
        { header: '轉介人員', width: 100 },
      ],
    },
  ],

  /** 2. A2 感染管制作業與器材維護管理 */
  2: [
    {
      sheetName: '感染管制作業查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      columns: [
        { header: '查核日期', width: 100 },
        { header: '查核項目', width: 260 },
        { header: '符合', width: 70 },
        { header: '不符合', width: 80 },
        { header: '改善措施', width: 200 },
        { header: '查核人員', width: 100 },
      ],
    },
    {
      sheetName: '醫療器材盤點維護記錄表',
      archetype: 'inventory-list',
      criteriaIndex: 3,
      prefillRows: 8,
      columns: [
        { header: '器材名稱', width: 160 },
        { header: '型號/序號', width: 140 },
        { header: '盤點日期', width: 100 },
        { header: '維護/校正日期', width: 130 },
        { header: '狀態', width: 100 },
        { header: '下次維護日期', width: 130 },
        { header: '負責人員', width: 100 },
      ],
    },
    {
      sheetName: '醫療廢棄物處理記錄表',
      archetype: 'daily-record',
      criteriaIndex: 2,
      columns: [
        { header: '處理日期', width: 100 },
        { header: '廢棄物類別', width: 150 },
        { header: '數量/重量', width: 110 },
        { header: '清除廠商', width: 150 },
        { header: '清除單號', width: 120 },
        { header: '負責人員', width: 100 },
      ],
    },
  ],

  /** 3. A3 居家訪視人員安全管理 */
  3: [
    {
      sheetName: '人員安全事件通報記錄表',
      archetype: 'incident-log',
      criteriaIndex: 1,
      columns: [
        { header: '事件日期', width: 100 },
        { header: '當事人員', width: 110 },
        { header: '事件類型', width: 140 },
        { header: '事件描述', width: 240 },
        { header: '緊急處置', width: 180 },
        { header: '通報主管', width: 90 },
        { header: '後續追蹤', width: 160 },
        { header: '改善措施', width: 180 },
      ],
    },
  ],

  /** 4. A4 個案緊急或意外事件處理 */
  4: [
    {
      sheetName: '個案緊急事件處理記錄表',
      archetype: 'incident-log',
      criteriaIndex: 1,
      columns: [
        { header: '事件日期', width: 100 },
        { header: '事件時間', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '事件類型', width: 150 },
        { header: '事件描述', width: 240 },
        { header: '緊急處置措施', width: 200 },
        { header: '家屬通知時間', width: 130 },
        { header: '後續追蹤', width: 160 },
        { header: '通報人員', width: 100 },
      ],
    },
  ],

  /** 5. A5 機構經營指標監測與持續改善 */
  5: [
    {
      sheetName: '品質指標監測分析報告表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      prefillRows: 5,
      columns: [
        { header: '監測期別', width: 110 },
        { header: '品質指標名稱（官方固定 5 項）', width: 220 },
        { header: '計算方式', width: 180 },
        { header: '本期數值', width: 100 },
        { header: '閾值', width: 90 },
        { header: '達標(是/否)', width: 100 },
        { header: '改善計畫', width: 200 },
        { header: '填報人員', width: 100 },
      ],
      // 115年度官方規定之 5 項固定指標名稱（不可自行替換）
      prefillCells: [
        { row: 0, col: 1, value: '平均個案管理人數' },
        { row: 1, col: 1, value: '護理人員離職率' },
        { row: 2, col: 1, value: '個案非計畫性住院率' },
        { row: 3, col: 1, value: '個案急診使用率' },
        { row: 4, col: 1, value: '皮膚損傷發生率' },
      ],
    },
  ],

  /** 7. B2 個案照護管理 */
  7: [
    {
      sheetName: '個案全人評估表',
      archetype: 'case-assessment',
      criteriaIndex: 1,
      prefillRows: 3,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '評估日期', width: 100 },
        { header: '生理狀況', width: 160 },
        { header: '心理狀況', width: 150 },
        { header: '社會支持', width: 150 },
        { header: '功能狀況', width: 150 },
        { header: '評估結論', width: 180 },
        { header: '評估人員', width: 100 },
      ],
    },
    {
      sheetName: '個別化照護計畫書',
      archetype: 'care-plan',
      criteriaIndex: 2,
      prefillRows: 4,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '計畫日期', width: 100 },
        { header: '照護問題', width: 180 },
        { header: '照護目標', width: 180 },
        { header: '照護措施', width: 200 },
        { header: '負責人員', width: 100 },
        { header: '評值日期', width: 100 },
        { header: '評值結果', width: 160 },
      ],
    },
  ],
};
