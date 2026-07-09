export function normalizeText(text: string): string {
  return text.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, '').trim();
}
