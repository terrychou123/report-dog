'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Upload, FileText } from 'lucide-react';

export function DocumentUploadForm() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('');
  const [dragOver, setDragOver] = useState(false);

  async function handleFileRead(file: File) {
    const text = await file.text();
    setContent(text);
    setFileName(file.name);
    if (!title) {
      setTitle(file.name.replace(/\.[^/.]+$/, ''));
    }
    toast.success('File loaded: ' + file.name);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) { toast.error('Please enter a title'); return; }
    if (!content.trim()) { toast.error('Please add some content'); return; }

    setLoading(true);
    try {
      const res = await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim(), content: content.trim(), fileName: fileName || undefined }),
      });
      if (!res.ok) throw new Error(await res.text());
      const doc = await res.json();
      toast.success('Document created!');
      router.push(`/protected/dashboard/${doc.id}`);
    } catch {
      toast.error('Failed to create document');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Document Title</Label>
        <Input
          id="title"
          placeholder="Enter a title for your report..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <Tabs defaultValue="paste">
        <TabsList className="w-full">
          <TabsTrigger value="paste" className="flex-1">Paste Text</TabsTrigger>
          <TabsTrigger value="upload" className="flex-1">Upload File</TabsTrigger>
        </TabsList>

        <TabsContent value="paste" className="space-y-2">
          <Label>Content</Label>
          <Textarea
            placeholder="Paste your report content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={14}
            className="resize-none font-mono text-sm"
          />
        </TabsContent>

        <TabsContent value="upload" className="space-y-2">
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
              dragOver ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50'
            }`}
            onClick={() => fileRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              const file = e.dataTransfer.files[0];
              if (file) handleFileRead(file);
            }}
          >
            <Upload className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
            <p className="font-medium">Drop a file or click to browse</p>
            <p className="text-sm text-muted-foreground mt-1">Supports .txt and .md files</p>
            {fileName && (
              <div className="mt-3 flex items-center justify-center gap-2 text-sm text-primary">
                <FileText className="h-4 w-4" />
                {fileName}
              </div>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept=".txt,.md"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileRead(file);
            }}
          />
          {content && (
            <p className="text-xs text-muted-foreground">{content.split(/\s+/).filter(Boolean).length} words loaded</p>
          )}
        </TabsContent>
      </Tabs>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Creating...' : 'Create Document'}
      </Button>
    </form>
  );
}
