"use client";

import { useState } from "react";
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
  // 伺服器已按條件查詢、分頁切好的文章（最多 11 筆）
  posts: SerializedBlogPost[];
  categories: string[];
  // 目前生效的 URL 參數（由 server 解析後傳入，確保初始態與 URL 同步）
  // 設為 optional：/blog 以外的頁面（category / tag / pdca）不使用分頁，可省略
  activeCategory?: string | null;
  initialQuery?: string;
  currentPage?: number;
  totalPages?: number;
  totalCount?: number;
}

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

export function BlogListFilter({
  posts,
  categories,
  activeCategory = null,
  initialQuery = "",
  currentPage = 1,
  totalPages = 1,
  totalCount = posts.length,
}: BlogListFilterProps) {
  const router = useRouter();
  // useSearchParams 保留給 buildPageUrl 使用（保留 category/q 的同時只切換 page）
  const searchParams = useSearchParams();

  // 本地輸入框狀態：初始化自 initialQuery prop（Suspense key 變化時元件重新掛載，自動同步）
  // 只有送出 form 才觸發伺服器查詢，避免逐字打字時每次往返 DB
  const [searchInput, setSearchInput] = useState(initialQuery);

  // 目前是否有主動篩選（category 或 q 有值）
  const isFiltering = !!activeCategory || !!initialQuery;

  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  function handleCategoryChange(cat: string | null) {
    const params = new URLSearchParams();
    if (cat) params.set("category", cat);
    // 切換分類時保留搜尋詞（如有）
    const currentQ = searchParams.get("q");
    if (currentQ) params.set("q", currentQ);
    const qs = params.toString();
    router.push(qs ? `/blog?${qs}` : "/blog", { scroll: false });
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    // 保留目前分類（如有）
    const currentCategory = searchParams.get("category");
    if (currentCategory) params.set("category", currentCategory);
    const trimmed = searchInput.trim();
    if (trimmed) params.set("q", trimmed);
    const qs = params.toString();
    router.push(qs ? `/blog?${qs}` : "/blog", { scroll: false });
  }

  return (
    <div className="group/posts">
      {categories.length > 0 && (
        <div className="border-b pb-6 mb-12 space-y-4">
          {/* 搜尋框：送出 form 才導航，不逐字打字觸發查詢 */}
          <form onSubmit={handleSearchSubmit} className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              type="search"
              placeholder="搜尋文章標題或摘要..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-10"
            />
          </form>

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
              找到 {totalCount} 篇文章
            </p>
          )}
        </div>
      )}

      {posts.length === 0 ? (
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
                      href={buildPageUrl(searchParams, currentPage - 1)}
                      aria-disabled={currentPage <= 1}
                      className={cn(currentPage <= 1 && "pointer-events-none opacity-50")}
                    />
                  </PaginationItem>

                  {buildPageNumbers(currentPage, totalPages).map((p, i) =>
                    p === "..." ? (
                      <PaginationItem key={`ellipsis-${i}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    ) : (
                      <PaginationItem key={p}>
                        <PaginationLink
                          href={buildPageUrl(searchParams, p)}
                          isActive={p === currentPage}
                        >
                          {p}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}

                  <PaginationItem>
                    <PaginationNext
                      href={buildPageUrl(searchParams, currentPage + 1)}
                      aria-disabled={currentPage >= totalPages}
                      className={cn(currentPage >= totalPages && "pointer-events-none opacity-50")}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
              <p className="text-center text-sm text-muted-foreground mt-3">
                第 {currentPage} / {totalPages} 頁，共 {totalCount} 篇文章
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
