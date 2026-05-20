import { Suspense } from "react";
import { db } from "@/db";
import { classes } from "@/db/schema";
import { desc } from "drizzle-orm";
import ClassAdminPosts from "@/components/class-admin-posts";

export const metadata = { title: "課程管理 | 報告汪" };

async function ClassAdminContent() {
  const posts = await db
    .select()
    .from(classes)
    .orderBy(desc(classes.createdAt));
  return <ClassAdminPosts initialPosts={posts} />;
}

export default function AdminClassPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">課程管理</h1>
        <p className="text-muted-foreground mt-1">管理課程內容</p>
      </div>
      <Suspense fallback={<div className="py-8 text-center text-muted-foreground">載入中...</div>}>
        <ClassAdminContent />
      </Suspense>
    </div>
  );
}
