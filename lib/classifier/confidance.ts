export function calculateConfidence(tokens: string[], urgency: number): number {
  const baseConfidence = Math.min(urgency, 100);
  const lengthBoost = tokens.length < 5 ? 10 : 0; // Boost for short inputs
  return Math.min(baseConfidence + lengthBoost, 100);
}
