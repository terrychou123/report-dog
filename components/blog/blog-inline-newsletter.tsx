"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { MailIcon } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export function BlogInlineNewsletter({ slug }: { slug: string }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

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
      trackEvent("newsletter_subscribe", { method: "blog-inline", slug });
      setDone(true);
      setEmail("");
    } catch {
      toast.error("網路錯誤，請稍後再試");
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="mt-12 rounded-xl border bg-muted/40 p-6 md:p-8">
      <div className="flex items-start gap-4">
        <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <MailIcon className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base md:text-lg font-semibold mb-1">
            喜歡這篇文章？訂閱評鑑電子報
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            每週收到 1 篇實戰文書範例（PDCA、SOAP、評鑑常見缺失），可隨時退訂。
          </p>

          {done ? (
            <p className="text-sm font-medium text-primary">
              ✓ 訂閱成功，請至信箱查收歡迎信！
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="flex-1"
                aria-label="電子報訂閱 Email"
              />
              <Button type="submit" disabled={loading} className="shrink-0">
                {loading ? "處理中…" : "免費訂閱"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </aside>
  );
}
