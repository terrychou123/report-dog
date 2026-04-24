/**
 * 外科手術式修補：只替換居家服務範本第一個分頁「檢核表」的準備要訣錯位內容。
 *
 * 背景：舊 lib/evaluation-tips/home-care.ts 與 homeCareProfile 的 id 錯位，導致
 * DB 中 report_templates.content（Excel JSON）的第一個 sheet 帶錯 tip。
 * 本腳本僅重建 sheets[0]（檢核表），其他補充分頁 sheets[1..] 完全不動。
 *
 * 用法：
 *   # 預覽（安全，不寫 DB）
 *   npx dotenv-cli -e .env.local -- tsx scripts/fix-home-care-checklist-tips.ts
 *
 *   # 實際執行（會 snapshot 舊內容到 template_revisions 後覆蓋）
 *   npx dotenv-cli -e .env.local -- tsx scripts/fix-home-care-checklist-tips.ts --apply
 */

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { asc, desc, eq, inArray } from 'drizzle-orm';
import {
  reportTemplates,
  templateTags,
  templateTagReports,
  templateRevisions,
  templateLinks,
} from '../db/schema';
import { getDbUrl } from '../db/index';
import { buildItemSheetData, type SheetData } from '../lib/excel-template-builder';
import { getEvaluationTip } from '../lib/evaluation-tips/index';
import { homeCareProfile } from '../lib/ai/evaluation-profiles/home-care';

