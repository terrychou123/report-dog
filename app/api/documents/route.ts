import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { db } from '@/db';
import { documents, revisions } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const docs = await db
    .select()
    .from(documents)
    .where(eq(documents.userId, userId))
    .orderBy(desc(documents.updatedAt));

  return NextResponse.json(docs);
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { title, content, fileName } = await req.json();
  if (!title) return NextResponse.json({ error: 'Title is required' }, { status: 400 });

  const wordCount = content ? content.split(/\s+/).filter(Boolean).length : 0;

  const [doc] = await db
    .insert(documents)
    .values({
      userId,
      title,
      originalContent: content || '',
      currentContent: content || '',
      fileName: fileName || null,
      status: 'draft',
      wordCount,
    })
    .returning();

  // Create initial revision
  if (content) {
    await db.insert(revisions).values({
      documentId: doc.id,
      userId,
      content,
      changeSummary: 'Initial version',
      isAiGenerated: false,
      versionNumber: 1,
    });
  }

  return NextResponse.json(doc, { status: 201 });
}
