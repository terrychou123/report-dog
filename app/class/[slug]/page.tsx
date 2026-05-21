import Image from "next/image";
import { db } from "@/db";
import { classes } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import sanitizeHtml from "sanitize-html";
import { cacheTag } from "next/cache";
import { blogSanitizeOptions } from "@/lib/blog-sanitize-config";
import { howToJsonLd, mergeJsonLdGraph, breadcrumbListJsonLd, faqPageJsonLd } from "@/lib/jsonld";
import { extractBlogJsonLdData } from "@/lib/blog-jsonld-extract";
import { getFacilityInfoFromPost } from "@/lib/blog-facility-map";
import { BlogFacilityDownloadCard } from "@/components/blog/blog-facility-download-card";
import { BookOpenIcon } from "lucide-react";
import { injectHeadingIdsAndExtractToc, injectImageLoadingAttrs, splitHtmlForMidNewsletter, type TocNode } from "@/lib/blog-html-postprocess";
import { injectFacilityInlineLinks } from "@/lib/blog-inline-linker";
import { BlogToc } from "@/components/blog/blog-toc";
import { BlogTldr } from "@/components/blog/blog-tldr";
import { BlogScrollCta } from "@/components/blog/blog-scroll-cta";
import { BlogInlineNewsletter } from "@/components/blog/blog-inline-newsletter";
import { TrackedCtaLink } from "@/components/tracked-cta-link";

type Props = { params: Promise<{ slug: string }> };

const HOWTO_SLUG_RE = /\b(guide|prep|plan|30day|90day|timeline|checklist|how-to|steps)\b/i;
const CHARS_PER_MINUTE = 300; // 中文閱讀速度（字/分鐘）
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

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

async function getPost(slug: string) {
  "use cache";
  if (slug === "_placeholder") return undefined;
  cacheTag("class-post", `class-post-${slug}`);
  const [post] = await db.select().from(classes).where(eq(classes.slug, slug));
  if (!post) return undefined;

  const sanitized = post.content
    ? sanitizeHtml(post.content, blogSanitizeOptions)
    : post.content;

  const { html: withIds, toc } = sanitized
    ? injectHeadingIdsAndExtractToc(sanitized)
    : { html: sanitized, toc: [] as TocNode[] };

  const withLazyImg = withIds
    ? injectImageLoadingAttrs(withIds, { firstImageEager: true })
    : withIds;

  const { contentWithIds, howtoSteps, faqItems } = withLazyImg
    ? extractBlogJsonLdData(withLazyImg, slug)
    : { contentWithIds: withLazyImg, howtoSteps: undefined, faqItems: undefined };

  const withInlineLinks = contentWithIds
    ? injectFacilityInlineLinks(contentWithIds, slug)
    : contentWithIds;

  return { ...post, content: withInlineLinks, toc, howtoSteps, faqItems };
}

export async function generateStaticParams() {
  return [{ slug: "_placeholder" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post || post.status !== "published") return { title: "課程不存在 | 報告汪" };

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt || undefined,
    openGraph: {
      type: "article",
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt || undefined,
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt?.toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt || undefined,
    },
    alternates: {
      canonical: `https://reportwang.com/class/${post.slug}`,
    },
  };
}

