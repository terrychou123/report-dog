"use client";

import { useState } from "react";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SchoolSidebar } from "@/components/school/school-sidebar";

export function SchoolMobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden" aria-label="開啟評鑑小教室目錄">
          <MenuIcon className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 pt-10">
        <SheetHeader className="sr-only">
          <SheetTitle>評鑑小教室目錄</SheetTitle>
        </SheetHeader>
        <div className="overflow-y-auto h-full pb-8">
          <SchoolSidebar onNavigate={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
