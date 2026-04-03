"use client";

import { useState, useCallback, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { InferSelectModel } from "drizzle-orm";
import { blogPosts } from "@/db/schema";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ArrowLeft, Bold, Italic, Strikethrough, Code, Heading1, Heading2, Heading3, List, ListOrdered, Quote, Minus, ImageIcon, Loader2, Code2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import sanitizeHtml from "sanitize-html";
import { blogSanitizeOptions } from "@/lib/blog-sanitize-config";

type BlogPost = InferSelectModel<typeof blogPosts>;

interface BlogEditFormProps {
  post: BlogPost;
}

export default function BlogEditForm({ post }: BlogEditFormProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [slugChanged, setSlugChanged] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  // HTML 原始碼模式
  const [htmlMode, setHtmlMode] = useState(false);
  const [htmlContent, setHtmlContent] = useState(post.content ?? "");
  // HTML 模式下是否顯示即時預覽面板（預設開啟）
  const [showPreview, setShowPreview] = useState(true);
  // 預覽面板用的 sanitized HTML（防止預覽執行 script / 事件處理器）
  const sanitizedPreview = useMemo(
    () => sanitizeHtml(htmlContent, blogSanitizeOptions),
    [htmlContent]
  );
  // 隱藏的 file input ref，用於觸發圖片選擇
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    extensions: [
      StarterKit,
      // 圖片擴充套件：支援 src / alt / title
      Image.configure({ inline: false, allowBase64: false }),
    ],
    content: post.content ?? "",
    editorProps: {
      attributes: {
        class: "min-h-[400px] p-4 focus:outline-none",
      },
    },
  });

  /** 處理圖片上傳：呼叫 API 後將圖片插入編輯器 */
  async function handleImageUpload(file: File) {
    if (!editor) return;
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/blog/upload-image", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const { error } = await res.json().catch(() => ({}));
        throw new Error(error ?? "Upload failed");
      }
      const { url } = await res.json();
      editor.chain().focus().setImage({ src: url }).run();
      toast.success("圖片已上傳");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "圖片上傳失敗");
    } finally {
      setIsUploading(false);
    }
  }

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

  /** 切換 HTML / 視覺模式，並同步內容 */
  function toggleHtmlMode() {
    if (!htmlMode) {
      // 視覺 → HTML：將 TipTap 內容匯出為 HTML
      setHtmlContent(editor?.getHTML() ?? "");
    } else {
      // HTML → 視覺：若包含 SVG 則警告使用者切換會遺失 SVG
      if (htmlContent.includes("<svg")) {
        toast.warning("內容含有 SVG，切換回視覺模式將遺失 SVG。建議保持 HTML 模式直接儲存。");
        return;
      }
      // 將 textarea 內容寫回 TipTap
      editor?.commands.setContent(htmlContent);
    }
    setHtmlMode((prev) => !prev);
  }

  async function save(status: "draft" | "published") {
    setIsSaving(true);
    try {
      // HTML 模式直接用 textarea 值，視覺模式用 TipTap 的 getHTML()
      const content = htmlMode ? htmlContent : (editor?.getHTML() ?? null);
      const body = {
        slug: form.slug,
        title: form.title,
        excerpt: form.excerpt || null,
        content,
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
                <div className="border-b bg-muted/30 p-2 flex flex-wrap gap-1 items-center">
                  <ToolbarButton
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                    active={editor?.isActive("bold")}
                    title="粗體"
                    disabled={htmlMode}
                  >
                    <Bold className="w-4 h-4" />
                  </ToolbarButton>
                  <ToolbarButton
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                    active={editor?.isActive("italic")}
                    title="斜體"
                    disabled={htmlMode}
                  >
                    <Italic className="w-4 h-4" />
                  </ToolbarButton>
                  <ToolbarButton
                    onClick={() => editor?.chain().focus().toggleStrike().run()}
                    active={editor?.isActive("strike")}
                    title="刪除線"
                    disabled={htmlMode}
                  >
                    <Strikethrough className="w-4 h-4" />
                  </ToolbarButton>
                  <ToolbarButton
                    onClick={() => editor?.chain().focus().toggleCode().run()}
                    active={editor?.isActive("code")}
                    title="行內程式碼"
                    disabled={htmlMode}
                  >
                    <Code className="w-4 h-4" />
                  </ToolbarButton>
                  <div className="w-px bg-border mx-1 self-stretch" />
                  <ToolbarButton
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                    active={editor?.isActive("heading", { level: 1 })}
                    title="H1"
                    disabled={htmlMode}
                  >
                    <Heading1 className="w-4 h-4" />
                  </ToolbarButton>
                  <ToolbarButton
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                    active={editor?.isActive("heading", { level: 2 })}
                    title="H2"
                    disabled={htmlMode}
                  >
                    <Heading2 className="w-4 h-4" />
                  </ToolbarButton>
                  <ToolbarButton
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
                    active={editor?.isActive("heading", { level: 3 })}
                    title="H3"
                    disabled={htmlMode}
                  >
                    <Heading3 className="w-4 h-4" />
                  </ToolbarButton>
                  <div className="w-px bg-border mx-1 self-stretch" />
                  <ToolbarButton
                    onClick={() => editor?.chain().focus().toggleBulletList().run()}
                    active={editor?.isActive("bulletList")}
                    title="項目清單"
                    disabled={htmlMode}
                  >
                    <List className="w-4 h-4" />
                  </ToolbarButton>
                  <ToolbarButton
                    onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                    active={editor?.isActive("orderedList")}
                    title="有序清單"
                    disabled={htmlMode}
                  >
                    <ListOrdered className="w-4 h-4" />
                  </ToolbarButton>
                  <ToolbarButton
                    onClick={() => editor?.chain().focus().toggleBlockquote().run()}
                    active={editor?.isActive("blockquote")}
                    title="引用"
                    disabled={htmlMode}
                  >
                    <Quote className="w-4 h-4" />
                  </ToolbarButton>
                  <ToolbarButton
                    onClick={() => editor?.chain().focus().setHorizontalRule().run()}
                    title="水平線"
                    disabled={htmlMode}
                  >
                    <Minus className="w-4 h-4" />
                  </ToolbarButton>
                  <div className="w-px bg-border mx-1 self-stretch" />
                  {/* 圖片上傳按鈕 */}
                  <ToolbarButton
                    onClick={() => fileInputRef.current?.click()}
                    title="插入圖片"
                    disabled={isUploading || htmlMode}
                  >
                    {isUploading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <ImageIcon className="w-4 h-4" />
                    )}
                  </ToolbarButton>
                  {/* HTML 模式切換按鈕群，靠右對齊 */}
                  <div className="ml-auto" />
                  <div className="w-px bg-border mx-1 self-stretch" />
                  {/* 預覽切換按鈕（僅 HTML 模式顯示） */}
                  {htmlMode && (
                    <ToolbarButton
                      onClick={() => setShowPreview((v) => !v)}
                      active={showPreview}
                      title={showPreview ? "隱藏預覽" : "顯示即時預覽"}
                    >
                      {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </ToolbarButton>
                  )}
                  <ToolbarButton
                    onClick={toggleHtmlMode}
                    active={htmlMode}
                    title={htmlMode ? "切換回視覺編輯" : "編輯 HTML 原始碼"}
                  >
                    <Code2 className="w-4 h-4" />
                  </ToolbarButton>
                </div>
                {/* 視覺編輯模式 */}
                {!htmlMode && <EditorContent editor={editor} />}
                {/* HTML 原始碼模式：左右分欄（程式碼 + 即時預覽） */}
                {htmlMode && (
                  <div className={showPreview ? "grid grid-cols-2 divide-x" : ""}>
                    {/* 左側：HTML 原始碼 textarea */}
                    <Textarea
                      value={htmlContent}
                      onChange={(e) => setHtmlContent(e.target.value)}
                      className="min-h-[400px] p-4 font-mono text-sm rounded-none border-0 resize-none focus-visible:ring-0"
                      placeholder="在此輸入 HTML 原始碼..."
                      spellCheck={false}
                    />
                    {/* 右側：即時渲染預覽 */}
                    {showPreview && (
                      <div
                        className="min-h-[400px] p-4 overflow-auto tiptap-blog prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: sanitizedPreview }}
                      />
                    )}
                  </div>
                )}
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
      {/* 隱藏的圖片選擇器，由工具列按鈕觸發 */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleImageUpload(file);
          // 清空 value 使同一檔案可重複選擇
          e.target.value = "";
        }}
      />
    </div>
  );
}

function ToolbarButton({
  onClick,
  active,
  title,
  disabled,
  children,
}: {
  onClick?: () => void;
  active?: boolean;
  title?: string;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "p-1.5 rounded hover:bg-accent transition-colors",
        active && "bg-accent",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      {children}
    </button>
  );
}
