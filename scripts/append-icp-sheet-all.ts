/**
 * Append-only 補強腳本（通用版）：把各機構 supplementary-sheets 中新增的
 * `[補]` 開頭分頁追加到 DB 中對應 facility 的 report_templates.content。
 *
 * 本次實際目的：將 daycare item 6 的「個別照顧計畫書(ICP)」複製到以下 10 種
 * 機構對應項目，以 `[補] 個別照顧計畫書(ICP)` 名稱新增（已在 lib/supplementary-sheets/*.ts 完成）：
 *   home-care (6)、nursing-home (17)、general-nursing-home (6)、
 *   elderly-welfare (18)、disability-welfare (32)、home-nursing (7)、
 *   hospital (51)、psychiatric-nursing-home (10)、
 *   psychiatric-rehabilitation-day (12)、psychiatric-rehabilitation-residential (14)
 *
 * 演算法（與 scripts/append-daycare-supp-sheets.ts 相同）：
 *   sourceDefs  = getSupplementaryDefs(facility, itemId)
 *   missingDefs = sourceDefs 中以「[補]」開頭、但 DB 範本 content 還沒有同名分頁者
 *   merged      = [...currentSheets, ...missingDefs.map(buildSupplementarySheetData)]
 *
 * 安全機制：
 *   - 執行前 snapshot 目前 content 到 template_revisions，以便回滾
 *   - 既有分頁（包含手動編輯的 [補] / 非 [補] 分頁）完全不動
 *   - 若 missingDefs 為空則 skip（不觸發 snapshot）
 *   - 預設 dry-run，加 --no-dry-run 才真正寫入
 *
 * 用法：
 *   npx dotenv-cli -e .env.local -- tsx scripts/append-icp-sheet-all.ts
 *   npx dotenv-cli -e .env.local -- tsx scripts/append-icp-sheet-all.ts --no-dry-run
 *
 * 選項：
 *   --facility <type>     只處理指定 facility type（未指定則處理全部 10 種）
 *   --ids <id1,id2,...>   只處理指定 templateId（逗號分隔）
 *   --only-icp            只追加 `[補] 個別照顧計畫書(ICP)` 單一分頁，
 *                         不連帶追加其他待補的 [補] 分頁（推薦本次使用）
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

const SCRIPT_USER_ID = "seed-script-append-icp-sheet-all";
const MAX_REVISIONS = 5;

// 預設處理的 10 種機構（與本次 lib/supplementary-sheets/*.ts 變更對應）
const DEFAULT_FACILITY_TYPES = [
  "home-care",
  "nursing-home",
  "general-nursing-home",
  "elderly-welfare",
  "disability-welfare",
  "home-nursing",
  "hospital",
  "psychiatric-nursing-home",
  "psychiatric-rehabilitation-day",
  "psychiatric-rehabilitation-residential",
];

// ─── CLI args ───────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const isDryRun = !args.includes("--no-dry-run");
const onlyIcp = args.includes("--only-icp");
const ICP_SHEET_NAME = "[補] 個別照顧計畫書(ICP)";

const facilityArg = (() => {
  const flagIndex = args.indexOf("--facility");
  if (flagIndex !== -1 && args[flagIndex + 1]) return args[flagIndex + 1];
  const eqFlag = args.find((a) => a.startsWith("--facility="));
  return eqFlag ? eqFlag.slice("--facility=".length) : null;
})();

const idsArg = (() => {
  const flagIndex = args.indexOf("--ids");
  if (flagIndex !== -1 && args[flagIndex + 1]) return args[flagIndex + 1];
  const eqFlag = args.find((a) => a.startsWith("--ids="));
  return eqFlag ? eqFlag.slice("--ids=".length) : null;
})();

const targetIds = idsArg
  ? idsArg.split(",").map((s) => s.trim()).filter(Boolean)
  : null;

const targetFacilities = facilityArg
  ? [facilityArg]
  : DEFAULT_FACILITY_TYPES;

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
    if (onlyIcp) {
      console.log(`🎯 只追加：${ICP_SHEET_NAME}（--only-icp）`);
    }
    console.log(`目標機構：${targetFacilities.join(", ")}\n`);

    let totalAppended = 0;
    let totalNoChange = 0;
    let totalSkipped = 0;
    let grandTotalSheetsAdded = 0;

    for (const facilityType of targetFacilities) {
      // 撈出此 facility 的所有範本（或指定 ids 的子集）
      const rows = await db
        .select({
          id: reportTemplates.id,
          title: reportTemplates.title,
          content: reportTemplates.content,
        })
        .from(reportTemplates)
        .where(eq(reportTemplates.facilityType, facilityType));

      const templates = targetIds
        ? rows.filter((r) => targetIds.includes(r.id))
        : rows;

      console.log(`\n── ${facilityType} (${templates.length} 個範本) ─────────────────`);

      let appended = 0, noChange = 0, skipped = 0, sheetsAdded = 0;

      for (const template of templates) {
        const itemId = parseItemId(template.title);
        if (!itemId) {
          console.log(`  ⚠️  [${template.title}] — 無法解析 itemId，跳過`);
          skipped++;
          continue;
        }

        const sourceDefs = getSupplementaryDefs(facilityType, itemId);
        if (sourceDefs.length === 0) {
          noChange++;
          continue;
        }

        const currentSheets = parseSheets(template.content);
        const currentNames = new Set(currentSheets.map((s) => s.name));

        // 找出 source 中有、DB 中沒有的 [補] 分頁定義
        // --only-icp 時限定只追加 ICP 單一分頁，避免連帶處理其他待補的 [補] 分頁
        const missingDefs: SupplementarySheetDef[] = sourceDefs.filter(
          (def) =>
            def.sheetName.startsWith("[補]") &&
            !currentNames.has(truncateSheetName(def.sheetName)) &&
            (!onlyIcp || def.sheetName === ICP_SHEET_NAME)
        );

        if (missingDefs.length === 0) {
          noChange++;
          continue;
        }

        const missingNames = missingDefs.map((d) => truncateSheetName(d.sheetName));
        console.log(
          `  📄 ${template.title} → +${missingDefs.length} 張 [補]：${missingNames.join(", ")}`
        );
        sheetsAdded += missingDefs.length;

        if (isDryRun) {
          appended++;
          continue;
        }

        // 寫入模式：snapshot 目前內容後 append 缺少的 [補] 分頁
        const newSheets = missingDefs.map(buildSupplementarySheetData);
        const mergedSheets = [...currentSheets, ...newSheets];
        const mergedContent = JSON.stringify(mergedSheets);

        await db.transaction(async (tx) => {
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
        appended++;
      }

      console.log(`  小計：追加 ${appended}、無變 ${noChange}、跳過 ${skipped}、分頁數 ${sheetsAdded}`);
      totalAppended += appended;
      totalNoChange += noChange;
      totalSkipped += skipped;
      grandTotalSheetsAdded += sheetsAdded;
    }

    console.log("\n════════ 總計 ════════");
    console.log(`  需追加 [補] 分頁的範本：${totalAppended}`);
    console.log(`  無需變更的範本：${totalNoChange}`);
    console.log(`  跳過（解析錯誤）：${totalSkipped}`);
    console.log(`  ${isDryRun ? "[DRY-RUN] " : ""}共計新增 [補] 分頁：${grandTotalSheetsAdded} 張`);

    if (isDryRun && totalAppended > 0) {
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
