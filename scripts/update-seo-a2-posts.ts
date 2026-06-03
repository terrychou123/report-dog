/**
 * A2: 更新 GSC position 4–11 金礦 query 對應 blog 文章的 seoTitle / seoDescription / updatedAt
 * 目標：精準命中 exact-match query，推進 top 3
 *
 * 執行：npx tsx scripts/update-seo-a2-posts.ts
 */
import { db } from "../db/index";
import { blogPosts } from "../db/schema";
import { eq } from "drizzle-orm";

const now = new Date();

// 格式化 description 時確認 70–80 字
const updates: {
  slug: string;
  label: string;
  seoTitle: string;
  seoDescription: string;
}[] = [
  {
    slug: "elderly-welfare-eval-115-criteria-full-2026",
    label: "老人福利機構評鑑基準 2026",
    // 精準命中「115年老人福利機構評鑑指標」（pos 5.1 / 231曝光 / 8.66% CTR）
    seoTitle: "115年老人福利機構評鑑指標完整解析｜77項基準備評攻略",
    seoDescription:
      "115年老人福利機構評鑑指標77項逐條解析，6大區塊優先準備順序＋高頻缺失案例提醒，掌握搶拿優等分級關鍵策略，附免費 Excel 自評表下載，評鑑備評不踩雷。",
  },
  {
    slug: "postpartum-eval-115-criteria-full-2026",
    label: "產後護理之家評鑑基準 2026",
    // 精準命中「115年產後護理之家評鑑基準」（pos 4.5 / 28曝光 / 3.57% CTR）
    seoTitle: "115年產後護理之家評鑑基準完整解析｜月子中心備評攻略",
    seoDescription:
      "115年產後護理之家評鑑基準逐條解析，評鑑區塊重點＋地雷項目提醒，提升評鑑等級關鍵策略，月子中心管理人員備評必讀，附免費 Excel 自評表下載。",
  },
  {
    slug: "nursing-pdca-template-full-guide-2026",
    label: "護理 PDCA 報告範例",
    // 精準命中「護理pdca報告範例」（pos 7.1 / 267曝光 / 11.61% CTR）+ 「護理pdca範例」
    seoTitle: "護理 PDCA 報告範例完整模板｜品質改善計畫撰寫指南 2026",
    seoDescription:
      "護理 PDCA 報告範例完整模板：Plan（計畫）、Do（執行）、Check（查核）、Act（行動）四階段逐步圖解，附長照機構品質改善真實案例，複製即用，AI 輔助生成。",
  },
  {
    slug: "pdca",
    label: "PDCA 報告範例（總覽）",
    // 精準命中「pdca報告範例」（pos 7.7 / 118曝光 / 9.32% CTR）
    seoTitle: "PDCA 報告範例｜長照機構品質改善計畫完整寫法 2026",
    seoDescription:
      "長照機構 PDCA 報告範例：計畫、執行、查核、行動四步驟撰寫指南，涵蓋護理之家、居服、日照等機構案例，評鑑備審必備，提供 AI 輔助改寫工具免費體驗。",
  },
];

async function main() {
  console.log("=== A2 SEO update ===");
  for (const u of updates) {
    const result = await db
      .update(blogPosts)
      .set({
        seoTitle: u.seoTitle,
        seoDescription: u.seoDescription,
        updatedAt: now,
      })
      .where(eq(blogPosts.slug, u.slug))
      .returning({ slug: blogPosts.slug });

    if (result.length > 0) {
      console.log(`✅ ${u.slug}`);
      console.log(`   seoTitle: ${u.seoTitle}`);
      console.log(`   desc len: ${u.seoDescription.length} chars`);
    } else {
      console.log(`⚠️  slug 不存在，跳過: ${u.slug}`);
    }
  }
  console.log("Done.");
}

main().catch(console.error).finally(() => process.exit(0));
