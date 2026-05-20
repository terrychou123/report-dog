import { Suspense } from "react";
import { requireAdmin } from "@/lib/admin";
import { db } from "@/db";
import { classes } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import ClassEditForm from "./edit-form";

export const metadata = { title: "編輯課程 | 報告汪" };

async function ClassEditContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await requireAdmin();
  const [post] = await db.select().from(classes).where(eq(classes.slug, slug));
  if (!post) notFound();
  return <ClassEditForm post={post} />;
}

export default function ClassEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<div className="py-8 text-center text-muted-foreground">載入中...</div>}>
      <ClassEditContent params={params} />
    </Suspense>
  );
}
