import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { notifications } from "@/db/schema";
import { eq, and, count } from "drizzle-orm";

// GET /api/notifications/unread-count
export async function GET() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = data.claims.sub;

  const [result] = await db
    .select({ count: count() })
    .from(notifications)
    .where(and(eq(notifications.userId, userId), eq(notifications.read, false)));

  return NextResponse.json({ count: result?.count ?? 0 });
}
