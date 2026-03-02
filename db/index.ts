import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

function getDbUrl() {
  const raw = process.env.DATABASE_URL!;
  // Parse and re-encode the password to handle special characters
  const match = raw.match(/^(postgresql:\/\/[^:]+):([^@]+)@(.+)$/);
  if (match) {
    const [, prefix, password, suffix] = match;
    return `${prefix}:${encodeURIComponent(password)}@${suffix}`;
  }
  return raw;
}

const client = postgres(getDbUrl(), { prepare: false });
export const db = drizzle(client, { schema });
