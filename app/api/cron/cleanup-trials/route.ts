import { NextRequest, NextResponse } from "next/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { db } from "@/db";
import { clients, kinds, reports } from "@/db/schema";
import { notInArray } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  const adminClient = createAdminClient(url, serviceRoleKey);

  // Fetch all existing auth user IDs
  const { data: usersData, error: listError } = await adminClient.auth.admin.listUsers({
    perPage: 1000,
  });
  if (listError) {
    console.error("Failed to list users:", listError.message);
    return NextResponse.json({ error: "Failed to list users" }, { status: 500 });
  }

  const existingUserIds = usersData.users.map((u) => u.id);

  if (existingUserIds.length === 0) {
    // No users at all — delete everything
    await db.delete(clients);
    await db.delete(kinds);
    await db.delete(reports);
    return NextResponse.json({ ok: true, deleted: "all" });
  }

  // Delete rows whose user_id is not in the current auth.users list
  const deletedClients = await db
    .delete(clients)
    .where(notInArray(clients.userId, existingUserIds))
    .returning({ id: clients.id });

  const deletedKinds = await db
    .delete(kinds)
    .where(notInArray(kinds.userId, existingUserIds))
    .returning({ id: kinds.id });

  const deletedReports = await db
    .delete(reports)
    .where(notInArray(reports.userId, existingUserIds))
    .returning({ id: reports.id });

  return NextResponse.json({
    ok: true,
    deleted: {
      clients: deletedClients.length,
      kinds: deletedKinds.length,
      reports: deletedReports.length,
    },
  });
}
