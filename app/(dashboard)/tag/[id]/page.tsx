"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import { FileTextIcon, PlusIcon, ArrowLeftIcon, PencilIcon, CheckIcon, XIcon, Trash2Icon, LoaderIcon, CopyIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

type Client = { id: string; nickname: string; description: string | null; createdAt: string };
type ClientReport = { relationId: string; reportId: string; title: string; fileType: string | null; createdAt: string };
type Report = { id: string; title: string; fileType: string | null; createdAt: string };

export default function TagDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [client, setClient] = useState<Client | null>(null);
  const [clientReports, setClientReports] = useState<ClientReport[]>([]);
  const [loading, setLoading] = useState(true);

  // 內聯編輯 state
  const [editingField, setEditingField] = useState<"nickname" | "description" | null>(null);
  const [editNickname, setEditNickname] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [fieldSaving, setFieldSaving] = useState(false);

  // 刪除標籤 state
  const [deleteClientOpen, setDeleteClientOpen] = useState(false);
  const [deletingClient, setDeletingClient] = useState(false);

  // 複製報告 state
  const [copyingId, setCopyingId] = useState<string | null>(null);

  // 關聯報告 dialog state
  const [addOpen, setAddOpen] = useState(false);
  const [allReports, setAllReports] = useState<Report[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [loadingReports, setLoadingReports] = useState(false);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    async function load() {
      const [clientRes, relRes] = await Promise.all([
        fetch(`/api/tags/${params.id}`),
        fetch(`/api/tag-reports?clientId=${params.id}`),
      ]);
      if (!clientRes.ok) { router.push("/tag"); return; }
      setClient(await clientRes.json());
      setClientReports(relRes.ok ? await relRes.json() : []);
      setLoading(false);
    }
    load();
  }, [params.id, router]);

  async function handleSaveField(field: "nickname" | "description") {
    if (!client) return;
    const value = field === "nickname" ? editNickname.trim() : editDescription.trim();
    if (field === "nickname" && !value) return;
    setFieldSaving(true);
    const body = field === "nickname" ? { nickname: value } : { description: value };
    const res = await fetch(`/api/tags/${params.id}`, {
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

  async function handleRemoveRelation(relationId: string) {
    const res = await fetch(`/api/tag-reports/${relationId}`, { method: "DELETE" });
    if (res.ok) {
      setClientReports((prev) => prev.filter((r) => r.relationId !== relationId));
      toast.success("已解除關聯");
    } else {
      toast.error("操作失敗，請重試");
    }
  }

  async function handleCopyReport(reportId: string) {
    setCopyingId(reportId);
    try {
      const getRes = await fetch(`/api/reports/${reportId}`);
      if (!getRes.ok) { toast.error("取得報告失敗"); return; }
      const original = await getRes.json();
      const postRes = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: original.title + "複製", content: original.content }),
      });
      if (postRes.ok) {
        toast.success("報告已複製（可至報告列表查看）");
      } else {
        toast.error("複製失敗，請重試");
      }
    } catch {
      toast.error("複製失敗，請重試");
    } finally {
      setCopyingId(null);
    }
  }

  async function handleDeleteClient() {
    setDeletingClient(true);
    const res = await fetch(`/api/tags/${params.id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("已刪除標籤");
      router.push("/tag");
    } else {
      toast.error("刪除失敗，請重試");
      setDeletingClient(false);
    }
  }

  async function openAddDialog() {
    setAddOpen(true);
    setSelected(new Set());
    setLoadingReports(true);
    const res = await fetch("/api/reports");
    if (res.ok) setAllReports(await res.json());
    setLoadingReports(false);
  }

  function toggleReport(reportId: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(reportId)) next.delete(reportId);
      else next.add(reportId);
      return next;
    });
  }

  async function handleAddReports() {
    if (selected.size === 0) return;
    setAdding(true);
    await Promise.all(
      Array.from(selected).map((reportId) =>
        fetch("/api/tag-reports", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ clientId: params.id, reportId }),
        })
      )
    );
    const relRes = await fetch(`/api/tag-reports?clientId=${params.id}`);
    if (relRes.ok) setClientReports(await relRes.json());
    setAdding(false);
    setAddOpen(false);
    toast.success("已新增關聯報告");
  }

  const alreadyLinkedIds = new Set(clientReports.map((r) => r.reportId));
  const availableReports = allReports.filter((r) => !alreadyLinkedIds.has(r.id));

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
        onClick={() => router.push("/tag")}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeftIcon className="h-3.5 w-3.5" />
        返回標籤列表
      </button>

      <div className="mb-8 space-y-2">
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
            onClick={() => { setEditNickname(client.nickname); setEditingField("nickname"); }}
            title="點擊編輯名稱"
          >
            <h1 className="text-2xl font-bold">{client.nickname}</h1>
            <PencilIcon className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        )}

        {editingField === "description" ? (
          <div className="space-y-2">
            <Textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="max-w-md resize-none"
              rows={3}
              autoFocus
              onKeyDown={(e) => { if (e.key === "Escape") setEditingField(null); }}
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
            onClick={() => { setEditDescription(client.description ?? ""); setEditingField("description"); }}
            title="點擊編輯簡介"
          >
            <p className="text-muted-foreground">
              {client.description || <span className="italic text-sm">點擊新增簡介...</span>}
            </p>
            <PencilIcon className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-1 shrink-0" />
          </div>
        )}
      </div>

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
            刪除標籤
          </Button>
          <Button size="sm" onClick={openAddDialog}>
            <PlusIcon className="h-4 w-4 mr-1.5" />
            關聯報告
          </Button>
        </div>
      </div>

      {clientReports.length === 0 ? (
        <div className="text-center py-14 text-muted-foreground border rounded-lg">
          <FileTextIcon className="h-10 w-10 mx-auto mb-3 opacity-30" />
          <p className="mb-1">尚無相關報告</p>
          <p className="text-sm">點擊「關聯報告」將現有報告與此標籤關聯</p>
        </div>
      ) : (
        <div className="space-y-3">
          {clientReports.map((r) => (
            <div key={r.relationId} className="relative">
              <Link href={`/report/${r.reportId}`} className="block">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="py-3 px-4 pr-20">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <FileTextIcon className="h-4 w-4 text-primary" />
                      {r.title}
                      {r.fileType === "pdf" && (
                        <span className="text-xs bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded">PDF</span>
                      )}
                      <span className="ml-auto text-xs text-muted-foreground font-normal">
                        {new Date(r.createdAt).toLocaleDateString("zh-TW")}
                      </span>
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Link>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <button
                  className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40"
                  onClick={(e) => { e.preventDefault(); handleCopyReport(r.reportId); }}
                  disabled={copyingId === r.reportId}
                  title="複製報告"
                >
                  {copyingId === r.reportId
                    ? <LoaderIcon className="h-3.5 w-3.5 animate-spin" />
                    : <CopyIcon className="h-3.5 w-3.5" />}
                </button>
                <button
                  className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  onClick={(e) => { e.preventDefault(); handleRemoveRelation(r.relationId); }}
                  title="解除關聯"
                >
                  <XIcon className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={deleteClientOpen} onOpenChange={setDeleteClientOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>確認刪除標籤</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            此操作將永久刪除「{client.nickname}」，報告本身不受影響。
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

      <Dialog open={addOpen} onOpenChange={(open) => { setAddOpen(open); if (!open) setSelected(new Set()); }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>關聯報告</DialogTitle>
          </DialogHeader>
          {loadingReports ? (
            <div className="space-y-2 py-4">
              {[1, 2, 3].map((i) => <Skeleton key={i} className="h-10 w-full" />)}
            </div>
          ) : availableReports.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">
              沒有可關聯的報告（所有報告已關聯或尚無報告）
            </p>
          ) : (
            <div className="space-y-2 max-h-72 overflow-y-auto py-2">
              {availableReports.map((r) => {
                const isSelected = selected.has(r.id);
                return (
                  <button
                    key={r.id}
                    onClick={() => toggleReport(r.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg border text-sm transition-colors flex items-center gap-2 ${
                      isSelected
                        ? "border-primary bg-primary/5 text-foreground"
                        : "border-border hover:bg-muted"
                    }`}
                  >
                    <FileTextIcon className="h-4 w-4 text-primary shrink-0" />
                    <span className="flex-1 truncate">{r.title}</span>
                    {r.fileType === "pdf" && (
                      <span className="text-xs bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded shrink-0">PDF</span>
                    )}
                    {isSelected && <span className="text-xs text-primary font-medium shrink-0">✓</span>}
                  </button>
                );
              })}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)} disabled={adding}>
              取消
            </Button>
            <Button onClick={handleAddReports} disabled={adding || selected.size === 0}>
              {adding ? "關聯中..." : `關聯${selected.size > 0 ? ` (${selected.size})` : ""}`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
