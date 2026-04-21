import OpenAI from 'openai';
import { requireEnv } from '@/lib/utils';

export function createOpenRouterClient() {
  return new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: requireEnv("OPENROUTER_API_KEY"),
  });
}
