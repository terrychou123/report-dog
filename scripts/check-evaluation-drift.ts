#!/usr/bin/env tsx
// 評鑑 SSOT drift 檢查
// 比對 evaluation-profiles ↔ supplementary-sheets 的 itemId 集合
// 用法：
//   npm run check:evaluation-drift                    # 全部機構
//   npm run check:evaluation-drift -- --facility=daycare  # 單一機構
//   npm run check:evaluation-drift -- --json          # JSON 輸出（給 hook 用）

import path from 'path';
import fs from 'fs';
import { PROFILE_SUPP_PAIRS, FACILITIES } from './_evaluation-facilities';
import { getProfileMeta } from '../lib/ai/evaluation-profiles/index';

// ── 評鑑 profiles ──────────────────────────────────────────────────────────
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
import { multiFunctionCareProfile } from '../lib/ai/evaluation-profiles/multi-function-care';

// ── 補充工作表 defs ─────────────────────────────────────────────────────────
import { daycareDefs } from '../lib/supplementary-sheets/daycare';
import { homeCareDefs } from '../lib/supplementary-sheets/home-care';
import { nursingHomeDefs } from '../lib/supplementary-sheets/nursing-home';
import { hospitalDefs } from '../lib/supplementary-sheets/hospital';
import { disabilityWelfareDefs } from '../lib/supplementary-sheets/disability-welfare';
import { babycareDefs } from '../lib/supplementary-sheets/babycare';
import { homeNursingDefs } from '../lib/supplementary-sheets/home-nursing';
import { generalNursingHomeDefs } from '../lib/supplementary-sheets/general-nursing-home';
import { youthCareDefs } from '../lib/supplementary-sheets/youth-care';
import { elderlyWelfareDefs } from '../lib/supplementary-sheets/elderly-welfare';
import { psychiatricNursingHomeDefs } from '../lib/supplementary-sheets/psychiatric-nursing-home';
import { infantDaycareDefs } from '../lib/supplementary-sheets/infant-daycare';
import { psychiatricRehabilitationDayDefs } from '../lib/supplementary-sheets/psychiatric-rehabilitation-day';
import { psychiatricRehabilitationResidentialDefs } from '../lib/supplementary-sheets/psychiatric-rehabilitation-residential';
import { multiFunctionCareDefs } from '../lib/supplementary-sheets/multi-function-care';

// ── Lookup maps ─────────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyProfile = { sections: { items: { id: number }[] }[] };

const PROFILE_MAP: Record<string, AnyProfile> = {
  daycare: daycareProfile,
  'home-care': homeCareProfile,
  'nursing-home': nursingHomeProfile,
  hospital: hospitalProfile,
  'disability-welfare': disabilityWelfareProfile,
  babycare: babycareProfile,
  'home-nursing': homeNursingProfile,
  'general-nursing-home': generalNursingHomeProfile,
  'youth-care': youthCareProfile,
  'elderly-welfare': elderlyWelfareProfile,
  'psychiatric-nursing-home': psychiatricNursingHomeProfile,
  'infant-daycare': infantDaycareProfile,
  'psychiatric-rehabilitation-day': psychiatricRehabilitationDayProfile,
  'psychiatric-rehabilitation-residential': psychiatricRehabilitationResidentialProfile,
  'multi-function-care': multiFunctionCareProfile,
};

const SUPP_MAP: Record<string, Record<number, unknown>> = {
  daycare: daycareDefs,
  'home-care': homeCareDefs,
  'nursing-home': nursingHomeDefs,
  hospital: hospitalDefs,
  'disability-welfare': disabilityWelfareDefs,
  babycare: babycareDefs,
  'home-nursing': homeNursingDefs,
  'general-nursing-home': generalNursingHomeDefs,
  'youth-care': youthCareDefs,
  'elderly-welfare': elderlyWelfareDefs,
  'psychiatric-nursing-home': psychiatricNursingHomeDefs,
  'infant-daycare': infantDaycareDefs,
  'psychiatric-rehabilitation-day': psychiatricRehabilitationDayDefs,
  'psychiatric-rehabilitation-residential': psychiatricRehabilitationResidentialDefs,
  'multi-function-care': multiFunctionCareDefs,
};

// ── 輔助函式 ─────────────────────────────────────────────────────────────────

function getProfileItemIds(profileId: string): Set<number> {
  const profile = PROFILE_MAP[profileId];
  if (!profile) {
    throw new Error(
      `PROFILE_MAP に profileId '${profileId}' が存在しません。` +
      `check-evaluation-drift.ts の import と PROFILE_MAP を _evaluation-facilities.ts と同期してください。`,
    );
  }
  return new Set(profile.sections.flatMap(s => s.items.map(i => i.id)));
}

function getSuppItemIds(suppKey: string): Set<number> {
  const defs = SUPP_MAP[suppKey];
  if (!defs) return new Set();
  return new Set(Object.keys(defs).map(k => parseInt(k, 10)).filter(n => !isNaN(n)));
}

