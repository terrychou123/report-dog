/**
 * 一般護理之家評鑑補充文件定義
 * 115年度一般護理之家評鑑基準（15項）
 */
import type { SupplementaryDefsMap } from '../supplementary-sheet-types';

export const generalNursingHomeDefs: SupplementaryDefsMap = {

  /** 1. A1.1 機構負責人實際管理行政作業與照護品質 */
  1: [
    {
      sheetName: '負責人查看紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '查看日期', width: 100 },
        { header: '查看重點', width: 200 },
        { header: '發現事項', width: 200 },
        { header: '改善指示', width: 200 },
        { header: '負責人簽名', width: 110 },
      ],
    },
    {
      sheetName: '護理人員在職訓練記錄',
      archetype: 'training-record',
      criteriaIndex: 3,
      columns: [
        { header: '訓練日期', width: 100 },
        { header: '訓練主題', width: 200 },
        { header: '訓練時數', width: 90 },
        { header: '參加人員', width: 160 },
        { header: '講師', width: 110 },
        { header: '簽到', width: 80 },
      ],
    },
  ],

  /** 2. A1.2 專任人員配置及急救訓練情形 */
  2: [
    {
      sheetName: '急救訓練記錄表',
      archetype: 'training-record',
      criteriaIndex: 1,
      columns: [
        { header: '訓練日期', width: 100 },
        { header: '訓練機構', width: 160 },
        { header: '訓練時數', width: 90 },
        { header: '訓練科目(BLS/AED)', width: 160 },
        { header: '參加人員', width: 160 },
        { header: '證書效期', width: 100 },
      ],
    },
    {
      sheetName: '人員資格清冊',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '姓名', width: 100 },
        { header: '職稱', width: 120 },
        { header: '資格證書', width: 150 },
        { header: '證書字號', width: 140 },
        { header: '效期', width: 100 },
        { header: '備註', width: 130 },
      ],
    },
    {
      sheetName: '新進護理人員訓練記錄',
      archetype: 'training-record',
      criteriaIndex: 2,
      columns: [
        { header: '訓練日期', width: 100 },
        { header: '訓練主題', width: 200 },
        { header: '時數', width: 80 },
        { header: '受訓人員', width: 150 },
        { header: '講師', width: 110 },
        { header: '簽到', width: 80 },
      ],
    },
  ],

  /** 3. A1.3 意外或緊急事件處理流程及執行情形 */
  3: [
    {
      sheetName: '意外事件通報記錄表',
      archetype: 'incident-log',
      criteriaIndex: 1,
      columns: [
        { header: '發生日期時間', width: 130 },
        { header: '住民姓名', width: 110 },
        { header: '事件類型', width: 130 },
        { header: '事件描述', width: 220 },
        { header: '立即處置', width: 180 },
        { header: '通報時間', width: 100 },
        { header: '追蹤改善', width: 180 },
        { header: '通報人員', width: 100 },
      ],
    },
  ],

  /** 4. A2.1 防疫機制落實執行及檢討改善 */
  4: [
    {
      sheetName: '感染管制執行查核表',
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
      sheetName: '傳染病監測記錄表',
      archetype: 'daily-record',
      criteriaIndex: 2,
      columns: [
        { header: '監測日期', width: 100 },
        { header: '住民/員工人數', width: 130 },
        { header: '疑似症狀人數', width: 120 },
        { header: '監測結果', width: 180 },
        { header: '追蹤措施', width: 180 },
        { header: '負責人員', width: 100 },
      ],
    },
    {
      sheetName: '感染管制訓練記錄',
      archetype: 'training-record',
      criteriaIndex: 3,
      columns: [
        { header: '訓練日期', width: 100 },
        { header: '訓練主題', width: 200 },
        { header: '訓練時數', width: 90 },
        { header: '參加人員', width: 160 },
        { header: '講師', width: 110 },
        { header: '簽到', width: 80 },
      ],
    },
  ],

  /** 5. A2.2 推動安寧緩和療護及病人醫療自主權 */
  5: [
    {
      sheetName: '預立醫療決定執行清冊',
      archetype: 'inventory-list',
      criteriaIndex: 1,
      prefillRows: 8,
      columns: [
        { header: '住民姓名', width: 110 },
        { header: '說明日期', width: 100 },
        { header: '說明內容', width: 200 },
        { header: '住民意願', width: 150 },
        { header: 'AD/意願書完成日期', width: 150 },
        { header: '備註', width: 130 },
      ],
    },
    {
      sheetName: '安寧緩和療護訓練記錄',
      archetype: 'training-record',
      criteriaIndex: 2,
      columns: [
        { header: '訓練日期', width: 100 },
        { header: '訓練主題', width: 200 },
        { header: '時數', width: 80 },
        { header: '參加人員', width: 160 },
        { header: '講師', width: 110 },
      ],
    },
  ],

  /** 6. B1 住民服務需求評估及確實依評估結果執行照護計畫 */
  6: [
    {
      sheetName: '住民護理評估表',
      archetype: 'case-assessment',
      criteriaIndex: 0,
      columns: [
        { header: '評估日期', width: 100 },
        { header: '住民姓名', width: 110 },
        { header: '評估類型', width: 130 },
        { header: 'ADL分數', width: 90 },
        { header: '認知功能', width: 110 },
        { header: '身體狀況摘要', width: 200 },
        { header: '評估人員', width: 100 },
        { header: '簽名', width: 80 },
      ],
    },
    {
      sheetName: '個別化照護計畫表',
      archetype: 'care-plan',
      criteriaIndex: 1,
      columns: [
        { header: '計畫日期', width: 100 },
        { header: '住民姓名', width: 110 },
        { header: '照護目標', width: 180 },
        { header: '護理措施', width: 200 },
        { header: '團隊成員', width: 150 },
        { header: '修訂日期', width: 100 },
        { header: '簽名', width: 80 },
      ],
    },
  ],

  /** 7. B2 提供住民整合性照顧並定期檢討執行成效 */
  7: [
    {
      sheetName: '跨專業照護會議記錄',
      archetype: 'meeting-minutes',
      criteriaIndex: 0,
      columns: [
        { header: '會議日期', width: 100 },
        { header: '住民姓名', width: 110 },
        { header: '出席成員', width: 180 },
        { header: '評估摘要', width: 200 },
        { header: '照護決議', width: 200 },
        { header: '家屬意見', width: 160 },
        { header: '主持人', width: 100 },
      ],
    },
    {
      sheetName: '住民ADL評估追蹤表',
      archetype: 'care-plan',
      criteriaIndex: 3,
      columns: [
        { header: '評估日期', width: 100 },
        { header: '住民姓名', width: 110 },
        { header: 'ADL分數', width: 90 },
        { header: '認知評估', width: 120 },
        { header: '功能變化', width: 150 },
        { header: '照護調整', width: 180 },
        { header: '評估人員', width: 100 },
      ],
    },
  ],

  /** 8. B3 訂有品質監測指標並定期檢討執行成效 */
  8: [
    {
      sheetName: '護理品質指標監測表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      prefillRows: 6,
      columns: [
        { header: '統計期間', width: 110 },
        { header: '指標名稱', width: 160 },
        { header: '指標值', width: 90 },
        { header: '目標值', width: 90 },
        { header: '達標狀況', width: 100 },
        { header: '改善措施', width: 200 },
        { header: '負責人', width: 100 },
      ],
    },
    {
      sheetName: '品質改善追蹤記錄',
      archetype: 'care-plan',
      criteriaIndex: 2,
      columns: [
        { header: '問題描述', width: 180 },
        { header: '根本原因', width: 180 },
        { header: '改善目標', width: 160 },
        { header: '改善措施', width: 200 },
        { header: '執行期限', width: 100 },
        { header: '追蹤結果', width: 180 },
        { header: '負責人', width: 100 },
      ],
    },
    {
      sheetName: '品質教育訓練記錄',
      archetype: 'training-record',
      criteriaIndex: 3,
      columns: [
        { header: '訓練日期', width: 100 },
        { header: '訓練主題', width: 200 },
        { header: '時數', width: 80 },
        { header: '參加人員', width: 160 },
        { header: '講師', width: 110 },
      ],
    },
  ],

  /** 9. C1 災害緊急應變計畫及作業程序符合機構及住民需要並落實演練 */
  9: [
    {
      sheetName: '消防演練記錄表',
      archetype: 'training-record',
      criteriaIndex: 1,
      columns: [
        { header: '演練日期', width: 100 },
        { header: '演練類型(日/夜)', width: 140 },
        { header: '演練場景', width: 180 },
        { header: '參加人員', width: 160 },
        { header: '演練結果', width: 160 },
        { header: '缺失改善', width: 180 },
        { header: '負責人', width: 100 },
      ],
    },
    {
      sheetName: '消防設備維護查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 3,
      columns: [
        { header: '查核日期', width: 100 },
        { header: '設備名稱', width: 150 },
        { header: '檢查項目', width: 200 },
        { header: '正常', width: 70 },
        { header: '異常', width: 70 },
        { header: '維修記錄', width: 180 },
        { header: '查核人員', width: 100 },
      ],
    },
  ],

  /** 10. C2 疏散避難系統及等待救援空間設置 */
  10: [
    {
      sheetName: '疏散系統定期查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      columns: [
        { header: '查核日期', width: 100 },
        { header: '查核區域', width: 140 },
        { header: '查核項目', width: 220 },
        { header: '符合', width: 70 },
        { header: '不符合', width: 80 },
        { header: '改善措施', width: 200 },
        { header: '查核人員', width: 100 },
      ],
    },
  ],

  /** 11. C3 疏散策略及持續照顧作業程序並落實教育訓練 */
  11: [
    {
      sheetName: '住民個別疏散策略清冊',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '住民姓名', width: 110 },
        { header: '失能程度', width: 110 },
        { header: '疏散方式', width: 150 },
        { header: '協助器具', width: 140 },
        { header: '負責人員', width: 110 },
        { header: '更新日期', width: 100 },
      ],
    },
    {
      sheetName: '疏散策略訓練記錄',
      archetype: 'training-record',
      criteriaIndex: 2,
      columns: [
        { header: '訓練日期', width: 100 },
        { header: '訓練主題', width: 200 },
        { header: '時數', width: 80 },
        { header: '參加人員', width: 160 },
        { header: '講師', width: 110 },
        { header: '實地測驗結果', width: 150 },
      ],
    },
  ],

  /** 12. C4 情境式火災風險辨識與溝通並依情境實地抽測演練 */
  12: [
    {
      sheetName: '情境式演練記錄表',
      archetype: 'training-record',
      criteriaIndex: 2,
      columns: [
        { header: '演練日期', width: 100 },
        { header: '演練情境', width: 180 },
        { header: '起火位置設定', width: 140 },
        { header: '參加人員', width: 160 },
        { header: '執行結果', width: 180 },
        { header: '缺失改善', width: 180 },
        { header: '評核人員', width: 100 },
      ],
    },
  ],

  /** 13. D1 創新或配合政策執行 */
  13: [
    {
      sheetName: '創新服務成果記錄清冊',
      archetype: 'inventory-list',
      criteriaIndex: 2,
      prefillRows: 5,
      columns: [
        { header: '服務名稱', width: 160 },
        { header: '執行期間', width: 130 },
        { header: '合作單位', width: 160 },
        { header: '成效描述', width: 220 },
        { header: '受益人數', width: 100 },
        { header: '評估日期', width: 100 },
      ],
    },
  ],

  /** 14. D2 強化住民口腔健康照護 */
  14: [
    {
      sheetName: '住民口腔評估記錄表',
      archetype: 'case-assessment',
      criteriaIndex: 0,
      columns: [
        { header: '評估日期', width: 100 },
        { header: '住民姓名', width: 110 },
        { header: '口腔健康評估', width: 160 },
        { header: '照護需求', width: 150 },
        { header: '照護計畫', width: 200 },
        { header: '評估人員', width: 100 },
      ],
    },
    {
      sheetName: '口腔清潔執行紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 2,
      columns: [
        { header: '執行日期', width: 100 },
        { header: '住民姓名', width: 110 },
        { header: '清潔項目', width: 150 },
        { header: '執行情形', width: 160 },
        { header: '異常發現', width: 160 },
        { header: '執行人員', width: 100 },
      ],
    },
    {
      sheetName: '口腔照護技能訓練記錄',
      archetype: 'training-record',
      criteriaIndex: 1,
      columns: [
        { header: '訓練日期', width: 100 },
        { header: '訓練主題', width: 200 },
        { header: '時數', width: 80 },
        { header: '參加人員', width: 160 },
        { header: '講師', width: 110 },
      ],
    },
  ],

  // Item 15 (D3) is isTrialDeduction=true — skipped per rules

};
