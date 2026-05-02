/**
 * 一次性清除腳本：刪除 nursing-home 的 113/114 舊版孤兒範本。
 *
 * 執行：
 *   npx dotenv-cli -e .env.local -- tsx scripts/cleanup-nursing-home-orphans.ts
 */

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { reportTemplates, templateTags, templateTagReports } from '../db/schema';
import { eq, inArray, notInArray } from 'drizzle-orm';
import { getDbUrl } from '../db/index';
import { nursingHomeProfile } from '../lib/ai/evaluation-profiles/nursing-home';

// 115 年度 SSOT 的所有預期 title
const expectedTitles = nursingHomeProfile.sections.flatMap((s) =>
  s.items.map((item) => `${item.id} ${item.title}`)
);

// 115 年度 SSOT 的所有預期 responsible（標籤名稱）
const expectedResponsibles = [
  ...new Set(
    nursingHomeProfile.sections.flatMap((s) => s.items.map((item) => item.responsible))
  ),
];

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not set.');
    process.exit(1);
  }

  const client = postgres(getDbUrl(), { prepare: false });
  const db = drizzle(client);

  try {
    // 查詢孤兒
    const [orphanReports, orphanTags] = await Promise.all([
      db
        .select({ id: reportTemplates.id, title: reportTemplates.title })
        .from(reportTemplates)
        .where(eq(reportTemplates.facilityType, 'nursing-home'))
        .then((rows) => rows.filter((r) => !expectedTitles.includes(r.title))),
      db
        .select({ id: templateTags.id, name: templateTags.name })
        .from(templateTags)
        .where(eq(templateTags.facilityType, 'nursing-home'))
        .then((rows) => rows.filter((r) => !expectedResponsibles.includes(r.name))),
    ]);

    console.log(`準備刪除 ${orphanReports.length} 筆舊版報告範本、${orphanTags.length} 個舊版標籤`);

    if (orphanReports.length === 0 && orphanTags.length === 0) {
      console.log('✅ 無孤兒資料，無需清除。');
      return;
    }

    // 逐一列出確認
    console.log('\n舊版報告範本（即將刪除）：');
    for (const r of orphanReports) console.log(`  ${r.title}`);
    console.log('\n舊版標籤（即將刪除）：');
    for (const t of orphanTags) console.log(`  ${t.name}`);

    const orphanReportIds = orphanReports.map((r) => r.id);
    const orphanTagIds = orphanTags.map((t) => t.id);

    await db.transaction(async (tx) => {
      // 1. 刪除 join rows（FK 先清）
      if (orphanTagIds.length > 0) {
        const deleted = await tx
          .delete(templateTagReports)
          .where(inArray(templateTagReports.templateTagId, orphanTagIds));
        console.log(`\n✅ 刪除 templateTagReports（舊標籤連結）`);
      }
      if (orphanReportIds.length > 0) {
        await tx
          .delete(templateTagReports)
          .where(inArray(templateTagReports.reportTemplateId, orphanReportIds));
      }

      // 2. 刪除孤兒報告
      if (orphanReportIds.length > 0) {
        await tx
          .delete(reportTemplates)
          .where(inArray(reportTemplates.id, orphanReportIds));
        console.log(`✅ 刪除 ${orphanReportIds.length} 筆舊版 reportTemplates`);
      }

      // 3. 刪除孤兒標籤
      if (orphanTagIds.length > 0) {
        await tx
          .delete(templateTags)
          .where(inArray(templateTags.id, orphanTagIds));
        console.log(`✅ 刪除 ${orphanTagIds.length} 個舊版 templateTags`);
      }
    });

    console.log('\n✅ 清除完成。DB 現在只剩 115 年度範本。');
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error('❌ Cleanup failed:', err);
  process.exit(1);
});
