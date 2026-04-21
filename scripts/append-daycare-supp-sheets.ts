/**
 * Append-only 補強腳本：把 daycareDefs 中新增的 [補] 分頁追加到 DB 中對應的 daycare 範本。
 *
 * 演算法：
 *   sourceDefs  = getSupplementaryDefs('daycare', itemId)（讀 lib/supplementary-sheets/daycare.ts）
 *   missingDefs = sourceDefs 中 [補] 分頁的 sheetName 未出現在 DB content 的 sheets.name 者
 *   merged      = [...currentSheets, ...missingDefs.map(buildSupplementarySheetData)]
 *
 * 安全機制：
 *   執行前先把目前 DB content 備份到 template_revisions，以便回滾。
 *   若 missingDefs 為空，跳過該 template（不觸發快照）。
 *   既有分頁（含手動編輯的非 [補] 分頁）完全不動。
 *
 * Dry-run 模式（預設開啟，加 --no-dry-run 才真正寫入）：
 *   只列出每個 template 會被 append 的 [補] 分頁清單，不寫入任何資料。
 *
 * 用法：
 *   npx dotenv-cli -e .env.local -- tsx scripts/append-daycare-supp-sheets.ts
 *   npx dotenv-cli -e .env.local -- tsx scripts/append-daycare-supp-sheets.ts --no-dry-run
 *
 * 選項：
 *   --ids <id1,id2,...>   只處理指定 templateId（逗號分隔），預設處理全部 daycare 範本
 *   --no-dry-run          實際寫入 DB
 */
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { desc, eq, inArray } from "drizzle-orm";
import { reportTemplates, templateRevisions } from "../db/schema";
import { getDbUrl } from "../db/index";
import { getSupplementaryDefs } from "../lib/supplementary-sheets";
import {
  buildSupplementarySheetData,
  truncateSheetName,
} from "../lib/excel-template-builder";
import type { SupplementarySheetDef } from "../lib/supplementary-sheets";

const SCRIPT_USER_ID = "seed-script-append-supp-sheets";
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
const targetIds = idsArg
  ? idsArg.split(",").map((s) => s.trim()).filter(Boolean)
  : null;

// ─── Helpers ────────────────────────────────────────────────────────────────

type SheetData = { name: string; [key: string]: unknown };

function parseSheets(content: string | null): SheetData[] {
  if (!content) return [];
  try {
    return JSON.parse(content) as SheetData[];
  } catch {
    return [];
  }
}

/** 從 title 前綴數字（如 "10 開案/收案..."）解析出 itemId。 */
function parseItemId(title: string): number | null {
  const m = title.match(/^(\d+)\s/);
  return m ? Number(m[1]) : null;
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  const connectionString = getDbUrl();
  const client = postgres(connectionString);
  const db = drizzle(client);

  try {
    console.log(
      isDryRun
        ? "\n🔍 DRY-RUN 模式（只預覽，不寫入）\n"
        : "\n✏️  WRITE 模式（將實際寫入 DB）\n"
    );

    // 撈出所有 daycare 範本（或指定 ids 的子集）
    const rows = await db
      .select({
        id: reportTemplates.id,
        title: reportTemplates.title,
        content: reportTemplates.content,
      })
      .from(reportTemplates)
      .where(eq(reportTemplates.facilityType, "daycare"));

    const templates = targetIds
      ? rows.filter((r) => targetIds.includes(r.id))
      : rows;

    console.log(`共 ${templates.length} 個 daycare 範本待檢查\n`);

    let appended = 0, noChange = 0, skipped = 0;
    let totalSheetsAdded = 0;

    for (const template of templates) {
      const itemId = parseItemId(template.title);
      if (!itemId) {
        console.log(`  ⚠️  [${template.title}] — 無法解析 itemId，跳過`);
        skipped++;
        continue;
      }

      const sourceDefs = getSupplementaryDefs("daycare", itemId);
      if (sourceDefs.length === 0) {
        // 此 item 在 daycareDefs 中無 [補] 定義，不需處理
        noChange++;
        continue;
      }

      const currentSheets = parseSheets(template.content);
      const currentNames = new Set(currentSheets.map((s) => s.name));

      // 找出 source 中有、DB 中沒有的 [補] 分頁定義
      const missingDefs: SupplementarySheetDef[] = sourceDefs.filter(
        (def) =>
          def.sheetName.startsWith("[補]") &&
          !currentNames.has(truncateSheetName(def.sheetName))
      );

      if (missingDefs.length === 0) {
        noChange++;
        continue;
      }

      const missingNames = missingDefs.map((d) => truncateSheetName(d.sheetName));
      console.log(
        `  📄 ${template.title} → +${missingDefs.length} 張 [補]：${missingNames.join(", ")}`
      );
      totalSheetsAdded += missingDefs.length;

      if (isDryRun) {
        appended++;
        continue;
      }

      // 寫入模式：snapshot 目前內容後 append 缺少的 [補] 分頁
      const newSheets = missingDefs.map(buildSupplementarySheetData);
      const mergedSheets = [...currentSheets, ...newSheets];
      const mergedContent = JSON.stringify(mergedSheets);

      await db.transaction(async (tx) => {
        // 取得目前最新版本號，決定 snapshot 版本
        const allRevisions = await tx
          .select({ id: templateRevisions.id, versionNumber: templateRevisions.versionNumber })
          .from(templateRevisions)
          .where(eq(templateRevisions.templateId, template.id))
          .orderBy(desc(templateRevisions.versionNumber));

        const nextVersion = (allRevisions[0]?.versionNumber ?? 0) + 1;

        // 備份目前 DB content
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

        // 刪除超過上限的舊備份（MAX_REVISIONS = 5）
        const toDelete = allRevisions.slice(MAX_REVISIONS - 1).map((r) => r.id);
        if (toDelete.length > 0) {
          await tx.delete(templateRevisions).where(inArray(templateRevisions.id, toDelete));
        }

        // 寫入 append 後的 content
        await tx
          .update(reportTemplates)
          .set({ content: mergedContent, updatedAt: new Date() })
          .where(eq(reportTemplates.id, template.id));
      });

      console.log(`     ✅ 已寫入`);
      appended++;
    }

    console.log("\n📊 統計：");
    console.log(`  需追加 [補] 分頁的範本：${appended}`);
    console.log(`  無需變更的範本：${noChange}`);
    console.log(`  跳過（解析錯誤）：${skipped}`);
    console.log(`  ${isDryRun ? "[DRY-RUN] " : ""}共計新增 [補] 分頁：${totalSheetsAdded} 張`);

    if (isDryRun && appended > 0) {
      console.log("\n💡 確認以上預覽正確後，加 --no-dry-run 執行實際寫入");
    }
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error("❌ Failed:", err);
  process.exit(1);
});
