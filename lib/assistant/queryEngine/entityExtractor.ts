import { ParsedEntities } from './types';

export function extractEntities(query: string): ParsedEntities {
  const categoryRegex = /(air pollution|water pollution|soil pollution|waste pollution|noise pollution|light pollution|thermal pollution|visual pollution|electromagnetic pollution)/i;
  const wasteTypeRegex = /(plastic|organic|paper|glass|metal|electronic|chemical|medical|oil|construction|mixed|other)/i;
  const locationRegex = /(bandung|jakarta|province|city|country|nearby)/i;
  const dateRegex = /(yesterday|today|this week|last week|this month|last month|this year|last year)/i;

  const categoryMatch = query.match(categoryRegex);
  const wasteTypeMatch = query.match(wasteTypeRegex);
  const locationMatch = query.match(locationRegex);
  const dateMatch = query.match(dateRegex);

  return {
    category: categoryMatch ? categoryMatch[0].toLowerCase() : null,
    wasteType: wasteTypeMatch ? wasteTypeMatch[0].toLowerCase() : null,
    location: locationMatch ? locationMatch[0].toLowerCase() : null,
    date: dateMatch ? dateMatch[0].toLowerCase() : null,
  };
}
