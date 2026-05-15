/**
 * 刪除 youth-care-case-record-tips-2026 文章中「做法 4 / 省時提示」blockquote。
 * 該段落宣稱報告汪可「依照 112 年度兒少安置機構評鑑指標，輔助生成處遇計畫初稿、
 * 督導記錄格式，以及自動整理評鑑備審清單」——與實際功能不符。
 *
 * 使用方式：
 *   npx tsx --env-file=.env.local scripts/fix-youth-care-case-record-tips.ts          # dry-run
 *   npx tsx --env-file=.env.local scripts/fix-youth-care-case-record-tips.ts --apply  # 寫入 DB
 */

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { blogPosts } from "../db/schema";
import { getDbUrl } from "../db/index";
import { eq } from "drizzle-orm";

const SLUG = "youth-care-case-record-tips-2026";

const OLD_BLOCKQUOTE = `<blockquote>💡 <strong>省時提示：</strong><a href="/auth/sign-up">報告汪</a> 的 AI 文書助理，專門針對長照和社會福利機構的評鑑需求設計，可以依照 112 年度兒少安置機構評鑑指標，輔助生成處遇計畫初稿、督導記錄格式，以及自動整理評鑑備審清單。</blockquote>`;

async function main() {
  const apply = process.argv.includes("--apply");
  const client = postgres(getDbUrl(), { prepare: false });
  const db = drizzle(client);

  try {
    const [post] = await db
      .select({ content: blogPosts.content })
      .from(blogPosts)
      .where(eq(blogPosts.slug, SLUG));

    if (!post?.content) {
      console.error(`❌ 找不到 slug="${SLUG}" 的文章或內容為空`);
      process.exit(1);
    }

    const occurrences = post.content.split(OLD_BLOCKQUOTE).length - 1;
    if (occurrences === 0) {
      console.error("❌ 找不到目標 blockquote，可能已被刪除或 HTML 格式不同");
      const idx = post.content.indexOf("省時提示");
      if (idx >= 0) {
        console.log("\n--- 周圍 HTML（供診斷）---");
        console.log(post.content.slice(Math.max(0, idx - 50), idx + 400));
      }
      process.exit(1);
    }
    if (occurrences > 1) {
      console.error(`❌ blockquote 出現 ${occurrences} 次（預期 1 次），中止`);
      process.exit(1);
    }

    console.log("=== 將刪除以下 blockquote ===");
    console.log(OLD_BLOCKQUOTE);

    if (!apply) {
      console.log("\n✅ Dry-run 完成。加上 --apply 寫入 DB。");
      return;
    }

    // 刪除 blockquote 並把前後可能殘留的空白行收斂
    let newContent = post.content.replace(OLD_BLOCKQUOTE, "");
    newContent = newContent.replace(/\n{3,}/g, "\n\n");

    await db
      .update(blogPosts)
      .set({ content: newContent, updatedAt: new Date() })
      .where(eq(blogPosts.slug, SLUG));

    console.log("\n✅ DB 已更新。請 commit + push 觸發 Vercel 重新部署以清除 cache。");
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error("執行失敗：", err);
  process.exit(1);
});
