/**
 * 一次性腳本：為 nursing-pdca-quality-improvement-examples-2026 注入封面圖與 5 張內文插圖
 *
 * 用法（dry-run，預設）：
 *   npx tsx --env-file=.env.local scripts/add-pdca-illustrations.ts
 *
 * 用法（寫入 DB）：
 *   npx tsx --env-file=.env.local scripts/add-pdca-illustrations.ts --commit
 *
 * 注意：使用 marker 註解 <!-- pdca-illustrations-injected --> 防止重複注入。
 */

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { blogPosts } from "../db/schema";
import { eq } from "drizzle-orm";
import { getDbUrl } from "../db/index";

const isDryRun = !process.argv.includes("--commit");
const SLUG = "nursing-pdca-quality-improvement-examples-2026";
const MARKER = "<!-- pdca-illustrations-injected -->";

// 封面資訊
const COVER_URL = "/blog/nursing-pdca-examples-cover.svg";
const COVER_ALT = "護理 PDCA 三大機構實戰範例：住宿型、居家護理、日照";

// 5 張插圖的 HTML（嵌入格式依 svg-illustration SKILL 規範）
const FIG1 = `<figure style="margin: 2rem 0;">
  <img src="/blog/nursing-pdca-cycle-flow.svg" alt="PDCA 四階段循環：Plan 計畫→Do 執行→Check 查核→Act 行動" style="width:100%;border-radius:12px;" />
  <figcaption style="text-align:center;font-size:0.875rem;color:#64748b;margin-top:0.5rem;">圖：PDCA 四階段循環，每階段各有明確任務，缺一不可</figcaption>
</figure>`;

const FIG2 = `<figure style="margin: 2rem 0;">
  <img src="/blog/nursing-home-fall-rate-improvement.svg" alt="住宿型機構跌倒發生率改善前後對比：第一季 8.3% 降至第二季 2.8%，低於目標閾值 4%" style="width:100%;border-radius:12px;" />
  <figcaption style="text-align:center;font-size:0.875rem;color:#64748b;margin-top:0.5rem;">圖：B1 範例 — 住民跌倒發生率由 8.3% 降至 2.8%，達成目標</figcaption>
</figure>`;

const FIG3 = `<figure style="margin: 2rem 0;">
  <img src="/blog/home-nursing-skin-injury-improvement.svg" alt="居家護理皮膚損傷發生率改善前後對比：3月 14% 降至 5月 9%，低於監測閾值 10%" style="width:100%;border-radius:12px;" />
  <figcaption style="text-align:center;font-size:0.875rem;color:#64748b;margin-top:0.5rem;">圖：A5 範例 — 皮膚損傷發生率由 14% 降至 9%，低於監測閾值</figcaption>
</figure>`;

const FIG4 = `<figure style="margin: 2rem 0;">
  <img src="/blog/daycare-activity-participation-improvement.svg" alt="日照中心日間活動參與率改善前後對比：上季 68% 提升至下季 78%，朝目標 80% 持續改善" style="width:100%;border-radius:12px;" />
  <figcaption style="text-align:center;font-size:0.875rem;color:#64748b;margin-top:0.5rem;">圖：第22條範例 — 活動參與率由 68% 提升至 78%，持續朝目標前進</figcaption>
</figure>`;

const FIG5 = `<figure style="margin: 2rem 0;">
  <img src="/blog/nursing-pdca-auditor-checklist.svg" alt="評鑑委員查核 4 大重點：翻閱品質會議紀錄、比對指標統計表、追蹤 Act 執行紀錄、確認多專業參與" style="width:100%;border-radius:12px;" />
  <figcaption style="text-align:center;font-size:0.875rem;color:#64748b;margin-top:0.5rem;">圖：評鑑委員查核 4 大重點，每項都需要書面佐證</figcaption>
</figure>`;

/**
 * 在指定錨點字串後插入 HTML 區塊。
 * 若錨點不存在則回傳原字串並印出警告。
 */
