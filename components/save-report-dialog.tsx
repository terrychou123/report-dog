"use client";

import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SaveIcon } from "lucide-react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (changeSummary: string | null) => Promise<void>;
};

export function SaveReportDialog({ open, onOpenChange, onConfirm }: Props) {
  const [summary, setSummary] = useState("");
  const [saving, setSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 每次開啟時清空摘要輸入框
  useEffect(() => {
    if (open) {
      setSummary("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  async function handleConfirm() {
    setSaving(true);
    try {
      await onConfirm(summary.trim() || null);
      onOpenChange(false);
    } finally {
      setSaving(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !saving) handleConfirm();
  }

  return (
    <Dialog open={open} onOpenChange={saving ? undefined : onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <SaveIcon className="h-4 w-4" />
            儲存版本
          </DialogTitle>
          <DialogDescription>
            簡述本次修改重點，方便日後辨認版本（選填）
          </DialogDescription>
        </DialogHeader>

        <Input
          ref={inputRef}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="例：新增個案意見反映機制說明"
          maxLength={200}
          disabled={saving}
        />

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={saving}
          >
            取消
          </Button>
          <Button onClick={handleConfirm} disabled={saving}>
            {saving ? "儲存中..." : "儲存"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
