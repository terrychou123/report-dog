import { Suspense } from "react";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import Link from "next/link";
import { requireBlogAdmin } from "@/lib/blog-admin";

export const metadata: Metadata = {
  title: "Blog | 報告汪 — 長照文書知識庫",
  description:
    "長照文書撰寫技巧、評鑑備審指南、AI工具應用，幫助護理師與居服機構節省文書時間",
  openGraph: {
    type: "website",
    title: "Blog | 報告汪",
    description: "長照文書撰寫技巧、評鑑備審指南、AI工具應用",
  },
  alternates: {
    canonical: "https://reportwang.com/blog",
  },
};

async function BlogListContent({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  await requireBlogAdmin();
  const { category } = await searchParams;

  const posts = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.status, "published"));

  // Sort by publishedAt descending
  posts.sort((a, b) => {
    const aTime = a.publishedAt?.getTime() ?? 0;
    const bTime = b.publishedAt?.getTime() ?? 0;
    return bTime - aTime;
  });

  // Collect unique categories
  const categories = Array.from(
    new Set(posts.map((p) => p.category).filter(Boolean) as string[])
  );

  const filtered = category ? posts.filter((p) => p.category === category) : posts;

  const listSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "報告汪 Blog",
    url: "https://reportwang.com/blog",
    blogPost: filtered.slice(0, 10).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `https://reportwang.com/blog/${post.slug}`,
      datePublished: post.publishedAt?.toISOString(),
      image: post.coverImageUrl || undefined,
      description: post.excerpt || undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }}
      />

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">長照文書知識庫</h1>
            <p className="text-lg text-muted-foreground">
              護理紀錄撰寫技巧、評鑑備審指南、AI工具應用，幫你省下一半文書時間
            </p>
          </div>

          {/* Category filter */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              <Link
                href="/blog"
                className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
                  !category
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border hover:bg-accent"
                }`}
              >
                全部
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/blog?category=${encodeURIComponent(cat)}`}
                  className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
                    category === cat
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border hover:bg-accent"
                  }`}
                >
                  {cat}
                </Link>
              ))}
            </div>
          )}

          {/* Post grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              目前沒有文章
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group border rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                >
                  {post.coverImageUrl ? (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={post.coverImageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-muted flex items-center justify-center text-muted-foreground text-sm">
                      報告汪
                    </div>
                  )}
                  <div className="p-4">
                    {post.category && (
                      <span className="text-xs text-primary font-medium mb-2 block">
                        {post.category}
                      </span>
                    )}
                    <h2 className="font-bold text-lg leading-snug group-hover:text-primary transition-colors mb-2 line-clamp-2">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                        {post.excerpt}
                      </p>
                    )}
                    {post.publishedAt && (
                      <time
                        dateTime={post.publishedAt.toISOString()}
                        className="text-xs text-muted-foreground"
                      >
                        {new Date(post.publishedAt).toLocaleDateString("zh-TW")}
                      </time>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default function BlogListPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  return (
    <Suspense fallback={<div className="py-20 text-center text-muted-foreground">載入中...</div>}>
      <BlogListContent searchParams={searchParams} />
    </Suspense>
  );
}
