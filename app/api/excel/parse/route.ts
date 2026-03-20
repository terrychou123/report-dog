import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { reports } from "@/db/schema";
import { eq, min, max } from "drizzle-orm";
import ExcelJS from "exceljs";

type SheetData = {
  name: string;
  data: string[][];
  config?: {
    columnlen?: Record<string, number>;
    rowlen?: Record<string, number>;
    merge?: Record<string, { r: number; c: number; rs: number; cs: number }>;
    borderInfo?: unknown[];
  };
  cellStyles?: Record<string, { ht?: number; vt?: number }>;
};

const BORDER_LIMIT = 5000;

const excelBorderStyleMap: Record<string, number> = {
  thin: 1, medium: 2, dashed: 3, dotted: 4,
  thick: 5, double: 6, hair: 7, mediumDashed: 8,
};

function argbToHex(argb: string | undefined): string | undefined {
  if (!argb || argb.length < 6) return undefined;
  // ARGB is 8 chars like 'FFRRGGBB', or 6 chars 'RRGGBB'
  const rgb = argb.length === 8 ? argb.slice(2) : argb;
  return rgb.toUpperCase();
}


export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });
  const insertAtTop = formData.get("insertAtTop") === "true";

  const arrayBuffer = await file.arrayBuffer();
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(arrayBuffer);

  const sheets: SheetData[] = workbook.worksheets.map((worksheet) => {
    // 欄寬（ExcelJS 單位是字元寬，×7 轉 px）
    const columnlen: Record<string, number> = {};
    worksheet.columns.forEach((col, i) => {
      if (col.width && col.width > 0) {
        columnlen[String(i)] = Math.round(col.width * 7);
      }
    });

    // 合併儲存格（worksheet.model.merges 回傳 'A1:C3' 格式）
    const merge: Record<string, { r: number; c: number; rs: number; cs: number }> = {};
    const modelMerges = (worksheet.model as { merges?: string[] }).merges ?? [];
    for (const mergeStr of modelMerges) {
      const parts = mergeStr.split(":");
      if (parts.length !== 2) continue;
      const startCell = worksheet.getCell(parts[0]);
      const endCell = worksheet.getCell(parts[1]);
      const r = Number(startCell.row) - 1;
      const c = Number(startCell.col) - 1;
      const rs = Number(endCell.row) - Number(startCell.row) + 1;
      const cs = Number(endCell.col) - Number(startCell.col) + 1;
      merge[`${r}_${c}`] = { r, c, rs, cs };
    }

    // 資料 + 樣式
    const data: string[][] = [];
    const rowlen: Record<string, number> = {};
    const cellStyles: Record<string, { ht?: number; vt?: number }> = {};
    const borderInfo: unknown[] = [];

    worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
      const r = rowNumber - 1;

      // 列高（pt × 1.333 → px）
      if (row.height) {
        rowlen[String(r)] = Math.round(row.height * 1.333);
      }

      while (data.length <= r) data.push([]);

      row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        const c = colNumber - 1;
        while (data[r].length <= c) data[r].push("");

        // 儲存格值
        let val = "";
        if (cell.value !== null && cell.value !== undefined) {
          const cv = cell.value;
          if (typeof cv === "object" && "richText" in cv) {
            val = (cv as ExcelJS.CellRichTextValue).richText.map((rt) => rt.text).join("");
          } else if (typeof cv === "object" && "formula" in cv) {
            val = String((cv as ExcelJS.CellFormulaValue).result ?? "");
          } else if (cv instanceof Date) {
            val = cv.toLocaleDateString();
          } else {
            val = String(cv);
          }
        }
        data[r][c] = val;

        // 對齊
        const styleEntry: { ht?: number; vt?: number } = {};
        const h = cell.alignment?.horizontal;
        if (h === "center" || h === "centerContinuous") styleEntry.ht = 0;
        else if (h === "left" || h === "fill") styleEntry.ht = 1;
        else if (h === "right") styleEntry.ht = 2;

        const v = cell.alignment?.vertical;
        if (v === "middle") styleEntry.vt = 0;
        else if (v === "top") styleEntry.vt = 1;
        else if (v === "bottom") styleEntry.vt = 2;

        if (styleEntry.ht != null || styleEntry.vt != null) {
          cellStyles[`${r}_${c}`] = styleEntry;
        }

        // 邊框
        if (borderInfo.length < BORDER_LIMIT && cell.border) {
          const entry: Record<string, unknown> = { rangeType: "cell", value: { row_index: r, col_index: c } };
          for (const [side, fsSide] of [["top", "t"], ["left", "l"], ["bottom", "b"], ["right", "r"]] as const) {
            const bs = (cell.border as Record<string, { style?: string; color?: { argb?: string } } | undefined>)[side];
            if (!bs?.style) continue;
            const style = excelBorderStyleMap[bs.style] ?? 1;
            const color = bs.color?.argb ? `#${argbToHex(bs.color.argb) ?? "000000"}` : "#000000";
            (entry.value as Record<string, unknown>)[fsSide] = { style, color };
          }
          if (Object.keys(entry.value as object).length > 2) {
            borderInfo.push(entry);
          }
        }
      });
    });

    const config: SheetData["config"] = {};
    if (Object.keys(columnlen).length) config.columnlen = columnlen;
    if (Object.keys(rowlen).length) config.rowlen = rowlen;
    if (Object.keys(merge).length) config.merge = merge;
    if (borderInfo.length && borderInfo.length < BORDER_LIMIT) config.borderInfo = borderInfo;

    return {
      name: worksheet.name,
      data,
      ...(Object.keys(config).length ? { config } : {}),
      ...(Object.keys(cellStyles).length ? { cellStyles } : {}),
    };
  });

  const userId = data.claims.sub;
  const whereClause = eq(reports.userId, userId);

  let nextOrder: number;
  if (insertAtTop) {
    const [minRow] = await db.select({ min: min(reports.sortOrder) }).from(reports).where(whereClause);
    nextOrder = Number(minRow?.min ?? 0) - 1;
  } else {
    const [maxRow] = await db.select({ max: max(reports.sortOrder) }).from(reports).where(whereClause);
    nextOrder = Number(maxRow?.max ?? -1) + 1;
  }

  const title = file.name.replace(/\.(xlsx|xls)$/i, "");
  const [inserted] = await db
    .insert(reports)
    .values({
      userId,
      title,
      content: JSON.stringify(sheets),
      fileType: "excel",
      sortOrder: nextOrder,
    })
    .returning();

  return NextResponse.json({ report: inserted, sheets });
}
