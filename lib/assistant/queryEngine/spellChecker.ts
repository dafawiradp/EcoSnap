import Fuse from 'fuse.js';

const dictionary = [
  'plastic', 'organic', 'paper', 'glass', 'metal', 'electronic', 'chemical', 'medical', 'oil', 'construction', 'mixed',
  'air pollution', 'water pollution', 'soil pollution', 'waste pollution', 'noise pollution', 'light pollution',
  'thermal pollution', 'visual pollution', 'electromagnetic pollution', 'bandung', 'jakarta', 'province', 'city', 'country',
];

export function correctSpelling(term: string): string {
  const fuse = new Fuse(dictionary, { threshold: 0.3 });
  const result = fuse.search(term);
  return result.length > 0 ? result[0].item : term;
}
