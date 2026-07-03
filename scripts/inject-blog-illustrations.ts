/**
 * 通用內文插圖注入 harness
 *
 * 功能：
 *   1. 依 manifest 把 <figure> HTML 注入 blog_posts.content（DB）
 *   2. 同時回寫對應的 scripts/blog-posts/article-*.json（持久化）
 *   3. marker 防重複注入
 *   4. 預設 dry-run，加 --commit 才實際寫入
 *
 * CLI 用法（傳入 manifest JSON 檔）：
 *   npx tsx --env-file=.env.local scripts/inject-blog-illustrations.ts \
 *     --manifest=scripts/illustration-manifests/<slug>.json
 *   npx tsx --env-file=.env.local scripts/inject-blog-illustrations.ts \
 *     --manifest=scripts/illustration-manifests/<slug>.json --commit
 *
 * Manifest JSON 格式（scripts/illustration-manifests/<slug>.json）：
 * {
 *   "slug": "home-nursing-eval-report-writing-2026",
 *   "figures": [
 *     {
 *       "file": "home-nursing-eval-report-writing-overview.svg",
 *       "alt":  "居家護理報告書撰寫流程概覽",
 *       "caption": "圖：報告書撰寫的三大核心結構",
 *       "anchor": "</h2>",           // insertAfter 這個字串之後的第 N 次出現
 *       "anchorIndex": 0             // 0-based：第幾個 anchor（預設 0）
 *     }
 *   ]
 * }
 *
 * 也可作為函式庫被其他腳本 import：
 *   import { injectIllustrations } from "./inject-blog-illustrations";
 *   await injectIllustrations({ slug, figures, commit: true });
 */

import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { blogPosts } from "../db/schema";
import { eq } from "drizzle-orm";
import { getDbUrl } from "../db/index";

// ─── 型別 ────────────────────────────────────────────────────────────────────

export interface FigureSpec {
  /** SVG 檔名（不含路徑），例如 "home-nursing-flow.svg" → src="/blog/home-nursing-flow.svg" */
  file: string;
  /** img alt 文字 */
  alt: string;
  /** figcaption 文字，通常以「圖：」開頭 */
  caption: string;
  /** insertAfter 的錨點字串。支援多行（用 \\n 換行） */
  anchor: string;
  /** 第幾個 anchor 出現點（0-based，預設 0） */
  anchorIndex?: number;
}

export interface IllustrationManifest {
  slug: string;
  figures: FigureSpec[];
}

export interface InjectOptions {
  manifest: IllustrationManifest;
  commit?: boolean;
  /** 是否強制跳過 marker 檢查（重新注入） */
  force?: boolean;
}

// ─── 工具函數 ─────────────────────────────────────────────────────────────────

/** 將 figureSpec 轉換為標準 HTML 嵌入格式 */
function toFigureHtml(spec: FigureSpec): string {
  return `<figure style="margin: 2rem 0;">
  <img src="/blog/${spec.file}" alt="${spec.alt}" style="width:100%;border-radius:12px;" />
  <figcaption style="text-align:center;font-size:0.875rem;color:#64748b;margin-top:0.5rem;">${spec.caption}</figcaption>
</figure>`;
}

/**
 * 在第 anchorIndex 個 anchor 之後插入 html。
 * 若找不到 anchor 回傳原字串並記錄警告。
 */
function insertAfter(
  content: string,
  anchor: string,
  html: string,
  anchorIndex = 0
): { result: string; found: boolean } {
  let searchFrom = 0;
  const found = false;
  for (let i = 0; i <= anchorIndex; i++) {
    const idx = content.indexOf(anchor, searchFrom);
    if (idx === -1) {
      console.warn(`  ⚠️  找不到錨點 [${i}/${anchorIndex}]: ${anchor.slice(0, 80).replace(/\n/g, "\\n")}…`);
      return { result: content, found: false };
    }
    if (i === anchorIndex) {
      const insertPos = idx + anchor.length;
      return {
        result: content.slice(0, insertPos) + "\n" + html + content.slice(insertPos),
        found: true,
      };
    }
    searchFrom = idx + anchor.length;
  }
  return { result: content, found };
}

/**
 * 建立 slug → JSON 檔名對照表（掃描 scripts/blog-posts/ 一次）
 */
let slugToJsonCache: Map<string, string> | null = null;
function getSlugToJsonMap(): Map<string, string> {
  if (slugToJsonCache) return slugToJsonCache;
  const dir = join(process.cwd(), "scripts/blog-posts");
  const map = new Map<string, string>();
  try {
    const files = readdirSync(dir).filter((f) => f.endsWith(".json"));
    for (const filename of files) {
      try {
        const raw = readFileSync(join(dir, filename), "utf-8");
        const data = JSON.parse(raw);
        if (data.slug) map.set(data.slug, filename);
      } catch {
        // 跳過解析失敗的檔案
      }
    }
  } catch {
    console.warn("  ⚠️  無法掃描 scripts/blog-posts/ 目錄，JSON 回寫將跳過");
  }
  slugToJsonCache = map;
  return map;
}

