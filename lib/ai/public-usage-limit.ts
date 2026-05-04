import crypto from 'crypto';
import { NextRequest } from 'next/server';
import { db } from '@/db';
import { publicAiUsage } from '@/db/schema';
import { sql } from 'drizzle-orm';

function getUtcDateBucket(): string {
  const now = new Date();
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, '0');
  const d = String(now.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** 從 Vercel 注入的 header 取出客戶端 IP，再用 HMAC-SHA256 做 hash（不儲存原始 IP）*/
export function getClientIpHash(req: NextRequest): string {
  const salt = process.env.PUBLIC_DEMO_SALT;
  if (!salt) throw new Error('PUBLIC_DEMO_SALT 環境變數未設定');

  // req.ip：Vercel 直接注入，無法被客戶端偽造（最可靠）
  // x-real-ip：Vercel 注入的真實 IP（第二優先）
  // x-forwarded-for 最右側：取最後一個 hop（CDN 或 Vercel 注入），避免客戶端偽造最左側
  const ip =
    req.ip ??
    req.headers.get('x-real-ip') ??
    req.headers.get('x-forwarded-for')?.split(',').pop()?.trim() ??
    'unknown';

  return crypto.createHmac('sha256', salt).update(ip).digest('hex');
}

export interface PublicUsageResult {
  allowed: boolean;
  used: number;
  limit: number;
  remaining: number;
}

/**
 * 原子性遞增並檢查公開 demo 用量。
 * 以 (ipHash, dateBucket, route) 為 unique key，
 * INSERT … ON CONFLICT DO UPDATE SET count = count + 1 確保無競爭條件。
 */
export async function checkAndRecordPublicUsage(
  ipHash: string,
  route: string,
  limit: number,
): Promise<PublicUsageResult> {
  const dateBucket = getUtcDateBucket();

  // Upsert：第一次 INSERT count=1；之後 ON CONFLICT 遞增
  const [row] = await db
    .insert(publicAiUsage)
    .values({ ipHash, route, dateBucket, count: 1 })
    .onConflictDoUpdate({
      target: [publicAiUsage.ipHash, publicAiUsage.dateBucket, publicAiUsage.route],
      set: {
        count: sql`${publicAiUsage.count} + 1`,
        updatedAt: sql`now()`,
      },
    })
    .returning({ count: publicAiUsage.count });

  const used = row?.count ?? 1;
  return {
    allowed: used <= limit,
    used,
    limit,
    remaining: Math.max(0, limit - used),
  };
}

