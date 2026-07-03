# 專案詳細參考（從 CLAUDE.md 抽出，按需讀取）

> 本檔內容不會自動載入。CLAUDE.md 的路由表指到這裡。
> 改動對應功能前，先讀對應章節；改完若本檔過時，順手更新（規則見 MAINTENANCE.md）。

## 環境變數

必要（`.env.local`）：
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=    # 或 legacy NEXT_PUBLIC_SUPABASE_ANON_KEY
DATABASE_URL=                             # Drizzle ORM 直連 Postgres
```

選用：
```
OPENROUTER_API_KEY=          # AI 功能（Claude via OpenRouter）
SUPABASE_SERVICE_ROLE_KEY=   # Admin 操作（邀請使用者、cron 清理、解析共享報告 owner）
ADMIN_EMAIL=                 # /admin 範本管理的門檻
BLOG_ADMIN_EMAIL=            # /blog-admin 門檻
CRON_SECRET=                 # Vercel cron job 的 Bearer token
PUBLIC_DEMO_SALT=            # 公開 SOAP demo 限流的 IP HMAC salt（缺少會讓所有 demo 請求 500）
RESEND_API_KEY=              # Resend（電子報歡迎信，lib/email/resend.ts）
FROM_EMAIL=                  # Resend 驗證過的寄件位址（預設 "報告汪 <noreply@reportwang.com>"）
DOWNLOAD_TOKEN_SECRET=       # 32+ byte 隨機密鑰，HMAC 下載 token（lib/downloads/token.ts）
RESEND_WEBHOOK_SECRET=       # Resend webhook 簽章密鑰（svix 格式 whsec_xxx）
UNSUBSCRIBE_TOKEN_SECRET=    # 32+ byte，HMAC 退訂 token（lib/email/unsubscribe-token.ts）；openssl rand -hex 32
UNSUBSCRIBE_REPLY_TO=        # 電子報 Reply-To（如 "報告汪退訂 <unsubscribe@xxx.resend.app>"）
UNSUBSCRIBE_INBOX_ADDRESS=   # List-Unsubscribe mailto 用的純 email
NEXT_PUBLIC_GA_ID=           # GA4 Measurement ID（留空則不載入 GA script，dev 建議不設）
```

## GA4 Funnel Events（lib/analytics.ts）

**Acquisition**
- `cta_click` — CTA 按鈕點擊（source: `{page}-hero|bottom|blog-mid-cta|…`）
- `sign_up` — 註冊 form 送出（components/sign-up-form.tsx）
- `oauth_start` / `oauth_complete` — Google OAuth（components/auth/google-auth-button.tsx / app/auth/oauth-success/page.tsx）
- `sign_up_complete` — Email 驗證完成（app/auth/email-success/page.tsx）
- `login` — 登入成功，含 email 與 OAuth（components/login-form.tsx / app/auth/oauth-success/page.tsx）

**Lead capture**
- `lead_capture` — 下載 gate Email 收集成功（components/downloads/download-gate-dialog.tsx）
- `newsletter_subscribe` — 主動訂閱電子報（footer / blog-inline；signup 自動訂閱不送此事件）

**Activation**
- `report_create` — 報告建立成功（source: "manual"|"upload"，components/upload-report-button.tsx）
- `document_upload` — 檔案上傳成功（ext: "word"|"excel"，components/upload-report-button.tsx）
- `template_import` — 評鑑範本匯入成功（facility_type，components/template-import-dialog.tsx）
- `ai_use` — AI 功能使用成功（action: "edit"|"evaluate"|"analyze"|"improve"|"summarize"|"extract-data"）

## Leads 與 Newsletter

`leads` table（db/schema.ts）— 下載 gate 與電子報訂閱共用，`source`（'download'|'newsletter'）區分來源，
同 (email, source) 唯一。退訂欄位：`unsubscribed_at`、`unsubscribe_source`（'reply'|'one_click'|'manual'）、
`unsubscribe_message_id`（Resend email_id）。

相關 API：
- `POST /api/leads` — download gate（回傳 HMAC 簽名下載 URL，TTL 15 分鐘）
- `POST /api/newsletter` — 訂閱（已退訂者直接回 ok，不更新 DB）
- `GET  /api/newsletter/unsubscribe?token=` — 一鍵退訂（redirect 確認頁）
- `POST /api/newsletter/unsubscribe?token=` — List-Unsubscribe-Post 一鍵退訂（JSON）
- `POST /api/webhooks/resend-inbound` — Resend Inbound webhook（回信退訂，svix 簽章驗證）
- `GET  /api/downloads/[file]` — 驗 token 後串流 private/downloads/*.xlsx

退訂機制：
- 寄件帶 `Reply-To: UNSUBSCRIBE_REPLY_TO`、`List-Unsubscribe`、`List-Unsubscribe-Post: List-Unsubscribe=One-Click` header
- 回信退訂：主旨或內文含關鍵字（「退訂」「unsubscribe」「stop」等）才觸發，其他只 log（lib/email/unsubscribe-keywords.ts）
- 一鍵退訂 token：HMAC-SHA256，90 天有效，格式 `<exp>.<b64email>.<source>.<sig>`（lib/email/unsubscribe-token.ts）
- 退訂確認頁：`/newsletter/unsubscribed?ok=1`（成功）or `?ok=0`（失敗/token 無效）
- DB migration：`db/migrations/0017_add_leads_unsubscribe.sql`（需手動套用至 Supabase）

## 路由結構

**Public：**
- `/` landing、`/pricing`、`/testimonial`、`/downloads`、`/onboarding`
- `/blog`、`/blog/[slug]`、`/blog/[slug]/edit`、`/blog-admin`
- `/docs/*` — 說明中心（12 頁）
- `/school/*` — 14 種機構的評鑑教學內容
- 機構 landing：`/hospital`、`/residential`、`/home-care`、`/day-care`、`/home-nursing`、
  `/disability-welfare`、`/babycare`、`/general-nursing-home`、`/infant-daycare`、
  `/multi-function-care`、`/psychiatric`

**Auth：** `/auth/login`、`/auth/sign-up`、`/auth/sign-up-success`、`/auth/forgot-password`、
`/auth/update-password`、`/auth/callback`、`/auth/confirm`、`/auth/email-callback`（server route，
email 驗證 PKCE/OTP 進入點）、`/auth/email-success`、`/auth/oauth-callback`、`/auth/oauth-success`、`/auth/error`

**Authenticated（`/(dashboard)/*`）：** `/report`、`/report/[id]`、`/follow`、`/share`、
`/tag`、`/tag/[id]`、`/tag/new`

**Protected（`/protected/*`）：** `/protected/dashboard`、`/protected/dashboard/[id]`（TipTap 或
FortuneSheet 編輯器）、`…/preview`、`…/final`、`…/history`、`…/visualizations`、`/protected/dashboard/upload`

**Admin：** `/admin`、`/admin/[facilityType]`、`/admin/[facilityType]/[templateId]`、`/admin/blog`

## API Routes（全部走 Route Handlers，資料變更不用 server actions）

- Reports: `/api/reports`, `/api/reports/[id]`, `/api/reports/[id]/ai`, `/api/reports/[id]/revisions`,
  `/api/reports/[id]/copy`, `/api/reports/evaluation`, `/api/reports/reorder`, `/api/reports/shared`
- Documents: `/api/documents`, `/api/documents/[id]`, `/api/documents/[id]/ai`, `/api/documents/[id]/revisions`
- Tags: `/api/tags`, `/api/tags/[id]`, `/api/tag-reports`, `/api/tag-reports/[id]`, `/api/tags/reorder`, `/api/tag-reports/reorder`
- Follows: `/api/follows`, `/api/follows/[id]`, `/api/follows/report/[reportId]`
- Notifications: `/api/notifications`, `/api/notifications/unread-count`
- Users: `/api/users/invite`, `/api/users/notify`, `/api/users/lookup-by-email`, `/api/users/resolve`
- Templates: `/api/templates`, `/api/templates/import`
- Admin: `/api/admin/tags`, `/api/admin/tags/[id]`, `/api/admin/templates`, `/api/admin/templates/[id]`, `/api/admin/tag-reports`
- Blog: `/api/blog`, `/api/blog/[slug]`
- Files: `/api/convert-docx`, `/api/parse-doc`, `/api/upload-pdf`, `/api/excel/parse`, `/api/excel/export`
- AI: `/api/ai-usage`
- Cron: `/api/cron/cleanup-trials`（每日 3:00 UTC，vercel.json，需 CRON_SECRET）
- Leads/Newsletter: `/api/leads`, `/api/newsletter`, `/api/newsletter/unsubscribe`
- Downloads: `/api/downloads/[file]`
- Webhooks: `/api/webhooks/resend-inbound`
- Auth: `/api/auth/*`
- Misc: `/api/demo`, `/api/trial`, `/api/revalidate-blog`

## AI 系統

- `lib/ai/openrouter-client.ts` — generic OpenAI SDK client via OpenRouter
  （model 在三個 AI API route 各自指定，目前皆為 `anthropic/claude-sonnet-4.6`）
- `lib/ai/usage-limit.ts` — 免費層：每 user 每 UTC 日 1 次 AI 呼叫（`ai_usage` table）
- `lib/ai/evaluation-profiles/` — 14 種機構 profile：daycare, home-care, nursing-home, hospital,
  disability-welfare, babycare, home-nursing, general-nursing-home, youth-care, elderly-welfare,
  psychiatric-nursing-home, infant-daycare, multi-function-care, psychiatric-rehabilitation-institution

三個 AI endpoints：
1. `/api/reports/[id]/ai` — 報告段落編輯，extended thinking（streaming）
2. `/api/reports/evaluation` — 跨報告評鑑分析，用 evaluation profiles（streaming）
3. `/api/documents/[id]/ai` — 文件動作：analyze / improve / summarize / extract-data

## 資料庫（Drizzle）

- `db/schema.ts` 全 schema；`db/index.ts` 連線（postgres driver + DATABASE_URL）；
  `db/migrations/` SQL migrations；`drizzle.config.ts`
- Key tables：`clients`（tags/folders）、`reports`、`documents`、`revisions`、`report_revisions`、
  `ai_sessions`、`ai_usage`、`notifications`、`report_follows`、`blog_posts`、`template_tags`、
  `report_templates`、`template_tag_reports`、`template_imports`、`leads`
- 共享模型：`clients.viewers` / `clients.editors` text arrays；權限判斷用
  `lib/auth/tag-permissions.ts`（`canViewTag`、`canEditTag`、`isTagOwner`）

## 元件慣例與主要函式庫

- 預設 server components；只有需要互動（forms、editors）才 `"use client"`
- shadcn/ui 放 `components/ui/`，新增用 `npx shadcn@latest add <component>`；style: `new-york`
- 領域元件：`components/ai/`、`components/documents/`、`components/visualizations/`、
  `components/history/`、`components/docs/`、`components/school/`
- 主要函式庫：@tiptap/react（富文字）、@fortune-sheet/react（試算表）、exceljs、mammoth（.docx 解析）、
  html-to-docx、@dnd-kit/core + sortable（拖曳排序）、recharts、resend、react-markdown + remark-gfm、
  sanitize-html、sonner（toast）
- 樣式：Tailwind CSS variables（app/globals.css）、dark mode 用 class 策略 + next-themes、
  條件 class 用 `cn()`（lib/utils.ts）、chart 色票 `chart-1`~`chart-5`
- Path alias：`@/` = 專案根目錄

## SEO 基礎設施

- `app/robots.ts`、`app/sitemap.ts`、`lib/jsonld.ts`（JSON-LD helpers）
- `app/llms.txt/route.ts` — 動態 llms.txt（school 導覽 + 最新 30 篇文章）
- `public/ads.txt`；`public/downloads/` 的 Excel 由 `npm run evaluation:sync <facility>` 產生，非靜態 commit

**llms.txt 決策（2026-05-19）**：Google 明示 llms.txt 對 SEO 沒幫助，但本專案保留——屬主動引用策略
（LLM 友善格式暴露站內結構）、動態產生、維護成本低、不影響 robots/sitemap。若日後 AI 廠商明確表態
llms.txt 扣分，再評估移除。

## Scripts 補充（完整清單見 package.json）

```bash
npm run db:generate / db:studio / db:seed-templates
npm run generate:<facility>-checklist          # 產生機構 Excel 自評表
npm run check:evaluation-drift -- --facility=<f>
npm run evaluation:sync <facility>
npm run gsc:health / ga:health / audit:blog

# Google Search Console
npx tsx scripts/gsc.ts --report=top-queries --days=28 --limit=20
npx tsx scripts/gsc.ts --report=top-pages   --days=28 --limit=20
npx tsx scripts/gsc.ts --report=low-ctr     --days=28 --limit=20   # 高曝光低 CTR（優化金礦）
npx tsx scripts/gsc.ts --report=by-page --page="https://reportwang.com/blog/foo" --days=90
npx tsx scripts/gsc.ts --report=sitemap-status
# 認證走 OAuth Desktop；refresh token 快取於 ~/.config/gcloud/reportwang-gsc-token.json
```

機構對照表（facility slug → npm script）維護於 `scripts/_evaluation-facilities.ts`。

## 已廢止的規則（歷史紀錄，勿恢復）

- **Token 預算（每任務 4,000 / 每 session 30,000）**：2026-07-03 廢止。模型無法計量自身 token 用量，
  規則不可執行，只產生假聲明。以 DISPATCH.md 的行為規則取代（大量讀取派 subagent、主對話只收結論）。
  原文見 `.claude/handbook/backup/CLAUDE.md.bak-2026-07-03`。
