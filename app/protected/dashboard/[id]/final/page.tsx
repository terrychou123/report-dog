'use client';

import { Suspense, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Download, Copy, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

interface Document {
  id: string;
  title: string;
  currentContent: string | null;
  originalContent: string | null;
  status: string | null;
  wordCount: number | null;
}

const statusVariant: Record<string, 'default' | 'secondary' | 'outline'> = {
  draft: 'secondary',
  processing: 'outline',
  completed: 'default',
};

function FinalContent() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [doc, setDoc] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);

  useEffect(() => {
    fetch(`/api/documents/${id}`)
      .then((r) => {
        if (!r.ok) {
          toast.error('Document not found');
          router.push('/protected/dashboard');
          return null;
        }
        return r.json();
      })
      .then((data) => {
        if (data) setDoc(data);
      })
      .finally(() => setLoading(false));
  }, [id, router]);

  const content = doc?.currentContent ?? doc?.originalContent ?? '';
  const wordCount = doc?.wordCount ?? content.split(/\s+/).filter(Boolean).length;

  function downloadAs(ext: 'txt' | 'md') {
    const text = ext === 'md' ? `# ${doc!.title}\n\n${content}` : content;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc!.title.replace(/[^a-z0-9]/gi, '_')}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(content);
      toast.success('Copied to clipboard');
    } catch {
      toast.error('Failed to copy');
    }
  }

  async function markCompleted() {
    setCompleting(true);
    try {
      const res = await fetch(`/api/documents/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'completed' }),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setDoc((prev) => prev ? { ...prev, status: updated.status ?? 'completed' } : prev);
      toast.success('Document marked as completed');
    } catch {
      toast.error('Failed to update status');
    } finally {
      setCompleting(false);
    }
  }

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!doc) return null;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b bg-background/95 backdrop-blur sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link href={`/protected/dashboard/${id}`}>
              <ArrowLeft className="h-4 w-4 mr-1" /> Editor
            </Link>
          </Button>
          <Separator orientation="vertical" className="h-5" />
          <span className="text-sm font-medium truncate max-w-[200px]">{doc.title}</span>
          <Badge variant={statusVariant[doc.status ?? 'draft'] ?? 'secondary'}>
            {doc.status ?? 'draft'}
          </Badge>
        </div>
        <span className="text-xs text-muted-foreground hidden sm:inline">
          {wordCount} words
        </span>
      </div>

      {/* Action bar */}
      <div className="flex items-center gap-2 flex-wrap px-6 py-3 border-b bg-muted/20">
        <Button size="sm" variant="outline" onClick={() => downloadAs('txt')}>
          <Download className="h-3.5 w-3.5 mr-1.5" /> Download .txt
        </Button>
        <Button size="sm" variant="outline" onClick={() => downloadAs('md')}>
          <Download className="h-3.5 w-3.5 mr-1.5" /> Download .md
        </Button>
        <Button size="sm" variant="outline" onClick={copyToClipboard}>
          <Copy className="h-3.5 w-3.5 mr-1.5" /> Copy to Clipboard
        </Button>
        <Button
          size="sm"
          variant={doc.status === 'completed' ? 'secondary' : 'default'}
          onClick={markCompleted}
          disabled={completing || doc.status === 'completed'}
        >
          <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
          {doc.status === 'completed' ? 'Completed' : 'Mark as Completed'}
        </Button>
      </div>

      {/* Document content */}
      <div className="flex-1 max-w-3xl mx-auto w-full px-6 py-8">
        <h1 className="text-2xl font-bold mb-6">{doc.title}</h1>
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
            {content || (
              <span className="text-muted-foreground italic">No content available.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FinalPage() {
  return (
    <Suspense fallback={
      <div className="p-6 space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
        <Skeleton className="h-96 w-full" />
      </div>
    }>
      <FinalContent />
    </Suspense>
  );
}
