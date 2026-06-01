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
 * 按同 category 取最多 3 篇相關文章（排除本文）
 * 用於 blog/[slug]/page.tsx 文末延伸閱讀
 */
export async function BlogRelatedPosts({ currentSlug, category }: Props) {
  if (!category) return null;

  let posts: Array<{ slug: string; title: string; excerpt: string | null }> = [];
  try {
    posts = await db
      .select({
        slug: blogPosts.slug,
        title: blogPosts.title,
        excerpt: blogPosts.excerpt,
      })
      .from(blogPosts)
      .where(
        and(
          eq(blogPosts.status, "published"),
          eq(blogPosts.category, category),
          ne(blogPosts.slug, currentSlug)
        )
      )
      .limit(3);
  } catch {
    return null;
  }

  if (posts.length === 0) return null;

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
