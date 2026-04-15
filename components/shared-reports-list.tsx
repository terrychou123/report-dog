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
  Share2Icon,
  ClipboardListIcon,
  TrashIcon,
  CopyIcon,
  LoaderIcon,
} from "lucide-react";
import { FileTypeIcon } from "@/components/file-type-icon";
import { EvaluationPanel } from "@/components/evaluation-panel";
import { toast } from "sonner";

type SharedReport = {
  id: string;
  title: string;
  fileType: string | null;
  fileUrl: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
  ownerEmail: string;
  tags: string[];
};

function SharedReportCard({
  report,
  selected,
  onToggle,
}: {
  report: SharedReport;
  selected: boolean;
  onToggle: (id: string) => void;
}) {
  return (
    <div className={`relative rounded-lg transition-all ${selected ? "ring-2 ring-primary shadow-md" : ""}`}>
      <Card className={`transition-shadow ${selected ? "" : "hover:shadow-md"}`}>
        <CardHeader className="py-3 px-4">
          <CardTitle className="text-sm font-medium flex items-center gap-2 flex-wrap">
            <Checkbox
              checked={selected}
              onCheckedChange={() => onToggle(report.id)}
              onClick={(e) => e.stopPropagation()}
              className="shrink-0"
            />
            <a
              href={`/report/${report.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 flex-1 flex-wrap min-w-0"
              onClick={(e) => e.stopPropagation()}
            >
              <FileTypeIcon fileType={report.fileType} />
              <span className="flex-1 min-w-0">{report.title}</span>
            </a>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 px-4 pb-3">
          <div className="pl-6 flex flex-col gap-0.5 md:flex-row md:items-center md:justify-between md:gap-2">
            <p className="text-xs text-muted-foreground">
              {new Date(report.updatedAt || report.createdAt).toLocaleDateString("zh-TW", {
                timeZone: "Asia/Taipei", // 固定台灣時區
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-xs text-muted-foreground truncate">擁有者:{report.ownerEmail}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SectionHeader({
  title,
  reports,
  selectedIds,
  onSelectAll,
}: {
  title: string;
  reports: SharedReport[];
  selectedIds: Set<string>;
  onSelectAll: (ids: string[], checked: boolean) => void;
}) {
  const sectionIds = reports.map((r) => r.id);
  const selectedCount = sectionIds.filter((id) => selectedIds.has(id)).length;
  const allSelected = reports.length > 0 && selectedCount === reports.length;
  const someSelected = selectedCount > 0 && selectedCount < reports.length;

  return (
    <div className="flex items-center gap-3 mb-3">
      <Checkbox
        checked={allSelected ? true : someSelected ? "indeterminate" : false}
        onCheckedChange={(checked) => onSelectAll(sectionIds, !!checked)}
        className="shrink-0"
        disabled={reports.length === 0}
      />
      <h2 className="text-base font-semibold">{title}</h2>
      <span className="text-xs text-muted-foreground">({reports.length} 份)</span>
    </div>
  );
}

export function SharedReportsList() {
  const [viewable, setViewable] = useState<SharedReport[]>([]);
  const [editable, setEditable] = useState<SharedReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [accreditationOpen, setAccreditationOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<null | "copy" | "delete">(null);
  const [batchLoading, setBatchLoading] = useState(false);

  const loadReports = useCallback(() => {
    setFetchError(false);
    setLoading(true);
    fetch("/api/reports/shared")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        setViewable(data.viewable ?? []);
        setEditable(data.editable ?? []);
        setLoading(false);
      })
      .catch(() => {
        setFetchError(true);
        setLoading(false);
      });
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

  const handleSectionSelectAll = (ids: string[], checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) {
        ids.forEach((id) => next.add(id));
      } else {
        ids.forEach((id) => next.delete(id));
      }
      return next;
    });
  };

  const clearSelection = () => setSelectedIds(new Set());

  const allReports = [...editable, ...viewable];
  const selectedReports = allReports.filter((r) => selectedIds.has(r.id));
  const selectedTitles = selectedReports.map((r) => r.title);
  const hasViewOnlySelected = viewable.some((r) => selectedIds.has(r.id));

  const handleBatchDelete = async () => {
    const editableIds = new Set(editable.map((r) => r.id));
    const ids = Array.from(selectedIds).filter((id) => editableIds.has(id));
    if (ids.length === 0) {
      toast.error("選取的報告皆為唯讀，無法刪除");
      setConfirmAction(null);
      return;
    }
    setBatchLoading(true);
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
      toast.error(`已刪除 ${succeeded} 份，${failed} 份失敗（非擁有者無法刪除）`);
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

  if (fetchError) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        <p className="text-lg mb-2">載入失敗</p>
        <p className="text-sm mb-4">無法取得分享報告，請稍後再試</p>
        <Button variant="outline" size="sm" onClick={loadReports}>重新載入</Button>
      </div>
    );
  }

  if (viewable.length === 0 && editable.length === 0) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        <Share2Icon className="h-12 w-12 mx-auto mb-4 opacity-30" />
        <p className="text-lg mb-2">尚無與您分享的報告</p>
        <p className="text-sm">當其他人透過標籤與您分享報告時，將會顯示在此處</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8">
        {/* Editable section */}
        <div>
          <SectionHeader
            title="我可以編輯的報告"
            reports={editable}
            selectedIds={selectedIds}
            onSelectAll={handleSectionSelectAll}
          />
          {editable.length === 0 ? (
            <p className="text-sm text-muted-foreground pl-7">無</p>
          ) : (
            <div className="space-y-3">
              {editable.map((report) => (
                <SharedReportCard
                  key={report.id}
                  report={report}
                  selected={selectedIds.has(report.id)}
                  onToggle={toggleSelection}
                />
              ))}
            </div>
          )}
        </div>

        {/* Viewable section */}
        <div>
          <SectionHeader
            title="我可以瀏覽的報告"
            reports={viewable}
            selectedIds={selectedIds}
            onSelectAll={handleSectionSelectAll}
          />
          {viewable.length === 0 ? (
            <p className="text-sm text-muted-foreground pl-7">無</p>
          ) : (
            <div className="space-y-3">
              {viewable.map((report) => (
                <SharedReportCard
                  key={report.id}
                  report={report}
                  selected={selectedIds.has(report.id)}
                  onToggle={toggleSelection}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedIds.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-full border bg-background px-5 py-3 shadow-lg">
          <span className="text-sm text-muted-foreground">已選 {selectedIds.size} 份</span>

          <Button size="sm" variant="outline" onClick={() => setConfirmAction("copy")}>
            <CopyIcon className="h-4 w-4 mr-1" />
            複製
          </Button>

          <Button size="sm" variant="destructive" onClick={() => setConfirmAction("delete")} disabled={hasViewOnlySelected}>
            <TrashIcon className="h-4 w-4 mr-1" />
            刪除
          </Button>

          <Button size="sm" variant="outline" onClick={() => setAccreditationOpen(true)}>
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
                <ul className="mt-2 space-y-1 text-sm max-h-48 overflow-y-auto">
                  {selectedTitles.map((title, i) => (
                    <li key={i} className="break-words">• {title}</li>
                  ))}
                </ul>
                <p className="mt-3 text-destructive font-medium">非擁有者的報告將無法刪除。</p>
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
              <ul className="mt-2 space-y-1 text-sm max-h-48 overflow-y-auto">
                {selectedTitles.map((title, i) => (
                  <li key={i} className="break-words">• {title}</li>
                ))}
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={batchLoading}>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleBatchCopy} disabled={batchLoading}>
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
