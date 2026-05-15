/**
 * 修正 disability-welfare-management-system-comparison-2026 文章中
 * 編造的 AI 功能描述（ISP 三部曲快速起稿、多元障別適配）
 * 改寫為 codebase 中真實具備的功能描述。
 *
 * 使用方式：
 *   npx tsx --env-file=.env.local scripts/fix-disability-welfare-blog-ai-claims.ts          # dry-run（只印出 diff）
 *   npx tsx --env-file=.env.local scripts/fix-disability-welfare-blog-ai-claims.ts --apply  # 真正寫入 DB
 */

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { blogPosts } from "../db/schema";
import { getDbUrl } from "../db/index";
import { eq } from "drizzle-orm";

const SLUG = "disability-welfare-management-system-comparison-2026";

// 用「搜尋整個段落容器」的方式定位：
// 找到 "報告汪如何支援身障機構" 這個 section 的舊有兩個 bullet 標題關鍵字
const OLD_BULLET_1_ANCHOR = "ISP 三部曲快速起稿";
const OLD_BULLET_2_ANCHOR = "多元障別適配";

// DB 實際使用 <ul><li> 結構，新內容也用 <li>
const NEW_BULLETS_HTML = `<li><strong>ISP 文件 AI 比對分析：</strong>上傳既有 ISP 草稿，AI 依 109 年度身障機構評鑑指標項目 32–34（4101 計畫擬訂、4102 目標設定、4103 目標執行）逐項分析缺漏，指出哪些必備內容（如服務對象意願、跨專業整合、目標可衡量性）尚未呈現，社工師依建議補強。</li>
  <li><strong>段落智能改寫與 SOAP 結構化：</strong>選取既有報告段落，AI 可一鍵改寫為符合評鑑期待的書寫風格，包括將敘述式記錄轉為 SOAP（主觀／客觀／評估／計畫）結構，協助統一文件格式。</li>
  <li><strong>49 項評鑑指標自動評分：</strong>選定整份報告後啟動評鑑分析，AI 依 109 年度身障機構評鑑指標（3 大區塊 49 項）做五面向逐項檢核——缺少資料、內容矛盾、應追蹤未追蹤、符合項目、改善建議——直接產出可作為自評初稿的清單。</li>`;

async function main() {
  const apply = process.argv.includes("--apply");

  const client = postgres(getDbUrl(), { prepare: false });
  const db = drizzle(client);

  try {
    const [post] = await db
      .select({ id: blogPosts.id, content: blogPosts.content })
      .from(blogPosts)
      .where(eq(blogPosts.slug, SLUG));

    if (!post) {
      console.error(`❌ 找不到 slug="${SLUG}" 的文章`);
      process.exit(1);
    }

    const content = post.content ?? "";

    // 確認兩個舊 anchor 都存在
    if (!content.includes(OLD_BULLET_1_ANCHOR)) {
      console.error(`❌ 找不到「${OLD_BULLET_1_ANCHOR}」，可能已被改過或 HTML 格式不同`);
      console.error("請先手動檢視 DB content");
      process.exit(1);
    }
    if (!content.includes(OLD_BULLET_2_ANCHOR)) {
      console.error(`❌ 找不到「${OLD_BULLET_2_ANCHOR}」，可能已被改過或 HTML 格式不同`);
      process.exit(1);
    }

    // 用 regex 精準抓取兩個舊 bullet 的完整 <li> 段落
    // DB 實際結構是 <ul><li>...</li><li>...</li></ul>
    const OLD_BLOCK_RE =
      /<li[^>]*><strong>ISP 三部曲快速起稿：<\/strong>[\s\S]*?<\/li>\s*<li[^>]*><strong>多元障別適配：<\/strong>[\s\S]*?<\/li>/;

    const match = content.match(OLD_BLOCK_RE);
    if (!match) {
      console.error("❌ Regex 無法匹配連續兩個 bullet 段落，請手動確認 HTML 結構");
      // 印出包含 anchor 字串的前後 500 字供診斷
      const idx = content.indexOf(OLD_BULLET_1_ANCHOR);
      console.log("\n--- 周圍 HTML（供診斷）---");
      console.log(content.slice(Math.max(0, idx - 50), idx + 500));
      process.exit(1);
    }

    const oldBlock = match[0];
    console.log("\n=== OLD (要替換的文字) ===");
    console.log(oldBlock);
    console.log("\n=== NEW (替換後的文字) ===");
    console.log(NEW_BULLETS_HTML);

    // 確認 oldBlock 只出現一次
    const occurrences = content.split(oldBlock).length - 1;
    if (occurrences !== 1) {
      console.error(`\n❌ OLD_BLOCK 在 content 出現 ${occurrences} 次（預期 1 次），中止`);
      process.exit(1);
    }

    if (!apply) {
      console.log("\n✅ Dry-run 完成。加上 --apply 參數以寫入 DB。");
      return;
    }

    const newContent = content.replace(oldBlock, NEW_BULLETS_HTML);
    await db
      .update(blogPosts)
      .set({ content: newContent, updatedAt: new Date() })
      .where(eq(blogPosts.slug, SLUG));

    console.log("\n✅ DB 已更新。請觸發 cache revalidation 或重新部署以反映到線上頁面。");
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error("執行失敗：", err);
  process.exit(1);
});
