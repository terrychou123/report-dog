"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PanelLeftClose, PanelLeftOpen, BuildingIcon, NewspaperIcon, GraduationCap } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type NavLink = {
  href: string;
  label: string;
  short: string;
  icon: LucideIcon;
};

const navLinks: NavLink[] = [
  { href: "/admin/blog",               label: "部落格管理",   short: "部落", icon: NewspaperIcon },
  { href: "/admin/class",              label: "課程管理",     short: "課程", icon: GraduationCap },
  { href: "/admin/home-care",           label: "居家長照機構", short: "居家", icon: BuildingIcon },
  { href: "/admin/daycare",             label: "日間照顧中心", short: "日間", icon: BuildingIcon },
  { href: "/admin/nursing-home",        label: "住宿型照顧機構", short: "住宿", icon: BuildingIcon },
  { href: "/admin/home-nursing",        label: "居家護理所",   short: "居護", icon: BuildingIcon },
  { href: "/admin/general-nursing-home", label: "一般護理之家", short: "一般", icon: BuildingIcon },
  { href: "/admin/babycare",            label: "產後護理之家", short: "產後", icon: BuildingIcon },
  { href: "/admin/hospital",            label: "醫院評鑑",     short: "醫院", icon: BuildingIcon },
  { href: "/admin/disability-welfare",   label: "身心障礙福利機構", short: "身障", icon: BuildingIcon },
  { href: "/admin/youth-care",           label: "兒少教養機構",     short: "兒少", icon: BuildingIcon },
  { href: "/admin/elderly-welfare",      label: "老人福利機構",     short: "老福", icon: BuildingIcon },
  { href: "/admin/psychiatric-nursing-home", label: "精神護理之家", short: "精護", icon: BuildingIcon },
  { href: "/admin/infant-daycare",       label: "托嬰中心",         short: "托嬰", icon: BuildingIcon },
];

const STORAGE_KEY = "admin-sidebar-collapsed";

export function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const userToggledRef = useRef(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      userToggledRef.current = true;
      setCollapsed(saved === "true");
    } else {
      setCollapsed(window.innerWidth < 768);
    }
    const handleResize = () => {
      if (!userToggledRef.current) setCollapsed(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggle = () => {
    userToggledRef.current = true;
    setCollapsed((v) => {
      localStorage.setItem(STORAGE_KEY, String(!v));
      return !v;
    });
  };

  return (
    <aside
      className={`shrink-0 border-r bg-muted/20 flex flex-col transition-all duration-200 ${
        collapsed ? "w-14" : "w-56"
      }`}
    >
      <div className="flex items-center justify-end py-3 px-2">
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

      <nav className="flex-1 px-2 py-2 space-y-0.5">
        <TooltipProvider>
          {navLinks.map(({ href, label, short, icon: Icon }) => {
            const isActive = pathname === href || pathname.startsWith(href + "/");
            return collapsed ? (
              <Tooltip key={href}>
                <TooltipTrigger asChild>
                  <Link
                    href={href}
                    className={cn(
                      "flex items-center justify-center py-2 rounded-lg text-xs font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    {short}
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
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{label}</span>
              </Link>
            );
          })}
        </TooltipProvider>
      </nav>
    </aside>
  );
}
