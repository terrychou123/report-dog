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
// runtime（Fluid Compute）允許 3 條並發，避免並發請求排隊 timeout
const isBuild = process.env.NEXT_PHASE === 'phase-production-build';
const client = postgres(getDbUrl(), { prepare: false, max: isBuild ? 1 : 3 });
export const db = drizzle(client, { schema });
