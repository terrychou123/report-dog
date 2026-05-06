import { MetadataRoute } from "next";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq } from "drizzle-orm";

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let publishedPosts: { slug: string; updatedAt: Date | null; category: string | null; tags: string[] | null }[] = [];
  try {
    publishedPosts = await db
      .select({ slug: blogPosts.slug, updatedAt: blogPosts.updatedAt, category: blogPosts.category, tags: blogPosts.tags })
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

  // Blog 分類 archive
  const uniqueCategories = Array.from(
    new Set(publishedPosts.map((p) => p.category).filter(Boolean) as string[])
  );
  const categoryEntries: MetadataRoute.Sitemap = uniqueCategories.map((cat) => ({
    url: `https://reportwang.com/blog/category/${encodeURIComponent(cat)}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  // Blog 標籤 archive
  const uniqueTags = Array.from(
    new Set(publishedPosts.flatMap((p) => p.tags ?? []).filter(Boolean))
  );
  const tagEntries: MetadataRoute.Sitemap = uniqueTags.map((tag) => ({
    url: `https://reportwang.com/blog/tag/${encodeURIComponent(tag)}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.4,
  }));

  const staticDate = new Date();

  return [
    // Home
    { url: "https://reportwang.com", lastModified: staticDate, changeFrequency: "monthly", priority: 1 },

    // Facility-type landing pages
    { url: "https://reportwang.com/home-care", lastModified: staticDate, changeFrequency: "monthly", priority: 0.8 },
    { url: "https://reportwang.com/hospital", lastModified: staticDate, changeFrequency: "monthly", priority: 0.8 },
    { url: "https://reportwang.com/residential", lastModified: staticDate, changeFrequency: "monthly", priority: 0.8 },
    { url: "https://reportwang.com/day-care", lastModified: staticDate, changeFrequency: "monthly", priority: 0.8 },
    { url: "https://reportwang.com/disability-welfare", lastModified: staticDate, changeFrequency: "monthly", priority: 0.8 },
    { url: "https://reportwang.com/babycare", lastModified: staticDate, changeFrequency: "monthly", priority: 0.8 },
    { url: "https://reportwang.com/home-nursing", lastModified: staticDate, changeFrequency: "monthly", priority: 0.8 },
    { url: "https://reportwang.com/general-nursing-home", lastModified: staticDate, changeFrequency: "monthly", priority: 0.8 },
    { url: "https://reportwang.com/psychiatric", lastModified: staticDate, changeFrequency: "monthly", priority: 0.8 },

    // Core pages
    { url: "https://reportwang.com/pricing", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/testimonial", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/downloads", lastModified: staticDate, changeFrequency: "monthly", priority: 0.6 },

    // Blog
    { url: "https://reportwang.com/blog", lastModified: staticDate, changeFrequency: "weekly", priority: 0.7 },

    // Docs
    { url: "https://reportwang.com/docs", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/docs/getting-started", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/docs/create-report", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/docs/ai-editing", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/docs/tags-and-search", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/docs/follow-tracking", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/docs/copy-and-templates", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/docs/import-templates", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/docs/evaluation", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/docs/version-history", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/docs/excel-editing", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/docs/scenarios", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/docs/faq", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/docs/soap-writing", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/docs/report-links", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },

    // School — 評鑑小教室
    { url: "https://reportwang.com/school", lastModified: staticDate, changeFrequency: "monthly", priority: 0.8 },

    // 日照中心
    { url: "https://reportwang.com/school/daycare", lastModified: staticDate, changeFrequency: "monthly", priority: 0.8 },
    { url: "https://reportwang.com/school/daycare/bonus", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/daycare/client-rights", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/daycare/management", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/daycare/professional-quality", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/daycare/safety-environment", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },

    // 住宿型機構
    { url: "https://reportwang.com/school/nursing-home", lastModified: staticDate, changeFrequency: "monthly", priority: 0.8 },
    { url: "https://reportwang.com/school/nursing-home/client-rights", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/nursing-home/innovation", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/nursing-home/management", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/nursing-home/professional-quality", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/nursing-home/safety-environment", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },

    // 居家長照
    { url: "https://reportwang.com/school/home-care", lastModified: staticDate, changeFrequency: "monthly", priority: 0.8 },
    { url: "https://reportwang.com/school/home-care/bonus", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/home-care/client-rights", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/home-care/management", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/home-care/professional-quality", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },

    // 醫院
    { url: "https://reportwang.com/school/hospital", lastModified: staticDate, changeFrequency: "monthly", priority: 0.8 },
    { url: "https://reportwang.com/school/hospital/anesthesia-surgery", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/hospital/care-execution", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/hospital/care-quality", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/hospital/human-resources", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/hospital/infection-control", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/hospital/lab-pathology", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/hospital/medical-records", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/hospital/medication-safety", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/hospital/patient-rights", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/hospital/patient-services", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/hospital/risk-management", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/hospital/safety-environment", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/hospital/special-care", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/hospital/staff-support", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/hospital/strategy", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },

    // 身心障礙福利機構（109年度）
    { url: "https://reportwang.com/school/disability-welfare", lastModified: staticDate, changeFrequency: "monthly", priority: 0.8 },
    { url: "https://reportwang.com/school/disability-welfare/administration", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/disability-welfare/environment", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/disability-welfare/professional", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/disability-welfare/finance", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/disability-welfare/individual-care", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/disability-welfare/health-management", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },

    // 產後護理之家
    { url: "https://reportwang.com/school/postpartum-care", lastModified: staticDate, changeFrequency: "monthly", priority: 0.8 },
    { url: "https://reportwang.com/school/postpartum-care/administration", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/postpartum-care/professional-care", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/postpartum-care/safety-environment", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/postpartum-care/special-items", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },

    // 居家護理所
    { url: "https://reportwang.com/school/home-nursing", lastModified: staticDate, changeFrequency: "monthly", priority: 0.8 },
    { url: "https://reportwang.com/school/home-nursing/management", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/home-nursing/care-management", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/home-nursing/infection-control", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/home-nursing/quality-indicators", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/home-nursing/bonus", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },

    // 一般護理之家
    { url: "https://reportwang.com/school/general-nursing-home", lastModified: staticDate, changeFrequency: "monthly", priority: 0.8 },
    { url: "https://reportwang.com/school/general-nursing-home/administration", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/general-nursing-home/professional-care", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/general-nursing-home/safety-environment", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/general-nursing-home/special-items", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },

    // 精神護理之家
    { url: "https://reportwang.com/school/psychiatric-nursing-home", lastModified: staticDate, changeFrequency: "monthly", priority: 0.8 },
    { url: "https://reportwang.com/school/psychiatric-nursing-home/innovation", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/psychiatric-nursing-home/management", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/psychiatric-nursing-home/professional-care", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/psychiatric-nursing-home/resident-rights", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/psychiatric-nursing-home/safety-facilities", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },

    // 老人福利機構
    { url: "https://reportwang.com/school/elderly-welfare", lastModified: staticDate, changeFrequency: "monthly", priority: 0.8 },
    { url: "https://reportwang.com/school/elderly-welfare/bonus", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/elderly-welfare/client-rights", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/elderly-welfare/innovation", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/elderly-welfare/management", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/elderly-welfare/professional-quality", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/elderly-welfare/safety-environment", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },

    // 兒少教養機構
    { url: "https://reportwang.com/school/youth-care", lastModified: staticDate, changeFrequency: "monthly", priority: 0.8 },
    { url: "https://reportwang.com/school/youth-care/administration", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/youth-care/environment", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/youth-care/innovation", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/youth-care/professional", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/youth-care/finance", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },

    // 托嬰中心
    { url: "https://reportwang.com/infant-daycare", lastModified: staticDate, changeFrequency: "monthly", priority: 0.8 },
    { url: "https://reportwang.com/school/infant-daycare", lastModified: staticDate, changeFrequency: "monthly", priority: 0.8 },
    { url: "https://reportwang.com/school/infant-daycare/administration", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/infant-daycare/childcare-activities", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/infant-daycare/health-safety", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },

    // 精神復健機構
    { url: "https://reportwang.com/school/psychiatric-rehabilitation-institution", lastModified: staticDate, changeFrequency: "monthly", priority: 0.8 },
    { url: "https://reportwang.com/school/psychiatric-rehabilitation-institution/management", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/psychiatric-rehabilitation-institution/rehabilitation", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/psychiatric-rehabilitation-institution/service-quality", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },

    ...blogEntries,
    ...categoryEntries,
    ...tagEntries,
  ];
}
