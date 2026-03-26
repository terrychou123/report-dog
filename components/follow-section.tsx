"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileTextIcon, TableIcon, XIcon, ChevronDownIcon } from "lucide-react";
import { FREQUENCY_LABELS, FREQUENCY_ORDER, isOverdue, type Frequency, type FollowItem } from "@/lib/follow-utils";
import { formatZhTWDate } from "@/lib/utils";

export function FollowSection({
  frequency,
  items,
  onUnfollow,
  onChangeFrequency,
}: {
  frequency: Frequency;
  items: FollowItem[];
  onUnfollow: (followId: string) => void;
  onChangeFrequency: (followId: string, newFrequency: Frequency) => void;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <h2 className="text-base font-semibold">{FREQUENCY_LABELS[frequency]}</h2>
        {items.length > 0 && (
          <Badge variant="secondary" className="text-xs">{items.length}</Badge>
        )}
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground pl-1 mb-2">尚無追蹤報告</p>
      ) : (
        <div className="space-y-2 mb-2">
          {items.map((item) => {
            const updatedAt = new Date(item.reportUpdatedAt);
            const overdue = isOverdue(item.frequency, updatedAt);
            return (
              <div key={item.followId} className="relative flex items-center gap-2">
                <Link href={`/report/${item.reportId}`} className="flex-1 min-w-0">
                  <Card className={`hover:shadow-md transition-shadow cursor-pointer ${overdue ? "border-l-4 border-l-destructive" : ""}`}>
                    <CardHeader className="py-2.5 px-4 pr-24">
                      <div className="flex items-start gap-2">
                        {item.fileType === "excel" ? (
                          <TableIcon className="h-3.5 w-3.5 mt-0.5 shrink-0 text-muted-foreground" />
                        ) : (
                          <FileTextIcon className="h-3.5 w-3.5 mt-0.5 shrink-0 text-muted-foreground" />
                        )}
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{item.reportTitle}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            最後更新：{formatZhTWDate(updatedAt)}
                          </p>
                        </div>
                        {overdue && (
                          <Badge variant="destructive" className="text-xs shrink-0 ml-auto">逾期</Badge>
                        )}
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7" title="更改頻率">
                        <ChevronDownIcon className="h-3.5 w-3.5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuRadioGroup
                        value={item.frequency}
                        onValueChange={(val) => onChangeFrequency(item.followId, val as Frequency)}
                      >
                        {FREQUENCY_ORDER.map((f) => (
                          <DropdownMenuRadioItem key={f} value={f}>
                            {FREQUENCY_LABELS[f]}
                          </DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-destructive"
                    title="取消追蹤"
                    onClick={() => onUnfollow(item.followId)}
                  >
                    <XIcon className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
