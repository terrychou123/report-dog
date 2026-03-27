/**
 * 日間照顧中心評鑑補充文件定義
 * 113年度臺北市政府社會局日間照顧機構評鑑基準（43項）
 *
 * 每個評鑑項目除「檢核表」外，額外提供對應的實務文件範本。
 * 純行為性標準（如「態度尊重」）不產生文件，故不列入。
 */
import type { SupplementaryDefsMap } from '../supplementary-sheet-types';

export const daycareDefs: SupplementaryDefsMap = {

  // ── 壹、個案權益保障 ──────────────────────────────────────────────────────

  /** 1. 服務資訊公開 */
  1: [
    {
      sheetName: '機構簡介內容核對表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      columns: [
        { header: '應載明事項', width: 220 },
        { header: '符合', width: 70 },
        { header: '不符合', width: 80 },
        { header: '說明/連結', width: 200 },
        { header: '更新日期', width: 100 },
        { header: '負責人員', width: 100 },
      ],
    },
  ],

  /** 2. 個案基本權益維護 */
  2: [
    {
      sheetName: '個案權益告知同意書',
      archetype: 'case-assessment',
      criteriaIndex: 1,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '代理人姓名', width: 110 },
        { header: '告知項目', width: 220 },
        { header: '說明日期', width: 100 },
        { header: '個案/代理人簽名', width: 140 },
        { header: '說明人員簽名', width: 120 },
      ],
    },
  ],

  /** 3. 個案隱私保護 */
  3: [
    {
      sheetName: '個案資料借閱登記表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      columns: [
        { header: '日期', width: 100 },
        { header: '借閱人姓名', width: 110 },
        { header: '借閱目的', width: 180 },
        { header: '借閱項目', width: 180 },
        { header: '歸還日期', width: 100 },
        { header: '主管核准', width: 100 },
      ],
    },
    {
      sheetName: '影像蒐集使用同意書',
      archetype: 'case-assessment',
      criteriaIndex: 3,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '同意事項（拍照/錄影/發布）', width: 240 },
        { header: '不同意事項', width: 180 },
        { header: '同意日期', width: 100 },
        { header: '個案/家屬簽名', width: 130 },
      ],
    },
  ],

  /** 4. 申訴機制 */
  4: [
    {
      sheetName: '申訴受理暨處理記錄表',
      archetype: 'incident-log',
      criteriaIndex: 2,
      columns: [
        { header: '受理日期', width: 100 },
        { header: '申訴人', width: 100 },
        { header: '申訴方式', width: 100 },
        { header: '申訴內容摘要', width: 260 },
        { header: '處理措施', width: 200 },
        { header: '回覆日期', width: 100 },
        { header: '申訴人滿意', width: 100 },
        { header: '承辦人', width: 90 },
      ],
    },
  ],

  // ── 貳、專業照護品質 ──────────────────────────────────────────────────────

  /** 5. 入案評估 */
  5: [
    {
      sheetName: '個案入案需求評估表',
      archetype: 'case-assessment',
      criteriaIndex: 0,
      prefillRows: 3,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '評估日期', width: 100 },
        { header: '身體功能(ADL)', width: 130 },
        { header: '認知功能(MMSE)', width: 130 },
        { header: '社會支持狀況', width: 150 },
        { header: '其他評估結果', width: 160 },
        { header: '評估人員簽名', width: 120 },
      ],
    },
    {
      sheetName: '定期重新評估追蹤表',
      archetype: 'daily-record',
      criteriaIndex: 3,
      prefillRows: 6,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '評估日期', width: 100 },
        { header: '評估工具', width: 120 },
        { header: '本次評估結果', width: 160 },
        { header: '與前次比較', width: 140 },
        { header: '計畫調整說明', width: 180 },
        { header: '評估人員', width: 100 },
      ],
    },
  ],

  /** 6. 個別照顧計畫 */
  6: [
    {
      sheetName: '個別照顧計畫書(ICP)',
      archetype: 'care-plan',
      criteriaIndex: 0,
      prefillRows: 3,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '計畫日期', width: 100 },
        { header: '照護問題/需求', width: 180 },
        { header: '照護目標', width: 170 },
        { header: '服務內容', width: 200 },
        { header: '負責人員', width: 100 },
        { header: '個案/家屬同意日期', width: 140 },
        { header: '跨專業討論記錄', width: 160 },
      ],
    },
  ],

  /** 7. 個別照顧計畫執行與評值 */
  7: [
    {
      sheetName: '照顧計畫執行紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '執行服務項目', width: 200 },
        { header: '執行情形', width: 160 },
        { header: '個案反應', width: 150 },
        { header: '記錄人員', width: 100 },
      ],
    },
    {
      sheetName: '照顧計畫評值記錄表',
      archetype: 'case-assessment',
      criteriaIndex: 1,
      prefillRows: 4,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '評值日期', width: 100 },
        { header: '目標達成情形', width: 180 },
        { header: '計畫調整內容', width: 200 },
        { header: '調整原因', width: 160 },
        { header: '評值人員', width: 100 },
      ],
    },
  ],

  /** 8. 日常生活照顧 */
  8: [
    {
      sheetName: '日常生活照顧紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 2,
      columns: [
        { header: '日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '情緒狀態', width: 120 },
        { header: '活動參與情形', width: 150 },
        { header: '個人衛生協助', width: 140 },
        { header: '移位/步行協助', width: 140 },
        { header: '特殊狀況說明', width: 180 },
        { header: '記錄人員', width: 100 },
      ],
    },
  ],

  /** 9. 活動設計與執行 */
  9: [
    {
      sheetName: '月度活動計畫表',
      archetype: 'care-plan',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '活動日期', width: 100 },
        { header: '活動名稱', width: 160 },
        { header: '活動類型', width: 120 },
        { header: '個別化考量說明', width: 200 },
        { header: '負責人員', width: 110 },
        { header: '所需材料/場地', width: 160 },
      ],
    },
    {
      sheetName: '活動執行暨成效紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 2,
      columns: [
        { header: '活動日期', width: 100 },
        { header: '活動名稱', width: 160 },
        { header: '參與人數', width: 90 },
        { header: '個案反應', width: 180 },
        { header: '執行人員觀察', width: 180 },
        { header: '下次調整建議', width: 180 },
        { header: '記錄人', width: 90 },
      ],
    },
  ],

  /** 10. 健康管理 */
  10: [
    {
      sheetName: '生命徵象定期記錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '量測日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '血壓(mmHg)', width: 110 },
        { header: '脈搏(次/分)', width: 110 },
        { header: '體溫(°C)', width: 100 },
        { header: '血氧(%)', width: 90 },
        { header: '血糖(mg/dL)', width: 110 },
        { header: '異常處置', width: 160 },
        { header: '量測人員', width: 100 },
      ],
    },
    {
      sheetName: '個案健康管理資料表',
      archetype: 'case-assessment',
      criteriaIndex: 3,
      prefillRows: 3,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '診斷病名', width: 160 },
        { header: '目前用藥', width: 200 },
        { header: '過敏史', width: 150 },
        { header: '就醫紀錄', width: 180 },
        { header: '家屬通知記錄', width: 160 },
        { header: '更新日期', width: 100 },
      ],
    },
  ],

  /** 11. 護理照護 */
  11: [
    {
      sheetName: '護理處置執行紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      columns: [
        { header: '日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '處置項目', width: 160 },
        { header: '處置內容', width: 220 },
        { header: '個案反應', width: 150 },
        { header: '執行護理師', width: 110 },
      ],
    },
    {
      sheetName: '護理評估記錄表',
      archetype: 'case-assessment',
      criteriaIndex: 2,
      prefillRows: 3,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '評估日期', width: 100 },
        { header: '評估項目', width: 180 },
        { header: '評估結果', width: 180 },
        { header: '護理問題', width: 160 },
        { header: '護理措施', width: 180 },
        { header: '護理師簽名', width: 110 },
      ],
    },
  ],

  /** 12. 用藥管理 */
  12: [
    {
      sheetName: '個案用藥清冊',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '藥品名稱', width: 160 },
        { header: '劑量', width: 80 },
        { header: '頻次', width: 100 },
        { header: '開立醫師/機構', width: 150 },
        { header: '開始用藥日期', width: 120 },
        { header: '停藥日期', width: 100 },
        { header: '更新人員', width: 100 },
      ],
    },
    {
      sheetName: '每日給藥紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      columns: [
        { header: '給藥日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '藥品名稱', width: 160 },
        { header: '給藥時間', width: 100 },
        { header: '劑量', width: 80 },
        { header: '個案反應', width: 150 },
        { header: '給藥人員', width: 100 },
      ],
    },
    {
      sheetName: '藥物儲存環境查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 2,
      columns: [
        { header: '查核日期', width: 100 },
        { header: '查核項目', width: 240 },
        { header: '符合', width: 70 },
        { header: '不符合', width: 80 },
        { header: '改善措施', width: 200 },
        { header: '查核人員', width: 100 },
      ],
    },
    {
      sheetName: '用藥錯誤通報記錄表',
      archetype: 'incident-log',
      criteriaIndex: 3,
      columns: [
        { header: '發生日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '錯誤類型', width: 140 },
        { header: '事件描述', width: 240 },
        { header: '立即處置', width: 200 },
        { header: '家屬通知', width: 90 },
        { header: '改善措施', width: 180 },
        { header: '通報人員', width: 100 },
      ],
    },
  ],

  /** 13. 飲食照護 */
  13: [
    {
      sheetName: '個案飲食型態記錄表',
      archetype: 'case-assessment',
      criteriaIndex: 0,
      prefillRows: 5,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '身體狀況說明', width: 180 },
        { header: '飲食型態', width: 150 },
        { header: '特殊飲食需求', width: 160 },
        { header: '調整日期', width: 100 },
        { header: '調整原因', width: 160 },
        { header: '負責人員', width: 100 },
      ],
    },
    {
      sheetName: '每日飲食攝取紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      columns: [
        { header: '日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '餐別', width: 80 },
        { header: '攝食量(%)', width: 100 },
        { header: '個案反應', width: 160 },
        { header: '吞嚥狀況', width: 120 },
        { header: '記錄人員', width: 100 },
      ],
    },
    {
      sheetName: '供餐環境衛生查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 3,
      columns: [
        { header: '查核日期', width: 100 },
        { header: '查核項目', width: 260 },
        { header: '符合', width: 70 },
        { header: '不符合', width: 80 },
        { header: '改善措施', width: 200 },
        { header: '改善期限', width: 100 },
        { header: '查核人員', width: 100 },
      ],
    },
  ],

  /** 14. 復健服務 */
  14: [
    {
      sheetName: '復健轉介記錄表',
      archetype: 'incident-log',
      criteriaIndex: 0,
      columns: [
        { header: '轉介日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '轉介原因', width: 180 },
        { header: '轉介類型', width: 130 },
        { header: '轉介機構/人員', width: 150 },
        { header: '追蹤回覆', width: 180 },
        { header: '轉介人員', width: 100 },
      ],
    },
    {
      sheetName: '個別化復健計畫表',
      archetype: 'care-plan',
      criteriaIndex: 1,
      prefillRows: 3,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '計畫日期', width: 100 },
        { header: '復健目標', width: 180 },
        { header: '復健項目', width: 160 },
        { header: '頻次/時間', width: 110 },
        { header: '治療師簽名', width: 110 },
        { header: '評值日期', width: 100 },
        { header: '評值結果', width: 160 },
      ],
    },
    {
      sheetName: '復健執行紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 2,
      columns: [
        { header: '服務日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '復健項目', width: 160 },
        { header: '執行內容', width: 200 },
        { header: '個案反應', width: 150 },
        { header: '治療師簽名', width: 110 },
      ],
    },
  ],

  /** 15. 失智照護 */
  15: [
    {
      sheetName: '失智友善環境查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
      columns: [
        { header: '查核日期', width: 100 },
        { header: '環境項目', width: 260 },
        { header: '符合', width: 70 },
        { header: '不符合', width: 80 },
        { header: '改善措施', width: 200 },
        { header: '查核人員', width: 100 },
      ],
    },
    {
      sheetName: 'BPSD評估暨因應記錄表',
      archetype: 'case-assessment',
      criteriaIndex: 3,
      prefillRows: 4,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '評估日期', width: 100 },
        { header: '行為精神症狀描述', width: 200 },
        { header: '嚴重程度', width: 100 },
        { header: '誘發因素', width: 160 },
        { header: '非藥物因應措施', width: 200 },
        { header: '成效觀察', width: 160 },
        { header: '評估人員', width: 100 },
      ],
    },
  ],

  /** 16. 家屬溝通與參與 */
  16: [
    {
      sheetName: '家屬會議紀錄表',
      archetype: 'meeting-minutes',
      criteriaIndex: 0,
      prefillRows: 4,
      columns: [
        { header: '會議日期', width: 100 },
        { header: '出席人員', width: 160 },
        { header: '個案姓名', width: 110 },
        { header: '討論事項', width: 220 },
        { header: '決議內容', width: 200 },
        { header: '家屬意見', width: 180 },
        { header: '追蹤辦理情形', width: 160 },
        { header: '記錄人', width: 90 },
      ],
    },
    {
      sheetName: '家屬溝通聯繫紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      columns: [
        { header: '聯繫日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '聯繫對象', width: 110 },
        { header: '聯繫方式', width: 110 },
        { header: '溝通內容', width: 240 },
        { header: '家屬回應', width: 180 },
        { header: '後續追蹤', width: 160 },
        { header: '記錄人', width: 90 },
      ],
    },
  ],

  /** 17. 緊急事件處理 */
  17: [
    {
      sheetName: '緊急事件通報處理記錄表',
      archetype: 'incident-log',
      criteriaIndex: 1,
      columns: [
        { header: '事件日期', width: 100 },
        { header: '事件時間', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '事件類型', width: 130 },
        { header: '事件描述', width: 240 },
        { header: '立即處置', width: 200 },
        { header: '家屬通知時間', width: 130 },
        { header: '後續追蹤', width: 180 },
        { header: '通報人員', width: 100 },
      ],
    },
    {
      sheetName: '緊急應變演練紀錄表',
      archetype: 'training-record',
      criteriaIndex: 2,
      prefillRows: 4,
      columns: [
        { header: '演練日期', width: 100 },
        { header: '演練類型', width: 150 },
        { header: '參與人數', width: 90 },
        { header: '演練情境說明', width: 220 },
        { header: '演練結果', width: 160 },
        { header: '缺失事項', width: 160 },
        { header: '改善措施', width: 180 },
        { header: '負責人員', width: 100 },
      ],
    },
  ],

  /** 18. 結案與轉介 */
  18: [
    {
      sheetName: '結案摘要表',
      archetype: 'case-assessment',
      criteriaIndex: 1,
      prefillRows: 3,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '結案日期', width: 100 },
        { header: '結案原因', width: 160 },
        { header: '服務期間', width: 160 },
        { header: '服務摘要', width: 220 },
        { header: '個案/家屬知悉', width: 120 },
        { header: '轉介去向', width: 160 },
        { header: '社工簽名', width: 100 },
      ],
    },
    {
      sheetName: '服務轉介追蹤記錄表',
      archetype: 'daily-record',
      criteriaIndex: 2,
      columns: [
        { header: '轉介日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '轉介機構/服務', width: 180 },
        { header: '轉介原因', width: 180 },
        { header: '追蹤日期', width: 100 },
        { header: '安置確認情形', width: 180 },
        { header: '承辦人', width: 90 },
      ],
    },
  ],

  /** 19. 志工服務 */
  19: [
    {
      sheetName: '志工服務紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      columns: [
        { header: '服務日期', width: 100 },
        { header: '志工姓名', width: 110 },
        { header: '服務時數', width: 90 },
        { header: '服務內容', width: 220 },
        { header: '服務個案/對象', width: 150 },
        { header: '備註', width: 150 },
        { header: '督導確認', width: 100 },
      ],
    },
    {
      sheetName: '志工教育訓練紀錄表',
      archetype: 'training-record',
      criteriaIndex: 2,
      prefillRows: 6,
      columns: [
        { header: '訓練日期', width: 100 },
        { header: '訓練主題', width: 180 },
        { header: '主講人', width: 110 },
        { header: '訓練時數', width: 90 },
        { header: '參訓志工姓名', width: 140 },
        { header: '簽名', width: 80 },
        { header: '備註', width: 120 },
      ],
    },
  ],

  /** 20. 跨專業團隊合作 */
  20: [
    {
      sheetName: '跨專業個案研討記錄表',
      archetype: 'meeting-minutes',
      criteriaIndex: 0,
      prefillRows: 4,
      columns: [
        { header: '會議日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '出席人員/職別', width: 180 },
        { header: '討論重點', width: 240 },
        { header: '決議事項', width: 200 },
        { header: '負責人員', width: 110 },
        { header: '追蹤期限', width: 100 },
        { header: '記錄人', width: 90 },
      ],
    },
  ],

  /** 21. 照護紀錄 */
  21: [
    {
      sheetName: '照護紀錄品質抽查表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '抽查日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '紀錄類型', width: 130 },
        { header: '格式完整', width: 90 },
        { header: '即時填寫', width: 90 },
        { header: '人員親自簽名', width: 120 },
        { header: '缺失說明', width: 180 },
        { header: '抽查人員', width: 100 },
      ],
    },
  ],

  /** 22. 服務品質改善 */
  22: [
    {
      sheetName: '服務品質自評表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '評核項目', width: 240 },
        { header: '評核結果', width: 120 },
        { header: '問題說明', width: 200 },
        { header: '改善計畫', width: 200 },
        { header: '預計完成日期', width: 120 },
        { header: '評核人員', width: 100 },
      ],
    },
    {
      sheetName: '品質改善計畫追蹤表',
      archetype: 'care-plan',
      criteriaIndex: 1,
      prefillRows: 6,
      columns: [
        { header: '問題描述', width: 220 },
        { header: '根本原因', width: 180 },
        { header: '改善措施', width: 200 },
        { header: '負責人員', width: 110 },
        { header: '執行期限', width: 100 },
        { header: '追蹤結果', width: 180 },
        { header: '結案日期', width: 100 },
      ],
    },
  ],

  // ── 參、經營管理效能 ──────────────────────────────────────────────────────

  /** 23. 機構行政管理 */
  23: [
    {
      sheetName: '行政會議紀錄表',
      archetype: 'meeting-minutes',
      criteriaIndex: 3,
      prefillRows: 5,
      columns: [
        { header: '會議日期', width: 100 },
        { header: '主持人', width: 100 },
        { header: '出席人員', width: 180 },
        { header: '報告事項', width: 220 },
        { header: '討論與決議', width: 220 },
        { header: '追蹤辦理情形', width: 160 },
        { header: '記錄人', width: 90 },
      ],
    },
  ],

  /** 24. 人員配置 */
  24: [
    {
      sheetName: '人員排班班表',
      archetype: 'inventory-list',
      criteriaIndex: 1,
      prefillRows: 10,
      columns: [
        { header: '人員姓名', width: 110 },
        { header: '職稱', width: 100 },
        { header: '班別(早/中/晚)', width: 140 },
        { header: '日期', width: 100 },
        { header: '出勤時間', width: 110 },
        { header: '個案照護比例', width: 130 },
        { header: '備註', width: 140 },
      ],
    },
  ],

  /** 25. 人員資格 */
  25: [
    {
      sheetName: '人員資格證書清冊',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '人員姓名', width: 110 },
        { header: '職稱', width: 110 },
        { header: '證書名稱', width: 180 },
        { header: '證書字號', width: 150 },
        { header: '有效期限', width: 110 },
        { header: '建檔日期', width: 100 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 26. 人員訓練 */
  26: [
    {
      sheetName: '年度教育訓練計畫表',
      archetype: 'care-plan',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '預計辦理日期', width: 130 },
        { header: '訓練主題', width: 200 },
        { header: '訓練類別', width: 120 },
        { header: '適用對象', width: 130 },
        { header: '預計時數', width: 90 },
        { header: '主辦人員', width: 100 },
        { header: '執行狀況', width: 130 },
      ],
    },
    {
      sheetName: '個人在職訓練時數紀錄表',
      archetype: 'training-record',
      criteriaIndex: 2,
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
  ],

  /** 27. 人員績效管理 */
  27: [
    {
      sheetName: '人員考核評分表',
      archetype: 'case-assessment',
      criteriaIndex: 1,
      prefillRows: 5,
      columns: [
        { header: '受考核人員', width: 110 },
        { header: '考核期間', width: 120 },
        { header: '考核項目', width: 200 },
        { header: '評分', width: 80 },
        { header: '主管意見', width: 200 },
        { header: '改善輔導事項', width: 180 },
        { header: '本人確認簽名', width: 120 },
        { header: '考核日期', width: 100 },
      ],
    },
  ],

  /** 28. 財務管理 */
  28: [
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

  /** 29. 收退費管理 */
  29: [
    {
      sheetName: '收退費爭議處理記錄表',
      archetype: 'incident-log',
      criteriaIndex: 3,
      columns: [
        { header: '受理日期', width: 100 },
        { header: '申訴人', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '爭議內容', width: 240 },
        { header: '處理方式', width: 200 },
        { header: '處理結果', width: 180 },
        { header: '當事人確認', width: 110 },
        { header: '承辦人', width: 90 },
      ],
    },
  ],

  /** 30. 資訊管理 */
  30: [
    {
      sheetName: '資料備份紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 2,
      columns: [
        { header: '備份日期', width: 100 },
        { header: '備份項目', width: 200 },
        { header: '備份方式', width: 150 },
        { header: '備份儲存位置', width: 180 },
        { header: '備份完整性確認', width: 140 },
        { header: '執行人員', width: 100 },
      ],
    },
  ],

  /** 31. 物料管理 */
  31: [
    {
      sheetName: '物料庫存管理表',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '物料名稱', width: 160 },
        { header: '規格', width: 120 },
        { header: '單位', width: 80 },
        { header: '庫存數量', width: 100 },
        { header: '安全庫存量', width: 120 },
        { header: '採購記錄', width: 140 },
        { header: '有效期限', width: 110 },
        { header: '管理人員', width: 100 },
      ],
    },
    {
      sheetName: '耗材使用紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 3,
      columns: [
        { header: '使用日期', width: 100 },
        { header: '物料名稱', width: 160 },
        { header: '使用數量', width: 100 },
        { header: '使用對象/目的', width: 180 },
        { header: '領取人員', width: 110 },
        { header: '剩餘庫存', width: 100 },
      ],
    },
  ],

  /** 32. 感染管制 */
  32: [
    {
      sheetName: '手部衛生稽核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
      columns: [
        { header: '稽核日期', width: 100 },
        { header: '稽核時段', width: 110 },
        { header: '稽核對象', width: 130 },
        { header: '應執行手衛生次數', width: 150 },
        { header: '實際執行次數', width: 130 },
        { header: '遵從率(%)', width: 100 },
        { header: '稽核人員', width: 100 },
      ],
    },
    {
      sheetName: '感染事件通報記錄表',
      archetype: 'incident-log',
      criteriaIndex: 2,
      columns: [
        { header: '通報日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '感染部位/類型', width: 150 },
        { header: '症狀描述', width: 200 },
        { header: '隔離措施', width: 160 },
        { header: '醫療處置', width: 180 },
        { header: '家屬通知', width: 90 },
        { header: '後續追蹤', width: 160 },
        { header: '通報人員', width: 100 },
      ],
    },
  ],

  /** 33. 委外服務管理 */
  33: [
    {
      sheetName: '委外廠商資格審查表',
      archetype: 'case-assessment',
      criteriaIndex: 1,
      prefillRows: 4,
      columns: [
        { header: '廠商名稱', width: 160 },
        { header: '委外服務項目', width: 180 },
        { header: '契約期間', width: 140 },
        { header: '資格符合事項', width: 200 },
        { header: '審查結果', width: 120 },
        { header: '審查日期', width: 100 },
        { header: '審查人員', width: 100 },
      ],
    },
    {
      sheetName: '委外服務品質查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 2,
      prefillRows: 6,
      columns: [
        { header: '查核日期', width: 100 },
        { header: '委外服務項目', width: 180 },
        { header: '查核項目', width: 220 },
        { header: '符合', width: 70 },
        { header: '不符合', width: 80 },
        { header: '問題說明', width: 180 },
        { header: '改善要求', width: 180 },
        { header: '查核人員', width: 100 },
      ],
    },
  ],

  /** 34. 危機管理計畫 */
  34: [
    {
      sheetName: '危機應變演練記錄表',
      archetype: 'training-record',
      criteriaIndex: 1,
      prefillRows: 4,
      columns: [
        { header: '演練日期', width: 100 },
        { header: '演練類型', width: 150 },
        { header: '參與人數', width: 90 },
        { header: '演練情境', width: 220 },
        { header: '執行情形', width: 180 },
        { header: '缺失事項', width: 180 },
        { header: '改善措施', width: 180 },
        { header: '負責人員', width: 100 },
      ],
    },
    {
      sheetName: '危機事件檢討改善記錄表',
      archetype: 'incident-log',
      criteriaIndex: 3,
      columns: [
        { header: '事件日期', width: 100 },
        { header: '事件類型', width: 150 },
        { header: '事件描述', width: 240 },
        { header: '根本原因分析', width: 200 },
        { header: '改善措施', width: 200 },
        { header: '執行期限', width: 100 },
        { header: '追蹤結果', width: 160 },
        { header: '負責人員', width: 100 },
      ],
    },
  ],

  /** 35. 品質監測機制 */
  35: [
    {
      sheetName: '品質指標監測月報表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      prefillRows: 6,
      columns: [
        { header: '監測月份', width: 100 },
        { header: '品質指標', width: 180 },
        { header: '本月數值', width: 100 },
        { header: '目標值', width: 100 },
        { header: '與上月比較', width: 120 },
        { header: '分析說明', width: 200 },
        { header: '改善行動', width: 180 },
        { header: '填報人員', width: 100 },
      ],
    },
  ],

  /** 36. 服務使用者滿意度調查 */
  36: [
    {
      sheetName: '滿意度調查結果分析表',
      archetype: 'case-assessment',
      criteriaIndex: 2,
      prefillRows: 6,
      columns: [
        { header: '調查年度', width: 100 },
        { header: '調查對象', width: 120 },
        { header: '問卷回收數', width: 110 },
        { header: '滿意度構面', width: 160 },
        { header: '平均分數', width: 100 },
        { header: '主要意見', width: 220 },
        { header: '改善措施', width: 200 },
        { header: '分析人員', width: 100 },
      ],
    },
  ],

  /** 37. 機構自評 */
  37: [
    {
      sheetName: '機構自評問題改善計畫表',
      archetype: 'care-plan',
      criteriaIndex: 2,
      prefillRows: 8,
      columns: [
        { header: '自評發現問題', width: 220 },
        { header: '問題原因', width: 180 },
        { header: '改善措施', width: 200 },
        { header: '負責人員', width: 110 },
        { header: '預計完成日期', width: 120 },
        { header: '追蹤結果', width: 180 },
        { header: '結案日期', width: 100 },
      ],
    },
  ],

  // ── 肆、安全環境設備 ──────────────────────────────────────────────────────

  /** 38. 空間環境 */
  38: [
    {
      sheetName: '空間環境定期查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 2,
      columns: [
        { header: '查核日期', width: 100 },
        { header: '查核區域', width: 150 },
        { header: '查核項目', width: 240 },
        { header: '符合', width: 70 },
        { header: '不符合', width: 80 },
        { header: '改善措施', width: 200 },
        { header: '查核人員', width: 100 },
      ],
    },
  ],

  /** 39. 消防安全 */
  39: [
    {
      sheetName: '消防設備定期檢查記錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      columns: [
        { header: '檢查日期', width: 100 },
        { header: '設備名稱', width: 160 },
        { header: '設備位置', width: 150 },
        { header: '符合', width: 70 },
        { header: '不符合', width: 80 },
        { header: '問題說明', width: 180 },
        { header: '修繕情形', width: 180 },
        { header: '檢查人員', width: 100 },
      ],
    },
    {
      sheetName: '消防演練記錄表',
      archetype: 'training-record',
      criteriaIndex: 2,
      prefillRows: 4,
      columns: [
        { header: '演練日期', width: 100 },
        { header: '演練情境', width: 200 },
        { header: '參與人數', width: 90 },
        { header: '疏散完成時間', width: 130 },
        { header: '演練評估', width: 200 },
        { header: '缺失改善', width: 180 },
        { header: '負責人員', width: 100 },
      ],
    },
  ],

  /** 40. 設備維護 */
  40: [
    {
      sheetName: '設備定期保養記錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      columns: [
        { header: '保養日期', width: 100 },
        { header: '設備名稱', width: 160 },
        { header: '保養項目', width: 200 },
        { header: '保養結果', width: 150 },
        { header: '下次保養日期', width: 130 },
        { header: '保養廠商/人員', width: 150 },
      ],
    },
    {
      sheetName: '設備損壞通報修繕記錄表',
      archetype: 'incident-log',
      criteriaIndex: 1,
      columns: [
        { header: '通報日期', width: 100 },
        { header: '設備名稱', width: 160 },
        { header: '損壞狀況', width: 220 },
        { header: '通報人員', width: 110 },
        { header: '修繕廠商', width: 140 },
        { header: '修繕完成日期', width: 130 },
        { header: '修繕結果', width: 160 },
      ],
    },
  ],

  /** 41. 無障礙設施 */
  41: [
    {
      sheetName: '無障礙設施定期查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 2,
      columns: [
        { header: '查核日期', width: 100 },
        { header: '設施名稱', width: 180 },
        { header: '設施位置', width: 150 },
        { header: '功能正常', width: 100 },
        { header: '需修繕', width: 90 },
        { header: '修繕說明', width: 180 },
        { header: '查核人員', width: 100 },
      ],
    },
  ],

  /** 42. 交通接送服務 */
  42: [
    {
      sheetName: '車輛保養檢查記錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 6,
      columns: [
        { header: '保養日期', width: 100 },
        { header: '車牌號碼', width: 110 },
        { header: '保養項目', width: 200 },
        { header: '保養結果', width: 150 },
        { header: '下次保養里程/日期', width: 160 },
        { header: '保養廠商', width: 130 },
      ],
    },
    {
      sheetName: '每日接送服務紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 2,
      columns: [
        { header: '接送日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '服務類別(接/送)', width: 150 },
        { header: '出發時間', width: 100 },
        { header: '抵達時間', width: 100 },
        { header: '個案狀況', width: 160 },
        { header: '駕駛人員', width: 100 },
      ],
    },
  ],

  /** 43. 安全監控 */
  43: [
    {
      sheetName: '安全監控設備查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 3,
      columns: [
        { header: '查核日期', width: 100 },
        { header: '設備名稱/位置', width: 200 },
        { header: '功能正常', width: 100 },
        { header: '異常說明', width: 180 },
        { header: '修繕情形', width: 160 },
        { header: '查核人員', width: 100 },
      ],
    },
    {
      sheetName: '個案外出返回記錄表',
      archetype: 'daily-record',
      criteriaIndex: 2,
      columns: [
        { header: '日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '外出時間', width: 100 },
        { header: '外出目的/去向', width: 180 },
        { header: '陪同人員', width: 120 },
        { header: '返回時間', width: 100 },
        { header: '個案狀況', width: 150 },
        { header: '記錄人員', width: 100 },
      ],
    },
  ],
};
