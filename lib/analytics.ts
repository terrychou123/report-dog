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
  /bot|crawler|spider|headlesschrome|phantomjs|slurp|wget|curl|pingdom|uptimerobot|statuscake|facebookexternalhit|yandex|baiduspider|chatgpt-user|google-extended/i;

// 內部後台路徑：這些頁面的活動不應計入 GA 報表
// /protected/* 是付費用戶的 dashboard，必須計入分析；只過濾管理員後台
const INTERNAL_PATH_PREFIXES = ["/admin", "/blog-admin"];

function isLikelyBot(): boolean {
  if (typeof navigator === "undefined") return true;
  if (navigator.webdriver) return true; // headless selenium / puppeteer
  return BOT_UA_RE.test(navigator.userAgent ?? "");
}

function isInternalPath(): boolean {
  if (typeof window === "undefined") return false;
  const path = window.location.pathname;
  return INTERNAL_PATH_PREFIXES.some((prefix) => path.startsWith(prefix));
}

/** 送出 GA4 自訂事件；SSR、bot UA、localhost、內部路徑、gtag 未載入或拋例外時皆為 no-op */
export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>,
): void {
  if (typeof window === "undefined" || isLikelyBot()) return;
  // 非正式網域（localhost / Vercel preview）不送 prod GA，避免汙染報表
  // 注意：用 === 或 .endsWith(".reportwang.com")，避免 evilreportwang.com 誤判通過
  const { hostname } = window.location;
  if (hostname !== "reportwang.com" && !hostname.endsWith(".reportwang.com")) return;
  // 後台路徑不送 GA，避免內部運營活動汙染分析數據
  if (isInternalPath()) return;
  if (typeof window.gtag !== "function") return;
  try {
    window.gtag("event", eventName, params);
  } catch {
    // analytics 失敗不應中斷任何使用者流程
  }
}

// 命名事件 helpers — 統一字串常數，避免分散在各元件造成拼字錯誤

export function trackOnboardingStep(step: string, params?: Record<string, unknown>) {
  trackEvent("onboarding_step", { step, ...params });
}

export function trackFirstReportCreate(source: "template" | "upload" | "manual") {
  trackEvent("first_report_create", { source });
}

export function trackEmptyStateCTA(target: "template_import" | "upload" | "sample") {
  trackEvent("empty_state_cta", { target });
}
