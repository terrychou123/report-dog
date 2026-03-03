import Link from "next/link";
import { Suspense } from "react";
import { BotIcon, UsersIcon, FileTextIcon, TagIcon } from "lucide-react";
import { LogoutButton } from "@/components/logout-button";
import { createClient } from "@/lib/supabase/server";

async function SidebarUser() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  return (
    <div className="px-4 py-4 border-t">
      {data?.claims?.email && (
        <p className="text-xs text-muted-foreground mb-2 truncate">{data.claims.email}</p>
      )}
      <LogoutButton />
    </div>
  );
}

const navLinks = [
  { href: "/client", label: "對象", icon: <UsersIcon className="h-4 w-4" /> },
  { href: "/kind",   label: "種類", icon: <TagIcon className="h-4 w-4" /> },
  { href: "/report", label: "報告", icon: <FileTextIcon className="h-4 w-4" /> },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r bg-muted/20 flex flex-col">
        <div className="flex items-center gap-2 px-5 py-5 border-b font-bold text-lg">
          <BotIcon className="h-5 w-5 text-primary" />
          報告汪
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>
        <Suspense fallback={<div className="px-4 py-4 border-t"><div className="h-8 rounded bg-muted animate-pulse" /></div>}>
          <SidebarUser />
        </Suspense>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <Suspense fallback={<div className="p-8"><div className="h-8 w-48 rounded bg-muted animate-pulse" /></div>}>
          {children}
        </Suspense>
      </main>
    </div>
  );
}
