import { Suspense } from "react";
import { CollapsibleSidebar } from "@/components/collapsible-sidebar";
import { TrialBanner } from "@/components/trial-banner";
import { Navbar } from "@/components/navbar";
import { createClient } from "@/lib/supabase/server";
import { IdentifyUser } from "@/components/analytics/identify-user";

async function MaybeTrialBanner() {
  const supabase = await createClient();
  await supabase.auth.getClaims(); // refresh session before getUser
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.is_anonymous) return null;
  return <TrialBanner />;
}

async function MaybeIdentifyUser() {
  const supabase = await createClient();
  await supabase.auth.getClaims();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.id || user.is_anonymous) return null;
  return <IdentifyUser userId={user.id} />;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Suspense fallback={null}>
        <MaybeTrialBanner />
      </Suspense>
      <Suspense fallback={null}>
        <MaybeIdentifyUser />
      </Suspense>
      <div className="flex flex-1 overflow-hidden">
        <CollapsibleSidebar />
        <main className="flex-1 overflow-auto">
          <Suspense fallback={<div className="p-8"><div className="h-8 w-48 rounded bg-muted animate-pulse" /></div>}>
            {children}
          </Suspense>
        </main>
      </div>
    </div>
  );
}
