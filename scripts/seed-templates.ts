/**
 * Seed template data from evaluation profiles into the database.
 * Tags are grouped by RESPONSIBLE PERSON (item.responsible), not by evaluation section.
 * Templates are stored as FortuneSheet Excel JSON (fileType='excel').
 *
 * Run with:
 *   npx dotenv-cli -e .env.local -- tsx scripts/seed-templates.ts                     # 全部機構（安全模式，不覆蓋手動編輯）
 *   npx dotenv-cli -e .env.local -- tsx scripts/seed-templates.ts --facility daycare   # 單一機構（安全模式）
 *   npx dotenv-cli -e .env.local -- tsx scripts/seed-templates.ts --force              # 強制覆蓋全部（危險！）
 *   npx dotenv-cli -e .env.local -- tsx scripts/seed-templates.ts --facility daycare --force  # 強制覆蓋單一機構
 *
 * 預設行為（不帶 --force）：
 *   - 新範本（DB 中不存在）→ INSERT
 *   - 未修改的範本（內容與自動產生相同）→ 更新 sortOrder/responsible 等 metadata
 *   - 已手動編輯的範本（內容與自動產生不同）→ SKIP（印出警告）
 */

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { templateTags, reportTemplates, templateTagReports, templateRevisions, templateLinks } from '../db/schema';
import { eq, desc, inArray, asc } from 'drizzle-orm';
import { getDbUrl } from '../db/index';
import { buildItemMultiSheetData, serializeSheetData } from '../lib/excel-template-builder';
import { getSupplementaryDefs } from '../lib/supplementary-sheets/index';
import { getCustomSheets } from '../lib/supplementary-sheets/custom-sheet-builders';
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

