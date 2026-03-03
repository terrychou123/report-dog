"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { TagIcon, FileTextIcon, PlusIcon, ArrowLeftIcon, XIcon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";

type Kind = { id: string; name: string; description: string | null };
type KindReport = { relationId: string; reportId: string; title: string; fileType: string | null; createdAt: string };
type Report = { id: string; title: string; fileType: string | null; createdAt: string };

export default function KindDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [kind, setKind] = useState<Kind | null>(null);
  const [kindReports, setKindReports] = useState<KindReport[]>([]);
  const [loading, setLoading] = useState(true);

  // Delete dialog
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Add reports dialog
  const [addOpen, setAddOpen] = useState(false);
  const [allReports, setAllReports] = useState<Report[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [loadingReports, setLoadingReports] = useState(false);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    async function load() {
      const [kindRes, relRes] = await Promise.all([
        fetch(`/api/kinds/${params.id}`),
        fetch(`/api/kind-reports?kindId=${params.id}`),
      ]);
      if (!kindRes.ok) { router.push("/kind"); return; }
      setKind(await kindRes.json());
      setKindReports(relRes.ok ? await relRes.json() : []);
      setLoading(false);
    }
    load();
  }, [params.id, router]);

  async function handleDelete() {
    setDeleting(true);
    const res = await fetch(`/api/kinds/${params.id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("已刪除種類");
      router.push("/kind");
    } else {
      toast.error("刪除失敗，請重試");
      setDeleting(false);
    }
  }

  async function handleRemoveRelation(relationId: string) {
    const res = await fetch(`/api/kind-reports/${relationId}`, { method: "DELETE" });
    if (res.ok) {
      setKindReports((prev) => prev.filter((r) => r.relationId !== relationId));
      toast.success("已解除關聯");
    } else {
      toast.error("操作失敗，請重試");
    }
  }

  async function openAddDialog() {
    setAddOpen(true);
    setSelected(new Set());
    setLoadingReports(true);
    const res = await fetch("/api/reports");
    if (res.ok) {
      setAllReports(await res.json());
    }
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
        fetch("/api/kind-reports", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ kindId: params.id, reportId }),
        })
      )
    );
    // Refresh list
    const relRes = await fetch(`/api/kind-reports?kindId=${params.id}`);
    if (relRes.ok) setKindReports(await relRes.json());
    setAdding(false);
    setAddOpen(false);
    toast.success("已新增相關報告");
  }

  const alreadyLinkedIds = new Set(kindReports.map((r) => r.reportId));
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

  if (!kind) return null;

  return (
    <div className="p-8 max-w-3xl">
      <button
        onClick={() => router.push("/kind")}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeftIcon className="h-3.5 w-3.5" />
        返回種類列表
      </button>

      <div className="mb-8 space-y-1">
        <div className="flex items-center gap-2">
          <TagIcon className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">{kind.name}</h1>
        </div>
        {kind.description && (
          <p className="text-muted-foreground">{kind.description}</p>
        )}
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">相關報告</h2>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="text-destructive hover:text-destructive hover:bg-destructive/5"
            onClick={() => setDeleteOpen(true)}
          >
            <Trash2Icon className="h-4 w-4 mr-1.5" />
            刪除種類
          </Button>
          <Button size="sm" onClick={openAddDialog}>
            <PlusIcon className="h-4 w-4 mr-1.5" />
            新增相關
          </Button>
        </div>
      </div>

      {kindReports.length === 0 ? (
        <div className="text-center py-14 text-muted-foreground border rounded-lg">
          <FileTextIcon className="h-10 w-10 mx-auto mb-3 opacity-30" />
          <p className="mb-1">尚無相關報告</p>
          <p className="text-sm">點擊「新增相關」將報告與此種類關聯</p>
        </div>
      ) : (
        <div className="space-y-3">
          {kindReports.map((r) => (
            <div key={r.relationId} className="relative">
              <Link href={`/report/${r.reportId}`} className="block">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="py-3 px-4 pr-12">
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
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                onClick={(e) => { e.preventDefault(); handleRemoveRelation(r.relationId); }}
                title="解除關聯"
              >
                <XIcon className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 確認刪除 Dialog */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>確認刪除種類</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            此操作將永久刪除「{kind.name}」種類，報告本身不受影響。
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteOpen(false)} disabled={deleting}>
              取消
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
              {deleting ? "刪除中..." : "確認刪除"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 新增相關 Dialog */}
      <Dialog open={addOpen} onOpenChange={(open) => { setAddOpen(open); if (!open) setSelected(new Set()); }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>新增相關報告</DialogTitle>
          </DialogHeader>
          {loadingReports ? (
            <div className="space-y-2 py-4">
              {[1, 2, 3].map((i) => <Skeleton key={i} className="h-10 w-full" />)}
            </div>
          ) : availableReports.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">
              沒有可新增的報告（所有報告已關聯或尚無報告）
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
                    {isSelected && (
                      <span className="text-xs text-primary font-medium shrink-0">✓</span>
                    )}
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
              {adding ? "新增中..." : `新增${selected.size > 0 ? ` (${selected.size})` : ""}`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
