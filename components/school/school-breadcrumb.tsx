"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRightIcon, CalendarIcon } from "lucide-react";
import { schoolNavSections } from "@/lib/school-nav";
import { getSchoolReviewDate, getSchoolReviewer } from "@/lib/school-review-dates";

type Crumb = { label: string; href: string };

// 路徑對照表（module-level，僅算一次）
const pathMeta = new Map<string, { label: string; parentHref: string; parentLabel: string }>();

for (const section of schoolNavSections) {
  const [overview, ...subs] = section.items;
  pathMeta.set(overview.href, {
    label: section.group,
    parentHref: "/school",
    parentLabel: "評鑑小教室",
  });
  for (const sub of subs) {
    pathMeta.set(sub.href, {
      label: sub.label,
      parentHref: overview.href,
      parentLabel: section.group,
    });
  }
}

const BASE = "https://reportwang.com";

function buildCrumbs(pathname: string): Crumb[] {
  const base: Crumb[] = [
    { label: "首頁", href: "/" },
    { label: "評鑑小教室", href: "/school" },
  ];

  if (pathname === "/school") return base;

  const meta = pathMeta.get(pathname);
  if (meta) {
    if (meta.parentHref !== "/school") {
      base.push({ label: meta.parentLabel, href: meta.parentHref });
    }
    base.push({ label: meta.label, href: pathname });
    return base;
  }

  // fallback：從路徑段落推斷機構層
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length >= 2) {
    const facilityHref = `/${segments[0]}/${segments[1]}`;
    const facilityMeta = pathMeta.get(facilityHref);
    if (facilityMeta) base.push({ label: facilityMeta.label, href: facilityHref });
  }

  return base;
}

function breadcrumbJsonLd(crumbs: Crumb[]): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: `${BASE}${c.href}`,
    })),
  });
}

export function SchoolBreadcrumb() {
  const pathname = usePathname();
  const crumbs = buildCrumbs(pathname);
  const reviewDate = getSchoolReviewDate(pathname);
  const reviewer = getSchoolReviewer(pathname);

  return (
    <>
      {/* 動態 BreadcrumbList JSON-LD（每頁皆產生完整層級） */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(crumbs) }}
      />
      {/* 視覺麵包屑 + E-E-A-T meta（3 層以上才顯示） */}
      {crumbs.length > 2 && (
        <div className="mb-5 space-y-1.5">
          {/* 麵包屑導覽列 */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <nav
              aria-label="breadcrumb"
              className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground"
            >
              {crumbs.map((crumb, i) => (
                <span key={crumb.href} className="flex items-center gap-1">
                  {i > 0 && (
                    <ChevronRightIcon className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50" />
                  )}
                  {i === crumbs.length - 1 ? (
                    <span className="font-medium text-foreground max-w-[200px] truncate">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="hover:text-foreground transition-colors whitespace-nowrap"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </span>
              ))}
            </nav>
            {reviewDate && (
              <time
                dateTime={reviewDate}
                className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap"
              >
                <CalendarIcon className="h-3 w-3" />
                最後更新 {reviewDate}
              </time>
            )}
          </div>
          {/* E-E-A-T 作者與資料來源 */}
          <p className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground/80">
            <span>撰文：報告汪編輯部</span>
            {reviewer && (
              <>
                <span className="text-muted-foreground/30">·</span>
                <a
                  href={reviewer.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-muted-foreground transition-colors"
                >
                  資料來源：{reviewer.name}
                </a>
              </>
            )}
          </p>
        </div>
      )}
    </>
  );
}
