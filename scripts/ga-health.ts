/**
 * GA4 Realtime 健康檢查 — 確認 GA 真的在收資料
 *
 * 使用方式：
 *   npx tsx scripts/ga-health.ts
 *   GA_PROPERTY_ID=532405604 npx tsx scripts/ga-health.ts
 *
 * 認證：Service Account（~/.config/gcloud/reportwang-ga-sa.json）
 *   - SA 需已在 GA4 property 有 Viewer 以上權限
 *   - 若要授權 SA：python3 scripts/grant-sa-ga4-access.py
 */

import { google } from "googleapis";
import path from "path";
import os from "os";

const SA_KEY_PATH = path.join(os.homedir(), ".config", "gcloud", "reportwang-ga-sa.json");
const PROPERTY_ID = process.env.GA_PROPERTY_ID ?? "532405604";
const PROPERTY = `properties/${PROPERTY_ID}`;

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: SA_KEY_PATH,
    scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
  });

  const analyticsdata = google.analyticsdata({ version: "v1beta", auth });

  const res = await analyticsdata.properties.runRealtimeReport({
    property: PROPERTY,
    requestBody: {
      dimensions: [{ name: "unifiedScreenName" }],
      metrics: [{ name: "activeUsers" }, { name: "screenPageViews" }],
      limit: 10,
    },
  });

  const rows = res.data.rows ?? [];
  const totalActiveUsers = rows.reduce(
    (sum, r) => sum + parseInt(r.metricValues?.[0]?.value ?? "0", 10),
    0
  );
  const totalPageViews = rows.reduce(
    (sum, r) => sum + parseInt(r.metricValues?.[1]?.value ?? "0", 10),
    0
  );

  const output = {
    report: "ga-realtime-health",
    property: PROPERTY,
    active_pages: rows.length,
    total_active_users: totalActiveUsers,
    total_page_views: totalPageViews,
    top_pages: rows.map((r) => ({
      page: r.dimensionValues?.[0]?.value,
      active_users: parseInt(r.metricValues?.[0]?.value ?? "0", 10),
      page_views: parseInt(r.metricValues?.[1]?.value ?? "0", 10),
    })),
  };

  console.log(JSON.stringify(output, null, 2));
}

main().catch((e) => {
  console.error("GA health check 失敗：", e.message ?? e);
  process.exit(1);
});
