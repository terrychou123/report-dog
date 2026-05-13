"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { isFacebookWebview } from "@/lib/ua";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "fb-webview-dismissed-at";
const TTL_MS = 24 * 60 * 60 * 1000; // 24 小時

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

export function FbWebviewBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!isFacebookWebview(navigator.userAgent)) return;
    // 偵測到就打點，與是否已 dismiss 無關（量化 FB webview 流量）
    trackEvent("fb_webview_detected", { path: location.pathname });
    if (!isDismissed()) setShow(true);
  }, []);

  if (!show) return null;

  const handleDismiss = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      // 無痕模式下 localStorage 可能被擋，靜默處理
    }
    setShow(false);
  };

  const handleOpenInBrowser = () => {
    // best-effort 複製目前 URL，讓使用者可貼到 Safari / Chrome
    navigator.clipboard?.writeText(window.location.href).catch(() => {});
    handleDismiss();
  };

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-amber-50 px-4 py-2 text-sm text-amber-900 dark:bg-amber-950/40 dark:text-amber-100">
      <div className="mx-auto flex max-w-5xl items-center gap-3">
        <span className="flex-1">
          你目前在 Facebook 內建瀏覽器中，登入與部分功能可能異常。建議點右上角 ⋯ 改用 Safari / Chrome 開啟。
        </span>
        <Button size="sm" variant="default" onClick={handleOpenInBrowser}>
          用瀏覽器開啟
        </Button>
        <button
          onClick={handleDismiss}
          aria-label="關閉提示"
          className="rounded p-1 hover:bg-amber-100 dark:hover:bg-amber-900/50"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
