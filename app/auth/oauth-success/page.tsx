"use client";

import { Suspense, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

function OAuthSuccessInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // React Strict Mode 在 dev 會 double-mount，hasRun 確保副作用只執行一次
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const rawNext = searchParams.get("next") ?? "/report";
    const next = rawNext.startsWith("/") ? rawNext : "/report";
    const provider = searchParams.get("provider") ?? "google";
    const isNew = searchParams.get("new_user") === "1";
    const source = searchParams.get("source") ?? "direct";
    const slug = searchParams.get("slug") ?? undefined;

    const method = `oauth_${provider}`;

    // 一律 fire oauth_complete，new_user 旗標標示新舊
    trackEvent("oauth_complete", { provider, new_user: isNew });

    if (isNew) {
      // 新使用者 → 補 sign_up 與 sign_up_complete（email 註冊由表單觸發；OAuth 無中介步驟）
      trackEvent("sign_up", { method, source, slug });
      trackEvent("sign_up_complete", { method });
    }

    if (isNew) {
      // 新使用者才呼叫 post-signup：既有使用者跳過，避免誤觸 upsert 的 setWhere 條件
      // 而清空 unsubscribedAt，把已退訂者靜默重新訂閱（違反退訂意願）
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 8000);
      fetch("/api/auth/post-signup", { method: "POST", signal: ctrl.signal })
        .then(async (res) => {
          clearTimeout(timer);
          if (res.ok) {
            const data = await res.json();
            // newsletter_subscribe 事件僅由使用者主動訂閱觸發（footer/blog-inline），signup 自動訂閱不計入
          }
        })
        .catch(() => clearTimeout(timer))
        .finally(() => {
          router.replace(next);
        });
    } else {
      // 既有使用者 OAuth 登入
      trackEvent("login", { method: `oauth_${provider}` });
      router.replace(next);
    }
  }, [router, searchParams]);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6">
      <p className="text-sm text-muted-foreground">登入成功，正在前往…</p>
    </div>
  );
}

export default function OAuthSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-svh w-full items-center justify-center p-6">
          <p className="text-sm text-muted-foreground">登入成功，正在前往…</p>
        </div>
      }
    >
      <OAuthSuccessInner />
    </Suspense>
  );
}
