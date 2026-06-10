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

// max: 1 — Vercel Serverless + Supabase Transaction mode pooler 最佳實踐
// 每個 worker process 只用 1 條連線，避免 build 時 9 workers 並發耗盡 pooler 連線數
const client = postgres(getDbUrl(), { prepare: false, max: 1 });
export const db = drizzle(client, { schema });
