import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { notifications } from "@/db/schema";
import { eq, desc, and, inArray } from "drizzle-orm";

// GET /api/notifications — list notifications for current user
export async function GET() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = data.claims.sub;

  const rows = await db
    .select()
    .from(notifications)
    .where(eq(notifications.userId, userId))
    .orderBy(desc(notifications.createdAt))
    .limit(50);

  return NextResponse.json(rows);
}

// PUT /api/notifications — mark notifications as read
export async function PUT(req: NextRequest) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = data.claims.sub;

  const body = await req.json();

  if (body.all) {
    await db
      .update(notifications)
      .set({ read: true })
      .where(eq(notifications.userId, userId));
  } else if (
    Array.isArray(body.ids) &&
    body.ids.length > 0 &&
    body.ids.every((id: unknown) => typeof id === "string")
  ) {
    await db
      .update(notifications)
      .set({ read: true })
      .where(and(eq(notifications.userId, userId), inArray(notifications.id, body.ids as string[])));
  } else {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
