'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, BarChart2, History, Trash2, FileCheck } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface Document {
  id: string;
  title: string;
  status: string | null;
  wordCount: number | null;
  updatedAt: Date | string;
  fileName: string | null;
}

const statusColors: Record<string, string> = {
  draft: 'secondary',
  processing: 'outline',
  completed: 'default',
};

export function DocumentCard({ doc }: { doc: Document }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm('Delete this document?')) return;
    const res = await fetch(`/api/documents/${doc.id}`, { method: 'DELETE' });
    if (res.ok) {
      toast.success('Document deleted');
      router.refresh();
    } else {
      toast.error('Failed to delete');
    }
  }

  const updatedAt = new Date(doc.updatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Card className="flex flex-col justify-between hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base leading-snug line-clamp-2">{doc.title}</CardTitle>
          <Badge variant={(statusColors[doc.status ?? 'draft'] as 'default' | 'secondary' | 'outline') ?? 'secondary'}>
            {doc.status ?? 'draft'}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">
          {doc.wordCount ?? 0} words · Updated {updatedAt}
        </p>
        {doc.fileName && (
          <p className="text-xs text-muted-foreground truncate">{doc.fileName}</p>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex gap-2 flex-wrap">
          <Button asChild size="sm" variant="default">
            <Link href={`/protected/dashboard/${doc.id}`}>
              <Edit className="h-3 w-3 mr-1" /> Edit
            </Link>
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link href={`/protected/dashboard/${doc.id}/visualizations`}>
              <BarChart2 className="h-3 w-3 mr-1" /> Visualize
            </Link>
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link href={`/protected/dashboard/${doc.id}/history`}>
              <History className="h-3 w-3 mr-1" /> History
            </Link>
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link href={`/protected/dashboard/${doc.id}/final`}>
              <FileCheck className="h-3 w-3 mr-1" /> Final
            </Link>
          </Button>
          <Button size="sm" variant="ghost" onClick={handleDelete} className="text-destructive hover:text-destructive">
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
