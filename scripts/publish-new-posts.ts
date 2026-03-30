/**
 * 將 4 篇新文章設為 published
 * npx tsx --env-file=.env.local scripts/publish-new-posts.ts
 */
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq } from "drizzle-orm";
import { blogPosts } from "../db/schema";

function getDbUrl(raw = process.env.DATABASE_URL) {
  if (!raw) throw new Error("DATABASE_URL 未設定");
  const match = raw.match(/^(postgresql:\/\/[^:]+):([^@]+)@(.+)$/);
  if (match) {
    const [, prefix, password, suffix] = match;
    return `${prefix}:${encodeURIComponent(password)}@${suffix}`;
  }
  return raw;
}

const slugs = [
  "daycare-new-director-survival-guide-2026",
  "daycare-dementia-want-go-home-tips-2026",
  "daycare-case-records-writing-guide-2026",
  "daycare-staff-retention-blind-spots-2026",
];

async function main() {
  const client = postgres(getDbUrl(), { prepare: false });
  const db = drizzle(client);

  console.log("🚀 開始發佈 4 篇新文章...\n");

  for (const slug of slugs) {
    const [result] = await db
      .update(blogPosts)
      .set({ status: "published", publishedAt: new Date(), updatedAt: new Date() })
      .where(eq(blogPosts.slug, slug))
      .returning({ slug: blogPosts.slug, title: blogPosts.title });
    if (result) {
      console.log(`✅ 已發佈：${result.title}`);
    } else {
      console.warn(`⚠️  找不到：${slug}`);
    }
  }

  await client.end();
  console.log("\n🎉 全部發佈完成！");
}

main().catch(console.error);
