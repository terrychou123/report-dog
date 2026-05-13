"use client";

import { createClient } from "@/lib/supabase/client";
import { trackEvent } from "@/lib/analytics";
import { type EmailOtpType } from "@supabase/supabase-js";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function ConfirmPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 解析所有可能的驗證參數（query + hash）
  const params = useMemo(() => {
    const code = searchParams.get("code");
    const rawNext = searchParams.get("next") ?? "/onboarding";
    const next = rawNext.startsWith("/") ? rawNext : "/onboarding";

    // hash fragments：recovery 與 magic link implicit flow 會用 #access_token=...&type=recovery
    const hash = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    const hashParams = new URLSearchParams(hash);

    const token_hash = searchParams.get("token_hash") ?? hashParams.get("token_hash");
    const type = (searchParams.get("type") ?? hashParams.get("type")) as EmailOtpType | null;
    const access_token = hashParams.get("access_token");
    const refresh_token = hashParams.get("refresh_token");
    const isSignupType = type === "signup";
    const flowParam = (next === "/onboarding" || isSignupType) ? "&flow=signup" : "";

    return { code, next, token_hash, type, access_token, refresh_token, isSignupType, flowParam };
  }, [searchParams]);

  const [isVerifying, setIsVerifying] = useState(false);
  const [manualError, setManualError] = useState<string | null>(null);

  // 驗證成功後共用副作用：sign_up_complete + 電子報訂閱
  // 註：OAuth code 不再經過這頁（改走 /auth/oauth-callback server handler），這裡只處理 email 驗證流程
  const fireSignUpSideEffects = async () => {
    // next=/onboarding 是註冊表單專屬導向；type=recovery 與 type=email 不觸發
    if (params.next === "/onboarding" || params.isSignupType) {
      trackEvent("sign_up_complete", { method: "email" });
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 8000);
      try {
        const res = await fetch("/api/auth/post-signup", { method: "POST", signal: ctrl.signal });
        clearTimeout(timer);
        if (res.ok) {
          const data = await res.json();
          if (!data.skipped) {
            trackEvent("newsletter_subscribe", { method: "signup" });
          }
        }
      } catch {
        clearTimeout(timer);
      }
    }
  };

  // token_hash 流程：改為手動點擊才呼叫 verifyOtp，避免 email scanner 預先消耗 OTP
  const handleManualVerify = async () => {
    if (!params.token_hash || !params.type) return;
    setIsVerifying(true);
    setManualError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.verifyOtp({
      type: params.type,
      token_hash: params.token_hash,
    });
    if (!error) {
      await fireSignUpSideEffects();
      router.replace(params.next);
    } else {
      trackEvent("verify_error", {
        flow: params.flowParam ? "signup" : "other",
        reason: error.message,
      });
      setManualError(error.message);
      setIsVerifying(false);
    }
  };

  // 其他流程（PKCE code、hash session）維持 auto-verify
  useEffect(() => {
    // token_hash flow 改為手動點擊，不在此自動驗證
    if (params.token_hash && params.type) return;

    const supabase = createClient();

    const run = async () => {
      // PKCE flow: exchange code using browser client（需要 localStorage code_verifier）
      // 註：Google OAuth 已改走 /auth/oauth-callback server handler，此分支只剩 email PKCE confirmation
      if (params.code) {
        const { error } = await supabase.auth.exchangeCodeForSession(params.code);
        if (!error) {
          await fireSignUpSideEffects();
          router.replace(params.next);
        } else {
          trackEvent("verify_error", {
            flow: params.flowParam ? "signup" : "other",
            reason: error.message,
          });
          router.replace(`/auth/error?error=${encodeURIComponent(error.message)}${params.flowParam}`);
        }
        return;
      }

      // Session via hash fragments（recovery / magic link implicit flow）
      if (params.access_token && params.refresh_token) {
        const { error } = await supabase.auth.setSession({
          access_token: params.access_token,
          refresh_token: params.refresh_token,
        });
        if (!error) {
          await fireSignUpSideEffects();
          router.replace(params.next);
        } else {
          trackEvent("verify_error", {
            flow: params.flowParam ? "signup" : "other",
            reason: error.message,
          });
          router.replace(`/auth/error?error=${encodeURIComponent(error.message)}${params.flowParam}`);
        }
        return;
      }

      router.replace(`/auth/error?error=${encodeURIComponent("缺少驗證參數，請重新申請密碼重設連結")}`);
    };

    run();
    // fireSignUpSideEffects 是 closure，依賴已在 params 中
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, router]);

  // token_hash flow：顯示手動確認按鈕（防 email scanner 預先消耗 token）
  if (params.token_hash && params.type) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">啟用您的帳號</CardTitle>
              <CardDescription>
                點擊下方按鈕完成信箱驗證，即可進入報告汪。
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Button
                onClick={handleManualVerify}
                disabled={isVerifying}
                className="w-full"
              >
                {isVerifying ? "驗證中…" : "啟用帳號"}
              </Button>
              {manualError && (
                <p className="text-sm text-red-500">{manualError}</p>
              )}
              <p className="text-xs text-muted-foreground">
                為確保安全，需要您親自點擊以完成驗證。
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6">
      <p className="text-sm text-muted-foreground">驗證中，請稍候…</p>
    </div>
  );
}

export default function ConfirmPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-svh w-full items-center justify-center p-6">
          <p className="text-sm text-muted-foreground">驗證中，請稍候…</p>
        </div>
      }
    >
      <ConfirmPageInner />
    </Suspense>
  );
}
