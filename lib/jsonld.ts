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
