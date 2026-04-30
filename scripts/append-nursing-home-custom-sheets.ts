/**
 * 將住宿型照顧機構評鑑項目的自訂補充分頁，
 * Append 到各項目對應範本的末端（保留原有內容不變）。
 *
 * - 冪等：分頁名已存在時跳過，可重複執行。
 * - 預設為 dry-run（只列出將追加什麼，不寫 DB）。
 * - 舊版 content 自動備份到 template_revisions（最多保留 5 筆）。
 *
 * Run (dry-run):
 *   npx dotenv-cli -e .env.local -- tsx scripts/append-nursing-home-custom-sheets.ts
 *
 * Run (write to DB):
 *   npx dotenv-cli -e .env.local -- tsx scripts/append-nursing-home-custom-sheets.ts --apply
 *
 * Run specific items only:
 *   npx dotenv-cli -e .env.local -- tsx scripts/append-nursing-home-custom-sheets.ts --apply --ids 56
 */
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { and, asc, desc, eq, inArray } from "drizzle-orm";
import {
  reportTemplates,
  templateLinks,
  templateRevisions,
  templateTagReports,
  templateTags,
} from "../db/schema";
import { getDbUrl } from "../db/index";
import { serializeSheetData } from "../lib/excel-template-builder";
import {
  getCustomSheets,
  listCustomSheetItemIds,
} from "../lib/supplementary-sheets/custom-sheet-builders";
import { nursingHomeProfile } from "../lib/ai/evaluation-profiles/nursing-home";
import type { SheetData } from "../lib/excel-template-builder";

const FACILITY_TYPE = "nursing-home";
const MAX_REVISIONS = 5;
const SEED_SCRIPT_USER_ID = "seed-script-nursing-home-custom-sheets";

// ─── CLI 解析 ────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const isDryRun = !args.includes("--apply");
const idsArg = args.find((a) => a.startsWith("--ids"));
const filterIds: number[] | null = idsArg
  ? idsArg.replace("--ids", "").replace(/[= ]/, "").split(",").map(Number)
  : null;

// ─── 取得目標項目 id 清單 ─────────────────────────────────────────────────────

const allItemIds = listCustomSheetItemIds(FACILITY_TYPE);
const targetItemIds = filterIds
  ? allItemIds.filter((id) => filterIds.includes(id))
  : allItemIds;

if (targetItemIds.length === 0) {
  console.error("❌ 找不到任何目標項目 id，請確認 --ids 參數或 custom-sheet-builders 是否已正確註冊");
  process.exit(1);
}

