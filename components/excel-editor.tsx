"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { SaveIcon, DownloadIcon, PlusIcon, SparklesIcon, CheckIcon } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface ExcelEditorProps {
  reportId: string;
  initialData: string[][];
  title: string;
}

export function ExcelEditor({ reportId, initialData, title }: ExcelEditorProps) {
  const [data, setData] = useState<string[][]>(() =>
    initialData.length > 0 ? initialData : [["", ""], ["", ""]]
  );
  const [colWidths, setColWidths] = useState<number[]>(() => {
    const rows = initialData.length > 0 ? initialData : [["", ""], ["", ""]];
    const cols = Math.max(...rows.map((r) => r.length), 1);
    return Array(cols).fill(120);
  });
  const [rowHeights, setRowHeights] = useState<number[]>(() => {
    const rowCount = initialData.length > 0 ? initialData.length : 2;
    return Array(rowCount).fill(32);
  });
  const [saving, setSaving] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // AI dialog state
  const [aiDialogOpen, setAiDialogOpen] = useState(false);
  const [aiSelectedText, setAiSelectedText] = useState("");
  const [aiInstruction, setAiInstruction] = useState("");
  const [aiProposal, setAiProposal] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiHistory, setAiHistory] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [activeCell, setActiveCell] = useState<{ rowIdx: number; colIdx: number } | null>(null);
  const [selStart, setSelStart] = useState(0);
  const [selEnd, setSelEnd] = useState(0);
  const aiInputRef = useRef<HTMLTextAreaElement>(null);

  const numCols = Math.max(...data.map((row) => row.length), 1);

  function updateCell(rowIdx: number, colIdx: number, value: string) {
    setData((prev) => {
      const next = prev.map((row) => [...row]);
      while (next[rowIdx].length <= colIdx) next[rowIdx].push("");
      next[rowIdx][colIdx] = value;
      return next;
    });
  }

  function addRow() {
    setData((prev) => [...prev, Array(numCols).fill("")]);
    setRowHeights((prev) => [...prev, 32]);
  }

  function addCol() {
    setData((prev) => prev.map((row) => [...row, ""]));
    setColWidths((prev) => [...prev, 120]);
  }

  function startColResize(e: React.MouseEvent, colIdx: number) {
    e.preventDefault();
    e.stopPropagation();
    const startX = e.clientX;
    const startWidth = colWidths[colIdx] ?? 120;
    function onMove(ev: MouseEvent) {
      const newWidth = Math.max(60, startWidth + ev.clientX - startX);
      setColWidths((prev) => {
        const next = [...prev];
        next[colIdx] = newWidth;
        return next;
      });
    }
    function onUp() {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    }
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  }

  function startRowResize(e: React.MouseEvent, rowIdx: number) {
    e.preventDefault();
    e.stopPropagation();
    const startY = e.clientY;
    const startHeight = rowHeights[rowIdx] ?? 32;
    function onMove(ev: MouseEvent) {
      const newHeight = Math.max(24, startHeight + ev.clientY - startY);
      setRowHeights((prev) => {
        const next = [...prev];
        next[rowIdx] = newHeight;
        return next;
      });
    }
    function onUp() {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    }
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  }

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch(`/api/reports/${reportId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: JSON.stringify(data) }),
      });
      if (res.ok) toast.success("報告已儲存");
      else toast.error("儲存失敗，請重試");
    } catch {
      toast.error("儲存失敗，請重試");
    } finally {
      setSaving(false);
    }
  }

  function handleCellMouseUp(e: React.MouseEvent<HTMLInputElement>, rowIdx: number, colIdx: number) {
    const input = e.currentTarget;
    setTimeout(() => {
      const start = input.selectionStart ?? 0;
      const end = input.selectionEnd ?? 0;
      if (start === end) return;
      const selected = input.value.slice(start, end);
      if (!selected.trim()) return;
      setActiveCell({ rowIdx, colIdx });
      setSelStart(start);
      setSelEnd(end);
      setAiSelectedText(selected);
      setAiInstruction("");
      setAiProposal("");
      setAiHistory([]);
      setAiDialogOpen(true);
      setTimeout(() => aiInputRef.current?.focus(), 100);
    }, 0);
  }

  async function handleAiSubmit() {
    if (!aiInstruction.trim() || !activeCell) return;
    setAiLoading(true);
    const userMsg = aiInstruction.trim();
    const newHistory = [...aiHistory, { role: "user" as const, content: userMsg }];
    setAiHistory(newHistory);
    setAiInstruction("");

    try {
      const res = await fetch(`/api/reports/${reportId}/ai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paragraph: aiSelectedText, instruction: userMsg, history: aiHistory }),
      });

      if (!res.ok) {
        toast.error("AI 回覆失敗，請重試");
        setAiLoading(false);
        return;
      }

      const { revised } = await res.json();
      setAiProposal(revised);
      setAiHistory([...newHistory, { role: "assistant", content: revised }]);
    } catch {
      toast.error("AI 回覆失敗，請重試");
    } finally {
      setAiLoading(false);
    }
  }

  function applyAiProposal() {
    if (!activeCell) return;
    const { rowIdx, colIdx } = activeCell;
    const cellValue = data[rowIdx]?.[colIdx] ?? "";
    const newValue = cellValue.slice(0, selStart) + aiProposal + cellValue.slice(selEnd);
    updateCell(rowIdx, colIdx, newValue);
    setAiDialogOpen(false);
    toast.success("已套用修改");
  }

  async function handleDownload() {
    setDownloading(true);
    try {
      const res = await fetch("/api/excel/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, data }),
      });
      if (!res.ok) throw new Error("export failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${title}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      toast.error("下載失敗，請重試");
    } finally {
      setDownloading(false);
    }
  }

  return (
    <>
    <div className="space-y-4">
      {/* 工具列 */}
      <div className="flex items-center justify-end gap-2">
        <Button size="sm" variant="outline" onClick={handleDownload} disabled={downloading}>
          <DownloadIcon className="h-4 w-4 mr-1.5" />
          {downloading ? "下載中..." : "下載 Excel"}
        </Button>
        <Button size="sm" onClick={handleSave} disabled={saving}>
          <SaveIcon className="h-4 w-4 mr-1.5" />
          {saving ? "儲存中..." : "儲存"}
        </Button>
      </div>

      {/* 表格 */}
      <div className="border rounded-lg overflow-auto">
        <table className="border-collapse text-sm">
          <tbody>
            {data.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {Array.from({ length: numCols }).map((_, colIdx) => (
                  <td
                    key={colIdx}
                    className="border border-border p-0 relative"
                    style={{ width: colWidths[colIdx], minWidth: 60 }}
                  >
                    <input
                      type="text"
                      value={row[colIdx] ?? ""}
                      onChange={(e) => updateCell(rowIdx, colIdx, e.target.value)}
                      onMouseUp={(e) => handleCellMouseUp(e, rowIdx, colIdx)}
                      className="w-full px-2 bg-transparent focus:outline-none focus:bg-primary/5"
                      style={{ height: rowHeights[rowIdx] }}
                    />
                    {/* 欄寬拖曳把手（右邊緣 4px） */}
                    <div
                      className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-400/60 z-10 select-none"
                      onMouseDown={(e) => startColResize(e, colIdx)}
                    />
                    {/* 列高拖曳把手（下緣 4px，僅第一欄放置以免重複） */}
                    {colIdx === 0 && (
                      <div
                        className="absolute left-0 right-0 bottom-0 h-1 cursor-row-resize hover:bg-blue-400/60 z-10 select-none"
                        onMouseDown={(e) => startRowResize(e, rowIdx)}
                      />
                    )}
                  </td>
                ))}
                {/* 最後一欄右側佔位（與新增欄按鈕對齊） */}
                {rowIdx === 0 && (
                  <td rowSpan={data.length} className="border border-border align-top p-0 w-8">
                    <button
                      onClick={addCol}
                      className="flex items-center justify-center w-8 h-full min-h-[32px] text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      title="新增欄"
                    >
                      <PlusIcon className="h-3.5 w-3.5" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {/* 新增列 */}
        <button
          onClick={addRow}
          className="flex items-center gap-1.5 w-full px-3 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors border-t"
        >
          <PlusIcon className="h-3.5 w-3.5" />
          新增列
        </button>
      </div>
    </div>

      <Dialog open={aiDialogOpen} onOpenChange={setAiDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <SparklesIcon className="h-4 w-4 text-violet-500" />
              AI 修改助手
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="rounded bg-muted px-3 py-2 text-sm text-muted-foreground">
              選取文字：<span className="text-foreground font-medium">{aiSelectedText}</span>
            </div>
            {aiProposal && (
              <div className="rounded border border-violet-200 bg-violet-50 dark:bg-violet-950/20 px-3 py-2 text-sm">
                {aiProposal}
              </div>
            )}
            <Textarea
              ref={aiInputRef}
              placeholder="輸入修改指令，例如：改為更正式的語氣"
              value={aiInstruction}
              onChange={(e) => setAiInstruction(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleAiSubmit(); } }}
              rows={3}
            />
          </div>
          <DialogFooter className="gap-2">
            {aiProposal && (
              <Button size="sm" onClick={applyAiProposal}>
                <CheckIcon className="h-3.5 w-3.5 mr-1" />
                套用
              </Button>
            )}
            <Button size="sm" variant={aiProposal ? "outline" : "default"} onClick={handleAiSubmit} disabled={aiLoading || !aiInstruction.trim()}>
              <SparklesIcon className="h-3.5 w-3.5 mr-1" />
              {aiLoading ? "AI 處理中..." : aiProposal ? "重新生成" : "AI 修改"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
