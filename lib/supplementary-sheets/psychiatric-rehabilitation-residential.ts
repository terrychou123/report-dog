/**
 * 精神復健機構（住宿型）評鑑補充文件定義
 * 115年度精神復健機構評鑑基準－住宿型機構（40條）
 * 術語：服務對象稱「住民」
 */
import type { SupplementaryDefsMap } from '../supplementary-sheet-types';

export const psychiatricRehabilitationResidentialDefs: SupplementaryDefsMap = {

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

  /** 4. 1.4 適切的日、夜間人力配置（住宿型特有） */
  4: [
    {
      sheetName: '日夜間排班表及值班紀錄',
      archetype: 'inventory-list',
      criteriaIndex: 1,
      prefillRows: 10,
      columns: [
        { header: '日期', width: 100 },
        { header: '班別(日/夜)', width: 100 },
        { header: '姓名', width: 100 },
        { header: '職稱', width: 120 },
        { header: '排班時數', width: 110 },
        { header: '是否負責人/管理人/專業人員', width: 180 },
        { header: '備註', width: 110 },
      ],
    },
  ],

  /** 5. 1.5 工作人員定期接受健康檢查情形 */
  5: [
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

  /** 7. 1.7 復健資源開發及運用 */
  7: [
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
        { header: '住民受益情形', width: 180 },
        { header: '最近盤點日期', width: 130 },
      ],
    },
  ],

  /** 11. 1.11 前次評鑑建議事項辦理情形（可選） */
  11: [
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

  /** 13. 2.1 復健評估 */
  13: [
    {
      sheetName: '整合性復健評估記錄',
      archetype: 'case-assessment',
      criteriaIndex: 0,
      columns: [
        { header: '評估日期', width: 100 },
        { header: '住民姓名', width: 110 },
        { header: '評估類型(收案/定期)', width: 160 },
        { header: '職業功能', width: 130 },
        { header: '獨立生活功能', width: 140 },
        { header: '家庭與社會支持', width: 150 },
        { header: '自殺風險評估', width: 130 },
        { header: '評估工具', width: 140 },
        { header: '評估人員', width: 100 },
        { header: '管理人員簽名', width: 120 },
      ],
    },
  ],

  /** 14. 2.2 訂定復健目標及計畫 */
  14: [
    {
      sheetName: '個別化復健計畫表',
      archetype: 'care-plan',
      criteriaIndex: 0,
      columns: [
        { header: '計畫日期', width: 100 },
        { header: '住民姓名', width: 110 },
        { header: '復健目標', width: 200 },
        { header: '社區資源結合', width: 160 },
        { header: '主責工作人員', width: 120 },
        { header: '住民簽名', width: 110 },
        { header: '修正日期', width: 100 },
        { header: '修正原因', width: 160 },
      ],
    },
  ],

  /** 15. 2.3 提供個別化的獨立生活功能訓練（住宿型特有） */
  15: [
    {
      sheetName: '獨立生活功能訓練紀錄',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '執行日期', width: 100 },
        { header: '住民姓名', width: 110 },
        { header: '訓練內容', width: 200 },
        { header: '社區資源結合', width: 160 },
        { header: '成效評核', width: 160 },
        { header: '功能進展情形', width: 160 },
        { header: '執行人員', width: 100 },
      ],
    },
  ],

  /** 16. 2.4 活動妥善規劃並定期修正 */
  16: [
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

  /** 18. 2.6 職前準備、工作轉介或就業輔導 */
  18: [
    {
      sheetName: '就業輔導及轉銜服務紀錄',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '執行日期', width: 100 },
        { header: '住民姓名', width: 110 },
        { header: '服務類型(職前準備/轉介/就業輔導)', width: 200 },
        { header: '具體計畫內容', width: 200 },
        { header: '轉介機構/單位', width: 160 },
        { header: '成效追蹤', width: 160 },
        { header: '執行人員', width: 100 },
      ],
    },
  ],

  /** 19. 2.7 定期生活諮詢及心理輔導 */
  19: [
    {
      sheetName: '個別會談紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '會談日期', width: 100 },
        { header: '住民姓名', width: 110 },
        { header: '會談目的', width: 180 },
        { header: '輔導內容', width: 220 },
        { header: '後續處理計畫', width: 200 },
        { header: '主責專業人員', width: 120 },
      ],
    },
  ],

  /** 20. 2.8 輔導規則就醫及藥物自我管理 */
  20: [
    {
      sheetName: '住民藥物管理清冊',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '住民姓名', width: 110 },
        { header: '藥物名稱', width: 160 },
        { header: '服用時間及劑量', width: 150 },
        { header: '存放方式(自管/機構代管)', width: 180 },
        { header: '服藥遵從性評估', width: 160 },
        { header: '就醫輔導情形', width: 160 },
        { header: '備註', width: 110 },
      ],
    },
  ],

  /** 21. 2.9 召開社區復健及適應討論會 */
  21: [
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

  /** 22. 2.10 召開住民自治會議 */
  22: [
    {
      sheetName: '住民自治會議紀錄',
      archetype: 'meeting-minutes',
      criteriaIndex: 0,
      columns: [
        { header: '會議日期', width: 100 },
        { header: '出席人數', width: 100 },
        { header: '時長(分鐘)', width: 110 },
        { header: '主席（住民）', width: 120 },
        { header: '紀錄員（住民）', width: 120 },
        { header: '議程摘要', width: 220 },
        { header: '決議事項', width: 200 },
        { header: '工作人員列席', width: 120 },
      ],
    },
  ],

  /** 23. 2.11 提供住民家庭支持服務 */
  23: [
    {
      sheetName: '家屬聯繫紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '聯繫日期', width: 100 },
        { header: '住民姓名', width: 110 },
        { header: '家屬姓名', width: 110 },
        { header: '聯繫方式', width: 130 },
        { header: '住民復健情形說明', width: 200 },
        { header: '家屬回應', width: 160 },
        { header: '負責人員', width: 100 },
      ],
    },
    {
      sheetName: '家屬座談暨聯誼活動紀錄',
      archetype: 'training-record',
      criteriaIndex: 2,
      columns: [
        { header: '活動日期', width: 100 },
        { header: '活動主題', width: 200 },
        { header: '活動類型(座談/聯誼)', width: 160 },
        { header: '參加家屬人數', width: 120 },
        { header: '覆蓋住民比率', width: 120 },
        { header: '活動成效', width: 180 },
        { header: '備註', width: 110 },
      ],
    },
  ],

  /** 24. 2.12 社區融合 */
  24: [
    {
      sheetName: '社區融合活動紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '活動日期', width: 100 },
        { header: '活動名稱', width: 180 },
        { header: '活動地點(社區)', width: 160 },
        { header: '參與住民人數', width: 120 },
        { header: '社區交流情形', width: 180 },
        { header: '照片/佐證', width: 110 },
        { header: '負責人員', width: 100 },
      ],
    },
  ],

  /** 25. 2.13 社會參與（試辦） */
  25: [
    {
      sheetName: '公民倡議活動參與紀錄',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '活動日期', width: 100 },
        { header: '活動名稱', width: 180 },
        { header: '活動類型(公民/倡議)', width: 160 },
        { header: '參與住民人數', width: 120 },
        { header: '住民說明活動內容', width: 200 },
        { header: '照片/佐證', width: 110 },
        { header: '負責人員', width: 100 },
      ],
    },
  ],

  /** 26. 2.14 同儕支持（試辦） */
  26: [
    {
      sheetName: '同儕支持活動紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '活動日期', width: 100 },
        { header: '活動名稱', width: 180 },
        { header: '社群形成方式', width: 180 },
        { header: '參與住民人數', width: 120 },
        { header: '相互支持情形', width: 200 },
        { header: '照片/佐證', width: 110 },
        { header: '工作人員', width: 100 },
      ],
    },
  ],

  /** 28. 3.2 訂定適當收案標準，並落實執行 */
  28: [
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

  /** 29. 3.3 訂定適當結案標準，並落實執行 */
  29: [
    {
      sheetName: '結案及回歸社區生活紀錄',
      archetype: 'care-plan',
      criteriaIndex: 0,
      columns: [
        { header: '結案日期', width: 100 },
        { header: '住民姓名', width: 110 },
        { header: '結案原因', width: 160 },
        { header: '回歸社區計畫', width: 200 },
        { header: '就學/就業情形', width: 150 },
        { header: '通報衛生局日期', width: 130 },
        { header: '負責人員', width: 110 },
      ],
    },
  ],

  /** 30. 3.4 紀錄完整，並妥善管理 */
  30: [
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

  /** 31. 3.5 適切的復健基金管理（可選） */
  31: [
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
      sheetName: '住民工作獎勵金發放清冊',
      archetype: 'inventory-list',
      criteriaIndex: 3,
      prefillRows: 10,
      columns: [
        { header: '月份', width: 90 },
        { header: '住民姓名', width: 110 },
        { header: '服務工作內容', width: 180 },
        { header: '獎勵金額', width: 110 },
        { header: '發放日期', width: 110 },
        { header: '住民簽收', width: 110 },
      ],
    },
  ],

  /** 32. 3.6 落實住民權益維護措施 */
  32: [
    {
      sheetName: '住民權益維護查核表',
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

  /** 33. 3.7 維護住民財物自主管理權益（住宿型特有） */
  33: [
    {
      sheetName: '住民財物自主管理評估清冊',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      columns: [
        { header: '住民姓名', width: 110 },
        { header: '財物自主管理評估', width: 160 },
        { header: '可自行保管全部財物', width: 150 },
        { header: '代管財務管理機制', width: 160 },
        { header: '復健訓練目標', width: 180 },
        { header: '更新日期', width: 100 },
        { header: '負責人員', width: 100 },
      ],
    },
  ],

  /** 34. 3.8 落實住民健康維護措施 */
  34: [
    {
      sheetName: '住民健康檢查清冊',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '住民姓名', width: 110 },
        { header: '入住日期', width: 100 },
        { header: '入住前胸部X光日期', width: 140 },
        { header: '痢疾檢驗日期', width: 120 },
        { header: '健檢結果', width: 160 },
        { header: '異常追蹤情形', width: 160 },
        { header: '疫苗接種情形', width: 130 },
        { header: '備註', width: 100 },
      ],
    },
    {
      sheetName: '住民健康監測紀錄',
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

  /** 35. 3.9 訂定處理緊急醫療、異常及群聚感染事件處理流程 */
  35: [
    {
      sheetName: '緊急及異常事件處理紀錄',
      archetype: 'incident-log',
      criteriaIndex: 0,
      columns: [
        { header: '發生日期時間', width: 130 },
        { header: '住民姓名', width: 110 },
        { header: '事件類型(緊急醫療/異常/感染)', width: 180 },
        { header: '事件描述', width: 220 },
        { header: '立即處置', width: 180 },
        { header: '通知相關人員', width: 160 },
        { header: '就醫協助情形', width: 160 },
        { header: '通報人員', width: 100 },
      ],
    },
  ],

  /** 36. 3.10 建立機構緊急應變管理機制並落實執行 */
  36: [
    {
      sheetName: '複合式緊急災害應變演練紀錄',
      archetype: 'training-record',
      criteriaIndex: 1,
      columns: [
        { header: '演練日期', width: 100 },
        { header: '演練類型(日間/夜間)', width: 150 },
        { header: '災害類型(火災/風災/地震)', width: 180 },
        { header: '演練場景', width: 180 },
        { header: '參加人員', width: 160 },
        { header: '住民疏散情形', width: 160 },
        { header: '缺失事項', width: 180 },
        { header: '改善措施', width: 180 },
        { header: '負責人', width: 100 },
      ],
    },
  ],

  /** 37. 3.11 維護住民出入自由（住宿型特有，扣分題） */
  37: [
    {
      sheetName: '住民外出管理紀錄',
      archetype: 'daily-record',
      criteriaIndex: 2,
      columns: [
        { header: '日期', width: 100 },
        { header: '住民姓名', width: 110 },
        { header: '外出目的', width: 180 },
        { header: '返院時間', width: 110 },
        { header: '是否自行外出訓練', width: 140 },
        { header: '外出評估結果', width: 160 },
        { header: '備註', width: 120 },
      ],
    },
  ],

  /** 38. 3.12 召開品質管理相關會議 */
  38: [
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

  /** 39. 3.13 執行住民及家屬滿意度調查 */
  39: [
    {
      sheetName: '滿意度調查統計分析表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      columns: [
        { header: '調查日期', width: 100 },
        { header: '調查對象(住民/家屬)', width: 150 },
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
