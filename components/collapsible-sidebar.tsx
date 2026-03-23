"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BotIcon, TagIcon, FileTextIcon, Share2Icon, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { LogoutButton } from "@/components/logout-button";
import { NotificationBell } from "@/components/notification-bell";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/report", label: "報告", icon: FileTextIcon },
  { href: "/tag", label: "標籤", icon: TagIcon },
  { href: "/share", label: "與我分享", icon: Share2Icon },
];

interface CollapsibleSidebarProps {
  email?: string;
}

export function CollapsibleSidebar({ email }: CollapsibleSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const check = () => setCollapsed(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <aside
      className={`shrink-0 border-r bg-muted/20 flex flex-col transition-all duration-200 ${
        collapsed ? "w-14" : "w-56"
      }`}
    >
      {/* Logo */}
      <div className={`flex items-center border-b py-4 ${collapsed ? "justify-center px-0" : "justify-between px-3"}`}>
        {!collapsed && (
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg hover:opacity-80 transition-opacity min-w-0"
          >
            <BotIcon className="h-5 w-5 text-primary shrink-0" />
            <span className="truncate">報告汪</span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 shrink-0"
          onClick={() => setCollapsed((v) => !v)}
          aria-label={collapsed ? "展開側邊欄" : "折疊側邊欄"}
        >
          {collapsed ? (
            <PanelLeftOpen className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        <TooltipProvider>
          {navLinks.map(({ href, label, icon: Icon }) =>
            collapsed ? (
              <Tooltip key={href}>
                <TooltipTrigger asChild>
                  <Link
                    href={href}
                    className="flex items-center justify-center p-2.5 rounded-lg text-sm transition-colors text-muted-foreground hover:text-foreground hover:bg-muted"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="sr-only">{label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{label}</TooltipContent>
              </Tooltip>
            ) : (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            )
          )}
        </TooltipProvider>
      </nav>

      {/* User */}
      <div className="px-2 py-4 border-t flex flex-col items-center gap-2">
        <NotificationBell collapsed={collapsed} />
        <LogoutButton email={email} />
      </div>
    </aside>
  );
}
