import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { reports, clients } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FileTextIcon, UserIcon } from "lucide-react";

async function ReportsList() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const userId = data!.claims!.sub;

  const reportList = await db
    .select({
      id: reports.id,
      title: reports.title,
      createdAt: reports.createdAt,
      clientId: reports.clientId,
      clientNickname: clients.nickname,
    })
    .from(reports)
    .leftJoin(clients, eq(reports.clientId, clients.id))
    .where(eq(reports.userId, userId))
    .orderBy(desc(reports.createdAt));

  if (reportList.length === 0) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        <FileTextIcon className="h-12 w-12 mx-auto mb-4 opacity-30" />
        <p className="text-lg mb-2">尚無報告</p>
        <p className="text-sm">請前往服務對象頁面上傳報告</p>
        <div className="mt-4">
          <Link href="/client" className="text-sm text-primary hover:underline">
            前往服務對象 →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {reportList.map((report) => (
        <Link key={report.id} href={`/report/${report.id}`}>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <FileTextIcon className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="flex-1">{report.title}</span>
                {report.clientNickname && (
                  <span className="flex items-center gap-1 text-xs font-normal text-muted-foreground">
                    <UserIcon className="h-3 w-3" />
                    {report.clientNickname}
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 px-4 pb-3">
              <p className="text-xs text-muted-foreground">
                {new Date(report.createdAt).toLocaleDateString("zh-TW", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default function ReportsPage() {
  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">相關報告</h1>
        <p className="text-muted-foreground mt-1 text-sm">所有已上傳的報告</p>
      </div>
      <Suspense fallback={
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-16 w-full rounded-lg" />)}
        </div>
      }>
        <ReportsList />
      </Suspense>
    </div>
  );
}
