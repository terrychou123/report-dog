import Link from "next/link";
import { Suspense } from "react";
import { AuthButton } from "@/components/auth-button";
import { MobileMenu } from "@/components/mobile-menu";
import { BotIcon } from "lucide-react";
import { navLinks } from "@/lib/nav";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link href="/" title="報告汪 — 長照機構 AI 文書管理系統" className="flex items-center gap-2 font-bold text-xl">
            <BotIcon className="h-6 w-6 text-primary" />
            報告汪
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                title={link.title}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <MobileMenu />
          <Suspense fallback={<div className="h-8 w-20 rounded bg-muted animate-pulse" />}>
            <AuthButton />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}
