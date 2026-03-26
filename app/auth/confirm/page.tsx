"use client";

import { createClient } from "@/lib/supabase/client";
import { type EmailOtpType } from "@supabase/supabase-js";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

function ConfirmPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    const rawNext = searchParams.get("next") ?? "/onboarding";
    const next = rawNext.startsWith("/") ? rawNext : "/onboarding";

    // Also parse hash fragments — Supabase recovery flow redirects with
    // #access_token=...&refresh_token=...&type=recovery as hash fragments
    const hash = window.location.hash.slice(1);
    const hashParams = new URLSearchParams(hash);

    // Merge: check query params first, then hash fragments
    const token_hash =
      searchParams.get("token_hash") ?? hashParams.get("token_hash");
    const type = (searchParams.get("type") ?? hashParams.get("type")) as
      | EmailOtpType
      | null;
    const access_token = hashParams.get("access_token");
    const refresh_token = hashParams.get("refresh_token");

    const supabase = createClient();

    const handleAuth = async () => {
      // PKCE flow: exchange code using browser client (has access to localStorage code_verifier)
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) {
          router.replace(next);
        } else {
          router.replace(`/auth/error?error=${encodeURIComponent(error.message)}`);
        }
        return;
      }

      // Session via hash fragments (recovery/magic link implicit flow)
      if (access_token && refresh_token) {
        const { error } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });
        if (!error) {
          router.replace(next);
        } else {
          router.replace(`/auth/error?error=${encodeURIComponent(error.message)}`);
        }
        return;
      }

      // OTP flow: token_hash + type
      if (token_hash && type) {
        const { error } = await supabase.auth.verifyOtp({ type, token_hash });
        if (!error) {
          router.replace(next);
        } else {
          router.replace(`/auth/error?error=${encodeURIComponent(error?.message ?? "驗證失敗")}`);
        }
        return;
      }

      router.replace(`/auth/error?error=${encodeURIComponent("缺少驗證參數，請重新申請密碼重設連結")}`);
    };

    handleAuth();
  }, [router, searchParams]);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6">
      <p className="text-sm text-muted-foreground">驗證中，請稍候…</p>
    </div>
  );
}

// useSearchParams requires a Suspense boundary in Next.js App Router
import { Suspense } from "react";

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