// ─── 主流程 ──────────────────────────────────────────────────────────────────

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

  const allItems = nursingHomeProfile.sections.flatMap((s) => s.items);

  let successCount = 0;
  let skippedCount = 0;
  let warningCount = 0;

  try {
    for (const itemId of targetItemIds) {
      const item = allItems.find((i) => i.id === itemId);
      if (!item) {
        console.warn(`⚠️  找不到 nursing-home 項目 ${itemId} 的 profile 資料，跳過`);
        warningCount++;
        continue;
      }

      const newSheets = getCustomSheets(FACILITY_TYPE, itemId);
      if (newSheets.length === 0) {
        console.warn(`⚠️  項目 ${itemId} 的 getCustomSheets 回傳空陣列，跳過`);
        warningCount++;
        continue;
      }

      const title = `${item.id} ${item.title}`;

      // 查詢 DB 中對應範本
      const existingList = await db
        .select()
        .from(reportTemplates)
        .where(
          and(
            eq(reportTemplates.facilityType, FACILITY_TYPE),
            eq(reportTemplates.title, title),
          ),
        );

      if (existingList.length === 0) {
        console.warn(`⚠️  DB 中找不到範本：${title}，跳過`);
        warningCount++;
        continue;
      }
      if (existingList.length > 1) {
        console.warn(`⚠️  DB 中有 ${existingList.length} 筆重複範本：${title}，跳過`);
        warningCount++;
        continue;
      }
      const existing = existingList[0];

      // 計算需要追加的分頁（冪等）
      const existingSheets: SheetData[] = existing.content ? JSON.parse(existing.content) : [];
      const existingNames = new Set(existingSheets.map((s) => s.name));
      const sheetsToAppend = newSheets.filter((s) => !existingNames.has(s.name));

      if (sheetsToAppend.length === 0) {
        console.log(`✨ ${title}：分頁已齊備，無需 append`);
        console.log(`   現有分頁（共 ${existingSheets.length} 張）：${existingSheets.map((s) => s.name).join("、")}`);
        skippedCount++;
        continue;
      }

      console.log(`📋 ${title}：將新增 ${sheetsToAppend.length} 張分頁：${sheetsToAppend.map((s) => s.name).join("、")}`);

      if (isDryRun) {
        console.log(`   （dry-run，未寫入 DB）`);
        continue;
      }

      // 真正寫入 DB
      const merged = [...existingSheets, ...sheetsToAppend];
      const newContent = serializeSheetData(merged);

      await db.transaction(async (tx) => {
        // 快照現有 links 與 tags
        const existingLinks = await tx
          .select({ name: templateLinks.name, url: templateLinks.url, sortOrder: templateLinks.sortOrder })
          .from(templateLinks)
          .where(eq(templateLinks.templateId, existing.id))
          .orderBy(asc(templateLinks.sortOrder));

        const existingTagRows = await tx
          .select({ name: templateTags.name })
          .from(templateTagReports)
          .innerJoin(templateTags, eq(templateTagReports.templateTagId, templateTags.id))
          .where(eq(templateTagReports.reportTemplateId, existing.id));

        // 備份到 template_revisions
        const latest = await tx
          .select({ versionNumber: templateRevisions.versionNumber })
          .from(templateRevisions)
          .where(eq(templateRevisions.templateId, existing.id))
          .orderBy(desc(templateRevisions.versionNumber))
          .limit(1);
        const nextVersion = (latest[0]?.versionNumber ?? 0) + 1;

        await tx.insert(templateRevisions).values({
          templateId: existing.id,
          userId: SEED_SCRIPT_USER_ID,
          title: existing.title,
          content: existing.content,
          fileType: existing.fileType ?? "excel",
          responsible: existing.responsible,
          links: JSON.stringify(existingLinks),
          tags: JSON.stringify(existingTagRows.map((r) => r.name)),
          versionNumber: nextVersion,
        });

        // 裁剪舊 revision（最多保留 MAX_REVISIONS 筆）
        const allRevisions = await tx
          .select({ id: templateRevisions.id })
          .from(templateRevisions)
          .where(eq(templateRevisions.templateId, existing.id))
          .orderBy(desc(templateRevisions.versionNumber));
        if (allRevisions.length > MAX_REVISIONS) {
          const idsToDelete = allRevisions.slice(MAX_REVISIONS).map((rev) => rev.id);
          await tx.delete(templateRevisions).where(inArray(templateRevisions.id, idsToDelete));
        }

        // 更新 content
        await tx
          .update(reportTemplates)
          .set({ content: newContent, updatedAt: new Date() })
          .where(eq(reportTemplates.id, existing.id));
      });

      console.log(`✅ 已更新 ${title}`);
      console.log(`   舊版已備份到 template_revisions（保留最多 ${MAX_REVISIONS} 筆）`);
      successCount++;
    }

    console.log(`\n──────────────────────────────────────`);
    if (isDryRun) {
      console.log(`🔍 Dry-run 完成。加上 --apply 才真正寫入 DB。`);
    } else {
      console.log(`📊 結果：✅ 已更新 ${successCount} 個 | ✨ 已齊備 ${skippedCount} 個 | ⚠️  警告 ${warningCount} 個`);
    }
  } finally {
    await sql.end();
  }
}

main().catch((err) => {
  console.error("❌ 未預期錯誤：", err);
  process.exit(1);
});
