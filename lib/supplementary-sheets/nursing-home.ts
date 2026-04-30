/**
 * 住宿型照顧機構評鑑補充文件定義
 * 115年度住宿式長期照顧服務機構績效考核指標（63項）
 */
import type { SupplementaryDefsMap } from '../supplementary-sheet-types';

export const nursingHomeDefs: SupplementaryDefsMap = {

  /** 1. A1 工作人員權益保障 */
  1: [
    {
      sheetName: '工作人員勞健保投保清冊',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 15,
      columns: [
        { header: '姓名', width: 110 },
        { header: '到職日期', width: 110 },
        { header: '勞保投保日', width: 120 },
        { header: '健保加保日', width: 120 },
        { header: '退休金提繳', width: 120 },
        { header: '備註', width: 130 },
      ],
    },
    {
      sheetName: '工作人員申訴紀錄表',
      archetype: 'incident-log',
      criteriaIndex: 1,
      columns: [
        { header: '受理日期', width: 100 },
        { header: '申訴人員', width: 110 },
        { header: '申訴內容', width: 220 },
        { header: '處理經過', width: 200 },
        { header: '處理結果', width: 180 },
        { header: '回覆日期', width: 110 },
        { header: '處理人員', width: 100 },
      ],
    },
  ],

  /** 2. A2 服務對象入出機構作業 */
  2: [
    {
      sheetName: '入出機構辦理紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 3,
      columns: [
        { header: '辦理日期', width: 100 },
        { header: '服務對象姓名', width: 120 },
        { header: '類別(入/出)', width: 110 },
        { header: '辦理原因', width: 160 },
        { header: '辦理人員', width: 110 },
        { header: '評估摘要', width: 200 },
        { header: '主管核閱', width: 100 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 3. A3 業務計畫訂定與執行 */
  3: [
    {
      sheetName: '業務計畫執行進度追蹤表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      columns: [
        { header: '追蹤日期', width: 100 },
        { header: '計畫項目', width: 180 },
        { header: '預定完成日', width: 120 },
        { header: '執行進度', width: 120 },
        { header: '執行內容摘要', width: 220 },
        { header: '負責人員', width: 110 },
        { header: '主管核閱', width: 100 },
      ],
    },
  ],

  /** 4. A4 前次評鑑（查核）缺失改善情形 */
  4: [
    {
      sheetName: '評鑑缺失改善追蹤表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '缺失項目', width: 200 },
        { header: '改善措施', width: 220 },
        { header: '負責人員', width: 110 },
        { header: '預定完成日', width: 120 },
        { header: '完成日期', width: 110 },
        { header: '佐證文件', width: 160 },
        { header: '主管確認', width: 100 },
      ],
    },
  ],

  /** 5. A5 機構內性騷擾及性侵害事件防治機制 */
  5: [
    {
      sheetName: '性騷擾性侵害事件處理紀錄表',
      archetype: 'incident-log',
      criteriaIndex: 3,
      columns: [
        { header: '事件日期', width: 100 },
        { header: '當事人', width: 110 },
        { header: '事件類型', width: 150 },
        { header: '事件描述', width: 240 },
        { header: '緊急處置', width: 180 },
        { header: '通報狀況', width: 150 },
        { header: '後續追蹤', width: 160 },
        { header: '改善措施', width: 180 },
      ],
    },
  ],

  /** 6. A6 危機事件及緊急應變處理機制 */
  6: [
    {
      sheetName: '危機緊急事件處理紀錄表',
      archetype: 'incident-log',
      criteriaIndex: 1,
      columns: [
        { header: '事件日期', width: 100 },
        { header: '事件類型', width: 150 },
        { header: '事件描述', width: 220 },
        { header: '處置措施', width: 200 },
        { header: '通報人員', width: 110 },
        { header: '後續追蹤', width: 160 },
        { header: '負責主管', width: 100 },
      ],
    },
    {
      sheetName: '緊急事件半年分析報告表',
      archetype: 'meeting-minutes',
      criteriaIndex: 3,
      prefillRows: 4,
      columns: [
        { header: '分析期別', width: 110 },
        { header: '事件類型', width: 150 },
        { header: '發生件數', width: 100 },
        { header: '分析摘要', width: 220 },
        { header: '檢討改善措施', width: 220 },
        { header: '追蹤結果', width: 160 },
        { header: '填報人員', width: 100 },
      ],
    },
  ],

  /** 8. A8 聘用工作人員（含專任、兼任）設置情形 */
  8: [
    {
      sheetName: '工作人員名冊（各職類）',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 20,
      columns: [
        { header: '姓名', width: 110 },
        { header: '職稱/職類', width: 130 },
        { header: '資格證書字號', width: 160 },
        { header: '任用類別(專/兼)', width: 130 },
        { header: '到職日期', width: 110 },
        { header: '執業登錄機構', width: 160 },
        { header: '備註', width: 130 },
      ],
    },
    {
      sheetName: '護理人員排班及護病比記錄表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      columns: [
        { header: '班別日期', width: 110 },
        { header: '班別(日/小/大)', width: 130 },
        { header: '護理人員姓名', width: 130 },
        { header: '照護床數', width: 100 },
        { header: '護病比', width: 90 },
        { header: '符合規定', width: 100 },
        { header: '主管確認', width: 100 },
      ],
    },
    {
      sheetName: '兼任專業人員到勤紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 2,
      columns: [
        { header: '服務日期', width: 100 },
        { header: '人員姓名', width: 110 },
        { header: '專業別', width: 120 },
        { header: '到勤時間', width: 110 },
        { header: '離勤時間', width: 110 },
        { header: '服務內容', width: 200 },
        { header: '服務對象', width: 150 },
        { header: '簽名', width: 80 },
      ],
    },
  ],

  /** 9. A9 工作人員教育訓練計畫訂定及辦理情形 */
  9: [
    {
      sheetName: '在職教育訓練紀錄表',
      archetype: 'training-record',
      criteriaIndex: 2,
      columns: [
        { header: '訓練日期', width: 100 },
        { header: '訓練主題', width: 180 },
        { header: '訓練類別', width: 130 },
        { header: '時數', width: 80 },
        { header: '講師', width: 110 },
        { header: '參訓人員', width: 150 },
        { header: '評值結果', width: 130 },
        { header: '辦理單位', width: 120 },
      ],
    },
    {
      sheetName: '職前訓練紀錄表',
      archetype: 'training-record',
      criteriaIndex: 1,
      columns: [
        { header: '訓練日期', width: 100 },
        { header: '受訓人員', width: 110 },
        { header: '到職日期', width: 110 },
        { header: '訓練主題', width: 180 },
        { header: '訓練時數', width: 100 },
        { header: '講師', width: 110 },
        { header: '測驗成績', width: 100 },
      ],
    },
    {
      sheetName: '廚工食品衛生訓練紀錄表',
      archetype: 'training-record',
      criteriaIndex: 3,
      columns: [
        { header: '訓練日期', width: 100 },
        { header: '人員姓名', width: 110 },
        { header: '訓練單位', width: 160 },
        { header: '訓練主題', width: 180 },
        { header: '訓練時數', width: 100 },
        { header: '完訓證明字號', width: 150 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 10. B1 服務品質改善會議及檢討機制 */
  10: [
    {
      sheetName: '服務品質改善會議紀錄表',
      archetype: 'meeting-minutes',
      criteriaIndex: 0,
      columns: [
        { header: '會議日期', width: 100 },
        { header: '出席人員', width: 200 },
        { header: '品質指標數據', width: 200 },
        { header: '討論議題', width: 220 },
        { header: '決議事項', width: 220 },
        { header: '執行期限', width: 110 },
        { header: '追蹤結果', width: 160 },
        { header: '主持人', width: 90 },
      ],
    },
  ],

  /** 11. B2 個案服務計畫評值（含社工及護理共同評值） */
  11: [
    {
      sheetName: '個案服務計畫書',
      archetype: 'care-plan',
      criteriaIndex: 0,
      prefillRows: 4,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '入住日期', width: 110 },
        { header: '計畫日期', width: 110 },
        { header: '照護問題', width: 180 },
        { header: '照護目標', width: 180 },
        { header: '照護措施', width: 200 },
        { header: '社工評估', width: 160 },
        { header: '護理評估', width: 160 },
        { header: '評值日期', width: 110 },
        { header: '評值結果', width: 160 },
      ],
    },
    {
      sheetName: '個案資料調閱紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 3,
      columns: [
        { header: '申請日期', width: 100 },
        { header: '申請人員', width: 110 },
        { header: '申請單位', width: 130 },
        { header: '個案姓名', width: 110 },
        { header: '調閱資料類型', width: 160 },
        { header: '調閱目的', width: 180 },
        { header: '核准人員', width: 100 },
        { header: '歸還日期', width: 110 },
      ],
    },
  ],

  /** 12. B3 新入住服務對象適應輔導 */
  12: [
    {
      sheetName: '入住適應輔導紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '服務日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '適應情形', width: 160 },
        { header: '輔導/處置內容', width: 220 },
        { header: '協處人員', width: 130 },
        { header: '後續追蹤', width: 160 },
        { header: '紀錄人員', width: 100 },
      ],
    },
  ],

  /** 13. B4 跨專業整合照護服務 */
  13: [
    {
      sheetName: '跨專業照護計畫討論紀錄表',
      archetype: 'meeting-minutes',
      criteriaIndex: 0,
      columns: [
        { header: '會議日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '出席專業人員', width: 200 },
        { header: '討論議題', width: 220 },
        { header: '決議事項', width: 200 },
        { header: '追蹤期限', width: 110 },
        { header: '追蹤結果', width: 160 },
      ],
    },
    {
      sheetName: '轉介照會紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 3,
      columns: [
        { header: '轉介/照會日期', width: 130 },
        { header: '個案姓名', width: 110 },
        { header: '轉介原因', width: 180 },
        { header: '轉介/照會單位', width: 160 },
        { header: '回應內容', width: 180 },
        { header: '追蹤日期', width: 110 },
        { header: '追蹤結果', width: 160 },
        { header: '轉介人員', width: 100 },
      ],
    },
  ],

  /** 14. B5 辦理團體活動及社區參與 */
  14: [
    {
      sheetName: '團體社區活動辦理紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      columns: [
        { header: '活動日期', width: 100 },
        { header: '活動名稱', width: 160 },
        { header: '活動類型', width: 120 },
        { header: '參加成員', width: 160 },
        { header: '活動內容', width: 220 },
        { header: '評值成果', width: 180 },
        { header: '負責人員', width: 100 },
      ],
    },
  ],

  /** 15. B6 結合社區資源提供服務 */
  15: [
    {
      sheetName: '社區資源名冊',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '資源類別', width: 120 },
        { header: '機構/單位名稱', width: 180 },
        { header: '服務項目', width: 180 },
        { header: '聯絡方式', width: 150 },
        { header: '最近盤點日期', width: 130 },
        { header: '備註', width: 130 },
      ],
    },
    {
      sheetName: '社區資源轉介紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 2,
      columns: [
        { header: '轉介日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '轉介資源名稱', width: 180 },
        { header: '轉介原因', width: 180 },
        { header: '追蹤日期', width: 110 },
        { header: '追蹤結果', width: 160 },
        { header: '轉介人員', width: 100 },
      ],
    },
  ],

  /** 16. B7 促進服務對象與家屬互動 */
  16: [
    {
      sheetName: '家屬電訪及會談紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '聯繫日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '家屬姓名', width: 110 },
        { header: '聯繫方式', width: 110 },
        { header: '主要需求', width: 180 },
        { header: '提供服務/資訊', width: 200 },
        { header: '後續追蹤', width: 150 },
        { header: '紀錄人員', width: 100 },
      ],
    },
  ],

  /** 17. B8 例行醫療照護及就醫安排 */
  17: [
    {
      sheetName: '醫師巡診診察紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '診察日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '診察醫師', width: 110 },
        { header: '診察摘要', width: 220 },
        { header: '醫療處置', width: 180 },
        { header: '醫囑', width: 180 },
        { header: '護理人員確認', width: 130 },
      ],
    },
  ],

  /** 18. B9 傳染病防治及感染管制 */
  18: [
    {
      sheetName: '服務對象體溫監測紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 2,
      columns: [
        { header: '量測日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '早', width: 70 },
        { header: '午', width: 70 },
        { header: '晚', width: 70 },
        { header: '異常說明', width: 180 },
        { header: '處置措施', width: 160 },
        { header: '量測人員', width: 100 },
      ],
    },
    {
      sheetName: '傳染病通報紀錄表',
      archetype: 'incident-log',
      criteriaIndex: 2,
      columns: [
        { header: '通報日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '疑似疾病類別', width: 150 },
        { header: '症狀描述', width: 200 },
        { header: '通報機關', width: 130 },
        { header: '隔離措施', width: 160 },
        { header: '追蹤結果', width: 160 },
        { header: '通報人員', width: 100 },
      ],
    },
  ],

  /** 19. B10 處方藥品管理 */
  19: [
    {
      sheetName: '藥品用藥紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 2,
      columns: [
        { header: '日期', width: 90 },
        { header: '個案姓名', width: 110 },
        { header: '藥品名稱', width: 160 },
        { header: '服用劑量', width: 110 },
        { header: '服用時間', width: 110 },
        { header: '給藥人員', width: 100 },
        { header: '備註', width: 130 },
      ],
    },
    {
      sheetName: '管制藥品使用及回收銷毀紀錄表',
      archetype: 'inventory-list',
      criteriaIndex: 3,
      prefillRows: 5,
      columns: [
        { header: '處理日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '藥品名稱', width: 160 },
        { header: '數量', width: 80 },
        { header: '回收/銷毀方式', width: 150 },
        { header: '回收機構', width: 150 },
        { header: '處理人員', width: 100 },
        { header: '主管核閱', width: 100 },
      ],
    },
  ],

  /** 20. B11 藥事照護服務 */
  20: [
    {
      sheetName: '藥師藥事照護服務紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '服務日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '藥師姓名', width: 110 },
        { header: '評估/指導內容', width: 220 },
        { header: '多重用藥評估', width: 160 },
        { header: '建議事項', width: 200 },
        { header: '護理人員確認', width: 130 },
      ],
    },
  ],

  /** 21. B12 跌倒預防及處理 */
  21: [
    {
      sheetName: '跌倒事件監測紀錄表',
      archetype: 'incident-log',
      criteriaIndex: 2,
      columns: [
        { header: '發生日期', width: 100 },
        { header: '發生時間', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '發生地點', width: 130 },
        { header: '跌倒經過', width: 220 },
        { header: '處置措施', width: 200 },
        { header: '傷害程度', width: 110 },
        { header: '家屬通知', width: 110 },
        { header: '後續追蹤', width: 160 },
        { header: '改善措施', width: 180 },
      ],
    },
  ],

  /** 22. B13 壓力性損傷預防及處理 */
  22: [
    {
      sheetName: '壓力性損傷監測紀錄表',
      archetype: 'incident-log',
      criteriaIndex: 2,
      columns: [
        { header: '評估日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '損傷部位', width: 130 },
        { header: '損傷分期', width: 110 },
        { header: '發生原因分析', width: 200 },
        { header: '處置措施', width: 200 },
        { header: '傷口狀況評值', width: 160 },
        { header: '護理人員', width: 100 },
      ],
    },
  ],

  /** 23. B14 疼痛評估及處理 */
  23: [
    {
      sheetName: '疼痛評估與處置紀錄表',
      archetype: 'case-assessment',
      criteriaIndex: 0,
      columns: [
        { header: '評估日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '疼痛分數(0-10)', width: 140 },
        { header: '疼痛部位', width: 130 },
        { header: '加重/緩解因素', width: 160 },
        { header: '處置措施', width: 180 },
        { header: '處置後分數', width: 120 },
        { header: '評估人員', width: 100 },
      ],
    },
  ],

  /** 24. B15 身體約束使用管理 */
  24: [
    {
      sheetName: '約束個案監測紀錄表',
      archetype: 'incident-log',
      criteriaIndex: 2,
      columns: [
        { header: '監測日期', width: 100 },
        { header: '監測時間', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '約束部位', width: 130 },
        { header: '約束原因', width: 180 },
        { header: '替代措施評估', width: 160 },
        { header: '皮膚狀況', width: 130 },
        { header: '個案反應', width: 160 },
        { header: '監測人員', width: 100 },
      ],
    },
  ],

  /** 25. B16 感染事件預防及處理 */
  25: [
    {
      sheetName: '感染事件監測紀錄表',
      archetype: 'incident-log',
      criteriaIndex: 0,
      columns: [
        { header: '監測日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '感染類型', width: 140 },
        { header: '症狀描述', width: 200 },
        { header: '隔離措施', width: 160 },
        { header: '處置措施', width: 200 },
        { header: '通報狀況', width: 130 },
        { header: '追蹤結果', width: 160 },
        { header: '護理人員', width: 100 },
      ],
    },
  ],

  /** 26. B17 非計畫性住院管理 */
  26: [
    {
      sheetName: '非計畫性住院監測紀錄表',
      archetype: 'incident-log',
      criteriaIndex: 0,
      columns: [
        { header: '住院日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '住院原因', width: 180 },
        { header: '住院醫院', width: 150 },
        { header: '原因分析', width: 200 },
        { header: '改善措施', width: 200 },
        { header: '返回機構日期', width: 130 },
        { header: '後續追蹤', width: 160 },
        { header: '紀錄人員', width: 100 },
      ],
    },
  ],

  /** 27. B18 非計畫性體重變化管理 */
  27: [
    {
      sheetName: '體重監測追蹤紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '量測日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '體重(kg)', width: 100 },
        { header: '上月體重(kg)', width: 130 },
        { header: '變化量', width: 90 },
        { header: '變化百分比', width: 110 },
        { header: '異常說明', width: 180 },
        { header: '介入措施', width: 180 },
        { header: '量測人員', width: 100 },
      ],
    },
  ],

  /** 28. B19 管路移除（鼻胃管及導尿管） */
  28: [
    {
      sheetName: '管路移除照護計畫書',
      archetype: 'care-plan',
      criteriaIndex: 1,
      prefillRows: 3,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '計畫日期', width: 110 },
        { header: '管路類型', width: 130 },
        { header: '目前狀態評估', width: 180 },
        { header: '照護目標', width: 180 },
        { header: '執行措施', width: 200 },
        { header: '執行人員', width: 100 },
        { header: '評值日期', width: 110 },
        { header: '評值結果', width: 160 },
      ],
    },
    {
      sheetName: '管路移除逐案服務紀錄',
      archetype: 'daily-record',
      criteriaIndex: 2,
      columns: [
        { header: '服務日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '管路類型', width: 130 },
        { header: '執行項目', width: 180 },
        { header: '執行情形', width: 200 },
        { header: '個案反應', width: 160 },
        { header: '執行人員', width: 100 },
      ],
    },
  ],

  /** 29. B20 服務對象健康檢查 */
  29: [
    {
      sheetName: '健康檢查紀錄管理表',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 15,
      columns: [
        { header: '姓名', width: 110 },
        { header: '檢查日期', width: 110 },
        { header: '血壓/心跳', width: 120 },
        { header: '血液常規', width: 100 },
        { header: '血糖', width: 90 },
        { header: '異常項目', width: 160 },
        { header: '後續追蹤', width: 180 },
        { header: '醫師確認', width: 100 },
      ],
    },
  ],

  /** 30. B21 侵入性照護技術管理 */
  30: [
    {
      sheetName: '侵入性照護技術稽核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
      columns: [
        { header: '稽核日期', width: 100 },
        { header: '稽核人員', width: 110 },
        { header: '受稽人員', width: 110 },
        { header: '稽核項目', width: 180 },
        { header: '符合', width: 70 },
        { header: '不符合', width: 80 },
        { header: '缺失說明', width: 180 },
        { header: '改善措施', width: 180 },
        { header: '改善期限', width: 110 },
      ],
    },
  ],

  /** 31. B22 緊急送醫作業 */
  31: [
    {
      sheetName: '緊急送醫服務紀錄表',
      archetype: 'incident-log',
      criteriaIndex: 3,
      columns: [
        { header: '送醫日期', width: 100 },
        { header: '送醫時間', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '送醫原因', width: 180 },
        { header: '急救措施', width: 180 },
        { header: '送往醫院', width: 150 },
        { header: '家屬通知時間', width: 130 },
        { header: '後續追蹤', width: 160 },
        { header: '送醫人員', width: 100 },
      ],
    },
  ],

  /** 32. B23 疫苗注射服務 */
  32: [
    {
      sheetName: '疫苗接種清冊',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 20,
      columns: [
        { header: '姓名', width: 110 },
        { header: '類別(住民/員工)', width: 140 },
        { header: '疫苗名稱', width: 150 },
        { header: '施打日期', width: 110 },
        { header: '是否施打', width: 100 },
        { header: '未施打原因', width: 180 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 33. B24 促進日常活動及下床 */
  33: [
    {
      sheetName: '服務對象下床活動紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '日期', width: 90 },
        { header: '個案姓名', width: 110 },
        { header: '下床次數', width: 100 },
        { header: '下床時間(分鐘)', width: 130 },
        { header: '活動內容', width: 180 },
        { header: '使用輔具', width: 130 },
        { header: '個案反應', width: 150 },
        { header: '照顧人員', width: 100 },
      ],
    },
  ],

  /** 34. B25 身體清潔及翻身照護 */
  34: [
    {
      sheetName: '翻身拍背護理紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      columns: [
        { header: '日期', width: 90 },
        { header: '個案姓名', width: 110 },
        { header: '翻身時間(每2hr)', width: 140 },
        { header: '翻身方向', width: 110 },
        { header: '擺位說明', width: 160 },
        { header: '皮膚狀況', width: 130 },
        { header: '執行人員', width: 100 },
      ],
    },
  ],

  /** 35. B26 失禁服務對象定時如廁計畫 */
  35: [
    {
      sheetName: '定時如廁計畫書',
      archetype: 'care-plan',
      criteriaIndex: 0,
      prefillRows: 4,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '計畫日期', width: 110 },
        { header: '失禁類型評估', width: 160 },
        { header: '如廁頻率', width: 120 },
        { header: '如廁時間安排', width: 160 },
        { header: '輔助方式', width: 150 },
        { header: '評值日期', width: 110 },
        { header: '計畫調整', width: 160 },
        { header: '負責人員', width: 100 },
      ],
    },
    {
      sheetName: '定時如廁執行紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      columns: [
        { header: '日期', width: 90 },
        { header: '個案姓名', width: 110 },
        { header: '如廁時間', width: 110 },
        { header: '協助方式', width: 130 },
        { header: '如廁結果', width: 130 },
        { header: '個案反應', width: 150 },
        { header: '執行人員', width: 100 },
      ],
    },
  ],

  /** 36. B27 自我照顧能力維持及輔具使用 */
  36: [
    {
      sheetName: '自我照顧能力促進計畫書',
      archetype: 'care-plan',
      criteriaIndex: 1,
      prefillRows: 4,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '計畫日期', width: 110 },
        { header: 'ADL評估結果', width: 160 },
        { header: '照護目標', width: 180 },
        { header: '促進措施', width: 200 },
        { header: '輔具提供', width: 150 },
        { header: '執行人員', width: 100 },
        { header: '評值日期', width: 110 },
        { header: '評值結果', width: 160 },
      ],
    },
  ],

  /** 37. B28 膳食及個別化飲食照護 */
  37: [
    {
      sheetName: '循環菜單一覽表',
      archetype: 'inventory-list',
      criteriaIndex: 1,
      prefillRows: 14,
      columns: [
        { header: '星期/週次', width: 110 },
        { header: '早餐', width: 180 },
        { header: '午餐', width: 180 },
        { header: '晚餐', width: 180 },
        { header: '點心', width: 130 },
        { header: '擬定營養師', width: 120 },
        { header: '審核日期', width: 110 },
      ],
    },
    {
      sheetName: '個別化飲食照護計畫書',
      archetype: 'care-plan',
      criteriaIndex: 0,
      prefillRows: 4,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '計畫日期', width: 110 },
        { header: '疾病/生理狀況', width: 180 },
        { header: '飲食類型', width: 130 },
        { header: '個別化措施', width: 200 },
        { header: '適宜餐具說明', width: 160 },
        { header: '評值日期', width: 110 },
        { header: '評值結果', width: 160 },
        { header: '負責營養師', width: 120 },
      ],
    },
  ],

  /** 38. B29 管灌飲食照護 */
  38: [
    {
      sheetName: '管灌飲食計畫及執行紀錄表',
      archetype: 'care-plan',
      criteriaIndex: 0,
      prefillRows: 3,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '計畫日期', width: 110 },
        { header: '配方種類', width: 150 },
        { header: '灌食量(ml)', width: 120 },
        { header: '灌食頻率', width: 120 },
        { header: '管路位置確認', width: 140 },
        { header: '個案反應', width: 160 },
        { header: '執行人員', width: 100 },
      ],
    },
  ],

  /** 42. C4 餐廳及廚房衛生管理 */
  42: [
    {
      sheetName: '廚房環境衛生日常查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      columns: [
        { header: '查核日期', width: 100 },
        { header: '查核項目', width: 240 },
        { header: '符合', width: 70 },
        { header: '不符合', width: 80 },
        { header: '缺失說明', width: 180 },
        { header: '改善措施', width: 180 },
        { header: '查核人員', width: 100 },
      ],
    },
    {
      sheetName: '食材進貨及儲存檢查紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      columns: [
        { header: '進貨日期', width: 100 },
        { header: '食材名稱', width: 150 },
        { header: '數量', width: 80 },
        { header: '供應商', width: 150 },
        { header: '驗收溫度', width: 110 },
        { header: '驗收結果', width: 120 },
        { header: '儲存位置', width: 120 },
        { header: '驗收人員', width: 100 },
      ],
    },
  ],

  /** 43. C5 污物及廢棄物處理 */
  43: [
    {
      sheetName: '環境消毒及廢棄物處理紀錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
      columns: [
        { header: '處理日期', width: 100 },
        { header: '區域/項目', width: 150 },
        { header: '廢棄物類別', width: 130 },
        { header: '處理方式', width: 150 },
        { header: '清運廠商', width: 130 },
        { header: '執行人員', width: 110 },
        { header: '主管確認', width: 100 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 47. C9 用電安全及消防管理 */
  47: [
    {
      sheetName: '每月用電設備自主安全檢查表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      columns: [
        { header: '檢查日期', width: 100 },
        { header: '檢查區域', width: 140 },
        { header: '設備項目', width: 180 },
        { header: '正常', width: 70 },
        { header: '異常', width: 70 },
        { header: '異常說明', width: 180 },
        { header: '改善措施', width: 180 },
        { header: '檢查人員', width: 100 },
      ],
    },
  ],

  /** 49. C11 緊急應變（EOP）演練 */
  49: [
    {
      sheetName: '緊急應變演練計畫及紀錄表',
      archetype: 'training-record',
      criteriaIndex: 0,
      columns: [
        { header: '演練日期', width: 100 },
        { header: '演練類型(實地/桌上)', width: 160 },
        { header: '演練情境', width: 180 },
        { header: '演練場地', width: 130 },
        { header: '參與人員', width: 180 },
        { header: '演練過程摘要', width: 220 },
        { header: '檢討缺失', width: 180 },
        { header: '改善措施', width: 180 },
        { header: '負責人員', width: 100 },
      ],
    },
  ],

  /** 54. C16 輔具與移位設備安全管理 */
  54: [
    {
      sheetName: '輔具設備維護保養紀錄表',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '設備名稱', width: 160 },
        { header: '型號/序號', width: 140 },
        { header: '維護日期', width: 120 },
        { header: '維護廠商', width: 150 },
        { header: '維護結果', width: 150 },
        { header: '下次維護日期', width: 130 },
        { header: '負責人員', width: 100 },
      ],
    },
  ],

  /** 55. D1 服務對象人身安全及尊嚴維護 */
  55: [
    {
      sheetName: '不當對待事件處理紀錄表',
      archetype: 'incident-log',
      criteriaIndex: 2,
      columns: [
        { header: '事件日期', width: 100 },
        { header: '當事人', width: 110 },
        { header: '事件類型', width: 150 },
        { header: '事件描述', width: 240 },
        { header: '緊急處置', width: 180 },
        { header: '通報狀況', width: 150 },
        { header: '後續追蹤', width: 160 },
        { header: '改善措施', width: 180 },
      ],
    },
  ],

  /** 57. D3 服務對象隱私及個人資料保護 */
  57: [
    {
      sheetName: '個人資料同意及調閱紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      columns: [
        { header: '同意/調閱日期', width: 130 },
        { header: '服務對象姓名', width: 130 },
        { header: '資料類型', width: 140 },
        { header: '使用目的', width: 180 },
        { header: '當事人/家屬同意', width: 140 },
        { header: '調閱人員', width: 110 },
        { header: '核准人員', width: 100 },
      ],
    },
  ],

  /** 58. D4 服務對象申訴及意見處理機制 */
  58: [
    {
      sheetName: '申訴意見反應處理紀錄表',
      archetype: 'incident-log',
      criteriaIndex: 0,
      columns: [
        { header: '受理日期', width: 100 },
        { header: '申訴人', width: 110 },
        { header: '申訴類別', width: 130 },
        { header: '申訴內容', width: 220 },
        { header: '處理經過', width: 200 },
        { header: '處理結果', width: 180 },
        { header: '回覆日期', width: 110 },
        { header: '追蹤結果', width: 160 },
        { header: '處理人員', width: 100 },
      ],
    },
  ],

  /** 61. D7 服務對象財物及遺物管理 */
  61: [
    {
      sheetName: '服務對象財物管理紀錄表',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '處理日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '財物類別', width: 130 },
        { header: '項目說明', width: 200 },
        { header: '金額/數量', width: 110 },
        { header: '處理方式', width: 160 },
        { header: '家屬確認', width: 110 },
        { header: '負責人員', width: 100 },
      ],
    },
  ],

  /** 62. D8 安寧緩和醫療及病人自主權利 */
  62: [
    {
      sheetName: '安寧緩和及病主法服務紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      columns: [
        { header: '紀錄日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: 'AD/DNR狀態', width: 120 },
        { header: '提供資訊/諮詢內容', width: 220 },
        { header: '家屬溝通內容', width: 200 },
        { header: '轉介機構', width: 150 },
        { header: '相關人員', width: 150 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 63. D9 服務對象宗教信仰及文化需求 */
  63: [
    {
      sheetName: '靈性關懷及文化照護紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '服務日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '宗教信仰', width: 110 },
        { header: '服務內容', width: 220 },
        { header: '個案反應', width: 180 },
        { header: '後續安排', width: 160 },
        { header: '服務人員', width: 100 },
      ],
    },
  ],

};
