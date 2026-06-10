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
// runtime 維持 10（Fluid Compute 預設），與部署前行為一致
const isBuild = process.env.NEXT_PHASE === 'phase-production-build';
const client = postgres(getDbUrl(), {
  prepare: false,
  max: isBuild ? 1 : 10,
  connect_timeout: 10, // 秒：建立連線逾時
  connection: { statement_timeout: 15000 }, // 毫秒：單一 query 上限，hung query 快速失敗而非拖垮 function
});
export const db = drizzle(client, { schema });
