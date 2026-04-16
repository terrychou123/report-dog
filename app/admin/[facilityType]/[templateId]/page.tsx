"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Table, TableRow, TableCell, TableHeader } from "@tiptap/extension-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ArrowLeftIcon, SaveIcon, HistoryIcon, BoldIcon, ItalicIcon, ListIcon, ListOrderedIcon, LinkIcon, PlusIcon, XIcon } from "lucide-react";
import { toast } from "sonner";
import sanitizeHtml from "sanitize-html";
import { isValidUrl } from "@/lib/utils";
import { FortuneEditor } from "@/components/fortune-editor";
import { ReportHistoryPanel } from "@/components/report-history-panel";
import type { Editor } from "@tiptap/core";

type Template = {
  id: string;
  facilityType: string;
  title: string;
  content: string | null;
  fileType: string | null;
  responsible: string | null;
};

type TemplateLink = { id: string; name: string; url: string };

function EditorToolbar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;
  const btnCls = (active: boolean) => `h-7 p-0 ${active ? "bg-muted" : ""}`;
  return (
    <div className="flex items-center gap-1 px-3 py-2 border-b bg-muted/30 flex-wrap">
      <Button type="button" size="sm" variant="ghost" className={btnCls(editor.isActive("bold"))}
        style={{ width: 28 }} onClick={() => editor.chain().focus().toggleBold().run()} title="粗體">
        <BoldIcon className="h-3.5 w-3.5" />
      </Button>
      <Button type="button" size="sm" variant="ghost" className={btnCls(editor.isActive("italic"))}
        style={{ width: 28 }} onClick={() => editor.chain().focus().toggleItalic().run()} title="斜體">
        <ItalicIcon className="h-3.5 w-3.5" />
      </Button>
      <div className="w-px h-5 bg-border mx-1" />
      <Button type="button" size="sm" variant="ghost"
        className={`h-7 px-2 text-xs ${editor.isActive("heading", { level: 1 }) ? "bg-muted" : ""}`}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>H1</Button>
      <Button type="button" size="sm" variant="ghost"
        className={`h-7 px-2 text-xs ${editor.isActive("heading", { level: 2 }) ? "bg-muted" : ""}`}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</Button>
      <div className="w-px h-5 bg-border mx-1" />
      <Button type="button" size="sm" variant="ghost" className={btnCls(editor.isActive("bulletList"))}
        style={{ width: 28 }} onClick={() => editor.chain().focus().toggleBulletList().run()} title="項目清單">
        <ListIcon className="h-3.5 w-3.5" />
      </Button>
      <Button type="button" size="sm" variant="ghost" className={btnCls(editor.isActive("orderedList"))}
        style={{ width: 28 }} onClick={() => editor.chain().focus().toggleOrderedList().run()} title="有序清單">
        <ListOrderedIcon className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}

