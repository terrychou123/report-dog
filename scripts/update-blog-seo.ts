// 一次性腳本：更新指定 blog post 的 SEO title/description 並觸發快取失效
// 跑法（deploy 後）：npx tsx scripts/update-blog-seo.ts
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq } from "drizzle-orm";

// 注意：app/layout.tsx 已設 template: "%s｜報告汪"，seoTitle 不可再帶「｜報告汪」suffix，
// 否則 <title> 會出現雙重 suffix（目前 DB 多篇有此問題，下次批次清理時一併修）
const updates = [
  {
    slug: "home-nursing-pdca-writing-2026",
    // GSC 2026-05：106 曝光 / CTR 2.83% / pos 8.2（唯一觸發 low-CTR 警示）
    // Top queries：護理pdca範例 (pos 12.2)、pdca 護理 (9.7)、護理pdca (7.5)、護理pdca報告範例 (8.9)
    // 策略：首詞放「居家護理 PDCA 範例」匹配 query，加值點「好壞對比＋免費模板」
    seoTitle: "居家護理 PDCA 範例｜4 步驟＋好壞對比＋免費模板",
    seoDescription:
      "居家護理 PDCA 範例怎麼寫？Plan/Do/Check/Act 4 步驟拆解＋好壞對比＋免費模板，3 分鐘搞懂 115 年評鑑文件寫法。",
  },
];

const baseUrl = process.env.SITE_URL;
if (!baseUrl) throw new Error("SITE_URL 未設定（避免誤擊 production）。本機跑法：SITE_URL=http://localhost:3000 npx tsx scripts/update-blog-seo.ts");
// CRON_SECRET 可選：有設定才呼叫 revalidate-blog API 失效 ISR 快取，
// 沒有則 DB 更新後等下次 deployment 或 ISR 自然過期（revalidate 設定見 app/blog/[slug]/page.tsx）
const cronSecret = process.env.CRON_SECRET ?? null;

async function main() {
  let anyFailed = false;
  for (const u of updates) {
    const [updated] = await db
      .update(blogPosts)
      .set({
        seoTitle: u.seoTitle,
        seoDescription: u.seoDescription,
        updatedAt: new Date(),
      })
      .where(eq(blogPosts.slug, u.slug))
      .returning({ slug: blogPosts.slug });

    if (!updated) {
      console.error(`✗ slug 不存在於 DB：${u.slug}`);
      anyFailed = true;
      continue;
    }
    console.log(`✓ DB 已更新：${u.slug}`);

    if (!cronSecret) {
      console.log(`  快取失效：跳過（CRON_SECRET 未設定，下次 deployment 自動生效）`);
      continue;
    }

    const res = await fetch(`${baseUrl}/api/revalidate-blog?slug=${encodeURIComponent(u.slug)}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${cronSecret}` },
    });
    const body = await res.text();
    if (res.status === 200) {
      console.log(`  快取失效：✓`);
    } else {
      console.error(`  快取失效：✗ HTTP ${res.status} ${body}`);
      anyFailed = true;
    }
  }
  if (anyFailed) process.exit(1);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
