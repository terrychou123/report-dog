import { ArrowRightIcon } from "lucide-react";
import { TrackedCtaLink } from "@/components/tracked-cta-link";

export function BlogInlineTrialCard({ slug }: { slug: string }) {
  return (
    <aside className="my-12 rounded-xl border-2 border-accent/40 bg-accent/5 p-6 md:p-8 text-center">
      <p className="text-lg font-bold mb-2">AI 幫你寫評鑑文書</p>
      <p className="text-sm text-muted-foreground mb-5">
        日誌、護理紀錄、PDCA、SOAP 一鍵生成，省下 50% 備評時間。
      </p>
      <TrackedCtaLink
        href={`/auth/sign-up?source=blog-mid&slug=${encodeURIComponent(slug)}`}
        source="blog-mid-trial"
        className="inline-flex items-center justify-center gap-1.5 rounded-full bg-accent text-accent-foreground px-6 py-2.5 font-medium hover:bg-accent/90 transition-colors"
      >
        免費試用 14 天
        <ArrowRightIcon className="h-4 w-4" />
      </TrackedCtaLink>
    </aside>
  );
}
