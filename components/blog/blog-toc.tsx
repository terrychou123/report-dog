// Blog 目錄元件（伺服器元件，使用原生 <details> 無需 JS）
import type { TocNode } from "@/lib/blog-html-postprocess";

export function BlogToc({ toc }: { toc: TocNode[] }) {
  if (!toc.length) return null;

  // 計算總節數（h2 + h3）
  const totalSections = toc.reduce(
    (sum, node) => sum + 1 + (node.children?.length ?? 0),
    0,
  );

  return (
    <details
      open
      className="mb-10 rounded-xl border border-border bg-muted/30 text-sm group"
    >
      {/* 點擊區 */}
      <summary className="flex cursor-pointer select-none list-none items-center gap-2 px-5 py-3.5 font-medium hover:bg-muted/50 transition-colors rounded-xl [&::-webkit-details-marker]:hidden">
        {/* 折疊指示箭頭 */}
        <svg
          className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-90"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <span>目錄</span>
        <span className="ml-auto text-xs text-muted-foreground font-normal">
          {totalSections} 個章節
        </span>
      </summary>

      {/* TOC 連結列表 */}
      <ul className="px-5 pb-4 pt-1 space-y-1">
        {toc.map((node) => (
          <li key={node.id}>
            <a
              href={`#${node.id}`}
              className="block overflow-hidden py-0.5 text-muted-foreground hover:text-foreground transition-colors line-clamp-1"
            >
              {node.text}
            </a>
            {/* h3 子節點 */}
            {node.children && node.children.length > 0 && (
              <ul className="mt-1 space-y-1">
                {node.children.map((child) => (
                  <li key={child.id}>
                    <a
                      href={`#${child.id}`}
                      className="block overflow-hidden py-0.5 pl-5 text-muted-foreground hover:text-foreground transition-colors line-clamp-1 border-l border-border/50"
                    >
                      {child.text}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </details>
  );
}
