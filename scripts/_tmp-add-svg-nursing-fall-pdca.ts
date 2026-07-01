/**
 * 一次性腳本：為 nursing-fall-pdca-improvement-plan-2026 注入 SVG 插圖
 * 注入 3 張內文圖 + coverImageUrl
 * 執行：npx tsx --env-file=.env.local scripts/_tmp-add-svg-nursing-fall-pdca.ts
 */
import { db } from '../db/index';
import { blogPosts } from '../db/schema';
import { eq } from 'drizzle-orm';

const SLUG = 'nursing-fall-pdca-improvement-plan-2026';
const COVER = '/blog/nursing-fall-pdca-cover.svg';

function makeFigure(src: string, alt: string, caption: string): string {
  return `<figure style="margin:2rem 0;">
  <img src="${src}" alt="${alt}" style="width:100%;border-radius:12px;" />
  <figcaption style="text-align:center;font-size:0.875rem;color:#64748b;margin-top:0.5rem;">圖：${caption}</figcaption>
</figure>`;
}

const FIG1 = makeFigure(
  '/blog/nursing-fall-pdca-cycle.svg',
  '護理機構跌倒事件 PDCA 改善循環：P 量化目標月跌倒4件以下、D 執行留佐證、C 月別趨勢、A 標準化 SOP',
  '護理之家跌倒事件 PDCA 改善四階段——每個階段有明確產出，Act 閉環是關鍵'
);

const FIG2 = makeFigure(
  '/blog/nursing-fall-pdca-steps.svg',
  '跌倒 PDCA 四階段完整寫法：P計劃量化目標、D執行留佐證文件、C月別趨勢查核、A標準化行動',
  '跌倒事件 PDCA 四階段產出要求——P 到 A 每步都有具體文件可查'
);

const FIG3 = makeFigure(
  '/blog/nursing-fall-pdca-5-errors.svg',
  'PDCA 報告 5 大填寫錯誤：P目標沒量化、D措施無佐證、C只有總數、A只寫繼續執行、根因停在表面',
  'PDCA 改善報告 5 大常見錯誤——評鑑委員最常挑剔的填寫盲點'
);

// 錨點：使用 H2 標題作為插入錨點
const ANCHOR1 = '<h2>跌倒事件 PDCA 完整實例（護理之家版）</h2>';
const ANCHOR2 = '<h2>跌倒事件 PDCA 範例（居家護理版）</h2>';
const ANCHOR3 = '<h2>常見問題（FAQ）</h2>';

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
  if (content.includes('/blog/nursing-fall-pdca-cycle.svg')) {
    console.log('⚠️  已有圖，跳過（避免重複注入）');
    process.exit(0);
  }

  // 插入圖 1：PDCA 循環圖，在「完整實例（護理之家版）」H2 之前
  if (!content.includes(ANCHOR1)) {
    console.error('找不到錨點 1：' + ANCHOR1);
    process.exit(1);
  }
  content = content.replace(ANCHOR1, FIG1 + '\n\n' + ANCHOR1);

  // 插入圖 2：四階段寫法，在「居家護理版」H2 之前
  if (!content.includes(ANCHOR2)) {
    console.error('找不到錨點 2：' + ANCHOR2);
    process.exit(1);
  }
  content = content.replace(ANCHOR2, FIG2 + '\n\n' + ANCHOR2);

  // 插入圖 3：5 大錯誤，在「常見問題（FAQ）」H2 之前
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
