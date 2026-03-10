"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FileTextIcon, TagIcon, GripVerticalIcon } from "lucide-react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CopyReportButton } from "@/components/copy-report-button";
import { FileTypeIcon } from "@/components/file-type-icon";

type Report = {
  id: string;
  title: string;
  fileType: string | null;
  sortOrder: number;
  createdAt: string;
  tags: string[];
};

function SortableReportCard({ report, onCopied }: { report: Report; onCopied: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: report.id,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative">
      <Link href={`/report/${report.id}`} className="block">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="py-3 px-4 pr-20">
            <CardTitle className="text-sm font-medium flex items-center gap-2 flex-wrap">
              <FileTypeIcon fileType={report.fileType} />
              <span className="flex-1">{report.title}</span>
              {report.tags.length > 0 && (
                <span className="flex items-center gap-1 text-xs font-normal text-muted-foreground">
                  <TagIcon className="h-3 w-3" />
                  {report.tags.join("、")}
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 px-4 pb-3">
            <p className="text-xs text-muted-foreground">
              {new Date(report.createdAt).toLocaleDateString("zh-TW", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </CardContent>
        </Card>
      </Link>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
        <CopyReportButton reportId={report.id} title={report.title} onCopied={onCopied} />
        <button
          {...attributes}
          {...listeners}
          className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-grab active:cursor-grabbing"
          title="拖曳排序"
        >
          <GripVerticalIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function DraggableReportsList() {
  const [reportList, setReportList] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  const sensors = useSensors(useSensor(PointerSensor));

  const loadReports = () => {
    fetch("/api/reports")
      .then((r) => r.json())
      .then((data) => {
        setReportList(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadReports();
    window.addEventListener("reports-updated", loadReports);
    return () => window.removeEventListener("reports-updated", loadReports);
  }, []);

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = reportList.findIndex((r) => r.id === active.id);
    const newIndex = reportList.findIndex((r) => r.id === over.id);
    const reordered = arrayMove(reportList, oldIndex, newIndex);
    setReportList(reordered);

    await fetch("/api/reports/reorder", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: reordered.map((r) => r.id) }),
    });
  }

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-16 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (reportList.length === 0) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        <FileTextIcon className="h-12 w-12 mx-auto mb-4 opacity-30" />
        <p className="text-lg mb-2">尚無報告</p>
        <p className="text-sm">點擊右上角「上傳報告」建立第一份報告</p>
      </div>
    );
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={reportList.map((r) => r.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-3">
          {reportList.map((report) => (
            <SortableReportCard key={report.id} report={report} onCopied={loadReports} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
