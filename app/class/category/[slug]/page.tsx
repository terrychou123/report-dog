import { Suspense } from "react";
import Link from "next/link";
import { db } from "@/db";
import { classes } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClassListFilter } from "@/components/class-list-filter";

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
  try {
    const posts = await db
      .select({ category: classes.category })
      .from(classes)
      .where(eq(classes.status, "published"));

    const categories = Array.from(
      new Set(posts.map((p) => p.category).filter(Boolean) as string[])
    );

    const params = categories.map((cat) => ({ slug: encodeURIComponent(cat) }));
    // Cache Components 要求至少一筆；無課程時用佔位符，頁面元件查詢空結果後會 notFound()
    return params.length > 0 ? params : [{ slug: "_placeholder" }];
  } catch {
    return [{ slug: "_placeholder" }];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = decodeURIComponent(slug);

  return {
    title: `${category} | 長照評鑑課程`,
    description: `報告汪課程「${category}」分類，涵蓋長照機構評鑑準備、文書效率與 AI 輔助工具應用。`,
    alternates: { canonical: `/class/category/${slug}` },
    openGraph: {
      title: `${category} | 報告汪課程`,
      description: `長照機構「${category}」主題課程彙整。`,
    },
  };
}

async function CategoryContent({ category }: { category: string }) {
  const posts = await db
    .select()
    .from(classes)
    .where(eq(classes.status, "published"))
    .orderBy(desc(classes.publishedAt));

  const filtered = posts.filter((p) => p.category === category);
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

  return <ClassListFilter posts={serialized} categories={[]} />;
}

export default async function ClassCategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = decodeURIComponent(slug);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 pt-16 pb-20">
        <div className="mb-10">
          <p className="text-sm text-muted-foreground mb-2">
            <Link href="/class" className="hover:underline">課程</Link> › 分類
          </p>
          <h1 className="text-4xl font-bold tracking-tight mb-4">{category}</h1>
          <p className="text-muted-foreground">「{category}」分類下的所有課程</p>
        </div>

        <Suspense fallback={<div className="py-20 text-center text-muted-foreground">載入中...</div>}>
          <CategoryContent category={category} />
        </Suspense>
      </div>
    </div>
  );
}
