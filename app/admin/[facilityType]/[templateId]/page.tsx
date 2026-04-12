"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Table, TableRow, TableCell, TableHeader } from "@tiptap/extension-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeftIcon, SaveIcon, BoldIcon, ItalicIcon, ListIcon, ListOrderedIcon } from "lucide-react";
import { toast } from "sonner";
import { FortuneEditor } from "@/components/fortune-editor";
import type { Editor } from "@tiptap/core";

type Template = {
  id: string;
  facilityType: string;
  title: string;
  content: string | null;
  fileType: string | null;
  responsible: string | null;
};

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

  // Excel triggers
  const [excelSaving, setExcelSaving] = useState(false);
  const [excelSaveTrigger, setExcelSaveTrigger] = useState(0);

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
      const res = await fetch(`/api/admin/templates/${params.templateId}`);
      if (!res.ok) { router.push(`/admin/${params.facilityType}`); return; }
      const data: Template = await res.json();
      setTemplate(data);
      setTitle(data.title);
      setInitialContent(data.content ?? "");
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
    } else {
      toast.error("儲存失敗");
    }
    setSaving(false);
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
          <p className="text-muted-foreground text-sm mt-1">
            {isExcel ? "Excel 範本" : "Word 範本"}{template.responsible ? ` · ${template.responsible}` : ""}
          </p>
        </div>
        <div className="flex gap-2 shrink-0 self-end sm:self-auto">
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
        <FortuneEditor
          reportId={template.id}
          initialData={(() => { try { return JSON.parse(template.content || "[]"); } catch { return []; } })()}
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
    </div>
  );
}