function insertAfter(content: string, anchor: string, html: string): string {
  const idx = content.indexOf(anchor);
  if (idx === -1) {
    console.warn(`  ⚠️  找不到錨點：${anchor.slice(0, 60)}…`);
    return content;
  }
  const insertPos = idx + anchor.length;
  return content.slice(0, insertPos) + "\n" + html + content.slice(insertPos);
}

async function main() {
  const client = postgres(getDbUrl(), { prepare: false });
  const db = drizzle(client);

  try {
    // 查詢目標文章
    const [post] = await db
      .select({
        id: blogPosts.id,
        slug: blogPosts.slug,
        content: blogPosts.content,
        coverImageUrl: blogPosts.coverImageUrl,
      })
      .from(blogPosts)
      .where(eq(blogPosts.slug, SLUG));

    if (!post) {
      console.error(`❌ 找不到 slug: ${SLUG}`);
      process.exit(1);
    }

    console.log(`\n📄 ${SLUG}`);
    console.log(`   id: ${post.id}`);
    console.log(`   目前 coverImageUrl: ${post.coverImageUrl ?? "(空)"}`);

    // 防止重複注入
    if (post.content?.includes(MARKER)) {
      console.log("⏭️  已有 pdca-illustrations-injected 標記，跳過（避免重複注入）。");
      process.exit(0);
    }

    let content = post.content ?? "";

    // --- 注入 FIG1：PDCA 概念循環圖，插在第一個 <blockquote> 之後、第一個 <h2> 之前 ---
    // 錨點：</blockquote>\n\n<h2>壹、住宿型
    const fig1AnchorShort = `</blockquote>`;
    // 找第一個 </blockquote>（PDCA 定義那個）
    content = insertAfter(content, fig1AnchorShort, FIG1);

    // --- 注入 FIG2：跌倒率，插在壹 section 的 </ul> 之後 ---
    // 錨點：第一個 </ul>（B1 跌倒範例那個 ul）
    content = insertAfter(content, `</ul>\n\n<p>💡 評鑑委員查核重點：品質改善會議紀錄`, FIG2);

    // --- 注入 FIG3：皮膚損傷，插在貳 section 的 </ul> 之後 ---
    content = insertAfter(content, `</ul>\n\n<p>💡 評鑑委員查核重點：五項指標`, FIG3);

    // --- 注入 FIG4：活動參與率，插在參 section 的 </ul> 之後 ---
    content = insertAfter(content, `</ul>\n\n<p>💡 評鑑委員查核重點：自訂指標`, FIG4);

    // --- 注入 FIG5：委員查核清單，插在評鑑委員段 </ul> 之後（該 ul 含「翻閱品質會議」）---
    content = insertAfter(content, `</ul>\n\n<blockquote>\n  💡`, FIG5);

    // 在 content 末尾加上 marker（防重複）
    content = content + `\n${MARKER}`;

    console.log(`\n   注入插圖：5 張`);
    console.log(`   設定封面：${COVER_URL}`);
    console.log(`   新增 content 長度：+${content.length - (post.content?.length ?? 0)} 字元`);

    if (isDryRun) {
      console.log("\n⚡ dry-run 模式 — 未寫入 DB。加 --commit 執行實際更新。");
      // 輸出預覽：確認各圖有正確插入
      const figCount = (content.match(/nursing-pdca-examples-cover\.svg|nursing-pdca-cycle-flow\.svg|nursing-home-fall-rate|home-nursing-skin-injury|daycare-activity-participation|nursing-pdca-auditor/g) ?? []).length;
      console.log(`   圖檔引用次數（預期 6）：${figCount}`);
    } else {
      await db
        .update(blogPosts)
        .set({
          content,
          coverImageUrl: COVER_URL,
          coverImageAlt: COVER_ALT,
          updatedAt: new Date(),
        })
        .where(eq(blogPosts.slug, SLUG));

      console.log("\n✅ DB 更新完成");
      console.log("⚠️  請呼叫 /api/revalidate-blog 或重新部署以清除 Next.js cache。");
    }
  } finally {
    await client.end();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
