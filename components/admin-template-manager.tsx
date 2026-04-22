"use client";

import { useState, useTransition, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { PlusIcon, PencilIcon, CopyIcon, Trash2Icon, LinkIcon, ChevronDownIcon, ChevronRightIcon } from "lucide-react";

type TemplateTag = {
  id: string;
  facilityType: string;
  name: string;
  description: string | null;
  sortOrder: number;
};

type ReportTemplate = {
  id: string;
  facilityType: string;
  title: string;
  content: string | null;
  fileType: string | null;
  responsible: string | null;
  sortOrder: number;
};

type TagReport = {
  id: string;
  templateTagId: string;
  reportTemplateId: string;
  sortOrder: number;
};

type TemplateLink = {
  id: string;
  templateId: string;
  name: string;
  url: string;
  sortOrder: number;
};

type Props = {
  facilityType: string;
  initialTags: TemplateTag[];
  initialTemplates: ReportTemplate[];
  initialLinks: TagReport[];
  initialTemplateLinks: TemplateLink[];
};

// ─── Tag Dialog ───────────────────────────────────────────────────────────────

function TagDialog({
  open,
  onClose,
  onSave,
  initial,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (name: string, description: string) => void;
  initial?: { name: string; description: string };
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");

  function handleSave() {
    if (!name.trim()) { toast.error("名稱不可為空"); return; }
    onSave(name.trim(), description.trim());
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initial ? "編輯標籤" : "新增標籤"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label>負責人員名稱 *</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="例：行政/社工" />
          </div>
          <div className="space-y-1.5">
            <Label>描述（選填）</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} placeholder="標籤說明" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>取消</Button>
          <Button onClick={handleSave}>儲存</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Template Dialog ──────────────────────────────────────────────────────────

function TemplateDialog({
  open,
  onClose,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (title: string, responsible: string, fileType: string) => void;
}) {
  const [title, setTitle] = useState("");
  const [responsible, setResponsible] = useState("");
  const [fileType, setFileType] = useState("excel");

  function handleSave() {
    if (!title.trim()) { toast.error("標題不可為空"); return; }
    onSave(title.trim(), responsible.trim(), fileType);
    setTitle(""); setResponsible(""); setFileType("excel");
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>新增範本</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label>範本標題 *</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="例：服務資訊公開" />
          </div>
          <div className="space-y-1.5">
            <Label>負責人員</Label>
            <Input value={responsible} onChange={(e) => setResponsible(e.target.value)} placeholder="例：行政/社工" />
          </div>
          <div className="space-y-1.5">
            <Label>檔案類型</Label>
            <Select value={fileType} onValueChange={setFileType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="excel">Excel 試算表</SelectItem>
                <SelectItem value="docx">Word 文件</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>取消</Button>
          <Button onClick={handleSave}>儲存</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Association Dialog ───────────────────────────────────────────────────────

function AssocDialog({
  open,
  onClose,
  tag,
  templates,
  linkedIds,
  onToggle,
}: {
  open: boolean;
  onClose: () => void;
  tag: TemplateTag;
  templates: ReportTemplate[];
  linkedIds: Set<string>;
  onToggle: (reportTemplateId: string, linked: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>關聯範本 — {tag.name}</DialogTitle>
        </DialogHeader>
        <div className="max-h-80 overflow-y-auto space-y-2 py-2">
          {templates.length === 0 && (
            <p className="text-sm text-muted-foreground">尚無範本可關聯</p>
          )}
          {templates.map((t) => {
            const checked = linkedIds.has(t.id);
            return (
              <label key={t.id} className="flex items-center gap-3 rounded-md border px-3 py-2 cursor-pointer hover:bg-muted/50">
                <Checkbox
                  checked={checked}
                  onCheckedChange={(v) => onToggle(t.id, !!v)}
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{t.title}</p>
                  {t.responsible && (
                    <p className="text-xs text-muted-foreground">{t.responsible}</p>
                  )}
                </div>
              </label>
            );
          })}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>關閉</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Delete Confirm ───────────────────────────────────────────────────────────

function DeleteConfirm({
  open,
  label,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  label: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>確認刪除</AlertDialogTitle>
          <AlertDialogDescription>
            確定要刪除「{label}」嗎？此操作無法復原。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>取消</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            刪除
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function AdminTemplateManager({ facilityType, initialTags, initialTemplates, initialLinks, initialTemplateLinks }: Props) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [tags, setTags] = useState<TemplateTag[]>(initialTags);
  const [templates, setTemplates] = useState<ReportTemplate[]>(initialTemplates);
  const [links, setLinks] = useState<TagReport[]>(initialLinks);

  // Expanded tag for inline linked-template view
  const [expandedTagId, setExpandedTagId] = useState<string | null>(null);

  // Tag dialogs
  const [tagDialog, setTagDialog] = useState<{ open: boolean; editing?: TemplateTag }>({ open: false });
  const [deleteTagDialog, setDeleteTagDialog] = useState<{ open: boolean; tag?: TemplateTag }>({ open: false });
  const [assocDialog, setAssocDialog] = useState<{ open: boolean; tag?: TemplateTag }>({ open: false });

  // Template dialogs
  const [templateDialog, setTemplateDialog] = useState<{ open: boolean }>({ open: false });
  const [deleteTemplateDialog, setDeleteTemplateDialog] = useState<{ open: boolean; template?: ReportTemplate }>({ open: false });

  function refresh() {
    startTransition(() => router.refresh());
  }

  // ── Tag CRUD ──

  async function handleSaveTag(name: string, description: string) {
    if (tagDialog.editing) {
      const res = await fetch(`/api/admin/tags/${tagDialog.editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }),
      });
      if (!res.ok) { toast.error("儲存失敗"); return; }
      const updated: TemplateTag = await res.json();
      setTags((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
      toast.success("標籤已更新");
    } else {
      const res = await fetch("/api/admin/tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ facilityType, name, description }),
      });
      if (!res.ok) { toast.error("新增失敗"); return; }
      const newTag: TemplateTag = await res.json();
      setTags((prev) => [...prev, newTag]);
      toast.success("標籤已新增");
    }
    refresh();
  }

  async function handleCopyTag(tag: TemplateTag) {
    const res = await fetch(`/api/admin/tags/${tag.id}/copy`, { method: "POST" });
    if (!res.ok) { toast.error("複製失敗"); return; }
    const newTag: TemplateTag = await res.json();
    setTags((prev) => [...prev, newTag]);
    toast.success("標籤已複製");
    refresh();
  }

  async function handleDeleteTag() {
    const tag = deleteTagDialog.tag;
    if (!tag) return;
    const res = await fetch(`/api/admin/tags/${tag.id}`, { method: "DELETE" });
    if (!res.ok) { toast.error("刪除失敗"); return; }
    setTags((prev) => prev.filter((t) => t.id !== tag.id));
    setLinks((prev) => prev.filter((l) => l.templateTagId !== tag.id));
    toast.success("標籤已刪除");
    setDeleteTagDialog({ open: false });
    refresh();
  }

  // ── Template CRUD ──

  async function handleSaveTemplate(title: string, responsible: string, fileType: string) {
    const res = await fetch("/api/admin/templates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ facilityType, title, responsible, fileType }),
    });
    if (!res.ok) { toast.error("新增失敗"); return; }
    const newTemplate: ReportTemplate = await res.json();
    setTemplates((prev) => [...prev, newTemplate]);
    toast.success("範本已新增");
    refresh();
  }

  async function handleCopyTemplate(template: ReportTemplate) {
    const res = await fetch(`/api/admin/templates/${template.id}/copy`, { method: "POST" });
    if (!res.ok) { toast.error("複製失敗"); return; }
    const newTemplate: ReportTemplate = await res.json();
    setTemplates((prev) => [...prev, newTemplate]);
    toast.success("範本已複製");
    refresh();
  }

  async function handleDeleteTemplate() {
    const tmpl = deleteTemplateDialog.template;
    if (!tmpl) return;
    const res = await fetch(`/api/admin/templates/${tmpl.id}`, { method: "DELETE" });
    if (!res.ok) { toast.error("刪除失敗"); return; }
    setTemplates((prev) => prev.filter((t) => t.id !== tmpl.id));
    setLinks((prev) => prev.filter((l) => l.reportTemplateId !== tmpl.id));
    toast.success("範本已刪除");
    setDeleteTemplateDialog({ open: false });
    refresh();
  }

  // ── Association toggle ──

  async function handleToggleAssoc(reportTemplateId: string, linked: boolean) {
    const tag = assocDialog.tag;
    if (!tag) return;
    if (linked) {
      const res = await fetch("/api/admin/tag-reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tagId: tag.id, reportTemplateId }),
      });
      if (!res.ok) { toast.error("關聯失敗"); return; }
      setLinks((prev) => {
        if (prev.some((l) => l.templateTagId === tag.id && l.reportTemplateId === reportTemplateId)) return prev;
        return [...prev, { id: crypto.randomUUID(), templateTagId: tag.id, reportTemplateId, sortOrder: 0 }];
      });
    } else {
      const params = new URLSearchParams({ tagId: tag.id, reportTemplateId });
      const res = await fetch(`/api/admin/tag-reports?${params}`, { method: "DELETE" });
      if (!res.ok) { toast.error("解除關聯失敗"); return; }
      setLinks((prev) => prev.filter((l) => !(l.templateTagId === tag.id && l.reportTemplateId === reportTemplateId)));
    }
    refresh();
  }

  // ── Helpers ──

  function tagLinkedCount(tagId: string) {
    return new Set(links.filter((l) => l.templateTagId === tagId).map((l) => l.reportTemplateId)).size;
  }

  function tagLinkedTemplates(tagId: string) {
    const tmplIds = new Set(links.filter((l) => l.templateTagId === tagId).map((l) => l.reportTemplateId));
    return templates.filter((t) => tmplIds.has(t.id));
  }

  function templateLinkedTags(templateId: string) {
    const tagIds = new Set(links.filter((l) => l.reportTemplateId === templateId).map((l) => l.templateTagId));
    return tags.filter((t) => tagIds.has(t.id));
  }

  function assocLinkedIds(tagId: string) {
    return new Set(links.filter((l) => l.templateTagId === tagId).map((l) => l.reportTemplateId));
  }

  const templateLinksMap = useMemo(() => {
    const map = new Map<string, TemplateLink[]>();
    for (const l of initialTemplateLinks) {
      if (!map.has(l.templateId)) map.set(l.templateId, []);
      map.get(l.templateId)!.push(l);
    }
    return map;
  }, [initialTemplateLinks]);

  return (
    <>
      <Tabs defaultValue="templates">
        <TabsList className="mb-6">
          <TabsTrigger value="tags">標籤管理（{tags.length}）</TabsTrigger>
          <TabsTrigger value="templates">範本管理（{templates.length}）</TabsTrigger>
        </TabsList>

        {/* ── Tags Tab ── */}
        <TabsContent value="tags">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">每個標籤代表一個負責人員群組</p>
            <Button size="sm" onClick={() => setTagDialog({ open: true })}>
              <PlusIcon className="h-4 w-4 mr-1.5" />
              新增標籤
            </Button>
          </div>

          <div className="space-y-2">
            {tags.length === 0 && (
              <p className="text-sm text-muted-foreground py-8 text-center">尚無標籤</p>
            )}
            {tags.map((tag) => {
              const isExpanded = expandedTagId === tag.id;
              const linkedTmpls = isExpanded ? tagLinkedTemplates(tag.id) : [];
              return (
                <div key={tag.id} className="rounded-lg border bg-card overflow-hidden">
                  {/* Header row */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 px-4 py-3">
                    <button
                      className="flex items-center gap-2 flex-1 min-w-0 text-left"
                      onClick={() => setExpandedTagId(isExpanded ? null : tag.id)}
                    >
                      {isExpanded
                        ? <ChevronDownIcon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        : <ChevronRightIcon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      }
                      <div className="min-w-0">
                        <p className="font-medium text-sm">{tag.name}</p>
                        {tag.description && (
                          <p className="text-xs text-muted-foreground mt-0.5 truncate">{tag.description}</p>
                        )}
                      </div>
                    </button>
                    <div className="flex items-center gap-2 pl-6 sm:pl-0">
                      <Badge variant="outline" className="text-xs shrink-0">
                        {tagLinkedCount(tag.id)} 個範本
                      </Badge>
                      <div className="flex gap-1 shrink-0">
                        <Button variant="ghost" size="icon" className="h-8 w-8" title="關聯範本"
                          onClick={() => setAssocDialog({ open: true, tag })}>
                          <LinkIcon className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" title="編輯"
                          onClick={() => setTagDialog({ open: true, editing: tag })}>
                          <PencilIcon className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" title="複製"
                          onClick={() => handleCopyTag(tag)}>
                          <CopyIcon className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" title="刪除"
                          onClick={() => setDeleteTagDialog({ open: true, tag })}>
                          <Trash2Icon className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  {/* Inline linked templates */}
                  {isExpanded && (
                    <div className="border-t bg-muted/20 px-4 py-2 space-y-1">
                      {linkedTmpls.length === 0 ? (
                        <p className="text-xs text-muted-foreground py-1">尚無關聯範本</p>
                      ) : (
                        linkedTmpls.map((tmpl) => {
                          const tmplTags = templateLinkedTags(tmpl.id);
                          return (
                            <div key={tmpl.id} className="flex items-center gap-2 py-1">
                              <span className="text-sm flex-1 min-w-0 truncate">{tmpl.title}</span>
                              <div className="flex flex-wrap gap-1 justify-end">
                                {tmplTags.map((t) => (
                                  <Badge key={t.id} variant="secondary" className="text-xs">{t.name}</Badge>
                                ))}
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </TabsContent>

        {/* ── Templates Tab ── */}
        <TabsContent value="templates">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">管理評鑑報告範本</p>
            <Button size="sm" onClick={() => setTemplateDialog({ open: true })}>
              <PlusIcon className="h-4 w-4 mr-1.5" />
              新增範本
            </Button>
          </div>

          <div className="space-y-2">
            {templates.length === 0 && (
              <p className="text-sm text-muted-foreground py-8 text-center">尚無範本</p>
            )}
            {templates.map((tmpl) => {
              const linkedTags = templateLinkedTags(tmpl.id);
              const tmplLinks = templateLinksMap.get(tmpl.id) ?? [];
              return (
                <div key={tmpl.id} className="flex items-start gap-3 rounded-lg border px-4 py-3 bg-card">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{tmpl.title}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {linkedTags.length > 0
                        ? linkedTags.map((t) => (
                            <Badge key={t.id} variant="outline" className="text-xs">{t.name}</Badge>
                          ))
                        : tmpl.responsible && (
                            <span className="text-xs text-muted-foreground">{tmpl.responsible}</span>
                          )
                      }
                      {tmplLinks.map((link) => (
                        <button key={link.id} type="button"
                          className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                          onClick={() => window.open(link.url, "_blank", "noopener,noreferrer")}>
                          <LinkIcon className="h-3 w-3 shrink-0" />
                          {link.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button variant="ghost" size="icon" className="h-8 w-8" title="編輯"
                      onClick={() => router.push(`/admin/${facilityType}/${tmpl.id}`)}>
                      <PencilIcon className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" title="複製"
                      onClick={() => handleCopyTemplate(tmpl)}>
                      <CopyIcon className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" title="刪除"
                      onClick={() => setDeleteTemplateDialog({ open: true, template: tmpl })}>
                      <Trash2Icon className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <TagDialog
        key={tagDialog.editing?.id ?? "new"}
        open={tagDialog.open}
        onClose={() => setTagDialog({ open: false })}
        onSave={handleSaveTag}
        initial={tagDialog.editing ? { name: tagDialog.editing.name, description: tagDialog.editing.description ?? "" } : undefined}
      />

      <TemplateDialog
        open={templateDialog.open}
        onClose={() => setTemplateDialog({ open: false })}
        onSave={handleSaveTemplate}
      />

      {assocDialog.tag && (
        <AssocDialog
          open={assocDialog.open}
          onClose={() => setAssocDialog({ open: false })}
          tag={assocDialog.tag}
          templates={templates}
          linkedIds={assocLinkedIds(assocDialog.tag.id)}
          onToggle={handleToggleAssoc}
        />
      )}

      <DeleteConfirm
        open={deleteTagDialog.open}
        label={deleteTagDialog.tag?.name ?? ""}
        onCancel={() => setDeleteTagDialog({ open: false })}
        onConfirm={handleDeleteTag}
      />

      <DeleteConfirm
        open={deleteTemplateDialog.open}
        label={deleteTemplateDialog.template?.title ?? ""}
        onCancel={() => setDeleteTemplateDialog({ open: false })}
        onConfirm={handleDeleteTemplate}
      />
    </>
  );
}
