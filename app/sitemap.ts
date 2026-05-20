import { MetadataRoute } from "next";
import { db } from "@/db";
import { blogPosts, classes } from "@/db/schema";
import { eq } from "drizzle-orm";
import { schoolReviewDates } from "@/lib/school-review-dates";

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

  let publishedClasses: { slug: string; updatedAt: Date | null; category: string | null; tags: string[] | null }[] = [];
  try {
    publishedClasses = await db
      .select({ slug: classes.slug, updatedAt: classes.updatedAt, category: classes.category, tags: classes.tags })
      .from(classes)
      .where(eq(classes.status, "published"));
  } catch {
    // DB unavailable — omit class entries from sitemap
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

  // Class 文章
  const classEntries: MetadataRoute.Sitemap = publishedClasses.map((post) => ({
    url: `https://reportwang.com/class/${post.slug}`,
    lastModified: post.updatedAt ?? new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  // Class 分類 archive
  const uniqueClassCategories = Array.from(
    new Set(publishedClasses.map((p) => p.category).filter(Boolean) as string[])
  );
  const classCategoryEntries: MetadataRoute.Sitemap = uniqueClassCategories.map((cat) => ({
    url: `https://reportwang.com/class/category/${encodeURIComponent(cat)}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  // Class 標籤 archive
  const uniqueClassTags = Array.from(
    new Set(publishedClasses.flatMap((p) => p.tags ?? []).filter(Boolean))
  );
  const classTagEntries: MetadataRoute.Sitemap = uniqueClassTags.map((tag) => ({
    url: `https://reportwang.com/class/tag/${encodeURIComponent(tag)}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.4,
  }));

  const staticDate = new Date();
  const schoolDate = (slug: string): Date => {
    const d = schoolReviewDates[slug];
    return d ? new Date(d) : staticDate;
  };

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
    // Class
    { url: "https://reportwang.com/class", lastModified: staticDate, changeFrequency: "weekly", priority: 0.7 },
    { url: "https://reportwang.com/blog/pdca", lastModified: staticDate, changeFrequency: "monthly", priority: 0.8 },

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
    { url: "https://reportwang.com/docs/excel-editing", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/docs/scenarios", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/docs/faq", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/docs/soap-writing", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/docs/report-links", lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/docs/version-history", lastModified: staticDate, changeFrequency: "monthly", priority: 0.5 },

    // School — 評鑑小教室
    { url: "https://reportwang.com/school", lastModified: staticDate, changeFrequency: "monthly", priority: 0.8 },

    // 日照中心
    { url: "https://reportwang.com/school/daycare", lastModified: schoolDate("daycare"), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://reportwang.com/school/daycare/bonus", lastModified: schoolDate("daycare"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/daycare/client-rights", lastModified: schoolDate("daycare"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/daycare/management", lastModified: schoolDate("daycare"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/daycare/professional-quality", lastModified: schoolDate("daycare"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/daycare/safety-environment", lastModified: schoolDate("daycare"), changeFrequency: "monthly", priority: 0.7 },

    // 小規模多機能機構
    { url: "https://reportwang.com/multi-function-care", lastModified: staticDate, changeFrequency: "monthly", priority: 0.8 },
    { url: "https://reportwang.com/school/multi-function-care", lastModified: schoolDate("multi-function-care"), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://reportwang.com/school/multi-function-care/client-rights", lastModified: schoolDate("multi-function-care"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/multi-function-care/professional-quality", lastModified: schoolDate("multi-function-care"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/multi-function-care/management", lastModified: schoolDate("multi-function-care"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/multi-function-care/safety-environment", lastModified: schoolDate("multi-function-care"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/multi-function-care/bonus", lastModified: schoolDate("multi-function-care"), changeFrequency: "monthly", priority: 0.7 },

    // 住宿型機構
    { url: "https://reportwang.com/school/nursing-home", lastModified: schoolDate("nursing-home"), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://reportwang.com/school/nursing-home/client-rights", lastModified: schoolDate("nursing-home"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/nursing-home/innovation", lastModified: schoolDate("nursing-home"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/nursing-home/management", lastModified: schoolDate("nursing-home"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/nursing-home/professional-quality", lastModified: schoolDate("nursing-home"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/nursing-home/safety-environment", lastModified: schoolDate("nursing-home"), changeFrequency: "monthly", priority: 0.7 },

    // 居家長照
    { url: "https://reportwang.com/school/home-care", lastModified: schoolDate("home-care"), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://reportwang.com/school/home-care/bonus", lastModified: schoolDate("home-care"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/home-care/client-rights", lastModified: schoolDate("home-care"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/home-care/management", lastModified: schoolDate("home-care"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/home-care/professional-quality", lastModified: schoolDate("home-care"), changeFrequency: "monthly", priority: 0.7 },

    // 醫院
    { url: "https://reportwang.com/school/hospital", lastModified: schoolDate("hospital"), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://reportwang.com/school/hospital/anesthesia-surgery", lastModified: schoolDate("hospital"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/hospital/care-execution", lastModified: schoolDate("hospital"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/hospital/care-quality", lastModified: schoolDate("hospital"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/hospital/human-resources", lastModified: schoolDate("hospital"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/hospital/infection-control", lastModified: schoolDate("hospital"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/hospital/lab-pathology", lastModified: schoolDate("hospital"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/hospital/medical-records", lastModified: schoolDate("hospital"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/hospital/medication-safety", lastModified: schoolDate("hospital"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/hospital/patient-rights", lastModified: schoolDate("hospital"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/hospital/patient-services", lastModified: schoolDate("hospital"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/hospital/risk-management", lastModified: schoolDate("hospital"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/hospital/safety-environment", lastModified: schoolDate("hospital"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/hospital/special-care", lastModified: schoolDate("hospital"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/hospital/staff-support", lastModified: schoolDate("hospital"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/hospital/strategy", lastModified: schoolDate("hospital"), changeFrequency: "monthly", priority: 0.7 },

    // 身心障礙福利機構（109年度）
    { url: "https://reportwang.com/school/disability-welfare", lastModified: schoolDate("disability-welfare"), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://reportwang.com/school/disability-welfare/administration", lastModified: schoolDate("disability-welfare"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/disability-welfare/environment", lastModified: schoolDate("disability-welfare"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/disability-welfare/professional-quality", lastModified: schoolDate("disability-welfare"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/disability-welfare/finance", lastModified: schoolDate("disability-welfare"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/disability-welfare/individual-care", lastModified: schoolDate("disability-welfare"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/disability-welfare/health-management", lastModified: schoolDate("disability-welfare"), changeFrequency: "monthly", priority: 0.7 },

    // 產後護理之家
    { url: "https://reportwang.com/school/postpartum-care", lastModified: schoolDate("postpartum-care"), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://reportwang.com/school/postpartum-care/administration", lastModified: schoolDate("postpartum-care"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/postpartum-care/professional-quality", lastModified: schoolDate("postpartum-care"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/postpartum-care/safety-environment", lastModified: schoolDate("postpartum-care"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/postpartum-care/special-items", lastModified: schoolDate("postpartum-care"), changeFrequency: "monthly", priority: 0.7 },

    // 居家護理所
    { url: "https://reportwang.com/school/home-nursing", lastModified: schoolDate("home-nursing"), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://reportwang.com/school/home-nursing/management", lastModified: schoolDate("home-nursing"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/home-nursing/care-management", lastModified: schoolDate("home-nursing"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/home-nursing/infection-control", lastModified: schoolDate("home-nursing"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/home-nursing/quality-indicators", lastModified: schoolDate("home-nursing"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/home-nursing/bonus", lastModified: schoolDate("home-nursing"), changeFrequency: "monthly", priority: 0.7 },

    // 一般護理之家
    { url: "https://reportwang.com/school/general-nursing-home", lastModified: schoolDate("general-nursing-home"), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://reportwang.com/school/general-nursing-home/administration", lastModified: schoolDate("general-nursing-home"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/general-nursing-home/professional-quality", lastModified: schoolDate("general-nursing-home"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/general-nursing-home/safety-environment", lastModified: schoolDate("general-nursing-home"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/general-nursing-home/special-items", lastModified: schoolDate("general-nursing-home"), changeFrequency: "monthly", priority: 0.7 },

    // 精神護理之家
    { url: "https://reportwang.com/school/psychiatric-nursing-home", lastModified: schoolDate("psychiatric-nursing-home"), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://reportwang.com/school/psychiatric-nursing-home/innovation", lastModified: schoolDate("psychiatric-nursing-home"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/psychiatric-nursing-home/management", lastModified: schoolDate("psychiatric-nursing-home"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/psychiatric-nursing-home/professional-quality", lastModified: schoolDate("psychiatric-nursing-home"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/psychiatric-nursing-home/resident-rights", lastModified: schoolDate("psychiatric-nursing-home"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/psychiatric-nursing-home/safety-facilities", lastModified: schoolDate("psychiatric-nursing-home"), changeFrequency: "monthly", priority: 0.7 },

    // 老人福利機構
    { url: "https://reportwang.com/school/elderly-welfare", lastModified: schoolDate("elderly-welfare"), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://reportwang.com/school/elderly-welfare/bonus", lastModified: schoolDate("elderly-welfare"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/elderly-welfare/client-rights", lastModified: schoolDate("elderly-welfare"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/elderly-welfare/innovation", lastModified: schoolDate("elderly-welfare"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/elderly-welfare/management", lastModified: schoolDate("elderly-welfare"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/elderly-welfare/professional-quality", lastModified: schoolDate("elderly-welfare"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/elderly-welfare/safety-environment", lastModified: schoolDate("elderly-welfare"), changeFrequency: "monthly", priority: 0.7 },

    // 兒少教養機構
    { url: "https://reportwang.com/school/youth-care", lastModified: schoolDate("youth-care"), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://reportwang.com/school/youth-care/administration", lastModified: schoolDate("youth-care"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/youth-care/environment", lastModified: schoolDate("youth-care"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/youth-care/innovation", lastModified: schoolDate("youth-care"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/youth-care/professional-quality", lastModified: schoolDate("youth-care"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/youth-care/finance", lastModified: schoolDate("youth-care"), changeFrequency: "monthly", priority: 0.7 },

    // 托嬰中心
    { url: "https://reportwang.com/infant-daycare", lastModified: staticDate, changeFrequency: "monthly", priority: 0.8 },
    { url: "https://reportwang.com/school/infant-daycare", lastModified: schoolDate("infant-daycare"), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://reportwang.com/school/infant-daycare/administration", lastModified: schoolDate("infant-daycare"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/infant-daycare/childcare-activities", lastModified: schoolDate("infant-daycare"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/infant-daycare/health-safety", lastModified: schoolDate("infant-daycare"), changeFrequency: "monthly", priority: 0.7 },

    // 精神復健機構
    { url: "https://reportwang.com/school/psychiatric-rehabilitation-institution", lastModified: schoolDate("psychiatric-rehabilitation-institution"), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://reportwang.com/school/psychiatric-rehabilitation-institution/management", lastModified: schoolDate("psychiatric-rehabilitation-institution"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/psychiatric-rehabilitation-institution/rehabilitation", lastModified: schoolDate("psychiatric-rehabilitation-institution"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://reportwang.com/school/psychiatric-rehabilitation-institution/service-quality", lastModified: schoolDate("psychiatric-rehabilitation-institution"), changeFrequency: "monthly", priority: 0.7 },

    ...blogEntries,
    ...categoryEntries,
    ...tagEntries,
    ...classEntries,
    ...classCategoryEntries,
    ...classTagEntries,
  ];
}
