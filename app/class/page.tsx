import { Suspense } from "react";
import Link from "next/link";
import { db } from "@/db";
import { classes } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import type { Metadata } from "next";
import { ClassListFilter } from "@/components/class-list-filter";
import { breadcrumbListJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "課程 | 報告汪 — 長照評鑑實戰教學",
  description:
    "報告汪課程專區：長照評鑑文書技巧、機構管理實務、PDCA 品質改善等精選課程，協助長照機構管理者系統化學習評鑑準備。",
  openGraph: {
    type: "website",
    title: "課程 | 報告汪 — 長照評鑑實戰教學",
    description: "報告汪精選課程：評鑑文書技巧、機構管理實務、PDCA 品質改善完整教學。",
  },
  twitter: {
    card: "summary_large_image",
    title: "課程 | 報告汪 — 長照評鑑實戰教學",
    description: "長照評鑑文書技巧、機構管理實務精選課程。",
  },
  alternates: {
    canonical: "/class",
  },
};

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


async function ClassContent() {
  const posts = await db
    .select()
    .from(classes)
    .where(eq(classes.status, "published"))
    .orderBy(desc(classes.publishedAt));

  const categories = Array.from(
    new Set(posts.map((p) => p.category).filter(Boolean) as string[])
  );

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "報告汪課程專區",
    description: "長照機構評鑑實戰課程，涵蓋文書技巧、機構管理與 PDCA 品質改善。",
    url: "https://reportwang.com/class",
    inLanguage: "zh-TW",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: posts.length,
      itemListElement: posts.slice(0, 20).map((post, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://reportwang.com/class/${post.slug}`,
        name: post.title,
      })),
    },
  };

  const serializedPosts = posts.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    coverImageUrl: isValidImageUrl(p.coverImageUrl) ? p.coverImageUrl : null,
    category: p.category,
    tags: p.tags,
    publishedAt: p.publishedAt?.toISOString() ?? null,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <ClassListFilter posts={serializedPosts} categories={categories} />
    </>
  );
}

export default function ClassListPage() {
  const breadcrumb = breadcrumbListJsonLd([
    { name: "首頁", url: "https://reportwang.com" },
    { name: "課程", url: "https://reportwang.com/class" },
  ]);

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumb }}
      />

      <div className="max-w-6xl mx-auto px-4 pt-16 pb-20">

        <div className="mb-10">
          <h1 className="text-5xl font-bold tracking-tight mb-4">長照評鑑實戰課程</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-4">
            系統化課程——從評鑑準備到文書效率，協助長照機構管理者從容備戰
          </p>
          <div className="space-y-2 text-muted-foreground max-w-2xl">
            <p>
              報告汪課程彙整長照評鑑實戰知識，涵蓋居家服務、日照中心、護理之家、醫院護理部等 14 類機構的評鑑準備攻略、文書效率技巧與 AI 輔助工具應用，協助社工、護理師與行政人員在評鑑季前建立系統化學習路徑。
            </p>
            <p>
              想深入了解特定機構，可前往{" "}
              <Link href="/school" className="text-primary underline underline-offset-4">評鑑小教室</Link>{" "}
              查閱逐項基準解析；想了解最新評鑑實務，可前往{" "}
              <Link href="/blog" className="text-primary underline underline-offset-4">部落格知識庫</Link>。
            </p>
          </div>

          {/* 課程內容免責聲明 */}
          <div className="mt-6 max-w-2xl rounded-lg border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/30 px-4 py-3">
            <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
              ⚠️ 以下課程為 AI 蒐集網路既有內容，課程品質及聯絡事宜由各自的開課單位負責，與本站無關。
            </p>
          </div>
        </div>


        <Suspense fallback={<div className="py-20 text-center text-muted-foreground">載入中...</div>}>
          <ClassContent />
        </Suspense>
      </div>
    </div>
  );
}
