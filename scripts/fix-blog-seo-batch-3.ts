/**
 * 第三批 GSC 驅動的 SEO 修正（套用 home-care-case-records 成功模式）
 *
 * 成功公式：問句 + 具體價值（範例/對比/模板）+ ｜報告汪
 * 標題長度 ≤ 32 全形字、description 開頭直接答搜尋意圖
 *
 * 1. home-nursing-pdca-writing-2026 — 133 imp / 3.01% / pos 7.7
 *    GSC query: 護理pdca範例、pdca 護理、護理pdca、護理pdca報告範例
 *    改進：加「好壞對比」hook、補品牌字、移除「（2026 更新）」佔位
 *
 * 2. nursing-home-continuous-improvement-2026 — 8 imp / 0% / pos 2.4
 *    排名極佳卻零點擊。title 「A4 查核缺失」太內行；改通用問句 + PDCA 策略 hook
 *
 * 3. infant-daycare-evaluation-plain-language-guide-2026 — 16 imp / 0% / pos 6.5
 *    GSC query: 托嬰指標
 *    把「看不懂？」問句搬到 title；加「範例」hook
 *
 * 4. general-nursing-home-oral-care-guide-2026 — 23 imp / 4.35% / pos 8.6
 *    title 「D2 評鑑基準」太內行；改問句開頭、加「範本」hook
 *
 * 略過：elderly-welfare-eval-top10-deficiencies（fix-batch-2 已改，仍在 14 天觀察期）
 *
 * 使用方式：
 *   npx tsx --env-file=.env.local scripts/fix-blog-seo-batch-3.ts
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
    slug: "home-nursing-pdca-writing-2026",
    jsonFile: "scripts/blog-posts/article-65-home-nursing-pdca-writing.json",
    newSeoTitle:
      "護理 PDCA 怎麼寫？4 步驟範例＋好壞對比＋居家護理模板｜報告汪",
    newSeoDescription:
      "護理 PDCA 範例怎麼寫才能讓評鑑委員一看就懂？逐步拆解 Plan（可量化目標）、Do（SOP 執行）、Check（評值指標）、Act（追蹤改善）4 步驟，附居家護理照護計畫好壞範例對比與報告模板，居服員與護理師可直接套用於評鑑文件撰寫。",
  },
  {
    slug: "nursing-home-continuous-improvement-2026",
    jsonFile: "scripts/blog-posts/article-49-nursing-home-continuous-improvement.json",
    newSeoTitle:
      "住宿型機構持續改善怎麼做？滿分機構的 PDCA 4 大策略｜報告汪",
    newSeoDescription:
      "住宿型機構評鑑想在持續改善拿滿分？本文分享連續 4 年查核缺失零失誤機構的真實策略：建立衛福、消防、建管、勞工四大缺失追蹤系統、PDCA 年度循環時程、自我查核清單，附評鑑現場可用的改善紀錄範本。",
  },
  {
    slug: "infant-daycare-evaluation-plain-language-guide-2026",
    jsonFile: "scripts/blog-posts/article-116-infant-daycare-plain-language.json",
    newSeoTitle:
      "托嬰中心評鑑指標看不懂？10 個抽象項目白話翻譯＋範例｜報告汪",
    newSeoDescription:
      "托嬰中心評鑑指標滿是「適齡」「個別化」「結構性照顧」這類抽象用語？本文針對 114-116 年度 10 個最難懂的評鑑項目，提供白話翻譯、委員查核重點與具體準備行動，涵蓋行政管理與健康安全兩大區塊，新進主管也能秒懂。",
  },
  {
    slug: "general-nursing-home-oral-care-guide-2026",
    jsonFile: "scripts/blog-posts/article-101-general-nursing-home-oral-care.json",
    newSeoTitle:
      "護理之家口腔照護怎麼做？D2 評鑑基準＋牙科轉介範本｜報告汪",
    newSeoDescription:
      "護理之家口腔照護是 115 年度評鑑新增重點 D2，沒準備好直接影響評等。本文依評鑑基準完整拆解：口腔健康評估方式、照護計畫內容、員工技能訓練安排、每日執行記錄格式、牙科轉介機制建立，附評鑑現場可用的範本。",
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
