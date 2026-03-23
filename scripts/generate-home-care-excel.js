// 居家服務機構評鑑自評範本 Excel 生成腳本
// 執行方式：node scripts/generate-home-care-excel.js
// 產出：~/Desktop/居家服務機構評鑑自評範本.xlsx

const ExcelJS = require("exceljs");
const path = require("path");
const os = require("os");

// ── 資料（內嵌自 lib/ai/evaluation-profiles/home-care.ts）──────────────────
const homeCareProfile = {
  id: "home-care",
  label: "居家服務機構",
  description: "115年度臺北市政府社會局居家服務機構評鑑基準",
  sections: [
    {
      name: "壹、個案權益保障",
      shortCode: "權",
      items: [
        {
          id: 1,
          title: "服務資訊公開",
          responsible: "行政/社工",
          criteria: [
            "製作機構簡介或文宣，且內容完整（含服務項目、收費標準、服務時間、服務區域）",
            "隨時更新簡介或文宣與相關服務訊息",
            "設有機構公開的網路平台介紹居家服務內容",
            "設有其他宣傳方式（如社區公告欄、媒體報導、合作單位轉介資訊）",
          ],
          reviewMethod: "文件檢閱、現場訪談",
        },
        {
          id: 2,
          title: "個案基本權益維護",
          responsible: "社工/照服員",
          criteria: [
            "訂有個案權益保障相關規定或聲明書",
            "入案時向個案及家屬說明權益保障內容並簽署",
            "工作人員熟知並落實個案權益保障規定",
            "無歧視、虐待、剝削個案之情事",
          ],
          reviewMethod: "文件檢閱、現場訪談、個案訪視",
        },
        {
          id: 3,
          title: "個案隱私保護",
          responsible: "全體人員",
          criteria: [
            "訂有個案隱私保護相關規定",
            "個案資料妥善保存，非相關人員不得任意調閱",
            "服務人員入戶服務時遵守個案隱私保護規定",
            "照片、影音等資料蒐集使用符合個人資料保護法規定",
          ],
          reviewMethod: "文件檢閱、現場訪視",
        },
        {
          id: 4,
          title: "申訴機制",
          responsible: "行政/社工",
          criteria: [
            "訂有個案申訴處理程序",
            "設有申訴管道（如申訴信箱、電話、書面），且個案及家屬知悉",
            "申訴案件有書面記錄及追蹤處理",
            "申訴處理結果回覆申訴人",
          ],
          reviewMethod: "文件檢閱、訪談",
        },
      ],
    },
    {
      name: "貳、專業照護品質",
      shortCode: "專",
      items: [
        {
          id: 5,
          title: "入案評估",
          responsible: "社工/照服員",
          criteria: [
            "入案前完成居家需求評估，含身體功能、日常生活能力、居家環境等面向",
            "評估工具標準化（如 ADL、IADL 等）",
            "評估結果有書面記錄且由專業人員簽名",
            "定期（至少每年）重新評估並更新紀錄",
          ],
          reviewMethod: "文件檢閱、個案紀錄查閱",
        },
        {
          id: 6,
          title: "個別服務計畫",
          responsible: "社工",
          criteria: [
            "依評估結果為每位個案擬定個別服務計畫",
            "計畫包含服務目標、服務項目、頻率、負責人員",
            "計畫已告知個案及家屬並獲同意簽署",
            "計畫定期（至少每半年）檢視更新",
          ],
          reviewMethod: "文件檢閱、訪談",
        },
        {
          id: 7,
          title: "服務計畫執行與評值",
          responsible: "照服員/社工",
          criteria: [
            "服務計畫按時執行並有服務紀錄",
            "定期（至少每半年）評值計畫執行成效",
            "依評值結果調整服務計畫",
            "計畫變更有書面記錄並通知個案及家屬",
          ],
          reviewMethod: "文件檢閱、個案紀錄查閱",
        },
        {
          id: 8,
          title: "身體照顧服務",
          responsible: "照服員",
          criteria: [
            "提供協助盥洗、如廁、穿脫衣物等個人衛生照顧，符合個案需求",
            "依個案需求提供移位、翻身、步行協助等身體照護",
            "服務過程確保個案安全，預防跌倒及意外",
            "照服員以尊重、有耐心方式提供入戶照顧",
          ],
          reviewMethod: "文件檢閱、個案訪視、訪談",
        },
        {
          id: 9,
          title: "日常生活協助",
          responsible: "照服員",
          criteria: [
            "依個案服務計畫提供家務協助（備餐、洗衣、環境清潔等）",
            "服務內容與個案需求及計畫相符",
            "服務紀錄完整記載服務項目、時間、執行情形",
            "家務協助不超越服務範疇規定",
          ],
          reviewMethod: "文件檢閱、個案紀錄查閱",
        },
        {
          id: 10,
          title: "緊急事件處理",
          responsible: "全體人員",
          criteria: [
            "訂有居家服務緊急事件（跌倒、急症、個案失蹤等）處理標準作業程序",
            "緊急事件有書面通報、處理及追蹤記錄",
            "照服員熟知入戶服務時緊急事件處理流程及聯絡窗口",
            "定期辦理緊急事件教育訓練並有記錄",
          ],
          reviewMethod: "文件檢閱、訪談",
        },
        {
          id: 11,
          title: "家屬溝通與參與",
          responsible: "社工",
          criteria: [
            "定期（至少每半年）與個案或主要照顧者進行服務溝通",
            "有書面溝通記錄（電話、面談紀錄）",
            "家屬有機會參與服務計畫討論及調整",
            "家屬反映意見有書面處理記錄",
          ],
          reviewMethod: "文件檢閱、訪談",
        },
        {
          id: 12,
          title: "督導與訪視",
          responsible: "社工/督導",
          criteria: [
            "訂有居家服務督導制度及訪視頻率規定",
            "定期辦理電訪、入戶訪視並有書面記錄",
            "督導發現問題有追蹤改善記錄",
            "照服員能定期與督導反映服務執行狀況",
          ],
          reviewMethod: "文件檢閱、訪談",
        },
        {
          id: 13,
          title: "服務紀錄",
          responsible: "全體人員",
          criteria: [
            "服務紀錄格式統一且完整（含服務日期、時間、項目、執行情形）",
            "服務紀錄即時填寫，照服員親自填寫並簽名",
            "電子或書面紀錄保存符合規定年限",
            "異常服務狀況有特別記載及通報",
          ],
          reviewMethod: "文件檢閱、抽查個案紀錄",
        },
        {
          id: 14,
          title: "結案與轉介",
          responsible: "社工",
          criteria: [
            "訂有結案標準及程序",
            "結案時完成結案摘要並告知個案及家屬",
            "轉介其他服務（如機構式服務、醫療）時有書面轉介資料",
            "轉介後有追蹤確認個案後續安置情形",
          ],
          reviewMethod: "文件檢閱",
        },
      ],
    },
    {
      name: "參、經營管理效能",
      shortCode: "管",
      items: [
        {
          id: 15,
          title: "機構行政管理",
          responsible: "主管",
          criteria: [
            "訂有機構組織章程及各項行政管理規定",
            "各項行政作業有標準作業程序",
            "行政文件分類管理，查閱方便",
            "定期召開行政會議並有記錄",
          ],
          reviewMethod: "文件檢閱",
        },
        {
          id: 16,
          title: "人員配置",
          responsible: "主管",
          criteria: [
            "依法令規定配置照服員及督導人員",
            "排班合理，服務時段符合個案需求",
            "照服員與個案比例符合規定",
            "人員缺額有即時補充機制",
          ],
          reviewMethod: "文件檢閱、現場訪視",
        },
        {
          id: 17,
          title: "人員資格",
          responsible: "主管/行政",
          criteria: [
            "照服員具備法令規定之訓練資格（照顧服務員訓練結業證明）",
            "資格證書影本建檔保存",
            "督導人員具備相關專業資格",
            "新進人員資格審核有書面記錄",
          ],
          reviewMethod: "文件檢閱",
        },
        {
          id: 18,
          title: "人員訓練",
          responsible: "主管/社工",
          criteria: [
            "訂有年度教育訓練計畫",
            "新進照服員有職前訓練並有記錄（含服務規範、安全守則、緊急處置）",
            "全體人員每年至少完成規定時數之在職訓練",
            "訓練內容符合居家服務實際照護需求",
          ],
          reviewMethod: "文件檢閱、訓練記錄查閱",
        },
        {
          id: 19,
          title: "人員健康管理",
          responsible: "主管/行政",
          criteria: [
            "新進人員入職前完成健康檢查並有記錄",
            "定期（至少每年）辦理在職人員健康檢查",
            "患有傳染病之人員依規定停止入戶服務",
            "人員健康管理資料妥善保存",
          ],
          reviewMethod: "文件檢閱",
        },
        {
          id: 20,
          title: "人員績效管理",
          responsible: "主管",
          criteria: [
            "訂有人員考核制度及評核標準",
            "定期（至少每年）辦理人員考核",
            "考核結果有書面記錄並告知人員",
            "依考核結果提供適當獎懲或改善輔導",
          ],
          reviewMethod: "文件檢閱",
        },
        {
          id: 21,
          title: "財務管理",
          responsible: "主管/會計",
          criteria: [
            "財務收支有完整帳冊記錄",
            "收支憑證妥善保存",
            "定期辦理財務報表並公開（適用時）",
            "財務管理符合相關法規規定",
          ],
          reviewMethod: "文件檢閱",
        },
        {
          id: 22,
          title: "收退費管理",
          responsible: "行政",
          criteria: [
            "收費標準公開且符合政府規定",
            "開立收費收據給付費者",
            "訂有退費規定並告知個案及家屬",
            "收退費爭議有書面處理記錄",
          ],
          reviewMethod: "文件檢閱、訪談",
        },
        {
          id: 23,
          title: "專任服務人員年度留任率",
          responsible: "主管",
          criteria: [
            "統計年度專任照服員留任率並有書面記錄",
            "留任率達機構訂定目標值",
            "針對離職原因進行分析並訂定改善措施",
            "改善措施執行後有追蹤成效記錄",
          ],
          reviewMethod: "文件檢閱",
        },
        {
          id: 24,
          title: "23-1 兼任服務人員年度留任率",
          responsible: "主管",
          criteria: [
            "統計年度兼任照服員留任率並有書面記錄",
            "留任率達機構訂定目標值",
            "針對兼任人員離職原因進行分析並訂定改善措施",
            "改善措施執行後有追蹤成效記錄",
          ],
          reviewMethod: "文件檢閱",
        },
        {
          id: 25,
          title: "資訊管理",
          responsible: "行政",
          criteria: [
            "個案資訊系統完整且資料即時更新",
            "資訊系統有權限管控，防止未授權存取",
            "資料定期備份",
            "配合政府資訊申報要求即時申報",
          ],
          reviewMethod: "文件檢閱、系統查核",
        },
        {
          id: 26,
          title: "感染管制",
          responsible: "全體人員",
          criteria: [
            "訂有感染管制計畫及入戶服務標準作業程序",
            "照服員入戶服務落實手部衛生及個人防護",
            "感染事件有通報及處理記錄",
            "定期辦理感染管制教育訓練",
          ],
          reviewMethod: "文件檢閱、現場查核",
        },
        {
          id: 27,
          title: "服務品質改善",
          responsible: "主管/社工",
          criteria: [
            "定期進行服務品質自我評核",
            "依評核結果訂定改善計畫並執行",
            "品質改善成效有追蹤記錄",
            "服務品質問題有根本原因分析",
          ],
          reviewMethod: "文件檢閱、訪談",
        },
        {
          id: 28,
          title: "服務使用者滿意度調查",
          responsible: "社工",
          criteria: [
            "每年至少辦理一次個案及家屬滿意度調查",
            "調查工具有效且兼顧匿名性",
            "調查結果有書面分析報告",
            "依調查結果訂定改善措施並追蹤",
          ],
          reviewMethod: "文件檢閱",
        },
        {
          id: 29,
          title: "品質監測機制",
          responsible: "主管/社工",
          criteria: [
            "設有品質指標監測系統（如服務準時率、個案滿意度、申訴率）",
            "定期彙整品質指標數據並分析",
            "品質問題有改善行動計畫",
            "品質監測結果向上級或委員會報告",
          ],
          reviewMethod: "文件檢閱",
        },
        {
          id: 30,
          title: "機構自評",
          responsible: "主管",
          criteria: [
            "定期辦理機構自我評鑑",
            "自評結果有書面報告",
            "自評發現問題有改善計畫",
            "自評結果知會董事會或主管機關（適用時）",
          ],
          reviewMethod: "文件檢閱",
        },
      ],
    },
    {
      name: "加分題",
      shortCode: "加",
      items: [
        {
          id: 31,
          title: "創新服務或社區資源連結",
          responsible: "主管/社工",
          criteria: [
            "推動創新服務模式或建立社區資源連結網絡",
            "有具體成果記錄（如合作方案、聯結資源清單、服務成效）",
            "創新服務或資源連結惠及個案及家屬",
            "有推廣分享或複製擴散之機制",
          ],
          reviewMethod: "文件檢閱、訪談",
        },
        {
          id: 32,
          title: "照顧者支持服務",
          responsible: "社工",
          criteria: [
            "提供家庭照顧者喘息、諮詢或教育支持服務",
            "辦理照顧者支持課程或團體並有記錄",
            "照顧者支持服務有成效追蹤",
            "有與其他單位合作提供照顧者支持之機制",
          ],
          reviewMethod: "文件檢閱、訪談",
        },
      ],
    },
  ],
};

