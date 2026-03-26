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
    const token_hash = searchParams.get("token_hash");
    const type = searchParams.get("type") as EmailOtpType | null;
    const rawNext = searchParams.get("next") ?? "/onboarding";
    const next = rawNext.startsWith("/") ? rawNext : "/onboarding";

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

      // Legacy OTP flow: token_hash + type
      if (token_hash && type) {
        const { error } = await supabase.auth.verifyOtp({ type, token_hash });
        if (!error) {
          router.replace(next);
        } else {
          router.replace(`/auth/error?error=${encodeURIComponent(error?.message ?? "驗證失敗")}`);
        }
        return;
      }

      router.replace(`/auth/error?error=${encodeURIComponent("缺少 token hash 或 type 參數")}`);
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
