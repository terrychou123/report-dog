/**
 * 一次性探查腳本：列出 daycare item 7 範本的所有分頁名稱，
 * 並找出「追蹤評值」相關分頁的完整資訊。
 */
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq } from 'drizzle-orm';
import { reportTemplates } from '../db/schema';
import { getDbUrl } from '../db/index';

const TEMPLATE_ID = '45ce7719-a335-4c4d-ac47-fa59bd7f84cd';

async function main() {
  const client = postgres(getDbUrl());
  const db = drizzle(client);
  try {
    const [row] = await db
      .select({ title: reportTemplates.title, content: reportTemplates.content })
      .from(reportTemplates)
      .where(eq(reportTemplates.id, TEMPLATE_ID));

    if (!row) {
      console.log('❌ 找不到 template');
      return;
    }

    console.log(`title: ${row.title}`);
    const sheets = JSON.parse(row.content ?? '[]') as Array<Record<string, unknown>>;
    console.log(`\n共 ${sheets.length} 張分頁：`);
    sheets.forEach((s, i) => {
      console.log(`  ${i + 1}. ${JSON.stringify(s.name)}`);
    });

    const target = sheets.find((s) =>
      String(s.name ?? '').includes('追蹤評值')
    );
    if (!target) {
      console.log('\n❌ 找不到含「追蹤評值」的分頁，請人工從上方清單挑選正確名稱');
      return;
    }

    console.log(`\n✅ 找到分頁: ${JSON.stringify(target.name)}`);
    console.log(`   JSON 長度: ${JSON.stringify(target).length} chars`);
  } finally {
    await client.end();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
