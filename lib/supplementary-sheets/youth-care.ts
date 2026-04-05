/**
 * 兒少安置機構評鑑補充文件定義
 * 112年度兒童及少年安置機構評鑑指標
 */
import type { SupplementaryDefsMap } from '../supplementary-sheet-types';

export const youthCareDefs: SupplementaryDefsMap = {

  /** 1. 董(理)事會功能與運作 */
  1: [
    {
      sheetName: '董事會議紀錄追蹤表',
      archetype: 'meeting-minutes',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '會議日期', width: 110 },
        { header: '會議類型', width: 130 },
        { header: '主要議題', width: 220 },
        { header: '決議事項', width: 220 },
        { header: '函報主管機關日期', width: 140 },
        { header: '備查公文字號', width: 140 },
        { header: '執行情形', width: 180 },
      ],
    },
    {
      sheetName: '董事會支援紀錄表',
      archetype: 'case-assessment',
      criteriaIndex: 0,
      prefillRows: 5,
      columns: [
        { header: '支援日期', width: 110 },
        { header: '支援類型', width: 130 },
        { header: '支援內容說明', width: 260 },
        { header: '挹注金額（元）', width: 130 },
        { header: '具體成效', width: 200 },
        { header: '相關文件', width: 150 },
      ],
    },
  ],

  /** 2. 機構行政組織架構與業務運作 */
  2: [
    {
      sheetName: '行政業務會議紀錄追蹤表',
      archetype: 'meeting-minutes',
      criteriaIndex: 0,
      prefillRows: 12,
      columns: [
        { header: '會議日期', width: 110 },
        { header: '會議類型', width: 130 },
        { header: '主要議題', width: 220 },
        { header: '決議事項', width: 220 },
        { header: '前次追蹤辦事', width: 160 },
        { header: '負責人員', width: 100 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 3. 員工手冊及人事制度 */
  3: [
    {
      sheetName: '員工績效考評記錄表',
      archetype: 'training-record',
      criteriaIndex: 2,
      prefillRows: 10,
      columns: [
        { header: '員工姓名', width: 100 },
        { header: '職稱', width: 110 },
        { header: '考評期間', width: 120 },
        { header: '考評項目', width: 180 },
        { header: '考評結果', width: 100 },
        { header: '主管簽章', width: 100 },
        { header: '員工簽章', width: 100 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 4. 人員資格與人數 */
  4: [
    {
      sheetName: '人員清冊及流動率追蹤表',
      archetype: 'inventory-list',
      criteriaIndex: 1,
      prefillRows: 15,
      columns: [
        { header: '姓名', width: 100 },
        { header: '職銜', width: 110 },
        { header: '工作內容', width: 200 },
        { header: '報到時間', width: 110 },
        { header: '離職時間', width: 110 },
        { header: '資格證書', width: 150 },
        { header: '是否兼職', width: 90 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 5. 訓練進修 */
  5: [
    {
      sheetName: '專業人員訓練進修紀錄表',
      archetype: 'training-record',
      criteriaIndex: 0,
      prefillRows: 12,
      columns: [
        { header: '訓練日期', width: 110 },
        { header: '人員姓名', width: 100 },
        { header: '職稱', width: 110 },
        { header: '訓練主題', width: 200 },
        { header: '辦理單位', width: 160 },
        { header: '時數', width: 80 },
        { header: '性侵防治課程', width: 110 },
        { header: '相關文件', width: 140 },
      ],
    },
  ],

  /** 12. 危機事故預防及處理 */
  12: [
    {
      sheetName: '危機事故處理記錄表',
      archetype: 'incident-log',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '事件日期', width: 110 },
        { header: '事件類型', width: 130 },
        { header: '事件描述', width: 240 },
        { header: '緊急處理措施', width: 180 },
        { header: '分析報告', width: 180 },
        { header: '改進措施', width: 180 },
        { header: '追蹤結果', width: 160 },
        { header: '負責人員', width: 100 },
      ],
    },
    {
      sheetName: '急救訓練及教育記錄表',
      archetype: 'training-record',
      criteriaIndex: 3,
      prefillRows: 8,
      columns: [
        { header: '訓練日期', width: 110 },
        { header: '訓練類型', width: 150 },
        { header: '訓練內容', width: 220 },
        { header: '參加人員', width: 160 },
        { header: '辦理單位', width: 160 },
        { header: '相關文件', width: 140 },
        { header: '備註', width: 120 },
      ],
    },
  ],

  /** 15. 個案紀錄與交班紀錄 */
  15: [
    {
      sheetName: '交班紀錄追蹤表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '日期', width: 110 },
        { header: '班別', width: 90 },
        { header: '交班人員', width: 110 },
        { header: '接班人員', width: 110 },
        { header: '院生動態', width: 200 },
        { header: '待辦事項', width: 200 },
        { header: '特殊狀況', width: 180 },
        { header: '負責人員確認', width: 110 },
      ],
    },
  ],

  /** 16. 兒童少年輔導目標之達成 */
  16: [
    {
      sheetName: '個案年度輔導目標追蹤表',
      archetype: 'care-plan',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '案號', width: 90 },
        { header: '姓名縮寫', width: 90 },
        { header: '年度輔導目標', width: 220 },
        { header: '執行方式', width: 180 },
        { header: '執行情形', width: 180 },
        { header: '目標達成情形', width: 180 },
        { header: '檢視日期', width: 110 },
        { header: '負責社工', width: 100 },
      ],
    },
  ],

  /** 17. 入院協助與適應（2歲以下） */
  17: [
    {
      sheetName: '嬰幼兒入院協助記錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '入院日期', width: 110 },
        { header: '案號', width: 90 },
        { header: '月齡', width: 80 },
        { header: '身心狀態評估', width: 200 },
        { header: '陪伴與安撫措施', width: 200 },
        { header: '生活作息適應情形', width: 180 },
        { header: '負責人員', width: 100 },
      ],
    },
  ],

  /** 20. 直接服務（2歲以下） */
  20: [
    {
      sheetName: '嬰幼兒個案處遇計畫表',
      archetype: 'care-plan',
      criteriaIndex: 0,
      prefillRows: 5,
      columns: [
        { header: '案號', width: 90 },
        { header: '計畫日期', width: 110 },
        { header: '發展評估', width: 200 },
        { header: '處遇目標', width: 180 },
        { header: '執行方法', width: 200 },
        { header: '預期成效', width: 160 },
        { header: '負責人員', width: 100 },
      ],
    },
    {
      sheetName: '嬰幼兒生活記錄表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      prefillRows: 10,
      columns: [
        { header: '日期', width: 110 },
        { header: '案號', width: 90 },
        { header: '飲食情形', width: 150 },
        { header: '睡眠情形', width: 130 },
        { header: '健康狀況', width: 150 },
        { header: '行為觀察', width: 180 },
        { header: '特殊處置', width: 160 },
        { header: '負責人員', width: 100 },
      ],
    },
  ],

  /** 21. 入院協助與適應（2歲以上18歲以下） */
  21: [
    {
      sheetName: '兒少入院協助記錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '入院日期', width: 110 },
        { header: '案號', width: 90 },
        { header: '年齡', width: 80 },
        { header: '身心狀態評估', width: 200 },
        { header: '陪伴與安撫措施', width: 180 },
        { header: '機構生活適應情形', width: 180 },
        { header: '負責人員', width: 100 },
      ],
    },
  ],

  /** 24. 直接服務（2歲以上18歲以下） */
  24: [
    {
      sheetName: '兒少個案處遇計畫表',
      archetype: 'care-plan',
      criteriaIndex: 0,
      prefillRows: 5,
      columns: [
        { header: '案號', width: 90 },
        { header: '計畫日期', width: 110 },
        { header: '問題評估', width: 200 },
        { header: '處遇目標', width: 180 },
        { header: '執行方法', width: 200 },
        { header: '預期成效', width: 160 },
        { header: '負責社工', width: 100 },
      ],
    },
    {
      sheetName: '兒少生活紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      prefillRows: 10,
      columns: [
        { header: '日期', width: 110 },
        { header: '案號', width: 90 },
        { header: '就學情形', width: 150 },
        { header: '生活自理', width: 130 },
        { header: '人際關係', width: 150 },
        { header: '行為觀察', width: 180 },
        { header: '特殊狀況', width: 160 },
        { header: '負責人員', width: 100 },
      ],
    },
    {
      sheetName: '離院追蹤輔導紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 8,
      prefillRows: 8,
      columns: [
        { header: '案號', width: 90 },
        { header: '追蹤日期', width: 110 },
        { header: '離院日期', width: 110 },
        { header: '追蹤方式', width: 120 },
        { header: '兒少現況', width: 200 },
        { header: '協助措施', width: 180 },
        { header: '下次追蹤日期', width: 120 },
        { header: '負責社工', width: 100 },
      ],
    },
  ],

  /** 25. 申訴制度與權益保障 */
  25: [
    {
      sheetName: '兒少申訴處理記錄表',
      archetype: 'incident-log',
      criteriaIndex: 2,
      prefillRows: 6,
      columns: [
        { header: '申訴日期', width: 110 },
        { header: '申訴人（案號）', width: 130 },
        { header: '申訴內容', width: 240 },
        { header: '受理人員', width: 110 },
        { header: '處理措施', width: 200 },
        { header: '處理結果', width: 180 },
        { header: '回覆日期', width: 110 },
        { header: '追蹤情形', width: 150 },
      ],
    },
    {
      sheetName: '零用金管理紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 5,
      prefillRows: 12,
      columns: [
        { header: '日期', width: 110 },
        { header: '案號', width: 90 },
        { header: '金額', width: 90 },
        { header: '用途', width: 180 },
        { header: '簽收/匯款', width: 120 },
        { header: '結餘', width: 90 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 26. 資源結合與運用 */
  26: [
    {
      sheetName: '資源網絡清冊',
      archetype: 'inventory-list',
      criteriaIndex: 2,
      prefillRows: 12,
      columns: [
        { header: '資源類別', width: 130 },
        { header: '機構/單位名稱', width: 180 },
        { header: '服務項目', width: 200 },
        { header: '聯絡方式', width: 150 },
        { header: '適用對象', width: 140 },
        { header: '盤點更新日期', width: 120 },
        { header: '備註', width: 130 },
      ],
    },
    {
      sheetName: '資源連結運用記錄表',
      archetype: 'daily-record',
      criteriaIndex: 3,
      prefillRows: 10,
      columns: [
        { header: '案號', width: 90 },
        { header: '連結日期', width: 110 },
        { header: '連結資源', width: 180 },
        { header: '兒少需求', width: 160 },
        { header: '運用內容', width: 200 },
        { header: '成效評估', width: 160 },
        { header: '負責社工', width: 100 },
      ],
    },
  ],

  /** 27. 服務（含方案）評估 */
  27: [
    {
      sheetName: '服務方案績效評估表',
      archetype: 'training-record',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '方案名稱', width: 200 },
        { header: '辦理期間', width: 120 },
        { header: '服務對象', width: 120 },
        { header: '兒少發展需求', width: 180 },
        { header: '執行內容', width: 200 },
        { header: '成效評估', width: 180 },
        { header: '評估紀錄', width: 150 },
        { header: '負責人員', width: 100 },
      ],
    },
  ],

  /** 28. 專業成長 */
  28: [
    {
      sheetName: '督導紀錄表',
      archetype: 'meeting-minutes',
      criteriaIndex: 1,
      prefillRows: 8,
      columns: [
        { header: '督導日期', width: 110 },
        { header: '督導人員', width: 110 },
        { header: '被督導人員', width: 120 },
        { header: '督導類型', width: 120 },
        { header: '督導內容', width: 240 },
        { header: '討論結論', width: 180 },
        { header: '追蹤事項', width: 160 },
      ],
    },
    {
      sheetName: '個案研討會記錄表',
      archetype: 'meeting-minutes',
      criteriaIndex: 0,
      prefillRows: 6,
      columns: [
        { header: '研討日期', width: 110 },
        { header: '案號', width: 90 },
        { header: '討論議題', width: 220 },
        { header: '參與人員', width: 160 },
        { header: '討論結論', width: 200 },
        { header: '後續追蹤', width: 180 },
        { header: '負責人員', width: 100 },
      ],
    },
  ],
};
