/**
 * 在居家護理所「5 A5 機構經營指標監測與持續改善」範本（ID: 10cf402e-fe6d-4890-9199-9c34a350c8bb）
 * 末端追加一張「機構經營指標持續改善PDCA」工作分頁。
 *
 * 欄位（8 欄，PDCA 指標管理風格）：
 *   指標名稱 | 目標值 | 基期值 | 本次評值值 | 達成率(%) | Plan 改善計畫 | Do-Check 執行與監測 | Act 後續調整
 *
 * 預填 5 列（官方 5 項量測指標）：
 *   平均個案管理人數、護理人員離職率、個案非計畫性住院率、個案急診使用率、皮膚損傷發生率
 *
 * 視覺風格沿用同範本「品質指標監測分析報告表」（row0 合併標題、row1 灰底欄頭、data rows 自動換行）。
 *
 * 冪等：分頁名已存在時跳過。
 * 舊版 content 備份到 template_revisions（最多保留 5 筆）。
 *
 * Run (dry-run，預設):
 *   npx dotenv-cli -e .env.local -- tsx scripts/append-home-nursing-pdca-sheet.ts
 *
 * Run (實際寫入 DB):
 *   npx dotenv-cli -e .env.local -- tsx scripts/append-home-nursing-pdca-sheet.ts --apply
 *
 * Run (回滾，移除最後一頁，前提是最後一頁名為該分頁名):
 *   npx dotenv-cli -e .env.local -- tsx scripts/append-home-nursing-pdca-sheet.ts --rollback
 */
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { asc, desc, eq, inArray } from "drizzle-orm";
import {
  reportTemplates,
  templateLinks,
  templateRevisions,
  templateTagReports,
  templateTags,
} from "../db/schema";
import { getDbUrl } from "../db/index";

// ─── 常數 ────────────────────────────────────────────────────────────────────

const TEMPLATE_ID = "10cf402e-fe6d-4890-9199-9c34a350c8bb";
const NEW_SHEET_NAME = "機構經營指標持續改善PDCA";
const SEED_USER_ID = "seed-script-home-nursing-pdca-sheet";
const MAX_REVISIONS = 5;

// 8 欄定義
const COLUMNS = [
  { header: "指標名稱",          width: 160 },
  { header: "目標值",            width: 110 },
  { header: "基期值",            width: 110 },
  { header: "本次評值值",        width: 110 },
  { header: "達成率(%)",         width: 100 },
  { header: "Plan 改善計畫",     width: 200 },
  { header: "Do-Check 執行與監測", width: 200 },
  { header: "Act 後續調整",      width: 180 },
];

// 5 列預填指標名稱（第一欄，其餘欄位留白）
const INDICATORS = [
  "平均個案管理人數",
  "護理人員離職率",
  "個案非計畫性住院率",
  "個案急診使用率",
  "皮膚損傷發生率",
];

// ─── SheetData 型別 ──────────────────────────────────────────────────────────

type CellStyle = { bg?: string; fc?: string; bold?: boolean; ht?: number | string; vt?: number | string; tb?: number | string };
type SheetData = {
  name: string;
  data: string[][];
  config?: {
    columnlen?: Record<string, number>;
    rowlen?: Record<string, number>;
    merge?: Record<string, { r: number; c: number; rs: number; cs: number }>;
  };
  cellStyles?: Record<string, CellStyle>;
};

// ─── 建立新分頁 ──────────────────────────────────────────────────────────────

