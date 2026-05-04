# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 溝通偏好

- 回答用繁體中文
- 程式碼加上中文註解

## Product

**報告汪 (reportwang.com)** — An AI-powered evaluation report management platform for long-term care (LTC) and social welfare institutions in Taiwan. Core features: report/document management with rich editing, AI-assisted analysis, tag-based collaboration/sharing, and follow/tracking.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm start        # Start production server

# Database (Drizzle ORM)
npm run db:push              # Push schema changes to DB
npm run db:generate          # Generate migration files
npm run db:studio            # Open Drizzle Studio
npm run db:seed-templates    # Seed evaluation templates

# Scripts
npm run generate:disability-welfare-checklist  # Generate disability-welfare checklist Excel
npm run generate:infant-daycare-checklist      # Generate infant-daycare checklist Excel
npm run generate:youth-care-checklist          # Generate youth-care checklist Excel
npm run generate:elderly-welfare-checklist     # Generate elderly-welfare checklist Excel
```

No test framework is configured in this project.

## Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=    # or legacy NEXT_PUBLIC_SUPABASE_ANON_KEY
DATABASE_URL=                             # Direct Postgres connection for Drizzle ORM
```

Optional:
```
OPENROUTER_API_KEY=          # AI features (Claude via OpenRouter)
SUPABASE_SERVICE_ROLE_KEY=   # Admin operations (invite users, cron cleanup, resolve shared owners)
ADMIN_EMAIL=                 # Gate for /admin template management
BLOG_ADMIN_EMAIL=            # Gate for /blog-admin
CRON_SECRET=                 # Bearer token for Vercel cron job auth
PUBLIC_DEMO_SALT=            # HMAC-SHA256 salt for IP hashing in public SOAP demo rate limiting (required — missing causes 500 on all demo requests)
```

## Architecture

**Stack:** Next.js 15 App Router + React 19 + TypeScript + Supabase (auth only) + Drizzle ORM (data) + Tailwind CSS + shadcn/ui

### Supabase Client Pattern

Three clients — choose the correct one for context:

**Browser (client components):** `lib/supabase/client.ts` — uses `createBrowserClient`

**Server (server components, route handlers):** `lib/supabase/server.ts` — uses `createServerClient` with Next.js `cookies()`

**Admin (server-only, privileged):** `lib/supabase/admin.ts` — uses service role key for operations like inviting users, running cron cleanup, or resolving shared report owners

Never create a singleton Supabase client at module scope — always create per-request (important for Vercel Fluid compute compatibility).

### Database Layer (Drizzle ORM)

All data access goes through Drizzle ORM, not the Supabase client. Supabase is used only for auth.

- `db/schema.ts` — Full schema definition
- `db/index.ts` — DB connection (uses `postgres` driver + `DATABASE_URL`)
- `db/migrations/` — SQL migration files (11 migrations, 0000–0010)
- `drizzle.config.ts` — Drizzle Kit config

**Key tables:** `clients` (tags/folders), `reports`, `documents`, `revisions`, `report_revisions`, `ai_sessions`, `ai_usage`, `notifications`, `report_follows`, `blog_posts`, `template_tags`, `report_templates`, `template_tag_reports`, `template_imports`

**Sharing model:** The `clients` table has `viewers` and `editors` text arrays. Use `lib/auth/tag-permissions.ts` for permission checks (`canViewTag`, `canEditTag`, `isTagOwner`).

### Middleware & Session Management

`proxy.ts` (root) re-exports from `lib/supabase/proxy.ts`. This middleware runs on every request to refresh the auth session via `auth.getClaims()`. This **must** be called before any server-side Supabase operations to prevent random session logouts. The middleware redirects unauthenticated users from `/protected/*` to `/auth/login`.

### AI System

- `lib/ai/openrouter-client.ts` — OpenAI SDK client via OpenRouter (`anthropic/claude-sonnet-4.6`)
- `lib/ai/usage-limit.ts` — Free tier: 1 AI call per user per UTC day (enforced via `ai_usage` table)
- `lib/ai/evaluation-profiles/` — 12 facility-type profiles with structured evaluation criteria for AI system prompts: `daycare`, `home-care`, `nursing-home`, `hospital`, `disability-welfare`, `babycare`, `home-nursing`, `general-nursing-home`, `youth-care`, `elderly-welfare`, `psychiatric-nursing-home`, `infant-daycare`

