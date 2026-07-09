'use client';

import { useState, useEffect, useCallback } from 'react';
import { getSupabaseClient } from '../lib/supabase/client';
import { fetchReports } from '../lib/supabase/queries';
import type { AnalyticsReport } from '../lib/analytics/types';
import type { PollutionCategory } from '../types/taxonomy';

interface UseReportsOptions {
  category?: PollutionCategory;
  province?: string;
  minUrgency?: number;
  startDate?: string;
  endDate?: string;
  limit?: number;
}

interface UseReportsReturn {
  reports: readonly AnalyticsReport[];
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useReports(options: UseReportsOptions = {}): UseReportsReturn {
  const [reports, setReports] = useState<readonly AnalyticsReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const client = getSupabaseClient();
      const data = await fetchReports(client, options);
      setReports(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load reports');
    } finally {
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    options.category,
    options.province,
    options.minUrgency,
    options.startDate,
    options.endDate,
    options.limit,
  ]);

  useEffect(() => {
    void load();
  }, [load]);

  return { reports, isLoading, error, refresh: load };
}
