import { Navbar } from "@/components/navbar";
import { SchoolSidebar } from "@/components/school/school-sidebar";
import { SchoolMobileNav } from "@/components/school/school-mobile-nav";
import { Footer } from "@/components/footer";
import { breadcrumbListJsonLd } from "@/lib/jsonld";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s｜評鑑小教室｜報告汪",
    default: "評鑑小教室｜報告汪",
  },
  description: "長照機構評鑑準備教學：居家服務機構 32 項評鑑基準完整解說，幫助機構人員快速掌握評鑑重點，提升評鑑通過率。",
};

export default function SchoolLayout({ children }: { children: React.ReactNode }) {
  const breadcrumb = breadcrumbListJsonLd([
    { name: "首頁", url: "https://reportwang.com" },
    { name: "評鑑小教室", url: "https://reportwang.com/school" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumb }} />
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex gap-0">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-56 shrink-0 border-r pr-6 py-10 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <SchoolSidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 py-10 md:pl-10">
          {/* Mobile nav trigger */}
          <div className="flex items-center gap-3 mb-8 md:hidden">
            <SchoolMobileNav />
            <span className="text-sm text-muted-foreground">評鑑小教室目錄</span>
          </div>
          {children}
        </main>
      </div>

      <Footer />
    </>
  );
}
