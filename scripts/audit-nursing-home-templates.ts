/**
 * 住宿型長照機構範本稽核腳本（唯讀）
 *
 * 比對 DB 的 templateTags / reportTemplates (facilityType = 'nursing-home')
 * 與現行 SSOT（lib/ai/evaluation-profiles/nursing-home.ts 等）的差異。
 *
 * 分類：
 *   MISSING  — DB 無此 title，安全 seed 將 INSERT
 *   UNCHANGED — DB content 與重建結果完全相同，無需處理
 *   CONFLICT — DB content 與重建結果不同，安全 seed 會 SKIP（保留 admin 手動編輯）
 *   ORPHAN   — DB 有但 SSOT 已無（113/114 舊條目殘留），需人工決定
 *
 * 執行：
 *   npx dotenv-cli -e .env.local -- tsx scripts/audit-nursing-home-templates.ts
 */

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { reportTemplates, templateTags } from '../db/schema';
import { eq } from 'drizzle-orm';
import { getDbUrl } from '../db/index';
import { buildItemMultiSheetData, serializeSheetData } from '../lib/excel-template-builder';
import { getSupplementaryDefs } from '../lib/supplementary-sheets/index';
import { getCustomSheets } from '../lib/supplementary-sheets/custom-sheet-builders';
import { getEvaluationTip } from '../lib/evaluation-tips/index';
import { nursingHomeProfile } from '../lib/ai/evaluation-profiles/nursing-home';

// ── 收集 SSOT 所有 items ──────────────────────────────────────────────────────

type ProfileItem = {
  id: number;
  title: string;
  responsible: string;
  criteria: string[];
  reviewMethod: string;
  attachments?: string[];
};

const allItems: ProfileItem[] = [];
const responsibleGroups = new Map<string, ProfileItem[]>();

for (const section of nursingHomeProfile.sections) {
  for (const item of section.items) {
    allItems.push(item);
    if (!responsibleGroups.has(item.responsible)) {
      responsibleGroups.set(item.responsible, []);
    }
    responsibleGroups.get(item.responsible)!.push(item);
  }
}

const expectedTitleSet = new Set(allItems.map((item) => `${item.id} ${item.title}`));

// ── 重建每個 item 的預期 content ──────────────────────────────────────────────

function buildGeneratedContent(item: ProfileItem): string {
  const supplementaryDefs = getSupplementaryDefs('nursing-home', item.id);
  const customSheets = getCustomSheets('nursing-home', item.id);
  const tip = getEvaluationTip('nursing-home', item.id);
  const itemWithTip = tip ? { ...item, tip: tip.content } : item;
  const sheets = [
    ...buildItemMultiSheetData(itemWithTip, supplementaryDefs),
    ...customSheets,
  ];
  return serializeSheetData(sheets);
}

