import Image from "next/image";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import sanitizeHtml from "sanitize-html";

type Props = { params: Promise<{ slug: string }> };

async function getPost(slug: string) {
  "use cache";
  const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
  return post;
}

export async function generateStaticParams() {
  const posts = await db
    .select({ slug: blogPosts.slug })
    .from(blogPosts)
    .where(eq(blogPosts.status, "published"));
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "文章不存在 | 報告汪" };

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt || undefined,
    openGraph: {
      type: "article",
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt || undefined,
      images: post.coverImageUrl ? [{ url: post.coverImageUrl }] : [],
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt?.toISOString(),
    },
    alternates: {
      canonical: `https://reportwang.com/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post || post.status !== "published") notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    image: post.coverImageUrl || undefined,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt?.toISOString(),
    author: {
      "@type": "Organization",
      name: "報告汪",
      url: "https://reportwang.com",
    },
    publisher: {
      "@type": "Organization",
      name: "報告汪",
      url: "https://reportwang.com",
    },
    description: post.seoDescription || post.excerpt || undefined,
    url: `https://reportwang.com/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="min-h-screen bg-background">
        {/* Hero / Cover */}
        {post.coverImageUrl && (
          <div className="w-full h-64 md:h-96 overflow-hidden relative">
            <Image
              src={post.coverImageUrl}
              alt={post.title}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        )}

        <div className="container mx-auto px-4 py-12 max-w-3xl">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground">首頁</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-foreground">Blog</Link>
            {post.category && (
              <>
                <span className="mx-2">/</span>
                <span>{post.category}</span>
              </>
            )}
          </nav>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-muted text-muted-foreground rounded-full px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">{post.title}</h1>

          {/* Meta */}
          {post.publishedAt && (
            <p className="text-sm text-muted-foreground mb-8">
              發佈於{" "}
              <time dateTime={post.publishedAt.toISOString()}>
                {new Date(post.publishedAt).toLocaleDateString("zh-TW", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </p>
          )}

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-lg text-muted-foreground border-l-4 border-primary pl-4 mb-8 italic">
              {post.excerpt}
            </p>
          )}

          {/* Content */}
          {post.content && (
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
            />
          )}

          {/* CTA */}
          <div className="mt-16 rounded-2xl bg-primary/5 border border-primary/20 p-8 text-center">
            <h2 className="text-xl font-bold mb-2">報告汪 — AI 長照文書助理</h2>
            <p className="text-muted-foreground mb-6">
              讓 AI 幫你寫日誌、護理紀錄、評鑑備審文件，省下 50% 文書時間
            </p>
            <Link
              href="/auth/sign-up"
              className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-6 py-2.5 font-medium hover:bg-primary/90 transition-colors"
            >
              免費試用 14 天
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
