import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import * as XLSX from "xlsx";

type SheetData = {
  name: string;
  data: string[][];
  config?: {
    columnlen?: Record<string, number>;
    rowlen?: Record<string, number>;
    merge?: Record<string, { r: number; c: number; rs: number; cs: number }>;
    borderInfo?: unknown[];
  };
};

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title, sheets }: { title: string; sheets: SheetData[] } = await req.json();

  const workbook = XLSX.utils.book_new();
  for (const s of sheets) {
    const worksheet = XLSX.utils.aoa_to_sheet(s.data);

    if (s.config?.columnlen) {
      const cols: XLSX.ColInfo[] = [];
      for (const [i, px] of Object.entries(s.config.columnlen))
        cols[Number(i)] = { wpx: px };
      worksheet['!cols'] = cols;
    }

    if (s.config?.rowlen) {
      const rows: XLSX.RowInfo[] = [];
      for (const [i, px] of Object.entries(s.config.rowlen))
        rows[Number(i)] = { hpx: px };
      worksheet['!rows'] = rows;
    }

    if (s.config?.merge) {
      worksheet['!merges'] = Object.values(s.config.merge).map((m) => ({
        s: { r: m.r, c: m.c },
        e: { r: m.r + m.rs - 1, c: m.c + m.cs - 1 },
      }));
    }

    XLSX.utils.book_append_sheet(workbook, worksheet, s.name || "Sheet1");
  }

  const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

  const filename = (title || "report").replace(/[^\w\u4e00-\u9fff\s-]/g, "");
  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${encodeURIComponent(filename)}.xlsx"`,
    },
  });
}
