/**
 * 部落格文章 Seed Script
 * 將 scripts/blog-posts/ 下的部落格文章寫入資料庫（共 209 篇）
 *
 * 使用方式：
 *   npx tsx --env-file=.env.local scripts/seed-blog-posts.ts
 *
 * 需要 .env.local 中的 DATABASE_URL
 */

import { readFileSync } from "fs";
import { join } from "path";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { blogPosts } from "../db/schema";
import { getDbUrl } from "../db/index";

const POST_FILES = [
  // 日照中心系列（17 篇）
  "article-1-daycare-45-guide.json",
  "article-2-daycare-common-mistakes.json",
  "article-3-daycare-checklist-download.json",
  "article-4-daycare-inspector-perspective.json",
  "article-5-daycare-faq-15.json",
  "article-6-daycare-3month-timeline.json",
  "article-7-daycare-quality-indicator.json",
  "article-8-daycare-post-evaluation.json",
  "article-9-daycare-new-director.json",
  "article-10-daycare-dementia-home.json",
  "article-11-daycare-case-records.json",
  "article-12-daycare-retention.json",
  "article-13-daycare-care-plan-example.json",
  "article-14-daycare-role-division.json",
  "article-15-daycare-staffing-calculation.json",
  "article-16-daycare-top10-deficiencies.json",
  "article-17-daycare-ai-tool-guide.json",
  // 居家照顧系列（7 篇）
  "article-18-home-care-evaluation-guide.json",
  "article-19-home-care-common-mistakes.json",
  "article-20-home-care-document-ai.json",
  "article-21-home-care-case-records.json",
  "article-22-home-care-team-collaboration.json",
  "article-23-home-care-90day-plan.json",
  "article-24-home-care-self-evaluation.json",
  // 住宿型機構系列（25 篇）
  "article-25-nursing-home-75guide.json",
  "article-26-nursing-home-ai-document-writing.json",
  "article-27-nursing-home-top10-deficiencies.json",
  "article-28-nursing-home-90day-timeline.json",
  "article-29-nursing-home-nursing-records.json",
  "article-30-nursing-home-isp-writing.json",
  "article-31-nursing-home-team-collaboration.json",
  "article-32-nursing-home-infection-control-guide.json",
  "article-33-nursing-home-fall-prevention-records.json",
  "article-34-nursing-home-dementia-care-eval.json",
  "article-35-nursing-home-risk-management-plan.json",
  "article-36-nursing-home-self-eval-tips.json",
  "article-37-nursing-home-fire-safety-emergency.json",
  "article-38-nursing-home-business-plan-example.json",
  "article-39-nursing-home-quality-reward-vs-eval.json",
  "article-40-nursing-home-resident-rights-guide.json",
  "article-41-nursing-home-ltc30-eval-impact.json",
  "article-42-nursing-home-pdca-improvement.json",
  "article-43-nursing-home-new-director-30day.json",
  "article-44-nursing-home-eval-interview.json",
  "article-45-nursing-home-staffing-calculation.json",
  "article-46-nursing-home-nutrition-care.json",
  "article-47-nursing-home-digital-transform.json",
  "article-48-nursing-home-grade-strategy.json",
  "article-49-nursing-home-continuous-improvement.json",
  // 居家護理所系列（第一波 3 篇）
  "article-50-home-nursing-eval-prep-guide.json",
  "article-51-home-nursing-eval-common-mistakes.json",
  "article-52-home-nursing-self-eval-excel-guide.json",
  // 居家護理所系列（第二波 3 篇）
  "article-53-home-nursing-eval-report-writing.json",
  "article-54-home-nursing-quality-indicators.json",
  "article-55-home-nursing-paperwork-burden.json",
  // 居家護理所系列（第三波 3 篇）
  "article-56-home-nursing-infection-control.json",
  "article-57-home-nursing-care-plan-writing.json",
  "article-58-home-nursing-small-team-survival.json",
  // 居家護理所系列（第四波 4 篇）
  "article-59-home-nursing-top-rated-traits.json",
  "article-60-home-nursing-90day-countdown.json",
  "article-61-home-nursing-visit-safety.json",
  "article-62-home-nursing-emergency-handling.json",
  // 居家護理所系列（第五波 7 篇）
  "article-63-home-nursing-digital-transform.json",
  "article-64-home-nursing-community-resources.json",
  "article-65-home-nursing-pdca-writing.json",
  "article-66-home-nursing-bonus-items.json",
  "article-67-home-nursing-eval-comparison.json",
  "article-68-home-nursing-cross-discipline.json",
  "article-69-home-nursing-ai-efficiency.json",
  // 產後護理之家系列（第一波）
  "article-70-postpartum-eval-prep-guide.json",
  "article-71-postpartum-eval-common-mistakes.json",
  "article-72-postpartum-nursing-records-burden.json",
  "article-73-postpartum-quality-indicators.json",
  "article-74-postpartum-infection-control.json",
  // 產後護理之家系列（第二波）
  "article-75-postpartum-breastfeeding-plan.json",
  "article-76-postpartum-accident-sop.json",
  // 產後護理之家系列（第三波）
  "article-77-postpartum-staffing-calculation.json",
  "article-78-postpartum-depression-epds.json",
  // 產後護理之家系列（第四波）
  "article-79-postpartum-discharge-assessment.json",
  "article-80-postpartum-fire-evacuation.json",
  "article-81-postpartum-jaundice-weight.json",
  "article-82-postpartum-group-education.json",
  "article-83-postpartum-emergency-sop.json",
  "article-84-postpartum-hand-hygiene.json",
  "article-85-postpartum-self-evaluation.json",
  "article-86-postpartum-small-center.json",
  "article-87-postpartum-rooming-in.json",
  "article-88-postpartum-d1-bonus.json",
  "article-89-postpartum-pdca.json",
  // 一般護理之家系列（第一波 5 篇）
  "article-90-general-nursing-home-eval-15-guide.json",
  "article-91-general-nursing-home-eval-common-mistakes.json",
  "article-92-general-nursing-home-eval-90day-plan.json",
  "article-93-general-nursing-home-care-plan-writing.json",
  "article-94-general-nursing-home-self-eval-guide.json",
  // 一般護理之家系列（第二波 5 篇）
  "article-95-general-nursing-home-fire-drill-guide.json",
  "article-96-general-nursing-home-infection-control-guide.json",
  "article-97-general-nursing-home-paperwork-reduction.json",
  "article-98-general-nursing-home-quality-indicators.json",
  "article-99-general-nursing-home-interdisciplinary-meeting.json",
  // 一般護理之家系列（第三波 10 篇）
  "article-100-general-nursing-home-palliative-care.json",
  "article-101-general-nursing-home-oral-care.json",
  "article-102-general-nursing-home-staffing-cpr.json",
  "article-103-general-nursing-home-accident-handling.json",
  "article-104-general-nursing-home-manager-a11.json",
  "article-105-general-nursing-home-grade-strategy.json",
  "article-106-general-nursing-home-d1-innovation.json",
  "article-107-general-nursing-home-evacuation-system.json",
  "article-108-general-nursing-home-new-director-guide.json",
  "article-109-general-nursing-home-eval-vs-quality.json",
  // 托嬰中心系列（20 篇）
  "article-110-infant-daycare-60-guide.json",
  "article-111-infant-daycare-top10-deficiencies.json",
  "article-112-infant-daycare-self-evaluation.json",
  "article-113-infant-daycare-evidence.json",
  "article-114-infant-daycare-prep-timeline.json",
  "article-115-infant-daycare-baby-diary-ai.json",
  "article-116-infant-daycare-plain-language.json",
  "article-117-infant-daycare-small-center.json",
  "article-118-infant-daycare-environment-safety.json",
  "article-119-infant-daycare-pdca.json",
  "article-120-infant-daycare-health-safety.json",
  "article-121-infant-daycare-curriculum.json",
  "article-122-infant-daycare-care-plan.json",
  "article-123-infant-daycare-parent-communication.json",
  "article-124-infant-daycare-administration.json",
  "article-125-infant-daycare-faq.json",
  "article-126-infant-daycare-evaluator-perspective.json",
  "article-127-infant-daycare-role-division.json",
  "article-128-infant-daycare-trends.json",
  "article-129-infant-daycare-post-evaluation.json",
  // 兒少安置機構系列（20 篇）
  "article-130-youth-care-evaluation-35-items-guide.json",
  "article-131-youth-care-evaluation-faq.json",
  "article-132-youth-care-treatment-plan-writing.json",
  "article-133-youth-care-case-record-tips.json",
  "article-134-youth-care-professional-service-guide.json",
  "article-135-youth-care-under2-over2-dual-version.json",
  "article-136-youth-care-finance-20-points-guide.json",
  "article-137-youth-care-new-staff-onboarding.json",
  "article-138-youth-care-self-checklist-guide.json",
  "article-139-youth-care-trauma-informed-evaluation.json",
  "article-140-youth-care-discharge-tracking-guide.json",
  "article-141-youth-care-common-deficiencies.json",
  "article-142-youth-care-team-collaboration.json",
  "article-143-youth-care-grievance-mechanism.json",
  "article-144-youth-care-supervision-record.json",
  "article-145-youth-care-environment-safety-checklist.json",
  "article-146-youth-care-resource-network-guide.json",
  "article-147-youth-care-administration-management.json",
  "article-148-youth-care-innovation-bonus-points.json",
  "article-149-youth-care-evaluator-perspective.json",
  // 精神護理之家系列（20 篇）
  "article-150-psychiatric-nursing-home-evaluation-guide.json",
  "article-151-psychiatric-nursing-home-top10-deficiencies.json",
  "article-152-psychiatric-nursing-home-staffing.json",
  "article-153-psychiatric-nursing-home-restraint.json",
  "article-154-psychiatric-nursing-home-quality-indicators.json",
  "article-155-psychiatric-nursing-home-self-eval-checklist.json",
  "article-156-psychiatric-nursing-home-infection-control.json",
  "article-157-psychiatric-nursing-home-rehab-activities.json",
  "article-158-psychiatric-nursing-home-emergency-awol.json",
  "article-159-psychiatric-nursing-home-fire-safety.json",
  "article-160-psychiatric-nursing-home-care-plan.json",
  "article-161-psychiatric-nursing-home-medication.json",
  "article-162-psychiatric-nursing-home-training.json",
  "article-163-psychiatric-nursing-home-interdisciplinary.json",
  "article-164-psychiatric-nursing-home-mental-health-act.json",
  "article-165-psychiatric-nursing-home-nutrition.json",
  "article-166-psychiatric-nursing-home-community.json",
  "article-167-psychiatric-nursing-home-resident-rights.json",
  "article-168-psychiatric-nursing-home-business-plan.json",
  "article-169-psychiatric-nursing-home-innovation.json",
  // 精神復健機構系列（20 篇）
  "article-170-psych-rehab-evaluation-guide.json",
  "article-171-psych-rehab-top10-deficiencies.json",
  "article-172-psych-rehab-day-vs-residential.json",
  "article-173-psych-rehab-self-eval-checklist.json",
  "article-174-psych-rehab-90day-timeline.json",
  "article-175-psych-rehab-personal-recovery-chime.json",
  "article-176-psych-rehab-rehab-plan-writing.json",
  "article-177-psych-rehab-community-rehab.json",
  "article-178-psych-rehab-medication-self-mgmt.json",
  "article-179-psych-rehab-work-rehab.json",
  "article-180-psych-rehab-freedom-of-movement.json",
  "article-181-psych-rehab-rights-protection.json",
  "article-182-psych-rehab-pfm-interview-prep.json",
  "article-183-psych-rehab-emergency-infection.json",
  "article-184-psych-rehab-record-management.json",
  "article-185-psych-rehab-new-staff-guide.json",
  "article-186-psych-rehab-community-integration.json",
  "article-187-psych-rehab-peer-support.json",
  "article-188-psych-rehab-quality-meeting.json",
  "article-189-psych-rehab-innovation-bonus.json",
  // 身心障礙福利機構系列（20 篇）
  "article-190-disability-welfare-evaluation-guide.json",
  "article-191-disability-welfare-top10-deficiencies.json",
  "article-192-disability-welfare-isp-writing-guide.json",
  "article-193-disability-welfare-self-evaluation-report.json",
  "article-194-disability-welfare-evidence-preparation.json",
  "article-195-disability-welfare-prep-timeline.json",
  "article-196-disability-welfare-fire-safety-3105.json",
  "article-197-disability-welfare-isp-multi-need-assessment.json",
  "article-198-disability-welfare-staffing-ratios-1106.json",
  "article-199-disability-welfare-paperwork-efficiency.json",
  "article-200-disability-welfare-professional-team-4201.json",
  "article-201-disability-welfare-positive-behavior-support.json",
  "article-202-disability-welfare-soap-case-records.json",
  "article-203-disability-welfare-health-dietary-management.json",
  "article-204-disability-welfare-infection-control.json",
  "article-205-disability-welfare-caregiver-staff-crisis.json",
  "article-206-disability-welfare-environment-accessibility.json",
  "article-207-disability-welfare-community-resources-family.json",
  "article-208-disability-welfare-new-staff-guide.json",
  "article-209-disability-welfare-quality-improvement.json",
];

