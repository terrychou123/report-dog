/**
 * 居家服務機構評鑑補充文件定義
 * 115年度臺北市政府社會局居家服務機構評鑑基準（32項）
 */
import type { SupplementaryDefsMap } from '../supplementary-sheet-types';

export const homeCareDefs: SupplementaryDefsMap = {

  /** 1. 服務資訊公開 */
  1: [
    // [補] 第 1 條 criteria 0：機構應公告事項清單（簡介/服務項目/收費/時間/區域）
    {
      sheetName: '[補] 常見應公告事項清單',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 8,
      prefillCells: [
        { row: 0, col: 0, value: '機構簡介（宗旨、服務對象）' },
        { row: 1, col: 0, value: '服務項目清單（身體照顧/日常生活協助等）' },
        { row: 2, col: 0, value: '收費標準（政府補助部分與自費部分）' },
        { row: 3, col: 0, value: '服務時間與服務區域說明' },
        { row: 4, col: 0, value: '聯絡方式（電話/地址/Email）' },
        { row: 0, col: 1, value: '✓' },
        { row: 0, col: 2, value: '機構簡介 DM v2.0（2025-01）' },
        { row: 0, col: 3, value: '入口大廳公告欄' },
        { row: 0, col: 4, value: '行政〇〇〇' },
        { row: 1, col: 1, value: '✓' },
        { row: 1, col: 2, value: '服務項目說明書 v1.1' },
        { row: 1, col: 3, value: '公告欄+官網' },
        { row: 1, col: 4, value: '行政〇〇〇' },
        { row: 2, col: 1, value: '✓' },
        { row: 2, col: 2, value: '收費公告 2025' },
        { row: 2, col: 3, value: '公告欄+官網+契約附件' },
        { row: 2, col: 4, value: '行政〇〇〇' },
      ],
      columns: [
        { header: '應公告事項', width: 220 },
        { header: '是否具備', width: 90 },
        { header: '佐證文件', width: 200 },
        { header: '公告位置', width: 160 },
        { header: '負責人員', width: 110 },
      ],
    },
    // [補] 第 1 條 criteria 1：文宣/簡介定期更新版本管控
    {
      sheetName: '[補] 文宣更新版本管控表',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: 'v1.0' }, { row: 0, col: 1, value: '2024-01-01' }, { row: 0, col: 2, value: '—' }, { row: 0, col: 3, value: '初版制定' }, { row: 0, col: 4, value: '主任〇〇〇' }, { row: 0, col: 5, value: '機構公告欄' }, { row: 0, col: 6, value: '行政檔案夾 A-1' },
        { row: 1, col: 0, value: 'v1.1' }, { row: 1, col: 1, value: '2024-01-01' }, { row: 1, col: 2, value: '2024-07-01' }, { row: 1, col: 3, value: '更新收費標準與服務區域' }, { row: 1, col: 4, value: '主任〇〇〇' }, { row: 1, col: 5, value: '公告欄+官網' }, { row: 1, col: 6, value: '行政檔案夾 A-1' },
        { row: 2, col: 0, value: 'v2.0' }, { row: 2, col: 1, value: '2024-01-01' }, { row: 2, col: 2, value: '2025-01-15' }, { row: 2, col: 3, value: '依新法規修訂收費說明' }, { row: 2, col: 4, value: '督導王〇〇' }, { row: 2, col: 5, value: '全通路公告' }, { row: 2, col: 6, value: '行政檔案夾 A-2' },
      ],
      columns: [
        { header: '版次', width: 80 },
        { header: '制定日期', width: 110 },
        { header: '修訂日期', width: 110 },
        { header: '修訂重點', width: 220 },
        { header: '核定人員', width: 110 },
        { header: '公告位置', width: 160 },
        { header: '歸檔位置', width: 160 },
      ],
    },
    // [補] 第 1 條 criteria 2：網路平台公開狀態查核
    {
      sheetName: '[補] 網路平台公開狀態查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 2,
      prefillRows: 6,
      prefillCells: [
        { row: 0, col: 0, value: '機構官方網站' },
        { row: 1, col: 0, value: 'Facebook 粉絲專頁' },
        { row: 2, col: 0, value: 'LINE 官方帳號' },
        { row: 0, col: 1, value: '✓ 已設置' }, { row: 0, col: 2, value: 'https://www.example-homecare.org.tw' }, { row: 0, col: 3, value: '2025-03-01' }, { row: 0, col: 4, value: '行政〇〇〇' },
        { row: 1, col: 1, value: '✓ 已設置' }, { row: 1, col: 2, value: 'https://fb.com/xxx-homecare' }, { row: 1, col: 3, value: '2025-02-15' }, { row: 1, col: 4, value: '社工王〇〇' },
        { row: 2, col: 1, value: '✓ 已設置' }, { row: 2, col: 2, value: '@homecare-line-official' }, { row: 2, col: 3, value: '2025-01-20' }, { row: 2, col: 4, value: '行政〇〇〇' },
      ],
      columns: [
        { header: '平台名稱', width: 160 },
        { header: '是否設置', width: 100 },
        { header: '網址/帳號', width: 220 },
        { header: '最近更新日期', width: 130 },
        { header: '負責人員', width: 110 },
      ],
    },
    // [補] 第 1 條 criteria 3：其他宣傳管道辦理紀錄
    {
      sheetName: '[補] 其他宣傳管道辦理紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 3,
      prefillRows: 6,
      prefillCells: [
        { row: 0, col: 0, value: '2025-01-10' }, { row: 0, col: 1, value: '機構服務說明會' }, { row: 0, col: 2, value: '社區公告欄+現場說明' }, { row: 0, col: 3, value: '里民活動中心' }, { row: 0, col: 4, value: '社區長者及家屬' }, { row: 0, col: 5, value: '出席30人，收5份轉介申請' }, { row: 0, col: 6, value: '社工王〇〇' },
        { row: 1, col: 0, value: '2025-02-14' }, { row: 1, col: 1, value: '居家服務Q&A衛教' }, { row: 1, col: 2, value: '合作醫院轉介說明' }, { row: 1, col: 3, value: '○○醫院社工室' }, { row: 1, col: 4, value: '醫院社工、個案管理師' }, { row: 1, col: 5, value: '新增合作轉介2名個案' }, { row: 1, col: 6, value: '社工李〇〇' },
        { row: 2, col: 0, value: '2025-03-25' }, { row: 2, col: 1, value: '長照服務週宣導活動' }, { row: 2, col: 2, value: '媒體報導+社區攤位' }, { row: 2, col: 3, value: '○○區活動中心' }, { row: 2, col: 4, value: '社區民眾' }, { row: 2, col: 5, value: '觸及150人，諮詢8人' }, { row: 2, col: 6, value: '社工王〇〇' },
      ],
      columns: [
        { header: '辦理日期', width: 100 },
        { header: '宣傳主題', width: 180 },
        { header: '宣傳形式', width: 200 },
        { header: '場地/通路', width: 150 },
        { header: '觸及對象', width: 160 },
        { header: '成效觀察', width: 180 },
        { header: '主辦人員', width: 100 },
      ],
    },
  ],

  /** 2. 個案基本權益維護 */
  2: [
    {
      sheetName: '個案權益聲明書清冊',
      archetype: 'inventory-list',
      criteriaIndex: 1,
      prefillRows: 10,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '說明日期', width: 100 },
        { header: '簽署狀況', width: 110 },
        { header: '說明人員', width: 100 },
        { header: '備註', width: 160 },
      ],
    },
    // [補] 第 2 條 criteria 0：個案權益保障規定版本管控
    {
      sheetName: '[補] 個案權益規定版本管控表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: 'v1.0' }, { row: 0, col: 1, value: '2024-01-01' }, { row: 0, col: 2, value: '—' }, { row: 0, col: 3, value: '初版制定' }, { row: 0, col: 4, value: '主任〇〇〇' }, { row: 0, col: 5, value: '機構公告欄' }, { row: 0, col: 6, value: '行政檔案夾 B-1' },
        { row: 1, col: 0, value: 'v1.1' }, { row: 1, col: 1, value: '2024-01-01' }, { row: 1, col: 2, value: '2024-09-01' }, { row: 1, col: 3, value: '新增無歧視聲明條款' }, { row: 1, col: 4, value: '督導王〇〇' }, { row: 1, col: 5, value: '公告欄+契約' }, { row: 1, col: 6, value: '行政檔案夾 B-1' },
        { row: 2, col: 0, value: 'v2.0' }, { row: 2, col: 1, value: '2024-01-01' }, { row: 2, col: 2, value: '2025-01-15' }, { row: 2, col: 3, value: '依長服法第19條修訂' }, { row: 2, col: 4, value: '主任〇〇〇' }, { row: 2, col: 5, value: '全通路公告' }, { row: 2, col: 6, value: '行政檔案夾 B-2' },
      ],
      columns: [
        { header: '版次', width: 80 },
        { header: '制定日期', width: 110 },
        { header: '修訂日期', width: 110 },
        { header: '修訂重點', width: 220 },
        { header: '核定人員', width: 110 },
        { header: '公告位置', width: 160 },
        { header: '歸檔位置', width: 160 },
      ],
    },
    // [補] 第 2 條 criteria 1：入案時應告知之7要素檢核
    {
      sheetName: '[補] 個案權益告知要素檢核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
      prefillRows: 8,
      prefillCells: [
        { row: 0, col: 0, value: '服務內容說明（項目、頻率、流程）' },
        { row: 1, col: 0, value: '收費標準（政府補助與自費部分）' },
        { row: 2, col: 0, value: '服務期程（起始日、合約期）' },
        { row: 3, col: 0, value: '申訴管道（電話、信箱、書面）' },
        { row: 4, col: 0, value: '個人隱私保護規定' },
        { row: 5, col: 0, value: '終止服務條件與程序' },
        { row: 6, col: 0, value: '其他（緊急聯絡、照顧者配合事項）' },
        { row: 0, col: 1, value: '✓' }, { row: 0, col: 2, value: '入案說明書 v2.0' }, { row: 0, col: 3, value: '個案資料夾 A-01' }, { row: 0, col: 4, value: '社工王〇〇' },
        { row: 1, col: 1, value: '✓' }, { row: 1, col: 2, value: '收費公告+收費明細表' }, { row: 1, col: 3, value: '個案資料夾 A-01' }, { row: 1, col: 4, value: '行政〇〇〇' },
        { row: 2, col: 1, value: '✓' }, { row: 2, col: 2, value: '服務契約書第3條' }, { row: 2, col: 3, value: '個案資料夾 A-01' }, { row: 2, col: 4, value: '社工王〇〇' },
      ],
      columns: [
        { header: '應含告知要素', width: 240 },
        { header: '是否具備', width: 90 },
        { header: '佐證文件', width: 200 },
        { header: '歸檔位置', width: 160 },
        { header: '負責人員', width: 110 },
      ],
    },
    // [補] 第 2 條 criteria 2：工作人員熟知權益規定知能檢核
    {
      sheetName: '[補] 權益保障人員知能檢核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 2,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: '熟知個案基本權益規定（可口頭說明3項以上）' },
        { row: 1, col: 0, value: '落實入案說明程序（有說明紀錄+簽署）' },
        { row: 2, col: 0, value: '無歧視、虐待、剝削個案之行為紀錄' },
        { row: 0, col: 1, value: '✓' }, { row: 0, col: 2, value: '訪談核實/在職訓練記錄' }, { row: 0, col: 3, value: '人事資料夾' }, { row: 0, col: 4, value: '督導王〇〇' },
        { row: 1, col: 1, value: '✓' }, { row: 1, col: 2, value: '個案資料夾簽署清冊' }, { row: 1, col: 3, value: '個案資料夾' }, { row: 1, col: 4, value: '社工李〇〇' },
        { row: 2, col: 1, value: '✓' }, { row: 2, col: 2, value: '申訴記錄查核（無投訴案件）' }, { row: 2, col: 3, value: '申訴紀錄表' }, { row: 2, col: 4, value: '社工王〇〇' },
      ],
      columns: [
        { header: '查核項目', width: 280 },
        { header: '是否符合', width: 90 },
        { header: '佐證文件', width: 200 },
        { header: '歸檔位置', width: 160 },
        { header: '查核人員', width: 110 },
      ],
    },
    // [補] 第 2 條 criteria 3：無歧視虐待剝削事件每季彙整（0件亦須彙整）
    {
      sheetName: '[補] 無歧視虐待剝削事件季度彙整表',
      archetype: 'inspection-checklist',
      criteriaIndex: 3,
      prefillRows: 4,
      prefillCells: [
        { row: 0, col: 0, value: 'Q1（1–3月）' }, { row: 1, col: 0, value: 'Q2（4–6月）' }, { row: 2, col: 0, value: 'Q3（7–9月）' }, { row: 3, col: 0, value: 'Q4（10–12月）' },
        { row: 0, col: 1, value: '是' }, { row: 0, col: 2, value: '2025-03-31' }, { row: 0, col: 3, value: '0件' }, { row: 0, col: 4, value: '當季無案件，仍完成彙整' }, { row: 0, col: 5, value: '社工王〇〇' }, { row: 0, col: 6, value: '主任〇〇〇' },
        { row: 1, col: 1, value: '是' }, { row: 1, col: 2, value: '2025-06-30' }, { row: 1, col: 3, value: '0件' }, { row: 1, col: 4, value: '當季無案件，仍完成彙整' }, { row: 1, col: 5, value: '社工王〇〇' }, { row: 1, col: 6, value: '主任〇〇〇' },
        { row: 2, col: 1, value: '是' }, { row: 2, col: 2, value: '2025-09-30' }, { row: 2, col: 3, value: '1件（已結案）' }, { row: 2, col: 4, value: '—' }, { row: 2, col: 5, value: '社工李〇〇' }, { row: 2, col: 6, value: '主任〇〇〇' },
      ],
      columns: [
        { header: '季度', width: 120 },
        { header: '是否辦理彙整', width: 110 },
        { header: '彙整日期', width: 110 },
        { header: '案件數', width: 90 },
        { header: '未辦理說明', width: 200 },
        { header: '彙整人員', width: 110 },
        { header: '主管核章', width: 100 },
      ],
    },
  ],

  /** 3. 個案隱私保護 */
  3: [
    {
      sheetName: '個案隱私保護查核表',
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
    // [補] 第 3 條 criteria 0：隱私保護規定版本管控
    {
      sheetName: '[補] 隱私保護規定版本管控表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: 'v1.0' }, { row: 0, col: 1, value: '2024-01-01' }, { row: 0, col: 2, value: '—' }, { row: 0, col: 3, value: '初版制定' }, { row: 0, col: 4, value: '主任〇〇〇' }, { row: 0, col: 5, value: '機構公告欄' }, { row: 0, col: 6, value: '行政檔案夾 C-1' },
        { row: 1, col: 0, value: 'v1.1' }, { row: 1, col: 1, value: '2024-01-01' }, { row: 1, col: 2, value: '2024-08-01' }, { row: 1, col: 3, value: '新增入戶錄影限制條款' }, { row: 1, col: 4, value: '督導王〇〇' }, { row: 1, col: 5, value: '公告欄+員工手冊' }, { row: 1, col: 6, value: '行政檔案夾 C-1' },
        { row: 2, col: 0, value: 'v2.0' }, { row: 2, col: 1, value: '2024-01-01' }, { row: 2, col: 2, value: '2025-02-01' }, { row: 2, col: 3, value: '依個資法第3條修訂' }, { row: 2, col: 4, value: '主任〇〇〇' }, { row: 2, col: 5, value: '全通路公告' }, { row: 2, col: 6, value: '行政檔案夾 C-2' },
      ],
      columns: [
        { header: '版次', width: 80 },
        { header: '制定日期', width: 110 },
        { header: '修訂日期', width: 110 },
        { header: '修訂重點', width: 220 },
        { header: '核定人員', width: 110 },
        { header: '公告位置', width: 160 },
        { header: '歸檔位置', width: 160 },
      ],
    },
    // [補] 第 3 條 criteria 1：個資保管設備與系統權限查核
    {
      sheetName: '[補] 個資保管設備與權限查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
      prefillRows: 6,
      prefillCells: [
        { row: 0, col: 0, value: '紙本個案資料使用加鎖文件櫃保管' },
        { row: 1, col: 0, value: '電腦系統設有個人帳號密碼權限管控' },
        { row: 2, col: 0, value: '個案資料定期備份（電子檔）' },
        { row: 0, col: 1, value: '✓' }, { row: 0, col: 2, value: '文件櫃鑰匙管理清冊' }, { row: 0, col: 3, value: '行政室' }, { row: 0, col: 4, value: '行政〇〇〇' },
        { row: 1, col: 1, value: '✓' }, { row: 1, col: 2, value: '系統權限管理清冊' }, { row: 1, col: 3, value: '資訊管理資料夾' }, { row: 1, col: 4, value: '行政〇〇〇' },
        { row: 2, col: 1, value: '✓' }, { row: 2, col: 2, value: '每月備份紀錄（雲端+外接硬碟）' }, { row: 2, col: 3, value: '資訊管理資料夾' }, { row: 2, col: 4, value: '行政〇〇〇' },
      ],
      columns: [
        { header: '查核項目', width: 260 },
        { header: '是否符合', width: 90 },
        { header: '佐證文件', width: 200 },
        { header: '歸檔位置', width: 150 },
        { header: '查核人員', width: 110 },
      ],
    },
    // [補] 第 3 條 criteria 2：入戶服務隱私保護執行檢核
    {
      sheetName: '[補] 入戶隱私保護執行檢核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 2,
      prefillRows: 6,
      prefillCells: [
        { row: 0, col: 0, value: '未經個案同意不拍照、不錄影' },
        { row: 1, col: 0, value: '不在公開場合討論個案私人資訊' },
        { row: 2, col: 0, value: '入戶前敲門/通知，尊重個人空間' },
        { row: 0, col: 1, value: '✓' }, { row: 0, col: 2, value: '訪談核實/在職訓練簽到' }, { row: 0, col: 3, value: '人事資料夾' }, { row: 0, col: 4, value: '督導王〇〇' },
        { row: 1, col: 1, value: '✓' }, { row: 1, col: 2, value: '服務日誌+督導訪視記錄' }, { row: 1, col: 3, value: '督導訪視資料夾' }, { row: 1, col: 4, value: '督導王〇〇' },
        { row: 2, col: 1, value: '✓' }, { row: 2, col: 2, value: '服務規範v2.0第5條' }, { row: 2, col: 3, value: '員工手冊' }, { row: 2, col: 4, value: '督導王〇〇' },
      ],
      columns: [
        { header: '應遵守事項', width: 260 },
        { header: '是否符合', width: 90 },
        { header: '佐證文件', width: 200 },
        { header: '歸檔位置', width: 150 },
        { header: '查核人員', width: 110 },
      ],
    },
    // [補] 第 3 條 criteria 3：影音資料蒐集授權同意書逐案清冊
    {
      sheetName: '[補] 影音資料蒐集同意書逐案清冊',
      archetype: 'inventory-list',
      criteriaIndex: 3,
      prefillRows: 15,
      prefillCells: [
        { row: 0, col: 0, value: '王〇〇' }, { row: 0, col: 1, value: '2025-01-15' }, { row: 0, col: 2, value: '個人資料授權同意書 v1.0' }, { row: 0, col: 3, value: '個案資料夾 A-01' }, { row: 0, col: 4, value: '本人簽署' }, { row: 0, col: 5, value: '社工王〇〇' },
        { row: 1, col: 0, value: '李〇〇' }, { row: 1, col: 1, value: '2025-02-08' }, { row: 1, col: 2, value: '個人資料授權同意書 v1.0' }, { row: 1, col: 3, value: '個案資料夾 A-02' }, { row: 1, col: 4, value: '家屬代簽（本人失能）' }, { row: 1, col: 5, value: '社工李〇〇' },
        { row: 2, col: 0, value: '陳〇〇' }, { row: 2, col: 1, value: '2025-03-20' }, { row: 2, col: 2, value: '個人資料授權同意書 v1.0' }, { row: 2, col: 3, value: '個案資料夾 A-03' }, { row: 2, col: 4, value: '本人簽署' }, { row: 2, col: 5, value: '社工王〇〇' },
      ],
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '辦理日期', width: 110 },
        { header: '佐證文件名稱', width: 200 },
        { header: '歸檔位置', width: 160 },
        { header: '備註', width: 140 },
        { header: '承辦人員', width: 110 },
      ],
    },
  ],

  /** 4. 申訴機制 */
  4: [
    {
      sheetName: '申訴案件處理記錄表',
      archetype: 'incident-log',
      criteriaIndex: 2,
      columns: [
        { header: '收件日期', width: 100 },
        { header: '申訴人', width: 110 },
        { header: '申訴內容', width: 240 },
        { header: '處理方式', width: 200 },
        { header: '回覆日期', width: 100 },
        { header: '追蹤結果', width: 180 },
        { header: '承辦人', width: 90 },
      ],
    },
    // [補] 第 4 條 criteria 0：申訴辦法版本管控
    {
      sheetName: '[補] 申訴辦法版本管控表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: 'v1.0' }, { row: 0, col: 1, value: '2024-01-01' }, { row: 0, col: 2, value: '—' }, { row: 0, col: 3, value: '初版制定' }, { row: 0, col: 4, value: '主任〇〇〇' }, { row: 0, col: 5, value: '機構公告欄' }, { row: 0, col: 6, value: '行政檔案夾 D-1' },
        { row: 1, col: 0, value: 'v1.1' }, { row: 1, col: 1, value: '2024-01-01' }, { row: 1, col: 2, value: '2024-10-01' }, { row: 1, col: 3, value: '新增LINE申訴管道' }, { row: 1, col: 4, value: '督導王〇〇' }, { row: 1, col: 5, value: '公告欄+官網' }, { row: 1, col: 6, value: '行政檔案夾 D-1' },
        { row: 2, col: 0, value: 'v2.0' }, { row: 2, col: 1, value: '2024-01-01' }, { row: 2, col: 2, value: '2025-01-15' }, { row: 2, col: 3, value: '增加3個工作日回覆承諾' }, { row: 2, col: 4, value: '主任〇〇〇' }, { row: 2, col: 5, value: '全通路公告' }, { row: 2, col: 6, value: '行政檔案夾 D-2' },
      ],
      columns: [
        { header: '版次', width: 80 },
        { header: '制定日期', width: 110 },
        { header: '修訂日期', width: 110 },
        { header: '修訂重點', width: 220 },
        { header: '核定人員', width: 110 },
        { header: '公告位置', width: 160 },
        { header: '歸檔位置', width: 160 },
      ],
    },
    // [補] 第 4 條 criteria 1：申訴管道公告揭示5處檢核
    {
      sheetName: '[補] 申訴管道公告揭示檢核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
      prefillRows: 6,
      prefillCells: [
        { row: 0, col: 0, value: '入案說明書（書面告知）' },
        { row: 1, col: 0, value: '服務契約書（條文明載）' },
        { row: 2, col: 0, value: '機構公告欄（實體張貼）' },
        { row: 3, col: 0, value: '機構官網（線上公告）' },
        { row: 4, col: 0, value: 'LINE官方帳號（數位管道）' },
        { row: 0, col: 1, value: '✓' }, { row: 0, col: 2, value: '入案說明書 v2.0 第6條' }, { row: 0, col: 3, value: '個案資料夾' }, { row: 0, col: 4, value: '社工王〇〇' },
        { row: 1, col: 1, value: '✓' }, { row: 1, col: 2, value: '服務契約書 v2.0 第10條' }, { row: 1, col: 3, value: '個案資料夾' }, { row: 1, col: 4, value: '社工王〇〇' },
        { row: 2, col: 1, value: '✓' }, { row: 2, col: 2, value: '申訴公告海報（2025-01更新）' }, { row: 2, col: 3, value: '公告欄' }, { row: 2, col: 4, value: '行政〇〇〇' },
      ],
      columns: [
        { header: '申訴管道', width: 220 },
        { header: '是否設置', width: 90 },
        { header: '佐證文件', width: 200 },
        { header: '歸檔位置', width: 160 },
        { header: '負責人員', width: 110 },
      ],
    },
    // [補] 第 4 條 criteria 2：每季申訴彙整檢核表（含0件說明）
    {
      sheetName: '[補] 每季申訴彙整檢核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 2,
      prefillRows: 4,
      prefillCells: [
        { row: 0, col: 0, value: 'Q1（1–3月）' }, { row: 1, col: 0, value: 'Q2（4–6月）' }, { row: 2, col: 0, value: 'Q3（7–9月）' }, { row: 3, col: 0, value: 'Q4（10–12月）' },
        { row: 0, col: 1, value: '是' }, { row: 0, col: 2, value: '2025-03-31' }, { row: 0, col: 3, value: '2件' }, { row: 0, col: 4, value: '—' }, { row: 0, col: 5, value: '社工王〇〇' }, { row: 0, col: 6, value: '主任〇〇〇' },
        { row: 1, col: 1, value: '是' }, { row: 1, col: 2, value: '2025-06-30' }, { row: 1, col: 3, value: '0件' }, { row: 1, col: 4, value: '當季無申訴，仍完成彙整查核' }, { row: 1, col: 5, value: '社工王〇〇' }, { row: 1, col: 6, value: '主任〇〇〇' },
        { row: 2, col: 1, value: '是' }, { row: 2, col: 2, value: '2025-09-30' }, { row: 2, col: 3, value: '1件（已結案）' }, { row: 2, col: 4, value: '—' }, { row: 2, col: 5, value: '社工李〇〇' }, { row: 2, col: 6, value: '主任〇〇〇' },
      ],
      columns: [
        { header: '季度', width: 120 },
        { header: '是否辦理彙整', width: 110 },
        { header: '彙整日期', width: 110 },
        { header: '申訴件數', width: 90 },
        { header: '未辦理說明', width: 200 },
        { header: '彙整人員', width: 110 },
        { header: '主管核章', width: 100 },
      ],
    },
    // [補] 第 4 條 criteria 3：申訴回覆結果改善追蹤
    {
      sheetName: '[補] 申訴回覆結果追蹤表',
      archetype: 'care-plan',
      criteriaIndex: 3,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: '服務準時率申訴（王〇〇，2025-01-05）' }, { row: 0, col: 1, value: '準時率提升至≥90%' }, { row: 0, col: 2, value: '調整排班+GPS打卡管控' }, { row: 0, col: 3, value: '2025-03-31' }, { row: 0, col: 4, value: '達標，準時率92%' }, { row: 0, col: 5, value: '持續監測' }, { row: 0, col: 6, value: '督導王〇〇' },
        { row: 1, col: 0, value: '照服員服務態度申訴（李〇〇，2025-02-18）' }, { row: 1, col: 1, value: '申訴人滿意解決' }, { row: 1, col: 2, value: '與照服員溝通+安排換人服務' }, { row: 1, col: 3, value: '2025-03-01' }, { row: 1, col: 4, value: '結案，申訴人已滿意' }, { row: 1, col: 5, value: '已結案' }, { row: 1, col: 6, value: '社工王〇〇' },
        { row: 2, col: 0, value: '收費說明不清申訴（陳〇〇，2025-03-10）' }, { row: 2, col: 1, value: '完整說明收費明細' }, { row: 2, col: 2, value: '寄送收費說明書+電話說明' }, { row: 2, col: 3, value: '2025-03-15' }, { row: 2, col: 4, value: '結案，申訴人滿意' }, { row: 2, col: 5, value: '已結案' }, { row: 2, col: 6, value: '行政〇〇〇' },
      ],
      columns: [
        { header: '申訴事由（含個案/日期）', width: 240 },
        { header: '改善目標', width: 180 },
        { header: '改善措施', width: 200 },
        { header: '執行期限', width: 110 },
        { header: '執行結果', width: 160 },
        { header: '後續追蹤', width: 130 },
        { header: '負責人', width: 100 },
      ],
    },
  ],

  /** 5. 入案評估 */
  5: [
    {
      sheetName: '入案需求評估表',
      archetype: 'case-assessment',
      criteriaIndex: 2,
      prefillRows: 5,
      columns: [
        { header: '評估日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: 'ADL分數', width: 100 },
        { header: 'IADL分數', width: 100 },
        { header: '身體功能', width: 160 },
        { header: '居家環境', width: 160 },
        { header: '評估結論', width: 200 },
        { header: '評估人員', width: 100 },
        { header: '簽名', width: 80 },
      ],
    },
    {
      sheetName: '定期評估更新記錄',
      archetype: 'care-plan',
      criteriaIndex: 3,
      prefillRows: 5,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '初評日期', width: 100 },
        { header: '複評日期', width: 100 },
        { header: 'ADL', width: 80 },
        { header: 'IADL', width: 80 },
        { header: '變化摘要', width: 200 },
        { header: '更新人員', width: 100 },
      ],
    },
    // [補] 第 5 條 criteria 0：評估工具版本與效度說明（ADL/IADL標準化）
    {
      sheetName: '[補] 評估工具版本管控表',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: 'v1.0' }, { row: 0, col: 1, value: '2024-01-01' }, { row: 0, col: 2, value: '—' }, { row: 0, col: 3, value: '採用Barthel Index(ADL)+Lawton(IADL)' }, { row: 0, col: 4, value: '主任〇〇〇' }, { row: 0, col: 5, value: '評估表單夾' }, { row: 0, col: 6, value: '專業資料夾 E-1' },
        { row: 1, col: 0, value: 'v1.1' }, { row: 1, col: 1, value: '2024-01-01' }, { row: 1, col: 2, value: '2024-07-01' }, { row: 1, col: 3, value: '新增居家環境安全評估面向' }, { row: 1, col: 4, value: '督導王〇〇' }, { row: 1, col: 5, value: '評估表單夾' }, { row: 1, col: 6, value: '專業資料夾 E-1' },
        { row: 2, col: 0, value: 'v2.0' }, { row: 2, col: 1, value: '2024-01-01' }, { row: 2, col: 2, value: '2025-01-15' }, { row: 2, col: 3, value: '依衛福部長照2.0指引修訂' }, { row: 2, col: 4, value: '主任〇〇〇' }, { row: 2, col: 5, value: '評估表單夾' }, { row: 2, col: 6, value: '專業資料夾 E-2' },
      ],
      columns: [
        { header: '版次', width: 80 },
        { header: '制定日期', width: 110 },
        { header: '修訂日期', width: 110 },
        { header: '修訂重點', width: 220 },
        { header: '核定人員', width: 110 },
        { header: '公告位置', width: 160 },
        { header: '歸檔位置', width: 160 },
      ],
    },
    // [補] 第 5 條 criteria 0：評估應涵蓋5面向佐證文件檢核
    {
      sheetName: '[補] 評估佐證文件面向檢核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 6,
      prefillCells: [
        { row: 0, col: 0, value: '身體功能評估（含ADL量表）' },
        { row: 1, col: 0, value: '日常生活能力評估（含IADL量表）' },
        { row: 2, col: 0, value: '居家環境安全評估' },
        { row: 3, col: 0, value: '家庭支持系統評估' },
        { row: 4, col: 0, value: '個案主觀需求與偏好' },
        { row: 0, col: 1, value: '✓' }, { row: 0, col: 2, value: 'Barthel Index評估表（個案資料夾）' }, { row: 0, col: 3, value: '個案資料夾' }, { row: 0, col: 4, value: '社工王〇〇' },
        { row: 1, col: 1, value: '✓' }, { row: 1, col: 2, value: 'Lawton IADL評估表（個案資料夾）' }, { row: 1, col: 3, value: '個案資料夾' }, { row: 1, col: 4, value: '社工王〇〇' },
        { row: 2, col: 1, value: '✓' }, { row: 2, col: 2, value: '居家環境安全評估表v1.1' }, { row: 2, col: 3, value: '個案資料夾' }, { row: 2, col: 4, value: '社工李〇〇' },
      ],
      columns: [
        { header: '應涵蓋評估面向', width: 240 },
        { header: '是否具備', width: 90 },
        { header: '佐證文件', width: 200 },
        { header: '歸檔位置', width: 150 },
        { header: '負責人員', width: 110 },
      ],
    },
    // [補] 第 5 條 criteria 2：評估人員資格佐證逐人清冊
    {
      sheetName: '[補] 評估人員資格佐證清冊',
      archetype: 'inventory-list',
      criteriaIndex: 2,
      prefillRows: 15,
      prefillCells: [
        { row: 0, col: 0, value: '王〇〇' }, { row: 0, col: 1, value: '2025-01-15' }, { row: 0, col: 2, value: '社工師/照服員訓練結業證明' }, { row: 0, col: 3, value: '人事資料夾 F-01' }, { row: 0, col: 4, value: '已建檔' }, { row: 0, col: 5, value: '行政〇〇〇' },
        { row: 1, col: 0, value: '李〇〇' }, { row: 1, col: 1, value: '2025-02-08' }, { row: 1, col: 2, value: '照顧服務員訓練結業證書' }, { row: 1, col: 3, value: '人事資料夾 F-02' }, { row: 1, col: 4, value: '已建檔' }, { row: 1, col: 5, value: '行政〇〇〇' },
        { row: 2, col: 0, value: '陳〇〇' }, { row: 2, col: 1, value: '2025-03-20' }, { row: 2, col: 2, value: '社工師證書+照服員結業證明' }, { row: 2, col: 3, value: '人事資料夾 F-03' }, { row: 2, col: 4, value: '已建檔' }, { row: 2, col: 5, value: '行政〇〇〇' },
      ],
      columns: [
        { header: '人員姓名', width: 110 },
        { header: '建檔日期', width: 110 },
        { header: '佐證文件名稱', width: 220 },
        { header: '歸檔位置', width: 160 },
        { header: '備註', width: 120 },
        { header: '承辦人員', width: 110 },
      ],
    },
    // [補] 第 5 條 criteria 3：年度重評到期監控表（至少每年1次）
    {
      sheetName: '[補] 年度重評到期監控表',
      archetype: 'inventory-list',
      criteriaIndex: 3,
      prefillRows: 15,
      prefillCells: [
        { row: 0, col: 0, value: '王〇〇' }, { row: 0, col: 1, value: '2024-03-15' }, { row: 0, col: 2, value: '2025-03-15' }, { row: 0, col: 3, value: '2025-03-10' }, { row: 0, col: 4, value: '已辦（提前5天）' }, { row: 0, col: 5, value: '社工李〇〇' },
        { row: 1, col: 0, value: '李〇〇' }, { row: 1, col: 1, value: '2024-05-01' }, { row: 1, col: 2, value: '2025-05-01' }, { row: 1, col: 3, value: '—' }, { row: 1, col: 4, value: '即將到期（14天內）' }, { row: 1, col: 5, value: '社工李〇〇' },
        { row: 2, col: 0, value: '陳〇〇' }, { row: 2, col: 1, value: '2024-02-20' }, { row: 2, col: 2, value: '2025-02-20' }, { row: 2, col: 3, value: '2025-03-05' }, { row: 2, col: 4, value: '逾期（已補辦）' }, { row: 2, col: 5, value: '社工王〇〇' },
      ],
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '上次評估日期', width: 120 },
        { header: '下次到期日', width: 120 },
        { header: '實際辦理日期', width: 120 },
        { header: '狀態', width: 160 },
        { header: '承辦人員', width: 110 },
      ],
    },
  ],

  /** 6. 個別服務計畫 */
  6: [
    {
      sheetName: '個別服務計畫表',
      archetype: 'care-plan',
      criteriaIndex: 0,
      prefillRows: 5,
      columns: [
        { header: '計畫日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '服務目標', width: 180 },
        { header: '服務項目', width: 180 },
        { header: '頻率', width: 90 },
        { header: '負責人員', width: 100 },
        { header: '同意簽署', width: 100 },
        { header: '下次檢視日期', width: 120 },
      ],
    },
    // [補] 第 6 條 criteria 0：評估與計畫一致性對照表
    {
      sheetName: '[補] 評估↔計畫一致性對照表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 8,
      prefillCells: [
        { row: 0, col: 0, value: '王〇〇' }, { row: 0, col: 1, value: '2025-01-15（入案評估）' }, { row: 0, col: 2, value: '身體照顧/日常生活協助' }, { row: 0, col: 3, value: '✓ 一致' }, { row: 0, col: 4, value: '社工王〇〇' },
        { row: 1, col: 0, value: '李〇〇' }, { row: 1, col: 1, value: '2025-02-08（入案評估）' }, { row: 1, col: 2, value: '身體照顧/備餐/洗衣' }, { row: 1, col: 3, value: '✓ 一致' }, { row: 1, col: 4, value: '社工李〇〇' },
        { row: 2, col: 0, value: '陳〇〇' }, { row: 2, col: 1, value: '2025-03-20（入案評估）' }, { row: 2, col: 2, value: '身體照顧/環境清潔' }, { row: 2, col: 3, value: '✓ 一致' }, { row: 2, col: 4, value: '社工王〇〇' },
      ],
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '評估日期與結果', width: 200 },
        { header: '計畫服務項目', width: 200 },
        { header: '一致性判斷', width: 120 },
        { header: '審核人員', width: 110 },
      ],
    },
    // [補] 第 6 條 criteria 1：計畫必填4要素檢核
    {
      sheetName: '[補] 計畫必填要素檢核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
      prefillRows: 6,
      prefillCells: [
        { row: 0, col: 0, value: '服務目標（具體可測量）' },
        { row: 1, col: 0, value: '服務項目（身體照顧/生活協助等）' },
        { row: 2, col: 0, value: '服務頻率（每週N次/每次N小時）' },
        { row: 3, col: 0, value: '負責照服員姓名' },
        { row: 0, col: 1, value: '✓' }, { row: 0, col: 2, value: '個別服務計畫表（個案資料夾）' }, { row: 0, col: 3, value: '個案資料夾 A-01' }, { row: 0, col: 4, value: '社工王〇〇' },
        { row: 1, col: 1, value: '✓' }, { row: 1, col: 2, value: '個別服務計畫表' }, { row: 1, col: 3, value: '個案資料夾 A-01' }, { row: 1, col: 4, value: '社工王〇〇' },
        { row: 2, col: 1, value: '✓' }, { row: 2, col: 2, value: '個別服務計畫表' }, { row: 2, col: 3, value: '個案資料夾 A-01' }, { row: 2, col: 4, value: '社工王〇〇' },
      ],
      columns: [
        { header: '計畫必填要素', width: 240 },
        { header: '是否具備', width: 90 },
        { header: '佐證文件', width: 200 },
        { header: '歸檔位置', width: 150 },
        { header: '負責人員', width: 110 },
      ],
    },
    // [補] 第 6 條 criteria 2：計畫簽署逐案佐證清冊
    {
      sheetName: '[補] 計畫簽署逐案佐證清冊',
      archetype: 'inventory-list',
      criteriaIndex: 2,
      prefillRows: 15,
      prefillCells: [
        { row: 0, col: 0, value: '王〇〇' }, { row: 0, col: 1, value: '2025-01-15' }, { row: 0, col: 2, value: '個別服務計畫表 v1.0' }, { row: 0, col: 3, value: '個案資料夾 A-01' }, { row: 0, col: 4, value: '本人簽署' }, { row: 0, col: 5, value: '社工王〇〇' },
        { row: 1, col: 0, value: '李〇〇' }, { row: 1, col: 1, value: '2025-02-08' }, { row: 1, col: 2, value: '個別服務計畫表 v1.0' }, { row: 1, col: 3, value: '個案資料夾 A-02' }, { row: 1, col: 4, value: '家屬代簽（本人失能）' }, { row: 1, col: 5, value: '社工李〇〇' },
        { row: 2, col: 0, value: '陳〇〇' }, { row: 2, col: 1, value: '2025-03-20' }, { row: 2, col: 2, value: '個別服務計畫表 v1.0' }, { row: 2, col: 3, value: '個案資料夾 A-03' }, { row: 2, col: 4, value: '本人簽署' }, { row: 2, col: 5, value: '社工王〇〇' },
      ],
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '簽署日期', width: 110 },
        { header: '佐證文件名稱', width: 200 },
        { header: '歸檔位置', width: 160 },
        { header: '備註', width: 140 },
        { header: '承辦人員', width: 110 },
      ],
    },
    // [補] 第 6 條 criteria 3：半年計畫檢視到期監控表
    {
      sheetName: '[補] 半年計畫檢視到期監控表',
      archetype: 'inventory-list',
      criteriaIndex: 3,
      prefillRows: 15,
      prefillCells: [
        { row: 0, col: 0, value: '王〇〇' }, { row: 0, col: 1, value: '2024-07-15（上次計畫日期）' }, { row: 0, col: 2, value: '2025-01-15（6個月到期）' }, { row: 0, col: 3, value: '2025-01-10' }, { row: 0, col: 4, value: '已辦（提前5天）' }, { row: 0, col: 5, value: '社工李〇〇' },
        { row: 1, col: 0, value: '李〇〇' }, { row: 1, col: 1, value: '2024-08-08（上次計畫日期）' }, { row: 1, col: 2, value: '2025-02-08（6個月到期）' }, { row: 1, col: 3, value: '—' }, { row: 1, col: 4, value: '即將到期（7天內）' }, { row: 1, col: 5, value: '社工李〇〇' },
        { row: 2, col: 0, value: '陳〇〇' }, { row: 2, col: 1, value: '2024-09-20（上次計畫日期）' }, { row: 2, col: 2, value: '2025-03-20（6個月到期）' }, { row: 2, col: 3, value: '2025-03-25' }, { row: 2, col: 4, value: '逾期5天（已補辦）' }, { row: 2, col: 5, value: '社工王〇〇' },
      ],
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '上次計畫日期', width: 130 },
        { header: '6個月到期日', width: 130 },
        { header: '實際辦理日期', width: 120 },
        { header: '狀態', width: 160 },
        { header: '承辦人員', width: 110 },
      ],
    },
  ],

  /** 7. 服務計畫執行與評值 */
  7: [
    {
      sheetName: '服務執行紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '服務日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '服務項目', width: 180 },
        { header: '執行情形', width: 200 },
        { header: '執行時間', width: 100 },
        { header: '照服員簽名', width: 110 },
      ],
    },
    {
      sheetName: '服務計畫評值記錄',
      archetype: 'care-plan',
      criteriaIndex: 3,
      columns: [
        { header: '評值日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '評值結果', width: 200 },
        { header: '計畫調整內容', width: 200 },
        { header: '通知家屬日期', width: 120 },
        { header: '評值人員', width: 100 },
      ],
    },
    // [補] 第 7 條 criteria 1：每半年評值辦理頻率彙整
    {
      sheetName: '[補] 每半年評值辦理彙整表',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: '2025年上半年（1–6月）' }, { row: 1, col: 0, value: '2025年下半年（7–12月）' }, { row: 2, col: 0, value: '2026年上半年（1–6月）' },
        { row: 0, col: 1, value: '是' }, { row: 0, col: 2, value: '2025-06-30' }, { row: 0, col: 3, value: '18名個案全數完成評值' }, { row: 0, col: 4, value: '—' }, { row: 0, col: 5, value: '社工王〇〇' }, { row: 0, col: 6, value: '主任〇〇〇' },
        { row: 1, col: 1, value: '是' }, { row: 1, col: 2, value: '2025-12-31' }, { row: 1, col: 3, value: '20名個案全數完成評值' }, { row: 1, col: 4, value: '—' }, { row: 1, col: 5, value: '社工李〇〇' }, { row: 1, col: 6, value: '主任〇〇〇' },
        { row: 2, col: 1, value: '進行中' }, { row: 2, col: 2, value: '—' }, { row: 2, col: 3, value: '預計6月完成' }, { row: 2, col: 4, value: '—' }, { row: 2, col: 5, value: '社工王〇〇' }, { row: 2, col: 6, value: '主任〇〇〇' },
      ],
      columns: [
        { header: '期間', width: 180 },
        { header: '是否辦理', width: 100 },
        { header: '辦理日期', width: 110 },
        { header: '完成件數/說明', width: 200 },
        { header: '未辦理說明', width: 160 },
        { header: '彙整人員', width: 110 },
        { header: '主管核章', width: 100 },
      ],
    },
    // [補] 第 7 條 criteria 2：評值↔計畫調整一致性對照表
    {
      sheetName: '[補] 評值↔計畫調整一致性對照表',
      archetype: 'inspection-checklist',
      criteriaIndex: 2,
      prefillRows: 8,
      prefillCells: [
        { row: 0, col: 0, value: '王〇〇' }, { row: 0, col: 1, value: '2025-01-10（評值日）' }, { row: 0, col: 2, value: '增加移位協助頻率' }, { row: 0, col: 3, value: '✓ 計畫已調整' }, { row: 0, col: 4, value: '社工王〇〇' },
        { row: 1, col: 0, value: '李〇〇' }, { row: 1, col: 1, value: '2025-02-05（評值日）' }, { row: 1, col: 2, value: '無需調整（狀態穩定）' }, { row: 1, col: 3, value: '✓ 維持原計畫' }, { row: 1, col: 4, value: '社工李〇〇' },
        { row: 2, col: 0, value: '陳〇〇' }, { row: 2, col: 1, value: '2025-03-15（評值日）' }, { row: 2, col: 2, value: '減少服務頻率（功能進步）' }, { row: 2, col: 3, value: '✓ 計畫已調整' }, { row: 2, col: 4, value: '社工王〇〇' },
      ],
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '評值日期', width: 150 },
        { header: '評值建議調整事項', width: 220 },
        { header: '計畫調整狀態', width: 140 },
        { header: '審核人員', width: 110 },
      ],
    },
    // [補] 第 7 條 criteria 3：計畫調整通知逐案佐證清冊
    {
      sheetName: '[補] 計畫調整通知逐案佐證清冊',
      archetype: 'inventory-list',
      criteriaIndex: 3,
      prefillRows: 15,
      prefillCells: [
        { row: 0, col: 0, value: '王〇〇' }, { row: 0, col: 1, value: '2025-01-12' }, { row: 0, col: 2, value: '計畫調整通知書（電話通知記錄）' }, { row: 0, col: 3, value: '個案資料夾 A-01' }, { row: 0, col: 4, value: '家屬已知悉並同意' }, { row: 0, col: 5, value: '社工王〇〇' },
        { row: 1, col: 0, value: '陳〇〇' }, { row: 1, col: 1, value: '2025-03-18' }, { row: 1, col: 2, value: '計畫調整說明書（書面）' }, { row: 1, col: 3, value: '個案資料夾 A-03' }, { row: 1, col: 4, value: '本人簽署確認' }, { row: 1, col: 5, value: '社工王〇〇' },
        { row: 2, col: 0, value: '張〇〇' }, { row: 2, col: 1, value: '2025-04-05' }, { row: 2, col: 2, value: '計畫調整LINE訊息截圖' }, { row: 2, col: 3, value: '個案資料夾 A-04' }, { row: 2, col: 4, value: '家屬回覆確認' }, { row: 2, col: 5, value: '社工李〇〇' },
      ],
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '通知日期', width: 110 },
        { header: '佐證文件名稱', width: 200 },
        { header: '歸檔位置', width: 160 },
        { header: '備註', width: 140 },
        { header: '承辦人員', width: 110 },
      ],
    },
  ],

  /** 8. 身體照顧服務 */
  8: [
    {
      sheetName: '身體照顧服務紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '服務日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '服務項目', width: 180 },
        { header: '服務情形', width: 200 },
        { header: '異常事項', width: 160 },
        { header: '照服員簽名', width: 110 },
      ],
    },
    // [補] 第 8 條 criteria 0：身體照顧4類SOP版本管控
    {
      sheetName: '[補] 身體照顧SOP版本管控表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 6,
      prefillCells: [
        { row: 0, col: 0, value: '協助盥洗SOP（洗臉/刷牙/沐浴）' },
        { row: 1, col: 0, value: '如廁協助SOP（馬桶移位/尿布更換）' },
        { row: 2, col: 0, value: '移位翻身SOP（預防壓瘡操作步驟）' },
        { row: 3, col: 0, value: '步行輔助SOP（助行器/輪椅操作）' },
        { row: 0, col: 1, value: 'v1.1' }, { row: 0, col: 2, value: '協助盥洗SOP v1.1（2025-01）' }, { row: 0, col: 3, value: '員工手冊/SOP資料夾' }, { row: 0, col: 4, value: '督導王〇〇' },
        { row: 1, col: 1, value: 'v1.0' }, { row: 1, col: 2, value: '如廁協助SOP v1.0（2024-01）' }, { row: 1, col: 3, value: '員工手冊/SOP資料夾' }, { row: 1, col: 4, value: '督導王〇〇' },
        { row: 2, col: 1, value: 'v2.0' }, { row: 2, col: 2, value: '移位翻身SOP v2.0（2025-02）' }, { row: 2, col: 3, value: '員工手冊/SOP資料夾' }, { row: 2, col: 4, value: '督導王〇〇' },
      ],
      columns: [
        { header: 'SOP名稱', width: 240 },
        { header: '現行版次', width: 100 },
        { header: '佐證文件', width: 200 },
        { header: '歸檔位置', width: 160 },
        { header: '負責人員', width: 110 },
      ],
    },
    // [補] 第 8 條 criteria 2：居家環境跌倒預防安全檢核表
    {
      sheetName: '[補] 居家環境跌倒預防檢核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 2,
      prefillRows: 8,
      prefillCells: [
        { row: 0, col: 0, value: '地板防滑措施（防滑墊/止滑條）' },
        { row: 1, col: 0, value: '走道/通路無障礙（電線整理、家具排列）' },
        { row: 2, col: 0, value: '照明充足（走道、廁所、臥室）' },
        { row: 3, col: 0, value: '浴室/廁所扶手安裝' },
        { row: 0, col: 1, value: '王〇〇（2025-01-20）' }, { row: 0, col: 2, value: '✓ 符合' }, { row: 0, col: 3, value: '—' }, { row: 0, col: 4, value: '照服員王〇〇' },
        { row: 1, col: 1, value: '王〇〇（2025-01-20）' }, { row: 1, col: 2, value: '✓ 符合' }, { row: 1, col: 3, value: '—' }, { row: 1, col: 4, value: '照服員王〇〇' },
        { row: 2, col: 1, value: '王〇〇（2025-01-20）' }, { row: 2, col: 2, value: '✗ 不符合' }, { row: 2, col: 3, value: '廁所照明不足，建議加裝感應燈' }, { row: 2, col: 4, value: '照服員王〇〇' },
      ],
      columns: [
        { header: '安全查核項目', width: 240 },
        { header: '個案姓名/查核日期', width: 160 },
        { header: '查核結果', width: 100 },
        { header: '改善建議', width: 200 },
        { header: '查核人員', width: 110 },
      ],
    },
    // [補] 第 8 條 criteria 3：照服員服務態度督導抽查紀錄
    {
      sheetName: '[補] 照服員服務態度抽查紀錄',
      archetype: 'daily-record',
      criteriaIndex: 3,
      prefillRows: 6,
      prefillCells: [
        { row: 0, col: 0, value: '2025-01-15' }, { row: 0, col: 1, value: '王照服員' }, { row: 0, col: 2, value: '王〇〇（個案）' }, { row: 0, col: 3, value: '入戶訪視' }, { row: 0, col: 4, value: '服務態度佳，個案表示滿意' }, { row: 0, col: 5, value: '督導王〇〇' },
        { row: 1, col: 0, value: '2025-02-20' }, { row: 1, col: 1, value: '李照服員' }, { row: 1, col: 2, value: '李〇〇（個案）' }, { row: 1, col: 3, value: '電話訪問個案' }, { row: 1, col: 4, value: '個案反映照服員有耐心，整體滿意' }, { row: 1, col: 5, value: '督導王〇〇' },
        { row: 2, col: 0, value: '2025-03-10' }, { row: 2, col: 1, value: '陳照服員' }, { row: 2, col: 2, value: '陳〇〇（個案）' }, { row: 2, col: 3, value: '入戶訪視' }, { row: 2, col: 4, value: '服務態度良好，操作手法正確' }, { row: 2, col: 5, value: '督導李〇〇' },
      ],
      columns: [
        { header: '抽查日期', width: 100 },
        { header: '照服員姓名', width: 110 },
        { header: '服務個案', width: 110 },
        { header: '抽查方式', width: 130 },
        { header: '觀察/回饋紀錄', width: 220 },
        { header: '督導簽名', width: 100 },
      ],
    },
  ],

  /** 9. 日常生活協助 */
  9: [
    {
      sheetName: '日常生活協助紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 2,
      columns: [
        { header: '服務日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '家務項目', width: 160 },
        { header: '執行情形', width: 200 },
        { header: '備餐內容', width: 160 },
        { header: '照服員簽名', width: 110 },
      ],
    },
    // [補] 第 9 條 criteria 0：家務協助月度執行彙整
    {
      sheetName: '[補] 家務協助月度執行彙整表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 6,
      prefillCells: [
        { row: 0, col: 0, value: '2025年1月' }, { row: 1, col: 0, value: '2025年2月' }, { row: 2, col: 0, value: '2025年3月' },
        { row: 0, col: 1, value: '是' }, { row: 0, col: 2, value: '完成率100%（18/18名個案）' }, { row: 0, col: 3, value: '—' }, { row: 0, col: 4, value: '社工王〇〇' }, { row: 0, col: 5, value: '主任〇〇〇' },
        { row: 1, col: 1, value: '是' }, { row: 1, col: 2, value: '完成率100%（18/18名個案）' }, { row: 1, col: 3, value: '—' }, { row: 1, col: 4, value: '社工王〇〇' }, { row: 1, col: 5, value: '主任〇〇〇' },
        { row: 2, col: 1, value: '是' }, { row: 2, col: 2, value: '完成率94%（17/18，1名個案因病暫停）' }, { row: 2, col: 3, value: '—' }, { row: 2, col: 4, value: '社工李〇〇' }, { row: 2, col: 5, value: '主任〇〇〇' },
      ],
      columns: [
        { header: '月份', width: 110 },
        { header: '是否辦理', width: 90 },
        { header: '完成情形/比率', width: 220 },
        { header: '未辦理說明', width: 160 },
        { header: '彙整人員', width: 110 },
        { header: '主管核章', width: 100 },
      ],
    },
    // [補] 第 9 條 criteria 3：家務協助服務範疇公告表（可/不可事項清單）
    {
      sheetName: '[補] 家務協助服務範疇公告表',
      archetype: 'inspection-checklist',
      criteriaIndex: 3,
      prefillRows: 10,
      prefillCells: [
        { row: 0, col: 0, value: '【可提供】備餐（依個案飲食需求）' },
        { row: 1, col: 0, value: '【可提供】洗衣（個案個人衣物）' },
        { row: 2, col: 0, value: '【可提供】個案居室清潔（臥室、廁所）' },
        { row: 3, col: 0, value: '【不可提供】全家人共同飲食料理' },
        { row: 4, col: 0, value: '【不可提供】非個案使用之房間清潔' },
        { row: 5, col: 0, value: '【不可提供】購買私人物品以外之代辦事項' },
        { row: 0, col: 1, value: '✓ 明訂於服務規範 v2.0' }, { row: 0, col: 2, value: '服務規範/員工手冊' }, { row: 0, col: 3, value: '已公告+個案說明' }, { row: 0, col: 4, value: '主任〇〇〇' },
        { row: 1, col: 1, value: '✓ 明訂於服務規範 v2.0' }, { row: 1, col: 2, value: '服務規範/員工手冊' }, { row: 1, col: 3, value: '已公告+個案說明' }, { row: 1, col: 4, value: '主任〇〇〇' },
        { row: 2, col: 1, value: '✓ 明訂於服務規範 v2.0' }, { row: 2, col: 2, value: '服務規範/員工手冊' }, { row: 2, col: 3, value: '已公告+個案說明' }, { row: 2, col: 4, value: '主任〇〇〇' },
      ],
      columns: [
        { header: '服務範疇規定', width: 260 },
        { header: '是否明訂', width: 160 },
        { header: '佐證文件', width: 180 },
        { header: '公告方式', width: 150 },
        { header: '負責人員', width: 110 },
      ],
    },
    // [補] 第 9 條 criteria 3：服務範疇爭議案件紀錄
    {
      sheetName: '[補] 服務範疇爭議案件紀錄',
      archetype: 'incident-log',
      criteriaIndex: 3,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: '2025-01-22' }, { row: 0, col: 1, value: '王〇〇（家屬）' }, { row: 0, col: 2, value: '要求照服員料理全家晚餐' }, { row: 0, col: 3, value: '說明服務範疇規定，僅提供個案餐食' }, { row: 0, col: 4, value: '家屬理解接受' }, { row: 0, col: 5, value: '社工王〇〇' },
        { row: 1, col: 0, value: '2025-02-18' }, { row: 1, col: 1, value: '李〇〇（個案）' }, { row: 1, col: 2, value: '要求清掃非個案使用房間' }, { row: 1, col: 3, value: '說明服務範疇，提供個案臥室清潔' }, { row: 1, col: 4, value: '個案同意' }, { row: 1, col: 5, value: '社工李〇〇' },
        { row: 2, col: 0, value: '2025-03-30' }, { row: 2, col: 1, value: '陳〇〇（家屬）' }, { row: 2, col: 2, value: '要求採買大量食材' }, { row: 2, col: 3, value: '解釋代購限個案個人所需，協助少量採買' }, { row: 2, col: 4, value: '家屬接受' }, { row: 2, col: 5, value: '社工王〇〇' },
      ],
      columns: [
        { header: '發生日期', width: 100 },
        { header: '爭議人', width: 110 },
        { header: '爭議內容', width: 220 },
        { header: '處理方式', width: 200 },
        { header: '結果', width: 160 },
        { header: '處理人員', width: 100 },
      ],
    },
  ],

  /** 10. 緊急事件處理 */
  10: [
    {
      sheetName: '緊急事件通報記錄表',
      archetype: 'incident-log',
      criteriaIndex: 1,
      columns: [
        { header: '發生日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '事件類型', width: 140 },
        { header: '處理過程', width: 240 },
        { header: '通報對象', width: 120 },
        { header: '追蹤結果', width: 180 },
        { header: '處理人員', width: 100 },
      ],
    },
    {
      sheetName: '緊急事件訓練記錄',
      archetype: 'training-record',
      criteriaIndex: 3,
      columns: [
        { header: '訓練日期', width: 100 },
        { header: '訓練主題', width: 180 },
        { header: '訓練時數', width: 100 },
        { header: '參加人員', width: 180 },
        { header: '講師', width: 100 },
        { header: '簽到', width: 80 },
      ],
    },
    // [補] 第 10 條 criteria 0：緊急事件3類SOP版本管控
    {
      sheetName: '[補] 緊急事件SOP版本管控表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: '跌倒緊急處理SOP（入戶跌倒應變流程）' },
        { row: 1, col: 0, value: '急症/送醫SOP（119通報+家屬通知程序）' },
        { row: 2, col: 0, value: '個案失蹤SOP（通報主管/警察/家屬步驟）' },
        { row: 0, col: 1, value: 'v1.1' }, { row: 0, col: 2, value: '緊急事件SOP手冊 v1.1（2024-06）' }, { row: 0, col: 3, value: 'SOP資料夾/員工手冊' }, { row: 0, col: 4, value: '督導王〇〇' },
        { row: 1, col: 1, value: 'v2.0' }, { row: 1, col: 2, value: '緊急事件SOP手冊 v2.0（2025-01）' }, { row: 1, col: 3, value: 'SOP資料夾/員工手冊' }, { row: 1, col: 4, value: '督導王〇〇' },
        { row: 2, col: 1, value: 'v1.0' }, { row: 2, col: 2, value: '緊急事件SOP手冊 v1.0（2024-01）' }, { row: 2, col: 3, value: 'SOP資料夾/員工手冊' }, { row: 2, col: 4, value: '督導王〇〇' },
      ],
      columns: [
        { header: 'SOP類別', width: 260 },
        { header: '現行版次', width: 100 },
        { header: '佐證文件', width: 200 },
        { header: '歸檔位置', width: 160 },
        { header: '負責人員', width: 110 },
      ],
    },
    // [補] 第 10 條 criteria 1：緊急事件通報追蹤改善
    {
      sheetName: '[補] 緊急事件追蹤改善紀錄表',
      archetype: 'care-plan',
      criteriaIndex: 1,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: '王〇〇跌倒事件（2025-01-15）' }, { row: 0, col: 1, value: '3個月內無跌倒再發生' }, { row: 0, col: 2, value: '加裝浴室防滑墊+協助入浴改為坐浴' }, { row: 0, col: 3, value: '2025-04-15' }, { row: 0, col: 4, value: '達標，3個月無跌倒' }, { row: 0, col: 5, value: '持續監測' }, { row: 0, col: 6, value: '督導王〇〇' },
        { row: 1, col: 0, value: '李〇〇急症送醫（2025-02-20）' }, { row: 1, col: 1, value: '家屬通知流程標準化' }, { row: 1, col: 2, value: '修訂緊急聯絡清冊+SOP演練' }, { row: 1, col: 3, value: '2025-03-31' }, { row: 1, col: 4, value: '完成修訂，已演練' }, { row: 1, col: 5, value: '已結案' }, { row: 1, col: 6, value: '督導王〇〇' },
        { row: 2, col: 0, value: '陳〇〇急症（2025-03-05）' }, { row: 2, col: 1, value: '緊急聯絡完成率100%' }, { row: 2, col: 2, value: '確認所有個案緊急聯絡人資料完整' }, { row: 2, col: 3, value: '2025-04-30' }, { row: 2, col: 4, value: '進行中' }, { row: 2, col: 5, value: '月度追蹤' }, { row: 2, col: 6, value: '社工王〇〇' },
      ],
      columns: [
        { header: '事件描述（含個案/日期）', width: 220 },
        { header: '改善目標', width: 180 },
        { header: '改善措施', width: 200 },
        { header: '執行期限', width: 110 },
        { header: '執行結果', width: 160 },
        { header: '後續追蹤', width: 130 },
        { header: '負責人', width: 100 },
      ],
    },
    // [補] 第 10 條 criteria 2：緊急聯絡窗口5處清冊
    {
      sheetName: '[補] 緊急聯絡窗口清冊',
      archetype: 'inspection-checklist',
      criteriaIndex: 2,
      prefillRows: 6,
      prefillCells: [
        { row: 0, col: 0, value: '主要家屬/法定監護人' },
        { row: 1, col: 0, value: '家庭醫師/特約醫療院所' },
        { row: 2, col: 0, value: '119消防救護' },
        { row: 3, col: 0, value: '1966長照專線（緊急資源）' },
        { row: 4, col: 0, value: '機構督導/緊急值班人員' },
        { row: 0, col: 1, value: '✓ 已建立' }, { row: 0, col: 2, value: '個案緊急聯絡表（個案資料夾）' }, { row: 0, col: 3, value: '個案資料夾' }, { row: 0, col: 4, value: '社工王〇〇' },
        { row: 1, col: 1, value: '✓ 已建立' }, { row: 1, col: 2, value: '個案緊急聯絡表（家醫欄位）' }, { row: 1, col: 3, value: '個案資料夾' }, { row: 1, col: 4, value: '社工王〇〇' },
        { row: 2, col: 1, value: '✓ 公告' }, { row: 2, col: 2, value: 'SOP手冊第1條/員工手機存號' }, { row: 2, col: 3, value: '員工手冊+個人手機' }, { row: 2, col: 4, value: '督導王〇〇' },
      ],
      columns: [
        { header: '緊急聯絡窗口', width: 220 },
        { header: '是否建立', width: 100 },
        { header: '佐證文件', width: 200 },
        { header: '歸檔/告知位置', width: 160 },
        { header: '負責人員', width: 110 },
      ],
    },
    // [補] 第 10 條 criteria 3：緊急事件訓練年度頻率檢核（至少每年1次）
    {
      sheetName: '[補] 緊急事件年度訓練頻率檢核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 3,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: '2023年' }, { row: 1, col: 0, value: '2024年' }, { row: 2, col: 0, value: '2025年' },
        { row: 0, col: 1, value: '是' }, { row: 0, col: 2, value: '2023-11-20' }, { row: 0, col: 3, value: '2次（跌倒+急症演練）' }, { row: 0, col: 4, value: '—' }, { row: 0, col: 5, value: '督導王〇〇' }, { row: 0, col: 6, value: '主任〇〇〇' },
        { row: 1, col: 1, value: '是' }, { row: 1, col: 2, value: '2024-10-15' }, { row: 1, col: 3, value: '2次（跌倒+失蹤演練）' }, { row: 1, col: 4, value: '—' }, { row: 1, col: 5, value: '督導王〇〇' }, { row: 1, col: 6, value: '主任〇〇〇' },
        { row: 2, col: 1, value: '進行中' }, { row: 2, col: 2, value: '—' }, { row: 2, col: 3, value: '預計11月辦理1次' }, { row: 2, col: 4, value: '—' }, { row: 2, col: 5, value: '督導王〇〇' }, { row: 2, col: 6, value: '主任〇〇〇' },
      ],
      columns: [
        { header: '年度', width: 90 },
        { header: '是否辦理', width: 100 },
        { header: '辦理日期', width: 110 },
        { header: '辦理場次/主題', width: 180 },
        { header: '未辦理說明', width: 160 },
        { header: '彙整人員', width: 110 },
        { header: '主管核章', width: 100 },
      ],
    },
  ],

  /** 11. 家屬溝通與參與 */
  11: [
    {
      sheetName: '家屬溝通記錄表',
      archetype: 'meeting-minutes',
      criteriaIndex: 1,
      columns: [
        { header: '溝通日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '溝通方式', width: 120 },
        { header: '溝通對象', width: 110 },
        { header: '主要討論', width: 220 },
        { header: '處理結果', width: 180 },
        { header: '社工簽名', width: 100 },
      ],
    },
    // [補] 第 11 條 criteria 0：每半年家屬溝通辦理頻率彙整
    {
      sheetName: '[補] 每半年家屬溝通辦理彙整表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: '2025年上半年（1–6月）' }, { row: 1, col: 0, value: '2025年下半年（7–12月）' }, { row: 2, col: 0, value: '2026年上半年（1–6月）' },
        { row: 0, col: 1, value: '是' }, { row: 0, col: 2, value: '2025-06-30' }, { row: 0, col: 3, value: '18名個案全數完成家屬溝通' }, { row: 0, col: 4, value: '—' }, { row: 0, col: 5, value: '社工王〇〇' }, { row: 0, col: 6, value: '主任〇〇〇' },
        { row: 1, col: 1, value: '是' }, { row: 1, col: 2, value: '2025-12-31' }, { row: 1, col: 3, value: '20名個案全數完成家屬溝通' }, { row: 1, col: 4, value: '—' }, { row: 1, col: 5, value: '社工李〇〇' }, { row: 1, col: 6, value: '主任〇〇〇' },
        { row: 2, col: 1, value: '進行中' }, { row: 2, col: 2, value: '—' }, { row: 2, col: 3, value: '預計6月完成' }, { row: 2, col: 4, value: '—' }, { row: 2, col: 5, value: '社工王〇〇' }, { row: 2, col: 6, value: '主任〇〇〇' },
      ],
      columns: [
        { header: '期間', width: 180 },
        { header: '是否辦理', width: 100 },
        { header: '辦理日期', width: 110 },
        { header: '完成件數/說明', width: 200 },
        { header: '未辦理說明', width: 160 },
        { header: '彙整人員', width: 110 },
        { header: '主管核章', width: 100 },
      ],
    },
    // [補] 第 11 條 criteria 2：家屬參與計畫調整逐案佐證清冊
    {
      sheetName: '[補] 家屬參與計畫調整佐證清冊',
      archetype: 'inventory-list',
      criteriaIndex: 2,
      prefillRows: 15,
      prefillCells: [
        { row: 0, col: 0, value: '王〇〇' }, { row: 0, col: 1, value: '2025-01-12' }, { row: 0, col: 2, value: '計畫調整說明書+家屬會議紀錄' }, { row: 0, col: 3, value: '個案資料夾 A-01' }, { row: 0, col: 4, value: '家屬出席並簽名確認' }, { row: 0, col: 5, value: '社工王〇〇' },
        { row: 1, col: 0, value: '李〇〇' }, { row: 1, col: 1, value: '2025-02-20' }, { row: 1, col: 2, value: '電話溝通紀錄+計畫確認函' }, { row: 1, col: 3, value: '個案資料夾 A-02' }, { row: 1, col: 4, value: '家屬電話同意' }, { row: 1, col: 5, value: '社工李〇〇' },
        { row: 2, col: 0, value: '陳〇〇' }, { row: 2, col: 1, value: '2025-03-18' }, { row: 2, col: 2, value: '家屬會議記錄+調整計畫書' }, { row: 2, col: 3, value: '個案資料夾 A-03' }, { row: 2, col: 4, value: '家屬出席簽名' }, { row: 2, col: 5, value: '社工王〇〇' },
      ],
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '辦理日期', width: 110 },
        { header: '佐證文件名稱', width: 220 },
        { header: '歸檔位置', width: 160 },
        { header: '備註', width: 140 },
        { header: '承辦人員', width: 110 },
      ],
    },
    // [補] 第 11 條 criteria 3：家屬意見處理追蹤表
    {
      sheetName: '[補] 家屬意見處理追蹤表',
      archetype: 'care-plan',
      criteriaIndex: 3,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: '家屬反映照服員到達時間不穩定' }, { row: 0, col: 1, value: '準時率≥90%' }, { row: 0, col: 2, value: '調整排班+GPS打卡管控' }, { row: 0, col: 3, value: '2025-04-30' }, { row: 0, col: 4, value: '達標，準時率92%' }, { row: 0, col: 5, value: '持續監測' }, { row: 0, col: 6, value: '督導王〇〇' },
        { row: 1, col: 0, value: '家屬希望增加沐浴協助頻率' }, { row: 1, col: 1, value: '依需求調整計畫' }, { row: 1, col: 2, value: '修訂個別服務計畫，增加沐浴次數' }, { row: 1, col: 3, value: '2025-03-15' }, { row: 1, col: 4, value: '完成計畫修訂' }, { row: 1, col: 5, value: '已結案' }, { row: 1, col: 6, value: '社工王〇〇' },
        { row: 2, col: 0, value: '家屬詢問備餐口味調整' }, { row: 2, col: 1, value: '滿足個案飲食偏好' }, { row: 2, col: 2, value: '在個案服務計畫備註飲食喜好' }, { row: 2, col: 3, value: '2025-03-31' }, { row: 2, col: 4, value: '完成備註，照服員已知悉' }, { row: 2, col: 5, value: '已結案' }, { row: 2, col: 6, value: '社工李〇〇' },
      ],
      columns: [
        { header: '家屬意見/問題', width: 220 },
        { header: '改善目標', width: 180 },
        { header: '改善措施', width: 200 },
        { header: '執行期限', width: 110 },
        { header: '執行結果', width: 160 },
        { header: '後續追蹤', width: 130 },
        { header: '負責人', width: 100 },
      ],
    },
  ],

  /** 12. 督導與訪視 */
  12: [
    {
      sheetName: '督導訪視記錄表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      columns: [
        { header: '訪視日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '訪視方式', width: 120 },
        { header: '訪視重點', width: 200 },
        { header: '發現問題', width: 180 },
        { header: '追蹤改善', width: 180 },
        { header: '督導簽名', width: 100 },
      ],
    },
    // [補] 第 12 條 criteria 0：督導制度（含訪視頻率規定）版本管控
    {
      sheetName: '[補] 督導制度版本管控表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: 'v1.0' }, { row: 0, col: 1, value: '2024-01-01' }, { row: 0, col: 2, value: '—' }, { row: 0, col: 3, value: '初版：電訪每月1次、入戶每季1次' }, { row: 0, col: 4, value: '主任〇〇〇' }, { row: 0, col: 5, value: '員工手冊' }, { row: 0, col: 6, value: '行政檔案夾 G-1' },
        { row: 1, col: 0, value: 'v1.1' }, { row: 1, col: 1, value: '2024-01-01' }, { row: 1, col: 2, value: '2024-09-01' }, { row: 1, col: 3, value: '新增照服員定期反映機制' }, { row: 1, col: 4, value: '督導王〇〇' }, { row: 1, col: 5, value: '員工手冊+公告欄' }, { row: 1, col: 6, value: '行政檔案夾 G-1' },
        { row: 2, col: 0, value: 'v2.0' }, { row: 2, col: 1, value: '2024-01-01' }, { row: 2, col: 2, value: '2025-01-15' }, { row: 2, col: 3, value: '修訂：電訪每2週1次' }, { row: 2, col: 4, value: '主任〇〇〇' }, { row: 2, col: 5, value: '全通路公告' }, { row: 2, col: 6, value: '行政檔案夾 G-2' },
      ],
      columns: [
        { header: '版次', width: 80 },
        { header: '制定日期', width: 110 },
        { header: '修訂日期', width: 110 },
        { header: '修訂重點', width: 220 },
        { header: '核定人員', width: 110 },
        { header: '公告位置', width: 160 },
        { header: '歸檔位置', width: 160 },
      ],
    },
    // [補] 第 12 條 criteria 1：入戶/電訪訪視頻率半年彙整（每位照服員）
    {
      sheetName: '[補] 訪視頻率半年彙整表',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: '2025年上半年（1–6月）' }, { row: 1, col: 0, value: '2025年下半年（7–12月）' }, { row: 2, col: 0, value: '2026年上半年（1–6月）' },
        { row: 0, col: 1, value: '是' }, { row: 0, col: 2, value: '2025-06-30' }, { row: 0, col: 3, value: '電訪48次/入戶18次（全員完成）' }, { row: 0, col: 4, value: '—' }, { row: 0, col: 5, value: '督導王〇〇' }, { row: 0, col: 6, value: '主任〇〇〇' },
        { row: 1, col: 1, value: '是' }, { row: 1, col: 2, value: '2025-12-31' }, { row: 1, col: 3, value: '電訪52次/入戶20次（全員完成）' }, { row: 1, col: 4, value: '—' }, { row: 1, col: 5, value: '督導李〇〇' }, { row: 1, col: 6, value: '主任〇〇〇' },
        { row: 2, col: 1, value: '進行中' }, { row: 2, col: 2, value: '—' }, { row: 2, col: 3, value: '預計6月完成彙整' }, { row: 2, col: 4, value: '—' }, { row: 2, col: 5, value: '督導王〇〇' }, { row: 2, col: 6, value: '主任〇〇〇' },
      ],
      columns: [
        { header: '期間', width: 180 },
        { header: '是否辦理', width: 100 },
        { header: '彙整日期', width: 110 },
        { header: '電訪/入戶次數', width: 180 },
        { header: '未達標說明', width: 160 },
        { header: '彙整人員', width: 110 },
        { header: '主管核章', width: 100 },
      ],
    },
    // [補] 第 12 條 criteria 2：督導發現問題追蹤改善紀錄
    {
      sheetName: '[補] 督導問題追蹤改善紀錄',
      archetype: 'care-plan',
      criteriaIndex: 2,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: '服務紀錄填寫不完整（王照服員）' }, { row: 0, col: 1, value: '填寫完整率100%' }, { row: 0, col: 2, value: '個別督導說明+月查核' }, { row: 0, col: 3, value: '2025-03-31' }, { row: 0, col: 4, value: '達標，已完整填寫' }, { row: 0, col: 5, value: '持續監測' }, { row: 0, col: 6, value: '督導王〇〇' },
        { row: 1, col: 0, value: '照服員入戶時間提早未告知個案' }, { row: 1, col: 1, value: '確實依計畫時間服務' }, { row: 1, col: 2, value: '重申入戶前須提前30分通知' }, { row: 1, col: 3, value: '2025-02-28' }, { row: 1, col: 4, value: '已改善，個案滿意' }, { row: 1, col: 5, value: '已結案' }, { row: 1, col: 6, value: '督導王〇〇' },
        { row: 2, col: 0, value: '個案身體狀況異常未即時通報' }, { row: 2, col: 1, value: '通報即時率100%' }, { row: 2, col: 2, value: '加強SOP演練+通報表單隨身攜帶' }, { row: 2, col: 3, value: '2025-04-30' }, { row: 2, col: 4, value: '進行中' }, { row: 2, col: 5, value: '月度追蹤' }, { row: 2, col: 6, value: '督導王〇〇' },
      ],
      columns: [
        { header: '問題/議題', width: 220 },
        { header: '改善目標', width: 180 },
        { header: '改善措施', width: 200 },
        { header: '執行期限', width: 110 },
        { header: '執行結果', width: 160 },
        { header: '後續追蹤', width: 130 },
        { header: '負責人', width: 100 },
      ],
    },
    // [補] 第 12 條 criteria 3：照服員向督導反映事項紀錄
    {
      sheetName: '[補] 照服員向督導反映事項紀錄',
      archetype: 'daily-record',
      criteriaIndex: 3,
      prefillRows: 6,
      prefillCells: [
        { row: 0, col: 0, value: '2025-01-10' }, { row: 0, col: 1, value: '王照服員' }, { row: 0, col: 2, value: '個案狀況反映' }, { row: 0, col: 3, value: '個案王〇〇近日食慾下降，疑似身體不適' }, { row: 0, col: 4, value: '通知社工聯繫家屬，安排家醫訪視' }, { row: 0, col: 5, value: '督導王〇〇' },
        { row: 1, col: 0, value: '2025-02-15' }, { row: 1, col: 1, value: '李照服員' }, { row: 1, col: 2, value: '服務環境反映' }, { row: 1, col: 3, value: '個案李〇〇家中廁所地板破損有跌倒風險' }, { row: 1, col: 4, value: '轉介居家無障礙改善服務' }, { row: 1, col: 5, value: '督導王〇〇' },
        { row: 2, col: 0, value: '2025-03-20' }, { row: 2, col: 1, value: '陳照服員' }, { row: 2, col: 2, value: '服務安排意見' }, { row: 2, col: 3, value: '建議增加陳〇〇洗澡頻率（原每週1次）' }, { row: 2, col: 4, value: '轉社工評估計畫調整可行性' }, { row: 2, col: 5, value: '督導李〇〇' },
      ],
      columns: [
        { header: '反映日期', width: 100 },
        { header: '照服員姓名', width: 110 },
        { header: '反映類別', width: 130 },
        { header: '反映內容', width: 240 },
        { header: '督導處理方式', width: 200 },
        { header: '督導簽名', width: 100 },
      ],
    },
  ],

  /** 13. 服務紀錄 */
  13: [
    {
      sheetName: '服務紀錄查核表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      columns: [
        { header: '查核日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '紀錄完整性', width: 130 },
        { header: '簽名狀況', width: 110 },
        { header: '異常記載', width: 180 },
        { header: '查核人員', width: 100 },
      ],
    },
    // [補] 第 13 條 criteria 0：服務紀錄格式版本管控
    {
      sheetName: '[補] 服務紀錄格式版本管控表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: 'v1.0' }, { row: 0, col: 1, value: '2024-01-01' }, { row: 0, col: 2, value: '—' }, { row: 0, col: 3, value: '初版：含服務日期/時間/項目/執行情形/簽名欄' }, { row: 0, col: 4, value: '主任〇〇〇' }, { row: 0, col: 5, value: '員工手冊/表單夾' }, { row: 0, col: 6, value: '行政檔案夾 H-1' },
        { row: 1, col: 0, value: 'v1.1' }, { row: 1, col: 1, value: '2024-01-01' }, { row: 1, col: 2, value: '2024-08-01' }, { row: 1, col: 3, value: '新增異常事件特別記載欄位' }, { row: 1, col: 4, value: '督導王〇〇' }, { row: 1, col: 5, value: '員工手冊/表單夾' }, { row: 1, col: 6, value: '行政檔案夾 H-1' },
        { row: 2, col: 0, value: 'v2.0' }, { row: 2, col: 1, value: '2024-01-01' }, { row: 2, col: 2, value: '2025-01-15' }, { row: 2, col: 3, value: '改版為電子填報格式' }, { row: 2, col: 4, value: '主任〇〇〇' }, { row: 2, col: 5, value: '系統+表單夾' }, { row: 2, col: 6, value: '行政檔案夾 H-2' },
      ],
      columns: [
        { header: '版次', width: 80 },
        { header: '制定日期', width: 110 },
        { header: '修訂日期', width: 110 },
        { header: '修訂重點', width: 220 },
        { header: '核定人員', width: 110 },
        { header: '公告位置', width: 160 },
        { header: '歸檔位置', width: 160 },
      ],
    },
    // [補] 第 13 條 criteria 2：服務紀錄保存7年歸檔稽核表
    {
      sheetName: '[補] 服務紀錄7年歸檔稽核表',
      archetype: 'inventory-list',
      criteriaIndex: 2,
      prefillRows: 15,
      prefillCells: [
        { row: 0, col: 0, value: '王〇〇（結案2018-03-10）' }, { row: 0, col: 1, value: '2018-03-10' }, { row: 0, col: 2, value: '2025-03-10' }, { row: 0, col: 3, value: '2025-03-10（到期年份保存中）' }, { row: 0, col: 4, value: '保存中（即將到7年）' }, { row: 0, col: 5, value: '行政〇〇〇' },
        { row: 1, col: 0, value: '李〇〇（結案2020-06-15）' }, { row: 1, col: 1, value: '2020-06-15' }, { row: 1, col: 2, value: '2027-06-15' }, { row: 1, col: 3, value: '—' }, { row: 1, col: 4, value: '保存中（7年未到）' }, { row: 1, col: 5, value: '行政〇〇〇' },
        { row: 2, col: 0, value: '陳〇〇（結案2022-09-01）' }, { row: 2, col: 1, value: '2022-09-01' }, { row: 2, col: 2, value: '2029-09-01' }, { row: 2, col: 3, value: '—' }, { row: 2, col: 4, value: '保存中（7年未到）' }, { row: 2, col: 5, value: '行政〇〇〇' },
      ],
      columns: [
        { header: '個案姓名（結案日）', width: 180 },
        { header: '結案日期', width: 110 },
        { header: '7年到期日', width: 110 },
        { header: '銷毀/保存確認日期', width: 140 },
        { header: '狀態', width: 160 },
        { header: '承辦人員', width: 110 },
      ],
    },
    // [補] 第 13 條 criteria 3：異常狀況特別記載月度彙整
    {
      sheetName: '[補] 異常狀況特別記載月度彙整',
      archetype: 'incident-log',
      criteriaIndex: 3,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: '2025-01-22' }, { row: 0, col: 1, value: '王〇〇' }, { row: 0, col: 2, value: '個案體溫異常（38.5°C）' }, { row: 0, col: 3, value: '記載於服務紀錄+通報督導/家屬' }, { row: 0, col: 4, value: '家醫訪視，發燒已退' }, { row: 0, col: 5, value: '社工王〇〇' },
        { row: 1, col: 0, value: '2025-02-10' }, { row: 1, col: 1, value: '李〇〇' }, { row: 1, col: 2, value: '個案拒絕接受服務（情緒激動）' }, { row: 1, col: 3, value: '記載+通報督導，隔日補服務' }, { row: 1, col: 4, value: '個案情緒穩定，服務恢復' }, { row: 1, col: 5, value: '社工李〇〇' },
        { row: 2, col: 0, value: '2025-03-05' }, { row: 2, col: 1, value: '陳〇〇' }, { row: 2, col: 2, value: '個案跌倒（家中輕微擦傷）' }, { row: 2, col: 3, value: '記載+通報督導+家屬確認' }, { row: 2, col: 4, value: '已處理，無大礙' }, { row: 2, col: 5, value: '督導王〇〇' },
      ],
      columns: [
        { header: '發生日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '異常狀況描述', width: 220 },
        { header: '記載與通報方式', width: 200 },
        { header: '後續結果', width: 160 },
        { header: '處理人員', width: 100 },
      ],
    },
  ],

  /** 14. 結案與轉介 */
  14: [
    {
      sheetName: '結案/轉介記錄表',
      archetype: 'care-plan',
      criteriaIndex: 2,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '結案/轉介日期', width: 130 },
        { header: '原因', width: 160 },
        { header: '轉介單位', width: 150 },
        { header: '追蹤日期', width: 100 },
        { header: '追蹤結果', width: 180 },
        { header: '社工簽名', width: 100 },
      ],
    },
    // [補] 第 14 條 criteria 0：結案標準與程序版本管控
    {
      sheetName: '[補] 結案標準與程序版本管控表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: 'v1.0' }, { row: 0, col: 1, value: '2024-01-01' }, { row: 0, col: 2, value: '—' }, { row: 0, col: 3, value: '初版：結案3類標準（完成/轉介/死亡）' }, { row: 0, col: 4, value: '主任〇〇〇' }, { row: 0, col: 5, value: '員工手冊/SOP資料夾' }, { row: 0, col: 6, value: '行政檔案夾 I-1' },
        { row: 1, col: 0, value: 'v1.1' }, { row: 1, col: 1, value: '2024-01-01' }, { row: 1, col: 2, value: '2024-11-01' }, { row: 1, col: 3, value: '新增個案主動申請結案之程序' }, { row: 1, col: 4, value: '督導王〇〇' }, { row: 1, col: 5, value: '員工手冊/SOP資料夾' }, { row: 1, col: 6, value: '行政檔案夾 I-1' },
        { row: 2, col: 0, value: 'v2.0' }, { row: 2, col: 1, value: '2024-01-01' }, { row: 2, col: 2, value: '2025-02-01' }, { row: 2, col: 3, value: '修訂結案摘要告知程序' }, { row: 2, col: 4, value: '主任〇〇〇' }, { row: 2, col: 5, value: '全通路公告' }, { row: 2, col: 6, value: '行政檔案夾 I-2' },
      ],
      columns: [
        { header: '版次', width: 80 },
        { header: '制定日期', width: 110 },
        { header: '修訂日期', width: 110 },
        { header: '修訂重點', width: 220 },
        { header: '核定人員', width: 110 },
        { header: '公告位置', width: 160 },
        { header: '歸檔位置', width: 160 },
      ],
    },
    // [補] 第 14 條 criteria 1：結案摘要告知逐案佐證清冊
    {
      sheetName: '[補] 結案摘要告知逐案佐證清冊',
      archetype: 'inventory-list',
      criteriaIndex: 1,
      prefillRows: 15,
      prefillCells: [
        { row: 0, col: 0, value: '王〇〇' }, { row: 0, col: 1, value: '2025-01-10' }, { row: 0, col: 2, value: '結案摘要報告+告知書' }, { row: 0, col: 3, value: '個案資料夾 A-01（已結案）' }, { row: 0, col: 4, value: '家屬親自領取並簽名' }, { row: 0, col: 5, value: '社工王〇〇' },
        { row: 1, col: 0, value: '李〇〇' }, { row: 1, col: 1, value: '2025-02-18' }, { row: 1, col: 2, value: '結案摘要報告+電話告知記錄' }, { row: 1, col: 3, value: '個案資料夾 A-02（已結案）' }, { row: 1, col: 4, value: '家屬電話確認' }, { row: 1, col: 5, value: '社工李〇〇' },
        { row: 2, col: 0, value: '陳〇〇' }, { row: 2, col: 1, value: '2025-03-25' }, { row: 2, col: 2, value: '結案摘要報告+LINE訊息截圖' }, { row: 2, col: 3, value: '個案資料夾 A-03（已結案）' }, { row: 2, col: 4, value: '家屬回覆確認' }, { row: 2, col: 5, value: '社工王〇〇' },
      ],
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '告知日期', width: 110 },
        { header: '佐證文件名稱', width: 200 },
        { header: '歸檔位置', width: 180 },
        { header: '備註', width: 140 },
        { header: '承辦人員', width: 110 },
      ],
    },
    // [補] 第 14 條 criteria 2：轉介書面資料4要素檢核
    {
      sheetName: '[補] 轉介書面資料檢核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 2,
      prefillRows: 8,
      prefillCells: [
        { row: 0, col: 0, value: '評估資料（ADL/IADL最近一次評估表）' },
        { row: 1, col: 0, value: '個別服務計畫（最新版本）' },
        { row: 2, col: 0, value: '服務紀錄摘要（最近3–6個月）' },
        { row: 3, col: 0, value: '健康狀況說明（用藥/特殊病症）' },
        { row: 0, col: 1, value: '✓' }, { row: 0, col: 2, value: '轉介資料夾（個案王〇〇）' }, { row: 0, col: 3, value: '轉介資料夾' }, { row: 0, col: 4, value: '社工王〇〇' },
        { row: 1, col: 1, value: '✓' }, { row: 1, col: 2, value: '轉介資料夾（個案王〇〇）' }, { row: 1, col: 3, value: '轉介資料夾' }, { row: 1, col: 4, value: '社工王〇〇' },
        { row: 2, col: 1, value: '✓' }, { row: 2, col: 2, value: '轉介資料夾（個案王〇〇）' }, { row: 2, col: 3, value: '轉介資料夾' }, { row: 2, col: 4, value: '社工王〇〇' },
      ],
      columns: [
        { header: '轉介資料要素', width: 240 },
        { header: '是否備齊', width: 90 },
        { header: '佐證文件', width: 200 },
        { header: '歸檔位置', width: 150 },
        { header: '負責人員', width: 110 },
      ],
    },
    // [補] 第 14 條 criteria 3：轉介後追蹤改善紀錄
    {
      sheetName: '[補] 轉介後追蹤紀錄表',
      archetype: 'care-plan',
      criteriaIndex: 3,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: '王〇〇（轉介○○護理之家，2025-01-15）' }, { row: 0, col: 1, value: '確認個案順利入住安置' }, { row: 0, col: 2, value: '轉介後2週電話追蹤' }, { row: 0, col: 3, value: '2025-02-01' }, { row: 0, col: 4, value: '個案已順利入住，適應良好' }, { row: 0, col: 5, value: '已結案' }, { row: 0, col: 6, value: '社工王〇〇' },
        { row: 1, col: 0, value: '李〇〇（轉介急性住院，2025-02-20）' }, { row: 1, col: 1, value: '確認後續照護安排' }, { row: 1, col: 2, value: '出院後追蹤，必要時重新入案' }, { row: 1, col: 3, value: '2025-03-20' }, { row: 1, col: 4, value: '出院後重新入案居家服務' }, { row: 1, col: 5, value: '已重新服務' }, { row: 1, col: 6, value: '社工李〇〇' },
        { row: 2, col: 0, value: '陳〇〇（轉介○○日照中心，2025-03-10）' }, { row: 2, col: 1, value: '確認個案順利到日照服務' }, { row: 2, col: 2, value: '轉介後1個月電話追蹤' }, { row: 2, col: 3, value: '2025-04-10' }, { row: 2, col: 4, value: '個案已到日照，適應中' }, { row: 2, col: 5, value: '持續追蹤' }, { row: 2, col: 6, value: '社工王〇〇' },
      ],
      columns: [
        { header: '個案（轉介單位/日期）', width: 240 },
        { header: '追蹤目標', width: 180 },
        { header: '追蹤措施', width: 200 },
        { header: '追蹤日期', width: 110 },
        { header: '追蹤結果', width: 160 },
        { header: '後續狀態', width: 130 },
        { header: '負責人', width: 100 },
      ],
    },
  ],

  /** 15. 機構行政管理 */
  15: [
    {
      sheetName: '行政會議記錄表',
      archetype: 'meeting-minutes',
      criteriaIndex: 3,
      columns: [
        { header: '會議日期', width: 100 },
        { header: '出席人員', width: 180 },
        { header: '議題', width: 200 },
        { header: '決議事項', width: 200 },
        { header: '執行追蹤', width: 160 },
        { header: '主席簽名', width: 100 },
      ],
    },
    // [補] 第 15 條 criteria 0：組織章程版本管控
    {
      sheetName: '[補] 組織章程版本管控表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: 'v1.0' }, { row: 0, col: 1, value: '2024-01-01' }, { row: 0, col: 2, value: '—' }, { row: 0, col: 3, value: '初版：含宗旨/服務對象/組織架構' }, { row: 0, col: 4, value: '主任〇〇〇' }, { row: 0, col: 5, value: '機構公告欄' }, { row: 0, col: 6, value: '行政檔案夾 J-1' },
        { row: 1, col: 0, value: 'v1.1' }, { row: 1, col: 1, value: '2024-01-01' }, { row: 1, col: 2, value: '2024-09-01' }, { row: 1, col: 3, value: '更新組織架構圖（新增督導職位）' }, { row: 1, col: 4, value: '督導王〇〇' }, { row: 1, col: 5, value: '公告欄' }, { row: 1, col: 6, value: '行政檔案夾 J-1' },
        { row: 2, col: 0, value: 'v2.0' }, { row: 2, col: 1, value: '2024-01-01' }, { row: 2, col: 2, value: '2025-01-15' }, { row: 2, col: 3, value: '依新法規修訂服務對象條件' }, { row: 2, col: 4, value: '主任〇〇〇' }, { row: 2, col: 5, value: '全通路公告' }, { row: 2, col: 6, value: '行政檔案夾 J-2' },
      ],
      columns: [
        { header: '版次', width: 80 },
        { header: '制定日期', width: 110 },
        { header: '修訂日期', width: 110 },
        { header: '修訂重點', width: 220 },
        { header: '核定人員', width: 110 },
        { header: '公告位置', width: 160 },
        { header: '歸檔位置', width: 160 },
      ],
    },
    // [補] 第 15 條 criteria 1：行政SOP清冊（各類作業對應SOP）
    {
      sheetName: '[補] 行政SOP清冊',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
      prefillRows: 8,
      prefillCells: [
        { row: 0, col: 0, value: '入案作業SOP（評估→計畫→服務開始）' },
        { row: 1, col: 0, value: '收退費作業SOP（收費→收據→退費處理）' },
        { row: 2, col: 0, value: '人員請假補班SOP（照服員緊急請假流程）' },
        { row: 3, col: 0, value: '申訴處理SOP（收件→調查→回覆→追蹤）' },
        { row: 0, col: 1, value: 'v1.1（2024-06）' }, { row: 0, col: 2, value: '入案作業SOP手冊' }, { row: 0, col: 3, value: 'SOP資料夾/員工手冊' }, { row: 0, col: 4, value: '督導王〇〇' },
        { row: 1, col: 1, value: 'v1.0（2024-01）' }, { row: 1, col: 2, value: '收退費作業SOP手冊' }, { row: 1, col: 3, value: 'SOP資料夾/行政資料夾' }, { row: 1, col: 4, value: '行政〇〇〇' },
        { row: 2, col: 1, value: 'v2.0（2025-01）' }, { row: 2, col: 2, value: '人員請假補班SOP手冊' }, { row: 2, col: 3, value: 'SOP資料夾/員工手冊' }, { row: 2, col: 4, value: '督導王〇〇' },
      ],
      columns: [
        { header: '行政作業名稱', width: 260 },
        { header: '現行版次', width: 130 },
        { header: '佐證文件', width: 200 },
        { header: '歸檔位置', width: 160 },
        { header: '負責人員', width: 110 },
      ],
    },
    // [補] 第 15 條 criteria 3：行政會議頻率年度彙整（預填12個月）
    {
      sheetName: '[補] 行政會議頻率年度彙整表',
      archetype: 'inspection-checklist',
      criteriaIndex: 3,
      prefillRows: 12,
      prefillCells: [
        { row: 0, col: 0, value: '2025年1月' }, { row: 1, col: 0, value: '2025年2月' }, { row: 2, col: 0, value: '2025年3月' },
        { row: 3, col: 0, value: '2025年4月' }, { row: 4, col: 0, value: '2025年5月' }, { row: 5, col: 0, value: '2025年6月' },
        { row: 6, col: 0, value: '2025年7月' }, { row: 7, col: 0, value: '2025年8月' }, { row: 8, col: 0, value: '2025年9月' },
        { row: 9, col: 0, value: '2025年10月' }, { row: 10, col: 0, value: '2025年11月' }, { row: 11, col: 0, value: '2025年12月' },
        { row: 0, col: 1, value: '是' }, { row: 0, col: 2, value: '2025-01-10' }, { row: 0, col: 3, value: '1次' }, { row: 0, col: 4, value: '—' }, { row: 0, col: 5, value: '行政〇〇〇' }, { row: 0, col: 6, value: '主任〇〇〇' },
        { row: 1, col: 1, value: '是' }, { row: 1, col: 2, value: '2025-02-14' }, { row: 1, col: 3, value: '1次' }, { row: 1, col: 4, value: '—' }, { row: 1, col: 5, value: '行政〇〇〇' }, { row: 1, col: 6, value: '主任〇〇〇' },
        { row: 2, col: 1, value: '是' }, { row: 2, col: 2, value: '2025-03-15' }, { row: 2, col: 3, value: '1次' }, { row: 2, col: 4, value: '—' }, { row: 2, col: 5, value: '行政〇〇〇' }, { row: 2, col: 6, value: '主任〇〇〇' },
      ],
      columns: [
        { header: '月份', width: 110 },
        { header: '是否辦理', width: 90 },
        { header: '辦理日期', width: 110 },
        { header: '場次', width: 70 },
        { header: '未辦理說明', width: 160 },
        { header: '彙整人員', width: 110 },
        { header: '主管核章', width: 100 },
      ],
    },
  ],

  /** 16. 人員配置 */
  16: [
    {
      sheetName: '人員排班一覽表',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 15,
      columns: [
        { header: '人員姓名', width: 110 },
        { header: '職稱', width: 110 },
        { header: '服務時段', width: 130 },
        { header: '服務區域', width: 130 },
        { header: '擔任個案數', width: 110 },
        { header: '備註', width: 140 },
      ],
    },
    // [補] 第 16 條 criteria 0：法規人力配置比對表（照服員/督導依法規）
    {
      sheetName: '[補] 法規人力配置比對表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: '照服員人數（依長服法居家式服務規定）' },
        { row: 1, col: 0, value: '督導人員配置（社工師/照服督導）' },
        { row: 2, col: 0, value: '兼任照服員人數與服務時數' },
        { row: 0, col: 1, value: '法規要求：依服務量配置' }, { row: 0, col: 2, value: '現有照服員12名（含專任8名/兼任4名）' }, { row: 0, col: 3, value: '✓ 符合' }, { row: 0, col: 4, value: '主任〇〇〇' },
        { row: 1, col: 1, value: '法規要求：至少1名督導' }, { row: 1, col: 2, value: '現有督導王〇〇（社工師）1名' }, { row: 1, col: 3, value: '✓ 符合' }, { row: 1, col: 4, value: '主任〇〇〇' },
        { row: 2, col: 1, value: '兼任需登錄核備' }, { row: 2, col: 2, value: '兼任4名，均完成核備' }, { row: 2, col: 3, value: '✓ 符合' }, { row: 2, col: 4, value: '行政〇〇〇' },
      ],
      columns: [
        { header: '配置要求', width: 260 },
        { header: '法規/說明', width: 200 },
        { header: '現況', width: 200 },
        { header: '符合判斷', width: 100 },
        { header: '負責人員', width: 110 },
      ],
    },
    // [補] 第 16 條 criteria 1：排班合理性查核表
    {
      sheetName: '[補] 排班合理性查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
      prefillRows: 6,
      prefillCells: [
        { row: 0, col: 0, value: '服務時段涵蓋個案需求時間（日/夜/假日）' },
        { row: 1, col: 0, value: '照服員單日服務個案數合理（不超過8人次）' },
        { row: 2, col: 0, value: '交通路線規劃合理（同區域集中排班）' },
        { row: 0, col: 1, value: '✓' }, { row: 0, col: 2, value: '排班表（2025年1月）' }, { row: 0, col: 3, value: '行政排班資料夾' }, { row: 0, col: 4, value: '督導王〇〇' },
        { row: 1, col: 1, value: '✓' }, { row: 1, col: 2, value: '排班表（2025年1月，最多6人次/日）' }, { row: 1, col: 3, value: '行政排班資料夾' }, { row: 1, col: 4, value: '督導王〇〇' },
        { row: 2, col: 1, value: '✓' }, { row: 2, col: 2, value: '服務路線規劃圖（2025年1月）' }, { row: 2, col: 3, value: '行政排班資料夾' }, { row: 2, col: 4, value: '督導王〇〇' },
      ],
      columns: [
        { header: '合理性查核項目', width: 280 },
        { header: '是否符合', width: 90 },
        { header: '佐證文件', width: 200 },
        { header: '歸檔位置', width: 160 },
        { header: '查核人員', width: 110 },
      ],
    },
    // [補] 第 16 條 criteria 2：照服員對個案比月度彙整
    {
      sheetName: '[補] 照服員對個案比月度彙整表',
      archetype: 'inspection-checklist',
      criteriaIndex: 2,
      prefillRows: 6,
      prefillCells: [
        { row: 0, col: 0, value: '2025年1月' }, { row: 1, col: 0, value: '2025年2月' }, { row: 2, col: 0, value: '2025年3月' },
        { row: 0, col: 1, value: '是' }, { row: 0, col: 2, value: '2025-01-31' }, { row: 0, col: 3, value: '照服員12人/個案18名（1:1.5）' }, { row: 0, col: 4, value: '—' }, { row: 0, col: 5, value: '行政〇〇〇' }, { row: 0, col: 6, value: '主任〇〇〇' },
        { row: 1, col: 1, value: '是' }, { row: 1, col: 2, value: '2025-02-28' }, { row: 1, col: 3, value: '照服員12人/個案19名（1:1.6）' }, { row: 1, col: 4, value: '—' }, { row: 1, col: 5, value: '行政〇〇〇' }, { row: 1, col: 6, value: '主任〇〇〇' },
        { row: 2, col: 1, value: '是' }, { row: 2, col: 2, value: '2025-03-31' }, { row: 2, col: 3, value: '照服員12人/個案20名（1:1.7）' }, { row: 2, col: 4, value: '—' }, { row: 2, col: 5, value: '行政〇〇〇' }, { row: 2, col: 6, value: '主任〇〇〇' },
      ],
      columns: [
        { header: '月份', width: 110 },
        { header: '是否彙整', width: 90 },
        { header: '彙整日期', width: 110 },
        { header: '照服員/個案比', width: 200 },
        { header: '未彙整說明', width: 140 },
        { header: '彙整人員', width: 110 },
        { header: '主管核章', width: 100 },
      ],
    },
    // [補] 第 16 條 criteria 3：人員缺額補充追蹤表
    {
      sheetName: '[補] 人員缺額補充追蹤表',
      archetype: 'care-plan',
      criteriaIndex: 3,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: '王照服員離職缺額（2025-01-10）' }, { row: 0, col: 1, value: '14天內補充1名照服員' }, { row: 0, col: 2, value: '刊登求才廣告+人力銀行投遞' }, { row: 0, col: 3, value: '2025-01-24' }, { row: 0, col: 4, value: '已聘用李照服員（2025-01-20）' }, { row: 0, col: 5, value: '已結案' }, { row: 0, col: 6, value: '主任〇〇〇' },
        { row: 1, col: 0, value: '督導職缺（2025-02-15）' }, { row: 1, col: 1, value: '30天內補充督導1名' }, { row: 1, col: 2, value: '社工師職缺公告+委託人力仲介' }, { row: 1, col: 3, value: '2025-03-15' }, { row: 1, col: 4, value: '進行中，面試中' }, { row: 1, col: 5, value: '月度追蹤' }, { row: 1, col: 6, value: '主任〇〇〇' },
        { row: 2, col: 0, value: '陳照服員請育嬰假缺額（2025-03-01）' }, { row: 2, col: 1, value: '期間以兼任照服員補充' }, { row: 2, col: 2, value: '調整兼任排班+臨時補充' }, { row: 2, col: 3, value: '2025-03-10' }, { row: 2, col: 4, value: '已以兼任補充，服務未中斷' }, { row: 2, col: 5, value: '持續追蹤' }, { row: 2, col: 6, value: '督導王〇〇' },
      ],
      columns: [
        { header: '缺額情況', width: 220 },
        { header: '補充目標', width: 180 },
        { header: '補充措施', width: 200 },
        { header: '執行期限', width: 110 },
        { header: '執行結果', width: 160 },
        { header: '後續追蹤', width: 130 },
        { header: '負責人', width: 100 },
      ],
    },
  ],

  /** 17. 人員資格 */
  17: [
    {
      sheetName: '人員資格清冊',
      archetype: 'inventory-list',
      criteriaIndex: 1,
      prefillRows: 15,
      columns: [
        { header: '姓名', width: 110 },
        { header: '職稱', width: 110 },
        { header: '資格證書名稱', width: 180 },
        { header: '證書字號', width: 140 },
        { header: '效期', width: 100 },
        { header: '建檔日期', width: 100 },
      ],
    },
    // [補] 第 17 條 criteria 0：照服員訓練結業證明逐人佐證清冊
    {
      sheetName: '[補] 照服員結業證明逐人佐證清冊',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 15,
      prefillCells: [
        { row: 0, col: 0, value: '王〇〇' }, { row: 0, col: 1, value: '2025-01-15' }, { row: 0, col: 2, value: '照顧服務員訓練結業證明（衛生局核備）' }, { row: 0, col: 3, value: '人事資料夾 K-01' }, { row: 0, col: 4, value: '已建檔影本+正本核對' }, { row: 0, col: 5, value: '行政〇〇〇' },
        { row: 1, col: 0, value: '李〇〇' }, { row: 1, col: 1, value: '2025-02-08' }, { row: 1, col: 2, value: '照顧服務員訓練結業證明（衛生局核備）' }, { row: 1, col: 3, value: '人事資料夾 K-02' }, { row: 1, col: 4, value: '已建檔影本' }, { row: 1, col: 5, value: '行政〇〇〇' },
        { row: 2, col: 0, value: '陳〇〇' }, { row: 2, col: 1, value: '2025-03-20' }, { row: 2, col: 2, value: '照顧服務員訓練結業證明（衛生局核備）' }, { row: 2, col: 3, value: '人事資料夾 K-03' }, { row: 2, col: 4, value: '已建檔影本+正本核對' }, { row: 2, col: 5, value: '行政〇〇〇' },
      ],
      columns: [
        { header: '人員姓名', width: 110 },
        { header: '建檔日期', width: 110 },
        { header: '佐證文件名稱', width: 240 },
        { header: '歸檔位置', width: 160 },
        { header: '備註', width: 160 },
        { header: '承辦人員', width: 110 },
      ],
    },
    // [補] 第 17 條 criteria 2：督導人員專業資格佐證清冊
    {
      sheetName: '[補] 督導人員資格佐證清冊',
      archetype: 'inventory-list',
      criteriaIndex: 2,
      prefillRows: 10,
      prefillCells: [
        { row: 0, col: 0, value: '王督導' }, { row: 0, col: 1, value: '2024-01-05' }, { row: 0, col: 2, value: '社會工作師證書（考試院核發）' }, { row: 0, col: 3, value: '人事資料夾 L-01' }, { row: 0, col: 4, value: '已建檔正本掃描+影本' }, { row: 0, col: 5, value: '行政〇〇〇' },
        { row: 1, col: 0, value: '李督導' }, { row: 1, col: 1, value: '2024-03-10' }, { row: 1, col: 2, value: '照顧服務員訓練結業+督導培訓證明' }, { row: 1, col: 3, value: '人事資料夾 L-02' }, { row: 1, col: 4, value: '已建檔' }, { row: 1, col: 5, value: '行政〇〇〇' },
        { row: 2, col: 0, value: '陳督導' }, { row: 2, col: 1, value: '2025-01-15' }, { row: 2, col: 2, value: '社工師證書+長照2.0督導培訓結業' }, { row: 2, col: 3, value: '人事資料夾 L-03' }, { row: 2, col: 4, value: '已建檔影本+掃描檔' }, { row: 2, col: 5, value: '行政〇〇〇' },
      ],
      columns: [
        { header: '人員姓名', width: 110 },
        { header: '建檔日期', width: 110 },
        { header: '佐證文件名稱', width: 240 },
        { header: '歸檔位置', width: 160 },
        { header: '備註', width: 160 },
        { header: '承辦人員', width: 110 },
      ],
    },
    // [補] 第 17 條 criteria 3：新進人員資格審核紀錄
    {
      sheetName: '[補] 新進人員資格審核紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 3,
      prefillRows: 6,
      prefillCells: [
        { row: 0, col: 0, value: '2025-01-15' }, { row: 0, col: 1, value: '王〇〇（照服員）' }, { row: 0, col: 2, value: '照服員結業證明+良民證+健康證明' }, { row: 0, col: 3, value: '✓ 全數齊備' }, { row: 0, col: 4, value: '正式聘用，2025-01-20到職' }, { row: 0, col: 5, value: '行政〇〇〇' },
        { row: 1, col: 0, value: '2025-02-08' }, { row: 1, col: 1, value: '李〇〇（照服員）' }, { row: 1, col: 2, value: '照服員結業證明+良民證+健康證明' }, { row: 1, col: 3, value: '✓ 全數齊備' }, { row: 1, col: 4, value: '正式聘用，2025-02-15到職' }, { row: 1, col: 5, value: '行政〇〇〇' },
        { row: 2, col: 0, value: '2025-03-20' }, { row: 2, col: 1, value: '陳〇〇（督導）' }, { row: 2, col: 2, value: '社工師證書+歷年工作證明+健康證明' }, { row: 2, col: 3, value: '✓ 全數齊備' }, { row: 2, col: 4, value: '正式聘用，2025-04-01到職' }, { row: 2, col: 5, value: '主任〇〇〇' },
      ],
      columns: [
        { header: '審核日期', width: 100 },
        { header: '人員姓名（職稱）', width: 150 },
        { header: '應備資格文件', width: 240 },
        { header: '審核結果', width: 120 },
        { header: '後續處理', width: 180 },
        { header: '審核人員', width: 100 },
      ],
    },
  ],

  /** 18. 人員訓練 */
  18: [
    {
      sheetName: '教育訓練記錄表',
      archetype: 'training-record',
      criteriaIndex: 1,
      columns: [
        { header: '訓練日期', width: 100 },
        { header: '訓練主題', width: 200 },
        { header: '訓練時數', width: 100 },
        { header: '訓練方式', width: 120 },
        { header: '參加人員', width: 180 },
        { header: '簽到表', width: 90 },
        { header: '講師', width: 100 },
      ],
    },
    // [補] 第 18 條 criteria 0：年度教育訓練計畫版本管控
    {
      sheetName: '[補] 年度訓練計畫版本管控表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: '2024年度訓練計畫' }, { row: 0, col: 1, value: '2024-01-10' }, { row: 0, col: 2, value: '—' }, { row: 0, col: 3, value: '初版：含職前+在職訓練計畫' }, { row: 0, col: 4, value: '主任〇〇〇' }, { row: 0, col: 5, value: '公告欄+員工手冊' }, { row: 0, col: 6, value: '行政檔案夾 M-1' },
        { row: 1, col: 0, value: '2024年度訓練計畫修訂' }, { row: 1, col: 1, value: '2024-01-10' }, { row: 1, col: 2, value: '2024-06-01' }, { row: 1, col: 3, value: '新增感染管制訓練場次' }, { row: 1, col: 4, value: '督導王〇〇' }, { row: 1, col: 5, value: '員工手冊' }, { row: 1, col: 6, value: '行政檔案夾 M-1' },
        { row: 2, col: 0, value: '2025年度訓練計畫' }, { row: 2, col: 1, value: '2025-01-08' }, { row: 2, col: 2, value: '—' }, { row: 2, col: 3, value: '2025年新版，含12項主題' }, { row: 2, col: 4, value: '主任〇〇〇' }, { row: 2, col: 5, value: '公告欄+員工手冊' }, { row: 2, col: 6, value: '行政檔案夾 M-2' },
      ],
      columns: [
        { header: '計畫名稱', width: 180 },
        { header: '制定日期', width: 110 },
        { header: '修訂日期', width: 110 },
        { header: '修訂重點', width: 220 },
        { header: '核定人員', width: 110 },
        { header: '公告位置', width: 160 },
        { header: '歸檔位置', width: 160 },
      ],
    },
    // [補] 第 18 條 criteria 1：職前訓練5大必修主題檢核
    {
      sheetName: '[補] 職前訓練必修主題檢核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
      prefillRows: 6,
      prefillCells: [
        { row: 0, col: 0, value: '服務規範與職業倫理（個案隱私/邊界）' },
        { row: 1, col: 0, value: '安全守則（入戶安全/自我保護）' },
        { row: 2, col: 0, value: '緊急事件處置（跌倒/急症/119流程）' },
        { row: 3, col: 0, value: '個案隱私保護（個資法/不洩露）' },
        { row: 4, col: 0, value: '感染管制（手部衛生/個人防護）' },
        { row: 0, col: 1, value: '✓' }, { row: 0, col: 2, value: '職前訓練簽到表+講義（2025-01-20）' }, { row: 0, col: 3, value: '訓練記錄資料夾' }, { row: 0, col: 4, value: '督導王〇〇' },
        { row: 1, col: 1, value: '✓' }, { row: 1, col: 2, value: '職前訓練簽到表+講義（2025-01-20）' }, { row: 1, col: 3, value: '訓練記錄資料夾' }, { row: 1, col: 4, value: '督導王〇〇' },
        { row: 2, col: 1, value: '✓' }, { row: 2, col: 2, value: '職前訓練簽到表+SOP演練記錄' }, { row: 2, col: 3, value: '訓練記錄資料夾' }, { row: 2, col: 4, value: '督導王〇〇' },
      ],
      columns: [
        { header: '職前訓練必修主題', width: 280 },
        { header: '是否辦理', width: 90 },
        { header: '佐證文件', width: 220 },
        { header: '歸檔位置', width: 160 },
        { header: '負責人員', width: 110 },
      ],
    },
    // [補] 第 18 條 criteria 2：在職訓練時數逐人年度監控表
    {
      sheetName: '[補] 在職訓練時數逐人監控表',
      archetype: 'inventory-list',
      criteriaIndex: 2,
      prefillRows: 15,
      prefillCells: [
        { row: 0, col: 0, value: '王〇〇（照服員）' }, { row: 0, col: 1, value: '2025-01-01' }, { row: 0, col: 2, value: '2025-12-31' }, { row: 0, col: 3, value: '18小時（1月~6月累計）' }, { row: 0, col: 4, value: '在職訓練中（預計全年24小時）' }, { row: 0, col: 5, value: '督導王〇〇' },
        { row: 1, col: 0, value: '李〇〇（照服員）' }, { row: 1, col: 1, value: '2025-01-01' }, { row: 1, col: 2, value: '2025-12-31' }, { row: 1, col: 3, value: '24小時（全年完成）' }, { row: 1, col: 4, value: '已達標' }, { row: 1, col: 5, value: '督導王〇〇' },
        { row: 2, col: 0, value: '陳〇〇（督導）' }, { row: 2, col: 1, value: '2025-01-01' }, { row: 2, col: 2, value: '2025-12-31' }, { row: 2, col: 3, value: '30小時（全年完成）' }, { row: 2, col: 4, value: '已達標（超額完成）' }, { row: 2, col: 5, value: '主任〇〇〇' },
      ],
      columns: [
        { header: '人員姓名（職稱）', width: 150 },
        { header: '年度起始', width: 110 },
        { header: '年度截止', width: 110 },
        { header: '累計訓練時數', width: 140 },
        { header: '狀態/達標判斷', width: 180 },
        { header: '承辦人員', width: 110 },
      ],
    },
    // [補] 第 18 條 criteria 3：訓練內容符合實務需求查核表
    {
      sheetName: '[補] 訓練內容實務需求查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 3,
      prefillRows: 6,
      prefillCells: [
        { row: 0, col: 0, value: '訓練主題涵蓋身體照顧實務技能' },
        { row: 1, col: 0, value: '訓練主題涵蓋家務協助與服務邊界' },
        { row: 2, col: 0, value: '訓練主題涵蓋情緒支持與溝通技巧' },
        { row: 0, col: 1, value: '✓' }, { row: 0, col: 2, value: '2025年訓練計畫第2、3、4場' }, { row: 0, col: 3, value: '訓練記錄資料夾' }, { row: 0, col: 4, value: '督導王〇〇' },
        { row: 1, col: 1, value: '✓' }, { row: 1, col: 2, value: '2025年訓練計畫第5場' }, { row: 1, col: 3, value: '訓練記錄資料夾' }, { row: 1, col: 4, value: '督導王〇〇' },
        { row: 2, col: 1, value: '✓' }, { row: 2, col: 2, value: '2025年訓練計畫第7場' }, { row: 2, col: 3, value: '訓練記錄資料夾' }, { row: 2, col: 4, value: '督導王〇〇' },
      ],
      columns: [
        { header: '實務需求查核項目', width: 280 },
        { header: '是否具備', width: 90 },
        { header: '佐證文件', width: 200 },
        { header: '歸檔位置', width: 160 },
        { header: '負責人員', width: 110 },
      ],
    },
  ],

  /** 19. 人員健康管理 */
  19: [
    {
      sheetName: '人員健康檢查記錄',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 15,
      columns: [
        { header: '姓名', width: 110 },
        { header: '健檢日期', width: 100 },
        { header: '健檢機構', width: 160 },
        { header: '健檢結果', width: 140 },
        { header: '是否適任', width: 100 },
        { header: '備註', width: 140 },
      ],
    },
    // [補] 第 19 條 criteria 0：新進人員入職前健檢逐人佐證清冊
    {
      sheetName: '[補] 新進人員入職前健檢佐證清冊',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 15,
      prefillCells: [
        { row: 0, col: 0, value: '王〇〇' }, { row: 0, col: 1, value: '2025-01-10' }, { row: 0, col: 2, value: '健康檢查報告（○○診所）' }, { row: 0, col: 3, value: '人事資料夾 N-01' }, { row: 0, col: 4, value: '已辦（到職前3天完成）' }, { row: 0, col: 5, value: '行政〇〇〇' },
        { row: 1, col: 0, value: '李〇〇' }, { row: 1, col: 1, value: '2025-02-05' }, { row: 1, col: 2, value: '健康檢查報告（○○醫院）' }, { row: 1, col: 3, value: '人事資料夾 N-02' }, { row: 1, col: 4, value: '已辦（到職前5天完成）' }, { row: 1, col: 5, value: '行政〇〇〇' },
        { row: 2, col: 0, value: '陳〇〇' }, { row: 2, col: 1, value: '2025-03-25' }, { row: 2, col: 2, value: '健康檢查報告（○○診所）' }, { row: 2, col: 3, value: '人事資料夾 N-03' }, { row: 2, col: 4, value: '已辦（到職前1天完成）' }, { row: 2, col: 5, value: '行政〇〇〇' },
      ],
      columns: [
        { header: '人員姓名', width: 110 },
        { header: '健檢日期', width: 110 },
        { header: '佐證文件名稱', width: 200 },
        { header: '歸檔位置', width: 160 },
        { header: '備註', width: 160 },
        { header: '承辦人員', width: 110 },
      ],
    },
    // [補] 第 19 條 criteria 1：年度健檢到期監控表
    {
      sheetName: '[補] 年度健檢到期監控表',
      archetype: 'inventory-list',
      criteriaIndex: 1,
      prefillRows: 15,
      prefillCells: [
        { row: 0, col: 0, value: '王〇〇' }, { row: 0, col: 1, value: '2024-02-15（上次健檢）' }, { row: 0, col: 2, value: '2025-02-15（1年到期）' }, { row: 0, col: 3, value: '2025-02-10' }, { row: 0, col: 4, value: '已辦（提前5天）' }, { row: 0, col: 5, value: '行政〇〇〇' },
        { row: 1, col: 0, value: '李〇〇' }, { row: 1, col: 1, value: '2024-04-20（上次健檢）' }, { row: 1, col: 2, value: '2025-04-20（1年到期）' }, { row: 1, col: 3, value: '—' }, { row: 1, col: 4, value: '即將到期（14天內），已排程' }, { row: 1, col: 5, value: '行政〇〇〇' },
        { row: 2, col: 0, value: '陳〇〇' }, { row: 2, col: 1, value: '2024-03-10（上次健檢）' }, { row: 2, col: 2, value: '2025-03-10（1年到期）' }, { row: 2, col: 3, value: '2025-03-20' }, { row: 2, col: 4, value: '逾期10天（已補辦）' }, { row: 2, col: 5, value: '行政〇〇〇' },
      ],
      columns: [
        { header: '人員姓名', width: 110 },
        { header: '上次健檢日期', width: 130 },
        { header: '1年到期日', width: 120 },
        { header: '實際辦理日期', width: 120 },
        { header: '狀態', width: 180 },
        { header: '承辦人員', width: 110 },
      ],
    },
    // [補] 第 19 條 criteria 2：傳染病停服通報紀錄
    {
      sheetName: '[補] 傳染病停服通報紀錄',
      archetype: 'incident-log',
      criteriaIndex: 2,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: '2025-01-20' }, { row: 0, col: 1, value: '王照服員' }, { row: 0, col: 2, value: '流感確診（快篩陽性）' }, { row: 0, col: 3, value: '依規定停止入戶服務5天，通知督導調配替代照服員' }, { row: 0, col: 4, value: '2025-01-25復工，服務未中斷' }, { row: 0, col: 5, value: '督導王〇〇' },
        { row: 1, col: 0, value: '2025-02-15' }, { row: 1, col: 1, value: '李照服員' }, { row: 1, col: 2, value: '腸胃炎（醫師診斷）' }, { row: 1, col: 3, value: '停服3天，通知督導安排他人替代' }, { row: 1, col: 4, value: '2025-02-18復工' }, { row: 1, col: 5, value: '督導王〇〇' },
        { row: 2, col: 0, value: '2025-03-08' }, { row: 2, col: 1, value: '陳照服員' }, { row: 2, col: 2, value: '發燒（體溫38.5°C，疑似感染）' }, { row: 2, col: 3, value: '停服至退燒後24小時，安排替代服務' }, { row: 2, col: 4, value: '2025-03-10復工，狀況良好' }, { row: 2, col: 5, value: '督導李〇〇' },
      ],
      columns: [
        { header: '發生日期', width: 100 },
        { header: '人員姓名', width: 110 },
        { header: '傳染病/症狀描述', width: 200 },
        { header: '處理方式', width: 220 },
        { header: '後續結果', width: 160 },
        { header: '處理人員', width: 100 },
      ],
    },
    // [補] 第 19 條 criteria 3：健康資料保管查核表
    {
      sheetName: '[補] 健康檢查資料保管查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 3,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: '健檢資料存放於加鎖文件櫃（健康資料隔離保管）' },
        { row: 1, col: 0, value: '僅主管/行政有權限調閱' },
        { row: 2, col: 0, value: '保存年限遵守法規（至少至離職後3年）' },
        { row: 0, col: 1, value: '✓' }, { row: 0, col: 2, value: '文件櫃鑰匙管理清冊' }, { row: 0, col: 3, value: '行政室' }, { row: 0, col: 4, value: '行政〇〇〇' },
        { row: 1, col: 1, value: '✓' }, { row: 1, col: 2, value: '系統權限清冊（僅主任/行政）' }, { row: 1, col: 3, value: '資訊管理資料夾' }, { row: 1, col: 4, value: '行政〇〇〇' },
        { row: 2, col: 1, value: '✓' }, { row: 2, col: 2, value: '健檢資料保管規定 v1.1' }, { row: 2, col: 3, value: '行政規定資料夾' }, { row: 2, col: 4, value: '主任〇〇〇' },
      ],
      columns: [
        { header: '查核項目', width: 280 },
        { header: '是否符合', width: 90 },
        { header: '佐證文件', width: 200 },
        { header: '歸檔位置', width: 150 },
        { header: '查核人員', width: 110 },
      ],
    },
  ],

  /** 20. 人員績效管理 */
  20: [
    {
      sheetName: '人員考核記錄表',
      archetype: 'inventory-list',
      criteriaIndex: 2,
      prefillRows: 10,
      columns: [
        { header: '考核期間', width: 120 },
        { header: '姓名', width: 110 },
        { header: '考核項目', width: 180 },
        { header: '考核結果', width: 130 },
        { header: '獎懲建議', width: 150 },
        { header: '告知日期', width: 100 },
        { header: '主管簽名', width: 100 },
      ],
    },
    // [補] 第 20 條 criteria 0：人員考核制度版本管控表
    {
      sheetName: '[補] 人員考核制度版本管控表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: 'v1.0' }, { row: 0, col: 1, value: '2023-01-01' }, { row: 0, col: 2, value: '—' }, { row: 0, col: 3, value: '初版制定（含考核週期/項目/評分說明）' }, { row: 0, col: 4, value: '主任〇〇〇' }, { row: 0, col: 5, value: '機構公告欄' }, { row: 0, col: 6, value: '行政檔案夾 HR-1' },
        { row: 1, col: 0, value: 'v1.1' }, { row: 1, col: 1, value: '2023-01-01' }, { row: 1, col: 2, value: '2024-03-15' }, { row: 1, col: 3, value: '新增兼任人員考核辦法' }, { row: 1, col: 4, value: '主任〇〇〇' }, { row: 1, col: 5, value: '機構公告欄+官網' }, { row: 1, col: 6, value: '行政檔案夾 HR-1' },
        { row: 2, col: 0, value: 'v2.0' }, { row: 2, col: 1, value: '2023-01-01' }, { row: 2, col: 2, value: '2025-01-10' }, { row: 2, col: 3, value: '依長服法修訂考核指標' }, { row: 2, col: 4, value: '督導王〇〇' }, { row: 2, col: 5, value: '全通路公告' }, { row: 2, col: 6, value: '行政檔案夾 HR-2' },
      ],
      columns: [
        { header: '版次', width: 80 },
        { header: '制定日期', width: 110 },
        { header: '修訂日期', width: 110 },
        { header: '修訂重點', width: 200 },
        { header: '核定人員', width: 110 },
        { header: '公告位置', width: 160 },
        { header: '歸檔位置', width: 160 },
      ],
    },
    // [補] 第 20 條 criteria 1：年度考核辦理頻率彙整表
    {
      sheetName: '[補] 年度考核辦理檢核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: '2023年度考核' }, { row: 0, col: 1, value: '是' }, { row: 0, col: 2, value: '2023-12-20' }, { row: 0, col: 3, value: '12名人員' }, { row: 0, col: 4, value: '—' }, { row: 0, col: 5, value: '督導王〇〇' }, { row: 0, col: 6, value: '主任〇〇〇' },
        { row: 1, col: 0, value: '2024年度考核' }, { row: 1, col: 1, value: '是' }, { row: 1, col: 2, value: '2024-12-18' }, { row: 1, col: 3, value: '15名人員' }, { row: 1, col: 4, value: '—' }, { row: 1, col: 5, value: '督導王〇〇' }, { row: 1, col: 6, value: '主任〇〇〇' },
        { row: 2, col: 0, value: '2025年度考核' }, { row: 2, col: 1, value: '是' }, { row: 2, col: 2, value: '2025-12-15（預計）' }, { row: 2, col: 3, value: '規劃中' }, { row: 2, col: 4, value: '—' }, { row: 2, col: 5, value: '督導李〇〇' }, { row: 2, col: 6, value: '主任〇〇〇' },
      ],
      columns: [
        { header: '期間', width: 130 },
        { header: '是否辦理', width: 90 },
        { header: '辦理日期', width: 130 },
        { header: '件數/場次', width: 110 },
        { header: '未辦理說明', width: 160 },
        { header: '彙整人員', width: 110 },
        { header: '主管核章', width: 110 },
      ],
    },
    // [補] 第 20 條 criteria 2：考核結果告知逐人佐證清冊
    {
      sheetName: '[補] 考核結果告知逐人佐證清冊',
      archetype: 'inventory-list',
      criteriaIndex: 2,
      prefillRows: 15,
      prefillCells: [
        { row: 0, col: 0, value: '王〇〇' }, { row: 0, col: 1, value: '2025-12-20' }, { row: 0, col: 2, value: '2024年度考核結果通知書（本人簽收）' }, { row: 0, col: 3, value: '人事考核資料夾' }, { row: 0, col: 4, value: '本人簽收確認' }, { row: 0, col: 5, value: '督導王〇〇' },
        { row: 1, col: 0, value: '李〇〇' }, { row: 1, col: 1, value: '2025-12-21' }, { row: 1, col: 2, value: '2024年度考核結果通知書（本人簽收）' }, { row: 1, col: 3, value: '人事考核資料夾' }, { row: 1, col: 4, value: '本人簽收確認' }, { row: 1, col: 5, value: '督導王〇〇' },
        { row: 2, col: 0, value: '陳〇〇' }, { row: 2, col: 1, value: '2025-12-22' }, { row: 2, col: 2, value: '2024年度考核結果通知書（本人簽收）' }, { row: 2, col: 3, value: '人事考核資料夾' }, { row: 2, col: 4, value: '本人簽收確認' }, { row: 2, col: 5, value: '督導李〇〇' },
      ],
      columns: [
        { header: '人員姓名', width: 110 },
        { header: '告知日期', width: 110 },
        { header: '佐證文件名稱', width: 220 },
        { header: '歸檔位置', width: 160 },
        { header: '備註', width: 160 },
        { header: '承辦人員', width: 110 },
      ],
    },
    // [補] 第 20 條 criteria 3：獎懲改善輔導紀錄表
    {
      sheetName: '[補] 獎懲改善輔導紀錄表',
      archetype: 'care-plan',
      criteriaIndex: 3,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: '服務紀錄多次漏簽名（王〇〇）' }, { row: 0, col: 1, value: '簽名完整率達 100%' }, { row: 0, col: 2, value: '口頭輔導+每月交班前提醒+月抽查' }, { row: 0, col: 3, value: '2025-03-31' }, { row: 0, col: 4, value: '達標（簽名完整率 100%）' }, { row: 0, col: 5, value: '季後複查' }, { row: 0, col: 6, value: '督導王〇〇' },
        { row: 1, col: 0, value: '個案投訴服務態度（李〇〇）' }, { row: 1, col: 1, value: '投訴件數降為 0' }, { row: 1, col: 2, value: '約談輔導+服務態度加強訓練' }, { row: 1, col: 3, value: '2025-06-30' }, { row: 1, col: 4, value: '達標（無新投訴）' }, { row: 1, col: 5, value: '半年後複查' }, { row: 1, col: 6, value: '督導王〇〇' },
        { row: 2, col: 0, value: '年度考核優秀表揚（陳〇〇）' }, { row: 2, col: 1, value: '持續維持服務品質' }, { row: 2, col: 2, value: '公開表揚+獎勵（禮卷 500 元）' }, { row: 2, col: 3, value: '2025-01-15' }, { row: 2, col: 4, value: '已辦' }, { row: 2, col: 5, value: '年度複評' }, { row: 2, col: 6, value: '主任〇〇〇' },
      ],
      columns: [
        { header: '問題/議題', width: 200 },
        { header: '改善目標', width: 160 },
        { header: '改善措施', width: 200 },
        { header: '執行期限', width: 110 },
        { header: '執行結果', width: 160 },
        { header: '後續追蹤', width: 140 },
        { header: '負責人', width: 100 },
      ],
    },
  ],

  /** 21. 財務管理 */
  21: [
    // [補] 第 21 條 criteria 0：帳冊版本管控表
    {
      sheetName: '[補] 帳冊版本管控表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: 'v1.0' }, { row: 0, col: 1, value: '2023-01-01' }, { row: 0, col: 2, value: '—' }, { row: 0, col: 3, value: '初版建立收支帳冊格式' }, { row: 0, col: 4, value: '主任〇〇〇' }, { row: 0, col: 5, value: '財務公告欄' }, { row: 0, col: 6, value: '財務檔案夾 F-1' },
        { row: 1, col: 0, value: 'v1.1' }, { row: 1, col: 1, value: '2023-01-01' }, { row: 1, col: 2, value: '2024-01-10' }, { row: 1, col: 3, value: '新增補助款專區欄位' }, { row: 1, col: 4, value: '主任〇〇〇' }, { row: 1, col: 5, value: '財務公告欄' }, { row: 1, col: 6, value: '財務檔案夾 F-1' },
        { row: 2, col: 0, value: 'v2.0' }, { row: 2, col: 1, value: '2023-01-01' }, { row: 2, col: 2, value: '2025-01-05' }, { row: 2, col: 3, value: '依長服法修訂財務管理規定' }, { row: 2, col: 4, value: '督導王〇〇' }, { row: 2, col: 5, value: '全通路公告' }, { row: 2, col: 6, value: '財務檔案夾 F-2' },
      ],
      columns: [
        { header: '版次', width: 80 },
        { header: '制定日期', width: 110 },
        { header: '修訂日期', width: 110 },
        { header: '修訂重點', width: 200 },
        { header: '核定人員', width: 110 },
        { header: '公告位置', width: 160 },
        { header: '歸檔位置', width: 160 },
      ],
    },
    // [補] 第 21 條 criteria 1：收支憑證保存期限查核表
    {
      sheetName: '[補] 收支憑證保存檢核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
      prefillRows: 6,
      prefillCells: [
        { row: 0, col: 0, value: '收入憑證（繳費單/補助撥款通知）保存 ≥ 7 年' },
        { row: 1, col: 0, value: '支出憑證（發票/收據/合約）保存 ≥ 7 年' },
        { row: 2, col: 0, value: '憑證依年度分類整理裝訂歸檔' },
        { row: 0, col: 1, value: '✓' }, { row: 0, col: 2, value: '2018–2024年收入憑證裝訂冊' }, { row: 0, col: 3, value: '財務檔案室（鎖閉）' }, { row: 0, col: 4, value: '行政〇〇〇' },
        { row: 1, col: 1, value: '✓' }, { row: 1, col: 2, value: '2018–2024年支出憑證裝訂冊' }, { row: 1, col: 3, value: '財務檔案室（鎖閉）' }, { row: 1, col: 4, value: '行政〇〇〇' },
        { row: 2, col: 1, value: '✓' }, { row: 2, col: 2, value: '年度分類目錄清冊 2025 v1.0' }, { row: 2, col: 3, value: '財務檔案夾 F-Index' }, { row: 2, col: 4, value: '行政〇〇〇' },
      ],
      columns: [
        { header: '應含項目', width: 280 },
        { header: '是否具備', width: 90 },
        { header: '佐證文件', width: 200 },
        { header: '歸檔位置', width: 160 },
        { header: '負責人員', width: 110 },
      ],
    },
    // [補] 第 21 條 criteria 2：財務報表辦理頻率彙整表
    {
      sheetName: '[補] 財務報表辦理彙整表',
      archetype: 'inspection-checklist',
      criteriaIndex: 2,
      prefillRows: 6,
      prefillCells: [
        { row: 0, col: 0, value: '2023年度財務報表' }, { row: 0, col: 1, value: '是' }, { row: 0, col: 2, value: '2024-03-31' }, { row: 0, col: 3, value: '1份（年度）' }, { row: 0, col: 4, value: '—' }, { row: 0, col: 5, value: '行政〇〇〇' }, { row: 0, col: 6, value: '主任〇〇〇' },
        { row: 1, col: 0, value: '2024年度財務報表' }, { row: 1, col: 1, value: '是' }, { row: 1, col: 2, value: '2025-03-31' }, { row: 1, col: 3, value: '1份（年度）' }, { row: 1, col: 4, value: '—' }, { row: 1, col: 5, value: '行政〇〇〇' }, { row: 1, col: 6, value: '主任〇〇〇' },
        { row: 2, col: 0, value: '2025年度財務報表' }, { row: 2, col: 1, value: '規劃中' }, { row: 2, col: 2, value: '2026-03-31（預計）' }, { row: 2, col: 3, value: '—' }, { row: 2, col: 4, value: '—' }, { row: 2, col: 5, value: '行政〇〇〇' }, { row: 2, col: 6, value: '主任〇〇〇' },
      ],
      columns: [
        { header: '期間', width: 130 },
        { header: '是否辦理', width: 90 },
        { header: '辦理日期', width: 130 },
        { header: '件數/場次', width: 110 },
        { header: '未辦理說明', width: 160 },
        { header: '彙整人員', width: 110 },
        { header: '主管核章', width: 110 },
      ],
    },
    // [補] 第 21 條 criteria 3：財務法規符合性檢核表
    {
      sheetName: '[補] 財務法規符合性檢核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 3,
      prefillRows: 6,
      prefillCells: [
        { row: 0, col: 0, value: '收費標準依長服法§46公告並通知個案' },
        { row: 1, col: 0, value: '補助款申請/撥付/核銷符合主管機關規定' },
        { row: 2, col: 0, value: '財務報表依規定格式製作並送審' },
        { row: 0, col: 1, value: '✓' }, { row: 0, col: 2, value: '收費標準公告 2025 v2.0' }, { row: 0, col: 3, value: '公告欄+個案契約附件' }, { row: 0, col: 4, value: '行政〇〇〇' },
        { row: 1, col: 1, value: '✓' }, { row: 1, col: 2, value: '補助款核銷清冊 2025' }, { row: 1, col: 3, value: '財務檔案夾 F-2' }, { row: 1, col: 4, value: '行政〇〇〇' },
        { row: 2, col: 1, value: '✓' }, { row: 2, col: 2, value: '2024年度財務報表（送審本）' }, { row: 2, col: 3, value: '財務檔案夾 F-2' }, { row: 2, col: 4, value: '主任〇〇〇' },
      ],
      columns: [
        { header: '應含項目', width: 280 },
        { header: '是否具備', width: 90 },
        { header: '佐證文件', width: 200 },
        { header: '歸檔位置', width: 160 },
        { header: '負責人員', width: 110 },
      ],
    },
  ],

  /** 22. 收退費管理 */
  22: [
    {
      sheetName: '收退費爭議記錄表',
      archetype: 'incident-log',
      criteriaIndex: 3,
      columns: [
        { header: '爭議日期', width: 100 },
        { header: '當事人', width: 110 },
        { header: '爭議內容', width: 240 },
        { header: '處理方式', width: 200 },
        { header: '結果', width: 160 },
        { header: '承辦人', width: 90 },
      ],
    },
    // [補] 第 22 條 criteria 0：收費標準公告揭示查核表
    {
      sheetName: '[補] 收費標準公告揭示檢核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 6,
      prefillCells: [
        { row: 0, col: 0, value: '收費標準公告於機構入口/公告欄' },
        { row: 1, col: 0, value: '收費標準公告於官方網站' },
        { row: 2, col: 0, value: '收費標準已納入個案服務契約附件' },
        { row: 0, col: 1, value: '✓' }, { row: 0, col: 2, value: '收費標準公告 2025 v2.0' }, { row: 0, col: 3, value: '入口大廳公告欄' }, { row: 0, col: 4, value: '行政〇〇〇' },
        { row: 1, col: 1, value: '✓' }, { row: 1, col: 2, value: '收費標準公告 2025 v2.0（網頁截圖）' }, { row: 1, col: 3, value: '官網公告區' }, { row: 1, col: 4, value: '行政〇〇〇' },
        { row: 2, col: 1, value: '✓' }, { row: 2, col: 2, value: '服務契約 v3.0 附件一' }, { row: 2, col: 3, value: '個案資料夾（各份契約中）' }, { row: 2, col: 4, value: '社工王〇〇' },
      ],
      columns: [
        { header: '應含項目', width: 280 },
        { header: '是否具備', width: 90 },
        { header: '佐證文件', width: 200 },
        { header: '歸檔位置', width: 160 },
        { header: '負責人員', width: 110 },
      ],
    },
    // [補] 第 22 條 criteria 1：收據開立逐案佐證清冊
    {
      sheetName: '[補] 收據開立逐案佐證清冊',
      archetype: 'inventory-list',
      criteriaIndex: 1,
      prefillRows: 15,
      prefillCells: [
        { row: 0, col: 0, value: '王〇〇' }, { row: 0, col: 1, value: '2025-01-31' }, { row: 0, col: 2, value: '2025年1月份服務收據（自費部分）' }, { row: 0, col: 3, value: '收費收據存根聯資料夾' }, { row: 0, col: 4, value: '已開立並交付本人' }, { row: 0, col: 5, value: '行政〇〇〇' },
        { row: 1, col: 0, value: '李〇〇' }, { row: 1, col: 1, value: '2025-01-31' }, { row: 1, col: 2, value: '2025年1月份服務收據（自費部分）' }, { row: 1, col: 3, value: '收費收據存根聯資料夾' }, { row: 1, col: 4, value: '已開立，家屬代收' }, { row: 1, col: 5, value: '行政〇〇〇' },
        { row: 2, col: 0, value: '陳〇〇' }, { row: 2, col: 1, value: '2025-01-31' }, { row: 2, col: 2, value: '2025年1月份服務收據（自費部分）' }, { row: 2, col: 3, value: '收費收據存根聯資料夾' }, { row: 2, col: 4, value: '已開立並交付本人' }, { row: 2, col: 5, value: '行政〇〇〇' },
      ],
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '開立日期', width: 110 },
        { header: '佐證文件名稱', width: 220 },
        { header: '歸檔位置', width: 160 },
        { header: '備註', width: 160 },
        { header: '承辦人員', width: 110 },
      ],
    },
    // [補] 第 22 條 criteria 2：退費規定版本管控表
    {
      sheetName: '[補] 退費規定版本管控表',
      archetype: 'inspection-checklist',
      criteriaIndex: 2,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: 'v1.0' }, { row: 0, col: 1, value: '2023-01-01' }, { row: 0, col: 2, value: '—' }, { row: 0, col: 3, value: '初版制定退費計算方式及申請程序' }, { row: 0, col: 4, value: '主任〇〇〇' }, { row: 0, col: 5, value: '入口大廳公告欄+官網' }, { row: 0, col: 6, value: '財務檔案夾 F-退費' },
        { row: 1, col: 0, value: 'v1.1' }, { row: 1, col: 1, value: '2023-01-01' }, { row: 1, col: 2, value: '2024-07-01' }, { row: 1, col: 3, value: '依主管機關新規增列補助款退費說明' }, { row: 1, col: 4, value: '主任〇〇〇' }, { row: 1, col: 5, value: '全通路公告' }, { row: 1, col: 6, value: '財務檔案夾 F-退費' },
        { row: 2, col: 0, value: 'v2.0' }, { row: 2, col: 1, value: '2023-01-01' }, { row: 2, col: 2, value: '2025-01-15' }, { row: 2, col: 3, value: '調整退費期限為 7 個工作天' }, { row: 2, col: 4, value: '督導王〇〇' }, { row: 2, col: 5, value: '全通路公告' }, { row: 2, col: 6, value: '財務檔案夾 F-退費' },
      ],
      columns: [
        { header: '版次', width: 80 },
        { header: '制定日期', width: 110 },
        { header: '修訂日期', width: 110 },
        { header: '修訂重點', width: 200 },
        { header: '核定人員', width: 110 },
        { header: '公告位置', width: 160 },
        { header: '歸檔位置', width: 160 },
      ],
    },
  ],

  /** 23. 專任服務人員年度留任率 */
  23: [
    {
      sheetName: '人員留任率統計表',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 5,
      columns: [
        { header: '統計期間', width: 120 },
        { header: '年初人數', width: 100 },
        { header: '年末人數', width: 100 },
        { header: '離職人數', width: 100 },
        { header: '留任率', width: 90 },
        { header: '離職原因分析', width: 200 },
        { header: '改善措施', width: 180 },
      ],
    },
    // [補] 第 23 條 criteria 1：留任率目標值版本管控表
    {
      sheetName: '[補] 留任率目標值版本管控表',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: 'v1.0' }, { row: 0, col: 1, value: '2023-01-01' }, { row: 0, col: 2, value: '—' }, { row: 0, col: 3, value: '初版訂定留任率目標≥80%' }, { row: 0, col: 4, value: '主任〇〇〇' }, { row: 0, col: 5, value: '機構內部公告' }, { row: 0, col: 6, value: '人事檔案夾 HR-留任' },
        { row: 1, col: 0, value: 'v1.1' }, { row: 1, col: 1, value: '2023-01-01' }, { row: 1, col: 2, value: '2024-01-10' }, { row: 1, col: 3, value: '提高目標至留任率≥85%' }, { row: 1, col: 4, value: '主任〇〇〇' }, { row: 1, col: 5, value: '機構內部公告' }, { row: 1, col: 6, value: '人事檔案夾 HR-留任' },
        { row: 2, col: 0, value: 'v2.0' }, { row: 2, col: 1, value: '2023-01-01' }, { row: 2, col: 2, value: '2025-01-05' }, { row: 2, col: 3, value: '新增留任率低時啟動改善機制說明' }, { row: 2, col: 4, value: '督導王〇〇' }, { row: 2, col: 5, value: '全通路公告' }, { row: 2, col: 6, value: '人事檔案夾 HR-留任' },
      ],
      columns: [
        { header: '版次', width: 80 },
        { header: '制定日期', width: 110 },
        { header: '修訂日期', width: 110 },
        { header: '修訂重點', width: 200 },
        { header: '核定人員', width: 110 },
        { header: '公告位置', width: 160 },
        { header: '歸檔位置', width: 160 },
      ],
    },
    // [補] 第 23 條 criteria 2：離職原因分析報告表
    {
      sheetName: '[補] 離職原因分析報告表',
      archetype: 'inspection-checklist',
      criteriaIndex: 2,
      prefillRows: 6,
      prefillCells: [
        { row: 0, col: 0, value: '2023年度' }, { row: 0, col: 1, value: '2人' }, { row: 0, col: 2, value: '個人因素（家庭照顧）1人；工作強度 1 人' }, { row: 0, col: 3, value: '彈性排班方案研擬中' }, { row: 0, col: 4, value: '督導王〇〇' }, { row: 0, col: 5, value: '主任〇〇〇' },
        { row: 1, col: 0, value: '2024年度' }, { row: 1, col: 1, value: '1人' }, { row: 1, col: 2, value: '薪資因素 1 人' }, { row: 1, col: 3, value: '薪資結構調整（績效加給）' }, { row: 1, col: 4, value: '督導王〇〇' }, { row: 1, col: 5, value: '主任〇〇〇' },
        { row: 2, col: 0, value: '2025年度' }, { row: 2, col: 1, value: '0人（截至Q2）' }, { row: 2, col: 2, value: '—' }, { row: 2, col: 3, value: '—' }, { row: 2, col: 4, value: '督導李〇〇' }, { row: 2, col: 5, value: '主任〇〇〇' },
      ],
      columns: [
        { header: '統計期間', width: 120 },
        { header: '離職人數', width: 100 },
        { header: '主要離職原因', width: 220 },
        { header: '改善方向', width: 180 },
        { header: '彙整人員', width: 110 },
        { header: '主管核章', width: 110 },
      ],
    },
    // [補] 第 23 條 criteria 3：改善措施執行追蹤表
    {
      sheetName: '[補] 專任人員留任改善追蹤表',
      archetype: 'care-plan',
      criteriaIndex: 3,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: '照服員反映排班缺乏彈性' }, { row: 0, col: 1, value: '留任率提升至≥85%' }, { row: 0, col: 2, value: '彈性排班制度+照服員意見徵集每季' }, { row: 0, col: 3, value: '2025-06-30' }, { row: 0, col: 4, value: '達標（留任率 88%）' }, { row: 0, col: 5, value: '持續監測' }, { row: 0, col: 6, value: '督導王〇〇' },
        { row: 1, col: 0, value: '薪資低於市場水準' }, { row: 1, col: 1, value: '縮短薪資差距≤10%' }, { row: 1, col: 2, value: '薪資結構調整+績效加給制度' }, { row: 1, col: 3, value: '2025-09-30' }, { row: 1, col: 4, value: '進行中' }, { row: 1, col: 5, value: '季度追蹤' }, { row: 1, col: 6, value: '主任〇〇〇' },
        { row: 2, col: 0, value: '新進人員適應困難' }, { row: 2, col: 1, value: '新人 90 天留任率≥90%' }, { row: 2, col: 2, value: '強化職前帶領+督導主動關懷' }, { row: 2, col: 3, value: '2025-12-31' }, { row: 2, col: 4, value: '進行中（Q1 新人 2 人均留任）' }, { row: 2, col: 5, value: '月度追蹤' }, { row: 2, col: 6, value: '督導王〇〇' },
      ],
      columns: [
        { header: '問題/議題', width: 200 },
        { header: '改善目標', width: 160 },
        { header: '改善措施', width: 200 },
        { header: '執行期限', width: 110 },
        { header: '執行結果', width: 180 },
        { header: '後續追蹤', width: 140 },
        { header: '負責人', width: 100 },
      ],
    },
  ],

  /** 24. 兼任服務人員年度留任率 */
  24: [
    {
      sheetName: '兼任人員留任率統計',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 5,
      columns: [
        { header: '統計期間', width: 120 },
        { header: '年初人數', width: 100 },
        { header: '年末人數', width: 100 },
        { header: '離職人數', width: 100 },
        { header: '留任率', width: 90 },
        { header: '離職原因分析', width: 200 },
        { header: '改善措施', width: 180 },
      ],
    },
    // [補] 第 24 條 criteria 1：兼任留任率目標值版本管控表
    {
      sheetName: '[補] 兼任留任率目標值版本管控表',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: 'v1.0' }, { row: 0, col: 1, value: '2023-01-01' }, { row: 0, col: 2, value: '—' }, { row: 0, col: 3, value: '初版訂定兼任人員留任率目標≥75%' }, { row: 0, col: 4, value: '主任〇〇〇' }, { row: 0, col: 5, value: '機構內部公告' }, { row: 0, col: 6, value: '人事檔案夾 HR-兼任' },
        { row: 1, col: 0, value: 'v1.1' }, { row: 1, col: 1, value: '2023-01-01' }, { row: 1, col: 2, value: '2024-03-20' }, { row: 1, col: 3, value: '提高目標至留任率≥80%' }, { row: 1, col: 4, value: '主任〇〇〇' }, { row: 1, col: 5, value: '機構內部公告' }, { row: 1, col: 6, value: '人事檔案夾 HR-兼任' },
        { row: 2, col: 0, value: 'v2.0' }, { row: 2, col: 1, value: '2023-01-01' }, { row: 2, col: 2, value: '2025-02-10' }, { row: 2, col: 3, value: '新增兼任人員溝通機制說明' }, { row: 2, col: 4, value: '督導王〇〇' }, { row: 2, col: 5, value: '全通路公告' }, { row: 2, col: 6, value: '人事檔案夾 HR-兼任' },
      ],
      columns: [
        { header: '版次', width: 80 },
        { header: '制定日期', width: 110 },
        { header: '修訂日期', width: 110 },
        { header: '修訂重點', width: 200 },
        { header: '核定人員', width: 110 },
        { header: '公告位置', width: 160 },
        { header: '歸檔位置', width: 160 },
      ],
    },
    // [補] 第 24 條 criteria 2：兼任離職原因分析報告表
    {
      sheetName: '[補] 兼任離職原因分析報告表',
      archetype: 'inspection-checklist',
      criteriaIndex: 2,
      prefillRows: 6,
      prefillCells: [
        { row: 0, col: 0, value: '2023年度' }, { row: 0, col: 1, value: '3人' }, { row: 0, col: 2, value: '個人因素（轉職）2人；接案量不足 1 人' }, { row: 0, col: 3, value: '增加接案量、優先派案給配合度高兼任人員' }, { row: 0, col: 4, value: '督導王〇〇' }, { row: 0, col: 5, value: '主任〇〇〇' },
        { row: 1, col: 0, value: '2024年度' }, { row: 1, col: 1, value: '1人' }, { row: 1, col: 2, value: '個人身體因素 1 人' }, { row: 1, col: 3, value: '—（非機構可控因素）' }, { row: 1, col: 4, value: '督導王〇〇' }, { row: 1, col: 5, value: '主任〇〇〇' },
        { row: 2, col: 0, value: '2025年度' }, { row: 2, col: 1, value: '0人（截至Q2）' }, { row: 2, col: 2, value: '—' }, { row: 2, col: 3, value: '—' }, { row: 2, col: 4, value: '督導李〇〇' }, { row: 2, col: 5, value: '主任〇〇〇' },
      ],
      columns: [
        { header: '統計期間', width: 120 },
        { header: '離職人數', width: 100 },
        { header: '主要離職原因', width: 220 },
        { header: '改善方向', width: 180 },
        { header: '彙整人員', width: 110 },
        { header: '主管核章', width: 110 },
      ],
    },
    // [補] 第 24 條 criteria 3：兼任改善措施追蹤表
    {
      sheetName: '[補] 兼任人員留任改善追蹤表',
      archetype: 'care-plan',
      criteriaIndex: 3,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: '兼任人員接案量不足影響收入穩定' }, { row: 0, col: 1, value: '每人月接案量≥8件' }, { row: 0, col: 2, value: '優先分配穩定個案+派案透明化' }, { row: 0, col: 3, value: '2025-06-30' }, { row: 0, col: 4, value: '達標（平均10件/月）' }, { row: 0, col: 5, value: '季度追蹤' }, { row: 0, col: 6, value: '督導王〇〇' },
        { row: 1, col: 0, value: '兼任人員歸屬感低' }, { row: 1, col: 1, value: '滿意度調查平均≥4分（5分制）' }, { row: 1, col: 2, value: '每季辦理兼任人員座談+通訊聯繫' }, { row: 1, col: 3, value: '2025-09-30' }, { row: 1, col: 4, value: '進行中（Q1 座談已辦）' }, { row: 1, col: 5, value: '季度追蹤' }, { row: 1, col: 6, value: '督導王〇〇' },
        { row: 2, col: 0, value: '交通與時間成本高' }, { row: 2, col: 1, value: '減少跨區派案比例≤20%' }, { row: 2, col: 2, value: '地理分區派案+油料補貼研議' }, { row: 2, col: 3, value: '2025-12-31' }, { row: 2, col: 4, value: '進行中' }, { row: 2, col: 5, value: '半年後複查' }, { row: 2, col: 6, value: '主任〇〇〇' },
      ],
      columns: [
        { header: '問題/議題', width: 200 },
        { header: '改善目標', width: 160 },
        { header: '改善措施', width: 200 },
        { header: '執行期限', width: 110 },
        { header: '執行結果', width: 180 },
        { header: '後續追蹤', width: 140 },
        { header: '負責人', width: 100 },
      ],
    },
  ],

  /** 25. 資訊管理 */
  25: [
    {
      sheetName: '資訊管理查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      columns: [
        { header: '查核日期', width: 100 },
        { header: '查核項目', width: 260 },
        { header: '符合', width: 70 },
        { header: '不符合', width: 80 },
        { header: '備註', width: 180 },
        { header: '查核人員', width: 100 },
      ],
    },
    // [補] 第 25 條 criteria 0：資訊系統資料即時性查核表
    {
      sheetName: '[補] 資訊系統資料即時性查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 6,
      prefillCells: [
        { row: 0, col: 0, value: '個案基本資料於入案後 3 個工作天內建檔' },
        { row: 1, col: 0, value: '服務紀錄於服務後 24 小時內上傳/建檔' },
        { row: 2, col: 0, value: '異動資料（地址/聯絡人/健康狀況）即時更新' },
        { row: 0, col: 1, value: '✓' }, { row: 0, col: 2, value: '建檔時效查核清冊（月抽查）' }, { row: 0, col: 3, value: '資訊管理資料夾' }, { row: 0, col: 4, value: '行政〇〇〇' },
        { row: 1, col: 1, value: '✓' }, { row: 1, col: 2, value: '服務紀錄上傳時效稽核表（月抽查）' }, { row: 1, col: 3, value: '資訊管理資料夾' }, { row: 1, col: 4, value: '督導王〇〇' },
        { row: 2, col: 1, value: '✓' }, { row: 2, col: 2, value: '異動通知單+系統更新截圖' }, { row: 2, col: 3, value: '個案資料夾（各份）' }, { row: 2, col: 4, value: '社工王〇〇' },
      ],
      columns: [
        { header: '應含項目', width: 280 },
        { header: '是否具備', width: 90 },
        { header: '佐證文件', width: 200 },
        { header: '歸檔位置', width: 160 },
        { header: '負責人員', width: 110 },
      ],
    },
    // [補] 第 25 條 criteria 1：系統權限逐人清冊
    {
      sheetName: '[補] 系統權限逐人清冊',
      archetype: 'inventory-list',
      criteriaIndex: 1,
      prefillRows: 15,
      prefillCells: [
        { row: 0, col: 0, value: '王〇〇（主任）' }, { row: 0, col: 1, value: '2024-01-05' }, { row: 0, col: 2, value: '系統帳號建立確認單' }, { row: 0, col: 3, value: '資訊管理資料夾' }, { row: 0, col: 4, value: '最高權限（查閱/修改/刪除/報表匯出）' }, { row: 0, col: 5, value: '行政〇〇〇' },
        { row: 1, col: 0, value: '李〇〇（督導）' }, { row: 1, col: 1, value: '2024-02-10' }, { row: 1, col: 2, value: '系統帳號建立確認單' }, { row: 1, col: 3, value: '資訊管理資料夾' }, { row: 1, col: 4, value: '督導權限（查閱/修改，不可刪除）' }, { row: 1, col: 5, value: '行政〇〇〇' },
        { row: 2, col: 0, value: '陳〇〇（照服員）' }, { row: 2, col: 1, value: '2024-03-15' }, { row: 2, col: 2, value: '系統帳號建立確認單' }, { row: 2, col: 3, value: '資訊管理資料夾' }, { row: 2, col: 4, value: '基本權限（僅查閱自己負責個案）' }, { row: 2, col: 5, value: '行政〇〇〇' },
      ],
      columns: [
        { header: '人員姓名（職稱）', width: 150 },
        { header: '帳號建立日期', width: 130 },
        { header: '佐證文件名稱', width: 200 },
        { header: '歸檔位置', width: 160 },
        { header: '權限說明', width: 200 },
        { header: '承辦人員', width: 110 },
      ],
    },
    // [補] 第 25 條 criteria 2：資料備份頻率彙整表
    {
      sheetName: '[補] 資料備份頻率彙整表',
      archetype: 'inspection-checklist',
      criteriaIndex: 2,
      prefillRows: 6,
      prefillCells: [
        { row: 0, col: 0, value: '2025年Q1' }, { row: 0, col: 1, value: '是' }, { row: 0, col: 2, value: '2025-03-31' }, { row: 0, col: 3, value: '3次/月（每月1/15/末備份）' }, { row: 0, col: 4, value: '—' }, { row: 0, col: 5, value: '行政〇〇〇' }, { row: 0, col: 6, value: '主任〇〇〇' },
        { row: 1, col: 0, value: '2025年Q2' }, { row: 1, col: 1, value: '是' }, { row: 1, col: 2, value: '2025-06-30' }, { row: 1, col: 3, value: '3次/月（每月1/15/末備份）' }, { row: 1, col: 4, value: '—' }, { row: 1, col: 5, value: '行政〇〇〇' }, { row: 1, col: 6, value: '主任〇〇〇' },
        { row: 2, col: 0, value: '2025年Q3' }, { row: 2, col: 1, value: '是' }, { row: 2, col: 2, value: '2025-09-30' }, { row: 2, col: 3, value: '3次/月（每月1/15/末備份）' }, { row: 2, col: 4, value: '—' }, { row: 2, col: 5, value: '行政〇〇〇' }, { row: 2, col: 6, value: '主任〇〇〇' },
      ],
      columns: [
        { header: '期間', width: 120 },
        { header: '是否辦理', width: 90 },
        { header: '辦理日期', width: 120 },
        { header: '件數/場次', width: 150 },
        { header: '未辦理說明', width: 160 },
        { header: '彙整人員', width: 110 },
        { header: '主管核章', width: 110 },
      ],
    },
    // [補] 第 25 條 criteria 3：政府資訊申報時程監控表
    {
      sheetName: '[補] 政府資訊申報時程監控表',
      archetype: 'inventory-list',
      criteriaIndex: 3,
      prefillRows: 15,
      prefillCells: [
        { row: 0, col: 0, value: '長照服務資料申報（月報）' }, { row: 0, col: 1, value: '每月10日' }, { row: 0, col: 2, value: '2025-04-10' }, { row: 0, col: 3, value: '2025-04-09' }, { row: 0, col: 4, value: '已辦（提前1天）' }, { row: 0, col: 5, value: '行政〇〇〇' },
        { row: 1, col: 0, value: '長照人員異動申報' }, { row: 1, col: 1, value: '異動後7日內' }, { row: 1, col: 2, value: '依異動日計算' }, { row: 1, col: 3, value: '2025-03-18（異動2025-03-15）' }, { row: 1, col: 4, value: '已辦（第3天）' }, { row: 1, col: 5, value: '行政〇〇〇' },
        { row: 2, col: 0, value: '服務使用者名冊申報（年報）' }, { row: 2, col: 1, value: '每年2月底前' }, { row: 2, col: 2, value: '2025-02-28' }, { row: 2, col: 3, value: '2025-02-25' }, { row: 2, col: 4, value: '已辦（提前3天）' }, { row: 2, col: 5, value: '社工王〇〇' },
      ],
      columns: [
        { header: '申報項目', width: 200 },
        { header: '法定期限', width: 130 },
        { header: '到期日期', width: 120 },
        { header: '實際辦理日期', width: 130 },
        { header: '狀態', width: 160 },
        { header: '承辦人員', width: 110 },
      ],
    },
  ],

  /** 26. 感染管制 */
  26: [
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
      sheetName: '感染事件通報記錄',
      archetype: 'incident-log',
      criteriaIndex: 2,
      columns: [
        { header: '通報日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '事件描述', width: 240 },
        { header: '處理措施', width: 200 },
        { header: '追蹤結果', width: 180 },
        { header: '通報人員', width: 100 },
      ],
    },
    {
      sheetName: '感染管制訓練記錄',
      archetype: 'training-record',
      criteriaIndex: 3,
      columns: [
        { header: '訓練日期', width: 100 },
        { header: '訓練主題', width: 180 },
        { header: '時數', width: 80 },
        { header: '參加人員', width: 180 },
        { header: '講師', width: 100 },
      ],
    },
    // [補] 第 26 條 criteria 0：感染管制計畫版本管控表
    {
      sheetName: '[補] 感染管制計畫版本管控表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: 'v1.0' }, { row: 0, col: 1, value: '2023-01-01' }, { row: 0, col: 2, value: '—' }, { row: 0, col: 3, value: '初版制定居家服務感染管制計畫' }, { row: 0, col: 4, value: '主任〇〇〇' }, { row: 0, col: 5, value: '機構公告欄' }, { row: 0, col: 6, value: '行政檔案夾 IC-1' },
        { row: 1, col: 0, value: 'v1.1' }, { row: 1, col: 1, value: '2023-01-01' }, { row: 1, col: 2, value: '2024-02-20' }, { row: 1, col: 3, value: '新增COVID-19居家服務防護規定' }, { row: 1, col: 4, value: '主任〇〇〇' }, { row: 1, col: 5, value: '機構公告欄+LINE通知' }, { row: 1, col: 6, value: '行政檔案夾 IC-1' },
        { row: 2, col: 0, value: 'v2.0' }, { row: 2, col: 1, value: '2023-01-01' }, { row: 2, col: 2, value: '2025-01-08' }, { row: 2, col: 3, value: '依疾管署最新指引全面修訂' }, { row: 2, col: 4, value: '督導王〇〇' }, { row: 2, col: 5, value: '全通路公告' }, { row: 2, col: 6, value: '行政檔案夾 IC-2' },
      ],
      columns: [
        { header: '版次', width: 80 },
        { header: '制定日期', width: 110 },
        { header: '修訂日期', width: 110 },
        { header: '修訂重點', width: 200 },
        { header: '核定人員', width: 110 },
        { header: '公告位置', width: 160 },
        { header: '歸檔位置', width: 160 },
      ],
    },
    // [補] 第 26 條 criteria 1：入戶手部衛生與個人防護稽核表
    {
      sheetName: '[補] 入戶手部衛生防護稽核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
      prefillRows: 8,
      prefillCells: [
        { row: 0, col: 0, value: '接觸個案前洗手（入戶即洗手或乾洗手）' },
        { row: 1, col: 0, value: '接觸個案後洗手（離戶前洗手）' },
        { row: 2, col: 0, value: '執行身體照顧時配戴手套' },
        { row: 0, col: 1, value: '✓' }, { row: 0, col: 2, value: '督導訪視稽核表（2025-03-10）' }, { row: 0, col: 3, value: '督導稽核資料夾' }, { row: 0, col: 4, value: '督導王〇〇' },
        { row: 1, col: 1, value: '✓' }, { row: 1, col: 2, value: '督導訪視稽核表（2025-03-10）' }, { row: 1, col: 3, value: '督導稽核資料夾' }, { row: 1, col: 4, value: '督導王〇〇' },
        { row: 2, col: 1, value: '✓' }, { row: 2, col: 2, value: '督導訪視稽核表（2025-03-10）' }, { row: 2, col: 3, value: '督導稽核資料夾' }, { row: 2, col: 4, value: '督導王〇〇' },
      ],
      columns: [
        { header: '應含項目', width: 280 },
        { header: '是否具備', width: 90 },
        { header: '佐證文件', width: 200 },
        { header: '歸檔位置', width: 160 },
        { header: '負責人員', width: 110 },
      ],
    },
    // [補] 第 26 條 criteria 2：感染事件通報追蹤改善紀錄表
    {
      sheetName: '[補] 感染事件通報追蹤表',
      archetype: 'care-plan',
      criteriaIndex: 2,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: '照服員流感確診影響 3 名個案服務' }, { row: 0, col: 1, value: '替代服務 100% 銜接，無服務中斷' }, { row: 0, col: 2, value: '建立替代名冊+即時通知督導機制' }, { row: 0, col: 3, value: '2025-02-28' }, { row: 0, col: 4, value: '達標（3名個案均有替代服務）' }, { row: 0, col: 5, value: '年度複評' }, { row: 0, col: 6, value: '督導王〇〇' },
        { row: 1, col: 0, value: '個案家中發現蟑螂（環境衛生感染風險）' }, { row: 1, col: 1, value: '環境整潔達標，感染風險降為低' }, { row: 1, col: 2, value: '協助申請環境清潔服務+居家環境衛生教育' }, { row: 1, col: 3, value: '2025-04-30' }, { row: 1, col: 4, value: '達標（環境改善，已複查）' }, { row: 1, col: 5, value: '季後複查' }, { row: 1, col: 6, value: '社工李〇〇' },
        { row: 2, col: 0, value: '照服員手部衛生執行率低（稽核 75%）' }, { row: 2, col: 1, value: '手部衛生執行率≥95%' }, { row: 2, col: 2, value: '加強感染管制訓練+每月抽查' }, { row: 2, col: 3, value: '2025-06-30' }, { row: 2, col: 4, value: '進行中（5月抽查 90%）' }, { row: 2, col: 5, value: '月度追蹤' }, { row: 2, col: 6, value: '督導王〇〇' },
      ],
      columns: [
        { header: '問題/議題', width: 200 },
        { header: '改善目標', width: 160 },
        { header: '改善措施', width: 200 },
        { header: '執行期限', width: 110 },
        { header: '執行結果', width: 180 },
        { header: '後續追蹤', width: 140 },
        { header: '負責人', width: 100 },
      ],
    },
    // [補] 第 26 條 criteria 3：感染管制訓練頻率年度彙整表
    {
      sheetName: '[補] 感染管制訓練頻率彙整表',
      archetype: 'inspection-checklist',
      criteriaIndex: 3,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: '2023年度' }, { row: 0, col: 1, value: '是' }, { row: 0, col: 2, value: '2023-11-15' }, { row: 0, col: 3, value: '1場（14名人員）' }, { row: 0, col: 4, value: '—' }, { row: 0, col: 5, value: '督導王〇〇' }, { row: 0, col: 6, value: '主任〇〇〇' },
        { row: 1, col: 0, value: '2024年度' }, { row: 1, col: 1, value: '是' }, { row: 1, col: 2, value: '2024-10-20' }, { row: 1, col: 3, value: '1場（16名人員）' }, { row: 1, col: 4, value: '—' }, { row: 1, col: 5, value: '督導王〇〇' }, { row: 1, col: 6, value: '主任〇〇〇' },
        { row: 2, col: 0, value: '2025年度' }, { row: 2, col: 1, value: '是' }, { row: 2, col: 2, value: '2025-11-12（預計）' }, { row: 2, col: 3, value: '規劃中' }, { row: 2, col: 4, value: '—' }, { row: 2, col: 5, value: '督導李〇〇' }, { row: 2, col: 6, value: '主任〇〇〇' },
      ],
      columns: [
        { header: '期間', width: 120 },
        { header: '是否辦理', width: 90 },
        { header: '辦理日期', width: 130 },
        { header: '件數/場次', width: 130 },
        { header: '未辦理說明', width: 160 },
        { header: '彙整人員', width: 110 },
        { header: '主管核章', width: 110 },
      ],
    },
  ],

  /** 27. 服務品質改善 */
  27: [
    {
      sheetName: '品質改善計畫表',
      archetype: 'care-plan',
      criteriaIndex: 1,
      columns: [
        { header: '問題描述', width: 200 },
        { header: '根本原因分析', width: 200 },
        { header: '改善目標', width: 180 },
        { header: '改善措施', width: 200 },
        { header: '執行期限', width: 100 },
        { header: '追蹤結果', width: 180 },
        { header: '負責人', width: 90 },
      ],
    },
    // [補] 第 27 條 criteria 0：服務品質自評辦理頻率彙整表
    {
      sheetName: '[補] 服務品質自評辦理彙整表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: '2023年度自評' }, { row: 0, col: 1, value: '是' }, { row: 0, col: 2, value: '2023-12-10' }, { row: 0, col: 3, value: '1次（年度）' }, { row: 0, col: 4, value: '—' }, { row: 0, col: 5, value: '督導王〇〇' }, { row: 0, col: 6, value: '主任〇〇〇' },
        { row: 1, col: 0, value: '2024年度自評' }, { row: 1, col: 1, value: '是' }, { row: 1, col: 2, value: '2024-12-15' }, { row: 1, col: 3, value: '1次（年度）' }, { row: 1, col: 4, value: '—' }, { row: 1, col: 5, value: '督導王〇〇' }, { row: 1, col: 6, value: '主任〇〇〇' },
        { row: 2, col: 0, value: '2025年度自評' }, { row: 2, col: 1, value: '規劃中' }, { row: 2, col: 2, value: '2025-12-12（預計）' }, { row: 2, col: 3, value: '—' }, { row: 2, col: 4, value: '—' }, { row: 2, col: 5, value: '督導李〇〇' }, { row: 2, col: 6, value: '主任〇〇〇' },
      ],
      columns: [
        { header: '期間', width: 130 },
        { header: '是否辦理', width: 90 },
        { header: '辦理日期', width: 130 },
        { header: '件數/場次', width: 110 },
        { header: '未辦理說明', width: 160 },
        { header: '彙整人員', width: 110 },
        { header: '主管核章', width: 110 },
      ],
    },
    // [補] 第 27 條 criteria 1：品質改善計畫執行追蹤表
    {
      sheetName: '[補] 品質改善計畫執行追蹤表',
      archetype: 'care-plan',
      criteriaIndex: 1,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: '服務準時率低於 90%' }, { row: 0, col: 1, value: '服務準時率≥90%' }, { row: 0, col: 2, value: '調整排班+GPS定位+月抽查' }, { row: 0, col: 3, value: '2025-06-30' }, { row: 0, col: 4, value: '達標（準時率92%）' }, { row: 0, col: 5, value: '季度追蹤' }, { row: 0, col: 6, value: '督導王〇〇' },
        { row: 1, col: 0, value: '服務紀錄格式不一致' }, { row: 1, col: 1, value: '格式一致率 100%' }, { row: 1, col: 2, value: '統一範本+月查核+交班提醒' }, { row: 1, col: 3, value: '2025-03-31' }, { row: 1, col: 4, value: '達標（格式一致率 100%）' }, { row: 1, col: 5, value: '半年後複查' }, { row: 1, col: 6, value: '督導李〇〇' },
        { row: 2, col: 0, value: '個案申訴回覆逾時（超過7日）' }, { row: 2, col: 1, value: '申訴回覆時效≤5個工作天' }, { row: 2, col: 2, value: '建立申訴時效提醒系統+主管直接督管' }, { row: 2, col: 3, value: '2025-09-30' }, { row: 2, col: 4, value: '進行中（Q2無逾時案件）' }, { row: 2, col: 5, value: '月度追蹤' }, { row: 2, col: 6, value: '主任〇〇〇' },
      ],
      columns: [
        { header: '問題/議題', width: 200 },
        { header: '改善目標', width: 160 },
        { header: '改善措施', width: 200 },
        { header: '執行期限', width: 110 },
        { header: '執行結果', width: 180 },
        { header: '後續追蹤', width: 140 },
        { header: '負責人', width: 100 },
      ],
    },
    // [補] 第 27 條 criteria 2：改善成效量化指標表
    {
      sheetName: '[補] 改善成效量化指標表',
      archetype: 'inspection-checklist',
      criteriaIndex: 2,
      prefillRows: 6,
      prefillCells: [
        { row: 0, col: 0, value: '服務準時率' },
        { row: 1, col: 0, value: '個案滿意度平均分數（5分制）' },
        { row: 2, col: 0, value: '申訴件數（季度）' },
        { row: 0, col: 1, value: '✓' }, { row: 0, col: 2, value: '月報統計表（GPS紀錄）' }, { row: 0, col: 3, value: '品質管理資料夾' }, { row: 0, col: 4, value: '督導王〇〇' },
        { row: 1, col: 1, value: '✓' }, { row: 1, col: 2, value: '滿意度調查結果（2024年度 4.6分）' }, { row: 1, col: 3, value: '品質管理資料夾' }, { row: 1, col: 4, value: '社工王〇〇' },
        { row: 2, col: 1, value: '✓' }, { row: 2, col: 2, value: '申訴紀錄彙整表（2025 Q1：0件）' }, { row: 2, col: 3, value: '申訴管理資料夾' }, { row: 2, col: 4, value: '社工王〇〇' },
      ],
      columns: [
        { header: '品質指標名稱', width: 220 },
        { header: '是否具備', width: 90 },
        { header: '佐證文件', width: 200 },
        { header: '歸檔位置', width: 160 },
        { header: '負責人員', width: 110 },
      ],
    },
    // [補] 第 27 條 criteria 3：根本原因分析（RCA）紀錄表
    {
      sheetName: '[補] 根本原因分析（RCA）紀錄表',
      archetype: 'care-plan',
      criteriaIndex: 3,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: '服務準時率連續3個月低於目標' }, { row: 0, col: 1, value: '準時率≥90%' }, { row: 0, col: 2, value: '原因：交通路況+個案突發需求；對策：提早出發+彈性時窗' }, { row: 0, col: 3, value: '2025-06-30' }, { row: 0, col: 4, value: '達標（Q2 準時率92%）' }, { row: 0, col: 5, value: '季度追蹤' }, { row: 0, col: 6, value: '督導王〇〇' },
        { row: 1, col: 0, value: '照服員服務紀錄漏填率偏高（8%）' }, { row: 1, col: 1, value: '漏填率降至≤1%' }, { row: 1, col: 2, value: '原因：交班時間緊+未落實；對策：交班提醒+月查核獎懲' }, { row: 1, col: 3, value: '2025-09-30' }, { row: 1, col: 4, value: '進行中（Q2 漏填率3%）' }, { row: 1, col: 5, value: '月度追蹤' }, { row: 1, col: 6, value: '督導李〇〇' },
        { row: 2, col: 0, value: '個案滿意度「服務態度」評分偏低（3.8/5）' }, { row: 2, col: 1, value: '服務態度評分≥4.5/5' }, { row: 2, col: 2, value: '原因：部分照服員溝通技巧不足；對策：服務態度訓練+個別輔導' }, { row: 2, col: 3, value: '2025-12-31' }, { row: 2, col: 4, value: '進行中（訓練已完成）' }, { row: 2, col: 5, value: '半年後複評' }, { row: 2, col: 6, value: '督導王〇〇' },
      ],
      columns: [
        { header: '問題/議題', width: 200 },
        { header: '改善目標', width: 160 },
        { header: '根本原因分析與對策', width: 220 },
        { header: '執行期限', width: 110 },
        { header: '執行結果', width: 180 },
        { header: '後續追蹤', width: 140 },
        { header: '負責人', width: 100 },
      ],
    },
  ],

  /** 28. 服務使用者滿意度調查 */
  28: [
    {
      sheetName: '滿意度調查結果分析',
      archetype: 'inventory-list',
      criteriaIndex: 2,
      prefillRows: 3,
      columns: [
        { header: '調查期間', width: 120 },
        { header: '調查對象', width: 130 },
        { header: '回收份數', width: 100 },
        { header: '滿意度分數', width: 110 },
        { header: '主要優點', width: 180 },
        { header: '主要建議', width: 180 },
        { header: '改善措施', width: 180 },
      ],
    },
    // [補] 第 28 條 criteria 0：滿意度調查辦理頻率彙整表
    {
      sheetName: '[補] 滿意度調查頻率彙整表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: '2023年度' }, { row: 0, col: 1, value: '是' }, { row: 0, col: 2, value: '2023-11-30' }, { row: 0, col: 3, value: '1次（32份問卷）' }, { row: 0, col: 4, value: '—' }, { row: 0, col: 5, value: '社工王〇〇' }, { row: 0, col: 6, value: '主任〇〇〇' },
        { row: 1, col: 0, value: '2024年度' }, { row: 1, col: 1, value: '是' }, { row: 1, col: 2, value: '2024-11-28' }, { row: 1, col: 3, value: '1次（38份問卷）' }, { row: 1, col: 4, value: '—' }, { row: 1, col: 5, value: '社工王〇〇' }, { row: 1, col: 6, value: '主任〇〇〇' },
        { row: 2, col: 0, value: '2025年度' }, { row: 2, col: 1, value: '規劃中' }, { row: 2, col: 2, value: '2025-11-30（預計）' }, { row: 2, col: 3, value: '—' }, { row: 2, col: 4, value: '—' }, { row: 2, col: 5, value: '社工李〇〇' }, { row: 2, col: 6, value: '主任〇〇〇' },
      ],
      columns: [
        { header: '期間', width: 120 },
        { header: '是否辦理', width: 90 },
        { header: '辦理日期', width: 130 },
        { header: '件數/場次', width: 130 },
        { header: '未辦理說明', width: 160 },
        { header: '彙整人員', width: 110 },
        { header: '主管核章', width: 110 },
      ],
    },
    // [補] 第 28 條 criteria 1：調查工具版本與效度說明表
    {
      sheetName: '[補] 調查工具版本與效度說明表',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: 'v1.0' }, { row: 0, col: 1, value: '2023-01-01' }, { row: 0, col: 2, value: '—' }, { row: 0, col: 3, value: '初版問卷（5題，5分量表），參考衛福部範本' }, { row: 0, col: 4, value: '主任〇〇〇' }, { row: 0, col: 5, value: '品質管理資料夾' }, { row: 0, col: 6, value: '品質管理資料夾 QA-滿意度' },
        { row: 1, col: 0, value: 'v1.1' }, { row: 1, col: 1, value: '2023-01-01' }, { row: 1, col: 2, value: '2024-03-10' }, { row: 1, col: 3, value: '新增「準時率」與「溝通態度」2題，共7題' }, { row: 1, col: 4, value: '主任〇〇〇' }, { row: 1, col: 5, value: '品質管理資料夾' }, { row: 1, col: 6, value: '品質管理資料夾 QA-滿意度' },
        { row: 2, col: 0, value: 'v2.0' }, { row: 2, col: 1, value: '2023-01-01' }, { row: 2, col: 2, value: '2025-01-20' }, { row: 2, col: 3, value: '新增匿名機制說明及回收方式說明' }, { row: 2, col: 4, value: '督導王〇〇' }, { row: 2, col: 5, value: '品質管理資料夾' }, { row: 2, col: 6, value: '品質管理資料夾 QA-滿意度' },
      ],
      columns: [
        { header: '版次', width: 80 },
        { header: '制定日期', width: 110 },
        { header: '修訂日期', width: 110 },
        { header: '修訂重點', width: 220 },
        { header: '核定人員', width: 110 },
        { header: '公告位置', width: 160 },
        { header: '歸檔位置', width: 180 },
      ],
    },
    // [補] 第 28 條 criteria 2：調查結果分析報告版本管控表
    {
      sheetName: '[補] 調查結果分析報告版本管控表',
      archetype: 'inspection-checklist',
      criteriaIndex: 2,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: 'v1.0' }, { row: 0, col: 1, value: '2023-12-20' }, { row: 0, col: 2, value: '—' }, { row: 0, col: 3, value: '2023年度滿意度分析報告（4.5/5）' }, { row: 0, col: 4, value: '主任〇〇〇' }, { row: 0, col: 5, value: '主管會議報告' }, { row: 0, col: 6, value: '品質管理資料夾 QA-滿意度' },
        { row: 1, col: 0, value: 'v1.0' }, { row: 1, col: 1, value: '2024-12-18' }, { row: 1, col: 2, value: '—' }, { row: 1, col: 3, value: '2024年度滿意度分析報告（4.6/5）' }, { row: 1, col: 4, value: '主任〇〇〇' }, { row: 1, col: 5, value: '主管會議報告' }, { row: 1, col: 6, value: '品質管理資料夾 QA-滿意度' },
        { row: 2, col: 0, value: 'v1.0' }, { row: 2, col: 1, value: '2025-12-18（預計）' }, { row: 2, col: 2, value: '—' }, { row: 2, col: 3, value: '2025年度滿意度分析報告（規劃中）' }, { row: 2, col: 4, value: '主任〇〇〇' }, { row: 2, col: 5, value: '主管會議報告' }, { row: 2, col: 6, value: '品質管理資料夾 QA-滿意度' },
      ],
      columns: [
        { header: '版次', width: 80 },
        { header: '制定日期', width: 110 },
        { header: '修訂日期', width: 110 },
        { header: '修訂重點', width: 220 },
        { header: '核定人員', width: 110 },
        { header: '公告位置', width: 160 },
        { header: '歸檔位置', width: 180 },
      ],
    },
    // [補] 第 28 條 criteria 3：滿意度改善措施追蹤表
    {
      sheetName: '[補] 滿意度改善措施追蹤表',
      archetype: 'care-plan',
      criteriaIndex: 3,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: '「準時率」評分偏低（3.8/5）' }, { row: 0, col: 1, value: '準時率評分≥4.5/5' }, { row: 0, col: 2, value: '調整排班+緩衝時間設計+提前通知個案' }, { row: 0, col: 3, value: '2025-06-30' }, { row: 0, col: 4, value: '達標（2025年中期評分 4.6/5）' }, { row: 0, col: 5, value: '年度複評' }, { row: 0, col: 6, value: '督導王〇〇' },
        { row: 1, col: 0, value: '「服務內容說明」評分偏低（3.9/5）' }, { row: 1, col: 1, value: '說明清晰度評分≥4.5/5' }, { row: 1, col: 2, value: '加強入案說明訓練+製作說明圖卡' }, { row: 1, col: 3, value: '2025-09-30' }, { row: 1, col: 4, value: '進行中（圖卡製作完成）' }, { row: 1, col: 5, value: '半年後複評' }, { row: 1, col: 6, value: '社工王〇〇' },
        { row: 2, col: 0, value: '家屬反映照服員主動性不足' }, { row: 2, col: 1, value: '家屬滿意度平均≥4.5/5' }, { row: 2, col: 2, value: '加強溝通技巧訓練+每月家屬電訪制度' }, { row: 2, col: 3, value: '2025-12-31' }, { row: 2, col: 4, value: '進行中' }, { row: 2, col: 5, value: '季度追蹤' }, { row: 2, col: 6, value: '督導李〇〇' },
      ],
      columns: [
        { header: '問題/議題', width: 200 },
        { header: '改善目標', width: 160 },
        { header: '改善措施', width: 200 },
        { header: '執行期限', width: 110 },
        { header: '執行結果', width: 180 },
        { header: '後續追蹤', width: 140 },
        { header: '負責人', width: 100 },
      ],
    },
  ],

  /** 29. 品質監測機制 */
  29: [
    {
      sheetName: '品質指標監測記錄',
      archetype: 'daily-record',
      criteriaIndex: 0,
      prefillRows: 6,
      columns: [
        { header: '統計期間', width: 110 },
        { header: '指標名稱', width: 180 },
        { header: '目標值', width: 90 },
        { header: '實際值', width: 90 },
        { header: '達標狀況', width: 100 },
        { header: '改善行動', width: 200 },
        { header: '負責人', width: 90 },
      ],
    },
    // [補] 第 29 條 criteria 0：品質指標清單與目標值版本管控表
    {
      sheetName: '[補] 品質指標清單版本管控表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: 'v1.0' }, { row: 0, col: 1, value: '2023-01-01' }, { row: 0, col: 2, value: '—' }, { row: 0, col: 3, value: '初版訂定3項指標（準時率/申訴率/滿意度）' }, { row: 0, col: 4, value: '主任〇〇〇' }, { row: 0, col: 5, value: '品質管理公告欄' }, { row: 0, col: 6, value: '品質管理資料夾 QA-指標' },
        { row: 1, col: 0, value: 'v1.1' }, { row: 1, col: 1, value: '2023-01-01' }, { row: 1, col: 2, value: '2024-01-15' }, { row: 1, col: 3, value: '新增「服務紀錄完整率」指標，共4項' }, { row: 1, col: 4, value: '主任〇〇〇' }, { row: 1, col: 5, value: '品質管理公告欄' }, { row: 1, col: 6, value: '品質管理資料夾 QA-指標' },
        { row: 2, col: 0, value: 'v2.0' }, { row: 2, col: 1, value: '2023-01-01' }, { row: 2, col: 2, value: '2025-01-10' }, { row: 2, col: 3, value: '調整各項指標目標值，新增季度達標機制' }, { row: 2, col: 4, value: '督導王〇〇' }, { row: 2, col: 5, value: '全通路公告' }, { row: 2, col: 6, value: '品質管理資料夾 QA-指標' },
      ],
      columns: [
        { header: '版次', width: 80 },
        { header: '制定日期', width: 110 },
        { header: '修訂日期', width: 110 },
        { header: '修訂重點', width: 220 },
        { header: '核定人員', width: 110 },
        { header: '公告位置', width: 160 },
        { header: '歸檔位置', width: 180 },
      ],
    },
    // [補] 第 29 條 criteria 1：品質指標月度/季度彙整表
    {
      sheetName: '[補] 品質指標季度彙整表',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
      prefillRows: 6,
      prefillCells: [
        { row: 0, col: 0, value: '2025年Q1' }, { row: 0, col: 1, value: '是' }, { row: 0, col: 2, value: '2025-03-31' }, { row: 0, col: 3, value: '4項指標均彙整' }, { row: 0, col: 4, value: '—' }, { row: 0, col: 5, value: '督導王〇〇' }, { row: 0, col: 6, value: '主任〇〇〇' },
        { row: 1, col: 0, value: '2025年Q2' }, { row: 1, col: 1, value: '是' }, { row: 1, col: 2, value: '2025-06-30' }, { row: 1, col: 3, value: '4項指標均彙整' }, { row: 1, col: 4, value: '—' }, { row: 1, col: 5, value: '督導王〇〇' }, { row: 1, col: 6, value: '主任〇〇〇' },
        { row: 2, col: 0, value: '2025年Q3' }, { row: 2, col: 1, value: '是' }, { row: 2, col: 2, value: '2025-09-30' }, { row: 2, col: 3, value: '4項指標均彙整' }, { row: 2, col: 4, value: '—' }, { row: 2, col: 5, value: '督導李〇〇' }, { row: 2, col: 6, value: '主任〇〇〇' },
      ],
      columns: [
        { header: '期間', width: 120 },
        { header: '是否辦理', width: 90 },
        { header: '辦理日期', width: 120 },
        { header: '件數/場次', width: 130 },
        { header: '未辦理說明', width: 160 },
        { header: '彙整人員', width: 110 },
        { header: '主管核章', width: 110 },
      ],
    },
    // [補] 第 29 條 criteria 2：品質問題改善行動追蹤表
    {
      sheetName: '[補] 品質問題改善行動追蹤表',
      archetype: 'care-plan',
      criteriaIndex: 2,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: '準時率連續2季低於目標（88%<90%）' }, { row: 0, col: 1, value: '準時率達標≥90%' }, { row: 0, col: 2, value: '重新評估排班表+增加緩衝時間' }, { row: 0, col: 3, value: '2025-09-30' }, { row: 0, col: 4, value: '進行中（Q3 達 91%）' }, { row: 0, col: 5, value: '季度追蹤' }, { row: 0, col: 6, value: '督導王〇〇' },
        { row: 1, col: 0, value: '服務紀錄完整率低（Q1：92%）' }, { row: 1, col: 1, value: '紀錄完整率達標≥98%' }, { row: 1, col: 2, value: '月查核+統一交班提醒' }, { row: 1, col: 3, value: '2025-06-30' }, { row: 1, col: 4, value: '達標（Q2 完整率 99%）' }, { row: 1, col: 5, value: '季後複查' }, { row: 1, col: 6, value: '督導李〇〇' },
        { row: 2, col: 0, value: '申訴率Q1偏高（0.5%）' }, { row: 2, col: 1, value: '申訴率降至≤0.2%' }, { row: 2, col: 2, value: '個別輔導申訴相關照服員+加強服務態度訓練' }, { row: 2, col: 3, value: '2025-12-31' }, { row: 2, col: 4, value: '進行中（Q2 降至0.3%）' }, { row: 2, col: 5, value: '月度追蹤' }, { row: 2, col: 6, value: '主任〇〇〇' },
      ],
      columns: [
        { header: '問題/議題', width: 200 },
        { header: '改善目標', width: 160 },
        { header: '改善措施', width: 200 },
        { header: '執行期限', width: 110 },
        { header: '執行結果', width: 180 },
        { header: '後續追蹤', width: 140 },
        { header: '負責人', width: 100 },
      ],
    },
    // [補] 第 29 條 criteria 3：品質監測結果呈報紀錄表
    {
      sheetName: '[補] 品質監測結果呈報紀錄表',
      archetype: 'meeting-minutes',
      criteriaIndex: 3,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: '2025-03-31' }, { row: 0, col: 1, value: '2025年Q1品質指標成果報告' }, { row: 0, col: 2, value: '督導王〇〇（報告）、主任〇〇〇（主持）、社工×2' }, { row: 0, col: 3, value: '準時率90%達標；申訴率0.3%（需改善）；滿意度4.6/5' }, { row: 0, col: 4, value: '提出申訴率改善行動計畫' }, { row: 0, col: 5, value: '督導王〇〇' },
        { row: 1, col: 0, value: '2025-06-30' }, { row: 1, col: 1, value: '2025年Q2品質指標成果報告' }, { row: 1, col: 2, value: '督導王〇〇（報告）、主任〇〇〇（主持）、社工×2' }, { row: 1, col: 3, value: '準時率92%達標；申訴率0.2%達標；滿意度4.7/5' }, { row: 1, col: 4, value: '繼續維持現行策略' }, { row: 1, col: 5, value: '督導王〇〇' },
        { row: 2, col: 0, value: '2025-09-30' }, { row: 2, col: 1, value: '2025年Q3品質指標成果報告' }, { row: 2, col: 2, value: '督導李〇〇（報告）、主任〇〇〇（主持）、社工×2' }, { row: 2, col: 3, value: '各項指標均達標' }, { row: 2, col: 4, value: '維持現行機制，準備年度總結報告' }, { row: 2, col: 5, value: '督導李〇〇' },
      ],
      columns: [
        { header: '呈報日期', width: 110 },
        { header: '呈報主題', width: 200 },
        { header: '出席人員', width: 200 },
        { header: '主要內容摘要', width: 220 },
        { header: '決議/後續行動', width: 180 },
        { header: '記錄人員', width: 110 },
      ],
    },
  ],

  /** 30. 機構自評 */
  30: [
    {
      sheetName: '機構自評改善計畫',
      archetype: 'care-plan',
      criteriaIndex: 2,
      columns: [
        { header: '評鑑項目', width: 160 },
        { header: '自評結果', width: 130 },
        { header: '發現缺失', width: 200 },
        { header: '改善目標', width: 180 },
        { header: '改善措施', width: 200 },
        { header: '執行期限', width: 100 },
        { header: '追蹤結果', width: 180 },
      ],
    },
    // [補] 第 30 條 criteria 0：機構自評辦理年度彙整表
    {
      sheetName: '[補] 機構自評辦理年度彙整表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: '2023年度自評' }, { row: 0, col: 1, value: '是' }, { row: 0, col: 2, value: '2023-12-10' }, { row: 0, col: 3, value: '1次（32項評鑑基準自評完成）' }, { row: 0, col: 4, value: '—' }, { row: 0, col: 5, value: '督導王〇〇' }, { row: 0, col: 6, value: '主任〇〇〇' },
        { row: 1, col: 0, value: '2024年度自評' }, { row: 1, col: 1, value: '是' }, { row: 1, col: 2, value: '2024-12-08' }, { row: 1, col: 3, value: '1次（32項評鑑基準自評完成）' }, { row: 1, col: 4, value: '—' }, { row: 1, col: 5, value: '督導王〇〇' }, { row: 1, col: 6, value: '主任〇〇〇' },
        { row: 2, col: 0, value: '2025年度自評' }, { row: 2, col: 1, value: '規劃中' }, { row: 2, col: 2, value: '2025-12-05（預計）' }, { row: 2, col: 3, value: '—' }, { row: 2, col: 4, value: '—' }, { row: 2, col: 5, value: '督導李〇〇' }, { row: 2, col: 6, value: '主任〇〇〇' },
      ],
      columns: [
        { header: '期間', width: 130 },
        { header: '是否辦理', width: 90 },
        { header: '辦理日期', width: 130 },
        { header: '件數/場次', width: 150 },
        { header: '未辦理說明', width: 160 },
        { header: '彙整人員', width: 110 },
        { header: '主管核章', width: 110 },
      ],
    },
    // [補] 第 30 條 criteria 1：自評報告版本管控表
    {
      sheetName: '[補] 自評報告版本管控表',
      archetype: 'inspection-checklist',
      criteriaIndex: 1,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: 'v1.0' }, { row: 0, col: 1, value: '2023-12-15' }, { row: 0, col: 2, value: '—' }, { row: 0, col: 3, value: '2023年度機構自評報告（32項，得分88/100）' }, { row: 0, col: 4, value: '主任〇〇〇' }, { row: 0, col: 5, value: '行政室存查' }, { row: 0, col: 6, value: '自評報告資料夾 SA-2023' },
        { row: 1, col: 0, value: 'v1.0' }, { row: 1, col: 1, value: '2024-12-12' }, { row: 1, col: 2, value: '—' }, { row: 1, col: 3, value: '2024年度機構自評報告（32項，得分92/100）' }, { row: 1, col: 4, value: '主任〇〇〇' }, { row: 1, col: 5, value: '行政室存查' }, { row: 1, col: 6, value: '自評報告資料夾 SA-2024' },
        { row: 2, col: 0, value: 'v1.0' }, { row: 2, col: 1, value: '2025-12-10（預計）' }, { row: 2, col: 2, value: '—' }, { row: 2, col: 3, value: '2025年度機構自評報告（規劃中）' }, { row: 2, col: 4, value: '主任〇〇〇' }, { row: 2, col: 5, value: '行政室存查' }, { row: 2, col: 6, value: '自評報告資料夾 SA-2025' },
      ],
      columns: [
        { header: '版次', width: 80 },
        { header: '制定日期', width: 110 },
        { header: '修訂日期', width: 110 },
        { header: '修訂重點', width: 220 },
        { header: '核定人員', width: 110 },
        { header: '公告位置', width: 160 },
        { header: '歸檔位置', width: 180 },
      ],
    },
    // [補] 第 30 條 criteria 2：自評發現問題改善計畫追蹤表
    {
      sheetName: '[補] 自評問題改善計畫追蹤表',
      archetype: 'care-plan',
      criteriaIndex: 2,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: '自評發現：緊急事件 SOP 缺版次管控' }, { row: 0, col: 1, value: '完成 SOP 版本管控表建立' }, { row: 0, col: 2, value: '建立緊急事件 SOP 版本管控表並公告' }, { row: 0, col: 3, value: '2025-03-31' }, { row: 0, col: 4, value: '達標（已建立並公告）' }, { row: 0, col: 5, value: '年度自評複查' }, { row: 0, col: 6, value: '督導王〇〇' },
        { row: 1, col: 0, value: '自評發現：個案重評逾期率 8%' }, { row: 1, col: 1, value: '重評逾期率降至≤2%' }, { row: 1, col: 2, value: '建立重評到期自動提醒+月追蹤清單' }, { row: 1, col: 3, value: '2025-06-30' }, { row: 1, col: 4, value: '達標（逾期率降至1%）' }, { row: 1, col: 5, value: '季度追蹤' }, { row: 1, col: 6, value: '社工王〇〇' },
        { row: 2, col: 0, value: '自評發現：在職訓練時數達標率 85%' }, { row: 2, col: 1, value: '在職訓練時數達標率≥100%' }, { row: 2, col: 2, value: '建立個人訓練時數監控表+季度提醒' }, { row: 2, col: 3, value: '2025-12-31' }, { row: 2, col: 4, value: '進行中（Q2 達標率 95%）' }, { row: 2, col: 5, value: '季度追蹤' }, { row: 2, col: 6, value: '督導李〇〇' },
      ],
      columns: [
        { header: '問題/議題', width: 200 },
        { header: '改善目標', width: 160 },
        { header: '改善措施', width: 200 },
        { header: '執行期限', width: 110 },
        { header: '執行結果', width: 180 },
        { header: '後續追蹤', width: 140 },
        { header: '負責人', width: 100 },
      ],
    },
    // [補] 第 30 條 criteria 3：自評結果呈報紀錄表
    {
      sheetName: '[補] 自評結果呈報紀錄表',
      archetype: 'meeting-minutes',
      criteriaIndex: 3,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: '2023-12-18' }, { row: 0, col: 1, value: '2023年度機構自評結果報告' }, { row: 0, col: 2, value: '主任〇〇〇（主持）、督導王〇〇（報告）、社工×2、照服員代表×1' }, { row: 0, col: 3, value: '自評得分88分；7項發現缺失，提出改善計畫' }, { row: 0, col: 4, value: '各項缺失責任人確認，限期改善' }, { row: 0, col: 5, value: '督導王〇〇' },
        { row: 1, col: 0, value: '2024-12-16' }, { row: 1, col: 1, value: '2024年度機構自評結果報告' }, { row: 1, col: 2, value: '主任〇〇〇（主持）、督導王〇〇（報告）、社工×2、照服員代表×1' }, { row: 1, col: 3, value: '自評得分92分；3項發現缺失（較2023改善）' }, { row: 1, col: 4, value: '持續追蹤3項缺失改善進度' }, { row: 1, col: 5, value: '督導王〇〇' },
        { row: 2, col: 0, value: '2025-12-15（預計）' }, { row: 2, col: 1, value: '2025年度機構自評結果報告（規劃中）' }, { row: 2, col: 2, value: '主任〇〇〇（主持）、督導李〇〇（報告）、社工×2' }, { row: 2, col: 3, value: '（規劃中）' }, { row: 2, col: 4, value: '（規劃中）' }, { row: 2, col: 5, value: '督導李〇〇' },
      ],
      columns: [
        { header: '呈報日期', width: 110 },
        { header: '呈報主題', width: 200 },
        { header: '出席人員', width: 220 },
        { header: '主要內容摘要', width: 220 },
        { header: '決議/後續行動', width: 180 },
        { header: '記錄人員', width: 110 },
      ],
    },
  ],

  /** 31. 創新服務或社區資源連結（加分題） */
  31: [
    {
      sheetName: '社區資源連結成果清冊',
      archetype: 'inventory-list',
      criteriaIndex: 1,
      prefillRows: 8,
      columns: [
        { header: '資源名稱', width: 160 },
        { header: '合作單位', width: 160 },
        { header: '服務項目', width: 180 },
        { header: '受益個案數', width: 110 },
        { header: '成效記錄', width: 200 },
        { header: '建立日期', width: 100 },
      ],
    },
    // [補] 第 31 條 criteria 0：創新方案版本管控表
    {
      sheetName: '[補] 創新方案版本管控表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: 'v1.0' }, { row: 0, col: 1, value: '2023-06-01' }, { row: 0, col: 2, value: '—' }, { row: 0, col: 3, value: '初版：居家AI健康監測試辦計畫（與○○科技合作）' }, { row: 0, col: 4, value: '主任〇〇〇' }, { row: 0, col: 5, value: '機構公告欄+官網' }, { row: 0, col: 6, value: '創新方案資料夾 INV-1' },
        { row: 1, col: 0, value: 'v1.1' }, { row: 1, col: 1, value: '2023-06-01' }, { row: 1, col: 2, value: '2024-03-15' }, { row: 1, col: 3, value: '擴大試辦對象至15名個案，新增家屬App通知' }, { row: 1, col: 4, value: '主任〇〇〇' }, { row: 1, col: 5, value: '機構公告欄+官網' }, { row: 1, col: 6, value: '創新方案資料夾 INV-1' },
        { row: 2, col: 0, value: 'v2.0' }, { row: 2, col: 1, value: '2023-06-01' }, { row: 2, col: 2, value: '2025-01-20' }, { row: 2, col: 3, value: '正式推廣至全機構個案，新增社區預防概念' }, { row: 2, col: 4, value: '督導王〇〇' }, { row: 2, col: 5, value: '全通路公告' }, { row: 2, col: 6, value: '創新方案資料夾 INV-2' },
      ],
      columns: [
        { header: '版次', width: 80 },
        { header: '制定日期', width: 110 },
        { header: '修訂日期', width: 110 },
        { header: '修訂重點', width: 220 },
        { header: '核定人員', width: 110 },
        { header: '公告位置', width: 160 },
        { header: '歸檔位置', width: 180 },
      ],
    },
    // [補] 第 31 條 criteria 2：受益個案與成效量化統計表
    {
      sheetName: '[補] 受益個案成效量化統計表',
      archetype: 'inspection-checklist',
      criteriaIndex: 2,
      prefillRows: 6,
      prefillCells: [
        { row: 0, col: 0, value: '受益個案數' },
        { row: 1, col: 0, value: '平均滿意度（創新服務項目）' },
        { row: 2, col: 0, value: '問題早期偵測次數（AI健康監測警示）' },
        { row: 0, col: 1, value: '✓' }, { row: 0, col: 2, value: '個案服務清冊（2024年度：28人受益）' }, { row: 0, col: 3, value: '創新方案資料夾 INV-2' }, { row: 0, col: 4, value: '督導王〇〇' },
        { row: 1, col: 1, value: '✓' }, { row: 1, col: 2, value: '創新服務滿意度調查（4.8/5）' }, { row: 1, col: 3, value: '品質管理資料夾 QA-創新' }, { row: 1, col: 4, value: '社工王〇〇' },
        { row: 2, col: 1, value: '✓' }, { row: 2, col: 2, value: 'AI監測警示紀錄（2024年：12次，均即時處理）' }, { row: 2, col: 3, value: '創新方案資料夾 INV-2' }, { row: 2, col: 4, value: '督導王〇〇' },
      ],
      columns: [
        { header: '成效指標名稱', width: 220 },
        { header: '是否具備', width: 90 },
        { header: '佐證文件', width: 220 },
        { header: '歸檔位置', width: 180 },
        { header: '負責人員', width: 110 },
      ],
    },
    // [補] 第 31 條 criteria 3：創新推廣擴散紀錄表
    {
      sheetName: '[補] 創新推廣擴散紀錄表',
      archetype: 'daily-record',
      criteriaIndex: 3,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: '2024-05-20' }, { row: 0, col: 1, value: '受邀於○○長照研討會分享居家AI監測模式' }, { row: 0, col: 2, value: '50位長照從業人員' }, { row: 0, col: 3, value: '簡報檔案+會議記錄' }, { row: 0, col: 4, value: '已有2家機構詢問合作' }, { row: 0, col: 5, value: '督導王〇〇' },
        { row: 1, col: 0, value: '2024-09-15' }, { row: 1, col: 1, value: '接受○○雜誌採訪報導創新服務模式' }, { row: 1, col: 2, value: '不特定讀者（發行量5000份）' }, { row: 1, col: 3, value: '雜誌原稿+刊登截圖' }, { row: 1, col: 4, value: '品牌曝光，洽詢案量增加' }, { row: 1, col: 5, value: '主任〇〇〇' },
        { row: 2, col: 0, value: '2025-03-10' }, { row: 2, col: 1, value: '辦理社區照顧講座，分享創新服務成果' }, { row: 2, col: 2, value: '社區居民及家屬 35 人' }, { row: 2, col: 3, value: '講座簽到表+投影片' }, { row: 2, col: 4, value: '3名新個案入案申請' }, { row: 2, col: 5, value: '社工王〇〇' },
      ],
      columns: [
        { header: '日期', width: 110 },
        { header: '推廣方式/活動名稱', width: 220 },
        { header: '對象/範圍', width: 160 },
        { header: '佐證文件', width: 180 },
        { header: '成效說明', width: 180 },
        { header: '負責人員', width: 110 },
      ],
    },
  ],

  /** 32. 照顧者支持服務（加分題） */
  32: [
    {
      sheetName: '照顧者支持課程記錄',
      archetype: 'training-record',
      criteriaIndex: 1,
      columns: [
        { header: '課程日期', width: 100 },
        { header: '課程主題', width: 200 },
        { header: '時數', width: 80 },
        { header: '參加人數', width: 100 },
        { header: '滿意度', width: 90 },
        { header: '成效追蹤', width: 180 },
        { header: '辦理人員', width: 100 },
      ],
    },
    // [補] 第 32 條 criteria 0：3類照顧者支持服務清單
    {
      sheetName: '[補] 照顧者支持服務清單',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 8,
      prefillCells: [
        { row: 0, col: 0, value: '喘息服務（臨時替代性居家服務或機構短托）' },
        { row: 1, col: 0, value: '心理諮詢服務（一對一或小團體輔導）' },
        { row: 2, col: 0, value: '照顧技巧教育訓練（轉位/翻身/給藥/備餐）' },
        { row: 0, col: 1, value: '✓' }, { row: 0, col: 2, value: '喘息服務轉介清冊 2024' }, { row: 0, col: 3, value: '社工資料夾 SW-喘息' }, { row: 0, col: 4, value: '社工王〇〇' },
        { row: 1, col: 1, value: '✓' }, { row: 1, col: 2, value: '心理諮詢合作機構 MOU（○○心理諮商所）' }, { row: 1, col: 3, value: '社工資料夾 SW-諮詢' }, { row: 1, col: 4, value: '社工王〇〇' },
        { row: 2, col: 1, value: '✓' }, { row: 2, col: 2, value: '照顧技巧課程記錄 2024（3場，30人次）' }, { row: 2, col: 3, value: '訓練記錄資料夾 TR-照顧者' }, { row: 2, col: 4, value: '督導王〇〇' },
      ],
      columns: [
        { header: '應含項目', width: 280 },
        { header: '是否具備', width: 90 },
        { header: '佐證文件', width: 200 },
        { header: '歸檔位置', width: 160 },
        { header: '負責人員', width: 110 },
      ],
    },
    // [補] 第 32 條 criteria 2：照顧者成效追蹤表
    {
      sheetName: '[補] 照顧者支持成效追蹤表',
      archetype: 'care-plan',
      criteriaIndex: 2,
      prefillRows: 5,
      prefillCells: [
        { row: 0, col: 0, value: '照顧者反映照顧壓力指數偏高（平均7/10）' }, { row: 0, col: 1, value: '照顧壓力指數降至≤5/10' }, { row: 0, col: 2, value: '提供喘息服務+每月關懷電訪+支持團體' }, { row: 0, col: 3, value: '2025-06-30' }, { row: 0, col: 4, value: '達標（Q2平均壓力指數 4.8/10）' }, { row: 0, col: 5, value: '季度追蹤' }, { row: 0, col: 6, value: '社工王〇〇' },
        { row: 1, col: 0, value: '照顧者對轉位技巧不熟悉，導致照服員需補做' }, { row: 1, col: 1, value: '照顧技巧達標（評量通過）≥80%照顧者' }, { row: 1, col: 2, value: '辦理照顧技巧教育課程（實際操作+評量）' }, { row: 1, col: 3, value: '2025-09-30' }, { row: 1, col: 4, value: '進行中（Q2課程已辦2場，出席率85%）' }, { row: 1, col: 5, value: '季度追蹤' }, { row: 1, col: 6, value: '督導王〇〇' },
        { row: 2, col: 0, value: '照顧者孤立無援，缺乏情感支持' }, { row: 2, col: 1, value: '照顧者支持滿意度≥4.5/5' }, { row: 2, col: 2, value: '每月照顧者支持團體+一對一輔導轉介' }, { row: 2, col: 3, value: '2025-12-31' }, { row: 2, col: 4, value: '進行中（支持團體每月固定辦理）' }, { row: 2, col: 5, value: '半年後複評' }, { row: 2, col: 6, value: '社工李〇〇' },
      ],
      columns: [
        { header: '問題/議題', width: 200 },
        { header: '改善目標', width: 160 },
        { header: '改善措施', width: 200 },
        { header: '執行期限', width: 110 },
        { header: '執行結果', width: 180 },
        { header: '後續追蹤', width: 140 },
        { header: '負責人', width: 100 },
      ],
    },
    // [補] 第 32 條 criteria 3：合作單位連結逐案清冊
    {
      sheetName: '[補] 合作單位連結清冊',
      archetype: 'inventory-list',
      criteriaIndex: 3,
      prefillRows: 15,
      prefillCells: [
        { row: 0, col: 0, value: '○○心理諮商所' }, { row: 0, col: 1, value: '2023-09-01' }, { row: 0, col: 2, value: '合作備忘錄（MOU）' }, { row: 0, col: 3, value: '社工資料夾 SW-合作' }, { row: 0, col: 4, value: '心理諮詢轉介服務，費用補助個案自付200元/次' }, { row: 0, col: 5, value: '社工王〇〇' },
        { row: 1, col: 0, value: '○○社區照顧關懷站' }, { row: 1, col: 1, value: '2024-01-15' }, { row: 1, col: 2, value: '服務連結協議書' }, { row: 1, col: 3, value: '社工資料夾 SW-合作' }, { row: 1, col: 4, value: '喘息服務銜接+社區據點活動轉介' }, { row: 1, col: 5, value: '社工李〇〇' },
        { row: 2, col: 0, value: '○○家庭教育中心' }, { row: 2, col: 1, value: '2024-06-20' }, { row: 2, col: 2, value: '課程合辦協議書' }, { row: 2, col: 3, value: '社工資料夾 SW-合作' }, { row: 2, col: 4, value: '聯辦照顧者教育課程，提供場地與師資' }, { row: 2, col: 5, value: '社工王〇〇' },
      ],
      columns: [
        { header: '合作單位名稱', width: 180 },
        { header: '合作起始日期', width: 130 },
        { header: '佐證文件名稱', width: 200 },
        { header: '歸檔位置', width: 160 },
        { header: '合作內容說明', width: 220 },
        { header: '承辦人員', width: 110 },
      ],
    },
  ],

};
