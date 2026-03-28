import ExcelJS from "exceljs";
import * as path from "path";
import * as os from "os";

const HEADER_FILL: ExcelJS.Fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "FF4472C4" },
};

const HEADER_FONT: Partial<ExcelJS.Font> = {
  bold: true,
  color: { argb: "FFFFFFFF" },
  size: 11,
};

const SUBHEADER_FILL: ExcelJS.Fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "FFD9E1F2" },
};

const SUBHEADER_FONT: Partial<ExcelJS.Font> = {
  bold: true,
  size: 11,
};

const THIN_BORDER: Partial<ExcelJS.Borders> = {
  top: { style: "thin" },
  left: { style: "thin" },
  bottom: { style: "thin" },
  right: { style: "thin" },
};

interface CheckItem {
  id: string;
  content: string;
}

interface ItemGroup {
  groupTitle: string;
  items: CheckItem[];
}

function addSheet(
  workbook: ExcelJS.Workbook,
  sheetName: string,
  title: string,
  groups: ItemGroup[]
) {
  const ws = workbook.addWorksheet(sheetName);

  // Column widths
  ws.getColumn("A").width = 12;
  ws.getColumn("B").width = 55;
  ws.getColumn("C").width = 10;
  ws.getColumn("D").width = 10;
  ws.getColumn("E").width = 10;
  ws.getColumn("F").width = 25;
  ws.getColumn("G").width = 25;
  ws.getColumn("H").width = 18;

  // Title row
  const titleRow = ws.addRow([title, "", "", "", "", "", "", ""]);
  ws.mergeCells(`A${titleRow.number}:H${titleRow.number}`);
  titleRow.getCell("A").font = { bold: true, size: 13 };
  titleRow.getCell("A").alignment = { horizontal: "center", vertical: "middle" };
  titleRow.height = 24;

  // Header row
  const headerRow = ws.addRow(["代碼", "評核基準內容（負責人）", "完全符合", "部分符合", "不符合", "備注事項", "待備文件", "負責人"]);
  headerRow.eachCell((cell) => {
    cell.fill = HEADER_FILL;
    cell.font = HEADER_FONT;
    cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
    cell.border = THIN_BORDER;
  });
  headerRow.height = 20;

  // Data rows
  for (const group of groups) {
    // Group header
    const groupRow = ws.addRow([group.groupTitle, "", "", "", "", "", "", ""]);
    ws.mergeCells(`A${groupRow.number}:H${groupRow.number}`);
    groupRow.getCell("A").fill = SUBHEADER_FILL;
    groupRow.getCell("A").font = SUBHEADER_FONT;
    groupRow.getCell("A").border = THIN_BORDER;
    groupRow.height = 18;

    // Items
    for (const item of group.items) {
      const dataRow = ws.addRow([item.id, item.content, "", "", "", "", "", ""]);
      dataRow.getCell("A").alignment = { horizontal: "center", vertical: "middle" };
      dataRow.getCell("B").alignment = { wrapText: true, vertical: "middle" };
      dataRow.eachCell((cell) => {
        cell.border = THIN_BORDER;
      });
      dataRow.height = 18;
    }
  }
}

// ─── Sheet 1: A 經營管理效能 ───────────────────────────────────
const sheet1Groups: ItemGroup[] = [
  {
    groupTitle: "A1 業務計畫與缺失改善",
    items: [
      { id: "A1.1", content: "業務計畫及管運方針之擬訂與執行情形（院長/主任）" },
      { id: "A1.2", content: "過去四年查核缺失改善及前次評鑑建議事項改善情形（負責人）" },
      { id: "A1.3", content: "機構內性侵害及性騷擾事件防治機制建置情形（負責人/行政主任）" },
    ],
  },
  {
    groupTitle: "A2 行政作業與人力配置",
    items: [
      { id: "A2.1", content: "機構負責人實際參與行政作業與照顧品質管理情形（主任/護理長）" },
      { id: "A2.2", content: "聘用工作人員（含專任、兼任人員）設置情形（人事主管）【重點】" },
    ],
  },
  {
    groupTitle: "A3 員工權益與健康",
    items: [
      { id: "A3.1", content: "工作人員權益相關制度訂定及執行情形（行政主任）" },
      { id: "A3.2", content: "工作人員定期接受健康檢查情形（行政主任）" },
    ],
  },
  {
    groupTitle: "A4 教育訓練",
    items: [
      { id: "A4.1", content: "工作人員（含廚工）職前及在職訓練計畫訂定及辦理情形（督導/教育訓練負責人）" },
    ],
  },
  {
    groupTitle: "A5 資料管理",
    items: [
      { id: "A5.1", content: "住民資料管理、統計分析與應用及保密情形（資訊管理負責人）" },
    ],
  },
];

