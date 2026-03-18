"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { InferSelectModel } from "drizzle-orm";
import { blogPosts } from "@/db/schema";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ArrowLeft, Bold, Italic, Strikethrough, Code, Heading1, Heading2, Heading3, List, ListOrdered, Quote, Minus } from "lucide-react";
import Link from "next/link";

type BlogPost = InferSelectModel<typeof blogPosts>;

interface BlogEditFormProps {
  post: BlogPost;
}

export default function BlogEditForm({ post }: BlogEditFormProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [slugChanged, setSlugChanged] = useState(false);

  const [form, setForm] = useState({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt ?? "",
    coverImageUrl: post.coverImageUrl ?? "",
    category: post.category ?? "",
    tags: (post.tags ?? []).join(", "),
    seoTitle: post.seoTitle ?? "",
    seoDescription: post.seoDescription ?? "",
    status: post.status,
  });

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit],
    content: post.content ?? "",
    editorProps: {
      attributes: {
        class: "min-h-[400px] p-4 focus:outline-none",
      },
    },
  });

  const handleChange = useCallback(
    (field: keyof typeof form, value: string) => {
      setForm((prev) => {
        if (field === "slug" && value !== post.slug) setSlugChanged(true);
        else if (field === "slug" && value === post.slug) setSlugChanged(false);
        return { ...prev, [field]: value };
      });
    },
    [post.slug]
  );

  async function save(status: "draft" | "published") {
    setIsSaving(true);
    try {
      const body = {
        slug: form.slug,
        title: form.title,
        excerpt: form.excerpt || null,
        content: editor?.getHTML() ?? null,
        coverImageUrl: form.coverImageUrl || null,
        category: form.category || null,
        tags: form.tags
          ? form.tags.split(",").map((t) => t.trim()).filter(Boolean)
          : null,
        seoTitle: form.seoTitle || null,
        seoDescription: form.seoDescription || null,
        status,
      };

      const res = await fetch(`/api/blog/${post.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Save failed");
      const updated: BlogPost = await res.json();

      toast.success(status === "published" ? "已發佈" : "草稿已儲存");

      if (updated.slug !== post.slug) {
        router.replace(`/blog/${updated.slug}/edit`);
      }
    } catch {
      toast.error("儲存失敗");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b sticky top-0 bg-background z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between max-w-5xl">
          <Link
            href="/blog-admin"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" /> 返回管理
          </Link>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => save("draft")} disabled={isSaving}>
              儲存草稿
            </Button>
            <Button size="sm" onClick={() => save("published")} disabled={isSaving}>
              {isSaving ? "儲存中..." : form.status === "published" ? "更新發佈" : "發佈"}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl space-y-6">
        {/* Slug warning */}
        {slugChanged && (
          <div className="rounded-md bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-2 text-sm dark:bg-yellow-950 dark:border-yellow-800 dark:text-yellow-200">
            注意：URL 已變更，儲存後舊連結將失效。
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-[1fr_320px]">
          {/* Main content */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">標題 *</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="文章標題"
                className="text-lg font-medium mt-1"
              />
            </div>

            <div>
              <Label htmlFor="excerpt">摘要</Label>
              <Textarea
                id="excerpt"
                value={form.excerpt}
                onChange={(e) => handleChange("excerpt", e.target.value)}
                placeholder="簡短描述文章內容（用作 meta description，建議 120–155 字）"
                className="mt-1 resize-none"
                rows={3}
              />
            </div>

            {/* Tiptap Editor */}
            <div>
              <Label>內容</Label>
              <div className="mt-1 border rounded-md overflow-hidden tiptap-blog">
                {/* Toolbar */}
                <div className="border-b bg-muted/30 p-2 flex flex-wrap gap-1">
                  <ToolbarButton
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                    active={editor?.isActive("bold")}
                    title="粗體"
                  >
                    <Bold className="w-4 h-4" />
                  </ToolbarButton>
                  <ToolbarButton
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                    active={editor?.isActive("italic")}
                    title="斜體"
                  >
                    <Italic className="w-4 h-4" />
                  </ToolbarButton>
                  <ToolbarButton
                    onClick={() => editor?.chain().focus().toggleStrike().run()}
                    active={editor?.isActive("strike")}
                    title="刪除線"
                  >
                    <Strikethrough className="w-4 h-4" />
                  </ToolbarButton>
                  <ToolbarButton
                    onClick={() => editor?.chain().focus().toggleCode().run()}
                    active={editor?.isActive("code")}
                    title="行內程式碼"
                  >
                    <Code className="w-4 h-4" />
                  </ToolbarButton>
                  <div className="w-px bg-border mx-1" />
                  <ToolbarButton
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                    active={editor?.isActive("heading", { level: 1 })}
                    title="H1"
                  >
                    <Heading1 className="w-4 h-4" />
                  </ToolbarButton>
                  <ToolbarButton
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                    active={editor?.isActive("heading", { level: 2 })}
                    title="H2"
                  >
                    <Heading2 className="w-4 h-4" />
                  </ToolbarButton>
                  <ToolbarButton
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
                    active={editor?.isActive("heading", { level: 3 })}
                    title="H3"
                  >
                    <Heading3 className="w-4 h-4" />
                  </ToolbarButton>
                  <div className="w-px bg-border mx-1" />
                  <ToolbarButton
                    onClick={() => editor?.chain().focus().toggleBulletList().run()}
                    active={editor?.isActive("bulletList")}
                    title="項目清單"
                  >
                    <List className="w-4 h-4" />
                  </ToolbarButton>
                  <ToolbarButton
                    onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                    active={editor?.isActive("orderedList")}
                    title="有序清單"
                  >
                    <ListOrdered className="w-4 h-4" />
                  </ToolbarButton>
                  <ToolbarButton
                    onClick={() => editor?.chain().focus().toggleBlockquote().run()}
                    active={editor?.isActive("blockquote")}
                    title="引用"
                  >
                    <Quote className="w-4 h-4" />
                  </ToolbarButton>
                  <ToolbarButton
                    onClick={() => editor?.chain().focus().setHorizontalRule().run()}
                    title="水平線"
                  >
                    <Minus className="w-4 h-4" />
                  </ToolbarButton>
                </div>
                <EditorContent editor={editor} />
              </div>
            </div>
          </div>

          {/* Sidebar metadata */}
          <div className="space-y-4">
            <div className="border rounded-lg p-4 space-y-4">
              <h3 className="font-semibold text-sm">文章設定</h3>

              <div>
                <Label htmlFor="slug">Slug（URL）</Label>
                <Input
                  id="slug"
                  value={form.slug}
                  onChange={(e) => handleChange("slug", e.target.value)}
                  placeholder="article-slug"
                  className="mt-1 font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  /blog/{form.slug}
                </p>
              </div>

              <div>
                <Label htmlFor="category">分類</Label>
                <Input
                  id="category"
                  value={form.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  placeholder="居服機構、評鑑、AI工具..."
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="tags">標籤</Label>
                <Input
                  id="tags"
                  value={form.tags}
                  onChange={(e) => handleChange("tags", e.target.value)}
                  placeholder="標籤1, 標籤2, 標籤3"
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">以逗號分隔</p>
              </div>

              <div>
                <Label htmlFor="coverImageUrl">封面圖片 URL</Label>
                <Input
                  id="coverImageUrl"
                  value={form.coverImageUrl}
                  onChange={(e) => handleChange("coverImageUrl", e.target.value)}
                  placeholder="https://..."
                  className="mt-1"
                />
              </div>
            </div>

            <div className="border rounded-lg p-4 space-y-4">
              <h3 className="font-semibold text-sm">SEO 設定</h3>

              <div>
                <Label htmlFor="seoTitle">SEO 標題</Label>
                <Input
                  id="seoTitle"
                  value={form.seoTitle}
                  onChange={(e) => handleChange("seoTitle", e.target.value)}
                  placeholder="留空則使用文章標題"
                  className="mt-1"
                  maxLength={60}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {form.seoTitle.length}/60 字
                </p>
              </div>

              <div>
                <Label htmlFor="seoDescription">SEO 描述</Label>
                <Textarea
                  id="seoDescription"
                  value={form.seoDescription}
                  onChange={(e) => handleChange("seoDescription", e.target.value)}
                  placeholder="留空則使用摘要（120–155 字）"
                  className="mt-1 resize-none"
                  rows={4}
                  maxLength={155}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {form.seoDescription.length}/155 字
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ToolbarButton({
  onClick,
  active,
  title,
  children,
}: {
  onClick?: () => void;
  active?: boolean;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={cn(
        "p-1.5 rounded hover:bg-accent transition-colors",
        active && "bg-accent"
      )}
    >
      {children}
    </button>
  );
}
