"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

/** 讀取 /auth/error URL 的 reason param，送出 verify_error GA 事件 */
export function VerifyErrorTracker() {
  const searchParams = useSearchParams();
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    const flow = searchParams.get("flow");
    const reason = searchParams.get("reason");
    if (flow === "signup") {
      trackEvent("verify_error", { reason: reason ?? "unknown", flow });
    }
  }, [searchParams]);

  return null;
}
