import { cn } from "@/lib/utils";

interface DocsTipProps {
  variant?: "neutral" | "info" | "warning";
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const styles: Record<NonNullable<DocsTipProps["variant"]>, string> = {
  neutral: "bg-muted/40 border",
  info: "bg-primary/5 border border-primary/20",
  warning:
    "bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800",
};

const titleStyles: Record<NonNullable<DocsTipProps["variant"]>, string> = {
  neutral: "text-foreground",
  info: "text-foreground",
  warning: "text-amber-800 dark:text-amber-200",
};

const bodyStyles: Record<NonNullable<DocsTipProps["variant"]>, string> = {
  neutral: "text-muted-foreground",
  info: "text-muted-foreground",
  warning: "text-amber-700 dark:text-amber-300",
};

export function DocsTip({
  variant = "neutral",
  title,
  children,
  className,
}: DocsTipProps) {
  return (
    <div className={cn("not-prose rounded-lg p-4", styles[variant], className)}>
      {title && (
        <p className={cn("text-sm font-semibold mb-1.5", titleStyles[variant])}>
          {title}
        </p>
      )}
      <div className={cn("text-sm", bodyStyles[variant])}>{children}</div>
    </div>
  );
}
