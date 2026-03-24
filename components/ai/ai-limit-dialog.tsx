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
          <DialogDescription className="pt-2 space-y-2">
            <span className="block">每日可免費使用 1 次 AI 分析，明天 UTC 00:00 將自動重置。</span>
            <span className="block text-primary font-medium">專業版即將推出，敬請期待更多 AI 功能！</span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>我知道了</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
