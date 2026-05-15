/**
 * 第四批 GSC 驅動的 SEO 修正（Batch 3 — 撰寫/紀錄/指南類套公式）
 *
 * 公式：問句 hook + 具體價值（範例/自查清單/技巧）+ ｜報告汪
 * 長度 ≤ 32 全形字、description 開頭答搜尋意圖
 *
 * 1. disability-welfare-isp-writing-guide-2026
 *    「攻略」→「怎麼寫？5 大步驟」；加具體評鑑指標編號（4101-4103）
 *
 * 2. general-nursing-home-care-plan-writing-2026
 *    已有問句，移除「B1」術語；加「AI 撰寫技巧」hook
 *
 * 3. nursing-home-isp-writing-example-2026
 *    「撰寫範例 2026」→「怎麼寫？B2 計畫範例＋自查清單」
 *
 * 4. nursing-home-eval-nursing-records-2026
 *    「評鑑技巧 2026」→「怎麼寫？5 個委員必查細節＋常見錯誤」
 *
 * 使用方式：
 *   npx tsx --env-file=.env.local scripts/fix-blog-seo-batch-4.ts
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
    slug: "disability-welfare-isp-writing-guide-2026",
    jsonFile: "scripts/blog-posts/article-192-disability-welfare-isp-writing-guide.json",
    newSeoTitle:
      "身心障礙機構 ISP 怎麼寫？5 大步驟＋4101-4103 範例｜報告汪",
    newSeoDescription:
      "身心障礙福利機構評鑑 ISP 三項（4101+4102+4103）合計 12 分，是核心備審重點。本文拆解 5 大撰寫步驟：適齡評估工具選用（兒童/成人/臥床/精神障礙）、SMART 目標設定、每 2 週執行記錄、半年檢討通知家屬，附完整撰寫範例。",
  },
  {
    slug: "general-nursing-home-care-plan-writing-2026",
    jsonFile: "scripts/blog-posts/article-93-general-nursing-home-care-plan-writing.json",
    newSeoTitle:
      "護理之家照護計畫怎麼寫？個別化計畫範例＋AI 撰寫技巧｜報告汪",
    newSeoDescription:
      "一般護理之家評鑑 B1 個別化照護計畫怎麼寫才不失分？逐步拆解入住 24 小時初評、72 小時完整評估、跨專業簽名、每 3 個月修訂、評值記錄五大環節，附範例與常見失分原因，並說明 AI 如何協助護理師快速產出符合格式的計畫初稿。",
  },
  {
    slug: "nursing-home-isp-writing-example-2026",
    jsonFile: "scripts/blog-posts/article-30-nursing-home-isp-writing.json",
    newSeoTitle:
      "住宿型機構 ISP 怎麼寫？B2 計畫範例＋自查清單｜報告汪",
    newSeoDescription:
      "住宿型機構 B2 個案服務計畫（ISP）是評鑑二級加強項目，最容易被扣分。本文提供 72 小時初評（跌倒/壓損/營養）、每 3 個月評值、半年家屬共審的完整撰寫範例與自查清單，對應 B2/B5/B10/B16 基準，從「有寫」升級到「符合評鑑要求」。",
  },
  {
    slug: "nursing-home-eval-nursing-records-2026",
    jsonFile: "scripts/blog-posts/article-29-nursing-home-nursing-records.json",
    newSeoTitle:
      "住宿型機構護理紀錄怎麼寫？5 個委員必查細節＋常見錯誤｜報告汪",
    newSeoDescription:
      "住宿型機構評鑑護理紀錄最容易失分——不是沒記，而是不符合委員要求。本文逐一拆解評鑑委員最在意的 5 個細節，對應 B2 個案計畫、B9 醫師巡診、B13/B14 跌倒壓損、B16 約束、B17 感染預防，附常見錯誤與改善範例。",
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
