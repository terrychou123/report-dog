/**
 * 身心障礙福利機構評鑑補充文件定義
 * 身心障礙福利機構專業服務品質與經營管理自我檢核項目（21項）
 */
import type { SupplementaryDefsMap } from '../supplementary-sheet-types';

export const disabilityDefs: SupplementaryDefsMap = {

  /** 1. 生存權 */
  1: [
    {
      sheetName: '個別化飲食型態記錄表',
      archetype: 'case-assessment',
      criteriaIndex: 0,
      prefillRows: 5,
      columns: [
        { header: '服務使用者姓名', width: 130 },
        { header: '飲食需求說明', width: 200 },
        { header: '飲食型態', width: 150 },
        { header: '輔具需求', width: 150 },
        { header: '調整日期', width: 100 },
        { header: '負責人員', width: 100 },
      ],
    },
    {
      sheetName: '輔具管理清冊',
      archetype: 'inventory-list',
      criteriaIndex: 3,
      prefillRows: 8,
      columns: [
        { header: '服務使用者', width: 120 },
        { header: '輔具名稱', width: 160 },
        { header: '廠牌型號', width: 140 },
        { header: '取得日期', width: 100 },
        { header: '維護記錄', width: 160 },
        { header: '狀態', width: 100 },
        { header: '管理人員', width: 100 },
      ],
    },
  ],

  /** 2. 健康權 */
  2: [
    {
      sheetName: '健康狀況定期評估記錄表',
      archetype: 'case-assessment',
      criteriaIndex: 0,
      prefillRows: 4,
      columns: [
        { header: '服務使用者姓名', width: 130 },
        { header: '評估日期', width: 100 },
        { header: '評估項目', width: 180 },
        { header: '評估結果', width: 180 },
        { header: '照護調整', width: 180 },
        { header: '評估人員', width: 100 },
      ],
    },
    {
      sheetName: '用藥管理記錄表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      columns: [
        { header: '給藥日期', width: 100 },
        { header: '服務使用者姓名', width: 130 },
        { header: '藥品名稱', width: 160 },
        { header: '劑量/頻次', width: 120 },
        { header: '給藥時間', width: 100 },
        { header: '服務使用者反應', width: 160 },
        { header: '給藥人員', width: 100 },
      ],
    },
    {
      sheetName: '健康異常通報轉介記錄表',
      archetype: 'incident-log',
      criteriaIndex: 2,
      columns: [
        { header: '通報日期', width: 100 },
        { header: '服務使用者姓名', width: 130 },
        { header: '異常狀況', width: 200 },
        { header: '通報家屬時間', width: 130 },
        { header: '醫療轉介情形', width: 180 },
        { header: '後續追蹤', width: 160 },
        { header: '通報人員', width: 100 },
      ],
    },
  ],

  /** 3. 安全權 */
  3: [
    {
      sheetName: '安全設施環境定期查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      columns: [
        { header: '查核日期', width: 100 },
        { header: '查核區域', width: 140 },
        { header: '查核項目', width: 240 },
        { header: '符合', width: 70 },
        { header: '不符合', width: 80 },
        { header: '改善措施', width: 200 },
        { header: '查核人員', width: 100 },
      ],
    },
    {
      sheetName: '緊急事故處理記錄表',
      archetype: 'incident-log',
      criteriaIndex: 1,
      columns: [
        { header: '事故日期', width: 100 },
        { header: '服務使用者姓名', width: 130 },
        { header: '事故類型', width: 140 },
        { header: '事故描述', width: 240 },
        { header: '立即處置', width: 200 },
        { header: '家屬通知', width: 90 },
        { header: '後續追蹤', width: 160 },
        { header: '通報人員', width: 100 },
      ],
    },
    {
      sheetName: '防範虐待教育訓練記錄表',
      archetype: 'training-record',
      criteriaIndex: 4,
      prefillRows: 5,
      columns: [
        { header: '訓練日期', width: 100 },
        { header: '訓練主題', width: 200 },
        { header: '主講人員', width: 110 },
        { header: '參訓人員', width: 160 },
        { header: '訓練時數', width: 90 },
        { header: '簽名', width: 80 },
        { header: '備註', width: 120 },
      ],
    },
  ],

  /** 5. 隱私權 */
  5: [
    {
      sheetName: '個人資料保護執行查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 8,
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
      sheetName: '影像蒐集使用同意書',
      archetype: 'case-assessment',
      criteriaIndex: 2,
      prefillRows: 5,
      columns: [
        { header: '服務使用者姓名', width: 130 },
        { header: '法定代理人', width: 120 },
        { header: '同意蒐集項目', width: 200 },
        { header: '不同意項目', width: 180 },
        { header: '同意日期', width: 100 },
        { header: '簽名', width: 90 },
      ],
    },
  ],

  /** 6. 參與權 */
  6: [
    {
      sheetName: '服務使用者意見表達會議記錄表',
      archetype: 'meeting-minutes',
      criteriaIndex: 0,
      prefillRows: 4,
      columns: [
        { header: '會議日期', width: 100 },
        { header: '出席代表', width: 160 },
        { header: '討論議題', width: 220 },
        { header: '意見摘要', width: 220 },
        { header: '回應措施', width: 200 },
        { header: '後續追蹤', width: 160 },
        { header: '記錄人', width: 90 },
      ],
    },
  ],

  /** 7. 人際社交 */
  7: [
    {
      sheetName: '社區活動參與記錄表',
      archetype: 'daily-record',
      criteriaIndex: 2,
      columns: [
        { header: '活動日期', width: 100 },
        { header: '服務使用者姓名', width: 130 },
        { header: '活動名稱', width: 180 },
        { header: '活動類型', width: 130 },
        { header: '參與情形', width: 180 },
        { header: '個人反應', width: 160 },
        { header: '陪同人員', width: 100 },
      ],
    },
  ],

  /** 8. 申訴權 */
  8: [
    {
      sheetName: '申訴受理暨處理記錄表',
      archetype: 'incident-log',
      criteriaIndex: 2,
      columns: [
        { header: '受理日期', width: 100 },
        { header: '申訴人', width: 110 },
        { header: '申訴方式', width: 110 },
        { header: '申訴內容摘要', width: 260 },
        { header: '處理措施', width: 200 },
        { header: '回覆日期', width: 100 },
        { header: '申訴人滿意', width: 100 },
        { header: '承辦人', width: 90 },
      ],
    },
  ],

  /** 9. 個人想望 */
  9: [
    {
      sheetName: '個人生活史與想望評估表',
      archetype: 'case-assessment',
      criteriaIndex: 0,
      prefillRows: 3,
      columns: [
        { header: '服務使用者姓名', width: 130 },
        { header: '評估日期', width: 100 },
        { header: '生活史背景', width: 200 },
        { header: '興趣/喜好', width: 180 },
        { header: '個人目標', width: 180 },
        { header: '照顧計畫納入', width: 150 },
        { header: '評估人員', width: 100 },
      ],
    },
  ],

  /** 10. 個別化支持計畫（ISP） */
  10: [
    {
      sheetName: '個別化支持計畫書(ISP)',
      archetype: 'care-plan',
      criteriaIndex: 0,
      prefillRows: 3,
      columns: [
        { header: '服務使用者姓名', width: 130 },
        { header: '計畫日期', width: 100 },
        { header: '長期目標', width: 180 },
        { header: '短期目標', width: 180 },
        { header: '支持策略', width: 200 },
        { header: '負責人員', width: 100 },
        { header: '同意簽名', width: 110 },
        { header: '評值日期', width: 100 },
        { header: '評值結果', width: 160 },
      ],
    },
    {
      sheetName: 'ISP執行紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 4,
      columns: [
        { header: '記錄日期', width: 100 },
        { header: '服務使用者姓名', width: 130 },
        { header: '執行目標', width: 180 },
        { header: '執行情形', width: 200 },
        { header: '目標達成情況', width: 160 },
        { header: '記錄人員', width: 100 },
      ],
    },
  ],

  /** 11. 特殊照顧需求 */
  11: [
    {
      sheetName: '特殊照顧需求評估表',
      archetype: 'case-assessment',
      criteriaIndex: 0,
      prefillRows: 4,
      columns: [
        { header: '服務使用者姓名', width: 130 },
        { header: '評估日期', width: 100 },
        { header: '障礙類別/程度', width: 150 },
        { header: '輔具支持需求', width: 170 },
        { header: '醫療照護需求', width: 170 },
        { header: '飲食調整需求', width: 150 },
        { header: '評估人員', width: 100 },
      ],
    },
    {
      sheetName: '醫療照護處置執行記錄表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      columns: [
        { header: '記錄日期', width: 100 },
        { header: '服務使用者姓名', width: 130 },
        { header: '處置項目', width: 160 },
        { header: '執行內容', width: 220 },
        { header: '服務使用者反應', width: 160 },
        { header: '執行人員', width: 100 },
      ],
    },
  ],

  /** 12. 情緒行為支持 */
  12: [
    {
      sheetName: '正向行為支持計畫書',
      archetype: 'care-plan',
      criteriaIndex: 0,
      prefillRows: 3,
      columns: [
        { header: '服務使用者姓名', width: 130 },
        { header: '計畫日期', width: 100 },
        { header: '問題行為描述', width: 200 },
        { header: '功能分析結論', width: 200 },
        { header: '正向支持策略', width: 220 },
        { header: '負責人員', width: 100 },
        { header: '評值結果', width: 160 },
      ],
    },
    {
      sheetName: '情緒行為事件記錄表',
      archetype: 'incident-log',
      criteriaIndex: 2,
      columns: [
        { header: '事件日期', width: 100 },
        { header: '服務使用者姓名', width: 130 },
        { header: '行為描述', width: 220 },
        { header: '誘發因素', width: 180 },
        { header: '應對措施', width: 200 },
        { header: '後續追蹤', width: 160 },
        { header: '記錄人員', width: 100 },
      ],
    },
  ],

  /** 13. 多元支持服務 */
  13: [
    {
      sheetName: '跨專業個案研討記錄表',
      archetype: 'meeting-minutes',
      criteriaIndex: 2,
      prefillRows: 4,
      columns: [
        { header: '會議日期', width: 100 },
        { header: '服務使用者姓名', width: 130 },
        { header: '出席人員/職別', width: 180 },
        { header: '討論重點', width: 240 },
        { header: '決議調整事項', width: 200 },
        { header: '負責人員', width: 100 },
        { header: '追蹤期限', width: 100 },
        { header: '記錄人', width: 90 },
      ],
    },
    {
      sheetName: '復健服務轉介執行記錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '服務日期', width: 100 },
        { header: '服務使用者姓名', width: 130 },
        { header: '服務類型', width: 150 },
        { header: '服務內容', width: 200 },
        { header: '服務使用者反應', width: 160 },
        { header: '治療師簽名', width: 110 },
      ],
    },
  ],

  /** 14. 社區資源連結 */
  14: [
    {
      sheetName: '社區資源連結服務記錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '服務日期', width: 100 },
        { header: '服務使用者姓名', width: 130 },
        { header: '資源類型', width: 150 },
        { header: '連結單位', width: 160 },
        { header: '服務內容', width: 200 },
        { header: '參與情形', width: 160 },
        { header: '記錄人員', width: 100 },
      ],
    },
  ],

  /** 15. 家庭支持 */
  15: [
    {
      sheetName: '家庭評估記錄表',
      archetype: 'case-assessment',
      criteriaIndex: 0,
      prefillRows: 3,
      columns: [
        { header: '服務使用者姓名', width: 130 },
        { header: '評估日期', width: 100 },
        { header: '主要照顧者', width: 120 },
        { header: '家庭支持系統', width: 180 },
        { header: '家庭需求', width: 180 },
        { header: '加強支持計畫', width: 180 },
        { header: '評估社工', width: 100 },
      ],
    },
    {
      sheetName: '家庭會議記錄表',
      archetype: 'meeting-minutes',
      criteriaIndex: 1,
      prefillRows: 4,
      columns: [
        { header: '會議日期', width: 100 },
        { header: '服務使用者姓名', width: 130 },
        { header: '出席家屬', width: 150 },
        { header: '討論事項', width: 220 },
        { header: '家屬意見', width: 180 },
        { header: '決議事項', width: 200 },
        { header: '追蹤辦理', width: 160 },
        { header: '記錄人', width: 90 },
      ],
    },
  ],

  /** 16. 轉銜支持 */
  16: [
    {
      sheetName: '轉銜計畫書',
      archetype: 'care-plan',
      criteriaIndex: 0,
      prefillRows: 3,
      columns: [
        { header: '服務使用者姓名', width: 130 },
        { header: '計畫日期', width: 100 },
        { header: '轉銜需求評估', width: 200 },
        { header: '轉銜目標', width: 180 },
        { header: '轉銜措施', width: 200 },
        { header: '負責社工', width: 100 },
        { header: '預計轉銜日期', width: 130 },
      ],
    },
    {
      sheetName: '轉銜後適應追蹤記錄表',
      archetype: 'daily-record',
      criteriaIndex: 3,
      columns: [
        { header: '追蹤日期', width: 100 },
        { header: '服務使用者姓名', width: 130 },
        { header: '追蹤方式', width: 120 },
        { header: '適應情形', width: 200 },
        { header: '問題說明', width: 180 },
        { header: '支援措施', width: 180 },
        { header: '追蹤社工', width: 100 },
      ],
    },
  ],

  /** 18. 行政管理制度 */
  18: [
    {
      sheetName: '行政會議記錄表',
      archetype: 'meeting-minutes',
      criteriaIndex: 2,
      prefillRows: 4,
      columns: [
        { header: '會議日期', width: 100 },
        { header: '主持人', width: 100 },
        { header: '出席人員', width: 180 },
        { header: '報告事項', width: 220 },
        { header: '討論與決議', width: 220 },
        { header: '追蹤辦理', width: 160 },
        { header: '記錄人', width: 90 },
      ],
    },
    {
      sheetName: '危機應變演練記錄表',
      archetype: 'training-record',
      criteriaIndex: 5,
      prefillRows: 4,
      columns: [
        { header: '演練日期', width: 100 },
        { header: '演練類型', width: 160 },
        { header: '演練情境', width: 220 },
        { header: '參與人數', width: 90 },
        { header: '演練結果', width: 180 },
        { header: '缺失改善', width: 180 },
        { header: '負責人員', width: 100 },
      ],
    },
  ],

  /** 19. 服務管理機制 */
  19: [
    {
      sheetName: '服務使用者滿意度調查分析表',
      archetype: 'case-assessment',
      criteriaIndex: 4,
      prefillRows: 5,
      columns: [
        { header: '調查年度', width: 100 },
        { header: '調查對象', width: 120 },
        { header: '回收數', width: 90 },
        { header: '滿意度構面', width: 180 },
        { header: '平均分數', width: 100 },
        { header: '主要意見', width: 220 },
        { header: '改善措施', width: 200 },
        { header: '分析人員', width: 100 },
      ],
    },
    {
      sheetName: '品質指標監測記錄表',
      archetype: 'daily-record',
      criteriaIndex: 6,
      prefillRows: 6,
      columns: [
        { header: '監測月份', width: 100 },
        { header: '品質指標', width: 180 },
        { header: '本期數值', width: 100 },
        { header: '目標值', width: 100 },
        { header: '分析說明', width: 200 },
        { header: '改善行動', width: 180 },
        { header: '填報人員', width: 100 },
      ],
    },
  ],

  /** 20. 員工管理制度 */
  20: [
    {
      sheetName: '個人在職訓練時數記錄表',
      archetype: 'training-record',
      criteriaIndex: 4,
      prefillRows: 8,
      columns: [
        { header: '人員姓名', width: 110 },
        { header: '訓練日期', width: 100 },
        { header: '訓練主題', width: 200 },
        { header: '辦理機構', width: 150 },
        { header: '訓練時數', width: 90 },
        { header: '訓練類別', width: 110 },
        { header: '累計時數', width: 90 },
      ],
    },
    {
      sheetName: '人員資格清冊',
      archetype: 'inventory-list',
      criteriaIndex: 1,
      prefillRows: 8,
      columns: [
        { header: '人員姓名', width: 110 },
        { header: '職稱', width: 110 },
        { header: '資格名稱', width: 180 },
        { header: '證書字號', width: 150 },
        { header: '有效期限', width: 110 },
        { header: '建檔日期', width: 100 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 21. 會計財務管理 */
  21: [
    {
      sheetName: '財務收支明細記錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '日期', width: 100 },
        { header: '科目', width: 160 },
        { header: '收入金額', width: 110 },
        { header: '支出金額', width: 110 },
        { header: '憑證號碼', width: 110 },
        { header: '摘要', width: 200 },
        { header: '經辦人員', width: 100 },
      ],
    },
  ],
};
