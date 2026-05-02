/**
 * 將 daycare item 12「協助服藥」的所有非檢核表工作頁，
 * 以新增工作分頁的方式追加到 nursing-home item 19「B10 處方藥品管理」報告範本。
 *
 * 排除邏輯：名稱為「檢核表」的主檢核表不複製（由生成器自動產生）。
 * 衝突保護：若目標範本已有同名分頁則跳過並警告，不覆寫。
 *
 * 用法：
 *   npx dotenv-cli -e .env.local -- tsx scripts/copy-daycare-item12-sheets-to-nursing-home-b10.ts
 *   npx dotenv-cli -e .env.local -- tsx scripts/copy-daycare-item12-sheets-to-nursing-home-b10.ts --no-dry-run
 *
 * 選項：
 *   --no-dry-run   實際寫入 DB（預設 dry-run）
 */
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { desc, eq, inArray } from "drizzle-orm";
import { reportTemplates, templateRevisions } from "../db/schema";
import { getDbUrl } from "../db/index";

const SOURCE = { facility: "daycare",      titlePrefix: "12 " };  // 12 協助服藥
const TARGET = { facility: "nursing-home", titlePrefix: "19 " };  // 19 B10 處方藥品管理
const EXCLUDE_SHEET_NAME = "檢核表";  // lib/excel-template-builder.ts:136 自動產生的主檢核表
const SCRIPT_USER_ID = "seed-script-copy-daycare12-to-nursing19";
const MAX_REVISIONS = 5;

// ─── CLI args ────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const isDryRun = !args.includes("--no-dry-run");

// ─── Helpers ─────────────────────────────────────────────────────────────────

type SheetData = { name: string; [key: string]: unknown };

