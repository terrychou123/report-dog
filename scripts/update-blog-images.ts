/**
 * 部落格文章圖片更新腳本
 * 將三篇文章的 coverImageUrl 與含圖片的 content 更新至資料庫
 *
 * 使用方式：
 *   npx tsx --env-file=.env.local scripts/update-blog-images.ts
 *
 * 需要 .env.local 中的 DATABASE_URL
 */

import { readFileSync } from "fs";
import { join } from "path";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq } from "drizzle-orm";
import { blogPosts } from "../db/schema";

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

// 要更新的八篇文章 JSON 檔案
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

  console.log("🖼️  開始更新部落格文章圖片...\n");

  for (const filename of POST_FILES) {
    const filePath = join(process.cwd(), "scripts/blog-posts", filename);
    const raw = readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw);

    if (!data.slug) {
      console.error(`❌ 缺少 slug：${filename}`);
      continue;
    }

    try {
      const [updated] = await db
        .update(blogPosts)
        .set({
          coverImageUrl: data.coverImageUrl ?? null,
          content: data.content ?? null,
          updatedAt: new Date(),
        })
        .where(eq(blogPosts.slug, data.slug))
        .returning({ id: blogPosts.id, slug: blogPosts.slug });

      if (updated) {
        console.log(`✅ 已更新：${data.title}`);
        console.log(`   slug: ${data.slug}`);
        console.log(`   coverImageUrl: ${data.coverImageUrl}\n`);
      } else {
        console.warn(`⚠️  找不到文章（slug 不存在）：${data.slug}`);
        console.warn(`   請先執行 seed-blog-posts.ts 建立文章\n`);
      }
    } catch (err) {
      console.error(`❌ 更新失敗：${filename}`, err);
    }
  }

  console.log("✨ 完成！請重啟 dev server 或等待快取更新後確認圖片顯示。");

  await client.end();
}

main().catch((err) => {
  console.error("執行失敗：", err);
  process.exit(1);
});
