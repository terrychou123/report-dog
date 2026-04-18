/**
 * 將 Numbers 提取的 JSON 資料匯入日照中心評鑑範本的工作分頁。
 *
 * 前置步驟：先執行 python3 scripts/extract-numbers-to-json.py 產生 JSON 檔案。
 *
 * 執行方式：
 *   npx dotenv-cli -e .env.local -- tsx scripts/import-numbers-daycare.ts            # 正式匯入
 *   npx dotenv-cli -e .env.local -- tsx scripts/import-numbers-daycare.ts --dry-run  # 預覽（不寫入 DB）
 */

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq } from 'drizzle-orm';
import * as fs from 'fs';
import * as path from 'path';
import { reportTemplates } from '../db/schema';
import { getDbUrl } from '../db/index';
import type { SheetData } from '../lib/excel-template-builder';

// ── 中間 JSON 格式型別 ────────────────────────────────────────────────────────

type ExtractedSheet = {
  templateNumber: number;
  sheetName: string;
  data: string[][];
  colWidths: Record<string, number>;
  rowHeights: Record<string, number>;
  merges: Record<string, { r: number; c: number; rs: number; cs: number }>;
};

type ExtractedData = {
  sheets: ExtractedSheet[];
};

// ── cellStyles 建構策略 ───────────────────────────────────────────────────────

/**
 * 依合併儲存格範圍自動推斷各列的樣式：
 * - 跨所有欄的合併列（標題）→ 置中、粗體
 * - 其他合併列 → 置中
 * - 第一個非合併的完整資料列 → 置中（視為表頭）
 * - 其餘資料列 → 靠左、自動換行
 */
function buildCellStyles(
  sheet: ExtractedSheet,
): Record<string, { fc?: string; bg?: string; bold?: boolean; ht?: number; vt?: number; tb?: number }> {
  const styles: Record<string, { ht?: number; vt?: number; bold?: boolean; tb?: number }> = {};
  const numCols = sheet.data[0]?.length ?? 0;

  // 找出跨越所有欄的合併列（標題列）
  const titleRows = new Set<number>();
  // 找出其他有合併儲存格的列
  const mergedRows = new Set<number>();

  for (const merge of Object.values(sheet.merges)) {
    if (merge.cs >= numCols - 1) {
      // 合併欄數接近全欄 → 視為標題列
      titleRows.add(merge.r);
    } else {
      mergedRows.add(merge.r);
    }
  }

  // 找到第一個「非標題、非合併」的列，視為表頭列
  let headerRow: number | null = null;
  for (let r = 0; r < sheet.data.length; r++) {
    if (!titleRows.has(r) && !mergedRows.has(r)) {
      const row = sheet.data[r];
      // 判斷是否為表頭：多數儲存格有值且為純文字（不含數字開頭）
      const nonEmpty = row.filter((v) => v.trim() !== '').length;
      if (nonEmpty >= Math.floor(numCols / 2)) {
        headerRow = r;
        break;
      }
    }
  }

  // 套用樣式
  for (let r = 0; r < sheet.data.length; r++) {
    for (let c = 0; c < numCols; c++) {
      const key = `${r}_${c}`;
      if (titleRows.has(r)) {
        // 標題列：置中、粗體
        styles[key] = { ht: 0, vt: 0, bold: true };
      } else if (r === headerRow) {
        // 表頭列：置中
        styles[key] = { ht: 0, vt: 0 };
      } else {
        // 資料列：靠左、自動換行
        styles[key] = { ht: 1, vt: 0, tb: 2 };
      }
    }
  }

  return styles;
}

// ── 轉換為 SheetData 格式 ─────────────────────────────────────────────────────

const MAX_SHEET_NAME_LENGTH = 20;

function truncateSheetName(name: string): string {
  return name.length > MAX_SHEET_NAME_LENGTH ? name.slice(0, MAX_SHEET_NAME_LENGTH) : name;
}

function toSheetData(extracted: ExtractedSheet): SheetData {
  const name = truncateSheetName(extracted.sheetName);

  return {
    name,
    data: extracted.data,
    config: {
      columnlen: extracted.colWidths,
      rowlen: extracted.rowHeights,
      merge: Object.keys(extracted.merges).length > 0 ? extracted.merges : undefined,
    },
    cellStyles: buildCellStyles(extracted),
  };
}

