import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { reports, clients, clientReports, kinds, kindReports } from "@/db/schema";
import { eq, desc, inArray, ilike, and } from "drizzle-orm";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FileTextIcon, UserIcon, TagIcon } from "lucide-react";
import { UploadReportButton } from "@/components/upload-report-button";
import { ReportSearchInput } from "@/components/report-search-input";

async function ReportsList({ query }: { query?: string }) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const userId = data!.claims!.sub;

  let reportList: { id: string; title: string; createdAt: Date; fileType: string | null }[];

  if (query) {
    const likeQuery = `%${query}%`;

    // 1. 標題符合
    const byTitle = await db
      .select({ id: reports.id })
      .from(reports)
      .where(and(eq(reports.userId, userId), ilike(reports.title, likeQuery)));

    // 2. 關聯對象名稱符合
    const byClient = await db
      .select({ reportId: clientReports.reportId })
      .from(clientReports)
      .innerJoin(clients, eq(clientReports.clientId, clients.id))
      .innerJoin(reports, eq(clientReports.reportId, reports.id))
      .where(and(eq(reports.userId, userId), ilike(clients.nickname, likeQuery)));

    // 3. 關聯種類名稱符合
    const byKind = await db
      .select({ reportId: kindReports.reportId })
      .from(kindReports)
      .innerJoin(kinds, eq(kindReports.kindId, kinds.id))
      .innerJoin(reports, eq(kindReports.reportId, reports.id))
      .where(and(eq(reports.userId, userId), ilike(kinds.name, likeQuery)));

    const matchingIds = [
      ...new Set([
        ...byTitle.map((r) => r.id),
        ...byClient.map((r) => r.reportId),
        ...byKind.map((r) => r.reportId),
      ]),
    ];

    if (matchingIds.length === 0) {
      return (
        <div className="text-center py-20 text-muted-foreground">
          <FileTextIcon className="h-12 w-12 mx-auto mb-4 opacity-30" />
          <p className="text-lg mb-2">找不到相關報告</p>
          <p className="text-sm">請嘗試其他關鍵字</p>
        </div>
      );
    }

    reportList = await db
      .select({
        id: reports.id,
        title: reports.title,
        createdAt: reports.createdAt,
        fileType: reports.fileType,
      })
      .from(reports)
      .where(and(eq(reports.userId, userId), inArray(reports.id, matchingIds)))
      .orderBy(desc(reports.createdAt));
  } else {
    reportList = await db
      .select({
        id: reports.id,
        title: reports.title,
        createdAt: reports.createdAt,
        fileType: reports.fileType,
      })
      .from(reports)
      .where(eq(reports.userId, userId))
      .orderBy(desc(reports.createdAt));
  }

  if (reportList.length === 0) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        <FileTextIcon className="h-12 w-12 mx-auto mb-4 opacity-30" />
        <p className="text-lg mb-2">尚無報告</p>
        <p className="text-sm">點擊右上角「上傳報告」建立第一份報告</p>
      </div>
    );
  }

  // 批次取得各報告的關聯對象名稱
  const reportIds = reportList.map((r) => r.id);
  const [clientAssociations, kindAssociations] = await Promise.all([
    db
      .select({ reportId: clientReports.reportId, nickname: clients.nickname })
      .from(clientReports)
      .innerJoin(clients, eq(clientReports.clientId, clients.id))
      .where(inArray(clientReports.reportId, reportIds)),
    db
      .select({ reportId: kindReports.reportId, name: kinds.name })
      .from(kindReports)
      .innerJoin(kinds, eq(kindReports.kindId, kinds.id))
      .where(inArray(kindReports.reportId, reportIds)),
  ]);

  const clientMap = new Map<string, string[]>();
  for (const a of clientAssociations) {
    if (!clientMap.has(a.reportId)) clientMap.set(a.reportId, []);
    clientMap.get(a.reportId)!.push(a.nickname);
  }

  const kindMap = new Map<string, string[]>();
  for (const a of kindAssociations) {
    if (!kindMap.has(a.reportId)) kindMap.set(a.reportId, []);
    kindMap.get(a.reportId)!.push(a.name);
  }

  return (
    <div className="space-y-3">
      {reportList.map((report) => {
        const clientNames = clientMap.get(report.id) ?? [];
        const kindNames = kindMap.get(report.id) ?? [];
        return (
          <Link key={report.id} href={`/report/${report.id}`}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="py-3 px-4">
                <CardTitle className="text-sm font-medium flex items-center gap-2 flex-wrap">
                  <FileTextIcon className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="flex-1">{report.title}</span>
                  {report.fileType === "pdf" && (
                    <span className="text-xs bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded">PDF</span>
                  )}
                  {clientNames.length > 0 && (
                    <span className="flex items-center gap-1 text-xs font-normal text-muted-foreground">
                      <UserIcon className="h-3 w-3" />
                      {clientNames.join("、")}
                    </span>
                  )}
                  {kindNames.length > 0 && (
                    <span className="flex items-center gap-1 text-xs font-normal text-muted-foreground">
                      <TagIcon className="h-3 w-3" />
                      {kindNames.join("、")}
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
        );
      })}
    </div>
  );
}

export default async function ReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">相關報告</h1>
          <p className="text-muted-foreground mt-1 text-sm">所有已上傳的報告</p>
        </div>
        <UploadReportButton />
      </div>
      <div className="mb-6">
        <Suspense>
          <ReportSearchInput />
        </Suspense>
      </div>
      <Suspense
        key={q}
        fallback={
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-16 w-full rounded-lg" />
            ))}
          </div>
        }
      >
        <ReportsList query={q} />
      </Suspense>
    </div>
  );
}
