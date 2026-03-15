"use client";

import Link from "next/link";
import { useState } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { BotIcon, MenuIcon } from "lucide-react";

const navLinks = [
  { href: "/", label: "首頁" },
  { href: "/pricing", label: "價格" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <MenuIcon className="h-5 w-5" />
          <span className="sr-only">開啟選單</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 px-6 pt-10">
        <SheetTitle className="sr-only">導覽選單</SheetTitle>
        <div className="flex items-center gap-2 font-bold text-xl mb-8">
          <BotIcon className="h-6 w-6 text-primary" />
          報告汪
        </div>
        <nav className="flex flex-col gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm hover:text-primary transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
