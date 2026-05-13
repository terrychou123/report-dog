/**
 * 全站 Blog SEO Metadata 完整度審查
 * 執行：npx tsx --env-file=.env.local scripts/audit-blog-seo-meta.ts
 */
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq, isNull, or } from "drizzle-orm";

async function main() {
  const published = await db
    .select({
      slug: blogPosts.slug,
      title: blogPosts.title,
      seoTitle: blogPosts.seoTitle,
      seoDescription: blogPosts.seoDescription,
    })
    .from(blogPosts)
    .where(eq(blogPosts.status, "published"));

  const missingTitle = published.filter((p) => !p.seoTitle);
  const missingDesc = published.filter((p) => !p.seoDescription);
  const missingBoth = published.filter((p) => !p.seoTitle && !p.seoDescription);
  const complete = published.filter((p) => p.seoTitle && p.seoDescription);

  console.log(`\n=== Blog SEO Metadata 完整度報告（${new Date().toISOString().slice(0, 10)}）===`);
  console.log(`已發布文章總數：${published.length}`);
  console.log(`完整（有 seoTitle + seoDescription）：${complete.length}（${pct(complete.length, published.length)}）`);
  console.log(`缺 seoTitle：${missingTitle.length}（${pct(missingTitle.length, published.length)}）`);
  console.log(`缺 seoDescription：${missingDesc.length}（${pct(missingDesc.length, published.length)}）`);
  console.log(`兩者皆缺：${missingBoth.length}（${pct(missingBoth.length, published.length)}）`);

  if (missingTitle.length > 0) {
    console.log(`\n--- 缺 seoTitle（${missingTitle.length} 篇）---`);
    missingTitle.forEach((p) => console.log(`  ${p.slug}`));
  }

  if (missingDesc.length > 0) {
    console.log(`\n--- 缺 seoDescription（${missingDesc.length} 篇）---`);
    missingDesc.forEach((p) => console.log(`  ${p.slug}`));
  }
}

function pct(n: number, total: number) {
  return total === 0 ? "N/A" : `${Math.round((n / total) * 100)}%`;
}

main().catch(console.error).finally(() => process.exit(0));
