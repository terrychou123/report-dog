"use client";

import Link from "next/link";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FileText, Upload, LayoutDashboard, Menu } from "lucide-react";

const navItems = [
  { href: "/protected/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/protected/dashboard/upload", icon: Upload, label: "Upload Report" },
];

function SidebarLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex-1 px-3 py-4 space-y-1">
      {navItems.map(({ href, icon: Icon, label }) => (
        <Link
          key={href}
          href={href}
          className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
          onClick={onNavigate}
        >
          <Icon className="h-4 w-4" />
          {label}
        </Link>
      ))}
    </nav>
  );
}

export function DashboardSidebarMobile() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden shrink-0 flex items-center justify-between px-4 h-12 border-b bg-background/95 backdrop-blur">
      <Link href="/protected/dashboard" className="flex items-center gap-2 font-semibold text-sm">
        <FileText className="h-5 w-5 text-primary" />
        ReportAI
      </Link>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">開啟選單</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-56 flex flex-col p-0">
          <div className="px-5 py-4 border-b">
            <Link
              href="/protected/dashboard"
              className="flex items-center gap-2 font-semibold text-sm"
              onClick={() => setOpen(false)}
            >
              <FileText className="h-5 w-5 text-primary" />
              ReportAI
            </Link>
          </div>
          <SidebarLinks onNavigate={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
