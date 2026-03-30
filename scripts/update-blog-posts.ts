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

function getDbUrl(raw = process.env.DATABASE_URL) {
  if (!raw) throw new Error("DATABASE_URL 未設定，請確認 .env.local");
  const match = raw.match(/^(postgresql:\/\/[^:]+):([^@]+)@(.+)$/);
  if (match) {
    const [, prefix, password, suffix] = match;
    return `${prefix}:${encodeURIComponent(password)}@${suffix}`;
  }
  return raw;
}

const POST_FILES = [
  "article-1-daycare-45-guide.json",
  "article-2-daycare-common-mistakes.json",
  "article-3-daycare-checklist-download.json",
  "article-4-daycare-inspector-perspective.json",
  "article-5-daycare-faq-15.json",
  "article-6-daycare-3month-timeline.json",
  "article-7-daycare-quality-indicator.json",
  "article-8-daycare-post-evaluation.json",
  "article-9-daycare-new-director.json",
  "article-10-daycare-dementia-home.json",
  "article-11-daycare-case-records.json",
  "article-12-daycare-retention.json",
];

async function main() {
  const client = postgres(getDbUrl(), { prepare: false });
  const db = drizzle(client);

  console.log("🔄 開始更新部落格文章內容（共 12 篇）...\n");

  for (const filename of POST_FILES) {
    const filePath = join(process.cwd(), "scripts/blog-posts", filename);
    const raw = readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw);

    try {
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
  }

  console.log("✨ 完成！所有文章內容已更新至資料庫。");

  await client.end();
}

main().catch((err) => {
  console.error("執行失敗：", err);
  process.exit(1);
});
