/**
 * SVG 視覺稽核 contact-sheet 產生器（稽核完成後可刪除）
 *
 * 使用方式：
 *   npx tsx scripts/audit-svg-thumbnails.ts            # 產生全部 cover + inline sheets
 *   npx tsx scripts/audit-svg-thumbnails.ts covers     # 只產封面
 *   npx tsx scripts/audit-svg-thumbnails.ts inline     # 只產內文
 *
 * 輸出至 /tmp/svg-audit/
 *   covers-NN.png   封面 contact sheet（每張 5×4=20 格，240×150 縮圖）
 *   inline-NN.png   內文 contact sheet（每張 6×5=30 格，200×125 縮圖）
 *   covers-index.txt / inline-index.txt  檔名對照索引
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "fs";
import { resolve, join } from "path";
import { Resvg } from "@resvg/resvg-js";
import sharp from "sharp";

// ─── 設定 ────────────────────────────────────────────────────────────────────

const BLOG_DIR = resolve(process.cwd(), "public/blog");
const OUT_DIR = "/tmp/svg-audit";
mkdirSync(OUT_DIR, { recursive: true });

// 封面縮圖（1200×630 的 20%）
const COV_TW = 300, COV_TH = 158;
const COV_LABEL_H = 20;
const COV_COLS = 5, COV_ROWS = 4;   // 20 格/張
const COV_PAD = 4;

// 內文縮圖（800×500 的 25%）
const INL_TW = 200, INL_TH = 125;
const INL_LABEL_H = 20;
const INL_COLS = 6, INL_ROWS = 5;   // 30 格/張
const INL_PAD = 4;

const BG_DARK = { r: 30, g: 41, b: 59 };   // #1e293b（sheet 背景）
const BG_THUMB = { r: 240, g: 239, b: 232 }; // #f0efe8（縮圖空白填補）

// ─── 工具函式 ────────────────────────────────────────────────────────────────

/** 將 SVG 檔案渲染成 PNG Buffer */
async function renderSvg(
  svgPath: string,
  targetW: number,
  targetH: number,
): Promise<Buffer> {
  try {
    const content = readFileSync(svgPath, "utf-8");
    const resvg = new Resvg(content, {
      fitTo: { mode: "width", value: targetW },
      font: { loadSystemFonts: true },
    });
    const rendered = resvg.render();
    const pngBuf = Buffer.from(rendered.asPng());
    return await sharp(pngBuf)
      .resize(targetW, targetH, { fit: "contain", background: BG_THUMB })
      .png()
      .toBuffer();
  } catch {
    // 渲染失敗：填紅色佔位（方便視覺識別）
    return await sharp({
      create: { width: targetW, height: targetH, channels: 3, background: { r: 220, g: 38, b: 38 } },
    })
      .png()
      .toBuffer();
  }
}

