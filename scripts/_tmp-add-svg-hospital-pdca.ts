/**
 * 一次性腳本：為 hospital-pdca-examples-2026 注入 SVG 插圖
 * 注入 3 張內文圖 + coverImageUrl
 * 執行：npx tsx --env-file=.env.local scripts/_tmp-add-svg-hospital-pdca.ts
 */
import { db } from '../db/index';
import { blogPosts } from '../db/schema';
import { eq } from 'drizzle-orm';

const SLUG = 'hospital-pdca-examples-2026';
const COVER = '/blog/hospital-pdca-examples-cover.svg';

function makeFigure(src: string, alt: string, caption: string): string {
  return `<figure style="margin:2rem 0;">
  <img src="${src}" alt="${alt}" style="width:100%;border-radius:12px;" />
  <figcaption style="text-align:center;font-size:0.875rem;color:#64748b;margin-top:0.5rem;">圖：${caption}</figcaption>
</figure>`;
}

const FIG1 = makeFigure(
  '/blog/hospital-pdca-cycle.svg',
  '醫院評鑑 PDCA 改善循環：Plan 設定量化目標、Do 落實組合照護 SOP、Check 每月監測委員會報告、Act 根因分析系統改善',
  '醫院評鑑 PDCA 改善循環——四個階段環環相扣，Act 必須閉環才能避免失分'
);

const FIG2 = makeFigure(
  '/blog/hospital-pdca-conditions.svg',
  '115年醫院評鑑 PDCA 相關條文：2.2.1 醫品病安計畫、2.2.2 醫療不良事件RCA、2.2.3 品質會議、2.7.1 感染管制、2.5.3 防止用藥錯誤',
  '115年度醫院評鑑 PDCA 對應的五條關鍵條文與查核方式'
);

const FIG3 = makeFigure(
  '/blog/hospital-pdca-three-examples.svg',
  '醫院 PDCA 改善三大範例：感染管制 CLABSI（2.7.1）、住院跌倒率（2.2.1）、用藥錯誤率（2.5.3）',
  '三大 PDCA 改善範例——感染管制、住院跌倒、用藥安全的核心指標對照'
);

// 錨點：使用 H2 標題作為插入錨點
const ANCHOR1 = '<h2>115 年度評鑑哪幾條對應到 PDCA？</h2>';
const ANCHOR2 = '<h2>範例一：感染管制 PDCA（對應 2.7.1 重點條文）</h2>';
const ANCHOR3 = '<h2>評鑑委員最常問的 PDCA 問題</h2>';

async function main() {
  const [post] = await db
    .select({ id: blogPosts.id, content: blogPosts.content })
    .from(blogPosts)
    .where(eq(blogPosts.slug, SLUG));

  if (!post) {
    console.error(`找不到文章 slug=${SLUG}`);
    process.exit(1);
  }

  let content = post.content;

  // 檢查是否已有圖（避免重複注入）
  if (content.includes('/blog/hospital-pdca-cycle.svg')) {
    console.log('⚠️  已有圖，跳過（避免重複注入）');
    process.exit(0);
  }

  // 插入圖 1：PDCA 循環圖，在第一個 H2 之前
  if (!content.includes(ANCHOR1)) {
    console.error('找不到錨點 1：' + ANCHOR1);
    process.exit(1);
  }
  content = content.replace(ANCHOR1, FIG1 + '\n\n' + ANCHOR1);

  // 插入圖 2：5 條對應條文，在範例一 H2 之前
  if (!content.includes(ANCHOR2)) {
    console.error('找不到錨點 2：' + ANCHOR2);
    process.exit(1);
  }
  content = content.replace(ANCHOR2, FIG2 + '\n\n' + ANCHOR2);

  // 插入圖 3：三大範例，在「評鑑委員最常問」H2 之前
  if (!content.includes(ANCHOR3)) {
    console.error('找不到錨點 3：' + ANCHOR3);
    process.exit(1);
  }
  content = content.replace(ANCHOR3, FIG3 + '\n\n' + ANCHOR3);

  // 更新 DB
  await db
    .update(blogPosts)
    .set({ content, coverImageUrl: COVER })
    .where(eq(blogPosts.slug, SLUG));

  console.log(`✅ 已更新 ${SLUG}：注入 3 張圖 + coverImageUrl`);
  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });
