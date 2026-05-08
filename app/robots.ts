import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/protected/",
          "/auth/",
          "/api/",
          "/admin/",
          "/blog-admin/",
          "/newsletter/",
          "/follow",
          "/share",
          "/tag",
        ],
      },
      // AI 爬蟲明確允許讀取公開內容（含 /school、/blog、/llms.txt）
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "cohere-ai", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
    ],
    sitemap: "https://reportwang.com/sitemap.xml",
  };
}
