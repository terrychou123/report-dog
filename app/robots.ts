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
      // AI 爬蟲明確允許讀取公開內容（含 /school、/blog、/llms.txt），同時封鎖後台路徑
      {
        userAgent: ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended", "anthropic-ai", "cohere-ai", "CCBot"],
        allow: "/",
        disallow: ["/protected/", "/auth/", "/api/", "/admin/", "/blog-admin/", "/newsletter/", "/follow", "/share", "/tag"],
      },
    ],
    sitemap: "https://reportwang.com/sitemap.xml",
  };
}
