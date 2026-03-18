import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
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
  cellStyles?: Record<string, { fc?: string; bg?: string; ht?: number; vt?: number }>;
};

const htMap: Record<number, ExcelJS.Alignment["horizontal"]> = { 0: "center", 1: "left", 2: "right" };
const vtMap: Record<number, ExcelJS.Alignment["vertical"]> = { 0: "middle", 1: "top", 2: "bottom" };

function hexToArgb(hex: string): string {
  return `FF${hex.replace("#", "").toUpperCase()}`;
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title, sheets }: { title: string; sheets: SheetData[] } = await req.json();

  const workbook = new ExcelJS.Workbook();
  for (const s of sheets) {
    const worksheet = workbook.addWorksheet(s.name || "Sheet1");

    // 填入資料
    s.data.forEach((row, r) => {
      const wsRow = worksheet.getRow(r + 1);
      row.forEach((val, c) => {
        wsRow.getCell(c + 1).value = val;
      });
      wsRow.commit();
    });

    // 套用 cellStyles（對齊、字型顏色、背景色）
    if (s.cellStyles) {
      for (const [key, style] of Object.entries(s.cellStyles)) {
        const [r, c] = key.split("_").map(Number);
        const cell = worksheet.getRow(r + 1).getCell(c + 1);

        const alignment: Partial<ExcelJS.Alignment> = {};
        if (style.ht != null && htMap[style.ht]) alignment.horizontal = htMap[style.ht];
        if (style.vt != null && vtMap[style.vt]) alignment.vertical = vtMap[style.vt];
        if (Object.keys(alignment).length) cell.alignment = alignment as ExcelJS.Alignment;

        if (style.fc) {
          cell.font = { color: { argb: hexToArgb(style.fc) } };
        }
        if (style.bg) {
          cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: hexToArgb(style.bg) } };
        }
      }
    }

    // 欄寬（px ÷ 7 → Excel 字元單位）
    if (s.config?.columnlen) {
      for (const [i, px] of Object.entries(s.config.columnlen)) {
        worksheet.getColumn(Number(i) + 1).width = px / 7;
      }
    }

    // 列高（px ÷ 1.333 → pt）
    if (s.config?.rowlen) {
      for (const [i, px] of Object.entries(s.config.rowlen)) {
        worksheet.getRow(Number(i) + 1).height = px / 1.333;
      }
    }

    // 合併儲存格
    if (s.config?.merge) {
      for (const m of Object.values(s.config.merge)) {
        worksheet.mergeCells(m.r + 1, m.c + 1, m.r + m.rs, m.c + m.cs);
      }
    }
  }

  const buffer = await workbook.xlsx.writeBuffer();
  const filename = (title || "report").replace(/[^\w\u4e00-\u9fff\s-]/g, "");
  return new NextResponse(Buffer.from(buffer), {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${encodeURIComponent(filename)}.xlsx"`,
    },
  });
}
