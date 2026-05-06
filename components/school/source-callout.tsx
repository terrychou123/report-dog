import { cn } from "@/lib/utils";
import type { EvaluationProfileMeta } from "@/lib/ai/evaluation-profiles/index";

interface SourceCalloutProps {
  meta: EvaluationProfileMeta;
  variant?: "inline" | "block";
  className?: string;
}

export function SourceCallout({
  meta,
  variant = "inline",
  className,
}: SourceCalloutProps) {
  const text = [
    `資料來源：${meta.agency}`,
    `${meta.year} 年度${meta.facilityName}評鑑基準`,
    meta.publishedDate ? `（公告日：${meta.publishedDate}）` : null,
  ]
    .filter(Boolean)
    .join(" ");

  if (variant === "block") {
    return (
      <div
        className={cn(
          "not-prose rounded-lg border bg-muted/40 p-3 mt-6",
          className
        )}
      >
        <p className="text-xs text-muted-foreground">{text}</p>
        {meta.sourceUrl && (
          <a
            href={meta.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary underline-offset-4 hover:underline mt-0.5 block"
          >
            查看官方公告 ↗
          </a>
        )}
      </div>
    );
  }

  return (
    <p className={cn("text-xs text-muted-foreground mt-1", className)}>
      {text}
      {meta.sourceUrl && (
        <>
          {" "}
          <a
            href={meta.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline-offset-4 hover:underline"
          >
            官方公告 ↗
          </a>
        </>
      )}
    </p>
  );
}
