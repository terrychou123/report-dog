"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TagIcon, PlusIcon, GripVerticalIcon } from "lucide-react";
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

type Kind = {
  id: string;
  name: string;
  description: string | null;
  sortOrder: number;
  createdAt: string;
};

function SortableKindCard({ kind }: { kind: Kind }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: kind.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative">
      <Link href={`/kind/${kind.id}`} className="block">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="py-3 px-4 pr-12">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TagIcon className="h-4 w-4 text-primary shrink-0" />
              {kind.name}
            </CardTitle>
            {kind.description && (
              <CardDescription className="text-xs truncate">{kind.description}</CardDescription>
            )}
          </CardHeader>
        </Card>
      </Link>
      <button
        {...attributes}
        {...listeners}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-grab active:cursor-grabbing"
        title="拖曳排序"
      >
        <GripVerticalIcon className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function KindPage() {
  const router = useRouter();
  const [kinds, setKinds] = useState<Kind[]>([]);
  const [loading, setLoading] = useState(true);

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    fetch("/api/kinds")
      .then((r) => r.json())
      .then((data) => { setKinds(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = kinds.findIndex((k) => k.id === active.id);
    const newIndex = kinds.findIndex((k) => k.id === over.id);
    const reordered = arrayMove(kinds, oldIndex, newIndex);
    setKinds(reordered);

    await fetch("/api/kinds/reorder", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: reordered.map((k) => k.id) }),
    });
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">種類</h1>
          <p className="text-muted-foreground mt-1 text-sm">管理您的報告種類</p>
        </div>
        <Button size="sm" onClick={() => router.push("/kind/new")}>
          <PlusIcon className="h-4 w-4 mr-1.5" />
          新增種類
        </Button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-16 w-full" />)}
        </div>
      ) : kinds.length === 0 ? (
        <div className="text-center py-14 text-muted-foreground border rounded-lg">
          <TagIcon className="h-10 w-10 mx-auto mb-3 opacity-30" />
          <p className="mb-1">尚無種類</p>
          <p className="text-sm">點擊「新增種類」建立第一個報告種類</p>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={kinds.map((k) => k.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {kinds.map((kind) => (
                <SortableKindCard key={kind.id} kind={kind} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
