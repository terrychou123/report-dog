/**
 * 發布居家護理所評鑑系列文章第二波（3 篇）
 * npx tsx --env-file=.env.local scripts/publish-home-nursing-wave2.ts
 */
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { blogPosts } from "../db/schema";
import { inArray } from "drizzle-orm";
import { getDbUrl } from "../db/index";

const slugs = [
  "home-nursing-eval-report-writing-2026",
  "home-nursing-quality-indicators-2026",
  "home-nursing-paperwork-burden-2026",
];

async function main() {
  const client = postgres(getDbUrl(), { prepare: false });
  const db = drizzle(client);
  const now = new Date();

  const results = await db
    .update(blogPosts)
    .set({ status: "published", publishedAt: now, updatedAt: now })
    .where(inArray(blogPosts.slug, slugs))
    .returning({ slug: blogPosts.slug, status: blogPosts.status });

  for (const r of results) {
    console.log(`✅ 已發布：${r.slug} | ${r.status}`);
  }

  console.log(`\n✨ 完成！共發布 ${results.length} 篇文章。`);
  await client.end();
}

main().catch((err) => {
  console.error("執行失敗：", err);
  process.exit(1);
});
