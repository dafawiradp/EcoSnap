'use client';

import { useMemo } from 'react';
import { forecastReports } from '../lib/analytics/forecast';
import type { AnalyticsReport } from '../lib/analytics/types';
import type { ForecastResult } from '../lib/analytics/types';

export function useForecast(reports: readonly AnalyticsReport[]): ForecastResult {
  return useMemo(
    () => forecastReports(reports.map((r) => r.createdAt)),
    [reports]
  );
}
