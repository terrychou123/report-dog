"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useEditor, EditorContent } from "@tiptap/react";
import type { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { Table, TableRow, TableCell, TableHeader } from "@tiptap/extension-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeftIcon, SaveIcon, SparklesIcon, CheckIcon,
  RefreshCwIcon, Trash2Icon, DownloadIcon,
  BoldIcon, ItalicIcon, ListIcon, ListOrderedIcon,
  PlusIcon, XIcon, TagIcon,
} from "lucide-react";
import { toast } from "sonner";

type Report = { id: string; title: string; content: string | null; fileType: string | null; fileUrl: string | null };
type Message = { role: "user" | "assistant"; content: string; reasoning_details?: unknown };
type TagAssociation = { relationId: string; clientId: string; nickname: string; description: string | null };
type TagOption = { id: string; nickname: string; description: string | null };

function preprocessHtml(rawHtml: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(
    `<!DOCTYPE html><html><body>${rawHtml}</body></html>`,
    'text/html'
  );
  doc.querySelectorAll('table').forEach((table) => {
    table.style.width = '100%';
  });
  return doc.body.innerHTML;
}

function EditorToolbar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;
  const btnCls = (active: boolean) =>
    `h-7 p-0 ${active ? "bg-muted" : ""}`;
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
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} title="標題 1">H1</Button>
      <Button type="button" size="sm" variant="ghost"
        className={`h-7 px-2 text-xs ${editor.isActive("heading", { level: 2 }) ? "bg-muted" : ""}`}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} title="標題 2">H2</Button>
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

