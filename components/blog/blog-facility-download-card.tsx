"use client";

import { DOWNLOADS } from "@/lib/downloads/catalog";
import { DownloadGateDialog } from "@/components/downloads/download-gate-dialog";
import { FileSpreadsheetIcon } from "lucide-react";

interface BlogFacilityDownloadCardProps {
  catalogSlug: string | null;
}

export function BlogFacilityDownloadCard({ catalogSlug }: BlogFacilityDownloadCardProps) {
  if (!catalogSlug) return null;
  const file = DOWNLOADS.find((d) => d.slug === catalogSlug);
  if (!file) return null;

  return (
    <div className="mt-6 rounded-lg border bg-card p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <FileSpreadsheetIcon className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm">{file.name} 自評表</p>
          <p className="mt-1 text-xs text-muted-foreground">{file.description}</p>
          <div className="mt-3">
            <DownloadGateDialog
              file={file}
              trigger={
                <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors px-4 py-2 rounded-lg font-medium text-sm">
                  <FileSpreadsheetIcon className="h-4 w-4" />
                  下載 {file.name} Excel
                </button>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
