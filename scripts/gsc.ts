/**
 * GSC CLI 查詢工具 — 讓 Claude Code 直接撈 Google Search Console 數據
 *
 * 使用方式：
 *   npx tsx scripts/gsc.ts --report=top-queries --days=28 --limit=20
 *   npx tsx scripts/gsc.ts --report=top-pages   --days=28 --limit=20
 *   npx tsx scripts/gsc.ts --report=low-ctr     --days=28 --limit=30
 *   npx tsx scripts/gsc.ts --report=by-page --page="https://reportwang.com/blog/foo" --days=90
 *   npx tsx scripts/gsc.ts --report=sitemap-status
 *
 * 認證：OAuth Desktop（GSC UI 拒絕 Service Account email，所以走 OAuth）
 *   - OAuth client：~/.config/gcloud/reportwang-oauth-desktop.json
 *   - Refresh token 快取：~/.config/gcloud/reportwang-gsc-token.json
 *   - 首次跑會開瀏覽器要求授權，之後免互動
 */

import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import fs from "fs";
import path from "path";
import os from "os";
import http from "http";
import type { AddressInfo } from "net";

// ── 設定 ──────────────────────────────────────────────────────────────────
const OAUTH_CLIENT_PATH = path.join(os.homedir(), ".config", "gcloud", "reportwang-oauth-desktop.json");
const TOKEN_CACHE_PATH = path.join(os.homedir(), ".config", "gcloud", "reportwang-gsc-token.json");
const SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"];

// ── CLI 引數解析 ──────────────────────────────────────────────────────────
const args = Object.fromEntries(
  process.argv
    .slice(2)
    .filter((a) => a.startsWith("--"))
    .map((a) => {
      const [k, ...rest] = a.slice(2).split("=");
      return [k, rest.join("=") || "true"];
    })
);

// --site 優先，其次 GSC_SITE env，最後預設 Domain property
const SITE = (args.site as string) ?? process.env.GSC_SITE ?? "sc-domain:reportwang.com";
const report = (args.report as string) ?? "top-queries";
const days = parseInt((args.days as string) ?? "28", 10);
const limit = parseInt((args.limit as string) ?? "25", 10);
const pageFilter = (args.page as string) ?? null;

// 排序欄位（API 不傳 orderBy；多撈一些後本地排序，避免 googleapis 型別漏 orderBy 的問題）
type Row = {
  rank: number;
  query?: string | null;
  page?: string | null;
  clicks?: number | null;
  impressions?: number | null;
  ctr: string;
  position?: string;
};

// ── 日期工具 ──────────────────────────────────────────────────────────────
function dateRange(daysBack: number): { startDate: string; endDate: string } {
  const end = new Date();
  end.setDate(end.getDate() - 3); // GSC 數據有 ~3 天延遲
  const start = new Date(end);
  start.setDate(start.getDate() - (daysBack - 1));
  return {
    startDate: start.toISOString().slice(0, 10),
    endDate: end.toISOString().slice(0, 10),
  };
}

