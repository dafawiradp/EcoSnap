import { WasteType } from '../../types/taxonomy';
import { phrases } from '../dictionaries/phrases';

export function detectSubtype(tokens: string[]): WasteType {
  for (const [subtype, keywords] of Object.entries(phrases.wasteTypes)) {
    if (tokens.some(token => keywords.includes(token))) {
      return subtype as WasteType;
    }
  }
  return 'other';
}
