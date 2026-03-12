import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { db } from "@/db";
import { clients, kinds, reports } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  // Same-origin check: cross-origin requests include an Origin header
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host && !origin.includes(host)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!user.is_anonymous) return NextResponse.json({ error: "Not a trial user" }, { status: 403 });

  const userId = user.id;

  // Delete user data — FK cascades handle junction tables (clientReports, kindReports)
  await db.delete(clients).where(eq(clients.userId, userId));
  await db.delete(kinds).where(eq(kinds.userId, userId));
  await db.delete(reports).where(eq(reports.userId, userId));

  // Delete the anonymous Supabase auth user
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    console.error("SUPABASE_SERVICE_ROLE_KEY is not set");
    return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  const adminClient = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceRoleKey,
  );
  const { error: deleteError } = await adminClient.auth.admin.deleteUser(userId);
  if (deleteError) {
    console.error("Failed to delete anonymous user:", deleteError.message);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
