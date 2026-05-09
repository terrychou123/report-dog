"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const SESSION_KEY = "blog-cta-dismissed";

export function BlogScrollCta({ slug }: { slug: string }) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // 同 session 已關閉則不顯示
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const handleScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      if (total > 0 && scrolled / total >= 0.5) {
        setVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem(SESSION_KEY, "1");
    setDismissed(true);
  };

  if (dismissed || !visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 border-t bg-background/95 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground hidden sm:block shrink-0">
          還在手刻評鑑文件？
        </p>
        <p className="text-sm font-medium flex-1 truncate">
          報告汪 AI 自動產出 PDCA、SOAP — 14 天免費試用
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href={`/auth/sign-up?source=blog-cta&slug=${slug}`}
            onClick={() => trackEvent("cta_click", { source: "blog-mid-cta", slug })}
            className="inline-flex items-center justify-center rounded-full bg-accent text-accent-foreground px-4 py-1.5 text-sm font-medium hover:bg-accent/90 transition-colors whitespace-nowrap"
          >
            立即免費註冊
          </Link>
          <button
            onClick={handleDismiss}
            aria-label="關閉"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
