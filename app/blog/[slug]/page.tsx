import Image from "next/image";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import sanitizeHtml from "sanitize-html";
import { cacheTag } from "next/cache";
import { blogSanitizeOptions } from "@/lib/blog-sanitize-config";
import { blogPostingJsonLd, howToJsonLd, faqPageJsonLd, mergeJsonLdGraph, breadcrumbListJsonLd } from "@/lib/jsonld";
import { extractBlogJsonLdData } from "@/lib/blog-jsonld-extract";
import { getFacilityInfoFromPost } from "@/lib/blog-facility-map";
import { BookOpenIcon, DownloadIcon } from "lucide-react";
import { injectHeadingIdsAndExtractToc, injectImageLoadingAttrs, type TocNode } from "@/lib/blog-html-postprocess";
import { BlogToc } from "@/components/blog/blog-toc";
import { BlogTldr } from "@/components/blog/blog-tldr";
import { SoapDemo } from "@/components/demo/soap-demo";

type Props = { params: Promise<{ slug: string }> };

// 每篇文章預設帶入最相關的範例情境（對應 soap-demo-examples.ts 的 id）
const SOAP_SLUG_TO_EXAMPLE: Record<string, string> = {
  'home-nursing-soap-b2-evaluation-records': 'home-nursing',
  'general-nursing-home-soap-b1-care-plan': 'general-nursing-home',
  'nursing-home-soap-b2-interprofessional-records': 'general-nursing-home',
  'psychiatric-nursing-home-soap-dar-records': 'general-nursing-home',
  'hospital-soap-interprofessional-care-plan': 'general-nursing-home',
  'home-care-simplified-soap-service-records': 'home-nursing',
  'disability-welfare-soap-case-records-2026': 'daycare',
};

const SOAP_SLUGS = new Set(Object.keys(SOAP_SLUG_TO_EXAMPLE));

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
  cacheTag("blog-post", `blog-post-${slug}`);
  const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
  if (!post) return undefined;

  // 1. sanitize — 清理不安全的 HTML 標籤與屬性
  const sanitized = post.content
    ? sanitizeHtml(post.content, blogSanitizeOptions)
    : post.content;

  // 2. 注入 h2/h3 id 並萃取 TOC 樹；無內容時回傳空 toc
  const { html: withIds, toc } = sanitized
    ? injectHeadingIdsAndExtractToc(sanitized)
    : { html: sanitized, toc: [] as TocNode[] };

  // 3. 為 <img> 注入 lazy-load；首張用 eager 作為 LCP 保險
  const withLazyImg = withIds
    ? injectImageLoadingAttrs(withIds, { firstImageEager: true })
    : withIds;

  // 4. 從已注入 id 的 HTML 萃取 HowTo/FAQ JSON-LD（純讀，不再修改 HTML）
  const { contentWithIds, howtoSteps, faqItems } = withLazyImg
    ? extractBlogJsonLdData(withLazyImg, slug)
    : { contentWithIds: withLazyImg, howtoSteps: undefined, faqItems: undefined };

  return { ...post, content: contentWithIds, toc, howtoSteps, faqItems };
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
  if (!post || post.status !== "published") return { title: "文章不存在 | 報告汪" };

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

  const blogPosting = blogPostingJsonLd({
    title: post.title,
    description: post.seoDescription || post.excerpt || undefined,
    slug: post.slug,
    publishedAt: post.publishedAt?.toISOString(),
    updatedAt: post.updatedAt?.toISOString(),
    coverImageUrl: post.coverImageUrl || undefined,
    category: post.category || undefined,
  });

  const howto = post.howtoSteps
    ? howToJsonLd({
        name: post.title,
        description: post.seoDescription || post.excerpt || post.title,
        path: `/blog/${post.slug}`,
        steps: post.howtoSteps,
      })
    : undefined;

  const faq = post.faqItems
    ? faqPageJsonLd(post.faqItems, `/blog/${post.slug}`)
    : undefined;

  const breadcrumb = breadcrumbListJsonLd([
    { name: "首頁", url: "https://reportwang.com" },
    { name: "Blog", url: "https://reportwang.com/blog" },
    ...(post.category ? [{ name: post.category, url: "https://reportwang.com/blog" }] : []),
    { name: post.title, url: `https://reportwang.com/blog/${post.slug}` },
  ]);

  const structuredData = mergeJsonLdGraph(blogPosting, howto, faq, breadcrumb);

  // 中文閱讀速度約每分鐘 300 字
  const readingMinutes = post.content
    ? Math.max(1, Math.ceil(post.content.replace(/<[^>]+>/g, "").length / 300))
    : undefined;

  const facilityInfo = getFacilityInfoFromPost(post.category, post.tags, post.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />

      <article className="min-h-screen bg-background">

        {/* 標頭區 — 麵包屑 / 封面 / 分類 / H1 / 日期，保持 max-w-4xl 置中 */}
        <div className="max-w-4xl mx-auto px-4 pt-16">

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
                alt={post.coverImageAlt || post.title}
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

          {/* 發佈日期、更新日期、閱讀時間 */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-10">
            {post.author && (
              <span className="font-medium text-foreground">{post.author}</span>
            )}
            {post.publishedAt && (
              <time dateTime={post.publishedAt.toISOString()}>
                {new Date(post.publishedAt).toLocaleDateString("zh-TW", {
                  timeZone: "Asia/Taipei",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            )}
            {post.updatedAt && post.publishedAt &&
              post.updatedAt.getTime() - post.publishedAt.getTime() > 86400000 && (
              <>
                <span className="text-muted-foreground/40">·</span>
                <span>
                  最後更新：
                  <time dateTime={post.updatedAt.toISOString()}>
                    {new Date(post.updatedAt).toLocaleDateString("zh-TW", {
                      timeZone: "Asia/Taipei",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </span>
              </>
            )}
            {readingMinutes && (
              <>
                <span className="text-muted-foreground/40">·</span>
                <span>約 {readingMinutes} 分鐘閱讀</span>
              </>
            )}
          </div>
        </div>

        {/* 主內容區 — 桌機展寬為 max-w-6xl，2 欄 Grid 放入左側 sticky TOC */}
        <div className="max-w-4xl mx-auto px-4 pb-20 lg:max-w-6xl">
          <div className="lg:grid lg:grid-cols-[240px_minmax(0,768px)] lg:gap-12">

            {/* 桌機左欄：sticky 文章目錄 */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2">
                <BlogToc toc={post.toc ?? []} />
              </div>
            </aside>

            {/* 右欄 / 手機全欄：TL;DR → 手機目錄 → 正文 → CTA → 延伸閱讀 */}
            <div>

              {/* TL;DR 摘要卡片 */}
              <BlogTldr text={post.excerpt ?? ""} />

              {/* SOAP AI Demo — 只在 SOAP 相關文章中顯示 */}
              {SOAP_SLUGS.has(post.slug) && (
                <div className="my-8">
                  <SoapDemo
                    variant="inline"
                    defaultExampleId={SOAP_SLUG_TO_EXAMPLE[post.slug]}
                  />
                </div>
              )}

              {/* 文章目錄 — 手機版 inline；桌機版由左側 sidebar 呈現 */}
              <div className="lg:hidden">
                <BlogToc toc={post.toc ?? []} />
              </div>

              {/* 文章內容 — HTML 已在 getPost 快取內清理完畢 */}
              {post.content && (
                <div
                  className="blog-content"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
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
          </div>
        </div>
      </article>
    </>
  );
}
