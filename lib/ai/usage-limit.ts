import { db } from '@/db';
import { aiUsage } from '@/db/schema';
import { and, eq, gte, count } from 'drizzle-orm';

const TIER_LIMITS: Record<string, number> = {
  free: 1,
};

function getUserTier(_userId: string): keyof typeof TIER_LIMITS {
  return 'free';
}

function getUtcDateBucket(): string {
  const now = new Date();
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, '0');
  const d = String(now.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

async function countUsageToday(userId: string): Promise<number> {
  const todayUtc = new Date();
  todayUtc.setUTCHours(0, 0, 0, 0);
  const [row] = await db
    .select({ count: count() })
    .from(aiUsage)
    .where(and(eq(aiUsage.userId, userId), gte(aiUsage.createdAt, todayUtc)));
  return row?.count ?? 0;
}

export async function checkAndRecordAiUsage(
  userId: string,
  route: string,
): Promise<{ allowed: boolean; used: number; limit: number; remaining: number }> {
  const tier = getUserTier(userId);
  const limit = TIER_LIMITS[tier] ?? 1;
  const dateBucket = getUtcDateBucket();

  if (limit === 1) {
    // Atomic: unique index on (userId, dateBucket) prevents concurrent double-inserts.
    // ON CONFLICT DO NOTHING returns empty array if the slot is already taken.
    const inserted = await db
      .insert(aiUsage)
      .values({ userId, route, dateBucket })
      .onConflictDoNothing()
      .returning({ id: aiUsage.id });

    if (inserted.length === 0) {
      return { allowed: false, used: 1, limit: 1, remaining: 0 };
    }
    return { allowed: true, used: 1, limit: 1, remaining: 0 };
  }

  // For limit > 1: best-effort (unique constraint no longer applies)
  const used = await countUsageToday(userId);
  if (used >= limit) {
    return { allowed: false, used, limit, remaining: 0 };
  }

  await db.insert(aiUsage).values({ userId, route, dateBucket });
  return { allowed: true, used: used + 1, limit, remaining: limit - used - 1 };
}

export async function getAiUsageToday(
  userId: string,
): Promise<{ used: number; limit: number; remaining: number; tier: string }> {
  const tier = getUserTier(userId);
  const limit = TIER_LIMITS[tier] ?? 1;

  const used = await countUsageToday(userId);
  return { used, limit, remaining: Math.max(0, limit - used), tier };
}
