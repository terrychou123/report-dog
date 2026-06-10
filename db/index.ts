import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

export function getDbUrl(raw = process.env.DATABASE_URL) {
  if (!raw) throw new Error("DATABASE_URL is not set");
  // Parse and re-encode the password to handle special characters
  const match = raw.match(/^(postgresql:\/\/[^:]+):([^@]+)@(.+)$/);
  if (match) {
    const [, prefix, password, suffix] = match;
    return `${prefix}:${encodeURIComponent(password)}@${suffix}`;
  }
  return raw;
}

// build 時 9 workers 各用 1 條連線（共 9 條），不超過 Supabase pooler 上限
const isBuild = process.env.NEXT_PHASE === 'phase-production-build';
// runtime max 從 5 降到 2：2 × 100 暖實例才到 200 client 連線上限，安全餘裕更大。
// （5 × 40 暖實例就飽和，是 ECHECKOUTTIMEOUT 根因之一。）
// idle_timeout=20s：閒置連線自動釋放回 pooler，暖實例不再「永久囤積」連線。
// 註：idle_timeout / max 是 postgres-js 客戶端池設定，非傳給 pooler 的啟動參數，
//     與 transaction pooler 相容（不會重演 statement_timeout 啟動參數弄垮 build 的問題）。
const client = postgres(getDbUrl(), {
  prepare: false,
  max: isBuild ? 1 : 2,
  idle_timeout: 20,
});
export const db = drizzle(client, { schema });
