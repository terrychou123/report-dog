/**
 * 修正 postpartum-small-center-survival-2026 FAQ 答案中虛構的 AI 功能：
 * 「AI 工具（如報告汪）讓護理師不需要從零撰寫評鑑文件，只需確認 AI 生成的初稿」
 * 改為符合 codebase 的段落改寫 + 評鑑分析描述。
 *
 * 使用方式：
 *   npx tsx --env-file=.env.local scripts/fix-postpartum-small-center-claims.ts          # dry-run
 *   npx tsx --env-file=.env.local scripts/fix-postpartum-small-center-claims.ts --apply  # 寫入 DB
 */

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { blogPosts } from "../db/schema";
import { getDbUrl } from "../db/index";
import { eq } from "drizzle-orm";

const SLUG = "postpartum-small-center-survival-2026";

const OLD_PARA = `<p>對於人力有限的小型機構，最有效的投資是「標準化記錄模板」和「AI 輔助文書工具」。模板讓每位護理師用統一格式記錄，減少後續整理時間；AI 工具（如報告汪）讓護理師不需要從零撰寫評鑑文件，只需確認 AI 生成的初稿，大幅縮短文書準備時間。</p>`;
const NEW_PARA = `<p>對於人力有限的小型機構，最有效的投資是「標準化記錄模板」和「AI 輔助文書工具」。模板讓每位護理師用統一格式記錄，減少後續整理時間；AI 工具（如報告汪）可協助把護理師已完成的粗稿改寫為符合評鑑期待的書寫風格與 SOAP 結構，或一次比對多份文件與 115 年度產後護理之家評鑑基準，找出尚未補齊的缺漏項目，大幅縮短反覆修改的時間。</p>`;

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
    const occ = content.split(OLD_PARA).length - 1;
    if (occ === 0) {
      console.error("❌ 找不到目標段落（可能已被修改）");
      const idx = content.indexOf("從零撰寫評鑑文件");
      if (idx >= 0) console.log(content.slice(Math.max(0, idx - 100), idx + 400));
      process.exit(1);
    }
    if (occ > 1) {
      console.error(`❌ 段落出現 ${occ} 次（預期 1 次）`);
      process.exit(1);
    }

    console.log("=== OLD ===\n" + OLD_PARA);
    console.log("\n=== NEW ===\n" + NEW_PARA);

    if (!apply) {
      console.log("\n✅ Dry-run 完成。加上 --apply 寫入 DB。");
      return;
    }

    await db
      .update(blogPosts)
      .set({ content: content.replace(OLD_PARA, NEW_PARA), updatedAt: new Date() })
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
