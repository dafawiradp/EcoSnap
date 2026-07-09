import { PollutionCategory } from '../../types/taxonomy';
import { phrases } from '../dictionaries/phrases';

export function detectCategory(tokens: string[]): PollutionCategory {
  for (const [category, keywords] of Object.entries(phrases.categories)) {
    if (tokens.some(token => keywords.includes(token))) {
      return category as PollutionCategory;
    }
  }
  return 'other';
}
