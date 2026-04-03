/**
 * 更新 article-14 角色分工文章內容
 * 修正：第 3、4、12、16 條的雙職類責任標注
 *
 * 使用方式：
 *   npx tsx --env-file=.env.local scripts/update-article-14.ts
 */

import { readFileSync } from "fs";
import { join } from "path";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { blogPosts } from "../db/schema";
import { eq } from "drizzle-orm";

function getDbUrl(raw = process.env.DATABASE_URL) {
  if (!raw) throw new Error("DATABASE_URL 未設定，請確認 .env.local");
  const match = raw.match(/^(postgresql:\/\/[^:]+):([^@]+)@(.+)$/);
  if (match) {
    const [, prefix, password, suffix] = match;
    return `${prefix}:${encodeURIComponent(password)}@${suffix}`;
  }
  return raw;
}

async function main() {
  const client = postgres(getDbUrl(), { prepare: false });
  const db = drizzle(client);

  const filePath = join(process.cwd(), "scripts/blog-posts/article-14-daycare-role-division.json");
  const raw = readFileSync(filePath, "utf-8");
  const data = JSON.parse(raw);

  console.log("🔄 更新 article-14 角色分工文章...\n");

  const [updated] = await db
    .update(blogPosts)
    .set({
      title: data.title,
      excerpt: data.excerpt ?? null,
      content: data.content ?? null,
      seoTitle: data.seoTitle ?? null,
      seoDescription: data.seoDescription ?? null,
      tags: data.tags ?? null,
    })
    .where(eq(blogPosts.slug, data.slug))
    .returning({ id: blogPosts.id, slug: blogPosts.slug });

  if (updated) {
    console.log(`✅ 已更新：${data.title}`);
    console.log(`   slug: ${updated.slug}`);
    console.log(`   id: ${updated.id}`);
  } else {
    console.log(`⚠️  找不到 slug: ${data.slug}，請確認資料庫中是否存在此文章`);
  }

  await client.end();
}

main().catch((err) => {
  console.error("執行失敗：", err);
  process.exit(1);
});
