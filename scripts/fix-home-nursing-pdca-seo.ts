/**
 * 修正居家護理所 PDCA 文章的 seoTitle / seoDescription
 *
 * 問題：GSC 顯示「護理pdca範例」28天有 26 曝光但 0 點擊（排名 12），
 *       原因是 seoTitle 和 seoDescription 都沒有「範例」這個詞，
 *       搜尋者掃到結果不點擊，Google 也不把這頁往前推。
 *
 * 修正：把「範例」推到 seoTitle 最前面、seoDescription 加入「範例全解析」。
 *
 * 使用方式：
 *   npx tsx --env-file=.env.local scripts/fix-home-nursing-pdca-seo.ts
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
  "護理 PDCA 範例怎麼寫？居家護理所照護計畫完整範本｜報告汪";

const NEW_SEO_DESCRIPTION =
  "護理 PDCA 範例全解析！居家護理所 Plan 設定可量化護理目標、Do 執行照護 SOP、Check 季報查核指標、Act 追蹤改善紀錄，附完整 PDCA 撰寫範本，讓評鑑委員看到真實管理循環。";

async function main() {
  const client = postgres(getDbUrl(), { prepare: false });
  const db = drizzle(client);

  try {
    const [updated] = await db
      .update(blogPosts)
      .set({ seoTitle: NEW_SEO_TITLE, seoDescription: NEW_SEO_DESCRIPTION })
      .where(eq(blogPosts.slug, SLUG))
      .returning({ id: blogPosts.id, slug: blogPosts.slug });

    if (!updated) {
      console.error(`⚠️  找不到 slug: ${SLUG}`);
      process.exit(1);
    }

    console.log(`✅ DB 已更新：${updated.slug} (id: ${updated.id})`);

    // 同步更新 JSON 種子檔，保持與 DB 一致
    const jsonPath = join(
      process.cwd(),
      "scripts/blog-posts/article-65-home-nursing-pdca-writing.json"
    );
    const jsonData = JSON.parse(readFileSync(jsonPath, "utf-8"));
    jsonData.seoTitle = NEW_SEO_TITLE;
    jsonData.seoDescription = NEW_SEO_DESCRIPTION;
    writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2) + "\n", "utf-8");
    console.log(`✅ JSON 種子檔已同步：scripts/blog-posts/article-65-home-nursing-pdca-writing.json`);

    console.log("\n舊 seoTitle:", "居家護理所照護計畫 PDCA 怎麼寫？讓評鑑委員一看就懂｜報告汪");
    console.log("新 seoTitle:", NEW_SEO_TITLE);
    console.log("\n舊 seoDescription:", "居家護理所 PDCA 循環怎麼寫才符合評鑑要求？Plan 設定目標、Do 執行 SOP、Check 季報查核、Act 改善追蹤，完整 PDCA 撰寫指引，讓文件展現真實管理循環。");
    console.log("新 seoDescription:", NEW_SEO_DESCRIPTION);
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error("執行失敗：", err);
  process.exit(1);
});
