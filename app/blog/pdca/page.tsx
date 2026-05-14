import { Suspense } from "react";
import Link from "next/link";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import type { Metadata } from "next";
import { BlogListFilter } from "@/components/blog-list-filter";
import { breadcrumbListJsonLd, faqPageJsonLd, mergeJsonLdGraph } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "護理 PDCA 範例與寫法 — 8 篇實戰教學 | 報告汪",
  description:
    "護理 PDCA 怎麼寫？Plan 設定可量化目標、Do 執行照護 SOP、Check 評值指標、Act 追蹤改善。8 篇實戰教學涵蓋日照、護理之家、居家護理、醫院等機構，附護理 PDCA 報告範例與 4 步驟模板，直接套用於評鑑文件。",
  openGraph: {
    type: "website",
    title: "護理 PDCA 範例與寫法 — 8 篇實戰教學 | 報告汪",
    description: "護理 PDCA 怎麼寫？8 篇實戰教學含報告範例與 4 步驟模板，涵蓋日照、護理之家、居家護理、醫院等機構。",
  },
  twitter: {
    card: "summary_large_image",
    title: "護理 PDCA 範例與寫法 — 8 篇實戰教學 | 報告汪",
    description: "護理 PDCA 怎麼寫？8 篇實戰教學含報告範例與 4 步驟模板。",
  },
  alternates: {
    canonical: "https://reportwang.com/blog/pdca",
  },
};

const FAQ_ITEMS = [
  {
    question: "護理 PDCA 範例怎麼寫？",
    answer: "護理 PDCA 範例的寫法分四步：Plan（設定可量化護理目標，如「降低跌倒率 20%」）、Do（執行照護 SOP 與介入措施）、Check（定期查核指標達成率，對比基準值）、Act（記錄改善行動並更新下一循環目標）。評鑑委員看的是數字有無前後對比、改善行動有無追蹤依據。",
  },
  {
    question: "PDCA 4 個步驟在護理紀錄上分別代表什麼？",
    answer: "Plan：訂定護理問題與可量化目標（如 SMART 目標）；Do：記錄照護執行內容與頻率；Check：呈現指標數據與前次基準比較（建議製表）；Act：說明因 Check 結果而採取的修正行動，並帶入下一循環的新目標。",
  },
  {
    question: "護理 PDCA 與 SOAP 差別在哪裡？",
    answer: "SOAP（Subjective/Objective/Assessment/Plan）主要用於「個案」護理紀錄，聚焦單次照護評估。PDCA 則用於「機構品質改善」循環，針對一段時間內的照護品質指標做計畫→執行→查核→改善，是評鑑委員檢視機構是否有持續改善文化的依據。",
  },
  {
    question: "各機構類型的護理 PDCA 有何不同？",
    answer: "重點指標因機構而異：居家護理所側重「非預期再住院率」「壓傷發生率」；日照中心側重「跌倒率」「服藥正確率」；護理之家側重「吸入性肺炎率」「身體約束率」；醫院則依科別不同有更細分的品質指標。各機構的 PDCA 基準條號也不同，建議搭配對應的評鑑小教室查閱。",
  },
  {
    question: "護理 PDCA 報告範例去哪找？",
    answer: "報告汪整理了 8 篇針對不同機構類型的 PDCA 實戰教學，涵蓋居家護理所、住宿型長照機構、日照中心、醫院、托嬰中心、產後護理之家、身心障礙機構等，每篇均附可直接套用的 PDCA 撰寫模板。詳見本頁下方文章列表。",
  },
  {
    question: "PDCA 在評鑑中是哪個項目？",
    answer: "各機構類型均有「品質指標監測」或「持續品質改善」相關評鑑條目，通常位於「經營管理」或「照護品質」章節。例如居家護理所評鑑 A5「品質指標監測」直接要求呈現 PDCA 循環紀錄。建議進入各機構的評鑑小教室查詢確切條號。",
  },
];

function isValidImageUrl(url: string | null): url is string {
  if (!url) return false;
  if (url.startsWith("/")) return true;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && !parsed.hostname.includes("localhost");
  } catch {
    return false;
  }
}

async function PdcaArticleList() {
  const allPosts = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.status, "published"))
    .orderBy(desc(blogPosts.publishedAt));

  // PDCA cluster：slug 含 pdca/continuous-improvement，或 tag 含 PDCA 相關詞
  const filtered = allPosts.filter(
    (p) =>
      /pdca|continuous.improvement/i.test(p.slug) ||
      p.tags?.some((t) => /pdca|品質改善|持續改善/i.test(t))
  );

  if (filtered.length === 0) return null;

  const serialized = filtered.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    coverImageUrl: isValidImageUrl(p.coverImageUrl) ? p.coverImageUrl : null,
    category: p.category,
    tags: p.tags,
    publishedAt: p.publishedAt?.toISOString() ?? null,
  }));

  return <BlogListFilter posts={serialized} categories={[]} />;
}

export default function BlogPdcaPage() {
  const breadcrumb = breadcrumbListJsonLd([
    { name: "首頁", url: "https://reportwang.com" },
    { name: "Blog", url: "https://reportwang.com/blog" },
    { name: "護理 PDCA 教學", url: "https://reportwang.com/blog/pdca" },
  ]);

  const faq = faqPageJsonLd(FAQ_ITEMS, "/blog/pdca");

  const structuredData = mergeJsonLdGraph(breadcrumb, faq);

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />

      <div className="max-w-6xl mx-auto px-4 pt-16 pb-20">

        {/* 標頭 */}
        <div className="mb-10">
          <nav className="text-sm text-muted-foreground mb-4 flex items-center gap-1.5">
            <Link href="/" className="hover:text-foreground transition-colors">首頁</Link>
            <span>›</span>
            <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
            <span>›</span>
            <span>護理 PDCA 教學</span>
          </nav>

          <h1 className="text-4xl font-bold tracking-tight mb-4">
            護理 PDCA 範例與寫法總覽
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-6">
            「護理 PDCA 怎麼寫？」是評鑑備戰最常見的問題。本專區彙整 8 篇實戰教學，
            涵蓋日照、護理之家、居家護理、醫院等主要機構類型，每篇附護理 PDCA 報告範例與 4 步驟模板。
          </p>

          <div className="flex flex-wrap gap-2 text-sm">
            <Link
              href="/school/home-nursing/quality-indicators"
              className="px-3 py-1 rounded-full bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
            >
              居家護理所評鑑品質指標
            </Link>
            <Link
              href="/school/nursing-home"
              className="px-3 py-1 rounded-full bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
            >
              住宿型長照機構評鑑小教室
            </Link>
            <Link
              href="/school/daycare"
              className="px-3 py-1 rounded-full bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
            >
              日照中心評鑑小教室
            </Link>
          </div>
        </div>

        {/* PDCA 文章列表 */}
        <Suspense fallback={<div className="py-20 text-center text-muted-foreground">載入中...</div>}>
          <PdcaArticleList />
        </Suspense>

        {/* FAQ 段落（靜態，搜尋引擎與 AI 直接讀） */}
        <section className="mt-16 border-t pt-12">
          <h2 className="text-2xl font-bold mb-8">護理 PDCA 常見問題</h2>
          <div className="space-y-8">
            {FAQ_ITEMS.map((item) => (
              <div key={item.question}>
                <h3 className="text-base font-semibold mb-2">{item.question}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
