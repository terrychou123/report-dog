"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

// Google 官方 G logo SVG（無需引入新 dep）
function GoogleGLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09A6.97 6.97 0 0 1 5.47 12c0-.73.13-1.43.36-2.09V7.07H2.18A11 11 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
      />
    </svg>
  );
}

export interface GoogleAuthButtonProps {
  /** 註冊或登入 — 影響成功後的轉址目的與 source 參數 */
  mode: "sign-up" | "login";
  /** 額外 source 追蹤（例如 blog-end-magnet），會帶到 callback 後 */
  source?: string | null;
  /** 額外 slug（例如 blog slug），保留給註冊歸因 */
  slug?: string | null;
  className?: string;
}

export function GoogleAuthButton({ mode, source, slug, className }: GoogleAuthButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setError(null);
    setIsLoading(true);

    try {
      const supabase = createClient();
      const next = mode === "sign-up" ? "/onboarding" : "/report";

      // 把 source / slug 帶進 callback URL，server route handler 會原樣轉到 oauth-success
      const callbackParams = new URLSearchParams({ next });
      if (source) callbackParams.set("source", source);
      if (slug) callbackParams.set("slug", slug);

      // 走 server route handler（exchangeCodeForSession on server, cookies in/out）
      const redirectTo = `${window.location.origin}/auth/oauth-callback?${callbackParams.toString()}`;

      trackEvent("oauth_start", {
        provider: "google",
        mode,
        source: source ?? "direct",
      });

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo,
          queryParams: { prompt: "select_account" },
        },
      });

      if (error) throw error;
      // 成功時瀏覽器會被重導至 Google，下面不會執行；若被瀏覽器封鎖才會走到 catch
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Google 登入失敗，請稍後再試");
      setIsLoading(false);
    }
  };

  return (
    <div className={className}>
      <Button
        type="button"
        variant="outline"
        className="w-full h-11"
        onClick={handleClick}
        disabled={isLoading}
        aria-label={mode === "sign-up" ? "使用 Google 註冊" : "使用 Google 登入"}
      >
        <GoogleGLogo className="h-5 w-5" />
        <span className="ml-2">
          {isLoading
            ? "正在前往 Google…"
            : mode === "sign-up"
              ? "使用 Google 繼續"
              : "使用 Google 登入"}
        </span>
      </Button>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}
