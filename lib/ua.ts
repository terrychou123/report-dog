// 各應用程式內建瀏覽器的 UA 特徵
// FBAN/FBAV/FB_IAB = Facebook App（iOS／Android）
// Instagram        = Instagram in-app browser
// MessengerForiOS  = Facebook Messenger iOS
// Line/            = LINE in-app browser（UA 為 "Line/\d+"）
// MicroMessenger   = WeChat in-app browser

export interface InAppBrowserInfo {
  detected: boolean;
  /** "facebook" | "instagram" | "messenger" | "line" | "wechat" | "" */
  browser: string;
}

export function isInAppBrowser(ua: string | null | undefined): InAppBrowserInfo {
  if (!ua) return { detected: false, browser: "" };
  if (/\b(FBAN|FBAV|FB_IAB)\b/.test(ua)) return { detected: true, browser: "facebook" };
  if (/\bInstagram\b/.test(ua)) return { detected: true, browser: "instagram" };
  if (/\bMessengerForiOS\b/.test(ua)) return { detected: true, browser: "messenger" };
  if (/\bLine\//.test(ua)) return { detected: true, browser: "line" };
  if (/\bMicroMessenger\b/.test(ua)) return { detected: true, browser: "wechat" };
  return { detected: false, browser: "" };
}

// 向下相容 alias — 既有呼叫端無需改動
export function isFacebookWebview(ua: string | null | undefined): boolean {
  return isInAppBrowser(ua).detected;
}