/** 掃描 lib/supplementary-sheets/ 找出 {suppKey}-item-{N}-custom.ts，回報 N 不在 profile 中的孤兒 */
function getOrphanCustomFiles(suppKey: string, profileItemIds: Set<number>): string[] {
  const suppDir = path.join(process.cwd(), 'lib', 'supplementary-sheets');
  let files: string[];
  try {
    files = fs.readdirSync(suppDir);
  } catch {
    return [];
  }
  const pattern = new RegExp(`^${suppKey}-item-(\\d+)-custom\\.ts$`);
  return files.filter(f => {
    const m = f.match(pattern);
    if (!m) return false;
    return !profileItemIds.has(parseInt(m[1], 10));
  });
}

// ── 型別定義 ─────────────────────────────────────────────────────────────────

type PairResult = {
  facilitySlug: string;
  profileId: string;
  suppKey: string;
  ok: boolean;
  orphanInSupp: number[];      // supp 有但 profile 無 → 孤兒，應刪除
  missingInSupp: number[];     // profile 有但 supp 無 → 可能是純觀察項，warn 不 error
  orphanCustomFiles: string[]; // custom 檔的 itemId 不在 profile 中
};

type DriftOutput = {
  timestamp: string;
  hasDrift: boolean;
  results: PairResult[];
};

// ── 主邏輯 ─────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const jsonMode = args.includes('--json');
const facilityFilter = args.find(a => a.startsWith('--facility='))?.replace('--facility=', '');

const pairs = facilityFilter
  ? PROFILE_SUPP_PAIRS.filter(p => p.facilitySlug === facilityFilter)
  : PROFILE_SUPP_PAIRS;

if (pairs.length === 0) {
  const msg = facilityFilter
    ? `未知機構：${facilityFilter}。可用：${Object.keys(FACILITIES).join(', ')}`
    : '無可檢查的機構';
  if (jsonMode) {
    console.log(JSON.stringify({ error: msg }));
  } else {
    console.error(msg);
  }
  process.exit(1);
}

const results: PairResult[] = pairs.map(({ facilitySlug, profileId, suppKey }) => {
  const profileItemIds = getProfileItemIds(profileId);
  const suppItemIds = getSuppItemIds(suppKey);

  // meta.totalItems 驗證：手動維護的數字 vs profile 實際 item 數
  const profileMeta = getProfileMeta(profileId);
  if (profileMeta && profileMeta.totalItems !== profileItemIds.size) {
    const label = `[${facilitySlug}/${profileId}]`;
    process.stderr.write(
      `${label} WARN: meta.totalItems=${profileMeta.totalItems} 但 profile 實際有 ${profileItemIds.size} 項，請同步修正。\n`,
    );
  }

  const orphanInSupp = [...suppItemIds].filter(id => !profileItemIds.has(id)).sort((a, b) => a - b);
  const missingInSupp = [...profileItemIds].filter(id => !suppItemIds.has(id)).sort((a, b) => a - b);
  const orphanCustomFiles = getOrphanCustomFiles(suppKey, profileItemIds);

  // 只有孤兒 supp entry 和孤兒 custom 檔算 drift；profile 有但 supp 沒有可能是純觀察項
  const ok = orphanInSupp.length === 0 && orphanCustomFiles.length === 0;

  return { facilitySlug, profileId, suppKey, ok, orphanInSupp, missingInSupp, orphanCustomFiles };
});

const hasDrift = results.some(r => !r.ok);
const output: DriftOutput = {
  timestamp: new Date().toISOString(),
  hasDrift,
  results,
};

if (jsonMode) {
  console.log(JSON.stringify(output, null, 2));
  process.exit(hasDrift ? 1 : 0);
}

// ── 人類可讀輸出 ─────────────────────────────────────────────────────────────

let printed = new Set<string>();
for (const r of results) {
  const label = r.facilitySlug === r.profileId
    ? `[${r.facilitySlug}]`
    : `[${r.facilitySlug}/${r.profileId}]`;

  if (!printed.has(r.facilitySlug)) {
    printed.add(r.facilitySlug);
  }

  if (r.ok && r.missingInSupp.length === 0) {
    console.log(`${label} OK  (profile ${[...getProfileItemIds(r.profileId)].length} items, supp covers ${[...getSuppItemIds(r.suppKey)].length})`);
  } else if (r.ok) {
    // 有 missingInSupp 但無孤兒，屬於 INFO（純觀察項不需 supp）
    console.log(`${label} OK  (INFO: profile 有 ${r.missingInSupp.length} 個純觀察項無 supp entry: [${r.missingInSupp.join(', ')}])`);
  } else {
    console.log(`${label} DRIFT`);
    if (r.orphanInSupp.length > 0) {
      console.log(`  ↳ 孤兒 supp entry（profile 無此 itemId，請移除）: [${r.orphanInSupp.join(', ')}]`);
    }
    if (r.missingInSupp.length > 0) {
      console.log(`  ↳ profile 有但 supp 無（可能是純觀察項，確認無誤可忽略）: [${r.missingInSupp.join(', ')}]`);
    }
    if (r.orphanCustomFiles.length > 0) {
      console.log(`  ↳ 孤兒 custom 檔（itemId 不在 profile，請確認或刪除）: ${r.orphanCustomFiles.join(', ')}`);
    }
  }
}

if (hasDrift) {
  console.log('\n有 drift，請修正後再跑 npm run evaluation:sync <facility>');
  process.exit(1);
} else {
  console.log('\n✓ 全部 OK');
  process.exit(0);
}
