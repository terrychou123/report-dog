/**
 * 部落格文章 Seed Script
 * 將 scripts/blog-posts/ 下的三篇日照評鑑文章寫入資料庫
 *
 * 使用方式：
 *   npx tsx --env-file=.env.local scripts/seed-blog-posts.ts
 *
 * 需要 .env.local 中的 DATABASE_URL
 */

import { readFileSync } from "fs";
import { join } from "path";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { blogPosts } from "../db/schema";
// 使用方式：npx tsx --env-file=.env.local scripts/seed-blog-posts.ts

// 取得 DB 連線（與 db/index.ts 相同邏輯）
function getDbUrl(raw = process.env.DATABASE_URL) {
  if (!raw) throw new Error("DATABASE_URL 未設定，請確認 .env.local");
  const match = raw.match(/^(postgresql:\/\/[^:]+):([^@]+)@(.+)$/);
  if (match) {
    const [, prefix, password, suffix] = match;
    return `${prefix}:${encodeURIComponent(password)}@${suffix}`;
  }
  return raw;
}

// 八篇文章的 JSON 檔案路徑
const POST_FILES = [
  "article-1-daycare-45-guide.json",
  "article-2-daycare-common-mistakes.json",
  "article-3-daycare-checklist-download.json",
  "article-4-daycare-inspector-perspective.json",
  "article-5-daycare-faq-15.json",
  "article-6-daycare-3month-timeline.json",
  "article-7-daycare-quality-indicator.json",
  "article-8-daycare-post-evaluation.json",
];

async function main() {
  const client = postgres(getDbUrl(), { prepare: false });
  const db = drizzle(client);

  console.log("📝 開始匯入日照評鑑部落格文章（共 8 篇）...\n");

  for (const filename of POST_FILES) {
    const filePath = join(process.cwd(), "scripts/blog-posts", filename);
    const raw = readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw);

    try {
      const [inserted] = await db
        .insert(blogPosts)
        .values({
          slug: data.slug,
          title: data.title,
          excerpt: data.excerpt ?? null,
          content: data.content ?? null,
          coverImageUrl: data.coverImageUrl ?? null,
          category: data.category ?? null,
          tags: data.tags ?? null,
          status: "draft", // 初始為草稿，確認後再於 /blog-admin 發布
          seoTitle: data.seoTitle ?? null,
          seoDescription: data.seoDescription ?? null,
        })
        .onConflictDoNothing() // 若 slug 已存在則略過
        .returning({ id: blogPosts.id, slug: blogPosts.slug });

      if (inserted) {
        console.log(`✅ 已新增：${data.title}`);
        console.log(`   slug: ${data.slug}`);
        console.log(`   id: ${inserted.id}\n`);
      } else {
        console.log(`⏭️  已略過（slug 已存在）：${data.slug}\n`);
      }
    } catch (err) {
      console.error(`❌ 匯入失敗：${filename}`, err);
    }
  }

  console.log("✨ 完成！請前往 /blog-admin 確認並將文章狀態改為 published。");

  await client.end();
}

main().catch((err) => {
  console.error("執行失敗：", err);
  process.exit(1);
});
