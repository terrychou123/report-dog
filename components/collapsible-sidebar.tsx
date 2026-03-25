"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { TagIcon, FileTextIcon, Share2Icon, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { NotificationBell } from "@/components/notification-bell";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/report", label: "報告", icon: FileTextIcon },
  { href: "/tag", label: "標籤", icon: TagIcon },
  { href: "/share", label: "與我分享", icon: Share2Icon },
];

export function CollapsibleSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const userToggledRef = useRef(false);

  useEffect(() => {
    setCollapsed(window.innerWidth < 768);

    const handleResize = () => {
      if (!userToggledRef.current) setCollapsed(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggle = () => {
    userToggledRef.current = true;
    setCollapsed((v) => !v);
  };

  return (
    <aside
      className={`shrink-0 border-r bg-muted/20 flex flex-col transition-all duration-200 ${
        collapsed ? "w-14" : "w-56"
      }`}
    >
      {/* Collapse toggle - small screens only */}
      <div className="md:hidden flex items-center justify-center py-4 px-0">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 shrink-0"
          onClick={handleToggle}
          aria-label={collapsed ? "展開側邊欄" : "折疊側邊欄"}
        >
          {collapsed ? (
            <PanelLeftOpen className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Notification Bell - below toggle, above nav */}
      <div className="px-2 pt-4 flex flex-col items-center">
        <NotificationBell collapsed={collapsed} />
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
    </aside>
  );
}
