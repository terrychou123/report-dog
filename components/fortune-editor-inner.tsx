"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { Workbook } from "@fortune-sheet/react";
import type { Sheet } from "@fortune-sheet/core";
import "@fortune-sheet/react/dist/index.css";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SparklesIcon, CheckIcon, RefreshCwIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import type { FortuneEditorProps } from "@/components/fortune-editor";

type SheetData = {
  name: string;
  data: string[][];
  config?: {
    columnlen?: Record<string, number>;
    rowlen?: Record<string, number>;
    merge?: Record<string, { r: number; c: number; rs: number; cs: number }>;
    borderInfo?: unknown[];
  };
  cellStyles?: Record<string, { fc?: string; bg?: string; ht?: number; vt?: number }>;
};

function normalizeInitialData(raw: unknown): SheetData[] {
  if (!Array.isArray(raw) || raw.length === 0)
    return [{ name: "Sheet1", data: [["", ""], ["", ""]] }];
  if (Array.isArray(raw[0]))
    return [{ name: "Sheet1", data: raw as string[][] }];
  return raw as SheetData[];
}

function sheetsDataToFortuneSheets(sheetsData: SheetData[]): Sheet[] {
  return sheetsData.map((s, i) => {
    // 建立合併範圍查找表
    const mergeMap = new Map<string, { r: number; c: number; rs: number; cs: number }>();
    if (s.config?.merge) {
      for (const m of Object.values(s.config.merge)) {
        for (let dr = 0; dr < m.rs; dr++)
          for (let dc = 0; dc < m.cs; dc++)
            mergeMap.set(`${m.r + dr}_${m.c + dc}`, m);
      }
    }

    return {
      name: s.name,
      status: i === 0 ? 1 : 0,
      config: (() => {
        const cfg = s.config as Sheet['config'] & { borderInfo?: Array<{ value?: Record<string, unknown> }> };
        if (cfg?.borderInfo) {
          for (const entry of cfg.borderInfo) {
            if (entry.value) {
              for (const side of ["t", "l", "b", "r"]) {
                if (typeof entry.value[side] === "number") {
                  entry.value[side] = { style: entry.value[side], color: "#000000" };
                }
              }
            }
          }
        }
        return cfg;
      })(),
      celldata: s.data.flatMap((row, r) =>
        row.map((val, c) => {
          const mg = mergeMap.get(`${r}_${c}`);
          const mc = mg
            ? (r === mg.r && c === mg.c)
              ? { r: mg.r, c: mg.c, rs: mg.rs, cs: mg.cs }
              : { r: mg.r, c: mg.c }
            : undefined;
          const style = s.cellStyles?.[`${r}_${c}`];
          const fc = style?.fc;
          const bg = style?.bg;
          const ht = style?.ht;
          const vt = style?.vt;
          return { r, c, v: { v: val, m: String(val), ...(mc ? { mc } : {}), ...(fc ? { fc } : {}), ...(bg ? { bg } : {}), ...(ht != null ? { ht } : {}), ...(vt != null ? { vt } : {}) } };
        })
      ),
    };
  });
}

type FsCell = { m?: unknown; v?: unknown; fc?: string; bg?: string; ht?: number; vt?: number } | null | undefined;

function extractCellStyles(cell: FsCell): { fc?: string; bg?: string; ht?: number; vt?: number } | null {
  if (!cell) return null;
  const s: { fc?: string; bg?: string; ht?: number; vt?: number } = {};
  if (cell.fc) s.fc = cell.fc;
  if (cell.bg) s.bg = cell.bg;
  if (cell.ht != null) s.ht = cell.ht;
  if (cell.vt != null) s.vt = cell.vt;
  return Object.keys(s).length ? s : null;
}