// ── 色系（每個 section 不同）─────────────────────────────────────────────
const SECTION_COLORS = {
  "壹、個案權益保障": { header: "FF4472C4", light: "FFDCE6F1" }, // 藍
  "貳、專業照護品質": { header: "FF70AD47", light: "FFE2EFDA" }, // 綠
  "參、經營管理效能": { header: "FFED7D31", light: "FFFCE4D6" }, // 橘
  加分題: { header: "FFFFC000", light: "FFFFF2CC" },              // 金
};

// 總覽工作表的標題色
const OVERVIEW_HEADER_COLOR = "FF595959";

// ── 輔助：套用標題列樣式 ─────────────────────────────────────────────────
function styleHeaderRow(row, bgColor, fontColor = "FFFFFFFF") {
  row.eachCell((cell) => {
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: bgColor } };
    cell.font = { bold: true, color: { argb: fontColor }, size: 11 };
    cell.alignment = { vertical: "middle", horizontal: "center", wrapText: true };
    cell.border = {
      top: { style: "thin" }, bottom: { style: "thin" },
      left: { style: "thin" }, right: { style: "thin" },
    };
  });
  row.height = 22;
}

// ── 輔助：套用一般資料格樣式 ─────────────────────────────────────────────
function styleDataCell(cell, opts = {}) {
  cell.border = {
    top: { style: "thin" }, bottom: { style: "thin" },
    left: { style: "thin" }, right: { style: "thin" },
  };
  cell.alignment = {
    vertical: "top",
    horizontal: opts.center ? "center" : "left",
    wrapText: true,
  };
  if (opts.fill) {
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: opts.fill } };
  }
}

