import { Suspense } from "react";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import type { Metadata } from "next";
import { BlogListFilter } from "@/components/blog-list-filter";

export const metadata: Metadata = {
  title: "Blog | 報告汪 — 長照經營知識庫",
  description:
    "評鑑準備、實務技巧、經營管理——長照機構的第一手實戰指南",
  openGraph: {
    type: "website",
    title: "Blog | 報告汪",
    description: "評鑑準備、實務技巧、經營管理——長照機構的第一手實戰指南",
  },
  alternates: {
    canonical: "https://reportwang.com/blog",
  },
};

// 驗證圖片 URL：在 server 端過濾，避免 client render 時重複 URL.parse
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

// 資料抓取放在 Suspense 內，避免阻塞路由靜態部分
async function BlogContent() {
  const posts = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.status, "published"))
    .orderBy(desc(blogPosts.publishedAt));

  const categories = Array.from(
    new Set(posts.map((p) => p.category).filter(Boolean) as string[])
  );

  const listSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "報告汪 Blog",
    url: "https://reportwang.com/blog",
    blogPost: posts.slice(0, 10).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `https://reportwang.com/blog/${post.slug}`,
      datePublished: post.publishedAt?.toISOString(),
      image: post.coverImageUrl || undefined,
      description: post.excerpt || undefined,
    })),
  };

  // Date → ISO string；coverImageUrl 預先驗證，無效者設為 null
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }}
      />
      <BlogListFilter posts={serializedPosts} categories={categories} />
    </>
  );
}

export default function BlogListPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 pt-16 pb-20">

        {/* 靜態標題區（立即渲染，不被 DB 查詢阻塞） */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold tracking-tight mb-4">長照經營知識庫</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-4">
            評鑑準備、實務技巧、經營管理——長照機構的第一手實戰指南
          </p>
          <div className="space-y-2 text-muted-foreground max-w-2xl">
            <p>
              報告汪知識庫彙整長照評鑑實戰經驗，涵蓋居家服務、日照中心、護理之家、醫院護理部等 12 類機構的評鑑準備攻略、文書效率技巧與 AI 輔助工具應用，協助社工、護理師與行政人員在評鑑季前從容備戰。
            </p>
            <p>
              每篇文章均由長照從業者審閱，引用官方評鑑基準條號，並附上可直接套用的準備清單。想深入了解特定機構類型，可前往
              {" "}<a href="/school" className="text-primary underline underline-offset-4">評鑑小教室</a>{" "}
              查閱逐項基準解析。
            </p>
          </div>
        </div>

        {/* 資料抓取 + 互動篩選區（Suspense 串流） */}
        <Suspense fallback={<div className="py-20 text-center text-muted-foreground">載入中...</div>}>
          <BlogContent />
        </Suspense>
      </div>
    </div>
  );
}
