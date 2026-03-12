"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UpgradeTrialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpgradeInitiated?: () => void;
}

export function UpgradeTrialDialog({ open, onOpenChange, onUpgradeInitiated }: UpgradeTrialDialogProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  // Reset state each time the dialog opens
  useEffect(() => {
    if (open) {
      setEmail("");
      setLoading(false);
      setSent(false);
      setError("");
    }
  }, [open]);

  const handleUpgrade = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: otpError } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { shouldCreateUser: true },
    });

    setLoading(false);
    if (otpError) {
      setError(otpError.message);
    } else {
      onUpgradeInitiated?.();
      setSent(true);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>立即註冊以保留資料</DialogTitle>
          <DialogDescription>
            輸入您的 Email，我們將發送登入連結。點擊連結後，您的試用資料將自動保留。
          </DialogDescription>
        </DialogHeader>
        {sent ? (
          <div className="py-4 text-center space-y-2">
            <p className="font-medium text-green-600">已發送！請檢查您的信箱</p>
            <p className="text-sm text-muted-foreground">
              點擊信件中的連結後，帳號將自動升級，所有報告與標籤完整保留。
            </p>
          </div>
        ) : (
          <form onSubmit={handleUpgrade} className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "發送中…" : "發送登入連結"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
