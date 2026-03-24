'use client';

import { useState, useEffect, useCallback } from 'react';

interface AiUsage {
  used: number;
  limit: number;
  remaining: number;
  tier: string;
}

export function useAiUsage() {
  const [data, setData] = useState<AiUsage | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/ai-usage');
      if (res.ok) {
        setData(await res.json());
      }
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    used: data?.used ?? 0,
    limit: data?.limit ?? 1,
    remaining: data?.remaining ?? 1,
    tier: data?.tier ?? 'free',
    isLoading,
    refresh,
  };
}
