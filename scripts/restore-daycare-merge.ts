/**
 * 合併式還原腳本：把「手動編輯的舊分頁」和「新增的 [補] 分頁」合併成最終 content。
 *
 * 演算法：
 *   baseSheets  = 最新的 template_revision（= seed --force 覆蓋前的版本）
 *   suppSheets  = 目前 DB content 中 name.startsWith('[補]') 的分頁
 *   merged      = [...baseSheets, ...suppSheets]  （[補] 已存在於 base 則略過）
 *
 * 安全機制：
 *   執行前先把目前 DB content（含 [補]）備份到 template_revisions，萬一合併結果不佳可回滾。
 *   若 merged === current content，跳過（不觸發多餘快照）。
 *
 * Dry-run 模式（預設開啟，加 --no-dry-run 才真正寫入）：
 *   只列出每個 templateId 的分頁合併預覽，不寫入任何資料。
 *
 * Run（先 dry-run 確認）：
 *   npx dotenv-cli -e .env.local -- tsx scripts/restore-daycare-merge.ts --ids <comma-list>
 *
 * Run（確認後正式寫入）：
 *   npx dotenv-cli -e .env.local -- tsx scripts/restore-daycare-merge.ts --ids <comma-list> --no-dry-run
 */
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { desc, eq, inArray } from "drizzle-orm";
import { reportTemplates, templateRevisions } from "../db/schema";
import { getDbUrl } from "../db/index";

const RESTORE_USER_ID = "seed-script-merge-restore";
const MAX_REVISIONS = 5;

// ─── CLI args ───────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const isDryRun = !args.includes("--no-dry-run");
const idsArg = (() => {
  const flagIndex = args.indexOf("--ids");
  if (flagIndex !== -1 && args[flagIndex + 1]) return args[flagIndex + 1];
  const eqFlag = args.find((a) => a.startsWith("--ids="));
  return eqFlag ? eqFlag.slice("--ids=".length) : null;
})();
if (!idsArg) {
  console.error("❌ 必須傳入 --ids <comma-list-of-templateId>");
  process.exit(1);
}
const targetIds = idsArg.split(",").map((s) => s.trim()).filter(Boolean);
if (targetIds.length === 0) {
  console.error("❌ --ids 清單為空");
  process.exit(1);
}

type SheetData = { name: string; [key: string]: unknown };

function parseSheets(content: string | null): SheetData[] {
  if (!content) return [];
  try {
    return JSON.parse(content) as SheetData[];
  } catch {
    return [];
  }
}

