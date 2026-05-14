"use client";

import { useState, useRef, type ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { trackEvent } from "@/lib/analytics";
import type { DownloadItem } from "@/lib/downloads/catalog";

interface DownloadGateDialogProps {
  file: DownloadItem;
  trigger: ReactNode;
}

export function DownloadGateDialog({ file, trigger }: DownloadGateDialogProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const anchorRef = useRef<HTMLAnchorElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "download", file: file.file }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error ?? "發生錯誤，請稍後再試");
        return;
      }

      trackEvent("lead_capture", { source: "download", file: file.slug });

      // 用隱藏 <a> 觸發下載，保留瀏覽器建議的檔名
      if (anchorRef.current && data.downloadUrl) {
        anchorRef.current.href = data.downloadUrl;
        anchorRef.current.click();
      }

      toast.success("下載已開始！");
      setOpen(false);
      setEmail("");
    } catch {
      toast.error("網路錯誤，請稍後再試");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 隱藏的下載錨點 */}
      <a ref={anchorRef} className="hidden" aria-hidden="true" />

      <span
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
        className="contents"
      >
        {trigger}
      </span>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>免費下載：{file.name}</DialogTitle>
            <DialogDescription>
              輸入 Email 即可立即下載，我們會不定期寄送評鑑最新資訊。
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div className="space-y-1.5">
              <Label htmlFor="gate-email">Email 地址</Label>
              <Input
                id="gate-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                autoFocus
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "處理中…" : "立即下載"}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              我們僅以此 Email 寄送相關評鑑資源，可隨時退訂。
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