// ── 建立總覽工作表 ────────────────────────────────────────────────────────
function buildOverviewSheet(wb) {
  const ws = wb.addWorksheet("總覽");

  // 欄寬必須在 mergeCells / addRow 之前設定，否則 ExcelJS 可能只套用部分欄
  ws.columns = [
    { width: 8 },   // A 項次
    { width: 10 },  // B 評鑑代碼
    { width: 22 },  // C 評鑑項目名稱
    { width: 14 },  // D 負責人員
    { width: 10 },  // E 評鑑基準數
    { width: 20 },  // F 審查方式
    { width: 18 },  // G 所屬章節
    { width: 20 },  // H 備註
  ];

  // 標題
  ws.mergeCells("A1:H1");
  const titleCell = ws.getCell("A1");
  titleCell.value = homeCareProfile.description + "　評鑑自評範本";
  titleCell.font = { bold: true, size: 14, color: { argb: "FF1F3864" } };
  titleCell.alignment = { vertical: "middle", horizontal: "center" };
  titleCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFD6E4F0" } };
  ws.getRow(1).height = 30;

  // 欄標題
  const headers = ["項次", "評鑑代碼", "評鑑項目名稱", "負責人員", "評鑑基準數", "審查方式", "所屬章節", "備註"];
  const headerRow = ws.addRow(headers);
  styleHeaderRow(headerRow, OVERVIEW_HEADER_COLOR);

  let seq = 1;
  for (const section of homeCareProfile.sections) {
    const colors = SECTION_COLORS[section.name] || { header: "FF808080", light: "FFF2F2F2" };
    for (const item of section.items) {
      const code = `${section.shortCode}${item.id}`;
      const row = ws.addRow([
        seq++,
        code,
        item.title,
        item.responsible,
        item.criteria.length,
        item.reviewMethod,
        section.name,
        "",
      ]);
      row.eachCell((cell) => {
        styleDataCell(cell, { fill: colors.light });
      });
      row.getCell(1).alignment = { vertical: "middle", horizontal: "center", wrapText: true };
      row.getCell(2).alignment = { vertical: "middle", horizontal: "center", wrapText: true };
      row.getCell(5).alignment = { vertical: "middle", horizontal: "center", wrapText: true };
      row.height = 18;
    }
  }

  ws.views = [{ state: "frozen", ySplit: 2 }];
}

