/**
 * 身心障礙福利機構評鑑補充文件定義
 * 109年度身心障礙福利機構評鑑指標（49 項）
 */
import type { SupplementaryDefsMap } from '../supplementary-sheet-types';

export const disabilityWelfareDefs: SupplementaryDefsMap = {

  /** 1. 董（理）事會議會務執行及決策管理機制 (1101) */
  1: [
    {
      sheetName: '董（理）事會議紀錄追蹤表',
      archetype: 'meeting-minutes',
      criteriaIndex: 1,
      prefillRows: 4,
      columns: [
        { header: '會議日期', width: 100 },
        { header: '出席人數/應到人數', width: 150 },
        { header: '議案摘要', width: 220 },
        { header: '決議事項', width: 220 },
        { header: '函報日期', width: 100 },
        { header: '備註', width: 150 },
      ],
    },
  ],

  /** 2. 機構管理制度 (1102) */
  2: [
    {
      sheetName: '定期會議紀錄及追蹤管考表',
      archetype: 'meeting-minutes',
      criteriaIndex: 0,
      prefillRows: 6,
      columns: [
        { header: '會議日期', width: 100 },
        { header: '會議議題', width: 200 },
        { header: '決議事項', width: 220 },
        { header: '執行情形', width: 180 },
        { header: '追蹤結果', width: 180 },
        { header: '記錄人', width: 100 },
      ],
    },
  ],

  /** 3. 機構配合情形 (1103) */
  3: [
    {
      sheetName: '員工性侵害犯罪查閱記錄表',
      archetype: 'inventory-list',
      criteriaIndex: 2,
      prefillRows: 8,
      columns: [
        { header: '員工姓名', width: 120 },
        { header: '職稱', width: 120 },
        { header: '查閱日期', width: 100 },
        { header: '查閱方式', width: 150 },
        { header: '查閱結果', width: 150 },
        { header: '備註', width: 150 },
      ],
    },
  ],

  /** 4. 員工健康檢查情形 (1104) */
  4: [
    {
      sheetName: '員工健康檢查追蹤清冊',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '員工姓名', width: 120 },
        { header: '職稱', width: 120 },
        { header: '到職日期', width: 100 },
        { header: '健檢日期', width: 100 },
        { header: '檢查項目', width: 180 },
        { header: '檢查結果', width: 150 },
        { header: '備註', width: 150 },
      ],
    },
  ],

  /** 5. 員工訓練情形 (1105) */
  5: [
    {
      sheetName: '教育訓練出席紀錄表',
      archetype: 'training-record',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '訓練日期', width: 100 },
        { header: '課程名稱', width: 200 },
        { header: '訓練類型', width: 130 },
        { header: '參與人員', width: 160 },
        { header: '時數', width: 80 },
        { header: '效益評量', width: 150 },
        { header: '負責人員', width: 100 },
      ],
    },
  ],

  /** 6. 專業服務人力 (1106) */
  6: [
    {
      sheetName: '專業人力配置及人力比計算表',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '月份', width: 80 },
        { header: '社工人數', width: 100 },
        { header: '護理人數', width: 100 },
        { header: '教保/訓練員人數', width: 130 },
        { header: '生活服務員人數', width: 130 },
        { header: '服務對象人數', width: 130 },
        { header: '各類人力比', width: 150 },
      ],
    },
  ],

  /** 8. 會計制度 (2101) */
  8: [
    {
      sheetName: '專款專用帳戶管理表',
      archetype: 'inventory-list',
      criteriaIndex: 2,
      prefillRows: 4,
      columns: [
        { header: '帳戶名稱', width: 150 },
        { header: '帳戶用途', width: 180 },
        { header: '帳戶餘額', width: 120 },
        { header: '核對日期', width: 100 },
        { header: '核對人員', width: 100 },
        { header: '備註', width: 150 },
      ],
    },
  ],

  /** 10. 財物管理 (2103) */
  10: [
    {
      sheetName: '財產盤點紀錄表',
      archetype: 'inventory-list',
      criteriaIndex: 2,
      prefillRows: 10,
      columns: [
        { header: '財產編號', width: 100 },
        { header: '財產名稱', width: 160 },
        { header: '取得日期', width: 100 },
        { header: '放置位置', width: 150 },
        { header: '盤點日期', width: 100 },
        { header: '盤點結果', width: 130 },
        { header: '盤點人', width: 100 },
      ],
    },
  ],

  /** 16. 建築物公安及消防 (3105，核心指標) */
  16: [
    {
      sheetName: '消防設備檢修記錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
      prefillRows: 6,
      columns: [
        { header: '檢修日期', width: 100 },
        { header: '設備名稱', width: 160 },
        { header: '檢修結果', width: 130 },
        { header: '缺失描述', width: 180 },
        { header: '改善措施', width: 180 },
        { header: '檢修人員', width: 100 },
      ],
    },
    {
      sheetName: '用電設備自主檢查記錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 3,
      prefillRows: 12,
      columns: [
        { header: '檢查日期', width: 100 },
        { header: '檢查區域', width: 150 },
        { header: '檢查項目', width: 180 },
        { header: '檢查結果', width: 130 },
        { header: '異常描述', width: 180 },
        { header: '檢查人員', width: 100 },
      ],
    },
  ],

  /** 17. 緊急災害應變 (3106-1) */
  17: [
    {
      sheetName: '緊急災害演練紀錄表',
      archetype: 'training-record',
      criteriaIndex: 2,
      prefillRows: 4,
      columns: [
        { header: '演練日期', width: 100 },
        { header: '演練類型（日/夜）', width: 150 },
        { header: '參與人數', width: 100 },
        { header: '演練腳本摘要', width: 200 },
        { header: '演練過程描述', width: 220 },
        { header: '檢討改善事項', width: 200 },
        { header: '負責人員', width: 100 },
      ],
    },
  ],

  /** 22. 環境清潔衛生及廢棄物 (3110) */
  22: [
    {
      sheetName: '環境消毒紀錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
      prefillRows: 4,
      columns: [
        { header: '消毒日期', width: 100 },
        { header: '消毒範圍', width: 180 },
        { header: '消毒方式/藥劑', width: 180 },
        { header: '執行人員', width: 120 },
        { header: '備註', width: 150 },
      ],
    },
  ],

  /** 32. 個別化服務/支持計畫 (4101) */
  32: [
    {
      sheetName: 'ISP 個別化服務計畫追蹤表',
      archetype: 'care-plan',
      criteriaIndex: 0,
      prefillRows: 3,
      columns: [
        { header: '服務對象姓名', width: 130 },
        { header: '計畫起迄日期', width: 130 },
        { header: '短期目標', width: 200 },
        { header: '長期目標', width: 200 },
        { header: '執行進度', width: 150 },
        { header: '檢視日期', width: 100 },
        { header: '負責人員', width: 100 },
      ],
    },
    {
      sheetName: 'ISP 會議暨家屬參與紀錄',
      archetype: 'meeting-minutes',
      criteriaIndex: 1,
      columns: [
        { header: '服務對象姓名', width: 130 },
        { header: '會議日期', width: 100 },
        { header: '家屬（監護人）', width: 150 },
        { header: '討論重點', width: 220 },
        { header: '家屬意見', width: 180 },
        { header: '決議事項', width: 180 },
        { header: '負責社工', width: 100 },
      ],
    },
  ],

  /** 34. 服務目標之執行 (4103) */
  34: [
    {
      sheetName: '服務目標執行紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      prefillRows: 6,
      columns: [
        { header: '服務對象姓名', width: 130 },
        { header: '記錄日期', width: 100 },
        { header: '服務目標', width: 200 },
        { header: '執行內容', width: 220 },
        { header: '達成情形', width: 150 },
        { header: '記錄人員', width: 100 },
      ],
    },
  ],

  /** 35. 專業團隊服務模式 (4201) */
  35: [
    {
      sheetName: '個案研討紀錄表',
      archetype: 'meeting-minutes',
      criteriaIndex: 2,
      prefillRows: 4,
      columns: [
        { header: '研討日期', width: 100 },
        { header: '個案姓名', width: 120 },
        { header: '討論議題', width: 200 },
        { header: '參與專業人員', width: 180 },
        { header: '討論結果', width: 200 },
        { header: '後續追蹤', width: 180 },
      ],
    },
    {
      sheetName: '督導紀錄表',
      archetype: 'meeting-minutes',
      criteriaIndex: 3,
      columns: [
        { header: '督導日期', width: 100 },
        { header: '督導形式', width: 120 },
        { header: '督導內容', width: 220 },
        { header: '參與人員', width: 160 },
        { header: '結論/建議', width: 200 },
        { header: '負責督導', width: 100 },
      ],
    },
  ],

  /** 37. 特殊的支持措施 (4203) */
  37: [
    {
      sheetName: '行為觀察及支持策略紀錄表',
      archetype: 'care-plan',
      criteriaIndex: 0,
      prefillRows: 3,
      columns: [
        { header: '服務對象姓名', width: 130 },
        { header: '日期', width: 100 },
        { header: '行為描述', width: 200 },
        { header: '前事分析', width: 180 },
        { header: '支持策略', width: 220 },
        { header: '成效追蹤', width: 160 },
        { header: '記錄人員', width: 100 },
      ],
    },
  ],

  /** 44. 膳食服務 (4303) */
  44: [
    {
      sheetName: '食物檢體留樣紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 2,
      prefillRows: 7,
      columns: [
        { header: '日期', width: 100 },
        { header: '餐次', width: 80 },
        { header: '菜色名稱', width: 180 },
        { header: '留樣數量', width: 100 },
        { header: '冷藏溫度', width: 100 },
        { header: '丟棄日期', width: 100 },
        { header: '負責人員', width: 100 },
      ],
    },
  ],

  /** 46. 意外傷害或緊急事件處理 (4305) */
  46: [
    {
      sheetName: '意外傷害/緊急事件處理紀錄表',
      archetype: 'incident-log',
      criteriaIndex: 1,
      columns: [
        { header: '事件日期', width: 100 },
        { header: '服務對象姓名', width: 130 },
        { header: '事件類型', width: 150 },
        { header: '事件描述', width: 220 },
        { header: '處理過程', width: 220 },
        { header: '改善方案', width: 180 },
        { header: '追蹤紀錄', width: 180 },
        { header: '處理人員', width: 100 },
      ],
    },
  ],

  /** 47. 傳染病之預防與處理 (4306) */
  47: [
    {
      sheetName: '體溫健康監視紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '日期', width: 100 },
        { header: '對象姓名', width: 130 },
        { header: '身分(服務對象/工作人員)', width: 160 },
        { header: '體溫', width: 80 },
        { header: '健康狀況', width: 150 },
        { header: '異常處置', width: 180 },
        { header: '記錄人員', width: 100 },
      ],
    },
  ],

  /** 48. 社區資源管理與運用 (4401) */
  48: [
    {
      sheetName: '社區資源清冊',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '資源名稱', width: 160 },
        { header: '資源類型', width: 130 },
        { header: '聯絡方式', width: 160 },
        { header: '適用需求', width: 180 },
        { header: '更新日期', width: 100 },
        { header: '備註', width: 150 },
      ],
    },
    {
      sheetName: '社區活動參與記錄表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      columns: [
        { header: '活動日期', width: 100 },
        { header: '服務對象姓名', width: 130 },
        { header: '活動名稱', width: 180 },
        { header: '參與情形', width: 180 },
        { header: '陪同人員', width: 120 },
        { header: '備註', width: 150 },
      ],
    },
  ],

  /** 49. 家庭訪視與需求評估 (4402) */
  49: [
    {
      sheetName: '家庭訪視紀錄表',
      archetype: 'case-assessment',
      criteriaIndex: 0,
      prefillRows: 4,
      columns: [
        { header: '服務對象姓名', width: 130 },
        { header: '訪視日期', width: 100 },
        { header: '家屬姓名', width: 120 },
        { header: '訪視內容摘要', width: 220 },
        { header: '家庭需求評估', width: 200 },
        { header: '後續計畫', width: 180 },
        { header: '訪視人員', width: 100 },
      ],
    },
  ],
};
