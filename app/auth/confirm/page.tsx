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
import { ResendVerificationForm } from "@/components/auth/resend-verification-form";

// 把 Supabase verifyOtp 的錯誤訊息翻成繁中 + 判斷是否為「過期/已使用」型錯誤
function classifyVerifyError(message: string): { friendly: string; expired: boolean } {
  const lower = message.toLowerCase();
  if (lower.includes("expired") || lower.includes("invalid") || lower.includes("already been used")) {
    return { friendly: "驗證連結已失效或已被使用過，請重新申請新的驗證信", expired: true };
  }
  return { friendly: message, expired: false };
}

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

    // 過期連結直接落地的 error 參數（Supabase 重導後附在 query 上）
    const errorCode = searchParams.get("error_code") ?? null;
    const errorDescription = searchParams.get("error_description") ?? null;

    return { code, next, token_hash, type, access_token, refresh_token, isSignupType, flowParam, errorCode, errorDescription };
  }, [searchParams]);

  const [isVerifying, setIsVerifying] = useState(false);
  const [manualError, setManualError] = useState<string | null>(null);
  const [errorExpired, setErrorExpired] = useState(false);

  // 驗證成功後共用副作用：sign_up_complete + 電子報訂閱
  // 註：OAuth code 不再經過這頁（改走 /auth/oauth-callback server handler），這裡只處理 email 驗證流程
  const fireSignUpSideEffects = async () => {
    // next=/onboarding 是註冊表單專屬導向；type=recovery 與 type=email 不觸發
    if (params.next === "/onboarding" || params.isSignupType) {
      trackEvent("sign_up_complete", { method: "email" });
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 8000);
      try {
        await fetch("/api/auth/post-signup", { method: "POST", signal: ctrl.signal });
        clearTimeout(timer);
        // newsletter_subscribe 事件僅由使用者主動訂閱觸發（footer/blog-inline），signup 自動訂閱不計入，
        // 故 response body 無需讀取
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
      const { friendly, expired } = classifyVerifyError(error.message);
      trackEvent("verify_error", {
        flow: params.flowParam ? "signup" : "other",
        reason: error.message,
      });
      setManualError(friendly);
      setErrorExpired(expired);
      setIsVerifying(false);
    }
  };

  // hash session 流程（recovery / magic link implicit flow）auto-verify
  useEffect(() => {
    // 過期連結直接落地：Supabase 把 error_code 附在 query，直接顯示重寄表單不跳轉
    if (params.errorCode) {
      setErrorExpired(true);
      setManualError(params.errorDescription ?? "驗證連結已失效，請重新申請新的驗證信");
      trackEvent("verify_error", {
        flow: params.flowParam ? "signup" : "other",
        reason: params.errorCode,
      });
      return;
    }

    // token_hash flow 改為手動點擊，不在此自動驗證
    if (params.token_hash && params.type) return;

    const supabase = createClient();

    const run = async () => {
      // 註：PKCE code 流程已移至 /auth/callback server route handler，
      // 此頁面不再處理 code 參數，避免 localStorage code_verifier 跨裝置失效問題。

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

  // error_code 直接落地流程（如 otp_expired）：跳過驗證，直接顯示重寄表單
  if (params.errorCode && errorExpired) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">連結已失效</CardTitle>
              <CardDescription>輸入註冊時的 Email，我們會立刻寄出新的驗證信。</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {manualError && <p className="text-sm text-red-500">{manualError}</p>}
              <ResendVerificationForm source="confirm_error" next={params.next} />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // token_hash flow：顯示手動確認按鈕（防 email scanner 預先消耗 token）
  if (params.token_hash && params.type) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                {errorExpired ? "連結已失效" : "啟用您的帳號"}
              </CardTitle>
              <CardDescription>
                {errorExpired
                  ? "輸入註冊時的 Email，我們會立刻寄出新的驗證信。"
                  : "點擊下方按鈕完成信箱驗證，即可進入報告汪。"}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {!errorExpired && (
                <>
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
                </>
              )}

              {errorExpired && (
                <>
                  <p className="text-sm text-red-500">{manualError}</p>
                  <ResendVerificationForm source="confirm_error" next={params.next} />
                </>
              )}
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
