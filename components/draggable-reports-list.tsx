"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  FileTextIcon,
  TagIcon,
  ClipboardListIcon,
  TrashIcon,
  CopyIcon,
  LoaderIcon,
} from "lucide-react";
import { TemplateImportDialog } from "@/components/template-import-dialog";
import { FileTypeIcon } from "@/components/file-type-icon";
import { EvaluationPanel } from "@/components/evaluation-panel";
import { toast } from "sonner";

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
  selected,
  onToggle,
}: {
  report: Report;
  selected: boolean;
  onToggle: (id: string) => void;
}) {
  return (
    <div className={`relative rounded-lg transition-all ${selected ? "ring-2 ring-primary shadow-md" : ""}`}>
      <Card className={`transition-shadow ${selected ? "" : "hover:shadow-md"}`}>
        <CardHeader className="py-3 px-4">
          <CardTitle className="text-sm font-medium">
            <div className="flex items-start gap-2">
              <Checkbox
                checked={selected}
                onCheckedChange={() => onToggle(report.id)}
                onClick={(e) => e.stopPropagation()}
                className="shrink-0 mt-0.5"
              />
              <a
                href={`/report/${report.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-0"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-2">
                  <FileTypeIcon fileType={report.fileType} className="shrink-0" />
                  <span className="break-words">{report.title}</span>
                  {report.tags.length > 0 && (
                    <span className="hidden md:inline-flex items-center gap-1 text-xs font-normal text-muted-foreground whitespace-nowrap">
                      <TagIcon className="h-3 w-3" />
                      {report.tags.join("、")}
                    </span>
                  )}
                </div>
                {report.tags.length > 0 && (
                  <div className="flex md:hidden items-center gap-1 text-xs font-normal text-muted-foreground mt-1">
                    <TagIcon className="h-3 w-3 shrink-0" />
                    <span className="break-words">{report.tags.join("、")}</span>
                  </div>
                )}
              </a>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 px-4 pb-3">
          <p className="text-xs text-muted-foreground pl-6">
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

export function DraggableReportsList() {
  const [reportList, setReportList] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [accreditationOpen, setAccreditationOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<null | "copy" | "delete">(null);
  const [batchLoading, setBatchLoading] = useState(false);

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

  const clearSelection = () => setSelectedIds(new Set());

  const selectedReports = reportList.filter((r) => selectedIds.has(r.id));
  const selectedTitles = selectedReports.map((r) => r.title);

  const handleBatchDelete = async () => {
    setBatchLoading(true);
    const ids = Array.from(selectedIds);
    const results = await Promise.allSettled(
      ids.map((id) =>
        fetch(`/api/reports/${id}`, { method: "DELETE" }).then((r) => {
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
        })
      )
    );
    const succeeded = results.filter((r) => r.status === "fulfilled").length;
    const failed = results.filter((r) => r.status === "rejected").length;

    if (failed === 0) {
      toast.success(`已刪除 ${succeeded} 份報告`);
    } else {
      toast.error(`已刪除 ${succeeded} 份，${failed} 份失敗`);
    }

    setBatchLoading(false);
    setConfirmAction(null);
    clearSelection();
    loadReports();
  };

  const handleBatchCopy = async () => {
    setBatchLoading(true);
    const ids = Array.from(selectedIds);
    const results = await Promise.allSettled(
      ids.map((id) =>
        fetch(`/api/reports/${id}/copy`, { method: "POST" }).then((r) => {
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
        })
      )
    );
    const succeeded = results.filter((r) => r.status === "fulfilled").length;
    const failed = results.filter((r) => r.status === "rejected").length;

    if (failed === 0) {
      toast.success(`已複製 ${succeeded} 份報告`);
    } else {
      toast.error(`已複製 ${succeeded} 份，${failed} 份失敗`);
    }

    setBatchLoading(false);
    setConfirmAction(null);
    clearSelection();
    window.dispatchEvent(new Event("reports-updated"));
    loadReports();
  };

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
        <p className="text-lg mb-2 font-medium text-foreground">尚無報告</p>
        <p className="text-sm mb-5">點擊右上角「上傳報告」建立第一份報告，或匯入評鑑範本快速開始</p>
        <TemplateImportDialog />
      </div>
    );
  }

  const allSelected = reportList.length > 0 && selectedIds.size === reportList.length;
  const someSelected = selectedIds.size > 0 && selectedIds.size < reportList.length;

  return (
    <>
      <div className="space-y-3">
        <div className="flex items-center gap-2 px-4 py-1">
          <Checkbox
            checked={allSelected ? true : someSelected ? "indeterminate" : false}
            onCheckedChange={(checked) => {
              if (checked) {
                setSelectedIds(new Set(reportList.map((r) => r.id)));
              } else {
                clearSelection();
              }
            }}
            className="shrink-0"
          />
          <span className="text-sm text-muted-foreground">全選</span>
        </div>
        {reportList.map((report) => (
          <ReportCard
            key={report.id}
            report={report}
            selected={selectedIds.has(report.id)}
            onToggle={toggleSelection}
          />
        ))}
      </div>

      {selectedIds.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-full border bg-background px-5 py-3 shadow-lg">
          <span className="text-sm text-muted-foreground">已選 {selectedIds.size} 份</span>

          <Button
            size="sm"
            variant="outline"
            onClick={() => setConfirmAction("copy")}
          >
            <CopyIcon className="h-4 w-4 mr-1" />
            複製
          </Button>

          <Button
            size="sm"
            variant="destructive"
            onClick={() => setConfirmAction("delete")}
          >
            <TrashIcon className="h-4 w-4 mr-1" />
            刪除
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => setAccreditationOpen(true)}
          >
            <ClipboardListIcon className="h-4 w-4 mr-1" />
            報告分析
          </Button>

          <Button variant="ghost" size="sm" onClick={clearSelection}>
            取消
          </Button>
        </div>
      )}

      {/* Delete confirmation */}
      <AlertDialog open={confirmAction === "delete"} onOpenChange={(open) => !open && setConfirmAction(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>確認刪除 {selectedIds.size} 份報告？</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div>
                <ul className="mt-2 space-y-1 text-sm">
                  {selectedTitles.map((title, i) => (
                    <li key={i} className="truncate">• {title}</li>
                  ))}
                </ul>
                <p className="mt-3 text-destructive font-medium">此操作無法復原。</p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={batchLoading}>取消</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBatchDelete}
              disabled={batchLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {batchLoading ? <LoaderIcon className="h-4 w-4 animate-spin mr-1" /> : null}
              確認刪除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Copy confirmation */}
      <AlertDialog open={confirmAction === "copy"} onOpenChange={(open) => !open && setConfirmAction(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>確認複製 {selectedIds.size} 份報告？</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div>
                <ul className="mt-2 space-y-1 text-sm">
                  {selectedTitles.map((title, i) => (
                    <li key={i} className="truncate">• {title}</li>
                  ))}
                </ul>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={batchLoading}>取消</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBatchCopy}
              disabled={batchLoading}
            >
              {batchLoading ? <LoaderIcon className="h-4 w-4 animate-spin mr-1" /> : null}
              確認複製
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <EvaluationPanel
        open={accreditationOpen}
        onOpenChange={setAccreditationOpen}
        reportIds={Array.from(selectedIds)}
        reportTitles={selectedTitles}
        onSaved={loadReports}
      />
    </>
  );
}
