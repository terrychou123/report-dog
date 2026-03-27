/**
 * 居家服務機構評鑑補充文件定義
 * 115年度臺北市政府社會局居家服務機構評鑑基準（32項）
 */
import type { SupplementaryDefsMap } from '../supplementary-sheet-types';

export const homeCareDefs: SupplementaryDefsMap = {

  /** 2. 個案基本權益維護 */
  2: [
    {
      sheetName: '個案權益聲明書清冊',
      archetype: 'inventory-list',
      criteriaIndex: 1,
      prefillRows: 10,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '說明日期', width: 100 },
        { header: '簽署狀況', width: 110 },
        { header: '說明人員', width: 100 },
        { header: '備註', width: 160 },
      ],
    },
  ],

  /** 3. 個案隱私保護 */
  3: [
    {
      sheetName: '個案隱私保護查核表',
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
  ],

  /** 4. 申訴機制 */
  4: [
    {
      sheetName: '申訴案件處理記錄表',
      archetype: 'incident-log',
      criteriaIndex: 2,
      columns: [
        { header: '收件日期', width: 100 },
        { header: '申訴人', width: 110 },
        { header: '申訴內容', width: 240 },
        { header: '處理方式', width: 200 },
        { header: '回覆日期', width: 100 },
        { header: '追蹤結果', width: 180 },
        { header: '承辦人', width: 90 },
      ],
    },
  ],

  /** 5. 入案評估 */
  5: [
    {
      sheetName: '入案需求評估表',
      archetype: 'case-assessment',
      criteriaIndex: 2,
      prefillRows: 5,
      columns: [
        { header: '評估日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: 'ADL分數', width: 100 },
        { header: 'IADL分數', width: 100 },
        { header: '身體功能', width: 160 },
        { header: '居家環境', width: 160 },
        { header: '評估結論', width: 200 },
        { header: '評估人員', width: 100 },
        { header: '簽名', width: 80 },
      ],
    },
    {
      sheetName: '定期評估更新記錄',
      archetype: 'care-plan',
      criteriaIndex: 3,
      prefillRows: 5,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '初評日期', width: 100 },
        { header: '複評日期', width: 100 },
        { header: 'ADL', width: 80 },
        { header: 'IADL', width: 80 },
        { header: '變化摘要', width: 200 },
        { header: '更新人員', width: 100 },
      ],
    },
  ],

  /** 6. 個別服務計畫 */
  6: [
    {
      sheetName: '個別服務計畫表',
      archetype: 'care-plan',
      criteriaIndex: 0,
      prefillRows: 5,
      columns: [
        { header: '計畫日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '服務目標', width: 180 },
        { header: '服務項目', width: 180 },
        { header: '頻率', width: 90 },
        { header: '負責人員', width: 100 },
        { header: '同意簽署', width: 100 },
        { header: '下次檢視日期', width: 120 },
      ],
    },
  ],

  /** 7. 服務計畫執行與評值 */
  7: [
    {
      sheetName: '服務執行紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '服務日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '服務項目', width: 180 },
        { header: '執行情形', width: 200 },
        { header: '執行時間', width: 100 },
        { header: '照服員簽名', width: 110 },
      ],
    },
    {
      sheetName: '服務計畫評值記錄',
      archetype: 'care-plan',
      criteriaIndex: 3,
      columns: [
        { header: '評值日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '評值結果', width: 200 },
        { header: '計畫調整內容', width: 200 },
        { header: '通知家屬日期', width: 120 },
        { header: '評值人員', width: 100 },
      ],
    },
  ],

  /** 8. 身體照顧服務 */
  8: [
    {
      sheetName: '身體照顧服務紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '服務日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '服務項目', width: 180 },
        { header: '服務情形', width: 200 },
        { header: '異常事項', width: 160 },
        { header: '照服員簽名', width: 110 },
      ],
    },
  ],

  /** 9. 日常生活協助 */
  9: [
    {
      sheetName: '日常生活協助紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 2,
      columns: [
        { header: '服務日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '家務項目', width: 160 },
        { header: '執行情形', width: 200 },
        { header: '備餐內容', width: 160 },
        { header: '照服員簽名', width: 110 },
      ],
    },
  ],

  /** 10. 緊急事件處理 */
  10: [
    {
      sheetName: '緊急事件通報記錄表',
      archetype: 'incident-log',
      criteriaIndex: 1,
      columns: [
        { header: '發生日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '事件類型', width: 140 },
        { header: '處理過程', width: 240 },
        { header: '通報對象', width: 120 },
        { header: '追蹤結果', width: 180 },
        { header: '處理人員', width: 100 },
      ],
    },
    {
      sheetName: '緊急事件訓練記錄',
      archetype: 'training-record',
      criteriaIndex: 3,
      columns: [
        { header: '訓練日期', width: 100 },
        { header: '訓練主題', width: 180 },
        { header: '訓練時數', width: 100 },
        { header: '參加人員', width: 180 },
        { header: '講師', width: 100 },
        { header: '簽到', width: 80 },
      ],
    },
  ],

  /** 11. 家屬溝通與參與 */
  11: [
    {
      sheetName: '家屬溝通記錄表',
      archetype: 'meeting-minutes',
      criteriaIndex: 1,
      columns: [
        { header: '溝通日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '溝通方式', width: 120 },
        { header: '溝通對象', width: 110 },
        { header: '主要討論', width: 220 },
        { header: '處理結果', width: 180 },
        { header: '社工簽名', width: 100 },
      ],
    },
  ],

  /** 12. 督導與訪視 */
  12: [
    {
      sheetName: '督導訪視記錄表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      columns: [
        { header: '訪視日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '訪視方式', width: 120 },
        { header: '訪視重點', width: 200 },
        { header: '發現問題', width: 180 },
        { header: '追蹤改善', width: 180 },
        { header: '督導簽名', width: 100 },
      ],
    },
  ],

  /** 13. 服務紀錄 */
  13: [
    {
      sheetName: '服務紀錄查核表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '查核日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '紀錄完整性', width: 130 },
        { header: '簽名狀況', width: 110 },
        { header: '異常記載', width: 180 },
        { header: '查核人員', width: 100 },
      ],
    },
  ],

  /** 14. 結案與轉介 */
  14: [
    {
      sheetName: '結案/轉介記錄表',
      archetype: 'care-plan',
      criteriaIndex: 2,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '結案/轉介日期', width: 130 },
        { header: '原因', width: 160 },
        { header: '轉介單位', width: 150 },
        { header: '追蹤日期', width: 100 },
        { header: '追蹤結果', width: 180 },
        { header: '社工簽名', width: 100 },
      ],
    },
  ],

  /** 15. 機構行政管理 */
  15: [
    {
      sheetName: '行政會議記錄表',
      archetype: 'meeting-minutes',
      criteriaIndex: 3,
      columns: [
        { header: '會議日期', width: 100 },
        { header: '出席人員', width: 180 },
        { header: '議題', width: 200 },
        { header: '決議事項', width: 200 },
        { header: '執行追蹤', width: 160 },
        { header: '主席簽名', width: 100 },
      ],
    },
  ],

  /** 16. 人員配置 */
  16: [
    {
      sheetName: '人員排班一覽表',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 15,
      columns: [
        { header: '人員姓名', width: 110 },
        { header: '職稱', width: 110 },
        { header: '服務時段', width: 130 },
        { header: '服務區域', width: 130 },
        { header: '擔任個案數', width: 110 },
        { header: '備註', width: 140 },
      ],
    },
  ],

  /** 17. 人員資格 */
  17: [
    {
      sheetName: '人員資格清冊',
      archetype: 'inventory-list',
      criteriaIndex: 1,
      prefillRows: 15,
      columns: [
        { header: '姓名', width: 110 },
        { header: '職稱', width: 110 },
        { header: '資格證書名稱', width: 180 },
        { header: '證書字號', width: 140 },
        { header: '效期', width: 100 },
        { header: '建檔日期', width: 100 },
      ],
    },
  ],

  /** 18. 人員訓練 */
  18: [
    {
      sheetName: '教育訓練記錄表',
      archetype: 'training-record',
      criteriaIndex: 1,
      columns: [
        { header: '訓練日期', width: 100 },
        { header: '訓練主題', width: 200 },
        { header: '訓練時數', width: 100 },
        { header: '訓練方式', width: 120 },
        { header: '參加人員', width: 180 },
        { header: '簽到表', width: 90 },
        { header: '講師', width: 100 },
      ],
    },
  ],

  /** 19. 人員健康管理 */
  19: [
    {
      sheetName: '人員健康檢查記錄',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 15,
      columns: [
        { header: '姓名', width: 110 },
        { header: '健檢日期', width: 100 },
        { header: '健檢機構', width: 160 },
        { header: '健檢結果', width: 140 },
        { header: '是否適任', width: 100 },
        { header: '備註', width: 140 },
      ],
    },
  ],

  /** 20. 人員績效管理 */
  20: [
    {
      sheetName: '人員考核記錄表',
      archetype: 'inventory-list',
      criteriaIndex: 2,
      prefillRows: 10,
      columns: [
        { header: '考核期間', width: 120 },
        { header: '姓名', width: 110 },
        { header: '考核項目', width: 180 },
        { header: '考核結果', width: 130 },
        { header: '獎懲建議', width: 150 },
        { header: '告知日期', width: 100 },
        { header: '主管簽名', width: 100 },
      ],
    },
  ],

  /** 22. 收退費管理 */
  22: [
    {
      sheetName: '收退費爭議記錄表',
      archetype: 'incident-log',
      criteriaIndex: 3,
      columns: [
        { header: '爭議日期', width: 100 },
        { header: '當事人', width: 110 },
        { header: '爭議內容', width: 240 },
        { header: '處理方式', width: 200 },
        { header: '結果', width: 160 },
        { header: '承辦人', width: 90 },
      ],
    },
  ],

  /** 23. 專任服務人員年度留任率 */
  23: [
    {
      sheetName: '人員留任率統計表',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 5,
      columns: [
        { header: '統計期間', width: 120 },
        { header: '年初人數', width: 100 },
        { header: '年末人數', width: 100 },
        { header: '離職人數', width: 100 },
        { header: '留任率', width: 90 },
        { header: '離職原因分析', width: 200 },
        { header: '改善措施', width: 180 },
      ],
    },
  ],

  /** 24. 兼任服務人員年度留任率 */
  24: [
    {
      sheetName: '兼任人員留任率統計',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 5,
      columns: [
        { header: '統計期間', width: 120 },
        { header: '年初人數', width: 100 },
        { header: '年末人數', width: 100 },
        { header: '離職人數', width: 100 },
        { header: '留任率', width: 90 },
        { header: '離職原因分析', width: 200 },
        { header: '改善措施', width: 180 },
      ],
    },
  ],

  /** 25. 資訊管理 */
  25: [
    {
      sheetName: '資訊管理查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      columns: [
        { header: '查核日期', width: 100 },
        { header: '查核項目', width: 260 },
        { header: '符合', width: 70 },
        { header: '不符合', width: 80 },
        { header: '備註', width: 180 },
        { header: '查核人員', width: 100 },
      ],
    },
  ],

  /** 26. 感染管制 */
  26: [
    {
      sheetName: '感染管制查核表',
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
      sheetName: '感染事件通報記錄',
      archetype: 'incident-log',
      criteriaIndex: 2,
      columns: [
        { header: '通報日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '事件描述', width: 240 },
        { header: '處理措施', width: 200 },
        { header: '追蹤結果', width: 180 },
        { header: '通報人員', width: 100 },
      ],
    },
    {
      sheetName: '感染管制訓練記錄',
      archetype: 'training-record',
      criteriaIndex: 3,
      columns: [
        { header: '訓練日期', width: 100 },
        { header: '訓練主題', width: 180 },
        { header: '時數', width: 80 },
        { header: '參加人員', width: 180 },
        { header: '講師', width: 100 },
      ],
    },
  ],

  /** 27. 服務品質改善 */
  27: [
    {
      sheetName: '品質改善計畫表',
      archetype: 'care-plan',
      criteriaIndex: 1,
      columns: [
        { header: '問題描述', width: 200 },
        { header: '根本原因分析', width: 200 },
        { header: '改善目標', width: 180 },
        { header: '改善措施', width: 200 },
        { header: '執行期限', width: 100 },
        { header: '追蹤結果', width: 180 },
        { header: '負責人', width: 90 },
      ],
    },
  ],

  /** 28. 服務使用者滿意度調查 */
  28: [
    {
      sheetName: '滿意度調查結果分析',
      archetype: 'inventory-list',
      criteriaIndex: 2,
      prefillRows: 3,
      columns: [
        { header: '調查期間', width: 120 },
        { header: '調查對象', width: 130 },
        { header: '回收份數', width: 100 },
        { header: '滿意度分數', width: 110 },
        { header: '主要優點', width: 180 },
        { header: '主要建議', width: 180 },
        { header: '改善措施', width: 180 },
      ],
    },
  ],

  /** 29. 品質監測機制 */
  29: [
    {
      sheetName: '品質指標監測記錄',
      archetype: 'daily-record',
      criteriaIndex: 0,
      prefillRows: 6,
      columns: [
        { header: '統計期間', width: 110 },
        { header: '指標名稱', width: 180 },
        { header: '目標值', width: 90 },
        { header: '實際值', width: 90 },
        { header: '達標狀況', width: 100 },
        { header: '改善行動', width: 200 },
        { header: '負責人', width: 90 },
      ],
    },
  ],

  /** 30. 機構自評 */
  30: [
    {
      sheetName: '機構自評改善計畫',
      archetype: 'care-plan',
      criteriaIndex: 2,
      columns: [
        { header: '評鑑項目', width: 160 },
        { header: '自評結果', width: 130 },
        { header: '發現缺失', width: 200 },
        { header: '改善目標', width: 180 },
        { header: '改善措施', width: 200 },
        { header: '執行期限', width: 100 },
        { header: '追蹤結果', width: 180 },
      ],
    },
  ],

  /** 31. 創新服務或社區資源連結（加分題） */
  31: [
    {
      sheetName: '社區資源連結成果清冊',
      archetype: 'inventory-list',
      criteriaIndex: 1,
      prefillRows: 8,
      columns: [
        { header: '資源名稱', width: 160 },
        { header: '合作單位', width: 160 },
        { header: '服務項目', width: 180 },
        { header: '受益個案數', width: 110 },
        { header: '成效記錄', width: 200 },
        { header: '建立日期', width: 100 },
      ],
    },
  ],

  /** 32. 照顧者支持服務（加分題） */
  32: [
    {
      sheetName: '照顧者支持課程記錄',
      archetype: 'training-record',
      criteriaIndex: 1,
      columns: [
        { header: '課程日期', width: 100 },
        { header: '課程主題', width: 200 },
        { header: '時數', width: 80 },
        { header: '參加人數', width: 100 },
        { header: '滿意度', width: 90 },
        { header: '成效追蹤', width: 180 },
        { header: '辦理人員', width: 100 },
      ],
    },
  ],

};
