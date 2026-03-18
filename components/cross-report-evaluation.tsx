"use client";

import { useEffect, useRef, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { CheckIcon, CopyIcon, LoaderIcon } from "lucide-react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reportIds: string[];
  reportTitles: string[];
};

export function CrossReportEvaluation({ open, onOpenChange, reportIds, reportTitles }: Props) {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!open || reportIds.length < 2) return;

    setResult("");
    setLoading(true);
    const controller = new AbortController();
    abortRef.current = controller;

    (async () => {
      try {
        const res = await fetch("/api/reports/evaluate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reportIds }),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) {
          setResult("評估失敗，請稍後再試。");
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
          setResult("評估失敗，請稍後再試。");
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [open, reportIds]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) abortRef.current?.abort();
    onOpenChange(nextOpen);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl flex flex-col gap-4">
        <SheetHeader>
          <SheetTitle>AI 一致性評估</SheetTitle>
        </SheetHeader>

        <div className="flex flex-wrap gap-2">
          {reportTitles.map((title, i) => (
            <Badge key={i} variant="secondary" className="text-xs">
              {title}
            </Badge>
          ))}
        </div>

        <ScrollArea className="flex-1 rounded-md border p-4">
          {loading && !result && (
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <LoaderIcon className="h-4 w-4 animate-spin" />
              <span>AI 分析中，請稍候...</span>
            </div>
          )}
          {result && (
            <p className="text-sm whitespace-pre-wrap leading-relaxed">{result}</p>
          )}
        </ScrollArea>

        {!loading && result && (
          <Button variant="outline" size="sm" onClick={handleCopy} className="self-end">
            {copied ? (
              <>
                <CheckIcon className="h-4 w-4 mr-2" />
                已複製
              </>
            ) : (
              <>
                <CopyIcon className="h-4 w-4 mr-2" />
                複製結果
              </>
            )}
          </Button>
        )}
      </SheetContent>
    </Sheet>
  );
}
