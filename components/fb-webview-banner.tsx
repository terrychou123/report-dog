"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { isFacebookWebview } from "@/lib/ua";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "fb-webview-dismissed-at";
const TTL_MS = 24 * 60 * 60 * 1000; // 24 小時
// auth 路徑（登入/註冊/驗證）強制顯示，不允許 dismiss — 驗證信在 webview 無法完成
const FORCE_SHOW_PATHS = ["/auth/sign-up", "/auth/login", "/auth/confirm"];

function isDismissed(): boolean {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const ts = parseInt(raw, 10);
    return Number.isFinite(ts) && Date.now() - ts < TTL_MS;
  } catch {
    return false;
  }
}

// 偵測 iOS（FBAN UA 包含 iPhone/iPad）
function isIOS(ua: string): boolean {
  return /iPhone|iPad|iPod/.test(ua);
}

export function FbWebviewBanner() {
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);
  const pathname = usePathname();
  const forceShow = FORCE_SHOW_PATHS.some((p) => pathname.startsWith(p));

  useEffect(() => {
    if (!isFacebookWebview(navigator.userAgent)) return;
    // 偵測到就打點，與是否已 dismiss 無關（量化 FB webview 流量）
    trackEvent("fb_webview_detected", { path: location.pathname });
    if (forceShow || !isDismissed()) setShow(true);
  }, [forceShow]);

  if (!show) return null;

  const handleDismiss = () => {
    if (forceShow) return; // auth 路徑不允許 dismiss
    try {
      window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      // 無痕模式下 localStorage 可能被擋，靜默處理
    }
    setShow(false);
  };

  const handleCopyLink = async () => {
    await navigator.clipboard?.writeText(window.location.href).catch(() => {});
    setCopied(true);
    trackEvent("fb_webview_copy_link", { path: location.pathname });
    setTimeout(() => setCopied(false), 2000);
  };

  const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
  const steps = isIOS(ua)
    ? "點右上角 ⋯ → 在 Safari 中開啟"
    : "點右上角 ⋮ → 以其他應用程式開啟 → Chrome";

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:bg-amber-950/40 dark:text-amber-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
        <span className="flex-1 leading-snug">
          {forceShow
            ? "⚠️ 登入與驗證信在 Facebook 內建瀏覽器中無法正常運作。請改用外部瀏覽器："
            : "你目前在 Facebook 內建瀏覽器中，登入功能可能異常。"}
          <strong className="ml-1">{steps}</strong>
        </span>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="default" onClick={handleCopyLink} className="whitespace-nowrap">
            {copied ? "已複製 ✓" : "複製連結"}
          </Button>
          {!forceShow && (
            <button
              onClick={handleDismiss}
              aria-label="關閉提示"
              className="rounded p-1 hover:bg-amber-100 dark:hover:bg-amber-900/50"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
