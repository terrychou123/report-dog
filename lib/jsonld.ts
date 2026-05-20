// 報告汪機構基礎資料 — 在 Organization schema 與 BlogPosting publisher 共用，不對外 export
const ORG_BASE = {
  "@type": "Organization" as const,
  name: "報告汪",
  url: "https://reportwang.com",
  logo: { "@type": "ImageObject" as const, url: "https://reportwang.com/logo.png", width: 512, height: 512 },
};

// 報告汪服務的 14 類機構領域 — Knowledge Graph knowsAbout 訊號
// 來源與 app/school/page.tsx courses[].title 同步，新增機構時更新此常數
const ORG_KNOWS_ABOUT = [
  "居家服務機構評鑑基準",
  "日間照顧機構評鑑基準",
  "小規模多機能機構評鑑基準",
  "住宿型照顧機構評鑑基準",
  "居家護理所評鑑基準",
  "一般護理之家評鑑基準",
  "產後護理之家評鑑基準",
  "身心障礙福利機構評鑑基準",
  "醫院評鑑基準",
  "兒少安置機構評鑑基準",
  "老人福利機構評鑑基準",
  "托嬰中心評鑑基準",
  "精神護理之家評鑑",
  "精神復健機構評鑑基準",
] as const;

export function breadcrumbListJsonLd(
  items: Array<{ name: string; url: string }>
): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  });
}

export function organizationJsonLd(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    ...ORG_BASE,
    description:
      "報告汪是專為長照與社福機構設計的 AI 文書管理系統，協助社工、護理師、照服員快速完成定期報告與評鑑備審文件。",
    slogan: "長照與社福機構的 AI 文書管理系統",
    areaServed: { "@type": "Country", name: "Taiwan" },
    inLanguage: "zh-TW",
    knowsAbout: ORG_KNOWS_ABOUT,
  });
}

export function websiteWithSearchJsonLd(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "報告汪",
    url: "https://reportwang.com",
    inLanguage: "zh-TW",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://reportwang.com/blog?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  });
}

export function reviewJsonLd(opts: {
  itemName: string;
  itemUrl: string;
  reviews: Array<{
    author: string;
    reviewBody: string;
    ratingValue: number;
  }>;
  ratingValue: number;
  reviewCount: number;
}): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: opts.itemName,
    url: opts.itemUrl,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: opts.ratingValue,
      reviewCount: opts.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    review: opts.reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewBody: r.reviewBody,
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.ratingValue,
        bestRating: 5,
        worstRating: 1,
      },
    })),
  });
}

export function faqPageJsonLd(
  items: Array<{ question: string; answer: string }>,
  path: string
): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: `https://reportwang.com${path}`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  });
}

export function blogPostingJsonLd(opts: {
  title: string;
  description?: string;
  slug: string;
  publishedAt?: string;
  updatedAt?: string;
  coverImageUrl?: string;
  category?: string;
  tags?: string[];
  /** 文章作者姓名；空值 fallback 至「報告汪編輯團隊」 */
  author?: string;
}): string {
  const url = `https://reportwang.com/blog/${opts.slug}`;
  // Person 優於 Organization — Google EEAT 偏好有具名作者
  const authorName = (opts.author || "").trim() || "報告汪編輯團隊";
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: opts.title,
    description: opts.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: opts.publishedAt,
    dateModified: opts.updatedAt,
    image: opts.coverImageUrl,
    inLanguage: "zh-TW",
    author: { "@type": "Person", name: authorName, url: "https://reportwang.com" },
    publisher: ORG_BASE,
    articleSection: opts.category,
    keywords: opts.tags?.length ? opts.tags.join(", ") : undefined,
  });
}

export function techArticleJsonLd(
  headline: string,
  description: string,
  path: string
): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline,
    description,
    url: `https://reportwang.com${path}`,
    author: { "@type": "Organization", name: "報告汪" },
  });
}

export function howToJsonLd(opts: {
  name: string;
  description: string;
  path: string;
  steps: Array<{ name: string; text?: string; url?: string }>;
  totalTime?: string;
}): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: opts.name,
    description: opts.description,
    url: `https://reportwang.com${opts.path}`,
    inLanguage: "zh-TW",
    ...(opts.totalTime ? { totalTime: opts.totalTime } : {}),
    step: opts.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      ...(s.text ? { text: s.text } : {}),
      ...(s.url ? { url: s.url } : {}),
    })),
  });
}

// 將多個 JSON-LD 字串合併為單一 @graph（過濾掉 undefined/null）
export function mergeJsonLdGraph(...schemas: (string | undefined | null | false)[]): string {
  const parsed = schemas
    .filter((s): s is string => typeof s === "string")
    .map((s) => JSON.parse(s));
  if (parsed.length === 0) return "";
  if (parsed.length === 1) return JSON.stringify(parsed[0]);
  // 提取所有 @context 後合併為 @graph
  const graphItems = parsed.map((item: Record<string, unknown>) => {
    const result = { ...item };
    delete result["@context"];
    return result;
  });
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graphItems });
}

export function educationalContentJsonLd(opts: {
  type: "LearningResource" | "Course" | "ItemList";
  name: string;
  description: string;
  path: string;
  dateModified?: string;
  dateCreated?: string;
  /** 引用來源（主管機關）— 用於 E-E-A-T 可信度訊號 */
  citation?: { name: string; url?: string };
  hasPart?: Array<{ name: string; url: string }>;
  itemListElement?: Array<{ name: string; url: string; description?: string }>;
}): string {
  const base: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": opts.type,
    name: opts.name,
    description: opts.description,
    url: `https://reportwang.com${opts.path}`,
    inLanguage: "zh-TW",
    author: {
      "@type": "Organization",
      name: "報告汪",
      url: "https://reportwang.com",
    },
    audience: {
      "@type": "Audience",
      audienceType: "長照機構管理人員",
    },
    areaServed: {
      "@type": "Country",
      name: "Taiwan",
    },
  };

  if (opts.dateModified) base.dateModified = opts.dateModified;
  if (opts.dateCreated) base.dateCreated = opts.dateCreated;
  if (opts.citation) {
    base.citation = {
      "@type": "GovernmentOrganization",
      name: opts.citation.name,
      ...(opts.citation.url ? { url: opts.citation.url } : {}),
    };
  }

  if (opts.type === "Course" && opts.hasPart) {
    return JSON.stringify({
      ...base,
      hasPart: opts.hasPart.map((p) => ({
        "@type": "LearningResource",
        name: p.name,
        url: p.url,
      })),
    });
  }

  if (opts.type === "ItemList" && opts.itemListElement) {
    return JSON.stringify({
      ...base,
      itemListElement: opts.itemListElement.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        url: item.url,
        description: item.description,
      })),
    });
  }

  return JSON.stringify(base);
}
