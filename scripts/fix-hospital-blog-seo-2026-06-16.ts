/**
 * 一次性腳本：修正 hospital-evaluation-114-complete-guide 的 seoTitle
 * 問題：title 含「114年度」→ 2026 年用戶搜尋 115 時看到 114 直接略過，導致 0% CTR（160 曝光）
 * 修正：移除年度數字，改為通用型 title（內容本身仍有參考價值）
 */
import { db } from "../db/index";
import { blogPosts } from "../db/schema";
import { eq } from "drizzle-orm";

async function main() {
  const slug = "hospital-evaluation-114-complete-guide";

  const rows = await db
    .select({ seoTitle: blogPosts.seoTitle, seoDescription: blogPosts.seoDescription })
    .from(blogPosts)
    .where(eq(blogPosts.slug, slug));

  if (!rows.length) {
    console.log(`❌ 找不到文章：${slug}`);
    process.exit(1);
  }

  console.log("現有 seoTitle:", rows[0].seoTitle);
  console.log("現有 seoDescription:", rows[0].seoDescription);

  await db
    .update(blogPosts)
    .set({
      seoTitle: "醫院評鑑準備完整攻略｜124條基準、20項必要條文逐項解析｜報告汪",
      seoDescription:
        "醫院評鑑共 124 條基準，含 20 項必要條文（不可失分）與 42 項重點條文。本文解析 Part1 經營管理 7 章、Part2 醫療照護 8 章架構，列出必要條文清單，並提供 6 個月備審時間表，幫助區域、地區醫院系統化完成評鑑準備。",
    })
    .where(eq(blogPosts.slug, slug));

  console.log("✅ seoTitle / seoDescription 已更新");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
