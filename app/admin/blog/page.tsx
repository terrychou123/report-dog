import { Suspense } from "react";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { desc } from "drizzle-orm";
import BlogAdminPosts from "@/components/blog-admin-posts";

export const metadata = { title: "部落格管理 | 報告汪" };

async function BlogAdminContent() {
  const posts = await db
    .select()
    .from(blogPosts)
    .orderBy(desc(blogPosts.createdAt));
  return <BlogAdminPosts initialPosts={posts} />;
}

export default function AdminBlogPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">部落格管理</h1>
        <p className="text-muted-foreground mt-1">管理部落格文章</p>
      </div>
      <Suspense fallback={<div className="py-8 text-center text-muted-foreground">載入中...</div>}>
        <BlogAdminContent />
      </Suspense>
    </div>
  );
}
