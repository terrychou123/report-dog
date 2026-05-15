"use client";

import { Suspense, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

// 仿照 /auth/oauth-success 模式：server callback 完成 code exchange 後，
// 由此 client page 觸發 GA 事件與 newsletter upsert，再 redirect 到目的頁面。
function EmailSuccessInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const rawNext = searchParams.get("next") ?? "/onboarding";
    const next = rawNext.startsWith("/") ? rawNext : "/onboarding";

    trackEvent("sign_up_complete", { method: "email" });

    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 8000);
    fetch("/api/auth/post-signup", { method: "POST", signal: ctrl.signal })
      .catch(() => {})
      .finally(() => {
        clearTimeout(timer);
        router.replace(next);
      });
  }, [router, searchParams]);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6">
      <p className="text-sm text-muted-foreground">驗證成功，正在前往…</p>
    </div>
  );
}

export default function EmailSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-svh w-full items-center justify-center p-6">
          <p className="text-sm text-muted-foreground">驗證成功，正在前往…</p>
        </div>
      }
    >
      <EmailSuccessInner />
    </Suspense>
  );
}
