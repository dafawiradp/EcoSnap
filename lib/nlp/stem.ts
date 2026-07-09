export function stemTokens(tokens: string[]): string[] {
  return tokens.map(token => token.replace(/(ing|ed|s)$/, ''));
}
