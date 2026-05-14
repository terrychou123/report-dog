#!/usr/bin/env tsx
// Blog facility coverage 全表交叉比對
// 確認 _evaluation-facilities.ts × FACILITY_MAP × DOWNLOADS catalog × private/downloads/ 四方一致
// 用法：
//   npm run check:blog-facility-coverage               # 全部
//   npm run check:blog-facility-coverage -- --facility=elderly-welfare  # 單一
//   npm run check:blog-facility-coverage -- --json     # JSON 輸出

import path from 'path';
import fs from 'fs';
import { FACILITIES } from './_evaluation-facilities';
import { FACILITY_MAP } from '../lib/blog-facility-map';
import { DOWNLOADS } from '../lib/downloads/catalog';

// ── 白名單：已知尚無 Excel 的 facility（phase 2 TODO）──────────────────────
const KNOWN_NO_DOWNLOAD: ReadonlySet<string> = new Set(['multi-function-care']);

// ── FACILITIES key → FACILITY_MAP key 對照（別名不同時才需列出）────────────
const FACILITIES_TO_MAP_KEY: Record<string, string> = {
  babycare: 'postpartum-care', // FACILITIES 用 babycare，FACILITY_MAP 用 postpartum-care
};

// ── CLI args ─────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const jsonMode = args.includes('--json');
const facilityArg = args.find((a) => a.startsWith('--facility='))?.split('=')[1];

// ── 型別 ──────────────────────────────────────────────────────────────────────
type CheckResult = {
  facilityKey: string;       // FACILITIES key
  mapKey: string;            // FACILITY_MAP key
  catalogSlug: string | null;
  catalogEntry: boolean;     // catalogSlug 存在於 DOWNLOADS
  fileExists: boolean;       // private/downloads/<file> 存在
  knownNoDownload: boolean;
  issues: string[];
};

type Output = {
  ok: boolean;
  summary: string;
  results: CheckResult[];
};

// ── 主邏輯 ────────────────────────────────────────────────────────────────────
const catalogSet = new Set(DOWNLOADS.map((d) => d.slug));
const catalogFileMap = new Map(DOWNLOADS.map((d) => [d.slug, d.file]));
const privateDownloadsDir = path.join(process.cwd(), 'private', 'downloads');

const facilityKeys = Object.keys(FACILITIES);
const targetKeys = facilityArg ? [facilityArg] : facilityKeys;

if (facilityArg && !FACILITIES[facilityArg]) {
  console.error(`未知的 facility: ${facilityArg}`);
  console.error(`可用值: ${facilityKeys.join(', ')}`);
  process.exit(1);
}

const results: CheckResult[] = [];

for (const facilityKey of targetKeys) {
  const mapKey = FACILITIES_TO_MAP_KEY[facilityKey] ?? facilityKey;
  const mapEntry = FACILITY_MAP[mapKey];
  const knownNoDownload = KNOWN_NO_DOWNLOAD.has(facilityKey);
  const issues: string[] = [];

  // (A vs B) FACILITY_MAP 是否有對應 key
  if (!mapEntry) {
    issues.push(`FACILITY_MAP 中找不到 key "${mapKey}"（由 FACILITIES["${facilityKey}"] 對應）`);
    results.push({
      facilityKey, mapKey, catalogSlug: null, catalogEntry: false, fileExists: false,
      knownNoDownload, issues,
    });
    continue;
  }

  const catalogSlug = mapEntry.catalogSlug;

  // null catalogSlug 僅允許白名單
  if (catalogSlug === null) {
    if (!knownNoDownload) {
      issues.push(`catalogSlug 為 null 但不在 KNOWN_NO_DOWNLOAD 白名單`);
    }
    results.push({
      facilityKey, mapKey, catalogSlug: null, catalogEntry: false, fileExists: false,
      knownNoDownload, issues,
    });
    continue;
  }

  // (B vs C) catalogSlug 必須存在於 DOWNLOADS
  const catalogEntry = catalogSet.has(catalogSlug);
  if (!catalogEntry) {
    issues.push(`catalogSlug "${catalogSlug}" 不存在於 lib/downloads/catalog.ts DOWNLOADS`);
  }

  // (C vs D) 對應的 xlsx 檔案必須存在於 private/downloads/
  const fileName = catalogFileMap.get(catalogSlug) ?? `${catalogSlug}.xlsx`;
  const filePath = path.join(privateDownloadsDir, fileName);
  const fileExists = fs.existsSync(filePath);
  if (!fileExists) {
    issues.push(`檔案不存在：private/downloads/${fileName}`);
  }

  results.push({ facilityKey, mapKey, catalogSlug, catalogEntry, fileExists, knownNoDownload, issues });
}

// ── 輸出 ──────────────────────────────────────────────────────────────────────
const hasDrift = results.some((r) => r.issues.length > 0);
const output: Output = {
  ok: !hasDrift,
  summary: hasDrift
    ? `❌ ${results.filter((r) => r.issues.length > 0).length} 個 facility 有問題`
    : `✅ 全部 ${results.length} 個 facility 覆蓋正常`,
  results,
};

if (jsonMode) {
  console.log(JSON.stringify(output, null, 2));
} else {
  const rows = results.map((r) => {
    const status = r.issues.length > 0 ? '❌' : r.knownNoDownload && r.catalogSlug === null ? '⏳' : '✅';
    const slug = r.catalogSlug ?? '(無)';
    const file = r.fileExists ? '✓' : r.catalogSlug === null ? '—' : '✗';
    return `  ${status}  ${r.facilityKey.padEnd(42)} catalog: ${slug.padEnd(42)} file: ${file}`;
  });

  console.log('\nBlog Facility Coverage Report');
  console.log('─'.repeat(80));
  console.log(rows.join('\n'));
  console.log('─'.repeat(80));

  if (hasDrift) {
    console.log('\n問題詳情：');
    for (const r of results.filter((x) => x.issues.length > 0)) {
      console.log(`\n  [${r.facilityKey}]`);
      for (const issue of r.issues) {
        console.log(`    • ${issue}`);
      }
    }
    console.log('');
  }

  console.log(output.summary);
}

if (hasDrift) process.exit(1);
