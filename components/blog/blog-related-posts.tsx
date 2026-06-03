import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq, ne, and } from "drizzle-orm";
import Link from "next/link";

interface Props {
  currentSlug: string;
  category: string | null;
  tags?: string[] | null;
}

/**
 * 按同 category 取相關文章（排除本文），以 tag 交集數加權排序後取前 3 篇
 * tag 越多相符，排序越前——降低跳出、提升 pages/session
 */
export async function BlogRelatedPosts({ currentSlug, category, tags }: Props) {
  if (!category) return null;

  // 多取幾篇讓 tag 加權排序有足夠樣本
  let candidates: Array<{ slug: string; title: string; excerpt: string | null; tags: string[] | null }> = [];
  try {
    candidates = await db
      .select({
        slug: blogPosts.slug,
        title: blogPosts.title,
        excerpt: blogPosts.excerpt,
        tags: blogPosts.tags,
      })
      .from(blogPosts)
      .where(
        and(
          eq(blogPosts.status, "published"),
          eq(blogPosts.category, category),
          ne(blogPosts.slug, currentSlug)
        )
      )
      .limit(12);
  } catch {
    return null;
  }

  if (candidates.length === 0) return null;

  // 計算 tag 交集數，交集越多排越前（相關度加權）
  const currentTags = new Set(tags ?? []);
  const scored = candidates
    .map((p) => ({
      ...p,
      score: currentTags.size > 0 ? (p.tags ?? []).filter((t) => currentTags.has(t)).length : 0,
    }))
    .sort((a, b) => b.score - a.score);

  // 取前 3 篇
  const posts = scored.slice(0, 3);

  return (
    <div className="mt-10 border-t pt-8">
      <h2 className="text-base font-semibold mb-4">同主題推薦閱讀</h2>
      <ul className="space-y-3">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group flex flex-col gap-0.5 hover:text-primary transition-colors"
            >
              <span className="text-sm font-medium group-hover:underline underline-offset-4">
                {post.title}
              </span>
              {post.excerpt && (
                <span className="text-xs text-muted-foreground line-clamp-2">
                  {post.excerpt}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
