/**
 * 將「肖像權意願書」與「個人資料授權同意書」兩個附件分頁
 * Append 到日照項目 4「個人資料管理與保密性」範本末端。
 *
 * - 不重建查核表，僅追加新分頁，保留現有 content。
 * - 冪等：分頁名已存在時跳過，可重複執行。
 * - 舊版 content 自動備份到 template_revisions（最多保留 5 筆）。
 *
 * Run:
 *   npx dotenv-cli -e .env.local -- tsx scripts/seed-daycare-item4-attachments.ts
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
import { getCustomSheets } from "../lib/supplementary-sheets/custom-sheet-builders";
import { daycareProfile } from "../lib/ai/evaluation-profiles/daycare";
import type { SheetData } from "../lib/excel-template-builder";

const TARGET_ITEM_ID = 4;
const MAX_REVISIONS = 5;
const SEED_SCRIPT_USER_ID = "seed-script-item4-attachments";

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL not set");
    process.exit(1);
  }

  const sql = postgres(getDbUrl(), { max: 1 });
  const db = drizzle(sql);

  try {
    // 1. 找到項目 4 的 profile 資料
    const item = daycareProfile.sections
      .flatMap((s) => s.items)
      .find((i) => i.id === TARGET_ITEM_ID);
    if (!item) {
      console.error(`❌ 找不到 daycare 項目 ${TARGET_ITEM_ID}`);
      process.exit(1);
    }

    // 2. 取得要追加的客製分頁
    const newSheets = getCustomSheets(daycareProfile.id, TARGET_ITEM_ID);
    if (newSheets.length === 0) {
      console.error(`❌ getCustomSheets 回傳空陣列，請確認 custom-sheet-builders 已正確註冊`);
      process.exit(1);
    }

    // 3. 找到 DB 中的範本列
    const title = `${item.id} ${item.title}`;
    const existingList = await db
      .select()
      .from(reportTemplates)
      .where(
        and(
          eq(reportTemplates.facilityType, daycareProfile.id),
          eq(reportTemplates.title, title),
        ),
      );
    if (existingList.length === 0) {
      console.error(`❌ DB 中找不到範本：${title}`);
      process.exit(1);
    }
    if (existingList.length > 1) {
      console.error(`❌ DB 中有 ${existingList.length} 筆重複範本：${title}，停止執行`);
      process.exit(1);
    }
    const existing = existingList[0];

    // 4. 解析現有分頁，判斷哪些需要追加（冪等）
    const existingSheets: SheetData[] = existing.content ? JSON.parse(existing.content) : [];
    const existingNames = new Set(existingSheets.map((s) => s.name));
    const sheetsToAppend = newSheets.filter((s) => !existingNames.has(s.name));

    if (sheetsToAppend.length === 0) {
      console.log(`✨ 附件分頁已全部存在，無需 append：${title}`);
      console.log(`   現有分頁：${existingSheets.map((s) => s.name).join("、")}`);
      await sql.end();
      return;
    }

    const merged = [...existingSheets, ...sheetsToAppend];
    const newContent = serializeSheetData(merged);

    // 5. 備份目前內容到 template_revisions（保留最多 5 筆）
    await db.transaction(async (tx) => {
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

      const allRevisions = await tx
        .select({ id: templateRevisions.id })
        .from(templateRevisions)
        .where(eq(templateRevisions.templateId, existing.id))
        .orderBy(desc(templateRevisions.versionNumber));
      if (allRevisions.length > MAX_REVISIONS) {
        const idsToDelete = allRevisions.slice(MAX_REVISIONS).map((rev) => rev.id);
        await tx.delete(templateRevisions).where(inArray(templateRevisions.id, idsToDelete));
      }

      await tx
        .update(reportTemplates)
        .set({ content: newContent, updatedAt: new Date() })
        .where(eq(reportTemplates.id, existing.id));
    });

    console.log(`✅ 已更新 ${title}`);
    console.log(`   新增分頁（${sheetsToAppend.length} 張）：${sheetsToAppend.map((s) => s.name).join("、")}`);
    console.log(`   舊版已備份到 template_revisions (保留最多 ${MAX_REVISIONS} 筆)`);
    await sql.end();
  } catch (err) {
    console.error("❌ 失敗：", err);
    await sql.end();
    process.exit(1);
  }
}

main();
