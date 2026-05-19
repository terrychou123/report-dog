// 一次性腳本：更新指定 blog post 的 SEO title/description 並觸發快取失效
// 跑法（deploy 後）：npx tsx scripts/update-blog-seo.ts
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq } from "drizzle-orm";

const updates = [
  {
    slug: "home-care-case-records-guide-2026",
    seoTitle: "115年居家服務個案紀錄怎麼寫｜好壞範例對比＋評鑑必過 4 大格式",
    seoDescription:
      "居家服務個案紀錄怎麼寫才能過評鑑？服務日期、時間、項目、執行情形 4 大格式要點＋好壞範例對比＋緊急事件紀錄串連方式，居服員 3 分鐘搞懂評鑑委員想看什麼。",
  },
  {
    slug: "home-nursing-pdca-writing-2026",
    seoTitle: "居家護理 PDCA 怎麼寫｜4 步驟範例＋好壞對比＋免費模板（115年版）",
    seoDescription:
      "居家護理 PDCA 怎麼寫評鑑委員才買單？Plan/Do/Check/Act 4 步驟拆解＋好壞範例對比＋可下載模板，3 分鐘搞懂評鑑文件寫法，附 115 年實際過關範例。",
  },
];

const baseUrl = process.env.SITE_URL;
if (!baseUrl) throw new Error("SITE_URL 未設定（避免誤擊 production）。本機跑法：SITE_URL=http://localhost:3000 npx tsx scripts/update-blog-seo.ts");
const cronSecret = process.env.CRON_SECRET;
if (!cronSecret) throw new Error("CRON_SECRET 未設定，請先 vercel env pull 或在 .env.local 加上 CRON_SECRET");

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
