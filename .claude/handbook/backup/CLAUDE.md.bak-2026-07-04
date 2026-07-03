# CLAUDE.md

本檔是路由檔：只放每個 session 都需要的規則與指向。詳細內容在 `.claude/handbook/`（先讀路由表再做事）。
舊版備份：`.claude/handbook/backup/CLAUDE.md.bak-2026-07-03`。

## 溝通偏好

- 回答用繁體中文
- 程式碼加上中文註解

## 指令優先序（規則衝突時依此裁決，不要平均）

1. 使用者當下的明確指示
2. 本檔與 `.claude/handbook/` 的規則
3. Skill / plugin 注入的工作流（含 superpowers）
4. 系統預設行為

Skill 觸發判準：任務型態與 skill 描述**明確匹配**才 invoke（見下方 Skill routing）；
invoke 後發現不適用，說明原因後放下它，不硬套。不做「以防萬一」的儀式性 invoke。

## Engineering Rules（可執行版；每條的正例/反例見 handbook/JUDGMENT.md）

1. **先想再寫**：動手前明說假設；有歧義就列出解讀讓使用者選；有更簡單的做法要提出來
2. **最小可解**：不寫沒被要求的功能；單次使用的程式碼不建抽象
3. **外科手術**：只動必要的檔案；不順手「改善」旁邊的程式碼、註解、格式
4. **先讀再寫**：改函數前先看它的 exports、直接 callers、共用 utilities
5. **衝突選邊**：兩個 pattern 打架時選一個（較新／較有驗證的），說明理由並標記另一個待清理，不混用
6. **失敗要大聲**：跳過任何步驟都要明說；tests/檢查沒跑就不能說「通過」；「完成」判準見 JUDGMENT.md §2
7. **粗活派工**：大量讀取（預計開 3 個以上檔案或不確定位置）、掃 repo、查網頁、批次改檔
   一律派 subagent，主對話只收結論（DISPATCH.md §1）

## Handbook 路由表

| 情境 | 先讀 |
|---|---|
| 要派 subagent／搜尋預計開 3 個以上檔案／批次修改 | `.claude/handbook/DISPATCH.md` |
| 判斷「完成了嗎」「該升級模型嗎」「該問使用者嗎」「方向錯了嗎」 | `.claude/handbook/JUDGMENT.md` |
| 撰寫派工 prompt（搜尋／實作／重構／研究／審查） | `.claude/handbook/PROMPTS.md` |
| env vars、GA4 events、路由與 API 清單、newsletter/退訂、AI endpoints、DB tables、SEO、GSC scripts | `.claude/handbook/REFERENCE.md` |
| 要更新 CLAUDE.md 或 handbook 本身 | `.claude/handbook/MAINTENANCE.md` |
| 視覺/UI 決策（字體、色彩、間距、美術方向） | `DESIGN.md`（必讀，不可跳過） |
| 新 session 想了解環境現況與已知風險 | `.claude/handbook/LETTER.md` |

## Product

**報告汪 (reportwang.com)** — 台灣長照與社福機構的 AI 評鑑報告管理平台。
核心功能：報告/文件管理（富編輯）、AI 輔助分析、tag 協作分享、追蹤。

## Commands（核心；完整清單見 package.json 與 REFERENCE.md）

```bash
npm run dev / build / lint / start
npm run lint:dead-code                            # knip 偵測未使用 exports/檔案/依賴
npm run db:push                                   # Drizzle schema 推送
npm run check:evaluation-drift -- --facility=<f>  # profile ↔ supplementary 對齊檢查
npm run evaluation:sync <facility>                # drift check + 重生 public/downloads/*.xlsx
```

本專案**沒有測試框架**。行為驗證靠實跑（npm run dev + 手動/瀏覽器）與 fresh-context 審查（DISPATCH.md §6）。

## 架構不變量（違反即 bug，PR 不得合入）

**Stack:** Next.js 15 App Router + React 19 + TypeScript + Supabase（只做 auth）+ Drizzle ORM（所有資料）+ Tailwind + shadcn/ui

- 資料存取一律走 Drizzle；Supabase client 只碰 auth
- Supabase client 三選一，按執行環境：client components 用 `lib/supabase/client.ts`、
  server components/route handlers 用 `lib/supabase/server.ts`、特權操作用 `lib/supabase/admin.ts`
