/**
 * 一次性腳本：將 PDCA 文章從 draft 改為 published
 * 用法：npx dotenv -e .env.local -- npx tsx scripts/publish-pdca-article.ts
 */
import { db } from "../db/index";
import { blogPosts } from "../db/schema";
import { eq } from "drizzle-orm";

const slug = "nursing-pdca-quality-improvement-examples-2026";

async function main() {
  // 先確認文章存在
  const existing = await db
    .select({ slug: blogPosts.slug, status: blogPosts.status })
    .from(blogPosts)
    .where(eq(blogPosts.slug, slug));

  if (existing.length === 0) {
    console.log(`❌ 找不到文章（slug: ${slug}），請先跑 insert-pdca-article.ts`);
    process.exit(1);
  }

  console.log(`目前狀態：${existing[0].status}`);

  if (existing[0].status === "published") {
    console.log("✅ 文章已是 published，無需更新");
    process.exit(0);
  }

  await db
    .update(blogPosts)
    .set({ status: "published" })
    .where(eq(blogPosts.slug, slug));

  console.log(`✅ 文章已改為 published：${slug}`);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
