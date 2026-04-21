/**
 * 唯讀腳本：列出今日 seed 期間被備份到 template_revisions 的日照範本。
 * 讓使用者確認哪些範本有手動編輯版本需要還原。
 *
 * Run:
 *   npx dotenv-cli -e .env.local -- tsx scripts/list-daycare-recent-revisions.ts
 */
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { desc, eq, and, gte } from "drizzle-orm";
import { reportTemplates, templateRevisions } from "../db/schema";
import { getDbUrl } from "../db/index";

const FACILITY_TYPE = "daycare";

// 今天 UTC 0 點起（依需要可調整為昨天）
const SINCE = new Date("2026-04-19T00:00:00Z");

async function main() {
  const connectionString = getDbUrl();
  const client = postgres(connectionString);
  const db = drizzle(client);

  try {
    const rows = await db
      .select({
        templateId: templateRevisions.templateId,
        templateTitle: reportTemplates.title,
        revisionId: templateRevisions.id,
        versionNumber: templateRevisions.versionNumber,
        userId: templateRevisions.userId,
        createdAt: templateRevisions.createdAt,
        content: templateRevisions.content,
      })
      .from(templateRevisions)
      .innerJoin(
        reportTemplates,
        eq(reportTemplates.id, templateRevisions.templateId)
      )
      .where(
        and(
          eq(reportTemplates.facilityType, FACILITY_TYPE),
          gte(templateRevisions.createdAt, SINCE)
        )
      )
      .orderBy(desc(templateRevisions.createdAt));

    if (rows.length === 0) {
      console.log("✅ 今日沒有日照範本被備份（可能都是系統預設內容，或 seed 未執行）");
      return;
    }

    console.log(`\n📋 今日 (${SINCE.toISOString()} 後) 日照範本備份清單（共 ${rows.length} 筆）\n`);
    console.log(
      "templateId".padEnd(38) +
      "| title".padEnd(32) +
      "| v#".padEnd(5) +
      "| contentLen".padEnd(12) +
      "| createdAt"
    );
    console.log("-".repeat(110));

    for (const r of rows) {
      const contentLen = r.content?.length ?? 0;
      const createdAt = r.createdAt.toISOString().replace("T", " ").slice(0, 19);
      console.log(
        r.templateId.padEnd(38) +
        `| ${r.templateTitle}`.slice(0, 32).padEnd(32) +
        `| ${r.versionNumber}`.padEnd(5) +
        `| ${contentLen}`.padEnd(12) +
        `| ${createdAt}`
      );
    }

    console.log("\n⚠️  說明：");
    console.log("  - contentLen 較大的版本通常是手動編輯過的版本（比系統預設多內容）");
    console.log("  - 同一 templateId 出現多筆：表示這個範本有多個歷史版本備份");
    console.log("  - 若要合併還原，請把需要還原的 templateId 複製後執行 restore-daycare-merge.ts");
    console.log("\n📌 可能需要還原的 templateId 清單（供下一步使用）：");
    const unique = [...new Set(rows.map((r) => r.templateId))];
    console.log(unique.join(","));
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error("❌ Failed:", err);
  process.exit(1);
});