// ── 主流程 ───────────────────────────────────────────────────────────────────

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not set. Run with: npx dotenv-cli -e .env.local -- tsx scripts/import-numbers-daycare.ts');
    process.exit(1);
  }

  const dryRun = process.argv.includes('--dry-run');
  if (dryRun) {
    console.log('🔍 DRY RUN 模式：不會寫入資料庫\n');
  }

  // 讀取提取的 JSON（支援 --input=<path>，預設使用 numbers-extracted-daycare.json）
  const inputArg = process.argv.find((a) => a.startsWith('--input='));
  const jsonPath = inputArg
    ? path.resolve(inputArg.slice('--input='.length))
    : path.join(__dirname, 'numbers-extracted-daycare.json');

  if (!fs.existsSync(jsonPath)) {
    console.error(`❌ 找不到 JSON 檔案：${jsonPath}`);
    console.error('   請先執行：python3 scripts/extract-numbers-to-json.py');
    process.exit(1);
  }

  const extracted: ExtractedData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  console.log(`📄 載入 JSON：${extracted.sheets.length} 個工作分頁\n`);

  // 依範本編號分組
  const sheetsByTemplate = new Map<number, ExtractedSheet[]>();
  for (const sheet of extracted.sheets) {
    const list = sheetsByTemplate.get(sheet.templateNumber) ?? [];
    list.push(sheet);
    sheetsByTemplate.set(sheet.templateNumber, list);
  }

  console.log('📊 範本對應摘要：');
  for (const [num, sheets] of sheetsByTemplate) {
    console.log(`  項目 #${num}：${sheets.map((s) => `「${s.sheetName}」`).join('、')}`);
  }
  console.log();

  const client = postgres(getDbUrl(), { prepare: false });
  const db = drizzle(client);

  try {
    // 查詢所有日照中心範本
    const templates = await db
      .select()
      .from(reportTemplates)
      .where(eq(reportTemplates.facilityType, 'daycare'));

    console.log(`🗄️  資料庫中找到 ${templates.length} 個日照中心範本\n`);

    let totalAdded = 0;
    let totalSkipped = 0;
    let totalNotFound = 0;

    // 先計算所有待更新項目（不含 DB 寫入），用於 transaction 內批次執行
    type PendingUpdate = { templateId: string; updatedSheets: SheetData[] };
    const pendingUpdates: PendingUpdate[] = [];

    for (const [templateNumber, sheetsToAdd] of sheetsByTemplate) {
      // 比對範本標題（title 格式："{number} {name}"）
      const template = templates.find((t) =>
        t.title.startsWith(String(templateNumber) + ' '),
      );

      if (!template) {
        console.warn(`  ⚠️  找不到範本項目 #${templateNumber}，跳過`);
        totalNotFound += sheetsToAdd.length;
        continue;
      }

      // 解析既有 content
      let existingSheets: SheetData[] = [];
      try {
        const parsed = JSON.parse(template.content ?? '[]');
        if (!Array.isArray(parsed)) {
          console.warn(`  ⚠️  範本 #${templateNumber}「${template.title}」的 content 非陣列格式，跳過`);
          totalNotFound += sheetsToAdd.length;
          continue;
        }
        existingSheets = parsed;
      } catch {
        console.warn(`  ⚠️  範本 #${templateNumber}「${template.title}」的 content 解析失敗，跳過`);
        totalNotFound += sheetsToAdd.length;
        continue;
      }

      const existingNames = new Set(existingSheets.map((s) => s.name));
      const newSheets: SheetData[] = [];

      for (const extracted of sheetsToAdd) {
        const sheetName = truncateSheetName(extracted.sheetName);

        if (existingNames.has(sheetName)) {
          console.log(`  ⏭️  項目 #${templateNumber} 「${sheetName}」已存在，跳過`);
          totalSkipped++;
          continue;
        }

        newSheets.push(toSheetData(extracted));
        console.log(`  ✅ 項目 #${templateNumber}「${template.title}」← 新增「${sheetName}」`);
        totalAdded++;
      }

      if (newSheets.length === 0) continue;

      pendingUpdates.push({
        templateId: template.id,
        updatedSheets: [...existingSheets, ...newSheets],
      });
    }

    // 所有更新包在單一 transaction，確保原子性（全部成功或全部回滾）
    if (!dryRun && pendingUpdates.length > 0) {
      await db.transaction(async (tx) => {
        for (const { templateId, updatedSheets } of pendingUpdates) {
          await tx
            .update(reportTemplates)
            .set({
              content: JSON.stringify(updatedSheets),
              updatedAt: new Date(),
            })
            .where(eq(reportTemplates.id, templateId));
        }
      });
    }

    console.log('\n📋 匯入結果：');
    console.log(`  ✅ 新增：${totalAdded} 個工作分頁`);
    console.log(`  ⏭️  跳過（已存在）：${totalSkipped} 個`);
    if (totalNotFound > 0) {
      console.log(`  ⚠️  找不到對應範本：${totalNotFound} 個`);
    }
    if (dryRun) {
      console.log('\n🔍 DRY RUN 完成，未寫入任何資料');
    } else {
      console.log('\n🎉 匯入完成！');
    }
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error('❌ 執行失敗：', err);
  process.exit(1);
});
