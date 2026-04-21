/**
 * 日間照顧中心評鑑補充文件定義
 * 115年度臺北市政府社會局日間照顧機構評鑑基準（43項 + 2加分題）
 *
 * 每個評鑑項目除「檢核表」外，額外提供對應的實務文件範本。
 * 純行為性標準（如「現場觀察」）不產生文件，故不列入。
 */
import type { SupplementaryDefsMap } from '../supplementary-sheet-types';

export const daycareDefs: SupplementaryDefsMap = {

  // ── 壹、個案權益保障 ──────────────────────────────────────────────────────

  /** 1. 服務資訊公開 */
  1: [
    {
      sheetName: '服務資訊公開核對表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      columns: [
        { header: '應公開事項', width: 220 },
        { header: '實體公告', width: 80 },
        { header: '網路平台', width: 80 },
        { header: '最近更新日期', width: 110 },
        { header: '說明/連結', width: 200 },
        { header: '負責人員', width: 100 },
      ],
    },
    // [補] 第 1 條 criteria 0：法規暗示 7 項應公告事項，預填供機構逐項勾填
    {
      sheetName: '[補] 常見應公告事項清單',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 8,
      prefillCells: [
        { row: 0, col: 0, value: '機構簡介（宗旨、服務對象、服務項目）' },
        { row: 1, col: 0, value: '收費標準（月費/日費/部分負擔）' },
        { row: 2, col: 0, value: '人員配置（照服員、社工、護理、OT/PT 等）' },
        { row: 3, col: 0, value: '服務時間與交通接送說明' },
        { row: 4, col: 0, value: '聯絡方式（電話、地址、Email）' },
        { row: 5, col: 0, value: '活動訊息（近期/月度）' },
        { row: 6, col: 0, value: '申訴/意見反映管道' },
      ],
      columns: [
        { header: '應公告事項', width: 220 },
        { header: '實體公告（位置）', width: 160 },
        { header: '網路平台連結', width: 200 },
        { header: '最近更新日期', width: 130 },
        { header: '負責人員', width: 110 },
      ],
    },
    // [補] 第 1 條 criteria 3：設有其他宣傳方式，記錄活動辦理情形
    {
      sheetName: '[補] 宣傳活動辦理紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 3,
      prefillRows: 6,
      columns: [
        { header: '活動/宣傳日期', width: 120 },
        { header: '宣傳主題', width: 180 },
        { header: '宣傳形式（實體活動/社區講座/媒體/DM/其他）', width: 260 },
        { header: '通路/地點', width: 160 },
        { header: '觸及對象（長者/家屬/社區/轉介單位）', width: 200 },
        { header: '成效觀察（報名人數/回饋）', width: 200 },
        { header: '主辦人員', width: 100 },
      ],
    },
  ],

  /** 2. 意見反應/申訴機制的訂定與處理情形 */
  2: [
    {
      sheetName: '申訴意見受理暨處理記錄表',
      archetype: 'incident-log',
      criteriaIndex: 1,
      columns: [
        { header: '受理日期', width: 100 },
        { header: '申訴人', width: 100 },
        { header: '申訴方式', width: 100 },
        { header: '申訴內容摘要', width: 260 },
        { header: '處理措施', width: 200 },
        { header: '回覆日期', width: 100 },
        { header: '申訴人滿意', width: 100 },
        { header: '承辦人', width: 90 },
      ],
    },
    {
      sheetName: '意見反應季度彙整分析表',
      archetype: 'inspection-checklist',
      criteriaIndex: 3,
      columns: [
        { header: '季度', width: 80 },
        { header: '意見類別', width: 140 },
        { header: '件數', width: 80 },
        { header: '主要問題摘要', width: 220 },
        { header: '改善措施', width: 220 },
        { header: '追蹤結果', width: 160 },
        { header: '彙整人員', width: 100 },
      ],
    },
    // [補] 第 2 條 criteria 2：每季彙整分析，即使無申訴也要填
    {
      sheetName: '[補] 每季彙整檢核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 2,
      prefillRows: 4,
      prefillCells: [
        { row: 0, col: 0, value: 'Q1' },
        { row: 1, col: 0, value: 'Q2' },
        { row: 2, col: 0, value: 'Q3' },
        { row: 3, col: 0, value: 'Q4' },
      ],
      columns: [
        { header: '季度', width: 80 },
        { header: '是否辦理彙整', width: 120 },
        { header: '彙整日期', width: 110 },
        { header: '申訴案件數', width: 110 },
        { header: '無案件說明（仍需彙整查核）', width: 220 },
        { header: '彙整人員', width: 110 },
        { header: '主管核章', width: 100 },
      ],
    },
    // [補] 第 2 條 criteria 0：申訴辦法書面化版本管控
    {
      sheetName: '[補] 申訴辦法版本管控表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 5,
      columns: [
        { header: '辦法版次', width: 100 },
        { header: '修訂日期', width: 110 },
        { header: '修訂章節/內容', width: 260 },
        { header: '修訂原因', width: 180 },
        { header: '修訂人員', width: 110 },
        { header: '主管核章', width: 100 },
        { header: '員工教育訓練日期', width: 140 },
      ],
    },
    // [補] 第 2 條 criteria 0：申訴管道於入案說明、服務合約、公告欄三處呈現
    {
      sheetName: '[補] 申訴管道公告揭示檢核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: '入案說明文件' },
        { row: 1, col: 0, value: '服務合約條款' },
        { row: 2, col: 0, value: '機構公告欄（實體）' },
        { row: 3, col: 0, value: '官方網站' },
        { row: 4, col: 0, value: 'LINE 官方帳號/社群媒體' },
      ],
      columns: [
        { header: '揭示位置', width: 180 },
        { header: '揭示形式', width: 180 },
        { header: '最近更新日期', width: 130 },
        { header: '最近檢視日期', width: 130 },
        { header: '完整性確認', width: 110 },
        { header: '負責人員', width: 110 },
      ],
    },
    // [補] 第 2 條 criteria 3：有改善方案，個別追蹤每案執行進度
    {
      sheetName: '[補] 改善方案執行追蹤表',
      archetype: 'inspection-checklist',
      criteriaIndex: 3,
      prefillRows: 6,
      columns: [
        { header: '改善方案編號', width: 120 },
        { header: '來源（案件編號/季彙整）', width: 180 },
        { header: '改善目標', width: 200 },
        { header: '負責人員', width: 110 },
        { header: '預計完成日期', width: 130 },
        { header: '實際完成日期', width: 130 },
        { header: '成效驗證/佐證', width: 220 },
        { header: '是否結案', width: 100 },
        { header: '備註', width: 160 },
      ],
    },
  ],

  /** 3. 服務契約簽訂情形 */
  3: [
    {
      sheetName: '服務契約簽訂查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 5,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '契約簽訂日期', width: 120 },
        { header: '使用版本（社會局核定）', width: 180 },
        { header: '審閱期3日確認', width: 130 },
        { header: '家屬/代理人簽名', width: 140 },
        { header: '服務費用告知', width: 120 },
        { header: '備註', width: 150 },
      ],
    },
    // [補] 第 3 條 criteria 2：確實告知，預填 7 項告知事項
    {
      sheetName: '[補] 契約告知項目檢核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 2,
      prefillRows: 7,
      prefillCells: [
        { row: 0, col: 0, value: '雙方權利與義務' },
        { row: 1, col: 0, value: '申訴管道' },
        { row: 2, col: 0, value: '收費標準與方式' },
        { row: 3, col: 0, value: '服務項目（含附件四）' },
        { row: 4, col: 0, value: '緊急事故處理（附件五）' },
        { row: 5, col: 0, value: '肖像權/個資授權（附件一、二）' },
        { row: 6, col: 0, value: '審閱期與解約條款' },
      ],
      columns: [
        { header: '告知事項', width: 220 },
        { header: '個案姓名', width: 110 },
        { header: '告知日期', width: 110 },
        { header: '口頭說明', width: 90 },
        { header: '書面確認', width: 90 },
        { header: '家屬/代理人簽名', width: 140 },
        { header: '承辦人', width: 100 },
      ],
    },
    // [補] 第 3 條 criteria 1：審閱期 ≥3 日，逐案簽收紀錄
    {
      sheetName: '[補] 契約審閱期簽收紀錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
      prefillRows: 5,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '契約交付日期', width: 120 },
        { header: '家屬/代理人簽收簽名', width: 170 },
        { header: '審閱期起算日', width: 130 },
        { header: '審閱期截止日', width: 130 },
        { header: '實際簽約日期', width: 130 },
        { header: '是否達 3 日', width: 110 },
        { header: '逾期/提前說明', width: 180 },
        { header: '承辦人', width: 100 },
      ],
    },
    // [補] 第 3 條 criteria 3：採用衛福部定型化契約版本管控
    {
      sheetName: '[補] 衛福部定型化契約版本管控表',
      archetype: 'inspection-checklist',
      criteriaIndex: 3,
      prefillRows: 5,
      columns: [
        { header: '契約版本名稱', width: 220 },
        { header: '衛福部公告日期', width: 140 },
        { header: '機構啟用日期', width: 130 },
        { header: '是否為最新版本', width: 130 },
        { header: '汰換舊版紀錄', width: 180 },
        { header: '法規連結/公文字號', width: 200 },
        { header: '核備人員', width: 100 },
      ],
    },
  ],

  /** 4. 個人資料管理與保密性 */
  4: [
    {
      sheetName: '個案資料借閱登記表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      columns: [
        { header: '日期', width: 100 },
        { header: '借閱人姓名', width: 110 },
        { header: '借閱目的', width: 180 },
        { header: '借閱項目', width: 180 },
        { header: '歸還日期', width: 100 },
        { header: '主管核准', width: 100 },
      ],
    },
    {
      sheetName: '影像肖像權同意書',
      archetype: 'case-assessment',
      criteriaIndex: 2,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '同意使用範圍（評鑑/宣傳/社媒）', width: 260 },
        { header: '不同意事項', width: 180 },
        { header: '同意日期', width: 100 },
        { header: '個案/家屬簽名', width: 130 },
      ],
    },
    // [補] 第 4 條 criteria 0：個資管理規定版本管控
    {
      sheetName: '[補] 個資管理規定版本管控表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 5,
      columns: [
        { header: '規定/辦法名稱', width: 220 },
        { header: '版次', width: 80 },
        { header: '修訂日期', width: 110 },
        { header: '修訂章節/內容', width: 240 },
        { header: '修訂原因', width: 180 },
        { header: '主管核章', width: 100 },
        { header: '員工教育訓練日期', width: 140 },
      ],
    },
    // [補] 第 4 條 criteria 3：電腦化資料使用者權限管理
    {
      sheetName: '[補] 電腦化資料權限管理表',
      archetype: 'inspection-checklist',
      criteriaIndex: 3,
      prefillRows: 10,
      columns: [
        { header: '系統/資料夾名稱', width: 200 },
        { header: '使用者姓名', width: 110 },
        { header: '職稱', width: 110 },
        { header: '權限等級（讀/寫/管理）', width: 160 },
        { header: '帳號建立日期', width: 130 },
        { header: '最近密碼更新日期', width: 150 },
        { header: '離職停用日期', width: 130 },
        { header: '稽核備註', width: 160 },
      ],
    },
    // [補] 第 4 條 criteria 2：個案資料保管設備查核
    {
      sheetName: '[補] 資料保管設備查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 2,
      prefillRows: 6,
      columns: [
        { header: '保管設備名稱（櫃位/檔案室）', width: 220 },
        { header: '存放位置', width: 160 },
        { header: '上鎖方式', width: 140 },
        { header: '鑰匙/密碼保管人', width: 160 },
        { header: '防火措施', width: 130 },
        { header: '防水措施', width: 130 },
        { header: '最近查核日期', width: 130 },
        { header: '查核人員', width: 100 },
      ],
    },
  ],

  // ── 貳、專業照護品質 ──────────────────────────────────────────────────────

  /** 5. 服務對象評估 */
  5: [
    {
      sheetName: '服務對象需求評估表',
      archetype: 'case-assessment',
      criteriaIndex: 0,
      prefillRows: 3,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '評估日期', width: 100 },
        { header: '評估工具（ADL/IADL/MMSE）', width: 200 },
        { header: '評估結果摘要', width: 180 },
        { header: '主要照護需求', width: 180 },
        { header: '評估人員簽名', width: 120 },
      ],
    },
    {
      sheetName: '定期重新評估追蹤表',
      archetype: 'daily-record',
      criteriaIndex: 3,
      prefillRows: 6,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '重評日期', width: 100 },
        { header: '評估工具', width: 120 },
        { header: '本次評估結果', width: 160 },
        { header: '與前次比較', width: 140 },
        { header: '計畫調整說明', width: 180 },
        { header: '評估人員', width: 100 },
      ],
    },
    // [補] 第 5 條 criteria 2：至少每 6 個月重評一次，逾期監控
    {
      sheetName: '[補] 6個月重評到期監控表',
      archetype: 'inspection-checklist',
      criteriaIndex: 2,
      prefillRows: 10,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '上次評估日期', width: 130 },
        { header: '下次到期日（+6個月）', width: 170 },
        { header: '實際重評日期', width: 130 },
        { header: '是否逾期', width: 90 },
        { header: '逾期原因/補救', width: 200 },
        { header: '特殊狀況重評（非定期）', width: 180 },
        { header: '負責社工', width: 110 },
      ],
    },
    // [補] 第 5 條 criteria 0：身心及社會資源評估
    {
      sheetName: '[補] 社會資源評估表',
      archetype: 'case-assessment',
      criteriaIndex: 0,
      prefillRows: 5,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '評估日期', width: 110 },
        { header: '家庭結構/同住者', width: 180 },
        { header: '經濟狀況（收入/補助）', width: 180 },
        { header: '社福身分（低收/中低收/身障/榮民）', width: 220 },
        { header: '支持網絡（主要照顧者/親友）', width: 200 },
        { header: '輔具需求與取得', width: 160 },
        { header: '交通資源', width: 140 },
        { header: '評估人員', width: 110 },
      ],
    },
    // [補] 第 5 條 criteria 1：依評估確立問題，建立優先順序
    {
      sheetName: '[補] 個案問題清單與優先序表',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
      prefillRows: 8,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '問題類別（身體/心理/社會/認知）', width: 220 },
        { header: '問題描述', width: 240 },
        { header: '評估來源（工具/訪談/觀察）', width: 180 },
        { header: '優先順序', width: 100 },
        { header: '處遇方向', width: 200 },
        { header: '評估人員', width: 110 },
      ],
    },
  ],

  /** 6. 照顧計畫 */
  6: [
    {
      sheetName: '個別照顧計畫書(ICP)',
      archetype: 'care-plan',
      criteriaIndex: 0,
      prefillRows: 3,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '計畫日期', width: 100 },
        { header: '照護問題/需求', width: 180 },
        { header: '照護目標', width: 170 },
        { header: '服務內容', width: 200 },
        { header: '負責人員', width: 100 },
        { header: '個案意見採納說明', width: 160 },
        { header: '家屬同意日期', width: 120 },
      ],
    },
    // [補] 法規第 6 項 criteria 1：照顧計畫需於評估後 7 個工作天內完成
    {
      sheetName: '[補] 照顧計畫7日完成檢核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '評估完成日期', width: 120 },
        { header: '照顧計畫完成日期', width: 140 },
        { header: '間隔工作天數', width: 130 },
        { header: '是否符合7日內', width: 130 },
        { header: '逾期說明/改善措施', width: 220 },
        { header: '負責社工', width: 100 },
      ],
    },
    // [補] 第 6 條 criteria 1：照顧計畫需與評估結果一致
    {
      sheetName: '[補] 評估↔計畫一致性對照表',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
      prefillRows: 6,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '評估確立的問題', width: 220 },
        { header: '對應計畫目標', width: 220 },
        { header: '對應服務項目', width: 220 },
        { header: '一致性確認', width: 120 },
        { header: '差異說明', width: 200 },
        { header: '確認人員', width: 110 },
      ],
    },
    // [補] 第 6 條 criteria 2：含家屬共同執行服務內容
    {
      sheetName: '[補] 家屬共同執行分工表',
      archetype: 'inspection-checklist',
      criteriaIndex: 2,
      prefillRows: 5,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '主要照顧者姓名/關係', width: 180 },
        { header: '家屬負責服務項目', width: 220 },
        { header: '執行頻率', width: 130 },
        { header: '機構教導紀錄日期', width: 150 },
        { header: '獨居/無案家（免給分說明）', width: 200 },
        { header: '社工確認', width: 110 },
      ],
    },
  ],

  /** 7. 追蹤評值 */
  7: [
    {
      sheetName: '照顧計畫執行紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '執行服務項目', width: 200 },
        { header: '執行情形', width: 160 },
        { header: '個案反應', width: 150 },
        { header: '記錄人員', width: 100 },
      ],
    },
    {
      sheetName: '照顧計畫評值記錄表',
      archetype: 'case-assessment',
      criteriaIndex: 2,
      prefillRows: 4,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '評值日期', width: 100 },
        { header: '目標達成情形', width: 180 },
        { header: '未達成原因', width: 160 },
        { header: '計畫調整內容', width: 200 },
        { header: '評值人員', width: 100 },
      ],
    },
    // [補] 第 7 條 criteria 0：量化追蹤目標達成率
    {
      sheetName: '[補] 目標達成率量化追蹤表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '照顧目標', width: 220 },
        { header: '量測指標', width: 160 },
        { header: '基期值（計畫訂定時）', width: 150 },
        { header: '本次評值值', width: 120 },
        { header: '達成率(%)', width: 100 },
        { header: '未達成原因分析', width: 220 },
        { header: '評值人員', width: 110 },
      ],
    },
  ],

  /** 8. 服務對象研討辦理情形 */
  8: [
    {
      sheetName: '服務對象研討會議記錄',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 4,
      columns: [
        { header: '研討日期', width: 100 },
        { header: '討論個案', width: 110 },
        { header: '出席人員', width: 160 },
        { header: '討論議題', width: 200 },
        { header: '結論與決議', width: 220 },
        { header: '後續追蹤', width: 160 },
        { header: '記錄人員', width: 100 },
      ],
    },
    // [補] 法規第 8 項 criteria 2：每季跨專業個案討論會；criteria 3：前次決議追蹤
    {
      sheetName: '[補] 跨專業討論季度檢核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
      prefillRows: 4,
      columns: [
        { header: '季度', width: 80 },
        { header: '討論日期', width: 100 },
        { header: '出席專業別（社工/護理/照服/OT…）', width: 240 },
        { header: '討論個案數', width: 100 },
        { header: '前次決議追蹤摘要', width: 240 },
        { header: '本次結論', width: 200 },
        { header: '紀錄人員', width: 100 },
      ],
    },
    // [補] 第 8 條 criteria 0：個案討論會簽到，確認出席紀錄
    {
      sheetName: '[補] 個案討論會簽到表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '討論日期', width: 100 },
        { header: '討論個案', width: 110 },
        { header: '出席人員姓名', width: 130 },
        { header: '職稱/專業別', width: 140 },
        { header: '出席/請假', width: 100 },
        { header: '簽名', width: 120 },
        { header: '備註', width: 160 },
      ],
    },
  ],

  /** 9. 督導機制辦理情形 */
  9: [
    {
      sheetName: '督導記錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 6,
      columns: [
        { header: '督導日期', width: 100 },
        { header: '督導者', width: 100 },
        { header: '受督人員', width: 110 },
        { header: '督導方式', width: 100 },
        { header: '督導內容摘要', width: 240 },
        { header: '改善事項', width: 200 },
        { header: '後續追蹤', width: 160 },
      ],
    },
    // [補] 法規第 9 項 criteria 1-2：每半年個督 1 次、每季團督 1 次（需驗證每位員工頻率）
    {
      sheetName: '[補] 督導頻率半年季彙整表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '員工姓名', width: 110 },
        { header: '職稱', width: 110 },
        { header: '個督次數（上半年）', width: 140 },
        { header: '個督次數（下半年）', width: 140 },
        { header: '是否達半年1次', width: 130 },
        { header: '團督次數（Q1-Q4）', width: 140 },
        { header: '是否達每季1次', width: 130 },
        { header: '備註', width: 140 },
      ],
    },
    // [補] 第 9 條 criteria 2：督導討論主題分類統計，檢視主題分布
    {
      sheetName: '[補] 督導討論主題分類統計表',
      archetype: 'inspection-checklist',
      criteriaIndex: 2,
      prefillRows: 8,
      prefillCells: [
        { row: 0, col: 0, value: '照護品質議題' },
        { row: 1, col: 0, value: '個案問題處理' },
        { row: 2, col: 0, value: '專業知能提升' },
        { row: 3, col: 0, value: '團隊合作/溝通' },
        { row: 4, col: 0, value: '倫理議題' },
        { row: 5, col: 0, value: '情緒支持/壓力紓解' },
        { row: 6, col: 0, value: '行政/人事議題' },
        { row: 7, col: 0, value: '其他' },
      ],
      columns: [
        { header: '主題類別', width: 180 },
        { header: '上半年次數', width: 110 },
        { header: '下半年次數', width: 110 },
        { header: '年度總次數', width: 110 },
        { header: '佔比(%)', width: 90 },
        { header: '代表性討論摘要', width: 260 },
        { header: '主管', width: 100 },
      ],
    },
  ],

  /** 10. 開案/收案、轉介、暫停服務與結案相關辦法 */
  10: [
    {
      sheetName: '個案服務歷程紀錄表',
      archetype: 'case-assessment',
      criteriaIndex: 0,
      prefillRows: 4,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '開案日期', width: 100 },
        { header: '收案/轉介/暫停/結案', width: 160 },
        { header: '事由', width: 200 },
        { header: '後續服務安排', width: 200 },
        { header: '家屬通知日期', width: 120 },
        { header: '承辦社工', width: 100 },
      ],
    },
    // [補] 第 10 條 criteria 0：收案結案辦法書面化版本管控
    {
      sheetName: '[補] 收案結案辦法版本管控表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 5,
      columns: [
        { header: '辦法名稱', width: 240 },
        { header: '版次', width: 80 },
        { header: '修訂日期', width: 110 },
        { header: '修訂章節/內容', width: 240 },
        { header: '修訂原因', width: 180 },
        { header: '主管核章', width: 100 },
        { header: '員工教育訓練日期', width: 140 },
      ],
    },
    // [補] 第 10 條 criteria 1：家屬說明確認，逐案紀錄
    {
      sheetName: '[補] 家屬說明確認紀錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
      prefillRows: 5,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '事件類別（開案/轉介/暫停/結案）', width: 220 },
        { header: '說明日期', width: 110 },
        { header: '說明方式（面談/電話/書面）', width: 180 },
        { header: '說明內容摘要', width: 240 },
        { header: '家屬理解確認', width: 120 },
        { header: '家屬簽名', width: 120 },
        { header: '承辦社工', width: 110 },
      ],
    },
    // [補] 第 10 條 criteria 2：轉介/結案後追蹤，記錄後續安排
    {
      sheetName: '[補] 轉介結案後續追蹤表',
      archetype: 'inspection-checklist',
      criteriaIndex: 2,
      prefillRows: 6,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '結案/轉介日期', width: 130 },
        { header: '後續安排（轉介機構/家屬照顧）', width: 220 },
        { header: '追蹤日期 1', width: 110 },
        { header: '追蹤結果 1', width: 200 },
        { header: '追蹤日期 2', width: 110 },
        { header: '追蹤結果 2', width: 200 },
        { header: '承辦社工', width: 110 },
      ],
    },
    // [補] 第 10 條 criteria 3：結案紀錄保存 7 年，稽核歸檔完整性
    {
      sheetName: '[補] 結案紀錄7年歸檔稽核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 3,
      prefillRows: 10,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '結案日期', width: 110 },
        { header: '歸檔完成日期', width: 130 },
        { header: '保存截止日（+7年）', width: 160 },
        { header: '存放位置（紙本/電子）', width: 180 },
        { header: '檔案完整性確認', width: 140 },
        { header: '最近稽核日期', width: 130 },
        { header: '稽核人員', width: 110 },
      ],
    },
  ],

  /** 11. 維持自我照顧能力 */
  11: [
    {
      sheetName: '自我照顧能力促進紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '促進項目（進食/穿衣/如廁/移位）', width: 240 },
        { header: '個案自理程度', width: 140 },
        { header: '協助方式', width: 150 },
        { header: '進步情形', width: 140 },
        { header: '記錄人員', width: 100 },
      ],
    },
    // [補] 第 11 條 criteria 2：自我照顧能力週期性變化評估
    {
      sheetName: '[補] 自我照顧能力週期變化評估表',
      archetype: 'inspection-checklist',
      criteriaIndex: 2,
      prefillRows: 6,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '評估週期（Q/半年/年）', width: 160 },
        { header: '評估日期', width: 110 },
        { header: '進食自理程度', width: 130 },
        { header: '穿衣自理程度', width: 130 },
        { header: '如廁自理程度', width: 130 },
        { header: '移位自理程度', width: 130 },
        { header: '相較前期變化（進步/持平/退化）', width: 200 },
        { header: '評估人員', width: 110 },
      ],
    },
  ],

  /** 12. 協助服藥 */
  12: [
    {
      sheetName: '個案用藥管理記錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '藥品名稱', width: 160 },
        { header: '劑量', width: 80 },
        { header: '給藥時間', width: 100 },
        { header: '給藥人員', width: 100 },
        { header: '個案服藥情形', width: 140 },
        { header: '異常說明', width: 160 },
      ],
    },
    {
      sheetName: '藥物儲存環境溫度記錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 2,
      columns: [
        { header: '日期', width: 100 },
        { header: '冷藏溫度(°C)', width: 120 },
        { header: '室溫藥品存放環境', width: 160 },
        { header: '符合規定', width: 90 },
        { header: '異常說明', width: 160 },
        { header: '記錄人員', width: 100 },
      ],
    },
    // [補] 第 12 條 criteria 0：協助服藥規定版本管控
    {
      sheetName: '[補] 協助服藥規定版本管控表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 5,
      columns: [
        { header: '規定名稱', width: 240 },
        { header: '版次', width: 80 },
        { header: '修訂日期', width: 110 },
        { header: '修訂章節/內容', width: 240 },
        { header: '修訂原因', width: 180 },
        { header: '主管核章', width: 100 },
        { header: '員工教育訓練日期', width: 140 },
      ],
    },
    // [補] 第 12 條 criteria 2：人員服藥知能定期檢核
    {
      sheetName: '[補] 人員服藥知能檢核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 2,
      prefillRows: 10,
      columns: [
        { header: '員工姓名', width: 110 },
        { header: '職稱', width: 110 },
        { header: '訓練課程名稱', width: 200 },
        { header: '訓練日期', width: 110 },
        { header: '測驗/觀察評核結果', width: 180 },
        { header: '是否通過', width: 100 },
        { header: '複訓需求', width: 130 },
        { header: '評核人員', width: 110 },
      ],
    },
    // [補] 第 12 條 criteria 1：藥袋/處方箋佐證建檔
    {
      sheetName: '[補] 藥袋處方箋佐證建檔清單',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
      prefillRows: 8,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '處方箋日期', width: 120 },
        { header: '開立醫師/院所', width: 180 },
        { header: '藥品名稱/劑量', width: 200 },
        { header: '藥袋/處方箋影本建檔', width: 180 },
        { header: '存放位置', width: 140 },
        { header: '建檔人員', width: 110 },
      ],
    },
  ],

  /** 13. 服務對象團體活動辦理情形 */
  13: [
    {
      sheetName: '月度團體活動計畫表',
      archetype: 'care-plan',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '活動日期', width: 100 },
        { header: '活動名稱', width: 160 },
        { header: '活動類型（認知/社交/身體/休閒）', width: 240 },
        { header: '適合對象說明', width: 160 },
        { header: '負責人員', width: 110 },
        { header: '所需材料/場地', width: 160 },
      ],
    },
    {
      sheetName: '活動執行暨成效紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 2,
      columns: [
        { header: '活動日期', width: 100 },
        { header: '活動名稱', width: 160 },
        { header: '參與人數', width: 90 },
        { header: '個案反應觀察', width: 200 },
        { header: '執行人員觀察', width: 180 },
        { header: '下次調整建議', width: 180 },
        { header: '記錄人', width: 90 },
      ],
    },
    // [補] 第 13 條 criteria 2：團體活動月度頻率彙整，預填 12 個月
    {
      sheetName: '[補] 團體活動月度頻率彙整表',
      archetype: 'inspection-checklist',
      criteriaIndex: 2,
      prefillRows: 12,
      columns: [
        { header: '月份', width: 80 },
        { header: '團體活動次數', width: 120 },
        { header: '社區活動次數', width: 120 },
        { header: '合計', width: 80 },
        { header: '是否達每月 ≥1 次', width: 140 },
        { header: '紀錄人', width: 100 },
      ],
    },
    // [補] 第 13 條 criteria 3：節慶活動照片建檔，保存活動辦理佐證
    {
      sheetName: '[補] 節慶活動照片建檔表',
      archetype: 'inspection-checklist',
      criteriaIndex: 3,
      prefillRows: 8,
      columns: [
        { header: '活動日期', width: 110 },
        { header: '節慶名稱', width: 160 },
        { header: '活動方案摘要', width: 220 },
        { header: '出席人數', width: 100 },
        { header: '照片檔名/連結', width: 200 },
        { header: '照片數量', width: 100 },
        { header: '建檔人', width: 100 },
      ],
    },
  ],

  /** 14. 安全看視 */
  14: [
    {
      sheetName: '個案安全看視計畫表',
      archetype: 'care-plan',
      criteriaIndex: 0,
      prefillRows: 5,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '風險等級', width: 90 },
        { header: '主要風險因素', width: 200 },
        { header: '看視頻率/方式', width: 160 },
        { header: '特殊注意事項', width: 200 },
        { header: '訂定日期', width: 100 },
        { header: '訂定人員', width: 100 },
      ],
    },
    {
      sheetName: '跌倒事件記錄表',
      archetype: 'incident-log',
      criteriaIndex: 3,
      columns: [
        { header: '發生日期時間', width: 130 },
        { header: '個案姓名', width: 110 },
        { header: '發生地點', width: 120 },
        { header: '事件描述', width: 240 },
        { header: '立即處置', width: 180 },
        { header: '家屬通知時間', width: 130 },
        { header: '後續追蹤', width: 160 },
        { header: '改善措施', width: 160 },
      ],
    },
    // [補] 第 14 條 criteria 0：安全作業規範版本管控
    {
      sheetName: '[補] 安全作業規範版本管控表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 5,
      columns: [
        { header: '規範名稱', width: 220 },
        { header: '版次', width: 80 },
        { header: '修訂日期', width: 110 },
        { header: '修訂章節/內容', width: 240 },
        { header: '員工教育訓練日期', width: 140 },
        { header: '主管核章', width: 100 },
      ],
    },
    // [補] 第 14 條 criteria 2：家屬安全須知告知紀錄
    {
      sheetName: '[補] 家屬安全須知告知紀錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 2,
      prefillRows: 6,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '告知日期', width: 110 },
        { header: '告知內容（跌倒/哽噎/其他風險）', width: 240 },
        { header: '家屬簽名', width: 120 },
        { header: '承辦人', width: 110 },
      ],
    },
  ],

  /** 15. 維護個人清潔衛生 */
  15: [
    {
      sheetName: '個人清潔衛生照護紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '口腔護理', width: 100 },
        { header: '梳洗/盥洗', width: 100 },
        { header: '頭髮整理', width: 100 },
        { header: '協助程度', width: 120 },
        { header: '記錄人員', width: 100 },
      ],
    },
  ],

  /** 16. 提供營養餐點服務 */
  16: [
    {
      sheetName: '每日菜單及熱量記錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '日期', width: 100 },
        { header: '早餐', width: 180 },
        { header: '午餐', width: 200 },
        { header: '點心', width: 150 },
        { header: '預估總熱量(kcal)', width: 140 },
        { header: '供餐來源（自製/委外）', width: 160 },
        { header: '備註', width: 160 },
      ],
    },
    // [補] 第 16 條 criteria 0：個案特殊餐食需求清單
    {
      sheetName: '[補] 個案特殊餐食需求清單',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '餐食限制（糖尿/軟質/低鈉/過敏）', width: 220 },
        { header: '吞嚥等級', width: 110 },
        { header: '偏好忌口', width: 160 },
        { header: '調整日期', width: 110 },
        { header: '營養/護理確認', width: 140 },
      ],
    },
    // [補] 第 16 條 criteria 1：週月菜色多樣性分析，預填 12 週/月
    {
      sheetName: '[補] 週月菜色多樣性分析表',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
      prefillRows: 12,
      columns: [
        { header: '週次/月份', width: 100 },
        { header: '主食變化數', width: 110 },
        { header: '蛋白質來源種類', width: 140 },
        { header: '蔬果色系多樣性', width: 140 },
        { header: '重複率(%)', width: 100 },
        { header: '分析備註', width: 200 },
      ],
    },
  ],

  /** 17. 提供適當之休閒及運動設施 */
  17: [
    {
      sheetName: '休閒運動設施定期維護記錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '設施名稱', width: 160 },
        { header: '最近保養日期', width: 120 },
        { header: '保養項目', width: 200 },
        { header: '功能正常', width: 90 },
        { header: '損壞說明', width: 160 },
        { header: '修繕完成日期', width: 120 },
        { header: '記錄人員', width: 100 },
      ],
    },
  ],

  /** 18. 辦理社會參與 */
  18: [
    {
      sheetName: '社會參與活動紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      prefillRows: 6,
      columns: [
        { header: '活動日期', width: 100 },
        { header: '活動名稱', width: 180 },
        { header: '活動地點', width: 140 },
        { header: '參與個案', width: 200 },
        { header: '安全評估說明', width: 180 },
        { header: '活動成效觀察', width: 200 },
        { header: '帶隊人員', width: 100 },
      ],
    },
    // [補] 第 18 條 criteria 0：戶外團體活動半年頻率，至少每半年 ≥1 次
    {
      sheetName: '[補] 戶外活動半年頻率檢核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 4,
      columns: [
        { header: '半年期（上/下半年）', width: 160 },
        { header: '活動日期', width: 110 },
        { header: '活動名稱', width: 180 },
        { header: '戶外地點', width: 160 },
        { header: '參與人數', width: 100 },
        { header: '是否達半年 ≥1 次', width: 150 },
      ],
    },
    // [補] 第 18 條 criteria 2：個案社交適應評估
    {
      sheetName: '[補] 個案社交適應評估表',
      archetype: 'case-assessment',
      criteriaIndex: 2,
      prefillRows: 8,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '活動名稱', width: 160 },
        { header: '參與程度（主動/被動/拒絕）', width: 200 },
        { header: '互動觀察', width: 180 },
        { header: '適應評估', width: 160 },
        { header: '調整建議', width: 200 },
        { header: '評估人', width: 110 },
      ],
    },
  ],

  /** 19. 提供家屬支持性服務 */
  19: [
    {
      sheetName: '家屬聯繫及服務記錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '聯繫家屬', width: 110 },
        { header: '聯繫方式', width: 100 },
        { header: '溝通內容摘要', width: 240 },
        { header: '家屬反應', width: 160 },
        { header: '後續追蹤', width: 160 },
        { header: '聯繫人員', width: 100 },
      ],
    },
    // [補] 法規第 19 項 criteria 2：每年辦理 2 次活動（區分主動聯繫 vs 活動辦理）
    {
      sheetName: '[補] 年度家屬活動辦理紀錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
      prefillRows: 4,
      columns: [
        { header: '活動日期', width: 100 },
        { header: '活動主題', width: 180 },
        { header: '活動類型（座談/聯誼/教育/其他）', width: 220 },
        { header: '出席家屬人數', width: 120 },
        { header: '活動內容摘要', width: 240 },
        { header: '家屬反應/成效', width: 200 },
        { header: '主辦人員', width: 100 },
      ],
    },
  ],

  /** 20. 服務對象健康檢查及健康管理情形 */
  20: [
    {
      sheetName: '個案年度健康檢查暨追蹤管理表',
      archetype: 'case-assessment',
      criteriaIndex: 0,
      prefillRows: 5,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '健康檢查日期', width: 120 },
        { header: '異常項目', width: 200 },
        { header: '後續處置', width: 180 },
        { header: '家屬告知日期', width: 120 },
        { header: '就醫紀錄', width: 160 },
        { header: '追蹤人員', width: 100 },
      ],
    },
    {
      sheetName: '生命徵象定期記錄表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      columns: [
        { header: '量測日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '血壓(mmHg)', width: 110 },
        { header: '脈搏(次/分)', width: 110 },
        { header: '體溫(°C)', width: 100 },
        { header: '血氧(%)', width: 90 },
        { header: '異常處置', width: 160 },
        { header: '量測人員', width: 100 },
      ],
    },
    {
      // 新入案體檢把關：供護理師審核開案體檢文件，確認傳染病篩檢與慢性病初始數值
      sheetName: '新入案體檢文件審核與異常追蹤表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 6, // 預留列：體檢日期 / 胸部X光 / 傳染病篩檢 / 慢性病數值 / 護理總評 + 備用列
      columns: [
        { header: '審核項目', width: 140 },
        { header: '體檢內容說明', width: 220 },
        { header: '審核結果', width: 110 },
        { header: '異常值追蹤與處置說明', width: 260 },
      ],
    },
    {
      // 日常健康管理：強調「異常後的處置」，為評鑑委員重點翻閱欄位
      sheetName: '日常健康管理與異常處置紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      prefillRows: 8,
      columns: [
        { header: '日期', width: 90 },
        { header: '個案姓名', width: 110 },
        { header: '監測項目', width: 120 },
        { header: '測量數值', width: 110 },
        { header: '數值判斷', width: 100 },
        { header: '異常處置與追蹤', width: 260 },
        { header: '執行人員', width: 110 },
      ],
    },
  ],

  /** 21. 防疫機制建置情形 */
  21: [
    {
      sheetName: '防疫演練紀錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 2,
      prefillRows: 3,
      columns: [
        { header: '演練日期', width: 100 },
        { header: '演練情境', width: 180 },
        { header: '參與人員', width: 180 },
        { header: '演練過程紀錄', width: 240 },
        { header: '缺失項目', width: 180 },
        { header: '改善措施', width: 180 },
        { header: '主辦人員', width: 100 },
      ],
    },
    {
      sheetName: '防疫物資庫存管理表',
      archetype: 'daily-record',
      criteriaIndex: 3,
      columns: [
        { header: '物資名稱', width: 140 },
        { header: '規格', width: 100 },
        { header: '入庫數量', width: 100 },
        { header: '使用數量', width: 100 },
        { header: '現有庫存', width: 100 },
        { header: '最低安全庫存', width: 130 },
        { header: '補貨提醒', width: 100 },
        { header: '記錄日期', width: 100 },
      ],
    },
    // [補] 法規第 21 項 criteria 1：個案體溫每日至少 1 次
    {
      sheetName: '[補] 個案每日體溫量測紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      prefillRows: 20,
      columns: [
        { header: '量測日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '早體溫(°C)', width: 110 },
        { header: '午體溫(°C)', width: 110 },
        { header: '異常（≥37.5°C）', width: 130 },
        { header: '處置說明', width: 200 },
        { header: '量測人員', width: 100 },
      ],
    },
    // [補] 法規第 21 項 criteria 1：工作人員體溫每週至少 1 次
    {
      sheetName: '[補] 員工每週體溫量測紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      prefillRows: 12,
      columns: [
        { header: '量測週次', width: 100 },
        { header: '量測日期', width: 100 },
        { header: '員工姓名', width: 110 },
        { header: '體溫(°C)', width: 100 },
        { header: '異常（≥37.5°C）', width: 130 },
        { header: '處置說明', width: 200 },
        { header: '量測人員', width: 100 },
      ],
    },
    // [補] 法規第 21 項 criteria 2：訪客及陪同人員管理機制
    {
      sheetName: '[補] 訪客及陪同人員管理登記表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      prefillRows: 15,
      columns: [
        { header: '到訪日期', width: 100 },
        { header: '到訪時間', width: 100 },
        { header: '訪客姓名', width: 110 },
        { header: '陪同對象（個案）', width: 140 },
        { header: '與個案關係', width: 110 },
        { header: '體溫(°C)', width: 100 },
        { header: 'TOCC填報', width: 100 },
        { header: '離開時間', width: 100 },
        { header: '管理人員簽章', width: 120 },
      ],
    },
    // [補] 法規第 21 項 criteria 2：配置洗手設施及實施手部衛生作業，定時稽核
    {
      sheetName: '[補] 手部衛生稽核紀錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
      prefillRows: 8,
      columns: [
        { header: '稽核日期', width: 100 },
        { header: '稽核班次', width: 100 },
        { header: '稽核人員', width: 110 },
        { header: '觀察總次數', width: 110 },
        { header: '正確洗手次數', width: 120 },
        { header: '正確率(%)', width: 100 },
        { header: '缺失說明', width: 180 },
        { header: '改善措施', width: 180 },
        { header: '追蹤結果', width: 140 },
      ],
    },
    // [補] 法規第 21 項 criteria 3：制定感染手冊並定期更新
    {
      sheetName: '[補] 感染管制手冊版本管控表',
      archetype: 'inspection-checklist',
      criteriaIndex: 2,
      prefillRows: 6,
      columns: [
        { header: '手冊版次', width: 100 },
        { header: '修訂日期', width: 100 },
        { header: '修訂章節/內容', width: 260 },
        { header: '修訂原因', width: 180 },
        { header: '修訂人員', width: 110 },
        { header: '主管核章', width: 100 },
        { header: '員工教育訓練日期', width: 140 },
      ],
    },
  ],

  /** 22. 執行服務品管指標 */
  22: [
    {
      sheetName: '服務品質指標追蹤分析表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '指標名稱', width: 180 },
        { header: '目標值', width: 90 },
        { header: 'Q1實際值', width: 100 },
        { header: 'Q2實際值', width: 100 },
        { header: 'Q3實際值', width: 100 },
        { header: 'Q4實際值', width: 100 },
        { header: '異常分析', width: 200 },
        { header: '改善行動', width: 200 },
      ],
    },
    // [補] 第 22 條 criteria 2：品管指標異常逐案深入分析
    {
      sheetName: '[補] 品管指標異常逐案分析表',
      archetype: 'inspection-checklist',
      criteriaIndex: 2,
      prefillRows: 10,
      columns: [
        { header: '指標名稱', width: 180 },
        { header: '異常發生日期', width: 130 },
        { header: '當事人/案件', width: 140 },
        { header: '原因分析', width: 220 },
        { header: '立即處置', width: 200 },
        { header: '系統性改善', width: 200 },
        { header: '結案日期', width: 110 },
        { header: '分析人', width: 100 },
      ],
    },
  ],

  // ── 參、經營管理效能 ──────────────────────────────────────────────────────

  /** 23. 業務計畫及營運方針之擬定與執行情形 */
  23: [
    {
      sheetName: '年度業務計畫執行追蹤表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '計畫項目', width: 200 },
        { header: '目標值', width: 100 },
        { header: 'Q1執行情形', width: 130 },
        { header: 'Q2執行情形', width: 130 },
        { header: 'Q3執行情形', width: 130 },
        { header: 'Q4執行情形', width: 130 },
        { header: '未達目標原因', width: 180 },
        { header: '負責人員', width: 100 },
      ],
    },
    // [補] 第 23 條 criteria 1：短中長程計畫檢核，確認各期計畫完整性
    {
      sheetName: '[補] 短中長程計畫檢核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
      prefillRows: 6,
      columns: [
        { header: '計畫類別（短/中/長）', width: 150 },
        { header: '計畫名稱', width: 200 },
        { header: '起訖年度', width: 120 },
        { header: '核心目標', width: 220 },
        { header: '關鍵績效指標', width: 180 },
        { header: '最近檢視日期', width: 130 },
        { header: '主管核章', width: 100 },
      ],
    },
    // [補] 第 23 條 criteria 3：年度成果報告大綱，預填 8 個主要段落
    {
      sheetName: '[補] 年度成果報告大綱',
      archetype: 'inspection-checklist',
      criteriaIndex: 3,
      prefillRows: 8,
      prefillCells: [
        { row: 0, col: 0, value: '服務量統計' },
        { row: 1, col: 0, value: '品質指標成效' },
        { row: 2, col: 0, value: '個案故事' },
        { row: 3, col: 0, value: '財務概況' },
        { row: 4, col: 0, value: '人力變動' },
        { row: 5, col: 0, value: '改善行動' },
        { row: 6, col: 0, value: '未來展望' },
        { row: 7, col: 0, value: '附件' },
      ],
      columns: [
        { header: '段落', width: 160 },
        { header: '涵蓋內容大綱', width: 280 },
        { header: '撰寫人', width: 110 },
        { header: '主管核章', width: 100 },
        { header: '報告頁碼', width: 100 },
      ],
    },
  ],

  /** 24. 工作手冊及行政規範 */
  24: [
    {
      sheetName: '工作手冊暨行政規範核對表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '規範文件名稱', width: 200 },
        { header: '最近版本日期', width: 120 },
        { header: '符合實際作業', width: 120 },
        { header: '員工教育訓練日期', width: 140 },
        { header: '修訂說明', width: 200 },
        { header: '負責人員', width: 100 },
      ],
    },
    // [補] 第 24 條 criteria 3：工作手冊每年審閱，版本紀錄
    {
      sheetName: '[補] 工作手冊年度審閱紀錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 3,
      prefillRows: 5,
      columns: [
        { header: '年度', width: 80 },
        { header: '審閱日期', width: 110 },
        { header: '審閱範圍', width: 200 },
        { header: '修訂章節摘要', width: 240 },
        { header: '審閱人員', width: 110 },
        { header: '主管核章', width: 100 },
      ],
    },
  ],

  /** 25. 行政會議辦理情形 */
  25: [
    {
      sheetName: '行政會議記錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 6,
      columns: [
        { header: '會議日期', width: 100 },
        { header: '會議類別', width: 130 },
        { header: '出席人員', width: 180 },
        { header: '主要議題', width: 220 },
        { header: '決議事項', width: 220 },
        { header: '追蹤事項', width: 180 },
        { header: '主席簽名', width: 100 },
      ],
    },
  ],

  /** 26. 器材維護與管理 */
  26: [
    {
      sheetName: '器材維護管理記錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '器材名稱', width: 160 },
        { header: '器材編號', width: 100 },
        { header: '定期保養日期', width: 120 },
        { header: '保養項目', width: 200 },
        { header: '功能狀態', width: 100 },
        { header: '損壞紀錄', width: 160 },
        { header: '修繕完成日期', width: 120 },
        { header: '記錄人員', width: 100 },
      ],
    },
    // [補] 第 26 條 criteria 1：電梯機電設備每年定期保養紀錄
    {
      sheetName: '[補] 電梯機電保養紀錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
      prefillRows: 12,
      columns: [
        { header: '保養日期', width: 110 },
        { header: '設備名稱（電梯/發電機/空調/消防）', width: 240 },
        { header: '保養廠商', width: 140 },
        { header: '保養項目', width: 200 },
        { header: '功能測試結果', width: 140 },
        { header: '下次保養日', width: 130 },
        { header: '紀錄人', width: 100 },
      ],
    },
  ],

  /** 27. 前次評鑑建議改善情形 */
  27: [
    {
      sheetName: '評鑑建議改善追蹤表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 6,
      columns: [
        { header: '前次評鑑建議事項', width: 280 },
        { header: '負責人員', width: 110 },
        { header: '預計完成日期', width: 120 },
        { header: '改善執行內容', width: 240 },
        { header: '實際完成日期', width: 120 },
        { header: '佐證文件', width: 160 },
        { header: '改善結果', width: 140 },
      ],
    },
  ],

  /** 28. 人力設置情形 */
  28: [
    {
      sheetName: '人力設置符合性查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '職稱', width: 120 },
        { header: '應配置人數', width: 120 },
        { header: '實際在職人數', width: 120 },
        { header: '資格符合', width: 90 },
        { header: '缺額說明', width: 180 },
        { header: '招募進度', width: 160 },
        { header: '核查日期', width: 100 },
      ],
    },
    // [補] 第 28 條 criteria 1：執業登錄暨勞健保查核，逐人核對
    {
      sheetName: '[補] 執業登錄暨勞健保查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
      prefillRows: 10,
      columns: [
        { header: '員工姓名', width: 110 },
        { header: '職稱', width: 110 },
        { header: '執業登錄/報備日期', width: 160 },
        { header: '主管機關', width: 140 },
        { header: '勞保加保日', width: 120 },
        { header: '健保加保日', width: 120 },
        { header: '勞退提撥確認', width: 130 },
        { header: '最近查核日', width: 120 },
      ],
    },
  ],

  /** 29. 服務人員教育訓練情形 */
  29: [
    {
      sheetName: '年度教育訓練計畫暨執行記錄',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '訓練課程名稱', width: 200 },
        { header: '訓練類別', width: 120 },
        { header: '計畫辦理日期', width: 120 },
        { header: '實際辦理日期', width: 120 },
        { header: '訓練時數', width: 90 },
        { header: '參與人數', width: 90 },
        { header: '講師/機構', width: 140 },
        { header: '備註', width: 140 },
      ],
    },
    // [補] 法規第 29 項 criteria 2：新進 16 hr / 1 個月內（職前訓練個人達成檢核）
    {
      sheetName: '[補] 職前訓練個人完成檢核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
      prefillRows: 8,
      columns: [
        { header: '員工姓名', width: 110 },
        { header: '到職日期', width: 110 },
        { header: '16hr完成截止日（到職+1月）', width: 200 },
        { header: '實際完成日期', width: 130 },
        { header: '累計訓練時數(hr)', width: 150 },
        { header: '是否符合（≥16hr且1月內）', width: 200 },
        { header: '未達標原因/補救措施', width: 200 },
      ],
    },
    // [補] 法規第 29 項 criteria 3：在職 ≥20 hr/年（含原民 1hr + 多元 1hr，網路 ≤5hr）
    {
      sheetName: '[補] 員工個人累計訓練時數表',
      archetype: 'inspection-checklist',
      criteriaIndex: 2,
      prefillRows: 12,
      columns: [
        { header: '員工姓名', width: 110 },
        { header: '職稱', width: 110 },
        { header: '實體課程時數(hr)', width: 150 },
        { header: '網路課程時數(hr)', width: 150 },
        { header: '累計總時數(hr)', width: 140 },
        { header: '原住民族文化課(hr)', width: 160 },
        { header: '多元族群文化課(hr)', width: 160 },
        { header: '是否達20hr', width: 110 },
        { header: '備註', width: 140 },
      ],
    },
    // [補] 法規第 29 項 criteria 3（特殊要求）：原民族 + 多元族群課程各 1 hr 清單
    {
      sheetName: '[補] 原民多元族群課程清單',
      archetype: 'training-record',
      criteriaIndex: 2,
      prefillRows: 8,
      columns: [
        { header: '課程名稱', width: 220 },
        { header: '課程類別（原民族/多元族群）', width: 200 },
        { header: '辦理日期', width: 110 },
        { header: '課程時數(hr)', width: 120 },
        { header: '講師/主辦單位', width: 180 },
        { header: '參訓員工（姓名）', width: 200 },
      ],
    },
  ],

  /** 30. 專任服務人員年度留任率 */
  30: [
    {
      sheetName: '服務人員年度留任率計算表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '職稱', width: 120 },
        { header: '年初在職人數', width: 120 },
        { header: '年底在職人數', width: 120 },
        { header: '留任率(%)', width: 100 },
        { header: '離職人數', width: 100 },
        { header: '主要離職原因', width: 200 },
        { header: '留任措施說明', width: 200 },
      ],
    },
    // [補] 法規第 30 項 criteria 1：前四年度平均留任率（評鑑計分依據）
    {
      sheetName: '[補] 四年度留任率平均計算表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 6,
      columns: [
        { header: '職類別', width: 120 },
        { header: 'Y-3留任率(%)', width: 130 },
        { header: 'Y-2留任率(%)', width: 130 },
        { header: 'Y-1留任率(%)', width: 130 },
        { header: 'Y0留任率(%)', width: 130 },
        { header: '四年度平均(%)', width: 140 },
        { header: '計算說明', width: 200 },
      ],
    },
  ],

  /** 31. 業務負責人執業能力 */
  31: [
    {
      sheetName: '業務負責人資格及在職訓練查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      columns: [
        { header: '查核項目', width: 240 },
        { header: '符合', width: 70 },
        { header: '不符合', width: 80 },
        { header: '證明文件', width: 180 },
        { header: '到期日', width: 100 },
        { header: '說明', width: 180 },
      ],
    },
    // [補] 法規第 31 項 reviewMethod：業務負責人能提出人力/財務/品質/風險/物流問題及解決策略
    {
      sheetName: '[補] 負責人經營管理問題策略表',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: '人力管理問題' },
        { row: 1, col: 0, value: '財務管理問題' },
        { row: 2, col: 0, value: '品質管理問題' },
        { row: 3, col: 0, value: '風險管理問題' },
        { row: 4, col: 0, value: '物流/設備管理問題' },
      ],
      columns: [
        { header: '問題類別', width: 160 },
        { header: '問題描述', width: 240 },
        { header: '解決策略', width: 240 },
        { header: '執行進度', width: 140 },
        { header: '成效評估', width: 180 },
        { header: '負責人簽認', width: 120 },
      ],
    },
  ],

  /** 32. 服務人員定期接受健康檢查情形 */
  32: [
    {
      sheetName: '服務人員健康檢查記錄彙整表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '員工姓名', width: 110 },
        { header: '職稱', width: 110 },
        { header: '健康檢查日期', width: 120 },
        { header: '胸部X光結果', width: 120 },
        { header: '其他異常項目', width: 160 },
        { header: '後續追蹤', width: 160 },
        { header: '下次檢查到期日', width: 130 },
      ],
    },
    // [補] 法規第 32 項 criteria 1：新進員工須含 B 型肝炎抗原抗體（現有表無此欄）
    {
      sheetName: '[補] 員工B型肝炎抗原抗體紀錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '員工姓名', width: 110 },
        { header: '到職日期', width: 110 },
        { header: '檢查日期', width: 110 },
        { header: 'HBsAg（表面抗原）', width: 160 },
        { header: 'Anti-HBs（表面抗體）', width: 170 },
        { header: 'Anti-HBc（核心抗體）', width: 170 },
        { header: '疫苗接種建議', width: 160 },
        { header: '後續追蹤', width: 160 },
      ],
    },
  ],

  /** 33. 服務人員接受疫苗注射情形 */
  33: [
    {
      sheetName: '服務人員疫苗接種記錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '員工姓名', width: 110 },
        { header: '流感疫苗接種日期', width: 140 },
        { header: 'COVID-19疫苗接種情形', width: 160 },
        { header: '其他疫苗', width: 120 },
        { header: '未接種原因', width: 160 },
        { header: '紀錄人員', width: 100 },
      ],
    },
    // [補] 法規第 33 項 criteria 1：疫苗施打率 = 接種人數÷(總人數－不適合接種人數)×100%
    {
      sheetName: '[補] 機構疫苗施打率彙整表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 6,
      columns: [
        { header: '職類別', width: 130 },
        { header: '服務人員總數', width: 130 },
        { header: '不適合接種人數（醫師評估）', width: 200 },
        { header: '實際接種人數', width: 130 },
        { header: '施打率(%)', width: 110 },
        { header: '未接種原因摘要', width: 200 },
        { header: '統計截止日', width: 120 },
      ],
    },
  ],

  /** 34. 健全的財務管理制度 */
  34: [
    {
      sheetName: '財務管理制度查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 6,
      columns: [
        { header: '查核項目', width: 240 },
        { header: '符合', width: 70 },
        { header: '不符合', width: 80 },
        { header: '說明/備註', width: 200 },
        { header: '核查日期', width: 100 },
        { header: '核查人員', width: 100 },
      ],
    },
    // [補] 第 34 條 criteria 4：捐款專戶徵信紀錄，每年 1 月/7 月報主管機關
    {
      sheetName: '[補] 捐款專戶徵信紀錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 4,
      prefillRows: 6,
      columns: [
        { header: '年度', width: 80 },
        { header: '捐款人/團體', width: 160 },
        { header: '金額', width: 100 },
        { header: '用途', width: 180 },
        { header: '專戶收據編號', width: 150 },
        { header: '公開徵信刊登方式', width: 180 },
        { header: '報主管機關日期（1月/7月）', width: 200 },
      ],
    },
    // [補] 第 34 條 criteria 1：報稅資料建檔清單
    {
      sheetName: '[補] 報稅資料建檔清單',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
      prefillRows: 5,
      columns: [
        { header: '年度', width: 80 },
        { header: '報稅類別', width: 160 },
        { header: '申報日期', width: 110 },
        { header: '存放位置', width: 160 },
        { header: '會計師簽章', width: 120 },
        { header: '主管核章', width: 100 },
      ],
    },
  ],

  /** 35. 意外或緊急事件處理情形 */
  35: [
    {
      sheetName: '意外及緊急事件報告表',
      archetype: 'incident-log',
      criteriaIndex: 0,
      columns: [
        { header: '事件日期時間', width: 130 },
        { header: '事件類別', width: 120 },
        { header: '當事人姓名', width: 110 },
        { header: '事件描述', width: 260 },
        { header: '立即處置措施', width: 200 },
        { header: '通報時間及對象', width: 160 },
        { header: '後續追蹤', width: 180 },
        { header: '改善措施', width: 180 },
        { header: '報告人員', width: 100 },
      ],
    },
    {
      sheetName: '緊急事件演練紀錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 3,
      prefillRows: 4,
      columns: [
        { header: '演練日期', width: 100 },
        { header: '演練情境', width: 180 },
        { header: '參與人員', width: 200 },
        { header: '演練過程', width: 240 },
        { header: '缺失項目', width: 180 },
        { header: '改善追蹤', width: 180 },
      ],
    },
    // [補] 法規第 35 項 criteria 4：對發生之事件有檢討及分析報告（現有表缺 RCA 格式）
    {
      sheetName: '[補] 事件檢討分析報告表',
      archetype: 'inspection-checklist',
      criteriaIndex: 3,
      prefillRows: 5,
      columns: [
        { header: '事件編號', width: 110 },
        { header: '事件摘要', width: 200 },
        { header: '根本原因分析(RCA)', width: 240 },
        { header: '系統性問題', width: 180 },
        { header: '改善行動', width: 200 },
        { header: '責任人員', width: 110 },
        { header: '完成期限', width: 110 },
        { header: '驗證日期', width: 110 },
      ],
    },
  ],

  /** 36. 具有急救物品 */
  36: [
    {
      sheetName: '急救物品定期清點記錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      columns: [
        { header: '清點日期', width: 100 },
        { header: '物品名稱', width: 160 },
        { header: '數量', width: 80 },
        { header: '有效日期', width: 100 },
        { header: '狀態正常', width: 90 },
        { header: '補充/更換說明', width: 160 },
        { header: '清點人員', width: 100 },
      ],
    },
    // [補] 第 36 條 criteria 2：急救物品操作知能定期檢核
    {
      sheetName: '[補] 急救物品操作知能檢核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 2,
      prefillRows: 12,
      columns: [
        { header: '員工姓名', width: 110 },
        { header: '職稱', width: 110 },
        { header: '檢核項目（止血/包紮/呼吸道異物/AED）', width: 260 },
        { header: '檢核日期', width: 110 },
        { header: '結果', width: 90 },
        { header: '複訓需求', width: 110 },
        { header: '檢核人員', width: 110 },
      ],
    },
    // [補] 法規第 36 項 criteria 1-2：法規明列 16 項急救物品，預填法定清單供對照
    {
      sheetName: '[補] 急救物品法定16項清單對照表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 17,
      prefillCells: [
        { row: 0, col: 0, value: '三角巾' },
        { row: 1, col: 0, value: '固定板' },
        { row: 2, col: 0, value: '繃帶' },
        { row: 3, col: 0, value: '體溫計' },
        { row: 4, col: 0, value: '寬膠帶或紙膠' },
        { row: 5, col: 0, value: '止血帶' },
        { row: 6, col: 0, value: '剪刀' },
        { row: 7, col: 0, value: '優碘' },
        { row: 8, col: 0, value: '酒精（或棉片）' },
        { row: 9, col: 0, value: '口罩' },
        { row: 10, col: 0, value: '棉棒' },
        { row: 11, col: 0, value: '紗布' },
        { row: 12, col: 0, value: '壓舌板' },
        { row: 13, col: 0, value: '彈性紗繃或彈性繃帶' },
        { row: 14, col: 0, value: '清潔手套' },
        { row: 15, col: 0, value: '生理食鹽水（20cc×5pc）' },
        { row: 16, col: 0, value: '潤滑劑（jelly）' },
      ],
      columns: [
        { header: '法定品項（依評鑑基準第36項）', width: 220 },
        { header: '規格/型號', width: 140 },
        { header: '數量', width: 80 },
        { header: '有效日期', width: 110 },
        { header: '狀態正常', width: 90 },
        { header: '補充/更換說明', width: 180 },
        { header: '清點人員', width: 100 },
      ],
    },
  ],

  /** 37. 機構性侵害及性騷擾事件防治機制建置情形 */
  37: [
    {
      sheetName: '性騷擾防治教育訓練記錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 2,
      prefillRows: 4,
      columns: [
        { header: '訓練日期', width: 100 },
        { header: '課程名稱', width: 200 },
        { header: '訓練時數', width: 90 },
        { header: '參與人員', width: 200 },
        { header: '講師', width: 120 },
        { header: '員工簽到數', width: 110 },
        { header: '備註', width: 160 },
      ],
    },
    // [補] 法規第 37 項 criteria 1：訂有處理辦法及流程，若有發生事件均有處理紀錄
    {
      sheetName: '[補] 性騷擾事件處理紀錄表',
      archetype: 'incident-log',
      criteriaIndex: 0,
      prefillRows: 4,
      columns: [
        { header: '案件編號', width: 110 },
        { header: '受理日期', width: 110 },
        { header: '當事人類別（工作人員/個案/家屬）', width: 240 },
        { header: '事件概述（匿名）', width: 240 },
        { header: '通報主管機關日期', width: 160 },
        { header: '轉介處理', width: 140 },
        { header: '後續追蹤', width: 180 },
        { header: '結案日期', width: 110 },
        { header: '保密措施說明', width: 180 },
      ],
    },
    // [補] 法規第 37 項 reviewMethod：無論容留人數，皆應公開揭示性騷擾防治措施
    {
      sheetName: '[補] 性騷擾防治公開揭示紀錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 6,
      columns: [
        { header: '公告文件名稱', width: 220 },
        { header: '公告位置', width: 160 },
        { header: '張貼/更新日期', width: 140 },
        { header: '最近檢視日期', width: 140 },
        { header: '完整性確認', width: 120 },
        { header: '負責人員', width: 110 },
      ],
    },
  ],

  // ── 肆、安全環境設備（一）硬體環境設施 ──────────────────────────────────

  /** 38. 符合高齡友善環境 */
  38: [
    {
      sheetName: '高齡友善環境定期查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '查核項目', width: 240 },
        { header: '符合', width: 70 },
        { header: '不符合', width: 80 },
        { header: '說明/改善事項', width: 220 },
        { header: '查核日期', width: 100 },
        { header: '查核人員', width: 100 },
      ],
    },
    // [補] 第 38 條 criteria 0：高齡友善環境 10 項預填查核清單
    {
      sheetName: '[補] 高齡友善環境項目清單',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 10,
      prefillCells: [
        { row: 0, col: 0, value: '空間配置合理（無障礙動線、轉彎半徑）' },
        { row: 1, col: 0, value: '標示清楚（字體 ≥ 2cm、高對比）' },
        { row: 2, col: 0, value: '欄楣/扶手符合長者使用高度' },
        { row: 3, col: 0, value: '桌椅高度適合（含輪椅使用者）' },
        { row: 4, col: 0, value: '傢俱邊角防撞處理' },
        { row: 5, col: 0, value: '燈光亮度足夠（走道/活動區）' },
        { row: 6, col: 0, value: '色彩對比（地板與牆面、樓梯踏階）' },
        { row: 7, col: 0, value: '地板防滑材質' },
        { row: 8, col: 0, value: '緊急呼叫系統分布' },
        { row: 9, col: 0, value: '溫度/通風適宜' },
      ],
      columns: [
        { header: '查核項目', width: 260 },
        { header: '符合', width: 70 },
        { header: '不符合', width: 80 },
        { header: '改善事項', width: 220 },
        { header: '查核日期', width: 110 },
        { header: '查核人員', width: 110 },
      ],
    },
  ],

  /** 39. 設置盥洗衛生設備 */
  39: [
    {
      sheetName: '盥洗衛生設備查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '查核項目', width: 240 },
        { header: '符合', width: 70 },
        { header: '不符合', width: 80 },
        { header: '規格/說明', width: 180 },
        { header: '清潔頻率', width: 100 },
        { header: '查核日期', width: 100 },
        { header: '查核人員', width: 100 },
      ],
    },
    // [補] 法規第 39 項 reviewMethod：社區式長照機構設立標準 5 項法定要求
    {
      sheetName: '[補] 法定盥洗設備項目對照表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: '門淨寬度 ≥ 80 公分' },
        { row: 1, col: 0, value: '多人使用衛浴應有適當隔間或門簾' },
        { row: 2, col: 0, value: '地板防滑措施，並配置扶手及緊急呼叫系統' },
        { row: 3, col: 0, value: '有適合乘坐輪椅者使用之衛浴設備' },
        { row: 4, col: 0, value: '有適當照明' },
      ],
      columns: [
        { header: '法定項目（依社區式長照機構設立標準）', width: 280 },
        { header: '規格/尺寸說明', width: 180 },
        { header: '符合', width: 70 },
        { header: '不符合', width: 80 },
        { header: '改善計畫', width: 200 },
        { header: '查核日期', width: 100 },
      ],
    },
  ],

  /** 40. 提供合宜之休息場所 */
  40: [
    {
      sheetName: '休息場所設施查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 6,
      columns: [
        { header: '查核項目', width: 240 },
        { header: '符合', width: 70 },
        { header: '不符合', width: 80 },
        { header: '說明/改善事項', width: 200 },
        { header: '查核日期', width: 100 },
        { header: '查核人員', width: 100 },
      ],
    },
    // [補] 第 40 條 criteria 0：休息場所 6 項預填查核清單
    {
      sheetName: '[補] 休息場所查核項目清單',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 6,
      prefillCells: [
        { row: 0, col: 0, value: '休息場所獨立或有隔間' },
        { row: 1, col: 0, value: '床墊/躺椅符合人因' },
        { row: 2, col: 0, value: '照明柔和可調' },
        { row: 3, col: 0, value: '隱私性（布簾/屏風）' },
        { row: 4, col: 0, value: '溫度舒適度' },
        { row: 5, col: 0, value: '緊急呼叫可近性' },
      ],
      columns: [
        { header: '查核項目', width: 240 },
        { header: '符合', width: 70 },
        { header: '不符合', width: 80 },
        { header: '改善事項', width: 220 },
        { header: '查核日期', width: 110 },
        { header: '查核人員', width: 110 },
      ],
    },
  ],

  /** 41. 飲用水檢查 */
  41: [
    {
      sheetName: '飲用水質檢查記錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      columns: [
        { header: '檢查日期', width: 100 },
        { header: '水源類別（自來水/桶裝水/過濾）', width: 240 },
        { header: '檢驗項目', width: 160 },
        { header: '檢驗結果', width: 120 },
        { header: '符合規定', width: 90 },
        { header: '異常處理', width: 160 },
        { header: '記錄人員', width: 100 },
      ],
    },
    // [補] 法規第 41 項 criteria 1：設有水塔者，應每半年清洗 1 次並有紀錄
    {
      sheetName: '[補] 水塔半年清洗紀錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 6,
      columns: [
        { header: '清洗日期', width: 110 },
        { header: '清洗廠商', width: 150 },
        { header: '清洗方式', width: 180 },
        { header: '清洗後水質檢驗結果', width: 200 },
        { header: '符合規定', width: 90 },
        { header: '下次預定清洗日', width: 150 },
        { header: '紀錄人員', width: 100 },
      ],
    },
    // [補] 第 41 條 criteria 1：非自來水水源硝酸鹽氮暨砷檢驗
    {
      sheetName: '[補] 非自來水水源硝酸鹽氮暨砷檢驗表',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
      prefillRows: 4,
      columns: [
        { header: '檢驗日期', width: 110 },
        { header: '水源類別', width: 140 },
        { header: '硝酸鹽氮值', width: 130 },
        { header: '砷值', width: 100 },
        { header: '合格判定', width: 110 },
        { header: '檢驗機構', width: 160 },
        { header: '下次檢驗到期日', width: 150 },
      ],
    },
    // [補] 第 41 條 criteria 2：包裝水合格證明建檔清單
    {
      sheetName: '[補] 包裝水合格證明建檔清單',
      archetype: 'inventory-list',
      criteriaIndex: 2,
      prefillRows: 5,
      columns: [
        { header: '品牌', width: 130 },
        { header: '規格', width: 100 },
        { header: '供應商', width: 160 },
        { header: '合格證明編號', width: 160 },
        { header: '效期', width: 110 },
        { header: '檔案位置', width: 180 },
      ],
    },
  ],

  /** 42. 廚房衛生 */
  42: [
    {
      sheetName: '廚房衛生定期查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 12,
      columns: [
        { header: '查核項目', width: 240 },
        { header: '符合', width: 70 },
        { header: '不符合', width: 80 },
        { header: '說明/改善事項', width: 220 },
        { header: '查核日期', width: 100 },
        { header: '查核人員', width: 100 },
      ],
    },
    // [補] 法規第 42 項 criteria：食物檢體留存 125g/冷藏 7°C/48 hr
    {
      sheetName: '[補] 食物檢體留樣登記表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      prefillRows: 12,
      columns: [
        { header: '留樣日期', width: 100 },
        { header: '餐次（早/午/晚/點心）', width: 160 },
        { header: '餐點名稱', width: 180 },
        { header: '留樣重量(g)（≥125g）', width: 170 },
        { header: '冷藏溫度(°C)（≤7°C）', width: 170 },
        { header: '留樣 48hr 銷毀日', width: 150 },
        { header: '處理人員', width: 110 },
      ],
    },
    // [補] 法規第 42 項 criteria（自行供餐）：具乾貨冷藏（7°C 以下）食材設備
    {
      sheetName: '[補] 冰箱溫度紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 2,
      prefillRows: 20,
      columns: [
        { header: '記錄日期', width: 100 },
        { header: '冰箱/冷藏設備', width: 140 },
        { header: '早班溫度(°C)', width: 120 },
        { header: '晚班溫度(°C)', width: 120 },
        { header: '異常（>7°C）', width: 110 },
        { header: '異常處置說明', width: 200 },
        { header: '紀錄人員', width: 110 },
      ],
    },
    // [補] 法規第 42 項 criteria 1（外部供應餐點）：需妥適處理，確認廠商合格
    {
      sheetName: '[補] 外部供餐廠商合格證明清單',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 5,
      columns: [
        { header: '供餐廠商名稱', width: 180 },
        { header: '合約起訖日期', width: 160 },
        { header: 'HACCP/GHP認證', width: 140 },
        { header: '衛生合格證明', width: 140 },
        { header: '最近稽核日期', width: 140 },
        { header: '稽核結果', width: 140 },
        { header: '備註', width: 160 },
      ],
    },
  ],

  /** 43. 機構環境清潔及病媒防治措施 */
  43: [
    {
      sheetName: '環境清潔及病媒防治記錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '日期', width: 100 },
        { header: '清潔區域', width: 160 },
        { header: '清潔項目', width: 180 },
        { header: '清潔人員', width: 110 },
        { header: '督導人員', width: 110 },
        { header: '病媒防治紀錄', width: 180 },
        { header: '備註', width: 140 },
      ],
    },
    // [補] 第 43 條 criteria 1：環境消毒每 3 個月至少一次頻率檢核
    {
      sheetName: '[補] 環境消毒3個月頻率檢核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
      prefillRows: 4,
      columns: [
        { header: '季度', width: 80 },
        { header: '消毒日期', width: 110 },
        { header: '消毒範圍', width: 180 },
        { header: '消毒方式/藥劑', width: 180 },
        { header: '執行人員', width: 110 },
        { header: '是否達每 3 月 ≥1 次', width: 160 },
      ],
    },
    // [補] 第 43 條 criteria 3：病媒防治專業廠商合約建檔
    {
      sheetName: '[補] 病媒防治廠商合約建檔表',
      archetype: 'inspection-checklist',
      criteriaIndex: 3,
      prefillRows: 3,
      columns: [
        { header: '廠商名稱', width: 180 },
        { header: '合約起訖', width: 160 },
        { header: '服務頻率', width: 130 },
        { header: '服務紀錄連結', width: 200 },
        { header: '佐證文件類型', width: 160 },
        { header: '負責人', width: 100 },
      ],
    },
  ],

  // ── 伍、加分題 ──────────────────────────────────────────────────────────────

  /** 44. 服務原住民族之文化敏感度措施（加分題，最多 +2 分）
   *  此 key 在原始 daycareDefs 中完全缺漏，現予補齊。 */
  44: [
    // [補] 法規第 44 項 criteria 1：依族群文化照顧需求提供族語/翻譯等個別化服務
    {
      sheetName: '[補] 多元族群語言資源清單',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '族群別', width: 130 },
        { header: '使用語言', width: 130 },
        { header: '翻譯資源（人員/工具/機構）', width: 240 },
        { header: '聯絡窗口', width: 160 },
        { header: '建立/更新日期', width: 140 },
        { header: '備註', width: 160 },
      ],
    },
    // [補] 法規第 44 項 criteria 2：緊急呼叫設備有族群語言翻譯或清楚圖示
    {
      sheetName: '[補] 緊急呼叫圖示族語對照表',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
      prefillRows: 8,
      columns: [
        { header: '設備位置', width: 160 },
        { header: '設備類型', width: 130 },
        { header: '族語標示（族群/語言）', width: 200 },
        { header: '圖示說明', width: 180 },
        { header: '查核日期', width: 110 },
        { header: '查核人員', width: 110 },
      ],
    },
  ],

  /** 45. 設置監視錄影設備（加分題，最多 +2 分）
   *  主要工作表由 buildDaycareItem45CustomSheets() 產生；此處補充影像保存驗證表。 */
  45: [
    // [補] 第 45 條 criteria 3：監視錄影影像保存 ≥30 日定期驗證
    {
      sheetName: '[補] 監視器影像保存30日驗證表',
      archetype: 'inspection-checklist',
      criteriaIndex: 3,
      prefillRows: 8,
      columns: [
        { header: '驗證日期', width: 110 },
        { header: '鏡頭編號', width: 110 },
        { header: '目前保存起算日', width: 150 },
        { header: '保存天數', width: 110 },
        { header: '是否達 ≥30 日', width: 130 },
        { header: '缺漏原因', width: 180 },
        { header: '補救措施', width: 180 },
        { header: '驗證人員', width: 110 },
      ],
    },
  ],

};
