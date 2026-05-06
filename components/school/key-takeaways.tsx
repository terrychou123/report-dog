import { cn } from "@/lib/utils";

interface KeyTakeawaysItem {
  label: string;
  value: string;
}

interface KeyTakeawaysProps {
  title?: string;
  items: KeyTakeawaysItem[];
  className?: string;
}

export function KeyTakeaways({
  title = "本頁快速摘要",
  items,
  className,
}: KeyTakeawaysProps) {
  if (!items.length) return null;
  return (
    <div
      className={cn(
        "not-prose rounded-lg border bg-primary/5 border-primary/20 p-4 my-4",
        className
      )}
    >
      <p className="text-sm font-semibold text-foreground mb-2">{title}</p>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
        {items.map(({ label, value }, i) => (
          <div key={`${i}-${label}`} className="flex gap-1.5 text-sm">
            <dt className="text-muted-foreground shrink-0">{label}：</dt>
            <dd className="text-foreground font-medium">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
