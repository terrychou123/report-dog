"use client";

import { useState } from "react";
import { UpgradeTrialDialog } from "@/components/upgrade-trial-dialog";
import { Button } from "@/components/ui/button";

export function TrialBanner() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <div className="w-full bg-amber-50 dark:bg-amber-950 border-b border-amber-200 dark:border-amber-800 px-4 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm">
        <span className="text-amber-800 dark:text-amber-200">
          您正在免費試用中 — 24 小時後資料將自動清除
        </span>
        <Button
          size="sm"
          variant="default"
          onClick={() => setDialogOpen(true)}
          className="shrink-0"
        >
          立即註冊以保留資料
        </Button>
      </div>
      <UpgradeTrialDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onUpgradeInitiated={() => {}}
      />
    </>
  );
}
