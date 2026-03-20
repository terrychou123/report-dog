"use client";

import { useEffect, useRef, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckIcon, LoaderIcon, SaveIcon } from "lucide-react";
import { toast } from "sonner";

const PROFILES = [
  { id: "daycare", label: "日間照顧中心" },
];

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reportIds: string[];
  reportTitles: string[];
  onSaved?: () => void;
};

export function EvaluationPanel({ open, onOpenChange, reportIds, reportTitles, onSaved }: Props) {
  const [profileId, setProfileId] = useState("daycare");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const runAnalysis = () => {
    if (reportIds.length < 1) return;

    abortRef.current?.abort();
    setResult("");
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
    }
  }, [open]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) abortRef.current?.abort();
    onOpenChange(nextOpen);
  };

  const handleSave = async () => {
    if (!result || saving) return;
    setSaving(true);
    try {
      const date = new Date().toLocaleDateString("zh-TW", { year: "numeric", month: "2-digit", day: "2-digit" });
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: `機構評鑑分析 - ${date}`, content: result, insertAtTop: true }),
      });
      if (!res.ok) throw new Error("儲存失敗");
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      onSaved?.();
    } catch {
      toast.error("儲存失敗，請稍後再試。");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl flex flex-col gap-4 overflow-hidden">
        <SheetHeader>
          <SheetTitle>機構評鑑 AI 分析</SheetTitle>
        </SheetHeader>

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

          <Button onClick={runAnalysis} disabled={loading || reportIds.length < 1} size="sm">
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

        <ScrollArea className="flex-1 min-h-0 rounded-md border p-4">
          {loading && !result && (
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <LoaderIcon className="h-4 w-4 animate-spin" />
              <span>AI 依評鑑基準分析中，請稍候...</span>
            </div>
          )}
          {result && (
            <p className="text-sm whitespace-pre-wrap leading-relaxed">{result}</p>
          )}
          {!loading && !result && (
            <p className="text-sm text-muted-foreground">選擇評鑑類型後點擊「開始分析」。</p>
          )}
        </ScrollArea>

        {!loading && result && (
          <Button variant="outline" size="sm" onClick={handleSave} disabled={saving} className="self-end">
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
      </SheetContent>
    </Sheet>
  );
}