function mergeSheets(base: SheetData[], current: SheetData[]): SheetData[] {
  // 篩出 [補] 分頁
  const suppSheets = current.filter((s) => s.name.startsWith("[補]"));
  // 已在 base 裡的 [補] 分頁名稱
  const baseNames = new Set(base.map((s) => s.name));
  // 去重：base 優先，base 裡沒有的 [補] 才追加
  const toAppend = suppSheets.filter((s) => !baseNames.has(s.name));
  return [...base, ...toAppend];
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  const connectionString = getDbUrl();
  const client = postgres(connectionString);
  const db = drizzle(client);

  try {
    console.log(isDryRun
      ? "\n🔍 DRY-RUN 模式（只預覽，不寫入）\n"
      : "\n✏️  WRITE 模式（將實際寫入 DB）\n"
    );
    console.log(`處理 ${targetIds.length} 個 templateId...\n`);

    let skipped = 0, merged = 0, noChange = 0;

    for (const templateId of targetIds) {
      // 讀取目前 DB content
      const [template] = await db
        .select({ id: reportTemplates.id, title: reportTemplates.title, content: reportTemplates.content })
        .from(reportTemplates)
        .where(eq(reportTemplates.id, templateId));

      if (!template) {
        console.log(`  ⚠️  ${templateId} — 找不到範本，跳過`);
        skipped++;
        continue;
      }

      // 讀取最新的 revision（= seed 覆蓋前的版本）
      const [latestRevision] = await db
        .select({ id: templateRevisions.id, versionNumber: templateRevisions.versionNumber, content: templateRevisions.content })
        .from(templateRevisions)
        .where(eq(templateRevisions.templateId, templateId))
        .orderBy(desc(templateRevisions.versionNumber))
        .limit(1);

      if (!latestRevision) {
        console.log(`  ⚠️  ${template.title} — 無任何備份版本，跳過（目前 DB 內容不動）`);
        skipped++;
        continue;
      }

      const currentSheets = parseSheets(template.content);
      const baseSheets = parseSheets(latestRevision.content);
      const mergedSheets = mergeSheets(baseSheets, currentSheets);
      const mergedContent = JSON.stringify(mergedSheets);

      // 統計分頁差異
      const suppInCurrent = currentSheets.filter((s) => s.name.startsWith("[補]")).length;
      const suppInBase = baseSheets.filter((s) => s.name.startsWith("[補]")).length;
      const baseNonSupp = baseSheets.filter((s) => !s.name.startsWith("[補]")).length;
      const currentNonSupp = currentSheets.filter((s) => !s.name.startsWith("[補]")).length;

      if (mergedContent === template.content) {
        console.log(`  ✅ ${template.title} — 合併後與現在相同，跳過`);
        noChange++;
        continue;
      }

      // 計算「目前 DB 有、但合併後會消失」的非 [補] 分頁
      const mergedNames = new Set(mergedSheets.map((s) => s.name));
      const droppedSheets = currentSheets.filter((s) => !s.name.startsWith("[補]") && !mergedNames.has(s.name));

      console.log(`  📄 ${template.title}`);
      console.log(`     revision v${latestRevision.versionNumber}: ${baseSheets.length} 分頁（${baseNonSupp} 一般 + ${suppInBase} [補]）`);
      console.log(`     目前 DB:  ${currentSheets.length} 分頁（${currentNonSupp} 一般 + ${suppInCurrent} [補]）`);
      console.log(`     合併後:   ${mergedSheets.length} 分頁（${baseNonSupp} 一般 + ${suppInCurrent} [補]）`);
      console.log(`     分頁清單: ${mergedSheets.map((s) => s.name).join(" / ")}`);
      if (droppedSheets.length > 0) {
        console.log(`     ⚠️  以下分頁只在「目前 DB（seed 覆蓋後）」存在，合併後不保留：`);
        droppedSheets.forEach((s) => console.log(`        - ${s.name}`));
        console.log(`        → 若需保留，請在還原後手動到 /admin 新增這些分頁`);
      }

      if (isDryRun) {
        console.log("     [dry-run 略過寫入]\n");
        merged++;
        continue;
      }

      // 寫入模式：先備份目前 DB content
      await db.transaction(async (tx) => {
        // 讀取最新版本號
        const allRevisions = await tx
          .select({ id: templateRevisions.id, versionNumber: templateRevisions.versionNumber })
          .from(templateRevisions)
          .where(eq(templateRevisions.templateId, templateId))
          .orderBy(desc(templateRevisions.versionNumber));

        const nextVersion = (allRevisions[0]?.versionNumber ?? 0) + 1;

        // 先備份目前 DB content（含 [補]）到 template_revisions
        await tx.insert(templateRevisions).values({
          templateId,
          userId: RESTORE_USER_ID,
          title: template.title,
          content: template.content,
          fileType: "excel",
          responsible: null,
          links: "[]",
          tags: "[]",
          versionNumber: nextVersion,
        });

        // 刪除超過上限的舊版本
        const toDelete = allRevisions.slice(MAX_REVISIONS - 1).map((r) => r.id);
        if (toDelete.length > 0) {
          await tx.delete(templateRevisions).where(inArray(templateRevisions.id, toDelete));
        }

        // 寫入合併後的 content
        await tx.update(reportTemplates)
          .set({ content: mergedContent, updatedAt: new Date() })
          .where(eq(reportTemplates.id, templateId));
      });

      console.log(`     ✅ 已合併寫入（舊 [補] 版本備份為 v${latestRevision.versionNumber + 1}）\n`);
      merged++;
    }

    console.log("\n📊 統計：");
    console.log(`  合併：${merged}`);
    console.log(`  無需變更：${noChange}`);
    console.log(`  跳過：${skipped}`);
    if (isDryRun && merged > 0) {
      console.log("\n💡 確認合併結果正確後，加 --no-dry-run 執行實際寫入");
    }
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error("❌ Failed:", err);
  process.exit(1);
});
