"use client";

import { createClient } from "@/lib/supabase/client";
import { trackEvent } from "@/lib/analytics";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

const RESEND_COOLDOWN = 60;

type Props = {
  defaultEmail?: string;
  next?: string;
  source: string;
};

export function ResendVerificationForm({ defaultEmail = "", next = "/onboarding", source }: Props) {
  const [resendEmail, setResendEmail] = useState(defaultEmail);
  const [resendState, setResendState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [resendErrorMsg, setResendErrorMsg] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resendEmail || resendCooldown > 0) return;
    setResendState("sending");
    setResendErrorMsg(null);

    const supabase = createClient();
    const { error } = await supabase.auth.resend({
      type: "signup",
      email: resendEmail,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/email-callback?next=${encodeURIComponent(next)}`,
      },
    });

    if (error) {
      setResendState("error");
      const isRateLimit =
        error.message.toLowerCase().includes("security purposes") ||
        error.message.toLowerCase().includes("60 seconds") ||
        error.status === 429;
      setResendErrorMsg(isRateLimit ? "請稍候 60 秒後再重寄" : "無法重寄驗證信，請確認 Email 是否正確");
      setResendCooldown(RESEND_COOLDOWN);
      trackEvent("verification_resend_click", {
        status: "error",
        reason: isRateLimit ? "rate_limit" : "resend_failed",
        from: source,
      });
    } else {
      setResendState("sent");
      setResendCooldown(RESEND_COOLDOWN);
      trackEvent("verification_resend_click", { status: "success", from: source });
    }
  };

  if (resendState === "sent") {
    return (
      <div className="flex flex-col gap-2 text-center">
        <p className="text-sm text-green-600 font-medium flex items-center justify-center gap-1">
          <CheckCircle2 className="h-4 w-4" />新的驗證信已寄出
        </p>
        <p className="text-xs text-muted-foreground">
          請前往 <span className="font-mono break-all">{resendEmail}</span> 查看，包含<strong>垃圾郵件</strong>與<strong>促銷</strong>資料夾。
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <form onSubmit={handleResend} className="flex flex-col gap-3">
        <div className="grid gap-2">
          <Label htmlFor="resend-email">註冊時使用的 Email</Label>
          <Input
            id="resend-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="off"
            autoCorrect="off"
            placeholder="m@example.com"
            required
            value={resendEmail}
            onChange={(e) => setResendEmail(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          disabled={resendState === "sending" || resendCooldown > 0 || !resendEmail}
          className="w-full"
        >
          {resendState === "sending"
            ? "寄送中…"
            : resendCooldown > 0
            ? `重寄驗證信（${resendCooldown}s）`
            : "重寄驗證信"}
        </Button>
        {resendErrorMsg && (
          <p className="text-xs text-red-500">{resendErrorMsg}</p>
        )}
      </form>
      <div className="text-center text-xs text-muted-foreground">
        或{" "}
        <Link href="/auth/sign-up" className="underline underline-offset-4 hover:text-foreground">
          使用不同 Email 重新註冊
        </Link>
      </div>
    </div>
  );
}
