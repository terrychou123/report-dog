"use client";

import { CopyIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function CopyReportButton({
  reportId,
  onCopied,
}: {
  reportId: string;
  onCopied?: () => void;
}) {
  const [copying, setCopying] = useState(false);
  const router = useRouter();

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (copying) return;
    setCopying(true);
    try {
      const res = await fetch(`/api/reports/${reportId}/copy`, { method: "POST" });
      if (!res.ok) {
        toast.error("複製失敗，請重試");
        return;
      }
      toast.success("報告已複製");
      window.dispatchEvent(new CustomEvent("reports-updated"));
      onCopied?.();
      if (!onCopied) router.refresh();
    } finally {
      setCopying(false);
    }
  };

  return (
    <button
      onClick={handleCopy}
      disabled={copying}
      className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
      title="複製報告"
    >
      <CopyIcon className="h-3.5 w-3.5" />
    </button>
  );
}
