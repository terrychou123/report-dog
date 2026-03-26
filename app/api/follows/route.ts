import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { reportFollows, reports } from "@/db/schema";
import { eq } from "drizzle-orm";
import { isValidFrequency } from "@/lib/follow-utils";

export async function GET() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = data.claims.sub;

  const follows = await db
    .select({
      followId: reportFollows.id,
      frequency: reportFollows.frequency,
      reportId: reports.id,
      reportTitle: reports.title,
      reportUpdatedAt: reports.updatedAt,
      fileType: reports.fileType,
    })
    .from(reportFollows)
    .innerJoin(reports, eq(reportFollows.reportId, reports.id))
    .where(eq(reportFollows.userId, userId));

  return NextResponse.json(follows);
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = data.claims.sub;

  const body = await req.json();
  const { reportId, frequency } = body;
  if (!reportId || !frequency || !isValidFrequency(frequency)) {
    return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
  }

  const [follow] = await db
    .insert(reportFollows)
    .values({ userId, reportId, frequency })
    .onConflictDoUpdate({
      target: [reportFollows.userId, reportFollows.reportId],
      set: { frequency },
    })
    .returning();

  return NextResponse.json(follow);
}
