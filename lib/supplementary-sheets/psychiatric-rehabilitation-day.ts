/**
 * 精神復健機構（日間型）評鑑補充文件定義
 * 115年度精神復健機構評鑑基準－日間型機構（36條）
 * 術語：服務對象稱「學員」
 */
import type { SupplementaryDefsMap } from '../supplementary-sheet-types';

export const psychiatricRehabilitationDayDefs: SupplementaryDefsMap = {

  /** 1. 1.1 機構負責人之經營管理 */
  1: [
    {
      sheetName: '短中長程計畫執行成效紀錄',
      archetype: 'care-plan',
      criteriaIndex: 0,
      columns: [
        { header: '計畫期程(短/中/長程)', width: 150 },
        { header: '計畫目標', width: 200 },
        { header: '行動策略', width: 220 },
        { header: '執行日期', width: 100 },
        { header: '執行成效', width: 200 },
        { header: '負責人員', width: 110 },
      ],
    },
    {
      sheetName: '經營管理會議紀錄',
      archetype: 'meeting-minutes',
      criteriaIndex: 2,
      columns: [
        { header: '會議日期', width: 100 },
        { header: '出席成員', width: 180 },
        { header: '議程摘要', width: 220 },
        { header: '決議事項', width: 220 },
        { header: '執行期限', width: 100 },
        { header: '主持人', width: 100 },
      ],
    },
  ],

  /** 2. 1.2 專任工作人員人力穩定性（可選） */
  2: [
    {
      sheetName: '工作人員留任率統計清冊',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 12,
      columns: [
        { header: '姓名', width: 100 },
        { header: '職稱', width: 120 },
        { header: '到職日期', width: 110 },
        { header: '在職年資', width: 100 },
        { header: '留任1年以上', width: 120 },
        { header: '激勵措施說明', width: 180 },
        { header: '備註', width: 110 },
      ],
    },
  ],

  /** 3. 1.3 督導與教育訓練制度 */
  3: [
    {
      sheetName: '年度教育訓練計畫執行記錄',
      archetype: 'training-record',
      criteriaIndex: 0,
      columns: [
        { header: '訓練日期', width: 100 },
        { header: '訓練主題', width: 200 },
        { header: '訓練類型(CRPD/CEDAW/性騷擾防治/其他)', width: 220 },
        { header: '訓練時數', width: 90 },
        { header: '參加人員', width: 160 },
        { header: '講師', width: 110 },
        { header: '簽到', width: 80 },
      ],
    },
    {
      sheetName: '工作人員督導紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      columns: [
        { header: '督導日期', width: 100 },
        { header: '工作人員姓名', width: 120 },
        { header: '年資未滿2年', width: 110 },
        { header: '督導方式(個別/團體)', width: 150 },
        { header: '督導內容摘要', width: 220 },
        { header: '後續追蹤', width: 160 },
        { header: '督導者', width: 100 },
      ],
    },
  ],

  /** 4. 1.4 工作人員定期接受健康檢查情形 */
  4: [
    {
      sheetName: '工作人員健康檢查清冊',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 12,
      columns: [
        { header: '姓名', width: 100 },
        { header: '職稱', width: 120 },
        { header: '健檢日期', width: 100 },
        { header: '健檢機構', width: 150 },
        { header: '胸部X光結果', width: 120 },
        { header: '健檢結果', width: 130 },
        { header: '異常追蹤情形', width: 160 },
        { header: '備註', width: 100 },
      ],
    },
  ],

  /** 6. 1.6 復健資源開發及運用 */
  6: [
    {
      sheetName: '復健資源清冊',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '資源名稱', width: 160 },
        { header: '資源類型', width: 150 },
        { header: '聯繫單位', width: 160 },
        { header: '服務內容', width: 200 },
        { header: '運用紀錄日期', width: 130 },
        { header: '學員受益情形', width: 180 },
        { header: '最近盤點日期', width: 130 },
      ],
    },
  ],

  /** 9. 1.9 前次評鑑建議事項辦理情形（可選） */
  9: [
    {
      sheetName: '評鑑建議事項改善追蹤表',
      archetype: 'care-plan',
      criteriaIndex: 0,
      columns: [
        { header: '建議事項', width: 220 },
        { header: '改善措施', width: 220 },
        { header: '執行期限', width: 100 },
        { header: '改善結果', width: 200 },
        { header: '佐證資料', width: 160 },
        { header: '負責人員', width: 110 },
        { header: '確認日期', width: 100 },
      ],
    },
  ],

  /** 11. 2.1 復健評估 */
  11: [
    {
      sheetName: '整合性復健評估記錄',
      archetype: 'case-assessment',
      criteriaIndex: 0,
      columns: [
        { header: '評估日期', width: 100 },
        { header: '學員姓名', width: 110 },
        { header: '評估類型(收案/定期)', width: 160 },
        { header: '職業功能', width: 130 },
        { header: '社會功能', width: 130 },
        { header: '心理狀況', width: 130 },
        { header: '自殺風險評估', width: 130 },
        { header: '評估工具', width: 140 },
        { header: '評估人員', width: 100 },
        { header: '管理人員簽名', width: 120 },
      ],
    },
  ],

  /** 12. 2.2 訂定復健目標及計畫 */
  12: [
    {
      sheetName: '個別化復健計畫表',
      archetype: 'care-plan',
      criteriaIndex: 0,
      columns: [
        { header: '計畫日期', width: 100 },
        { header: '學員姓名', width: 110 },
        { header: '復健目標', width: 200 },
        { header: '社區資源結合', width: 160 },
        { header: '主責工作人員', width: 120 },
        { header: '學員簽名', width: 110 },
        { header: '修正日期', width: 100 },
        { header: '修正原因', width: 160 },
      ],
    },
  ],

  /** 13. 2.3 提供社區生活化之多元復健服務 */
  13: [
    {
      sheetName: '多元復健服務紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '服務日期', width: 100 },
        { header: '學員姓名', width: 110 },
        { header: '服務類型', width: 160 },
        { header: '服務內容', width: 200 },
        { header: '社區資源運用', width: 160 },
        { header: '學員參與情形', width: 150 },
        { header: '執行人員', width: 100 },
      ],
    },
  ],

  /** 14. 2.4 活動妥善規劃並定期修正 */
  14: [
    {
      sheetName: '團體活動計畫書',
      archetype: 'care-plan',
      criteriaIndex: 1,
      columns: [
        { header: '活動名稱', width: 180 },
        { header: '活動類型', width: 130 },
        { header: '活動頻率', width: 110 },
        { header: '適用功能程度', width: 140 },
        { header: '社區資源結合', width: 160 },
        { header: '負責人員', width: 110 },
        { header: '修正日期', width: 100 },
      ],
    },
  ],

  /** 16. 2.6 提供工作復健訓練及轉銜服務 */
  16: [
    {
      sheetName: '工作復健訓練記錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '執行日期', width: 100 },
        { header: '學員姓名', width: 110 },
        { header: '訓練內容', width: 200 },
        { header: '訓練階段', width: 120 },
        { header: '技能進展', width: 160 },
        { header: '轉銜服務情形', width: 160 },
        { header: '執行人員', width: 100 },
      ],
    },
  ],

  /** 17. 2.7 定期生活諮詢及心理輔導 */
  17: [
    {
      sheetName: '個別會談紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '會談日期', width: 100 },
        { header: '學員姓名', width: 110 },
        { header: '會談目的', width: 180 },
        { header: '輔導內容', width: 220 },
        { header: '後續處理計畫', width: 200 },
        { header: '主責專業人員', width: 120 },
      ],
    },
  ],

  /** 18. 2.8 輔導規則就醫及藥物自我管理 */
  18: [
    {
      sheetName: '學員藥物管理清冊',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '學員姓名', width: 110 },
        { header: '藥物名稱', width: 160 },
        { header: '服用時間及劑量', width: 150 },
        { header: '存放方式(自管/機構代管)', width: 180 },
        { header: '服藥遵從性評估', width: 160 },
        { header: '就醫輔導情形', width: 160 },
        { header: '備註', width: 110 },
      ],
    },
  ],

  /** 19. 2.9 召開社區復健及適應討論會 */
  19: [
    {
      sheetName: '社區復健討論會紀錄',
      archetype: 'meeting-minutes',
      criteriaIndex: 0,
      columns: [
        { header: '會議日期', width: 100 },
        { header: '出席人數', width: 100 },
        { header: '時長(分鐘)', width: 110 },
        { header: '議題內容', width: 220 },
        { header: '討論摘要', width: 220 },
        { header: '後續追蹤', width: 180 },
        { header: '帶領人員', width: 100 },
      ],
    },
  ],

  /** 20. 2.10 召開學員自治會議 */
  20: [
    {
      sheetName: '學員自治會議紀錄',
      archetype: 'meeting-minutes',
      criteriaIndex: 0,
      columns: [
        { header: '會議日期', width: 100 },
        { header: '出席人數', width: 100 },
        { header: '時長(分鐘)', width: 110 },
        { header: '主席（學員）', width: 120 },
        { header: '紀錄員（學員）', width: 120 },
        { header: '議程摘要', width: 220 },
        { header: '決議事項', width: 200 },
        { header: '工作人員列席', width: 120 },
      ],
    },
  ],

  /** 21. 2.11 提供學員家庭支持服務 */
  21: [
    {
      sheetName: '家屬聯繫紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '聯繫日期', width: 100 },
        { header: '學員姓名', width: 110 },
        { header: '家屬姓名', width: 110 },
        { header: '聯繫方式', width: 130 },
        { header: '學員復健情形說明', width: 200 },
        { header: '家屬回應', width: 160 },
        { header: '負責人員', width: 100 },
      ],
    },
    {
      sheetName: '家屬座談暨聯誼活動紀錄',
      archetype: 'training-record',
      criteriaIndex: 1,
      columns: [
        { header: '活動日期', width: 100 },
        { header: '活動主題', width: 200 },
        { header: '活動類型(座談/聯誼)', width: 160 },
        { header: '參加家屬人數', width: 120 },
        { header: '覆蓋學員比率', width: 120 },
        { header: '活動成效', width: 180 },
        { header: '備註', width: 110 },
      ],
    },
  ],

  /** 22. 2.12 社區融合 */
  22: [
    {
      sheetName: '社區融合活動紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '活動日期', width: 100 },
        { header: '活動名稱', width: 180 },
        { header: '活動地點(社區)', width: 160 },
        { header: '參與學員人數', width: 120 },
        { header: '社區交流情形', width: 180 },
        { header: '照片/佐證', width: 110 },
        { header: '負責人員', width: 100 },
      ],
    },
  ],

  /** 23. 2.13 社會參與（試辦） */
  23: [
    {
      sheetName: '公民倡議活動參與紀錄',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '活動日期', width: 100 },
        { header: '活動名稱', width: 180 },
        { header: '活動類型(公民/倡議)', width: 160 },
        { header: '參與學員人數', width: 120 },
        { header: '學員說明活動內容', width: 200 },
        { header: '照片/佐證', width: 110 },
        { header: '負責人員', width: 100 },
      ],
    },
  ],

  /** 24. 2.14 同儕支持（試辦） */
  24: [
    {
      sheetName: '同儕支持活動紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '活動日期', width: 100 },
        { header: '活動名稱', width: 180 },
        { header: '社群形成方式', width: 180 },
        { header: '參與學員人數', width: 120 },
        { header: '相互支持情形', width: 200 },
        { header: '照片/佐證', width: 110 },
        { header: '工作人員', width: 100 },
      ],
    },
  ],

  /** 26. 3.2 訂定適當收案標準，並落實執行 */
  26: [
    {
      sheetName: '收案查核表',
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

  /** 27. 3.3 訂定適當結案標準，並落實執行 */
  27: [
    {
      sheetName: '結案及回歸社區生活紀錄',
      archetype: 'care-plan',
      criteriaIndex: 0,
      columns: [
        { header: '結案日期', width: 100 },
        { header: '學員姓名', width: 110 },
        { header: '結案原因', width: 160 },
        { header: '回歸社區計畫', width: 200 },
        { header: '就學/就業情形', width: 150 },
        { header: '通報衛生局日期', width: 130 },
        { header: '負責人員', width: 110 },
      ],
    },
  ],

  /** 28. 3.4 紀錄完整，並妥善管理 */
  28: [
    {
      sheetName: '個案紀錄管理查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
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

  /** 29. 3.5 適切的復健基金管理 */
  29: [
    {
      sheetName: '復健基金每月收支明細表',
      archetype: 'daily-record',
      criteriaIndex: 2,
      columns: [
        { header: '月份', width: 90 },
        { header: '收入項目', width: 160 },
        { header: '收入金額', width: 110 },
        { header: '支出項目', width: 160 },
        { header: '支出金額', width: 110 },
        { header: '餘額', width: 100 },
        { header: '公告日期', width: 100 },
        { header: '審核人員', width: 110 },
      ],
    },
    {
      sheetName: '學員工作獎勵金發放清冊',
      archetype: 'inventory-list',
      criteriaIndex: 3,
      prefillRows: 10,
      columns: [
        { header: '月份', width: 90 },
        { header: '學員姓名', width: 110 },
        { header: '服務工作內容', width: 180 },
        { header: '獎勵金額', width: 110 },
        { header: '發放日期', width: 110 },
        { header: '學員簽收', width: 110 },
      ],
    },
  ],

  /** 30. 3.6 落實學員權益維護措施 */
  30: [
    {
      sheetName: '學員權益維護查核表',
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

  /** 31. 3.7 落實學員健康維護措施 */
  31: [
    {
      sheetName: '學員健康檢查清冊',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '學員姓名', width: 110 },
        { header: '入案日期', width: 100 },
        { header: '胸部X光日期', width: 120 },
        { header: '成人健檢日期', width: 120 },
        { header: '健檢結果', width: 160 },
        { header: '異常追蹤情形', width: 160 },
        { header: '疫苗接種情形', width: 130 },
        { header: '備註', width: 100 },
      ],
    },
    {
      sheetName: '學員健康監測紀錄',
      archetype: 'daily-record',
      criteriaIndex: 8,
      columns: [
        { header: '統計期間', width: 110 },
        { header: '監測指標', width: 180 },
        { header: '監測結果', width: 160 },
        { header: '分析摘要', width: 200 },
        { header: '改善措施', width: 180 },
        { header: '負責人員', width: 100 },
      ],
    },
  ],

  /** 32. 3.8 訂定處理緊急醫療、異常及群聚感染事件處理流程 */
  32: [
    {
      sheetName: '緊急及異常事件處理紀錄',
      archetype: 'incident-log',
      criteriaIndex: 0,
      columns: [
        { header: '發生日期時間', width: 130 },
        { header: '學員姓名', width: 110 },
        { header: '事件類型(緊急醫療/異常/感染)', width: 180 },
        { header: '事件描述', width: 220 },
        { header: '立即處置', width: 180 },
        { header: '通知相關人員', width: 160 },
        { header: '就醫協助情形', width: 160 },
        { header: '通報人員', width: 100 },
      ],
    },
  ],

  /** 33. 3.9 建立機構緊急應變管理機制並落實執行 */
  33: [
    {
      sheetName: '複合式緊急災害應變演練紀錄',
      archetype: 'training-record',
      criteriaIndex: 1,
      columns: [
        { header: '演練日期', width: 100 },
        { header: '演練類型(火災/風災/地震等)', width: 180 },
        { header: '演練場景', width: 180 },
        { header: '參加人員', width: 160 },
        { header: '學員疏散情形', width: 160 },
        { header: '缺失事項', width: 180 },
        { header: '改善措施', width: 180 },
        { header: '負責人', width: 100 },
      ],
    },
  ],

  /** 34. 3.10 召開品質管理相關會議 */
  34: [
    {
      sheetName: '品質管理會議紀錄',
      archetype: 'meeting-minutes',
      criteriaIndex: 0,
      columns: [
        { header: '會議日期', width: 100 },
        { header: '出席成員(含兼任)', width: 200 },
        { header: '議程摘要', width: 220 },
        { header: '決議事項', width: 220 },
        { header: '追蹤改善措施', width: 200 },
        { header: '主持人', width: 100 },
      ],
    },
  ],

  /** 35. 3.11 執行學員及家屬滿意度調查 */
  35: [
    {
      sheetName: '滿意度調查統計分析表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      columns: [
        { header: '調查日期', width: 100 },
        { header: '調查對象(學員/家屬)', width: 150 },
        { header: '有效份數', width: 100 },
        { header: '調查面向', width: 180 },
        { header: '平均滿意度', width: 120 },
        { header: '主要意見摘要', width: 200 },
        { header: '改善措施', width: 180 },
        { header: '公告日期', width: 100 },
      ],
    },
  ],

};
