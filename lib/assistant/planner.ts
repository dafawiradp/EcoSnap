import { ParsedQuery, QueryPlan } from './types';

export function planQuery(parsedQuery: ParsedQuery): QueryPlan {
  const filters: Record<string, string | number> = {};

  if (parsedQuery.date) {
    filters.date = parsedQuery.date;
  }

  if (parsedQuery.location) {
    filters.location = parsedQuery.location;
  }

  return {
    table: 'reports',
    filters,
    limit: 100,
    orderBy: 'timestamp',
    orderDirection: 'desc',
  };
}
