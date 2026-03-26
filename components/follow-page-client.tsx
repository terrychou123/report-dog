"use client";

import { useState, useMemo } from "react";
import { FollowSection } from "@/components/follow-section";
import { AddFollowDialog } from "@/components/add-follow-dialog";
import { FREQUENCY_ORDER, FREQUENCY_LABELS, type Frequency, type FollowItem } from "@/lib/follow-utils";
import { toast } from "sonner";

type GroupedFollows = Record<Frequency, FollowItem[]>;

export function FollowPageClient({ initialGrouped }: { initialGrouped: GroupedFollows }) {
  const [grouped, setGrouped] = useState<GroupedFollows>(initialGrouped);

  const followedReportIds = useMemo(
    () => new Set(Object.values(grouped).flatMap((items) => items.map((i) => i.reportId))),
    [grouped]
  );

  const totalFollows = Object.values(grouped).reduce((sum, arr) => sum + arr.length, 0);

  const handleAdded = (
    followId: string,
    reportId: string,
    reportTitle: string,
    reportUpdatedAt: string,
    fileType: string | null,
    frequency: Frequency
  ) => {
    setGrouped((prev) => ({
      ...prev,
      [frequency]: [...prev[frequency], { followId, reportId, reportTitle, reportUpdatedAt, fileType, frequency }],
    }));
  };

  const handleUnfollow = async (followId: string) => {
    const res = await fetch(`/api/follows/${followId}`, { method: "DELETE" });
    if (!res.ok) { toast.error("取消追蹤失敗"); return; }
    setGrouped((prev) => {
      const next = { ...prev } as GroupedFollows;
      for (const freq of FREQUENCY_ORDER) {
        next[freq] = next[freq].filter((i) => i.followId !== followId);
      }
      return next;
    });
    toast.success("已取消追蹤");
  };

  const handleChangeFrequency = async (followId: string, newFrequency: Frequency) => {
    const res = await fetch(`/api/follows/${followId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ frequency: newFrequency }),
    });
    if (!res.ok) { toast.error("更新頻率失敗"); return; }
    setGrouped((prev) => {
      let moved: FollowItem | undefined;
      const next = { ...prev } as GroupedFollows;
      for (const freq of FREQUENCY_ORDER) {
        const idx = next[freq].findIndex((i) => i.followId === followId);
        if (idx !== -1) {
          moved = { ...next[freq][idx], frequency: newFrequency };
          next[freq] = next[freq].filter((_, i) => i !== idx);
          break;
        }
      }
      if (moved) next[newFrequency] = [...next[newFrequency], moved];
      return next;
    });
    toast.success(`已移至「${FREQUENCY_LABELS[newFrequency]}」`);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <p className="text-muted-foreground text-sm">
          共追蹤 {totalFollows} 份報告，依更新頻率分組顯示
        </p>
        <AddFollowDialog followedReportIds={followedReportIds} onAdded={handleAdded} />
      </div>
      <div className="space-y-8">
        {FREQUENCY_ORDER.map((freq) => (
          <FollowSection
            key={freq}
            frequency={freq}
            items={grouped[freq]}
            onUnfollow={handleUnfollow}
            onChangeFrequency={handleChangeFrequency}
          />
        ))}
      </div>
    </>
  );
}
