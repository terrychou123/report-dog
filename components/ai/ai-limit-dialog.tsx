'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface AiLimitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AiLimitDialog({ open, onOpenChange }: AiLimitDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>今日 AI 分析次數已達上限</DialogTitle>
          <DialogDescription className="pt-2 space-y-3" asChild>
            <div>
              <p>每日可免費使用 1 次 AI 分析，明天 UTC 00:00 將自動重置。</p>
              <p className="font-medium text-foreground">明天繼續，或：</p>
              <ul className="space-y-1.5 text-sm">
                <li>
                  {/* 體驗公開 demo 不吃登入額度 */}
                  <Link
                    href="/demo"
                    className="text-primary hover:underline underline-offset-4"
                    onClick={() => onOpenChange(false)}
                  >
                    → 免費體驗 SOAP 改寫 Demo（不佔用次數）
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/nursing-pdca-template-full-guide-2026"
                    className="text-primary hover:underline underline-offset-4"
                    onClick={() => onOpenChange(false)}
                  >
                    → 閱讀 PDCA 護理報告撰寫指南
                  </Link>
                </li>
              </ul>
              <p className="text-xs text-muted-foreground pt-1">
                多用戶版本正在開發中，有需求可
                <Link href="mailto:hi@reportwang.com" className="text-primary hover:underline mx-1">
                  聯絡我們
                </Link>
                優先體驗。
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>我知道了</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
