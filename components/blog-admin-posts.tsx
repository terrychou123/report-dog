"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { InferSelectModel } from "drizzle-orm";
import { blogPosts } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";

type BlogPost = InferSelectModel<typeof blogPosts>;

interface BlogAdminPostsProps {
  initialPosts: BlogPost[];
}

export default function BlogAdminPosts({ initialPosts }: BlogAdminPostsProps) {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleNewPost() {
    setIsCreating(true);
    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "新文章" }),
      });
      if (!res.ok) throw new Error("Failed to create post");
      const post: BlogPost = await res.json();
      router.push(`/blog/${post.slug}/edit`);
    } catch {
      toast.error("建立文章失敗");
      setIsCreating(false);
    }
  }

  async function handleToggleStatus(post: BlogPost) {
    const newStatus = post.status === "published" ? "draft" : "published";
    try {
      const res = await fetch(`/api/blog/${post.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...post, status: newStatus }),
      });
      if (!res.ok) throw new Error();
      const updated: BlogPost = await res.json();
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
      const res = await fetch(`/api/blog/${deleteTarget.slug}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setPosts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      toast.success("文章已刪除");
    } catch {
      toast.error("刪除失敗");
    } finally {
      setIsDeleting(false);
      setDeleteTarget(null);
    }
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Blog 管理</h1>
        <Button onClick={handleNewPost} disabled={isCreating}>
          <PlusCircle className="w-4 h-4 mr-2" />
          {isCreating ? "建立中..." : "新增文章"}
        </Button>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          還沒有文章，點擊「新增文章」開始寫作
        </div>
      ) : (
        <div className="border rounded-lg divide-y">
          {posts.map((post) => (
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
                  <span className="font-mono">/blog/{post.slug}</span>
                  {post.publishedAt && (
                    <span className="ml-3">
                      發佈於 {new Date(post.publishedAt).toLocaleDateString("zh-TW")}
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
                  onClick={() => router.push(`/blog/${post.slug}/edit`)}
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
