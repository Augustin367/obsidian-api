export function normalizeTitle(title: string): string {
  return title
    .trim()
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+[—-].*$/u, '')
    .replace(/\s+de\s+\d+(?:[.,]\d+)?\s?(?:GB|TB)\b/gi, '')
    .replace(/^apple\s+/i, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}
