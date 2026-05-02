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
      prefillCells: [
        { row: 0, col: 0, value: '照服員甲' }, { row: 0, col: 1, value: '2025-09-15' }, { row: 0, col: 2, value: '2025-09-15' }, { row: 0, col: 3, value: '2025-09-15' }, { row: 0, col: 4, value: '6%' }, { row: 0, col: 5, value: '無' },
        { row: 1, col: 0, value: '護理師乙' }, { row: 1, col: 1, value: '2025-10-10' }, { row: 1, col: 2, value: '2025-10-10' }, { row: 1, col: 3, value: '2025-10-10' }, { row: 1, col: 4, value: '6%' }, { row: 1, col: 5, value: '無' },
        { row: 2, col: 0, value: '社工師丙' }, { row: 2, col: 1, value: '2025-11-20' }, { row: 2, col: 2, value: '2025-11-20' }, { row: 2, col: 3, value: '2025-11-20' }, { row: 2, col: 4, value: '6%' }, { row: 2, col: 5, value: '無' },
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
      prefillCells: [
        { row: 0, col: 0, value: '2025-09-15' }, { row: 0, col: 1, value: '照服員甲' }, { row: 0, col: 2, value: '薪資計算有誤' }, { row: 0, col: 3, value: '查閱薪資單核對' }, { row: 0, col: 4, value: '已更正並補發差額' }, { row: 0, col: 5, value: '2025-09-20' }, { row: 0, col: 6, value: '主任' },
        { row: 1, col: 0, value: '2025-10-10' }, { row: 1, col: 1, value: '護理師乙' }, { row: 1, col: 2, value: '排班不公' }, { row: 1, col: 3, value: '召開排班說明會' }, { row: 1, col: 4, value: '已調整排班原則' }, { row: 1, col: 5, value: '2025-10-15' }, { row: 1, col: 6, value: '護理主任' },
        { row: 2, col: 0, value: '2025-11-20' }, { row: 2, col: 1, value: '社工師丙' }, { row: 2, col: 2, value: '職場安全疑慮' }, { row: 2, col: 3, value: '安全委員會討論' }, { row: 2, col: 4, value: '已改善環境設施' }, { row: 2, col: 5, value: '2025-11-25' }, { row: 2, col: 6, value: '主任' },
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
      prefillCells: [
        { row: 0, col: 0, value: '2025-09-15' }, { row: 0, col: 1, value: '個案甲' }, { row: 0, col: 2, value: '出' }, { row: 0, col: 3, value: '死亡' }, { row: 0, col: 4, value: '社工師甲' }, { row: 0, col: 5, value: '家屬已到場辦理' }, { row: 0, col: 6, value: '是' }, { row: 0, col: 7, value: '無' },
        { row: 1, col: 0, value: '2025-10-10' }, { row: 1, col: 1, value: '個案乙' }, { row: 1, col: 2, value: '入' }, { row: 1, col: 3, value: '新入住' }, { row: 1, col: 4, value: '護理師乙' }, { row: 1, col: 5, value: '健康評估已完成' }, { row: 1, col: 6, value: '是' }, { row: 1, col: 7, value: '無' },
        { row: 2, col: 0, value: '2025-11-20' }, { row: 2, col: 1, value: '個案丙' }, { row: 2, col: 2, value: '出' }, { row: 2, col: 3, value: '返家' }, { row: 2, col: 4, value: '社工師丙' }, { row: 2, col: 5, value: '已安排居家追蹤' }, { row: 2, col: 6, value: '是' }, { row: 2, col: 7, value: '無' },
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
      prefillCells: [
        { row: 0, col: 0, value: '2025-09-15' }, { row: 0, col: 1, value: '年度服務計畫執行' }, { row: 0, col: 2, value: '2025-12-31' }, { row: 0, col: 3, value: '75%' }, { row: 0, col: 4, value: '已完成教育訓練及設備更新' }, { row: 0, col: 5, value: '社工師甲' }, { row: 0, col: 6, value: '是' },
        { row: 1, col: 0, value: '2025-10-10' }, { row: 1, col: 1, value: '照護品質改善計畫' }, { row: 1, col: 2, value: '2025-12-31' }, { row: 1, col: 3, value: '60%' }, { row: 1, col: 4, value: '完成指標建置，持續追蹤' }, { row: 1, col: 5, value: '護理主任' }, { row: 1, col: 6, value: '是' },
        { row: 2, col: 0, value: '2025-11-20' }, { row: 2, col: 1, value: '社區資源拓展計畫' }, { row: 2, col: 2, value: '2026-03-31' }, { row: 2, col: 3, value: '40%' }, { row: 2, col: 4, value: '已完成資源盤點清冊' }, { row: 2, col: 5, value: '社工師丙' }, { row: 2, col: 6, value: '是' },
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
      prefillCells: [
        { row: 0, col: 0, value: '照護記錄未完整' }, { row: 0, col: 1, value: '建立標準化記錄格式' }, { row: 0, col: 2, value: '護理主任' }, { row: 0, col: 3, value: '2025-10-31' }, { row: 0, col: 4, value: '2025-10-25' }, { row: 0, col: 5, value: '記錄表範本' }, { row: 0, col: 6, value: '是' },
        { row: 1, col: 0, value: '翻身頻率不足' }, { row: 1, col: 1, value: '加強在職訓練及稽核' }, { row: 1, col: 2, value: '照服組長' }, { row: 1, col: 3, value: '2025-11-30' }, { row: 1, col: 4, value: '2025-11-20' }, { row: 1, col: 5, value: '稽核紀錄表' }, { row: 1, col: 6, value: '是' },
        { row: 2, col: 0, value: '緊急應變訓練未按期辦理' }, { row: 2, col: 1, value: '排定補辦演練日期' }, { row: 2, col: 2, value: '行政主任' }, { row: 2, col: 3, value: '2025-12-15' }, { row: 2, col: 4, value: '2025-12-10' }, { row: 2, col: 5, value: '演練紀錄表' }, { row: 2, col: 6, value: '是' },
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
      prefillCells: [
        { row: 0, col: 0, value: '2025-09-15' }, { row: 0, col: 1, value: '服務對象甲' }, { row: 0, col: 2, value: '言語騷擾' }, { row: 0, col: 3, value: '工作人員對服務對象言語不當' }, { row: 0, col: 4, value: '已暫停當事人職務' }, { row: 0, col: 5, value: '已通報主管機關' }, { row: 0, col: 6, value: '持續輔導追蹤' }, { row: 0, col: 7, value: '加強職場倫理訓練' },
        { row: 1, col: 0, value: '2025-10-10' }, { row: 1, col: 1, value: '服務對象乙' }, { row: 1, col: 2, value: '肢體騷擾' }, { row: 1, col: 3, value: '服務對象間發生肢體接觸' }, { row: 1, col: 4, value: '分離當事人並安撫' }, { row: 1, col: 5, value: '已依規定通報' }, { row: 1, col: 6, value: '安排心理輔導' }, { row: 1, col: 7, value: '調整床位安排' },
        { row: 2, col: 0, value: '2025-11-20' }, { row: 2, col: 1, value: '職員丙' }, { row: 2, col: 2, value: '言語騷擾' }, { row: 2, col: 3, value: '家屬對工作人員言語不當' }, { row: 2, col: 4, value: '告知申訴管道' }, { row: 2, col: 5, value: '已受理申訴' }, { row: 2, col: 6, value: '定期電訪追蹤' }, { row: 2, col: 7, value: '舉辦尊重倫理講座' },
      ],
    },
    {
      sheetName: '性騷擾防治政策與公告紀錄表',
      archetype: 'meeting-minutes',
      criteriaIndex: 0,
      columns: [
        { header: '版本日期', width: 110 },
        { header: '政策名稱', width: 180 },
        { header: '修訂重點', width: 220 },
        { header: '公告方式', width: 140 },
        { header: '公告日期', width: 110 },
        { header: '公告對象', width: 150 },
        { header: '主管核定', width: 100 },
      ],
      prefillCells: [
        { row: 0, col: 0, value: '2025-01-15' }, { row: 0, col: 1, value: '機構性騷擾防治政策' }, { row: 0, col: 2, value: '初版訂定，涵蓋申訴流程及保密原則' }, { row: 0, col: 3, value: '佈告欄張貼＋朝會宣導' }, { row: 0, col: 4, value: '2025-01-20' }, { row: 0, col: 5, value: '全體工作人員及服務對象' }, { row: 0, col: 6, value: '負責人甲' },
        { row: 1, col: 0, value: '2025-07-01' }, { row: 1, col: 1, value: '機構性騷擾防治政策' }, { row: 1, col: 2, value: '第2版修訂，新增服務對象間事件處理程序' }, { row: 1, col: 3, value: '全機構電子公告＋紙本分發' }, { row: 1, col: 4, value: '2025-07-05' }, { row: 1, col: 5, value: '全體工作人員' }, { row: 1, col: 6, value: '負責人甲' },
        { row: 2, col: 0, value: '2026-01-10' }, { row: 2, col: 1, value: '機構性騷擾防治政策' }, { row: 2, col: 2, value: '年度複閱，無異動，確認現行政策有效' }, { row: 2, col: 3, value: '佈告欄張貼更新版' }, { row: 2, col: 4, value: '2026-01-15' }, { row: 2, col: 5, value: '全體工作人員及新進人員' }, { row: 2, col: 6, value: '負責人甲' },
      ],
    },
    {
      sheetName: '性騷擾申訴窗口設置表',
      archetype: 'inventory-list',
      criteriaIndex: 1,
      prefillRows: 3,
      columns: [
        { header: '申訴窗口姓名', width: 130 },
        { header: '職稱', width: 120 },
        { header: '聯絡方式', width: 160 },
        { header: '受理管道', width: 150 },
        { header: '處理流程說明', width: 220 },
        { header: '保密措施', width: 180 },
        { header: '備註', width: 130 },
      ],
      prefillCells: [
        { row: 0, col: 0, value: '內部窗口甲' }, { row: 0, col: 1, value: '社工師（機構主責）' }, { row: 0, col: 2, value: '分機 101 / 電子郵件' }, { row: 0, col: 3, value: '當面、電話、書面申訴' }, { row: 0, col: 4, value: '受理→7日內回覆→調查→30日結案' }, { row: 0, col: 5, value: '申訴人資料不對外公開，調查過程保密' }, { row: 0, col: 6, value: '公告於佈告欄' },
        { row: 1, col: 0, value: '外部申訴管道乙' }, { row: 1, col: 1, value: '縣市政府性別平等委員會' }, { row: 1, col: 2, value: '1999 或縣市府專線' }, { row: 1, col: 3, value: '電話、書面' }, { row: 1, col: 4, value: '依性別平等工作法規定辦理' }, { row: 1, col: 5, value: '依法保密' }, { row: 1, col: 6, value: '公告於佈告欄' },
        { row: 2, col: 0, value: '外部申訴管道丙' }, { row: 2, col: 1, value: '勞工局性別工作平等委員會' }, { row: 2, col: 2, value: '縣市勞工局電話' }, { row: 2, col: 3, value: '電話、親訪' }, { row: 2, col: 4, value: '依性別工作平等法第13條辦理' }, { row: 2, col: 5, value: '依法保密' }, { row: 2, col: 6, value: '公告於佈告欄' },
      ],
    },
    {
      sheetName: '性別平等性騷擾防治教育訓練紀錄表',
      archetype: 'training-record',
      criteriaIndex: 2,
      columns: [
        { header: '訓練日期', width: 100 },
        { header: '課程名稱', width: 200 },
        { header: '時數', width: 80 },
        { header: '講師', width: 110 },
        { header: '訓練類別', width: 130 },
        { header: '參訓人員', width: 160 },
        { header: '評值結果', width: 130 },
        { header: '辦理單位', width: 130 },
      ],
      prefillCells: [
        { row: 0, col: 0, value: '2025-03-20' }, { row: 0, col: 1, value: '性騷擾防治概論與申訴實務' }, { row: 0, col: 2, value: '3' }, { row: 0, col: 3, value: '外聘講師甲' }, { row: 0, col: 4, value: '職前訓練' }, { row: 0, col: 5, value: '新進工作人員 5 名' }, { row: 0, col: 6, value: '測驗通過率 100%' }, { row: 0, col: 7, value: '本機構' },
        { row: 1, col: 0, value: '2025-09-20' }, { row: 1, col: 1, value: '性別平等工作法實務與案例分析' }, { row: 1, col: 2, value: '3' }, { row: 1, col: 3, value: '外聘講師乙' }, { row: 1, col: 4, value: '在職訓練' }, { row: 1, col: 5, value: '全體工作人員 30 名' }, { row: 1, col: 6, value: '測驗通過率 95%' }, { row: 1, col: 7, value: '本機構' },
        { row: 2, col: 0, value: '2025-11-08' }, { row: 2, col: 1, value: '服務對象性騷擾事件辨識與處理' }, { row: 2, col: 2, value: '2' }, { row: 2, col: 3, value: '外聘講師丙' }, { row: 2, col: 4, value: '在職訓練' }, { row: 2, col: 5, value: '照服員及護理人員 25 名' }, { row: 2, col: 6, value: '測驗通過率 92%' }, { row: 2, col: 7, value: '某社福機構' },
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
      prefillCells: [
        { row: 0, col: 0, value: '2025-09-15' }, { row: 0, col: 1, value: '跌倒' }, { row: 0, col: 2, value: '個案甲如廁時滑倒' }, { row: 0, col: 3, value: '立即評估傷勢，通知家屬' }, { row: 0, col: 4, value: '護理師甲' }, { row: 0, col: 5, value: '持續觀察，無異常' }, { row: 0, col: 6, value: '護理主任' },
        { row: 1, col: 0, value: '2025-10-10' }, { row: 1, col: 1, value: '傳染病群聚' }, { row: 1, col: 2, value: '流感疑似群聚，3人發燒' }, { row: 1, col: 3, value: '啟動隔離措施，通報衛生局' }, { row: 1, col: 4, value: '護理師乙' }, { row: 1, col: 5, value: '已解除隔離' }, { row: 1, col: 6, value: '護理主任' },
        { row: 2, col: 0, value: '2025-11-20' }, { row: 2, col: 1, value: '緊急送醫' }, { row: 2, col: 2, value: '個案丙急性病況惡化' }, { row: 2, col: 3, value: '急救後送往急診' }, { row: 2, col: 4, value: '護理師丙' }, { row: 2, col: 5, value: '住院治療中' }, { row: 2, col: 6, value: '護理主任' },
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
      prefillCells: [
        { row: 0, col: 0, value: '2025上半年' }, { row: 0, col: 1, value: '跌倒事件' }, { row: 0, col: 2, value: '3' }, { row: 0, col: 3, value: '多發生於夜間如廁' }, { row: 0, col: 4, value: '加強夜間巡視及防滑措施' }, { row: 0, col: 5, value: '已完成改善' }, { row: 0, col: 6, value: '護理主任' },
        { row: 1, col: 0, value: '2025上半年' }, { row: 1, col: 1, value: '傳染病通報' }, { row: 1, col: 2, value: '1' }, { row: 1, col: 3, value: '流感群聚，已隔離處理' }, { row: 1, col: 4, value: '落實手部衛生稽核' }, { row: 1, col: 5, value: '已完成改善' }, { row: 1, col: 6, value: '感控護理師' },
        { row: 2, col: 0, value: '2025下半年' }, { row: 2, col: 1, value: '緊急送醫' }, { row: 2, col: 2, value: '2' }, { row: 2, col: 3, value: '急性病況惡化' }, { row: 2, col: 4, value: '加強生命徵象監測頻率' }, { row: 2, col: 5, value: '持續追蹤' }, { row: 2, col: 6, value: '護理主任' },
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
      prefillCells: [
        { row: 0, col: 0, value: '照服員甲' }, { row: 0, col: 1, value: '照顧服務員' }, { row: 0, col: 2, value: '照服員字第00001號' }, { row: 0, col: 3, value: '專任' }, { row: 0, col: 4, value: '2025-09-15' }, { row: 0, col: 5, value: '本機構' }, { row: 0, col: 6, value: '無' },
        { row: 1, col: 0, value: '護理師乙' }, { row: 1, col: 1, value: '護理師' }, { row: 1, col: 2, value: '護理師字第00002號' }, { row: 1, col: 3, value: '專任' }, { row: 1, col: 4, value: '2025-10-10' }, { row: 1, col: 5, value: '本機構' }, { row: 1, col: 6, value: '無' },
        { row: 2, col: 0, value: '社工師丙' }, { row: 2, col: 1, value: '社工師' }, { row: 2, col: 2, value: '社工師字第00003號' }, { row: 2, col: 3, value: '專任' }, { row: 2, col: 4, value: '2025-11-20' }, { row: 2, col: 5, value: '本機構' }, { row: 2, col: 6, value: '無' },
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
      prefillCells: [
        { row: 0, col: 0, value: '2025-11-01' }, { row: 0, col: 1, value: '日班' }, { row: 0, col: 2, value: '護理師甲' }, { row: 0, col: 3, value: '12' }, { row: 0, col: 4, value: '1:8' }, { row: 0, col: 5, value: '是' }, { row: 0, col: 6, value: '是' },
        { row: 1, col: 0, value: '2025-11-01' }, { row: 1, col: 1, value: '小夜班' }, { row: 1, col: 2, value: '護理師乙' }, { row: 1, col: 3, value: '12' }, { row: 1, col: 4, value: '1:12' }, { row: 1, col: 5, value: '是' }, { row: 1, col: 6, value: '是' },
        { row: 2, col: 0, value: '2025-11-01' }, { row: 2, col: 1, value: '大夜班' }, { row: 2, col: 2, value: '護理師丙' }, { row: 2, col: 3, value: '12' }, { row: 2, col: 4, value: '1:15' }, { row: 2, col: 5, value: '是' }, { row: 2, col: 6, value: '是' },
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
      prefillCells: [
        { row: 0, col: 0, value: '2025-09-15' }, { row: 0, col: 1, value: '物理治療師甲' }, { row: 0, col: 2, value: '物理治療師' }, { row: 0, col: 3, value: '09:00' }, { row: 0, col: 4, value: '12:00' }, { row: 0, col: 5, value: '個別復健訓練' }, { row: 0, col: 6, value: '個案甲、乙' }, { row: 0, col: 7, value: '甲' },
        { row: 1, col: 0, value: '2025-10-10' }, { row: 1, col: 1, value: '職能治療師乙' }, { row: 1, col: 2, value: '職能治療師' }, { row: 1, col: 3, value: '10:00' }, { row: 1, col: 4, value: '12:00' }, { row: 1, col: 5, value: '日常生活功能訓練' }, { row: 1, col: 6, value: '個案丙' }, { row: 1, col: 7, value: '乙' },
        { row: 2, col: 0, value: '2025-11-20' }, { row: 2, col: 1, value: '藥師丙' }, { row: 2, col: 2, value: '藥師' }, { row: 2, col: 3, value: '14:00' }, { row: 2, col: 4, value: '16:00' }, { row: 2, col: 5, value: '藥事照護評估' }, { row: 2, col: 6, value: '全體住民' }, { row: 2, col: 7, value: '丙' },
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
      prefillCells: [
        { row: 0, col: 0, value: '2025-09-20' }, { row: 0, col: 1, value: '感染管制標準預防措施' }, { row: 0, col: 2, value: '在職訓練' }, { row: 0, col: 3, value: '2' }, { row: 0, col: 4, value: '院內講師甲' }, { row: 0, col: 5, value: '全體護理人員 15 名' }, { row: 0, col: 6, value: '測驗通過率 93%' }, { row: 0, col: 7, value: '本機構' },
        { row: 1, col: 0, value: '2025-10-15' }, { row: 1, col: 1, value: '跌倒預防與安全照護' }, { row: 1, col: 2, value: '在職訓練' }, { row: 1, col: 3, value: '2' }, { row: 1, col: 4, value: '外聘講師乙' }, { row: 1, col: 5, value: '全體照服員 20 名' }, { row: 1, col: 6, value: '測驗通過率 90%' }, { row: 1, col: 7, value: '長照協會' },
        { row: 2, col: 0, value: '2025-11-08' }, { row: 2, col: 1, value: '性別平等與性騷擾防治' }, { row: 2, col: 2, value: '在職訓練' }, { row: 2, col: 3, value: '3' }, { row: 2, col: 4, value: '外聘講師丙' }, { row: 2, col: 5, value: '全體工作人員 30 名' }, { row: 2, col: 6, value: '測驗通過率 95%' }, { row: 2, col: 7, value: '本機構' },
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
      prefillCells: [
        { row: 0, col: 0, value: '2025-09-15' }, { row: 0, col: 1, value: '照服員甲' }, { row: 0, col: 2, value: '2025-09-15' }, { row: 0, col: 3, value: '機構環境及照護規範介紹' }, { row: 0, col: 4, value: '8' }, { row: 0, col: 5, value: '院內主任' }, { row: 0, col: 6, value: '85' },
        { row: 1, col: 0, value: '2025-10-10' }, { row: 1, col: 1, value: '護理師乙' }, { row: 1, col: 2, value: '2025-10-10' }, { row: 1, col: 3, value: '護理作業標準程序' }, { row: 1, col: 4, value: '8' }, { row: 1, col: 5, value: '護理主任' }, { row: 1, col: 6, value: '90' },
        { row: 2, col: 0, value: '2025-11-20' }, { row: 2, col: 1, value: '社工師丙' }, { row: 2, col: 2, value: '2025-11-20' }, { row: 2, col: 3, value: '個案管理及服務流程' }, { row: 2, col: 4, value: '8' }, { row: 2, col: 5, value: '社工主任' }, { row: 2, col: 6, value: '88' },
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
      prefillCells: [
        { row: 0, col: 0, value: '2025-09-20' }, { row: 0, col: 1, value: '廚工甲' }, { row: 0, col: 2, value: '衛生福利部' }, { row: 0, col: 3, value: '食品衛生安全管理' }, { row: 0, col: 4, value: '6' }, { row: 0, col: 5, value: '衛生福利部字第00001號' }, { row: 0, col: 6, value: '無' },
        { row: 1, col: 0, value: '2025-10-15' }, { row: 1, col: 1, value: '廚工乙' }, { row: 1, col: 2, value: '縣市衛生局' }, { row: 1, col: 3, value: '廚房環境衛生管理' }, { row: 1, col: 4, value: '6' }, { row: 1, col: 5, value: '衛生局字第00002號' }, { row: 1, col: 6, value: '無' },
        { row: 2, col: 0, value: '2025-11-08' }, { row: 2, col: 1, value: '廚工丙' }, { row: 2, col: 2, value: '食品業者協會' }, { row: 2, col: 3, value: '食材保存與衛生操作' }, { row: 2, col: 4, value: '6' }, { row: 2, col: 5, value: '協會字第00003號' }, { row: 2, col: 6, value: '無' },
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
      prefillCells: [
        { row: 0, col: 0, value: '2025-09-05' }, { row: 0, col: 1, value: '護理主任、社工師、復健師、營養師' }, { row: 0, col: 2, value: '跌倒率 3%、壓瘡率 1.5%' }, { row: 0, col: 3, value: '跌倒預防措施檢討' }, { row: 0, col: 4, value: '加強夜間巡視、改善夜燈' }, { row: 0, col: 5, value: '2025-10-05' }, { row: 0, col: 6, value: '已完成' }, { row: 0, col: 7, value: '護理主任' },
        { row: 1, col: 0, value: '2025-10-03' }, { row: 1, col: 1, value: '護理主任、社工師、照服員代表' }, { row: 1, col: 2, value: '非計畫住院率 5%' }, { row: 1, col: 3, value: '住院原因分析' }, { row: 1, col: 4, value: '強化慢性病監測機制' }, { row: 1, col: 5, value: '2025-11-03' }, { row: 1, col: 6, value: '進行中' }, { row: 1, col: 7, value: '負責人' },
        { row: 2, col: 0, value: '2025-12-05' }, { row: 2, col: 1, value: '全體護理及社工人員' }, { row: 2, col: 2, value: '壓瘡發生率持平' }, { row: 2, col: 3, value: '壓瘡預防計畫評值' }, { row: 2, col: 4, value: '維持翻身頻率，增加皮膚評估' }, { row: 2, col: 5, value: '2026-01-05' }, { row: 2, col: 6, value: '待追蹤' }, { row: 2, col: 7, value: '護理主任' },
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
      prefillCells: [
        { row: 0, col: 0, value: '個案甲' }, { row: 0, col: 1, value: '2025-08-01' }, { row: 0, col: 2, value: '2025-08-14' }, { row: 0, col: 3, value: '行動能力受限' }, { row: 0, col: 4, value: '維持現有功能、預防跌倒' }, { row: 0, col: 5, value: '每日復健訓練、使用助行器' }, { row: 0, col: 6, value: '社會適應良好' }, { row: 0, col: 7, value: '生命徵象穩定' }, { row: 0, col: 8, value: '2026-02-14' }, { row: 0, col: 9, value: '維持原計畫' },
        { row: 1, col: 0, value: '個案乙' }, { row: 1, col: 1, value: '2025-09-10' }, { row: 1, col: 2, value: '2025-09-24' }, { row: 1, col: 3, value: '吞嚥困難' }, { row: 1, col: 4, value: '維持經口進食' }, { row: 1, col: 5, value: '調整飲食質地至半流質' }, { row: 1, col: 6, value: '家屬配合度高' }, { row: 1, col: 7, value: '已評估吞嚥功能' }, { row: 1, col: 8, value: '2026-03-24' }, { row: 1, col: 9, value: '調整飲食計畫' },
        { row: 2, col: 0, value: '個案丙' }, { row: 2, col: 1, value: '2025-10-20' }, { row: 2, col: 2, value: '2025-11-03' }, { row: 2, col: 3, value: '失智認知退化' }, { row: 2, col: 4, value: '延緩退化、維持日常能力' }, { row: 2, col: 5, value: '認知訓練、生活自立支援' }, { row: 2, col: 6, value: '定期家屬電訪' }, { row: 2, col: 7, value: '藥物管理完整' }, { row: 2, col: 8, value: '2026-05-03' }, { row: 2, col: 9, value: '維持原計畫' },
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
      prefillCells: [
        { row: 0, col: 0, value: '2025-09-15' }, { row: 0, col: 1, value: '護理師甲' }, { row: 0, col: 2, value: '本機構護理部' }, { row: 0, col: 3, value: '個案甲' }, { row: 0, col: 4, value: '護理評估紀錄' }, { row: 0, col: 5, value: '跨專業會議使用' }, { row: 0, col: 6, value: '護理主任' }, { row: 0, col: 7, value: '2025-09-20' },
        { row: 1, col: 0, value: '2025-10-10' }, { row: 1, col: 1, value: '社工師乙' }, { row: 1, col: 2, value: '本機構社工室' }, { row: 1, col: 3, value: '個案乙' }, { row: 1, col: 4, value: '個案服務計畫書' }, { row: 1, col: 5, value: '評鑑備審資料' }, { row: 1, col: 6, value: '主任' }, { row: 1, col: 7, value: '2025-10-15' },
        { row: 2, col: 0, value: '2025-11-20' }, { row: 2, col: 1, value: '藥師丙' }, { row: 2, col: 2, value: '藥事照護部門' }, { row: 2, col: 3, value: '個案丙' }, { row: 2, col: 4, value: '藥歷資料' }, { row: 2, col: 5, value: '藥事照護服務' }, { row: 2, col: 6, value: '護理主任' }, { row: 2, col: 7, value: '2025-11-25' },
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
      prefillCells: [
        { row: 0, col: 0, value: '2025-09-15' }, { row: 0, col: 1, value: '個案甲' }, { row: 0, col: 2, value: '情緒焦慮、思念家人' }, { row: 0, col: 3, value: '進行個別輔導，介紹機構環境及作息' }, { row: 0, col: 4, value: '社工師甲' }, { row: 0, col: 5, value: '每週追蹤' }, { row: 0, col: 6, value: '社工師甲' },
        { row: 1, col: 0, value: '2025-10-10' }, { row: 1, col: 1, value: '個案乙' }, { row: 1, col: 2, value: '適應良好，主動參與活動' }, { row: 1, col: 3, value: '鼓勵參加團體活動' }, { row: 1, col: 4, value: '照服員乙' }, { row: 1, col: 5, value: '每月追蹤' }, { row: 1, col: 6, value: '照服員乙' },
        { row: 2, col: 0, value: '2025-11-20' }, { row: 2, col: 1, value: '個案丙' }, { row: 2, col: 2, value: '夜間睡眠困難' }, { row: 2, col: 3, value: '評估後協調調整作息，通知護理師' }, { row: 2, col: 4, value: '社工師丙' }, { row: 2, col: 5, value: '每週追蹤' }, { row: 2, col: 6, value: '社工師丙' },
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
      prefillCells: [
        { row: 0, col: 0, value: '2025-09-15' }, { row: 0, col: 1, value: '個案甲' }, { row: 0, col: 2, value: '護理師、社工師、物理治療師' }, { row: 0, col: 3, value: '跌倒風險評估與照護計畫修訂' }, { row: 0, col: 4, value: '調整翻身頻率，加強復健' }, { row: 0, col: 5, value: '2025-10-15' }, { row: 0, col: 6, value: '改善中' },
        { row: 1, col: 0, value: '2025-10-10' }, { row: 1, col: 1, value: '個案乙' }, { row: 1, col: 2, value: '護理師、社工師、營養師' }, { row: 1, col: 3, value: '體重下降原因分析' }, { row: 1, col: 4, value: '轉介營養師，調整飲食計畫' }, { row: 1, col: 5, value: '2025-11-10' }, { row: 1, col: 6, value: '已完成' },
        { row: 2, col: 0, value: '2025-11-20' }, { row: 2, col: 1, value: '個案丙' }, { row: 2, col: 2, value: '護理師、社工師、職能治療師' }, { row: 2, col: 3, value: '認知功能退化照護策略' }, { row: 2, col: 4, value: '增加認知訓練頻率' }, { row: 2, col: 5, value: '2025-12-20' }, { row: 2, col: 6, value: '持續追蹤' },
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
      prefillCells: [
        { row: 0, col: 0, value: '2025-09-15' }, { row: 0, col: 1, value: '個案甲' }, { row: 0, col: 2, value: '身體功能退化' }, { row: 0, col: 3, value: '某復健科診所' }, { row: 0, col: 4, value: '接受評估，安排復健' }, { row: 0, col: 5, value: '2025-10-15' }, { row: 0, col: 6, value: '已回復追蹤' }, { row: 0, col: 7, value: '社工師甲' },
        { row: 1, col: 0, value: '2025-10-10' }, { row: 1, col: 1, value: '個案乙' }, { row: 1, col: 2, value: '心理情緒問題' }, { row: 1, col: 3, value: '某心理諮商中心' }, { row: 1, col: 4, value: '安排諮商，每週一次' }, { row: 1, col: 5, value: '2025-11-10' }, { row: 1, col: 6, value: '情緒改善中' }, { row: 1, col: 7, value: '社工師乙' },
        { row: 2, col: 0, value: '2025-11-20' }, { row: 2, col: 1, value: '個案丙' }, { row: 2, col: 2, value: '吞嚥功能問題' }, { row: 2, col: 3, value: '某醫院語言治療部門' }, { row: 2, col: 4, value: '語言治療師評估完成' }, { row: 2, col: 5, value: '2025-12-20' }, { row: 2, col: 6, value: '持續追蹤' }, { row: 2, col: 7, value: '護理師丙' },
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
      prefillCells: [
        { row: 0, col: 0, value: '2025-09-20' }, { row: 0, col: 1, value: '重陽節敬老活動' }, { row: 0, col: 2, value: '節慶活動' }, { row: 0, col: 3, value: '全體住民 25 名' }, { row: 0, col: 4, value: '長輩才藝表演、社區志工互動' }, { row: 0, col: 5, value: '住民反應熱烈，參與率 85%' }, { row: 0, col: 6, value: '社工師甲' },
        { row: 1, col: 0, value: '2025-10-05' }, { row: 1, col: 1, value: '懷舊療法團體' }, { row: 1, col: 2, value: '心理健康活動' }, { row: 1, col: 3, value: '認知退化住民 8 名' }, { row: 1, col: 4, value: '老歌欣賞、舊照片回顧' }, { row: 1, col: 5, value: '情緒穩定，互動良好' }, { row: 1, col: 6, value: '職能治療師' },
        { row: 2, col: 0, value: '2025-11-15' }, { row: 2, col: 1, value: '社區義剪服務' }, { row: 2, col: 2, value: '社區資源引進' }, { row: 2, col: 3, value: '全體住民 25 名' }, { row: 2, col: 4, value: '社區理髮師到機構義剪' }, { row: 2, col: 5, value: '住民滿意度高' }, { row: 2, col: 6, value: '社工師乙' },
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
      prefillCells: [
        { row: 0, col: 0, value: '醫療' }, { row: 0, col: 1, value: '某市立醫院' }, { row: 0, col: 2, value: '急診就醫協助' }, { row: 0, col: 3, value: '(02)XXXX-XXXX' }, { row: 0, col: 4, value: '2025-11-01' }, { row: 0, col: 5, value: '已建立轉介合作' },
        { row: 1, col: 0, value: '法律' }, { row: 1, col: 1, value: '某法律扶助基金會' }, { row: 1, col: 2, value: '法律諮詢' }, { row: 1, col: 3, value: '(02)XXXX-XXXX' }, { row: 1, col: 4, value: '2025-11-01' }, { row: 1, col: 5, value: '免費服務' },
        { row: 2, col: 0, value: '心理' }, { row: 2, col: 1, value: '某心理健康中心' }, { row: 2, col: 2, value: '心理諮商轉介' }, { row: 2, col: 3, value: '(02)XXXX-XXXX' }, { row: 2, col: 4, value: '2025-11-01' }, { row: 2, col: 5, value: '需預約' },
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
      prefillCells: [
        { row: 0, col: 0, value: '2025-09-15' }, { row: 0, col: 1, value: '個案甲' }, { row: 0, col: 2, value: '某市立醫院' }, { row: 0, col: 3, value: '急性就醫需求' }, { row: 0, col: 4, value: '2025-10-15' }, { row: 0, col: 5, value: '順利就醫返回' }, { row: 0, col: 6, value: '社工師甲' },
        { row: 1, col: 0, value: '2025-10-10' }, { row: 1, col: 1, value: '個案乙' }, { row: 1, col: 2, value: '某心理健康中心' }, { row: 1, col: 3, value: '情緒問題需諮商' }, { row: 1, col: 4, value: '2025-11-10' }, { row: 1, col: 5, value: '已完成諮商' }, { row: 1, col: 6, value: '社工師乙' },
        { row: 2, col: 0, value: '2025-11-20' }, { row: 2, col: 1, value: '個案丙' }, { row: 2, col: 2, value: '某法律扶助基金會' }, { row: 2, col: 3, value: '財產管理諮詢' }, { row: 2, col: 4, value: '2025-12-20' }, { row: 2, col: 5, value: '已獲法律建議' }, { row: 2, col: 6, value: '社工師丙' },
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
      prefillCells: [
        { row: 0, col: 0, value: '2025-09-15' }, { row: 0, col: 1, value: '個案甲' }, { row: 0, col: 2, value: '家屬甲' }, { row: 0, col: 3, value: '電話' }, { row: 0, col: 4, value: '詢問健康狀況' }, { row: 0, col: 5, value: '說明近況及服藥情形' }, { row: 0, col: 6, value: '無需追蹤' }, { row: 0, col: 7, value: '社工師甲' },
        { row: 1, col: 0, value: '2025-10-10' }, { row: 1, col: 1, value: '個案乙' }, { row: 1, col: 2, value: '家屬乙' }, { row: 1, col: 3, value: '親訪' }, { row: 1, col: 4, value: '個案情緒低落' }, { row: 1, col: 5, value: '安排個別輔導，告知家屬' }, { row: 1, col: 6, value: '每月電訪追蹤' }, { row: 1, col: 7, value: '社工師乙' },
        { row: 2, col: 0, value: '2025-11-20' }, { row: 2, col: 1, value: '個案丙' }, { row: 2, col: 2, value: '家屬丙' }, { row: 2, col: 3, value: '電話' }, { row: 2, col: 4, value: '服藥費用確認' }, { row: 2, col: 5, value: '說明藥費收費方式' }, { row: 2, col: 6, value: '無需追蹤' }, { row: 2, col: 7, value: '護理師丙' },
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
      prefillCells: [
        { row: 0, col: 0, value: '2025-09-15' }, { row: 0, col: 1, value: '個案甲' }, { row: 0, col: 2, value: '甲醫師' }, { row: 0, col: 3, value: '血壓偏高，狀態穩定' }, { row: 0, col: 4, value: '調整降壓藥劑量' }, { row: 0, col: 5, value: '每日監測血壓' }, { row: 0, col: 6, value: '護理師甲確認' },
        { row: 1, col: 0, value: '2025-10-10' }, { row: 1, col: 1, value: '個案乙' }, { row: 1, col: 2, value: '甲醫師' }, { row: 1, col: 3, value: '傷口癒合良好' }, { row: 1, col: 4, value: '繼續換藥' }, { row: 1, col: 5, value: '維持原護理計畫' }, { row: 1, col: 6, value: '護理師乙確認' },
        { row: 2, col: 0, value: '2025-11-20' }, { row: 2, col: 1, value: '個案丙' }, { row: 2, col: 2, value: '甲醫師' }, { row: 2, col: 3, value: '認知功能退化評估' }, { row: 2, col: 4, value: '轉介神經內科' }, { row: 2, col: 5, value: '安排就醫' }, { row: 2, col: 6, value: '護理師丙確認' },
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
      prefillCells: [
        { row: 0, col: 0, value: '2025-11-01' }, { row: 0, col: 1, value: '個案甲' }, { row: 0, col: 2, value: '36.5' }, { row: 0, col: 3, value: '36.8' }, { row: 0, col: 4, value: '36.7' }, { row: 0, col: 5, value: '無' }, { row: 0, col: 6, value: '無' }, { row: 0, col: 7, value: '照服員甲' },
        { row: 1, col: 0, value: '2025-11-01' }, { row: 1, col: 1, value: '個案乙' }, { row: 1, col: 2, value: '37.0' }, { row: 1, col: 3, value: '37.2' }, { row: 1, col: 4, value: '37.1' }, { row: 1, col: 5, value: '午後微熱' }, { row: 1, col: 6, value: '增加水分攝取' }, { row: 1, col: 7, value: '照服員乙' },
        { row: 2, col: 0, value: '2025-11-01' }, { row: 2, col: 1, value: '個案丙' }, { row: 2, col: 2, value: '36.3' }, { row: 2, col: 3, value: '36.5' }, { row: 2, col: 4, value: '36.4' }, { row: 2, col: 5, value: '無' }, { row: 2, col: 6, value: '無' }, { row: 2, col: 7, value: '照服員丙' },
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
      prefillCells: [
        { row: 0, col: 0, value: '2025-10-05' }, { row: 0, col: 1, value: '個案甲' }, { row: 0, col: 2, value: '流感' }, { row: 0, col: 3, value: '發燒、咳嗽、鼻塞' }, { row: 0, col: 4, value: '縣市衛生局' }, { row: 0, col: 5, value: '單人房隔離 5 天' }, { row: 0, col: 6, value: '康復，解除隔離' }, { row: 0, col: 7, value: '護理師甲' },
        { row: 1, col: 0, value: '2025-11-15' }, { row: 1, col: 1, value: '個案乙' }, { row: 1, col: 2, value: '腸胃道感染' }, { row: 1, col: 3, value: '腹瀉、嘔吐' }, { row: 1, col: 4, value: '縣市衛生局' }, { row: 1, col: 5, value: '執行接觸隔離措施' }, { row: 1, col: 6, value: '症狀緩解，持續觀察' }, { row: 1, col: 7, value: '護理師乙' },
        { row: 2, col: 0, value: '2025-12-01' }, { row: 2, col: 1, value: '職員丙' }, { row: 2, col: 2, value: '新冠肺炎' }, { row: 2, col: 3, value: '發燒、喉嚨痛' }, { row: 2, col: 4, value: '縣市衛生局' }, { row: 2, col: 5, value: '停止上班居家隔離' }, { row: 2, col: 6, value: '快篩陰性後返回工作' }, { row: 2, col: 7, value: '護理師丙' },
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
      prefillCells: [
        { row: 0, col: 0, value: '2025-11-01' }, { row: 0, col: 1, value: '個案甲' }, { row: 0, col: 2, value: '降壓藥甲' }, { row: 0, col: 3, value: '1顆' }, { row: 0, col: 4, value: '早飯後' }, { row: 0, col: 5, value: '護理師甲' }, { row: 0, col: 6, value: '正常服用' },
        { row: 1, col: 0, value: '2025-11-01' }, { row: 1, col: 1, value: '個案乙' }, { row: 1, col: 2, value: '血糖藥乙' }, { row: 1, col: 3, value: '1顆' }, { row: 1, col: 4, value: '午飯前' }, { row: 1, col: 5, value: '護理師乙' }, { row: 1, col: 6, value: '正常服用' },
        { row: 2, col: 0, value: '2025-11-01' }, { row: 2, col: 1, value: '個案丙' }, { row: 2, col: 2, value: '安眠藥丙' }, { row: 2, col: 3, value: '1顆' }, { row: 2, col: 4, value: '睡前' }, { row: 2, col: 5, value: '護理師丙' }, { row: 2, col: 6, value: '正常服用' },
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
      prefillCells: [
        { row: 0, col: 0, value: '2025-10-15' }, { row: 0, col: 1, value: '個案甲' }, { row: 0, col: 2, value: '嗎啡貼片' }, { row: 0, col: 3, value: '2片' }, { row: 0, col: 4, value: '回收' }, { row: 0, col: 5, value: '合作藥局' }, { row: 0, col: 6, value: '護理師甲' }, { row: 0, col: 7, value: '護理主任確認' },
        { row: 1, col: 0, value: '2025-11-20' }, { row: 1, col: 1, value: '個案乙' }, { row: 1, col: 2, value: '管制安眠藥' }, { row: 1, col: 3, value: '5顆' }, { row: 1, col: 4, value: '銷毀' }, { row: 1, col: 5, value: '藥局見證' }, { row: 1, col: 6, value: '護理師乙' }, { row: 1, col: 7, value: '護理主任確認' },
        { row: 2, col: 0, value: '2025-12-05' }, { row: 2, col: 1, value: '個案丙' }, { row: 2, col: 2, value: '強效止痛藥' }, { row: 2, col: 3, value: '3顆' }, { row: 2, col: 4, value: '回收' }, { row: 2, col: 5, value: '合作藥局' }, { row: 2, col: 6, value: '護理師丙' }, { row: 2, col: 7, value: '護理主任確認' },
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
      prefillCells: [
        { row: 0, col: 0, value: '2025-09-15' }, { row: 0, col: 1, value: '個案甲' }, { row: 0, col: 2, value: '藥師甲' }, { row: 0, col: 3, value: '多重用藥評估（7種以上）' }, { row: 0, col: 4, value: '發現潛在交互作用' }, { row: 0, col: 5, value: '建議醫師複查處方' }, { row: 0, col: 6, value: '護理師甲確認' },
        { row: 1, col: 0, value: '2025-10-10' }, { row: 1, col: 1, value: '個案乙' }, { row: 1, col: 2, value: '藥師甲' }, { row: 1, col: 3, value: '服藥順從性評估' }, { row: 1, col: 4, value: '用藥數量符合標準' }, { row: 1, col: 5, value: '維持現行處方' }, { row: 1, col: 6, value: '護理師乙確認' },
        { row: 2, col: 0, value: '2025-11-20' }, { row: 2, col: 1, value: '個案丙' }, { row: 2, col: 2, value: '藥師乙' }, { row: 2, col: 3, value: '用藥教導及副作用說明' }, { row: 2, col: 4, value: '用藥數量符合標準' }, { row: 2, col: 5, value: '加強服藥紀錄追蹤' }, { row: 2, col: 6, value: '護理師丙確認' },
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
      prefillCells: [
        { row: 0, col: 0, value: '2025-09-22' }, { row: 0, col: 1, value: '21:30' }, { row: 0, col: 2, value: '個案甲' }, { row: 0, col: 3, value: '寢室' }, { row: 0, col: 4, value: '如廁時滑倒' }, { row: 0, col: 5, value: '立即評估傷勢，無骨折' }, { row: 0, col: 6, value: '輕微擦傷' }, { row: 0, col: 7, value: '已通知' }, { row: 0, col: 8, value: '加強夜間防滑措施' }, { row: 0, col: 9, value: '更換防滑拖鞋' },
        { row: 1, col: 0, value: '2025-10-18' }, { row: 1, col: 1, value: '08:00' }, { row: 1, col: 2, value: '個案乙' }, { row: 1, col: 3, value: '走廊' }, { row: 1, col: 4, value: '晨間活動時失去平衡' }, { row: 1, col: 5, value: '護理評估，無大礙' }, { row: 1, col: 6, value: '無傷' }, { row: 1, col: 7, value: '已通知' }, { row: 1, col: 8, value: '加強巡視頻率' }, { row: 1, col: 9, value: '使用助行器' },
        { row: 2, col: 0, value: '2025-11-30' }, { row: 2, col: 1, value: '14:00' }, { row: 2, col: 2, value: '個案丙' }, { row: 2, col: 3, value: '浴廁' }, { row: 2, col: 4, value: '如廁後起身不穩' }, { row: 2, col: 5, value: '評估後通知醫師' }, { row: 2, col: 6, value: '輕微挫傷' }, { row: 2, col: 7, value: '已通知' }, { row: 2, col: 8, value: '加設扶手輔助' }, { row: 2, col: 9, value: '調整如廁協助方式' },
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
      prefillCells: [
        { row: 0, col: 0, value: '2025-09-10' }, { row: 0, col: 1, value: '個案甲' }, { row: 0, col: 2, value: '尾椎' }, { row: 0, col: 3, value: '第一期' }, { row: 0, col: 4, value: '長期臥床，翻身不足' }, { row: 0, col: 5, value: '增加翻身頻率至每1.5小時' }, { row: 0, col: 6, value: '紅斑未褪，持續監測' }, { row: 0, col: 7, value: '護理師甲' },
        { row: 1, col: 0, value: '2025-10-05' }, { row: 1, col: 1, value: '個案乙' }, { row: 1, col: 2, value: '腳踝' }, { row: 1, col: 3, value: '第二期' }, { row: 1, col: 4, value: '輪椅坐姿壓迫' }, { row: 1, col: 5, value: '使用減壓墊，每日換藥' }, { row: 1, col: 6, value: '水泡已乾燥，癒合中' }, { row: 1, col: 7, value: '護理師乙' },
        { row: 2, col: 0, value: '2025-11-20' }, { row: 2, col: 1, value: '個案丙' }, { row: 2, col: 2, value: '薦尾骨' }, { row: 2, col: 3, value: '第一期' }, { row: 2, col: 4, value: '水份攝取不足' }, { row: 2, col: 5, value: '加強補水及減壓墊使用' }, { row: 2, col: 6, value: '持續觀察' }, { row: 2, col: 7, value: '護理師丙' },
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
      prefillCells: [
        { row: 0, col: 0, value: '2025-09-15' }, { row: 0, col: 1, value: '個案甲' }, { row: 0, col: 2, value: '6' }, { row: 0, col: 3, value: '右膝關節' }, { row: 0, col: 4, value: '活動時加重，休息緩解' }, { row: 0, col: 5, value: '給予口服止痛藥' }, { row: 0, col: 6, value: '3' }, { row: 0, col: 7, value: '護理師甲' },
        { row: 1, col: 0, value: '2025-10-10' }, { row: 1, col: 1, value: '個案乙' }, { row: 1, col: 2, value: '4' }, { row: 1, col: 3, value: '腰背部' }, { row: 1, col: 4, value: '久坐加重，翻身緩解' }, { row: 1, col: 5, value: '熱敷、協助翻身擺位' }, { row: 1, col: 6, value: '2' }, { row: 1, col: 7, value: '護理師乙' },
        { row: 2, col: 0, value: '2025-11-20' }, { row: 2, col: 1, value: '個案丙' }, { row: 2, col: 2, value: '8' }, { row: 2, col: 3, value: '腹部' }, { row: 2, col: 4, value: '進食後加重' }, { row: 2, col: 5, value: '通知醫師，調整飲食' }, { row: 2, col: 6, value: '4' }, { row: 2, col: 7, value: '護理師丙' },
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
      prefillCells: [
        { row: 0, col: 0, value: '2025-10-05' }, { row: 0, col: 1, value: '10:00' }, { row: 0, col: 2, value: '個案甲' }, { row: 0, col: 3, value: '腕部' }, { row: 0, col: 4, value: '防止自行拔除鼻胃管' }, { row: 0, col: 5, value: '已嘗試手套約束，效果不佳' }, { row: 0, col: 6, value: '皮膚完整無損' }, { row: 0, col: 7, value: '稍有不安' }, { row: 0, col: 8, value: '護理師甲' },
        { row: 1, col: 0, value: '2025-10-05' }, { row: 1, col: 1, value: '12:00' }, { row: 1, col: 2, value: '個案甲' }, { row: 1, col: 3, value: '腕部' }, { row: 1, col: 4, value: '同上' }, { row: 1, col: 5, value: '持續評估替代方案' }, { row: 1, col: 6, value: '皮膚完整' }, { row: 1, col: 7, value: '較平靜' }, { row: 1, col: 8, value: '護理師乙' },
        { row: 2, col: 0, value: '2025-10-05' }, { row: 2, col: 1, value: '14:00' }, { row: 2, col: 2, value: '個案甲' }, { row: 2, col: 3, value: '腕部' }, { row: 2, col: 4, value: '同上' }, { row: 2, col: 5, value: '已與家屬討論替代措施' }, { row: 2, col: 6, value: '皮膚完整' }, { row: 2, col: 7, value: '已入睡' }, { row: 2, col: 8, value: '護理師丙' },
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
      prefillCells: [
        { row: 0, col: 0, value: '2025-09-15' }, { row: 0, col: 1, value: '個案甲' }, { row: 0, col: 2, value: '泌尿道感染' }, { row: 0, col: 3, value: '發燒、排尿疼痛' }, { row: 0, col: 4, value: '單人房接觸隔離' }, { row: 0, col: 5, value: '抗生素治療' }, { row: 0, col: 6, value: '已通報主管機關' }, { row: 0, col: 7, value: '症狀緩解，解除隔離' }, { row: 0, col: 8, value: '護理師甲' },
        { row: 1, col: 0, value: '2025-10-10' }, { row: 1, col: 1, value: '個案乙' }, { row: 1, col: 2, value: '肺炎' }, { row: 1, col: 3, value: '發燒、咳嗽、呼吸急促' }, { row: 1, col: 4, value: '單人房隔離' }, { row: 1, col: 5, value: '送醫處理' }, { row: 1, col: 6, value: '已通報' }, { row: 1, col: 7, value: '住院治療中' }, { row: 1, col: 8, value: '護理師乙' },
        { row: 2, col: 0, value: '2025-11-20' }, { row: 2, col: 1, value: '個案丙' }, { row: 2, col: 2, value: '皮膚感染' }, { row: 2, col: 3, value: '傷口紅腫熱痛' }, { row: 2, col: 4, value: '加強換藥' }, { row: 2, col: 5, value: '每日換藥清潔' }, { row: 2, col: 6, value: '院內處理' }, { row: 2, col: 7, value: '癒合良好' }, { row: 2, col: 8, value: '護理師丙' },
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
      prefillCells: [
        { row: 0, col: 0, value: '2025-09-20' }, { row: 0, col: 1, value: '個案甲' }, { row: 0, col: 2, value: '急性肺炎' }, { row: 0, col: 3, value: '某市立醫院' }, { row: 0, col: 4, value: '長期臥床引發吸入性肺炎' }, { row: 0, col: 5, value: '加強口腔護理及頭部抬高' }, { row: 0, col: 6, value: '2025-09-28' }, { row: 0, col: 7, value: '返院後持續抗生素治療' }, { row: 0, col: 8, value: '護理師甲' },
        { row: 1, col: 0, value: '2025-10-15' }, { row: 1, col: 1, value: '個案乙' }, { row: 1, col: 2, value: '泌尿道感染' }, { row: 1, col: 3, value: '某醫院' }, { row: 1, col: 4, value: '導尿管留置過久' }, { row: 1, col: 5, value: '縮短更換周期、加強清潔' }, { row: 1, col: 6, value: '2025-10-22' }, { row: 1, col: 7, value: '持續追蹤尿液培養' }, { row: 1, col: 8, value: '護理師乙' },
        { row: 2, col: 0, value: '2025-11-08' }, { row: 2, col: 1, value: '個案丙' }, { row: 2, col: 2, value: '骨折' }, { row: 2, col: 3, value: '骨科醫院' }, { row: 2, col: 4, value: '跌倒受傷' }, { row: 2, col: 5, value: '強化跌倒預防措施' }, { row: 2, col: 6, value: '2025-11-25' }, { row: 2, col: 7, value: '返院後復健訓練' }, { row: 2, col: 8, value: '護理師丙' },
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
      prefillCells: [
        { row: 0, col: 0, value: '2025-11-01' }, { row: 0, col: 1, value: '個案甲' }, { row: 0, col: 2, value: '52.0' }, { row: 0, col: 3, value: '53.5' }, { row: 0, col: 4, value: '-1.5' }, { row: 0, col: 5, value: '-2.8%' }, { row: 0, col: 6, value: '無' }, { row: 0, col: 7, value: '無' }, { row: 0, col: 8, value: '護理師甲' },
        { row: 1, col: 0, value: '2025-11-01' }, { row: 1, col: 1, value: '個案乙' }, { row: 1, col: 2, value: '45.0' }, { row: 1, col: 3, value: '47.5' }, { row: 1, col: 4, value: '-2.5' }, { row: 1, col: 5, value: '-5.3%' }, { row: 1, col: 6, value: '超過 5% 門檻' }, { row: 1, col: 7, value: '轉介營養師評估' }, { row: 1, col: 8, value: '護理師乙' },
        { row: 2, col: 0, value: '2025-11-01' }, { row: 2, col: 1, value: '個案丙' }, { row: 2, col: 2, value: '61.0' }, { row: 2, col: 3, value: '60.5' }, { row: 2, col: 4, value: '+0.5' }, { row: 2, col: 5, value: '+0.8%' }, { row: 2, col: 6, value: '無' }, { row: 2, col: 7, value: '無' }, { row: 2, col: 8, value: '護理師丙' },
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
      prefillCells: [
        { row: 0, col: 0, value: '個案甲' }, { row: 0, col: 1, value: '2025-09-10' }, { row: 0, col: 2, value: '鼻胃管' }, { row: 0, col: 3, value: '吞嚥功能初步恢復，可嘗試口服' }, { row: 0, col: 4, value: '達成自主進食' }, { row: 0, col: 5, value: '每日口腔訓練、吞嚥功能訓練' }, { row: 0, col: 6, value: '護理師甲、語言治療師' }, { row: 0, col: 7, value: '2025-10-10' }, { row: 0, col: 8, value: '已成功移除' },
        { row: 1, col: 0, value: '個案乙' }, { row: 1, col: 1, value: '2025-10-05' }, { row: 1, col: 2, value: '導尿管' }, { row: 1, col: 3, value: '尿道感染風險' }, { row: 1, col: 4, value: '縮短留置時間' }, { row: 1, col: 5, value: '評估自排尿能力、強化會陰部護理' }, { row: 1, col: 6, value: '護理師乙' }, { row: 1, col: 7, value: '2025-11-05' }, { row: 1, col: 8, value: '改為間歇性導尿' },
        { row: 2, col: 0, value: '個案丙' }, { row: 2, col: 1, value: '2025-11-20' }, { row: 2, col: 2, value: '鼻胃管' }, { row: 2, col: 3, value: '吞嚥功能持平' }, { row: 2, col: 4, value: '維持現狀評估' }, { row: 2, col: 5, value: '持續吞嚥訓練' }, { row: 2, col: 6, value: '護理師丙' }, { row: 2, col: 7, value: '2025-12-20' }, { row: 2, col: 8, value: '持續評估中' },
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
      prefillCells: [
        { row: 0, col: 0, value: '2025-09-15' }, { row: 0, col: 1, value: '個案甲' }, { row: 0, col: 2, value: '鼻胃管' }, { row: 0, col: 3, value: '口腔吞嚥訓練' }, { row: 0, col: 4, value: '順利完成' }, { row: 0, col: 5, value: '配合良好' }, { row: 0, col: 6, value: '護理師甲' },
        { row: 1, col: 0, value: '2025-10-10' }, { row: 1, col: 1, value: '個案乙' }, { row: 1, col: 2, value: '導尿管' }, { row: 1, col: 3, value: '自排尿訓練' }, { row: 1, col: 4, value: '部分達成' }, { row: 1, col: 5, value: '稍感不適' }, { row: 1, col: 6, value: '護理師乙' },
        { row: 2, col: 0, value: '2025-11-20' }, { row: 2, col: 1, value: '個案丙' }, { row: 2, col: 2, value: '鼻胃管' }, { row: 2, col: 3, value: '吞嚥評估測試' }, { row: 2, col: 4, value: '持平' }, { row: 2, col: 5, value: '配合良好' }, { row: 2, col: 6, value: '護理師丙' },
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
      prefillCells: [
        { row: 0, col: 0, value: '個案甲' }, { row: 0, col: 1, value: '2025-09-10' }, { row: 0, col: 2, value: '130/80 78' }, { row: 0, col: 3, value: '正常' }, { row: 0, col: 4, value: '102' }, { row: 0, col: 5, value: '無' }, { row: 0, col: 6, value: '無需特別處置' }, { row: 0, col: 7, value: '甲醫師確認' },
        { row: 1, col: 0, value: '個案乙' }, { row: 1, col: 1, value: '2025-09-15' }, { row: 1, col: 2, value: '145/90 82' }, { row: 1, col: 3, value: '輕微貧血' }, { row: 1, col: 4, value: '115' }, { row: 1, col: 5, value: '高血壓、輕微貧血' }, { row: 1, col: 6, value: '調整降壓藥、補充鐵劑' }, { row: 1, col: 7, value: '甲醫師確認' },
        { row: 2, col: 0, value: '個案丙' }, { row: 2, col: 1, value: '2025-10-05' }, { row: 2, col: 2, value: '118/75 75' }, { row: 2, col: 3, value: '正常' }, { row: 2, col: 4, value: '198' }, { row: 2, col: 5, value: '血糖偏高' }, { row: 2, col: 6, value: '轉介營養師調整飲食' }, { row: 2, col: 7, value: '甲醫師確認' },
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
      prefillCells: [
        { row: 0, col: 0, value: '2025-10-05' }, { row: 0, col: 1, value: '護理主任' }, { row: 0, col: 2, value: '護理師甲' }, { row: 0, col: 3, value: '鼻胃管灌食標準程序' }, { row: 0, col: 4, value: '是' }, { row: 0, col: 5, value: '' }, { row: 0, col: 6, value: '無' }, { row: 0, col: 7, value: '無' }, { row: 0, col: 8, value: '無' },
        { row: 1, col: 0, value: '2025-10-05' }, { row: 1, col: 1, value: '護理主任' }, { row: 1, col: 2, value: '護理師乙' }, { row: 1, col: 3, value: '導尿管護理標準程序' }, { row: 1, col: 4, value: '是' }, { row: 1, col: 5, value: '' }, { row: 1, col: 6, value: '無' }, { row: 1, col: 7, value: '無' }, { row: 1, col: 8, value: '無' },
        { row: 2, col: 0, value: '2025-10-10' }, { row: 2, col: 1, value: '護理主任' }, { row: 2, col: 2, value: '護理師丙' }, { row: 2, col: 3, value: '傷口換藥標準程序' }, { row: 2, col: 4, value: '' }, { row: 2, col: 5, value: '是' }, { row: 2, col: 6, value: '消毒順序有誤' }, { row: 2, col: 7, value: '重新示範說明' }, { row: 2, col: 8, value: '2025-10-17' },
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
      prefillCells: [
        { row: 0, col: 0, value: '2025-09-22' }, { row: 0, col: 1, value: '21:45' }, { row: 0, col: 2, value: '個案甲' }, { row: 0, col: 3, value: '意識改變、疑似腦血管事件' }, { row: 0, col: 4, value: '給氧、維持姿勢穩定' }, { row: 0, col: 5, value: '某急診醫院' }, { row: 0, col: 6, value: '22:00' }, { row: 0, col: 7, value: '住院治療中' }, { row: 0, col: 8, value: '護理師甲' },
        { row: 1, col: 0, value: '2025-10-18' }, { row: 1, col: 1, value: '14:20' }, { row: 1, col: 2, value: '個案乙' }, { row: 1, col: 3, value: '高燒不退' }, { row: 1, col: 4, value: '物理降溫、抽血備用' }, { row: 1, col: 5, value: '某市立醫院' }, { row: 1, col: 6, value: '14:35' }, { row: 1, col: 7, value: '返院後繼續追蹤' }, { row: 1, col: 8, value: '護理師乙' },
        { row: 2, col: 0, value: '2025-11-30' }, { row: 2, col: 1, value: '08:00' }, { row: 2, col: 2, value: '個案丙' }, { row: 2, col: 3, value: '跌倒疑似骨折' }, { row: 2, col: 4, value: '固定患肢、疼痛評估' }, { row: 2, col: 5, value: '骨科醫院' }, { row: 2, col: 6, value: '08:15' }, { row: 2, col: 7, value: '手術後返院復健' }, { row: 2, col: 8, value: '護理師丙' },
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
      prefillCells: [
        { row: 0, col: 0, value: '個案甲' }, { row: 0, col: 1, value: '住民' }, { row: 0, col: 2, value: '流感疫苗' }, { row: 0, col: 3, value: '2025-10-20' }, { row: 0, col: 4, value: '是' }, { row: 0, col: 5, value: '' }, { row: 0, col: 6, value: '已告知家屬同意' },
        { row: 1, col: 0, value: '個案乙' }, { row: 1, col: 1, value: '住民' }, { row: 1, col: 2, value: '流感疫苗' }, { row: 1, col: 3, value: '2025-10-20' }, { row: 1, col: 4, value: '否' }, { row: 1, col: 5, value: '過敏史禁忌' }, { row: 1, col: 6, value: '已告知家屬' },
        { row: 2, col: 0, value: '護理師甲' }, { row: 2, col: 1, value: '員工' }, { row: 2, col: 2, value: '流感疫苗' }, { row: 2, col: 3, value: '2025-10-15' }, { row: 2, col: 4, value: '是' }, { row: 2, col: 5, value: '' }, { row: 2, col: 6, value: '正常接種' },
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
      prefillCells: [
        { row: 0, col: 0, value: '2025-11-01' }, { row: 0, col: 1, value: '個案甲' }, { row: 0, col: 2, value: '3' }, { row: 0, col: 3, value: '60' }, { row: 0, col: 4, value: '走廊散步、復健操' }, { row: 0, col: 5, value: '助行器' }, { row: 0, col: 6, value: '願意配合' }, { row: 0, col: 7, value: '照服員甲' },
        { row: 1, col: 0, value: '2025-11-01' }, { row: 1, col: 1, value: '個案乙' }, { row: 1, col: 2, value: '2' }, { row: 1, col: 3, value: '30' }, { row: 1, col: 4, value: '餐廳用餐' }, { row: 1, col: 5, value: '輪椅' }, { row: 1, col: 6, value: '情緒穩定' }, { row: 1, col: 7, value: '照服員乙' },
        { row: 2, col: 0, value: '2025-11-01' }, { row: 2, col: 1, value: '個案丙' }, { row: 2, col: 2, value: '4' }, { row: 2, col: 3, value: '90' }, { row: 2, col: 4, value: '團體活動、戶外曬太陽' }, { row: 2, col: 5, value: '四腳柺' }, { row: 2, col: 6, value: '主動要求下床' }, { row: 2, col: 7, value: '照服員丙' },
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
      prefillCells: [
        { row: 0, col: 0, value: '2025-11-01' }, { row: 0, col: 1, value: '個案甲' }, { row: 0, col: 2, value: '06:00' }, { row: 0, col: 3, value: '左側臥' }, { row: 0, col: 4, value: '枕頭支撐背部及雙腳' }, { row: 0, col: 5, value: '皮膚完整無損' }, { row: 0, col: 6, value: '照服員甲' },
        { row: 1, col: 0, value: '2025-11-01' }, { row: 1, col: 1, value: '個案甲' }, { row: 1, col: 2, value: '08:00' }, { row: 1, col: 3, value: '右側臥' }, { row: 1, col: 4, value: '枕頭支撐' }, { row: 1, col: 5, value: '皮膚完整' }, { row: 1, col: 6, value: '照服員乙' },
        { row: 2, col: 0, value: '2025-11-01' }, { row: 2, col: 1, value: '個案甲' }, { row: 2, col: 2, value: '10:00' }, { row: 2, col: 3, value: '平躺' }, { row: 2, col: 4, value: '頭部抬高 30 度' }, { row: 2, col: 5, value: '皮膚完整' }, { row: 2, col: 6, value: '照服員丙' },
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
      prefillCells: [
        { row: 0, col: 0, value: '個案甲' }, { row: 0, col: 1, value: '2025-09-10' }, { row: 0, col: 2, value: '急迫性失禁' }, { row: 0, col: 3, value: '每2小時' }, { row: 0, col: 4, value: '08:00/10:00/12:00/14:00/16:00/18:00/20:00' }, { row: 0, col: 5, value: '協助走至廁所' }, { row: 0, col: 6, value: '2025-10-10' }, { row: 0, col: 7, value: '維持原計畫' }, { row: 0, col: 8, value: '護理師甲' },
        { row: 1, col: 0, value: '個案乙' }, { row: 1, col: 1, value: '2025-10-05' }, { row: 1, col: 2, value: '功能性失禁' }, { row: 1, col: 3, value: '每3小時' }, { row: 1, col: 4, value: '07:00/10:00/13:00/16:00/19:00' }, { row: 1, col: 5, value: '輪椅移位至馬桶' }, { row: 1, col: 6, value: '2025-11-05' }, { row: 1, col: 7, value: '調整為每2小時' }, { row: 1, col: 8, value: '護理師乙' },
        { row: 2, col: 0, value: '個案丙' }, { row: 2, col: 1, value: '2025-11-20' }, { row: 2, col: 2, value: '壓力性失禁' }, { row: 2, col: 3, value: '每4小時' }, { row: 2, col: 4, value: '08:00/12:00/16:00/20:00' }, { row: 2, col: 5, value: '提醒後自行如廁' }, { row: 2, col: 6, value: '2025-12-20' }, { row: 2, col: 7, value: '維持原計畫' }, { row: 2, col: 8, value: '護理師丙' },
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
      prefillCells: [
        { row: 0, col: 0, value: '2025-11-01' }, { row: 0, col: 1, value: '個案甲' }, { row: 0, col: 2, value: '10:00' }, { row: 0, col: 3, value: '協助步行' }, { row: 0, col: 4, value: '有排尿' }, { row: 0, col: 5, value: '配合' }, { row: 0, col: 6, value: '照服員甲' },
        { row: 1, col: 0, value: '2025-11-01' }, { row: 1, col: 1, value: '個案乙' }, { row: 1, col: 2, value: '10:00' }, { row: 1, col: 3, value: '輪椅移位' }, { row: 1, col: 4, value: '有排尿排便' }, { row: 1, col: 5, value: '配合' }, { row: 1, col: 6, value: '照服員乙' },
        { row: 2, col: 0, value: '2025-11-01' }, { row: 2, col: 1, value: '個案丙' }, { row: 2, col: 2, value: '12:00' }, { row: 2, col: 3, value: '提醒' }, { row: 2, col: 4, value: '有排尿' }, { row: 2, col: 5, value: '自行完成' }, { row: 2, col: 6, value: '照服員丙' },
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
      prefillCells: [
        { row: 0, col: 0, value: '個案甲' }, { row: 0, col: 1, value: '2025-09-10' }, { row: 0, col: 2, value: 'Barthel指數 60分' }, { row: 0, col: 3, value: '維持沐浴自理能力' }, { row: 0, col: 4, value: '每日沐浴訓練' }, { row: 0, col: 5, value: '長柄刷、防滑墊' }, { row: 0, col: 6, value: '職能治療師甲' }, { row: 0, col: 7, value: '2025-10-10' }, { row: 0, col: 8, value: '進步至65分' },
        { row: 1, col: 0, value: '個案乙' }, { row: 1, col: 1, value: '2025-10-05' }, { row: 1, col: 2, value: 'Barthel指數 40分' }, { row: 1, col: 3, value: '維持進食自理' }, { row: 1, col: 4, value: '輔助進食訓練' }, { row: 1, col: 5, value: '防滑碗、加厚握柄湯匙' }, { row: 1, col: 6, value: '職能治療師乙' }, { row: 1, col: 7, value: '2025-11-05' }, { row: 1, col: 8, value: '維持40分' },
        { row: 2, col: 0, value: '個案丙' }, { row: 2, col: 1, value: '2025-11-20' }, { row: 2, col: 2, value: 'Barthel指數 80分' }, { row: 2, col: 3, value: '維持步行能力' }, { row: 2, col: 4, value: '每日步行訓練' }, { row: 2, col: 5, value: '四腳柺' }, { row: 2, col: 6, value: '物理治療師丙' }, { row: 2, col: 7, value: '2025-12-20' }, { row: 2, col: 8, value: '維持80分' },
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
      prefillCells: [
        { row: 0, col: 0, value: '第1週/週一' }, { row: 0, col: 1, value: '稀飯、豆腐、炒青菜' }, { row: 0, col: 2, value: '白飯、紅燒豬肉、清炒蔬菜、味噌湯' }, { row: 0, col: 3, value: '白飯、清蒸魚、炒高麗菜' }, { row: 0, col: 4, value: '豆漿、全麥餅乾' }, { row: 0, col: 5, value: '營養師甲' }, { row: 0, col: 6, value: '2025-09-01' },
        { row: 1, col: 0, value: '第1週/週二' }, { row: 1, col: 1, value: '全麥吐司、荷包蛋、牛奶' }, { row: 1, col: 2, value: '白飯、三杯雞、燙青菜、豆腐湯' }, { row: 1, col: 3, value: '白飯、炒豬肝、炒地瓜葉' }, { row: 1, col: 4, value: '芝麻糊' }, { row: 1, col: 5, value: '營養師甲' }, { row: 1, col: 6, value: '2025-09-01' },
        { row: 2, col: 0, value: '第1週/週三' }, { row: 2, col: 1, value: '肉粥、醬瓜、炒蛋' }, { row: 2, col: 2, value: '白飯、滷豬腳、炒青菜、蛤蜊湯' }, { row: 2, col: 3, value: '白飯、薑絲炒魚片、炒空心菜' }, { row: 2, col: 4, value: '藕粉' }, { row: 2, col: 5, value: '營養師甲' }, { row: 2, col: 6, value: '2025-09-01' },
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
      prefillCells: [
        { row: 0, col: 0, value: '個案甲' }, { row: 0, col: 1, value: '2025-09-10' }, { row: 0, col: 2, value: '糖尿病' }, { row: 0, col: 3, value: '低糖軟質飲食' }, { row: 0, col: 4, value: '減少精緻澱粉、增加蔬菜比例' }, { row: 0, col: 5, value: '防滑碗' }, { row: 0, col: 6, value: '2025-10-10' }, { row: 0, col: 7, value: '維持原計畫' }, { row: 0, col: 8, value: '營養師甲' },
        { row: 1, col: 0, value: '個案乙' }, { row: 1, col: 1, value: '2025-10-05' }, { row: 1, col: 2, value: '吞嚥困難' }, { row: 1, col: 3, value: '半流質' }, { row: 1, col: 4, value: '食物打碎、增稠劑使用' }, { row: 1, col: 5, value: '深碗、加厚握柄湯匙' }, { row: 1, col: 6, value: '2025-11-05' }, { row: 1, col: 7, value: '改為流質飲食' }, { row: 1, col: 8, value: '營養師乙' },
        { row: 2, col: 0, value: '個案丙' }, { row: 2, col: 1, value: '2025-11-20' }, { row: 2, col: 2, value: '低蛋白質' }, { row: 2, col: 3, value: '高蛋白飲食' }, { row: 2, col: 4, value: '增加豆腐、魚類、蛋類攝取' }, { row: 2, col: 5, value: '一般餐具' }, { row: 2, col: 6, value: '2025-12-20' }, { row: 2, col: 7, value: '蛋白質數值改善' }, { row: 2, col: 8, value: '營養師丙' },
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
      prefillCells: [
        { row: 0, col: 0, value: '個案甲' }, { row: 0, col: 1, value: '2025-09-10' }, { row: 0, col: 2, value: '標準配方' }, { row: 0, col: 3, value: '300' }, { row: 0, col: 4, value: '每4小時一次' }, { row: 0, col: 5, value: 'X光確認位置正確' }, { row: 0, col: 6, value: '無不適' }, { row: 0, col: 7, value: '護理師甲' },
        { row: 1, col: 0, value: '個案乙' }, { row: 1, col: 1, value: '2025-10-05' }, { row: 1, col: 2, value: '高蛋白配方' }, { row: 1, col: 3, value: '250' }, { row: 1, col: 4, value: '每6小時一次' }, { row: 1, col: 5, value: '外露刻度確認' }, { row: 1, col: 6, value: '偶有腹脹' }, { row: 1, col: 7, value: '護理師乙' },
        { row: 2, col: 0, value: '個案丙' }, { row: 2, col: 1, value: '2025-11-20' }, { row: 2, col: 2, value: '低糖配方' }, { row: 2, col: 3, value: '200' }, { row: 2, col: 4, value: '每4小時一次' }, { row: 2, col: 5, value: '外露刻度確認' }, { row: 2, col: 6, value: '無不適' }, { row: 2, col: 7, value: '護理師丙' },
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
      prefillCells: [
        { row: 0, col: 0, value: '2025-11-01' }, { row: 0, col: 1, value: '食材冷藏溫度符合規定' }, { row: 0, col: 2, value: '是' }, { row: 0, col: 3, value: '' }, { row: 0, col: 4, value: '無' }, { row: 0, col: 5, value: '無' }, { row: 0, col: 6, value: '廚工甲' },
        { row: 1, col: 0, value: '2025-11-01' }, { row: 1, col: 1, value: '工作人員洗手及手套使用' }, { row: 1, col: 2, value: '是' }, { row: 1, col: 3, value: '' }, { row: 1, col: 4, value: '無' }, { row: 1, col: 5, value: '無' }, { row: 1, col: 6, value: '廚工甲' },
        { row: 2, col: 0, value: '2025-11-01' }, { row: 2, col: 1, value: '廚房地板清潔無積水' }, { row: 2, col: 2, value: '' }, { row: 2, col: 3, value: '是' }, { row: 2, col: 4, value: '發現積水' }, { row: 2, col: 5, value: '立即清乾' }, { row: 2, col: 6, value: '廚工甲' },
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
      prefillCells: [
        { row: 0, col: 0, value: '2025-11-01' }, { row: 0, col: 1, value: '豬絞肉' }, { row: 0, col: 2, value: '5kg' }, { row: 0, col: 3, value: '甲食品公司' }, { row: 0, col: 4, value: '4°C' }, { row: 0, col: 5, value: '合格' }, { row: 0, col: 6, value: '冷藏庫' }, { row: 0, col: 7, value: '廚工甲' },
        { row: 1, col: 0, value: '2025-11-01' }, { row: 1, col: 1, value: '板豆腐' }, { row: 1, col: 2, value: '10盒' }, { row: 1, col: 3, value: '乙食品公司' }, { row: 1, col: 4, value: '5°C' }, { row: 1, col: 5, value: '合格' }, { row: 1, col: 6, value: '冷藏庫' }, { row: 1, col: 7, value: '廚工乙' },
        { row: 2, col: 0, value: '2025-11-01' }, { row: 2, col: 1, value: '新鮮蔬菜' }, { row: 2, col: 2, value: '10kg' }, { row: 2, col: 3, value: '丙農場' }, { row: 2, col: 4, value: '18°C（室溫驗收）' }, { row: 2, col: 5, value: '合格' }, { row: 2, col: 6, value: '蔬菜儲存區' }, { row: 2, col: 7, value: '廚工丙' },
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
      prefillCells: [
        { row: 0, col: 0, value: '2025-11-01' }, { row: 0, col: 1, value: '護理站' }, { row: 0, col: 2, value: '感染性廢棄物（針頭、敷料）' }, { row: 0, col: 3, value: '加蓋紅色廢棄物桶密封' }, { row: 0, col: 4, value: '某醫療廢棄物清運公司' }, { row: 0, col: 5, value: '護理師甲' }, { row: 0, col: 6, value: '護理主任確認' }, { row: 0, col: 7, value: '無' },
        { row: 1, col: 0, value: '2025-11-01' }, { row: 1, col: 1, value: '廚房' }, { row: 1, col: 2, value: '一般廢棄物' }, { row: 1, col: 3, value: '密封塑膠袋，置於指定廢棄物區' }, { row: 1, col: 4, value: '某清潔公司' }, { row: 1, col: 5, value: '廚工甲' }, { row: 1, col: 6, value: '主任確認' }, { row: 1, col: 7, value: '無' },
        { row: 2, col: 0, value: '2025-11-05' }, { row: 2, col: 1, value: '全棟' }, { row: 2, col: 2, value: '一般廢棄物清運' }, { row: 2, col: 3, value: '統一打包清運' }, { row: 2, col: 4, value: '某清運公司' }, { row: 2, col: 5, value: '行政人員' }, { row: 2, col: 6, value: '主任確認' }, { row: 2, col: 7, value: '無' },
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
      prefillCells: [
        { row: 0, col: 0, value: '2025-11-01' }, { row: 0, col: 1, value: '護理站' }, { row: 0, col: 2, value: '插座及延長線' }, { row: 0, col: 3, value: '是' }, { row: 0, col: 4, value: '' }, { row: 0, col: 5, value: '無' }, { row: 0, col: 6, value: '無' }, { row: 0, col: 7, value: '防火管理人甲' },
        { row: 1, col: 0, value: '2025-11-01' }, { row: 1, col: 1, value: '廚房' }, { row: 1, col: 2, value: '瓦斯爐及排油煙機' }, { row: 1, col: 3, value: '' }, { row: 1, col: 4, value: '是' }, { row: 1, col: 5, value: '排油煙機有異音' }, { row: 1, col: 6, value: '聯絡廠商檢修' }, { row: 1, col: 7, value: '防火管理人甲' },
        { row: 2, col: 0, value: '2025-11-01' }, { row: 2, col: 1, value: '寢室區' }, { row: 2, col: 2, value: '床頭燈及呼叫系統' }, { row: 2, col: 3, value: '是' }, { row: 2, col: 4, value: '' }, { row: 2, col: 5, value: '無' }, { row: 2, col: 6, value: '無' }, { row: 2, col: 7, value: '防火管理人甲' },
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
      prefillCells: [
        { row: 0, col: 0, value: '2025-09-20' }, { row: 0, col: 1, value: '實地演練' }, { row: 0, col: 2, value: '火災逃生（廚房起火）' }, { row: 0, col: 3, value: '機構全棟' }, { row: 0, col: 4, value: '全體工作人員 30 名' }, { row: 0, col: 5, value: '警報啟動、疏散引導、集合點確認' }, { row: 0, col: 6, value: '部分人員不熟悉替代路線' }, { row: 0, col: 7, value: '加強指示標示及路線圖' }, { row: 0, col: 8, value: '防火管理人甲' },
        { row: 1, col: 0, value: '2025-10-15' }, { row: 1, col: 1, value: '桌上演練' }, { row: 1, col: 2, value: '地震應變（震後處置）' }, { row: 1, col: 3, value: '會議室' }, { row: 1, col: 4, value: '全體工作人員 30 名' }, { row: 1, col: 5, value: '情境討論、角色分工確認' }, { row: 1, col: 6, value: '夜間人力不足情境未演練' }, { row: 1, col: 7, value: '加強夜班應變訓練' }, { row: 1, col: 8, value: '防火管理人甲' },
        { row: 2, col: 0, value: '2025-11-20' }, { row: 2, col: 1, value: '實地演練（夜間）' }, { row: 2, col: 2, value: '夜間火災疏散演練' }, { row: 2, col: 3, value: '機構全棟' }, { row: 2, col: 4, value: '夜班工作人員 8 名' }, { row: 2, col: 5, value: '警報啟動、疏散至集合點' }, { row: 2, col: 6, value: '夜間疏散速度較慢' }, { row: 2, col: 7, value: '加強夜班演練頻率' }, { row: 2, col: 8, value: '防火管理人甲' },
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
      prefillCells: [
        { row: 0, col: 0, value: '移位機' }, { row: 0, col: 1, value: 'ABC-001' }, { row: 0, col: 2, value: '2025-10-01' }, { row: 0, col: 3, value: '某輔具廠商' }, { row: 0, col: 4, value: '正常，電池更換' }, { row: 0, col: 5, value: '2026-04-01' }, { row: 0, col: 6, value: '護理師甲' },
        { row: 1, col: 0, value: '電動病床' }, { row: 1, col: 1, value: 'BED-012' }, { row: 1, col: 2, value: '2025-10-05' }, { row: 1, col: 3, value: '某醫療設備廠商' }, { row: 1, col: 4, value: '正常，電動部位潤滑' }, { row: 1, col: 5, value: '2026-04-05' }, { row: 1, col: 6, value: '護理師乙' },
        { row: 2, col: 0, value: '輪椅' }, { row: 2, col: 1, value: 'WC-023' }, { row: 2, col: 2, value: '2025-10-10' }, { row: 2, col: 3, value: '某輔具廠商' }, { row: 2, col: 4, value: '輪胎充氣，剎車調整' }, { row: 2, col: 5, value: '2026-04-10' }, { row: 2, col: 6, value: '護理師丙' },
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
      prefillCells: [
        { row: 0, col: 0, value: '2025-10-05' }, { row: 0, col: 1, value: '服務對象甲' }, { row: 0, col: 2, value: '工作人員不當言語' }, { row: 0, col: 3, value: '工作人員對服務對象使用不當語言' }, { row: 0, col: 4, value: '立即隔離當事人，安撫服務對象' }, { row: 0, col: 5, value: '已依規定通報主管機關' }, { row: 0, col: 6, value: '持續心理支持' }, { row: 0, col: 7, value: '加強工作倫理教育訓練' },
        { row: 1, col: 0, value: '2025-11-15' }, { row: 1, col: 1, value: '服務對象乙' }, { row: 1, col: 2, value: '疏忽照顧' }, { row: 1, col: 3, value: '服務對象長時間未被協助翻身' }, { row: 1, col: 4, value: '立即協助翻身，評估皮膚' }, { row: 1, col: 5, value: '內部調查中' }, { row: 1, col: 6, value: '增加巡視頻率' }, { row: 1, col: 7, value: '加強交班確認機制' },
        { row: 2, col: 0, value: '2025-12-01' }, { row: 2, col: 1, value: '服務對象丙' }, { row: 2, col: 2, value: '服務對象間爭執' }, { row: 2, col: 3, value: '兩位服務對象口頭衝突' }, { row: 2, col: 4, value: '分離安撫' }, { row: 2, col: 5, value: '內部處理' }, { row: 2, col: 6, value: '定期調解溝通' }, { row: 2, col: 7, value: '調整床位安排' },
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
      prefillCells: [
        { row: 0, col: 0, value: '2025-09-15' }, { row: 0, col: 1, value: '個案甲' }, { row: 0, col: 2, value: '健康狀況報告' }, { row: 0, col: 3, value: '轉介至合作醫院' }, { row: 0, col: 4, value: '家屬同意' }, { row: 0, col: 5, value: '護理師甲' }, { row: 0, col: 6, value: '護理主任' },
        { row: 1, col: 0, value: '2025-10-10' }, { row: 1, col: 1, value: '個案乙' }, { row: 1, col: 2, value: '個案服務計畫書' }, { row: 1, col: 3, value: '跨專業會議使用' }, { row: 1, col: 4, value: '本人同意' }, { row: 1, col: 5, value: '社工師乙' }, { row: 1, col: 6, value: '主任' },
        { row: 2, col: 0, value: '2025-11-20' }, { row: 2, col: 1, value: '個案丙' }, { row: 2, col: 2, value: '藥歷資料' }, { row: 2, col: 3, value: '藥師藥事照護' }, { row: 2, col: 4, value: '家屬同意' }, { row: 2, col: 5, value: '藥師丙' }, { row: 2, col: 6, value: '護理主任' },
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
      prefillCells: [
        { row: 0, col: 0, value: '2025-09-20' }, { row: 0, col: 1, value: '家屬甲' }, { row: 0, col: 2, value: '照護品質' }, { row: 0, col: 3, value: '對個案甲夜間照護不滿意' }, { row: 0, col: 4, value: '調查後確認有改進空間' }, { row: 0, col: 5, value: '調整夜班巡視頻率' }, { row: 0, col: 6, value: '2025-09-25' }, { row: 0, col: 7, value: '家屬表示滿意' }, { row: 0, col: 8, value: '社工師甲' },
        { row: 1, col: 0, value: '2025-10-15' }, { row: 1, col: 1, value: '家屬乙' }, { row: 1, col: 2, value: '收費疑義' }, { row: 1, col: 3, value: '對某項費用收費計算有疑問' }, { row: 1, col: 4, value: '重新確認帳單明細' }, { row: 1, col: 5, value: '說明並提供明細' }, { row: 1, col: 6, value: '2025-10-18' }, { row: 1, col: 7, value: '家屬理解' }, { row: 1, col: 8, value: '行政人員' },
        { row: 2, col: 0, value: '2025-11-10' }, { row: 2, col: 1, value: '服務對象丙' }, { row: 2, col: 2, value: '膳食' }, { row: 2, col: 3, value: '午餐菜色希望多樣化' }, { row: 2, col: 4, value: '轉達給營養師' }, { row: 2, col: 5, value: '每週新增 1 道新菜' }, { row: 2, col: 6, value: '2025-11-15' }, { row: 2, col: 7, value: '服務對象表示滿意' }, { row: 2, col: 8, value: '社工師丙' },
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
      prefillCells: [
        { row: 0, col: 0, value: '2025-09-15' }, { row: 0, col: 1, value: '個案甲' }, { row: 0, col: 2, value: '現金' }, { row: 0, col: 3, value: '代為保管入住費用' }, { row: 0, col: 4, value: '5,000元' }, { row: 0, col: 5, value: '存入機構代管帳戶' }, { row: 0, col: 6, value: '家屬甲簽名確認' }, { row: 0, col: 7, value: '社工師甲' },
        { row: 1, col: 0, value: '2025-10-10' }, { row: 1, col: 1, value: '個案乙' }, { row: 1, col: 2, value: '貴重物品' }, { row: 1, col: 3, value: '金戒指1枚、手錶1只' }, { row: 1, col: 4, value: '2件' }, { row: 1, col: 5, value: '清點後密封保管' }, { row: 1, col: 6, value: '家屬乙簽名確認' }, { row: 1, col: 7, value: '社工師乙' },
        { row: 2, col: 0, value: '2025-11-20' }, { row: 2, col: 1, value: '個案丙（遺物）' }, { row: 2, col: 2, value: '遺物清點' }, { row: 2, col: 3, value: '衣物、個人用品' }, { row: 2, col: 4, value: '清點總計 20 件' }, { row: 2, col: 5, value: '通知家屬領回' }, { row: 2, col: 6, value: '家屬丙簽名確認' }, { row: 2, col: 7, value: '社工師丙' },
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
      prefillCells: [
        { row: 0, col: 0, value: '2025-09-15' }, { row: 0, col: 1, value: '個案甲' }, { row: 0, col: 2, value: '尚未簽署 AD' }, { row: 0, col: 3, value: '告知預立醫療決定流程及諮商管道' }, { row: 0, col: 4, value: '家屬同意安排諮商' }, { row: 0, col: 5, value: '某醫院安寧諮詢門診' }, { row: 0, col: 6, value: '社工師甲、護理師甲' }, { row: 0, col: 7, value: '無' },
        { row: 1, col: 0, value: '2025-10-10' }, { row: 1, col: 1, value: '個案乙' }, { row: 1, col: 2, value: '已簽署 DNR' }, { row: 1, col: 3, value: '確認意願書有效性，存入病歷' }, { row: 1, col: 4, value: '家屬知情同意' }, { row: 1, col: 5, value: '無需轉介' }, { row: 1, col: 6, value: '護理師乙' }, { row: 1, col: 7, value: 'DNR 有效至 2026' },
        { row: 2, col: 0, value: '2025-11-20' }, { row: 2, col: 1, value: '個案丙' }, { row: 2, col: 2, value: '已完成 AD 諮商' }, { row: 2, col: 3, value: '諮商結果：同意安寧緩和，不使用維生醫療' }, { row: 2, col: 4, value: '家屬溝通後共識' }, { row: 2, col: 5, value: '已完成諮商' }, { row: 2, col: 6, value: '社工師丙、護理師丙' }, { row: 2, col: 7, value: '意願書已存入個案紀錄' },
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
      prefillCells: [
        { row: 0, col: 0, value: '2025-09-20' }, { row: 0, col: 1, value: '個案甲' }, { row: 0, col: 2, value: '佛教' }, { row: 0, col: 3, value: '協助參加機構佛教念佛活動' }, { row: 0, col: 4, value: '情緒安定，感謝' }, { row: 0, col: 5, value: '每月參與' }, { row: 0, col: 6, value: '社工師甲' },
        { row: 1, col: 0, value: '2025-10-15' }, { row: 1, col: 1, value: '個案乙' }, { row: 1, col: 2, value: '基督教' }, { row: 1, col: 3, value: '聯繫社區教會志工到機構探訪' }, { row: 1, col: 4, value: '情緒愉悅，感謝禱告' }, { row: 1, col: 5, value: '每雙週探訪' }, { row: 1, col: 6, value: '社工師乙' },
        { row: 2, col: 0, value: '2025-11-08' }, { row: 2, col: 1, value: '個案丙' }, { row: 2, col: 2, value: '無宗教信仰' }, { row: 2, col: 3, value: '協助參與懷舊活動，文化節慶布置' }, { row: 2, col: 4, value: '參與意願高' }, { row: 2, col: 5, value: '定期活動參與' }, { row: 2, col: 6, value: '社工師丙' },
      ],
    },
  ],

  /** 7. A7 業務負責人資格及執業情形 */
  7: [
    {
      sheetName: '負責人資格及證照清冊',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 3,
      columns: [
        { header: '姓名', width: 110 },
        { header: '職稱', width: 120 },
        { header: '資格類別', width: 160 },
        { header: '證書字號', width: 160 },
        { header: '證書有效期限', width: 130 },
        { header: '在職訓練累計時數', width: 150 },
        { header: '備註', width: 130 },
      ],
      prefillCells: [
        { row: 0, col: 0, value: '負責人甲' }, { row: 0, col: 1, value: '機構負責人' }, { row: 0, col: 2, value: '社工師' }, { row: 0, col: 3, value: '社工師字第00001號' }, { row: 0, col: 4, value: '永久有效' }, { row: 0, col: 5, value: '36' }, { row: 0, col: 6, value: '無' },
        { row: 1, col: 0, value: '業務負責人乙' }, { row: 1, col: 1, value: '業務負責人' }, { row: 1, col: 2, value: '護理師' }, { row: 1, col: 3, value: '護理師字第00002號' }, { row: 1, col: 4, value: '永久有效' }, { row: 1, col: 5, value: '24' }, { row: 1, col: 6, value: '無' },
        { row: 2, col: 0, value: '主任丙' }, { row: 2, col: 1, value: '護理之家主任' }, { row: 2, col: 2, value: '護理師' }, { row: 2, col: 3, value: '護理師字第00003號' }, { row: 2, col: 4, value: '永久有效' }, { row: 2, col: 5, value: '20' }, { row: 2, col: 6, value: '無' },
      ],
    },
    {
      sheetName: '負責人月度巡查紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 2,
      columns: [
        { header: '巡查日期', width: 110 },
        { header: '巡查時段', width: 110 },
        { header: '主要巡查內容', width: 220 },
        { header: '發現問題', width: 180 },
        { header: '改善指示', width: 200 },
        { header: '追蹤結果', width: 160 },
        { header: '負責人簽名', width: 120 },
      ],
      prefillCells: [
        { row: 0, col: 0, value: '2025-09-15' }, { row: 0, col: 1, value: '上午' }, { row: 0, col: 2, value: '照護服務品質、環境安全' }, { row: 0, col: 3, value: '某寢室地板有濕滑' }, { row: 0, col: 4, value: '立即清乾，加強防滑措施' }, { row: 0, col: 5, value: '已完成改善' }, { row: 0, col: 6, value: '負責人甲' },
        { row: 1, col: 0, value: '2025-10-10' }, { row: 1, col: 1, value: '下午' }, { row: 1, col: 2, value: '人員值勤狀況、文件記錄' }, { row: 1, col: 3, value: '記錄格式不統一' }, { row: 1, col: 4, value: '統一記錄格式，辦理說明會' }, { row: 1, col: 5, value: '已完成' }, { row: 1, col: 6, value: '負責人甲' },
        { row: 2, col: 0, value: '2025-11-20' }, { row: 2, col: 1, value: '上午' }, { row: 2, col: 2, value: '藥品管理、感染管制執行' }, { row: 2, col: 3, value: '無異常' }, { row: 2, col: 4, value: '維持現況' }, { row: 2, col: 5, value: '無需追蹤' }, { row: 2, col: 6, value: '負責人甲' },
      ],
    },
    {
      sheetName: '負責人在職訓練紀錄表',
      archetype: 'training-record',
      criteriaIndex: 3,
      columns: [
        { header: '訓練日期', width: 110 },
        { header: '訓練主題', width: 200 },
        { header: '辦理單位', width: 160 },
        { header: '時數', width: 80 },
        { header: '訓練方式', width: 130 },
        { header: '完訓證明字號', width: 160 },
        { header: '備註', width: 130 },
      ],
      prefillCells: [
        { row: 0, col: 0, value: '2025-09-20' }, { row: 0, col: 1, value: '長照機構管理實務' }, { row: 0, col: 2, value: '衛生福利部' }, { row: 0, col: 3, value: '6' }, { row: 0, col: 4, value: '實體課程' }, { row: 0, col: 5, value: '衛部字第00001號' }, { row: 0, col: 6, value: '無' },
        { row: 1, col: 0, value: '2025-10-15' }, { row: 1, col: 1, value: '機構財務管理與稽核' }, { row: 1, col: 2, value: '某長照協會' }, { row: 1, col: 3, value: '3' }, { row: 1, col: 4, value: '線上課程' }, { row: 1, col: 5, value: '協會字第00002號' }, { row: 1, col: 6, value: '無' },
        { row: 2, col: 0, value: '2025-11-08' }, { row: 2, col: 1, value: '照護品質促進與評鑑準備' }, { row: 2, col: 2, value: '某護理協會' }, { row: 2, col: 3, value: '6' }, { row: 2, col: 4, value: '實體課程' }, { row: 2, col: 5, value: '護協字第00003號' }, { row: 2, col: 6, value: '無' },
      ],
    },
  ],

  /** 39. C1 建築物安全維護 */
  39: [
    {
      sheetName: '建築物安全維護定期檢查表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      columns: [
        { header: '檢查日期', width: 100 },
        { header: '檢查區域', width: 140 },
        { header: '檢查項目', width: 200 },
        { header: '正常', width: 70 },
        { header: '異常', width: 70 },
        { header: '缺失說明', width: 180 },
        { header: '修繕方式', width: 180 },
        { header: '完成日期', width: 110 },
        { header: '檢查人員', width: 100 },
      ],
      prefillCells: [
        { row: 0, col: 0, value: '2025-11-01' }, { row: 0, col: 1, value: '走廊' }, { row: 0, col: 2, value: '地板防滑條完整' }, { row: 0, col: 3, value: '是' }, { row: 0, col: 4, value: '' }, { row: 0, col: 5, value: '無' }, { row: 0, col: 6, value: '無' }, { row: 0, col: 7, value: '無' }, { row: 0, col: 8, value: '行政人員甲' },
        { row: 1, col: 0, value: '2025-11-01' }, { row: 1, col: 1, value: '緊急出口' }, { row: 1, col: 2, value: '緊急出口指示燈正常' }, { row: 1, col: 3, value: '' }, { row: 1, col: 4, value: '是' }, { row: 1, col: 5, value: '1號出口指示燈燈泡故障' }, { row: 1, col: 6, value: '更換燈泡' }, { row: 1, col: 7, value: '2025-11-03' }, { row: 1, col: 8, value: '行政人員甲' },
        { row: 2, col: 0, value: '2025-11-01' }, { row: 2, col: 1, value: '屋頂' }, { row: 2, col: 2, value: '屋頂防水及排水正常' }, { row: 2, col: 3, value: '是' }, { row: 2, col: 4, value: '' }, { row: 2, col: 5, value: '無' }, { row: 2, col: 6, value: '無' }, { row: 2, col: 7, value: '無' }, { row: 2, col: 8, value: '行政人員甲' },
      ],
    },
    {
      sheetName: '公共安全申報紀錄表',
      archetype: 'inventory-list',
      criteriaIndex: 1,
      prefillRows: 5,
      columns: [
        { header: '申報類別', width: 150 },
        { header: '申報年度', width: 100 },
        { header: '申報日期', width: 110 },
        { header: '申報機關', width: 150 },
        { header: '審查結果', width: 130 },
        { header: '有效期至', width: 120 },
        { header: '備註', width: 130 },
      ],
      prefillCells: [
        { row: 0, col: 0, value: '消防安全設備' }, { row: 0, col: 1, value: '2025' }, { row: 0, col: 2, value: '2025-09-01' }, { row: 0, col: 3, value: '縣市消防局' }, { row: 0, col: 4, value: '合格' }, { row: 0, col: 5, value: '2026-08-31' }, { row: 0, col: 6, value: '無' },
        { row: 1, col: 0, value: '建築物公共安全' }, { row: 1, col: 1, value: '2025' }, { row: 1, col: 2, value: '2025-10-01' }, { row: 1, col: 3, value: '縣市建管處' }, { row: 1, col: 4, value: '合格' }, { row: 1, col: 5, value: '2026-09-30' }, { row: 1, col: 6, value: '無' },
        { row: 2, col: 0, value: '電氣設備安全' }, { row: 2, col: 1, value: '2025' }, { row: 2, col: 2, value: '2025-11-01' }, { row: 2, col: 3, value: '台電公司' }, { row: 2, col: 4, value: '合格' }, { row: 2, col: 5, value: '2026-10-31' }, { row: 2, col: 6, value: '無' },
      ],
    },
  ],

  /** 40. C2 寢室及生活空間環境管理 */
  40: [
    {
      sheetName: '寢室環境安全查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
      columns: [
        { header: '查核日期', width: 100 },
        { header: '房號', width: 80 },
        { header: '查核項目', width: 200 },
        { header: '符合', width: 70 },
        { header: '不符合', width: 80 },
        { header: '缺失說明', width: 180 },
        { header: '改善措施', width: 180 },
        { header: '查核人員', width: 100 },
      ],
      prefillCells: [
        { row: 0, col: 0, value: '2025-11-01' }, { row: 0, col: 1, value: '101' }, { row: 0, col: 2, value: '床欄及呼叫系統正常' }, { row: 0, col: 3, value: '是' }, { row: 0, col: 4, value: '' }, { row: 0, col: 5, value: '無' }, { row: 0, col: 6, value: '無' }, { row: 0, col: 7, value: '護理師甲' },
        { row: 1, col: 0, value: '2025-11-01' }, { row: 1, col: 1, value: '102' }, { row: 1, col: 2, value: '床欄及呼叫系統正常' }, { row: 1, col: 3, value: '' }, { row: 1, col: 4, value: '是' }, { row: 1, col: 5, value: '呼叫按鈕鬆脫' }, { row: 1, col: 6, value: '立即維修' }, { row: 1, col: 7, value: '護理師甲' },
        { row: 2, col: 0, value: '2025-11-01' }, { row: 2, col: 1, value: '103' }, { row: 2, col: 2, value: '照明充足且防眩光' }, { row: 2, col: 3, value: '是' }, { row: 2, col: 4, value: '' }, { row: 2, col: 5, value: '無' }, { row: 2, col: 6, value: '無' }, { row: 2, col: 7, value: '護理師乙' },
      ],
    },
    {
      sheetName: '生活輔助設施功能檢查表',
      archetype: 'inspection-checklist',
      criteriaIndex: 3,
      columns: [
        { header: '檢查日期', width: 100 },
        { header: '設施名稱', width: 160 },
        { header: '設置位置', width: 150 },
        { header: '功能正常', width: 100 },
        { header: '異常說明', width: 180 },
        { header: '維修日期', width: 110 },
        { header: '負責人員', width: 100 },
      ],
      prefillCells: [
        { row: 0, col: 0, value: '2025-11-01' }, { row: 0, col: 1, value: '走廊扶手' }, { row: 0, col: 2, value: '走廊兩側' }, { row: 0, col: 3, value: '是' }, { row: 0, col: 4, value: '無' }, { row: 0, col: 5, value: '無' }, { row: 0, col: 6, value: '行政人員甲' },
        { row: 1, col: 0, value: '2025-11-01' }, { row: 1, col: 1, value: '防滑地墊' }, { row: 1, col: 2, value: '浴廁入口' }, { row: 1, col: 3, value: '是' }, { row: 1, col: 4, value: '無' }, { row: 1, col: 5, value: '無' }, { row: 1, col: 6, value: '行政人員甲' },
        { row: 2, col: 0, value: '2025-11-01' }, { row: 2, col: 1, value: '輪椅坡道' }, { row: 2, col: 2, value: '大廳入口' }, { row: 2, col: 3, value: '否' }, { row: 2, col: 4, value: '坡道邊緣磨損' }, { row: 2, col: 5, value: '2025-11-05' }, { row: 2, col: 6, value: '行政人員甲' },
      ],
    },
  ],

  /** 41. C3 浴廁及盥洗設備安全 */
  41: [
    {
      sheetName: '浴廁安全設施查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      columns: [
        { header: '查核日期', width: 100 },
        { header: '浴廁編號', width: 90 },
        { header: '查核項目', width: 200 },
        { header: '符合', width: 70 },
        { header: '不符合', width: 80 },
        { header: '缺失說明', width: 180 },
        { header: '改善措施', width: 180 },
        { header: '查核人員', width: 100 },
      ],
      prefillCells: [
        { row: 0, col: 0, value: '2025-11-01' }, { row: 0, col: 1, value: 'B-01' }, { row: 0, col: 2, value: '扶手牢固，無鬆脫' }, { row: 0, col: 3, value: '是' }, { row: 0, col: 4, value: '' }, { row: 0, col: 5, value: '無' }, { row: 0, col: 6, value: '無' }, { row: 0, col: 7, value: '護理師甲' },
        { row: 1, col: 0, value: '2025-11-01' }, { row: 1, col: 1, value: 'B-02' }, { row: 1, col: 2, value: '地板防滑措施完善' }, { row: 1, col: 3, value: '' }, { row: 1, col: 4, value: '是' }, { row: 1, col: 5, value: '防滑貼紙部分脫落' }, { row: 1, col: 6, value: '重新黏貼防滑貼紙' }, { row: 1, col: 7, value: '護理師乙' },
        { row: 2, col: 0, value: '2025-11-01' }, { row: 2, col: 1, value: 'B-03' }, { row: 2, col: 2, value: '緊急呼叫系統可用' }, { row: 2, col: 3, value: '是' }, { row: 2, col: 4, value: '' }, { row: 2, col: 5, value: '無' }, { row: 2, col: 6, value: '無' }, { row: 2, col: 7, value: '護理師丙' },
      ],
    },
    {
      sheetName: '浴廁清潔消毒紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 2,
      columns: [
        { header: '清潔日期', width: 100 },
        { header: '時段', width: 90 },
        { header: '浴廁編號', width: 90 },
        { header: '清潔項目', width: 180 },
        { header: '消毒劑使用', width: 130 },
        { header: '清潔結果', width: 120 },
        { header: '執行人員', width: 100 },
      ],
      prefillCells: [
        { row: 0, col: 0, value: '2025-11-01' }, { row: 0, col: 1, value: '早班' }, { row: 0, col: 2, value: 'B-01' }, { row: 0, col: 3, value: '地板、馬桶、洗手台清潔' }, { row: 0, col: 4, value: '含氯漂白水' }, { row: 0, col: 5, value: '已完成' }, { row: 0, col: 6, value: '照服員甲' },
        { row: 1, col: 0, value: '2025-11-01' }, { row: 1, col: 1, value: '午班' }, { row: 1, col: 2, value: 'B-02' }, { row: 1, col: 3, value: '地板、馬桶、洗手台清潔' }, { row: 1, col: 4, value: '含氯漂白水' }, { row: 1, col: 5, value: '已完成' }, { row: 1, col: 6, value: '照服員乙' },
        { row: 2, col: 0, value: '2025-11-01' }, { row: 2, col: 1, value: '晚班' }, { row: 2, col: 2, value: 'B-03' }, { row: 2, col: 3, value: '地板、馬桶、洗手台清潔' }, { row: 2, col: 4, value: '含氯漂白水' }, { row: 2, col: 5, value: '已完成' }, { row: 2, col: 6, value: '照服員丙' },
      ],
    },
  ],

  /** 44. C6 藥品及醫療器材安全管理 */
  44: [
    {
      sheetName: '醫療器材校正維護紀錄表',
      archetype: 'inventory-list',
      criteriaIndex: 1,
      prefillRows: 8,
      columns: [
        { header: '器材名稱', width: 160 },
        { header: '序號', width: 130 },
        { header: '最近校正日期', width: 130 },
        { header: '校正結果', width: 130 },
        { header: '下次校正日期', width: 130 },
        { header: '維護廠商', width: 150 },
        { header: '負責人員', width: 100 },
      ],
      prefillCells: [
        { row: 0, col: 0, value: '血壓計' }, { row: 0, col: 1, value: 'BP-001' }, { row: 0, col: 2, value: '2025-09-15' }, { row: 0, col: 3, value: '合格' }, { row: 0, col: 4, value: '2026-03-15' }, { row: 0, col: 5, value: '某醫療器材公司' }, { row: 0, col: 6, value: '護理師甲' },
        { row: 1, col: 0, value: '血糖機' }, { row: 1, col: 1, value: 'BG-002' }, { row: 1, col: 2, value: '2025-10-01' }, { row: 1, col: 3, value: '合格' }, { row: 1, col: 4, value: '2026-04-01' }, { row: 1, col: 5, value: '某醫療器材公司' }, { row: 1, col: 6, value: '護理師乙' },
        { row: 2, col: 0, value: '體溫計' }, { row: 2, col: 1, value: 'TH-003' }, { row: 2, col: 2, value: '2025-11-01' }, { row: 2, col: 3, value: '合格' }, { row: 2, col: 4, value: '2026-05-01' }, { row: 2, col: 5, value: '某醫療器材公司' }, { row: 2, col: 6, value: '護理師丙' },
      ],
    },
    {
      sheetName: '急救設備定期檢查表',
      archetype: 'inspection-checklist',
      criteriaIndex: 2,
      columns: [
        { header: '檢查日期', width: 100 },
        { header: '設備名稱', width: 160 },
        { header: '數量', width: 80 },
        { header: '有效期限', width: 120 },
        { header: '功能正常', width: 100 },
        { header: '備品狀況', width: 130 },
        { header: '下次檢查日', width: 120 },
        { header: '檢查人員', width: 100 },
      ],
      prefillCells: [
        { row: 0, col: 0, value: '2025-11-01' }, { row: 0, col: 1, value: 'AED' }, { row: 0, col: 2, value: '1' }, { row: 0, col: 3, value: '2026-06-30' }, { row: 0, col: 4, value: '是' }, { row: 0, col: 5, value: '電極片備品足夠' }, { row: 0, col: 6, value: '2026-02-01' }, { row: 0, col: 7, value: '護理師甲' },
        { row: 1, col: 0, value: '2025-11-01' }, { row: 1, col: 1, value: '急救箱' }, { row: 1, col: 2, value: '3' }, { row: 1, col: 3, value: '2026-03-31' }, { row: 1, col: 4, value: '是' }, { row: 1, col: 5, value: '已補充耗材' }, { row: 1, col: 6, value: '2026-02-01' }, { row: 1, col: 7, value: '護理師乙' },
        { row: 2, col: 0, value: '2025-11-01' }, { row: 2, col: 1, value: '氧氣鋼瓶' }, { row: 2, col: 2, value: '2' }, { row: 2, col: 3, value: '2026-01-31' }, { row: 2, col: 4, value: '是' }, { row: 2, col: 5, value: '壓力正常' }, { row: 2, col: 6, value: '2025-12-01' }, { row: 2, col: 7, value: '護理師丙' },
      ],
    },
  ],

  /** 45. C7 電梯及機械升降設備安全 */
  45: [
    {
      sheetName: '電梯定期安全檢查紀錄表',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 4,
      columns: [
        { header: '電梯編號', width: 100 },
        { header: '檢查日期', width: 110 },
        { header: '檢查單位', width: 160 },
        { header: '檢查結果', width: 130 },
        { header: '合格有效期至', width: 130 },
        { header: '異常紀錄', width: 180 },
        { header: '備註', width: 130 },
      ],
      prefillCells: [
        { row: 0, col: 0, value: 'EL-01' }, { row: 0, col: 1, value: '2025-09-15' }, { row: 0, col: 2, value: '某電梯維護公司' }, { row: 0, col: 3, value: '合格' }, { row: 0, col: 4, value: '2026-03-14' }, { row: 0, col: 5, value: '無' }, { row: 0, col: 6, value: '無' },
        { row: 1, col: 0, value: 'EL-02' }, { row: 1, col: 1, value: '2025-09-15' }, { row: 1, col: 2, value: '某電梯維護公司' }, { row: 1, col: 3, value: '合格' }, { row: 1, col: 4, value: '2026-03-14' }, { row: 1, col: 5, value: '無' }, { row: 1, col: 6, value: '無' },
        { row: 2, col: 0, value: 'EL-01' }, { row: 2, col: 1, value: '2025-03-10' }, { row: 2, col: 2, value: '某電梯維護公司' }, { row: 2, col: 3, value: '合格' }, { row: 2, col: 4, value: '2025-09-09' }, { row: 2, col: 5, value: '無' }, { row: 2, col: 6, value: '上次紀錄' },
      ],
    },
    {
      sheetName: '電梯故障及維修紀錄表',
      archetype: 'incident-log',
      criteriaIndex: 1,
      columns: [
        { header: '故障日期', width: 100 },
        { header: '電梯編號', width: 100 },
        { header: '故障情形', width: 200 },
        { header: '停用時間', width: 130 },
        { header: '維修廠商', width: 150 },
        { header: '完修日期', width: 110 },
        { header: '負責人員', width: 100 },
      ],
      prefillCells: [
        { row: 0, col: 0, value: '2025-09-20' }, { row: 0, col: 1, value: 'EL-01' }, { row: 0, col: 2, value: '門無法正常關閉' }, { row: 0, col: 3, value: '2小時' }, { row: 0, col: 4, value: '某電梯維護公司' }, { row: 0, col: 5, value: '2025-09-20' }, { row: 0, col: 6, value: '行政人員甲' },
        { row: 1, col: 0, value: '2025-10-15' }, { row: 1, col: 1, value: 'EL-02' }, { row: 1, col: 2, value: '異常聲響' }, { row: 1, col: 3, value: '4小時' }, { row: 1, col: 4, value: '某電梯維護公司' }, { row: 1, col: 5, value: '2025-10-15' }, { row: 1, col: 6, value: '行政人員甲' },
        { row: 2, col: 0, value: '2025-11-05' }, { row: 2, col: 1, value: 'EL-01' }, { row: 2, col: 2, value: '按鈕無反應' }, { row: 2, col: 3, value: '1小時' }, { row: 2, col: 4, value: '某電梯維護公司' }, { row: 2, col: 5, value: '2025-11-05' }, { row: 2, col: 6, value: '行政人員甲' },
      ],
    },
  ],

  /** 46. C8 緊急發電及停電應變 */
  46: [
    {
      sheetName: '緊急發電設備試運轉紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '試運轉日期', width: 120 },
        { header: '設備編號', width: 110 },
        { header: '試運轉時間(分鐘)', width: 150 },
        { header: '試運轉結果', width: 130 },
        { header: '發現問題', width: 180 },
        { header: '處置措施', width: 180 },
        { header: '執行人員', width: 100 },
      ],
      prefillCells: [
        { row: 0, col: 0, value: '2025-09-15' }, { row: 0, col: 1, value: 'GEN-001' }, { row: 0, col: 2, value: '30' }, { row: 0, col: 3, value: '正常' }, { row: 0, col: 4, value: '無' }, { row: 0, col: 5, value: '無' }, { row: 0, col: 6, value: '行政人員甲' },
        { row: 1, col: 0, value: '2025-10-15' }, { row: 1, col: 1, value: 'GEN-001' }, { row: 1, col: 2, value: '30' }, { row: 1, col: 3, value: '正常' }, { row: 1, col: 4, value: '無' }, { row: 1, col: 5, value: '無' }, { row: 1, col: 6, value: '行政人員乙' },
        { row: 2, col: 0, value: '2025-11-15' }, { row: 2, col: 1, value: 'GEN-001' }, { row: 2, col: 2, value: '30' }, { row: 2, col: 3, value: '異常' }, { row: 2, col: 4, value: '啟動時有異常震動' }, { row: 2, col: 5, value: '聯絡廠商檢修' }, { row: 2, col: 6, value: '行政人員甲' },
      ],
    },
    {
      sheetName: '停電應變設備備用方案清單',
      archetype: 'inventory-list',
      criteriaIndex: 2,
      prefillRows: 5,
      columns: [
        { header: '設備名稱', width: 160 },
        { header: '持續電力需求', width: 130 },
        { header: '備用方案說明', width: 220 },
        { header: '備用時間(小時)', width: 130 },
        { header: '最近驗證日期', width: 130 },
        { header: '備註', width: 130 },
      ],
      prefillCells: [
        { row: 0, col: 0, value: '呼叫系統' }, { row: 0, col: 1, value: '高' }, { row: 0, col: 2, value: '啟動備用電池供電' }, { row: 0, col: 3, value: '4' }, { row: 0, col: 4, value: '2025-11-01' }, { row: 0, col: 5, value: '無' },
        { row: 1, col: 0, value: '氧氣供應設備' }, { row: 1, col: 1, value: '高' }, { row: 1, col: 2, value: '切換至備用氧氣鋼瓶' }, { row: 1, col: 3, value: '8' }, { row: 1, col: 4, value: '2025-11-01' }, { row: 1, col: 5, value: '無' },
        { row: 2, col: 0, value: '照明設備' }, { row: 2, col: 1, value: '中' }, { row: 2, col: 2, value: '啟動緊急發電機' }, { row: 2, col: 3, value: '24' }, { row: 2, col: 4, value: '2025-11-01' }, { row: 2, col: 5, value: '無' },
      ],
    },
  ],

  /** 48. C10 等待救援空間設置 */
  48: [
    {
      sheetName: '等待救援空間查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      columns: [
        { header: '查核日期', width: 100 },
        { header: '空間位置', width: 150 },
        { header: '查核項目', width: 200 },
        { header: '符合', width: 70 },
        { header: '不符合', width: 80 },
        { header: '缺失說明', width: 180 },
        { header: '改善措施', width: 180 },
        { header: '查核人員', width: 100 },
      ],
      prefillCells: [
        { row: 0, col: 0, value: '2025-11-01' }, { row: 0, col: 1, value: '2樓樓梯間' }, { row: 0, col: 2, value: '等待救援空間標示明顯' }, { row: 0, col: 3, value: '是' }, { row: 0, col: 4, value: '' }, { row: 0, col: 5, value: '無' }, { row: 0, col: 6, value: '無' }, { row: 0, col: 7, value: '防火管理人甲' },
        { row: 1, col: 0, value: '2025-11-01' }, { row: 1, col: 1, value: '3樓樓梯間' }, { row: 1, col: 2, value: '對講設備可正常使用' }, { row: 1, col: 3, value: '' }, { row: 1, col: 4, value: '是' }, { row: 1, col: 5, value: '對講機無回應' }, { row: 1, col: 6, value: '聯絡廠商維修' }, { row: 1, col: 7, value: '防火管理人甲' },
        { row: 2, col: 0, value: '2025-11-01' }, { row: 2, col: 1, value: '2樓樓梯間' }, { row: 2, col: 2, value: '空間無障礙物、輪椅可進入' }, { row: 2, col: 3, value: '是' }, { row: 2, col: 4, value: '' }, { row: 2, col: 5, value: '無' }, { row: 2, col: 6, value: '無' }, { row: 2, col: 7, value: '防火管理人乙' },
      ],
    },
    {
      sheetName: '等待救援空間知悉度訓練紀錄表',
      archetype: 'training-record',
      criteriaIndex: 2,
      columns: [
        { header: '訓練日期', width: 110 },
        { header: '訓練對象', width: 160 },
        { header: '訓練內容', width: 220 },
        { header: '參訓人數', width: 100 },
        { header: '知悉確認方式', width: 160 },
        { header: '訓練人員', width: 100 },
      ],
      prefillCells: [
        { row: 0, col: 0, value: '2025-09-20' }, { row: 0, col: 1, value: '全體工作人員' }, { row: 0, col: 2, value: '等待救援空間位置及使用方式說明' }, { row: 0, col: 3, value: '30' }, { row: 0, col: 4, value: '實地演練確認' }, { row: 0, col: 5, value: '防火管理人甲' },
        { row: 1, col: 0, value: '2025-10-15' }, { row: 1, col: 1, value: '新進工作人員' }, { row: 1, col: 2, value: '等待救援空間位置及對講設備操作' }, { row: 1, col: 3, value: '5' }, { row: 1, col: 4, value: '口試確認' }, { row: 1, col: 5, value: '防火管理人甲' },
        { row: 2, col: 0, value: '2025-11-20' }, { row: 2, col: 1, value: '夜班工作人員' }, { row: 2, col: 2, value: '夜間緊急疏散及等待救援空間使用' }, { row: 2, col: 3, value: '8' }, { row: 2, col: 4, value: '實地演練確認' }, { row: 2, col: 5, value: '防火管理人甲' },
      ],
    },
  ],

  /** 50. C12 疏散策略及持續照護作業程序 */
  50: [
    {
      sheetName: '個別化疏散策略清冊',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '失能程度', width: 120 },
        { header: '疏散方式', width: 150 },
        { header: '輔具需求', width: 130 },
        { header: '協助人數', width: 100 },
        { header: '疏散路線', width: 180 },
        { header: '特殊注意事項', width: 200 },
      ],
      prefillCells: [
        { row: 0, col: 0, value: '個案甲' }, { row: 0, col: 1, value: '重度' }, { row: 0, col: 2, value: '需人員搬運' }, { row: 0, col: 3, value: '移位機' }, { row: 0, col: 4, value: '2' }, { row: 0, col: 5, value: '2樓→1樓→集合點' }, { row: 0, col: 6, value: '使用氧氣，需攜帶備用氧氣' },
        { row: 1, col: 0, value: '個案乙' }, { row: 1, col: 1, value: '中度' }, { row: 1, col: 2, value: '輪椅推送' }, { row: 1, col: 3, value: '輪椅' }, { row: 1, col: 4, value: '1' }, { row: 1, col: 5, value: '1樓→集合點' }, { row: 1, col: 6, value: '無' },
        { row: 2, col: 0, value: '個案丙' }, { row: 2, col: 1, value: '輕度' }, { row: 2, col: 2, value: '口頭引導' }, { row: 2, col: 3, value: '助行器' }, { row: 2, col: 4, value: '1' }, { row: 2, col: 5, value: '1樓→集合點' }, { row: 2, col: 6, value: '失智，需個別陪同' },
      ],
    },
    {
      sheetName: '疏散後持續照護需求清單',
      archetype: 'inventory-list',
      criteriaIndex: 2,
      prefillRows: 8,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '用藥需求', width: 180 },
        { header: '飲食需求', width: 150 },
        { header: '輔具需求', width: 130 },
        { header: '醫療設備需求', width: 160 },
        { header: '備份位置', width: 150 },
        { header: '備註', width: 130 },
      ],
      prefillCells: [
        { row: 0, col: 0, value: '個案甲' }, { row: 0, col: 1, value: '降壓藥、血糖藥' }, { row: 0, col: 2, value: '低糖軟質飲食' }, { row: 0, col: 3, value: '輪椅' }, { row: 0, col: 4, value: '血壓計、血糖機' }, { row: 0, col: 5, value: '護理站備用袋' }, { row: 0, col: 6, value: '無' },
        { row: 1, col: 0, value: '個案乙' }, { row: 1, col: 1, value: '鼻胃管灌食配方' }, { row: 1, col: 2, value: '管灌飲食' }, { row: 1, col: 3, value: '病床' }, { row: 1, col: 4, value: '灌食注射筒' }, { row: 1, col: 5, value: '護理站備用袋' }, { row: 1, col: 6, value: '無' },
        { row: 2, col: 0, value: '個案丙' }, { row: 2, col: 1, value: '安眠藥' }, { row: 2, col: 2, value: '一般飲食' }, { row: 2, col: 3, value: '助行器' }, { row: 2, col: 4, value: '無' }, { row: 2, col: 5, value: '護理站備用袋' }, { row: 2, col: 6, value: '無' },
      ],
    },
    {
      sheetName: '工作人員疏散能力抽測紀錄表',
      archetype: 'training-record',
      criteriaIndex: 3,
      columns: [
        { header: '抽測日期', width: 110 },
        { header: '受測人員', width: 120 },
        { header: '測試情境', width: 180 },
        { header: '疏散執行結果', width: 160 },
        { header: '缺失說明', width: 180 },
        { header: '補強措施', width: 180 },
        { header: '測試人員', width: 100 },
      ],
      prefillCells: [
        { row: 0, col: 0, value: '2025-09-20' }, { row: 0, col: 1, value: '照服員甲' }, { row: 0, col: 2, value: '夜間火災，協助輪椅住民疏散' }, { row: 0, col: 3, value: '完成' }, { row: 0, col: 4, value: '無' }, { row: 0, col: 5, value: '無' }, { row: 0, col: 6, value: '防火管理人甲' },
        { row: 1, col: 0, value: '2025-10-15' }, { row: 1, col: 1, value: '護理師乙' }, { row: 1, col: 2, value: '日間火災，協助臥床住民疏散' }, { row: 1, col: 3, value: '部分完成' }, { row: 1, col: 4, value: '移位機操作不熟練' }, { row: 1, col: 5, value: '加強移位機操作訓練' }, { row: 1, col: 6, value: '防火管理人甲' },
        { row: 2, col: 0, value: '2025-11-20' }, { row: 2, col: 1, value: '照服員丙' }, { row: 2, col: 2, value: '夜間火災，協助認知障礙住民疏散' }, { row: 2, col: 3, value: '完成' }, { row: 2, col: 4, value: '無' }, { row: 2, col: 5, value: '無' }, { row: 2, col: 6, value: '防火管理人甲' },
      ],
    },
  ],

  /** 51. C13 情境式火災風險辨識與疏散演練 */
  51: [
    {
      sheetName: '情境式疏散計畫表',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 4,
      columns: [
        { header: '起火情境', width: 180 },
        { header: '建議疏散路線', width: 200 },
        { header: '替代路線', width: 180 },
        { header: '阻斷風險', width: 160 },
        { header: '對應措施', width: 200 },
        { header: '訓練頻率', width: 120 },
        { header: '負責人員', width: 100 },
      ],
      prefillCells: [
        { row: 0, col: 0, value: '廚房起火' }, { row: 0, col: 1, value: '1樓→後門→集合點' }, { row: 0, col: 2, value: '1樓→前門→停車場集合' }, { row: 0, col: 3, value: '廚房通道煙霧阻擋' }, { row: 0, col: 4, value: '引導往前門方向疏散' }, { row: 0, col: 5, value: '每半年' }, { row: 0, col: 6, value: '防火管理人甲' },
        { row: 1, col: 0, value: '2樓寢室起火' }, { row: 1, col: 1, value: '2樓→主樓梯→1樓→集合點' }, { row: 1, col: 2, value: '2樓→緊急逃生梯→集合點' }, { row: 1, col: 3, value: '主樓梯煙霧阻擋' }, { row: 1, col: 4, value: '使用緊急逃生梯或等待救援空間' }, { row: 1, col: 5, value: '每半年' }, { row: 1, col: 6, value: '防火管理人甲' },
        { row: 2, col: 0, value: '3樓護理站起火' }, { row: 2, col: 1, value: '3樓→主樓梯→集合點' }, { row: 2, col: 2, value: '3樓→緊急逃生梯→集合點' }, { row: 2, col: 3, value: '主樓梯阻斷' }, { row: 2, col: 4, value: '使用等待救援空間待援' }, { row: 2, col: 5, value: '每半年' }, { row: 2, col: 6, value: '防火管理人甲' },
      ],
    },
    {
      sheetName: '情境演練評估追蹤表',
      archetype: 'daily-record',
      criteriaIndex: 3,
      columns: [
        { header: '演練日期', width: 110 },
        { header: '演練情境', width: 180 },
        { header: '評估項目', width: 180 },
        { header: '執行狀況', width: 150 },
        { header: '缺失說明', width: 180 },
        { header: '改善措施', width: 180 },
        { header: '追蹤期限', width: 120 },
        { header: '評估人員', width: 100 },
      ],
      prefillCells: [
        { row: 0, col: 0, value: '2025-09-20' }, { row: 0, col: 1, value: '廚房起火疏散' }, { row: 0, col: 2, value: '疏散時間與路線熟悉度' }, { row: 0, col: 3, value: '部分完成' }, { row: 0, col: 4, value: '部分人員不熟替代路線' }, { row: 0, col: 5, value: '加強路線指示及訓練' }, { row: 0, col: 6, value: '2025-10-20' }, { row: 0, col: 7, value: '防火管理人甲' },
        { row: 1, col: 0, value: '2025-10-15' }, { row: 1, col: 1, value: '寢室起火夜間疏散' }, { row: 1, col: 2, value: '夜班人員反應時間' }, { row: 1, col: 3, value: '良好' }, { row: 1, col: 4, value: '無' }, { row: 1, col: 5, value: '維持現況' }, { row: 1, col: 6, value: '無' }, { row: 1, col: 7, value: '防火管理人甲' },
        { row: 2, col: 0, value: '2025-11-20' }, { row: 2, col: 1, value: '護理站起火等待救援' }, { row: 2, col: 2, value: '等待救援空間知悉度' }, { row: 2, col: 3, value: '完成' }, { row: 2, col: 4, value: '無' }, { row: 2, col: 5, value: '無' }, { row: 2, col: 6, value: '無' }, { row: 2, col: 7, value: '防火管理人甲' },
      ],
    },
  ],

  /** 52. C14 疏散避難通道及設施維護 */
  52: [
    {
      sheetName: '疏散通道及設施月巡查表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      columns: [
        { header: '巡查日期', width: 100 },
        { header: '巡查區域', width: 150 },
        { header: '巡查項目', width: 200 },
        { header: '符合', width: 70 },
        { header: '不符合', width: 80 },
        { header: '缺失說明', width: 180 },
        { header: '改善措施', width: 180 },
        { header: '巡查人員', width: 100 },
      ],
      prefillCells: [
        { row: 0, col: 0, value: '2025-11-01' }, { row: 0, col: 1, value: '主走廊' }, { row: 0, col: 2, value: '通道無障礙物阻擋' }, { row: 0, col: 3, value: '是' }, { row: 0, col: 4, value: '' }, { row: 0, col: 5, value: '無' }, { row: 0, col: 6, value: '無' }, { row: 0, col: 7, value: '防火管理人甲' },
        { row: 1, col: 0, value: '2025-11-01' }, { row: 1, col: 1, value: '緊急出口' }, { row: 1, col: 2, value: '緊急出口可正常開啟' }, { row: 1, col: 3, value: '是' }, { row: 1, col: 4, value: '' }, { row: 1, col: 5, value: '無' }, { row: 1, col: 6, value: '無' }, { row: 1, col: 7, value: '防火管理人甲' },
        { row: 2, col: 0, value: '2025-11-01' }, { row: 2, col: 1, value: '逃生梯' }, { row: 2, col: 2, value: '逃生梯照明充足' }, { row: 2, col: 3, value: '' }, { row: 2, col: 4, value: '是' }, { row: 2, col: 5, value: '逃生梯2號燈管故障' }, { row: 2, col: 6, value: '更換燈管' }, { row: 2, col: 7, value: '防火管理人乙' },
      ],
    },
  ],

  /** 53. C15 物理環境安全及無障礙設施 */
  53: [
    {
      sheetName: '物理環境安全巡查表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      columns: [
        { header: '巡查日期', width: 100 },
        { header: '巡查區域', width: 150 },
        { header: '巡查項目', width: 200 },
        { header: '符合', width: 70 },
        { header: '不符合', width: 80 },
        { header: '缺失說明', width: 180 },
        { header: '改善措施', width: 180 },
        { header: '巡查人員', width: 100 },
      ],
      prefillCells: [
        { row: 0, col: 0, value: '2025-11-01' }, { row: 0, col: 1, value: '大廳' }, { row: 0, col: 2, value: '無障礙停車位及坡道設置' }, { row: 0, col: 3, value: '是' }, { row: 0, col: 4, value: '' }, { row: 0, col: 5, value: '無' }, { row: 0, col: 6, value: '無' }, { row: 0, col: 7, value: '行政人員甲' },
        { row: 1, col: 0, value: '2025-11-01' }, { row: 1, col: 1, value: '走廊' }, { row: 1, col: 2, value: '走廊扶手連續完整' }, { row: 1, col: 3, value: '' }, { row: 1, col: 4, value: '是' }, { row: 1, col: 5, value: '3樓走廊扶手中段鬆動' }, { row: 1, col: 6, value: '聯絡廠商固定' }, { row: 1, col: 7, value: '行政人員甲' },
        { row: 2, col: 0, value: '2025-11-01' }, { row: 2, col: 1, value: '活動室' }, { row: 2, col: 2, value: '桌椅高度適當，無突出物' }, { row: 2, col: 3, value: '是' }, { row: 2, col: 4, value: '' }, { row: 2, col: 5, value: '無' }, { row: 2, col: 6, value: '無' }, { row: 2, col: 7, value: '行政人員乙' },
      ],
    },
  ],

  /** 59. D5 服務對象自主選擇及參與決策 */
  59: [
    {
      sheetName: '服務對象日常自主選擇紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '紀錄日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '自主選擇類別', width: 150 },
        { header: '選擇內容', width: 200 },
        { header: '協助方式', width: 160 },
        { header: '個案反應', width: 160 },
        { header: '紀錄人員', width: 100 },
      ],
      prefillCells: [
        { row: 0, col: 0, value: '2025-11-01' }, { row: 0, col: 1, value: '個案甲' }, { row: 0, col: 2, value: '活動選擇' }, { row: 0, col: 3, value: '選擇參加念佛活動而非運動操' }, { row: 0, col: 4, value: '提供選項，尊重決定' }, { row: 0, col: 5, value: '情緒愉悅' }, { row: 0, col: 6, value: '社工師甲' },
        { row: 1, col: 0, value: '2025-11-01' }, { row: 1, col: 1, value: '個案乙' }, { row: 1, col: 2, value: '飲食選擇' }, { row: 1, col: 3, value: '選擇素食餐點' }, { row: 1, col: 4, value: '告知廚房配合調整' }, { row: 1, col: 5, value: '滿意' }, { row: 1, col: 6, value: '照服員乙' },
        { row: 2, col: 0, value: '2025-11-01' }, { row: 2, col: 1, value: '個案丙' }, { row: 2, col: 2, value: '作息選擇' }, { row: 2, col: 3, value: '選擇晚間10點就寢' }, { row: 2, col: 4, value: '調整照護時間配合' }, { row: 2, col: 5, value: '配合良好' }, { row: 2, col: 6, value: '照服員丙' },
      ],
    },
    {
      sheetName: '醫療決定知情同意紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 2,
      columns: [
        { header: '紀錄日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '決定事項', width: 180 },
        { header: '告知內容摘要', width: 220 },
        { header: '同意人（本人/代理）', width: 160 },
        { header: '同意方式', width: 130 },
        { header: '紀錄人員', width: 100 },
      ],
      prefillCells: [
        { row: 0, col: 0, value: '2025-09-15' }, { row: 0, col: 1, value: '個案甲' }, { row: 0, col: 2, value: '外科手術同意' }, { row: 0, col: 3, value: '說明手術風險、替代方案及預後' }, { row: 0, col: 4, value: '家屬（代理）' }, { row: 0, col: 5, value: '書面同意書' }, { row: 0, col: 6, value: '社工師甲' },
        { row: 1, col: 0, value: '2025-10-10' }, { row: 1, col: 1, value: '個案乙' }, { row: 1, col: 2, value: '管路置放同意' }, { row: 1, col: 3, value: '說明鼻胃管目的及替代照護方式' }, { row: 1, col: 4, value: '本人' }, { row: 1, col: 5, value: '口頭同意並紀錄' }, { row: 1, col: 6, value: '護理師乙' },
        { row: 2, col: 0, value: '2025-11-20' }, { row: 2, col: 1, value: '個案丙' }, { row: 2, col: 2, value: '疫苗接種同意' }, { row: 2, col: 3, value: '說明流感疫苗效益及副作用' }, { row: 2, col: 4, value: '本人' }, { row: 2, col: 5, value: '書面同意書' }, { row: 2, col: 6, value: '護理師丙' },
      ],
    },
  ],

  /** 60. D6 服務對象居家情境及監視設備管理 */
  60: [
    {
      sheetName: '監視設備設置告知同意紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      columns: [
        { header: '告知日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '家屬姓名', width: 110 },
        { header: '設備位置', width: 160 },
        { header: '告知內容摘要', width: 220 },
        { header: '同意方式', width: 130 },
        { header: '紀錄人員', width: 100 },
      ],
      prefillCells: [
        { row: 0, col: 0, value: '2025-09-15' }, { row: 0, col: 1, value: '個案甲' }, { row: 0, col: 2, value: '家屬甲' }, { row: 0, col: 3, value: '走廊及公共空間' }, { row: 0, col: 4, value: '說明監視設備目的、拍攝範圍及資料保存方式' }, { row: 0, col: 5, value: '書面同意書' }, { row: 0, col: 6, value: '社工師甲' },
        { row: 1, col: 0, value: '2025-10-10' }, { row: 1, col: 1, value: '個案乙' }, { row: 1, col: 2, value: '家屬乙' }, { row: 1, col: 3, value: '護理站及走廊' }, { row: 1, col: 4, value: '說明監視目的為安全維護，不涉及私人空間' }, { row: 1, col: 5, value: '書面同意書' }, { row: 1, col: 6, value: '社工師乙' },
        { row: 2, col: 0, value: '2025-11-20' }, { row: 2, col: 1, value: '個案丙' }, { row: 2, col: 2, value: '家屬丙' }, { row: 2, col: 3, value: '活動室及餐廳' }, { row: 2, col: 4, value: '說明資料保存期限及查閱方式' }, { row: 2, col: 5, value: '口頭同意並紀錄' }, { row: 2, col: 6, value: '社工師丙' },
      ],
    },
  ],

};
