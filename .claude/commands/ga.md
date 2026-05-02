# GA4 Analytics 快速查詢

使用 analytics-mcp 工具查詢報告汪 (reportwang.com) 的 Google Analytics 4 數據。

GA4 Property ID：請先執行 `get_account_summaries` 取得正確的數字 Property ID。

## 根據 $ARGUMENTS 執行對應查詢：

### traffic — 流量總覽
查詢過去 7 天與 30 天的：
- activeUsers、newUsers、sessions
- bounceRate、averageSessionDuration
- 依 date 維度顯示每日趨勢

### top-pages — 熱門頁面
查詢過去 30 天：
- 依 pagePath 分組，取前 20 筆
- 指標：screenPageViews、averageSessionDuration、bounceRate
- 特別列出 /blog、/school、/docs 子路徑各自的 top 5

### conversion — 註冊漏斗
查詢過去 30 天的轉換路徑：
- 登陸頁 (/) → 定價頁 (/pricing) → 註冊 (/auth/sign-up) → 首次建立報告 (/protected/dashboard)
- 每個步驟的使用者數與轉換率
- 找出流失最嚴重的環節

### sources — 流量來源與關鍵字
查詢過去 30 天：
- 依 sessionSource / sessionMedium 分組的流量來源
- organic search 的 sessionDefaultChannelGroup 佔比
- 推薦來源（referral）前 10 名網站
