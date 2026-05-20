"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, Check, X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { isFacebookWebview } from "@/lib/ua";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "fb-webview-dismissed-at";
const TTL_MS = 24 * 60 * 60 * 1000; // 24 小時
const COPY_FEEDBACK_MS = 2000;
const COPY_DISMISS_MS = 5000; // 複製成功後自動折疊的延遲（ms）
// auth 路徑（登入/註冊/驗證）強制顯示，不允許 dismiss — 驗證信在 webview 無法完成
// 使用精確比對，避免 /auth/sign-up-success 也被誤判為 forceShow
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
  const [copyFailed, setCopyFailed] = useState(false);
  const pathname = usePathname();
  const forceShow = FORCE_SHOW_PATHS.some((p) => pathname === p);

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
    let success = false;
    try {
      await navigator.clipboard.writeText(window.location.href);
      success = true;
    } catch {
      // FB webview 可能封鎖 Clipboard API，改為顯示 URL 讓用戶手動複製
    }
    trackEvent("fb_webview_copy_link", { path: location.pathname, success });
    if (success) {
      setCopied(true);
      // 複製成功後 5 秒自動折疊 banner（forceShow 路徑也適用）
      setTimeout(() => { setCopied(false); setShow(false); }, COPY_DISMISS_MS);
    } else {
      setCopyFailed(true); // 顯示 URL 文字供手動複製
    }
  };

  // client component 在 SSR/prerender 仍執行 render，navigator 不存在時需 guard
  const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
  const steps = isIOS(ua)
    ? "點右上角 ⋯ → 在 Safari 中開啟"
    : "點右上角 ⋮ → 以其他應用程式開啟 → Chrome";

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:bg-amber-950/40 dark:text-amber-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
        <span className="flex-1 leading-snug">
          {forceShow && <AlertTriangle className="mr-1 inline h-4 w-4 shrink-0" />}
          {forceShow
            ? "登入與驗證信在 Facebook 內建瀏覽器中無法正常運作。請改用外部瀏覽器："
            : "你目前在 Facebook 內建瀏覽器中，登入功能可能異常。"}
          <strong className="ml-1">{steps}</strong>
        </span>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            {!copyFailed && (
              <Button size="sm" variant="default" onClick={handleCopyLink} className="whitespace-nowrap" disabled={copied}>
                {copied ? <><Check className="mr-1 inline h-3.5 w-3.5" />已複製，5 秒後關閉</> : "複製連結"}
              </Button>
            )}
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
          {/* 剪貼簿 API 被封鎖時顯示 URL 供手動複製 */}
          {copyFailed && (
            <div className="text-xs">
              <p className="mb-0.5 opacity-70">剪貼簿存取失敗，請長按以下網址手動複製：</p>
              <span className="select-all break-all font-mono text-amber-800 dark:text-amber-200">
                {typeof window !== "undefined" ? window.location.href : ""}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