export default function AdminTemplateEditPage() {
  const params = useParams<{ facilityType: string; templateId: string }>();
  const router = useRouter();

  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [initialContent, setInitialContent] = useState("");

  const [links, setLinks] = useState<TemplateLink[]>([]);
  const [addLinkOpen, setAddLinkOpen] = useState(false);
  const [linkName, setLinkName] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [linkSaving, setLinkSaving] = useState(false);

  // Excel triggers
  const [excelSaving, setExcelSaving] = useState(false);
  const [excelSaveTrigger, setExcelSaveTrigger] = useState(0);
  // Excel 還原時用 key 強制重掛載 FortuneEditor
  const [excelRestoreKey, setExcelRestoreKey] = useState(0);
  const [excelRestoredData, setExcelRestoredData] = useState<object[] | null>(null);

  // 歷史版本 dialog
  const [historyOpen, setHistoryOpen] = useState(false);

  // 解析 Excel 初始資料，避免在 JSX 中每次 render 都重新 JSON.parse
  const parsedTemplateData = useMemo<object[]>(() => {
    try { return JSON.parse(template?.content || "[]"); } catch { return []; }
  }, [template?.content]);

  const isDirtyRef = useRef(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: "",
    editorProps: { attributes: { class: "focus:outline-none" } },
    onUpdate: () => { isDirtyRef.current = true; },
  });

  useEffect(() => {
    async function load() {
      const [res, linksRes] = await Promise.all([
        fetch(`/api/admin/templates/${params.templateId}`),
        fetch(`/api/admin/templates/${params.templateId}/links`),
      ]);
      if (!res.ok) { router.push(`/admin/${params.facilityType}`); return; }
      const data: Template = await res.json();
      setTemplate(data);
      setTitle(data.title);
      setInitialContent(data.content ?? "");
      if (linksRes.ok) setLinks(await linksRes.json());
      setLoading(false);
    }
    load();
  }, [params.templateId, params.facilityType, router]);

  useEffect(() => {
    if (!editor || loading || template?.fileType === "excel") return;
    const content = initialContent;
    if (content.trimStart().startsWith("<")) {
      editor.commands.setContent(content);
    } else if (content) {
      const html = content.split("\n\n").filter(Boolean)
        .map(p => `<p>${p.replace(/\n/g, "<br>")}</p>`).join("");
      editor.commands.setContent(html);
    }
  }, [editor, loading, initialContent, template?.fileType]);

  async function handleAddLink() {
    if (!template || !linkName.trim() || !linkUrl.trim()) return;
    setLinkSaving(true);
    try {
      const res = await fetch(`/api/admin/templates/${template.id}/links`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: linkName.trim(), url: linkUrl.trim() }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        toast.error(err.error || "新增連結失敗");
        return;
      }
      const link: TemplateLink = await res.json();
      setLinks((prev) => [...prev, link]);
      setAddLinkOpen(false);
      setLinkName("");
      setLinkUrl("");
      toast.success("已新增連結");
    } catch {
      toast.error("新增連結失敗");
    } finally {
      setLinkSaving(false);
    }
  }

  async function handleDeleteLink(linkId: string) {
    if (!template) return;
    try {
      const res = await fetch(`/api/admin/templates/${template.id}/links/${linkId}`, { method: "DELETE" });
      if (!res.ok) { toast.error("刪除連結失敗"); return; }
      setLinks((prev) => prev.filter((l) => l.id !== linkId));
    } catch {
      toast.error("刪除連結失敗");
    }
  }

  async function handleSave() {
    if (!template) return;
    setSaving(true);
    const res = await fetch(`/api/admin/templates/${template.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title.trim(),
        responsible: template.responsible,
        content: template.fileType !== "excel" ? editor?.getHTML() ?? null : undefined,
      }),
    });
    if (res.ok) {
      toast.success("已儲存");
      isDirtyRef.current = false;
      // 不呼叫 router.refresh()：會觸發 Server Component 重渲染，
      // 導致 FortuneSheet Workbook 內部 DOM ref 失效（scrollLeft null error）。
      // 版本歷史 dialog 在每次開啟時會自動重新 fetch，無須手動 refresh。
    } else {
      toast.error("儲存失敗");
    }
    setSaving(false);
  }

  // 還原版本：套用內容到編輯器，讓管理員確認後再按儲存
  async function handleRestore(
    content: string | null,
    restoredTitle: string,
    responsible?: string | null,
    restoredLinks?: { name: string; url: string; sortOrder: number }[] | null,
    _restoredTags?: string[] | null,  // tags 為唯讀資訊，不直接還原（由 seed script 管理）
  ) {
    if (!template) return;
    setTitle(restoredTitle);
    isDirtyRef.current = true;

    // 還原負責人
    if (responsible !== undefined) {
      setTemplate((prev) => prev ? { ...prev, responsible: responsible ?? null } : prev);
    }

    // 還原連結：刪除現有連結，再批次新增快照中的連結
    if (restoredLinks !== undefined && restoredLinks !== null) {
      try {
        // 刪除所有現有連結
        await Promise.all(
          links.map((l) =>
            fetch(`/api/admin/templates/${template.id}/links/${l.id}`, { method: "DELETE" })
          )
        );
        // 新增快照連結
        const newLinks: TemplateLink[] = [];
        for (const lk of restoredLinks) {
          const res = await fetch(`/api/admin/templates/${template.id}/links`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: lk.name, url: lk.url }),
          });
          if (res.ok) newLinks.push(await res.json());
        }
        setLinks(newLinks);
      } catch {
        toast.error("連結還原失敗，其他內容已套用");
      }
    }

    if (template?.fileType === "excel") {
      // Excel：重置 FortuneEditor 資料並強制重掛載
      try {
        const parsed = JSON.parse(content ?? "[]");
        setExcelRestoredData(parsed);
      } catch {
        setExcelRestoredData([]);
      }
      setExcelRestoreKey((k) => k + 1);
    } else {
      // TipTap：先 sanitize 再套用，防止 stored HTML 帶入 script / 事件處理器
      const safeContent = sanitizeHtml(content ?? "", {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["table", "thead", "tbody", "tr", "th", "td", "colgroup", "col"]),
        allowedAttributes: { ...sanitizeHtml.defaults.allowedAttributes, "*": ["style", "class"] },
        allowProtocolRelative: false,
      });
      editor?.commands.setContent(safeContent);
    }
    toast.success("已套用版本，請點擊儲存以保留變更");
  }

  if (loading) {
    return (
      <div className="p-8 space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!template) return null;

  const isExcel = template.fileType === "excel";

  return (
    <div className="p-4 md:p-8 w-full">
      <button
        onClick={() => router.push(`/admin/${params.facilityType}`)}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeftIcon className="h-3.5 w-3.5" />
        返回範本列表
      </button>

      <div className="flex flex-col gap-3 mb-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="flex-1">
          <Input
            value={title}
            onChange={(e) => { setTitle(e.target.value); isDirtyRef.current = true; }}
            className="text-xl md:text-2xl font-bold border-none shadow-none px-0 h-auto focus-visible:ring-0 text-foreground"
            placeholder="範本標題"
          />
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <p className="text-muted-foreground text-sm">
              {isExcel ? "Excel 範本" : "Word 範本"}{template.responsible ? ` · ${template.responsible}` : ""}
            </p>
            {links.map((link) => (
              <span key={link.id}
                className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-muted text-xs font-medium whitespace-nowrap">
                <LinkIcon className="h-3 w-3 text-muted-foreground" />
                <a href={link.url} target="_blank" rel="noopener noreferrer"
                  className="hover:underline">
                  {link.name}
                </a>
                <button onClick={() => handleDeleteLink(link.id)}
                  className="ml-0.5 text-muted-foreground hover:text-foreground transition-colors">
                  <XIcon className="h-3 w-3" />
                </button>
              </span>
            ))}
            <button onClick={() => setAddLinkOpen(true)}
              className="flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-dashed text-xs text-muted-foreground hover:text-foreground hover:border-foreground transition-colors">
              <PlusIcon className="h-3 w-3" />
              連結
            </button>
          </div>
        </div>
        <div className="flex gap-2 shrink-0 self-end sm:self-auto">
          {/* 歷史版本回朔按鈕 */}
          <Button size="sm" variant="outline" onClick={() => setHistoryOpen(true)}>
            <HistoryIcon className="h-4 w-4 mr-2" />
            歷史
          </Button>
          {isExcel ? (
            <Button size="sm" onClick={() => setExcelSaveTrigger(t => t + 1)} disabled={excelSaving}>
              <SaveIcon className="h-4 w-4 mr-2" />
              {excelSaving ? "儲存中..." : "儲存"}
            </Button>
          ) : (
            <Button size="sm" onClick={handleSave} disabled={saving}>
              <SaveIcon className="h-4 w-4 mr-2" />
              {saving ? "儲存中..." : "儲存"}
            </Button>
          )}
        </div>
      </div>

      {isExcel ? (
        // key 變動時強制重掛載，用於還原版本後套用新資料
        <FortuneEditor
          key={excelRestoreKey}
          reportId={template.id}
          initialData={excelRestoredData ?? parsedTemplateData}
          title={title}
          saveTrigger={excelSaveTrigger}
          onSavingChange={setExcelSaving}
          onChanged={() => { isDirtyRef.current = true; }}
          saveUrl={`/api/admin/templates/${template.id}`}
        />
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <EditorToolbar editor={editor} />
          <EditorContent editor={editor} />
        </div>
      )}

      {/* 新增連結 Dialog */}
      <Dialog open={addLinkOpen} onOpenChange={(open) => {
        setAddLinkOpen(open);
        if (!open) { setLinkName(""); setLinkUrl(""); }
      }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>新增連結</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="link-name">名稱</Label>
              <Input
                id="link-name"
                value={linkName}
                onChange={(e) => setLinkName(e.target.value)}
                placeholder="例：相關法規"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="link-url">網址</Label>
              <Input
                id="link-url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://..."
              />
              {/* 輸入有內容但格式不合時才顯示提示 */}
              {linkUrl.trim() && !isValidUrl(linkUrl) && (
                <p className="text-xs text-destructive">網址須以 http:// 或 https:// 開頭</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddLinkOpen(false)} disabled={linkSaving}>
              取消
            </Button>
            <Button
              onClick={handleAddLink}
              disabled={linkSaving || !linkName.trim() || !linkUrl.trim() || !isValidUrl(linkUrl)}
            >
              {linkSaving ? "儲存中..." : "新增"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 歷史版本 Dialog */}
      <ReportHistoryPanel
        endpoint={`/api/admin/templates/${template.id}/revisions`}
        canRestore={true}
        hint="最多保留最新 5 筆版本"
        open={historyOpen}
        onOpenChange={setHistoryOpen}
        onRestored={handleRestore}
      />
    </div>
  );
}
