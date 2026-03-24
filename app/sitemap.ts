import { MetadataRoute } from "next";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let publishedPosts: { slug: string; updatedAt: Date | null }[] = [];
  try {
    publishedPosts = await db
      .select({ slug: blogPosts.slug, updatedAt: blogPosts.updatedAt })
      .from(blogPosts)
      .where(eq(blogPosts.status, "published"));
  } catch {
    // DB unavailable — omit blog entries from sitemap
  }

  const blogEntries: MetadataRoute.Sitemap = publishedPosts.map((post) => ({
    url: `https://reportwang.com/blog/${post.slug}`,
    lastModified: post.updatedAt ?? new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const staticDate = new Date("2026-03-24");

  return [
    { url: "https://reportwang.com", lastModified: staticDate, changeFrequency: "monthly", priority: 1 },
    { url: "https://reportwang.com/home-care", lastModified: staticDate, changeFrequency: "monthly", priority: 0.8 },
    { url: "https://reportwang.com/hospital", lastModified: staticDate, changeFrequency: "monthly", priority: 0.8 },
    { url: "https://reportwang.com/nursing-home", lastModified: staticDate, changeFrequency: "monthly", priority: 0.8 },
    { url: "https://reportwang.com/day-care", lastModified: staticDate, changeFrequency: "monthly", priority: 0.8 },
    { url: "https://reportwang.com/disability", lastModified: staticDate, changeFrequency: "monthly", priority: 0.8 },
    { url: "https://reportwang.com/babycare", lastModified: staticDate, changeFrequency: "monthly", priority: 0.8 },
    { url: "https://reportwang.com/home-nursing", lastModified: staticDate, changeFrequency: "monthly", priority: 0.8 },
    { url: "https://reportwang.com/general-nursing-home", lastModified: staticDate, changeFrequency: "monthly", priority: 0.8 },
    { url: "https://reportwang.com/pricing", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/blog", lastModified: staticDate, changeFrequency: "weekly", priority: 0.7 },
    { url: "https://reportwang.com/docs", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/docs/getting-started", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/docs/create-report", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/docs/ai-editing", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/docs/tags-and-search", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/docs/copy-and-templates", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/docs/evaluation", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/docs/version-history", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/docs/excel-editing", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/docs/scenarios", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/docs/faq", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    ...blogEntries,
  ];
}
