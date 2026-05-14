import { Navbar } from "@/components/navbar";
import { SchoolSidebar } from "@/components/school/school-sidebar";
import { SchoolMobileNav } from "@/components/school/school-mobile-nav";
import { SchoolBreadcrumb } from "@/components/school/school-breadcrumb";
import { InlineNewsletterCard } from "@/components/seo/inline-newsletter-card";
import { Footer } from "@/components/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s｜評鑑小教室｜報告汪",
    default: "評鑑小教室｜報告汪",
  },
  description: "長照機構評鑑準備教學：居家服務機構 32 項評鑑基準完整解說，幫助機構人員快速掌握評鑑重點，提升評鑑通過率。",
  authors: [{ name: "報告汪編輯部", url: "https://reportwang.com" }],
  // article 類型讓社群平台與 AI 引擎將評鑑教學內容識別為專業文章
  openGraph: {
    type: "article",
    authors: ["https://reportwang.com"],
    section: "長照機構評鑑",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function SchoolLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex gap-0">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-56 shrink-0 border-r pr-6 py-10 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <SchoolSidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 py-10 md:pl-10">
          {/* Mobile nav trigger */}
          <div className="flex items-center gap-3 mb-6 md:hidden">
            <SchoolMobileNav />
            <span className="text-sm text-muted-foreground">評鑑小教室目錄</span>
          </div>
          {/* 動態麵包屑（含 BreadcrumbList JSON-LD） */}
          <SchoolBreadcrumb />
          {children}
          <InlineNewsletterCard source="school" />
        </main>
      </div>

      <Footer />
    </>
  );
}
