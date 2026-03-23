import { MetadataRoute } from "next";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const publishedPosts = await db
    .select({ slug: blogPosts.slug, updatedAt: blogPosts.updatedAt })
    .from(blogPosts)
    .where(eq(blogPosts.status, "published"));

  const blogEntries: MetadataRoute.Sitemap = publishedPosts.map((post) => ({
    url: `https://reportwang.com/blog/${post.slug}`,
    lastModified: post.updatedAt ?? new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [
    { url: "https://reportwang.com", lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: "https://reportwang.com/home-care", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://reportwang.com/hospital", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://reportwang.com/nursing-home", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://reportwang.com/pricing", lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/blog", lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    ...blogEntries,
  ];
}
