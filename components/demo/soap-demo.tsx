'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { SparklesIcon, Loader2Icon, ChevronRightIcon } from 'lucide-react';
import { SOAP_DEMO_EXAMPLES, SOAP_DEMO_DAILY_LIMIT, SOAP_DEMO_MAX_NOTE_LENGTH } from '@/lib/ai/soap-demo-examples';
import { TrialButton } from '@/components/trial-button';
import Link from 'next/link';

// 從串流文字中解析 S/O/A/P 四個段落
function parseSoap(text: string): Record<string, string> {
  const sections: Record<string, string> = { S: '', O: '', A: '', P: '' };
  const pattern = /([SOAP])（[^）]+）：\s*([\s\S]*?)(?=(?:[SOAP]（[^）]+）：)|$)/g;
  let match;
  while ((match = pattern.exec(text)) !== null) {
    const key = match[1];
    if (key in sections) {
      sections[key] = match[2].trim();
    }
  }
  return sections;
}

const SECTION_META: { key: string; label: string; color: string }[] = [
  { key: 'S', label: 'S・主觀資料', color: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800' },
  { key: 'O', label: 'O・客觀資料', color: 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800' },
  { key: 'A', label: 'A・評估', color: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800' },
  { key: 'P', label: 'P・計畫', color: 'bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800' },
];

interface SoapDemoProps {
  defaultExampleId?: string;
  variant?: 'hero' | 'inline';
}

export function SoapDemo({ defaultExampleId, variant = 'hero' }: SoapDemoProps) {
  const defaultEx = SOAP_DEMO_EXAMPLES.find(e => e.id === defaultExampleId) ?? SOAP_DEMO_EXAMPLES[0];
  const [exampleId, setExampleId] = useState(defaultEx.id);
  const [rawNote, setRawNote] = useState(defaultEx.rawNote);
  const [instruction, setInstruction] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [limitReached, setLimitReached] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const handleExampleChange = (id: string) => {
    const ex = SOAP_DEMO_EXAMPLES.find(e => e.id === id);
    if (!ex) return;
    setExampleId(id);
    setRawNote(ex.rawNote);
    setOutput('');
    setLimitReached(false);
  };

  const handleCancel = () => {
    abortRef.current?.abort();
    setLoading(false);
    setOutput('');
    setInstruction('');
    const ex = SOAP_DEMO_EXAMPLES.find(e => e.id === exampleId);
    if (ex) setRawNote(ex.rawNote);
    setLimitReached(false);
  };

  const handleConvert = async () => {
    if (!rawNote.trim()) {
      toast.error('請輸入護理記錄內容');
      return;
    }

    setOutput('');
    setLimitReached(false);
    setLoading(true);
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch('/api/demo/soap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawNote,
          ...(instruction.trim() ? { instruction: instruction.trim() } : {}),
        }),
        signal: controller.signal,
      });

      if (res.status === 429) {
        setLimitReached(true);
        setRemaining(0);
        return;
      }

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'AI 轉換失敗' }));
        toast.error(err.error ?? 'AI 轉換失敗');
        return;
      }

      const rem = res.headers.get('X-Demo-Remaining');
      if (rem !== null) setRemaining(parseInt(rem, 10));

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let text = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        setOutput(text);
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        toast.error('連線失敗，請稍後再試');
      }
    } finally {
      setLoading(false);
    }
  };

  const parsed = parseSoap(output);
  const hasOutput = output.trim().length > 0;
  const isInline = variant === 'inline';

  return (
    <div className={`rounded-2xl border bg-card shadow-sm ${isInline ? 'p-5' : 'p-6 md:p-8'}`}>
      {/* 標題列 */}
      <div className="flex items-start gap-3 mb-5">
        <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
          <SparklesIcon className="w-5 h-5 text-primary" strokeWidth={1.8} />
        </div>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className={`font-semibold text-foreground ${isInline ? 'text-base' : 'text-lg'}`}>
              AI 修改助手
            </h3>
            <Badge variant="secondary" className="text-xs">體驗版 · 免費體驗 · 無需註冊</Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">
            選一個情境，立即體驗 AI 如何將護理記錄改寫成 SOAP
          </p>
        </div>
      </div>

      {/* 範例切換 Tabs */}
      <Tabs value={exampleId} onValueChange={handleExampleChange} className="mb-4">
        <TabsList className="h-auto flex-wrap gap-1 bg-muted/50 p-1">
          {SOAP_DEMO_EXAMPLES.map(ex => (
            <TabsTrigger key={ex.id} value={ex.id} className="text-xs px-3 py-1.5 rounded-md">
              {ex.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        {/* 1. 選取儲存格 */}
        <div>
          <Label className="text-xs text-muted-foreground mb-1.5 block">選取儲存格</Label>
          <Textarea
            value={rawNote}
            onChange={e => setRawNote(e.target.value)}
            maxLength={SOAP_DEMO_MAX_NOTE_LENGTH}
            placeholder="把護理記錄貼到這裡…"
            disabled={loading}
            className={`resize-none font-sans text-sm leading-relaxed bg-muted border-0 focus-visible:ring-1 ${isInline ? 'min-h-[140px]' : 'min-h-[160px]'}`}
          />
          <div className="flex justify-end mt-1">
            <span className={`text-xs ${rawNote.length > SOAP_DEMO_MAX_NOTE_LENGTH - 50 ? 'text-destructive' : 'text-muted-foreground'}`}>
              {rawNote.length} / {SOAP_DEMO_MAX_NOTE_LENGTH}
            </span>
          </div>
        </div>

        {/* 2. 修改指令 + SOAP Checkbox（鎖定勾選）*/}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="demo-instruction">修改指令</Label>
            <div className="flex items-center gap-1.5">
              <Checkbox
                id="demo-soap-mode"
                checked
                disabled
                className="opacity-70"
              />
              <Label htmlFor="demo-soap-mode" className="text-sm font-medium cursor-default select-none">SOAP</Label>
            </div>
          </div>
          <Textarea
            id="demo-instruction"
            placeholder="改寫成：主觀S、客觀O、評估A、計畫P四段結構。若還有其他需求，可在此說明（例：精簡用字、加入具體數值範圍等等）"
            value={instruction}
            onChange={e => setInstruction(e.target.value)}
            rows={3}
            disabled={loading}
            className="resize-none text-sm"
          />
          <p className="text-xs text-muted-foreground">體驗版固定為 SOAP 模式，正式版可自由切換</p>
        </div>

        {/* 3. 按鈕列 */}
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleCancel}>
            取消
          </Button>
          <Button
            onClick={handleConvert}
            disabled={loading || limitReached || remaining === 0}
            className="gap-2"
          >
            {loading ? (
              <>
                <Loader2Icon className="w-4 h-4 animate-spin" />
                AI 思考中…
              </>
            ) : (
              <>
                <SparklesIcon className="w-4 h-4" strokeWidth={1.8} />
                送出
              </>
            )}
          </Button>
        </div>

        {/* 4. AI 建議修改（載入中或有輸出時顯示）*/}
        {(hasOutput || limitReached || loading) && (
          <div>
            <Label className="text-xs text-muted-foreground mb-1.5 block">AI 建議修改</Label>
            {limitReached ? (
              <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20 p-4 flex flex-col items-center justify-center gap-3 text-center min-h-[140px]">
                <SparklesIcon className="w-8 h-8 text-amber-500" strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-semibold text-amber-800 dark:text-amber-200">今日免費體驗次數已用完</p>
                  <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">明天 UTC 00:00 自動重置，或立即免費註冊解鎖無限次使用</p>
                </div>
                <TrialButton>免費試用（無需註冊）</TrialButton>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {SECTION_META.map(({ key, label, color }) => (
                  <div key={key} className={`rounded-lg border p-3 ${color}`}>
                    <p className="text-xs font-bold text-foreground/70 mb-1">{label}</p>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap text-foreground">
                      {parsed[key] || (loading ? <span className="opacity-40">生成中…</span> : '')}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 底部資訊列 + CTA */}
      <div className="mt-5 pt-4 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="text-xs text-muted-foreground">
          {remaining !== null && !limitReached ? (
            <span>今日剩餘免費體驗：<strong className="text-foreground">{remaining}</strong> 次</span>
          ) : !limitReached ? (
            <span>每個 IP 每日 {SOAP_DEMO_DAILY_LIMIT} 次免費體驗</span>
          ) : null}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <TrialButton>免費試用（無需註冊）</TrialButton>
          <Button variant="ghost" size="sm" asChild className="gap-1 text-xs text-muted-foreground">
            <Link href="/docs/soap-writing">
              SOAP 教學 <ChevronRightIcon className="w-3.5 h-3.5" strokeWidth={2} />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
