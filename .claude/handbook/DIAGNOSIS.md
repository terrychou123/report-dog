# 快速診斷：本 harness 的前三大問題（2026-07-03，Fable 5 制度化 session）

> 本檔是後續所有 handbook 檔案的依據。每條問題附「證據 → 修法 → 修到哪個檔案」。
> 讀者：未來在此環境工作的任何模型（含 Haiku / Sonnet 等級）。

## 問題 1：每個 session 的固定注入過肥（最漏 token）

**證據（2026-07-03 實測）：**
- 舊 CLAUDE.md 395 行 / 約 23KB，全文每 session 載入，其中大半是可從程式碼推導的清單
  （API 路由表、env vars 全列、funnel events、key libraries）。
- 全域啟用 14 個 plugins（vercel、document-skills、superpowers、gstack…），
  加上 `~/.claude/skills/` 下 80+ 個 gstack skills，skill 描述清單每 session 注入系統提示，
  估 8–12k tokens——其中 iOS 系列、SEO 審計系列多數 session 用不到。
- superpowers plugin 的 SessionStart hook 把整份 using-superpowers skill 全文注入（約 1.5k tokens）；
  Vercel plugin 再注入約 1.2k tokens 的知識更新。
- 合計：每個 session 還沒開始工作，就先花 15–20k tokens 在固定注入上。

**修法：**
1. CLAUDE.md 瘦身成路由檔（本次已完成，395 行 → 約 150 行），長清單移到
   `.claude/handbook/REFERENCE.md`，按需再讀。
2. 【需使用者同意】盤點 plugins 與 gstack skills：不用的用 `claude plugin` 指令停用，
   或把 `~/.claude/skills/` 中確定不用的目錄移到 `~/.claude/skills-disabled/`。
   候選停用名單見 LETTER.md 第 3 點。
3. 弱模型自己不要加重：不得把長清單、逐條紀錄寫回 CLAUDE.md（規則見 MAINTENANCE.md）。

## 問題 2：規則互相打架 + 不可執行的規則（最容易失焦）

**證據：**
- 舊 CLAUDE.md Rule 6「每任務 4,000 tokens、每 session 30,000 tokens」——模型無法計量自己
  的 token 用量，這條規則不可執行，只會產生假聲明（「我快超預算了」憑感覺說）。
- 三套指令來源沒有裁決順序：CLAUDE.md 說「skill 匹配就 ALWAYS 先 invoke」、
  superpowers 說「1% 可能性也要 invoke」、Engineering Rule 3 又說 surgical changes / 別碰不必要的東西。
  弱模型遇到衝突時會亂選、或在「要不要 invoke skill」上反覆橫跳燒 token。
- 主對話親自下場掃 repo（grep 十幾輪、整檔整檔讀），context 被原始檔案內容淹掉，
  到後段忘記任務目標——這是長 session 失焦的主因。

**修法：**
1. 新 CLAUDE.md 開頭放「指令優先序」條款（使用者明示 > CLAUDE.md/session 指示 > skill > 系統預設），
   並把 skill 觸發從「1% 就 invoke」收斂為「任務型態明確匹配才 invoke；invoke 後發現不適用就說明並退出」。
2. 刪掉 token 預算數字，改成可執行的行為代理規則（寫在 DISPATCH.md）：
   例：「預期要開 3 個以上檔案的搜尋 → 派 Explore agent，主對話只收結論」。
3. 不可執行規則的判準（供未來加規則時自檢）：**模型在當下能不能用可觀察的事實判斷自己有沒有違反？**
   能 → 可執行；不能（如 token 計數、「保持高品質」）→ 改寫或不寫。

## 問題 3：驗證缺位——「完成」只靠模型自述（最容易出錯）

**證據：**
- 專案無測試框架（CLAUDE.md 明載）。健康檢查只有 `npx tsc --noEmit`、`npm run lint`、
  `npm run lint:dead-code`，全是靜態檢查，跑不到行為。
- 過往流程中「完成」的判準是產出者自己宣告，沒有制度性的第二雙眼睛。
  同一個 context 裡自己驗自己，會繼承同樣的盲點（寫錯的假設，驗的時候還是那個假設）。
- 高風險區（HMAC token、退訂流程、tag 權限）改壞了靜態檢查照樣全綠。

**修法：**
1. 「驗證不自驗」制度：文件與高風險判斷的驗收派 fresh-context subagent；程式碼驗收由主對話
   自行跑 tsc/lint ＋ 實跑（規則與模板見 DISPATCH.md §6、PROMPTS.md）。
2. 完成判準 checklist（JUDGMENT.md §2）：宣告完成前必須逐項打勾，缺一項就不是完成。
3. ✅（2026-07-04 已完成）`lib/` 純函數已上 vitest（29 tests，`npm test`）——後續範圍見 LETTER.md 第 2 點。

## 附帶發現（非前三名，但要記錄）

- **安全**：`scripts/setup-storage.mjs` 曾硬編碼 DB 密碼並自 initial commit 起公開於 GitHub
  （2026-07-04 已修復並調查完畢，經過與剩餘事項見 LETTER.md 第 1 點）。
- **疑似無效的 hook**：settings.local.json 的 Stop hook 用 `echo '…請繼續執行…'` 且 exit 0，
  很可能沒有作用（未實測）。處理與驗證步驟見 LETTER.md「三件最重要的事」第 3 點，不在此重複。
- **graphify PreToolUse hook**：每次 grep/find 都注入一行提醒。小成本，但 graphify-out 若過期
  （graph 未隨程式碼更新），提醒會把弱模型導向過時的圖。用 graph 前先看 `graphify-out/` 的
  檔案時間是否落後於最近的大改動。
