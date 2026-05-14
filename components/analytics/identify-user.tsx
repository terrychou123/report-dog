"use client";

import { useEffect } from "react";

interface IdentifyUserProps {
  userId: string;
}

/** 登入後設定 GA4 user_id，啟用跨裝置歸因 */
export function IdentifyUser({ userId }: IdentifyUserProps) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (typeof window.gtag !== "function") return;
    const gaId = process.env.NEXT_PUBLIC_GA_ID;
    if (!gaId) return;
    window.gtag("config", gaId, { user_id: userId });
  }, [userId]);

  return null;
}
