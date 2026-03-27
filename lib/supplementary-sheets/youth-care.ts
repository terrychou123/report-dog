/**
 * 兒少教養機構評鑑補充文件定義
 * 111年度兒童及少年安置及教養機構聯合評鑑指標（28項）
 */
import type { SupplementaryDefsMap } from '../supplementary-sheet-types';

export const youthCareDefs: SupplementaryDefsMap = {

  /** 1. 董事會功能與經營理念 */
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
      criteriaIndex: 1,
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

  /** 2. 業務計畫及營運方針之擬訂與執行情形 */
  2: [
    {
      sheetName: '年度業務計畫執行追蹤表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 12,
      columns: [
        { header: '計畫項目', width: 200 },
        { header: '預定完成時間', width: 120 },
        { header: '執行進度', width: 100 },
        { header: '執行成果紀錄', width: 240 },
        { header: '績效指標', width: 150 },
        { header: '負責人員', width: 100 },
        { header: '備註', width: 130 },
      ],
    },
    {
      sheetName: '中長程計畫進度表',
      archetype: 'care-plan',
      criteriaIndex: 2,
      prefillRows: 8,
      columns: [
        { header: '計畫期程', width: 110 },
        { header: '目標項目', width: 200 },
        { header: '執行策略', width: 220 },
        { header: '預期成效', width: 180 },
        { header: '執行現況', width: 180 },
        { header: '可行性評估', width: 150 },
      ],
    },
  ],

  /** 3. 危機或緊急事件風險管理 */
  3: [
    {
      sheetName: '危機事件處理記錄表',
      archetype: 'incident-log',
      criteriaIndex: 2,
      prefillRows: 8,
      columns: [
        { header: '事件日期', width: 110 },
        { header: '事件類型', width: 130 },
        { header: '事件描述', width: 240 },
        { header: '通報流程執行', width: 150 },
        { header: '處理措施', width: 200 },
        { header: '改善措施', width: 180 },
        { header: '追蹤結果', width: 160 },
        { header: '負責人員', width: 100 },
      ],
    },
    {
      sheetName: '風險管理計畫查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 6,
      columns: [
        { header: '風險類型', width: 150 },
        { header: '計畫訂定', width: 90 },
        { header: '處理程序', width: 90 },
        { header: '通報流程', width: 90 },
        { header: '演練執行', width: 90 },
        { header: '檢討改善', width: 90 },
        { header: '查核日期', width: 110 },
        { header: '待改善事項', width: 200 },
      ],
    },
  ],

  /** 4. 員工福利及人事制度 */
  4: [
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

  /** 7. 會計制度 */
  7: [
    {
      sheetName: '會計查核記錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '查核日期', width: 110 },
        { header: '查核項目', width: 240 },
        { header: '符合', width: 70 },
        { header: '不符合', width: 80 },
        { header: '帳簿冊種類', width: 140 },
        { header: '憑證保管情形', width: 160 },
        { header: '改善事項', width: 200 },
        { header: '查核人員', width: 100 },
      ],
    },
  ],

  /** 10. 捐贈財物之管理徵信情形 */
  10: [
    {
      sheetName: '捐贈徵信管理記錄表',
      archetype: 'inventory-list',
      criteriaIndex: 2,
      prefillRows: 10,
      columns: [
        { header: '收受日期', width: 110 },
        { header: '捐贈人/機關', width: 160 },
        { header: '捐贈類型', width: 110 },
        { header: '捐贈金額/物品', width: 150 },
        { header: '指定用途', width: 150 },
        { header: '收據號碼', width: 120 },
        { header: '運用情形', width: 180 },
        { header: '公開徵信方式', width: 140 },
      ],
    },
  ],

  /** 16. 進住機構之協助與適應 */
  16: [
    {
      sheetName: '安置照顧計畫表',
      archetype: 'care-plan',
      criteriaIndex: 3,
      prefillRows: 5,
      columns: [
        { header: '案號', width: 90 },
        { header: '安置日期', width: 110 },
        { header: '安置期程', width: 110 },
        { header: '主要問題評估', width: 200 },
        { header: '照顧重點', width: 200 },
        { header: '執行方式', width: 180 },
        { header: '重要關係人共識', width: 150 },
        { header: '計畫訂定日期', width: 120 },
        { header: '負責社工', width: 100 },
      ],
    },
    {
      sheetName: '入住協助流程記錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '入住日期', width: 110 },
        { header: '案號', width: 90 },
        { header: '兒少年齡', width: 90 },
        { header: '說明權利義務', width: 120 },
        { header: '機構介紹', width: 120 },
        { header: '重要關係人聯繫', width: 140 },
        { header: '適應措施說明', width: 180 },
        { header: '負責人員', width: 100 },
      ],
    },
  ],

  /** 17. 安置期間生活輔導 */
  17: [
    {
      sheetName: '個案處遇計畫表',
      archetype: 'care-plan',
      criteriaIndex: 0,
      prefillRows: 5,
      columns: [
        { header: '案號', width: 90 },
        { header: '計畫日期', width: 110 },
        { header: '問題評估', width: 200 },
        { header: '處遇目標', width: 180 },
        { header: '執行方法', width: 200 },
        { header: '重要關係人共識', width: 150 },
        { header: '預期成效', width: 160 },
        { header: '負責社工', width: 100 },
      ],
    },
    {
      sheetName: '定期檢視紀錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 3,
      prefillRows: 8,
      columns: [
        { header: '案號', width: 90 },
        { header: '檢視日期', width: 110 },
        { header: '安置時間（月）', width: 120 },
        { header: '生活適應評估', width: 180 },
        { header: '計畫調整說明', width: 200 },
        { header: '重要關係人出席', width: 140 },
        { header: '下次檢視預定日期', width: 140 },
        { header: '負責社工', width: 100 },
      ],
    },
  ],

  /** 18. 兒童少年與原生家庭重聚或聯繫 */
  18: [
    {
      sheetName: '家庭聯繫及重聚記錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '案號', width: 90 },
        { header: '聯繫/重聚日期', width: 130 },
        { header: '聯繫對象', width: 130 },
        { header: '聯繫方式', width: 120 },
        { header: '執行內容', width: 220 },
        { header: '兒少反應', width: 160 },
        { header: '主責社工協同', width: 130 },
        { header: '後續追蹤', width: 160 },
        { header: '負責社工', width: 100 },
      ],
    },
  ],

  /** 19. 結束安置前之準備與輔導 */
  19: [
    {
      sheetName: '結束安置準備計畫表',
      archetype: 'care-plan',
      criteriaIndex: 0,
      prefillRows: 5,
      columns: [
        { header: '案號', width: 90 },
        { header: '預定結束日期', width: 130 },
        { header: '準備議題', width: 200 },
        { header: '具體協助措施', width: 220 },
        { header: '重要關係人參與', width: 140 },
        { header: '執行進度', width: 130 },
        { header: '負責社工', width: 100 },
      ],
    },
    {
      sheetName: '結束安置追蹤輔導記錄表',
      archetype: 'daily-record',
      criteriaIndex: 2,
      prefillRows: 8,
      columns: [
        { header: '案號', width: 90 },
        { header: '追蹤日期', width: 110 },
        { header: '結束安置日期', width: 130 },
        { header: '追蹤方式', width: 120 },
        { header: '兒少現況', width: 200 },
        { header: '協助措施', width: 180 },
        { header: '下次追蹤日期', width: 120 },
        { header: '負責社工', width: 100 },
      ],
    },
  ],

  /** 20. 資源結合與運用 */
  20: [
    {
      sheetName: '資源網絡清冊',
      archetype: 'inventory-list',
      criteriaIndex: 0,
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
      criteriaIndex: 1,
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

  /** 21. 兒童少年團體活動或服務方案 */
  21: [
    {
      sheetName: '團體活動方案成效評估表',
      archetype: 'training-record',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '活動/方案名稱', width: 200 },
        { header: '辦理期間', width: 120 },
        { header: '參與人數', width: 90 },
        { header: '目標需求', width: 160 },
        { header: '執行內容', width: 200 },
        { header: '成效評估', width: 180 },
        { header: '評估紀錄', width: 150 },
        { header: '負責人員', width: 100 },
      ],
    },
  ],

  /** 22. 專業支持與成長 */
  22: [
    {
      sheetName: '督導紀錄表',
      archetype: 'meeting-minutes',
      criteriaIndex: 0,
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
      sheetName: '教育訓練及研習紀錄表',
      archetype: 'training-record',
      criteriaIndex: 1,
      prefillRows: 10,
      columns: [
        { header: '訓練日期', width: 110 },
        { header: '訓練類型', width: 130 },
        { header: '訓練主題', width: 200 },
        { header: '辦理單位', width: 160 },
        { header: '參加人員', width: 160 },
        { header: '時數', width: 80 },
        { header: '相關文件', width: 140 },
        { header: '備註', width: 120 },
      ],
    },
  ],

  /** 23. 表意權/尊重兒少的意見 */
  23: [
    {
      sheetName: '兒少參與決策記錄表',
      archetype: 'meeting-minutes',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '日期', width: 110 },
        { header: '議題類型', width: 140 },
        { header: '參與兒少（案號）', width: 140 },
        { header: '兒少表達意見', width: 220 },
        { header: '機構回應', width: 180 },
        { header: '決議結果', width: 180 },
        { header: '負責人員', width: 100 },
      ],
    },
    {
      sheetName: '申訴處理記錄表',
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
  ],

  /** 26. 隱私與保密權 */
  26: [
    {
      sheetName: '個案資料管理查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 3,
      prefillRows: 6,
      columns: [
        { header: '查核日期', width: 110 },
        { header: '查核項目', width: 260 },
        { header: '符合', width: 70 },
        { header: '不符合', width: 80 },
        { header: '改善措施', width: 200 },
        { header: '查核人員', width: 100 },
      ],
    },
  ],
};
