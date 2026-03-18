import { Suspense } from "react";
import { requireBlogAdmin } from "@/lib/blog-admin";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import BlogEditForm from "./edit-form";

export const metadata = { title: "編輯文章 | 報告汪" };

async function BlogEditContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await requireBlogAdmin();
  const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
  if (!post) notFound();
  return <BlogEditForm post={post} />;
}

export default function BlogEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<div className="py-8 text-center text-muted-foreground">載入中...</div>}>
      <BlogEditContent params={params} />
    </Suspense>
  );
}
