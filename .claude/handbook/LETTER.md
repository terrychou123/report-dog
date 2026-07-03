# LETTER.md — 給未來 session 的信

> 寫於 2026-07-03，Fable 5 制度化 session。這封信講三件使用者沒問、但對這個環境最重要的事，
> 以及這套制度最可能的退化方式。新 session 開頭值得花 30 秒掃過「風險」與「退化」兩節。

## 一、三件最重要的事

### 1.（安全，最優先）DB 密碼外洩 — 2026-07-04 已調查並大致處理

**更正**：2026-07-03 初版說「settings.local.json 被 git 追蹤」是誤讀（把 check-ignore 輸出
看成 ls-files 輸出）；該檔本來就在 .gitignore，從未進版控。

**真正的外洩**：`scripts/setup-storage.mjs` 硬編碼 pooler 連線字串（含密碼），
自 initial commit（0ad8f13，2026-03-02）起存在於 **PUBLIC** repo `terrychou123/report-dog`。

已完成（2026-07-04）：
- ✅ `setup-storage.mjs` 改讀 `process.env.DATABASE_URL`，缺值即報錯退出
- ✅ 全 repo（含 git 歷史、untracked 檔）掃描：該密碼只出現在這一處＋settings.local.json
  的兩條 allowlist（已清除）；無其他密鑰（JWT/API key）入庫
- ✅ 判定外洩密碼**極可能已失效**：.env.local 現行密碼與外洩版不同且日常可用，
  同一 Postgres role 只有一組密碼 → 舊密碼已被換掉

待使用者：
- ❌ （建議，5 分鐘）在 Supabase Dashboard 再輪替一次 DB 密碼以 100% 確認，
  之後同步更新 `.env.local` 與 Vercel env（`DATABASE_URL`）
- ❌ 舊密碼仍留在 git 歷史（initial commit）。因密碼已失效，history rewrite 效益低於成本，
  建議不做；若使用者堅持，需 git filter-repo + force push，由使用者拍板

### 2. 沒有測試框架是這個 repo 最大的結構性風險

所有「完成」都缺機械驗證，handbook 只能用實跑＋fresh-context 審查補位，但補不了回歸
（這次沒改到的地方被弄壞，沒人會發現）。最高價值的第一步很小：給純函數上 vitest——
`lib/downloads/token.ts`、`lib/email/unsubscribe-token.ts`、`lib/auth/tag-permissions.ts`、
`lib/ai/usage-limit.ts` 的純邏輯部分。這些是安全/權限關鍵，又不需要 mock 任何外部服務。
**動手前先問使用者**（CLAUDE.md 明載「無測試框架」是現況描述，引入框架是使用者的決定）。

### 3. 注入面積：plugins 與 skills 是最大的固定 token 支出

全域 14 個 plugins ＋ `~/.claude/skills/` 80+ 個 gstack skills，每 session 固定注入估
15–20k tokens。SEO 系列（keyword-research、geo-content-optimizer…）**使用者有在用，不要動**。

✅ 已瘦身（2026-07-04，使用者核可）：
- `ios-*` ×5 與 `gstack.bak`（1.2GB 舊備份）移至 `~/.claude/skills-disabled/`（搬回即復原）
- `document-skills` plugin 停用（`~/.claude/settings.json` 改回 true 即復原；
  設定備份：`~/.claude/settings.json.bak-2026-07-04`）
- `gstack.bak` 仍占 1.2GB 磁碟，確定不要可整目錄刪除（由使用者決定）

尚未動、日後可再評估（各有取捨，動之前問使用者）：superpowers（SessionStart 全文注入
約 1.5k tokens，但 TDD/debug 工作流有價值）、vercel plugin 的 SessionStart 注入（約 1.2k，
專案部署在 Vercel 故保留）、skill-creator 與 claude-code-setup（少用但體積小）。
另外：settings.local.json 的 Stop hook（echo「請繼續執行」、exit 0）疑似無效
（Stop hook 需 exit 2 或 JSON decision 才會阻止停止）。驗證法：故意留一個未完成事項就停止回合，
觀察是否被擋下並收到該訊息；沒被擋 → 問使用者要修成有效（exit 2）還是刪除。此問題以本段為唯一紀錄。

## 二、這套制度最可能的退化方式與預防

| 退化 | 徵兆 | 預防／解法 |
|---|---|---|
| 規則增生 | CLAUDE.md 又超過 160 行；handbook 出現「補充」「另外」開頭的追加段 | MAINTENANCE.md §3 長度預算＋§6「改原文不追加」；每次想加規則先找可合併/可刪的 |
| 派工被逐次繞過 | 主對話又出現連續 grep + 整檔 Read 十幾輪 | 判準是機械的（>3 檔即派工），違反就是違反，不接受「這次比較簡單」；徵兆出現時當場改派 Explore |
| 驗收橡皮圖章 | 審查 agent 每次都全 pass、回報無 路徑:行號 證據 | PROMPTS.md 模板 5 要求逐條證據；全 pass 且無證據的驗收 = 無效，重派並檢查 prompt 是否有引導句 |
| handbook 與現實脫節 | 引用的路徑/指令 404 | MAINTENANCE.md §5 過時偵測；發現即修（事實錯誤可自行改） |
| memory 與 handbook 打架 | 同一主題兩處說法不同 | 依 CLAUDE.md 指令優先序裁決後，把輸的那份改掉或標廢止；不准並存 |
| 制度本身被遺忘 | 新 session 完全沒讀 handbook 就開工 | CLAUDE.md 路由表是唯一防線——所以它必須保持短，短到每次真的會被讀完 |

## 三、本 session 交付清單（2026-07-03）

- `CLAUDE.md` 重寫（395 → 約 130 行），舊版在 `.claude/handbook/backup/CLAUDE.md.bak-2026-07-03`
- `.claude/handbook/DIAGNOSIS.md` — harness 三大問題診斷
- `.claude/handbook/REFERENCE.md` — 從 CLAUDE.md 抽出的詳細參考
- `.claude/handbook/DISPATCH.md` — 模型調度守則
- `.claude/handbook/JUDGMENT.md` — 判斷力 checklist
- `.claude/handbook/PROMPTS.md` — 派工模板 ×5
- `.claude/handbook/MAINTENANCE.md` — 本套檔案的維護協議
- 本檔

未完成／交接事項：見上方「三件最重要的事」的 ❌ 項目（皆需使用者決定，非技術卡關）。

## 四、harness 極限的誠實聲明

這套制度補得了：執行紀律、驗證流程、token 節約、錯誤升級。
補不了：**品味判斷與模糊題**。文章有沒有說服力、設計美不美、產品方向對不對——
rubric 只能驗底線（JUDGMENT.md §5），驗不出「好」。遇到這類題：升到可用的最強模型、
產多個變體讓使用者選、或直說「這超出我能可靠判斷的範圍」。裝有把握，比慢一點更貴。