function fortuneSheetsToData(sheets: Sheet[]): SheetData[] {
  return sheets.map((sheet) => {
    // FortuneSheet 內部使用 sheet.data（2D 陣列），onChange 回傳時 celldata 為空
    if (sheet.data && sheet.data.length > 0) {
      const rows = sheet.data as Array<Array<FsCell>>;
      const grid: string[][] = rows.map((row) => (row ?? []).map((cell) => String(cell?.m ?? cell?.v ?? "")));
      const cellStyles: Record<string, { fc?: string; bg?: string; ht?: number; vt?: number }> = {};
      rows.forEach((row, r) => {
        (row ?? []).forEach((cell, c) => {
          const s = extractCellStyles(cell);
          if (s) cellStyles[`${r}_${c}`] = s;
        });
      });
      return {
        name: sheet.name ?? "Sheet1",
        data: grid,
        ...(sheet.config ? { config: sheet.config as SheetData['config'] } : {}),
        ...(Object.keys(cellStyles).length ? { cellStyles } : {}),
      };
    }
    // fallback：celldata sparse format（初始渲染前）
    const celldata = sheet.celldata ?? [];
    if (celldata.length === 0) return { name: sheet.name ?? "Sheet1", data: [[]] };
    const maxR = Math.max(...celldata.map((c) => c.r));
    const maxC = Math.max(...celldata.map((c) => c.c));
    const grid: string[][] = Array.from({ length: maxR + 1 }, () => Array(maxC + 1).fill(""));
    const cellStyles: Record<string, { fc?: string; bg?: string; ht?: number; vt?: number }> = {};
    for (const cell of celldata) {
      grid[cell.r][cell.c] = String(cell.v?.m ?? cell.v?.v ?? "");
      const s = extractCellStyles(cell.v as FsCell);
      if (s) cellStyles[`${cell.r}_${cell.c}`] = s;
    }
    return {
      name: sheet.name ?? "Sheet1",
      data: grid,
      ...(sheet.config ? { config: sheet.config as SheetData['config'] } : {}),
      ...(Object.keys(cellStyles).length ? { cellStyles } : {}),
    };
  });
}

