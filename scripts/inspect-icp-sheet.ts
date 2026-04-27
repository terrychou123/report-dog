/**
 * 一次性探查腳本：讀取指定 daycare template 的「個別化照顧計劃書」分頁 JSON，
 * 確認其結構（name、cellData、config、rowlen、columnlen 等欄位）。
 */
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq } from 'drizzle-orm';
import { reportTemplates } from '../db/schema';
import { getDbUrl } from '../db/index';

const TEMPLATE_ID = 'a788d8ff-4af0-4ef5-9b5c-1c82c5a290a0';

async function main() {
  const client = postgres(getDbUrl());
  const db = drizzle(client);
  try {
    const [row] = await db
      .select({ title: reportTemplates.title, content: reportTemplates.content })
      .from(reportTemplates)
      .where(eq(reportTemplates.id, TEMPLATE_ID));

    if (!row) {
      console.log('❌ template not found');
      return;
    }

    console.log(`title: ${row.title}`);
    const sheets = JSON.parse(row.content ?? '[]') as Array<Record<string, unknown>>;
    console.log(`sheets (${sheets.length}):`);
    for (const s of sheets) {
      console.log(`  - name=${JSON.stringify(s.name)}`);
    }

    const target = sheets.find((s) =>
      String(s.name ?? '').includes('個別化照顧計劃書') ||
      String(s.name ?? '').includes('個別化照顧計畫書') ||
      String(s.name ?? '').includes('個別照顧計畫書')
    );
    if (!target) {
      console.log('\n❌ 找不到 ICP 分頁');
      return;
    }

    console.log(`\n✅ 找到分頁: ${target.name}`);
    console.log(`   keys: ${Object.keys(target).join(', ')}`);
    const cellData = target.cellData as Array<Record<string, unknown>> | undefined;
    console.log(`   cellData 格數: ${cellData?.length ?? 0}`);
    console.log(`   前 5 格:`, cellData?.slice(0, 5));

    // 傾印 cellData 全部內容以便檢視
    console.log('\n--- full sheet JSON (stringified length) ---');
    console.log(`length: ${JSON.stringify(target).length} chars`);
  } finally {
    await client.end();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
