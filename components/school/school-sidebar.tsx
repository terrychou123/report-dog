"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { schoolNavSections } from "@/lib/school-nav";
import { cn } from "@/lib/utils";
import { GraduationCapIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function SchoolSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/school"
        className="flex items-center gap-2 font-semibold text-sm"
        onClick={onNavigate}
      >
        <GraduationCapIcon className="h-4 w-4 text-primary" />
        評鑑小教室總覽
      </Link>
      {schoolNavSections.map((section) => (
        <div key={section.group}>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            {section.group}
          </p>
          <ul className="space-y-1">
            {section.items.map((item) => (
              <li key={item.href + item.label}>
                {item.comingSoon ? (
                  <span className="flex items-center justify-between rounded-md px-3 py-2 text-sm opacity-50 cursor-default">
                    <span>{item.label}</span>
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4">
                      即將推出
                    </Badge>
                  </span>
                ) : (
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
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
