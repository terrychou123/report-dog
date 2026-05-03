/**
 * 將居家護理所「3 A3 居家訪視人員安全管理」的 2 個自訂補充分頁，
 * Append 到 UUID 8ccedc0b-5d8b-4f04-b4ba-384d3ea58a31 範本末端。
 *
 * - 冪等：分頁名已存在時跳過，可重複執行。
 * - 預設為 dry-run（只列出將追加什麼，不寫 DB）。
 * - 舊版 content 自動備份到 template_revisions（最多保留 5 筆）。
 *
 * Run (dry-run):
 *   npx dotenv-cli -e .env.local -- tsx scripts/append-home-nursing-item3-sheets.ts
 *
 * Run (write to DB):
 *   npx dotenv-cli -e .env.local -- tsx scripts/append-home-nursing-item3-sheets.ts --apply
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
import { serializeSheetData } from "../lib/excel-template-builder";
import { buildHomeNursingItem3CustomSheets } from "../lib/supplementary-sheets/home-nursing-item-3-custom";
import type { SheetData } from "../lib/excel-template-builder";

const TEMPLATE_ID = "8ccedc0b-5d8b-4f04-b4ba-384d3ea58a31";
const MAX_REVISIONS = 5;
const SEED_SCRIPT_USER_ID = "seed-script-home-nursing-item3-custom-sheets";

const isDryRun = !process.argv.slice(2).includes("--apply");

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL not set");
    process.exit(1);
  }

  if (isDryRun) {
    console.log("🔍 Dry-run 模式（只列出將追加什麼，不寫 DB）。加上 --apply 才真正寫入。\n");
  } else {
    console.log("🚀 Apply 模式：將追加分頁寫入 DB。\n");
  }

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

    const existingSheets: SheetData[] = template.content ? JSON.parse(template.content) : [];
    const existingNames = new Set(existingSheets.map((s) => s.name));

    console.log(`📋 目前分頁（共 ${existingSheets.length} 張）：${existingSheets.map((s) => s.name).join("、")}`);

    const newSheets = buildHomeNursingItem3CustomSheets();
    const sheetsToAppend = newSheets.filter((s) => !existingNames.has(s.name));

    if (sheetsToAppend.length === 0) {
      console.log("\n✨ 所有分頁均已存在，無需追加。");
      return;
    }

    console.log(`\n📌 將追加 ${sheetsToAppend.length} 張分頁：`);
    sheetsToAppend.forEach((s) => console.log(`   - ${s.name}`));

    if (isDryRun) {
      console.log("\n（dry-run，未寫入 DB）");
      return;
    }

    const merged = [...existingSheets, ...sheetsToAppend];
    const newContent = serializeSheetData(merged);

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
        userId: SEED_SCRIPT_USER_ID,
        title: template.title,
        content: template.content,
        fileType: template.fileType ?? "excel",
        responsible: template.responsible,
        links: JSON.stringify(existingLinks),
        tags: JSON.stringify(existingTagRows.map((row) => row.name)),
        versionNumber: nextVersion,
      });

      if (latestRevisions.length + 1 > MAX_REVISIONS) {
        const idsToDelete = latestRevisions.slice(MAX_REVISIONS - 1).map((rev) => rev.id);
        await tx.delete(templateRevisions).where(inArray(templateRevisions.id, idsToDelete));
      }

      await tx
        .update(reportTemplates)
        .set({ content: newContent, updatedAt: new Date() })
        .where(eq(reportTemplates.id, TEMPLATE_ID));
    });

    console.log(`\n✅ 已成功追加 ${sheetsToAppend.length} 張分頁`);
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
