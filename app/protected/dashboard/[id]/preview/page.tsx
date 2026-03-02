'use client';

import { Suspense, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DiffViewer } from '@/components/documents/diff-viewer';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';

interface Document {
  id: string;
  title: string;
  currentContent: string | null;
  originalContent: string | null;
  wordCount: number | null;
}

function PreviewContent() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [doc, setDoc] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
        <Skeleton className="h-[calc(100vh-120px)] w-full" />
      </div>
    );
  }

  if (!doc) return null;

  const original = doc.originalContent ?? '';
  const current = doc.currentContent ?? doc.originalContent ?? '';
  const wordCount = doc.wordCount ?? current.split(/\s+/).filter(Boolean).length;

  return (
    <div className="flex flex-col h-screen">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b bg-background/95 backdrop-blur shrink-0">
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link href={`/protected/dashboard/${id}`}>
              <ArrowLeft className="h-4 w-4 mr-1" /> Editor
            </Link>
          </Button>
          <Separator orientation="vertical" className="h-5" />
          <span className="text-sm font-medium truncate max-w-[240px]">{doc.title}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground hidden sm:inline">
            {wordCount} words
          </span>
          <Button asChild size="sm">
            <Link href={`/protected/dashboard/${id}/final`}>
              <CheckCircle className="h-4 w-4 mr-1" /> Finalize
            </Link>
          </Button>
        </div>
      </div>

      {/* Diff viewer fills remaining height */}
      <div className="flex-1 overflow-hidden p-4">
        <DiffViewer original={original} current={current} />
      </div>
    </div>
  );
}

export default function PreviewPage() {
  return (
    <Suspense fallback={
      <div className="p-6 space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
        <Skeleton className="h-[calc(100vh-120px)] w-full" />
      </div>
    }>
      <PreviewContent />
    </Suspense>
  );
}