// ── 建立各 Section 工作表 ─────────────────────────────────────────────────
function buildSectionSheet(wb, section) {
  const ws = wb.addWorksheet(section.name);
  const colors = SECTION_COLORS[section.name] || { header: "FF808080", light: "FFF2F2F2" };

  // 欄寬必須在 mergeCells / addRow 之前設定，否則 ExcelJS 可能只套用部分欄
  ws.columns = [
    { width: 8 },   // A 項次
    { width: 22 },  // B 評鑑項目名稱
    { width: 14 },  // C 負責人員
    { width: 42 },  // D 評鑑基準
    { width: 20 },  // E 審查方式
    { width: 14 },  // F 自評結果
    { width: 28 },  // G 佐證資料說明
    { width: 28 },  // H 改善計畫
  ];

  // 標題列
  ws.mergeCells("A1:H1");
  const titleCell = ws.getCell("A1");
  titleCell.value = `${homeCareProfile.description}　${section.name}`;
  titleCell.font = { bold: true, size: 13, color: { argb: "FFFFFFFF" } };
  titleCell.alignment = { vertical: "middle", horizontal: "center" };
  titleCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: colors.header } };
  ws.getRow(1).height = 28;

  // 欄標題
  const colHeaders = [
    "項次", "評鑑項目名稱", "負責人員",
    "評鑑基準", "審查方式",
    "自評結果", "佐證資料說明（機構填寫）", "改善計畫（機構填寫）",
  ];
  const headerRow = ws.addRow(colHeaders);
  styleHeaderRow(headerRow, colors.header);

  // 明確追蹤 row number，避免依賴 ws.rowCount 的版本差異
  let currentDataRow = 3; // 列1=標題合併列，列2=欄標題，資料從列3開始

  for (const item of section.items) {
    const code = `${section.shortCode}${item.id}`;
    const criteriaText = item.criteria.map((c, i) => `${i + 1}. ${c}`).join("\n");

    const row = ws.addRow([
      code,
      item.title,
      item.responsible,
      criteriaText,
      item.reviewMethod,
      "",   // F 自評結果（下拉）
      "",   // G 佐證資料說明
      "",   // H 改善計畫
    ]);

    // 基準欄高度 = 基準數 × 每行約 36px
    const lineCount = item.criteria.length;
    row.height = Math.max(lineCount * 36, 60);

    // 套用樣式
    row.eachCell((cell) => styleDataCell(cell, { fill: colors.light }));
    row.getCell(1).alignment = { vertical: "middle", horizontal: "center", wrapText: true };
    row.getCell(2).alignment = { vertical: "middle", horizontal: "left", wrapText: true };
    row.getCell(2).font = { bold: true };
    row.getCell(3).alignment = { vertical: "middle", horizontal: "center", wrapText: true };
    row.getCell(4).alignment = { vertical: "top", horizontal: "left", wrapText: true };
    row.getCell(5).alignment = { vertical: "middle", horizontal: "left", wrapText: true };
    row.getCell(6).alignment = { vertical: "middle", horizontal: "center", wrapText: true };
    row.getCell(6).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFFFFFCC" } };

    // F 欄 data validation（下拉選單）
    // 注意：formulae 中的逗號分隔只保證在 Excel for Windows/Mac 正常顯示；
    // Apple Numbers 使用分號分隔，匯入後下拉可能顯示為單一字串。
    ws.getCell(`F${currentDataRow}`).dataValidation = {
      type: "list",
      allowBlank: true,
      formulae: ['"符合,部分符合,不符合"'],
      showDropDown: false,
      showErrorMessage: true,
      errorTitle: "輸入錯誤",
      error: "請從下拉選單選擇：符合、部分符合、不符合",
    };

    // G、H 欄底色（供機構填寫）
    row.getCell(7).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFFAFAFA" } };
    row.getCell(8).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFFAFAFA" } };

    currentDataRow++;
  }

  // 凍結前兩列
  ws.views = [{ state: "frozen", ySplit: 2 }];
}

// ── 主程式 ───────────────────────────────────────────────────────────────
async function main() {
  const wb = new ExcelJS.Workbook();
  wb.creator = "居家服務機構評鑑系統";
  wb.created = new Date();
  wb.modified = new Date();
  wb.properties.date1904 = false;

  // 1. 總覽工作表
  buildOverviewSheet(wb);

  // 2. 各 section 工作表
  for (const section of homeCareProfile.sections) {
    buildSectionSheet(wb, section);
  }

  // 3. 儲存
  const desktopPath = path.join(os.homedir(), "Desktop", "居家服務機構評鑑自評範本.xlsx");
  await wb.xlsx.writeFile(desktopPath);

  console.log("✅ 成功產出：" + desktopPath);
  console.log("   工作表：總覽 +" + homeCareProfile.sections.map((s) => s.name).join("、"));

  const totalItems = homeCareProfile.sections.reduce((sum, s) => sum + s.items.length, 0);
  console.log(`   共 ${totalItems} 個評鑑項目`);
}

main().catch((err) => {
  console.error("❌ 錯誤：", err.message);
  process.exit(1);
});
