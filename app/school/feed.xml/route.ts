import { NextResponse } from "next/server";
import { schoolNavSections } from "@/lib/school-nav";
import { schoolReviewDates } from "@/lib/school-review-dates";

export const dynamic = "force-static";
export const revalidate = 86400;

const BASE = "https://reportwang.com";

function rfc822(dateStr: string): string {
  return new Date(dateStr).toUTCString();
}

export function GET() {
  const items: string[] = [];

  for (const section of schoolNavSections) {
    const [overview, ...subs] = section.items;
    const slug = overview.href.split("/")[2]; // /school/{slug}
    const dateStr = schoolReviewDates[slug] ?? "2026-01-01";
    const pubDate = rfc822(dateStr);

    // 機構總覽頁
    items.push(`
  <item>
    <title><![CDATA[${section.group}評鑑基準總覽｜報告汪評鑑小教室]]></title>
    <link>${BASE}${overview.href}</link>
    <guid isPermaLink="true">${BASE}${overview.href}</guid>
    <pubDate>${pubDate}</pubDate>
    <description><![CDATA[${overview.desc ?? ""}]]></description>
    <category><![CDATA[${section.group}]]></category>
  </item>`);

    // 各子頁
    for (const sub of subs) {
      items.push(`
  <item>
    <title><![CDATA[${sub.title}｜報告汪評鑑小教室]]></title>
    <link>${BASE}${sub.href}</link>
    <guid isPermaLink="true">${BASE}${sub.href}</guid>
    <pubDate>${pubDate}</pubDate>
    <description><![CDATA[${sub.desc ?? ""}]]></description>
    <category><![CDATA[${section.group}]]></category>
  </item>`);
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
>
  <channel>
    <title>報告汪評鑑小教室</title>
    <link>${BASE}/school</link>
    <description>長照機構暨醫院評鑑基準教學：12 種機構類型、91 個評鑑頁面，涵蓋居家服務、日間照顧、住宿型長照、醫院等。</description>
    <language>zh-tw</language>
    <lastBuildDate>${rfc822(new Date().toISOString().split("T")[0])}</lastBuildDate>
    <atom:link href="${BASE}/school/feed.xml" rel="self" type="application/rss+xml"/>
    <dc:creator>報告汪編輯部</dc:creator>
    <image>
      <url>${BASE}/og-image.png</url>
      <title>報告汪評鑑小教室</title>
      <link>${BASE}/school</link>
    </image>${items.join("")}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
