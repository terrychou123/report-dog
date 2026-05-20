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
      .select({ tags: classes.tags })
      .from(classes)
      .where(eq(classes.status, "published"));

    const allTags = Array.from(
      new Set(posts.flatMap((p) => p.tags ?? []).filter(Boolean))
    );

    const params = allTags.map((tag) => ({ slug: encodeURIComponent(tag) }));
    // Cache Components 要求至少一筆；無課程時用佔位符，頁面元件查詢空結果後會 notFound()
    return params.length > 0 ? params : [{ slug: "_placeholder" }];
  } catch {
    return [{ slug: "_placeholder" }];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = decodeURIComponent(slug);

  return {
    title: `#${tag} | 長照評鑑課程`,
    description: `報告汪課程「#${tag}」標籤，涵蓋長照機構相關實務知識。`,
    alternates: { canonical: `/class/tag/${slug}` },
    openGraph: {
      title: `#${tag} | 報告汪課程`,
      description: `長照機構「#${tag}」相關課程彙整。`,
    },
  };
}

async function TagContent({ tag }: { tag: string }) {
  const posts = await db
    .select()
    .from(classes)
    .where(eq(classes.status, "published"))
    .orderBy(desc(classes.publishedAt));

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

  return <ClassListFilter posts={serialized} categories={[]} />;
}

export default async function ClassTagPage({ params }: Props) {
  const { slug } = await params;
  const tag = decodeURIComponent(slug);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 pt-16 pb-20">
        <div className="mb-10">
          <p className="text-sm text-muted-foreground mb-2">
            <Link href="/class" className="hover:underline">課程</Link> › 標籤
          </p>
          <h1 className="text-4xl font-bold tracking-tight mb-4">#{tag}</h1>
          <p className="text-muted-foreground">標籤「{tag}」下的所有課程</p>
        </div>

        <Suspense fallback={<div className="py-20 text-center text-muted-foreground">載入中...</div>}>
          <TagContent tag={tag} />
        </Suspense>
      </div>
    </div>
  );
}