const MAX_REVISIONS = 5;
const FIX_USER_ID = 'seed-script';
const FACILITY_ID = 'home-care';

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
    console.error('❌ DATABASE_URL 未設定，請用 npx dotenv-cli -e .env.local 執行');
    process.exit(1);
  }

  const apply = process.argv.includes('--apply');
  const mode = apply ? '⚠️  實際寫入模式（--apply）' : '🔍 預覽模式（不寫 DB，加上 --apply 才會執行）';
  console.log(`🩹 居家服務檢核表準備要訣修補 — ${mode}\n`);

  // 建立 profile item lookup：title key 對齊 seed-templates.ts 的 `${id} ${title}` 格式
  const itemsById = new Map<number, ProfileItem>();
  const itemsByTitleKey = new Map<string, ProfileItem>();
  for (const section of homeCareProfile.sections) {
    for (const item of section.items) {
      const pi: ProfileItem = {
        id: item.id,
        title: item.title,
        responsible: item.responsible,
        criteria: item.criteria,
        reviewMethod: item.reviewMethod,
        attachments: (item as { attachments?: string[] }).attachments,
      };
      itemsById.set(pi.id, pi);
      itemsByTitleKey.set(`${pi.id} ${pi.title}`, pi);
    }
  }

  const client = postgres(getDbUrl(), { prepare: false });
  const db = drizzle(client);

  try {
    // 批次取回 home-care 範本
    const rows = await db
      .select()
      .from(reportTemplates)
      .where(eq(reportTemplates.facilityType, FACILITY_ID))
      .orderBy(asc(reportTemplates.sortOrder));

    if (rows.length === 0) {
      console.log(`⚠️  DB 中找不到 facilityType='${FACILITY_ID}' 的範本。`);
      return;
    }

    console.log(`📋 找到 ${rows.length} 個居家服務範本\n`);

    let changedCount = 0;
    let unchangedCount = 0;
    let unmatchedCount = 0;
    let parseErrorCount = 0;

    for (const row of rows) {
      const profileItem = itemsByTitleKey.get(row.title);
      if (!profileItem) {
        console.log(`  ❓ 無法對應 profile：${row.title}（略過）`);
        unmatchedCount++;
        continue;
      }

      if (!row.content) {
        console.log(`  ⚠️  ${row.title} content 為空（略過）`);
        unmatchedCount++;
        continue;
      }

      let sheets: SheetData[];
      try {
        sheets = JSON.parse(row.content);
        if (!Array.isArray(sheets) || sheets.length === 0) {
          throw new Error('content 不是非空的 sheet array');
        }
      } catch (err) {
        console.log(`  ❌ ${row.title} content 解析失敗：${(err as Error).message}`);
        parseErrorCount++;
        continue;
      }

      // 只處理第一個 sheet（檢核表）；不信任名稱，用位置
      const oldSheet0 = sheets[0];
      const tip = getEvaluationTip(FACILITY_ID, profileItem.id);
      const itemWithTip = tip ? { ...profileItem, tip: tip.content } : profileItem;
      const newSheet0 = buildItemSheetData(itemWithTip);

      // 比較序列化後的字串是否相同（JSON.stringify key 順序穩定於同版 Node）
      const oldSheet0Str = JSON.stringify(oldSheet0);
      const newSheet0Str = JSON.stringify(newSheet0);

      if (oldSheet0Str === newSheet0Str) {
        unchangedCount++;
        continue;
      }

      // 擷取舊/新 tip 行文字（若存在）以便預覽
      const oldTipRow = Array.isArray(oldSheet0?.data) && oldSheet0.data[3] ? String(oldSheet0.data[3][0] ?? '') : '';
      const newTipRow = Array.isArray(newSheet0.data) && newSheet0.data[3] ? String(newSheet0.data[3][0] ?? '') : '';

      console.log(`  🔧 項目 ${profileItem.id} ${profileItem.title}`);
      if (oldTipRow) console.log(`     舊：${oldTipRow.slice(0, 90)}${oldTipRow.length > 90 ? '…' : ''}`);
      if (newTipRow) console.log(`     新：${newTipRow.slice(0, 90)}${newTipRow.length > 90 ? '…' : ''}`);

      if (!apply) {
        changedCount++;
        continue;
      }

      // 實際寫入：先 snapshot 舊完整 content，再用 [newSheet0, ...oldSheets.slice(1)] 組合新 content
      const newSheets: SheetData[] = [newSheet0, ...sheets.slice(1)];
      const newContent = JSON.stringify(newSheets);

      await db.transaction(async (tx) => {
        // 讀取現有連結與標籤快照（對齊 seed-templates.ts snapshotBeforeOverwrite 行為）
        const existingLinks = await tx
          .select({ name: templateLinks.name, url: templateLinks.url, sortOrder: templateLinks.sortOrder })
          .from(templateLinks)
          .where(eq(templateLinks.templateId, row.id))
          .orderBy(asc(templateLinks.sortOrder));

        const existingTagRows = await tx
          .select({ name: templateTags.name })
          .from(templateTagReports)
          .innerJoin(templateTags, eq(templateTagReports.templateTagId, templateTags.id))
          .where(eq(templateTagReports.reportTemplateId, row.id));

        const latest = await tx
          .select({ versionNumber: templateRevisions.versionNumber })
          .from(templateRevisions)
          .where(eq(templateRevisions.templateId, row.id))
          .orderBy(desc(templateRevisions.versionNumber))
          .limit(1);
        const nextVersion = (latest[0]?.versionNumber ?? 0) + 1;

        await tx.insert(templateRevisions).values({
          templateId: row.id,
          userId: FIX_USER_ID,
          title: row.title,
          content: row.content,
          fileType: row.fileType ?? 'excel',
          responsible: row.responsible,
          links: JSON.stringify(existingLinks),
          tags: JSON.stringify(existingTagRows.map((r) => r.name)),
          versionNumber: nextVersion,
        });

        // 超過 MAX_REVISIONS 刪最舊
        const allRevisions = await tx
          .select({ id: templateRevisions.id })
          .from(templateRevisions)
          .where(eq(templateRevisions.templateId, row.id))
          .orderBy(desc(templateRevisions.versionNumber));
        if (allRevisions.length > MAX_REVISIONS) {
          const idsToDelete = allRevisions.slice(MAX_REVISIONS).map((r) => r.id);
          await tx.delete(templateRevisions).where(inArray(templateRevisions.id, idsToDelete));
        }

        await tx
          .update(reportTemplates)
          .set({ content: newContent, updatedAt: new Date() })
          .where(eq(reportTemplates.id, row.id));
      });

      console.log(`     📸 已備份舊版至 template_revisions，並覆寫 sheets[0]`);
      changedCount++;
    }

    console.log('');
    console.log(`📊 彙整：`);
    console.log(`   需變更：${changedCount}`);
    console.log(`   無變化：${unchangedCount}`);
    if (unmatchedCount) console.log(`   未對應：${unmatchedCount}`);
    if (parseErrorCount) console.log(`   解析錯誤：${parseErrorCount}`);
    console.log('');

    if (!apply && changedCount > 0) {
      console.log(`👉 確認無誤後，加上 --apply 實際寫入：`);
      console.log(`   npx dotenv-cli -e .env.local -- tsx scripts/fix-home-care-checklist-tips.ts --apply`);
    } else if (apply) {
      console.log(`✅ 完成。舊版本已備份至 template_revisions，可由管理後台回復。`);
    }
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error('❌ 修補失敗：', err);
  process.exit(1);
});
