/**
 * 產後護理之家系列文章發布腳本
 * 將 article-70 ~ article-89 以 published 狀態寫入資料庫
 * 若 slug 已存在（草稿）則更新為 published 並同步最新內容
 *
 * 使用方式：
 *   npx tsx --env-file=.env.local scripts/publish-postpartum.ts
 */

import { readFileSync } from "fs";
import { join } from "path";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { blogPosts } from "../db/schema";
import { getDbUrl } from "../db/index";
import { eq } from "drizzle-orm";

// 產後護理之家系列文章（共 20 篇）
const POST_FILES = [
  "article-70-postpartum-eval-prep-guide.json",
  "article-71-postpartum-eval-common-mistakes.json",
  "article-72-postpartum-nursing-records-burden.json",
  "article-73-postpartum-quality-indicators.json",
  "article-74-postpartum-infection-control.json",
  "article-75-postpartum-breastfeeding-plan.json",
  "article-76-postpartum-accident-sop.json",
  "article-77-postpartum-staffing-calculation.json",
  "article-78-postpartum-depression-epds.json",
  "article-79-postpartum-discharge-assessment.json",
  "article-80-postpartum-fire-evacuation.json",
  "article-81-postpartum-jaundice-weight.json",
  "article-82-postpartum-group-education.json",
  "article-83-postpartum-emergency-sop.json",
  "article-84-postpartum-hand-hygiene.json",
  "article-85-postpartum-self-evaluation.json",
  "article-86-postpartum-small-center.json",
  "article-87-postpartum-rooming-in.json",
  "article-88-postpartum-d1-bonus.json",
  "article-89-postpartum-pdca.json",
];

async function main() {
  const client = postgres(getDbUrl(), { prepare: false });
  const db = drizzle(client);

  try {
    console.log("🚀 開始發布產後護理之家系列文章（共 20 篇）...\n");

    for (const filename of POST_FILES) {
      const filePath = join(process.cwd(), "scripts/blog-posts", filename);
      const raw = readFileSync(filePath, "utf-8");
      const data = JSON.parse(raw);

      try {
        // 先確認是否已存在
        const [existing] = await db
          .select({ id: blogPosts.id, status: blogPosts.status })
          .from(blogPosts)
          .where(eq(blogPosts.slug, data.slug));

        if (existing) {
          // 已存在 → 更新內容並設為 published
          await db
            .update(blogPosts)
            .set({
              title: data.title,
              excerpt: data.excerpt ?? null,
              content: data.content ?? null,
              coverImageUrl: data.coverImageUrl ?? null,
              category: data.category ?? null,
              tags: data.tags ?? null,
              seoTitle: data.seoTitle ?? null,
              seoDescription: data.seoDescription ?? null,
              status: "published",
              publishedAt: new Date(), // 確保 publishedAt 有值，避免排序問題
            })
            .where(eq(blogPosts.slug, data.slug));

          console.log(`🔄 已更新並發布：${data.title}`);
          console.log(`   slug: ${data.slug}`);
          console.log(`   前狀態: ${existing.status} → published\n`);
        } else {
          // 不存在 → 直接以 published 新增
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
              status: "published",
              publishedAt: new Date(), // 必填，確保文章出現在 /blog 列表
              seoTitle: data.seoTitle ?? null,
              seoDescription: data.seoDescription ?? null,
            })
            .returning({ id: blogPosts.id, slug: blogPosts.slug });

          console.log(`✅ 已新增並發布：${data.title}`);
          console.log(`   slug: ${data.slug}`);
          console.log(`   id: ${inserted.id}\n`);
        }
      } catch (err) {
        console.error(`❌ 發布失敗：${filename}`, err);
      }
    }

    console.log("✨ 完成！20 篇產後護理之家系列文章已發布至 /blog");
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error("執行失敗：", err);
  process.exit(1);
});
