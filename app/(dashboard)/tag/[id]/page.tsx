"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import { FileTextIcon, PlusIcon, ArrowLeftIcon, PencilIcon, CheckIcon, XIcon, Trash2Icon, LoaderIcon, CopyIcon, UserPlusIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { FileTypeIcon } from "@/components/file-type-icon";
import { useCurrentUserId } from "@/lib/hooks/use-current-user-id";
import { resolveUserEmails } from "@/lib/users";
import { isTagOwner, TAG_ROLE_LABELS } from "@/lib/auth/tag-permissions";
import { EMAIL_REGEX } from "@/lib/utils";

type Client = { id: string; userId: string; nickname: string; description: string | null; viewers: string[]; editors: string[]; createdAt: string };
type ClientReport = { relationId: string; reportId: string; title: string; fileType: string | null; createdAt: string; updatedAt: string | null };
type Report = { id: string; title: string; fileType: string | null; createdAt: string };


export default function TagDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [client, setClient] = useState<Client | null>(null);
  const [clientReports, setClientReports] = useState<ClientReport[]>([]);
  const [loading, setLoading] = useState(true);
  const currentUserId = useCurrentUserId();

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

  // 瀏覽者/編輯者 dialog state
  const [permissionDialog, setPermissionDialog] = useState<"viewers" | "editors" | null>(null);
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [savingPermission, setSavingPermission] = useState(false);
  const [userEmailMap, setUserEmailMap] = useState<Record<string, string>>({});

  useEffect(() => {
    async function load() {
      const [clientRes, relRes] = await Promise.all([
        fetch(`/api/tags/${params.id}`),
        fetch(`/api/tag-reports?clientId=${params.id}`),
      ]);
      if (!clientRes.ok) { router.push("/tag"); return; }
      const clientData: Client = await clientRes.json();
      setClient(clientData);
      setClientReports(relRes.ok ? await relRes.json() : []);
      setLoading(false);
      // Resolve emails for all viewers and editors on load
      const allIds = [...new Set([...clientData.viewers, ...clientData.editors])];
      if (allIds.length > 0) {
        const mapping = await resolveUserEmails(allIds);
        setUserEmailMap((prev) => ({ ...prev, ...mapping }));
      }
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

  async function handleUpdatePermission(field: "viewers" | "editors", ids: string[], silent = false) {
    setSavingPermission(true);
    try {
      const res = await fetch(`/api/tags/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: ids }),
      });
      if (res.ok) {
        setClient((prev) => prev ? { ...prev, [field]: ids } : null);
        if (!silent) toast.success("已更新");
      } else {
        toast.error("更新失敗，請重試");
      }
    } finally {
      setSavingPermission(false);
    }
  }

  async function handleAddMember(field: "viewers" | "editors") {
    if (!client) return;
    const email = newMemberEmail.trim();
    if (!EMAIL_REGEX.test(email)) { toast.error("請輸入有效的 Email 格式"); return; }
    setSavingPermission(true);
    let userId: string;
    let resolvedEmail: string;
    let wasInvited = false;
    const res = await fetch("/api/users/lookup-by-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (res.status === 404) {
      // User not registered — send invite
      const inviteRes = await fetch("/api/users/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, tagId: params.id }),
      });
      if (!inviteRes.ok) {
        const data = await inviteRes.json();
        toast.error(data.error ?? "發送邀請失敗");
        setSavingPermission(false);
        return;
      }
      const invited = await inviteRes.json();
      userId = invited.userId;
      resolvedEmail = invited.email;
      wasInvited = true;
      toast.success(`已發送邀請信至 ${resolvedEmail}`);
    } else if (!res.ok) {
      const data = await res.json();
      toast.error(data.error ?? "查詢失敗");
      setSavingPermission(false);
      return;
    } else {
      const found = await res.json();
      userId = found.userId;
      resolvedEmail = found.email;
    }
    if (client[field].includes(userId)) { setSavingPermission(false); toast.error("此使用者已在列表中"); return; }
    setUserEmailMap((prev) => ({ ...prev, [userId]: resolvedEmail }));
    await handleUpdatePermission(field, [...client[field], userId], true);
    setNewMemberEmail("");
    if (!wasInvited) {
      try {
        const notifyRes = await fetch("/api/users/notify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ targetUserId: userId, tagName: client.nickname, tagId: params.id, role: field === "viewers" ? "viewer" : "editor" }),
        });
        if (!notifyRes.ok) {
          toast.warning(`權限已加入，但通知發送失敗`);
        } else {
          toast.success(`已通知 ${resolvedEmail}`);
        }
      } catch {
        toast.warning(`權限已加入，但通知發送失敗`);
      }
    }
  }

  async function handleRemoveMember(field: "viewers" | "editors", userId: string) {
    if (!client) return;
    await handleUpdatePermission(field, client[field].filter((id) => id !== userId));
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

      <div className="mb-8 flex items-start justify-between gap-4">
        <div className="space-y-2 flex-1 min-w-0">
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

        <div className="flex gap-2 shrink-0 pt-1">
          {isTagOwner(currentUserId ?? "", client) && (
            <>
              <Button
                size="sm"
                variant="outline"
                className="text-destructive hover:text-destructive hover:bg-destructive/5"
                onClick={() => setDeleteClientOpen(true)}
              >
                <Trash2Icon className="h-4 w-4 mr-1.5" />
                刪除標籤
              </Button>
              <Button size="sm" variant="outline" onClick={() => setPermissionDialog("viewers")}>
                <UserPlusIcon className="h-4 w-4 mr-1.5" />
                新增瀏覽者
              </Button>
              <Button size="sm" variant="outline" onClick={() => setPermissionDialog("editors")}>
                <UserPlusIcon className="h-4 w-4 mr-1.5" />
                新增編輯者
              </Button>
            </>
          )}
          <Button size="sm" onClick={openAddDialog}>
            <PlusIcon className="h-4 w-4 mr-1.5" />
            關聯報告
          </Button>
        </div>
      </div>

      {(client.viewers.length > 0 || client.editors.length > 0) && (
        <div className="mb-5 flex flex-wrap gap-6">
          {(["viewers", "editors"] as const).map((field) =>
            client[field].length > 0 ? (
              <div key={field}>
                <p className="text-xs text-muted-foreground mb-1.5 font-medium">
                  {TAG_ROLE_LABELS[field === "viewers" ? "viewer" : "editor"]}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {client[field].map((id) => (
                    <div key={id} className="flex items-center gap-1 text-xs bg-muted px-2.5 py-1 rounded-full">
                      <span>{userEmailMap[id] ?? `${id.slice(0, 8)}...`}</span>
                      {isTagOwner(currentUserId ?? "", client) && (
                        <button
                          onClick={() => handleRemoveMember(field, id)}
                          disabled={savingPermission}
                          className="text-muted-foreground hover:text-destructive transition-colors ml-0.5 disabled:opacity-40"
                          title="移除"
                        >
                          <XIcon className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : null
          )}
        </div>
      )}

      <h2 className="text-lg font-semibold mb-4">報告列表</h2>

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
                      <FileTypeIcon fileType={r.fileType} />
                      {r.title}
                      <span className="ml-auto text-xs text-muted-foreground font-normal">
                        {new Date(r.updatedAt || r.createdAt).toLocaleDateString("zh-TW")}
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

      <Dialog open={permissionDialog !== null} onOpenChange={(open) => { if (!open) { setPermissionDialog(null); setNewMemberEmail(""); } }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{permissionDialog === "viewers" ? "新增瀏覽者" : "新增編輯者"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="flex gap-2 pt-1">
              <Input
                placeholder="輸入 Email"
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && permissionDialog) handleAddMember(permissionDialog); }}
                className="text-sm"
              />
              <Button onClick={() => permissionDialog && handleAddMember(permissionDialog)} disabled={savingPermission || !newMemberEmail.trim()} size="sm">
                新增
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setPermissionDialog(null); setNewMemberEmail(""); }}>關閉</Button>
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
                    <FileTypeIcon fileType={r.fileType} />
                    <span className="flex-1 truncate">{r.title}</span>
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
