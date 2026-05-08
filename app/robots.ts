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
    ],
    sitemap: "https://reportwang.com/sitemap.xml",
  };
}
