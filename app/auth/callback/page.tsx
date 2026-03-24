"use client";

import { createBrowserClient } from "@supabase/ssr";
import { type EmailOtpType } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // Parse hash fragments (e.g. #token_hash=xxx&type=recovery)
    // Supabase sometimes sends auth tokens as URL hash fragments,
    // which are invisible to server-side route handlers.
    const hash = window.location.hash.slice(1);
    if (!hash) {
      router.replace(`/auth/error?error=${encodeURIComponent("缺少驗證參數")}`);
      return;
    }

    const params = new URLSearchParams(hash);
    const token_hash = params.get("token_hash");
    const type = params.get("type") as EmailOtpType | null;
    const access_token = params.get("access_token");
    const refresh_token = params.get("refresh_token");

    if (!token_hash && !access_token) {
      router.replace(`/auth/error?error=${encodeURIComponent("缺少驗證參數")}`);
      return;
    }

    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    const handleAuth = async () => {
      // OTP / magic link via token_hash
      if (token_hash && type) {
        const { error } = await supabase.auth.verifyOtp({ token_hash, type });
        if (error) {
          router.replace(`/auth/error?error=${encodeURIComponent(error.message)}`);
        } else {
          router.replace("/auth/update-password");
        }
        return;
      }

      // Session via access_token + refresh_token (implicit flow fallback)
      if (access_token && refresh_token) {
        const { error } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });
        if (error) {
          router.replace(`/auth/error?error=${encodeURIComponent(error.message)}`);
        } else {
          router.replace("/auth/update-password");
        }
        return;
      }

      router.replace(`/auth/error?error=${encodeURIComponent("缺少 token hash 或 type 參數")}`);
    };

    handleAuth();
  }, [router]);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6">
      <p className="text-sm text-muted-foreground">驗證中，請稍候…</p>
    </div>
  );
}
