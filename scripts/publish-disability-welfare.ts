/**
 * 身心障礙福利機構系列文章發布腳本
 * 將 article-190 ~ article-209 以 published 狀態寫入資料庫
 * 若 slug 已存在（草稿）則更新為 published 並同步最新內容
 *
 * 使用方式：
 *   npx tsx --env-file=.env.local scripts/publish-disability-welfare.ts
 */

import { readFileSync } from "fs";
import { join } from "path";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { blogPosts } from "../db/schema";
import { getDbUrl } from "../db/index";
import { eq } from "drizzle-orm";

// 身心障礙福利機構系列文章（共 20 篇）
const POST_FILES = [
  "article-190-disability-welfare-evaluation-guide.json",
  "article-191-disability-welfare-top10-deficiencies.json",
  "article-192-disability-welfare-isp-writing-guide.json",
  "article-193-disability-welfare-self-evaluation-report.json",
  "article-194-disability-welfare-evidence-preparation.json",
  "article-195-disability-welfare-prep-timeline.json",
  "article-196-disability-welfare-fire-safety-3105.json",
  "article-197-disability-welfare-isp-multi-need-assessment.json",
  "article-198-disability-welfare-staffing-ratios-1106.json",
  "article-199-disability-welfare-paperwork-efficiency.json",
  "article-200-disability-welfare-professional-team-4201.json",
  "article-201-disability-welfare-positive-behavior-support.json",
  "article-202-disability-welfare-soap-case-records.json",
  "article-203-disability-welfare-health-dietary-management.json",
  "article-204-disability-welfare-infection-control.json",
  "article-205-disability-welfare-caregiver-staff-crisis.json",
  "article-206-disability-welfare-environment-accessibility.json",
  "article-207-disability-welfare-community-resources-family.json",
  "article-208-disability-welfare-new-staff-guide.json",
  "article-209-disability-welfare-quality-improvement.json",
];

async function main() {
  const client = postgres(getDbUrl(), { prepare: false });
  const db = drizzle(client);

  try {
    console.log("🚀 開始發布身心障礙福利機構系列文章（共 20 篇）...\n");

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
              publishedAt: new Date(),
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
              publishedAt: new Date(),
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

    console.log("✨ 完成！20 篇身心障礙福利機構系列文章已發布至 /blog");
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error("執行失敗：", err);
  process.exit(1);
});
