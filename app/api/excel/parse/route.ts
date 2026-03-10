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

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const workbook = XLSX.read(buffer, { type: "buffer", cellStyles: true });

  const styleMap: Record<string, number> = {
    thin: 1, medium: 2, dashed: 3, dotted: 4,
    thick: 5, double: 6, hair: 7, mediumDashed: 8,
  };

  const sheets: SheetData[] = workbook.SheetNames.map((name) => {
    const ws = workbook.Sheets[name];
    const data: string[][] = XLSX.utils.sheet_to_json(ws, { header: 1, defval: "" }) as string[][];

    // 欄寬：wpx 優先，其次 wch * 7
    const columnlen: Record<string, number> = {};
    (ws['!cols'] ?? []).forEach((col, i) => {
      if (!col) return;
      const px = col.wpx ?? (col.wch ? Math.round(col.wch * 7) : null);
      if (px) columnlen[String(i)] = px;
    });

    // 列高：hpx 優先，其次 hpt * 1.333
    const rowlen: Record<string, number> = {};
    (ws['!rows'] ?? []).forEach((row, i) => {
      if (!row) return;
      const px = row.hpx ?? (row.hpt ? Math.round(row.hpt * 1.333) : null);
      if (px) rowlen[String(i)] = px;
    });

    // 合併儲存格
    const merge: Record<string, { r: number; c: number; rs: number; cs: number }> = {};
    for (const m of (ws['!merges'] ?? [])) {
      merge[`${m.s.r}_${m.s.c}`] = {
        r: m.s.r, c: m.s.c,
        rs: m.e.r - m.s.r + 1,
        cs: m.e.c - m.s.c + 1,
      };
    }

    // 邊框（borderInfo）
    const borderInfo: unknown[] = [];
    const ref = ws['!ref'];
    if (ref) {
      const range = XLSX.utils.decode_range(ref);
      for (let r = range.s.r; r <= range.e.r; r++) {
        for (let c = range.s.c; c <= range.e.c; c++) {
          const cell = ws[XLSX.utils.encode_cell({ r, c })];
          if (!cell?.s?.border) continue;
          const entry: Record<string, unknown> = { rangeType: "cell", value: { row_index: r, col_index: c } };
          for (const [xlSide, fsSide] of [['left', 'l'], ['right', 'r'], ['top', 't'], ['bottom', 'b']] as const) {
            const s = (cell.s.border as Record<string, { style?: string; color?: { rgb?: string } }>)[xlSide];
            if (s?.style) {
              (entry.value as Record<string, unknown>)[fsSide] = {
                style: styleMap[s.style] ?? 1,
                color: s.color?.rgb ? `#${s.color.rgb}` : '#000000',
              };
            }
          }
          borderInfo.push(entry);
        }
      }
    }

    const config: SheetData['config'] = {};
    if (Object.keys(columnlen).length) config.columnlen = columnlen;
    if (Object.keys(rowlen).length) config.rowlen = rowlen;
    if (Object.keys(merge).length) config.merge = merge;
    if (borderInfo.length) config.borderInfo = borderInfo;

    return { name, data, ...(Object.keys(config).length ? { config } : {}) };
  });

  return NextResponse.json({ sheets });
}
