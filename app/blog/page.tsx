import { Suspense } from "react";
import Link from "next/link";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { and, desc, eq, ilike, or, sql } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { connection } from "next/server";
import type { Metadata } from "next";
import { BlogListFilter } from "@/components/blog-list-filter";
import { breadcrumbListJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Blog | 報告汪 — 長照評鑑實戰知識庫",
  description:
    "255 篇長照評鑑實戰文章：日照、居家服務、護理之家、醫院、托嬰等 14 類機構的評鑑準備、文書技巧、PDCA 品質改善完整教學。",
  openGraph: {
    type: "website",
    title: "Blog | 報告汪 — 長照評鑑實戰知識庫",
    description: "255 篇長照評鑑實戰文章：日照、居家服務、護理之家、醫院、托嬰等 14 類機構評鑑完整教學。",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | 報告汪 — 長照評鑑實戰知識庫",
    description: "255 篇長照評鑑實戰文章：評鑑準備、文書技巧、PDCA 品質改善完整教學。",
  },
  alternates: {
    canonical: "/blog",
  },
};

// 每頁筆數（與 BlogListFilter 共用，由此檔統一定義）
const PAGE_SIZE = 11;

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

// ── 伺服器端查詢函式（URL 參數驅動，每頁最多 PAGE_SIZE 筆）──────────────────
//
// 三個函式都掛 "use cache" + cacheTag("blog-list")：
//   - 相同引數的請求命中快取，避免每次請求都打 DB
//   - /api/revalidate-blog 在文章發布/更新時失效此 tag
//   - 參數皆可序列化（string|null、number），符合 "use cache" 以引數為 key 的規則

function buildConditions(category: string | null, q: string | null) {
  const conds: ReturnType<typeof eq>[] = [eq(blogPosts.status, "published")];
  if (category) conds.push(eq(blogPosts.category, category));
  if (q) {
    const pattern = `%${q}%`;
    // 比照前端原本搜尋行為：title / excerpt / tags（tags 為 text[]，用 array_to_string 做 ILIKE）
    conds.push(
      or(
        ilike(blogPosts.title, pattern),
        ilike(blogPosts.excerpt, pattern),
        sql`array_to_string(${blogPosts.tags}, ' ') ILIKE ${pattern}`,
      )!,
    );
  }
  return conds;
}

// 查詢當頁文章（只 select 列表需要的 8 欄位，絕不撈 content 大欄位）
async function getPosts(category: string | null, q: string | null, page: number) {
  "use cache";
  cacheTag("blog-list");
  cacheLife("days"); // 背景重驗每日一次，平時靠 revalidateTag 失效
  return db
    .select({
      id: blogPosts.id,
      slug: blogPosts.slug,
      title: blogPosts.title,
      excerpt: blogPosts.excerpt,
      coverImageUrl: blogPosts.coverImageUrl,
      category: blogPosts.category,
      tags: blogPosts.tags,
      publishedAt: blogPosts.publishedAt,
    })
    .from(blogPosts)
    .where(and(...buildConditions(category, q)))
    .orderBy(desc(blogPosts.publishedAt))
    .limit(PAGE_SIZE)
    .offset((page - 1) * PAGE_SIZE);
}

// 查詢符合條件的文章總數（用於計算總頁數 + 「找到 N 篇」提示）
async function getPostsCount(category: string | null, q: string | null) {
  "use cache";
  cacheTag("blog-list");
  cacheLife("days"); // 背景重驗每日一次，平時靠 revalidateTag 失效
  const result = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(blogPosts)
    .where(and(...buildConditions(category, q)));
  return result[0]?.count ?? 0;
}

// 查詢所有已發布文章的分類清單（不再從全集合提取，改為獨立查詢）
async function getCategories() {
  "use cache";
  cacheTag("blog-list");
  cacheLife("days"); // 背景重驗每日一次，平時靠 revalidateTag 失效
  const rows = await db
    .selectDistinct({ category: blogPosts.category })
    .from(blogPosts)
    .where(eq(blogPosts.status, "published"));
  return rows
    .map((r) => r.category)
    .filter((c): c is string => !!c)
    .sort();
}

