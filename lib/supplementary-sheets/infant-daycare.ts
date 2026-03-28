/**
 * 托嬰中心評鑑補充文件定義
 * 臺北市114-116年度托嬰中心評鑑指標（60項）
 */
import type { SupplementaryDefsMap } from '../supplementary-sheet-types';

export const infantDaycareDefs: SupplementaryDefsMap = {

  /** 1. 行政管理配合事項 */
  1: [
    {
      sheetName: '工作人員定期體檢記錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '姓名', width: 110 },
        { header: '職稱', width: 110 },
        { header: '體檢日期', width: 110 },
        { header: '體檢項目', width: 160 },
        { header: '結果正常', width: 100 },
        { header: '異常說明', width: 160 },
        { header: '下次體檢期限', width: 130 },
      ],
    },
    {
      sheetName: '保險投保查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 2,
      prefillRows: 5,
      columns: [
        { header: '保險類別', width: 160 },
        { header: '投保公司', width: 150 },
        { header: '保單號碼', width: 150 },
        { header: '生效日期', width: 110 },
        { header: '到期日期', width: 110 },
        { header: '保額', width: 120 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 2. 員工在職訓練 */
  2: [
    {
      sheetName: '在職訓練時數記錄表',
      archetype: 'training-record',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '人員姓名', width: 110 },
        { header: '職稱', width: 110 },
        { header: '訓練日期', width: 110 },
        { header: '訓練主題', width: 200 },
        { header: '訓練機構/講師', width: 160 },
        { header: '訓練時數', width: 100 },
        { header: '累計時數', width: 100 },
        { header: '證明文件', width: 130 },
      ],
    },
  ],

  /** 3. 嬰幼兒資料與接送管理 */
  3: [
    {
      sheetName: '嬰幼兒基本資料表',
      archetype: 'case-assessment',
      criteriaIndex: 0,
      prefillRows: 5,
      columns: [
        { header: '嬰幼兒姓名', width: 110 },
        { header: '出生日期', width: 110 },
        { header: '家長/監護人', width: 130 },
        { header: '緊急聯絡電話', width: 130 },
        { header: '就診醫院', width: 130 },
        { header: '疾病史/過敏', width: 160 },
        { header: '接送授權人', width: 130 },
        { header: '備註', width: 130 },
      ],
    },
    {
      sheetName: '出缺席追蹤記錄表',
      archetype: 'daily-record',
      criteriaIndex: 3,
      prefillRows: 8,
      columns: [
        { header: '日期', width: 100 },
        { header: '嬰幼兒姓名', width: 110 },
        { header: '缺席原因', width: 160 },
        { header: '聯繫方式', width: 120 },
        { header: '聯繫結果', width: 160 },
        { header: '聯繫人員', width: 110 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 5. 員工薪資、保險與退休 */
  5: [
    {
      sheetName: '員工薪資保險提撥記錄表',
      archetype: 'inventory-list',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '姓名', width: 110 },
        { header: '職稱', width: 110 },
        { header: '到職日期', width: 110 },
        { header: '投保薪資', width: 110 },
        { header: '勞保加保', width: 100 },
        { header: '健保加保', width: 100 },
        { header: '勞退提撥', width: 100 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 7. 召開會議 */
  7: [
    {
      sheetName: '會議記錄表',
      archetype: 'meeting-minutes',
      criteriaIndex: 0,
      prefillRows: 6,
      columns: [
        { header: '會議日期', width: 110 },
        { header: '開會時間', width: 110 },
        { header: '會議地點', width: 130 },
        { header: '出席人員', width: 180 },
        { header: '討論事項', width: 250 },
        { header: '決議事項', width: 250 },
        { header: '下次追蹤日期', width: 130 },
        { header: '主持人', width: 100 },
      ],
    },
  ],

  /** 8. 財務與總務管理 */
  8: [
    {
      sheetName: '財產清冊',
      archetype: 'inventory-list',
      criteriaIndex: 1,
      prefillRows: 10,
      columns: [
        { header: '品名', width: 160 },
        { header: '規格/型號', width: 150 },
        { header: '數量', width: 80 },
        { header: '購置日期', width: 110 },
        { header: '金額', width: 100 },
        { header: '保管人', width: 100 },
        { header: '存放位置', width: 130 },
        { header: '狀況', width: 100 },
      ],
    },
    {
      sheetName: '環境安全檢核記錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 3,
      prefillRows: 6,
      columns: [
        { header: '檢核日期', width: 110 },
        { header: '檢核區域', width: 130 },
        { header: '檢核項目', width: 250 },
        { header: '符合', width: 70 },
        { header: '不符合', width: 80 },
        { header: '維修需求', width: 160 },
        { header: '改善期限', width: 110 },
        { header: '檢核人員', width: 100 },
      ],
    },
  ],

  /** 9. 事故傷害預防的行政措施 */
  9: [
    {
      sheetName: '事故傷害處理記錄表',
      archetype: 'incident-log',
      criteriaIndex: 3,
      prefillRows: 5,
      columns: [
        { header: '事件日期', width: 110 },
        { header: '事件時間', width: 100 },
        { header: '當事嬰幼兒', width: 120 },
        { header: '事故類型', width: 150 },
        { header: '事故描述', width: 250 },
        { header: '立即處置', width: 200 },
        { header: '家長通知時間', width: 130 },
        { header: '後續追蹤', width: 160 },
        { header: '處理人員', width: 100 },
      ],
    },
  ],

  /** 10. 災害處理 */
  10: [
    {
      sheetName: '逃生避難演練記錄表',
      archetype: 'training-record',
      criteriaIndex: 3,
      prefillRows: 3,
      columns: [
        { header: '演練日期', width: 110 },
        { header: '演練類型', width: 130 },
        { header: '參與人數', width: 90 },
        { header: '疏散完成時間', width: 130 },
        { header: '嬰幼兒疏散執行', width: 150 },
        { header: '缺失事項', width: 180 },
        { header: '改善措施', width: 180 },
        { header: '負責人員', width: 100 },
      ],
    },
  ],

  /** 11. 兒童福利服務 */
  11: [
    {
      sheetName: '兒童保護通報記錄表',
      archetype: 'incident-log',
      criteriaIndex: 4,
      prefillRows: 4,
      columns: [
        { header: '通報日期', width: 110 },
        { header: '個案姓名', width: 110 },
        { header: '通報原因', width: 200 },
        { header: '通報單位', width: 130 },
        { header: '通報人員', width: 110 },
        { header: '後續追蹤', width: 180 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 25. 餵食用餐 */
  25: [
    {
      sheetName: '嬰幼兒餵食記錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '日期', width: 100 },
        { header: '嬰幼兒姓名', width: 110 },
        { header: '餵食時間', width: 110 },
        { header: '食物種類/份量', width: 160 },
        { header: '餵食方式', width: 120 },
        { header: '進食情形', width: 160 },
        { header: '備註', width: 130 },
        { header: '托育人員', width: 100 },
      ],
    },
  ],

  /** 33. 觀察評量與輔導追蹤 */
  33: [
    {
      sheetName: '嬰幼兒發展評量記錄表',
      archetype: 'case-assessment',
      criteriaIndex: 2,
      prefillRows: 5,
      columns: [
        { header: '嬰幼兒姓名', width: 120 },
        { header: '評量日期', width: 110 },
        { header: '月齡', width: 70 },
        { header: '身體動作', width: 130 },
        { header: '語言溝通', width: 130 },
        { header: '社會情緒', width: 130 },
        { header: '感官認知', width: 130 },
        { header: '輔導需求', width: 150 },
        { header: '評量人員', width: 100 },
      ],
    },
    {
      sheetName: '個案輔導追蹤記錄表',
      archetype: 'care-plan',
      criteriaIndex: 3,
      prefillRows: 4,
      columns: [
        { header: '嬰幼兒姓名', width: 120 },
        { header: '追蹤日期', width: 110 },
        { header: '輔導目標', width: 180 },
        { header: '執行措施', width: 200 },
        { header: '家長配合事項', width: 180 },
        { header: '追蹤成效', width: 160 },
        { header: '負責人員', width: 100 },
      ],
    },
  ],

  /** 37. 體位測量 */
  37: [
    {
      sheetName: '嬰幼兒體位測量記錄表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '嬰幼兒姓名', width: 120 },
        { header: '測量日期', width: 110 },
        { header: '月齡', width: 70 },
        { header: '身高(cm)', width: 100 },
        { header: '體重(kg)', width: 100 },
        { header: '頭圍(cm)', width: 100 },
        { header: '生長曲線百分位', width: 140 },
        { header: '備註', width: 130 },
        { header: '測量人員', width: 100 },
      ],
    },
  ],

  /** 38. 發展篩檢 */
  38: [
    {
      sheetName: '發展篩檢執行記錄表',
      archetype: 'case-assessment',
      criteriaIndex: 0,
      prefillRows: 6,
      columns: [
        { header: '嬰幼兒姓名', width: 120 },
        { header: '篩檢日期', width: 110 },
        { header: '月齡', width: 70 },
        { header: '篩檢工具', width: 150 },
        { header: '篩檢結果', width: 130 },
        { header: '通報情形', width: 160 },
        { header: '追蹤輔導', width: 160 },
        { header: '篩檢人員', width: 100 },
      ],
    },
  ],

  /** 39. 健康管理 */
  39: [
    {
      sheetName: '嬰幼兒健康紀錄表',
      archetype: 'case-assessment',
      criteriaIndex: 0,
      prefillRows: 5,
      columns: [
        { header: '嬰幼兒姓名', width: 120 },
        { header: '記錄日期', width: 110 },
        { header: '健康狀況', width: 180 },
        { header: '藥物/食物過敏', width: 160 },
        { header: '預防接種記錄', width: 160 },
        { header: '異常處理', width: 180 },
        { header: '家長通知', width: 110 },
        { header: '記錄人員', width: 100 },
      ],
    },
  ],

  /** 40. 餐點設計 */
  40: [
    {
      sheetName: '月份餐點設計表',
      archetype: 'daily-record',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '日期', width: 100 },
        { header: '早點', width: 160 },
        { header: '午餐', width: 200 },
        { header: '午點', width: 160 },
        { header: '副食品設計', width: 180 },
        { header: '食材說明', width: 180 },
        { header: '公告方式', width: 130 },
      ],
    },
  ],

  /** 41. 食品選購及存放 */
  41: [
    {
      sheetName: '食品採購及效期查核表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 8,
      columns: [
        { header: '查核日期', width: 110 },
        { header: '品項', width: 160 },
        { header: '製造日期', width: 110 },
        { header: '有效日期', width: 110 },
        { header: '儲存方式', width: 130 },
        { header: '符合規定', width: 100 },
        { header: '異常說明', width: 160 },
        { header: '查核人員', width: 100 },
      ],
    },
  ],

  /** 43. 飲水供應的品質 */
  43: [
    {
      sheetName: '飲水設備清潔記錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 4,
      prefillRows: 6,
      columns: [
        { header: '清潔日期', width: 110 },
        { header: '設備名稱', width: 150 },
        { header: '清潔項目', width: 200 },
        { header: '水質檢測結果', width: 140 },
        { header: '符合標準', width: 100 },
        { header: '清潔人員', width: 100 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 44. 食物樣品保存 */
  44: [
    {
      sheetName: '食物樣品留存記錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 0,
      prefillRows: 6,
      columns: [
        { header: '留樣日期', width: 110 },
        { header: '餐別', width: 100 },
        { header: '食物品項', width: 160 },
        { header: '留樣重量(g)', width: 120 },
        { header: '密封方式', width: 130 },
        { header: '冷藏溫度(°C)', width: 130 },
        { header: '銷毀日期', width: 110 },
        { header: '留樣人員', width: 100 },
      ],
    },
  ],

  /** 46. 冰箱清潔 */
  46: [
    {
      sheetName: '冰箱溫度監測記錄表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      columns: [
        { header: '記錄日期', width: 110 },
        { header: '冰箱編號', width: 100 },
        { header: '冷藏溫度(°C)', width: 130 },
        { header: '冷凍溫度(°C)', width: 130 },
        { header: '是否達標', width: 100 },
        { header: '異常處置', width: 160 },
        { header: '記錄人員', width: 100 },
      ],
    },
  ],

  /** 48. 寢具 */
  48: [
    {
      sheetName: '寢具清洗記錄表',
      archetype: 'daily-record',
      criteriaIndex: 1,
      prefillRows: 6,
      columns: [
        { header: '清洗日期', width: 110 },
        { header: '嬰幼兒姓名', width: 120 },
        { header: '寢具品項', width: 150 },
        { header: '清洗方式', width: 130 },
        { header: '消毒方式', width: 130 },
        { header: '晾曬乾燥', width: 100 },
        { header: '執行人員', width: 100 },
      ],
    },
  ],

  /** 50. 環境衛生 */
  50: [
    {
      sheetName: '環境清潔消毒記錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 2,
      columns: [
        { header: '日期', width: 100 },
        { header: '清潔區域', width: 150 },
        { header: '清潔項目', width: 220 },
        { header: '消毒方式', width: 150 },
        { header: '完成確認', width: 100 },
        { header: '執行人員', width: 100 },
        { header: '備註', width: 130 },
      ],
    },
  ],

  /** 57. 遊戲場地與設備安全 */
  57: [
    {
      sheetName: '遊戲設備月檢記錄表',
      archetype: 'inspection-checklist',
      criteriaIndex: 4,
      prefillRows: 6,
      columns: [
        { header: '檢核日期', width: 110 },
        { header: '設備名稱', width: 160 },
        { header: '設備位置', width: 140 },
        { header: '外觀完整', width: 100 },
        { header: '固定穩固', width: 100 },
        { header: '材質安全', width: 100 },
        { header: '異常說明', width: 180 },
        { header: '維修完成日', width: 120 },
        { header: '檢核人員', width: 100 },
      ],
    },
  ],

  /** 59. 藥品管理 */
  59: [
    {
      sheetName: '嬰幼兒給藥記錄表',
      archetype: 'daily-record',
      criteriaIndex: 4,
      prefillRows: 6,
      columns: [
        { header: '日期', width: 100 },
        { header: '嬰幼兒姓名', width: 120 },
        { header: '藥品名稱', width: 160 },
        { header: '劑量', width: 90 },
        { header: '給藥時間', width: 110 },
        { header: '給藥途徑', width: 110 },
        { header: '委託藥單確認', width: 130 },
        { header: '給藥人員', width: 100 },
        { header: '家長簽名', width: 100 },
      ],
    },
  ],

  /** 60. 感染管控 */
  60: [
    {
      sheetName: '傳染病通報記錄表',
      archetype: 'incident-log',
      criteriaIndex: 1,
      prefillRows: 5,
      columns: [
        { header: '通報日期', width: 110 },
        { header: '個案姓名', width: 120 },
        { header: '疾病類型', width: 150 },
        { header: '症狀描述', width: 200 },
        { header: '隔離措施', width: 160 },
        { header: '通報單位', width: 130 },
        { header: '通報時間', width: 110 },
        { header: '後續追蹤', width: 160 },
        { header: '通報人員', width: 100 },
      ],
    },
  ],
};
