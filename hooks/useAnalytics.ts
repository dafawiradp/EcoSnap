'use client';

import { useMemo } from 'react';
import { runAnalytics } from '../lib/analytics';
import type { AnalyticsReport, AnalyticsResult } from '../lib/analytics/types';

export function useAnalytics(reports: readonly AnalyticsReport[]): AnalyticsResult {
  return useMemo(() => runAnalytics(reports), [reports]);
}
