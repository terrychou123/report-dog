/**
 * 照顧組合代碼資料完整性驗證腳本
 *
 * 執行方式：npm run verify:ltc-codes
 *
 * 驗證項目：
 *   1. 總代碼數量符合預期
 *   2. 每分類數量符合預期
 *   3. code 唯一性
 *   4. references 內所有代碼都在 registry 可查到
 *   5. 必填欄位非空（name、rules）
 */

import {
  getAllCareCombinations,
  getCareCombination,
  getCareCombinationsByCategory,
  formatCareCombinationForPrompt,
} from "../lib/ltc-care-combinations";

const EXPECTED_BY_CATEGORY: Record<string, number> = {
  AA: 12,  // AA01–AA12
  BA: 27,  // BA01–BA05, BA07–BA09a, BA10–BA18(含BA17a/b/c/d1/d2/e共6筆), BA20, BA22–BA24（不含 BA06/BA19/BA21）
  BB: 14,  // BB01–BB14
  BC: 14,  // BC01–BC14
  BD: 3,   // BD01–BD03
  CA: 2,   // CA07, CA08
  CB: 4,   // CB01a, CB02–CB04
  CC: 1,   // CC01
  CD: 1,   // CD02
  DA: 1,   // DA01
  GA: 6,   // GA03–GA07, GA09
};

const EXPECTED_TOTAL = Object.values(EXPECTED_BY_CATEGORY).reduce((a, b) => a + b, 0);

let errors = 0;

function fail(msg: string) {
  console.error(`  ❌ ${msg}`);
  errors++;
}

function ok(msg: string) {
  console.log(`  ✅ ${msg}`);
}

console.log("=== 照顧組合代碼資料完整性驗證 ===\n");

const all = getAllCareCombinations();

// 1. 總數
if (all.length === EXPECTED_TOTAL) {
  ok(`總代碼數量：${all.length}`);
} else {
  fail(`總數 ${all.length} ≠ 預期 ${EXPECTED_TOTAL}`);
}

// 2. 每分類數量
console.log("\n[每分類數量]");
for (const [cat, expected] of Object.entries(EXPECTED_BY_CATEGORY)) {
  const got = getCareCombinationsByCategory(cat as never).length;
  if (got === expected) {
    ok(`${cat}：${got} 筆`);
  } else {
    fail(`${cat} 實際 ${got} 筆 ≠ 預期 ${expected} 筆`);
  }
}

// 3. code 唯一性
console.log("\n[code 唯一性]");
const codes = all.map((c) => c.code);
const uniqueCodes = new Set(codes);
if (uniqueCodes.size === all.length) {
  ok("所有 code 唯一");
} else {
  const seen = new Set<string>();
  for (const code of codes) {
    if (seen.has(code)) fail(`重複代碼：${code}`);
    seen.add(code);
  }
}

// 4. references 指向存在的代碼
console.log("\n[references 完整性]");
let refErrors = 0;
for (const c of all) {
  for (const r of c.references ?? []) {
    if (!getCareCombination(r)) {
      fail(`${c.code} references 中的 "${r}" 不存在`);
      refErrors++;
    }
  }
}
if (refErrors === 0) ok("所有 references 指向有效代碼");

// 5. 必填欄位非空
console.log("\n[必填欄位]");
let fieldErrors = 0;
for (const c of all) {
  if (!c.name) { fail(`${c.code} 缺 name`); fieldErrors++; }
  if (!c.rules || c.rules.length === 0) { fail(`${c.code} 缺 rules`); fieldErrors++; }
  if (!c.payment) { fail(`${c.code} 缺 payment`); fieldErrors++; }
  if (!c.remotePayment) { fail(`${c.code} 缺 remotePayment`); fieldErrors++; }
}
if (fieldErrors === 0) ok("所有代碼必填欄位齊全");

// 6. 格式化測試（抽查幾個代碼）
console.log("\n[formatCareCombinationForPrompt 測試]");
const testCodes = ["AA01", "BA15", "DA01", "GA09"];
for (const code of testCodes) {
  const output = formatCareCombinationForPrompt(code);
  if (output && output.length > 50) {
    ok(`${code} 格式化輸出正常（${output.length} 字元）`);
  } else {
    fail(`${code} 格式化輸出異常：${JSON.stringify(output)}`);
  }
}

// 最終結果
console.log("\n===========================");
if (errors === 0) {
  console.log(`✅ 全部驗證通過！共 ${all.length} 筆代碼。`);
  process.exit(0);
} else {
  console.error(`\n❌ ${errors} 項錯誤，請修正後重新驗證。`);
  process.exit(1);
}