// 模組層級常數，方便調整
const MAX_REVISIONS = 5;
const SEED_SCRIPT_USER_ID = 'seed-script';

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

  // --force 旗標：明確允許破壞性覆蓋，預設為安全的 upsert 模式
  const forceFlag = process.argv.includes('--force');

  const targetProfiles = facilityFilter
    ? profiles.filter((p) => p.id === facilityFilter)
    : profiles;

  const client = postgres(getDbUrl(), { prepare: false });
  const db = drizzle(client);

  try {
  const scope = facilityFilter ? `單一機構: ${facilityFilter}` : '全部機構';
  const mode = forceFlag ? '⚠️  強制覆蓋模式（--force）' : '安全模式（手動編輯內容將被保留）';
  console.log(`🌱 Seeding template data (${scope}) — ${mode}\n`);

  let totalTags = 0;
  let totalReports = 0;
  let totalSkipped = 0;
  let totalOverwritten = 0;

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

    // 用 transaction 包住所有操作，確保中途失敗可自動 rollback
    const { tagCount, insertCount, overwrittenCount, skippedCount } = await db.transaction(async (tx) => {
      // Legacy cleanup：只在 --force 模式下清除舊 ID（避免在安全模式下執行破壞性刪除）
      if (forceFlag && profile.id === 'disability-welfare') {
        await tx.delete(reportTemplates).where(eq(reportTemplates.facilityType, 'disability'));
        await tx.delete(templateTags).where(eq(templateTags.facilityType, 'disability'));
      }

      let tagOrder = 0;
      let txTags = 0;
      let txInserted = 0;
      let txMeta = 0;
      let txOverwritten = 0;
      let txSkipped = 0;

      // 兩種模式都使用 upsert，差別僅在遇到手動編輯的範本時：
      //   安全模式（預設）→ SKIP
      //   強制模式（--force）→ 先備份到 template_revisions，再覆蓋

      // 批次查詢現有資料，避免 N+1 查詢
      const existingTemplates = await tx
        .select()
        .from(reportTemplates)
        .where(eq(reportTemplates.facilityType, profile.id));
      const existingTags = await tx
        .select()
        .from(templateTags)
        .where(eq(templateTags.facilityType, profile.id));

      // 建立 lookup map：title → template row、name → tag row
      const templateMap = new Map(existingTemplates.map((t) => [t.title, t]));
      const tagMap = new Map(existingTags.map((t) => [t.name, t]));

      // 輔助函式：確保 join row 存在（共用於所有分支）
      const upsertJoinRow = (tagId: string, reportId: string, order: number) =>
        tx.insert(templateTagReports).values({ templateTagId: tagId, reportTemplateId: reportId, sortOrder: order }).onConflictDoNothing();

      // 輔助函式：將覆蓋前的內容備份到 template_revisions（保留最多 MAX_REVISIONS 筆）
      async function snapshotBeforeOverwrite(
        templateId: string,
        oldTitle: string,
        oldContent: string | null,
        oldFileType: string | null,
        oldResponsible: string | null,
      ) {
        // 查詢現有連結快照
        const existingLinks = await tx
          .select({ name: templateLinks.name, url: templateLinks.url, sortOrder: templateLinks.sortOrder })
          .from(templateLinks)
          .where(eq(templateLinks.templateId, templateId))
          .orderBy(asc(templateLinks.sortOrder));

        // 查詢所屬標籤名稱快照
        const existingTagRows = await tx
          .select({ name: templateTags.name })
          .from(templateTagReports)
          .innerJoin(templateTags, eq(templateTagReports.templateTagId, templateTags.id))
          .where(eq(templateTagReports.reportTemplateId, templateId));

        const latest = await tx
          .select({ versionNumber: templateRevisions.versionNumber })
          .from(templateRevisions)
          .where(eq(templateRevisions.templateId, templateId))
          .orderBy(desc(templateRevisions.versionNumber))
          .limit(1);
        const nextVersion = (latest[0]?.versionNumber ?? 0) + 1;

        await tx.insert(templateRevisions).values({
          templateId,
          userId: SEED_SCRIPT_USER_ID,
          title: oldTitle,
          content: oldContent,
          fileType: oldFileType ?? 'excel',
          responsible: oldResponsible,
          links: JSON.stringify(existingLinks),
          tags: JSON.stringify(existingTagRows.map((r) => r.name)),
          versionNumber: nextVersion,
        });

        // 超過上限時刪除最舊的
        const allRevisions = await tx
          .select({ id: templateRevisions.id })
          .from(templateRevisions)
          .where(eq(templateRevisions.templateId, templateId))
          .orderBy(desc(templateRevisions.versionNumber));
        if (allRevisions.length > MAX_REVISIONS) {
          const idsToDelete = allRevisions.slice(MAX_REVISIONS).map((r) => r.id);
          await tx.delete(templateRevisions).where(inArray(templateRevisions.id, idsToDelete));
        }
      }

      for (const [responsible, items] of responsibleGroups) {
        // Upsert tag：存在則更新 sortOrder，不存在則新增
        let tag = tagMap.get(responsible);
        if (tag) {
          await tx
            .update(templateTags)
            .set({ sortOrder: tagOrder })
            .where(eq(templateTags.id, tag.id));
        } else {
          const [newTag] = await tx
            .insert(templateTags)
            .values({ facilityType: profile.id, name: responsible, sortOrder: tagOrder })
            .returning();
          tag = newTag;
        }
        tagOrder++;
        txTags++;

        console.log(`  📁 ${responsible} (${items.length} 項)`);

        let reportOrder = 0;
        for (const item of items) {
          const title = `${item.id} ${item.title}`;
          // 產生自動內容，用於與 DB 現有內容比對
          const supplementaryDefs = getSupplementaryDefs(profile.id, item.id);
          const customSheets = getCustomSheets(profile.id, item.id);
          const tip = getEvaluationTip(profile.id, item.id);
          const itemWithTip = tip ? { ...item, tip: tip.content } : item;
          const sheets = [
            ...buildItemMultiSheetData(itemWithTip, supplementaryDefs),
            ...customSheets,
          ];
          const generatedContent = serializeSheetData(sheets);

          const existing = templateMap.get(title);

          if (!existing) {
            // 新範本（DB 中不存在）→ INSERT
            const [newReport] = await tx
              .insert(reportTemplates)
              .values({
                facilityType: profile.id,
                title,
                content: generatedContent,
                fileType: 'excel',
                responsible: item.responsible,
                sortOrder: reportOrder,
              })
              .returning();

            await upsertJoinRow(tag.id, newReport.id, reportOrder);
            console.log(`    ✅ 新增: ${title}`);
            txInserted++;
          } else if (existing.content === generatedContent) {
            // 內容未變動 → 僅更新 metadata（sortOrder、responsible）
            await tx
              .update(reportTemplates)
              .set({ sortOrder: reportOrder, responsible: item.responsible })
              .where(eq(reportTemplates.id, existing.id));

            await upsertJoinRow(tag.id, existing.id, reportOrder);
            txMeta++;
          } else if (forceFlag) {
            // 內容已被手動編輯 + --force → 備份舊內容後覆蓋
            await snapshotBeforeOverwrite(existing.id, existing.title, existing.content, existing.fileType, existing.responsible ?? null);
            console.log(`    📸 備份: ${title}（舊版本已存入歷史紀錄）`);

            await tx
              .update(reportTemplates)
              .set({ content: generatedContent, sortOrder: reportOrder, responsible: item.responsible, updatedAt: new Date() })
              .where(eq(reportTemplates.id, existing.id));

            await upsertJoinRow(tag.id, existing.id, reportOrder);
            txOverwritten++;
          } else {
            // 內容已被手動編輯 → SKIP，保留原始內容
            console.log(`    ⚠️  跳過: ${title}（已手動編輯，使用 --force 可強制覆蓋）`);
            await upsertJoinRow(tag.id, existing.id, reportOrder);
            txSkipped++;
          }
          reportOrder++;
        }
      }

      return { tagCount: txTags, insertCount: txInserted, metaCount: txMeta, overwrittenCount: txOverwritten, skippedCount: txSkipped };
    });

    totalTags += tagCount;
    totalReports += insertCount;
    totalSkipped += skippedCount;
    totalOverwritten += overwrittenCount;

    console.log();
  }

  const parts: string[] = [`${totalReports} 個新增`, `${totalTags} 個標籤`];
  if (totalOverwritten > 0) parts.push(`${totalOverwritten} 個覆蓋（已備份）`);
  if (totalSkipped > 0) parts.push(`${totalSkipped} 個跳過（手動編輯，使用 --force 可覆蓋）`);
  console.log(`✅ Done! ${parts.join('，')}`);
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
