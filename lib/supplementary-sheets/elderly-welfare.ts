/**
 * 老人福利機構評鑑補充文件定義
 * 115年度老人福利機構評鑑指標（77項）
 */
import type { SupplementaryDefsMap } from '../supplementary-sheet-types';

export const elderlyWelfareDefs: SupplementaryDefsMap = {

  /** 1. A1 工作人員權益相關制度訂定及執行情形 */
  1: [
    {
      sheetName: '工作手冊制度文件清冊',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '文件名稱', width: 180 },
        { header: '版本', width: 80 },
        { header: '訂定日期', width: 110 },
        { header: '最近修訂日期', width: 130 },
        { header: '負責單位', width: 130 },
        { header: '備註', width: 130 },
      ],
    },
    {
      sheetName: '制度執行佐證紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 2,
      columns: [
        { header: '執行日期', width: 100 },
        { header: '制度名稱', width: 160 },
        { header: '執行內容', width: 220 },
        { header: '執行人員', width: 110 },
        { header: '主管核閱', width: 100 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 2. A2 入出機構之管理 */
  2: [
    {
      sheetName: '入出機構辦理紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 3,
      columns: [
        { header: '辦理日期', width: 100 },
        { header: '服務對象姓名', width: 120 },
        { header: '類別(入/出)', width: 110 },
        { header: '辦理人員', width: 110 },
        { header: '評估摘要', width: 200 },
        { header: '主管核閱', width: 100 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 3. A3 業務計畫及營運方針 */
  3: [
    {
      sheetName: '年度業務計畫執行追蹤表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      prefillRows: 12,
      columns: [
        { header: '計畫項目', width: 200 },
        { header: '預定完成日期', width: 130 },
        { header: '實際執行情形', width: 220 },
        { header: '達成率', width: 90 },
        { header: '負責人員', width: 110 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 4. A4 查核缺失改善情形 */
  4: [
    {
      sheetName: '查核缺失改善追蹤表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '查核單位', width: 120 },
        { header: '查核日期', width: 110 },
        { header: '缺失項目', width: 200 },
        { header: '改善措施', width: 200 },
        { header: '改善完成日期', width: 130 },
        { header: '佐證資料', width: 150 },
        { header: '改善結果', width: 110 },
      ],
    },
  ],

  /** 5. A5 住民保護性侵害性騷擾防治 */
  5: [
    {
      sheetName: '住民保護事件處理紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '事件日期', width: 110 },
        { header: '事件類型', width: 130 },
        { header: '當事人', width: 110 },
        { header: '處理人員', width: 110 },
        { header: '處理過程摘要', width: 220 },
        { header: '後續追蹤', width: 150 },
        { header: '主管核閱', width: 100 },
      ],
    },
  ],

  /** 6. A6 危機緊急事件風險管理 */
  6: [
    {
      sheetName: '風險事件處理紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 2,
      columns: [
        { header: '事件日期', width: 110 },
        { header: '風險類別', width: 130 },
        { header: '事件摘要', width: 200 },
        { header: '處理措施', width: 200 },
        { header: '改善追蹤', width: 150 },
        { header: '負責人員', width: 110 },
        { header: '主管核閱', width: 100 },
      ],
    },
    {
      sheetName: '半年風險事件分析報告',
      archetype: 'daily-record',
      criteriaIndex: 3,
      prefillRows: 6,
      columns: [
        { header: '分析期間', width: 130 },
        { header: '風險類別', width: 130 },
        { header: '事件件數', width: 100 },
        { header: '分析摘要', width: 220 },
        { header: '改善措施', width: 200 },
        { header: '追蹤結果', width: 150 },
      ],
    },
  ],

  /** 7. A7 業務負責人（主任）資格與執行情形 */
  7: [
    {
      sheetName: '業務負責人資格確認表',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 3,
      columns: [
        { header: '確認項目', width: 200 },
        { header: '是否符合', width: 100 },
        { header: '佐證文件', width: 180 },
        { header: '備註', width: 150 },
      ],
    },
  ],

  /** 8. A8 社工人員設置及服務情形 */
  8: [
    {
      sheetName: '社工人員配置記錄表',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 5,
      columns: [
        { header: '人員姓名', width: 110 },
        { header: '執照字號', width: 150 },
        { header: '專任/兼任', width: 100 },
        { header: '負責案量', width: 100 },
        { header: '投保單位', width: 130 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 9. A9 護理人員設置及服務情形 */
  9: [
    {
      sheetName: '護理人員配置記錄表',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '人員姓名', width: 110 },
        { header: '執照字號', width: 150 },
        { header: '專任/兼任', width: 100 },
        { header: '班別', width: 80 },
        { header: '執業登錄有效期', width: 150 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 10. A10 特約（兼任）專業人員設置及服務情形 */
  10: [
    {
      sheetName: '特約專業人員服務紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '服務日期', width: 110 },
        { header: '人員姓名', width: 110 },
        { header: '專業類別', width: 120 },
        { header: '服務內容', width: 220 },
        { header: '服務對象', width: 110 },
        { header: '簽到確認', width: 100 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 11. A11 照顧服務員設置及服務情形 */
  11: [
    {
      sheetName: '照顧服務員配置記錄表',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 15,
      columns: [
        { header: '人員姓名', width: 110 },
        { header: '國籍', width: 80 },
        { header: '班別', width: 80 },
        { header: '訓練證書字號', width: 160 },
        { header: '到職日期', width: 110 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 12. A12 勞動條件 */
  12: [
    {
      sheetName: '勞動條件自我查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '查核項目', width: 220 },
        { header: '是否符合', width: 100 },
        { header: '相關法規', width: 150 },
        { header: '佐證文件', width: 180 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 13. A13 新進人員職前訓練情形 */
  13: [
    {
      sheetName: '新進人員職前訓練記錄表',
      archetype: 'training-record',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '人員姓名', width: 110 },
        { header: '到職日期', width: 110 },
        { header: '訓練課程', width: 180 },
        { header: '訓練時數', width: 100 },
        { header: '完成日期', width: 110 },
        { header: '適任性考核', width: 120 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 14. A14 工作人員在職訓練情形 */
  14: [
    {
      sheetName: '在職訓練記錄彙整表',
      archetype: 'training-record',
      criteriaIndex: 0,
      prefillRows: 15,
      columns: [
        { header: '人員姓名', width: 110 },
        { header: '課程名稱', width: 180 },
        { header: '訓練日期', width: 110 },
        { header: '訓練時數', width: 100 },
        { header: '感控時數', width: 100 },
        { header: '急救訓練有效期', width: 150 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 15. A15 感染管制 */
  15: [
    {
      sheetName: '感染管制措施記錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      prefillRows: 12,
      columns: [
        { header: '執行日期', width: 110 },
        { header: '管制項目', width: 180 },
        { header: '執行內容', width: 220 },
        { header: '執行人員', width: 110 },
        { header: '主管核閱', width: 100 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 16. B1 社工服務紀錄 */
  16: [
    {
      sheetName: '社工服務紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '服務日期', width: 110 },
        { header: '個案姓名', width: 110 },
        { header: '服務內容', width: 220 },
        { header: '社工簽名', width: 100 },
        { header: '主管核閱', width: 100 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 17. B2 個案資料建立及管理 */
  17: [
    {
      sheetName: '個案資料清冊',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 15,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '入住日期', width: 110 },
        { header: '基本資料', width: 100 },
        { header: '醫療史', width: 100 },
        { header: '照護計畫', width: 100 },
        { header: '同意書', width: 100 },
        { header: '資料最新日期', width: 130 },
      ],
    },
  ],

  /** 18. B3 個別化服務計畫（照護計畫） */
  18: [
    {
      sheetName: '個別化照護計畫追蹤表',
      archetype: 'care-plan',
      criteriaIndex: 0,
      prefillRows: 12,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '計畫訂定日期', width: 130 },
        { header: '多專業參與', width: 120 },
        { header: '六個月評估', width: 120 },
        { header: '家屬參與', width: 110 },
        { header: '最近修訂日期', width: 130 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 19. B4 入住評估 */
  19: [
    {
      sheetName: '入住評估記錄表',
      archetype: 'care-plan',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '入住日期', width: 110 },
        { header: '評估工具', width: 150 },
        { header: '評估結果', width: 180 },
        { header: '評估人員', width: 110 },
        { header: '主管核閱', width: 100 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 20. B5 生活照顧服務紀錄 */
  20: [
    {
      sheetName: '生活照顧服務日誌',
      archetype: 'daily-record',
      criteriaIndex: 0,
      prefillRows: 15,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '服務日期', width: 110 },
        { header: '班別', width: 80 },
        { header: '服務項目', width: 160 },
        { header: '觀察紀錄', width: 200 },
        { header: '照服員簽名', width: 110 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 21. B6 身體照護（沐浴/口腔/皮膚等） */
  21: [
    {
      sheetName: '身體照護記錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      prefillRows: 15,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '服務日期', width: 110 },
        { header: '照護項目', width: 160 },
        { header: '執行情形', width: 180 },
        { header: '皮膚觀察', width: 150 },
        { header: '照服員簽名', width: 110 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 22. B7 住民身心健康照護（跌倒/壓傷/疼痛等） */
  22: [
    {
      sheetName: '安全事件通報紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '事件日期', width: 110 },
        { header: '個案姓名', width: 110 },
        { header: '事件類型', width: 130 },
        { header: '事件描述', width: 200 },
        { header: '處理措施', width: 180 },
        { header: '通報對象', width: 130 },
        { header: '追蹤結果', width: 130 },
      ],
    },
  ],

  /** 23. B8 膳食服務 */
  23: [
    {
      sheetName: '膳食服務記錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '日期', width: 100 },
        { header: '餐次', width: 80 },
        { header: '菜單內容', width: 200 },
        { header: '特殊飲食需求', width: 160 },
        { header: '營養師確認', width: 120 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 24. B9 護理服務紀錄 */
  24: [
    {
      sheetName: '護理服務紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      prefillRows: 12,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '服務日期', width: 110 },
        { header: '班別', width: 80 },
        { header: '護理評估摘要', width: 200 },
        { header: '護理措施', width: 200 },
        { header: '護理師簽名', width: 120 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 25. B10 用藥管理 */
  25: [
    {
      sheetName: '用藥管理記錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      prefillRows: 15,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '藥品名稱', width: 150 },
        { header: '劑量', width: 80 },
        { header: '給藥時間', width: 110 },
        { header: '給藥途徑', width: 110 },
        { header: '給藥人員', width: 110 },
        { header: '備註/異常', width: 150 },
      ],
    },
  ],

  /** 26. B11 醫療服務（轉介就醫/急診/住院） */
  26: [
    {
      sheetName: '醫療轉介紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '轉介日期', width: 110 },
        { header: '轉介原因', width: 180 },
        { header: '轉介單位', width: 150 },
        { header: '處理結果', width: 180 },
        { header: '後續追蹤', width: 150 },
        { header: '主管核閱', width: 100 },
      ],
    },
  ],

  /** 27. B12 復能及促進活動 */
  27: [
    {
      sheetName: '復能活動記錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      prefillRows: 12,
      columns: [
        { header: '活動日期', width: 110 },
        { header: '活動名稱', width: 160 },
        { header: '參與人數', width: 100 },
        { header: '帶領人員', width: 110 },
        { header: '執行情形', width: 200 },
        { header: '個案反應', width: 150 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 28. B13 心理及社會支持服務 */
  28: [
    {
      sheetName: '心理社會支持服務記錄',
      archetype: 'daily-record',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '服務日期', width: 110 },
        { header: '個案姓名', width: 110 },
        { header: '服務類型', width: 150 },
        { header: '服務內容', width: 220 },
        { header: '服務人員', width: 110 },
        { header: '追蹤事項', width: 150 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 29. B14 家屬聯繫及參與 */
  29: [
    {
      sheetName: '家屬聯繫記錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      prefillRows: 12,
      columns: [
        { header: '聯繫日期', width: 110 },
        { header: '個案姓名', width: 110 },
        { header: '聯繫對象', width: 110 },
        { header: '聯繫方式', width: 110 },
        { header: '聯繫內容', width: 220 },
        { header: '家屬反應', width: 150 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 30. B15 失智症住民照護 */
  30: [
    {
      sheetName: '失智症住民照護計畫',
      archetype: 'care-plan',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '評估量表', width: 150 },
        { header: '評估結果', width: 130 },
        { header: '照護目標', width: 200 },
        { header: '照護措施', width: 200 },
        { header: '最近評估日期', width: 130 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 32. B17 安寧/緩和照護 */
  32: [
    {
      sheetName: '安寧緩和照護計畫',
      archetype: 'care-plan',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '照護目標', width: 180 },
        { header: '住民意願', width: 150 },
        { header: '家屬說明日期', width: 130 },
        { header: '照護措施', width: 200 },
        { header: '照護人員', width: 110 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 36. B21 品質監測指標 */
  36: [
    {
      sheetName: '品質指標月報表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      prefillRows: 12,
      columns: [
        { header: '指標名稱', width: 180 },
        { header: '統計期間', width: 130 },
        { header: '分子', width: 80 },
        { header: '分母', width: 80 },
        { header: '比率', width: 80 },
        { header: '趨勢', width: 80 },
        { header: '改善措施', width: 180 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 47. C1 建築結構與安全 */
  47: [
    {
      sheetName: '建築安全自我查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '查核項目', width: 220 },
        { header: '是否符合', width: 100 },
        { header: '查核日期', width: 110 },
        { header: '缺失說明', width: 180 },
        { header: '改善期限', width: 110 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 48. C2 消防安全 */
  48: [
    {
      sheetName: '消防安全查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 12,
      columns: [
        { header: '設備項目', width: 180 },
        { header: '數量', width: 80 },
        { header: '查核日期', width: 110 },
        { header: '是否正常', width: 100 },
        { header: '維護人員', width: 110 },
        { header: '備註', width: 150 },
      ],
    },
    {
      sheetName: '消防演練記錄表',
      archetype: 'training-record',
      criteriaIndex: 2,
      prefillRows: 4,
      columns: [
        { header: '演練日期', width: 110 },
        { header: '演練類型', width: 130 },
        { header: '參與人數', width: 100 },
        { header: '演練內容', width: 200 },
        { header: '缺失事項', width: 180 },
        { header: '改善措施', width: 180 },
        { header: '主管核閱', width: 100 },
      ],
    },
  ],

  /** 51. C5 緊急疏散計畫與演練 */
  51: [
    {
      sheetName: '緊急疏散演練記錄表',
      archetype: 'training-record',
      criteriaIndex: 0,
      prefillRows: 4,
      columns: [
        { header: '演練日期', width: 110 },
        { header: '演練情境', width: 150 },
        { header: '參與人數', width: 100 },
        { header: '疏散完成時間', width: 130 },
        { header: '缺失事項', width: 180 },
        { header: '改善措施', width: 180 },
        { header: '主管核閱', width: 100 },
      ],
    },
  ],

  /** 63. D1 服務資訊公開 */
  63: [
    {
      sheetName: '服務資訊公開項目清冊',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '公開項目', width: 200 },
        { header: '公開方式', width: 150 },
        { header: '最近更新日期', width: 130 },
        { header: '負責人員', width: 110 },
        { header: '備註', width: 150 },
      ],
    },
  ],

  /** 64. D2 服務契約訂定 */
  64: [
    {
      sheetName: '服務契約管理清冊',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 15,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '契約簽訂日期', width: 130 },
        { header: '法定代理人', width: 120 },
        { header: '收費標準說明', width: 150 },
        { header: '最近審閱日期', width: 130 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 65. D3 住民個人資料保護 */
  65: [
    {
      sheetName: '個人資料保護查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '查核項目', width: 220 },
        { header: '是否符合', width: 100 },
        { header: '查核日期', width: 110 },
        { header: '負責人員', width: 110 },
        { header: '備註', width: 150 },
      ],
    },
  ],

  /** 66. D4 申訴機制建置 */
  66: [
    {
      sheetName: '申訴案件處理記錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '申訴日期', width: 110 },
        { header: '申訴人', width: 110 },
        { header: '申訴內容', width: 220 },
        { header: '處理措施', width: 200 },
        { header: '結案日期', width: 110 },
        { header: '申訴人反應', width: 150 },
        { header: '主管核閱', width: 100 },
      ],
    },
  ],

  /** 67. D5 住民滿意度調查 */
  67: [
    {
      sheetName: '住民滿意度調查彙整表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      prefillRows: 6,
      columns: [
        { header: '調查期間', width: 130 },
        { header: '調查對象', width: 120 },
        { header: '有效份數', width: 100 },
        { header: '整體滿意度', width: 120 },
        { header: '主要意見', width: 200 },
        { header: '改善措施', width: 200 },
        { header: '完成日期', width: 110 },
      ],
    },
  ],

  /** 72. E1 前次評鑑缺失改善 */
  72: [
    {
      sheetName: '前次評鑑缺失改善追蹤表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '缺失項目', width: 200 },
        { header: '缺失說明', width: 200 },
        { header: '改善措施', width: 200 },
        { header: '改善完成日期', width: 130 },
        { header: '佐證資料', width: 150 },
        { header: '改善結果', width: 110 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 73. E2 創新服務方案 */
  73: [
    {
      sheetName: '創新服務方案說明表',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 5,
      columns: [
        { header: '方案名稱', width: 180 },
        { header: '推行起始日期', width: 130 },
        { header: '服務對象', width: 130 },
        { header: '方案說明', width: 250 },
        { header: '具體成效', width: 200 },
        { header: '備註', width: 130 },
      ],
    },
  ],

};