export default function FortuneEditorInner({
  reportId, initialData, title,
  saveTrigger = 0, downloadTrigger = 0,
  onSavingChange, onDownloadingChange, onChanged, saveUrl,
}: FortuneEditorProps) {
  const sheetsRef = useRef<Sheet[]>(
    sheetsDataToFortuneSheets(normalizeInitialData(initialData))
  );
  const workbookRef = useRef<React.ElementRef<typeof Workbook>>(null);

  const [mounted, setMounted] = useState(false);
  const [, setSaving] = useState(false);
  const [, setDownloading] = useState(false);

  // AI dialog state
  const [aiDialogOpen, setAiDialogOpen] = useState(false);
  const [aiSelectedText, setAiSelectedText] = useState("");
  const [aiInstruction, setAiInstruction] = useState("");
  const [aiProposal, setAiProposal] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiHistory, setAiHistory] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const aiInputRef = useRef<HTMLTextAreaElement>(null);

  // 儲存目前圈選範圍（供套用時定位儲存格）
  const [selectedRange, setSelectedRange] = useState<{ row: number[]; column: number[] }[] | null>(null);
  // 保留使用者尚未同意的 AI 建議
  const [savedProposals, setSavedProposals] = useState<string[]>([]);
  const [confirmingIdx, setConfirmingIdx] = useState<number | null>(null);

  useEffect(() => { setMounted(true); }, []);

  const handleChange = useCallback((data: Sheet[]) => {
    sheetsRef.current = data;
    onChanged?.();
  }, [onChanged]);

  const handleWorkbookMouseUp = useCallback(() => {
    const wb = workbookRef.current;
    if (!wb) return;
    const selection = wb.getSelection();
    if (!selection || selection.length === 0) return;

    // 取得當前活躍 sheet 的合併儲存格資訊
    const activeSheet = sheetsRef.current?.find((s) => s.status === 1) ?? sheetsRef.current?.[0];
    const mergeConfig = (activeSheet?.config as { merge?: Record<string, { r: number; c: number; rs: number; cs: number }> })?.merge;

    // 建立 (r, c) → 主格 key 的映射（合併區域內所有子格都指向主格）
    const cellToMasterKey = new Map<string, string>();
    if (mergeConfig) {
      for (const m of Object.values(mergeConfig)) {
        const masterKey = `${m.r}_${m.c}`;
        for (let dr = 0; dr < m.rs; dr++)
          for (let dc = 0; dc < m.cs; dc++)
            cellToMasterKey.set(`${m.r + dr}_${m.c + dc}`, masterKey);
      }
    }

    // 收集選取範圍內的所有儲存格值（合併區域只取一次）
    const lines: string[] = [];
    const seenMasterKeys = new Set<string>();
    for (const range of selection) {
      for (let r = range.row[0]; r <= range.row[1]; r++) {
        const rowVals: string[] = [];
        for (let c = range.column[0]; c <= range.column[1]; c++) {
          const cellKey = `${r}_${c}`;
          const masterKey = cellToMasterKey.get(cellKey);
          if (masterKey !== undefined) {
            if (seenMasterKeys.has(masterKey)) continue; // 合併區域非主格，跳過
            seenMasterKeys.add(masterKey);
          }
          const val = wb.getCellValue(r, c);
          rowVals.push(val != null ? String(val) : "");
        }
        if (rowVals.length > 0) lines.push(rowVals.join("\t"));
      }
    }

    const text = lines.join("\n").trim();
    if (!text) return; // 空白儲存格不開啟

    setSelectedRange(selection);
    setAiSelectedText(text);
    setAiInstruction("");
    setAiProposal("");
    setAiHistory([]);
    setSavedProposals([]);
    setConfirmingIdx(null);
    setAiDialogOpen(true);
    setTimeout(() => aiInputRef.current?.focus(), 100);
  }, []);

  function applyProposal(text: string) {
    if (!selectedRange || !workbookRef.current) return;
    const wb = workbookRef.current;

    // 取得合併儲存格資訊（與 handleWorkbookMouseUp 相同邏輯）
    const activeSheet = sheetsRef.current?.find((s) => s.status === 1) ?? sheetsRef.current?.[0];
    const mergeConfig = (activeSheet?.config as { merge?: Record<string, { r: number; c: number; rs: number; cs: number }> })?.merge;
    const cellToMasterKey = new Map<string, string>();
    if (mergeConfig) {
      for (const m of Object.values(mergeConfig)) {
        const masterKey = `${m.r}_${m.c}`;
        for (let dr = 0; dr < m.rs; dr++)
          for (let dc = 0; dc < m.cs; dc++)
            cellToMasterKey.set(`${m.r + dr}_${m.c + dc}`, masterKey);
      }
    }

    const lines = text.split("\n");
    let lineIdx = 0;
    const seenMasterKeys = new Set<string>();
    for (const range of selectedRange) {
      for (let r = range.row[0]; r <= range.row[1]; r++) {
        const rowVals = (lines[lineIdx] ?? "").split("\t");
        let colValIdx = 0;
        let rowHasNewContent = false;
        for (let c = range.column[0]; c <= range.column[1]; c++) {
          const cellKey = `${r}_${c}`;
          const masterKey = cellToMasterKey.get(cellKey);
          if (masterKey !== undefined) {
            if (seenMasterKeys.has(masterKey)) continue; // 合併區域非主格，跳過
            seenMasterKeys.add(masterKey);
          }
          wb.setCellValue(r, c, rowVals[colValIdx] ?? "");
          colValIdx++;
          rowHasNewContent = true;
        }
        if (rowHasNewContent) lineIdx++;
      }
    }
    setAiDialogOpen(false);
    toast.success("已套用修改");
  }

  const handleSave = useCallback(async () => {
    setSaving(true);
    onSavingChange?.(true);
    try {
      const res = await fetch(saveUrl ?? `/api/reports/${reportId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content: JSON.stringify(fortuneSheetsToData(sheetsRef.current)) }),
      });
      if (res.ok) toast.success("報告已儲存");
      else toast.error("儲存失敗，請重試");
    } catch {
      toast.error("儲存失敗，請重試");
    } finally {
      setSaving(false);
      onSavingChange?.(false);
    }
  }, [reportId, saveUrl, title, onSavingChange]);

  const handleDownload = useCallback(async () => {
    setDownloading(true);
    onDownloadingChange?.(true);
    try {
      const res = await fetch("/api/excel/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, sheets: fortuneSheetsToData(sheetsRef.current) }),
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${title}.xlsx`;
        a.click();
        URL.revokeObjectURL(url);
      } else {
        toast.error("下載失敗，請重試");
      }
    } catch {
      toast.error("下載失敗，請重試");
    } finally {
      setDownloading(false);
      onDownloadingChange?.(false);
    }
  }, [title, onDownloadingChange]);

  useEffect(() => { if (saveTrigger > 0) handleSave(); }, [saveTrigger, handleSave]);
  useEffect(() => { if (downloadTrigger > 0) handleDownload(); }, [downloadTrigger, handleDownload]);

  async function handleAiSubmit() {
    if (!aiInstruction.trim()) return;
    setAiLoading(true);
    const userMsg = aiInstruction.trim();
    const newHistory = [...aiHistory, { role: "user" as const, content: userMsg }];
    setAiHistory(newHistory);
    setAiInstruction("");
    try {
      const res = await fetch(`/api/reports/${reportId}/ai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paragraph: aiSelectedText,
          instruction: userMsg,
          history: aiHistory,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        const reply = data.revised ?? "";
        setAiProposal(reply);
        setAiHistory([...newHistory, { role: "assistant", content: reply }]);
      } else {
        toast.error("AI 回應失敗");
      }
    } catch {
      toast.error("AI 回應失敗");
    } finally {
      setAiLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {/* FortuneSheet Workbook */}
      <div
        style={{ height: "calc(100vh - 280px)", minHeight: 600 }}
        onDoubleClick={handleWorkbookMouseUp}
      >
        {mounted && (
          <Workbook
            ref={workbookRef}
            data={sheetsRef.current}
            onChange={handleChange}
            lang="zh-TW"
            toolbarItems={[
              "undo", "redo", "clear-format", "|",
              "format", "|",
              "font", "|", "font-size", "|",
              "bold", "italic", "strike-through", "underline", "|",
              "font-color", "background", "border", "merge-cell", "|",
              "horizontal-align", "vertical-align", "text-wrap", "|",
              "search",
            ]}
            cellContextMenu={[
              "copy", "paste", "|",
              "insert-row", "insert-column", "delete-row", "delete-column", "delete-cell",
              "hide-row", "hide-column", "set-row-height", "set-column-width", "|",
              "clear", "sort", "orderAZ", "orderZA", "filter", "chart", "image", "data", "cell-format",
            ]}
          />
        )}
        {!mounted && (
          <div className="flex items-center justify-center h-full border rounded-lg">
            <span className="text-sm text-muted-foreground">載入編輯器中...</span>
          </div>
        )}
      </div>

      {/* AI Dialog */}
      <Dialog open={aiDialogOpen} onOpenChange={(open) => {
        setAiDialogOpen(open);
        if (!open) { setSavedProposals([]); setConfirmingIdx(null); }
      }}>
        <DialogContent className="max-w-xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <SparklesIcon className="h-5 w-5 text-primary" />
              AI 修改助手
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* 1. 選取的儲存格內容 */}
            {aiSelectedText && (
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">選取儲存格</Label>
                <div className="p-3 rounded-md bg-muted text-sm leading-relaxed max-h-28 overflow-y-auto whitespace-pre-wrap">
                  {aiSelectedText}
                </div>
              </div>
            )}

            {/* 2. 暫存歷史 AI 建議（「繼續調整」後顯示） */}
            {savedProposals.length > 0 && (
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">
                  先前 AI 建議（點擊確認套用）
                </Label>
                <div className="space-y-2">
                  {savedProposals.map((proposal, idx) => (
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
                            onClick={() => applyProposal(proposal)}>確認</Button>
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
                  <Button size="sm" onClick={() => applyProposal(aiProposal)} className="flex-1">
                    <CheckIcon className="h-4 w-4 mr-1.5" />
                    套用修改
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => {
                    setSavedProposals(prev => [...prev, aiProposal]);
                    setAiProposal("");
                    setAiInstruction("");
                    setConfirmingIdx(null);
                    setTimeout(() => aiInputRef.current?.focus(), 50);
                  }} className="flex-1">
                    <RefreshCwIcon className="h-4 w-4 mr-1.5" />
                    繼續調整
                  </Button>
                </div>
              </div>
            )}

            {/* 4. 修改指令輸入（有建議時隱藏） */}
            {!aiProposal && (
              <div className="space-y-2">
                <Label htmlFor="ai-instruction">修改指令</Label>
                <Textarea
                  ref={aiInputRef}
                  id="ai-instruction"
                  placeholder="請輸入您的修改要求，例如：改得更正式一些、精簡這段..."
                  value={aiInstruction}
                  onChange={(e) => setAiInstruction(e.target.value)}
                  rows={3}
                  disabled={aiLoading}
                />
              </div>
            )}
          </div>

          {!aiProposal && (
            <DialogFooter>
              <Button variant="outline" onClick={() => setAiDialogOpen(false)}>取消</Button>
              <Button onClick={handleAiSubmit} disabled={aiLoading || !aiInstruction.trim()}>
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
