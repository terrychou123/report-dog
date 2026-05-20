"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { trackEvent } from "@/lib/analytics";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error ?? "發生錯誤，請稍後再試");
        return;
      }

      trackEvent("newsletter_subscribe", { method: "footer" });
      toast.success("訂閱成功，請至信箱查收歡迎信！");
      setEmail("");
    } catch {
      toast.error("網路錯誤，請稍後再試");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="輸入 Email 訂閱電子報"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={loading}
        className="flex-1 h-9 text-sm"
        aria-label="電子報訂閱 Email"
      />
      <Button type="submit" size="sm" disabled={loading} className="shrink-0">
        {loading ? "…" : "訂閱"}
      </Button>
    </form>
  );
}
