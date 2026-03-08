"use client";

import { CopyIcon } from "lucide-react";
import { useState } from "react";

export function CopyReportButton({
  reportId,
  title,
  onCopied,
}: {
  reportId: string;
  title: string;
  onCopied?: () => void;
}) {
  const [copying, setCopying] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (copying) return;
    setCopying(true);
    try {
      const [reportRes, tagsRes] = await Promise.all([
        fetch(`/api/reports/${reportId}`),
        fetch(`/api/tag-reports?reportId=${reportId}`),
      ]);
      const report = await reportRes.json();
      const tags: { clientId: string }[] = tagsRes.ok ? await tagsRes.json() : [];

      const newReportRes = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: `${title} 複製`,
          content: report.content,
          fileType: report.fileType,
          insertAtTop: true,
        }),
      });
      const newReport = await newReportRes.json();

      if (tags.length > 0) {
        await Promise.all(
          tags.map((t) =>
            fetch("/api/tag-reports", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ clientId: t.clientId, reportId: newReport.id }),
            })
          )
        );
      }

      onCopied?.();
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
