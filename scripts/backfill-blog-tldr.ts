/**
 * 補齊 blog_posts 缺漏的 excerpt（TL;DR）
 * 執行：npx tsx --env-file=.env.local scripts/backfill-blog-tldr.ts
 */
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq } from "drizzle-orm";

const backfills: { slug: string; excerpt: string }[] = [
  {
    slug: "elderly-welfare-eval-c-section-safety",
    excerpt:
      "老福機構 C 區 16 項指標中，C4、C9、C10、C11、C12、C15 共 6 項為一級必要，任一不符即一票否決。本文逐項拆解現場測試、文件備齊、年度演練要點，協助主管系統性追蹤準備進度。",
  },
  {
    slug: "elderly-welfare-fire-evacuation-guide",
    excerpt:
      "C9-C12 四項全為一級必要：5 年消防申報、雙向逃生路徑、年度複合型＋夜間演練、外籍看護工防災訓練。本文提供逐項實務操作步驟與分工建議，避免最常被忽略的失分點。",
  },
];

async function main() {
  for (const { slug, excerpt } of backfills) {
    await db
      .update(blogPosts)
      .set({ excerpt, updatedAt: new Date() })
      .where(eq(blogPosts.slug, slug));
    console.log(`✅ updated: ${slug} (${excerpt.length} chars)`);
  }
  console.log("\n完成。請確認 Vercel 快取已失效（`revalidateTag` 於 PUT 路由自動觸發）。");
}

main().catch(console.error).finally(() => process.exit(0));