- **絕不**在 module scope 建 Supabase client singleton——每個 request 建一次（Vercel Fluid compute）
- `proxy.ts`（re-export 自 `lib/supabase/proxy.ts`）每請求刷新 session；任何 server-side Supabase 操作都依賴它
- **絕不**對 Supabase transaction pooler 傳 `statement_timeout` 等啟動參數（Vercel build 會 ECHECKOUTTIMEOUT）
- **絕不**自動執行 `npm run db:seed-templates --force`（會覆蓋手動編輯的 system 範本；要跑先問使用者）
- 資料變更走 Route Handlers，不用 server actions
- 預設 server components；需要互動才 `"use client"`
- Metadata 長度（SERP 截斷防止）：`title` 25–30 字、`description` 70–80 字（繁體中文），
  所有 `app/*/page.tsx` 的 `generateMetadata` 都要遵守
- Path alias：`@/` = 專案根目錄；條件 class 用 `cn()`（lib/utils.ts）

## 評鑑 SSOT 同步工作流（Stop hook 會自動跑 drift check）

修改下列任一檔案，session 結束前**必須**完成同步：

| 層級 | 路徑 |
|---|---|
| 程式 SSOT | `lib/ai/evaluation-profiles/{facility}.ts` |
| 補充工作表 | `lib/supplementary-sheets/{facility}.ts`（itemId 必須對應 profile.items[].id） |
| 教學要訣 | `lib/evaluation-tips/{facility}.ts`（key 為 itemId） |
| 人類版 SSOT | `.claude/skills/{facility}-evaluation/SKILL.md` |

強制步驟：
1. `npm run check:evaluation-drift -- --facility=<f>`（drift → exit 1）
2. `npm run evaluation:sync <facility>`
3. **絕不**自動跑 `db:seed-templates --force`（同上，先問使用者）
4. 人工審核：`app/school/{facility}/**/page.tsx`、`app/{facility}/page.tsx`、`app/sitemap.ts`、
   `lib/jsonld.ts`、以及 blog 中提及該年度的文章

機構對照表維護於 `scripts/_evaluation-facilities.ts`。
注意：`psychiatric-rehabilitation-institution` profile 涵蓋日間型（36 條）+ 住宿型（40 條），
但 supplementary-sheets 與 evaluation-tips 分拆為 `…-day.ts` + `…-residential.ts` 兩檔，drift check 須同時比對。

## Skill routing（明確匹配才觸發；plan mode 中先走 plan workflow，離開後再觸發）

- 產品點子、值不值得做 → office-hours
- Bug、錯誤、500 → investigate
- Ship、deploy、開 PR → ship
- QA、測站、找 bug → qa ｜ 程式碼審查 → review ｜ 出貨後更新文件 → document-release
- 設計系統/品牌 → design-consultation ｜ 視覺稽核 → design-review ｜ 架構審查 → plan-eng-review
- 存檔/恢復進度 → checkpoint ｜ 程式碼健康 → health ｜ 週回顧 → retro
- **修改或產生評鑑範本/設定**（`lib/supplementary-sheets/*`、`lib/ai/evaluation-profiles/*`、
  `lib/evaluation-tips/*`）→ 先 invoke 對應 facility 的 `*-evaluation` skill
  （daycare → daycare-evaluation、babycare → postpartum-care-evaluation 等），
  以 skill 所載法規條號為 SSOT，**不得自行編造評鑑標準**
- Blog/社群文章 → ltc-social-writer ＋ 對應 `*-evaluation` skill；SVG 插圖 → svg-illustration

## graphify

知識圖在 `graphify-out/`。跨模組「X 跟 Y 什麼關係」的問題，優先用
`graphify query/path/explain` 而非 grep。用之前檢查 graph 是否過期
（`graphify-out/` 檔案時間早於最近大改動 → 先 `graphify update .`，AST-only 無 API 成本）。
改完程式碼後跑 `graphify update .`。

## Health Stack

- typecheck: `npx tsc --noEmit`
- lint: `npm run lint`
- deadcode: `npm run lint:dead-code`
