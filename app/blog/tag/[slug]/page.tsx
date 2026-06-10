import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { connection } from "next/server";
import { BlogListFilter } from "@/components/blog-list-filter";
import { getPublishedListItems } from "@/lib/blog/queries";

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
  // try/catch：pooler 滿載/DB 不可用時不阻擋 build（改 runtime 生成），避免連線死結
  try {
    const posts = await db
      .select({ tags: blogPosts.tags })
      .from(blogPosts)
      .where(eq(blogPosts.status, "published"));

    const allTags = Array.from(
      new Set(posts.flatMap((p) => p.tags ?? []).filter(Boolean))
    );

    const params = allTags.map((tag) => ({ slug: encodeURIComponent(tag) }));
    // Cache Components 要求至少一筆；無文章時用佔位符，頁面元件查詢空結果後會 notFound()
    return params.length > 0 ? params : [{ slug: "_placeholder" }];
  } catch {
    return [{ slug: "_placeholder" }];
  }
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
  // connection()：標記 runtime-dynamic，讓 build 不預渲染、不在 build 填快取
  // 快取改在 runtime 首次請求填（同 /blog/page.tsx BlogContent 的模式）
  await connection();
  // 使用共用快取查詢（"use cache" + cacheTag("blog-list")），避免每請求打 pooler
  // notFound() 必須留在快取函式外，此處在 JS 篩選後呼叫
  const all = await getPublishedListItems();
  const filtered = all.filter((p) => p.tags?.includes(tag));
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
            <Link href="/blog" className="hover:underline">Blog</Link> › 標籤
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
