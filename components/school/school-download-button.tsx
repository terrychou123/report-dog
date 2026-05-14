"use client";

import { DownloadIcon } from "lucide-react";
import { DOWNLOADS } from "@/lib/downloads/catalog";
import { DownloadGateDialog } from "@/components/downloads/download-gate-dialog";
import { Button } from "@/components/ui/button";

interface SchoolDownloadButtonProps {
  catalogSlug: string;
  /** "link"（預設）= 文字連結樣式；"outline" = Button outline 樣式 */
  variant?: "link" | "outline";
  label?: string;
}

/** 學校頁下載按鈕 — 走 DownloadGateDialog 收集 email，不直連靜態檔 */
export function SchoolDownloadButton({
  catalogSlug,
  variant = "link",
  label,
}: SchoolDownloadButtonProps) {
  const file = DOWNLOADS.find((d) => d.slug === catalogSlug);
  if (!file) return null;

  const trigger =
    variant === "outline" ? (
      <Button variant="outline" size="sm">
        <DownloadIcon className="h-3.5 w-3.5 mr-1.5" />
        {label ?? "下載 Excel 檢核表"}
      </Button>
    ) : (
      <button className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
        <DownloadIcon className="h-4 w-4" />
        {label ?? "免費下載 Excel 檢查表 →"}
      </button>
    );

  return <DownloadGateDialog file={file} trigger={trigger} />;
}
