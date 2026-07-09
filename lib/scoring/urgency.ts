import { UrgencyScore } from '../../types/classifier';

export function scoreKeywords(tokens: string[], category: string): UrgencyScore {
  let score = 0;
  tokens.forEach(token => {
    if (category.includes(token)) {
      score += 10;
    }
  });
  return Math.min(score, 100);
}
