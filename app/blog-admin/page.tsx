import { Suspense } from "react";
import { requireBlogAdmin } from "@/lib/blog-admin";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { desc } from "drizzle-orm";
import BlogAdminPosts from "@/components/blog-admin-posts";

export const metadata = { title: "Blog 管理 | 報告汪" };

async function BlogAdminContent() {
  await requireBlogAdmin();
  const posts = await db
    .select()
    .from(blogPosts)
    .orderBy(desc(blogPosts.createdAt));
  return <BlogAdminPosts initialPosts={posts} />;
}

export default function BlogAdminPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <Suspense fallback={<div className="py-8 text-center text-muted-foreground">載入中...</div>}>
        <BlogAdminContent />
      </Suspense>
    </div>
  );
}