// ── 主程式 ────────────────────────────────────────────────────────────────────

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not set. Run with: npx dotenv-cli -e .env.local -- tsx scripts/audit-nursing-home-templates.ts');
    process.exit(1);
  }

  const client = postgres(getDbUrl(), { prepare: false });
  const db = drizzle(client);

  try {
    // 一次性讀取所有 nursing-home 相關 DB 資料
    const [dbTemplates, dbTags] = await Promise.all([
      db.select().from(reportTemplates).where(eq(reportTemplates.facilityType, 'nursing-home')),
      db.select().from(templateTags).where(eq(templateTags.facilityType, 'nursing-home')),
    ]);

    const dbTemplateMap = new Map(dbTemplates.map((t) => [t.title, t]));
    const dbTagNames = new Set(dbTags.map((t) => t.name));

    // ── 分類 SSOT 項目 ──────────────────────────────────────────────────────
    const missing: { id: number; title: string; responsible: string }[] = [];
    const unchanged: { id: number; title: string }[] = [];
    const conflicts: {
      id: number;
      title: string;
      responsible: string;
      updatedAt: Date | null;
      dbContentLen: number;
      generatedContentLen: number;
    }[] = [];

    for (const item of allItems) {
      const title = `${item.id} ${item.title}`;
      const existing = dbTemplateMap.get(title);

      if (!existing) {
        missing.push({ id: item.id, title, responsible: item.responsible });
        continue;
      }

      const generatedContent = buildGeneratedContent(item);

      if (existing.content === generatedContent) {
        unchanged.push({ id: item.id, title });
      } else {
        conflicts.push({
          id: item.id,
          title,
          responsible: item.responsible,
          updatedAt: existing.updatedAt,
          dbContentLen: existing.content?.length ?? 0,
          generatedContentLen: generatedContent.length,
        });
      }
    }

    // ── 偵測 ORPHAN（DB 有但 SSOT 已無）────────────────────────────────────
    const orphans = dbTemplates
      .filter((t) => !expectedTitleSet.has(t.title))
      .map((t) => ({
        dbId: t.id,
        title: t.title,
        responsible: t.responsible,
        updatedAt: t.updatedAt,
      }));

    // ── 比較 tag（負責人群組）───────────────────────────────────────────────
    const expectedResponsibles = [...responsibleGroups.keys()];
    const missingTags = expectedResponsibles.filter((r) => !dbTagNames.has(r));
    const orphanTags = [...dbTagNames].filter((r) => !responsibleGroups.has(r));

    // ── 輸出報告 ────────────────────────────────────────────────────────────
    console.log('='.repeat(70));
    console.log('📋 住宿型長照機構範本稽核報告（115 年度 SSOT vs DB）');
    console.log('='.repeat(70));
    console.log(`SSOT 項目數：${allItems.length}（ids 1–66：63 項 + 加減分 3 項）`);
    console.log(`DB 範本數：${dbTemplates.length}`);
    console.log(`DB 標籤數：${dbTags.length}`);
    console.log();

    // MISSING
    console.log(`🔴 MISSING（${missing.length} 項）— 安全 seed 將 INSERT`);
    if (missing.length === 0) {
      console.log('   （無）');
    } else {
      for (const m of missing) {
        console.log(`   id ${String(m.id).padStart(2)} │ ${m.title} │ 負責：${m.responsible}`);
      }
    }
    console.log();

    // CONFLICT
    console.log(`🟡 CONFLICT（${conflicts.length} 項）— 安全 seed 會 SKIP，內容仍為 admin 手動編輯版`);
    if (conflicts.length === 0) {
      console.log('   （無）');
    } else {
      for (const c of conflicts) {
        const updatedStr = c.updatedAt ? c.updatedAt.toISOString().slice(0, 10) : '不明';
        const diff = c.generatedContentLen - c.dbContentLen;
        const diffStr = diff >= 0 ? `+${diff}` : `${diff}`;
        console.log(`   id ${String(c.id).padStart(2)} │ ${c.title}`);
        console.log(`         負責：${c.responsible}　最後更新：${updatedStr}　內容長度差：${diffStr} 字元`);
      }
    }
    console.log();

    // ORPHAN
    console.log(`⚫ ORPHAN（${orphans.length} 項）— DB 有但 SSOT 無（113/114 殘留？），建議人工確認後刪除`);
    if (orphans.length === 0) {
      console.log('   （無）');
    } else {
      for (const o of orphans) {
        const updatedStr = o.updatedAt ? o.updatedAt.toISOString().slice(0, 10) : '不明';
        console.log(`   DB id: ${o.dbId}`);
        console.log(`   title: ${o.title}`);
        console.log(`   負責：${o.responsible ?? '（無）'}　最後更新：${updatedStr}`);
      }
    }
    console.log();

    // UNCHANGED
    console.log(`🟢 UNCHANGED（${unchanged.length} 項）— 與 SSOT 完全一致，無需處理`);
    if (unchanged.length > 0) {
      console.log(`   ${unchanged.map((u) => `id ${u.id}`).join(' / ')}`);
    }
    console.log();

    // 標籤差異
    if (missingTags.length > 0 || orphanTags.length > 0) {
      console.log('─'.repeat(70));
      console.log('📁 標籤（負責人群組）差異');
      if (missingTags.length > 0) {
        console.log(`  🔴 MISSING tags（${missingTags.length}）：${missingTags.join('、')}`);
      }
      if (orphanTags.length > 0) {
        console.log(`  ⚫ ORPHAN tags（${orphanTags.length}）：${orphanTags.join('、')}`);
      }
      console.log();
    }

    // 總結
    console.log('='.repeat(70));
    console.log('📊 總結');
    console.log(`  MISSING  : ${missing.length} 項 → 安全 seed 補入`);
    console.log(`  UNCHANGED: ${unchanged.length} 項 → 已是 115 最新版`);
    console.log(`  CONFLICT : ${conflicts.length} 項 → 請逐項決定是否 --force 覆蓋`);
    console.log(`  ORPHAN   : ${orphans.length} 項 → 請確認後決定是否刪除`);
    console.log();

    if (conflicts.length > 0 || orphans.length > 0) {
      console.log('📌 後續指令：');
      if (missing.length > 0) {
        console.log('  1. 執行安全 seed 補入 MISSING 項目：');
        console.log('     npx dotenv-cli -e .env.local -- tsx scripts/seed-templates.ts --facility nursing-home');
      }
      if (conflicts.length > 0) {
        console.log('  2. 若要覆蓋全部 CONFLICT（舊版本自動備份到 template_revisions）：');
        console.log('     npx dotenv-cli -e .env.local -- tsx scripts/seed-templates.ts --facility nursing-home --force');
        console.log('     ⚠️  或逐項從 /admin/nursing-home/[id] 手動更新個別衝突範本');
      }
    } else {
      console.log('✅ DB 已與 115 年度 SSOT 完全對齊，無需額外操作。');
    }

    // 機器可讀 JSON（適合 script pipeline 接收）
    const jsonResult = {
      summary: {
        ssotTotal: allItems.length,
        dbTotal: dbTemplates.length,
        missing: missing.length,
        unchanged: unchanged.length,
        conflict: conflicts.length,
        orphan: orphans.length,
      },
      missing: missing.map((m) => ({ id: m.id, title: m.title, responsible: m.responsible })),
      conflicts: conflicts.map((c) => ({
        id: c.id,
        title: c.title,
        responsible: c.responsible,
        updatedAt: c.updatedAt?.toISOString() ?? null,
        dbContentLen: c.dbContentLen,
        generatedContentLen: c.generatedContentLen,
      })),
      orphans: orphans.map((o) => ({
        dbId: o.dbId,
        title: o.title,
        responsible: o.responsible,
        updatedAt: o.updatedAt?.toISOString() ?? null,
      })),
    };

    console.log('\n--- JSON (機器可讀) ---');
    console.log(JSON.stringify(jsonResult, null, 2));

  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error('❌ Audit failed:', err);
  process.exit(1);
});