// ── OAuth 認證 ────────────────────────────────────────────────────────────
async function authorize(): Promise<OAuth2Client> {
  if (!fs.existsSync(OAUTH_CLIENT_PATH)) {
    throw new Error(`找不到 OAuth client JSON：${OAUTH_CLIENT_PATH}`);
  }
  const clientJson = JSON.parse(fs.readFileSync(OAUTH_CLIENT_PATH, "utf8"));
  const installed = clientJson.installed ?? clientJson.web;
  if (!installed?.client_id || !installed?.client_secret) {
    throw new Error("OAuth client JSON 格式錯誤（缺 client_id / client_secret）");
  }
  const { client_id, client_secret } = installed;

  // 嘗試重用快取的 refresh token
  if (fs.existsSync(TOKEN_CACHE_PATH)) {
    const tokens = JSON.parse(fs.readFileSync(TOKEN_CACHE_PATH, "utf8"));
    const oauth2 = new OAuth2Client(client_id, client_secret);
    oauth2.setCredentials(tokens);
    // 自動把刷新後的 token 寫回快取
    oauth2.on("tokens", (newTokens) => {
      const merged = { ...tokens, ...newTokens };
      fs.writeFileSync(TOKEN_CACHE_PATH, JSON.stringify(merged, null, 2), { mode: 0o600 });
    });
    return oauth2;
  }

  // 首次：跑 Desktop OAuth flow（開瀏覽器、本地伺服器接 callback）
  return new Promise<OAuth2Client>((resolve, reject) => {
    const done = (val: OAuth2Client) => { clearTimeout(timer); resolve(val); };
    const fail = (e: unknown) => { clearTimeout(timer); reject(e); };
    const timer: ReturnType<typeof setTimeout> = setTimeout(() => fail(new Error("OAuth 流程逾時（5 分鐘）")), 5 * 60 * 1000);

    const server = http.createServer(async (req, res) => {
      try {
        const u = new URL(req.url ?? "/", "http://localhost");
        const code = u.searchParams.get("code");
        if (!code) {
          res.end();
          return;
        }
        const port = (server.address() as AddressInfo).port;
        const oauth2 = new OAuth2Client(client_id, client_secret, `http://localhost:${port}`);
        const { tokens } = await oauth2.getToken(code);
        oauth2.setCredentials(tokens);
        fs.mkdirSync(path.dirname(TOKEN_CACHE_PATH), { recursive: true });
        fs.writeFileSync(TOKEN_CACHE_PATH, JSON.stringify(tokens, null, 2), { mode: 0o600 });
        res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("✓ 授權完成，可關閉此分頁回到 terminal");
        server.close();
        console.error(`✓ Refresh token 已快取至 ${TOKEN_CACHE_PATH}`);
        done(oauth2);
      } catch (e) {
        res.writeHead(500);
        res.end(String(e));
        fail(e);
      }
    });
    server.listen(0, () => {
      const port = (server.address() as AddressInfo).port;
      const oauth2 = new OAuth2Client(client_id, client_secret, `http://localhost:${port}`);
      const authUrl = oauth2.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
        prompt: "consent", // 強制回傳 refresh_token
      });
      console.error("\n首次授權：請在瀏覽器打開以下網址並完成授權：\n");
      console.error(authUrl);
      console.error("\n等待 Google 重導回 localhost...\n");
    });
  });
}

// ── 報表：top-queries（按曝光排序）────────────────────────────────────────
async function topQueries(sc: ReturnType<typeof google.searchconsole>) {
  const { startDate, endDate } = dateRange(days);
  const res = await sc.searchanalytics.query({
    siteUrl: SITE,
    requestBody: {
      startDate,
      endDate,
      dimensions: ["query"],
      rowLimit: Math.max(limit * 4, 200),
    },
  });
  const sorted = (res.data.rows ?? [])
    .sort((a, b) => (b.impressions ?? 0) - (a.impressions ?? 0))
    .slice(0, limit);
  return {
    report: "top-queries",
    period: `${startDate} ~ ${endDate}`,
    rows: sorted.map((r, i): Row => ({
      rank: i + 1,
      query: r.keys?.[0],
      clicks: r.clicks,
      impressions: r.impressions,
      ctr: `${((r.ctr ?? 0) * 100).toFixed(2)}%`,
      position: r.position?.toFixed(1),
    })),
  };
}

// ── 報表：top-pages（按點擊排序）──────────────────────────────────────────
async function topPages(sc: ReturnType<typeof google.searchconsole>) {
  const { startDate, endDate } = dateRange(days);
  const res = await sc.searchanalytics.query({
    siteUrl: SITE,
    requestBody: {
      startDate,
      endDate,
      dimensions: ["page"],
      rowLimit: Math.max(limit * 4, 200),
    },
  });
  const sorted = (res.data.rows ?? [])
    .sort((a, b) => (b.clicks ?? 0) - (a.clicks ?? 0))
    .slice(0, limit);
  return {
    report: "top-pages",
    period: `${startDate} ~ ${endDate}`,
    rows: sorted.map((r, i): Row => ({
      rank: i + 1,
      page: r.keys?.[0],
      clicks: r.clicks,
      impressions: r.impressions,
      ctr: `${((r.ctr ?? 0) * 100).toFixed(2)}%`,
      position: r.position?.toFixed(1),
    })),
  };
}

