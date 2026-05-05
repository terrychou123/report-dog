/**
 * 部落格文章更新腳本（風格改寫後同步至資料庫）
 * 用 slug 比對，UPDATE 現有文章的 content/excerpt/seoDescription
 *
 * 使用方式：
 *   npx tsx --env-file=.env.local scripts/update-blog-posts.ts
 */

import { readFileSync } from "fs";
import { join } from "path";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq } from "drizzle-orm";
import { blogPosts } from "../db/schema";
import { getDbUrl } from "../db/index";

// Phase 5：8 大功能 blog 置入（163 篇）—— 詳見 ~/.claude/plans/blog-lazy-hellman.md
const POST_FILES = [
  // Phase 5 補完：最後 6 篇零 CTA 補齊
  "article-37-nursing-home-fire-safety-emergency.json",
  "article-38-nursing-home-business-plan-example.json",
  "article-39-nursing-home-quality-reward-vs-eval.json",
  "article-40-nursing-home-resident-rights-guide.json",
  "article-41-nursing-home-ltc30-eval-impact.json",
  "article-235-elderly-welfare-eval-b-section-professional-care.json",
];

async function main() {
  const client = postgres(getDbUrl(), { prepare: false });
  const db = drizzle(client);

  try {
    console.log(`🔄 開始更新部落格文章內容（共 ${POST_FILES.length} 篇）...\n`);

    // 平行讀檔 + 更新，大幅縮短執行時間
    await Promise.all(
      POST_FILES.map(async (filename) => {
        const filePath = join(process.cwd(), "scripts/blog-posts", filename);
        try {
          const raw = readFileSync(filePath, "utf-8");
          const data = JSON.parse(raw);
          const updated = await db
            .update(blogPosts)
            .set({
              excerpt: data.excerpt ?? null,
              content: data.content ?? null,
              seoDescription: data.seoDescription ?? null,
              updatedAt: new Date(),
            })
            .where(eq(blogPosts.slug, data.slug))
            .returning({ id: blogPosts.id, slug: blogPosts.slug });

          if (updated.length > 0) {
            console.log(`✅ 已更新：${data.title}`);
            console.log(`   slug: ${data.slug}\n`);
          } else {
            console.log(`⚠️  找不到此 slug，略過（可能尚未 seed）：${data.slug}\n`);
          }
        } catch (err) {
          console.error(`❌ 更新失敗：${filename}`, err);
        }
      })
    );

    console.log("✨ 完成！所有文章內容已更新至資料庫。");
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error("執行失敗：", err);
  process.exit(1);
});
