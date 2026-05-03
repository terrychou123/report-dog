/**
 * 居家護理所評鑑補充文件定義
 * 115年度居家護理所評鑑基準（8項）
 */
import type { SupplementaryDefsMap } from '../supplementary-sheet-types';

export const homeNursingDefs: SupplementaryDefsMap = {

  /** 1. A1 社區資源盤點與運用 */
  1: [
    {
      sheetName: '社區資源清單',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 10,
      columns: [
        { header: '資源類別', width: 120 },
        { header: '機構/單位名稱', width: 180 },
        { header: '服務項目', width: 180 },
        { header: '聯絡方式', width: 150 },
        { header: '更新日期', width: 100 },
        { header: '備註', width: 130 },
      ],
      prefillCells: [
        { row: 0, col: 0, value: '醫療機構' }, { row: 0, col: 1, value: '某某醫療院所' }, { row: 0, col: 2, value: '急性醫療、轉診服務' }, { row: 0, col: 3, value: '02-1234-5678' }, { row: 0, col: 4, value: '2025-10-01' }, { row: 0, col: 5, value: '簽有合作協議，可協助轉介' },
        { row: 1, col: 0, value: '長照機構' }, { row: 1, col: 1, value: '某某日照中心' }, { row: 1, col: 2, value: '日間照護、喘息服務' }, { row: 1, col: 3, value: '02-2345-6789' }, { row: 1, col: 4, value: '2025-10-01' }, { row: 1, col: 5, value: '承接居家護理轉介個案' },
        { row: 2, col: 0, value: '社福單位' }, { row: 2, col: 1, value: '某某社會福利中心' }, { row: 2, col: 2, value: '急難救助、經濟補助資源連結' }, { row: 2, col: 3, value: '02-3456-7890' }, { row: 2, col: 4, value: '2025-10-01' }, { row: 2, col: 5, value: '低收入戶個案優先轉介' },
      ],
    },
    {
      sheetName: '轉介追蹤記錄表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      columns: [
        { header: '轉介日期', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '轉介原因', width: 180 },
        { header: '轉介單位', width: 160 },
        { header: '追蹤日期', width: 100 },
        { header: '追蹤結果', width: 180 },
        { header: '轉介人員', width: 100 },
      ],
      prefillCells: [
        { row: 0, col: 0, value: '2025-11-01' }, { row: 0, col: 1, value: '個案甲' }, { row: 0, col: 2, value: '需日間照護服務' }, { row: 0, col: 3, value: '某某日照中心' }, { row: 0, col: 4, value: '2025-11-15' }, { row: 0, col: 5, value: '已順利轉介，個案每週三天參與日照服務' }, { row: 0, col: 6, value: '護理師甲' },
        { row: 1, col: 0, value: '2025-11-10' }, { row: 1, col: 1, value: '個案乙' }, { row: 1, col: 2, value: '病情加重需住院評估' }, { row: 1, col: 3, value: '某某醫院急診' }, { row: 1, col: 4, value: '2025-11-11' }, { row: 1, col: 5, value: '已入院接受治療，出院後重新排定居家護理訪視' }, { row: 1, col: 6, value: '護理師乙' },
        { row: 2, col: 0, value: '2025-11-20' }, { row: 2, col: 1, value: '個案丙' }, { row: 2, col: 2, value: '需輔具評估申請' }, { row: 2, col: 3, value: '輔具服務資源中心' }, { row: 2, col: 4, value: '2025-12-01' }, { row: 2, col: 5, value: '評估完成，核准輪椅補助，已協助申請送達' }, { row: 2, col: 6, value: '護理師丙' },
      ],
    },
  ],

  /** 2. A2 感染管制作業與器材維護管理 */
  2: [
    {
      sheetName: '感染管制作業查核表',
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
      prefillCells: [
        { row: 0, col: 0, value: '2025-11-01' }, { row: 0, col: 1, value: '手部衛生 WHO 六步驟執行情形' }, { row: 0, col: 2, value: '✓' }, { row: 0, col: 3, value: '' }, { row: 0, col: 4, value: '' }, { row: 0, col: 5, value: '護理師甲' },
        { row: 1, col: 0, value: '2025-11-01' }, { row: 1, col: 1, value: '個人防護裝備（PPE）正確使用與脫除' }, { row: 1, col: 2, value: '✓' }, { row: 1, col: 3, value: '' }, { row: 1, col: 4, value: '' }, { row: 1, col: 5, value: '護理師甲' },
        { row: 2, col: 0, value: '2025-11-01' }, { row: 2, col: 1, value: '感染性醫療廢棄物正確分類與處理' }, { row: 2, col: 2, value: '' }, { row: 2, col: 3, value: '✓' }, { row: 2, col: 4, value: '已對護理師丙進行再訓練，說明分類規定' }, { row: 2, col: 5, value: '護理師甲' },
      ],
    },
    {
      sheetName: '醫療器材盤點維護記錄表',
      archetype: 'inventory-list',
      criteriaIndex: 3,
      prefillRows: 8,
      columns: [
        { header: '器材名稱', width: 160 },
        { header: '型號/序號', width: 140 },
        { header: '盤點日期', width: 100 },
        { header: '維護/校正日期', width: 130 },
        { header: '狀態', width: 100 },
        { header: '下次維護日期', width: 130 },
        { header: '負責人員', width: 100 },
      ],
      prefillCells: [
        { row: 0, col: 0, value: '輸液幫浦' }, { row: 0, col: 1, value: 'IV-2000 / SN-001' }, { row: 0, col: 2, value: '2025-11-01' }, { row: 0, col: 3, value: '2025-10-15' }, { row: 0, col: 4, value: '正常' }, { row: 0, col: 5, value: '2026-04-15' }, { row: 0, col: 6, value: '護理師甲' },
        { row: 1, col: 0, value: '血氧機' }, { row: 1, col: 1, value: 'PO-100 / SN-002' }, { row: 1, col: 2, value: '2025-11-01' }, { row: 1, col: 3, value: '2025-09-30' }, { row: 1, col: 4, value: '正常' }, { row: 1, col: 5, value: '2026-03-30' }, { row: 1, col: 6, value: '護理師甲' },
        { row: 2, col: 0, value: '血壓計' }, { row: 2, col: 1, value: 'BP-200 / SN-003' }, { row: 2, col: 2, value: '2025-11-01' }, { row: 2, col: 3, value: '2025-11-01' }, { row: 2, col: 4, value: '校正完成' }, { row: 2, col: 5, value: '2026-05-01' }, { row: 2, col: 6, value: '護理師乙' },
      ],
    },
    {
      sheetName: '醫療廢棄物處理記錄表',
      archetype: 'daily-record',
      criteriaIndex: 2,
      columns: [
        { header: '處理日期', width: 100 },
        { header: '廢棄物類別', width: 150 },
        { header: '數量/重量', width: 110 },
        { header: '清除廠商', width: 150 },
        { header: '清除單號', width: 120 },
        { header: '負責人員', width: 100 },
      ],
      prefillCells: [
        { row: 0, col: 0, value: '2025-11-01' }, { row: 0, col: 1, value: '感染性廢棄物（B-1101，血液污染品）' }, { row: 0, col: 2, value: '2.5 公斤' }, { row: 0, col: 3, value: '某某廢棄物清除有限公司' }, { row: 0, col: 4, value: 'B-1101-2511-001' }, { row: 0, col: 5, value: '護理師甲' },
        { row: 1, col: 0, value: '2025-11-15' }, { row: 1, col: 1, value: '感染性廢棄物（B-1101，換藥廢料）' }, { row: 1, col: 2, value: '1.8 公斤' }, { row: 1, col: 3, value: '某某廢棄物清除有限公司' }, { row: 1, col: 4, value: 'B-1101-2511-015' }, { row: 1, col: 5, value: '護理師乙' },
        { row: 2, col: 0, value: '2025-12-01' }, { row: 2, col: 1, value: '銳利器材（B-1103，針頭容器已滿）' }, { row: 2, col: 2, value: '1 桶（約 500mL）' }, { row: 2, col: 3, value: '某某廢棄物清除有限公司' }, { row: 2, col: 4, value: 'B-1103-2512-001' }, { row: 2, col: 5, value: '護理師丙' },
      ],
    },
  ],

  /** 3. A3 居家訪視人員安全管理 */
  3: [
    {
      sheetName: '人員安全事件通報記錄表',
      archetype: 'incident-log',
      criteriaIndex: 1,
      columns: [
        { header: '事件日期', width: 100 },
        { header: '當事人員', width: 110 },
        { header: '事件類型', width: 140 },
        { header: '事件描述', width: 240 },
        { header: '緊急處置', width: 180 },
        { header: '通報主管', width: 90 },
        { header: '後續追蹤', width: 160 },
        { header: '改善措施', width: 180 },
      ],
      prefillCells: [
        { row: 0, col: 0, value: '2025-11-05' }, { row: 0, col: 1, value: '護理師甲' }, { row: 0, col: 2, value: '口頭威脅' }, { row: 0, col: 3, value: '前往個案乙家訪視時，遭家屬口頭恐嚇威脅' }, { row: 0, col: 4, value: '立即離開現場，撥打主管電話通報' }, { row: 0, col: 5, value: '護理長' }, { row: 0, col: 6, value: '調整護理師配對，改雙人訪視' }, { row: 0, col: 7, value: '加強訪視前家庭風險評估' },
        { row: 1, col: 0, value: '2025-11-20' }, { row: 1, col: 1, value: '護理師乙' }, { row: 1, col: 2, value: '跌倒/意外受傷' }, { row: 1, col: 3, value: '下樓梯時扭傷腳踝，無骨折' }, { row: 1, col: 4, value: '就醫處理，暫時調整訪視案量' }, { row: 1, col: 5, value: '護理長' }, { row: 1, col: 6, value: '傷勢痊癒後恢復訪視，共七天' }, { row: 1, col: 7, value: '提醒穿著適當防滑鞋、攜帶手電筒' },
        { row: 2, col: 0, value: '2025-12-10' }, { row: 2, col: 1, value: '護理師丙' }, { row: 2, col: 2, value: '交通事故' }, { row: 2, col: 3, value: '機車訪視途中與他車輕微擦撞，護理師丙輕傷' }, { row: 2, col: 4, value: '報警處理，通報主管，安排就醫' }, { row: 2, col: 5, value: '護理長' }, { row: 2, col: 6, value: '辦理理賠，護理師丙休假三天後復工' }, { row: 2, col: 7, value: '宣導改搭大眾交通工具或請家屬接送' },
      ],
    },
  ],

  /** 4. A4 個案緊急或意外事件處理 */
  4: [
    {
      sheetName: '個案緊急事件處理記錄表',
      archetype: 'incident-log',
      criteriaIndex: 1,
      columns: [
        { header: '事件日期', width: 100 },
        { header: '事件時間', width: 100 },
        { header: '個案姓名', width: 110 },
        { header: '事件類型', width: 150 },
        { header: '事件描述', width: 240 },
        { header: '緊急處置措施', width: 200 },
        { header: '家屬通知時間', width: 130 },
        { header: '後續追蹤', width: 160 },
        { header: '通報人員', width: 100 },
      ],
      prefillCells: [
        { row: 0, col: 0, value: '2025-11-03' }, { row: 0, col: 1, value: '10:30' }, { row: 0, col: 2, value: '個案甲' }, { row: 0, col: 3, value: '跌倒' }, { row: 0, col: 4, value: '個案甲如廁時滑倒，左膝擦傷，無骨折' }, { row: 0, col: 5, value: '評估傷勢、處置傷口、通知家屬送醫' }, { row: 0, col: 6, value: '2025-11-03 10:45' }, { row: 0, col: 7, value: '送醫後縫合二針，已返家，追蹤傷口癒合' }, { row: 0, col: 8, value: '護理師甲' },
        { row: 1, col: 0, value: '2025-11-15' }, { row: 1, col: 1, value: '14:20' }, { row: 1, col: 2, value: '個案乙' }, { row: 1, col: 3, value: '心跳異常' }, { row: 1, col: 4, value: '個案乙心跳頻率達 120 bpm，主訴心悸' }, { row: 1, col: 5, value: '立即評估生命徵象、通知家屬、安排救護車送醫' }, { row: 1, col: 6, value: '2025-11-15 14:35' }, { row: 1, col: 7, value: '確診心房顫動，住院治療，出院後重新評估居家護理頻率' }, { row: 1, col: 8, value: '護理師乙' },
        { row: 2, col: 0, value: '2025-12-05' }, { row: 2, col: 1, value: '09:15' }, { row: 2, col: 2, value: '個案丙' }, { row: 2, col: 3, value: '導尿管脫落' }, { row: 2, col: 4, value: '個案丙長期導尿管意外滑脫，無明顯出血' }, { row: 2, col: 5, value: '評估傷勢無異常，依護理規程重新置管' }, { row: 2, col: 6, value: '2025-12-05 09:30' }, { row: 2, col: 7, value: '重置成功，追蹤尿量及尿液外觀正常' }, { row: 2, col: 8, value: '護理師丙' },
      ],
    },
  ],

  /** 5. A5 機構經營指標監測與持續改善 */
  5: [
    {
      sheetName: '品質指標監測分析報告表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      prefillRows: 5,
      columns: [
        { header: '監測期別', width: 110 },
        { header: '品質指標名稱（官方固定 5 項）', width: 220 },
        { header: '計算方式', width: 180 },
        { header: '本期數值', width: 100 },
        { header: '閾值', width: 90 },
        { header: '達標(是/否)', width: 100 },
        { header: '改善計畫', width: 200 },
        { header: '填報人員', width: 100 },
      ],
      // 115年度官方規定之 5 項固定指標名稱（不可自行替換），並補充完整範例資料
      prefillCells: [
        { row: 0, col: 0, value: '114年Q4' }, { row: 0, col: 1, value: '平均個案管理人數' }, { row: 0, col: 2, value: '服務個案總數÷護理師人數' }, { row: 0, col: 3, value: '15.3 人' }, { row: 0, col: 4, value: '≤20 人' }, { row: 0, col: 5, value: '是' }, { row: 0, col: 6, value: '維持現況監測，無需特別改善' }, { row: 0, col: 7, value: '護理師甲' },
        { row: 1, col: 0, value: '114年Q4' }, { row: 1, col: 1, value: '護理人員離職率' }, { row: 1, col: 2, value: '離職人數÷平均在職人數×100%' }, { row: 1, col: 3, value: '0%' }, { row: 1, col: 4, value: '≤15%' }, { row: 1, col: 5, value: '是' }, { row: 1, col: 6, value: '維持良好用人環境，持續監測' }, { row: 1, col: 7, value: '護理師甲' },
        { row: 2, col: 0, value: '114年Q4' }, { row: 2, col: 1, value: '個案非計畫性住院率' }, { row: 2, col: 2, value: '非計畫性住院次數÷服務個案總數×100%' }, { row: 2, col: 3, value: '2.1%' }, { row: 2, col: 4, value: '≤10%' }, { row: 2, col: 5, value: '是' }, { row: 2, col: 6, value: '加強高風險個案病情追蹤與衛教' }, { row: 2, col: 7, value: '護理師乙' },
        { row: 3, col: 0, value: '114年Q4' }, { row: 3, col: 1, value: '個案急診使用率' }, { row: 3, col: 2, value: '急診次數÷服務個案總數×100%' }, { row: 3, col: 3, value: '3.5%' }, { row: 3, col: 4, value: '≤15%' }, { row: 3, col: 5, value: '是' }, { row: 3, col: 6, value: '持續監測，無超閾值' }, { row: 3, col: 7, value: '護理師乙' },
        { row: 4, col: 0, value: '114年Q4' }, { row: 4, col: 1, value: '皮膚損傷發生率' }, { row: 4, col: 2, value: '新發皮膚損傷個案數÷服務個案總數×100%' }, { row: 4, col: 3, value: '0.8%' }, { row: 4, col: 4, value: '≤3%' }, { row: 4, col: 5, value: '是' }, { row: 4, col: 6, value: '加強翻身訓練及皮膚保護衛教' }, { row: 4, col: 7, value: '護理師丙' },
      ],
    },
  ],

  /** 7. B2 個案照護管理 */
  7: [
    {
      sheetName: '個案全人評估表',
      archetype: 'case-assessment',
      criteriaIndex: 1,
      prefillRows: 3,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '評估日期', width: 100 },
        { header: '生理狀況', width: 160 },
        { header: '心理狀況', width: 150 },
        { header: '社會支持', width: 150 },
        { header: '功能狀況', width: 150 },
        { header: '評估結論', width: 180 },
        { header: '評估人員', width: 100 },
      ],
      prefillCells: [
        { row: 0, col: 0, value: '個案甲' }, { row: 0, col: 1, value: '2025-11-01' }, { row: 0, col: 2, value: '慢性心衰竭穩定期，有輕微呼吸困難' }, { row: 0, col: 3, value: '情緒穩定，配合照護意願佳' }, { row: 0, col: 4, value: '有配偶、子女定期探視，支持良好' }, { row: 0, col: 5, value: '能自行行走但需助行器輔助' }, { row: 0, col: 6, value: '整體穩定，維持原訂照護計畫，每週訪視一次' }, { row: 0, col: 7, value: '護理師甲' },
        { row: 1, col: 0, value: '個案乙' }, { row: 1, col: 1, value: '2025-11-10' }, { row: 1, col: 2, value: '糖尿病合併腎病變，血糖控制欠佳' }, { row: 1, col: 3, value: '有焦慮傾向，對疾病進展感到擔憂' }, { row: 1, col: 4, value: '獨居，社工已介入協助，鄰居偶爾關懷' }, { row: 1, col: 5, value: '需輪椅輔助移動，雙手精細動作尚可' }, { row: 1, col: 6, value: '建議加強飲食衛教及血糖自我監測頻率，轉介營養師' }, { row: 1, col: 7, value: '護理師乙' },
        { row: 2, col: 0, value: '個案丙' }, { row: 2, col: 1, value: '2025-11-20' }, { row: 2, col: 2, value: '術後傷口癒合中，每週換藥兩次' }, { row: 2, col: 3, value: '配合度佳，情緒良好，對康復有信心' }, { row: 2, col: 4, value: '家屬積極參與照護，同住照顧' }, { row: 2, col: 5, value: '半臥床，翻身需協助，上肢功能正常' }, { row: 2, col: 6, value: '傷口癒合進展良好，預計再三週可停止居家護理' }, { row: 2, col: 7, value: '護理師丙' },
      ],
    },
    {
      sheetName: '個別化照護計畫書',
      archetype: 'care-plan',
      criteriaIndex: 2,
      prefillRows: 4,
      columns: [
        { header: '個案姓名', width: 110 },
        { header: '計畫日期', width: 100 },
        { header: '照護問題', width: 180 },
        { header: '照護目標', width: 180 },
        { header: '照護措施', width: 200 },
        { header: '負責人員', width: 100 },
        { header: '評值日期', width: 100 },
        { header: '評值結果', width: 160 },
      ],
      prefillCells: [
        { row: 0, col: 0, value: '個案甲' }, { row: 0, col: 1, value: '2025-11-01' }, { row: 0, col: 2, value: '心衰竭造成活動耐受力下降' }, { row: 0, col: 3, value: '維持日常活動功能，每日步行>10分鐘無喘' }, { row: 0, col: 4, value: '每週訪視一次，教導家屬輔助活動方式，監測水腫及喘況' }, { row: 0, col: 5, value: '護理師甲' }, { row: 0, col: 6, value: '2025-11-30' }, { row: 0, col: 7, value: '目標達成，持續維持' },
        { row: 1, col: 0, value: '個案乙' }, { row: 1, col: 1, value: '2025-11-10' }, { row: 1, col: 2, value: '血糖控制不穩定' }, { row: 1, col: 3, value: '飯前血糖維持在 80–130 mg/dL' }, { row: 1, col: 4, value: '每週訪視兩次，血糖監測、飲食衛教、胰島素注射技術指導' }, { row: 1, col: 5, value: '護理師乙' }, { row: 1, col: 6, value: '2025-12-10' }, { row: 1, col: 7, value: '血糖有改善，持續追蹤' },
        { row: 2, col: 0, value: '個案丙' }, { row: 2, col: 1, value: '2025-11-20' }, { row: 2, col: 2, value: '術後傷口感染風險' }, { row: 2, col: 3, value: '傷口癒合良好，無感染徵象' }, { row: 2, col: 4, value: '每週換藥兩次，傷口照片記錄，衛教防感染措施' }, { row: 2, col: 5, value: '護理師丙' }, { row: 2, col: 6, value: '2025-12-20' }, { row: 2, col: 7, value: '傷口癒合良好，可結案' },
      ],
    },
  ],
};
