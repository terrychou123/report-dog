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
    "@type": "Organization",
    name: "報告汪",
    url: "https://reportwang.com",
    logo: {
      "@type": "ImageObject",
      url: "https://reportwang.com/logo.png",
      width: 512,
      height: 512,
    },
    description:
      "報告汪是專為長照與社福機構設計的 AI 文書管理系統，協助社工、護理師、照服員快速完成定期報告與評鑑備審文件。",
    areaServed: { "@type": "Country", name: "Taiwan" },
    inLanguage: "zh-TW",
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
}): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: opts.title,
    description: opts.description,
    url: `https://reportwang.com/blog/${opts.slug}`,
    datePublished: opts.publishedAt,
    dateModified: opts.updatedAt,
    image: opts.coverImageUrl,
    inLanguage: "zh-TW",
    author: { "@type": "Organization", name: "報告汪", url: "https://reportwang.com" },
    publisher: {
      "@type": "Organization",
      name: "報告汪",
      url: "https://reportwang.com",
      logo: { "@type": "ImageObject", url: "https://reportwang.com/logo.png" },
    },
    articleSection: opts.category,
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
  const graphItems = parsed.map(({ "@context": _ctx, ...rest }) => rest);
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graphItems });
}

export function educationalContentJsonLd(opts: {
  type: "LearningResource" | "Course" | "ItemList";
  name: string;
  description: string;
  path: string;
  hasPart?: Array<{ name: string; url: string }>;
  itemListElement?: Array<{ name: string; url: string; description?: string }>;
}): string {
  const base = {
    "@context": "https://schema.org",
    "@type": opts.type,
    name: opts.name,
    description: opts.description,
    url: `https://reportwang.com${opts.path}`,
    inLanguage: "zh-TW",
    author: { "@type": "Organization", name: "報告汪" },
    audience: {
      "@type": "Audience",
      audienceType: "長照機構管理人員",
    },
    areaServed: {
      "@type": "Country",
      name: "Taiwan",
    },
  };

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
