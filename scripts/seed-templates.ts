/**
 * Seed template data from evaluation profiles into the database.
 * Tags are grouped by RESPONSIBLE PERSON (item.responsible), not by evaluation section.
 * Templates are stored as FortuneSheet Excel JSON (fileType='excel').
 *
 * Run with:
 *   npx dotenv-cli -e .env.local -- tsx scripts/seed-templates.ts              # 全部機構
 *   npx dotenv-cli -e .env.local -- tsx scripts/seed-templates.ts --facility daycare  # 單一機構
 */

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { templateTags, reportTemplates, templateTagReports } from '../db/schema';
import { eq } from 'drizzle-orm';
import { getDbUrl } from '../db/index';
import { buildItemMultiSheetData, serializeSheetData } from '../lib/excel-template-builder';
import { getSupplementaryDefs } from '../lib/supplementary-sheets/index';
import { getEvaluationTip } from '../lib/evaluation-tips/index';

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
  attachments?: string[];
};

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not set. Run with: npx dotenv-cli -e .env.local -- tsx scripts/seed-templates.ts');
    process.exit(1);
  }

  // 解析 --facility 參數，支援只更新單一機構
  const facilityFlag = process.argv.indexOf('--facility');
  // 若 --facility 是最後一個參數且後面沒有值，facilityFilter 會是 undefined，需明確攔截
  if (facilityFlag !== -1 && facilityFlag + 1 >= process.argv.length) {
    console.error('❌ --facility 需要提供機構類型值，例如：--facility daycare');
    process.exit(1);
  }
  const facilityFilter = facilityFlag !== -1 ? process.argv[facilityFlag + 1] : null;

  if (facilityFilter && !profiles.some((p) => p.id === facilityFilter)) {
    console.error(`❌ 找不到機構類型 "${facilityFilter}"。可用的值：`);
    console.error(`   ${profiles.map((p) => p.id).join(', ')}`);
    process.exit(1);
  }

  const targetProfiles = facilityFilter
    ? profiles.filter((p) => p.id === facilityFilter)
    : profiles;

  const client = postgres(getDbUrl(), { prepare: false });
  const db = drizzle(client);

  const scope = facilityFilter ? `單一機構: ${facilityFilter}` : '全部機構';
  console.log(`🌱 Seeding template data (${scope})...\n`);

  let totalTags = 0;
  let totalReports = 0;

  for (const profile of targetProfiles) {
    if (profile.sections.length === 0) {
      console.log(`  ⏭  ${profile.label} — no sections, skipping`);
      continue;
    }

    console.log(`📋 ${profile.label} (${profile.id})`);

    // Collect all items across all sections, preserving order（在 transaction 外計算，不涉及 DB）
    const allItems: ProfileItem[] = [];
    for (const section of profile.sections) {
      for (const item of section.items) {
        allItems.push({
          id: item.id,
          title: item.title,
          responsible: item.responsible,
          criteria: item.criteria,
          reviewMethod: item.reviewMethod,
          attachments: item.attachments,
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

    // 用 transaction 包住 delete + insert，確保中途失敗可自動 rollback
    const { tagCount, reportCount } = await db.transaction(async (tx) => {
      // Clear existing data — FK onDelete:cascade on templateTagReports handles join rows automatically
      await tx.delete(reportTemplates).where(eq(reportTemplates.facilityType, profile.id));
      await tx.delete(templateTags).where(eq(templateTags.facilityType, profile.id));

      // Clean up legacy ID if this profile was renamed (e.g. 'disability' → 'disability-welfare')
      if (profile.id === 'disability-welfare') {
        await tx.delete(reportTemplates).where(eq(reportTemplates.facilityType, 'disability'));
        await tx.delete(templateTags).where(eq(templateTags.facilityType, 'disability'));
      }

      // Insert one template_tag per responsible group, then one report_template per item
      let tagOrder = 0;
      let txTags = 0;
      let txReports = 0;
      for (const [responsible, items] of responsibleGroups) {
        const [newTag] = await tx
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
          // 注入準備要訣（從 school 頁面提取的共用資料）
          const tip = getEvaluationTip(profile.id, item.id);
          const itemWithTip = tip ? { ...item, tip: tip.content } : item;
          const sheets = buildItemMultiSheetData(itemWithTip, supplementaryDefs);
          const content = serializeSheetData(sheets);

          const [newReport] = await tx
            .insert(reportTemplates)
            .values({
              facilityType: profile.id,
              title: `${item.id} ${item.title}`,
              content,
              fileType: 'excel',
              responsible: item.responsible,
              sortOrder: reportOrder++,
            })
            .returning();

          await tx
            .insert(templateTagReports)
            .values({
              templateTagId: newTag.id,
              reportTemplateId: newReport.id,
              sortOrder: reportOrder - 1,
            })
            .onConflictDoNothing();

          txReports++;
        }
        txTags++;
      }
      return { tagCount: txTags, reportCount: txReports };
    });

    totalTags += tagCount;
    totalReports += reportCount;

    console.log();
  }

  console.log(`✅ Done! Seeded ${totalTags} template tags and ${totalReports} report templates.`);
  await client.end();
}

main().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
