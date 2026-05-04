'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { SparklesIcon, SquareIcon, ChevronRightIcon } from 'lucide-react';
import { SOAP_DEMO_EXAMPLES, SOAP_DEMO_DAILY_LIMIT, SOAP_DEMO_MAX_NOTE_LENGTH } from '@/lib/ai/soap-demo-examples';
import { TrialButton } from '@/components/trial-button';
import Link from 'next/link';

// 從串流文字中解析 S/O/A/P 四個段落
function parseSoap(text: string): Record<string, string> {
  const sections: Record<string, string> = { S: '', O: '', A: '', P: '' };
  // 匹配「S（主觀資料 Subjective）：」等開頭
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
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [limitReached, setLimitReached] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  // 切換範例時更新 textarea（若使用者已手動修改則不自動覆蓋以外的情境）
  const handleExampleChange = (id: string) => {
    const ex = SOAP_DEMO_EXAMPLES.find(e => e.id === id);
    if (!ex) return;
    setExampleId(id);
    setRawNote(ex.rawNote);
    setOutput('');
    setLimitReached(false);
  };

  const handleConvert = async () => {
    if (loading) {
      abortRef.current?.abort();
      setLoading(false);
      return;
    }
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
        body: JSON.stringify({ rawNote }),
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

      // 讀取剩餘次數 header
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
              親自體驗：AI 一秒把護理記錄轉成 SOAP
            </h3>
            <Badge variant="secondary" className="text-xs">免費體驗 · 無需註冊</Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">
            選一個情境，或把自己的記錄貼上來，看看 AI 怎麼整理成 S/O/A/P 四段式
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

      {/* 主體：輸入 + 輸出 */}
      <div className={`grid gap-4 ${isInline ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 md:grid-cols-2'}`}>
        {/* 左側：原文輸入 */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">護理記錄原文</span>
            <span className={`text-xs ${rawNote.length > SOAP_DEMO_MAX_NOTE_LENGTH - 50 ? 'text-destructive' : 'text-muted-foreground'}`}>
              {rawNote.length} / {SOAP_DEMO_MAX_NOTE_LENGTH}
            </span>
          </div>
          <Textarea
            value={rawNote}
            onChange={e => setRawNote(e.target.value)}
            maxLength={SOAP_DEMO_MAX_NOTE_LENGTH}
            placeholder="把護理記錄貼到這裡…"
            className={`resize-none font-sans text-sm leading-relaxed ${isInline ? 'min-h-[180px]' : 'min-h-[220px]'}`}
          />
          <Button
            onClick={handleConvert}
            disabled={limitReached || remaining === 0}
            variant={loading ? 'outline' : 'accent'}
            className="w-full gap-2"
          >
            {loading ? (
              <>
                <SquareIcon className="w-4 h-4" strokeWidth={1.8} />
                停止
              </>
            ) : (
              <>
                <SparklesIcon className="w-4 h-4" strokeWidth={1.8} />
                AI 轉成 SOAP
              </>
            )}
          </Button>
        </div>

        {/* 右側：SOAP 輸出 */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">SOAP 格式輸出</span>
          {limitReached ? (
            <div className="flex-1 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20 p-4 flex flex-col items-center justify-center gap-3 text-center min-h-[180px]">
              <SparklesIcon className="w-8 h-8 text-amber-500" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-semibold text-amber-800 dark:text-amber-200">今日免費體驗次數已用完</p>
                <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">明天 UTC 00:00 自動重置，或立即免費註冊解鎖無限次使用</p>
              </div>
              <TrialButton>免費試用（無需註冊）</TrialButton>
            </div>
          ) : !hasOutput ? (
            <div className={`flex-1 rounded-xl border border-dashed border-muted-foreground/25 bg-muted/30 flex items-center justify-center text-center p-4 ${isInline ? 'min-h-[180px]' : 'min-h-[220px]'}`}>
              <div className="text-muted-foreground/50">
                <p className="text-sm">按下「AI 轉成 SOAP」後</p>
                <p className="text-sm">這裡會出現四段式結果</p>
              </div>
            </div>
          ) : (
            <div className={`flex-1 flex flex-col gap-2 ${isInline ? 'min-h-[180px]' : 'min-h-[220px]'}`}>
              {SECTION_META.map(({ key, label, color }) => (
                <div key={key} className={`rounded-lg border p-3 flex-1 ${color}`}>
                  <p className="text-xs font-bold text-foreground/70 mb-1">{label}</p>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap text-foreground">
                    {parsed[key] || (loading ? <span className="opacity-40">生成中…</span> : '')}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
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
