import { Suspense } from "react";
import Image from "next/image";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import Link from "next/link";

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

// 驗證圖片 URL 是否為合法的外部 https 連結或本地路徑
function isValidImageUrl(url: string | null): url is string {
  if (!url) return false;
  // 本地圖片路徑（如 /blog/xxx.svg）直接接受
  if (url.startsWith("/")) return true;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && !parsed.hostname.includes("localhost");
  } catch {
    return false;
  }
}

async function BlogListContent({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  // 查詢所有已發布的文章，並按發布時間排序
  const posts = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.status, "published"));

  posts.sort((a, b) => {
    const aTime = a.publishedAt?.getTime() ?? 0;
    const bTime = b.publishedAt?.getTime() ?? 0;
    return bTime - aTime;
  });

  // 收集所有不重複的分類
  const categories = Array.from(
    new Set(posts.map((p) => p.category).filter(Boolean) as string[])
  );

  const filtered = category ? posts.filter((p) => p.category === category) : posts;

  // JSON-LD 結構化資料
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

  // 分離 hero 文章與其餘文章
  const featuredPost = filtered[0];
  const remainingPosts = filtered.slice(1);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }}
      />

      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 pt-16 pb-20">

          {/* 頁面標題區 — 左對齊，更大字體 */}
          <div className="mb-10">
            <h1 className="text-5xl font-bold tracking-tight mb-4">長照文書知識庫</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              護理紀錄撰寫技巧、評鑑備審指南、AI工具應用，幫你省下一半文書時間
            </p>
          </div>

          {/* 分類篩選 — 左對齊，底部分隔線 */}
          {categories.length > 0 && (
            <div className="border-b pb-6 mb-12">
              <div className="flex flex-wrap gap-2">
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
            </div>
          )}

          {/* 空狀態 */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              目前沒有文章
            </div>
          ) : (
            /* 所有文章包在 group/posts 容器中，實作 hover 淡化效果 */
            <div className="group/posts">

              {/* Hero 特色文章 — 第一篇大版面呈現 */}
              {featuredPost && (
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="grid md:grid-cols-2 rounded-xl overflow-hidden border mb-14 transition-opacity duration-300 group-hover/posts:opacity-50 hover:!opacity-100 block"
                >
                  {/* 左欄：封面圖 */}
                  <div className="relative aspect-[4/3] md:aspect-auto min-h-64 bg-muted">
                    {isValidImageUrl(featuredPost.coverImageUrl) ? (
                      <Image
                        src={featuredPost.coverImageUrl}
                        alt={featuredPost.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                        priority
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm bg-muted">
                        報告汪
                      </div>
                    )}
                  </div>

                  {/* 右欄：文章資訊 */}
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    {featuredPost.category && (
                      <span className="text-primary text-sm font-medium mb-4 block">
                        {featuredPost.category}
                      </span>
                    )}
                    <h2 className="text-3xl font-bold tracking-tight leading-tight mb-4">
                      {featuredPost.title}
                    </h2>
                    {featuredPost.excerpt && (
                      <p className="text-muted-foreground leading-relaxed line-clamp-4 mb-6">
                        {featuredPost.excerpt}
                      </p>
                    )}
                    {featuredPost.publishedAt && (
                      <time
                        dateTime={featuredPost.publishedAt.toISOString()}
                        className="text-sm text-muted-foreground"
                      >
                        {new Date(featuredPost.publishedAt).toLocaleDateString("zh-TW")}
                      </time>
                    )}
                  </div>
                </Link>
              )}

              {/* 其餘文章 — 2 欄乾淨卡片 */}
              {remainingPosts.length > 0 && (
                <div className="grid md:grid-cols-2 gap-10">
                  {remainingPosts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="group/card transition-opacity duration-300 group-hover/posts:opacity-50 hover:!opacity-100 block"
                    >
                      {/* 圖片區 — 16:9 比例 */}
                      <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-muted mb-4">
                        {isValidImageUrl(post.coverImageUrl) ? (
                          <Image
                            src={post.coverImageUrl}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover group-hover/card:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
                            報告汪
                          </div>
                        )}
                      </div>

                      {/* 文字區 */}
                      <div>
                        {post.category && (
                          <span className="text-primary text-xs font-medium mb-2 block">
                            {post.category}
                          </span>
                        )}
                        <h3 className="text-xl font-semibold leading-snug line-clamp-2 mb-2 group-hover/card:text-primary transition-colors">
                          {post.title}
                        </h3>
                        {post.excerpt && (
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
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
