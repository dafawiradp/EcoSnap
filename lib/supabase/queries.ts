import type { SupabaseClient } from '@supabase/supabase-js';
import type { PollutionCategory, WasteType } from '../../types/taxonomy';
import type { AnalyticsReport } from '../analytics/types';

export interface ReportRow {
  id: string;
  description: string;
  category: string;
  waste_type: string;
  urgency: number;
  confidence: number;
  created_at: string;
  location: string;
  province: string;
  city: string;
}

function toAnalyticsReport(row: ReportRow): AnalyticsReport {
  return {
    id: row.id,
    description: row.description,
    category: row.category as PollutionCategory,
    wasteType: row.waste_type as WasteType,
    urgency: row.urgency,
    confidence: row.confidence,
    createdAt: row.created_at,
    location: row.location,
    province: row.province,
    city: row.city,
  };
}

/** Fetch all reports with optional filters */
export async function fetchReports(
  client: SupabaseClient,
  options: {
    category?: PollutionCategory;
    province?: string;
    city?: string;
    minUrgency?: number;
    startDate?: string;
    endDate?: string;
    limit?: number;
  } = {}
): Promise<AnalyticsReport[]> {
  let query = client
    .from('reports')
    .select('id,description,category,waste_type,urgency,confidence,created_at,location,province,city')
    .order('created_at', { ascending: false });

  if (options.category) query = query.eq('category', options.category);
  if (options.province) query = query.eq('province', options.province);
  if (options.city) query = query.eq('city', options.city);
  if (options.minUrgency !== undefined) query = query.gte('urgency', options.minUrgency);
  if (options.startDate) query = query.gte('created_at', options.startDate);
  if (options.endDate) query = query.lte('created_at', options.endDate);
  if (options.limit) query = query.limit(options.limit);

  const { data, error } = await query;

  if (error) throw new Error(`Supabase query failed: ${error.message}`);

  return (data as ReportRow[]).map(toAnalyticsReport);
}

/** Fetch report count grouped by category */
export async function fetchCategoryCount(
  client: SupabaseClient,
  startDate: string,
  endDate: string
): Promise<Record<string, number>> {
  const { data, error } = await client
    .from('reports')
    .select('category')
    .gte('created_at', startDate)
    .lte('created_at', endDate);

  if (error) throw new Error(`Supabase query failed: ${error.message}`);

  return (data as { category: string }[]).reduce<Record<string, number>>((acc, row) => {
    acc[row.category] = (acc[row.category] ?? 0) + 1;
    return acc;
  }, {});
}

/** Fetch daily report counts for trend analysis */
export async function fetchDailyCounts(
  client: SupabaseClient,
  days: number
): Promise<{ date: string; count: number }[]> {
  const since = new Date();
  since.setDate(since.getDate() - days);

  const { data, error } = await client
    .from('reports')
    .select('created_at')
    .gte('created_at', since.toISOString())
    .order('created_at', { ascending: true });

  if (error) throw new Error(`Supabase query failed: ${error.message}`);

  const counts: Record<string, number> = {};

  (data as { created_at: string }[]).forEach((row) => {
    const date = row.created_at.split('T')[0];
    counts[date] = (counts[date] ?? 0) + 1;
  });

  return Object.entries(counts).map(([date, count]) => ({ date, count }));
}

/** Fetch top provinces by report count */
export async function fetchTopProvinces(
  client: SupabaseClient,
  limit = 10
): Promise<{ province: string; count: number; avgUrgency: number }[]> {
  const { data, error } = await client
    .from('reports')
    .select('province,urgency')
    .not('province', 'is', null)
    .limit(1000);

  if (error) throw new Error(`Supabase query failed: ${error.message}`);

  const provinceMap = new Map<string, { count: number; totalUrgency: number }>();

  (data as { province: string; urgency: number }[]).forEach((row) => {
    const existing = provinceMap.get(row.province) ?? { count: 0, totalUrgency: 0 };
    provinceMap.set(row.province, {
      count: existing.count + 1,
      totalUrgency: existing.totalUrgency + row.urgency,
    });
  });

  return Array.from(provinceMap.entries())
    .map(([province, { count, totalUrgency }]) => ({
      province,
      count,
      avgUrgency: totalUrgency / count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}
