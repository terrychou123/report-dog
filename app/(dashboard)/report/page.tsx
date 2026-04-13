import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { reports, clients, clientReports, reportLinks } from "@/db/schema";
import { eq, desc, inArray, ilike, and, asc } from "drizzle-orm";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FileTextIcon } from "lucide-react";
import { UploadReportButton } from "@/components/upload-report-button";
import { TemplateImportDialog } from "@/components/template-import-dialog";
import { ReportSearchInput } from "@/components/report-search-input";
import { DraggableReportsList } from "@/components/draggable-reports-list";
import { CopyReportButton } from "@/components/copy-report-button";
import { ReportCardContent } from "@/components/report-card-content";
import { formatZhTWDate } from "@/lib/utils";

async function SearchReportsList({ query }: { query: string }) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;
  if (!userId) redirect("/auth/login");

  const likeQuery = `%${query}%`;

  const byTitle = await db
    .select({ id: reports.id })
    .from(reports)
    .where(and(eq(reports.userId, userId), ilike(reports.title, likeQuery)));

  const byClient = await db
    .select({ reportId: clientReports.reportId })
    .from(clientReports)
    .innerJoin(clients, eq(clientReports.clientId, clients.id))
    .innerJoin(reports, eq(clientReports.reportId, reports.id))
    .where(and(eq(reports.userId, userId), ilike(clients.nickname, likeQuery)));

  const matchingIds = [
    ...new Set([
      ...byTitle.map((r) => r.id),
      ...byClient.map((r) => r.reportId),
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

  const reportList = await db
    .select({
      id: reports.id,
      title: reports.title,
      createdAt: reports.createdAt,
      fileType: reports.fileType,
    })
    .from(reports)
    .where(and(eq(reports.userId, userId), inArray(reports.id, matchingIds)))
    .orderBy(desc(reports.createdAt));

  const reportIds = reportList.map((r) => r.id);
  if (reportIds.length === 0) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        <FileTextIcon className="h-12 w-12 mx-auto mb-4 opacity-30" />
        <p className="text-lg mb-2">找不到相關報告</p>
        <p className="text-sm">請嘗試其他關鍵字</p>
      </div>
    );
  }

  const [tagAssociations, linkRows] = await Promise.all([
    db.select({ reportId: clientReports.reportId, nickname: clients.nickname })
      .from(clientReports)
      .innerJoin(clients, eq(clientReports.clientId, clients.id))
      .where(inArray(clientReports.reportId, reportIds)),
    db.select({ reportId: reportLinks.reportId, name: reportLinks.name, url: reportLinks.url })
      .from(reportLinks)
      .where(inArray(reportLinks.reportId, reportIds))
      .orderBy(asc(reportLinks.sortOrder), asc(reportLinks.createdAt)),
  ]);

  const tagMap = new Map<string, string[]>();
  for (const a of tagAssociations) {
    if (!tagMap.has(a.reportId)) tagMap.set(a.reportId, []);
    tagMap.get(a.reportId)!.push(a.nickname);
  }

  const linkMap = new Map<string, { name: string; url: string }[]>();
  for (const l of linkRows) {
    if (!linkMap.has(l.reportId)) linkMap.set(l.reportId, []);
    linkMap.get(l.reportId)!.push({ name: l.name, url: l.url });
  }

  return (
    <div className="space-y-3">
      {reportList.map((report) => {
        const tagNames = tagMap.get(report.id) ?? [];
        const formattedDate = formatZhTWDate(report.createdAt);
        return (
          <div key={report.id} className="relative">
            <Link href={`/report/${report.id}`} className="block">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="py-3 px-4 pr-12">
                  <CardTitle className="text-sm font-medium">
                    <ReportCardContent
                      title={report.title}
                      fileType={report.fileType}
                      formattedDate={formattedDate}
                      tags={tagNames}
                      links={linkMap.get(report.id) ?? []}
                    />
                  </CardTitle>
                </CardHeader>
              </Card>
            </Link>
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <CopyReportButton reportId={report.id} />
            </div>
          </div>
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
    <div className="p-4 md:p-8 max-w-3xl">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">我的報告</h1>
          <p className="text-muted-foreground mt-1 text-sm">所有已上傳的報告</p>
        </div>
        <div className="flex items-center gap-2">
          <TemplateImportDialog />
          <UploadReportButton />
        </div>
      </div>
      <div className="mb-6">
        <Suspense>
          <ReportSearchInput />
        </Suspense>
      </div>
      {q ? (
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
          <SearchReportsList query={q} />
        </Suspense>
      ) : (
        <DraggableReportsList />
      )}
    </div>
  );
}