// ── 報表：low-ctr（高曝光低 CTR — SEO 優化金礦）────────────────────────
async function lowCtr(sc: ReturnType<typeof google.searchconsole>) {
  const { startDate, endDate } = dateRange(days);
  const res = await sc.searchanalytics.query({
    siteUrl: SITE,
    requestBody: {
      startDate,
      endDate,
      dimensions: ["page"],
      rowLimit: 500, // 先撈多一點，再本地過濾
    },
  });
  const rows = (res.data.rows ?? [])
    .filter((r) => (r.impressions ?? 0) >= 100 && (r.ctr ?? 0) < 0.03)
    .sort((a, b) => (b.impressions ?? 0) - (a.impressions ?? 0))
    .slice(0, limit);
  return {
    report: "low-ctr",
    description: "曝光 ≥ 100 且 CTR < 3%（優化 title/description 可提升點擊）",
    period: `${startDate} ~ ${endDate}`,
    rows: rows.map((r, i): Row => ({
      rank: i + 1,
      page: r.keys?.[0],
      clicks: r.clicks,
      impressions: r.impressions,
      ctr: `${((r.ctr ?? 0) * 100).toFixed(2)}%`,
      position: r.position?.toFixed(1),
    })),
  };
}

// ── 報表：by-page（特定頁面的所有 query）────────────────────────────────
async function byPage(sc: ReturnType<typeof google.searchconsole>) {
  if (!pageFilter) {
    return { error: '缺少 --page 參數，例如 --page="https://reportwang.com/blog/foo"' };
  }
  const { startDate, endDate } = dateRange(days);
  const res = await sc.searchanalytics.query({
    siteUrl: SITE,
    requestBody: {
      startDate,
      endDate,
      dimensions: ["query"],
      dimensionFilterGroups: [
        {
          filters: [
            { dimension: "page", operator: "equals", expression: pageFilter },
          ],
        },
      ],
      rowLimit: Math.max(limit * 4, 200),
    },
  });
  const sorted = (res.data.rows ?? [])
    .sort((a, b) => (b.impressions ?? 0) - (a.impressions ?? 0))
    .slice(0, limit);
  return {
    report: "by-page",
    page: pageFilter,
    period: `${startDate} ~ ${endDate}`,
    rows: sorted.map((r, i): Row => ({
      rank: i + 1,
      query: r.keys?.[0],
      clicks: r.clicks,
      impressions: r.impressions,
      ctr: `${((r.ctr ?? 0) * 100).toFixed(2)}%`,
      position: r.position?.toFixed(1),
    })),
  };
}

// ── 報表：sitemap-status ──────────────────────────────────────────────────
async function sitemapStatus(sc: ReturnType<typeof google.searchconsole>) {
  const res = await sc.sitemaps.list({ siteUrl: SITE });
  return {
    report: "sitemap-status",
    sitemaps: (res.data.sitemap ?? []).map((s) => ({
      path: s.path,
      lastSubmitted: s.lastSubmitted,
      lastDownloaded: s.lastDownloaded,
      isPending: s.isPending,
      isSitemapsIndex: s.isSitemapsIndex,
      warnings: s.warnings,
      errors: s.errors,
      contents: s.contents?.map((c) => ({
        type: c.type,
        submitted: c.submitted,
        indexed: c.indexed,
      })),
    })),
  };
}

// ── 主程式 ────────────────────────────────────────────────────────────────
async function main() {
  let auth: OAuth2Client;
  try {
    auth = await authorize();
  } catch (e) {
    console.error(JSON.stringify({ error: "OAuth 認證失敗", detail: String(e) }, null, 2));
    process.exit(1);
  }

  const sc = google.searchconsole({ version: "v1", auth });

  let result: unknown;
  try {
    switch (report) {
      case "top-queries":    result = await topQueries(sc); break;
      case "top-pages":      result = await topPages(sc); break;
      case "low-ctr":        result = await lowCtr(sc); break;
      case "by-page":        result = await byPage(sc); break;
      case "sitemap-status": result = await sitemapStatus(sc); break;
      default:
        result = {
          error: `未知 report 類型: ${report}`,
          available: ["top-queries", "top-pages", "low-ctr", "by-page", "sitemap-status"],
        };
    }
  } catch (e: unknown) {
    const err = e as { code?: number; message?: string };
    result = {
      error: err?.message ?? String(e),
      code: err?.code,
      hint:
        err?.code === 403
          ? "你的 Google 帳號不是 reportwang.com 的 GSC owner，或 Search Console API 在這個 OAuth client 的 GCP project 未啟用"
          : err?.code === 401
          ? "Token 失效，刪除 ~/.config/gcloud/reportwang-gsc-token.json 後重跑"
          : undefined,
    };
  }

  console.log(JSON.stringify(result, null, 2));
}

main();
