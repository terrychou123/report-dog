/**
 * 修正 ltc-new-director-first-week-playbook-2026 中虛構的 AI 生成功能：
 * (1) bullet「工具用對」宣稱「快速生成個案計畫初稿」
 * (2) blockquote 宣稱「支援 13 種長照機構類型的評鑑文件起稿」
 *
 * 改為符合 codebase 的段落改寫 + 評鑑分析描述。
 *
 * 使用方式：
 *   npx tsx --env-file=.env.local scripts/fix-ltc-new-director-claims.ts          # dry-run
 *   npx tsx --env-file=.env.local scripts/fix-ltc-new-director-claims.ts --apply  # 寫入 DB
 */

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { blogPosts } from "../db/schema";
import { getDbUrl } from "../db/index";
import { eq } from "drizzle-orm";

const SLUG = "ltc-new-director-first-week-playbook-2026";

const OLD_BULLET = `<li><strong>工具用對可以省一半時間：</strong>報告汪的 AI 文書助理可以幫你快速生成個案計畫初稿，讓你把時間花在審閱和修改，而不是從空白頁開始打字。</li>`;
const NEW_BULLET = `<li><strong>工具用對可以省一半時間：</strong>報告汪的 AI 段落改寫助理可以協助你把已有的粗稿快速整理為符合評鑑期待的書寫風格與 SOAP 結構，把時間花在臨床判斷與內容把關，而不是反覆修詞。</li>`;

const OLD_BLOCKQUOTE = `<blockquote>
  💡 <strong>報告汪 AI 文書助理</strong>支援 13 種長照機構類型的評鑑文件起稿，從個別照顧計畫到品質改善報告，評鑑備審更有效率。<a href="/auth/sign-up">免費試用報告汪</a>。
</blockquote>`;
const NEW_BLOCKQUOTE = `<blockquote>
  💡 <strong>報告汪</strong>內建 15 種長照機構評鑑指標 profile（涵蓋日照、住宿型、醫院、身障、托嬰等），既有報告可一次匯入，由 AI 依該機構評鑑基準做五面向比對分析（缺少資料／矛盾／應追蹤未追蹤／符合項目／改善建議），備審前快速找出缺口。<a href="/auth/sign-up">免費試用報告汪</a>。
</blockquote>`;

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
    for (const [label, oldStr] of [["bullet", OLD_BULLET], ["blockquote", OLD_BLOCKQUOTE]] as const) {
      const occ = content.split(oldStr).length - 1;
      if (occ === 0) {
        console.error(`❌ 找不到 ${label}（可能已被修改）`);
        process.exit(1);
      }
      if (occ > 1) {
        console.error(`❌ ${label} 出現 ${occ} 次（預期 1 次）`);
        process.exit(1);
      }
    }

    console.log("=== OLD bullet ===\n" + OLD_BULLET);
    console.log("\n=== NEW bullet ===\n" + NEW_BULLET);
    console.log("\n=== OLD blockquote ===\n" + OLD_BLOCKQUOTE);
    console.log("\n=== NEW blockquote ===\n" + NEW_BLOCKQUOTE);

    if (!apply) {
      console.log("\n✅ Dry-run 完成。加上 --apply 寫入 DB。");
      return;
    }

    const newContent = content
      .replace(OLD_BULLET, NEW_BULLET)
      .replace(OLD_BLOCKQUOTE, NEW_BLOCKQUOTE);

    await db
      .update(blogPosts)
      .set({ content: newContent, updatedAt: new Date() })
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
