import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { reportFollows } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ reportId: string }> }
) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = data.claims.sub;
  const { reportId } = await params;

  const [follow] = await db
    .select({ followId: reportFollows.id, frequency: reportFollows.frequency })
    .from(reportFollows)
    .where(and(eq(reportFollows.reportId, reportId), eq(reportFollows.userId, userId)));

  return NextResponse.json(follow ?? null);
}
