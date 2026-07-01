import { db } from "../db/index";
import { blogPosts } from "../db/schema";
import { eq } from "drizzle-orm";

async function main() {
  const [row] = await db
    .select({ content: blogPosts.content })
    .from(blogPosts)
    .where(eq(blogPosts.slug, "hospital-pdca-examples-2026"));

  if (!row) { console.log("找不到文章"); process.exit(1); }

  // 在 /downloads 前插入 /blog/pdca 連結
  const updated = row.content!.replace(
    `  <li><a href="/downloads">免費下載醫院評鑑備審文件模板</a></li>`,
    `  <li><a href="/blog/pdca">護理長照 PDCA 報告範例總覽（跨機構類型）</a></li>
  <li><a href="/downloads">免費下載醫院評鑑備審文件模板</a></li>`
  );

  await db.update(blogPosts).set({ content: updated }).where(eq(blogPosts.slug, "hospital-pdca-examples-2026"));
  console.log("✅ 延伸閱讀已補 /blog/pdca 連結");
  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });
