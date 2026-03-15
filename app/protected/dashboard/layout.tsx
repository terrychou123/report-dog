import Link from 'next/link';
import { Suspense } from 'react';
import { AuthButton } from '@/components/auth-button';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { DashboardSidebarMobile } from '@/components/dashboard-sidebar';
import { FileText, Upload, LayoutDashboard } from 'lucide-react';

const navItems = [
  { href: '/protected/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/protected/dashboard/upload', icon: Upload, label: 'Upload Report' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row h-dvh overflow-hidden">
      {/* Mobile top bar (client component for hamburger sheet) */}
      <DashboardSidebarMobile />

      {/* Desktop sidebar (server component) */}
      <aside className="hidden md:flex w-56 shrink-0 border-r bg-muted/30 flex-col">
        <div className="px-5 py-4 border-b">
          <Link href="/protected/dashboard" className="flex items-center gap-2 font-semibold text-sm">
            <FileText className="h-5 w-5 text-primary" />
            ReportAI
          </Link>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="px-4 py-4 border-t space-y-2">
          <ThemeSwitcher />
          <Suspense>
            <AuthButton />
          </Suspense>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
