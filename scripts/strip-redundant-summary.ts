/**
 * 移除文章 body 開頭與 TL;DR (excerpt) 重複的「重點摘要」blockquote。
 *
 * 邏輯：
 * 1. 對每個 scripts/blog-posts/*.json：
 *    - 找第一個含「重點摘要：」的 <blockquote>
 *    - 若無 → 跳過
 *    - 若 article.excerpt 為空字串：把 blockquote 內容剝除「重點摘要：」前綴後回填 excerpt
 *      （截斷至 ≤150 字，於最近的句尾換行）
 *    - 從 content 移除該 blockquote（含前後一個換行）
 * 2. 同步寫回 DB blog_posts.{content, excerpt}
 *
 * 用法：
 *   npx tsx --env-file=.env.local scripts/strip-redundant-summary.ts            # dry-run
 *   npx tsx --env-file=.env.local scripts/strip-redundant-summary.ts --apply    # 實際寫入
 */

import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq } from "drizzle-orm";
import { blogPosts } from "../db/schema";
import { getDbUrl } from "../db/index";

const POSTS_DIR = join(__dirname, "blog-posts");
const APPLY = process.argv.includes("--apply");

interface PostJson {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  [k: string]: unknown;
}

interface ChangeReport {
  slug: string;
  action: "delete-only" | "backfill+delete" | "skip-no-summary" | "skip-no-blockquote";
  excerptBefore?: string;
  excerptAfter?: string;
  removedBlockquote?: string;
}

/** 截斷 summary 到 ≤150 字：優先在第一個句尾（。！？）切，超出加 … */
function truncateExcerpt(text: string, maxLen = 150): string {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (cleaned.length <= maxLen) return cleaned;

  // 找最接近 maxLen 的句尾
  const candidates = [...cleaned.matchAll(/[。！？]/g)]
    .map((m) => m.index! + 1)
    .filter((i) => i <= maxLen);
  if (candidates.length > 0) {
    return cleaned.slice(0, candidates[candidates.length - 1]);
  }
  // 沒有合適句尾就硬截
  return cleaned.slice(0, maxLen - 1) + "…";
}

/** 從文章 content 中找第一個含「重點摘要：」的 blockquote 並回傳資訊 */
function findSummaryBlockquote(content: string): {
  match: string;
  innerText: string;
  innerCleanText: string;
} | null {
  const re = /<blockquote[^>]*>([\s\S]*?)<\/blockquote>/i;
  const m = re.exec(content);
  if (!m) return null;
  const inner = m[1];
  const innerText = inner.replace(/<[^>]+>/g, "").trim();
  if (!innerText.includes("重點摘要")) return null;
  // 剝除「重點摘要：」（含中英冒號）前綴
  const cleaned = innerText.replace(/^重點摘要\s*[：:]\s*/, "").trim();
  return { match: m[0], innerText, innerCleanText: cleaned };
}

/** 從 content 移除指定 blockquote 字串（含前後可能的空行） */
function removeBlockquote(content: string, blockquoteHtml: string): string {
  // 把 blockquote 連同前後的單一換行一併移除，避免留下空行
  const escaped = blockquoteHtml.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`\\s*${escaped}\\s*\\n?`, "");
  return content.replace(re, "\n\n").replace(/\n{3,}/g, "\n\n");
}

async function main() {
  const files = readdirSync(POSTS_DIR).filter((f) => f.endsWith(".json"));
  console.log(`\n📂 掃描 ${files.length} 個 JSON 檔...`);
  console.log(`🔧 模式：${APPLY ? "✅ APPLY（實際寫入）" : "🟡 DRY-RUN（不寫入）"}\n`);

  const reports: ChangeReport[] = [];
  const updates: Array<{ slug: string; content: string; excerpt: string }> = [];

  for (const file of files) {
    const filepath = join(POSTS_DIR, file);
    const post = JSON.parse(readFileSync(filepath, "utf-8")) as PostJson;
    const found = findSummaryBlockquote(post.content);

    if (!found) {
      reports.push({ slug: post.slug, action: "skip-no-summary" });
      continue;
    }

    const excerptIsEmpty = !post.excerpt?.trim();
    const newContent = removeBlockquote(post.content, found.match);

    let newExcerpt = post.excerpt;
    let action: ChangeReport["action"] = "delete-only";
    if (excerptIsEmpty) {
      newExcerpt = truncateExcerpt(found.innerCleanText);
      action = "backfill+delete";
    }

    reports.push({
      slug: post.slug,
      action,
      excerptBefore: post.excerpt,
      excerptAfter: newExcerpt,
      removedBlockquote: found.innerCleanText.slice(0, 60) + "...",
    });

    updates.push({ slug: post.slug, content: newContent, excerpt: newExcerpt });

    // 寫回 JSON
    if (APPLY) {
      const updated = { ...post, content: newContent, excerpt: newExcerpt };
      writeFileSync(filepath, JSON.stringify(updated, null, 2) + "\n", "utf-8");
    }
  }

  // 統計
  const stats = reports.reduce(
    (acc, r) => {
      acc[r.action] = (acc[r.action] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  console.log("📊 統計：");
  console.log(`  - 純刪除 (delete-only): ${stats["delete-only"] ?? 0}`);
  console.log(`  - 回填 + 刪除 (backfill+delete): ${stats["backfill+delete"] ?? 0}`);
  console.log(`  - 跳過 (無重點摘要): ${stats["skip-no-summary"] ?? 0}`);

  // 列出回填案例
  const backfills = reports.filter((r) => r.action === "backfill+delete");
  if (backfills.length > 0) {
    console.log("\n📝 回填 excerpt 案例：");
    for (const r of backfills) {
      console.log(`  - ${r.slug}`);
      console.log(`    新 excerpt (${r.excerptAfter?.length} 字): ${r.excerptAfter}`);
    }
  }

  // 同步 DB
  if (APPLY && updates.length > 0) {
    console.log(`\n💾 同步 DB（${updates.length} 篇）...`);
    const sql = postgres(getDbUrl(), { prepare: false });
    const db = drizzle(sql);
    let synced = 0;
    let missing = 0;
    for (const u of updates) {
      const result = await db
        .update(blogPosts)
        .set({ content: u.content, excerpt: u.excerpt, updatedAt: new Date() })
        .where(eq(blogPosts.slug, u.slug))
        .returning({ id: blogPosts.id });
      if (result.length > 0) synced++;
      else missing++;
    }
    console.log(`  ✅ DB 已更新：${synced}`);
    if (missing > 0) console.log(`  ⚠️  DB 中找不到的 slug：${missing}（JSON 已更新但 DB 無對應）`);
    await sql.end();
  } else if (!APPLY) {
    console.log(`\n💡 加上 --apply 旗標即可實際寫入（共 ${updates.length} 篇變更）`);
  }
}

main().catch((err) => {
  console.error("❌ 執行失敗：", err);
  process.exit(1);
});
