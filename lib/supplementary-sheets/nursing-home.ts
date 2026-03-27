/**
 * 住宿型照顧機構評鑑補充文件定義
 * 114年度臺北市老人安養暨長期照顧機構評鑑指標（75項）
 */
import type { SupplementaryDefsMap } from '../supplementary-sheet-types';

export const nursingHomeDefs: SupplementaryDefsMap = {

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

  /** 3. A3 業務計畫及營運方針之擬訂與執行情形 */
  3: [
    {
      sheetName: '業務計畫執行紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      columns: [
        { header: '執行日期', width: 100 },
        { header: '計畫項目', width: 180 },
        { header: '執行內容', width: 220 },
        { header: '執行人員', width: 110 },
        { header: '績效說明', width: 180 },
        { header: '主管核閱', width: 100 },
      ],
    },
  ],

  /** 5. A5 機構內住民保護、性侵害及性騷擾事件防治機制建置情形 */
  5: [
    {
      sheetName: '住民保護事件處理紀錄表',
      archetype: 'incident-log',
      criteriaIndex: 0,
      columns: [
        { header: '事件日期', width: 100 },
        { header: '事件時間', width: 100 },
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

  /** 6. A6 危機或緊急事件風險管理情形 */
  6: [
    {
      sheetName: '緊急事件處理紀錄表',
      archetype: 'incident-log',
      criteriaIndex: 2,
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
      sheetName: '風險事件半年分析報告表',
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

  /** 8. A8 社會工作人員設置情形 */
  8: [
    {
      sheetName: '社工人員名冊',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 5,
      columns: [
        { header: '姓名', width: 110 },
        { header: '資格證書字號', width: 160 },
        { header: '任用類別', width: 110 },
        { header: '服務起始日', width: 120 },
        { header: '負責個案數', width: 110 },
        { header: '兼任報備情形', width: 160 },
        { header: '備註', width: 130 },
      ],
    },
    {
      sheetName: '社工服務簽到紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      columns: [
        { header: '服務日期', width: 100 },
        { header: '人員姓名', width: 110 },
        { header: '到勤時間', width: 110 },
        { header: '離勤時間', width: 110 },
        { header: '服務內容摘要', width: 220 },
        { header: '主管確認', width: 100 },
      ],
    },
  ],

  /** 9. A9 護理人員設置情形 */
  9: [
    {
      sheetName: '護理人員名冊',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '姓名', width: 110 },
        { header: '執業執照字號', width: 160 },
        { header: '執業登錄機構', width: 160 },
        { header: '任用日期', width: 110 },
        { header: '班別', width: 80 },
        { header: '負責床數', width: 100 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 10. A10 兼任（特約）專業人員設置情形 */
  10: [
    {
      sheetName: '兼任專業人員名冊',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '姓名', width: 110 },
        { header: '專業別', width: 120 },
        { header: '資格證書字號', width: 160 },
        { header: '支援報備文號', width: 160 },
        { header: '合約起迄日', width: 130 },
        { header: '備註', width: 130 },
      ],
    },
    {
      sheetName: '兼任專業人員到勤紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 1,
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

  /** 13. A13 新進工作人員職前訓練情形 */
  13: [
    {
      sheetName: '職前訓練紀錄表',
      archetype: 'training-record',
      criteriaIndex: 0,
      columns: [
        { header: '訓練日期', width: 100 },
        { header: '受訓人員', width: 110 },
        { header: '到職日期', width: 110 },
        { header: '訓練主題', width: 180 },
        { header: '訓練時數', width: 100 },
        { header: '講師', width: 110 },
        { header: '訓練方式', width: 120 },
        { header: '測驗成績', width: 100 },
      ],
    },
    {
      sheetName: '職前訓練適任性考核表',
      archetype: 'case-assessment',
      criteriaIndex: 2,
      prefillRows: 5,
      columns: [
        { header: '受訓人員', width: 110 },
        { header: '到職日期', width: 110 },
        { header: '考核日期', width: 110 },
        { header: '考核項目', width: 180 },
        { header: '考核結果', width: 120 },
        { header: '意見回饋', width: 200 },
        { header: '考核人員', width: 100 },
      ],
    },
  ],

  /** 14. A14 在職教育訓練計畫訂定及辦理情形 */
  14: [
    {
      sheetName: '在職教育訓練紀錄表',
      archetype: 'training-record',
      criteriaIndex: 1,
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
      sheetName: '機構外訓練心得報告表',
      archetype: 'training-record',
      criteriaIndex: 6,
      prefillRows: 5,
      columns: [
        { header: '訓練日期', width: 100 },
        { header: '人員姓名', width: 110 },
        { header: '訓練機構/課程', width: 200 },
        { header: '訓練時數', width: 100 },
        { header: '心得摘要', width: 260 },
        { header: '應用計畫', width: 180 },
        { header: '主管核閱', width: 100 },
      ],
    },
  ],

  /** 15. A15 廚工及供膳人員領照及接受教育訓練情形 */
  15: [
    {
      sheetName: '廚工教育訓練紀錄表',
      archetype: 'training-record',
      criteriaIndex: 1,
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

  /** 16. B1 定期召開服務品質會議及其辦理情形 */
  16: [
    {
      sheetName: '服務品質會議紀錄表',
      archetype: 'meeting-minutes',
      criteriaIndex: 0,
      columns: [
        { header: '會議日期', width: 100 },
        { header: '會議名稱', width: 160 },
        { header: '出席人員', width: 180 },
        { header: '討論議題', width: 220 },
        { header: '決議事項', width: 220 },
        { header: '執行期限', width: 110 },
        { header: '追蹤結果', width: 160 },
        { header: '主持人', width: 90 },
      ],
    },
  ],

  /** 17. B2 個案服務計畫與評值及管理情形 */
  17: [
    {
      sheetName: '個案入住評估表',
      archetype: 'case-assessment',
      criteriaIndex: 0,
      prefillRows: 3,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '入住日期', width: 110 },
        { header: '評估日期', width: 110 },
        { header: '身體評估摘要', width: 180 },
        { header: '心理評估摘要', width: 160 },
        { header: '社會評估摘要', width: 160 },
        { header: '高風險評估', width: 160 },
        { header: '評估人員', width: 100 },
      ],
    },
    {
      sheetName: '個別化照顧計畫書',
      archetype: 'care-plan',
      criteriaIndex: 2,
      prefillRows: 4,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '計畫日期', width: 110 },
        { header: '照護問題', width: 180 },
        { header: '照護目標', width: 180 },
        { header: '照護措施', width: 200 },
        { header: '負責人員', width: 100 },
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

  /** 19. B4 服務對象適應輔導或支持措施 */
  19: [
    {
      sheetName: '適應輔導關懷紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 1,
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

  /** 20. B5 跨專業整合照護執行情形 */
  20: [
    {
      sheetName: '專業聯繫會議紀錄表',
      archetype: 'meeting-minutes',
      criteriaIndex: 1,
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
      criteriaIndex: 2,
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

  /** 21. B6 服務對象團體或社區活動辦理情形 */
  21: [
    {
      sheetName: '團體社區活動辦理紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 2,
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

  /** 22. B7 社區資源聯結及運用情形 */
  22: [
    {
      sheetName: '社區資源名冊',
      archetype: 'inventory-list',
      criteriaIndex: 3,
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
      sheetName: '社區交流活動紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 2,
      columns: [
        { header: '活動日期', width: 100 },
        { header: '活動名稱', width: 160 },
        { header: '參與社區單位', width: 160 },
        { header: '參加成員', width: 150 },
        { header: '活動內容', width: 220 },
        { header: '評值成果', width: 180 },
        { header: '負責人員', width: 100 },
      ],
    },
  ],

  /** 23. B8 與家屬互動及提供服務情形 */
  23: [
    {
      sheetName: '家屬電訪及會談紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 3,
      columns: [
        { header: '聯繫日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '家屬姓名', width: 110 },
        { header: '聯繫方式', width: 110 },
        { header: '主要需求', width: 180 },
        { header: '提供支持內容', width: 200 },
        { header: '後續追蹤', width: 150 },
        { header: '紀錄人員', width: 100 },
      ],
    },
  ],

  /** 24. B9 提供服務對象例行及必要之醫療服務情形 */
  24: [
    {
      sheetName: '醫師巡診診察紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 2,
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

  /** 25. B10 防疫機制建置情形 */
  25: [
    {
      sheetName: '服務對象體溫紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
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
      criteriaIndex: 1,
      columns: [
        { header: '通報日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '疑似疾病類別', width: 150 },
        { header: '症狀描述', width: 200 },
        { header: '通報機關', width: 130 },
        { header: '處置措施', width: 180 },
        { header: '追蹤結果', width: 160 },
        { header: '通報人員', width: 100 },
      ],
    },
  ],

  /** 26. B11 服務對象處方藥品安全管理情形 */
  26: [
    {
      sheetName: '藥品用藥紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 1,
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
      sheetName: '管制藥品回收銷毀紀錄表',
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

  /** 27. B12 提供服務對象藥事服務情形 */
  27: [
    {
      sheetName: '藥師藥事諮詢服務紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 2,
      columns: [
        { header: '服務日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '藥師姓名', width: 110 },
        { header: '諮詢/指導內容', width: 220 },
        { header: '建議事項', width: 200 },
        { header: '護理人員確認', width: 130 },
      ],
    },
    {
      sheetName: '用藥反應追蹤紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 3,
      columns: [
        { header: '觀察日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '藥品名稱', width: 160 },
        { header: '觀察反應', width: 180 },
        { header: '交互作用疑慮', width: 160 },
        { header: '諮詢醫師/藥師', width: 140 },
        { header: '追蹤結果', width: 160 },
        { header: '紀錄人員', width: 100 },
      ],
    },
  ],

  /** 28. B13 服務對象跌倒預防、處理及監測情形 */
  28: [
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
      ],
    },
  ],

  /** 29. B14 服務對象壓力性損傷預防、處理及監測情形 */
  29: [
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

  /** 30. B15 服務對象疼痛偵測與處置情形 */
  30: [
    {
      sheetName: '疼痛評估與處置紀錄表',
      archetype: 'case-assessment',
      criteriaIndex: 1,
      columns: [
        { header: '評估日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '疼痛分數(0-10)', width: 140 },
        { header: '疼痛部位', width: 130 },
        { header: '開始時間', width: 110 },
        { header: '持續時間', width: 110 },
        { header: '加重/緩解因素', width: 160 },
        { header: '處置措施', width: 180 },
        { header: '處置反應', width: 160 },
        { header: '評估人員', width: 100 },
      ],
    },
  ],

  /** 31. B16 服務對象約束處理及監測情形 */
  31: [
    {
      sheetName: '約束個案監測紀錄表',
      archetype: 'incident-log',
      criteriaIndex: 3,
      columns: [
        { header: '監測日期', width: 100 },
        { header: '監測時間', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '約束部位', width: 130 },
        { header: '約束原因', width: 180 },
        { header: '皮膚狀況', width: 130 },
        { header: '肢體循環', width: 120 },
        { header: '個案反應', width: 160 },
        { header: '監測人員', width: 100 },
      ],
    },
  ],

  /** 32. B17 服務對象感染預防、處理及監測情形 */
  32: [
    {
      sheetName: '感染事件監測紀錄表',
      archetype: 'incident-log',
      criteriaIndex: 2,
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

  /** 33. B18 服務對象非計畫性住院處理及監測情形 */
  33: [
    {
      sheetName: '非計畫性住院監測紀錄表',
      archetype: 'incident-log',
      criteriaIndex: 2,
      columns: [
        { header: '住院日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '住院原因', width: 180 },
        { header: '住院醫院', width: 150 },
        { header: '處置摘要', width: 200 },
        { header: '返回機構日期', width: 130 },
        { header: '後續追蹤', width: 160 },
        { header: '紀錄人員', width: 100 },
      ],
    },
  ],

  /** 34. B19 服務對象非計畫性體重改變處理及監測情形 */
  34: [
    {
      sheetName: '體重監測追蹤紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 2,
      columns: [
        { header: '量測日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '體重(kg)', width: 100 },
        { header: '上月體重(kg)', width: 130 },
        { header: '變化量', width: 90 },
        { header: '變化百分比', width: 110 },
        { header: '異常說明', width: 180 },
        { header: '處置措施', width: 180 },
        { header: '量測人員', width: 100 },
      ],
    },
  ],

  /** 35. B20 提供移除鼻胃管之增進照護計畫及執行情形 */
  35: [
    {
      sheetName: '移除鼻胃管照護計畫書',
      archetype: 'care-plan',
      criteriaIndex: 0,
      prefillRows: 3,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '計畫日期', width: 110 },
        { header: '目前狀態評估', width: 180 },
        { header: '照護目標', width: 180 },
        { header: '執行措施', width: 200 },
        { header: '評值方法', width: 160 },
        { header: '執行人員', width: 100 },
        { header: '評值日期', width: 110 },
        { header: '評值結果', width: 160 },
      ],
    },
    {
      sheetName: '移除鼻胃管逐案服務紀錄',
      archetype: 'daily-record',
      criteriaIndex: 1,
      columns: [
        { header: '服務日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '執行項目', width: 180 },
        { header: '執行情形', width: 200 },
        { header: '個案反應', width: 160 },
        { header: '執行人員', width: 100 },
      ],
    },
  ],

  /** 36. B21 提供移除導尿管機能增進的照護計畫及執行情形 */
  36: [
    {
      sheetName: '移除導尿管照護計畫書',
      archetype: 'care-plan',
      criteriaIndex: 0,
      prefillRows: 3,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '計畫日期', width: 110 },
        { header: '評估結果', width: 180 },
        { header: '照護目標', width: 180 },
        { header: '膀胱訓練措施', width: 200 },
        { header: '評值方法', width: 160 },
        { header: '執行人員', width: 100 },
        { header: '評值日期', width: 110 },
        { header: '評值結果', width: 160 },
      ],
    },
    {
      sheetName: '移除導尿管逐案服務紀錄',
      archetype: 'daily-record',
      criteriaIndex: 1,
      columns: [
        { header: '服務日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '執行項目', width: 180 },
        { header: '執行情形', width: 200 },
        { header: '個案反應', width: 160 },
        { header: '執行人員', width: 100 },
      ],
    },
  ],

  /** 37. B22 工作人員及服務對象定期健康檢查及健康管理情形 */
  37: [
    {
      sheetName: '健康檢查紀錄管理表',
      archetype: 'inventory-list',
      criteriaIndex: 1,
      prefillRows: 10,
      columns: [
        { header: '姓名', width: 110 },
        { header: '類別(員工/住民)', width: 140 },
        { header: '檢查日期', width: 110 },
        { header: '胸部X光', width: 100 },
        { header: '血液常規', width: 100 },
        { header: '尿液檢查', width: 100 },
        { header: '異常項目', width: 160 },
        { header: '追蹤處理', width: 180 },
      ],
    },
  ],

  /** 38. B23 侵入性照護之執行情形 */
  38: [
    {
      sheetName: '侵入性照護技術稽核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 2,
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

  /** 39. B24 提供緊急送醫服務情形 */
  39: [
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

  /** 40. B25 服務對象及工作人員接受疫苗注射情形 */
  40: [
    {
      sheetName: '疫苗接種清冊',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 15,
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

  /** 41. B26 提供服務對象日常活動情形 */
  41: [
    {
      sheetName: '服務對象下床活動紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '日期', width: 90 },
        { header: '個案姓名', width: 110 },
        { header: '下床次數', width: 100 },
        { header: '下床時間', width: 100 },
        { header: '活動內容', width: 180 },
        { header: '使用輔具', width: 130 },
        { header: '個案反應', width: 150 },
        { header: '照顧人員', width: 100 },
      ],
    },
    {
      sheetName: '重度失能肢體活動紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 2,
      columns: [
        { header: '日期', width: 90 },
        { header: '個案姓名', width: 110 },
        { header: 'ADL分數', width: 100 },
        { header: '活動部位', width: 130 },
        { header: '執行次數', width: 100 },
        { header: '執行時間', width: 100 },
        { header: '個案狀況', width: 160 },
        { header: '執行人員', width: 100 },
      ],
    },
  ],

  /** 42. B27 提供服務對象清潔及翻身拍背服務情形 */
  42: [
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

  /** 43. B28 提升服務對象自我照顧能力之促進及相關輔具運用情形 */
  43: [
    {
      sheetName: '自我照顧能力促進計畫書',
      archetype: 'care-plan',
      criteriaIndex: 1,
      prefillRows: 4,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '計畫日期', width: 110 },
        { header: '能力評估結果', width: 180 },
        { header: '照護目標', width: 180 },
        { header: '促進措施', width: 200 },
        { header: '輔具提供', width: 150 },
        { header: '執行人員', width: 100 },
        { header: '評值日期', width: 110 },
        { header: '評值結果', width: 160 },
      ],
    },
  ],

  /** 44. B29 服務對象膳食及菜單擬定情形 */
  44: [
    {
      sheetName: '循環菜單一覽表',
      archetype: 'inventory-list',
      criteriaIndex: 2,
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
  ],

  /** 45. B30 提供個別化飲食情形 */
  45: [
    {
      sheetName: '個別化飲食照護計畫書',
      archetype: 'care-plan',
      criteriaIndex: 1,
      prefillRows: 4,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '計畫日期', width: 110 },
        { header: '疾病/生理狀況', width: 180 },
        { header: '飲食類型', width: 130 },
        { header: '個別化措施', width: 200 },
        { header: '目標', width: 160 },
        { header: '評值日期', width: 110 },
        { header: '評值結果', width: 160 },
        { header: '負責營養師', width: 120 },
      ],
    },
  ],

  /** 49. C2 儲藏設施設置情形 */
  49: [
    {
      sheetName: '儲藏設施定期盤點紀錄表',
      archetype: 'inventory-list',
      criteriaIndex: 3,
      prefillRows: 8,
      columns: [
        { header: '盤點日期', width: 100 },
        { header: '儲藏位置', width: 150 },
        { header: '物品類別', width: 130 },
        { header: '物品名稱', width: 160 },
        { header: '數量', width: 80 },
        { header: '狀況說明', width: 180 },
        { header: '盤點人員', width: 100 },
      ],
    },
  ],

  /** 50. C3 日常活動空間及設施設備設置情形 */
  50: [
    {
      sheetName: '日常活動空間清潔紀錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
      columns: [
        { header: '清潔日期', width: 100 },
        { header: '清潔區域', width: 150 },
        { header: '清潔項目', width: 200 },
        { header: '符合', width: 70 },
        { header: '不符合', width: 80 },
        { header: '缺失說明', width: 160 },
        { header: '清潔人員', width: 100 },
        { header: '主管確認', width: 100 },
      ],
    },
  ],

  /** 54. C7 餐廳、廚房之設施設備與環境清潔衛生情形 */
  54: [
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
      criteriaIndex: 2,
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

  /** 55. C8 污物、事業廢棄物處理及環境病媒、蟲害防治情形 */
  55: [
    {
      sheetName: '環境消毒紀錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 2,
      columns: [
        { header: '消毒日期', width: 100 },
        { header: '消毒區域', width: 150 },
        { header: '消毒方式', width: 150 },
        { header: '消毒藥劑', width: 150 },
        { header: '執行人員', width: 110 },
        { header: '主管確認', width: 100 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 56. C9 建築物公共安全檢查及消防安全設備情形 */
  56: [
    {
      sheetName: '每月用電設備自主檢查表',
      archetype: 'inspection-checklist',
      criteriaIndex: 4,
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

  /** 58. C11 緊急災害應變計畫及作業程序並落實演練 */
  58: [
    {
      sheetName: '災害應變演練紀錄表',
      archetype: 'training-record',
      criteriaIndex: 3,
      columns: [
        { header: '演練日期', width: 100 },
        { header: '演練類型', width: 150 },
        { header: '演練場地', width: 130 },
        { header: '參與人員', width: 180 },
        { header: '演練過程摘要', width: 220 },
        { header: '檢討缺失', width: 180 },
        { header: '改善措施', width: 180 },
        { header: '負責人員', width: 100 },
      ],
    },
    {
      sheetName: '防火避難自主檢核紀錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 2,
      columns: [
        { header: '檢核日期', width: 100 },
        { header: '檢核區域', width: 140 },
        { header: '檢核項目', width: 200 },
        { header: '符合', width: 70 },
        { header: '不符合', width: 80 },
        { header: '缺失說明', width: 180 },
        { header: '改善措施', width: 180 },
        { header: '檢核人員', width: 100 },
      ],
    },
  ],

  /** 61. C14 設備、儀器維護及辦理人員操作訓練情形 */
  61: [
    {
      sheetName: '設備儀器維護校正紀錄表',
      archetype: 'inventory-list',
      criteriaIndex: 1,
      prefillRows: 10,
      columns: [
        { header: '設備名稱', width: 160 },
        { header: '型號/序號', width: 140 },
        { header: '維護/校正日期', width: 130 },
        { header: '維護廠商', width: 150 },
        { header: '維護結果', width: 150 },
        { header: '下次維護日期', width: 130 },
        { header: '負責人員', width: 100 },
      ],
    },
    {
      sheetName: '設備操作訓練紀錄表',
      archetype: 'training-record',
      criteriaIndex: 2,
      columns: [
        { header: '訓練日期', width: 100 },
        { header: '訓練設備', width: 160 },
        { header: '受訓人員', width: 150 },
        { header: '訓練內容', width: 200 },
        { header: '操作查核結果', width: 150 },
        { header: '講師', width: 110 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 63. C16 機構飲用供水設備安全及清潔情形 */
  63: [
    {
      sheetName: '水塔飲水設備清潔紀錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      columns: [
        { header: '檢查/清潔日期', width: 130 },
        { header: '設備項目', width: 160 },
        { header: '清潔方式', width: 150 },
        { header: '檢查結果', width: 150 },
        { header: '水質檢驗報告', width: 150 },
        { header: '執行廠商', width: 130 },
        { header: '負責人員', width: 100 },
      ],
    },
  ],

  /** 64. D1 服務對象個案資料管理、統計分析與應用及保密情形 */
  64: [
    {
      sheetName: '個案資料統計分析報告表',
      archetype: 'daily-record',
      criteriaIndex: 2,
      prefillRows: 4,
      columns: [
        { header: '分析期別', width: 110 },
        { header: '統計項目', width: 180 },
        { header: '本期數值', width: 110 },
        { header: '上期數值', width: 110 },
        { header: '趨勢分析', width: 180 },
        { header: '因應措施', width: 200 },
        { header: '填報人員', width: 100 },
      ],
    },
  ],

  /** 66. D3 服務對象生活注意事項及家屬來訪注意事項訂定情形 */
  66: [
    {
      sheetName: '注意事項告知簽收紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      columns: [
        { header: '告知日期', width: 100 },
        { header: '服務對象姓名', width: 130 },
        { header: '告知對象', width: 120 },
        { header: '告知方式', width: 120 },
        { header: '告知內容摘要', width: 200 },
        { header: '簽收確認', width: 110 },
        { header: '告知人員', width: 100 },
      ],
    },
  ],

  /** 67. D4 服務對象或家屬申訴意見反應辦理情形 */
  67: [
    {
      sheetName: '申訴意見反應處理紀錄表',
      archetype: 'incident-log',
      criteriaIndex: 2,
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

  /** 68. D5 尊重服務對象信仰情形 */
  68: [
    {
      sheetName: '靈性關懷服務紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 2,
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

  /** 70. D7 服務對象財物管理及死亡遺產處理情形 */
  70: [
    {
      sheetName: '服務對象財物管理紀錄表',
      archetype: 'inventory-list',
      criteriaIndex: 2,
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

  /** 71. D8 提供緩和醫療及臨終照護措施 */
  71: [
    {
      sheetName: '緩和醫療及臨終照護紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 2,
      columns: [
        { header: '紀錄日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: 'DNR狀態', width: 110 },
        { header: '照護措施', width: 220 },
        { header: '家屬溝通內容', width: 200 },
        { header: '相關人員', width: 150 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 72. D9 辦理服務滿意度調查情形 */
  72: [
    {
      sheetName: '服務滿意度調查分析報告表',
      archetype: 'daily-record',
      criteriaIndex: 2,
      prefillRows: 5,
      columns: [
        { header: '調查期別', width: 110 },
        { header: '調查項目', width: 180 },
        { header: '滿意度評分', width: 120 },
        { header: '主要反映意見', width: 220 },
        { header: '改善措施', width: 220 },
        { header: '改善期限', width: 110 },
        { header: '填報人員', width: 100 },
      ],
    },
  ],

};
