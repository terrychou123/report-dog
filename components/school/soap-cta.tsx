import Link from "next/link";
import { SparklesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const facilityInfo: Record<
  string,
  { name: string; blogHref: string }
> = {
  "home-nursing": {
    name: "居家護理所",
    blogHref: "/blog/home-nursing-soap-b2-evaluation-records",
  },
  "general-nursing-home": {
    name: "一般護理之家",
    blogHref: "/blog/general-nursing-home-soap-b1-care-plan",
  },
  "nursing-home": {
    name: "住宿型長照機構",
    blogHref: "/blog/nursing-home-soap-b2-interprofessional-records",
  },
  "psychiatric-nursing-home": {
    name: "精神護理之家",
    blogHref: "/blog/psychiatric-nursing-home-soap-dar-records",
  },
  hospital: {
    name: "醫院",
    blogHref: "/blog/hospital-soap-interprofessional-care-plan",
  },
  "home-care": {
    name: "居家服務",
    blogHref: "/blog/home-care-simplified-soap-service-records",
  },
  "disability-welfare": {
    name: "身心障礙福利機構",
    blogHref: "/blog/disability-welfare-soap-case-records-2026",
  },
};

interface SoapCtaProps {
  facility: keyof typeof facilityInfo;
}

export function SoapCta({ facility }: SoapCtaProps) {
  const info = facilityInfo[facility];
  if (!info) return null;

  return (
    <div className="mt-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
      <div className="flex gap-3">
        <div className="shrink-0 mt-0.5">
          <SparklesIcon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-amber-800 dark:text-amber-200 mb-1">
            加速撰寫：用 SOAP 一鍵改寫
          </p>
          <p className="text-sm text-amber-700 dark:text-amber-300 mb-3">
            這個項目可用 SOAP 結構撰寫。在報告汪 AI 修改助手勾選「SOAP」，AI 會自動將紀錄改寫為主觀（S）／客觀（O）／評估（A）／計畫（P）四段式，省下手動拆解的時間。
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button asChild size="sm" variant="accent">
              <Link href="/docs/soap-writing">看 SOAP 一鍵套用教學</Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link href={info.blogHref}>看 {info.name} SOAP 範例</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
