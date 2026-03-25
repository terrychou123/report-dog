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
