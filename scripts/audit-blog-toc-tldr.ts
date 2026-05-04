/**
 * 審計所有 blog_posts 的 TL;DR（excerpt）與 TOC（h2/h3 存在）覆蓋率
 * 執行：npx tsx scripts/audit-blog-toc-tldr.ts
 */
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { sql } from "drizzle-orm";

async function main() {
  const rows = await db
    .select({
      slug: blogPosts.slug,
      title: blogPosts.title,
      status: blogPosts.status,
      hasTldr: sql<boolean>`(${blogPosts.excerpt} IS NOT NULL AND length(btrim(${blogPosts.excerpt})) > 0)`,
      hasToc: sql<boolean>`(${blogPosts.content} ~* '<h[23][[:space:]>]')`,
    })
    .from(blogPosts);

  const missingTldr = rows.filter((r) => !r.hasTldr);
  const missingToc = rows.filter((r) => !r.hasToc);

  console.log("\n=== Blog TOC / TL;DR 覆蓋率審計 ===");
  console.log(`總文章數  : ${rows.length}`);
  console.log(`缺 TL;DR  : ${missingTldr.length}`);
  console.log(`缺 TOC    : ${missingToc.length}`);

  if (missingTldr.length) {
    console.log("\n--- 缺 TL;DR（excerpt 為空）---");
    missingTldr.forEach((r) =>
      console.log(`  [${r.status}] ${r.slug}\n    ${r.title}`)
    );
  }

  if (missingToc.length) {
    console.log("\n--- 缺 TOC（content 無 <h2>/<h3>）---");
    missingToc.forEach((r) =>
      console.log(`  [${r.status}] ${r.slug}\n    ${r.title}`)
    );
  }

  if (!missingTldr.length && !missingToc.length) {
    console.log("\n✅ 所有文章 TL;DR 與 TOC 均已具備，無需補齊。");
  }
}

main().catch(console.error).finally(() => process.exit(0));
