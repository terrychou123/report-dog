"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusIcon, UploadIcon } from "lucide-react";
import { toast } from "sonner";

export function UploadReportButton() {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);

  // 手動輸入 state
  const [reportTitle, setReportTitle] = useState("");
  const [reportContent, setReportContent] = useState("");
  const [saving, setSaving] = useState(false);

  // .doc 上傳 state
  const [docFile, setDocFile] = useState<File | null>(null);
  const [docUploading, setDocUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function resetAndClose() {
    setDialogOpen(false);
    setReportTitle("");
    setReportContent("");
    setDocFile(null);
  }

  function onSuccess() {
    resetAndClose();
    router.refresh();
    window.dispatchEvent(new CustomEvent("reports-updated"));
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

  // 上傳 .doc 並建立報告
  async function handleDocUpload() {
    if (!docFile) return;
    setDocUploading(true);
    try {
      const form = new FormData();
      form.append("file", docFile);
      const parseRes = await fetch("/api/parse-doc", { method: "POST", body: form });
      if (!parseRes.ok) throw new Error("parse failed");
      const { html } = await parseRes.json();
      const title = docFile.name.replace(/\.(doc|docx)$/i, "");
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content: html, insertAtTop: true }),
      });
      if (res.ok) {
        toast.success("檔案已上傳並建立報告");
        onSuccess();
      } else {
        toast.error("建立報告失敗，請重試");
      }
    } catch {
      toast.error("檔案解析失敗，請確認為 .docx 格式");
    } finally {
      setDocUploading(false);
    }
  }

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

          <Tabs defaultValue="manual">
            <TabsList className="w-full">
              <TabsTrigger value="manual" className="flex-1">手動輸入</TabsTrigger>
              <TabsTrigger value="docfile" className="flex-1">上傳 .doc</TabsTrigger>
            </TabsList>

            {/* Tab 1：手動輸入 */}
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

            {/* Tab 2：上傳 .doc */}
            <TabsContent value="docfile" className="pt-2">
              <div
                className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  if (file && /\.(doc|docx)$/i.test(file.name)) setDocFile(file);
                  else toast.error("請上傳 .doc 或 .docx 檔案");
                }}
              >
                <UploadIcon className="h-10 w-10 mx-auto mb-3 text-muted-foreground opacity-40" />
                {docFile ? (
                  <div>
                    <p className="font-medium text-sm">{docFile.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{(docFile.size / 1024).toFixed(1)} KB</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-muted-foreground">點擊或拖曳 .doc / .docx 檔案至此</p>
                    <p className="text-xs text-muted-foreground mt-1">支援 Word 2007+ 格式（.docx）</p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".doc,.docx"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setDocFile(file);
                  }}
                />
              </div>
              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={resetAndClose}>取消</Button>
                <Button onClick={handleDocUpload} disabled={docUploading || !docFile}>
                  {docUploading ? "解析上傳中..." : "上傳並建立報告"}
                </Button>
              </DialogFooter>
            </TabsContent>

          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}
