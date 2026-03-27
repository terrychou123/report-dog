/**
 * 醫院評鑑補充文件定義
 * 114年度衛生福利部醫院評鑑基準（124項）
 */
import type { SupplementaryDefsMap } from '../supplementary-sheet-types';

export const hospitalDefs: SupplementaryDefsMap = {

  /** 1. 1.1.1 院務發展計畫 */
  1: [
    {
      sheetName: '院務發展計畫執行追蹤表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      prefillRows: 6,
      columns: [
        { header: '追蹤期別', width: 110 },
        { header: '計畫目標', width: 200 },
        { header: '執行現況', width: 200 },
        { header: '達成率(%)', width: 100 },
        { header: '差距分析', width: 180 },
        { header: '改善措施', width: 180 },
        { header: '填報人員', width: 100 },
      ],
    },
  ],

  /** 2. 1.1.2 組織架構與職掌 */
  2: [
    {
      sheetName: '部門職掌書面規定一覽',
      archetype: 'inventory-list',
      criteriaIndex: 1,
      prefillRows: 10,
      columns: [
        { header: '部門/單位', width: 150 },
        { header: '主要職掌', width: 240 },
        { header: '職務代理人', width: 120 },
        { header: '文件版次', width: 100 },
        { header: '核定日期', width: 100 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 3. 1.1.3 品質管理組織與機制 */
  3: [
    {
      sheetName: '品質管理委員會會議記錄',
      archetype: 'meeting-minutes',
      criteriaIndex: 0,
      columns: [
        { header: '會議日期', width: 100 },
        { header: '出席人員', width: 200 },
        { header: '討論議題', width: 240 },
        { header: '決議事項', width: 240 },
        { header: '追蹤期限', width: 110 },
        { header: '執行狀況', width: 180 },
        { header: '記錄人員', width: 100 },
      ],
    },
    {
      sheetName: '品質指標監測分析表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      prefillRows: 8,
      columns: [
        { header: '指標名稱', width: 180 },
        { header: '監測頻率', width: 100 },
        { header: '本期數值', width: 100 },
        { header: '目標值', width: 100 },
        { header: '達標(是/否)', width: 100 },
        { header: '改善計畫', width: 200 },
        { header: '填報日期', width: 100 },
        { header: '填報人員', width: 100 },
      ],
    },
  ],

  /** 5. 1.1.5 社會責任與社區健康 */
  5: [
    {
      sheetName: '社區衛教活動執行紀錄',
      archetype: 'daily-record',
      criteriaIndex: 1,
      columns: [
        { header: '活動日期', width: 100 },
        { header: '活動名稱', width: 180 },
        { header: '活動地點', width: 150 },
        { header: '參與人數', width: 100 },
        { header: '主辦人員', width: 110 },
        { header: '活動內容摘要', width: 220 },
        { header: '成效評估', width: 160 },
      ],
    },
  ],

  /** 6. 1.2.1 員工支持方案 */
  6: [
    {
      sheetName: '職場事件處理紀錄表',
      archetype: 'incident-log',
      criteriaIndex: 1,
      columns: [
        { header: '事件日期', width: 100 },
        { header: '當事人員', width: 110 },
        { header: '事件類型', width: 150 },
        { header: '事件描述', width: 240 },
        { header: '處理措施', width: 200 },
        { header: '後續追蹤', width: 180 },
        { header: '處理人員', width: 100 },
      ],
    },
  ],

  /** 7. 1.2.2 員工申訴機制 */
  7: [
    {
      sheetName: '員工申訴案件紀錄表',
      archetype: 'incident-log',
      criteriaIndex: 0,
      columns: [
        { header: '申訴日期', width: 100 },
        { header: '申訴編號', width: 110 },
        { header: '申訴事由', width: 240 },
        { header: '受理日期', width: 100 },
        { header: '處理結果', width: 200 },
        { header: '回覆日期', width: 100 },
        { header: '追蹤狀態', width: 120 },
        { header: '承辦人員', width: 100 },
      ],
    },
  ],

  /** 8. 1.2.3 職業安全衛生管理 */
  8: [
    {
      sheetName: '職安衛管理計畫執行紀錄',
      archetype: 'daily-record',
      criteriaIndex: 0,
      prefillRows: 6,
      columns: [
        { header: '執行期別', width: 110 },
        { header: '計畫項目', width: 200 },
        { header: '執行狀況', width: 180 },
        { header: '危害識別結果', width: 200 },
        { header: '控制措施', width: 180 },
        { header: '負責人員', width: 100 },
      ],
    },
    {
      sheetName: '職安事故通報調查紀錄表',
      archetype: 'incident-log',
      criteriaIndex: 2,
      columns: [
        { header: '事故日期', width: 100 },
        { header: '事故類型', width: 150 },
        { header: '當事人員', width: 110 },
        { header: '事故描述', width: 240 },
        { header: '調查結果', width: 200 },
        { header: '改善措施', width: 200 },
        { header: '追蹤狀態', width: 120 },
        { header: '通報人員', width: 100 },
      ],
    },
    {
      sheetName: '職安教育訓練紀錄表',
      archetype: 'training-record',
      criteriaIndex: 3,
      columns: [
        { header: '訓練日期', width: 100 },
        { header: '訓練課程', width: 180 },
        { header: '訓練時數', width: 100 },
        { header: '參與人員', width: 200 },
        { header: '講師姓名', width: 110 },
        { header: '測驗結果', width: 120 },
        { header: '紀錄人員', width: 100 },
      ],
    },
  ],

  /** 9. 1.2.4 職業傷害保護 */
  9: [
    {
      sheetName: '職業傷害追蹤管理紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 2,
      columns: [
        { header: '傷害日期', width: 100 },
        { header: '傷害類型', width: 150 },
        { header: '當事人員', width: 110 },
        { header: '傷害描述', width: 200 },
        { header: '處置措施', width: 180 },
        { header: '追蹤日期', width: 100 },
        { header: '追蹤結果', width: 160 },
        { header: '紀錄人員', width: 100 },
      ],
    },
  ],

  /** 10. 1.2.5 員工健康管理 */
  10: [
    {
      sheetName: '員工健康檢查紀錄清冊',
      archetype: 'inventory-list',
      criteriaIndex: 1,
      prefillRows: 10,
      columns: [
        { header: '員工姓名', width: 110 },
        { header: '職別', width: 100 },
        { header: '健檢日期', width: 100 },
        { header: '健檢結果', width: 150 },
        { header: '工作調整建議', width: 180 },
        { header: '後續追蹤事項', width: 180 },
        { header: '備註', width: 120 },
      ],
    },
    {
      sheetName: '員工健康促進活動紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 2,
      columns: [
        { header: '活動日期', width: 100 },
        { header: '活動名稱', width: 180 },
        { header: '參與人數', width: 100 },
        { header: '活動內容', width: 220 },
        { header: '執行人員', width: 110 },
        { header: '成效評估', width: 160 },
      ],
    },
  ],

  /** 12. 1.2.7 員工服務守則與倫理規範 */
  12: [
    {
      sheetName: '倫理教育訓練紀錄表',
      archetype: 'training-record',
      criteriaIndex: 2,
      columns: [
        { header: '訓練日期', width: 100 },
        { header: '訓練課程', width: 180 },
        { header: '訓練時數', width: 100 },
        { header: '參與人員', width: 200 },
        { header: '講師姓名', width: 110 },
        { header: '測驗/評核結果', width: 130 },
        { header: '紀錄人員', width: 100 },
      ],
    },
  ],

  /** 17. 1.3.5 新進人員職前訓練 */
  17: [
    {
      sheetName: '新進人員職前訓練紀錄表',
      archetype: 'training-record',
      criteriaIndex: 1,
      columns: [
        { header: '員工姓名', width: 110 },
        { header: '職別', width: 100 },
        { header: '到職日期', width: 100 },
        { header: '訓練課程', width: 200 },
        { header: '訓練日期', width: 100 },
        { header: '訓練時數', width: 100 },
        { header: '評核結果', width: 120 },
        { header: '紀錄人員', width: 100 },
      ],
    },
    {
      sheetName: '訓練效果評估紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 2,
      columns: [
        { header: '員工姓名', width: 110 },
        { header: '訓練課程', width: 180 },
        { header: '評估日期', width: 100 },
        { header: '評估方式', width: 150 },
        { header: '評估結果', width: 150 },
        { header: '通過(是/否)', width: 100 },
        { header: '評估人員', width: 100 },
      ],
    },
  ],

  /** 18. 1.3.6 在職教育訓練 */
  18: [
    {
      sheetName: '年度在職訓練執行紀錄表',
      archetype: 'training-record',
      criteriaIndex: 2,
      columns: [
        { header: '訓練日期', width: 100 },
        { header: '課程名稱', width: 180 },
        { header: '職別對象', width: 120 },
        { header: '參與人數', width: 100 },
        { header: '訓練時數', width: 100 },
        { header: '講師/主辦', width: 130 },
        { header: '測驗合格率', width: 110 },
        { header: '紀錄人員', width: 100 },
      ],
    },
  ],

  /** 19. 1.3.7 醫師繼續教育 */
  19: [
    {
      sheetName: '醫師繼續教育學分紀錄清冊',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '醫師姓名', width: 110 },
        { header: '科別', width: 100 },
        { header: '執照效期', width: 120 },
        { header: '應得學分數', width: 110 },
        { header: '已得學分數', width: 110 },
        { header: '差額', width: 80 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 20. 1.3.8 護理人員繼續教育 */
  20: [
    {
      sheetName: '護理繼續教育學分紀錄清冊',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '護理人員姓名', width: 130 },
        { header: '職稱', width: 100 },
        { header: '執照效期', width: 120 },
        { header: '應得學分數', width: 110 },
        { header: '已得學分數', width: 110 },
        { header: '差額', width: 80 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 21. 1.3.9 志願服務管理 */
  21: [
    {
      sheetName: '志工訓練紀錄表',
      archetype: 'training-record',
      criteriaIndex: 1,
      columns: [
        { header: '訓練日期', width: 100 },
        { header: '課程名稱', width: 180 },
        { header: '志工姓名', width: 110 },
        { header: '訓練時數', width: 100 },
        { header: '出席(是/否)', width: 100 },
        { header: '測驗結果', width: 120 },
        { header: '紀錄人員', width: 100 },
      ],
    },
  ],

  /** 22. 1.3.10 人員資格審查與管理 */
  22: [
    {
      sheetName: '人員資格文件管理清冊',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '人員姓名', width: 110 },
        { header: '職別', width: 100 },
        { header: '執照/證書類別', width: 160 },
        { header: '執照字號', width: 140 },
        { header: '效期起始', width: 100 },
        { header: '效期截止', width: 100 },
        { header: '更新狀態', width: 110 },
        { header: '備註', width: 120 },
      ],
    },
  ],

  /** 23. 1.4.1 病歷書寫與管理 */
  23: [
    {
      sheetName: '病歷書寫稽核查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      columns: [
        { header: '查核日期', width: 100 },
        { header: '查核病歷號', width: 120 },
        { header: '書寫規範項目', width: 240 },
        { header: '符合', width: 70 },
        { header: '不符合', width: 80 },
        { header: '缺失說明', width: 180 },
        { header: '查核人員', width: 100 },
      ],
    },
  ],

  /** 24. 1.4.2 資訊安全管理 */
  24: [
    {
      sheetName: '資料備份還原測試紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      columns: [
        { header: '測試日期', width: 100 },
        { header: '備份資料類別', width: 160 },
        { header: '備份時間', width: 110 },
        { header: '還原測試結果', width: 160 },
        { header: '問題說明', width: 180 },
        { header: '改善措施', width: 180 },
        { header: '執行人員', width: 100 },
      ],
    },
    {
      sheetName: '資安事件通報應變紀錄表',
      archetype: 'incident-log',
      criteriaIndex: 3,
      columns: [
        { header: '事件日期', width: 100 },
        { header: '事件類型', width: 150 },
        { header: '事件描述', width: 240 },
        { header: '影響範圍', width: 160 },
        { header: '應變措施', width: 200 },
        { header: '通報狀況', width: 150 },
        { header: '處理人員', width: 100 },
      ],
    },
  ],

  /** 27. 1.5.1 建築物安全管理 */
  27: [
    {
      sheetName: '建築設施維護檢查紀錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
      columns: [
        { header: '查核日期', width: 100 },
        { header: '查核區域', width: 150 },
        { header: '查核項目', width: 240 },
        { header: '符合', width: 70 },
        { header: '不符合', width: 80 },
        { header: '缺失說明', width: 180 },
        { header: '改善期限', width: 110 },
        { header: '查核人員', width: 100 },
      ],
    },
  ],

  /** 28. 1.5.2 消防安全管理 */
  28: [
    {
      sheetName: '消防設備定期檢查紀錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      columns: [
        { header: '查核日期', width: 100 },
        { header: '設備名稱/位置', width: 200 },
        { header: '查核項目', width: 220 },
        { header: '符合', width: 70 },
        { header: '不符合', width: 80 },
        { header: '缺失說明', width: 180 },
        { header: '改善措施', width: 160 },
        { header: '查核人員', width: 100 },
      ],
    },
    {
      sheetName: '消防疏散演練紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      columns: [
        { header: '演練日期', width: 100 },
        { header: '演練時間', width: 110 },
        { header: '演練類型', width: 130 },
        { header: '參與人員數', width: 110 },
        { header: '演練情境', width: 200 },
        { header: '問題發現', width: 180 },
        { header: '改善措施', width: 180 },
        { header: '主辦人員', width: 100 },
      ],
    },
  ],

  /** 29. 1.5.3 醫療設備管理 */
  29: [
    {
      sheetName: '醫療設備清冊',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '設備名稱', width: 160 },
        { header: '型號/序號', width: 140 },
        { header: '所在位置', width: 140 },
        { header: '上次維護日期', width: 130 },
        { header: '下次維護日期', width: 130 },
        { header: '維護狀態', width: 110 },
        { header: '負責人員', width: 100 },
      ],
    },
    {
      sheetName: '設備預防性維護紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '維護日期', width: 100 },
        { header: '設備名稱', width: 160 },
        { header: '設備序號', width: 130 },
        { header: '維護項目', width: 200 },
        { header: '維護結果', width: 160 },
        { header: '下次維護日期', width: 130 },
        { header: '維護人員', width: 100 },
      ],
    },
    {
      sheetName: '設備使用訓練紀錄表',
      archetype: 'training-record',
      criteriaIndex: 3,
      columns: [
        { header: '訓練日期', width: 100 },
        { header: '設備名稱', width: 160 },
        { header: '受訓人員', width: 180 },
        { header: '訓練內容', width: 200 },
        { header: '訓練時數', width: 100 },
        { header: '評核結果', width: 120 },
        { header: '紀錄人員', width: 100 },
      ],
    },
  ],

  /** 30. 1.5.4 危險物品管理 */
  30: [
    {
      sheetName: '危險物品管理清冊',
      archetype: 'inventory-list',
      criteriaIndex: 1,
      prefillRows: 10,
      columns: [
        { header: '物品名稱', width: 160 },
        { header: '類別', width: 110 },
        { header: '儲存位置', width: 150 },
        { header: '存量', width: 90 },
        { header: '儲存條件', width: 150 },
        { header: '標示狀態', width: 110 },
        { header: '負責人員', width: 100 },
        { header: '備註', width: 120 },
      ],
    },
  ],

  /** 31. 1.5.5 緊急應變計畫 */
  31: [
    {
      sheetName: '緊急應變演練紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      columns: [
        { header: '演練日期', width: 100 },
        { header: '演練情境', width: 180 },
        { header: '參與單位', width: 160 },
        { header: '參與人數', width: 100 },
        { header: '演練問題', width: 200 },
        { header: '改善追蹤', width: 180 },
        { header: '主辦人員', width: 100 },
      ],
    },
  ],

  /** 32. 1.5.6 環境清潔管理 */
  32: [
    {
      sheetName: '環境清潔稽核紀錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 2,
      columns: [
        { header: '稽核日期', width: 100 },
        { header: '稽核區域', width: 150 },
        { header: '稽核項目', width: 220 },
        { header: '符合', width: 70 },
        { header: '不符合', width: 80 },
        { header: '缺失說明', width: 180 },
        { header: '改善追蹤', width: 160 },
        { header: '稽核人員', width: 100 },
      ],
    },
    {
      sheetName: '清潔人員訓練紀錄表',
      archetype: 'training-record',
      criteriaIndex: 1,
      columns: [
        { header: '訓練日期', width: 100 },
        { header: '課程名稱', width: 180 },
        { header: '受訓人員', width: 180 },
        { header: '訓練時數', width: 100 },
        { header: '訓練內容', width: 200 },
        { header: '評核結果', width: 120 },
        { header: '紀錄人員', width: 100 },
      ],
    },
  ],

  /** 33. 1.5.7 廢棄物管理 */
  33: [
    {
      sheetName: '醫療廢棄物處理紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '處理日期', width: 100 },
        { header: '廢棄物類別', width: 150 },
        { header: '數量/重量', width: 110 },
        { header: '清除廠商', width: 150 },
        { header: '轉運聯單號', width: 130 },
        { header: '負責人員', width: 100 },
        { header: '備註', width: 130 },
      ],
    },
    {
      sheetName: '廢棄物管理人員訓練紀錄',
      archetype: 'training-record',
      criteriaIndex: 3,
      columns: [
        { header: '訓練日期', width: 100 },
        { header: '課程名稱', width: 180 },
        { header: '受訓人員', width: 180 },
        { header: '訓練時數', width: 100 },
        { header: '訓練內容', width: 200 },
        { header: '評核結果', width: 120 },
        { header: '紀錄人員', width: 100 },
      ],
    },
  ],

  /** 36. 1.6.3 病人滿意度管理 */
  36: [
    {
      sheetName: '病人滿意度調查分析報告表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      prefillRows: 4,
      columns: [
        { header: '調查期別', width: 110 },
        { header: '調查方式', width: 130 },
        { header: '有效份數', width: 100 },
        { header: '總體滿意度(%)', width: 130 },
        { header: '主要缺失項目', width: 200 },
        { header: '改善行動計畫', width: 200 },
        { header: '追蹤狀態', width: 110 },
        { header: '填報人員', width: 100 },
      ],
    },
    {
      sheetName: '病人申訴處理紀錄表',
      archetype: 'incident-log',
      criteriaIndex: 2,
      columns: [
        { header: '申訴日期', width: 100 },
        { header: '申訴編號', width: 110 },
        { header: '申訴人身分', width: 120 },
        { header: '申訴內容', width: 240 },
        { header: '受理日期', width: 100 },
        { header: '處理結果', width: 200 },
        { header: '回覆日期', width: 100 },
        { header: '承辦人員', width: 100 },
      ],
    },
  ],

  /** 37. 1.6.4 社區健康促進 */
  37: [
    {
      sheetName: '社區健康促進活動紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      columns: [
        { header: '活動日期', width: 100 },
        { header: '活動名稱', width: 180 },
        { header: '活動類型', width: 140 },
        { header: '辦理地點', width: 150 },
        { header: '參與人數', width: 100 },
        { header: '執行人員', width: 110 },
        { header: '活動成效', width: 160 },
      ],
    },
  ],

  /** 38. 1.7.1 風險管理機制 */
  38: [
    {
      sheetName: '全院風險評估追蹤報告表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      prefillRows: 6,
      columns: [
        { header: '評估期別', width: 110 },
        { header: '風險項目', width: 180 },
        { header: '風險等級', width: 110 },
        { header: '風險處理措施', width: 200 },
        { header: '改善追蹤', width: 180 },
        { header: '負責單位', width: 130 },
        { header: '填報人員', width: 100 },
      ],
    },
  ],

  /** 39. 1.7.2 醫療事故處理 */
  39: [
    {
      sheetName: '醫療事故通報分析紀錄表',
      archetype: 'incident-log',
      criteriaIndex: 0,
      columns: [
        { header: '事故日期', width: 100 },
        { header: '事故類型', width: 150 },
        { header: '涉及科別', width: 130 },
        { header: '事故描述', width: 240 },
        { header: '通報日期', width: 100 },
        { header: 'RCA完成日期', width: 130 },
        { header: '改善措施', width: 200 },
        { header: '追蹤狀態', width: 110 },
      ],
    },
  ],

  /** 40. 1.7.3 院內緊急事件應變 */
  40: [
    {
      sheetName: '緊急應變演練紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      columns: [
        { header: '演練日期', width: 100 },
        { header: '演練類型', width: 150 },
        { header: '演練情境', width: 180 },
        { header: '參與人員', width: 160 },
        { header: '演練問題', width: 200 },
        { header: '改善措施', width: 180 },
        { header: '主辦人員', width: 100 },
      ],
    },
  ],

  /** 42. 1.7.5 危機溝通管理 */
  42: [
    {
      sheetName: '危機溝通訓練紀錄表',
      archetype: 'training-record',
      criteriaIndex: 2,
      columns: [
        { header: '訓練日期', width: 100 },
        { header: '課程名稱', width: 180 },
        { header: '受訓人員', width: 180 },
        { header: '訓練時數', width: 100 },
        { header: '訓練內容', width: 200 },
        { header: '評核結果', width: 120 },
        { header: '紀錄人員', width: 100 },
      ],
    },
  ],

  /** 43. 2.1.1 病人基本權利保障 */
  43: [
    {
      sheetName: '病人權利告知簽收紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '入院日期', width: 100 },
        { header: '病人姓名', width: 110 },
        { header: '病歷號', width: 110 },
        { header: '告知方式', width: 140 },
        { header: '簽收人員', width: 110 },
        { header: '簽收日期', width: 100 },
        { header: '告知護理師', width: 110 },
      ],
    },
    {
      sheetName: '病人拒絕治療書面紀錄表',
      archetype: 'incident-log',
      criteriaIndex: 2,
      columns: [
        { header: '紀錄日期', width: 100 },
        { header: '病人姓名', width: 110 },
        { header: '病歷號', width: 110 },
        { header: '拒絕項目', width: 180 },
        { header: '告知風險', width: 200 },
        { header: '病人/家屬簽名', width: 130 },
        { header: '醫師簽名', width: 110 },
      ],
    },
  ],

  /** 44. 2.1.2 知情同意作業 */
  44: [
    {
      sheetName: '知情同意書執行查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      columns: [
        { header: '查核日期', width: 100 },
        { header: '病歷號', width: 110 },
        { header: '處置/手術名稱', width: 180 },
        { header: '同意書齊備', width: 100 },
        { header: '說明完整性', width: 120 },
        { header: '缺失說明', width: 180 },
        { header: '查核人員', width: 100 },
      ],
    },
  ],

  /** 46. 2.1.4 病人申訴機制 */
  46: [
    {
      sheetName: '病人申訴案件追蹤紀錄表',
      archetype: 'incident-log',
      criteriaIndex: 0,
      columns: [
        { header: '申訴日期', width: 100 },
        { header: '申訴編號', width: 110 },
        { header: '申訴人', width: 110 },
        { header: '申訴內容', width: 240 },
        { header: '受理日期', width: 100 },
        { header: '處理結果', width: 200 },
        { header: '回覆日期', width: 100 },
        { header: '承辦人員', width: 100 },
      ],
    },
  ],

  /** 47. 2.2.1 醫療品質指標管理 */
  47: [
    {
      sheetName: '醫療品質指標分析改善表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '指標名稱', width: 180 },
        { header: '指標類別', width: 120 },
        { header: '監測期別', width: 110 },
        { header: '本期數值', width: 100 },
        { header: '目標值/基準值', width: 130 },
        { header: '達標(是/否)', width: 100 },
        { header: '改善計畫', width: 200 },
        { header: '填報人員', width: 100 },
      ],
    },
  ],

  /** 48. 2.2.2 病人安全文化推動 */
  48: [
    {
      sheetName: '病人安全教育訓練紀錄表',
      archetype: 'training-record',
      criteriaIndex: 1,
      columns: [
        { header: '訓練日期', width: 100 },
        { header: '課程名稱', width: 180 },
        { header: '受訓對象', width: 150 },
        { header: '參與人數', width: 100 },
        { header: '訓練時數', width: 100 },
        { header: '講師', width: 110 },
        { header: '評核合格率', width: 110 },
        { header: '紀錄人員', width: 100 },
      ],
    },
  ],

  /** 49. 2.2.3 異常事件通報與分析 */
  49: [
    {
      sheetName: '異常事件通報分析紀錄表',
      archetype: 'incident-log',
      criteriaIndex: 0,
      columns: [
        { header: '通報日期', width: 100 },
        { header: '事件編號', width: 110 },
        { header: '事件類別', width: 150 },
        { header: '事件描述', width: 240 },
        { header: '嚴重等級', width: 110 },
        { header: 'RCA(是/否)', width: 100 },
        { header: '改善措施', width: 200 },
        { header: '追蹤狀態', width: 110 },
      ],
    },
  ],

  /** 50. 2.3.1 病人入院評估 */
  50: [
    {
      sheetName: '入院護理評估紀錄表',
      archetype: 'case-assessment',
      criteriaIndex: 0,
      prefillRows: 5,
      columns: [
        { header: '評估日期', width: 100 },
        { header: '病人姓名', width: 110 },
        { header: '病歷號', width: 110 },
        { header: '生理評估結果', width: 180 },
        { header: '心理社會評估', width: 180 },
        { header: '跌倒風險評分', width: 120 },
        { header: '壓傷風險評分', width: 120 },
        { header: '評估護理師', width: 110 },
      ],
    },
  ],

  /** 51. 2.3.2 個別化照護計畫 */
  51: [
    {
      sheetName: '個別化照護計畫書',
      archetype: 'care-plan',
      criteriaIndex: 0,
      prefillRows: 5,
      columns: [
        { header: '病人姓名', width: 110 },
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

  /** 52. 2.3.3 醫療團隊溝通與交接班 */
  52: [
    {
      sheetName: '跨科照護討論會議記錄',
      archetype: 'meeting-minutes',
      criteriaIndex: 2,
      columns: [
        { header: '會議日期', width: 100 },
        { header: '病人姓名/病歷號', width: 160 },
        { header: '參與人員', width: 180 },
        { header: '討論議題', width: 240 },
        { header: '決議事項', width: 240 },
        { header: '執行狀況', width: 180 },
        { header: '記錄人員', width: 100 },
      ],
    },
  ],

  /** 53. 2.3.4 疼痛評估與管理 */
  53: [
    {
      sheetName: '疼痛評估紀錄表',
      archetype: 'case-assessment',
      criteriaIndex: 0,
      columns: [
        { header: '評估日期', width: 100 },
        { header: '評估時間', width: 100 },
        { header: '病人姓名', width: 110 },
        { header: '疼痛評分', width: 100 },
        { header: '疼痛部位', width: 130 },
        { header: '疼痛性質', width: 130 },
        { header: '處理措施', width: 180 },
        { header: '再評估結果', width: 130 },
        { header: '評估護理師', width: 110 },
      ],
    },
  ],

  /** 54. 2.3.5 營養評估與照護 */
  54: [
    {
      sheetName: '營養評估紀錄表',
      archetype: 'case-assessment',
      criteriaIndex: 0,
      columns: [
        { header: '評估日期', width: 100 },
        { header: '病人姓名', width: 110 },
        { header: '病歷號', width: 110 },
        { header: '篩選工具', width: 130 },
        { header: '篩選結果', width: 130 },
        { header: '高風險(是/否)', width: 110 },
        { header: '全面評估日期', width: 130 },
        { header: '營養診斷', width: 160 },
        { header: '評估營養師', width: 110 },
      ],
    },
    {
      sheetName: '個別化營養照護紀錄表',
      archetype: 'care-plan',
      criteriaIndex: 1,
      columns: [
        { header: '病人姓名', width: 110 },
        { header: '計畫日期', width: 100 },
        { header: '營養問題', width: 180 },
        { header: '照護目標', width: 180 },
        { header: '飲食處方/支持方式', width: 200 },
        { header: '評值日期', width: 100 },
        { header: '評值結果', width: 160 },
        { header: '負責營養師', width: 110 },
      ],
    },
  ],

  /** 55. 2.3.6 跌倒預防 */
  55: [
    {
      sheetName: '跌倒風險評估紀錄表',
      archetype: 'case-assessment',
      criteriaIndex: 0,
      columns: [
        { header: '評估日期', width: 100 },
        { header: '病人姓名', width: 110 },
        { header: '病歷號', width: 110 },
        { header: '跌倒風險評分', width: 120 },
        { header: '風險等級', width: 110 },
        { header: '預防措施', width: 200 },
        { header: '家屬告知(是/否)', width: 120 },
        { header: '評估護理師', width: 110 },
      ],
    },
    {
      sheetName: '跌倒事件通報紀錄表',
      archetype: 'incident-log',
      criteriaIndex: 2,
      columns: [
        { header: '事件日期', width: 100 },
        { header: '事件時間', width: 100 },
        { header: '病人姓名', width: 110 },
        { header: '跌倒情境描述', width: 220 },
        { header: '傷害程度', width: 120 },
        { header: '緊急處置', width: 180 },
        { header: '後續追蹤', width: 160 },
        { header: '通報護理師', width: 110 },
      ],
    },
  ],

  /** 56. 2.3.7 壓傷預防 */
  56: [
    {
      sheetName: '壓傷風險評估紀錄表',
      archetype: 'case-assessment',
      criteriaIndex: 0,
      columns: [
        { header: '評估日期', width: 100 },
        { header: '病人姓名', width: 110 },
        { header: '病歷號', width: 110 },
        { header: '壓傷風險評分', width: 120 },
        { header: '風險等級', width: 110 },
        { header: '預防措施', width: 200 },
        { header: '翻身頻率', width: 110 },
        { header: '評估護理師', width: 110 },
      ],
    },
    {
      sheetName: '院內壓傷通報紀錄表',
      archetype: 'incident-log',
      criteriaIndex: 2,
      columns: [
        { header: '發現日期', width: 100 },
        { header: '病人姓名', width: 110 },
        { header: '壓傷部位', width: 140 },
        { header: '壓傷分期', width: 110 },
        { header: '傷口描述', width: 200 },
        { header: '處理措施', width: 180 },
        { header: '後續追蹤', width: 160 },
        { header: '通報護理師', width: 110 },
      ],
    },
  ],

  /** 57. 2.3.8 身體約束管理 */
  57: [
    {
      sheetName: '身體約束使用紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 2,
      columns: [
        { header: '使用日期', width: 100 },
        { header: '病人姓名', width: 110 },
        { header: '使用理由', width: 200 },
        { header: '醫師醫囑', width: 140 },
        { header: '知情同意', width: 120 },
        { header: '定期評估結果', width: 160 },
        { header: '解除日期', width: 100 },
        { header: '紀錄護理師', width: 110 },
      ],
    },
  ],

  /** 58. 2.3.9 復健醫療服務 */
  58: [
    {
      sheetName: '復健評估與計畫紀錄表',
      archetype: 'care-plan',
      criteriaIndex: 0,
      columns: [
        { header: '病人姓名', width: 110 },
        { header: '評估日期', width: 100 },
        { header: '評估結果摘要', width: 200 },
        { header: '復健目標', width: 180 },
        { header: '治療計畫', width: 200 },
        { header: '評值日期', width: 100 },
        { header: '評值結果', width: 160 },
        { header: '負責治療師', width: 110 },
      ],
    },
    {
      sheetName: '復健治療執行紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      columns: [
        { header: '治療日期', width: 100 },
        { header: '病人姓名', width: 110 },
        { header: '治療項目', width: 180 },
        { header: '治療時間(分)', width: 120 },
        { header: '執行狀況', width: 180 },
        { header: '成效評估', width: 160 },
        { header: '治療師簽名', width: 110 },
      ],
    },
  ],

  /** 59. 2.3.10 出院計畫與準備 */
  59: [
    {
      sheetName: '出院照護需求評估表',
      archetype: 'case-assessment',
      criteriaIndex: 0,
      columns: [
        { header: '評估日期', width: 100 },
        { header: '病人姓名', width: 110 },
        { header: '病歷號', width: 110 },
        { header: '照護需求評估', width: 200 },
        { header: '出院後安置', width: 160 },
        { header: '長照連結需求', width: 150 },
        { header: '評估人員', width: 110 },
        { header: '社工介入(是/否)', width: 130 },
      ],
    },
    {
      sheetName: '出院衛教紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      columns: [
        { header: '衛教日期', width: 100 },
        { header: '病人姓名', width: 110 },
        { header: '衛教項目', width: 200 },
        { header: '衛教對象', width: 130 },
        { header: '理解確認', width: 120 },
        { header: '衛教材料', width: 150 },
        { header: '衛教人員', width: 100 },
      ],
    },
  ],

  /** 60. 2.3.11 轉診轉介作業 */
  60: [
    {
      sheetName: '轉診轉介追蹤紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '轉診日期', width: 100 },
        { header: '病人姓名', width: 110 },
        { header: '轉診原因', width: 180 },
        { header: '接受單位', width: 160 },
        { header: '病歷摘要提供', width: 130 },
        { header: '病人知情同意', width: 130 },
        { header: '接收確認', width: 120 },
        { header: '轉診醫師', width: 110 },
      ],
    },
  ],

  /** 63. 2.3.14 臨終照護 */
  63: [
    {
      sheetName: '臨終照護計畫紀錄表',
      archetype: 'care-plan',
      criteriaIndex: 1,
      columns: [
        { header: '病人姓名', width: 110 },
        { header: '計畫日期', width: 100 },
        { header: '照護需求', width: 180 },
        { header: '照護措施', width: 200 },
        { header: 'DNR意願', width: 130 },
        { header: '家屬參與', width: 130 },
        { header: '負責人員', width: 100 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 65. 2.3.16 病歷摘要與出院紀錄 */
  65: [
    {
      sheetName: '出院病歷摘要完成追蹤表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      columns: [
        { header: '查核日期', width: 100 },
        { header: '病歷號', width: 110 },
        { header: '出院日期', width: 100 },
        { header: '摘要完成(是/否)', width: 130 },
        { header: '完成時效符合', width: 130 },
        { header: '內容完整性', width: 150 },
        { header: '缺失說明', width: 180 },
        { header: '查核人員', width: 100 },
      ],
    },
  ],

  /** 66. 2.4.1 血液透析照護（可免評，有紀錄標準） */
  66: [
    {
      sheetName: '透析治療監測紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      columns: [
        { header: '治療日期', width: 100 },
        { header: '病人姓名', width: 110 },
        { header: '透析前評估', width: 180 },
        { header: '治療中監測', width: 180 },
        { header: '治療後評估', width: 180 },
        { header: '異常狀況', width: 160 },
        { header: '護理師簽名', width: 110 },
      ],
    },
  ],

  /** 70. 2.4.5 內視鏡作業（可免評，有紀錄標準） */
  70: [
    {
      sheetName: '內視鏡清洗消毒執行紀錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      columns: [
        { header: '執行日期', width: 100 },
        { header: '內視鏡編號', width: 130 },
        { header: '清洗流程符合', width: 130 },
        { header: '消毒方式', width: 150 },
        { header: '消毒完成時間', width: 130 },
        { header: '符合規定(是/否)', width: 130 },
        { header: '執行人員', width: 100 },
      ],
    },
    {
      sheetName: '內視鏡人員訓練紀錄表',
      archetype: 'training-record',
      criteriaIndex: 2,
      columns: [
        { header: '訓練日期', width: 100 },
        { header: '課程名稱', width: 180 },
        { header: '受訓人員', width: 180 },
        { header: '訓練時數', width: 100 },
        { header: '訓練內容', width: 200 },
        { header: '評核結果', width: 120 },
        { header: '紀錄人員', width: 100 },
      ],
    },
  ],

  /** 74. 2.4.9 精神科照護（可免評，有書面紀錄標準） */
  74: [
    {
      sheetName: '精神科約束隔離使用紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      columns: [
        { header: '使用日期', width: 100 },
        { header: '病人姓名', width: 110 },
        { header: '措施類型', width: 140 },
        { header: '使用理由', width: 200 },
        { header: '醫師醫囑', width: 140 },
        { header: '法規符合確認', width: 130 },
        { header: '解除日期', width: 100 },
        { header: '紀錄人員', width: 110 },
      ],
    },
  ],

  /** 75. 2.4.10 婦產科照護（可免評，有查核清單標準） */
  75: [
    {
      sheetName: '生產安全查核清單紀錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
      columns: [
        { header: '紀錄日期', width: 100 },
        { header: '產婦姓名', width: 110 },
        { header: '查核項目', width: 220 },
        { header: '符合', width: 70 },
        { header: '不符合', width: 80 },
        { header: '處理說明', width: 180 },
        { header: '執行人員', width: 100 },
      ],
    },
  ],

  /** 76. 2.4.11 新生兒照護（可免評，有紀錄標準） */
  76: [
    {
      sheetName: '新生兒評估紀錄表',
      archetype: 'case-assessment',
      criteriaIndex: 0,
      columns: [
        { header: '評估日期時間', width: 140 },
        { header: '新生兒姓名', width: 120 },
        { header: 'Apgar 1分鐘', width: 120 },
        { header: 'Apgar 5分鐘', width: 120 },
        { header: '評估狀況', width: 180 },
        { header: '特殊照護需求', width: 160 },
        { header: '評估人員', width: 100 },
      ],
    },
  ],

  /** 85. 2.4.20 器官移植照護（可免評，有書面紀錄標準） */
  85: [
    {
      sheetName: '移植後免疫抑制治療監測表',
      archetype: 'daily-record',
      criteriaIndex: 2,
      columns: [
        { header: '監測日期', width: 100 },
        { header: '病人姓名', width: 110 },
        { header: '藥品名稱', width: 160 },
        { header: '藥物濃度', width: 110 },
        { header: '劑量調整', width: 150 },
        { header: '副作用監測', width: 160 },
        { header: '負責醫師', width: 100 },
      ],
    },
  ],

  /** 86. 2.4.21 復健醫學服務（可免評，有書面紀錄標準） */
  86: [
    {
      sheetName: '復健評估紀錄表',
      archetype: 'case-assessment',
      criteriaIndex: 0,
      columns: [
        { header: '評估日期', width: 100 },
        { header: '病人姓名', width: 110 },
        { header: '評估工具', width: 150 },
        { header: '評估結果', width: 200 },
        { header: '短期目標', width: 180 },
        { header: '長期目標', width: 180 },
        { header: '評估治療師', width: 110 },
      ],
    },
  ],

  /** 88. 2.4.23 居家醫療服務（可免評，有紀錄標準） */
  88: [
    {
      sheetName: '居家訪視紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      columns: [
        { header: '訪視日期', width: 100 },
        { header: '病人姓名', width: 110 },
        { header: '評估結果', width: 200 },
        { header: '處置項目', width: 180 },
        { header: '追蹤事項', width: 180 },
        { header: '緊急狀況', width: 150 },
        { header: '訪視人員', width: 110 },
      ],
    },
  ],

  /** 89. 2.4.24 長期照護銜接服務 */
  89: [
    {
      sheetName: '長照需求評估追蹤紀錄表',
      archetype: 'case-assessment',
      criteriaIndex: 1,
      columns: [
        { header: '評估日期', width: 100 },
        { header: '病人姓名', width: 110 },
        { header: '病歷號', width: 110 },
        { header: '長照需求評估', width: 200 },
        { header: '連結資源', width: 160 },
        { header: '銜接狀況', width: 160 },
        { header: '出院後追蹤', width: 160 },
        { header: '評估社工', width: 110 },
      ],
    },
  ],

  /** 90. 2.5.1 藥品管理制度 */
  90: [
    {
      sheetName: '藥品儲存環境查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
      columns: [
        { header: '查核日期', width: 100 },
        { header: '儲存區域', width: 150 },
        { header: '溫度記錄', width: 110 },
        { header: '濕度記錄', width: 110 },
        { header: '有效期限查核', width: 130 },
        { header: '符合規定(是/否)', width: 130 },
        { header: '缺失改善', width: 180 },
        { header: '查核人員', width: 100 },
      ],
    },
  ],

  /** 93. 2.5.4 給藥作業安全 */
  93: [
    {
      sheetName: '給藥作業安全查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      columns: [
        { header: '查核日期', width: 100 },
        { header: '查核班別', width: 110 },
        { header: '查核病房', width: 110 },
        { header: '五對查核執行', width: 130 },
        { header: '給藥紀錄簽名', width: 130 },
        { header: '符合(是/否)', width: 100 },
        { header: '缺失說明', width: 180 },
        { header: '查核人員', width: 100 },
      ],
    },
  ],

  /** 94. 2.5.5 高警訊藥品管理 */
  94: [
    {
      sheetName: '高警訊藥品清冊',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '藥品名稱', width: 180 },
        { header: '類別', width: 120 },
        { header: '儲存位置', width: 150 },
        { header: '特別標示說明', width: 180 },
        { header: '雙重查核要求', width: 150 },
        { header: '更新日期', width: 100 },
        { header: '維護人員', width: 100 },
      ],
    },
  ],

  /** 95. 2.5.6 藥品不良反應監測 */
  95: [
    {
      sheetName: '藥品不良反應通報紀錄表',
      archetype: 'incident-log',
      criteriaIndex: 0,
      columns: [
        { header: '通報日期', width: 100 },
        { header: '病人姓名', width: 110 },
        { header: '涉及藥品', width: 160 },
        { header: '反應描述', width: 220 },
        { header: '嚴重程度', width: 110 },
        { header: '對外通報(是/否)', width: 130 },
        { header: '病歷註記', width: 130 },
        { header: '通報人員', width: 100 },
      ],
    },
  ],

  /** 97. 2.5.8 管制藥品管理 */
  97: [
    {
      sheetName: '管制藥品清點紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '清點日期', width: 100 },
        { header: '清點班別', width: 110 },
        { header: '藥品名稱', width: 160 },
        { header: '帳面數量', width: 110 },
        { header: '實際數量', width: 110 },
        { header: '差異', width: 80 },
        { header: '浪費量', width: 90 },
        { header: '雙人簽名', width: 120 },
      ],
    },
  ],

  /** 98. 2.5.9 出院藥物衛教 */
  98: [
    {
      sheetName: '出院藥物衛教紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '衛教日期', width: 100 },
        { header: '病人姓名', width: 110 },
        { header: '衛教藥品', width: 180 },
        { header: '衛教內容', width: 220 },
        { header: '衛教對象', width: 120 },
        { header: '理解確認(是/否)', width: 130 },
        { header: '衛教藥師', width: 110 },
      ],
    },
  ],

  /** 99. 2.6.1 手術安全查核 */
  99: [
    {
      sheetName: '手術安全查核表執行稽核',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      columns: [
        { header: '稽核日期', width: 100 },
        { header: '手術案例', width: 130 },
        { header: '簽到確認執行', width: 130 },
        { header: '手術暫停執行', width: 130 },
        { header: '簽出確認執行', width: 130 },
        { header: '符合規定(是/否)', width: 130 },
        { header: '缺失說明', width: 180 },
        { header: '稽核人員', width: 100 },
      ],
    },
  ],

  /** 100. 2.6.2 麻醉前評估 */
  100: [
    {
      sheetName: '麻醉前評估紀錄查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      columns: [
        { header: '查核日期', width: 100 },
        { header: '病歷號', width: 110 },
        { header: '評估完成(是/否)', width: 130 },
        { header: 'ASA分級記錄', width: 130 },
        { header: '知情同意完整', width: 130 },
        { header: '缺失說明', width: 180 },
        { header: '查核人員', width: 100 },
      ],
    },
  ],

  /** 101. 2.6.3 麻醉作業管理 */
  101: [
    {
      sheetName: '麻醉作業查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      columns: [
        { header: '查核日期', width: 100 },
        { header: '手術案例', width: 130 },
        { header: '麻醉紀錄完整', width: 130 },
        { header: '術中監測記錄', width: 130 },
        { header: '緊急設備可用', width: 130 },
        { header: '符合(是/否)', width: 100 },
        { header: '缺失說明', width: 180 },
        { header: '查核人員', width: 100 },
      ],
    },
  ],

  /** 102. 2.6.4 手術室安全管理 */
  102: [
    {
      sheetName: '手術器械計點紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 2,
      columns: [
        { header: '手術日期', width: 100 },
        { header: '手術案例', width: 130 },
        { header: '器械種類', width: 150 },
        { header: '術前數量', width: 110 },
        { header: '術後數量', width: 110 },
        { header: '核對結果', width: 120 },
        { header: '簽核人員', width: 120 },
      ],
    },
  ],

  /** 103. 2.6.5 術後照護作業 */
  103: [
    {
      sheetName: '術後照護交接紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 2,
      columns: [
        { header: '手術日期', width: 100 },
        { header: '病人姓名', width: 110 },
        { header: '術後評分', width: 110 },
        { header: '生命徵象', width: 150 },
        { header: '轉出標準符合', width: 130 },
        { header: '交接事項', width: 200 },
        { header: '交接護理師', width: 110 },
      ],
    },
  ],

  /** 104. 2.6.6 術後疼痛管理 */
  104: [
    {
      sheetName: '術後疼痛評估紀錄表',
      archetype: 'case-assessment',
      criteriaIndex: 0,
      columns: [
        { header: '評估日期', width: 100 },
        { header: '評估時間', width: 100 },
        { header: '病人姓名', width: 110 },
        { header: '疼痛評分', width: 100 },
        { header: '疼痛管理措施', width: 200 },
        { header: '治療效果', width: 150 },
        { header: '調整措施', width: 160 },
        { header: '評估護理師', width: 110 },
      ],
    },
  ],

  /** 107. 2.6.9 手術器械及耗材管理 */
  107: [
    {
      sheetName: '植入物耗材批號追蹤清冊',
      archetype: 'inventory-list',
      criteriaIndex: 1,
      prefillRows: 10,
      columns: [
        { header: '使用日期', width: 100 },
        { header: '病人姓名/病歷號', width: 160 },
        { header: '植入物/耗材名稱', width: 180 },
        { header: '批號', width: 120 },
        { header: '有效期限', width: 110 },
        { header: '廠商', width: 130 },
        { header: '使用人員', width: 110 },
      ],
    },
  ],

  /** 108. 2.7.1 感染管制組織與運作 */
  108: [
    {
      sheetName: '感染管制委員會會議記錄',
      archetype: 'meeting-minutes',
      criteriaIndex: 0,
      columns: [
        { header: '會議日期', width: 100 },
        { header: '出席人員', width: 200 },
        { header: '討論議題', width: 240 },
        { header: '決議事項', width: 240 },
        { header: '追蹤期限', width: 110 },
        { header: '執行狀況', width: 180 },
        { header: '記錄人員', width: 100 },
      ],
    },
    {
      sheetName: '感染管制計畫執行追蹤表',
      archetype: 'daily-record',
      criteriaIndex: 2,
      prefillRows: 6,
      columns: [
        { header: '追蹤期別', width: 110 },
        { header: '計畫項目', width: 200 },
        { header: '執行狀況', width: 180 },
        { header: '達成率(%)', width: 100 },
        { header: '問題說明', width: 180 },
        { header: '改善措施', width: 180 },
        { header: '填報人員', width: 100 },
      ],
    },
  ],

  /** 109. 2.7.2 標準防護措施與接觸隔離 */
  109: [
    {
      sheetName: '手部衛生稽核紀錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      columns: [
        { header: '稽核日期', width: 100 },
        { header: '稽核單位', width: 130 },
        { header: '稽核對象職別', width: 130 },
        { header: '觀察次數', width: 100 },
        { header: '符合次數', width: 100 },
        { header: '執行率(%)', width: 100 },
        { header: '缺失說明', width: 180 },
        { header: '稽核人員', width: 100 },
      ],
    },
    {
      sheetName: 'PPE使用訓練紀錄表',
      archetype: 'training-record',
      criteriaIndex: 2,
      columns: [
        { header: '訓練日期', width: 100 },
        { header: '課程名稱', width: 180 },
        { header: '受訓人員', width: 180 },
        { header: '訓練時數', width: 100 },
        { header: '訓練內容', width: 200 },
        { header: '評核結果', width: 120 },
        { header: '紀錄人員', width: 100 },
      ],
    },
  ],

  /** 110. 2.7.3 醫療照護相關感染監測 */
  110: [
    {
      sheetName: '醫療照護感染率監測分析表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      prefillRows: 6,
      columns: [
        { header: '監測期別', width: 110 },
        { header: '感染類別', width: 160 },
        { header: '感染率', width: 100 },
        { header: '同類醫院基準', width: 130 },
        { header: '異常(是/否)', width: 100 },
        { header: '調查/改善措施', width: 200 },
        { header: '填報人員', width: 100 },
      ],
    },
  ],

  /** 111. 2.8.1 檢驗品質管理 */
  111: [
    {
      sheetName: '檢驗設備維護校正紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      columns: [
        { header: '維護日期', width: 100 },
        { header: '設備名稱', width: 160 },
        { header: '校正項目', width: 180 },
        { header: '校正結果', width: 150 },
        { header: '符合標準(是/否)', width: 130 },
        { header: '下次維護日期', width: 130 },
        { header: '執行人員', width: 100 },
      ],
    },
    {
      sheetName: '危急值通報紀錄表',
      archetype: 'incident-log',
      criteriaIndex: 2,
      columns: [
        { header: '通報日期時間', width: 140 },
        { header: '病人姓名', width: 110 },
        { header: '病歷號', width: 110 },
        { header: '危急值項目', width: 160 },
        { header: '數值', width: 90 },
        { header: '通報對象', width: 130 },
        { header: '接獲確認', width: 120 },
        { header: '通報人員', width: 100 },
      ],
    },
  ],

  /** 113. 2.8.3 血液銀行作業 */
  113: [
    {
      sheetName: '血品儲存溫度監控紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 2,
      columns: [
        { header: '記錄日期', width: 100 },
        { header: '記錄時間', width: 100 },
        { header: '冷藏庫溫度', width: 120 },
        { header: '冷凍庫溫度', width: 120 },
        { header: '符合標準(是/否)', width: 130 },
        { header: '異常警示', width: 150 },
        { header: '記錄人員', width: 100 },
      ],
    },
  ],

  /** 118. 2.8.8 一般放射作業 */
  118: [
    {
      sheetName: '輻射防護人員暴露監控清冊',
      archetype: 'inventory-list',
      criteriaIndex: 2,
      prefillRows: 10,
      columns: [
        { header: '人員姓名', width: 110 },
        { header: '職稱', width: 100 },
        { header: '劑量計編號', width: 130 },
        { header: '監測期別', width: 110 },
        { header: '累積劑量(mSv)', width: 130 },
        { header: '超標(是/否)', width: 100 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 119. 2.8.9 電腦斷層作業 */
  119: [
    {
      sheetName: 'CT設備校正品質保證紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '紀錄日期', width: 100 },
        { header: '設備名稱', width: 150 },
        { header: '校正項目', width: 180 },
        { header: '校正結果', width: 150 },
        { header: '符合標準(是/否)', width: 130 },
        { header: '下次校正日期', width: 130 },
        { header: '執行人員', width: 100 },
      ],
    },
  ],

  /** 120. 2.8.10 磁振造影作業 */
  120: [
    {
      sheetName: 'MRI安全篩選紀錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      columns: [
        { header: '篩選日期', width: 100 },
        { header: '病人姓名', width: 110 },
        { header: '磁性植入物查核', width: 130 },
        { header: '禁忌事項確認', width: 130 },
        { header: '安全通過(是/否)', width: 130 },
        { header: '特殊說明', width: 180 },
        { header: '執行人員', width: 100 },
      ],
    },
  ],

  /** 124. 2.8.14 醫學影像資訊管理 */
  124: [
    {
      sheetName: '影像系統備份維護紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '紀錄日期', width: 100 },
        { header: '系統名稱', width: 150 },
        { header: '備份狀態', width: 120 },
        { header: '備份完成時間', width: 130 },
        { header: '還原測試(是/否)', width: 130 },
        { header: '異常說明', width: 180 },
        { header: '執行人員', width: 100 },
      ],
    },
  ],
};
