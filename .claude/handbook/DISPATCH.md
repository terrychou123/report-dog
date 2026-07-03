# DISPATCH.md — 模型調度守則

> 讀者：主對話的模型（任何等級）。目的：主對話保持乾淨的 context 做判斷，粗活交給 subagent。
> 派工 prompt 的填空模板在 PROMPTS.md，本檔講「什麼時候派、派給誰、怎麼收貨」。

## §1 指揮官不下場

主對話的 context 是最貴的資源。以下工作**一律派 subagent**，主對話只收結論：

| 工作型態 | 判準（可觀察） | 派給 |
|---|---|---|
| 搜尋/定位程式碼 | 預計要開 3 個以上檔案、或不確定東西在哪 | `Explore` |
| 掃 repo / 盤點 | 「所有用到 X 的地方」「列出全部 Y」 | `Explore`（廣度標 "very thorough"） |
| 查網頁 / 外部研究 | 需要 WebSearch/WebFetch 超過 1 次 | `general-purpose` |
| 批次改檔 | 同一 pattern 套用到 3 個以上檔案 | `general-purpose`（先在主對話解出 1 個範例再派） |
| 實作獨立功能 | 改動範圍已界定、驗收條件寫得出來 | `general-purpose` |
| 審查/驗收（文件、高風險判斷） | 驗證自己剛產出的文件或高風險決策 | fresh-context agent（§6）；**程式碼驗收不派 agent**，主對話自行跑指令（§6） |

**可以自己做，不必派工：**
- 已知路徑、讀 1–2 個檔案的定點確認
- 單檔小改（≤ 約 30 行、不跨模組）
- 跟使用者的對話、決策、總結

判斷猶豫時：問自己「這件事的**過程**（檔案內容、搜尋軌跡）需要留在主對話嗎？」
不需要 → 派工。只有**結論**需要留下 → 派工。

## §2 派工三件套（缺一不派）

每個派工 prompt 必須含：
1. **目標與動機**：要什麼＋為什麼要（subagent 看不到主對話，動機讓它在邊界情況做對取捨）
2. **驗收條件**：可勾選的完成判準（「找到定義與所有 callers」而不是「幫我看看」）
3. **回報格式**：明定要回什麼、不要回什麼（見 §5）

另外必附：相關檔案路徑或起點、已知的限制（如「不要動 db/schema.ts」）、本專案不變量中相關的幾條。

## §3 模型指定（Agent tool 的 `model` 參數）

本環境 Agent tool 實際可用值：`haiku`、`sonnet`、`opus`、`fable`。省略時繼承主對話模型。
（補充脈絡：主 session 的 CLI 設定 pin 為 `opusplan`——plan mode 用 Opus、執行用 Sonnet。
`opusplan` 是 /model 的 session 設定值，**不是** Agent tool 的 model 參數值，不要傳給 Agent tool。）

| model | 用於 | 不要用於 |
|---|---|---|
| `haiku` | 機械性、低歧義：已有範例的批次套用、格式轉換、清單盤點、read-back 驗證 | 需要取捨或跨模組理解的任何事 |
| `sonnet` | **預設值**：搜尋、實作、重構、一般審查、研究 | （幾乎都可先試 sonnet） |
| `opus` | 架構決策、跨模組 debug、需求模糊的題目、第二意見評審、sonnet 失敗後的升級 | 機械性粗活（浪費） |
| `fable` | 若環境仍可用：視為 opus 之上，只用於最難的判斷題 | 日常任務 |

**effort 誠實條款**：Agent tool **沒有** effort/thinking 參數，只能選 model。
可在 prompt 內寫「請深入思考（think hard）後再動手」提高思考投入——此為經驗性做法，非保證機制。
主對話自己的思考深度由使用者的 /model 與 plan mode 控制，模型無法自調。

## §4 升降級路徑

- **haiku 錯 1 次** → 不重試，直接升 sonnet 重派
- **sonnet 同一子任務連錯 2 次** → 升 opus，且 prompt 必須附**完整失敗軌跡**
  （兩次都試了什麼、輸出哪裡不對、你懷疑的原因），不是原 prompt 重貼一遍
- **opus 也解不了** → 停下來，把問題與失敗軌跡整理給使用者（JUDGMENT.md §3）
- **降級**：一旦某個 pattern 被解出（有一個驗證過的範例），批次套用降回 haiku/sonnet，
  prompt 附上該範例當 few-shot
- **重試上限**：同一件事最多重試 2 輪（含升級）。第 3 次前必須先改變方法或問使用者，
  「再試一次一樣的」不算改變方法

## §5 回報合約（寫進每個派工 prompt 的「回報格式」欄）

- 只回：結論、`檔案路徑:行號` 引用、明確的 pass/fail 判定、未解決事項清單
- 不回：整檔內容、冗長過程敘述、與驗收條件無關的觀察
- 長產物（報告、大 diff、清單超過 30 行）**寫入檔案**（如 `/tmp/agent-out-<主題>.md`），回報只傳路徑
- 有不確定的地方必須標「不確定」，不准補完想像；查不到就回「查不到」
- 主對話收貨時：先對驗收條件逐項核，不合格就按 §4 處理，**不要自己下場接手做完**（除非已到重試上限）

## §6 驗證不自驗

產出者不能當自己的驗收者——同一個 context 會繼承同一個盲點。

| 產出類型 | 驗法 |
|---|---|
| 檔案/文件 | 派 fresh-context agent（haiku/sonnet）read-back：「讀這個檔，回答：它要你做什麼？哪裡矛盾或看不懂？」 |
| 程式碼 | 主對話自行跑（不派 agent）：動了 .ts/.tsx 就跑 `npx tsc --noEmit` + `npm run lint`；動了 lib/ 下有 .test.ts 的檔案加跑 `npm test`；其餘行為靠實跑（npm run dev / curl / 瀏覽器），component/route 無自動化測試 |
| 高風險判斷（架構、安全、資料遷移） | 第二意見：派 opus 以不同角度重審；或多答案評審（產 2–3 個方案，再派一個 agent 只做選優） |
| 評鑑內容（school/blog/範本） | 對照對應 `*-evaluation` skill 的法規條號逐條核，禁止「看起來合理就過」 |

驗收 agent 的 prompt **不要**告訴它「這是我做的、應該沒問題」，要中性陳述：「檢查 X 是否滿足這些條件」。

## §7 並行與長任務

- 互不依賴的子任務：**同一則訊息**並行派出多個 Agent 呼叫，不要串行等
- 有依賴的先後任務：等前一個結果再派，禁止先猜結果
- 長任務用 `run_in_background: true`，完成會收到通知；不要輪詢
- 會大改檔案又怕污染工作區：`isolation: "worktree"`
- 要延續某個 subagent 的 context 用 SendMessage 找它，重派 Agent 是全新開始
- 可用 agent 類型以當下 system-reminder 清單為準（2026-07-04 有：`Explore`、`Plan`、
  `general-purpose`、`claude`、`code-reviewer`、`feature-dev:code-explorer/architect/reviewer`、
  `code-simplifier`、`claude-code-guide`）。清單會隨 plugin 啟停變動，派工前確認名字存在。
