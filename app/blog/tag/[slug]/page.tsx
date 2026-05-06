import { Suspense } from "react";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogListFilter } from "@/components/blog-list-filter";

type Props = { params: Promise<{ slug: string }> };

function isValidImageUrl(url: string | null): url is string {
  if (!url) return false;
  if (url.startsWith("/")) return true;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && !parsed.hostname.includes("localhost");
  } catch {
    return false;
  }
}

export async function generateStaticParams() {
  const posts = await db
    .select({ tags: blogPosts.tags })
    .from(blogPosts)
    .where(eq(blogPosts.status, "published"));

  const allTags = Array.from(
    new Set(posts.flatMap((p) => p.tags ?? []).filter(Boolean))
  );

  return allTags.map((tag) => ({
    slug: encodeURIComponent(tag),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = decodeURIComponent(slug);

  return {
    title: `#${tag} | 長照經營知識庫`,
    description: `報告汪知識庫「#${tag}」標籤文章，涵蓋長照機構相關實務知識。`,
    alternates: { canonical: `/blog/tag/${slug}` },
    openGraph: {
      title: `#${tag} | 報告汪知識庫`,
      description: `長照機構「#${tag}」相關文章彙整。`,
    },
  };
}

async function TagContent({ tag }: { tag: string }) {
  const posts = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.status, "published"))
    .orderBy(desc(blogPosts.publishedAt));

  const filtered = posts.filter((p) => p.tags?.includes(tag));
  if (filtered.length === 0) notFound();

  const serialized = filtered.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    coverImageUrl: isValidImageUrl(p.coverImageUrl) ? p.coverImageUrl : null,
    category: p.category,
    tags: p.tags,
    publishedAt: p.publishedAt?.toISOString() ?? null,
  }));

  return <BlogListFilter posts={serialized} categories={[]} />;
}

export default async function BlogTagPage({ params }: Props) {
  const { slug } = await params;
  const tag = decodeURIComponent(slug);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 pt-16 pb-20">
        <div className="mb-10">
          <p className="text-sm text-muted-foreground mb-2">
            <a href="/blog" className="hover:underline">Blog</a> › 標籤
          </p>
          <h1 className="text-4xl font-bold tracking-tight mb-4">#{tag}</h1>
          <p className="text-muted-foreground">標籤「{tag}」下的所有文章</p>
        </div>

        <Suspense fallback={<div className="py-20 text-center text-muted-foreground">載入中...</div>}>
          <TagContent tag={tag} />
        </Suspense>
      </div>
    </div>
  );
}