function buildPdcaSheet(): SheetData {
  const numCols = COLUMNS.length;   // 8
  const numDataRows = INDICATORS.length;  // 5

  // data 結構：row 0 = 標題列，row 1 = 欄頭，row 2–6 = 預填
  const emptyRow = () => Array(numCols).fill("") as string[];

  const data: string[][] = [
    // row 0: 標題列（第一格填分頁名，其餘空白；依靠 merge 合併顯示）
    Object.assign(emptyRow(), { 0: NEW_SHEET_NAME }) as string[],
    // row 1: 欄頭
    COLUMNS.map((c) => c.header),
    // row 2–6: 5 列預填指標
    ...INDICATORS.map((indicator) =>
      Object.assign(emptyRow(), { 0: indicator }) as string[]
    ),
  ];

  // config
  const columnlen: Record<string, number> = {};
  COLUMNS.forEach((c, i) => (columnlen[String(i)] = c.width));

  const rowlen: Record<string, number> = { "0": 26, "1": 26 };
  for (let r = 2; r < 2 + numDataRows; r++) rowlen[String(r)] = 30;

  const merge = {
    "0_0": { r: 0, c: 0, rs: 1, cs: numCols },
  };

  // cellStyles（對齊「品質指標監測分析報告表」風格）
  const cellStyles: Record<string, CellStyle> = {};

  // row 0 標題列：置中
  cellStyles["0_0"] = { ht: 0, vt: 0 };

  // row 1 欄頭：灰底 + 置中 + 自動換行
  for (let c = 0; c < numCols; c++) {
    cellStyles[`1_${c}`] = { bg: "#f3f3f3", ht: "0", vt: "0", tb: "2" };
  }

  // data rows：置中 + 自動換行
  for (let r = 2; r < 2 + numDataRows; r++) {
    for (let c = 0; c < numCols; c++) {
      cellStyles[`${r}_${c}`] = { ht: "0", vt: "0", tb: "2" };
    }
  }

  return { name: NEW_SHEET_NAME, data, config: { columnlen, rowlen, merge }, cellStyles };
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL not set");
    process.exit(1);
  }

  const args = process.argv.slice(2);
  const isApply    = args.includes("--apply");
  const isRollback = args.includes("--rollback");
  const isDryRun   = !isApply && !isRollback;

  if (isDryRun)    console.log("\n🔍 Dry-run 模式（只列出將追加什麼，不寫 DB）。加上 --apply 才真正寫入。\n");
  if (isApply)     console.log("\n🚀 Apply 模式：將追加分頁寫入 DB。\n");
  if (isRollback)  console.log("\n⏪ Rollback 模式：移除最後一頁（如名稱符合）。\n");

  const sql = postgres(getDbUrl(), { max: 1 });
  const db = drizzle(sql);

  try {
    const [template] = await db
      .select()
      .from(reportTemplates)
      .where(eq(reportTemplates.id, TEMPLATE_ID));

    if (!template) {
      console.error(`❌ 找不到範本 ID ${TEMPLATE_ID}`);
      process.exit(1);
    }

    console.log(`📄 範本：${template.title}（ID: ${template.id}）`);
    console.log(`   facilityType: ${template.facilityType}`);

    const existingSheets: SheetData[] = template.content
      ? JSON.parse(template.content)
      : [];

    console.log(`\n📋 目前分頁（共 ${existingSheets.length} 張）：${existingSheets.map((s) => s.name).join("、")}`);

    // ── Rollback 路徑 ────────────────────────────────────────────────────────
    if (isRollback) {
      const last = existingSheets[existingSheets.length - 1];
      if (!last || last.name !== NEW_SHEET_NAME) {
        console.log(`\n⚠️  最後一頁不是「${NEW_SHEET_NAME}」（實際：「${last?.name}」），放棄 rollback。`);
        return;
      }

      const trimmed = existingSheets.slice(0, -1);
      const newContent = JSON.stringify(trimmed);

      await db.transaction(async (tx) => {
        const existingLinks = await tx
          .select({ name: templateLinks.name, url: templateLinks.url, sortOrder: templateLinks.sortOrder })
          .from(templateLinks)
          .where(eq(templateLinks.templateId, TEMPLATE_ID))
          .orderBy(asc(templateLinks.sortOrder));

        const existingTagRows = await tx
          .select({ name: templateTags.name })
          .from(templateTagReports)
          .innerJoin(templateTags, eq(templateTagReports.templateTagId, templateTags.id))
          .where(eq(templateTagReports.reportTemplateId, TEMPLATE_ID));

        const latestRevisions = await tx
          .select({ id: templateRevisions.id, versionNumber: templateRevisions.versionNumber })
          .from(templateRevisions)
          .where(eq(templateRevisions.templateId, TEMPLATE_ID))
          .orderBy(desc(templateRevisions.versionNumber));

        const nextVersion = (latestRevisions[0]?.versionNumber ?? 0) + 1;

        await tx.insert(templateRevisions).values({
          templateId: TEMPLATE_ID,
          userId: SEED_USER_ID,
          title: template.title,
          content: template.content,
          fileType: template.fileType ?? "excel",
          responsible: template.responsible,
          links: JSON.stringify(existingLinks),
          tags: JSON.stringify(existingTagRows.map((r) => r.name)),
          versionNumber: nextVersion,
        });

        if (latestRevisions.length + 1 > MAX_REVISIONS) {
          const idsToDelete = latestRevisions.slice(MAX_REVISIONS - 1).map((r) => r.id);
          await tx.delete(templateRevisions).where(inArray(templateRevisions.id, idsToDelete));
        }

        await tx
          .update(reportTemplates)
          .set({ content: newContent, updatedAt: new Date() })
          .where(eq(reportTemplates.id, TEMPLATE_ID));
      });

      console.log(`\n✅ 已移除最後一頁「${NEW_SHEET_NAME}」`);
      console.log(`   更新後分頁（共 ${trimmed.length} 張）：${trimmed.map((s) => s.name).join("、")}`);
      return;
    }

    // ── Apply / Dry-run 路徑 ─────────────────────────────────────────────────
    if (existingSheets.some((s) => s.name === NEW_SHEET_NAME)) {
      console.log(`\n✨ 分頁「${NEW_SHEET_NAME}」已存在，無需追加。`);
      return;
    }

    const newSheet = buildPdcaSheet();
    console.log(`\n📌 將追加分頁：「${newSheet.name}」`);
    console.log(`   欄位（${COLUMNS.length} 欄）：${COLUMNS.map((c) => c.header).join(" | ")}`);
    console.log(`   預填 ${INDICATORS.length} 列：${INDICATORS.join("、")}`);

    if (isDryRun) {
      console.log("\n（dry-run，未寫入 DB）");
      console.log("新分頁 JSON（前 600 chars）：\n" + JSON.stringify(newSheet).slice(0, 600) + "...");
      console.log("\n💡 確認無誤後，加 --apply 執行實際寫入");
      return;
    }

    const merged = [...existingSheets, newSheet];
    const newContent = JSON.stringify(merged);

    let savedVersion = 0;

    await db.transaction(async (tx) => {
      const existingLinks = await tx
        .select({ name: templateLinks.name, url: templateLinks.url, sortOrder: templateLinks.sortOrder })
        .from(templateLinks)
        .where(eq(templateLinks.templateId, TEMPLATE_ID))
        .orderBy(asc(templateLinks.sortOrder));

      const existingTagRows = await tx
        .select({ name: templateTags.name })
        .from(templateTagReports)
        .innerJoin(templateTags, eq(templateTagReports.templateTagId, templateTags.id))
        .where(eq(templateTagReports.reportTemplateId, TEMPLATE_ID));

      const latestRevisions = await tx
        .select({ id: templateRevisions.id, versionNumber: templateRevisions.versionNumber })
        .from(templateRevisions)
        .where(eq(templateRevisions.templateId, TEMPLATE_ID))
        .orderBy(desc(templateRevisions.versionNumber));

      const nextVersion = (latestRevisions[0]?.versionNumber ?? 0) + 1;
      savedVersion = nextVersion;

      await tx.insert(templateRevisions).values({
        templateId: TEMPLATE_ID,
        userId: SEED_USER_ID,
        title: template.title,
        content: template.content,
        fileType: template.fileType ?? "excel",
        responsible: template.responsible,
        links: JSON.stringify(existingLinks),
        tags: JSON.stringify(existingTagRows.map((r) => r.name)),
        versionNumber: nextVersion,
      });

      if (latestRevisions.length + 1 > MAX_REVISIONS) {
        const idsToDelete = latestRevisions.slice(MAX_REVISIONS - 1).map((r) => r.id);
        await tx.delete(templateRevisions).where(inArray(templateRevisions.id, idsToDelete));
      }

      await tx
        .update(reportTemplates)
        .set({ content: newContent, updatedAt: new Date() })
        .where(eq(reportTemplates.id, TEMPLATE_ID));
    });

    console.log(`\n✅ 已成功追加分頁「${NEW_SHEET_NAME}」`);
    console.log(`   更新後分頁（共 ${merged.length} 張）：${merged.map((s) => s.name).join("、")}`);
    console.log(`   舊版已備份到 template_revisions（v${savedVersion}，最多保留 ${MAX_REVISIONS} 筆）`);
  } finally {
    await sql.end();
  }
}

main().catch((err) => {
  console.error("❌ 未預期錯誤：", err);
  process.exit(1);
});
