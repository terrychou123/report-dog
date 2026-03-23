"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsNavSections } from "@/lib/docs-nav";
import { cn } from "@/lib/utils";
import { BookOpenIcon } from "lucide-react";

export function DocsSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/docs"
        className="flex items-center gap-2 font-semibold text-sm"
        onClick={onNavigate}
      >
        <BookOpenIcon className="h-4 w-4 text-primary" />
        使用教學總覽
      </Link>
      {docsNavSections.map((section) => (
        <div key={section.group}>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            {section.group}
          </p>
          <ul className="space-y-1">
            {section.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  title={item.title}
                  onClick={onNavigate}
                  className={cn(
                    "block rounded-md px-3 py-2 text-sm transition-colors",
                    pathname === item.href
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
