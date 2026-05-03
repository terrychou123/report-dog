// 共用 GA4 事件追蹤工具 — 對應 app/layout.tsx 的 inline gtag 初始化
declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js" | "set",
      action: string,
      params?: Record<string, unknown>,
    ) => void;
  }
}

/** 送出 GA4 自訂事件；SSR、gtag 未載入（廣告攔截器）或 gtag 拋例外時皆為 no-op */
export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>,
): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }
  try {
    window.gtag("event", eventName, params);
  } catch {
    // analytics 失敗不應中斷任何使用者流程
  }
}
