import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";

// 列表頁所需欄位（絕不撈 content 大欄位，避免撐爆 Supabase pooler）
// id 是 uuid → Drizzle 推斷為 string
export type BlogListItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  coverImageUrl: string | null;
  category: string | null;
  tags: string[] | null;
  publishedAt: Date | null;
};

/**
 * 撈全部已發佈文章的列表欄位，以發佈時間新到舊排序。
 *
 * 掛 "use cache" + cacheTag("blog-list")：
 *   - 結果快取在 Next.js Cache Components 層，不會每請求打 DB。
 *   - /api/revalidate-blog 發布/更新文章時透過 revalidateTag("blog-list") 失效。
 *   - cacheLife("days")：平時背景重驗每日一次，減少冷撈打 Supabase pooler。
 *
 * category / tag / pdca 三條路徑共用此函式，只佔一個快取條目（避免三倍冷撈）。
 * 呼叫端在此函式結果上做 JS 篩選，notFound() 必須留在快取函式外。
 */
export async function getPublishedListItems(): Promise<BlogListItem[]> {
  "use cache";
  cacheTag("blog-list");
  cacheLife("days");
  return db
    .select({
      id: blogPosts.id,
      slug: blogPosts.slug,
      title: blogPosts.title,
      excerpt: blogPosts.excerpt,
      coverImageUrl: blogPosts.coverImageUrl,
      category: blogPosts.category,
      tags: blogPosts.tags,
      publishedAt: blogPosts.publishedAt,
    })
    .from(blogPosts)
    .where(eq(blogPosts.status, "published"))
    .orderBy(desc(blogPosts.publishedAt));
}
