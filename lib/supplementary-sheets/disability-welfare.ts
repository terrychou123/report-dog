/**
 * 身心障礙福利機構評鑑補充文件定義
 * 身心障礙福利機構專業服務品質與經營管理標準指引（35 項）
 */
import type { SupplementaryDefsMap } from '../supplementary-sheet-types';

export const disabilityWelfareDefs: SupplementaryDefsMap = {

  /** 1. 生存權 */
  1: [
    {
      sheetName: '個別化飲食型態記錄表',
      archetype: 'case-assessment',
      criteriaIndex: 2,
      prefillRows: 5,
      columns: [
        { header: '服務對象姓名', width: 130 },
        { header: '飲食型態', width: 150 },
        { header: '特殊需求說明', width: 200 },
        { header: '調整日期', width: 100 },
        { header: '負責人員', width: 100 },
      ],
    },
    {
      sheetName: '緊急醫療處理流程記錄表',
      archetype: 'incident-log',
      criteriaIndex: 4,
      columns: [
        { header: '事件日期', width: 100 },
        { header: '服務對象姓名', width: 130 },
        { header: '事件描述', width: 200 },
        { header: '處置措施', width: 200 },
        { header: '通知家屬時間', width: 130 },
        { header: '後續追蹤', width: 160 },
        { header: '處理人員', width: 100 },
      ],
    },
  ],

  /** 2. 健康權 */
  2: [
    {
      sheetName: '健康檢查追蹤記錄表',
      archetype: 'case-assessment',
      criteriaIndex: 0,
      prefillRows: 5,
      columns: [
        { header: '服務對象姓名', width: 130 },
        { header: '檢查日期', width: 100 },
        { header: '檢查項目', width: 180 },
        { header: '檢查結果', width: 180 },
        { header: '轉介醫療', width: 120 },
        { header: '負責人員', width: 100 },
      ],
    },
  ],

  /** 3. 得到安全的權利 */
  3: [
    {
      sheetName: '意外事件通報記錄表',
      archetype: 'incident-log',
      criteriaIndex: 1,
      columns: [
        { header: '通報日期', width: 100 },
        { header: '服務對象姓名', width: 130 },
        { header: '事件類型', width: 150 },
        { header: '事件描述', width: 200 },
        { header: '處置措施', width: 200 },
        { header: '通知家屬', width: 100 },
        { header: '通報人員', width: 100 },
      ],
    },
    {
      sheetName: '申訴案件處理記錄表',
      archetype: 'incident-log',
      criteriaIndex: 2,
      columns: [
        { header: '申訴日期', width: 100 },
        { header: '申訴人', width: 120 },
        { header: '申訴事由', width: 220 },
        { header: '處理過程', width: 220 },
        { header: '處理結果', width: 180 },
        { header: '回覆日期', width: 100 },
        { header: '負責人員', width: 100 },
      ],
    },
  ],

  /** 8. 服務意見反應與申訴權 */
  8: [
    {
      sheetName: '服務滿意度調查紀錄表',
      archetype: 'case-assessment',
      criteriaIndex: 3,
      prefillRows: 5,
      columns: [
        { header: '調查日期', width: 100 },
        { header: '填答人', width: 120 },
        { header: '整體滿意度（1-5）', width: 160 },
        { header: '具體意見', width: 220 },
        { header: '改善措施', width: 180 },
        { header: '負責人員', width: 100 },
      ],
    },
  ],

  /** 9. 回應個人需求與期待支持 */
  9: [
    {
      sheetName: '需求評估記錄表',
      archetype: 'case-assessment',
      criteriaIndex: 0,
      prefillRows: 4,
      columns: [
        { header: '服務對象姓名', width: 130 },
        { header: '評估日期', width: 100 },
        { header: '需求類別', width: 150 },
        { header: '需求描述', width: 220 },
        { header: '期待目標', width: 180 },
        { header: '評估人員', width: 100 },
      ],
    },
  ],

  /** 10. 個別化支持／服務計畫（ISP） */
  10: [
    {
      sheetName: 'ISP 個別化支持計畫追蹤表',
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
      sheetName: 'ISP 家屬參與同意紀錄',
      archetype: 'meeting-minutes',
      criteriaIndex: 2,
      columns: [
        { header: '服務對象姓名', width: 130 },
        { header: '會議日期', width: 100 },
        { header: '家屬（監護人）姓名', width: 150 },
        { header: '討論重點', width: 220 },
        { header: '家屬意見', width: 180 },
        { header: '家屬簽名', width: 100 },
        { header: '負責社工', width: 100 },
      ],
    },
  ],

  /** 12. 情緒行為支持需求 */
  12: [
    {
      sheetName: '行為支持計畫記錄表',
      archetype: 'care-plan',
      criteriaIndex: 0,
      prefillRows: 3,
      columns: [
        { header: '服務對象姓名', width: 130 },
        { header: '行為描述', width: 200 },
        { header: '前事分析', width: 180 },
        { header: '正向支持策略', width: 220 },
        { header: '執行期間', width: 120 },
        { header: '成效評估', width: 160 },
        { header: '負責人員', width: 100 },
      ],
    },
    {
      sheetName: '情緒行為事件紀錄表',
      archetype: 'incident-log',
      criteriaIndex: 3,
      columns: [
        { header: '日期時間', width: 120 },
        { header: '服務對象姓名', width: 130 },
        { header: '事件描述', width: 220 },
        { header: '處置方式', width: 200 },
        { header: '策略調整', width: 180 },
        { header: '記錄人員', width: 100 },
      ],
    },
  ],

  /** 14. 社區資源的管理與運用 */
  14: [
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
      criteriaIndex: 3,
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

  /** 15. 家庭支持 */
  15: [
    {
      sheetName: '家屬聯繫通聯記錄表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      columns: [
        { header: '聯繫日期', width: 100 },
        { header: '服務對象姓名', width: 130 },
        { header: '家屬姓名', width: 120 },
        { header: '聯繫方式', width: 120 },
        { header: '聯繫內容', width: 220 },
        { header: '家屬回應', width: 180 },
        { header: '聯繫人員', width: 100 },
      ],
    },
  ],

  /** 16. 轉銜支持 */
  16: [
    {
      sheetName: '轉銜計畫表',
      archetype: 'care-plan',
      criteriaIndex: 0,
      prefillRows: 3,
      columns: [
        { header: '服務對象姓名', width: 130 },
        { header: '預計離機日期', width: 130 },
        { header: '轉銜機構/資源', width: 180 },
        { header: '轉銜準備事項', width: 220 },
        { header: '文件移交清單', width: 180 },
        { header: '追蹤記錄', width: 160 },
        { header: '負責人員', width: 100 },
      ],
    },
  ],

  /** 20. 機構設施安全 */
  20: [
    {
      sheetName: '消防設備維護保養記錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
      prefillRows: 6,
      columns: [
        { header: '檢查日期', width: 100 },
        { header: '設備名稱', width: 160 },
        { header: '設備位置', width: 160 },
        { header: '檢查結果', width: 130 },
        { header: '缺失描述', width: 180 },
        { header: '改善措施', width: 180 },
        { header: '檢查人員', width: 100 },
      ],
    },
    {
      sheetName: '消防疏散演練紀錄表',
      archetype: 'training-record',
      criteriaIndex: 2,
      prefillRows: 4,
      columns: [
        { header: '演練日期', width: 100 },
        { header: '演練類型（日/夜）', width: 150 },
        { header: '參與人數', width: 100 },
        { header: '演練過程描述', width: 220 },
        { header: '問題點', width: 180 },
        { header: '改善計畫', width: 180 },
        { header: '負責人員', width: 100 },
      ],
    },
  ],

  /** 22. 機構風險管理處理要點 */
  22: [
    {
      sheetName: '風險事件分析改善記錄表',
      archetype: 'incident-log',
      criteriaIndex: 1,
      columns: [
        { header: '事件日期', width: 100 },
        { header: '風險類型', width: 150 },
        { header: '事件描述', width: 220 },
        { header: '原因分析', width: 200 },
        { header: '改善措施', width: 200 },
        { header: '執行期限', width: 100 },
        { header: '負責人員', width: 100 },
      ],
    },
  ],

  /** 27. 員工教育訓練 */
  27: [
    {
      sheetName: '教育訓練出席紀錄表',
      archetype: 'training-record',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '訓練日期', width: 100 },
        { header: '訓練課程名稱', width: 200 },
        { header: '訓練類型', width: 130 },
        { header: '參與人員', width: 160 },
        { header: '時數', width: 80 },
        { header: '簽到確認', width: 100 },
        { header: '負責人員', width: 100 },
      ],
    },
  ],

  /** 28. 員工健康檢查 */
  28: [
    {
      sheetName: '員工健康檢查追蹤清冊',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '員工姓名', width: 120 },
        { header: '職稱', width: 120 },
        { header: '到職日期', width: 100 },
        { header: '健康檢查日期', width: 120 },
        { header: '檢查結果', width: 150 },
        { header: '是否需工作調整', width: 130 },
        { header: '備註', width: 150 },
      ],
    },
  ],

  /** 30. 會計與財務管理 */
  30: [
    {
      sheetName: '財務報表核定紀錄表',
      archetype: 'meeting-minutes',
      criteriaIndex: 0,
      prefillRows: 4,
      columns: [
        { header: '報表期間', width: 120 },
        { header: '報表類型', width: 150 },
        { header: '核定日期', width: 100 },
        { header: '核定人/董事會', width: 150 },
        { header: '報主管機關日期', width: 130 },
        { header: '備註', width: 150 },
      ],
    },
  ],

  /** 34. 物資之財務管理 */
  34: [
    {
      sheetName: '物資採購驗收記錄表',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '採購日期', width: 100 },
        { header: '物資名稱', width: 160 },
        { header: '數量', width: 80 },
        { header: '單價', width: 80 },
        { header: '驗收人員', width: 120 },
        { header: '驗收結果', width: 130 },
        { header: '存放位置', width: 130 },
        { header: '備註', width: 150 },
      ],
    },
  ],
};
