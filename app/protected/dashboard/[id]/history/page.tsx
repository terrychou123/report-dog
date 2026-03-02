'use client';

import { Suspense, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { RevisionList } from '@/components/history/revision-list';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

interface Revision {
  id: string;
  versionNumber: number;
  changeSummary: string | null;
  isAiGenerated: boolean | null;
  content: string;
  createdAt: Date | string;
}

function HistoryContent() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [revisions, setRevisions] = useState<Revision[]>([]);
  const [docTitle, setDocTitle] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`/api/documents/${id}`).then((r) => r.json()),
      fetch(`/api/documents/${id}/revisions`).then((r) => r.json()),
    ])
      .then(([doc, revs]) => {
        if (!doc || doc.error) { toast.error('Document not found'); router.push('/protected/dashboard'); return; }
        setDocTitle(doc.title);
        setRevisions(revs);
      })
      .finally(() => setLoading(false));
  }, [id, router]);

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <div className="flex items-center gap-2">
        <Button asChild variant="ghost" size="sm">
          <Link href={`/protected/dashboard/${id}`}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Editor
          </Link>
        </Button>
        <div>
          <h1 className="text-lg font-semibold">{docTitle}</h1>
          <p className="text-xs text-muted-foreground">
            {revisions.length} revision{revisions.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <RevisionList revisions={revisions} docId={id} />
    </div>
  );
}

export default function HistoryPage() {
  return (
    <Suspense fallback={
      <div className="p-6 space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    }>
      <HistoryContent />
    </Suspense>
  );
}