// ─── Sheet 2: B 專業照護品質 ────────────────────────────────────
const sheet2Groups: ItemGroup[] = [
  {
    groupTitle: "B1 專業服務",
    items: [
      { id: "B1.1", content: "住民服務計畫與評估及管理（含營養評估及紀錄）情形（護理長）" },
      { id: "B1.2", content: "住民適應輔導或支持措施（護理人員/社工師）" },
      { id: "B1.3", content: "防疫機制建置情形（感控負責人）" },
      { id: "B1.4", content: "跨專業整合照護執行情形（護理長/各專業人員）" },
      { id: "B1.5", content: "提供住民例行及必要之醫療服務情形（護理人員）" },
      { id: "B1.6", content: "提供住民處方藥品安全管理與藥事服務情形（護理人員）" },
      { id: "B1.7", content: "住民照護服務品質監測情形（品質管理負責人）" },
      { id: "B1.8", content: "住民健康檢查及健康管理情形（護理人員）" },
      { id: "B1.9", content: "侵入性照護之執行情形（護理人員）【可選】" },
      { id: "B1.10", content: "緊急及意外事件處理情形（負責人/護理人員）" },
      { id: "B1.11", content: "提供緊急送醫服務情形（護理人員）" },
      { id: "B1.12", content: "提供符合住民需求之個別、團體或社區活動（社工師/活動治療師）" },
      { id: "B1.13", content: "社區資源聯結及運用情形（社工師）" },
      { id: "B1.14", content: "與家屬互動及提供服務情形（社工師）" },
      { id: "B1.15", content: "鼓勵住民參與機構復健作業活動情形（職能治療師）" },
      { id: "B1.16", content: "護理站設施備設備設置情形（護理長）" },
    ],
  },
  {
    groupTitle: "B2 生活照顧",
    items: [
      { id: "B2.1", content: "協助與促進住民自我照顧能力（照顧服務員）" },
      { id: "B2.2", content: "提供住民清潔服務情形（含身體、寢具及衣物）（照顧服務員）" },
      { id: "B2.3", content: "提供預防及延緩失能活動情形（職能/物理治療師）" },
    ],
  },
  {
    groupTitle: "B3 膳食服務",
    items: [
      { id: "B3.1", content: "住民膳食及個別化飲食情形（營養師）" },
      { id: "B3.2", content: "管灌住民餵食情形（護理人員）【可選】" },
    ],
  },
];

// ─── Sheet 3: C D E 安全維護住民權益創新 ──────────────────────
const sheet3Groups: ItemGroup[] = [
  {
    groupTitle: "C1 安全維護及設施設備",
    items: [
      { id: "C1.1", content: "疏散避難系統及等待救接空間設置（負責人/安全管理）【重點】" },
      { id: "C1.2", content: "訂定符合機構住民及需要之火災應變計畫及作業程序並落實演練（負責人/安全管理）" },
      { id: "C1.3", content: "落實機構特性之夜間演練計畫（負責人/安全管理）" },
    ],
  },
  {
    groupTitle: "D1 住民權益保障",
    items: [
      { id: "D1.1", content: "尊重住民信仰情形（社工師）" },
      { id: "D1.2", content: "推動安寧緩和療護及病人自主權利（護理長/主治醫師）" },
    ],
  },
  {
    groupTitle: "E1 創新及改革",
    items: [
      { id: "E1.1", content: "創新或特色措施具有成效並公開分享（院長/負責人）" },
    ],
  },
];

export async function main() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "報告汪";
  workbook.created = new Date();

  addSheet(
    workbook,
    "A 經營管理效能",
    "精神護理之家評鑑自我檢核表 - A、經營管理效能",
    sheet1Groups
  );
  addSheet(
    workbook,
    "B 專業照護品質",
    "精神護理之家評鑑自我檢核表 - B、專業照護品質",
    sheet2Groups
  );
  addSheet(
    workbook,
    "C D E 安全維護住民權益創新",
    "精神護理之家評鑑自我檢核表 - C、D、E 面向",
    sheet3Groups
  );

  const outputPath = path.join(os.homedir(), "Desktop", "精神護理之家評鑑自我檢核表.xlsx");
  await workbook.xlsx.writeFile(outputPath);
  console.log(`✅ 已儲存至：${outputPath}`);
}

main().catch((err) => {
  console.error("❌ 產生失敗：", err);
  process.exit(1);
});
