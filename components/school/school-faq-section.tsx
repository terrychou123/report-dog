import { cn } from "@/lib/utils";

interface FaqItem {
  question: string;
  answer: string;
}

interface SchoolFaqSectionProps {
  items: FaqItem[];
  title?: string;
  className?: string;
}

export function SchoolFaqSection({
  items,
  title = "常見問題",
  className,
}: SchoolFaqSectionProps) {
  if (items.length === 0) return null;

  return (
    <section className={cn("not-prose mt-8", className)}>
      <h2 className="text-base font-semibold text-foreground mb-3">{title}</h2>
      <div className="space-y-2">
        {items.map(({ question, answer }, i) => (
          <details
            key={`${i}-${question}`}
            className="group rounded-lg border bg-muted/30 px-4 py-3 text-sm open:bg-muted/50 transition-colors"
          >
            <summary className="cursor-pointer font-medium text-foreground list-none flex items-center justify-between gap-2 select-none">
              {question}
              <span className="shrink-0 text-muted-foreground group-open:rotate-180 transition-transform text-base leading-none">
                ▾
              </span>
            </summary>
            <p className="mt-2 text-muted-foreground leading-relaxed">{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
