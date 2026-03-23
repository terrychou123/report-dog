"use client";

import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertTriangle, CheckIcon, LoaderIcon, SaveIcon } from "lucide-react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { marked } from "marked";
import { getAllProfiles } from "@/lib/ai/evaluation-profiles";

const PROFILES = getAllProfiles();

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reportIds: string[];
  reportTitles: string[];
  onSaved?: () => void;
};

export function EvaluationPanel({ open, onOpenChange, reportIds, reportTitles, onSaved }: Props) {
  const [profileId, setProfileId] = useState("daycare");
  const selectedProfile = PROFILES.find((p) => p.id === profileId);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const savedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runAnalysis = () => {
    if (reportIds.length < 1) return;

    abortRef.current?.abort();
    if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
    setResult("");
    setSaved(false);
    setSaved(false);
    setLoading(true);
    const controller = new AbortController();
    abortRef.current = controller;

    (async () => {
      try {
        const res = await fetch("/api/reports/evaluation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reportIds, profileId }),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) {
          let errorMsg = "評鑑分析失敗，請稍後再試。";
          try {
            const data = await res.json();
            if (data?.error) errorMsg = data.error;
          } catch {}
          setResult(errorMsg);
          setLoading(false);
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let done = false;
        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          if (value) setResult((prev) => prev + decoder.decode(value, { stream: !done }));
        }
      } catch (e) {
        if ((e as Error).name !== "AbortError") {
          setResult("評鑑分析失敗，請稍後再試。");
        }
      } finally {
        setLoading(false);
      }
    })();
  };

  useEffect(() => {
    if (!open) {
      abortRef.current?.abort();
      setResult("");
      if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
      setSaved(false);
    }
    return () => {
      if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
    };
  }, [open]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) abortRef.current?.abort();
    onOpenChange(nextOpen);
  };

  const handleSave = async () => {
    if (!result || saving) return;
    setSaving(true);
    try {
      const now = new Date();
      const date = now.toLocaleDateString("zh-TW", { year: "numeric", month: "2-digit", day: "2-digit" });
      const time = now.toLocaleTimeString("zh-TW", { hour: "2-digit", minute: "2-digit", hour12: false });
      const datetime = `${date} ${time}`;
      const htmlContent = await marked.parse(result);
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: `分析結果 - ${datetime}`, content: htmlContent, insertAtTop: true }),
      });
      if (!res.ok) throw new Error("儲存失敗");
      setSaved(true);
      savedTimerRef.current = setTimeout(() => setSaved(false), 2000);
      onSaved?.();
    } catch {
      toast.error("儲存失敗，請稍後再試。");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col gap-4 overflow-hidden">
        <DialogHeader>
          <DialogTitle>報告 AI 分析</DialogTitle>
        </DialogHeader>

        <div className="flex items-start gap-2 rounded-md border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-700 dark:text-amber-400">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>因應個人資料保護法，請勿涉及個人敏感資料。評估結果僅供參考，不負任何法律責任。</span>
        </div>

        <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
          {reportTitles.map((title, i) => (
            <Badge key={i} variant="secondary" className="text-xs">
              {title}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Select value={profileId} onValueChange={setProfileId} disabled={loading}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="選擇評鑑類型" />
            </SelectTrigger>
            <SelectContent>
              {PROFILES.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button onClick={runAnalysis} disabled={loading || reportIds.length < 1 || !selectedProfile?.ready}>
            {loading ? (
              <>
                <LoaderIcon className="h-4 w-4 animate-spin mr-1" />
                分析中...
              </>
            ) : (
              "開始分析"
            )}
          </Button>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto rounded-md border p-4">
          {loading && !result && (
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <LoaderIcon className="h-4 w-4 animate-spin" />
              <span>AI 依評鑑基準分析中，請稍候...</span>
            </div>
          )}
          {result && (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{result}</ReactMarkdown>
            </div>
          )}
          {!loading && !result && (
            <p className="text-sm text-muted-foreground">選擇評鑑類型後點擊「開始分析」。</p>
          )}
        </div>

        {!loading && result && (
          <Button onClick={handleSave} disabled={saving}>
            {saved ? (
              <>
                <CheckIcon className="h-4 w-4 mr-2" />
                已儲存
              </>
            ) : saving ? (
              <>
                <LoaderIcon className="h-4 w-4 animate-spin mr-2" />
                儲存中...
              </>
            ) : (
              <>
                <SaveIcon className="h-4 w-4 mr-2" />
                儲存結果
              </>
            )}
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
