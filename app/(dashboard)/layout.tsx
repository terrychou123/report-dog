import Link from "next/link";
import { Suspense } from "react";
import { BotIcon, TagIcon, FileTextIcon } from "lucide-react";
import { LogoutButton } from "@/components/logout-button";
import { TrialBanner } from "@/components/trial-banner";
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

async function MaybeTrialBanner() {
  const supabase = await createClient();
  await supabase.auth.getClaims(); // refresh session before getUser
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.is_anonymous) return null;
  return <TrialBanner />;
}

const navLinks = [
  { href: "/report", label: "報告", icon: <FileTextIcon className="h-4 w-4" /> },
  { href: "/tag", label: "標籤", icon: <TagIcon className="h-4 w-4" /> },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Suspense fallback={null}>
        <MaybeTrialBanner />
      </Suspense>
      <div className="flex flex-1">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r bg-muted/20 flex flex-col">
        <Link href="/" className="flex items-center gap-2 px-5 py-5 border-b font-bold text-lg hover:opacity-80 transition-opacity">
          <BotIcon className="h-5 w-5 text-primary" />
          報告汪
        </Link>
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
    </div>
  );
}
