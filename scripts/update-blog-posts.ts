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
  // 托嬰中心系列（20 篇）
  "article-110-infant-daycare-60-guide.json",
  "article-111-infant-daycare-top10-deficiencies.json",
  "article-112-infant-daycare-self-evaluation.json",
  "article-113-infant-daycare-evidence.json",
  "article-114-infant-daycare-prep-timeline.json",
  "article-115-infant-daycare-baby-diary-ai.json",
  "article-116-infant-daycare-plain-language.json",
  "article-117-infant-daycare-small-center.json",
  "article-118-infant-daycare-environment-safety.json",
  "article-119-infant-daycare-pdca.json",
  "article-120-infant-daycare-health-safety.json",
  "article-121-infant-daycare-curriculum.json",
  "article-122-infant-daycare-care-plan.json",
  "article-123-infant-daycare-parent-communication.json",
  "article-124-infant-daycare-administration.json",
  "article-125-infant-daycare-faq.json",
  "article-126-infant-daycare-evaluator-perspective.json",
  "article-127-infant-daycare-role-division.json",
  "article-128-infant-daycare-trends.json",
  "article-129-infant-daycare-post-evaluation.json",
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