// ─── 核心函式（可被外部 import）──────────────────────────────────────────────

export async function injectIllustrations(opts: InjectOptions): Promise<void> {
  const { manifest, commit = false, force = false } = opts;
  const { slug, figures } = manifest;
  const MARKER = `<!-- illus-injected:${slug} -->`;

  const client = postgres(getDbUrl(), { prepare: false });
  const db = drizzle(client);

  try {
    // 1. 查詢目標文章
    const [post] = await db
      .select({ id: blogPosts.id, slug: blogPosts.slug, content: blogPosts.content })
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug));

    if (!post) {
      console.error(`❌ 找不到 slug: ${slug}`);
      return;
    }

    console.log(`\n📄 ${slug}`);

    // 2. marker 防重複
    if (!force && post.content?.includes(MARKER)) {
      console.log(`⏭️  已有 marker（${MARKER}），跳過。加 --force 可強制重新注入。`);
      return;
    }

    let content = post.content ?? "";
    let injected = 0;
    let failed = 0;

    // 3. 逐張注入
    for (const spec of figures) {
      const figHtml = toFigureHtml(spec);
      const { result, found } = insertAfter(content, spec.anchor, figHtml, spec.anchorIndex ?? 0);
      if (found) {
        content = result;
        injected++;
        console.log(`  ✅ [${injected}] 注入 ${spec.file}`);
      } else {
        failed++;
        console.log(`  ❌ [${injected + failed}] 跳過 ${spec.file}（錨點未找到）`);
      }
    }

    // 4. 加 marker
    content = content + `\n${MARKER}`;

    const deltaLen = content.length - (post.content?.length ?? 0);
    console.log(`\n   注入：${injected} 張成功 / ${failed} 張失敗`);
    console.log(`   content 長度變化：+${deltaLen} 字元`);

    if (!commit) {
      console.log("\n⚡ dry-run 模式 — 未寫入。加 --commit 執行實際更新。");
      return;
    }

    // 5a. 寫入 DB
    await db
      .update(blogPosts)
      .set({ content, updatedAt: new Date() })
      .where(eq(blogPosts.slug, slug));
    console.log("✅ DB 已更新");

    // 5b. 回寫 JSON（若有對應檔案）
    const slugMap = getSlugToJsonMap();
    const jsonFilename = slugMap.get(slug);
    if (jsonFilename) {
      const jsonPath = join(process.cwd(), "scripts/blog-posts", jsonFilename);
      try {
        const raw = readFileSync(jsonPath, "utf-8");
        const data = JSON.parse(raw);
        data.content = content;
        writeFileSync(jsonPath, JSON.stringify(data, null, 2), "utf-8");
        console.log(`✅ JSON 已回寫：${jsonFilename}`);
      } catch (e) {
        console.warn(`  ⚠️  JSON 回寫失敗（${jsonFilename}）：`, e);
      }
    } else {
      console.log(`  ℹ️  此文章無對應 JSON 檔（DB-only），僅寫 DB。`);
    }

    console.log("⚠️  請呼叫 /api/revalidate-blog 清除 Next.js cache。");
  } finally {
    await client.end();
  }
}

// ─── CLI 入口 ─────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const manifestPath = args.find((a) => a.startsWith("--manifest="))?.split("=")[1];
  const commit = args.includes("--commit");
  const force = args.includes("--force");

  if (!manifestPath) {
    console.error("用法：npx tsx --env-file=.env.local scripts/inject-blog-illustrations.ts --manifest=<path> [--commit] [--force]");
    console.error("範例：--manifest=scripts/illustration-manifests/home-nursing-eval-report-writing-2026.json");
    process.exit(1);
  }

  let manifest: IllustrationManifest;
  try {
    const raw = readFileSync(manifestPath, "utf-8");
    manifest = JSON.parse(raw);
  } catch (e) {
    console.error(`❌ 無法讀取 manifest：${manifestPath}`, e);
    process.exit(1);
  }

  if (!manifest.slug || !Array.isArray(manifest.figures)) {
    console.error("❌ Manifest 格式錯誤：需包含 slug 與 figures 陣列");
    process.exit(1);
  }

  await injectIllustrations({ manifest, commit, force });
}

// 僅在直接執行時（非 import）才跑 main
if (process.argv[1]?.endsWith("inject-blog-illustrations.ts") ||
    process.argv[1]?.endsWith("inject-blog-illustrations.js")) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
