import ExcelJS from "exceljs";

export const HEADER_FILL: ExcelJS.Fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "FF4472C4" },
};

export const HEADER_FONT: Partial<ExcelJS.Font> = {
  bold: true,
  color: { argb: "FFFFFFFF" },
  size: 11,
};

export const SUBHEADER_FILL: ExcelJS.Fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "FFFCE4D6" },
};

export const SUBHEADER_FONT: Partial<ExcelJS.Font> = {
  bold: true,
  size: 11,
};

export const THIN_BORDER: Partial<ExcelJS.Borders> = {
  top: { style: "thin" },
  left: { style: "thin" },
  bottom: { style: "thin" },
  right: { style: "thin" },
};

export interface CheckItem {
  id: string;
  title: string;
  criteria: string[];
}

export interface ItemGroup {
  groupTitle: string;
  items: CheckItem[];
}

export function addSheet(
  workbook: ExcelJS.Workbook,
  sheetName: string,
  title: string,
  groups: ItemGroup[]
) {
  const ws = workbook.addWorksheet(sheetName);

  ws.getColumn("A").width = 12;  // 代碼
  ws.getColumn("B").width = 28;  // 基準
  ws.getColumn("C").width = 62;  // 基準說明(符合項目)
  ws.getColumn("D").width = 12;  // 自評結果
  ws.getColumn("E").width = 22;  // 佐證資料
  ws.getColumn("F").width = 22;  // 改善計畫
  ws.getColumn("G").width = 18;  // 備註

  const titleRow = ws.addRow([title, "", "", "", "", "", ""]);
  ws.mergeCells(`A${titleRow.number}:G${titleRow.number}`);
  titleRow.getCell("A").font = { bold: true, size: 13 };
  titleRow.getCell("A").alignment = { horizontal: "center", vertical: "middle" };
  titleRow.height = 26;

  const headerRow = ws.addRow(["代碼", "基準", "基準說明（符合項目）", "自評結果", "佐證資料", "改善計畫", "備註"]);
  headerRow.eachCell((cell) => {
    cell.fill = HEADER_FILL;
    cell.font = HEADER_FONT;
    cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
    cell.border = THIN_BORDER;
  });
  headerRow.height = 20;

  for (const group of groups) {
    const groupRow = ws.addRow([group.groupTitle, "", "", "", "", "", ""]);
    ws.mergeCells(`A${groupRow.number}:G${groupRow.number}`);
    groupRow.getCell("A").fill = SUBHEADER_FILL;
    groupRow.getCell("A").font = SUBHEADER_FONT;
    groupRow.getCell("A").border = THIN_BORDER;
    groupRow.height = 18;

    for (const item of group.items) {
      const criteriaText = item.criteria.map((c, i) => `${i + 1}. ${c}`).join("\n");
      const dataRow = ws.addRow([item.id, item.title, criteriaText, "", "", "", ""]);
      dataRow.getCell("A").alignment = { horizontal: "center", vertical: "top" };
      dataRow.getCell("B").alignment = { wrapText: true, vertical: "top" };
      dataRow.getCell("C").alignment = { wrapText: true, vertical: "top" };
      dataRow.getCell("D").alignment = { horizontal: "center", vertical: "top" };
      dataRow.getCell("E").alignment = { wrapText: true, vertical: "top" };
      dataRow.getCell("F").alignment = { wrapText: true, vertical: "top" };
      dataRow.getCell("G").alignment = { wrapText: true, vertical: "top" };
      dataRow.eachCell((cell) => { cell.border = THIN_BORDER; });
      dataRow.height = Math.max(30, item.criteria.length * 16);
    }
  }
}
