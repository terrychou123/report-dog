"use client";

import { useEffect } from "react";

// GA4 / 廣告平台的 click ID 參數：讓 GA4 script 先讀取後，再從可見 URL 移除
// 避免 fbclid 切碎 GSC landing page 歸因（每個不同 fbclid 值被視為不同 URL）
// 注意：utm_* 保留，不移除（行銷人員需要在 URL 看到 campaign 參數）
const CLICK_ID_PARAMS = ["fbclid", "gclid", "gbraid", "wbraid"];

export function StripTrackingParams() {
  useEffect(() => {
    const url = new URL(window.location.href);
    let changed = false;
    for (const param of CLICK_ID_PARAMS) {
      if (url.searchParams.has(param)) {
        url.searchParams.delete(param);
        changed = true;
      }
    }
    if (changed) {
      window.history.replaceState(null, "", url.toString());
    }
  }, []);

  return null;
}
