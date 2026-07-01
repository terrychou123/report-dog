import { NextResponse } from "next/server";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

// 每小時重驗一次（CDN 快取 24 小時）
export const revalidate = 3600;

const BASE = "https://reportwang.com";

/** RFC 822 日期格式（RSS 2.0 規範） */
function rfc822(date: Date | string | null): string {
  if (!date) return new Date().toUTCString();
  return new Date(date).toUTCString();
}

/** XML 特殊字元轉義（CDATA 外的純文字欄位用） */
function xmlEscape(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  // 撈最新 50 篇已發布文章（不含 content 大欄位）
  let posts: Array<{
    slug: string;
    title: string;
    excerpt: string | null;
    category: string | null;
    publishedAt: Date | null;
  }> = [];

  try {
    posts = await db
      .select({
        slug: blogPosts.slug,
        title: blogPosts.title,
        excerpt: blogPosts.excerpt,
        category: blogPosts.category,
        publishedAt: blogPosts.publishedAt,
      })
      .from(blogPosts)
      .where(eq(blogPosts.status, "published"))
      .orderBy(desc(blogPosts.publishedAt))
      .limit(50);
  } catch {
    // DB 掛掉時回空 feed，避免 500 錯誤
  }

  const items = posts
    .map((p) => {
      const link = `${BASE}/blog/${p.slug}`;
      const title = p.title ?? p.slug;
      const description = p.excerpt ?? "";
      const pubDate = rfc822(p.publishedAt);
      const category = p.category ?? "長照評鑑";

      return `
  <item>
    <title><![CDATA[${title}]]></title>
    <link>${xmlEscape(link)}</link>
    <guid isPermaLink="true">${xmlEscape(link)}</guid>
    <pubDate>${pubDate}</pubDate>
    <description><![CDATA[${description}]]></description>
    <category><![CDATA[${category}]]></category>
    <dc:creator>報告汪編輯部</dc:creator>
  </item>`;
    })
    .join("");

  const lastBuildDate = posts.length > 0 ? rfc822(posts[0].publishedAt) : new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
>
  <channel>
    <title>報告汪長照評鑑文章</title>
    <link>${BASE}/blog</link>
    <description>報告汪（reportwang.com）最新長照機構評鑑指南：14 種機構類型的評鑑基準、PDCA 品質改善、照護計畫撰寫等實務文章，每日更新。</description>
    <language>zh-tw</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${BASE}/blog/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${BASE}/og-image.png</url>
      <title>報告汪長照評鑑文章</title>
      <link>${BASE}/blog</link>
    </image>${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=600",
    },
  });
}
