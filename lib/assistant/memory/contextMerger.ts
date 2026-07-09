import { ParsedEntities, MemoryEntry } from '../queryEngine/types';

export function mergeContext(currentEntities: ParsedEntities, lastUserQuery: MemoryEntry | null): ParsedEntities {
  if (!lastUserQuery) return currentEntities;

  const mergedEntities: ParsedEntities = { ...currentEntities };

  // Merge missing entities from the last query
  if (!mergedEntities.category && lastUserQuery.entities.category) {
    mergedEntities.category = lastUserQuery.entities.category;
  }
  if (!mergedEntities.wasteType && lastUserQuery.entities.wasteType) {
    mergedEntities.wasteType = lastUserQuery.entities.wasteType;
  }
  if (!mergedEntities.location && lastUserQuery.entities.location) {
    mergedEntities.location = lastUserQuery.entities.location;
  }
  if (!mergedEntities.date && lastUserQuery.entities.date) {
    mergedEntities.date = lastUserQuery.entities.date;
  }

  return mergedEntities;
}
