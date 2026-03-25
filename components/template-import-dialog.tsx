"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2Icon, CheckIcon, DownloadIcon } from "lucide-react";
import { toast } from "sonner";
import type { FacilityTemplate } from "@/lib/types/templates";

export function TemplateImportDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [templates, setTemplates] = useState<FacilityTemplate[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);

  async function fetchTemplates() {
    setLoading(true);
    try {
      const res = await fetch("/api/templates");
      if (res.ok) {
        setTemplates(await res.json());
      } else {
        toast.error("載入範本資料失敗，請重試");
      }
    } catch {
      toast.error("載入範本資料失敗，請重試");
    } finally {
      setLoading(false);
    }
  }

  function handleOpen() {
    setOpen(true);
    setSelected(null);
    setTemplates([]);
    fetchTemplates();
  }

  async function handleImport() {
    if (!selected) return;
    setImporting(true);
    try {
      const res = await fetch("/api/templates/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ facilityType: selected }),
      });
      if (res.status === 409) {
        toast.error("此機構類型已匯入過");
        return;
      }
      if (!res.ok) throw new Error();
      const data = await res.json();
      toast.success(`匯入完成！已建立 ${data.tagCount} 個標籤、${data.reportCount} 份報告`);
      window.dispatchEvent(new Event("reports-updated"));
      setOpen(false);
      router.refresh();
    } catch {
      toast.error("匯入失敗，請稍後再試");
    } finally {
      setImporting(false);
    }
  }

  const selectedTemplate = templates.find((t) => t.facilityType === selected);

  return (
    <>
      <Button variant="outline" size="sm" onClick={handleOpen}>
        <DownloadIcon className="h-4 w-4 mr-1.5" />
        匯入評鑑範本
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>匯入評鑑範本</DialogTitle>
            <DialogDescription>
              選擇您的機構類型，一鍵建立評鑑標籤與報告範本
            </DialogDescription>
          </DialogHeader>

          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2Icon className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
                {templates.map((t) => {
                  const isSelected = selected === t.facilityType;
                  return (
                    <button
                      key={t.facilityType}
                      type="button"
                      disabled={t.alreadyImported}
                      onClick={() => setSelected(t.facilityType)}
                      className={[
                        "text-left rounded-lg border p-4 transition-all",
                        t.alreadyImported
                          ? "opacity-50 cursor-not-allowed bg-muted/30"
                          : isSelected
                          ? "border-primary ring-2 ring-primary ring-offset-1"
                          : "hover:border-primary/50 hover:shadow-sm cursor-pointer",
                      ].join(" ")}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="font-medium text-sm truncate">{t.label}</p>
                          {t.tagCount > 0 && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {t.tagCount} 個標籤・{t.reportCount} 份報告
                            </p>
                          )}
                          {t.tagCount === 0 && (
                            <p className="text-xs text-muted-foreground mt-1">尚未有範本資料</p>
                          )}
                        </div>
                        {t.alreadyImported ? (
                          <Badge variant="secondary" className="shrink-0 text-xs">已匯入</Badge>
                        ) : isSelected ? (
                          <CheckIcon className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        ) : null}
                      </div>
                    </button>
                  );
                })}
              </div>

              {selectedTemplate && selectedTemplate.tagCount > 0 && (
                <p className="text-sm text-muted-foreground border-t pt-3">
                  將為您建立{" "}
                  <span className="font-medium text-foreground">{selectedTemplate.tagCount}</span>{" "}
                  個標籤、
                  <span className="font-medium text-foreground">{selectedTemplate.reportCount}</span>{" "}
                  份報告範本
                </p>
              )}

              <div className="flex justify-end gap-2 pt-1">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  取消
                </Button>
                <Button
                  onClick={handleImport}
                  disabled={!selected || importing || (selectedTemplate?.tagCount ?? 0) === 0}
                >
                  {importing ? (
                    <>
                      <Loader2Icon className="h-4 w-4 mr-1.5 animate-spin" />
                      匯入中...
                    </>
                  ) : (
                    "確認匯入"
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
