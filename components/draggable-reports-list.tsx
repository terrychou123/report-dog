"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FileTextIcon, TagIcon } from "lucide-react";
import { CopyReportButton } from "@/components/copy-report-button";
import { FileTypeIcon } from "@/components/file-type-icon";

type Report = {
  id: string;
  title: string;
  fileType: string | null;
  sortOrder: number;
  createdAt: string;
  tags: string[];
};

function ReportCard({ report, onCopied }: { report: Report; onCopied: () => void }) {
  return (
    <div className="relative">
      <a href={`/report/${report.id}`} target="_blank" rel="noopener noreferrer" className="block">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="py-3 px-4 pr-20">
            <CardTitle className="text-sm font-medium flex items-center gap-2 flex-wrap">
              <FileTypeIcon fileType={report.fileType} />
              <span className="flex-1">{report.title}</span>
              {report.tags.length > 0 && (
                <span className="flex items-center gap-1 text-xs font-normal text-muted-foreground">
                  <TagIcon className="h-3 w-3" />
                  {report.tags.join("、")}
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
      </a>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
        <CopyReportButton reportId={report.id} title={report.title} onCopied={onCopied} />
      </div>
    </div>
  );
}

export function DraggableReportsList() {
  const [reportList, setReportList] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  const loadReports = useCallback(() => {
    fetch("/api/reports")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        setReportList(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadReports();
    window.addEventListener("reports-updated", loadReports);
    return () => window.removeEventListener("reports-updated", loadReports);
  }, [loadReports]);

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-16 w-full rounded-lg" />
        ))}
      </div>
    );
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

  return (
    <div className="space-y-3">
      {reportList.map((report) => (
        <ReportCard key={report.id} report={report} onCopied={loadReports} />
      ))}
    </div>
  );
}
