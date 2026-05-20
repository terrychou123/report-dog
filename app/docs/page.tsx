import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { docsNavSections } from "@/lib/docs-nav";

export const metadata: Metadata = {
  title: "使用教學",
  description: "報告汪完整使用教學：從建立第一份報告到 AI 評鑑分析，圖文步驟帶你快速掌握每個功能。",
  alternates: { canonical: "/docs" },
  openGraph: {
    title: "使用教學｜報告汪",
    description: "長照機構 AI 文書管理系統完整教學，從入門到進階一頁看懂。",
    url: "https://reportwang.com/docs",
  },
};

const allDocsItems = docsNavSections.flatMap((s) => s.items);

export default function DocsPage() {
  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "報告汪使用教學",
            url: "https://reportwang.com/docs",
            itemListElement: allDocsItems.map((item, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: item.label,
              description: item.desc,
              url: `https://reportwang.com${item.href}`,
            })),
          }),
        }}
      />

      <Badge variant="outline" className="mb-4">使用教學</Badge>
      <h1 className="text-3xl md:text-4xl font-bold mb-4">報告汪使用教學</h1>
      <div className="space-y-3 text-muted-foreground text-lg mb-10 max-w-2xl">
        <p>
          報告汪是專為長照機構設計的 AI 文書管理系統。這份教學帶你從零開始，掌握每個功能，大幅減少行政文書時間。
        </p>
        <p>
          不論你是剛開始試用的居服督導、正在準備評鑑的護理長，或是需要管理多個個案報告的社工師，都能在這裡找到對應的操作指南。每篇教學附有截圖說明，10 分鐘內即可上手。
        </p>
        <p>
          若你正在準備機構評鑑，也可搭配{" "}
          <a href="/school" className="text-primary underline underline-offset-4">評鑑小教室</a>{" "}
          與{" "}
          <a href="/docs/import-templates" className="text-primary underline underline-offset-4">一鍵匯入評鑑範本教學</a>
          {" "}一起使用，效率更高。
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {allDocsItems.map(({ href, icon: Icon, label, desc }) => (
          <Link key={href} href={href}>
            <Card className="p-5 h-full hover:border-primary/50 hover:shadow-sm transition-all group">
              <div className="flex items-start gap-4">
                {Icon && (
                  <div className="p-2 rounded-md bg-primary/10 shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                )}
                <div>
                  <h2 className="font-semibold text-sm group-hover:text-primary transition-colors">{label}</h2>
                  <p className="text-muted-foreground text-sm mt-1">{desc}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="rounded-lg bg-primary/5 border border-primary/20 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <p className="font-semibold">初次使用報告汪？</p>
          <p className="text-muted-foreground text-sm mt-1">從快速開始教學開始，10 分鐘內完成第一份報告。</p>
        </div>
        <Link
          href="/docs/getting-started"
          className="shrink-0 rounded-md bg-primary text-primary-foreground px-5 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          從這裡開始 →
        </Link>
      </div>
    </article>
  );
}
