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

// 已知 bot / uptime monitor UA 片段；facebookexternalhit 是 OG 預覽爬蟲，不計入自訂事件
const BOT_UA_RE =
  /bot|crawler|spider|headlesschrome|phantomjs|slurp|wget|curl|pingdom|uptimerobot|statuscake|facebookexternalhit/i;

function isLikelyBot(): boolean {
  if (typeof navigator === "undefined") return true;
  if (navigator.webdriver) return true; // headless selenium / puppeteer
  return BOT_UA_RE.test(navigator.userAgent ?? "");
}

/** 送出 GA4 自訂事件；SSR、bot UA、localhost、gtag 未載入或拋例外時皆為 no-op */
export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>,
): void {
  if (typeof window === "undefined" || isLikelyBot()) return;
  // localhost 事件不送 prod GA，避免汙染報表
  if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") return;
  if (typeof window.gtag !== "function") return;
  try {
    window.gtag("event", eventName, params);
  } catch {
    // analytics 失敗不應中斷任何使用者流程
  }
}
