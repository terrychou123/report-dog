/**
 * 第二批 GSC 驅動的 SEO 修正
 *
 * 1. home-care-case-records-guide-2026 — 168 imp / 16 click / pos 4.2
 *    description 開頭「居服評鑑項目13」對非業內看不懂，把「好壞紀錄對比範例」推前
 *
 * 2. elderly-welfare-eval-top10-deficiencies — 29 imp / 1 click / pos 2.8（CTR 異常低）
 *    description 塞滿 C區/B2/A4/A13/14/B10/B13-19/D1 代號，普通主管看不懂
 *    全換成議題名稱、加「避免評等掉等」具體利益
 *
 * 使用方式：
 *   npx tsx --env-file=.env.local scripts/fix-blog-seo-batch-2.ts
 */

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { blogPosts } from "../db/schema";
import { eq } from "drizzle-orm";
import { getDbUrl } from "../db/index";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

type SeoFix = {
  slug: string;
  jsonFile: string;
  newSeoTitle: string;
  newSeoDescription: string;
};

const fixes: SeoFix[] = [
  {
    slug: "home-care-case-records-guide-2026",
    jsonFile: "scripts/blog-posts/article-21-home-care-case-records.json",
    newSeoTitle:
      "居家服務個案紀錄怎麼寫？好壞範例對比＋評鑑必過格式｜報告汪",
    newSeoDescription:
      "居家服務個案紀錄怎麼寫才符合評鑑要求？逐條拆解服務日期、時間、項目、執行情形四大格式要點，附「過關紀錄 vs 待改善紀錄」實際對比範例，並說明紀錄如何串連計畫評值、督導訪視、緊急事件紀錄，讓居服員快速學會評鑑委員想看的撰寫法。",
  },
  {
    slug: "elderly-welfare-eval-top10-deficiencies",
    jsonFile: "scripts/blog-posts/article-231-elderly-welfare-eval-top10-deficiencies.json",
    newSeoTitle:
      "老人福利機構評鑑10大缺失與補救方法｜過來人血淚指南｜報告汪",
    newSeoDescription:
      "老人福利機構 115 年度評鑑最常被扣分的 10 大缺失一次盤點：緊急呼叫設備、消防疏散演練、個案服務計畫、訓練時數、防疫機制、PDCA 監測、個資保密。每項附過來人經驗、實際補救做法、評鑑前自我檢查重點，幫機構主動找出弱點、避免評等掉等。",
  },
];

async function main() {
  const client = postgres(getDbUrl(), { prepare: false });
  const db = drizzle(client);

  try {
    for (const fix of fixes) {
      const [updated] = await db
        .update(blogPosts)
        .set({
          seoTitle: fix.newSeoTitle,
          seoDescription: fix.newSeoDescription,
        })
        .where(eq(blogPosts.slug, fix.slug))
        .returning({ id: blogPosts.id, slug: blogPosts.slug });

      if (!updated) {
        console.error(`⚠️  找不到 slug: ${fix.slug}（DB 跳過）`);
        continue;
      }
      console.log(`✅ DB: ${updated.slug}`);

      // 同步 JSON 種子檔
      try {
        const jsonPath = join(process.cwd(), fix.jsonFile);
        const data = JSON.parse(readFileSync(jsonPath, "utf-8"));
        data.seoTitle = fix.newSeoTitle;
        data.seoDescription = fix.newSeoDescription;
        writeFileSync(jsonPath, JSON.stringify(data, null, 2) + "\n", "utf-8");
        console.log(`✅ JSON: ${fix.jsonFile}`);
      } catch (e) {
        console.error(`⚠️  JSON 同步失敗（${fix.jsonFile}）：`, e);
      }
    }
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error("執行失敗：", err);
  process.exit(1);
});
