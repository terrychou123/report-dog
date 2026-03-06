"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { XIcon, SearchIcon } from "lucide-react";
import { useCallback, useRef } from "react";

export function ReportSearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = useCallback(
    (value: string) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) params.set("q", value);
        else params.delete("q");
        router.push(`/report?${params.toString()}`);
      }, 300);
    },
    [router, searchParams]
  );

  return (
    <div className="relative">
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      <Input
        defaultValue={q}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="搜尋標題、對象、種類..."
        className="pl-9 pr-8 w-64"
      />
      {q && (
        <button
          onClick={() => {
            router.push("/report");
          }}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <XIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
