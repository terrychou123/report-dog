"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const STORAGE_KEY = "blog-cta-dismissed-at";
const DISMISS_TTL_MS = 24 * 60 * 60 * 1000; // 24h

function readDismissed(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const ts = parseInt(raw, 10);
    if (!Number.isFinite(ts)) return false;
    return Date.now() - ts < DISMISS_TTL_MS;
  } catch {
    return false;
  }
}

export function BlogScrollCta({ slug }: { slug: string }) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // 初次掛載再讀 localStorage，避免 SSR 與 client 不一致
  useEffect(() => {
    setDismissed(readDismissed());
  }, []);

  useEffect(() => {
    if (dismissed) return;

    const handleScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      if (total > 0 && scrolled / total >= 0.5) {
        setVisible(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

  const handleDismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      // localStorage 不可用（隱私模式）就 in-memory dismiss，不阻斷
    }
    setDismissed(true);
  };

  if (dismissed || !visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 border-t bg-background/95 backdrop-blur-sm pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground hidden sm:block shrink-0">
          還在手刻評鑑文件？
        </p>
        <p className="text-sm font-medium flex-1 truncate">
          <span className="sm:hidden">AI 自動產出評鑑文件</span>
          <span className="hidden sm:inline">報告汪 AI 自動產出 PDCA、SOAP — 14 天免費試用</span>
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href={`/auth/sign-up?source=blog-cta&slug=${encodeURIComponent(slug)}`}
            onClick={() => trackEvent("cta_click", { source: "blog-mid-cta", slug })}
            className="inline-flex items-center justify-center rounded-full bg-accent text-accent-foreground px-4 py-1.5 text-sm font-medium hover:bg-accent/90 transition-colors whitespace-nowrap"
          >
            <span className="sm:hidden">免費試用</span>
            <span className="hidden sm:inline">立即免費註冊</span>
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
