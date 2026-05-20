import { Suspense } from "react";
import Link from "next/link";
import { db } from "@/db";
import { classes } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import type { Metadata } from "next";
import { ClassListFilter } from "@/components/class-list-filter";
import { FACILITY_MAP } from "@/lib/blog-facility-map";
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

const FACILITY_HUB_ENTRIES = [
  { key: "home-care",    label: "居家服務機構", emoji: "🏠" },
  { key: "daycare",      label: "日間照顧機構", emoji: "☀️" },
  { key: "nursing-home", label: "住宿型長照機構", emoji: "🏥" },
  { key: "home-nursing", label: "居家護理所",   emoji: "💉" },
  { key: "general-nursing-home", label: "一般護理之家", emoji: "🏨" },
  { key: "hospital",     label: "醫院評鑑",     emoji: "🏦" },
  { key: "postpartum-care", label: "產後護理之家", emoji: "👶" },
  { key: "infant-daycare",  label: "托嬰中心",   emoji: "🍼" },
  { key: "elderly-welfare", label: "老人福利機構", emoji: "👴" },
  { key: "disability-welfare", label: "身心障礙機構", emoji: "♿" },
  { key: "psychiatric-nursing-home", label: "精神護理之家", emoji: "🧠" },
  { key: "psychiatric-rehabilitation-institution", label: "精神復健機構", emoji: "🌱" },
  { key: "youth-care",   label: "兒少安置機構", emoji: "🧒" },
  { key: "multi-function-care", label: "小規模多機能", emoji: "🔧" },
] as const;

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
              每門課程均引用官方評鑑基準條號，並附可直接套用的準備清單。想深入了解特定機構，可前往{" "}
              <Link href="/school" className="text-primary underline underline-offset-4">評鑑小教室</Link>{" "}
              查閱逐項基準解析；想了解最新評鑑實務，可前往{" "}
              <Link href="/blog" className="text-primary underline underline-offset-4">部落格知識庫</Link>。
            </p>
          </div>
        </div>

        {/* 機構類型入口 hub */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold mb-4 text-foreground">依機構類型瀏覽評鑑教學</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {FACILITY_HUB_ENTRIES.map(({ key, label, emoji }) => {
              const info = FACILITY_MAP[key];
              if (!info) return null;
              return (
                <Link
                  key={key}
                  href={info.schoolPath}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border bg-muted/30 hover:bg-muted/60 hover:border-primary/30 transition-colors text-sm text-muted-foreground hover:text-foreground"
                >
                  <span aria-hidden="true">{emoji}</span>
                  <span className="truncate">{label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <Suspense fallback={<div className="py-20 text-center text-muted-foreground">載入中...</div>}>
          <ClassContent />
        </Suspense>
      </div>
    </div>
  );
}
