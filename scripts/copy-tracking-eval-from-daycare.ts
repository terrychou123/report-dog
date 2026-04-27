/**
 * 從 daycare 範本 45ce7719 的「追蹤評值及案例」分頁（富內容 JSON），
 * 以「[補] 追蹤評值及案例」名稱追加到以下 2 份目標範本：
 *   - home-care item 7「服務計畫執行與評值」
 *   - nursing-home item 17「B2. 個案服務計畫與評值及管理情形（二級加強）」
 *
 * 用法：
 *   npx dotenv-cli -e .env.local -- tsx scripts/copy-tracking-eval-from-daycare.ts
 *   npx dotenv-cli -e .env.local -- tsx scripts/copy-tracking-eval-from-daycare.ts --no-dry-run
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

const DAYCARE_SOURCE_ID = "45ce7719-a335-4c4d-ac47-fa59bd7f84cd";
const SOURCE_SHEET_NAME = "追蹤評值及案例";
const NEW_SHEET_NAME = "[補] 追蹤評值及案例";
const SCRIPT_USER_ID = "seed-script-copy-tracking-eval-from-daycare";
const MAX_REVISIONS = 5;

const TARGETS: Array<{ facility: string; itemId: number; titlePrefix: string }> = [
  { facility: "home-care",    itemId: 7,  titlePrefix: "7 " },
  { facility: "nursing-home", itemId: 17, titlePrefix: "17 " },
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

    // Step 2：對每份目標範本處理
    for (const target of TARGETS) {
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
        const hasNew = currentSheets.some((s) => s.name === NEW_SHEET_NAME);

        if (hasNew) {
          console.log(`  ✔️  [${template.title}] 已有「${NEW_SHEET_NAME}」，無需變更`);
          totalNoChange++;
          continue;
        }

        console.log(`  📄 ${template.title} → 追加「${NEW_SHEET_NAME}」`);

        if (isDryRun) {
          totalAppended++;
          continue;
        }

        // 深拷貝來源分頁並改名
        const newSheet: SheetData = {
          ...(JSON.parse(JSON.stringify(sourceSheet)) as SheetData),
          name: NEW_SHEET_NAME,
        };

        const mergedSheets = [...currentSheets, newSheet];
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
    console.log(`  ${isDryRun ? "[DRY-RUN] " : ""}追加分頁：${totalAppended}`);
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
