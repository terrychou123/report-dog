"use client";

import { createClient } from "@/lib/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import { MailCheckIcon } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const RESEND_COOLDOWN = 60;

function SignUpSuccessInner() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  const [resendState, setResendState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleResend = async () => {
    if (!email || cooldown > 0) return;
    setResendState("sending");
    setErrorMsg(null);

    const supabase = createClient();
    const { data, error } = await supabase.auth.resend({
      type: "signup",
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/email-callback?next=/onboarding`,
      },
    });

    // 診斷 log：確認 Supabase 回應（在 browser devtools 可見）
    console.log("[resend-verification]", { data, error, email });

    if (error) {
      setResendState("error");
      // 常見情況：Supabase 每分鐘僅允許寄一封；rate limit 訊息翻譯為友善中文
      const isRateLimit =
        error.message.toLowerCase().includes("security purposes") ||
        error.message.toLowerCase().includes("60 seconds") ||
        error.status === 429;
      setErrorMsg(isRateLimit ? "請稍候 60 秒後再重寄" : error.message);
      trackEvent("cta_click", { source: "resend-verification-error" });
    } else {
      setResendState("sent");
      setCooldown(RESEND_COOLDOWN);
      trackEvent("cta_click", { source: "resend-verification" });
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-2">
                <MailCheckIcon className="h-10 w-10 text-primary opacity-80" />
              </div>
              <CardTitle className="text-2xl">驗證信已寄出</CardTitle>
              <CardDescription>請前往信箱完成驗證以啟用帳號</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              {email && (
                <div className="rounded-md bg-muted px-4 py-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">驗證信已寄至</p>
                  <p className="font-mono text-sm font-semibold break-all">{email}</p>
                </div>
              )}

              <ol className="text-sm text-muted-foreground space-y-1.5 list-decimal list-inside">
                <li>前往上方信箱收信</li>
                <li>開啟主旨含「<strong className="text-foreground">報告汪</strong>」的確認信</li>
                <li>點擊「<strong className="text-foreground">啟用帳號</strong>」按鈕，在開啟的頁面再次確認啟用</li>
              </ol>

              <p className="text-xs text-muted-foreground">
                通常 1 分鐘內送達。若沒收到，請檢查<strong>垃圾郵件</strong>或<strong>促銷</strong>資料夾。
              </p>

              <div className="border-t pt-4 flex flex-col gap-3">
                {resendState === "sent" ? (
                  <div className="flex flex-col gap-1.5 text-center">
                    <p className="text-sm text-green-600 font-medium">
                      ✓ 驗證信已重寄{cooldown > 0 ? `（${cooldown} 秒後可再次重寄）` : ""}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      請等 1-2 分鐘並查看<strong>垃圾郵件</strong>或<strong>促銷</strong>資料夾
                    </p>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleResend}
                    disabled={resendState === "sending" || cooldown > 0 || !email}
                  >
                    {resendState === "sending"
                      ? "寄送中…"
                      : cooldown > 0
                      ? `重寄驗證信（${cooldown}s）`
                      : "沒收到信？重寄驗證信"}
                  </Button>
                )}
                {resendState === "error" && errorMsg && (
                  <p className="text-xs text-red-500 text-center">{errorMsg}</p>
                )}
              </div>

              <div className="flex flex-col gap-2 text-center text-xs text-muted-foreground">
                <Link
                  href="/auth/sign-up"
                  className="underline underline-offset-4 hover:text-foreground"
                >
                  使用不同 Email 重新註冊
                </Link>
                <Link
                  href="/auth/login"
                  className="underline underline-offset-4 hover:text-foreground"
                >
                  已驗證完成？前往登入
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-svh w-full items-center justify-center p-6">
          <p className="text-sm text-muted-foreground">載入中…</p>
        </div>
      }
    >
      <SignUpSuccessInner />
    </Suspense>
  );
}
