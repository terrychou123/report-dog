import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { db } from '@/db';
import { documents, revisions } from '@/db/schema';
import { eq, and, desc, max } from 'drizzle-orm';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // Verify document ownership
  const [doc] = await db
    .select()
    .from(documents)
    .where(and(eq(documents.id, id), eq(documents.userId, userId)));
  if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const revList = await db
    .select()
    .from(revisions)
    .where(eq(revisions.documentId, id))
    .orderBy(desc(revisions.versionNumber));

  return NextResponse.json(revList);
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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

  const { content, changeSummary, isAiGenerated } = await req.json();

  const result = await db
    .select({ maxVersion: max(revisions.versionNumber) })
    .from(revisions)
    .where(eq(revisions.documentId, id));
  const nextVersion = (result[0]?.maxVersion ?? 0) + 1;

  const [revision] = await db
    .insert(revisions)
    .values({
      documentId: id,
      userId,
      content,
      changeSummary: changeSummary || `Version ${nextVersion}`,
      isAiGenerated: isAiGenerated || false,
      versionNumber: nextVersion,
    })
    .returning();

  return NextResponse.json(revision, { status: 201 });
}
