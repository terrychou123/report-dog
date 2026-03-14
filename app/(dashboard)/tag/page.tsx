"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { TagIcon, PlusIcon, GripVerticalIcon, FileTextIcon, SearchIcon } from "lucide-react";
import { FileTypeIcon } from "@/components/file-type-icon";
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

type Client = {
  id: string;
  nickname: string;
  description: string | null;
  sortOrder: number;
  createdAt: string;
  reportCount: number;
};

type TagReport = {
  relationId: string;
  reportId: string;
  title: string;
  fileType: string | null;
  createdAt: string;
};

function SortableClientCard({ client }: { client: Client }) {
  const [expanded, setExpanded] = useState(false);
  const [reports, setReports] = useState<TagReport[]>([]);
  const [loadingReports, setLoadingReports] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: client.id });

  async function handleToggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (expanded) { setExpanded(false); return; }
    setExpanded(true);
    if (reports.length === 0) {
      setLoadingReports(true);
      const res = await fetch(`/api/tag-reports?clientId=${client.id}`);
      if (res.ok) setReports(await res.json());
      setLoadingReports(false);
    }
  }

  return (
    <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 }}>
      <div className="relative">
        <Link href={`/tag/${client.id}`} className="block">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="py-3 px-4 pr-20">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TagIcon className="h-4 w-4 text-primary shrink-0" />
                {client.nickname}
              </CardTitle>
              {client.description && (
                <CardDescription className="text-xs truncate">{client.description}</CardDescription>
              )}
            </CardHeader>
          </Card>
        </Link>

        {client.reportCount > 0 && (
          <button
            onClick={handleToggle}
            title={expanded ? "隱藏報告" : "顯示報告"}
            className="absolute right-10 top-1/2 -translate-y-1/2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
          >
            <FileTextIcon className="h-3 w-3" />
            {client.reportCount}
          </button>
        )}

        <button
          {...attributes}
          {...listeners}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-grab active:cursor-grabbing"
          title="拖曳排序"
        >
          <GripVerticalIcon className="h-4 w-4" />
        </button>
      </div>

      {expanded && (
        <div className="mt-1 ml-4 border-l-2 border-primary/20 pl-3 space-y-1 pb-1">
          {loadingReports ? (
            <Skeleton className="h-7 w-full mt-1" />
          ) : reports.length === 0 ? (
            <p className="text-xs text-muted-foreground py-2">尚無報告</p>
          ) : (
            reports.map((r) => (
              <a
                key={r.reportId}
                href={`/report/${r.reportId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-2 py-1.5 rounded text-sm hover:bg-muted transition-colors"
              >
                <FileTypeIcon fileType={r.fileType} />
                <span className="flex-1 truncate">{r.title}</span>
                <span className="text-xs text-muted-foreground shrink-0">
                  {new Date(r.createdAt).toLocaleDateString("zh-TW")}
                </span>
              </a>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default function TagPage() {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    fetch("/api/tags")
      .then((r) => r.json())
      .then((data) => { setClients(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = clients.findIndex((c) => c.id === active.id);
    const newIndex = clients.findIndex((c) => c.id === over.id);
    const reordered = arrayMove(clients, oldIndex, newIndex);
    setClients(reordered);

    await fetch("/api/tags/reorder", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: reordered.map((c) => c.id) }),
    });
  }

  const filteredClients = searchQuery.trim()
    ? clients.filter((c) =>
        c.nickname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.description ?? "").toLowerCase().includes(searchQuery.toLowerCase())
      )
    : clients;

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">標籤</h1>
          <p className="text-muted-foreground mt-1 text-sm">管理您的標籤</p>
        </div>
        <Button size="sm" onClick={() => router.push("/tag/new")}>
          <PlusIcon className="h-4 w-4 mr-1.5" />
          新建標籤
        </Button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-16 w-full" />)}
        </div>
      ) : clients.length === 0 ? (
        <div className="text-center py-14 text-muted-foreground border rounded-lg">
          <TagIcon className="h-10 w-10 mx-auto mb-3 opacity-30" />
          <p className="mb-1">尚無標籤</p>
          <p className="text-sm">點擊「新建標籤」建立第一個標籤</p>
        </div>
      ) : (
        <>
          <div className="relative mb-6">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="搜尋標籤..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={filteredClients.map((c) => c.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-3">
                {filteredClients.map((client) => (
                  <SortableClientCard key={client.id} client={client} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </>
      )}
    </div>
  );
}
