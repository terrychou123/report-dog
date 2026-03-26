import { Navbar } from "@/components/navbar";
import { AdminSidebar } from "@/components/admin-sidebar";
import { requireAdmin } from "@/lib/admin";
import { Suspense } from "react";

async function AdminGuard() {
  await requireAdmin();
  return null;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Suspense fallback={null}>
        <AdminGuard />
      </Suspense>
      <div className="flex flex-1 overflow-hidden">
        <Suspense fallback={<div className="w-14 shrink-0 border-r bg-muted/20" />}>
          <AdminSidebar />
        </Suspense>
        <main className="flex-1 overflow-auto">
          <Suspense fallback={<div className="p-8"><div className="h-8 w-48 rounded bg-muted animate-pulse" /></div>}>
            {children}
          </Suspense>
        </main>
      </div>
    </div>
  );
}
