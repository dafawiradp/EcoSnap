import { createClient } from '@supabase/supabase-js';
import { QueryPlan } from './types';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

export async function executeQuery(plan: QueryPlan): Promise<any[]> {
  let query = supabase.from(plan.table).select('*');

  for (const [key, value] of Object.entries(plan.filters)) {
    query = query.eq(key, value);
  }

  if (plan.orderBy) {
    query = query.order(plan.orderBy, { ascending: plan.orderDirection === 'asc' });
  }

  if (plan.limit) {
    query = query.limit(plan.limit);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Supabase query failed: ${error.message}`);
  }

  return data || [];
}
