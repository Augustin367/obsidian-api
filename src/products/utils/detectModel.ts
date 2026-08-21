import { BadRequestException } from '@nestjs/common';

export function detectModel(title: string): string | undefined {
  const normalized = title.toLowerCase().replace(/\s+/g, ' ').trim();

  const iphoneMatch = normalized.match(
    /\biphone\s+(\d+(?:\s+(?:pro|max|plus|mini))*)\b/i,
  );

  if (iphoneMatch) {
    return iphoneMatch[1].replace(/\s+/g, ' ').trim();
  }

  return undefined;
}
