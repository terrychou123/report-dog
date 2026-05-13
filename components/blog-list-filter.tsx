"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface SerializedBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  // server 端已驗證：null 表示無封面圖或 URL 無效
  coverImageUrl: string | null;
  category: string | null;
  tags: string[] | null;
  publishedAt: string | null;
}

interface BlogListFilterProps {
  posts: SerializedBlogPost[];
  categories: string[];
}

const PAGE_SIZE = 11;

function buildPageUrl(currentParams: URLSearchParams, page: number): string {
  const params = new URLSearchParams(currentParams.toString());
  if (page <= 1) {
    params.delete("page");
  } else {
    params.set("page", String(page));
  }
  const qs = params.toString();
  return qs ? `/blog?${qs}` : "/blog";
}

function buildPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages: (number | "...")[] = [1];
  if (current > 3) pages.push("...");
  for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) {
    pages.push(p);
  }
  if (current < total - 2) pages.push("...");
  pages.push(total);
  return pages;
}

export function BlogListFilter({ posts, categories }: BlogListFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 直接從 URL 讀取，確保瀏覽器上一頁/下一頁時 UI 與 URL 同步
  const activeCategory = searchParams.get("category");
  const currentPage = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);

  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    let result = posts;
    if (activeCategory) {
      result = result.filter((p) => p.category === activeCategory);
    }
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          (p.excerpt?.toLowerCase().includes(q) ?? false) ||
          (p.tags?.some((tag) => tag.toLowerCase().includes(q)) ?? false)
      );
    }
    return result;
  }, [posts, activeCategory, searchQuery]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const safePage = Math.min(currentPage, Math.max(1, totalPages));
  const pageStart = (safePage - 1) * PAGE_SIZE;
  const paginatedPosts = filtered.slice(pageStart, pageStart + PAGE_SIZE);

  function handleCategoryChange(cat: string | null) {
    const params = new URLSearchParams();
    if (cat) params.set("category", cat);
    const qs = params.toString();
    router.push(qs ? `/blog?${qs}` : "/blog", { scroll: false });
  }

  function handleSearchChange(value: string) {
    setSearchQuery(value);
    if (currentPage !== 1) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("page");
      const qs = params.toString();
      router.push(qs ? `/blog?${qs}` : "/blog", { scroll: false });
    }
  }

  const isFiltering = !!searchQuery.trim() || !!activeCategory;
  const featuredPost = paginatedPosts[0];
  const remainingPosts = paginatedPosts.slice(1);

  return (
    <div className="group/posts">
      {categories.length > 0 && (
        <div className="border-b pb-6 mb-12 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              type="search"
              placeholder="搜尋文章標題或摘要..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange(null)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm border transition-colors",
                !activeCategory
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border hover:bg-accent"
              )}
            >
              全部
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm border transition-colors",
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border hover:bg-accent"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {isFiltering && (
            <p className="text-sm text-muted-foreground">
              找到 {filtered.length} 篇文章
            </p>
          )}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          {isFiltering
            ? "找不到符合條件的文章，請調整搜尋或篩選條件"
            : "目前沒有文章"}
        </div>
      ) : (
        <>
          {featuredPost && (
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="rounded-xl overflow-hidden border mb-14 transition-opacity duration-300 group-hover/posts:opacity-50 hover:!opacity-100 block"
            >
              <div className="relative aspect-[1200/630] bg-muted">
                {featuredPost.coverImageUrl ? (
                  <Image
                    src={featuredPost.coverImageUrl}
                    alt={featuredPost.title}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm bg-muted">
                    報告汪
                  </div>
                )}
              </div>

              <div className="p-8 md:p-12 flex flex-col justify-center">
                {featuredPost.category && (
                  <span className="text-primary text-sm font-medium mb-4 block">
                    {featuredPost.category}
                  </span>
                )}
                <h2 className="text-3xl font-bold tracking-tight leading-tight mb-4">
                  {featuredPost.title}
                </h2>
                {featuredPost.excerpt && (
                  <p className="text-muted-foreground leading-relaxed line-clamp-4 mb-4">
                    {featuredPost.excerpt}
                  </p>
                )}
                {featuredPost.tags && featuredPost.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {featuredPost.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs font-normal">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                {featuredPost.publishedAt && (
                  <time
                    dateTime={featuredPost.publishedAt}
                    className="text-sm text-muted-foreground"
                  >
                    {new Date(featuredPost.publishedAt).toLocaleDateString("zh-TW", { timeZone: "Asia/Taipei" })}
                  </time>
                )}
              </div>
            </Link>
          )}

          {remainingPosts.length > 0 && (
            <div className="grid md:grid-cols-2 gap-10">
              {remainingPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group/card transition-opacity duration-300 group-hover/posts:opacity-50 hover:!opacity-100 block"
                >
                  <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-muted mb-4">
                    {post.coverImageUrl ? (
                      <Image
                        src={post.coverImageUrl}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover/card:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
                        報告汪
                      </div>
                    )}
                  </div>

                  <div>
                    {post.category && (
                      <span className="text-primary text-xs font-medium mb-2 block">
                        {post.category}
                      </span>
                    )}
                    <h3 className="text-xl font-semibold leading-snug line-clamp-2 mb-2 group-hover/card:text-primary transition-colors">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {post.excerpt}
                      </p>
                    )}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs font-normal">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    {post.publishedAt && (
                      <time
                        dateTime={post.publishedAt}
                        className="text-xs text-muted-foreground"
                      >
                        {new Date(post.publishedAt).toLocaleDateString("zh-TW", { timeZone: "Asia/Taipei" })}
                      </time>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-16">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href={buildPageUrl(searchParams, safePage - 1)}
                      aria-disabled={safePage <= 1}
                      className={cn(safePage <= 1 && "pointer-events-none opacity-50")}
                    />
                  </PaginationItem>

                  {buildPageNumbers(safePage, totalPages).map((p, i) =>
                    p === "..." ? (
                      <PaginationItem key={`ellipsis-${i}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    ) : (
                      <PaginationItem key={p}>
                        <PaginationLink
                          href={buildPageUrl(searchParams, p)}
                          isActive={p === safePage}
                        >
                          {p}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}

                  <PaginationItem>
                    <PaginationNext
                      href={buildPageUrl(searchParams, safePage + 1)}
                      aria-disabled={safePage >= totalPages}
                      className={cn(safePage >= totalPages && "pointer-events-none opacity-50")}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
              <p className="text-center text-sm text-muted-foreground mt-3">
                第 {safePage} / {totalPages} 頁，共 {filtered.length} 篇文章
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
