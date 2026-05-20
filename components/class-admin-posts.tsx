"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { InferSelectModel } from "drizzle-orm";
import { classes } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";

type ClassRow = InferSelectModel<typeof classes>;

interface ClassAdminPostsProps {
  initialPosts: ClassRow[];
}

export default function ClassAdminPosts({ initialPosts }: ClassAdminPostsProps) {
  const router = useRouter();
  const [posts, setPosts] = useState<ClassRow[]>(initialPosts);
  const [deleteTarget, setDeleteTarget] = useState<ClassRow | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.category && set.add(p.category));
    return Array.from(set).sort();
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return posts.filter((p) => {
      if (selectedCategory !== "all" && p.category !== selectedCategory) return false;
      if (!q) return true;
      return p.slug.toLowerCase().includes(q) || p.title.toLowerCase().includes(q);
    });
  }, [posts, searchQuery, selectedCategory]);

  async function handleNewPost() {
    setIsCreating(true);
    try {
      const res = await fetch("/api/class", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "新課程" }),
      });
      if (!res.ok) throw new Error("Failed to create class");
      const post: ClassRow = await res.json();
      router.push(`/class/${post.slug}/edit`);
    } catch {
      toast.error("建立課程失敗");
      setIsCreating(false);
    }
  }

  async function handleToggleStatus(post: ClassRow) {
    const newStatus = post.status === "published" ? "draft" : "published";
    try {
      const res = await fetch(`/api/class/${post.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...post, status: newStatus }),
      });
      if (!res.ok) throw new Error();
      const updated: ClassRow = await res.json();
      setPosts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      toast.success(newStatus === "published" ? "已發佈" : "已設為草稿");
    } catch {
      toast.error("狀態更新失敗");
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/class/${deleteTarget.slug}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setPosts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      toast.success("課程已刪除");
    } catch {
      toast.error("刪除失敗");
    } finally {
      setIsDeleting(false);
      setDeleteTarget(null);
    }
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">課程管理</h1>
        <Button onClick={handleNewPost} disabled={isCreating}>
          <PlusCircle className="w-4 h-4 mr-2" />
          {isCreating ? "建立中..." : "新增課程"}
        </Button>
      </div>

      {/* 搜尋 + 分類篩選 */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <Input
          placeholder="搜尋 slug 或標題…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="sm:max-w-sm"
        />
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="sm:w-56">
            <SelectValue placeholder="所有分類" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">所有分類（{posts.length} 筆）</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>
                {c}（{posts.filter((p) => p.category === c).length} 筆）
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {(searchQuery || selectedCategory !== "all") && (
          <span className="text-sm text-muted-foreground self-center">
            顯示 {filteredPosts.length} / {posts.length} 筆
          </span>
        )}
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          {posts.length === 0
            ? "還沒有課程，點擊「新增課程」開始新增"
            : "沒有符合條件的課程"}
        </div>
      ) : (
        <div className="border rounded-lg divide-y">
          {filteredPosts.map((post) => (
            <div key={post.id} className="flex items-center gap-4 px-4 py-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium truncate">{post.title}</span>
                  <Badge variant={post.status === "published" ? "default" : "secondary"}>
                    {post.status === "published" ? "已發佈" : "草稿"}
                  </Badge>
                  {post.category && (
                    <Badge variant="outline">{post.category}</Badge>
                  )}
                </div>
                <div className="text-sm text-muted-foreground mt-0.5">
                  <span className="font-mono">/class/{post.slug}</span>
                  {post.publishedAt && (
                    <span className="ml-3">
                      發佈於 {new Date(post.publishedAt).toLocaleDateString("zh-TW", { timeZone: "Asia/Taipei" })}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleStatus(post)}
                >
                  {post.status === "published" ? "設為草稿" : "發佈"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push(`/class/${post.slug}/edit`)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDeleteTarget(post)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>確認刪除</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            確定要刪除「{deleteTarget?.title}」嗎？此操作無法復原。
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)} disabled={isDeleting}>
              取消
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? "刪除中..." : "確認刪除"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