const INITIAL_STATUS = "draft" as const; // 初始為草稿，確認後再於 /blog-admin 發布

async function main() {
  const client = postgres(getDbUrl(), { prepare: false });
  const db = drizzle(client);
  try {
    console.log(`📝 開始匯入部落格文章（共 ${POST_FILES.length} 篇）...\n`);

    // 平行讀檔 + 寫入，大幅縮短執行時間
    await Promise.all(
      POST_FILES.map(async (filename) => {
        const filePath = join(process.cwd(), "scripts/blog-posts", filename);
        try {
          const raw = readFileSync(filePath, "utf-8");
          const data = JSON.parse(raw);
          const [inserted] = await db
            .insert(blogPosts)
            .values({
              slug: data.slug,
              title: data.title,
              excerpt: data.excerpt ?? null,
              content: data.content ?? null,
              coverImageUrl: data.coverImageUrl ?? null,
              category: data.category ?? null,
              tags: data.tags ?? null,
              status: INITIAL_STATUS,
              seoTitle: data.seoTitle ?? null,
              seoDescription: data.seoDescription ?? null,
            })
            .onConflictDoNothing() // 若 slug 已存在則略過
            .returning({ id: blogPosts.id, slug: blogPosts.slug });

          if (inserted) {
            console.log(`✅ 已新增：${data.title}`);
            console.log(`   slug: ${data.slug}`);
            console.log(`   id: ${inserted.id}\n`);
          } else {
            console.log(`⏭️  已略過（slug 已存在）：${data.slug}\n`);
          }
        } catch (err) {
          console.error(`❌ 匯入失敗：${filename}`, err);
        }
      })
    );

    console.log("✨ 完成！請前往 /blog-admin 確認並將文章狀態改為 published。");
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error("執行失敗：", err);
  process.exit(1);
});
