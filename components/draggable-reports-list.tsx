"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { FileTextIcon, TagIcon, CheckSquareIcon, XIcon, SparklesIcon } from "lucide-react";
import { CopyReportButton } from "@/components/copy-report-button";
import { FileTypeIcon } from "@/components/file-type-icon";
import { CrossReportEvaluation } from "@/components/cross-report-evaluation";

type Report = {
  id: string;
  title: string;
  fileType: string | null;
  sortOrder: number;
  createdAt: string;
  tags: string[];
};

function ReportCard({
  report,
  onCopied,
  selectionMode,
  selected,
  onToggle,
}: {
  report: Report;
  onCopied: () => void;
  selectionMode: boolean;
  selected: boolean;
  onToggle: (id: string) => void;
}) {
  if (selectionMode) {
    return (
      <div
        className={`relative cursor-pointer rounded-lg transition-all ${selected ? "ring-2 ring-primary" : ""}`}
        onClick={() => onToggle(report.id)}
      >
        <Card className={`transition-shadow ${selected ? "shadow-md" : "hover:shadow-md"}`}>
          <CardHeader className="py-3 px-4 pr-4">
            <CardTitle className="text-sm font-medium flex items-center gap-2 flex-wrap">
              <Checkbox
                checked={selected}
                onCheckedChange={() => onToggle(report.id)}
                onClick={(e) => e.stopPropagation()}
                className="shrink-0"
              />
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
      </div>
    );
  }

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
        <CopyReportButton reportId={report.id} onCopied={onCopied} />
      </div>
    </div>
  );
}

export function DraggableReportsList() {
  const [reportList, setReportList] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [evaluationOpen, setEvaluationOpen] = useState(false);

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

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const exitSelectionMode = () => {
    setSelectionMode(false);
    setSelectedIds(new Set());
  };

  const selectedReports = reportList.filter((r) => selectedIds.has(r.id));
  const selectedTitles = selectedReports.map((r) => r.title);

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
    <>
      <div className="space-y-3">
        <div className="flex justify-end">
          {selectionMode ? (
            <Button variant="ghost" size="sm" onClick={exitSelectionMode}>
              <XIcon className="h-4 w-4 mr-1" />
              取消選取
            </Button>
          ) : (
            <Button variant="ghost" size="sm" onClick={() => setSelectionMode(true)}>
              <CheckSquareIcon className="h-4 w-4 mr-1" />
              勾選比對
            </Button>
          )}
        </div>

        {reportList.map((report) => (
          <ReportCard
            key={report.id}
            report={report}
            onCopied={loadReports}
            selectionMode={selectionMode}
            selected={selectedIds.has(report.id)}
            onToggle={toggleSelection}
          />
        ))}
      </div>

      {selectionMode && selectedIds.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-full border bg-background px-5 py-3 shadow-lg">
          <span className="text-sm text-muted-foreground">已選 {selectedIds.size} 份</span>
          <Button
            size="sm"
            disabled={selectedIds.size < 2}
            onClick={() => setEvaluationOpen(true)}
          >
            <SparklesIcon className="h-4 w-4 mr-1" />
            AI 一致性分析
          </Button>
          <Button variant="ghost" size="sm" onClick={exitSelectionMode}>
            取消
          </Button>
        </div>
      )}

      <CrossReportEvaluation
        open={evaluationOpen}
        onOpenChange={setEvaluationOpen}
        reportIds={Array.from(selectedIds)}
        reportTitles={selectedTitles}
      />
    </>
  );
}
