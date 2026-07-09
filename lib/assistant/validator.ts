import { ParsedQuery } from './types';

export function validateQuery(parsedQuery: ParsedQuery): boolean {
  return !!parsedQuery.date || !!parsedQuery.location;
}