**Three AI endpoints:**
1. `/api/reports/[id]/ai` — Report paragraph editing with extended thinking (streaming)
2. `/api/reports/evaluation` — Cross-report evaluation analysis using evaluation profiles (streaming)
3. `/api/documents/[id]/ai` — Document actions: analyze, improve, summarize, extract-data

### Route Structure

**Public pages:**
- `/` — Landing page
- `/pricing`, `/testimonial`, `/downloads`, `/onboarding`
- `/blog`, `/blog/[slug]`, `/blog/[slug]/edit`, `/blog-admin`
- `/docs/*` — Help center (12 pages: getting-started, create-report, ai-editing, etc.)
- `/school/*` — Evaluation learning content for 12 facility types with sub-pages each
- Facility-type landing pages: `/hospital`, `/residential`, `/home-care`, `/day-care`, `/home-nursing`, `/disability-welfare`, `/babycare`, `/general-nursing-home`, `/infant-daycare`

**Auth pages:** `/auth/login`, `/auth/sign-up`, `/auth/forgot-password`, `/auth/update-password`, `/auth/callback`, `/auth/confirm`, `/auth/error`

**Authenticated (`/(dashboard)/*`):**
- `/report`, `/report/[id]` — Report list and detail
- `/follow` — Follow/tracking page
- `/share` — Shared reports
- `/tag`, `/tag/[id]`, `/tag/new` — Tag management

**Protected (`/protected/*`):**
- `/protected/dashboard` — Main dashboard
- `/protected/dashboard/[id]` — Report editor (TipTap or FortuneSheet)
- `/protected/dashboard/[id]/preview`, `/final`, `/history`, `/visualizations`
- `/protected/dashboard/upload`

**Admin (`/admin/*`):**
- `/admin` — Template management index
- `/admin/[facilityType]`, `/admin/[facilityType]/[templateId]`
- `/admin/blog`

### API Routes

All data mutations use Route Handlers (no server actions for data). 18 API route groups:
- Reports: `/api/reports`, `/api/reports/[id]`, `/api/reports/[id]/ai`, `/api/reports/[id]/revisions`, `/api/reports/[id]/copy`, `/api/reports/evaluation`, `/api/reports/reorder`, `/api/reports/shared`
- Documents: `/api/documents`, `/api/documents/[id]`, `/api/documents/[id]/ai`, `/api/documents/[id]/revisions`
- Tags: `/api/tags`, `/api/tags/[id]`, `/api/tag-reports`, `/api/tag-reports/[id]`, `/api/tags/reorder`, `/api/tag-reports/reorder`
- Follows: `/api/follows`, `/api/follows/[id]`, `/api/follows/report/[reportId]`
- Notifications: `/api/notifications`, `/api/notifications/unread-count`
- Users: `/api/users/invite`, `/api/users/notify`, `/api/users/lookup-by-email`, `/api/users/resolve`
- Templates: `/api/templates`, `/api/templates/import`
- Admin: `/api/admin/tags`, `/api/admin/tags/[id]`, `/api/admin/templates`, `/api/admin/templates/[id]`, `/api/admin/tag-reports`
- Blog: `/api/blog`, `/api/blog/[slug]`
- Files: `/api/convert-docx`, `/api/parse-doc`, `/api/excel/parse`, `/api/excel/export`
- AI: `/api/ai-usage`
- Cron: `/api/cron/cleanup-trials`

### Component Conventions

- Default to **server components**; add `"use client"` only when needed (forms, editors, interactive UI)
- UI primitives from shadcn/ui live in `components/ui/` — add new ones with `npx shadcn@latest add <component>`
- Feature components are organized by domain:
  - `components/ai/` — AI panel, AI limit dialog
  - `components/documents/` — Document editor, card, list, upload form, diff viewer
  - `components/visualizations/` — Chart renderer, relationship graph, timeline view
  - `components/history/` — Revision list
  - `components/docs/` — Docs sidebar, mobile nav
  - `components/school/` — School sidebar, mobile nav

### Key Libraries

Beyond the base stack, these libraries are used extensively:
- **@tiptap/react** — Rich text editor for report/document editing
- **@fortune-sheet/react** — Spreadsheet editor for Excel-type reports
- **exceljs** — Excel file generation and parsing
- **mammoth** — .docx file parsing
- **html-to-docx** — DOCX export
- **@dnd-kit/core**, **@dnd-kit/sortable** — Drag-and-drop report/tag reordering
- **recharts** — Data visualization charts
- **resend** — Email sending (user invites, notifications)
- **react-markdown** + **remark-gfm** — Markdown rendering
- **sanitize-html** — HTML sanitization
- **sonner** — Toast notifications

### Vercel Cron

Defined in `vercel.json`. One job: `/api/cron/cleanup-trials` runs daily at 3:00 AM UTC. Requires `CRON_SECRET` env var (Bearer token auth).

### SEO Infrastructure

- `app/robots.ts` — robots.txt generation
- `app/sitemap.ts` — sitemap generation
- `lib/jsonld.ts` — JSON-LD structured data helpers
- OpenGraph images in multiple route directories
- `public/ads.txt` — Ad monetization
- `public/downloads/` — 8 pre-built Excel template downloads for facility types

### Styling

- Tailwind CSS with CSS variables for theming (defined in `app/globals.css`)
- Dark mode via `class` strategy with `next-themes`
- Use the `cn()` helper from `lib/utils.ts` (wraps `clsx` + `tailwind-merge`) for conditional classes
- shadcn/ui style: `new-york`
- Plugins: `@tailwindcss/typography` (prose styling), `tailwindcss-animate`
- Chart color tokens: `chart-1` through `chart-5`

### Path Aliases

`@/` maps to the project root (e.g., `@/lib/utils`, `@/components/ui/button`).

## Design System
Always read DESIGN.md before making any visual or UI decisions.
All font choices, colors, spacing, and aesthetic direction are defined there.
Do not deviate without explicit user approval.
In QA mode, flag any code that doesn't match DESIGN.md.

## Skill routing

When the user's request matches an available skill, ALWAYS invoke it using the Skill
tool as your FIRST action. Do NOT answer directly, do NOT use other tools first.
The skill has specialized workflows that produce better results than ad-hoc answers.

Key routing rules:
- Product ideas, "is this worth building", brainstorming → invoke office-hours
- Bugs, errors, "why is this broken", 500 errors → invoke investigate
- Ship, deploy, push, create PR → invoke ship
- QA, test the site, find bugs → invoke qa
- Code review, check my diff → invoke review
- Update docs after shipping → invoke document-release
- Weekly retro → invoke retro
- Design system, brand → invoke design-consultation
- Visual audit, design polish → invoke design-review
- Architecture review → invoke plan-eng-review
- Save progress, checkpoint, resume → invoke checkpoint
- Code quality, health check → invoke health
- 修改或產生評鑑範本/評鑑設定（`lib/supplementary-sheets/*`, `lib/ai/evaluation-profiles/*`, `lib/evaluation-tips/*`）→ 先 invoke 對應 facility 的 `*-evaluation` skill（daycare → daycare-evaluation、nursing-home → nursing-home-evaluation、babycare → postpartum-care-evaluation 等），以 skill 所載法規條號/審查方法/附件清單為 SSOT，不得自行編造標準

## graphify

This project has a graphify knowledge graph at graphify-out/.

Rules:
- Before answering architecture or codebase questions, read graphify-out/GRAPH_REPORT.md for god nodes and community structure
- If graphify-out/wiki/index.md exists, navigate it instead of reading raw files
- For cross-module "how does X relate to Y" questions, prefer `graphify query "<question>"`, `graphify path "<A>" "<B>"`, or `graphify explain "<concept>"` over grep — these traverse the graph's EXTRACTED + INFERRED edges instead of scanning files
- After modifying code files in this session, run `graphify update .` to keep the graph current (AST-only, no API cost)
