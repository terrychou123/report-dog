/**
 * 一次性腳本：修正 3 篇低 CTR blog 文章的 seoTitle / seoDescription
 *
 * 依據：GSC 2026-05-23~06-19 low-ctr 報告
 * - hospital-evaluation-114-complete-guide:     165 曝光 / 0.61% CTR / 排名 8.6
 * - hospital-eval-115-criteria-reform-2026:     122 曝光 / 2.46% CTR / 排名 7.9
 * - disability-welfare-management-system-comparison-2026: 175 曝光 / 2.86% CTR / 排名 8.1
 *
 * 執行：npx tsx scripts/fix-low-ctr-seo-2026-06-22.ts
 */
import { db } from "../db/index";
import { blogPosts } from "../db/schema";
import { eq } from "drizzle-orm";

// title 25-30 字、description 70-80 字（CLAUDE.md 規範）
const updates: {
  slug: string;
  seoTitle: string;
  seoDescription: string;
  reason: string;
}[] = [
  {
    slug: "hospital-evaluation-114-complete-guide",
    // 原 title 已含「114年度」→ 使用者搜 115 略過；上次腳本已移除年度
    // 本次進一步加強實用信號「備審時間表」，降低曝光被跳過的機率
    seoTitle: "醫院評鑑準備攻略｜124條基準、20必要條文清單＋備審時間表",
    seoDescription:
      "醫院評鑑共 124 條基準，含 20 項必要條文（失分不通過）與 42 項重點條文。本文逐章解析 Part1 經營管理 7 章、Part2 醫療照護 8 章架構，列出必要條文清單，並提供 6 個月備審時間表，幫助區域、地區醫院系統化完成備審準備。",
    reason: "165 曝光 0.61% CTR：加強「備審時間表」實用信號",
  },
  {
    slug: "hospital-eval-115-criteria-reform-2026",
    // 115 年新制文章，原 seoTitle 不明（DB-only）；補 115 改制重點關鍵字
    seoTitle: "115年醫院評鑑新制改革重點｜基準架構異動與備審策略解析",
    seoDescription:
      "115 年醫院評鑑制度更新：評鑑架構調整為 15 章 124 條，必要條文增至 20 項，重點條文新增 42 項。本文解析主要異動方向、新制評鑑策略，幫助區域、地區醫院備評團隊掌握 115 年評鑑重點。",
    reason: "122 曝光 2.46% CTR：補 115 年改制關鍵字與具體數字",
  },
  {
    slug: "disability-welfare-management-system-comparison-2026",
    // 對應查詢「身障個管系統」（78 曝光 0% CTR）；原 title/description 未包含「系統」關鍵字
    seoTitle: "身障福利個案管理系統怎麼選｜2026年功能比較完整指南",
    seoDescription:
      "身障機構、個管社工選系統必看：從功能完整性、操作易用度、費用三面向比較身障個案管理系統，解析評鑑備審文件整合重點，幫助身障服務機構找到最適合的個管系統，提升文書效率。",
    reason: "175 曝光 2.86% CTR：補「系統」「身障個管」關鍵字對齊搜尋意圖",
  },
];

async function main() {
  for (const u of updates) {
    const rows = await db
      .select({ seoTitle: blogPosts.seoTitle, seoDescription: blogPosts.seoDescription })
      .from(blogPosts)
      .where(eq(blogPosts.slug, u.slug));

    if (!rows.length) {
      console.log(`❌ 找不到文章：${u.slug}`);
      continue;
    }

    console.log(`\n--- ${u.slug} ---`);
    console.log("  原 seoTitle:", rows[0].seoTitle ?? "(null)");
    console.log("  原 seoDescription:", rows[0].seoDescription ?? "(null)");
    console.log("  原因:", u.reason);

    await db
      .update(blogPosts)
      .set({ seoTitle: u.seoTitle, seoDescription: u.seoDescription })
      .where(eq(blogPosts.slug, u.slug));

    console.log("  ✅ 已更新");
  }

  console.log("\n全部完成");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