/** 產生檔名標籤（深色底白字） */
async function renderLabel(name: string, w: number, h: number): Promise<Buffer> {
  // 去掉 .svg 後綴，截斷過長檔名
  const label = name.replace(".svg", "");
  const truncated = label.length > 42 ? label.slice(0, 40) + ".." : label;
  // 用單引號逸出避免 SVG 屬性問題
  const safe = truncated.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <rect width="${w}" height="${h}" fill="#1e293b"/>
  <text x="4" y="${h - 5}" font-size="9" fill="#94a3b8" font-family="Menlo,Monaco,Consolas,monospace">${safe}</text>
</svg>`;
  try {
    const resvg = new Resvg(svg, {
      fitTo: { mode: "width", value: w },
      font: { loadSystemFonts: true },
    });
    return Buffer.from(resvg.render().asPng());
  } catch {
    return await sharp({
      create: { width: w, height: h, channels: 3, background: { r: 30, g: 41, b: 59 } },
    }).png().toBuffer();
  }
}

/** 合成一格縮圖（縮圖 + 標籤） */
async function makeCell(
  filePath: string,
  thumbW: number,
  thumbH: number,
  labelH: number,
): Promise<Buffer> {
  const thumb = await renderSvg(filePath, thumbW, thumbH);
  const label = await renderLabel(filePath.split("/").pop()!, thumbW, labelH);
  const cellH = thumbH + labelH;
  return await sharp({
    create: { width: thumbW, height: cellH, channels: 3, background: BG_DARK },
  })
    .composite([
      { input: thumb, top: 0, left: 0 },
      { input: label, top: thumbH, left: 0 },
    ])
    .png()
    .toBuffer();
}

/** 產生一張 contact sheet PNG */
async function makeSheet(
  files: string[],
  thumbW: number,
  thumbH: number,
  labelH: number,
  cols: number,
  pad: number,
): Promise<Buffer> {
  const cellH = thumbH + labelH;
  const rows = Math.ceil(files.length / cols);
  const sheetW = cols * thumbW + (cols + 1) * pad;
  const sheetH = rows * cellH + (rows + 1) * pad;

  const cells = await Promise.all(
    files.map((f) => makeCell(f, thumbW, thumbH, labelH)),
  );

  const composites: sharp.OverlayOptions[] = cells.map((cell, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    return {
      input: cell,
      left: pad + col * (thumbW + pad),
      top: pad + row * (cellH + pad),
    };
  });

  return await sharp({
    create: { width: sheetW, height: sheetH, channels: 3, background: BG_DARK },
  })
    .composite(composites)
    .png()
    .toBuffer();
}

// ─── 主程式 ─────────────────────────────────────────────────────────────────

async function main() {
  const mode = process.argv[2] ?? "all";

  const allFiles = readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".svg") && !f.startsWith("template-") && !f.startsWith("test-"))
    .sort()
    .map((f) => join(BLOG_DIR, f));

  const coverFiles = allFiles.filter((f) => f.endsWith("-cover.svg"));
  const inlineFiles = allFiles.filter((f) => !f.endsWith("-cover.svg"));

  const perSheetCover = COV_COLS * COV_ROWS;
  const perSheetInline = INL_COLS * INL_ROWS;

  // 封面 sheets
  if (mode === "all" || mode === "covers") {
    const totalCoverSheets = Math.ceil(coverFiles.length / perSheetCover);
    console.log(`\n📸 封面：${coverFiles.length} 個 → ${totalCoverSheets} 張 sheet`);
    const indexLines: string[] = [`# 封面 SVG 索引（sheet, row, col → 檔名）`, ""];

    for (let s = 0; s < totalCoverSheets; s++) {
      const batch = coverFiles.slice(s * perSheetCover, (s + 1) * perSheetCover);
      process.stdout.write(`  ├─ covers-${String(s + 1).padStart(2, "0")}.png ... `);
      const sheet = await makeSheet(batch, COV_TW, COV_TH, COV_LABEL_H, COV_COLS, COV_PAD);
      const outPath = join(OUT_DIR, `covers-${String(s + 1).padStart(2, "0")}.png`);
      writeFileSync(outPath, sheet);
      console.log(`✓ (${batch.length} 格)`);

      batch.forEach((f, i) => {
        const row = Math.floor(i / COV_COLS) + 1;
        const col = (i % COV_COLS) + 1;
        indexLines.push(`[${String(s + 1).padStart(2, "0")} r${row}c${col}] ${f.split("/").pop()}`);
      });
      indexLines.push("");
    }
    writeFileSync(join(OUT_DIR, "covers-index.txt"), indexLines.join("\n"), "utf-8");
    console.log(`  └─ 索引已寫至 ${OUT_DIR}/covers-index.txt`);
  }

  // 內文插圖 sheets
  if (mode === "all" || mode === "inline") {
    const totalInlineSheets = Math.ceil(inlineFiles.length / perSheetInline);
    console.log(`\n📸 內文插圖：${inlineFiles.length} 個 → ${totalInlineSheets} 張 sheet`);
    const indexLines: string[] = [`# 內文 SVG 索引（sheet, row, col → 檔名）`, ""];

    for (let s = 0; s < totalInlineSheets; s++) {
      const batch = inlineFiles.slice(s * perSheetInline, (s + 1) * perSheetInline);
      process.stdout.write(`  ├─ inline-${String(s + 1).padStart(2, "0")}.png ... `);
      const sheet = await makeSheet(batch, INL_TW, INL_TH, INL_LABEL_H, INL_COLS, INL_PAD);
      const outPath = join(OUT_DIR, `inline-${String(s + 1).padStart(2, "0")}.png`);
      writeFileSync(outPath, sheet);
      console.log(`✓ (${batch.length} 格)`);

      batch.forEach((f, i) => {
        const row = Math.floor(i / INL_COLS) + 1;
        const col = (i % INL_COLS) + 1;
        indexLines.push(`[${String(s + 1).padStart(2, "0")} r${row}c${col}] ${f.split("/").pop()}`);
      });
      indexLines.push("");
    }
    writeFileSync(join(OUT_DIR, "inline-index.txt"), indexLines.join("\n"), "utf-8");
    console.log(`  └─ 索引已寫至 ${OUT_DIR}/inline-index.txt`);
  }

  console.log(`\n✅ 完成！輸出目錄：${OUT_DIR}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
