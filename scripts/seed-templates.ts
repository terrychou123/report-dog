/**
 * Seed template data from evaluation profiles into the database.
 * Run with: npx dotenv-cli -e .env.local -- tsx scripts/seed-templates.ts
 */

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { templateTags, reportTemplates, templateTagReports } from '../db/schema';
import { eq } from 'drizzle-orm';
import { getDbUrl } from '../db/index';

// Import all profiles directly (no path alias needed)
import { daycareProfile } from '../lib/ai/evaluation-profiles/daycare';
import { homeCareProfile } from '../lib/ai/evaluation-profiles/home-care';
import { nursingHomeProfile } from '../lib/ai/evaluation-profiles/nursing-home';
import { hospitalProfile } from '../lib/ai/evaluation-profiles/hospital';
import { disabilityProfile } from '../lib/ai/evaluation-profiles/disability';
import { babycareProfile } from '../lib/ai/evaluation-profiles/babycare';
import { homeNursingProfile } from '../lib/ai/evaluation-profiles/home-nursing';
import { generalNursingHomeProfile } from '../lib/ai/evaluation-profiles/general-nursing-home';

const profiles = [
  daycareProfile,
  homeCareProfile,
  nursingHomeProfile,
  hospitalProfile,
  disabilityProfile,
  babycareProfile,
  homeNursingProfile,
  generalNursingHomeProfile,
];

function buildReportContent(item: {
  title: string;
  responsible: string;
  criteria: string[];
  reviewMethod: string;
}): string {
  const checklist = item.criteria.map((c) => `- ☐ ${c}`).join('\n');
  return [
    `# ${item.title}`,
    ``,
    `**負責人員：** ${item.responsible}`,
    ``,
    `## 評鑑基準`,
    ``,
    checklist,
    ``,
    `## 審查方式`,
    ``,
    item.reviewMethod,
    ``,
    `## 準備內容`,
    ``,
    `【請在此填寫您的準備內容】`,
  ].join('\n');
}

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not set. Run with: npx dotenv-cli -e .env.local -- tsx scripts/seed-templates.ts');
    process.exit(1);
  }

  const client = postgres(getDbUrl(), { prepare: false });
  const db = drizzle(client);

  console.log('🌱 Seeding template data...\n');

  let totalTags = 0;
  let totalReports = 0;

  for (const profile of profiles) {
    if (profile.sections.length === 0) {
      console.log(`  ⏭  ${profile.label} — no sections, skipping`);
      continue;
    }

    console.log(`📋 ${profile.label} (${profile.id})`);

    // Clear existing data for this facility type
    await db.delete(templateTags).where(eq(templateTags.facilityType, profile.id));
    await db.delete(reportTemplates).where(eq(reportTemplates.facilityType, profile.id));

    let tagOrder = 0;
    for (const section of profile.sections) {
      // Insert template tag (one per section)
      const [newTag] = await db
        .insert(templateTags)
        .values({
          facilityType: profile.id,
          name: section.name,
          sortOrder: tagOrder++,
        })
        .returning();

      console.log(`  📁 ${section.name} (${section.items.length} 項)`);

      let reportOrder = 0;
      for (const item of section.items) {
        // Insert report template (one per item)
        const [newReport] = await db
          .insert(reportTemplates)
          .values({
            facilityType: profile.id,
            title: item.title,
            content: buildReportContent(item),
            fileType: 'docx',
            sortOrder: reportOrder++,
          })
          .returning();

        // Link tag to report
        await db
          .insert(templateTagReports)
          .values({
            templateTagId: newTag.id,
            reportTemplateId: newReport.id,
            sortOrder: reportOrder - 1,
          })
          .onConflictDoNothing();

        totalReports++;
      }
      totalTags++;
    }
    console.log();
  }

  console.log(`✅ Done! Seeded ${totalTags} template tags and ${totalReports} report templates.`);
  await client.end();
}

main().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
