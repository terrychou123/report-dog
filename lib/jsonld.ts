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
