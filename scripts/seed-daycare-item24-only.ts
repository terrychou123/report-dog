/**
 * 僅針對日間照顧項目 24（工作手冊及行政規範）重新產生範本內容，
 * 其他項目完全不動。舊版內容會備份到 template_revisions（最多保留 5 筆）。
 *
 * Run:
 *   npx dotenv-cli -e .env.local -- tsx scripts/seed-daycare-item24-only.ts
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
import {
  buildItemMultiSheetData,
  serializeSheetData,
} from "../lib/excel-template-builder";
import { getSupplementaryDefs } from "../lib/supplementary-sheets/index";
import { getCustomSheets } from "../lib/supplementary-sheets/custom-sheet-builders";
import { getEvaluationTip } from "../lib/evaluation-tips/index";
import { daycareProfile } from "../lib/ai/evaluation-profiles/daycare";

const TARGET_ITEM_ID = 24;
const MAX_REVISIONS = 5;
const SEED_SCRIPT_USER_ID = "seed-script-item24";

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL not set");
    process.exit(1);
  }

  const sql = postgres(getDbUrl(), { max: 1 });
  const db = drizzle(sql);

  try {
    // 1. 找到項目 24 的 profile 資料
    const item = daycareProfile.sections
      .flatMap((s) => s.items)
      .find((i) => i.id === TARGET_ITEM_ID);
    if (!item) {
      console.error(`❌ 找不到 daycare 項目 ${TARGET_ITEM_ID}`);
      process.exit(1);
    }

    // 2. 產生新內容（含自訂 7 分頁）
    const supplementaryDefs = getSupplementaryDefs(daycareProfile.id, item.id);
    const customSheets = getCustomSheets(daycareProfile.id, item.id);
    const tip = getEvaluationTip(daycareProfile.id, item.id);
    const itemWithTip = tip ? { ...item, tip: tip.content } : item;
    const sheets = [
      ...buildItemMultiSheetData(itemWithTip, supplementaryDefs),
      ...customSheets,
    ];
    const newContent = serializeSheetData(sheets);

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

    if (existing.content === newContent) {
      console.log(`✨ 內容已是最新，無需更新：${title}`);
      await sql.end();
      return;
    }

    // 4. 備份目前內容到 template_revisions（保留最多 5 筆）
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
        const idsToDelete = allRevisions.slice(MAX_REVISIONS).map((r) => r.id);
        await tx.delete(templateRevisions).where(inArray(templateRevisions.id, idsToDelete));
      }

      // 5. 寫入新內容
      await tx
        .update(reportTemplates)
        .set({ content: newContent, updatedAt: new Date() })
        .where(eq(reportTemplates.id, existing.id));
    });

    const sheetCount = sheets.length;
    console.log(`✅ 已更新 ${title}`);
    console.log(`   範本分頁數：${sheetCount}（1 個檢核表 + ${sheetCount - 1} 個補充分頁）`);
    console.log(`   舊版已備份到 template_revisions（保留最多 ${MAX_REVISIONS} 筆）`);
    await sql.end();
  } catch (err) {
    console.error("❌ 失敗：", err);
    await sql.end();
    process.exit(1);
  }
}

main();
