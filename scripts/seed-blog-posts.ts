/**
 * 部落格文章 Seed Script
 * 將 scripts/blog-posts/ 下的十二篇日照評鑑文章寫入資料庫
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

// 四十九篇文章的 JSON 檔案路徑
const POST_FILES = [
  // 日照中心系列（17 篇）
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
  "article-13-daycare-care-plan-example.json",
  "article-14-daycare-role-division.json",
  "article-15-daycare-staffing-calculation.json",
  "article-16-daycare-top10-deficiencies.json",
  "article-17-daycare-ai-tool-guide.json",
  // 居家照顧系列（7 篇）
  "article-18-home-care-evaluation-guide.json",
  "article-19-home-care-common-mistakes.json",
  "article-20-home-care-document-ai.json",
  "article-21-home-care-case-records.json",
  "article-22-home-care-team-collaboration.json",
  "article-23-home-care-90day-plan.json",
  "article-24-home-care-self-evaluation.json",
  // 住宿型機構系列（25 篇）
  "article-25-nursing-home-75guide.json",
  "article-26-nursing-home-ai-document-writing.json",
  "article-27-nursing-home-top10-deficiencies.json",
  "article-28-nursing-home-90day-timeline.json",
  "article-29-nursing-home-nursing-records.json",
  "article-30-nursing-home-isp-writing.json",
  "article-31-nursing-home-team-collaboration.json",
  "article-32-nursing-home-infection-control-guide.json",
  "article-33-nursing-home-fall-prevention-records.json",
  "article-34-nursing-home-dementia-care-eval.json",
  "article-35-nursing-home-risk-management-plan.json",
  "article-36-nursing-home-self-eval-tips.json",
  "article-37-nursing-home-fire-safety-emergency.json",
  "article-38-nursing-home-business-plan-example.json",
  "article-39-nursing-home-quality-reward-vs-eval.json",
  "article-40-nursing-home-resident-rights-guide.json",
  "article-41-nursing-home-ltc30-eval-impact.json",
  "article-42-nursing-home-pdca-improvement.json",
  "article-43-nursing-home-new-director-30day.json",
  "article-44-nursing-home-eval-interview.json",
  "article-45-nursing-home-staffing-calculation.json",
  "article-46-nursing-home-nutrition-care.json",
  "article-47-nursing-home-digital-transform.json",
  "article-48-nursing-home-grade-strategy.json",
  "article-49-nursing-home-continuous-improvement.json",
];

async function main() {
  const client = postgres(getDbUrl(), { prepare: false });
  const db = drizzle(client);

  console.log("📝 開始匯入部落格文章（日照中心 17 篇 + 居家照顧 7 篇 + 住宿型機構 25 篇，共 49 篇）...\n");

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
