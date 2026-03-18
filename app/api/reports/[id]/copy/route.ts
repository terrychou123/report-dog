import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { reports, clientReports, kindReports, clients, kinds } from "@/db/schema";
import { eq, and, min } from "drizzle-orm";

export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const userId = data.claims.sub;

  const [original] = await db
    .select()
    .from(reports)
    .where(and(eq(reports.id, id), eq(reports.userId, userId)));

  if (!original) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const [minRow] = await db
    .select({ min: min(reports.sortOrder) })
    .from(reports)
    .where(eq(reports.userId, userId));
  const nextOrder = Number(minRow?.min ?? 0) - 1;

  // Fetch associations before the transaction (read-only, outside is fine)
  // Only copy associations belonging to this user to prevent cross-user data leakage
  const existingClientReports = await db
    .select({ clientId: clientReports.clientId, sortOrder: clientReports.sortOrder })
    .from(clientReports)
    .innerJoin(clients, and(eq(clientReports.clientId, clients.id), eq(clients.userId, userId)))
    .where(eq(clientReports.reportId, id));

  const existingKindReports = await db
    .select({ kindId: kindReports.kindId })
    .from(kindReports)
    .innerJoin(kinds, and(eq(kindReports.kindId, kinds.id), eq(kinds.userId, userId)))
    .where(eq(kindReports.reportId, id));

  // Wrap all writes in a transaction so a partial failure leaves no orphaned rows
  const newReport = await db.transaction(async (tx) => {
    const [inserted] = await tx
      .insert(reports)
      .values({
        userId,
        title: `${original.title} 複製`,
        content: original.content,
        fileType: original.fileType,
        // fileUrl is shared with the original — do NOT delete the storage object
        // when deleting a report that has copies pointing to the same URL
        fileUrl: original.fileUrl,
        sortOrder: nextOrder,
      })
      .returning();

    if (existingClientReports.length > 0) {
      await tx
        .insert(clientReports)
        .values(
          existingClientReports.map((cr) => ({
            clientId: cr.clientId,
            reportId: inserted.id,
            sortOrder: cr.sortOrder,
          }))
        )
        .onConflictDoNothing();
    }

    if (existingKindReports.length > 0) {
      await tx
        .insert(kindReports)
        .values(
          existingKindReports.map((kr) => ({
            kindId: kr.kindId,
            reportId: inserted.id,
          }))
        )
        .onConflictDoNothing();
    }

    return inserted;
  });

  return NextResponse.json(newReport, { status: 201 });
}
