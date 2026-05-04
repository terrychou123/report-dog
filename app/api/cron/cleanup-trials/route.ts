import { NextRequest, NextResponse } from "next/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { db } from "@/db";
import { clients, kinds, reports, publicAiUsage } from "@/db/schema";
import { notInArray, lt } from "drizzle-orm";

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

  // Fetch all existing auth user IDs (paginate to handle > 1000 users)
  const existingUserIds: string[] = [];
  let page = 1;
  while (true) {
    const { data: usersData, error: listError } = await adminClient.auth.admin.listUsers({
      perPage: 1000,
      page,
    });
    if (listError) {
      console.error("Failed to list users:", listError.message);
      return NextResponse.json({ error: "Failed to list users" }, { status: 500 });
    }
    usersData.users.forEach((u) => existingUserIds.push(u.id));
    if (usersData.users.length < 1000) break;
    page++;
  }

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

  // 清除 7 天前的公開 demo 限流記錄（避免資料表無限成長）
  const cutoff = new Date();
  cutoff.setUTCDate(cutoff.getUTCDate() - 7);
  const cutoffBucket = cutoff.toISOString().slice(0, 10);
  const deletedDemoUsage = await db
    .delete(publicAiUsage)
    .where(lt(publicAiUsage.dateBucket, cutoffBucket))
    .returning({ id: publicAiUsage.id });

  return NextResponse.json({
    ok: true,
    deleted: {
      clients: deletedClients.length,
      kinds: deletedKinds.length,
      reports: deletedReports.length,
      demoUsage: deletedDemoUsage.length,
    },
  });
}
