'use client';

import { Suspense, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DocumentEditor } from '@/components/documents/document-editor';
import { AIPanel } from '@/components/ai/ai-panel';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, BarChart2, History, GitCompare, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

interface Document {
  id: string;
  title: string;
  currentContent: string | null;
  originalContent: string | null;
  status: string | null;
}

function EditorContent() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [doc, setDoc] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch(`/api/documents/${id}`)
      .then((r) => {
        if (!r.ok) { toast.error('Document not found'); router.push('/protected/dashboard'); return null; }
        return r.json();
      })
      .then((data) => {
        if (!data) return;
        setDoc(data);
        setContent(data.currentContent ?? data.originalContent ?? '');
      })
      .finally(() => setLoading(false));
  }, [id, router]);

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!doc) return null;

  return (
    <div className="flex flex-col h-screen">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b bg-background/95 backdrop-blur">
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link href="/protected/dashboard">
              <ArrowLeft className="h-4 w-4 mr-1" /> Dashboard
            </Link>
          </Button>
          <Separator orientation="vertical" className="h-5" />
          <span className="text-sm text-muted-foreground">Editor</span>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href={`/protected/dashboard/${id}/visualizations`}>
              <BarChart2 className="h-4 w-4 mr-1" /> Visualize
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href={`/protected/dashboard/${id}/history`}>
              <History className="h-4 w-4 mr-1" /> History
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href={`/protected/dashboard/${id}/preview`}>
              <GitCompare className="h-4 w-4 mr-1" /> Preview
            </Link>
          </Button>
          <Button asChild size="sm">
            <Link href={`/protected/dashboard/${id}/final`}>
              <CheckCircle className="h-4 w-4 mr-1" /> Finalize
            </Link>
          </Button>
        </div>
      </div>

      {/* Split pane */}
      <div className="flex flex-1 overflow-hidden">
        {/* Editor (60%) */}
        <div className="flex-[3] p-4 overflow-auto border-r">
          <DocumentEditor
            docId={doc.id}
            initialTitle={doc.title}
            initialContent={content}
            onContentChange={setContent}
          />
        </div>

        {/* AI Panel (40%) */}
        <div className="flex-[2] p-4 overflow-auto">
          <h2 className="text-sm font-semibold mb-3 flex items-center gap-1.5">
            <span className="text-primary">✦</span> AI Assistant
          </h2>
          <AIPanel
            docId={doc.id}
            onApply={(aiContent) => {
              setContent(aiContent);
              setDoc((prev) => prev ? { ...prev, currentContent: aiContent } : prev);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function EditorPage() {
  return (
    <Suspense fallback={
      <div className="p-6 space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    }>
      <EditorContent />
    </Suspense>
  );
}
