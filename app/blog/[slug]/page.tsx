import Image from "next/image";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import sanitizeHtml from "sanitize-html";
import { blogSanitizeOptions } from "@/lib/blog-sanitize-config";
import { blogPostingJsonLd } from "@/lib/jsonld";
import { getFacilityInfoFromPost } from "@/lib/blog-facility-map";
import { BookOpenIcon, DownloadIcon } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

// 驗證圖片 URL 是否為合法的外部 https 連結或本地路徑
function isValidImageUrl(url: string | null): url is string {
  if (!url) return false;
  // 本地圖片路徑（如 /blog/xxx.svg）直接接受
  if (url.startsWith("/")) return true;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && !parsed.hostname.includes("localhost");
  } catch {
    return false;
  }
}

async function getPost(slug: string) {
  "use cache";
  const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
  if (!post) return undefined;
  // 在快取邊界內執行 HTML 清理，避免 Server Component 預渲染時的 Math.random() 限制
  return {
    ...post,
    content: post.content
      ? sanitizeHtml(post.content, blogSanitizeOptions)
      : post.content,
  };
}

export async function generateStaticParams() {
  const posts = await db
    .select({ slug: blogPosts.slug })
    .from(blogPosts)
    .where(eq(blogPosts.status, "published"));
  // Cache Components 要求至少一個項目；build 時 DB 若無資料則提供佔位符
  // 佔位符路徑會觸發 notFound()，Next.js 會正確生成 404 頁
  if (posts.length === 0) return [{ slug: "_placeholder" }];
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
      // og:image 由同目錄的 opengraph-image.tsx 動態產生 PNG（避免 SVG 字型在社群平台顯示亂碼）
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

  const structuredData = blogPostingJsonLd({
    title: post.title,
    description: post.seoDescription || post.excerpt || undefined,
    slug: post.slug,
    publishedAt: post.publishedAt?.toISOString(),
    updatedAt: post.updatedAt?.toISOString(),
    coverImageUrl: post.coverImageUrl || undefined,
    category: post.category || undefined,
  });

  const facilityInfo = getFacilityInfoFromPost(post.category, post.tags, post.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />

      <article className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 pt-16 pb-20">

          {/* 麵包屑導覽 */}
          <nav className="text-sm text-muted-foreground mb-8 flex items-center gap-1.5">
            <Link href="/" className="hover:text-foreground transition-colors">首頁</Link>
            <span className="text-muted-foreground/50">›</span>
            <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
            {post.category && (
              <>
                <span className="text-muted-foreground/50">›</span>
                <span>{post.category}</span>
              </>
            )}
          </nav>

          {/* 封面圖 — 受控比例，圓角 */}
          {isValidImageUrl(post.coverImageUrl) && (
            <div className="relative aspect-[2/1] rounded-xl overflow-hidden bg-muted mb-10">
              <Image
                src={post.coverImageUrl}
                alt={post.title}
                fill
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* 分類與標籤 — 整合為一行 */}
          {(post.category || (post.tags && post.tags.length > 0)) && (
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {post.category && (
                <span className="text-primary text-sm font-medium">
                  {post.category}
                </span>
              )}
              {post.category && post.tags && post.tags.length > 0 && (
                <span className="text-muted-foreground/50">·</span>
              )}
              {post.tags && post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs border border-border rounded-full px-3 py-1 text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* 文章標題 */}
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4">
            {post.title}
          </h1>

          {/* 發佈日期 */}
          {post.publishedAt && (
            <p className="text-sm text-muted-foreground mb-10">
              <time dateTime={post.publishedAt.toISOString()}>
                {new Date(post.publishedAt).toLocaleDateString("zh-TW", {
                  timeZone: "Asia/Taipei", // 固定台灣時區
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </p>
          )}

          {/* 文章摘要 — 引用樣式 */}
          {post.excerpt && (
            <p className="text-lg text-muted-foreground border-l-4 border-primary/40 pl-4 mb-10 italic leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {/* 文章內容 — 限制閱讀寬度，HTML 已在 getPost 快取內清理完畢 */}
          {post.content && (
            <div className="max-w-3xl">
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          )}

          {/* CTA 卡片 */}
          <div className="mt-16 rounded-xl border bg-primary/5 p-8 md:p-10 text-center">
            <h2 className="text-xl font-bold mb-2">報告汪 — AI 長照文書助理</h2>
            <p className="text-muted-foreground mb-6">
              讓 AI 幫你寫日誌、護理紀錄、評鑑備審文件，省下 50% 文書時間
            </p>
            <Link
              href="/auth/sign-up"
              className="inline-flex items-center justify-center rounded-full bg-accent text-accent-foreground px-6 py-2.5 font-medium hover:bg-accent/90 transition-colors"
            >
              免費試用 14 天
            </Link>
          </div>

          {/* 延伸閱讀：相關評鑑章節 + 下載 */}
          {facilityInfo && (
            <div className="mt-10 rounded-xl border border-border bg-muted/30 p-6">
              <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
                <BookOpenIcon className="h-4 w-4 text-primary" />
                延伸閱讀：評鑑基準小教室
              </h2>
              <div className="grid gap-2 sm:grid-cols-2 mb-5">
                {facilityInfo.subPages.map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    className="flex items-center gap-2 rounded-lg border bg-background px-4 py-2.5 text-sm hover:border-primary/50 hover:text-primary transition-colors"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/60 shrink-0" />
                    {page.label}
                  </Link>
                ))}
                <Link
                  href={facilityInfo.schoolPath}
                  className="flex items-center gap-2 rounded-lg border bg-background px-4 py-2.5 text-sm font-medium hover:border-primary/50 hover:text-primary transition-colors sm:col-span-2"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/60 shrink-0" />
                  {facilityInfo.schoolName} — 查看全部評鑑項目
                </Link>
              </div>
              <a
                href={facilityInfo.downloadPath}
                download
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <DownloadIcon className="h-4 w-4" />
                免費下載 {facilityInfo.downloadName}（Excel）
              </a>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
