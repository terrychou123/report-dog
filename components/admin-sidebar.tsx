"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PanelLeftClose, PanelLeftOpen, BuildingIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/admin/home-care",            label: "居家長照機構" },
  { href: "/admin/daycare",              label: "日間照顧中心" },
  { href: "/admin/nursing-home",         label: "住宿型照顧機構" },
  { href: "/admin/home-nursing",         label: "居家護理所" },
  { href: "/admin/general-nursing-home", label: "一般護理之家" },
  { href: "/admin/babycare",             label: "產後護理之家" },
  { href: "/admin/hospital",             label: "醫院評鑑" },
  { href: "/admin/disability",           label: "身心障礙福利機構" },
];

export function AdminSidebar() {
  const pathname = usePathname();
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
      <div className="flex items-center justify-end py-3 px-2 border-b">
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

      <nav className="flex-1 px-2 py-4 space-y-0.5">
        <TooltipProvider>
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href || pathname.startsWith(href + "/");
            return collapsed ? (
              <Tooltip key={href}>
                <TooltipTrigger asChild>
                  <Link
                    href={href}
                    className={cn(
                      "flex items-center justify-center p-2.5 rounded-lg text-sm transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <BuildingIcon className="h-4 w-4" />
                    <span className="sr-only">{label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{label}</TooltipContent>
              </Tooltip>
            ) : (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <BuildingIcon className="h-4 w-4 shrink-0" />
                <span className="truncate">{label}</span>
              </Link>
            );
          })}
        </TooltipProvider>
      </nav>
    </aside>
  );
}
