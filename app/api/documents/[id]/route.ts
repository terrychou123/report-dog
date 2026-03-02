import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { db } from '@/db';
import { documents, revisions } from '@/db/schema';
import { eq, and, max } from 'drizzle-orm';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const [doc] = await db
    .select()
    .from(documents)
    .where(and(eq(documents.id, id), eq(documents.userId, userId)));

  if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(doc);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { title, currentContent, status, saveRevision, changeSummary, isAiGenerated } = body;

  const updateData: Partial<typeof documents.$inferInsert> = {
    updatedAt: new Date(),
  };
  if (title !== undefined) updateData.title = title;
  if (status !== undefined) updateData.status = status;
  if (currentContent !== undefined) {
    updateData.currentContent = currentContent;
    updateData.wordCount = currentContent.split(/\s+/).filter(Boolean).length;
  }

  const [updated] = await db
    .update(documents)
    .set(updateData)
    .where(and(eq(documents.id, id), eq(documents.userId, userId)))
    .returning();

  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  // Create a revision if requested
  if (saveRevision && currentContent) {
    const result = await db
      .select({ maxVersion: max(revisions.versionNumber) })
      .from(revisions)
      .where(eq(revisions.documentId, id));
    const nextVersion = (result[0]?.maxVersion ?? 0) + 1;

    await db.insert(revisions).values({
      documentId: id,
      userId,
      content: currentContent,
      changeSummary: changeSummary || `Version ${nextVersion}`,
      isAiGenerated: isAiGenerated || false,
      versionNumber: nextVersion,
    });
  }

  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await db
    .delete(documents)
    .where(and(eq(documents.id, id), eq(documents.userId, userId)));

  return NextResponse.json({ success: true });
}