// ── BlogContent：接收 searchParams Promise，在 Suspense 內 await，串流給客戶端 ──
// BlogListPage 必須保持 sync：動態資料（searchParams / connection）只能在 Suspense 內取用，
// 否則 Next.js 會拋 "Uncached data was accessed outside of <Suspense>"。

interface BlogContentProps {
  searchParams: Promise<{ category?: string; q?: string; page?: string }>;
}

async function BlogContent({ searchParams }: BlogContentProps) {
  // connection()：標記為 runtime-dynamic，讓 build 不預渲染 /blog、不在 build 填快取
  // 快取改在 runtime 首次請求填，比照 /blog/[slug] 的 runtime-fill 模式。
  await connection();

  const sp = await searchParams;
  const category = sp.category?.trim() || null;
  const q = sp.q?.trim() || null;
  const page = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);

  const [posts, totalCount, categories] = await Promise.all([
    getPosts(category, q, page),
    getPostsCount(category, q),
    getCategories(),
  ]);
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  // CollectionPage + ItemList：numberOfItems 用全部符合條件的總數（正確），
  // itemListElement 列當頁 posts（改版取捨，不再撈全集合）
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "報告汪長照評鑑知識庫",
    description: "255 篇長照機構評鑑實戰教學文章，涵蓋 14 類機構評鑑基準解析、文書撰寫技巧與 PDCA 品質改善。",
    url: "https://reportwang.com/blog",
    inLanguage: "zh-TW",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: totalCount,
      itemListElement: posts.map((post, i) => ({
        "@type": "ListItem",
        position: (page - 1) * PAGE_SIZE + i + 1,
        url: `https://reportwang.com/blog/${post.slug}`,
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
      <BlogListFilter
        posts={serializedPosts}
        categories={categories}
        activeCategory={category}
        initialQuery={q ?? ""}
        currentPage={page}
        totalPages={totalPages}
        totalCount={totalCount}
      />
    </>
  );
}

// ── 頁面 shell（sync — 不在此 await 任何動態資料）────────────────────────────
// searchParams Promise 直接傳入 Suspense 內的 BlogContent，由它 await，
// 才不會觸發 "Uncached data accessed outside <Suspense>" build 錯誤。

export default function BlogListPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string; page?: string }>;
}) {
  const breadcrumb = breadcrumbListJsonLd([
    { name: "首頁", url: "https://reportwang.com" },
    { name: "Blog", url: "https://reportwang.com/blog" },
  ]);

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumb }}
      />

      <div className="max-w-6xl mx-auto px-4 pt-16 pb-20">

        {/* 靜態標題區（立即渲染，不被 DB 查詢阻塞） */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold tracking-tight mb-4">長照評鑑實戰知識庫</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-4">
            評鑑準備、實務技巧、品質改善——長照機構的第一手實戰指南
          </p>
          <div className="space-y-2 text-muted-foreground max-w-2xl">
            <p>
              報告汪知識庫彙整長照評鑑實戰經驗，涵蓋居家服務、日照中心、護理之家、醫院護理部等 14 類機構的評鑑準備攻略、文書效率技巧與 AI 輔助工具應用，協助社工、護理師與行政人員在評鑑季前從容備戰。
            </p>
            <p>
              每篇文章均引用官方評鑑基準條號，並附可直接套用的準備清單。想深入了解特定機構，可前往{" "}
              <Link href="/school" className="text-primary underline underline-offset-4">評鑑小教室</Link>{" "}
              查閱逐項基準解析；想了解 PDCA 品質改善，可前往{" "}
              <Link href="/blog/pdca" className="text-primary underline underline-offset-4">PDCA 教學專區</Link>。
            </p>
          </div>
        </div>

        {/* 資料抓取 + 互動篩選區（Suspense 串流） */}
        <Suspense fallback={<div className="py-20 text-center text-muted-foreground">載入中...</div>}>
          <BlogContent searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
