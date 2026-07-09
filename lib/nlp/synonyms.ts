import { synonyms } from '../dictionaries/synonyms';

export function replaceSynonyms(tokens: string[]): string[] {
  return tokens.map(token => synonyms[token] || token);
}
