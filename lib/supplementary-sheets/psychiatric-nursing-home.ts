/**
 * 精神護理之家評鑑補充文件定義
 * 115年度精神護理之家評鑑基準（36項）
 */
import type { SupplementaryDefsMap } from '../supplementary-sheet-types';

export const psychiatricNursingHomeDefs: SupplementaryDefsMap = {

  /** 1. A1.1 業務計畫擬訂與執行 */
  1: [
    {
      sheetName: '年度業務計畫執行紀錄',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '計畫項目', width: 180 },
        { header: '預定時程', width: 110 },
        { header: '執行日期', width: 100 },
        { header: '執行情形', width: 200 },
        { header: '負責人員', width: 110 },
        { header: '備註', width: 130 },
      ],
    },
    {
      sheetName: '監督（經營）團隊會議紀錄',
      archetype: 'meeting-minutes',
      criteriaIndex: 1,
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

  /** 2. A1.2 前次評鑑缺失改善情形 */
  2: [
    {
      sheetName: '評鑑缺失改善追蹤表',
      archetype: 'care-plan',
      criteriaIndex: 0,
      columns: [
        { header: '建議事項', width: 220 },
        { header: '改善措施', width: 220 },
        { header: '執行期限', width: 100 },
        { header: '改善結果', width: 200 },
        { header: '負責人員', width: 110 },
        { header: '確認日期', width: 100 },
      ],
    },
  ],

  /** 3. A1.3 性侵害及性騷擾事件防治機制 */
  3: [
    {
      sheetName: '性騷擾防治教育訓練記錄',
      archetype: 'training-record',
      criteriaIndex: 1,
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

  /** 4. A2.1 機構負責人實際管理 */
  4: [
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
  ],

  /** 5. A2.2 工作人員設置情形（重點項目） */
  5: [
    {
      sheetName: '護理人員班別排班表',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '姓名', width: 100 },
        { header: '職稱', width: 120 },
        { header: '班別', width: 90 },
        { header: '當日排班人數', width: 120 },
        { header: '備份人員', width: 120 },
        { header: '備註', width: 130 },
      ],
    },
    {
      sheetName: '專業人員資格清冊',
      archetype: 'inventory-list',
      criteriaIndex: 1,
      prefillRows: 10,
      columns: [
        { header: '姓名', width: 100 },
        { header: '職稱', width: 120 },
        { header: '資格證書', width: 160 },
        { header: '證書字號', width: 140 },
        { header: '效期', width: 100 },
        { header: '聘僱方式(專/兼)', width: 130 },
        { header: '備註', width: 110 },
      ],
    },
  ],

  /** 6. A3.1 工作人員權益制度訂定及執行 */
  6: [
    {
      sheetName: '工作人員手冊修訂紀錄',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '修訂日期', width: 100 },
        { header: '修訂章節', width: 180 },
        { header: '修訂原因', width: 200 },
        { header: '修訂內容摘要', width: 220 },
        { header: '審核人員', width: 110 },
      ],
    },
  ],

  /** 7. A3.2 工作人員定期健康檢查 */
  7: [
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
        { header: '健檢結果', width: 130 },
        { header: '後續追蹤', width: 150 },
        { header: '備註', width: 100 },
      ],
    },
  ],

  /** 8. A4.1 工作人員職前及在職訓練 */
  8: [
    {
      sheetName: '在職教育訓練記錄表',
      archetype: 'training-record',
      criteriaIndex: 0,
      columns: [
        { header: '訓練日期', width: 100 },
        { header: '訓練主題', width: 200 },
        { header: '訓練時數', width: 90 },
        { header: '訓練類型(感染管制/其他)', width: 180 },
        { header: '參加人員', width: 160 },
        { header: '講師', width: 110 },
        { header: '簽到', width: 80 },
      ],
    },
    {
      sheetName: 'BLS急救訓練效期清冊',
      archetype: 'inventory-list',
      criteriaIndex: 2,
      prefillRows: 10,
      columns: [
        { header: '姓名', width: 100 },
        { header: '職稱', width: 120 },
        { header: '訓練日期', width: 100 },
        { header: '訓練機構', width: 160 },
        { header: '證書字號', width: 140 },
        { header: '效期', width: 100 },
        { header: '是否在效期內', width: 120 },
      ],
    },
  ],

  /** 9. A5.1 住民資料管理 */
  9: [
    {
      sheetName: '住民資料統計分析表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '統計期間', width: 110 },
        { header: '統計項目', width: 180 },
        { header: '數值', width: 90 },
        { header: '分析摘要', width: 220 },
        { header: '改善措施', width: 200 },
        { header: '負責人員', width: 110 },
      ],
    },
  ],

  /** 10. B1.1 住民個別化服務計畫 */
  10: [
    {
      sheetName: '住民個別化評估表',
      archetype: 'case-assessment',
      criteriaIndex: 0,
      columns: [
        { header: '評估日期', width: 100 },
        { header: '住民姓名', width: 110 },
        { header: '評估類型(入住/定期)', width: 160 },
        { header: '身體功能', width: 120 },
        { header: '心理狀況', width: 120 },
        { header: '社會功能', width: 120 },
        { header: '認知功能', width: 120 },
        { header: '體重(kg)', width: 90 },
        { header: '評估人員', width: 100 },
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
        { header: '護理措施', width: 220 },
        { header: '精神護理重點', width: 180 },
        { header: '修訂日期', width: 100 },
        { header: '負責護理師', width: 100 },
      ],
    },
  ],

  /** 11. B1.2 住民適應輔導 */
  11: [
    {
      sheetName: '住民適應輔導紀錄表',
      archetype: 'care-plan',
      criteriaIndex: 0,
      columns: [
        { header: '輔導日期', width: 100 },
        { header: '住民姓名', width: 110 },
        { header: '適應問題描述', width: 220 },
        { header: '輔導措施', width: 200 },
        { header: '是否轉介專業', width: 120 },
        { header: '追蹤結果', width: 180 },
        { header: '輔導人員', width: 100 },
      ],
    },
  ],

  /** 12. B1.3 防疫機制 */
  12: [
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
      sheetName: '體溫監測記錄表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      columns: [
        { header: '日期', width: 100 },
        { header: '住民人數', width: 100 },
        { header: '工作人員人數', width: 120 },
        { header: '發燒人數(≥38°C)', width: 140 },
        { header: '處置措施', width: 180 },
        { header: '負責人員', width: 100 },
      ],
    },
    {
      sheetName: '感染管制教育訓練記錄',
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

  /** 13. B1.4 跨專業整合照護 */
  13: [
    {
      sheetName: '跨專業聯繫會議紀錄',
      archetype: 'meeting-minutes',
      criteriaIndex: 0,
      columns: [
        { header: '會議日期', width: 100 },
        { header: '住民姓名', width: 110 },
        { header: '出席專業人員', width: 200 },
        { header: '評估摘要', width: 200 },
        { header: '照護決議', width: 200 },
        { header: '主持人', width: 100 },
      ],
    },
  ],

  /** 14. B1.5 醫療服務 */
  14: [
    {
      sheetName: '醫師巡診記錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '巡診日期', width: 100 },
        { header: '住民姓名', width: 110 },
        { header: '診察結果', width: 200 },
        { header: '醫囑內容', width: 200 },
        { header: '醫師簽名', width: 110 },
        { header: '備註', width: 120 },
      ],
    },
  ],

  /** 15. B1.6 藥品管理 */
  15: [
    {
      sheetName: '管制藥品管理查核表',
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
      sheetName: '藥品儲存盤點清冊',
      archetype: 'inventory-list',
      criteriaIndex: 1,
      prefillRows: 10,
      columns: [
        { header: '盤點日期', width: 100 },
        { header: '藥品名稱', width: 160 },
        { header: '管制等級', width: 100 },
        { header: '應有數量', width: 100 },
        { header: '實有數量', width: 100 },
        { header: '差異原因', width: 160 },
        { header: '盤點人員', width: 100 },
      ],
    },
  ],

  /** 16. B1.7 品質監測指標 */
  16: [
    {
      sheetName: '照護品質指標監測表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      prefillRows: 6,
      columns: [
        { header: '統計期間', width: 110 },
        { header: '指標名稱', width: 180 },
        { header: '指標值', width: 90 },
        { header: '目標值', width: 90 },
        { header: '達標狀況', width: 100 },
        { header: '改善措施', width: 200 },
        { header: '負責人', width: 100 },
      ],
    },
    {
      sheetName: '約束使用紀錄表',
      archetype: 'incident-log',
      criteriaIndex: 2,
      columns: [
        { header: '日期', width: 100 },
        { header: '住民姓名', width: 110 },
        { header: '約束原因', width: 180 },
        { header: '約束方式', width: 150 },
        { header: '告知家屬日期', width: 130 },
        { header: '就醫情形', width: 160 },
        { header: '負責護理師', width: 110 },
      ],
    },
  ],

  /** 17. B1.8 住民健康檢查 */
  17: [
    {
      sheetName: '住民定期健康檢查清冊',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '住民姓名', width: 110 },
        { header: '入住日期', width: 100 },
        { header: '入住健檢日期', width: 120 },
        { header: '年度健檢日期', width: 120 },
        { header: '健檢結果', width: 160 },
        { header: '後續追蹤', width: 160 },
        { header: '備註', width: 100 },
      ],
    },
  ],

  /** 18. B1.9 侵入性照護技術（可選） */
  18: [
    {
      sheetName: '侵入性照護技術稽核記錄',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      columns: [
        { header: '稽核日期', width: 100 },
        { header: '護理師姓名', width: 110 },
        { header: '照護技術項目', width: 180 },
        { header: '技術正確性', width: 120 },
        { header: '缺失事項', width: 180 },
        { header: '改善措施', width: 180 },
        { header: '稽核人員', width: 110 },
      ],
    },
  ],

  /** 19. B2.1 緊急及意外事件處理 */
  19: [
    {
      sheetName: '緊急及意外事件通報記錄',
      archetype: 'incident-log',
      criteriaIndex: 0,
      columns: [
        { header: '發生日期時間', width: 130 },
        { header: '住民姓名', width: 110 },
        { header: '事件類型', width: 150 },
        { header: '事件描述', width: 220 },
        { header: '立即處置', width: 180 },
        { header: '通知家屬/主管機關', width: 160 },
        { header: '追蹤改善', width: 180 },
        { header: '通報人員', width: 100 },
      ],
    },
  ],

  /** 20. B2.2 緊急護送就醫 */
  20: [
    {
      sheetName: '緊急護送就醫記錄表',
      archetype: 'incident-log',
      criteriaIndex: 0,
      columns: [
        { header: '護送日期時間', width: 130 },
        { header: '住民姓名', width: 110 },
        { header: '護送原因', width: 180 },
        { header: '護送方式', width: 130 },
        { header: '就醫醫院', width: 150 },
        { header: '返院日期', width: 100 },
        { header: '後續照護', width: 180 },
      ],
    },
  ],

  /** 21. B2.3 多元活動規劃 */
  21: [
    {
      sheetName: '活動課程記錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '活動日期', width: 100 },
        { header: '活動名稱', width: 180 },
        { header: '活動類型', width: 130 },
        { header: '參與人數', width: 100 },
        { header: '住民自選情形', width: 150 },
        { header: '活動評值', width: 160 },
        { header: '負責人員', width: 100 },
      ],
    },
  ],

  /** 22. B2.4 社區資源聯結 */
  22: [
    {
      sheetName: '社區資源聯結清冊',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '資源名稱', width: 160 },
        { header: '資源類型', width: 150 },
        { header: '聯繫單位', width: 160 },
        { header: '服務內容', width: 200 },
        { header: '最近聯繫日期', width: 130 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 23. B2.5 家屬互動 */
  23: [
    {
      sheetName: '家屬聯繫記錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '聯繫日期', width: 100 },
        { header: '住民姓名', width: 110 },
        { header: '家屬姓名', width: 110 },
        { header: '聯繫方式(電訪/視訊/會談)', width: 180 },
        { header: '聯繫內容', width: 200 },
        { header: '家屬意見', width: 160 },
        { header: '負責人員', width: 100 },
      ],
    },
    {
      sheetName: '家屬教育活動記錄',
      archetype: 'training-record',
      criteriaIndex: 1,
      columns: [
        { header: '活動日期', width: 100 },
        { header: '活動主題', width: 200 },
        { header: '活動類型(座談/聯誼)', width: 160 },
        { header: '參加人數', width: 100 },
        { header: '活動成效', width: 180 },
        { header: '備註', width: 120 },
      ],
    },
  ],

  /** 24. B2.6 復健作業活動 */
  24: [
    {
      sheetName: '復健作業活動記錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '執行日期', width: 100 },
        { header: '住民姓名', width: 110 },
        { header: '活動內容', width: 200 },
        { header: '本週累計時數', width: 130 },
        { header: '是否超過15小時', width: 130 },
        { header: '執行人員', width: 100 },
      ],
    },
  ],

  /** 25. B3.1 護理站設備設置 */
  25: [
    {
      sheetName: '急救設備查核清冊',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      columns: [
        { header: '查核日期', width: 100 },
        { header: '設備名稱', width: 160 },
        { header: '存放位置', width: 150 },
        { header: '數量', width: 80 },
        { header: '狀態正常', width: 100 },
        { header: '效期', width: 100 },
        { header: '查核人員', width: 100 },
      ],
    },
  ],

  /** 26. B3.1 住民衛生保健及健康衛教 */
  26: [
    {
      sheetName: '住民衛教記錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '衛教日期', width: 100 },
        { header: '住民姓名', width: 110 },
        { header: '衛教主題', width: 200 },
        { header: '衛教方式', width: 130 },
        { header: '住民理解情形', width: 150 },
        { header: '負責人員', width: 100 },
      ],
    },
  ],

  /** 27. B3.2 住民個人衣物及寢具清潔 */
  27: [
    {
      sheetName: '寢具更換清洗記錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '更換日期', width: 100 },
        { header: '床號/房號', width: 110 },
        { header: '更換項目', width: 160 },
        { header: '貼身衣物自備情形', width: 160 },
        { header: '執行人員', width: 100 },
        { header: '備註', width: 120 },
      ],
    },
  ],

  /** 28. 活動功能促進 */
  28: [
    {
      sheetName: '住民活動功能促進記錄',
      archetype: 'care-plan',
      criteriaIndex: 0,
      columns: [
        { header: '執行日期', width: 100 },
        { header: '住民姓名', width: 110 },
        { header: '執行項目', width: 180 },
        { header: 'PT/OT評估結果', width: 160 },
        { header: '功能狀況', width: 150 },
        { header: '執行人員', width: 100 },
      ],
    },
  ],

  /** 29. B3.x 膳食服務 */
  29: [
    {
      sheetName: '每週菜單記錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '週別/日期', width: 110 },
        { header: '早餐', width: 160 },
        { header: '午餐', width: 160 },
        { header: '晚餐', width: 160 },
        { header: '快樂餐選項', width: 160 },
        { header: '菜單擬定人員', width: 130 },
      ],
    },
  ],

  /** 30. B3.2 管灌住民照護（可選） */
  30: [
    {
      sheetName: '管灌紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '日期', width: 100 },
        { header: '住民姓名', width: 110 },
        { header: '灌食內容', width: 180 },
        { header: '自然食材次數(本週)', width: 160 },
        { header: '耐受情形', width: 150 },
        { header: '管路狀況', width: 150 },
        { header: '執行護理師', width: 110 },
      ],
    },
  ],

  /** 31. C1.1 疏散避難系統（重點項目） */
  31: [
    {
      sheetName: '疏散避難系統定期查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      columns: [
        { header: '查核日期', width: 100 },
        { header: '查核樓層', width: 100 },
        { header: '查核項目', width: 240 },
        { header: '符合', width: 70 },
        { header: '不符合', width: 80 },
        { header: '改善措施', width: 200 },
        { header: '查核人員', width: 100 },
      ],
    },
    {
      sheetName: '等待救接空間查核清冊',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
      columns: [
        { header: '查核日期', width: 100 },
        { header: '樓層/位置', width: 130 },
        { header: '面積(㎡)', width: 90 },
        { header: '防火性能', width: 110 },
        { header: '防煙能力', width: 110 },
        { header: '雙向逃生路徑', width: 130 },
        { header: '查核結果', width: 150 },
        { header: '查核人員', width: 100 },
      ],
    },
  ],

  /** 32. C1.2 火災應變計畫 */
  32: [
    {
      sheetName: '火災應變演練記錄表',
      archetype: 'training-record',
      criteriaIndex: 0,
      columns: [
        { header: '演練日期', width: 100 },
        { header: '演練類型(日間)', width: 130 },
        { header: '演練場景', width: 180 },
        { header: '參加人員', width: 160 },
        { header: '住民疏散情形', width: 160 },
        { header: '缺失事項', width: 180 },
        { header: '改善措施', width: 180 },
        { header: '負責人', width: 100 },
      ],
    },
  ],

  /** 33. C1.3 夜間消防演練 */
  33: [
    {
      sheetName: '夜間消防演練記錄表',
      archetype: 'training-record',
      criteriaIndex: 0,
      columns: [
        { header: '演練日期時間', width: 130 },
        { header: '演練類型(夜間)', width: 130 },
        { header: '夜間值班人數', width: 120 },
        { header: '演練場景', width: 180 },
        { header: '住民疏散情形', width: 160 },
        { header: '缺失事項', width: 180 },
        { header: '改善措施', width: 180 },
        { header: '負責人', width: 100 },
      ],
    },
  ],

  /** 34. D1.1 尊重住民宗教信仰 */
  34: [
    {
      sheetName: '住民宗教信仰需求清冊',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '住民姓名', width: 110 },
        { header: '宗教信仰', width: 120 },
        { header: '特殊需求', width: 200 },
        { header: '提供服務', width: 200 },
        { header: '更新日期', width: 100 },
      ],
    },
  ],

  /** 35. D1.2 安寧緩和療護及病人自主權利 */
  35: [
    {
      sheetName: '預立醫療決定說明清冊',
      archetype: 'inventory-list',
      criteriaIndex: 0,
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

  /** 36. E1.1 創新或特色措施 */
  36: [
    {
      sheetName: '創新服務成果記錄清冊',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 5,
      columns: [
        { header: '措施名稱', width: 180 },
        { header: '執行期間', width: 130 },
        { header: '服務對象', width: 130 },
        { header: '成效描述', width: 220 },
        { header: '公開分享方式', width: 160 },
        { header: '評估日期', width: 100 },
      ],
    },
  ],

};
