// Per-IP in-memory 速率限制（sliding window）
// Vercel Fluid Compute 下 function instance 會被重用，所以 Map 有效
// 注意：多 instance 之間不共享，防的是單一 instance 被刷的情況

type WindowEntry = { count: number; windowStart: number };

const store = new Map<string, WindowEntry>();

// 防止 Map 無限成長：超過 5000 條時清空最舊的一半
function evictIfNeeded() {
  if (store.size > 5000) {
    const now = Date.now();
    // 只保留 60 秒內有活動的 key
    for (const [key, entry] of store.entries()) {
      if (now - entry.windowStart > 60_000) store.delete(key);
    }
  }
}

/**
 * 檢查 IP 是否超過速率限制
 * @param key      識別 key，通常是 "route:ip"
 * @param limit    window 內允許的最大請求數
 * @param windowMs window 時間（毫秒）
 * @returns true = 超過限制（應拒絕），false = 正常
 */
export function isRateLimited(key: string, limit: number, windowMs: number): boolean {
  evictIfNeeded();
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now - entry.windowStart >= windowMs) {
    store.set(key, { count: 1, windowStart: now });
    return false;
  }

  if (entry.count >= limit) return true;

  entry.count += 1;
  return false;
}

import type { NextRequest } from "next/server";

/** 從 NextRequest 提取原始 IP（不 hash，只用於 rate limit key） */
export function getClientIp(req: NextRequest): string {
  return (
    (req as NextRequest & { ip?: string }).ip ??
    req.headers.get("x-real-ip") ??
    req.headers.get("x-forwarded-for")?.split(",").pop()?.trim() ??
    "unknown"
  );
}
