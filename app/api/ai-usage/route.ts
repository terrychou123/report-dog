import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getAiUsageToday } from '@/lib/ai/usage-limit';

export async function GET() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const usage = await getAiUsageToday(userId);
  return NextResponse.json(usage);
}
