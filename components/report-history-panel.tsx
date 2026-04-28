"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { HistoryIcon, RotateCcwIcon, UserIcon, TagIcon, LinkIcon } from "lucide-react";
import { toast } from "sonner";

type RevisionLink = { name: string; url: string; sortOrder: number };

function safeParse<T>(s: string | null): T | null {
  if (!s) return null;
  try { return JSON.parse(s) as T; } catch { return null; }
}

type Revision = {
  id: string;
  versionNumber: number;
  title: string;
  userId: string;
  responsible: string | null;
  links: string | null;   // JSON string: RevisionLink[]
  tags: string | null;    // JSON string: string[]
  changeSummary: string | null;
  createdAt: string;
};

type Props = {
  endpoint: string;
  canRestore: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRestored: (content: string | null, title: string, responsible?: string | null, links?: RevisionLink[] | null, tags?: string[] | null) => void;
  hint?: string;
};

export function ReportHistoryPanel({ endpoint, canRestore, open, onOpenChange, onRestored, hint }: Props) {
  const [revisions, setRevisions] = useState<Revision[]>([]);
  const [loading, setLoading] = useState(false);
  const [restoringId, setRestoringId] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const controller = new AbortController();
    setLoading(true);
    fetch(endpoint, { signal: controller.signal })
      .then((r) => r.json())
      .then((data) => setRevisions(Array.isArray(data) ? data : []))
      .catch((err) => { if (err.name !== "AbortError") toast.error("無法載入版本歷史"); })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [open, endpoint]);

  async function handleRestore(revision: Revision) {
    setRestoringId(revision.id);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ versionId: revision.id }),
      });
      if (!res.ok) throw new Error();
      const { content, title, responsible, links, tags } = await res.json();
      const parsedLinks: RevisionLink[] | null = links ? JSON.parse(links) : null;
      const parsedTags: string[] | null = tags ? JSON.parse(tags) : null;
      onRestored(content, title, responsible ?? null, parsedLinks, parsedTags);
      onOpenChange(false);
    } catch {
      toast.error("還原失敗，請稍後再試");
    } finally {
      setRestoringId(null);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[70vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HistoryIcon className="h-4 w-4" />
            版本歷史
          </DialogTitle>
        </DialogHeader>

        {hint && (
          <p className="text-xs text-muted-foreground px-1">{hint}</p>
        )}

        <div className="flex-1 overflow-y-auto mt-2 space-y-2">
          {loading ? (
            <>
              {[1, 2, 3].map((i) => <Skeleton key={i} className="h-16 w-full" />)}
            </>
          ) : revisions.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              尚無版本記錄。每次儲存時會自動建立快照。
            </p>
          ) : (
            revisions.map((rev) => (
              <div key={rev.id} className="border rounded-lg p-3 space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-muted-foreground">
                    版本 #{rev.versionNumber}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(rev.createdAt).toLocaleString("zh-TW", {
                      timeZone: "Asia/Taipei", // 固定台灣時區，避免顯示 UTC 時間
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="text-sm font-medium truncate">{rev.title}</p>
                <p className={`text-sm ${rev.changeSummary ? 'text-foreground' : 'text-muted-foreground italic'}`}>
                  {rev.changeSummary ?? '（未填寫摘要）'}
                </p>
                {/* 快照摘要：負責人 / 標籤 / 連結數量 */}
                <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                  {rev.responsible && (
                    <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                      <UserIcon className="h-3 w-3" />{rev.responsible}
                    </span>
                  )}
                  {(() => {
                    const t = safeParse<string[]>(rev.tags);
                    return t && t.length > 0 ? (
                      <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                        <TagIcon className="h-3 w-3" />{t.join('、')}
                      </span>
                    ) : null;
                  })()}
                  {(() => {
                    const l = safeParse<RevisionLink[]>(rev.links);
                    return l && l.length > 0 ? (
                      <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                        <LinkIcon className="h-3 w-3" />{l.length} 個連結
                      </span>
                    ) : null;
                  })()}
                </div>
                {canRestore && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full h-7 text-xs"
                    disabled={restoringId === rev.id}
                    onClick={() => handleRestore(rev)}
                  >
                    <RotateCcwIcon className="h-3 w-3 mr-1.5" />
                    {restoringId === rev.id ? "還原中..." : "還原此版本"}
                  </Button>
                )}
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
