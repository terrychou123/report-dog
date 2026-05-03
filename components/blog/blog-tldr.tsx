// Blog TL;DR 摘要卡片（伺服器元件）
// 取代原有的斜體 blockquote，提升行動裝置的掃讀體驗
import { SparklesIcon } from "lucide-react";

export function BlogTldr({ text }: { text: string }) {
  if (!text?.trim()) return null;

  return (
    <div className="mb-10 flex gap-4 rounded-xl border border-primary/20 bg-primary/5 p-5">
      <SparklesIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
      <div>
        <p className="mb-1.5 text-sm font-semibold text-primary">TL;DR</p>
        <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}
