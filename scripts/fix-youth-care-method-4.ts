/**
 * 修正 youth-care-case-record-tips-2026 「做法 4」段落
 * 把通用 AI 工具描述（「AI 生成計畫框架」「AI 整理成月報格式」）改為
 * 報告汪實際具備的功能（段落改寫 + 評鑑比對分析）。
 *
 * 使用方式：
 *   npx tsx --env-file=.env.local scripts/fix-youth-care-method-4.ts          # dry-run
 *   npx tsx --env-file=.env.local scripts/fix-youth-care-method-4.ts --apply  # 寫入 DB
 */

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { blogPosts } from "../db/schema";
import { getDbUrl } from "../db/index";
import { eq } from "drizzle-orm";

const SLUG = "youth-care-case-record-tips-2026";

// 抓「做法 4」H2 到下一個 H2 之前的整段
const OLD_RE = /<h2[^>]*>做法\s*4[\s\S]*?(?=<h2)/;

const NEW_SECTION = `<h2>做法 4：善用 AI 輔助精修與評鑑比對</h2>

<p>AI 不是要取代社工的臨床判斷或代寫個案紀錄——個案的個別化只有社工能掌握。但社工把粗稿寫好之後，AI 可以協助你做兩件事：</p>

<ul>
<li><strong>段落改寫：</strong>選取已寫好的處遇計畫段落或月報內容，輸入指令（如「改寫為更精準的 SOAP 格式」「整合多項目標於一段」），AI 在保留原意的前提下改寫並支援多輪追問，減少反覆修詞時間</li>
<li><strong>評鑑比對：</strong>把個案紀錄、處遇計畫等文件上傳後，AI 依照 112 年度兒少安置機構評鑑指標逐項比對，從五面向（缺少資料／矛盾／應追蹤未追蹤／符合項目／改善建議）產出檢核清單</li>
</ul>

<p>使用 AI 工具的原則是：<strong>社工先寫粗稿、AI 協助精修，最後由社工確認內容正確性與個案個別性。</strong>評鑑委員能分辨「千篇一律的 AI 文字」和「有真實服務記錄的文件」——內容必須反映機構對個案的實際了解。</p>

`;

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
      console.error(`❌ 找不到 slug="${SLUG}"`);
      process.exit(1);
    }

    const content = post.content;
    const match = content.match(OLD_RE);
    if (!match) {
      console.error("❌ 找不到「做法 4」section");
      process.exit(1);
    }
    const oldSection = match[0];
    const occ = content.split(oldSection).length - 1;
    if (occ !== 1) {
      console.error(`❌ section 出現 ${occ} 次（預期 1 次）`);
      process.exit(1);
    }

    console.log("=== OLD ===\n" + oldSection);
    console.log("\n=== NEW ===\n" + NEW_SECTION);

    if (!apply) {
      console.log("\n✅ Dry-run 完成。加上 --apply 寫入 DB。");
      return;
    }

    await db
      .update(blogPosts)
      .set({ content: content.replace(oldSection, NEW_SECTION), updatedAt: new Date() })
      .where(eq(blogPosts.slug, SLUG));

    console.log("\n✅ DB 已更新。");
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error("執行失敗：", err);
  process.exit(1);
});
