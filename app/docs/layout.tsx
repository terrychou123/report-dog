import { Navbar } from "@/components/navbar";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { DocsMobileNav } from "@/components/docs/docs-mobile-nav";
import { Footer } from "@/components/footer";
import { breadcrumbListJsonLd } from "@/lib/jsonld";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s｜報告汪教學",
    default: "使用教學｜報告汪",
  },
  description: "報告汪完整使用教學：從建立報告、AI 段落修改、標籤分類搜尋，到 AI 評鑑分析與版本歷史，一步步帶你上手。",
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const breadcrumb = breadcrumbListJsonLd([
    { name: "首頁", url: "https://reportwang.com" },
    { name: "使用教學", url: "https://reportwang.com/docs" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumb }} />
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex gap-0">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-56 shrink-0 border-r pr-6 py-10 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <DocsSidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 py-10 md:pl-10">
          {/* Mobile nav trigger */}
          <div className="flex items-center gap-3 mb-8 md:hidden">
            <DocsMobileNav />
            <span className="text-sm text-muted-foreground">教學目錄</span>
          </div>
          {children}
        </main>
      </div>

      <Footer />
    </>
  );
}
