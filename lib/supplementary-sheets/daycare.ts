/**
 * 日間照顧中心評鑑補充文件定義
 * 115年度臺北市政府社會局日間照顧機構評鑑基準（43項 + 2加分題）
 *
 * 每個評鑑項目除「檢核表」外，額外提供對應的實務文件範本。
 * 純行為性標準（如「現場觀察」）不產生文件，故不列入。
 */
import type { SupplementaryDefsMap } from '../supplementary-sheet-types';

export const daycareDefs: SupplementaryDefsMap = {

  // ── 壹、個案權益保障 ──────────────────────────────────────────────────────

  /** 1. 服務資訊公開 */
  1: [
    {
      sheetName: '服務資訊公開核對表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      columns: [
        { header: '應公開事項', width: 220 },
        { header: '實體公告', width: 80 },
        { header: '網路平台', width: 80 },
        { header: '最近更新日期', width: 110 },
        { header: '說明/連結', width: 200 },
        { header: '負責人員', width: 100 },
      ],
    },
  ],

  /** 2. 意見反應/申訴機制的訂定與處理情形 */
  2: [
    {
      sheetName: '申訴意見受理暨處理記錄表',
      archetype: 'incident-log',
      criteriaIndex: 1,
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
    {
      sheetName: '意見反應季度彙整分析表',
      archetype: 'inspection-checklist',
      criteriaIndex: 3,
      columns: [
        { header: '季度', width: 80 },
        { header: '意見類別', width: 140 },
        { header: '件數', width: 80 },
        { header: '主要問題摘要', width: 220 },
        { header: '改善措施', width: 220 },
        { header: '追蹤結果', width: 160 },
        { header: '彙整人員', width: 100 },
      ],
    },
  ],

  /** 3. 服務契約簽訂情形 */
  3: [
    {
      sheetName: '服務契約簽訂查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 5,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '契約簽訂日期', width: 120 },
        { header: '使用版本（社會局核定）', width: 180 },
        { header: '審閱期3日確認', width: 130 },
        { header: '家屬/代理人簽名', width: 140 },
        { header: '服務費用告知', width: 120 },
        { header: '備註', width: 150 },
      ],
    },
  ],

  /** 4. 個人資料管理與保密性 */
  4: [
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
      sheetName: '影像肖像權同意書',
      archetype: 'case-assessment',
      criteriaIndex: 2,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '同意使用範圍（評鑑/宣傳/社媒）', width: 260 },
        { header: '不同意事項', width: 180 },
        { header: '同意日期', width: 100 },
        { header: '個案/家屬簽名', width: 130 },
      ],
    },
  ],

  // ── 貳、專業照護品質 ──────────────────────────────────────────────────────

  /** 5. 服務對象評估 */
  5: [
    {
      sheetName: '服務對象需求評估表',
      archetype: 'case-assessment',
      criteriaIndex: 0,
      prefillRows: 3,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '評估日期', width: 100 },
        { header: '評估工具（ADL/IADL/MMSE）', width: 200 },
        { header: '評估結果摘要', width: 180 },
        { header: '主要照護需求', width: 180 },
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
        { header: '重評日期', width: 100 },
        { header: '評估工具', width: 120 },
        { header: '本次評估結果', width: 160 },
        { header: '與前次比較', width: 140 },
        { header: '計畫調整說明', width: 180 },
        { header: '評估人員', width: 100 },
      ],
    },
  ],

  /** 6. 照顧計畫 */
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
        { header: '個案意見採納說明', width: 160 },
        { header: '家屬同意日期', width: 120 },
      ],
    },
  ],

  /** 7. 追蹤評值 */
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
      criteriaIndex: 2,
      prefillRows: 4,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '評值日期', width: 100 },
        { header: '目標達成情形', width: 180 },
        { header: '未達成原因', width: 160 },
        { header: '計畫調整內容', width: 200 },
        { header: '評值人員', width: 100 },
      ],
    },
  ],

  /** 8. 服務對象研討辦理情形 */
  8: [
    {
      sheetName: '服務對象研討會議記錄',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 4,
      columns: [
        { header: '研討日期', width: 100 },
        { header: '討論個案', width: 110 },
        { header: '出席人員', width: 160 },
        { header: '討論議題', width: 200 },
        { header: '結論與決議', width: 220 },
        { header: '後續追蹤', width: 160 },
        { header: '記錄人員', width: 100 },
      ],
    },
  ],

  /** 9. 督導機制辦理情形 */
  9: [
    {
      sheetName: '督導記錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 6,
      columns: [
        { header: '督導日期', width: 100 },
        { header: '督導者', width: 100 },
        { header: '受督人員', width: 110 },
        { header: '督導方式', width: 100 },
        { header: '督導內容摘要', width: 240 },
        { header: '改善事項', width: 200 },
        { header: '後續追蹤', width: 160 },
      ],
    },
  ],

  /** 10. 開案/收案、轉介、暫停服務與結案相關辦法 */
  10: [
    {
      sheetName: '個案服務歷程紀錄表',
      archetype: 'case-assessment',
      criteriaIndex: 0,
      prefillRows: 4,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '開案日期', width: 100 },
        { header: '收案/轉介/暫停/結案', width: 160 },
        { header: '事由', width: 200 },
        { header: '後續服務安排', width: 200 },
        { header: '家屬通知日期', width: 120 },
        { header: '承辦社工', width: 100 },
      ],
    },
  ],

  /** 11. 維持自我照顧能力 */
  11: [
    {
      sheetName: '自我照顧能力促進紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '促進項目（進食/穿衣/如廁/移位）', width: 240 },
        { header: '個案自理程度', width: 140 },
        { header: '協助方式', width: 150 },
        { header: '進步情形', width: 140 },
        { header: '記錄人員', width: 100 },
      ],
    },
  ],

  /** 12. 協助服藥 */
  12: [
    {
      sheetName: '個案用藥管理記錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '藥品名稱', width: 160 },
        { header: '劑量', width: 80 },
        { header: '給藥時間', width: 100 },
        { header: '給藥人員', width: 100 },
        { header: '個案服藥情形', width: 140 },
        { header: '異常說明', width: 160 },
      ],
    },
    {
      sheetName: '藥物儲存環境溫度記錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 2,
      columns: [
        { header: '日期', width: 100 },
        { header: '冷藏溫度(°C)', width: 120 },
        { header: '室溫藥品存放環境', width: 160 },
        { header: '符合規定', width: 90 },
        { header: '異常說明', width: 160 },
        { header: '記錄人員', width: 100 },
      ],
    },
  ],

  /** 13. 服務對象團體活動辦理情形 */
  13: [
    {
      sheetName: '月度團體活動計畫表',
      archetype: 'care-plan',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '活動日期', width: 100 },
        { header: '活動名稱', width: 160 },
        { header: '活動類型（認知/社交/身體/休閒）', width: 240 },
        { header: '適合對象說明', width: 160 },
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
        { header: '個案反應觀察', width: 200 },
        { header: '執行人員觀察', width: 180 },
        { header: '下次調整建議', width: 180 },
        { header: '記錄人', width: 90 },
      ],
    },
  ],

  /** 14. 安全看視 */
  14: [
    {
      sheetName: '個案安全看視計畫表',
      archetype: 'care-plan',
      criteriaIndex: 0,
      prefillRows: 5,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '風險等級', width: 90 },
        { header: '主要風險因素', width: 200 },
        { header: '看視頻率/方式', width: 160 },
        { header: '特殊注意事項', width: 200 },
        { header: '訂定日期', width: 100 },
        { header: '訂定人員', width: 100 },
      ],
    },
    {
      sheetName: '跌倒事件記錄表',
      archetype: 'incident-log',
      criteriaIndex: 3,
      columns: [
        { header: '發生日期時間', width: 130 },
        { header: '個案姓名', width: 110 },
        { header: '發生地點', width: 120 },
        { header: '事件描述', width: 240 },
        { header: '立即處置', width: 180 },
        { header: '家屬通知時間', width: 130 },
        { header: '後續追蹤', width: 160 },
        { header: '改善措施', width: 160 },
      ],
    },
  ],

  /** 15. 維護個人清潔衛生 */
  15: [
    {
      sheetName: '個人清潔衛生照護紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '口腔護理', width: 100 },
        { header: '梳洗/盥洗', width: 100 },
        { header: '頭髮整理', width: 100 },
        { header: '協助程度', width: 120 },
        { header: '記錄人員', width: 100 },
      ],
    },
  ],

  /** 16. 提供營養餐點服務 */
  16: [
    {
      sheetName: '每日菜單及熱量記錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '日期', width: 100 },
        { header: '早餐', width: 180 },
        { header: '午餐', width: 200 },
        { header: '點心', width: 150 },
        { header: '預估總熱量(kcal)', width: 140 },
        { header: '供餐來源（自製/委外）', width: 160 },
        { header: '備註', width: 160 },
      ],
    },
  ],

  /** 17. 提供適當之休閒及運動設施 */
  17: [
    {
      sheetName: '休閒運動設施定期維護記錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '設施名稱', width: 160 },
        { header: '最近保養日期', width: 120 },
        { header: '保養項目', width: 200 },
        { header: '功能正常', width: 90 },
        { header: '損壞說明', width: 160 },
        { header: '修繕完成日期', width: 120 },
        { header: '記錄人員', width: 100 },
      ],
    },
  ],

  /** 18. 辦理社會參與 */
  18: [
    {
      sheetName: '社會參與活動紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      prefillRows: 6,
      columns: [
        { header: '活動日期', width: 100 },
        { header: '活動名稱', width: 180 },
        { header: '活動地點', width: 140 },
        { header: '參與個案', width: 200 },
        { header: '安全評估說明', width: 180 },
        { header: '活動成效觀察', width: 200 },
        { header: '帶隊人員', width: 100 },
      ],
    },
  ],

  /** 19. 提供家屬支持性服務 */
  19: [
    {
      sheetName: '家屬聯繫及服務記錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '聯繫家屬', width: 110 },
        { header: '聯繫方式', width: 100 },
        { header: '溝通內容摘要', width: 240 },
        { header: '家屬反應', width: 160 },
        { header: '後續追蹤', width: 160 },
        { header: '聯繫人員', width: 100 },
      ],
    },
  ],

  /** 20. 服務對象健康檢查及健康管理情形 */
  20: [
    {
      sheetName: '個案年度健康檢查暨追蹤管理表',
      archetype: 'case-assessment',
      criteriaIndex: 0,
      prefillRows: 5,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '健康檢查日期', width: 120 },
        { header: '異常項目', width: 200 },
        { header: '後續處置', width: 180 },
        { header: '家屬告知日期', width: 120 },
        { header: '就醫紀錄', width: 160 },
        { header: '追蹤人員', width: 100 },
      ],
    },
    {
      sheetName: '生命徵象定期記錄表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      columns: [
        { header: '量測日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '血壓(mmHg)', width: 110 },
        { header: '脈搏(次/分)', width: 110 },
        { header: '體溫(°C)', width: 100 },
        { header: '血氧(%)', width: 90 },
        { header: '異常處置', width: 160 },
        { header: '量測人員', width: 100 },
      ],
    },
  ],

  /** 21. 防疫機制建置情形 */
  21: [
    {
      sheetName: '防疫演練紀錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 2,
      prefillRows: 3,
      columns: [
        { header: '演練日期', width: 100 },
        { header: '演練情境', width: 180 },
        { header: '參與人員', width: 180 },
        { header: '演練過程紀錄', width: 240 },
        { header: '缺失項目', width: 180 },
        { header: '改善措施', width: 180 },
        { header: '主辦人員', width: 100 },
      ],
    },
    {
      sheetName: '防疫物資庫存管理表',
      archetype: 'daily-record',
      criteriaIndex: 3,
      columns: [
        { header: '物資名稱', width: 140 },
        { header: '規格', width: 100 },
        { header: '入庫數量', width: 100 },
        { header: '使用數量', width: 100 },
        { header: '現有庫存', width: 100 },
        { header: '最低安全庫存', width: 130 },
        { header: '補貨提醒', width: 100 },
        { header: '記錄日期', width: 100 },
      ],
    },
  ],

  /** 22. 執行服務品管指標 */
  22: [
    {
      sheetName: '服務品質指標追蹤分析表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '指標名稱', width: 180 },
        { header: '目標值', width: 90 },
        { header: 'Q1實際值', width: 100 },
        { header: 'Q2實際值', width: 100 },
        { header: 'Q3實際值', width: 100 },
        { header: 'Q4實際值', width: 100 },
        { header: '異常分析', width: 200 },
        { header: '改善行動', width: 200 },
      ],
    },
  ],

  // ── 參、經營管理效能 ──────────────────────────────────────────────────────

  /** 23. 業務計畫及營運方針之擬定與執行情形 */
  23: [
    {
      sheetName: '年度業務計畫執行追蹤表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '計畫項目', width: 200 },
        { header: '目標值', width: 100 },
        { header: 'Q1執行情形', width: 130 },
        { header: 'Q2執行情形', width: 130 },
        { header: 'Q3執行情形', width: 130 },
        { header: 'Q4執行情形', width: 130 },
        { header: '未達目標原因', width: 180 },
        { header: '負責人員', width: 100 },
      ],
    },
  ],

  /** 24. 工作手冊及行政規範 */
  24: [
    {
      sheetName: '工作手冊暨行政規範核對表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '規範文件名稱', width: 200 },
        { header: '最近版本日期', width: 120 },
        { header: '符合實際作業', width: 120 },
        { header: '員工教育訓練日期', width: 140 },
        { header: '修訂說明', width: 200 },
        { header: '負責人員', width: 100 },
      ],
    },
  ],

  /** 25. 行政會議辦理情形 */
  25: [
    {
      sheetName: '行政會議記錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 6,
      columns: [
        { header: '會議日期', width: 100 },
        { header: '會議類別', width: 130 },
        { header: '出席人員', width: 180 },
        { header: '主要議題', width: 220 },
        { header: '決議事項', width: 220 },
        { header: '追蹤事項', width: 180 },
        { header: '主席簽名', width: 100 },
      ],
    },
  ],

  /** 26. 器材維護與管理 */
  26: [
    {
      sheetName: '器材維護管理記錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '器材名稱', width: 160 },
        { header: '器材編號', width: 100 },
        { header: '定期保養日期', width: 120 },
        { header: '保養項目', width: 200 },
        { header: '功能狀態', width: 100 },
        { header: '損壞紀錄', width: 160 },
        { header: '修繕完成日期', width: 120 },
        { header: '記錄人員', width: 100 },
      ],
    },
  ],

  /** 27. 前次評鑑建議改善情形 */
  27: [
    {
      sheetName: '評鑑建議改善追蹤表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 6,
      columns: [
        { header: '前次評鑑建議事項', width: 280 },
        { header: '負責人員', width: 110 },
        { header: '預計完成日期', width: 120 },
        { header: '改善執行內容', width: 240 },
        { header: '實際完成日期', width: 120 },
        { header: '佐證文件', width: 160 },
        { header: '改善結果', width: 140 },
      ],
    },
  ],

  /** 28. 人力設置情形 */
  28: [
    {
      sheetName: '人力設置符合性查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '職稱', width: 120 },
        { header: '應配置人數', width: 120 },
        { header: '實際在職人數', width: 120 },
        { header: '資格符合', width: 90 },
        { header: '缺額說明', width: 180 },
        { header: '招募進度', width: 160 },
        { header: '核查日期', width: 100 },
      ],
    },
  ],

  /** 29. 服務人員教育訓練情形 */
  29: [
    {
      sheetName: '年度教育訓練計畫暨執行記錄',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '訓練課程名稱', width: 200 },
        { header: '訓練類別', width: 120 },
        { header: '計畫辦理日期', width: 120 },
        { header: '實際辦理日期', width: 120 },
        { header: '訓練時數', width: 90 },
        { header: '參與人數', width: 90 },
        { header: '講師/機構', width: 140 },
        { header: '備註', width: 140 },
      ],
    },
  ],

  /** 30. 專任服務人員年度留任率 */
  30: [
    {
      sheetName: '服務人員年度留任率計算表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '職稱', width: 120 },
        { header: '年初在職人數', width: 120 },
        { header: '年底在職人數', width: 120 },
        { header: '留任率(%)', width: 100 },
        { header: '離職人數', width: 100 },
        { header: '主要離職原因', width: 200 },
        { header: '留任措施說明', width: 200 },
      ],
    },
  ],

  /** 31. 業務負責人執業能力 */
  31: [
    {
      sheetName: '業務負責人資格及在職訓練查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      columns: [
        { header: '查核項目', width: 240 },
        { header: '符合', width: 70 },
        { header: '不符合', width: 80 },
        { header: '證明文件', width: 180 },
        { header: '到期日', width: 100 },
        { header: '說明', width: 180 },
      ],
    },
  ],

  /** 32. 服務人員定期接受健康檢查情形 */
  32: [
    {
      sheetName: '服務人員健康檢查記錄彙整表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '員工姓名', width: 110 },
        { header: '職稱', width: 110 },
        { header: '健康檢查日期', width: 120 },
        { header: '胸部X光結果', width: 120 },
        { header: '其他異常項目', width: 160 },
        { header: '後續追蹤', width: 160 },
        { header: '下次檢查到期日', width: 130 },
      ],
    },
  ],

  /** 33. 服務人員接受疫苗注射情形 */
  33: [
    {
      sheetName: '服務人員疫苗接種記錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '員工姓名', width: 110 },
        { header: '流感疫苗接種日期', width: 140 },
        { header: 'COVID-19疫苗接種情形', width: 160 },
        { header: '其他疫苗', width: 120 },
        { header: '未接種原因', width: 160 },
        { header: '紀錄人員', width: 100 },
      ],
    },
  ],

  /** 34. 健全的財務管理制度 */
  34: [
    {
      sheetName: '財務管理制度查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 6,
      columns: [
        { header: '查核項目', width: 240 },
        { header: '符合', width: 70 },
        { header: '不符合', width: 80 },
        { header: '說明/備註', width: 200 },
        { header: '核查日期', width: 100 },
        { header: '核查人員', width: 100 },
      ],
    },
  ],

  /** 35. 意外或緊急事件處理情形 */
  35: [
    {
      sheetName: '意外及緊急事件報告表',
      archetype: 'incident-log',
      criteriaIndex: 0,
      columns: [
        { header: '事件日期時間', width: 130 },
        { header: '事件類別', width: 120 },
        { header: '當事人姓名', width: 110 },
        { header: '事件描述', width: 260 },
        { header: '立即處置措施', width: 200 },
        { header: '通報時間及對象', width: 160 },
        { header: '後續追蹤', width: 180 },
        { header: '改善措施', width: 180 },
        { header: '報告人員', width: 100 },
      ],
    },
    {
      sheetName: '緊急事件演練紀錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 3,
      prefillRows: 4,
      columns: [
        { header: '演練日期', width: 100 },
        { header: '演練情境', width: 180 },
        { header: '參與人員', width: 200 },
        { header: '演練過程', width: 240 },
        { header: '缺失項目', width: 180 },
        { header: '改善追蹤', width: 180 },
      ],
    },
  ],

  /** 36. 具有急救物品 */
  36: [
    {
      sheetName: '急救物品定期清點記錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      columns: [
        { header: '清點日期', width: 100 },
        { header: '物品名稱', width: 160 },
        { header: '數量', width: 80 },
        { header: '有效日期', width: 100 },
        { header: '狀態正常', width: 90 },
        { header: '補充/更換說明', width: 160 },
        { header: '清點人員', width: 100 },
      ],
    },
  ],

  /** 37. 機構性侵害及性騷擾事件防治機制建置情形 */
  37: [
    {
      sheetName: '性騷擾防治教育訓練記錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 2,
      prefillRows: 4,
      columns: [
        { header: '訓練日期', width: 100 },
        { header: '課程名稱', width: 200 },
        { header: '訓練時數', width: 90 },
        { header: '參與人員', width: 200 },
        { header: '講師', width: 120 },
        { header: '員工簽到數', width: 110 },
        { header: '備註', width: 160 },
      ],
    },
  ],

  // ── 肆、安全環境設備（一）硬體環境設施 ──────────────────────────────────

  /** 38. 符合高齡友善環境 */
  38: [
    {
      sheetName: '高齡友善環境定期查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '查核項目', width: 240 },
        { header: '符合', width: 70 },
        { header: '不符合', width: 80 },
        { header: '說明/改善事項', width: 220 },
        { header: '查核日期', width: 100 },
        { header: '查核人員', width: 100 },
      ],
    },
  ],

  /** 39. 設置盥洗衛生設備 */
  39: [
    {
      sheetName: '盥洗衛生設備查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '查核項目', width: 240 },
        { header: '符合', width: 70 },
        { header: '不符合', width: 80 },
        { header: '規格/說明', width: 180 },
        { header: '清潔頻率', width: 100 },
        { header: '查核日期', width: 100 },
        { header: '查核人員', width: 100 },
      ],
    },
  ],

  /** 40. 提供合宜之休息場所 */
  40: [
    {
      sheetName: '休息場所設施查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 6,
      columns: [
        { header: '查核項目', width: 240 },
        { header: '符合', width: 70 },
        { header: '不符合', width: 80 },
        { header: '說明/改善事項', width: 200 },
        { header: '查核日期', width: 100 },
        { header: '查核人員', width: 100 },
      ],
    },
  ],

  /** 41. 飲用水檢查 */
  41: [
    {
      sheetName: '飲用水質檢查記錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      columns: [
        { header: '檢查日期', width: 100 },
        { header: '水源類別（自來水/桶裝水/過濾）', width: 240 },
        { header: '檢驗項目', width: 160 },
        { header: '檢驗結果', width: 120 },
        { header: '符合規定', width: 90 },
        { header: '異常處理', width: 160 },
        { header: '記錄人員', width: 100 },
      ],
    },
  ],

  /** 42. 廚房衛生 */
  42: [
    {
      sheetName: '廚房衛生定期查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 12,
      columns: [
        { header: '查核項目', width: 240 },
        { header: '符合', width: 70 },
        { header: '不符合', width: 80 },
        { header: '說明/改善事項', width: 220 },
        { header: '查核日期', width: 100 },
        { header: '查核人員', width: 100 },
      ],
    },
  ],

  /** 43. 機構環境清潔及病媒防治措施 */
  43: [
    {
      sheetName: '環境清潔及病媒防治記錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '日期', width: 100 },
        { header: '清潔區域', width: 160 },
        { header: '清潔項目', width: 180 },
        { header: '清潔人員', width: 110 },
        { header: '督導人員', width: 110 },
        { header: '病媒防治紀錄', width: 180 },
        { header: '備註', width: 140 },
      ],
    },
  ],

};
