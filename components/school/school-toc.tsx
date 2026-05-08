"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  text: string;
  number?: number | string;
}

function TocLink({
  item,
  active,
}: {
  item: TocItem;
  active: boolean;
}) {
  return (
    <li>
      <a
        href={`#${item.id}`}
        className="flex items-center gap-2 py-1 group"
      >
        {item.number !== undefined && (
          <span
            className={cn(
              "shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-mono transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary",
            )}
          >
            {item.number}
          </span>
        )}
        {item.number === undefined && (
          <span
            className={cn(
              "shrink-0 rounded-full transition-all duration-200",
              active
                ? "w-2.5 h-2.5 bg-primary"
                : "w-2 h-2 border-2 border-muted-foreground/40 bg-background group-hover:border-primary/60",
            )}
          />
        )}
        <span
          className={cn(
            "text-sm line-clamp-1 transition-colors",
            active
              ? "font-semibold text-foreground"
              : "text-muted-foreground group-hover:text-foreground",
          )}
        >
          {item.text}
        </span>
      </a>
    </li>
  );
}

interface SchoolTocProps {
  items: TocItem[];
  title?: string;
  columns?: 1 | 2;
  className?: string;
}

/**
 * 學校子頁目錄：帶 IntersectionObserver 的捲動追蹤 TOC。
 * items[].id 需對應頁面上的 DOM id（如 "item-1"、"section-A" 等）。
 */
export function SchoolToc({
  items,
  title = "本頁內容",
  columns = 2,
  className,
}: SchoolTocProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-80px 0px -60% 0px" },
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.map((i) => i.id).join(",")]);

  if (!items.length) return null;

  return (
    <nav
      aria-label="頁面目錄"
      className={cn(
        "not-prose mb-8 rounded-lg bg-muted/40 border p-4",
        className,
      )}
    >
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
        {title}
      </p>
      <ul
        className={cn(
          "grid gap-0.5",
          columns === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1",
        )}
      >
        {items.map((item) => (
          <TocLink key={item.id} item={item} active={activeId === item.id} />
        ))}
      </ul>
    </nav>
  );
}
