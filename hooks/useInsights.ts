'use client';

import { useMemo } from 'react';
import { generateInsights } from '../lib/analytics/insights';
import type { AnalyticsReport, Insight } from '../lib/analytics/types';

export function useInsights(reports: readonly AnalyticsReport[]): readonly Insight[] {
  return useMemo(() => generateInsights(reports), [reports]);
}
