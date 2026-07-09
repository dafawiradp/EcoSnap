import { ConfidenceScore } from '../../types/classifier';

export function calculateConfidence(tokens: string[], urgency: number): ConfidenceScore {
  const baseConfidence = Math.min(urgency, 100);
  const lengthBoost = tokens.length > 10 ? 10 : 0;
  return Math.min(baseConfidence + lengthBoost, 100);
}
