import { phrases } from '../dictionaries/phrases';

export function detectPhrases(tokens: string[]): string[] {
  return tokens.filter(token => phrases.keywords.includes(token));
}
