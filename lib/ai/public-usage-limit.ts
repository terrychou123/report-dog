import crypto from 'crypto';
import { NextRequest } from 'next/server';
import { db } from '@/db';
import { publicAiUsage } from '@/db/schema';
import { and, eq, sql } from 'drizzle-orm';

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

  const forwarded = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  // x-forwarded-for 可能是逗號分隔清單，取最左邊一筆（最接近客戶端）
  const ip = (forwarded ? forwarded.split(',')[0].trim() : realIp) ?? 'unknown';

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

/** 僅查詢不寫入，供前端顯示剩餘次數 */
export async function getPublicUsageToday(
  ipHash: string,
  route: string,
  limit: number,
): Promise<PublicUsageResult> {
  const dateBucket = getUtcDateBucket();
  const [row] = await db
    .select({ count: publicAiUsage.count })
    .from(publicAiUsage)
    .where(and(
      eq(publicAiUsage.ipHash, ipHash),
      eq(publicAiUsage.dateBucket, dateBucket),
      eq(publicAiUsage.route, route),
    ));
  const used = row?.count ?? 0;
  return { allowed: used < limit, used, limit, remaining: Math.max(0, limit - used) };
}
