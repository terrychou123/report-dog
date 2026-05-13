// FBAN = Facebook App Native（iOS）
// FBAV = Facebook App Version（iOS + Android）
// FB_IAB = Facebook In-App Browser（部分新版 Android）
const FB_WEBVIEW_RE = /\b(FBAN|FBAV|FB_IAB)\b/;

export function isFacebookWebview(ua: string | null | undefined): boolean {
  if (!ua) return false;
  return FB_WEBVIEW_RE.test(ua);
}
