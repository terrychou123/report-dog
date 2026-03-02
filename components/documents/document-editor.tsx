'use client';

import { useState, useCallback } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Save, Download } from 'lucide-react';

interface DocumentEditorProps {
  docId: string;
  initialTitle: string;
  initialContent: string;
  onContentChange?: (content: string) => void;
}

export function DocumentEditor({ docId, initialTitle, initialContent, onContentChange }: DocumentEditorProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [saving, setSaving] = useState(false);

  const wordCount = content.split(/\s+/).filter(Boolean).length;

  const handleSave = useCallback(async (opts?: { saveRevision?: boolean }) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/documents/${docId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          currentContent: content,
          saveRevision: opts?.saveRevision ?? false,
          changeSummary: opts?.saveRevision ? 'Manual save' : undefined,
        }),
      });
      if (!res.ok) throw new Error();
      toast.success(opts?.saveRevision ? 'Saved as new revision' : 'Saved');
    } catch {
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  }, [docId, title, content]);

  const handleExport = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title || 'document'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleContentChange = (val: string) => {
    setContent(val);
    onContentChange?.(val);
  };

  return (
    <div className="flex flex-col h-full">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Document title..."
        className="text-xl font-semibold border-none shadow-none px-0 focus-visible:ring-0 mb-2"
      />
      <Separator />
      <Textarea
        value={content}
        onChange={(e) => handleContentChange(e.target.value)}
        placeholder="Start writing or paste your report content here..."
        className="flex-1 resize-none border-none shadow-none focus-visible:ring-0 font-mono text-sm mt-2"
      />
      <Separator />
      <div className="flex items-center justify-between pt-2 text-sm text-muted-foreground">
        <span>{wordCount} words</span>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={handleExport}>
            <Download className="h-3 w-3 mr-1" /> Export
          </Button>
          <Button size="sm" variant="outline" onClick={() => handleSave({ saveRevision: true })} disabled={saving}>
            <Save className="h-3 w-3 mr-1" /> Save Revision
          </Button>
          <Button size="sm" onClick={() => handleSave()} disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>
    </div>
  );
}
