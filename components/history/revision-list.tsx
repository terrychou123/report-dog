'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { ChevronDown, ChevronUp, RotateCcw, Bot, User } from 'lucide-react';

interface Revision {
  id: string;
  versionNumber: number;
  changeSummary: string | null;
  isAiGenerated: boolean | null;
  content: string;
  createdAt: Date | string;
}

interface RevisionListProps {
  revisions: Revision[];
  docId: string;
}

export function RevisionList({ revisions, docId }: RevisionListProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const router = useRouter();

  async function handleRestore(rev: Revision) {
    try {
      const res = await fetch(`/api/documents/${docId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentContent: rev.content,
          saveRevision: false,
        }),
      });
      if (!res.ok) throw new Error();
      toast.success(`Restored to version ${rev.versionNumber}`);
      router.push(`/protected/dashboard/${docId}`);
    } catch {
      toast.error('Failed to restore version');
    }
  }

  if (revisions.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-8">
        No revision history yet. Save a revision from the editor.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {revisions.map((rev) => {
        const isOpen = expanded === rev.id;
        // 固定台灣時區，避免顯示 UTC 時間
        const date = new Date(rev.createdAt).toLocaleString("zh-TW", {
          timeZone: "Asia/Taipei",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        });
        return (
          <div key={rev.id} className="border rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-muted/30">
              <div className="flex items-center gap-3">
                <Badge variant="outline">v{rev.versionNumber}</Badge>
                {rev.isAiGenerated ? (
                  <Badge variant="secondary" className="gap-1">
                    <Bot className="h-3 w-3" /> AI
                  </Badge>
                ) : (
                  <Badge variant="outline" className="gap-1">
                    <User className="h-3 w-3" /> Manual
                  </Badge>
                )}
                <div>
                  <p className="text-sm font-medium">{rev.changeSummary ?? `Version ${rev.versionNumber}`}</p>
                  <p className="text-xs text-muted-foreground">{date}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleRestore(rev)}>
                  <RotateCcw className="h-3 w-3 mr-1" /> Restore
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setExpanded(isOpen ? null : rev.id)}
                >
                  {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            {isOpen && (
              <>
                <Separator />
                <ScrollArea className="max-h-60">
                  <pre className="p-4 text-xs font-mono whitespace-pre-wrap text-muted-foreground">
                    {rev.content}
                  </pre>
                </ScrollArea>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
