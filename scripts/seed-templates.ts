/**
 * Seed template data from evaluation profiles into the database.
 * Tags are grouped by RESPONSIBLE PERSON (item.responsible), not by evaluation section.
 * Templates are stored as FortuneSheet Excel JSON (fileType='excel').
 *
 * Run with: npx dotenv-cli -e .env.local -- tsx scripts/seed-templates.ts
 */

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { templateTags, reportTemplates, templateTagReports } from '../db/schema';
import { eq } from 'drizzle-orm';
import { getDbUrl } from '../db/index';
import { buildItemMultiSheetData, serializeSheetData } from '../lib/excel-template-builder';
import { getSupplementaryDefs } from '../lib/supplementary-sheets/index';

// Import all profiles directly (no path alias needed)
import { daycareProfile } from '../lib/ai/evaluation-profiles/daycare';
import { homeCareProfile } from '../lib/ai/evaluation-profiles/home-care';
import { nursingHomeProfile } from '../lib/ai/evaluation-profiles/nursing-home';
import { hospitalProfile } from '../lib/ai/evaluation-profiles/hospital';
import { disabilityWelfareProfile } from '../lib/ai/evaluation-profiles/disability-welfare';
import { babycareProfile } from '../lib/ai/evaluation-profiles/babycare';
import { homeNursingProfile } from '../lib/ai/evaluation-profiles/home-nursing';
import { generalNursingHomeProfile } from '../lib/ai/evaluation-profiles/general-nursing-home';
import { youthCareProfile } from '../lib/ai/evaluation-profiles/youth-care';
import { elderlyWelfareProfile } from '../lib/ai/evaluation-profiles/elderly-welfare';
import { psychiatricNursingHomeProfile } from '../lib/ai/evaluation-profiles/psychiatric-nursing-home';
import { infantDaycareProfile } from '../lib/ai/evaluation-profiles/infant-daycare';
import {
  psychiatricRehabilitationDayProfile,
  psychiatricRehabilitationResidentialProfile,
} from '../lib/ai/evaluation-profiles/psychiatric-rehabilitation-institution';

const profiles = [
  daycareProfile,
  homeCareProfile,
  nursingHomeProfile,
  hospitalProfile,
  disabilityWelfareProfile,
  babycareProfile,
  homeNursingProfile,
  generalNursingHomeProfile,
  youthCareProfile,
  elderlyWelfareProfile,
  psychiatricNursingHomeProfile,
  infantDaycareProfile,
  psychiatricRehabilitationDayProfile,
  psychiatricRehabilitationResidentialProfile,
];

type ProfileItem = {
  id: number;
  title: string;
  responsible: string;
  criteria: string[];
  reviewMethod: string;
};

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not set. Run with: npx dotenv-cli -e .env.local -- tsx scripts/seed-templates.ts');
    process.exit(1);
  }

  const client = postgres(getDbUrl(), { prepare: false });
  const db = drizzle(client);

  console.log('🌱 Seeding template data (grouped by responsible person)...\n');

  let totalTags = 0;
  let totalReports = 0;

  for (const profile of profiles) {
    if (profile.sections.length === 0) {
      console.log(`  ⏭  ${profile.label} — no sections, skipping`);
      continue;
    }

    console.log(`📋 ${profile.label} (${profile.id})`);

    // Clear existing data — FK onDelete:cascade on templateTagReports handles join rows automatically
    await db.delete(reportTemplates).where(eq(reportTemplates.facilityType, profile.id));
    await db.delete(templateTags).where(eq(templateTags.facilityType, profile.id));

    // Clean up legacy ID if this profile was renamed (e.g. 'disability' → 'disability-welfare')
    if (profile.id === 'disability-welfare') {
      await db.delete(reportTemplates).where(eq(reportTemplates.facilityType, 'disability'));
      await db.delete(templateTags).where(eq(templateTags.facilityType, 'disability'));
    }

    // Collect all items across all sections, preserving order
    const allItems: ProfileItem[] = [];
    for (const section of profile.sections) {
      for (const item of section.items) {
        allItems.push({
          id: item.id,
          title: item.title,
          responsible: item.responsible,
          criteria: item.criteria,
          reviewMethod: item.reviewMethod,
        });
      }
    }

    // Group items by responsible person (preserving insertion order for first occurrence)
    const responsibleGroups = new Map<string, ProfileItem[]>();
    for (const item of allItems) {
      const key = item.responsible;
      if (!responsibleGroups.has(key)) {
        responsibleGroups.set(key, []);
      }
      responsibleGroups.get(key)!.push(item);
    }

    console.log(`  → ${responsibleGroups.size} 個負責人員群組，${allItems.length} 個項目`);

    // Insert one template_tag per responsible group, then one report_template per item
    let tagOrder = 0;
    for (const [responsible, items] of responsibleGroups) {
      const [newTag] = await db
        .insert(templateTags)
        .values({
          facilityType: profile.id,
          name: responsible,
          sortOrder: tagOrder++,
        })
        .returning();

      console.log(`  📁 ${responsible} (${items.length} 項)`);

      let reportOrder = 0;
      for (const item of items) {
        // Build FortuneSheet-compatible Excel content (checklist + supplementary sheets)
        const supplementaryDefs = getSupplementaryDefs(profile.id, item.id);
        const sheets = buildItemMultiSheetData(item, supplementaryDefs);
        const content = serializeSheetData(sheets);

        const [newReport] = await db
          .insert(reportTemplates)
          .values({
            facilityType: profile.id,
            title: item.title,
            content,
            fileType: 'excel',
            responsible: item.responsible,
            sortOrder: reportOrder++,
          })
          .returning();

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
