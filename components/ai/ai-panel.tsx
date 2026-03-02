'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Sparkles, CopyCheck, BookMarked } from 'lucide-react';

const AI_ACTIONS = [
  { value: 'analyze', label: 'Analyze', description: 'Get insights and improvement suggestions' },
  { value: 'improve', label: 'Improve', description: 'Enhance language and structure' },
  { value: 'summarize', label: 'Summarize', description: 'Create executive summary' },
  { value: 'extract-data', label: 'Extract Data', description: 'Extract numbers, dates, entities' },
];

interface AIPanelProps {
  docId: string;
  onApply: (content: string) => void;
}

export function AIPanel({ docId, onApply }: AIPanelProps) {
  const [action, setAction] = useState('analyze');
  const [userMessage, setUserMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  async function handleAsk() {
    if (loading) {
      abortRef.current?.abort();
      setLoading(false);
      return;
    }
    setResponse('');
    setLoading(true);
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch(`/api/documents/${docId}/ai`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, userMessage }),
        signal: controller.signal,
      });
      if (!res.ok) {
        const err = await res.text();
        toast.error('AI error: ' + err);
        return;
      }
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let text = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        setResponse(text);
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') toast.error('Request failed');
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveRevision() {
    if (!response) return;
    try {
      await fetch(`/api/documents/${docId}/revisions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: response,
          changeSummary: `AI ${action}`,
          isAiGenerated: true,
        }),
      });
      toast.success('Saved as revision');
    } catch {
      toast.error('Failed to save revision');
    }
  }

  const selectedAction = AI_ACTIONS.find((a) => a.value === action);

  return (
    <div className="flex flex-col h-full gap-3">
      <div className="space-y-1">
        <p className="text-sm font-medium">AI Action</p>
        <Select value={action} onValueChange={setAction}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {AI_ACTIONS.map((a) => (
              <SelectItem key={a.value} value={a.value}>
                {a.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedAction && (
          <p className="text-xs text-muted-foreground">{selectedAction.description}</p>
        )}
      </div>

      <div className="space-y-1">
        <p className="text-sm font-medium">Additional Instructions (optional)</p>
        <Textarea
          placeholder="Add specific instructions for the AI..."
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          rows={2}
          className="resize-none text-sm"
        />
      </div>

      <Button onClick={handleAsk} disabled={false} className="w-full">
        <Sparkles className="h-4 w-4 mr-2" />
        {loading ? 'Stop' : 'Ask AI'}
      </Button>

      <Separator />

      <div className="flex-1 flex flex-col min-h-0">
        <p className="text-sm font-medium mb-1">AI Response</p>
        <ScrollArea className="flex-1 rounded-md border p-3 bg-muted/30">
          {response ? (
            <pre className="whitespace-pre-wrap text-sm font-sans">{response}</pre>
          ) : (
            <p className="text-xs text-muted-foreground italic">
              {loading ? 'Generating response...' : 'AI response will appear here'}
            </p>
          )}
        </ScrollArea>
      </div>

      {response && (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="flex-1"
            onClick={() => { onApply(response); toast.success('Applied to document'); }}
          >
            <CopyCheck className="h-3 w-3 mr-1" /> Apply
          </Button>
          <Button size="sm" variant="outline" className="flex-1" onClick={handleSaveRevision}>
            <BookMarked className="h-3 w-3 mr-1" /> Save Revision
          </Button>
        </div>
      )}
    </div>
  );
}
