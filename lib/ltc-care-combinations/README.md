# lib/ltc-care-combinations

台灣《長期照顧服務申請及給付辦法》附表四「照顧組合表修正規定」結構化資料庫。

## 來源

- **法規**：衛生福利部公告，修正長期照顧服務申請及給付辦法部分條文及附表
- **PDF**：`/Users/happinessmed/Downloads/修正長期照顧服務申請及給付辦法_部分條文及附表.pdf`（62 頁，附表四：第 7–35 頁）
- **版本詳情**：見 `metadata.ts`

## 代碼範圍

| 分類 | 名稱 | 代碼 | 筆數 |
|------|------|------|------|
| AA | 照顧管理服務及政策鼓勵服務 | AA01–AA12 | 12 |
| BA | 照顧及專業服務（居家式） | BA01–BA24（含 BA17 六個子項；BA06/BA19/BA21 法規略過） | 27 |
| BB | 日間照顧 | BB01–BB14 | 14 |
| BC | 家庭托顧 | BC01–BC14 | 14 |
| BD | 社區式服務 | BD01–BD03 | 3 |
| CA | 專業服務 | CA07, CA08 | 2 |
| CB | 專業照護 | CB01a, CB02–CB04 | 4 |
| CC | 居家無障礙環境改善 | CC01 | 1 |
| CD | 居家護理 | CD02 | 1 |
| DA | 交通接送 | DA01 | 1 |
| GA | 喘息服務 | GA03–GA07, GA09（GA01/GA02/GA08 法規略過） | 6 |
| **合計** | | | **85** |

## 資料慣例

1. **逐字保留原文**：`rules[].text` 保留 PDF 原文，含「應/得/不得/限以」等法律用字。
2. **子項放 `children`**：「（一）（二）」或 `1. 2.` 子項放在 `children` 陣列。
3. **引用填 `references`**：內文提到其他代碼（如 AA03 引用 BA01–BA05）填入 `references[]`。
4. **地方訂定**：給付由地方主管機關公告者用 `{ kind: "local-government" }`（如 DA01）。
5. **略過號碼**：法規本身跳過的編號（BA06、BA19、BA21、GA01、GA02、GA08）不建入 registry。

## 檔案結構

```
lib/ltc-care-combinations/
├── README.md          ← 本文件
├── types.ts           ← 型別 SSOT（LtcCareCombination / LtcCareCategory / LtcPaymentAmount）
├── metadata.ts        ← 法規版本、生效日、PDF 頁碼
├── codes-aa.ts        ← AA01–AA12（12 筆）
├── codes-ba.ts        ← BA01–BA24（27 筆，含 BA17a/b/c/d1/d2/e）
├── codes-bb.ts        ← BB01–BB14（14 筆）
├── codes-bc.ts        ← BC01–BC14（14 筆）
├── codes-bd.ts        ← BD01–BD03（3 筆）
├── codes-ca.ts        ← CA07, CA08（2 筆）
├── codes-cb.ts        ← CB01a, CB02–CB04（4 筆）
├── codes-cc.ts        ← CC01（1 筆）
├── codes-cd.ts        ← CD02（1 筆）
├── codes-da.ts        ← DA01（1 筆）
├── codes-ga.ts        ← GA03–GA07, GA09（6 筆）
└── index.ts           ← registry + 公開 API
```

## 公開 API

```ts
import {
  getCareCombination,
  getCareCombinationsByCategory,
  getAllCareCombinations,
  searchCareCombinations,
  formatCareCombinationForPrompt,
  getCategoryLabel,
  categoryLabels,
} from "@/lib/ltc-care-combinations";

// 取單筆（找不到回 undefined）
const ba15 = getCareCombination("BA15");

// 取分類全部（按 code 自然排序）
const aaCodes = getCareCombinationsByCategory("AA");

// 取全部（85 筆，按 code 自然排序）
const all = getAllCareCombinations();

// 關鍵字搜尋（在 code / name / rules.text 中 case-insensitive 找）
const results = searchCareCombinations("沐浴");

// 格式化為 AI prompt 可注入純文字
const prompt = formatCareCombinationForPrompt("AA01");
// → "【AA01】照顧計畫擬訂與服務連結（照顧管理服務及政策鼓勵服務）\n組合內容：\n..."

// 分類顯示名稱
const label = getCategoryLabel("BA"); // → "照顧及專業服務"
```

## AI 自動注入

`knowledge/sources/external/regulations/ltc-payment-schedule-iv.md` 含 `applicable_to: [all]` frontmatter，由 `lib/ai/wiki-context.ts:118 collectRegulations()` 自動撿走，注入所有機構類型的評鑑 prompt，無需額外設定。

## 驗證

```bash
npm run verify:ltc-codes
# ✅ 全部驗證通過！共 85 筆代碼。
```

腳本位於 `scripts/verify-ltc-care-combinations.ts`，驗證：總數、每分類數量、code 唯一性、references 指向有效代碼、必填欄位、formatCareCombinationForPrompt 輸出。

## 更新法規版本

1. 取得新 PDF，確認異動代碼
2. 修改對應 `codes-XX.ts`
3. 更新 `metadata.ts` 的 `datasetVersion`、`lastVerified`、`publishedAt`、`effectiveDate`
4. 更新 `scripts/verify-ltc-care-combinations.ts` 的 `EXPECTED_BY_CATEGORY`（若數量有異動）
5. 執行 `npm run verify:ltc-codes` 確認通過
6. 更新 `knowledge/sources/external/regulations/ltc-payment-schedule-iv.md` 對應段落
