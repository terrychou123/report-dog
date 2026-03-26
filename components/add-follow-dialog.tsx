"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusIcon, FileTextIcon, TableIcon } from "lucide-react";
import { FREQUENCY_LABELS, FREQUENCY_ORDER, type Frequency } from "@/lib/follow-utils";
import { toast } from "sonner";

type ReportOption = { id: string; title: string; fileType: string | null; updatedAt: string };

export function AddFollowDialog({
  followedReportIds,
  onAdded,
}: {
  followedReportIds: Set<string>;
  onAdded: (
    followId: string,
    reportId: string,
    reportTitle: string,
    reportUpdatedAt: string,
    fileType: string | null,
    frequency: Frequency
  ) => void;
}) {
  const [open, setOpen] = useState(false);
  const [frequency, setFrequency] = useState<Frequency>("weekly");
  const [reports, setReports] = useState<ReportOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    fetch("/api/reports")
      .then((r) => r.json())
      .then((data) => {
        setReports(data.filter((r: ReportOption) => !followedReportIds.has(r.id)));
      })
      .finally(() => setLoading(false));
  }, [open, followedReportIds]);

  const handleSubmit = async () => {
    if (!selectedReportId) { toast.error("請選擇要追蹤的報告"); return; }
    setSubmitting(true);
    try {
      const res = await fetch("/api/follows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportId: selectedReportId, frequency }),
      });
      if (!res.ok) throw new Error();
      const follow = await res.json();
      const report = reports.find((r) => r.id === selectedReportId)!;
      onAdded(follow.id, report.id, report.title, report.updatedAt, report.fileType, frequency);
      toast.success("已新增追蹤");
      setOpen(false);
      setSelectedReportId(null);
      setFrequency("weekly");
    } catch {
      toast.error("新增追蹤失敗");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)}>
        <PlusIcon className="h-4 w-4 mr-1" />
        新增追蹤
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>新增追蹤報告</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">追蹤頻率</label>
              <Select value={frequency} onValueChange={(v) => setFrequency(v as Frequency)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FREQUENCY_ORDER.map((f) => (
                    <SelectItem key={f} value={f}>{FREQUENCY_LABELS[f]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">選擇報告</label>
              {loading ? (
                <p className="text-sm text-muted-foreground">載入中...</p>
              ) : reports.length === 0 ? (
                <p className="text-sm text-muted-foreground">所有報告都已追蹤</p>
              ) : (
                <ScrollArea className="h-56 border rounded-md">
                  <div className="p-1 space-y-0.5">
                    {reports.map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setSelectedReportId(r.id)}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm text-left transition-colors ${
                          selectedReportId === r.id
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }`}
                      >
                        {r.fileType === "excel" ? (
                          <TableIcon className="h-3.5 w-3.5 shrink-0" />
                        ) : (
                          <FileTextIcon className="h-3.5 w-3.5 shrink-0" />
                        )}
                        <span className="truncate">{r.title}</span>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>取消</Button>
            <Button onClick={handleSubmit} disabled={submitting || !selectedReportId}>
              {submitting ? "追蹤中..." : "確認追蹤"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
