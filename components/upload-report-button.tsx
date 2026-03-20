"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusIcon, UploadIcon, CheckCircle2Icon, XCircleIcon, LoaderIcon, FileIcon } from "lucide-react";
import { toast } from "sonner";

type FileStatus = "pending" | "uploading" | "success" | "error";

interface FileEntry {
  file: File;
  status: FileStatus;
  error?: string;
}

export function UploadReportButton() {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);

  // 手動輸入 state
  const [reportTitle, setReportTitle] = useState("");
  const [reportContent, setReportContent] = useState("");
  const [saving, setSaving] = useState(false);

  // 多檔上傳 state
  const [fileEntries, setFileEntries] = useState<FileEntry[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function resetAndClose() {
    setDialogOpen(false);
    setReportTitle("");
    setReportContent("");
    setFileEntries([]);
  }

  function onSuccess() {
    resetAndClose();
    router.refresh();
    window.dispatchEvent(new CustomEvent("reports-updated"));
  }

  function getFileType(file: File): "word" | "excel" | "unsupported" {
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (ext === "doc" || ext === "docx") return "word";
    if (ext === "xlsx" || ext === "xls") return "excel";
    return "unsupported";
  }

  function addFiles(files: FileList | File[]) {
    const newEntries: FileEntry[] = Array.from(files).map((file) => ({
      file,
      status: "pending",
      error: getFileType(file) === "unsupported" ? "不支援的格式（僅接受 .doc/.docx/.xlsx/.xls）" : undefined,
    }));
    setFileEntries((prev) => [...prev, ...newEntries]);
  }

  function removeFile(index: number) {
    setFileEntries((prev) => prev.filter((_, i) => i !== index));
  }

  // 手動建立報告
  async function handleCreateReport() {
    if (!reportTitle.trim()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: reportTitle.trim(), content: reportContent, insertAtTop: true }),
      });
      if (res.ok) {
        toast.success("報告已建立");
        onSuccess();
      } else {
        toast.error("建立失敗，請重試");
      }
    } catch {
      toast.error("建立失敗，請重試");
    } finally {
      setSaving(false);
    }
  }

  async function uploadWordFile(file: File): Promise<void> {
    const form = new FormData();
    form.append("file", file);
    const parseRes = await fetch("/api/parse-doc", { method: "POST", body: form });
    if (!parseRes.ok) throw new Error("parse failed");
    const { html } = await parseRes.json();
    const title = file.name.replace(/\.(doc|docx)$/i, "");
    const res = await fetch("/api/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content: html, insertAtTop: true }),
    });
    if (!res.ok) throw new Error("create failed");
  }

  async function uploadExcelFile(file: File): Promise<void> {
    const form = new FormData();
    form.append("file", file);
    form.append("insertAtTop", "true");
    const res = await fetch("/api/excel/parse", { method: "POST", body: form });
    if (!res.ok) throw new Error("upload failed");
    const { report } = await res.json();
    if (!report) throw new Error("no report returned");
  }

  // 序列上傳，避免 sortOrder 競態
  async function handleUploadFiles() {
    const validEntries = fileEntries.filter((e) => !e.error);
    if (validEntries.length === 0) return;

    setIsUploading(true);

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < fileEntries.length; i++) {
      const entry = fileEntries[i];
      if (entry.error) continue; // 跳過不支援格式

      setFileEntries((prev) =>
        prev.map((e, idx) => (idx === i ? { ...e, status: "uploading" } : e))
      );

      try {
        const type = getFileType(entry.file);
        if (type === "word") {
          await uploadWordFile(entry.file);
        } else if (type === "excel") {
          await uploadExcelFile(entry.file);
        }
        successCount++;
        setFileEntries((prev) =>
          prev.map((e, idx) => (idx === i ? { ...e, status: "success" } : e))
        );
      } catch {
        errorCount++;
        setFileEntries((prev) =>
          prev.map((e, idx) =>
            idx === i ? { ...e, status: "error", error: "上傳失敗，請重試" } : e
          )
        );
      }
    }

    setIsUploading(false);

    // 副作用在 setState 外執行（避免 React 渲染中觸發 Router 更新）
    if (successCount > 0 && errorCount === 0) {
      toast.success(`成功建立 ${successCount} 份報告`);
      onSuccess();
    } else if (successCount > 0 && errorCount > 0) {
      toast.warning(`${successCount} 份成功，${errorCount} 份失敗`);
      router.refresh();
      window.dispatchEvent(new CustomEvent("reports-updated"));
    } else {
      toast.error("所有檔案上傳失敗，請重試");
    }
  }

  const hasValidFiles = fileEntries.some((e) => !e.error);
  const allDone = fileEntries.every((e) => e.status === "success" || (e.status === "pending" && !!e.error));

  return (
    <>
      <Button size="sm" onClick={() => setDialogOpen(true)}>
        <PlusIcon className="h-4 w-4 mr-1.5" />
        上傳報告
      </Button>

      <Dialog open={dialogOpen} onOpenChange={(open) => { if (!open) resetAndClose(); else setDialogOpen(true); }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>上傳報告</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="upload">
            <TabsList className="w-full">
              <TabsTrigger value="upload" className="flex-1">上傳檔案</TabsTrigger>
              <TabsTrigger value="manual" className="flex-1">手動輸入</TabsTrigger>
            </TabsList>

            {/* Tab 1：上傳檔案（Word + Excel 混合） */}
            <TabsContent value="upload" className="pt-2 space-y-3">
              <div
                className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (e.dataTransfer.files.length > 0) addFiles(e.dataTransfer.files);
                }}
              >
                <UploadIcon className="h-10 w-10 mx-auto mb-3 text-muted-foreground opacity-40" />
                <p className="text-sm text-muted-foreground">點擊或拖曳檔案至此（可多選）</p>
                <p className="text-xs text-muted-foreground mt-1">支援 .doc / .docx（Word）及 .xlsx / .xls（Excel）</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".doc,.docx,.xlsx,.xls"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      addFiles(e.target.files);
                      e.target.value = "";
                    }
                  }}
                />
              </div>

              {fileEntries.length > 0 && (
                <ul className="space-y-2 max-h-48 overflow-y-auto">
                  {fileEntries.map((entry, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm rounded-md border px-3 py-2">
                      <FileIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <span className="flex-1 truncate min-w-0">{entry.file.name}</span>
                      {entry.status === "pending" && !entry.error && (
                        <span className="text-xs text-muted-foreground shrink-0">等待中</span>
                      )}
                      {entry.status === "uploading" && (
                        <LoaderIcon className="h-4 w-4 shrink-0 animate-spin text-primary" />
                      )}
                      {entry.status === "success" && (
                        <CheckCircle2Icon className="h-4 w-4 shrink-0 text-green-500" />
                      )}
                      {(entry.status === "error" || entry.error) && (
                        <span className="flex items-center gap-1 text-xs text-destructive shrink-0">
                          <XCircleIcon className="h-4 w-4" />
                          {entry.error ?? "失敗"}
                        </span>
                      )}
                      {entry.status === "pending" && !isUploading && (
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                          className="ml-1 text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="移除檔案"
                        >
                          ×
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              )}

              <DialogFooter>
                <Button variant="outline" onClick={resetAndClose} disabled={isUploading}>取消</Button>
                <Button
                  onClick={handleUploadFiles}
                  disabled={isUploading || !hasValidFiles || allDone}
                >
                  {isUploading ? "上傳中..." : "上傳並建立報告"}
                </Button>
              </DialogFooter>
            </TabsContent>

            {/* Tab 2：手動輸入 */}
            <TabsContent value="manual" className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label htmlFor="report-title">報告標題 *</Label>
                <Input
                  id="report-title"
                  placeholder="例如：初始評估報告、追蹤記錄 2024/01"
                  value={reportTitle}
                  onChange={(e) => setReportTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="report-content">報告內容</Label>
                <Textarea
                  id="report-content"
                  placeholder="貼上報告內容..."
                  value={reportContent}
                  onChange={(e) => setReportContent(e.target.value)}
                  rows={8}
                  className="resize-none"
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={resetAndClose}>取消</Button>
                <Button onClick={handleCreateReport} disabled={saving || !reportTitle.trim()}>
                  {saving ? "儲存中..." : "儲存報告"}
                </Button>
              </DialogFooter>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}
