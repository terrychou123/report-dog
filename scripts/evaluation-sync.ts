#!/usr/bin/env tsx
// 評鑑同步腳本（半自動）
// 流程：drift check → generate-checklist 重生 xlsx → 提醒後續人工步驟
// 永遠不自動執行 db:seed-templates（會覆蓋手動編輯的 system 範本）
//
// 用法：
//   npm run evaluation:sync daycare
//   npm run evaluation:sync psychiatric-rehabilitation-institution
//   npm run evaluation:sync --all
//   npm run evaluation:sync daycare --skip-drift-check

import { spawnSync, execSync } from 'child_process';
import { FACILITIES } from './_evaluation-facilities';

const args = process.argv.slice(2);
const isAll = args.includes('--all');
const skipDrift = args.includes('--skip-drift-check');
const facilityArg = args.find(a => !a.startsWith('--'));

const targets = isAll
  ? Object.keys(FACILITIES)
  : facilityArg
  ? [facilityArg]
  : [];

if (targets.length === 0) {
  console.error('用法：npm run evaluation:sync <facility-slug> [--skip-drift-check]');
  console.error('      npm run evaluation:sync --all\n');
  console.error('可用機構：', Object.keys(FACILITIES).join(', '));
  process.exit(1);
}

let anyFailed = false;

for (const slug of targets) {
  const meta = FACILITIES[slug];
  if (!meta) {
    console.error(`未知機構 slug：${slug}`);
    console.error('可用：', Object.keys(FACILITIES).join(', '));
    anyFailed = true;
    continue;
  }

  console.log(`\n${'═'.repeat(55)}`);
  console.log(`  機構：${slug}`);
  console.log(`  skill：.claude/skills/${meta.skillSlug}-evaluation/SKILL.md`);
  console.log('═'.repeat(55));

  // ── Step 1: drift check ─────────────────────────────────────────────────
  if (!skipDrift) {
    console.log('\n[1/3] drift check（profile ↔ supplementary itemId 集合）...');
    const drift = spawnSync(
      'npx',
      ['tsx', 'scripts/check-evaluation-drift.ts', `--facility=${slug}`],
      { stdio: 'inherit', shell: false },
    );
    if (drift.status !== 0) {
      console.error(`\n✗ drift check 失敗。請先修正 SSOT 再重跑 sync。`);
      console.error('  提示：npm run check:evaluation-drift -- --facility=' + slug);
      anyFailed = true;
      continue;
    }
  } else {
    console.log('[1/3] drift check 跳過（--skip-drift-check）');
  }

  // ── Step 2: generate checklist ──────────────────────────────────────────
  console.log('\n[2/3] 重生 Excel checklist...');
  if (!meta.generateScript) {
    console.log(`  ⚠️  ${slug} 目前無 generate-checklist script（generateScript: null）`);
    console.log('     xlsx 需手動維護或另行建立 generate 腳本。');
  } else {
    const gen = spawnSync('npm', ['run', meta.generateScript], {
      stdio: 'inherit',
      shell: false,
    });
    if (gen.status !== 0) {
      console.error(`  ✗ ${meta.generateScript} 執行失敗`);
      anyFailed = true;
    }
  }

  // ── Step 3: 顯示 public/downloads 變更 ─────────────────────────────────
  console.log('\n[3/3] public/downloads/ 變更摘要：');
  try {
    const changed = execSync('git status --porcelain public/downloads/', { encoding: 'utf8' });
    if (changed.trim()) {
      console.log(changed.trimEnd().split('\n').map(l => '  ' + l).join('\n'));
    } else {
      console.log('  （public/downloads/ 無變更）');
    }
  } catch {
    console.log('  （無法取得 git status）');
  }

  // ── 人工提醒 ─────────────────────────────────────────────────────────────
  console.log('\n📋 後續需人工確認：');
  console.log('  1. git diff public/downloads/ — 確認 xlsx 變更符合預期');
  console.log('  2. 若需更新 DB 範本，請執行：');
  console.log('       npm run db:seed-templates --force');
  console.log('     ⚠️  --force 會覆蓋手動編輯的 system 範本，確認後再跑');
  console.log('  3. 以下 school 頁面年度字串請人工審核：');

  // 列出 school 頁面中出現的年度字串（僅供參考，不驗證語意）
  const schoolDir = `app/school/${slug}`;
  const grepResult = spawnSync(
    'grep',
    ['-rn', '--include=*.tsx', '年度', schoolDir],
    { encoding: 'utf8' },
  );
  const grepOut = (grepResult.stdout ?? '').trim();
  if (grepOut) {
    const lines = grepOut.split('\n').slice(0, 15);
    console.log(lines.map(l => '    ' + l).join('\n'));
  } else {
    console.log(`    （${schoolDir} 無年度字串，或目錄不存在）`);
  }
}

console.log('');
process.exit(anyFailed ? 1 : 0);
