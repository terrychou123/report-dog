/**
 * 一次性腳本：A2 內鏈導流
 * 目標：home-care 群站內最強的 2 篇文章，補延伸閱讀連結指向轉換頁
 *
 * 1. home-care-evaluation-document-ai-guide-2026（540 PV，跳出率 28.9%，全站流量最高）
 *    → 補 /demo（AI 文書主題與 SOAP AI 改寫體驗高度相關，給 /demo 全站最高流量入口）
 * 2. home-care-case-records-guide-2026（180 PV，跳出率 56.9%）
 *    → 補 /downloads（居家長照機構評鑑自我檢核表 Excel，與「評鑑委員在看什麼」主題相關）
 *
 * 用法：npx dotenv -e .env.local -- npx tsx scripts/a2-homecare-internal-links-2026-06-15.ts
 */
import { db } from "../db/index";
import { blogPosts } from "../db/schema";
import { eq } from "drizzle-orm";

async function addDemoLink() {
  const slug = "home-care-evaluation-document-ai-guide-2026";
  const rows = await db
    .select({ content: blogPosts.content })
    .from(blogPosts)
    .where(eq(blogPosts.slug, slug));

  if (!rows.length || !rows[0].content) {
    console.log(`❌ 找不到文章：${slug}`);
    return;
  }

  let content = rows[0].content;
  const anchor = `<li><a href="/blog/home-care-case-records-guide-2026">居家服務個案紀錄撰寫指南：評鑑委員到底在看什麼？</a></li>\n</ul>`;
  const newLi = `<li><a href="/blog/home-care-case-records-guide-2026">居家服務個案紀錄撰寫指南：評鑑委員到底在看什麼？</a></li>\n  <li><a href="/demo">免費體驗：護理記錄 AI 一鍵改寫成 SOAP 格式</a></li>\n</ul>`;

  if (content.includes("/demo")) {
    console.log(`⏭ ${slug} 已有 /demo 連結，略過`);
    return;
  }
  if (!content.includes(anchor)) {
    console.log(`❌ ${slug} 找不到預期的延伸閱讀錨點`);
    return;
  }
  content = content.replace(anchor, newLi);

  await db.update(blogPosts).set({ content }).where(eq(blogPosts.slug, slug));
  console.log(`✅ ${slug} 已補 /demo 連結`);
}

async function addDownloadsLink() {
  const slug = "home-care-case-records-guide-2026";
  const rows = await db
    .select({ content: blogPosts.content })
    .from(blogPosts)
    .where(eq(blogPosts.slug, slug));

  if (!rows.length || !rows[0].content) {
    console.log(`❌ 找不到文章：${slug}`);
    return;
  }

  let content = rows[0].content;
  const anchor = `<li><a href="/blog/home-care-evaluation-document-ai-guide-2026">評鑑文書減量實戰：AI 如何幫居服機構做好 32 項指標日常管理</a></li>\n</ul>`;
  const newLi = `<li><a href="/blog/home-care-evaluation-document-ai-guide-2026">評鑑文書減量實戰：AI 如何幫居服機構做好 32 項指標日常管理</a></li>\n  <li><a href="/downloads">免費下載：居家長照機構評鑑自我檢核表 Excel</a></li>\n</ul>`;

  if (content.includes("/downloads")) {
    console.log(`⏭ ${slug} 已有 /downloads 連結，略過`);
    return;
  }
  if (!content.includes(anchor)) {
    console.log(`❌ ${slug} 找不到預期的延伸閱讀錨點`);
    return;
  }
  content = content.replace(anchor, newLi);

  await db.update(blogPosts).set({ content }).where(eq(blogPosts.slug, slug));
  console.log(`✅ ${slug} 已補 /downloads 連結`);
}

async function main() {
  await addDemoLink();
  await addDownloadsLink();
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
