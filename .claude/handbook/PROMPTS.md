# PROMPTS.md — 派工 prompt 模板

> 用法：複製對應模板，填 `【】` 空格，作為 Agent tool 的 `prompt`。
> `model` 與 agent 類型選擇見 DISPATCH.md §1、§3。模板已內建回報合約（DISPATCH.md §5），不要刪。
> 所有模板共同規則：subagent 看不到主對話，**所有它需要的背景都要寫進 prompt**。

## 1. 搜尋／定位（agent: Explore，model: sonnet；簡單清單可 haiku）

```
任務：在本 repo 找出【要找什麼，例：所有建立 Supabase client 的位置】。
動機：【為什麼找，例：要確認沒有 module-scope singleton】。
搜尋廣度：【medium｜very thorough——不確定在哪就用 very thorough】。
起點提示：【已知線索，例：lib/supabase/ 下有三個 client 工廠】。

驗收條件：
- 找到【目標】的定義處與所有使用處（含動態引用），或明確回報「不存在」
- 每個結果附一句「它在做什麼」

回報格式：
- 條列：檔案路徑:行號 — 一句說明
- 最後一行：總數與你對完整性的信心（高/中/低＋原因）
- 不要貼整段檔案內容；不確定的標「不確定」
```

## 2. 實作（agent: general-purpose，model: sonnet；架構含糊先派 Plan/opus 出計畫）

```
任務：實作【功能，一句話】。
動機：【使用者要解決什麼】。
範圍：可改【檔案/目錄】；**不可改**【例：db/schema.ts、既有 API 的回傳格式】。
本專案不變量（必守）：
- Supabase 只做 auth，資料走 Drizzle；client 按環境三選一（lib/supabase/{client,server,admin}.ts）
- 不在 module scope 建 client；資料變更走 Route Handlers；預設 server components
- 【其他與本任務相關的不變量，從 CLAUDE.md 抄】
做法提示：【已決定的方案或參考的既有範例檔】。

驗收條件：
- 【行為條件，例：POST /api/foo 帶合法 body 回 200 且 DB 有紀錄；非 owner 回 403】
- npx tsc --noEmit 與 npm run lint 通過
- 【有 UI 就加：npm run dev 起來，/path 頁面看得到 X】

回報格式：
- 改了哪些檔（路徑:行號）、每個改動一句理由
- 驗收條件逐條 pass/fail＋證據（指令輸出摘要）
- 跳過或做不到的事，明列
```

## 3. 重構（agent: general-purpose，model: sonnet）

```
任務：重構【目標】，行為不得改變。
動機：【例：三處重複的 token 驗證邏輯要收斂】。
範圍：只動【檔案清單】；公開介面（exports 簽名、API 回傳格式）不得變，除非先回報。
前置：先讀目標的所有 callers 再動手（用 grep 找齊，列出來）。

驗收條件：
- 所有 callers 仍編譯通過：npx tsc --noEmit 綠
- npm run lint 綠；無新增 export（避免死碼）
- 行為不變的論證：逐點說明「改動前後對每個 caller 的輸入輸出為何相同」

回報格式：
- callers 清單（路徑:行號）→ 改動摘要 → 驗收逐條 pass/fail
- 若發現行為「不得不變」的點，停手回報，不要自行決定
```

## 4. 研究（agent: general-purpose，model: sonnet；結論影響架構決策用 opus）

```
任務：研究【問題，例：Next.js 15 cacheComponents 與 revalidate 能否共存】。
動機：【這個答案會決定什麼】。
來源優先序：官方文件 > 官方 repo issues > 高信譽部落格；標註每個結論的來源與日期。
本專案脈絡：【相關版本/設定，例：next@15.x、Vercel Fluid、cacheComponents 已開】。

驗收條件：
- 回答核心問題，且每個關鍵論斷有來源 URL
- 區分「文件明說」vs「社群經驗」vs「你的推論」三種確定度
- 查不到就明說查不到，禁止腦補

回報格式：
- 結論先行（3 行內）→ 依據（來源＋確定度標記）→ 對本專案的建議動作
- 全文超過 30 行時寫入 /tmp/research-【主題】.md，回報只給路徑＋3 行摘要
```

## 5. 審查／驗收（agent: feature-dev:code-reviewer 或 general-purpose；model: 程式碼 sonnet、高風險 opus、read-back haiku）

```
任務：審查【對象：某 diff / 某檔案 / 某功能】。你是驗收者，與產出者無關，不要假設它是對的。
背景：這個產出宣稱做到【驗收條件原文，逐條列】。
（注意：中性陳述，不要寫「幫我確認沒問題」這種引導句。）

檢查清單：
- 驗收條件逐條實核（能跑指令就跑，不接受宣稱）
- 對照 CLAUDE.md「架構不變量」逐條掃
- 【文件類加：讀完後轉述它要你做什麼；轉述錯 = 文件不合格】
- 【評鑑內容加：條號/項目數/年度對照 .claude/skills/【facility】-evaluation/SKILL.md，逐條核】

回報格式：
- 逐條 verdict：pass / fail（附證據：指令輸出或 路徑:行號）
- 問題按嚴重度排序：blocker（不能合）/ major / minor
- 最後一行：整體 verdict：合格 / 退回（退回必附「最小修正清單」）
```

## 通用附註

- 並行派工：互不依賴的模板呼叫放同一則訊息（DISPATCH.md §7）
- 升級重派時：在模板最上方加一段「先前嘗試與失敗軌跡」——試了什麼、輸出哪裡不對、你的懷疑
- 降級批次套用時：在模板中附上已驗證的範例 diff 當 few-shot，並寫明「照此 pattern，不要自由發揮」