function parseSheets(content: string | null): SheetData[] {
  if (!content) return [];
  try {
    return JSON.parse(content) as SheetData[];
  } catch {
    return [];
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const client = postgres(getDbUrl());
  const db = drizzle(client);

  try {
    console.log(isDryRun
      ? "\n🔍 DRY-RUN 模式（只預覽，不寫入）\n"
      : "\n✏️  WRITE 模式（將實際寫入 DB）\n"
    );

    // Step 1：讀取 daycare item 12 來源範本
    const sourceRows = await db
      .select({ id: reportTemplates.id, title: reportTemplates.title, content: reportTemplates.content })
      .from(reportTemplates)
      .where(eq(reportTemplates.facilityType, SOURCE.facility));

    const sourceTemplates = sourceRows.filter((r) => r.title.startsWith(SOURCE.titlePrefix));

    if (sourceTemplates.length === 0) {
      console.error(`❌ 找不到 ${SOURCE.facility} 範本（title 前綴：「${SOURCE.titlePrefix}」）`);
      process.exit(1);
    }
    if (sourceTemplates.length > 1) {
      console.warn(`⚠️  找到多份符合的來源範本（${sourceTemplates.map((r) => r.title).join(", ")}），使用第一份`);
    }

    const sourceTemplate = sourceTemplates[0];
    const allSourceSheets = parseSheets(sourceTemplate.content);
    const sheetsToAppend = allSourceSheets.filter((s) => s.name !== EXCLUDE_SHEET_NAME);

    console.log(`✅ 來源範本：「${sourceTemplate.title}」（共 ${allSourceSheets.length} 個工作頁）`);
    console.log(`   排除「${EXCLUDE_SHEET_NAME}」後，待複製 ${sheetsToAppend.length} 個工作頁：`);
    sheetsToAppend.forEach((s) => console.log(`   - ${s.name}`));

    if (sheetsToAppend.length === 0) {
      console.log("\n⚠️  沒有工作頁需要複製，結束。");
      return;
    }

    // Step 2：讀取 nursing-home item 19 目標範本
    const targetRows = await db
      .select({ id: reportTemplates.id, title: reportTemplates.title, content: reportTemplates.content, responsible: reportTemplates.responsible })
      .from(reportTemplates)
      .where(eq(reportTemplates.facilityType, TARGET.facility));

    const targetTemplates = targetRows.filter((r) => r.title.startsWith(TARGET.titlePrefix));

    if (targetTemplates.length === 0) {
      console.error(`\n❌ 找不到 ${TARGET.facility} 範本（title 前綴：「${TARGET.titlePrefix}」）`);
      process.exit(1);
    }

    console.log(`\n✅ 目標範本（共 ${targetTemplates.length} 份）：\n`);

    let totalAppended = 0;
    let totalSkipped = 0;
    let totalNoChange = 0;

    for (const target of targetTemplates) {
      const currentSheets = parseSheets(target.content);
      const existingNames = new Set(currentSheets.map((s) => s.name));

      const toAdd: SheetData[] = [];
      const skipped: string[] = [];

      for (const sheet of sheetsToAppend) {
        if (existingNames.has(sheet.name)) {
          skipped.push(sheet.name);
        } else {
          toAdd.push(sheet);
        }
      }

      if (toAdd.length === 0) {
        console.log(`  ✔️  [${target.title}] 所有分頁已存在，無需變更`);
        totalNoChange++;
        continue;
      }

      console.log(`  📄 ${target.title}`);
      console.log(`     追加（${toAdd.length}）：${toAdd.map((s) => s.name).join("、")}`);
      if (skipped.length > 0) {
        console.log(`     跳過-已存在（${skipped.length}）：${skipped.join("、")}`);
        totalSkipped += skipped.length;
      }

      if (isDryRun) {
        totalAppended += toAdd.length;
        continue;
      }

      // 深拷貝後追加
      const newSheets = toAdd.map((s) => JSON.parse(JSON.stringify(s)) as SheetData);
      const mergedSheets = [...currentSheets, ...newSheets];
      const mergedContent = JSON.stringify(mergedSheets);

      await db.transaction(async (tx) => {
        // 快照目前內容
        const allRevisions = await tx
          .select({ id: templateRevisions.id, versionNumber: templateRevisions.versionNumber })
          .from(templateRevisions)
          .where(eq(templateRevisions.templateId, target.id))
          .orderBy(desc(templateRevisions.versionNumber));

        const nextVersion = (allRevisions[0]?.versionNumber ?? 0) + 1;

        await tx.insert(templateRevisions).values({
          templateId: target.id,
          userId: SCRIPT_USER_ID,
          title: target.title,
          content: target.content,
          fileType: "excel",
          responsible: target.responsible ?? null,
          links: "[]",
          tags: "[]",
          versionNumber: nextVersion,
        });

        // 保留最多 MAX_REVISIONS 份快照
        const toDelete = allRevisions.slice(MAX_REVISIONS - 1).map((r) => r.id);
        if (toDelete.length > 0) {
          await tx.delete(templateRevisions).where(inArray(templateRevisions.id, toDelete));
        }

        await tx
          .update(reportTemplates)
          .set({ content: mergedContent, updatedAt: new Date() })
          .where(eq(reportTemplates.id, target.id));
      });

      console.log(`     ✅ 已寫入（${mergedSheets.length} 個工作頁）`);
      totalAppended += toAdd.length;
    }

    console.log("\n════════ 總計 ════════");
    if (isDryRun) {
      console.log(`  [DRY-RUN] 待追加分頁：${totalAppended}`);
      console.log(`  [DRY-RUN] 跳過（已存在）：${totalSkipped}`);
      console.log(`  [DRY-RUN] 無需變更：${totalNoChange}`);
    } else {
      console.log(`  已追加分頁：${totalAppended}`);
      console.log(`  跳過（已存在）：${totalSkipped}`);
      console.log(`  無需變更：${totalNoChange}`);
    }

    if (isDryRun && totalAppended > 0) {
      console.log("\n💡 確認無誤後，加 --no-dry-run 執行實際寫入");
    }
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error("❌ Failed:", err);
  process.exit(1);
});
