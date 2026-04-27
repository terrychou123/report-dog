/**
 * 從 daycare 範本 a788d8ff 的「個別化照顧計劃書」分頁（富內容 JSON），
 * 清除前一輪寫入的空白 `[補] 個別照顧計畫書(ICP)` 分頁，
 * 並以 `[補] 個別化照顧計劃書` 名稱追加到 10 份目標範本。
 *
 * 用法：
 *   npx dotenv-cli -e .env.local -- tsx scripts/copy-icp-sheet-from-daycare.ts
 *   npx dotenv-cli -e .env.local -- tsx scripts/copy-icp-sheet-from-daycare.ts --no-dry-run
 *
 * 選項：
 *   --no-dry-run   實際寫入 DB（預設 dry-run）
 *   --ids <...>    逗號分隔 templateId，僅處理指定範本
 */
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { desc, eq, inArray } from "drizzle-orm";
import { reportTemplates, templateRevisions } from "../db/schema";
import { getDbUrl } from "../db/index";

const DAYCARE_SOURCE_ID = "a788d8ff-4af0-4ef5-9b5c-1c82c5a290a0";
const SOURCE_SHEET_NAME = "個別化照顧計劃書";
const OLD_SHEET_NAME = "[補] 個別照顧計畫書(ICP)";
const NEW_SHEET_NAME = "[補] 個別化照顧計劃書";
const SCRIPT_USER_ID = "seed-script-copy-icp-from-daycare";
const MAX_REVISIONS = 5;

// 10 份目標範本（facility → itemId）
const TARGETS: Array<{ facility: string; itemId: number; titlePrefix: string }> = [
  { facility: "home-care",                         itemId: 6,  titlePrefix: "6 " },
  { facility: "nursing-home",                      itemId: 17, titlePrefix: "17 " },
  { facility: "general-nursing-home",              itemId: 6,  titlePrefix: "6 " },
  { facility: "elderly-welfare",                   itemId: 17, titlePrefix: "17 " },
  { facility: "disability-welfare",                itemId: 32, titlePrefix: "32 " },
  { facility: "home-nursing",                      itemId: 7,  titlePrefix: "7 " },
  { facility: "hospital",                          itemId: 51, titlePrefix: "51 " },
  { facility: "psychiatric-nursing-home",          itemId: 10, titlePrefix: "10 " },
  { facility: "psychiatric-rehabilitation-day",    itemId: 12, titlePrefix: "12 " },
  { facility: "psychiatric-rehabilitation-residential", itemId: 14, titlePrefix: "14 " },
];

// ─── CLI args ────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const isDryRun = !args.includes("--no-dry-run");

const idsArg = (() => {
  const i = args.indexOf("--ids");
  if (i !== -1 && args[i + 1]) return args[i + 1];
  const eq_ = args.find((a) => a.startsWith("--ids="));
  return eq_ ? eq_.slice("--ids=".length) : null;
})();
const targetIds = idsArg ? idsArg.split(",").map((s) => s.trim()).filter(Boolean) : null;

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

    // Step 1：讀取 daycare 來源分頁
    const [sourceRow] = await db
      .select({ content: reportTemplates.content })
      .from(reportTemplates)
      .where(eq(reportTemplates.id, DAYCARE_SOURCE_ID));

    if (!sourceRow) {
      console.error(`❌ 找不到 daycare 範本 ${DAYCARE_SOURCE_ID}`);
      process.exit(1);
    }

    const sourceSheets = parseSheets(sourceRow.content);
    const sourceSheet = sourceSheets.find((s) => s.name === SOURCE_SHEET_NAME);

    if (!sourceSheet) {
      console.error(`❌ 在 daycare 範本中找不到分頁「${SOURCE_SHEET_NAME}」`);
      console.log("現有分頁：", sourceSheets.map((s) => s.name).join(", "));
      process.exit(1);
    }

    console.log(`✅ 來源分頁「${SOURCE_SHEET_NAME}」確認，JSON ${JSON.stringify(sourceSheet).length} chars\n`);

    let totalAppended = 0;
    let totalNoChange = 0;
    let totalCleaned = 0;

    // Step 2：對每份目標範本處理
    for (const target of TARGETS) {
      // 找出符合 facility + titlePrefix 的範本
      const rows = await db
        .select({
          id: reportTemplates.id,
          title: reportTemplates.title,
          content: reportTemplates.content,
        })
        .from(reportTemplates)
        .where(eq(reportTemplates.facilityType, target.facility));

      const templates = rows.filter((r) =>
        r.title.startsWith(target.titlePrefix) &&
        (!targetIds || targetIds.includes(r.id))
      );

      if (templates.length === 0) {
        console.log(`⚠️  ${target.facility} item${target.itemId}：找不到符合範本，跳過`);
        totalNoChange++;
        continue;
      }

      for (const template of templates) {
        const currentSheets = parseSheets(template.content);
        const hasOld = currentSheets.some((s) => s.name === OLD_SHEET_NAME);
        const hasNew = currentSheets.some((s) => s.name === NEW_SHEET_NAME);

        if (hasNew && !hasOld) {
          // 已是最終狀態，無需變更
          console.log(`  ✔️  [${template.title}] 已有「${NEW_SHEET_NAME}」，無需變更`);
          totalNoChange++;
          continue;
        }

        // 計算異動說明
        const actions: string[] = [];
        if (hasOld) actions.push(`移除「${OLD_SHEET_NAME}」`);
        if (!hasNew) actions.push(`追加「${NEW_SHEET_NAME}」`);
        console.log(`  📄 ${template.title} → ${actions.join("、")}`);
        if (hasOld) totalCleaned++;

        if (isDryRun) {
          totalAppended++;
          continue;
        }

        // 深拷貝來源分頁並改名
        const newSheet: SheetData = {
          ...(JSON.parse(JSON.stringify(sourceSheet)) as SheetData),
          name: NEW_SHEET_NAME,
        };

        // 過濾掉舊分頁，再追加新分頁
        const mergedSheets = [
          ...currentSheets.filter((s) => s.name !== OLD_SHEET_NAME),
          newSheet,
        ];
        const mergedContent = JSON.stringify(mergedSheets);

        await db.transaction(async (tx) => {
          // Snapshot 目前內容
          const allRevisions = await tx
            .select({ id: templateRevisions.id, versionNumber: templateRevisions.versionNumber })
            .from(templateRevisions)
            .where(eq(templateRevisions.templateId, template.id))
            .orderBy(desc(templateRevisions.versionNumber));

          const nextVersion = (allRevisions[0]?.versionNumber ?? 0) + 1;

          await tx.insert(templateRevisions).values({
            templateId: template.id,
            userId: SCRIPT_USER_ID,
            title: template.title,
            content: template.content,
            fileType: "excel",
            responsible: null,
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
            .where(eq(reportTemplates.id, template.id));
        });

        console.log(`     ✅ 已寫入`);
        totalAppended++;
      }
    }

    console.log("\n════════ 總計 ════════");
    console.log(`  ${isDryRun ? "[DRY-RUN] " : ""}需處理範本：${totalAppended}`);
    console.log(`  清除舊空白分頁：${totalCleaned}`);
    console.log(`  無需變更：${totalNoChange}`);

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
