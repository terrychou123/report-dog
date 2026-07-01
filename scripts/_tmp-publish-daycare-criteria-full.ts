import { db } from "../db/index";
import { blogPosts } from "../db/schema";
import { eq } from "drizzle-orm";

const SLUG = "daycare-eval-115-criteria-full-2026";

async function main() {
  const [row] = await db
    .select({ status: blogPosts.status, title: blogPosts.title })
    .from(blogPosts)
    .where(eq(blogPosts.slug, SLUG));

  if (!row) { console.log("❌ 找不到文章，請先執行 _tmp-insert-daycare-criteria-full.ts"); process.exit(1); }

  await db
    .update(blogPosts)
    .set({ status: "published", publishedAt: new Date() })
    .where(eq(blogPosts.slug, SLUG));

  console.log(`✅ 已發布：${row.title}`);
  console.log(`   URL: https://reportwang.com/blog/${SLUG}`);
  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });
