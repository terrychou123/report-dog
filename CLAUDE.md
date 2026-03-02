# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm start        # Start production server
```

No test framework is configured in this project.

## Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

Optional:
```
OPENROUTER_API_KEY=   # For AI features (Claude via OpenRouter)
```

Note: Both `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (new) and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (legacy) are supported.

## Architecture

**Stack:** Next.js 15 App Router + React 19 + TypeScript + Supabase + Tailwind CSS + shadcn/ui

### Supabase Client Pattern

Two separate clients must be used depending on context:

**Browser (client components):** `lib/supabase/client.ts` — uses `createBrowserClient`

**Server (server components, route handlers, server actions):** `lib/supabase/server.ts` — uses `createServerClient` with Next.js `cookies()`

Never create a singleton Supabase client at module scope — always create per-request (important for Vercel Fluid compute compatibility).

### Middleware & Session Management

`proxy.ts` (root) re-exports from `lib/supabase/proxy.ts`. This middleware runs on every request to refresh the auth session via `auth.getClaims()`. This **must** be called before any server-side Supabase operations to prevent random session logouts. The middleware redirects unauthenticated users from `/protected/*` to `/auth/login`.

### Route Structure

- `/` — Public landing page
- `/auth/*` — Auth pages (login, sign-up, forgot-password, update-password, confirm, error)
- `/protected` — Authenticated-only routes; middleware enforces this

### Component Conventions

- Default to **server components**; add `"use client"` only when needed (forms, theme switcher, logout button)
- Auth form components live in `components/` and are client components with server actions
- UI primitives from shadcn/ui live in `components/ui/` — add new ones with `npx shadcn@latest add <component>`

### Styling

- Tailwind CSS with CSS variables for theming (defined in `app/globals.css`)
- Dark mode via `class` strategy with `next-themes`
- Use the `cn()` helper from `lib/utils.ts` (wraps `clsx` + `tailwind-merge`) for conditional classes
- shadcn/ui style: `new-york`

### Path Aliases

`@/` maps to the project root (e.g., `@/lib/utils`, `@/components/ui/button`).
