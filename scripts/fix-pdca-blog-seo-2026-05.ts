/**
 * 二次優化居家護理所 PDCA 文章的 seoTitle / seoDescription（Round 2, 2026-05）
 *
 * 背景：GSC 90 天顯示「護理pdca範例」26 imp pos 12.1 / CTR 0%，
 *       「pdca 護理」15 imp pos 10.1，「護理pdca報告範例」5 imp pos 8.6。
 *       Round 1 title 已有「範例」「怎麼寫」，但缺「4 步驟模板」「報告」字面詞。
 *
 * 改動：加入「4 步驟模板」、description 加「Plan/Do/Check/Act 4 步驟」「護理 PDCA 報告範例」。
 *
 * 使用方式：
 *   npx tsx --env-file=.env.local scripts/fix-pdca-blog-seo-2026-05.ts          # dry-run
 *   npx tsx --env-file=.env.local scripts/fix-pdca-blog-seo-2026-05.ts --commit  # 寫入 DB
 */

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { blogPosts } from "../db/schema";
import { eq } from "drizzle-orm";
import { getDbUrl } from "../db/index";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const SLUG = "home-nursing-pdca-writing-2026";

const NEW_SEO_TITLE =
  "護理 PDCA 怎麼寫？居家護理 PDCA 範例與 4 步驟模板（2026 更新）";

const NEW_SEO_DESCRIPTION =
  "護理 PDCA 範例完整教學！Plan 設定可量化護理目標、Do 執行照護 SOP、Check 評值指標達成率、Act 追蹤改善措施，附居家護理 PDCA 報告範例與 4 步驟模板，直接套用於評鑑文件撰寫。";

const NEW_TAGS = ["PDCA", "居家護理所評鑑", "品質改善", "護理紀錄", "評鑑文件撰寫"];

const isDryRun = !process.argv.includes("--commit");

async function main() {
  const client = postgres(getDbUrl(), { prepare: false });
  const db = drizzle(client);

  try {
    const [current] = await db
      .select({ id: blogPosts.id, slug: blogPosts.slug, seoTitle: blogPosts.seoTitle, seoDescription: blogPosts.seoDescription, tags: blogPosts.tags })
      .from(blogPosts)
      .where(eq(blogPosts.slug, SLUG));

    if (!current) {
      console.error(`⚠️  找不到 slug: ${SLUG}`);
      process.exit(1);
    }

    console.log("\n📄 slug:", SLUG, `(id: ${current.id})`);
    console.log("\n─── seoTitle ───────────────────────────────────");
    console.log("舊:", current.seoTitle);
    console.log("新:", NEW_SEO_TITLE);
    console.log("\n─── seoDescription ─────────────────────────────");
    console.log("舊:", current.seoDescription);
    console.log("新:", NEW_SEO_DESCRIPTION);
    console.log("\n─── tags ────────────────────────────────────────");
    console.log("舊:", current.tags);
    console.log("新:", NEW_TAGS);

    if (isDryRun) {
      console.log("\n⚡ dry-run 模式 — 未寫入 DB。加 --commit 執行實際更新。\n");
      await client.end();
      return;
    }

    const [updated] = await db
      .update(blogPosts)
      .set({ seoTitle: NEW_SEO_TITLE, seoDescription: NEW_SEO_DESCRIPTION, tags: NEW_TAGS })
      .where(eq(blogPosts.slug, SLUG))
      .returning({ id: blogPosts.id, slug: blogPosts.slug });

    console.log(`\n✅ DB 已更新：${updated.slug} (id: ${updated.id})`);

    // 同步 JSON 種子檔
    const jsonPath = join(process.cwd(), "scripts/blog-posts/article-65-home-nursing-pdca-writing.json");
    const jsonData = JSON.parse(readFileSync(jsonPath, "utf-8"));
    jsonData.seoTitle = NEW_SEO_TITLE;
    jsonData.seoDescription = NEW_SEO_DESCRIPTION;
    jsonData.tags = NEW_TAGS;
    writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2) + "\n", "utf-8");
    console.log("✅ JSON 種子檔已同步：article-65-home-nursing-pdca-writing.json\n");
  } finally {
    await client.end();
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