export default async function ClassPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post || post.status !== "published") notFound();

  const classUrl = `https://reportwang.com/class/${post.slug}`;

  // 課程用 Article schema（不用 BlogPosting 因為 blogPostingJsonLd 硬寫 /blog/ 路徑）
  const articleSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seoDescription || post.excerpt || undefined,
    url: classUrl,
    mainEntityOfPage: { "@type": "WebPage", "@id": classUrl },
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt?.toISOString(),
    image: post.coverImageUrl || undefined,
    inLanguage: "zh-TW",
    author: { "@type": "Person", name: "報告汪編輯團隊", url: "https://reportwang.com" },
    publisher: {
      "@type": "Organization",
      name: "報告汪",
      url: "https://reportwang.com",
      logo: { "@type": "ImageObject", url: "https://reportwang.com/logo.png", width: 512, height: 512 },
    },
    articleSection: post.category || undefined,
    keywords: post.tags?.length ? post.tags.join(", ") : undefined,
  });

  const derivedHowtoSteps =
    HOWTO_SLUG_RE.test(post.slug) && post.content
      ? [...post.content.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi)]
          .map((m) => ({ name: m[1].replace(/<[^>]+>/g, "").trim() }))
          .filter((s) => s.name.length > 0)
          .slice(0, 10)
      : [];

  const howto =
    derivedHowtoSteps.length >= 3
      ? howToJsonLd({
          name: post.title,
          description: post.seoDescription || post.excerpt || post.title,
          path: `/class/${post.slug}`,
          steps: derivedHowtoSteps,
        })
      : undefined;

  const faq = post.faqItems && post.faqItems.length >= 2
    ? faqPageJsonLd(post.faqItems, `/class/${post.slug}`)
    : undefined;

  const breadcrumb = breadcrumbListJsonLd([
    { name: "首頁", url: "https://reportwang.com" },
    { name: "課程", url: "https://reportwang.com/class" },
    ...(post.category ? [{ name: post.category, url: "https://reportwang.com/class" }] : []),
    { name: post.title, url: classUrl },
  ]);

  const structuredData = mergeJsonLdGraph(articleSchema, howto, faq, breadcrumb);

  const readingMinutes = post.content
    ? Math.max(1, Math.ceil(post.content.replace(/<[^>]+>/g, "").length / CHARS_PER_MINUTE))
    : undefined;

  const facilityInfo = getFacilityInfoFromPost(post.category, post.tags, post.slug);

  const [beforeMidHtml, afterMidHtml] = post.content
    ? splitHtmlForMidNewsletter(post.content)
    : ["", ""];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />

      <article className="min-h-screen bg-background">

        <div className="max-w-4xl mx-auto px-4 pt-16">

          <nav className="text-sm text-muted-foreground mb-8 flex items-center gap-1.5">
            <Link href="/" className="hover:text-foreground transition-colors">首頁</Link>
            <span className="text-muted-foreground/50">›</span>
            <Link href="/class" className="hover:text-foreground transition-colors">課程</Link>
            {post.category && (
              <>
                <span className="text-muted-foreground/50">›</span>
                <span>{post.category}</span>
              </>
            )}
          </nav>

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

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4">
            {post.title}
          </h1>

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
              post.updatedAt.getTime() - post.publishedAt.getTime() > ONE_DAY_MS && (
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

        <div className="max-w-4xl mx-auto px-4 pb-20">
          <div>
              <BlogTldr text={post.excerpt ?? ""} />

              <div className="lg:hidden">
                <BlogToc toc={post.toc ?? []} />
              </div>

              {beforeMidHtml && (
                <div
                  className="blog-content"
                  dangerouslySetInnerHTML={{ __html: beforeMidHtml }}
                />
              )}

              {afterMidHtml && (
                <>
                  <BlogInlineNewsletter slug={post.slug} />
                  <div
                    className="blog-content"
                    dangerouslySetInnerHTML={{ __html: afterMidHtml }}
                  />
                </>
              )}

              <div className="mt-16 rounded-xl border bg-primary/5 p-8 md:p-10 text-center">
                <p className="text-xl font-bold mb-2">報告汪 — AI 長照文書助理</p>
                <p className="text-muted-foreground mb-6">
                  讓 AI 幫你寫日誌、護理紀錄、評鑑備審文件，省下 50% 文書時間
                </p>
                <TrackedCtaLink
                  href="/auth/sign-up"
                  source="class-end-cta"
                  className="inline-flex items-center justify-center rounded-full bg-accent text-accent-foreground px-6 py-2.5 font-medium hover:bg-accent/90 transition-colors"
                >
                  免費試用 14 天
                </TrackedCtaLink>
              </div>

              {facilityInfo && (
                <div className="mt-10 rounded-xl border border-border bg-muted/30 p-6">
                  <p className="text-base font-semibold mb-4 flex items-center gap-2">
                    <BookOpenIcon className="h-4 w-4 text-primary" />
                    延伸閱讀：評鑑基準小教室
                  </p>
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
                  <BlogFacilityDownloadCard catalogSlug={facilityInfo.catalogSlug} />
                </div>
              )}
          </div>
        </div>

        <BlogScrollCta slug={post.slug} />

      </article>
    </>
  );
}
