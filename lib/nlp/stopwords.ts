import { stopwords } from '../dictionaries/stopwords';

export function removeStopwords(tokens: string[]): string[] {
  return tokens.filter(token => !stopwords.includes(token));
}
