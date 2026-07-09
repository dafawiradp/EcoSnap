import { QueryPlan, ParsedEntities } from './types';

export function generateQuery(entities: ParsedEntities): QueryPlan {
  const filters: Record<string, string | number> = {};

  if (entities.category) {
    filters.category = entities.category;
  }

  if (entities.wasteType) {
    filters.wasteType = entities.wasteType;
  }

  if (entities.location) {
    filters.location = entities.location;
  }

  if (entities.date) {
    const dateRange = parseDate(entities.date);
    filters.timestamp = `gte.${dateRange.start},lte.${dateRange.end}`;
  }

  return {
    table: 'reports',
    filters,
    limit: 100,
    orderBy: 'timestamp',
    orderDirection: 'desc',
  };
}
