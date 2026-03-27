/**
 * 產後護理之家評鑑補充文件定義
 * 115年度產後護理之家評鑑基準（17項）
 * 試評扣分項（item 17）不產生文件
 */
import type { SupplementaryDefsMap } from '../supplementary-sheet-types';

export const babycareDefs: SupplementaryDefsMap = {

  /** 1. A1.1 專任人員配置情形 */
  1: [
    {
      sheetName: '人員資格及排班管理表',
      archetype: 'inventory-list',
      criteriaIndex: 4,
      prefillRows: 8,
      columns: [
        { header: '人員姓名', width: 110 },
        { header: '職稱', width: 110 },
        { header: '執照字號', width: 140 },
        { header: 'NRP訓練效期', width: 130 },
        { header: 'BLS訓練效期', width: 130 },
        { header: '班別', width: 90 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 2. A1.2 教育訓練及急救訓練 */
  2: [
    {
      sheetName: '年度教育訓練執行記錄表',
      archetype: 'training-record',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '訓練日期', width: 100 },
        { header: '訓練主題', width: 200 },
        { header: '訓練類別', width: 130 },
        { header: '主講人/機構', width: 160 },
        { header: '訓練時數', width: 90 },
        { header: '參訓人員', width: 150 },
        { header: '成效評估', width: 130 },
      ],
    },
    {
      sheetName: '急救訓練複訓記錄表',
      archetype: 'training-record',
      criteriaIndex: 4,
      prefillRows: 6,
      columns: [
        { header: '人員姓名', width: 110 },
        { header: '訓練類別(NRP/BLS)', width: 160 },
        { header: '訓練日期', width: 100 },
        { header: '訓練機構', width: 160 },
        { header: '訓練時數', width: 90 },
        { header: '下次複訓期限', width: 130 },
        { header: '備註', width: 120 },
      ],
    },
  ],

  /** 3. A2.1 母嬰安全及感染管制 */
  3: [
    {
      sheetName: '感染管制執行查核表',
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
      sheetName: '手部衛生稽核記錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
      columns: [
        { header: '稽核日期', width: 100 },
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
      criteriaIndex: 5,
      columns: [
        { header: '通報日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '感染類型', width: 150 },
        { header: '症狀描述', width: 200 },
        { header: '隔離措施', width: 160 },
        { header: '家屬通知', width: 90 },
        { header: '主管機關通報', width: 120 },
        { header: '後續追蹤', width: 160 },
        { header: '通報人員', width: 100 },
      ],
    },
    {
      sheetName: '訪客管理登記表',
      archetype: 'daily-record',
      criteriaIndex: 3,
      columns: [
        { header: '探視日期', width: 100 },
        { header: '探視時間', width: 100 },
        { header: '探視對象(產婦/嬰兒)', width: 170 },
        { header: '訪客姓名', width: 110 },
        { header: '與產婦關係', width: 120 },
        { header: '手部衛生確認', width: 120 },
        { header: '登記人員', width: 100 },
      ],
    },
  ],

  /** 4. A2.2 意外事件預防與處理 */
  4: [
    {
      sheetName: '意外事件通報處理記錄表',
      archetype: 'incident-log',
      criteriaIndex: 1,
      columns: [
        { header: '事件日期', width: 100 },
        { header: '事件時間', width: 100 },
        { header: '當事人', width: 110 },
        { header: '事件類型', width: 150 },
        { header: '事件描述', width: 240 },
        { header: '立即處置', width: 200 },
        { header: '家屬通知時間', width: 130 },
        { header: '主管機關通報', width: 120 },
        { header: '後續追蹤改善', width: 180 },
        { header: '通報人員', width: 100 },
      ],
    },
    {
      sheetName: '急救設備維護記錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 4,
      prefillRows: 6,
      columns: [
        { header: '維護日期', width: 100 },
        { header: '設備名稱', width: 160 },
        { header: '設備位置', width: 140 },
        { header: '功能正常', width: 100 },
        { header: '耗材有效期', width: 120 },
        { header: '異常說明', width: 160 },
        { header: '維護人員', width: 100 },
      ],
    },
  ],

  /** 5. A2.3 品質管理機制與監測 */
  5: [
    {
      sheetName: '品質指標監測季報表',
      archetype: 'daily-record',
      criteriaIndex: 2,
      prefillRows: 7,
      columns: [
        { header: '監測季別', width: 110 },
        { header: '品質指標', width: 200 },
        { header: '本期數值(%)', width: 120 },
        { header: '目標值', width: 100 },
        { header: '達標', width: 80 },
        { header: '分析說明', width: 200 },
        { header: '改善措施', width: 180 },
        { header: '填報人員', width: 100 },
      ],
    },
    {
      sheetName: '滿意度調查結果分析表',
      archetype: 'case-assessment',
      criteriaIndex: 4,
      prefillRows: 5,
      columns: [
        { header: '調查年度', width: 100 },
        { header: '調查對象', width: 120 },
        { header: '回收問卷數', width: 110 },
        { header: '滿意度構面', width: 180 },
        { header: '平均分數', width: 100 },
        { header: '主要意見', width: 220 },
        { header: '改善措施', width: 200 },
        { header: '分析人員', width: 100 },
      ],
    },
  ],

  /** 6. B1.1 產婦照護 */
  6: [
    {
      sheetName: '產婦入住護理評估表',
      archetype: 'case-assessment',
      criteriaIndex: 0,
      prefillRows: 3,
      columns: [
        { header: '產婦姓名', width: 110 },
        { header: '入住日期', width: 100 },
        { header: '分娩方式', width: 110 },
        { header: '生命徵象', width: 130 },
        { header: '傷口狀況', width: 150 },
        { header: '子宮復原', width: 130 },
        { header: '乳房狀況', width: 130 },
        { header: '情緒評估', width: 130 },
        { header: '評估護理師', width: 110 },
      ],
    },
    {
      sheetName: '產婦每日護理記錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '記錄日期', width: 100 },
        { header: '產婦姓名', width: 110 },
        { header: '傷口護理', width: 150 },
        { header: '子宮復原(底高/惡露)', width: 170 },
        { header: '乳房護理', width: 130 },
        { header: '產後憂鬱篩查', width: 130 },
        { header: '用藥記錄', width: 150 },
        { header: '記錄護理師', width: 110 },
      ],
    },
  ],

  /** 7. B1.2 嬰兒照護 */
  7: [
    {
      sheetName: '嬰兒入住護理評估表',
      archetype: 'case-assessment',
      criteriaIndex: 0,
      prefillRows: 3,
      columns: [
        { header: '嬰兒姓名', width: 110 },
        { header: '出生日期', width: 100 },
        { header: '入住體重(g)', width: 120 },
        { header: '體溫(°C)', width: 100 },
        { header: '黃疸評估', width: 120 },
        { header: '外觀檢查', width: 160 },
        { header: '身分識別確認', width: 130 },
        { header: '評估護理師', width: 110 },
      ],
    },
    {
      sheetName: '嬰兒每日照護記錄表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      columns: [
        { header: '記錄日期', width: 100 },
        { header: '嬰兒姓名', width: 110 },
        { header: '體重(g)', width: 100 },
        { header: '黃疸值/照光記錄', width: 140 },
        { header: '沐浴/臍帶護理', width: 140 },
        { header: '餵食量/次數', width: 120 },
        { header: '嬰兒反應', width: 150 },
        { header: '照護人員', width: 100 },
      ],
    },
  ],

  /** 8. B1.3 親子關係促進 */
  8: [
    {
      sheetName: '親子互動評估與衛教記錄表',
      archetype: 'case-assessment',
      criteriaIndex: 3,
      prefillRows: 4,
      columns: [
        { header: '產婦姓名', width: 110 },
        { header: '評估日期', width: 100 },
        { header: '親子互動評估', width: 180 },
        { header: '衛教項目', width: 180 },
        { header: '回覆示教確認', width: 130 },
        { header: '家屬參與情形', width: 150 },
        { header: '後續追蹤', width: 150 },
        { header: '衛教護理師', width: 110 },
      ],
    },
  ],

  /** 9. B1.4 團體衛教課程 */
  9: [
    {
      sheetName: '團體衛教課程出席記錄表',
      archetype: 'training-record',
      criteriaIndex: 0,
      prefillRows: 6,
      columns: [
        { header: '課程日期', width: 100 },
        { header: '課程主題', width: 200 },
        { header: '主講人員', width: 110 },
        { header: '參與產婦姓名', width: 150 },
        { header: '出席(簽名)', width: 110 },
        { header: '學習成效評估', width: 150 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 10. B1.5 出住院評估 */
  10: [
    {
      sheetName: '出院護理評估記錄表',
      archetype: 'case-assessment',
      criteriaIndex: 0,
      prefillRows: 3,
      columns: [
        { header: '產婦姓名', width: 110 },
        { header: '出院日期', width: 100 },
        { header: '傷口癒合情形', width: 160 },
        { header: '子宮復原情形', width: 150 },
        { header: '嬰兒體重/黃疸', width: 140 },
        { header: '哺乳情形', width: 130 },
        { header: '出院衛教完成', width: 130 },
        { header: '社區資源轉介', width: 130 },
        { header: '評估護理師', width: 110 },
      ],
    },
    {
      sheetName: '出院後追蹤關懷記錄表',
      archetype: 'daily-record',
      criteriaIndex: 4,
      columns: [
        { header: '追蹤日期', width: 100 },
        { header: '產婦姓名', width: 110 },
        { header: '追蹤方式', width: 110 },
        { header: '產婦狀況', width: 180 },
        { header: '嬰兒狀況', width: 180 },
        { header: '提供建議', width: 180 },
        { header: '追蹤人員', width: 100 },
      ],
    },
  ],

  /** 11. B1.6 緊急狀況處理 */
  11: [
    {
      sheetName: '緊急狀況通報處理記錄表',
      archetype: 'incident-log',
      criteriaIndex: 2,
      columns: [
        { header: '事件日期', width: 100 },
        { header: '事件時間', width: 100 },
        { header: '當事人', width: 110 },
        { header: '緊急狀況類型', width: 160 },
        { header: '處置措施', width: 220 },
        { header: '家屬通知時間', width: 130 },
        { header: '轉介就醫情形', width: 160 },
        { header: '後續追蹤', width: 160 },
        { header: '處理人員', width: 100 },
      ],
    },
  ],

  /** 12. B1.7 哺乳及餵食計畫 */
  12: [
    {
      sheetName: '個別化哺乳餵食計畫書',
      archetype: 'care-plan',
      criteriaIndex: 0,
      prefillRows: 3,
      columns: [
        { header: '產婦姓名', width: 110 },
        { header: '計畫日期', width: 100 },
        { header: '哺乳意願/能力', width: 150 },
        { header: '哺乳/餵食目標', width: 180 },
        { header: '執行措施', width: 200 },
        { header: '負責護理師', width: 110 },
        { header: '評值結果', width: 160 },
      ],
    },
    {
      sheetName: '嬰兒哺乳體重追蹤表',
      archetype: 'daily-record',
      criteriaIndex: 2,
      columns: [
        { header: '記錄日期', width: 100 },
        { header: '嬰兒姓名', width: 110 },
        { header: '體重(g)', width: 100 },
        { header: '哺乳次數', width: 110 },
        { header: '哺乳時間/量', width: 130 },
        { header: '餵食方式', width: 120 },
        { header: '嬰兒反應', width: 150 },
        { header: '記錄護理師', width: 110 },
      ],
    },
  ],

  /** 13. B1.8 母乳收集與貯存 */
  13: [
    {
      sheetName: '母乳貯存溫度監測記錄表',
      archetype: 'daily-record',
      criteriaIndex: 2,
      columns: [
        { header: '記錄日期', width: 100 },
        { header: '監測時段', width: 110 },
        { header: '冷藏溫度(°C)', width: 120 },
        { header: '冷凍溫度(°C)', width: 120 },
        { header: '是否正常', width: 100 },
        { header: '異常處置', width: 160 },
        { header: '記錄人員', width: 100 },
      ],
    },
    {
      sheetName: '母乳標示管理查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 3,
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

  /** 14. C1 疏散避難系統 */
  14: [
    {
      sheetName: '消防設施定期維護記錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      columns: [
        { header: '維護日期', width: 100 },
        { header: '設施名稱', width: 160 },
        { header: '設施位置', width: 140 },
        { header: '功能正常', width: 100 },
        { header: '維護/合格證明', width: 150 },
        { header: '問題說明', width: 160 },
        { header: '維護廠商', width: 130 },
      ],
    },
    {
      sheetName: '消防演練記錄表',
      archetype: 'training-record',
      criteriaIndex: 3,
      prefillRows: 3,
      columns: [
        { header: '演練日期', width: 100 },
        { header: '演練情境', width: 200 },
        { header: '嬰兒疏散SOP執行', width: 160 },
        { header: '參與人數', width: 90 },
        { header: '疏散完成時間', width: 130 },
        { header: '缺失事項', width: 180 },
        { header: '改善措施', width: 180 },
        { header: '負責人員', width: 100 },
      ],
    },
  ],

  /** 15. C2 災害緊急應變 */
  15: [
    {
      sheetName: '照護設備維護校正記錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 3,
      prefillRows: 6,
      columns: [
        { header: '維護日期', width: 100 },
        { header: '設備名稱', width: 160 },
        { header: '保養項目', width: 200 },
        { header: '校正結果', width: 140 },
        { header: '合格(是/否)', width: 100 },
        { header: '下次校正日期', width: 130 },
        { header: '維護人員', width: 100 },
      ],
    },
    {
      sheetName: '環境溫濕度監測記錄表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      columns: [
        { header: '記錄日期', width: 100 },
        { header: '監測時段', width: 110 },
        { header: '監測區域', width: 140 },
        { header: '溫度(°C)', width: 100 },
        { header: '濕度(%)', width: 90 },
        { header: '是否達標', width: 100 },
        { header: '調整措施', width: 160 },
        { header: '記錄人員', width: 100 },
      ],
    },
  ],
};
