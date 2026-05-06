import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { getFacilityInfoFromPost, FACILITY_MAP } from "@/lib/blog-facility-map";

interface Props {
  facilityKey: string;
}

export async function SchoolRelatedPosts({ facilityKey }: Props) {
  const targetPath = FACILITY_MAP[facilityKey]?.schoolPath;
  if (!targetPath) return null;

  let posts: Array<{ slug: string; title: string; excerpt: string | null; category: string | null; tags: string[] | null }> = [];
  try {
    posts = await db
      .select({ slug: blogPosts.slug, title: blogPosts.title, excerpt: blogPosts.excerpt, category: blogPosts.category, tags: blogPosts.tags })
      .from(blogPosts)
      .where(eq(blogPosts.status, "published"));
  } catch {
    return null;
  }

  const related = posts
    .filter((p) => {
      const info = getFacilityInfoFromPost(p.category, p.tags, p.slug);
      return info?.schoolPath === targetPath;
    })
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="mt-10 border-t pt-8">
      <h2 className="text-base font-semibold mb-4">延伸閱讀</h2>
      <ul className="space-y-3">
        {related.map((post) => (
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