export default function ReportEditorPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pdfTab, setPdfTab] = useState<"preview" | "edit">("preview");

  const [reportTitle, setReportTitle] = useState("");
  const [initialContent, setInitialContent] = useState("");

  // AI dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [instruction, setInstruction] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiProposal, setAiProposal] = useState("");
  const [history, setHistory] = useState<Message[]>([]);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Tiptap 選取位置
  const [tiptapFrom, setTiptapFrom] = useState(0);
  const [tiptapTo, setTiptapTo] = useState(0);

  // 暫存歷史 AI 建議
  const [storedProposals, setStoredProposals] = useState<string[]>([]);
  const [confirmingIdx, setConfirmingIdx] = useState<number | null>(null);

  // 刪除報告
  const [deleteReportOpen, setDeleteReportOpen] = useState(false);
  const [deletingReport, setDeletingReport] = useState(false);

  // 關聯標籤
  const [tagAssociations, setTagAssociations] = useState<TagAssociation[]>([]);
  const [addTagsOpen, setAddTagsOpen] = useState(false);
  const [allTags, setAllTags] = useState<TagOption[]>([]);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [loadingTags, setLoadingTags] = useState(false);
  const [addingTags, setAddingTags] = useState(false);

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
    editorProps: {
      attributes: { class: "focus:outline-none" },
    },
  });

  // 從 API 載入報告
  useEffect(() => {
    async function load() {
      const [reportRes, assocRes] = await Promise.all([
        fetch(`/api/reports/${params.id}`),
        fetch(`/api/tag-reports?reportId=${params.id}`),
      ]);
      if (!reportRes.ok) { router.push("/report"); return; }
      const data: Report = await reportRes.json();
      setReport(data);
      setReportTitle(data.title);
      setInitialContent(data.content || "");
      if (assocRes.ok) setTagAssociations(await assocRes.json());
      setLoading(false);
    }
    load();
  }, [params.id, router]);

  // editor 就緒且資料已載入後設定內容
  useEffect(() => {
    if (!editor || loading) return;
    if (initialContent.trimStart().startsWith("<")) {
      editor.commands.setContent(initialContent);
    } else if (initialContent) {
      const html = initialContent
        .split("\n\n").filter(Boolean)
        .map(p => `<p>${p.replace(/\n/g, "<br>")}</p>`)
        .join("");
      editor.commands.setContent(html);
    }
  }, [editor, loading, initialContent]);

  function openAiDialogWithText(text: string) {
    setSelectedText(text);
    setInstruction("");
    setAiProposal("");
    setHistory([]);
    setStoredProposals([]);
    setConfirmingIdx(null);
    setDialogOpen(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  function handleEditorMouseUp() {
    if (!editor) return;
    const { from, to } = editor.state.selection;
    if (from === to) return;
    const selectedStr = editor.state.doc.textBetween(from, to, " ").trim();
    if (!selectedStr) return;
    setTiptapFrom(from);
    setTiptapTo(to);
    openAiDialogWithText(selectedStr);
  }

  async function handleAiSubmit() {
    if (!instruction.trim()) return;
    setAiLoading(true);
    const userMsg = instruction.trim();
    const newHistory: Message[] = [...history, { role: "user", content: userMsg }];
    setHistory(newHistory);
    setInstruction("");

    const res = await fetch(`/api/reports/${params.id}/ai`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paragraph: selectedText, instruction: userMsg, history }),
    });

    if (!res.ok) {
      toast.error("AI 回覆失敗，請重試");
      setAiLoading(false);
      return;
    }

    const { revised, reasoning_details } = await res.json();
    setAiProposal(revised);
    setHistory([...newHistory, { role: "assistant", content: revised, reasoning_details }]);
    setAiLoading(false);
  }

  function applySpecificProposal(text: string) {
    editor?.chain().focus().deleteRange({ from: tiptapFrom, to: tiptapTo }).insertContent(text).run();
    setDialogOpen(false);
    setStoredProposals([]);
    setConfirmingIdx(null);
    setAiProposal("");
    toast.success("已套用修改");
  }

  function retryProposal() {
    setStoredProposals(prev => [...prev, aiProposal]);
    setAiProposal("");
    setInstruction("");
    setConfirmingIdx(null);
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  // 關聯標籤 handlers
  async function handleRemoveTagAssociation(relationId: string) {
    const res = await fetch(`/api/tag-reports/${relationId}`, { method: "DELETE" });
    if (res.ok) {
      setTagAssociations((prev) => prev.filter((a) => a.relationId !== relationId));
      toast.success("已解除關聯");
    } else {
      toast.error("操作失敗，請重試");
    }
  }

  async function openAddTagsDialog() {
    setAddTagsOpen(true);
    setSelectedTags(new Set());
    setLoadingTags(true);
    const res = await fetch("/api/tags");
    if (res.ok) setAllTags(await res.json());
    setLoadingTags(false);
  }

  function toggleTag(tagId: string) {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tagId)) next.delete(tagId);
      else next.add(tagId);
      return next;
    });
  }

  async function handleAddTags() {
    if (selectedTags.size === 0) return;
    setAddingTags(true);
    await Promise.all(
      Array.from(selectedTags).map((clientId) =>
        fetch("/api/tag-reports", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ clientId, reportId: params.id }),
        })
      )
    );
    const assocRes = await fetch(`/api/tag-reports?reportId=${params.id}`);
    if (assocRes.ok) setTagAssociations(await assocRes.json());
    setAddingTags(false);
    setAddTagsOpen(false);
    toast.success("已新增關聯標籤");
  }

  async function handleSave() {
    if (!report || !editor) return;
    setSaving(true);
    const res = await fetch(`/api/reports/${report.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: reportTitle.trim(), content: editor.getHTML() }),
    });
    if (res.ok) toast.success("報告已儲存");
    else toast.error("儲存失敗，請重試");
    setSaving(false);
  }

  async function handleDownload() {
    if (!editor) return;
    const editorHtml = preprocessHtml(editor.getHTML());
    const filename = reportTitle || "報告";

    const styledHtml = [
      `<!DOCTYPE html>`,
      `<html>`,
      `<head>`,
      `<meta charset="utf-8">`,
      `<style>`,
      `body { font-family: 'Microsoft JhengHei', '微軟正黑體', 'Calibri', sans-serif; font-size: 12pt; line-height: 1.5; }`,
      `h1 { font-size: 20pt; font-weight: bold; margin: 16pt 0 8pt; line-height: 1.3; }`,
      `h2 { font-size: 16pt; font-weight: bold; margin: 12pt 0 6pt; line-height: 1.3; }`,
      `h3 { font-size: 14pt; font-weight: bold; margin: 10pt 0 4pt; line-height: 1.3; }`,
      `p { margin: 6pt 0; line-height: 1.5; }`,
      `ul, ol { margin: 6pt 0; padding-left: 24pt; }`,
      `li { margin: 3pt 0; line-height: 1.5; }`,
      `table { width: 100%; margin: 10pt 0; }`,
      `td, th { border: 1pt solid #000000; padding: 4pt 6pt; font-size: 11pt; }`,
      `th { font-weight: bold; }`,
      `strong { font-weight: bold; }`,
      `em { font-style: italic; }`,
      `</style>`,
      `</head>`,
      `<body>`,
      `<h1>${filename}</h1>`,
      editorHtml,
      `</body>`,
      `</html>`,
    ].join("\n");

    try {
      const res = await fetch("/api/convert-docx", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html: styledHtml, filename }),
      });
      if (!res.ok) throw new Error("convert failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${filename}.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      toast.error("下載失敗，請重試");
    }
  }

  async function handleDeleteReport() {
    setDeletingReport(true);
    const res = await fetch(`/api/reports/${params.id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("已刪除報告");
      router.push("/report");
    } else {
      toast.error("刪除失敗，請重試");
      setDeletingReport(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8 max-w-4xl space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!report) return null;

  const isPdf = report.fileType === "pdf";

  return (
    <div className="p-8 max-w-4xl">
      <button
        onClick={() => router.push("/report")}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeftIcon className="h-3.5 w-3.5" />
        返回報告列表
      </button>

      {/* 頁首：標題（可編輯）+ 按鈕群 */}
      <div className="flex items-start justify-between mb-4 gap-4">
        <div className="flex-1">
          <Input
            value={reportTitle}
            onChange={(e) => setReportTitle(e.target.value)}
            className="text-2xl font-bold border-none shadow-none px-0 h-auto focus-visible:ring-0 text-foreground"
            placeholder="報告標題"
          />
          {(!isPdf || (isPdf && report.content && pdfTab === "edit")) && (
            <p className="text-muted-foreground text-sm mt-1 flex items-center gap-1.5">
              <SparklesIcon className="h-3.5 w-3.5" />
              圈選文字段落，使用 AI 修改
            </p>
          )}
          {/* 關聯標籤 */}
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {tagAssociations.map((a) => (
              <span key={a.relationId}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-muted text-xs font-medium">
                <TagIcon className="h-3 w-3 text-muted-foreground" />
                {a.nickname}
                <button onClick={() => handleRemoveTagAssociation(a.relationId)}
                  className="ml-0.5 text-muted-foreground hover:text-foreground transition-colors">
                  <XIcon className="h-3 w-3" />
                </button>
              </span>
            ))}
            <button onClick={openAddTagsDialog}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-dashed text-xs text-muted-foreground hover:text-foreground hover:border-foreground transition-colors">
              <PlusIcon className="h-3 w-3" />
              標籤
            </button>
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button
            size="sm"
            variant="outline"
            className="text-destructive hover:text-destructive hover:bg-destructive/5"
            onClick={() => setDeleteReportOpen(true)}
          >
            <Trash2Icon className="h-4 w-4 mr-1.5" />
            刪除
          </Button>
          {(!isPdf || (isPdf && report.content && pdfTab === "edit")) && (
            <Button size="sm" variant="outline" onClick={handleDownload} disabled={!editor}>
              <DownloadIcon className="h-4 w-4 mr-1.5" />
              下載
            </Button>
          )}
          {(!isPdf || (isPdf && report.content && pdfTab === "edit")) && (
            <Button onClick={handleSave} disabled={saving} size="sm">
              <SaveIcon className="h-4 w-4 mr-2" />
              {saving ? "儲存中..." : "儲存"}
            </Button>
          )}
        </div>
      </div>

      {/* 主內容區塊 */}
      {isPdf ? (
        report.content ? (
          <div>
            <div className="flex gap-1 mb-3">
              <Button size="sm" variant={pdfTab === "preview" ? "default" : "outline"}
                onClick={() => setPdfTab("preview")}>
                PDF 預覽
              </Button>
              <Button size="sm" variant={pdfTab === "edit" ? "default" : "outline"}
                onClick={() => setPdfTab("edit")}>
                文字編輯
              </Button>
            </div>
            {pdfTab === "preview" ? (
              <div className="border rounded-lg overflow-hidden" style={{ height: "80vh" }}>
                <iframe src={report.fileUrl!} className="w-full h-full" title={reportTitle} />
              </div>
            ) : (
              <div className="border rounded-lg overflow-hidden report-editor" onMouseUp={handleEditorMouseUp}>
                <EditorToolbar editor={editor} />
                <EditorContent editor={editor} />
              </div>
            )}
          </div>
        ) : (
          <div className="border rounded-lg overflow-hidden" style={{ height: "80vh" }}>
            <iframe src={report.fileUrl!} className="w-full h-full" title={reportTitle} />
          </div>
        )
      ) : (
        <div className="border rounded-lg overflow-hidden report-editor" onMouseUp={handleEditorMouseUp}>
          <EditorToolbar editor={editor} />
          <EditorContent editor={editor} />
        </div>
      )}

      {/* 新增標籤 Dialog */}
      <Dialog open={addTagsOpen} onOpenChange={(open) => { setAddTagsOpen(open); if (!open) setSelectedTags(new Set()); }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>新增關聯標籤</DialogTitle>
          </DialogHeader>
          {loadingTags ? (
            <div className="space-y-2 py-4">
              {[1, 2, 3].map((i) => <Skeleton key={i} className="h-10 w-full" />)}
            </div>
          ) : (() => {
            const linkedIds = new Set(tagAssociations.map((a) => a.clientId));
            const available = allTags.filter((t) => !linkedIds.has(t.id));
            return available.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">
                所有標籤均已關聯或尚無標籤
              </p>
            ) : (
              <div className="space-y-2 max-h-72 overflow-y-auto py-2">
                {available.map((t) => {
                  const isSelected = selectedTags.has(t.id);
                  return (
                    <button
                      key={t.id}
                      onClick={() => toggleTag(t.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg border text-sm transition-colors flex items-center gap-2 ${
                        isSelected ? "border-primary bg-primary/5" : "border-border hover:bg-muted"
                      }`}
                    >
                      <TagIcon className="h-4 w-4 text-primary shrink-0" />
                      <span className="flex-1 truncate">{t.nickname}</span>
                      {t.description && (
                        <span className="text-xs text-muted-foreground truncate max-w-24">{t.description}</span>
                      )}
                      {isSelected && <span className="text-xs text-primary font-medium shrink-0">✓</span>}
                    </button>
                  );
                })}
              </div>
            );
          })()}
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddTagsOpen(false)} disabled={addingTags}>
              取消
            </Button>
            <Button onClick={handleAddTags} disabled={addingTags || selectedTags.size === 0}>
              {addingTags ? "關聯中..." : `關聯${selectedTags.size > 0 ? ` (${selectedTags.size})` : ""}`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 確認刪除報告 Dialog */}
      <Dialog open={deleteReportOpen} onOpenChange={setDeleteReportOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>確認刪除報告</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            此操作將永久刪除「{report.title}」，無法復原。
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteReportOpen(false)} disabled={deletingReport}>
              取消
            </Button>
            <Button variant="destructive" onClick={handleDeleteReport} disabled={deletingReport}>
              {deletingReport ? "刪除中..." : "確認刪除"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* AI 修改助手 Dialog */}
      <Dialog open={dialogOpen} onOpenChange={(open) => {
        setDialogOpen(open);
        if (!open) { setStoredProposals([]); setConfirmingIdx(null); }
      }}>
        <DialogContent className="max-w-xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <SparklesIcon className="h-5 w-5 text-primary" />
              AI 修改助手
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* 1. 圈選原始段落 */}
            {selectedText && (
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">圈選段落</Label>
                <div className="p-3 rounded-md bg-muted text-sm leading-relaxed max-h-28 overflow-y-auto whitespace-pre-wrap">
                  {selectedText}
                </div>
              </div>
            )}

            {/* 2. 暫存歷史 AI 建議（「繼續調整」後顯示） */}
            {storedProposals.length > 0 && (
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">
                  先前 AI 建議（點擊確認套用）
                </Label>
                <div className="space-y-2">
                  {storedProposals.map((proposal, idx) => (
                    <div key={idx} className="rounded-md border text-sm overflow-hidden">
                      <div
                        className="p-3 leading-relaxed max-h-28 overflow-y-auto whitespace-pre-wrap cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => setConfirmingIdx(confirmingIdx === idx ? null : idx)}
                      >
                        <span className="text-xs text-muted-foreground mr-2">#{idx + 1}</span>
                        {proposal}
                      </div>
                      {confirmingIdx === idx && (
                        <div className="flex items-center gap-2 px-3 py-2 bg-muted/30 border-t">
                          <span className="text-xs text-muted-foreground flex-1">確認套用此版本？</span>
                          <Button size="sm" className="h-7 text-xs"
                            onClick={() => applySpecificProposal(proposal)}>確認</Button>
                          <Button size="sm" variant="outline" className="h-7 text-xs"
                            onClick={() => setConfirmingIdx(null)}>取消</Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. 當前 AI 建議 */}
            {aiProposal && (
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">AI 建議修改</Label>
                <div className="p-3 rounded-md bg-primary/5 border border-primary/20 text-sm leading-relaxed max-h-40 overflow-y-auto whitespace-pre-wrap">
                  {aiProposal}
                </div>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" onClick={() => applySpecificProposal(aiProposal)} className="flex-1">
                    <CheckIcon className="h-4 w-4 mr-1.5" />
                    套用修改
                  </Button>
                  <Button size="sm" variant="outline" onClick={retryProposal} className="flex-1">
                    <RefreshCwIcon className="h-4 w-4 mr-1.5" />
                    繼續調整
                  </Button>
                </div>
              </div>
            )}

            {/* 4. 修改指令輸入（Enter 不送出） */}
            {!aiProposal && (
              <div className="space-y-2">
                <Label htmlFor="instruction">修改指令</Label>
                <Textarea
                  ref={inputRef}
                  id="instruction"
                  placeholder="請輸入您的修改要求，例如：改得更正式一些、精簡這段、加強說明個案的情況..."
                  value={instruction}
                  onChange={(e) => setInstruction(e.target.value)}
                  rows={3}
                  disabled={aiLoading}
                />
              </div>
            )}
          </div>

          {!aiProposal && (
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>取消</Button>
              <Button onClick={handleAiSubmit} disabled={aiLoading || !instruction.trim()}>
                {aiLoading ? (
                  <><RefreshCwIcon className="h-4 w-4 mr-2 animate-spin" />AI 思考中...</>
                ) : (
                  <><SparklesIcon className="h-4 w-4 mr-2" />送出</>
                )}
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
