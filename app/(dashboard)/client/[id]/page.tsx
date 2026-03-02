"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileTextIcon, PlusIcon, ArrowLeftIcon, PencilIcon, CheckIcon, XIcon, UploadIcon, Trash2Icon, CopyIcon, LoaderIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

type Client = { id: string; nickname: string; description: string | null; createdAt: string };
type Report = { id: string; title: string; createdAt: string; fileType: string | null };

export default function ClientDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [client, setClient] = useState<Client | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  // 內聯編輯 state
  const [editingField, setEditingField] = useState<"nickname" | "description" | null>(null);
  const [editNickname, setEditNickname] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [fieldSaving, setFieldSaving] = useState(false);

  // 新增報告 dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [reportTitle, setReportTitle] = useState("");
  const [reportContent, setReportContent] = useState("");
  const [saving, setSaving] = useState(false);

  // .doc 上傳 state
  const [docFile, setDocFile] = useState<File | null>(null);
  const [docUploading, setDocUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // PDF 上傳 state
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfUploading, setPdfUploading] = useState(false);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  // 刪除對象 state
  const [deleteClientOpen, setDeleteClientOpen] = useState(false);
  const [deletingClient, setDeletingClient] = useState(false);

  // 複製報告 state
  const [copyingId, setCopyingId] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const [clientRes, reportsRes] = await Promise.all([
        fetch(`/api/clients/${params.id}`),
        fetch(`/api/reports?clientId=${params.id}`),
      ]);
      if (!clientRes.ok) { router.push("/client"); return; }
      const clientData = await clientRes.json();
      const reportsData = await reportsRes.json();
      setClient(clientData);
      setReports(reportsData);
      setLoading(false);
    }
    load();
  }, [params.id, router]);

  // 內聯編輯：儲存欄位
  async function handleSaveField(field: "nickname" | "description") {
    if (!client) return;
    const value = field === "nickname" ? editNickname.trim() : editDescription.trim();
    if (field === "nickname" && !value) return;
    setFieldSaving(true);
    const body = field === "nickname" ? { nickname: value } : { description: value };
    const res = await fetch(`/api/clients/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      setClient((prev) => prev ? { ...prev, ...body } : null);
      setEditingField(null);
      toast.success("已儲存");
    } else {
      toast.error("儲存失敗，請重試");
    }
    setFieldSaving(false);
  }

  function startEditNickname() {
    setEditNickname(client?.nickname ?? "");
    setEditingField("nickname");
  }

  function startEditDescription() {
    setEditDescription(client?.description ?? "");
    setEditingField("description");
  }

  // 手動文字建立報告
  const handleCreateReport = async () => {
    if (!reportTitle.trim()) return;
    setSaving(true);
    const res = await fetch("/api/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clientId: params.id, title: reportTitle.trim(), content: reportContent }),
    });
    if (res.ok) {
      const newReport = await res.json();
      setReports((prev) => [newReport, ...prev]);
      setDialogOpen(false);
      setReportTitle("");
      setReportContent("");
      toast.success("報告已建立");
    } else {
      toast.error("建立失敗，請重試");
    }
    setSaving(false);
  };

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
        body: JSON.stringify({ clientId: params.id, title, content: html }),
      });
      if (res.ok) {
        const newReport = await res.json();
        setReports((prev) => [newReport, ...prev]);
        setDialogOpen(false);
        setDocFile(null);
        toast.success("檔案已上傳並建立報告");
      } else {
        toast.error("建立報告失敗，請重試");
      }
    } catch {
      toast.error("檔案解析失敗，請確認為 .docx 格式");
    }
    setDocUploading(false);
  }

  // 上傳 PDF 並建立報告
  async function handlePdfUpload() {
    if (!pdfFile) return;
    setPdfUploading(true);
    try {
      const form = new FormData();
      form.append("file", pdfFile);
      form.append("clientId", params.id);
      const res = await fetch("/api/upload-pdf", { method: "POST", body: form });
      if (!res.ok) { toast.error("PDF 上傳失敗，請重試"); return; }
      const newReport = await res.json();
      setReports((prev) => [newReport, ...prev]);
      setDialogOpen(false);
      setPdfFile(null);
      toast.success("PDF 已上傳並建立報告");
    } catch {
      toast.error("上傳失敗，請重試");
    }
    setPdfUploading(false);
  }

  // 複製報告
  async function handleCopyReport(reportId: string) {
    setCopyingId(reportId);
    try {
      const getRes = await fetch(`/api/reports/${reportId}`);
      if (!getRes.ok) { toast.error("取得報告失敗"); return; }
      const original = await getRes.json();
      const postRes = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId: params.id,
          title: original.title + "複製",
          content: original.content,
        }),
      });
      if (postRes.ok) {
        const newReport = await postRes.json();
        setReports(prev => [newReport, ...prev]);
        toast.success("報告已複製");
      } else {
        toast.error("複製失敗，請重試");
      }
    } catch {
      toast.error("複製失敗，請重試");
    } finally {
      setCopyingId(null);
    }
  }

  // 刪除對象
  async function handleDeleteClient() {
    setDeletingClient(true);
    const res = await fetch(`/api/clients/${params.id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("已刪除服務對象");
      router.push("/client");
    } else {
      toast.error("刪除失敗，請重試");
      setDeletingClient(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8 max-w-3xl space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (!client) return null;

  return (
    <div className="p-8 max-w-3xl">
      <button
        onClick={() => router.push("/client")}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeftIcon className="h-3.5 w-3.5" />
        返回服務對象列表
      </button>

      {/* 個案資訊（可內聯編輯） */}
      <div className="mb-8 space-y-2">
        {/* 名稱 */}
        {editingField === "nickname" ? (
          <div className="flex items-center gap-2">
            <Input
              value={editNickname}
              onChange={(e) => setEditNickname(e.target.value)}
              className="text-2xl font-bold h-auto py-1 max-w-xs"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSaveField("nickname");
                if (e.key === "Escape") setEditingField(null);
              }}
            />
            <Button size="icon" variant="ghost" onClick={() => handleSaveField("nickname")} disabled={fieldSaving}>
              <CheckIcon className="h-4 w-4 text-primary" />
            </Button>
            <Button size="icon" variant="ghost" onClick={() => setEditingField(null)} disabled={fieldSaving}>
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div
            className="group flex items-center gap-2 cursor-pointer w-fit"
            onClick={startEditNickname}
            title="點擊編輯名稱"
          >
            <h1 className="text-2xl font-bold">{client.nickname}</h1>
            <PencilIcon className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        )}

        {/* 簡介 */}
        {editingField === "description" ? (
          <div className="space-y-2">
            <Textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="max-w-md resize-none"
              rows={3}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Escape") setEditingField(null);
              }}
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={() => handleSaveField("description")} disabled={fieldSaving}>
                <CheckIcon className="h-3.5 w-3.5 mr-1" />
                儲存
              </Button>
              <Button size="sm" variant="outline" onClick={() => setEditingField(null)} disabled={fieldSaving}>
                取消
              </Button>
            </div>
          </div>
        ) : (
          <div
            className="group flex items-start gap-2 cursor-pointer w-fit"
            onClick={startEditDescription}
            title="點擊編輯簡介"
          >
            <p className="text-muted-foreground">
              {client.description || <span className="italic text-sm">點擊新增簡介...</span>}
            </p>
            <PencilIcon className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-1 shrink-0" />
          </div>
        )}
      </div>

      {/* 報告列表標題列 */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">相關報告</h2>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="text-destructive hover:text-destructive hover:bg-destructive/5"
            onClick={() => setDeleteClientOpen(true)}
          >
            <Trash2Icon className="h-4 w-4 mr-1.5" />
            刪除對象
          </Button>
          <Button size="sm" onClick={() => setDialogOpen(true)}>
            <PlusIcon className="h-4 w-4 mr-1.5" />
            上傳報告
          </Button>
        </div>
      </div>

      {reports.length === 0 ? (
        <div className="text-center py-14 text-muted-foreground border rounded-lg">
          <FileTextIcon className="h-10 w-10 mx-auto mb-3 opacity-30" />
          <p className="mb-1">尚無相關報告</p>
          <p className="text-sm">點擊「上傳報告」新增此對象的第一份報告</p>
        </div>
      ) : (
        <div className="space-y-3">
          {reports.map((report) => (
            <div key={report.id} className="relative">
              <Link href={`/report/${report.id}`} className="block">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="py-3 px-4">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <FileTextIcon className="h-4 w-4 text-primary" />
                      {report.title}
                      {report.fileType === 'pdf' && (
                        <span className="text-xs bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded">PDF</span>
                      )}
                      <span className="ml-auto text-xs text-muted-foreground font-normal pr-7">
                        {new Date(report.createdAt).toLocaleDateString("zh-TW")}
                      </span>
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Link>
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40"
                onClick={(e) => { e.preventDefault(); handleCopyReport(report.id); }}
                disabled={copyingId === report.id}
                title="複製報告"
              >
                {copyingId === report.id
                  ? <LoaderIcon className="h-3.5 w-3.5 animate-spin" />
                  : <CopyIcon className="h-3.5 w-3.5" />}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 確認刪除對象 Dialog */}
      <Dialog open={deleteClientOpen} onOpenChange={setDeleteClientOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>確認刪除服務對象</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            此操作將永久刪除「{client.nickname}」及所有相關報告，無法復原。
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteClientOpen(false)} disabled={deletingClient}>
              取消
            </Button>
            <Button variant="destructive" onClick={handleDeleteClient} disabled={deletingClient}>
              {deletingClient ? "刪除中..." : "確認刪除"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 上傳報告 Dialog（含兩個 tab） */}
      <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) { setDocFile(null); setPdfFile(null); setReportTitle(""); setReportContent(""); } }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>上傳報告</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="manual">
            <TabsList className="w-full">
              <TabsTrigger value="manual" className="flex-1">手動輸入</TabsTrigger>
              <TabsTrigger value="docfile" className="flex-1">上傳 .doc</TabsTrigger>
              <TabsTrigger value="pdffile" className="flex-1">上傳 PDF</TabsTrigger>
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
                <Button variant="outline" onClick={() => setDialogOpen(false)}>取消</Button>
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
                <Button variant="outline" onClick={() => setDialogOpen(false)}>取消</Button>
                <Button onClick={handleDocUpload} disabled={docUploading || !docFile}>
                  {docUploading ? "解析上傳中..." : "上傳並建立報告"}
                </Button>
              </DialogFooter>
            </TabsContent>
            {/* Tab 3：上傳 PDF */}
            <TabsContent value="pdffile" className="pt-2">
              <div
                className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors"
                onClick={() => pdfInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  if (file && /\.pdf$/i.test(file.name)) setPdfFile(file);
                  else toast.error("請上傳 .pdf 檔案");
                }}
              >
                <UploadIcon className="h-10 w-10 mx-auto mb-3 text-muted-foreground opacity-40" />
                {pdfFile ? (
                  <div>
                    <p className="font-medium text-sm">{pdfFile.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{(pdfFile.size / 1024).toFixed(1)} KB</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-muted-foreground">點擊或拖曳 .pdf 檔案至此</p>
                    <p className="text-xs text-muted-foreground mt-1">上傳後可在報告頁面直接預覽</p>
                  </div>
                )}
                <input
                  ref={pdfInputRef}
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setPdfFile(file);
                  }}
                />
              </div>
              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>取消</Button>
                <Button onClick={handlePdfUpload} disabled={pdfUploading || !pdfFile}>
                  {pdfUploading ? "上傳中..." : "上傳 PDF"}
                </Button>
              </DialogFooter>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}
