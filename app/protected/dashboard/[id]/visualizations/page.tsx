'use client';

import { Suspense, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChartRenderer } from '@/components/visualizations/chart-renderer';
import { TimelineView } from '@/components/visualizations/timeline-view';
import { RelationshipGraph } from '@/components/visualizations/relationship-graph';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, BarChart2, Network, Clock } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

interface DocumentMetadata {
  extractedData?: {
    numbers?: Array<{ label: string; value: number }>;
    dates?: Array<{ label: string; date: string }>;
    entities?: string[];
    keyFacts?: string[];
  } | null;
}

interface Document {
  id: string;
  title: string;
  metadata: DocumentMetadata | null;
}

function VisualizationsContent() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [doc, setDoc] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/documents/${id}`)
      .then((r) => {
        if (!r.ok) { toast.error('Document not found'); router.push('/protected/dashboard'); return null; }
        return r.json();
      })
      .then((data) => { if (data) setDoc(data); })
      .finally(() => setLoading(false));
  }, [id, router]);

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  const extracted = doc?.metadata?.extractedData;

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link href={`/protected/dashboard/${id}`}>
              <ArrowLeft className="h-4 w-4 mr-1" /> Editor
            </Link>
          </Button>
          <h1 className="text-lg font-semibold">{doc?.title}</h1>
        </div>
      </div>

      {!extracted && (
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="text-base">No extracted data yet</CardTitle>
            <CardDescription>
              Open the editor, select <strong>Extract Data</strong> in the AI panel, and click &ldquo;Ask AI&rdquo;.
              Then apply the result to update your document metadata.
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      <Tabs defaultValue="charts">
        <TabsList>
          <TabsTrigger value="charts" className="gap-1.5">
            <BarChart2 className="h-4 w-4" /> Charts
          </TabsTrigger>
          <TabsTrigger value="timeline" className="gap-1.5">
            <Clock className="h-4 w-4" /> Timeline
          </TabsTrigger>
          <TabsTrigger value="relationships" className="gap-1.5">
            <Network className="h-4 w-4" /> Relationships
          </TabsTrigger>
        </TabsList>

        <TabsContent value="charts" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Numerical Data</CardTitle>
              <CardDescription>Chart view of extracted numerical values</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartRenderer extractedData={extracted ?? null} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Event Timeline</CardTitle>
              <CardDescription>Chronological view of dates mentioned in the document</CardDescription>
            </CardHeader>
            <CardContent>
              <TimelineView events={extracted?.dates ?? null} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="relationships" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Entity Relationships</CardTitle>
              <CardDescription>Key entities extracted from the document</CardDescription>
            </CardHeader>
            <CardContent>
              <RelationshipGraph entities={extracted?.entities ?? null} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {extracted?.keyFacts && extracted.keyFacts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Key Facts</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {extracted.keyFacts.map((fact, i) => (
                <li key={i} className="flex gap-2 text-sm">
                  <span className="text-primary font-bold">·</span>
                  {fact}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function VisualizationsPage() {
  return (
    <Suspense fallback={
      <div className="p-6 space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-96 w-full" />
      </div>
    }>
      <VisualizationsContent />
    </Suspense>
  );
}
