import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { db } from '@/db';
import { documents } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});

const SYSTEM_PROMPTS: Record<string, string> = {
  analyze:
    'You are an expert document analyst. Analyze the provided report and identify key insights, strengths, weaknesses, and specific improvement suggestions. Be concise and structured.',
  improve:
    'You are an expert editor. Improve the language, clarity, and structure of the provided report while preserving the core content and meaning. Return the improved version of the full document.',
  summarize:
    'You are an expert at distilling information. Generate a concise executive summary (3-5 paragraphs) of the provided report, highlighting the most important points.',
  'extract-data':
    'You are a data extraction specialist. Extract all numerical values, dates, named entities, and key facts from the provided report. Return the result as a well-structured JSON object with keys: numbers, dates, entities, keyFacts.',
};

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

  const { action, userMessage } = await req.json();
  const systemPrompt = SYSTEM_PROMPTS[action];
  if (!systemPrompt) return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

  const documentContent = doc.currentContent || doc.originalContent || '';
  const userContent = userMessage
    ? `${documentContent}\n\nAdditional instructions: ${userMessage}`
    : documentContent;

  const stream = await openai.chat.completions.create({
    model: 'anthropic/claude-sonnet-4.6',
    stream: true,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userContent },
    ],
  });

  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content || '';
        if (text) controller.enqueue(new TextEncoder().encode(text));
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
