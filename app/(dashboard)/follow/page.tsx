import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { reportFollows, reports } from "@/db/schema";
import { eq } from "drizzle-orm";
import { BellRingIcon } from "lucide-react";
import { FREQUENCY_ORDER, type Frequency, type FollowItem } from "@/lib/follow-utils";
import { FollowPageClient } from "@/components/follow-page-client";

export default async function FollowPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;
  if (!userId) redirect("/auth/login");

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

  const grouped = Object.fromEntries(
    FREQUENCY_ORDER.map((f) => [f, [] as FollowItem[]])
  ) as Record<Frequency, FollowItem[]>;

  for (const item of follows) {
    if (item.frequency in grouped) {
      grouped[item.frequency as Frequency].push({
        followId: item.followId,
        frequency: item.frequency,
        reportId: item.reportId,
        reportTitle: item.reportTitle,
        reportUpdatedAt: item.reportUpdatedAt.toISOString(),
        fileType: item.fileType,
      });
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-3xl">
      <div className="flex items-center gap-2 mb-2">
        <BellRingIcon className="h-6 w-6" />
        <h1 className="text-2xl font-bold">追蹤報告</h1>
      </div>
      <FollowPageClient initialGrouped={grouped} />
    </div>
  );
}
