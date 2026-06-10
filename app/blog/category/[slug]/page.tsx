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
      .select({ category: blogPosts.category })
      .from(blogPosts)
      .where(eq(blogPosts.status, "published"));

    const categories = Array.from(
      new Set(posts.map((p) => p.category).filter(Boolean) as string[])
    );

    const params = categories.map((cat) => ({ slug: encodeURIComponent(cat) }));
    // Cache Components 要求至少一筆；無文章時用佔位符，頁面元件查詢空結果後會 notFound()
    return params.length > 0 ? params : [{ slug: "_placeholder" }];
  } catch {
    return [{ slug: "_placeholder" }];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = decodeURIComponent(slug);

  return {
    title: `${category} | 長照經營知識庫`,
    description: `報告汪知識庫「${category}」分類文章，涵蓋長照機構評鑑準備、文書效率與 AI 輔助工具應用。`,
    alternates: { canonical: `/blog/category/${slug}` },
    openGraph: {
      title: `${category} | 報告汪知識庫`,
      description: `長照機構「${category}」主題文章彙整。`,
    },
  };
}

async function CategoryContent({ category }: { category: string }) {
  // connection()：標記 runtime-dynamic，讓 build 不預渲染、不在 build 填快取
  // 快取改在 runtime 首次請求填（同 /blog/page.tsx BlogContent 的模式）
  await connection();
  // 使用共用快取查詢（"use cache" + cacheTag("blog-list")），避免每請求打 pooler
  // notFound() 必須留在快取函式外，此處在 JS 篩選後呼叫
  const all = await getPublishedListItems();
  const filtered = all.filter((p) => p.category === category);
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

export default async function BlogCategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = decodeURIComponent(slug);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 pt-16 pb-20">
        <div className="mb-10">
          <p className="text-sm text-muted-foreground mb-2">
            <Link href="/blog" className="hover:underline">Blog</Link> › 分類
          </p>
          <h1 className="text-4xl font-bold tracking-tight mb-4">{category}</h1>
          <p className="text-muted-foreground">「{category}」分類下的所有文章</p>
        </div>

        <Suspense fallback={<div className="py-20 text-center text-muted-foreground">載入中...</div>}>
          <CategoryContent category={category} />
        </Suspense>
      </div>
    </div>
  );
}
