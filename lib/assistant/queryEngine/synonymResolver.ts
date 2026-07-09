import { SynonymMap } from './types';

const synonymMap: SynonymMap = {
  trash: 'waste',
  garbage: 'waste',
  litter: 'waste',
  smog: 'air pollution',
  bottles: 'plastic',
  chemical: 'chemical',
  oil: 'oil',
};

export function resolveSynonyms(term: string): string {
  return synonymMap[term.toLowerCase()] || term;
}
