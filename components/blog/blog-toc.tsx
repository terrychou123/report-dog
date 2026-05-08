"use client";

import { useEffect, useState } from "react";
import type { TocNode } from "@/lib/blog-html-postprocess";
import { cn } from "@/lib/utils";

/** 攤平 TocNode 樹為線性清單，保留 level 資訊供縮排 */
interface FlatItem {
  id: string;
  text: string;
  level: 2 | 3;
}

function flatten(toc: TocNode[]): FlatItem[] {
  const result: FlatItem[] = [];
  for (const node of toc) {
    result.push({ id: node.id, text: node.text, level: 2 });
    for (const child of node.children ?? []) {
      result.push({ id: child.id, text: child.text, level: 3 });
    }
  }
  return result;
}

/** 單一目錄項目：圓點 + 文字 */
function TocItem({
  id,
  text,
  level,
  active,
}: FlatItem & { active: boolean }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!id) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <li className={level === 3 ? "pl-5" : ""}>
      <a
        href={id ? `#${id}` : "#"}
        onClick={handleClick}
        className="flex items-center gap-3 py-1.5 group"
      >
        {/* 圓點：active = 實心 primary，inactive = 空心灰 */}
        <span
          className={cn(
            "shrink-0 rounded-full transition-all duration-200",
            active
              ? "w-3 h-3 bg-primary"
              : "w-2.5 h-2.5 border-2 border-muted-foreground/40 bg-background group-hover:border-primary/60",
          )}
        />
        {/* 文字 */}
        <span
          className={cn(
            "text-sm line-clamp-1 transition-colors duration-200",
            active
              ? "font-semibold text-foreground"
              : "text-muted-foreground group-hover:text-foreground",
          )}
        >
          {text}
        </span>
      </a>
    </li>
  );
}

/** Blog 文章目錄（Timeline 樣式，含 IntersectionObserver 章節高亮） */
export function BlogToc({ toc }: { toc: TocNode[] }) {
  // 初始 activeId 為 "" 代表「頁首」
  const [activeId, setActiveId] = useState<string>("");

  const items = flatten(toc);
  const itemKey = items.map((i) => i.id).join(",");

  // IntersectionObserver：heading 進入視窗頂部 25% 時設為 active
  useEffect(() => {
    if (!items.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-80px 0px -75% 0px" },
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemKey]);

  if (!items.length) return null;

  return (
    <nav aria-label="文章目錄" className="mb-10">
      {/* 標題 */}
      <p className="text-lg font-bold mb-3">文章目錄</p>
      <hr className="mb-4 border-border" />

      {/* Timeline 容器 */}
      <div className="relative pl-5">
        {/* 垂直引導線 */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />

        <ul className="space-y-0">
          {/* 固定第一項：頁首（捲回頂端） */}
          <TocItem id="" text="頁首" level={2} active={activeId === ""} />
          {items.map((item) => (
            <TocItem key={item.id} {...item} active={activeId === item.id} />
          ))}
        </ul>
      </div>
    </nav>
  );
}
