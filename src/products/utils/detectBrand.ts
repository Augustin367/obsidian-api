export function detectBrand(title: string): string | undefined {
  const normalized = title.toLowerCase().replace(/\s+/g, ' ').trim();

  const brands: Array<{
    pattern: RegExp;
    brand: string;
  }> = [
    // =========================
    // APPLE
    // =========================

    {
      pattern: /\bapple\b/i,
      brand: 'APPLE',
    },
    {
      pattern: /\biphone\b/i,
      brand: 'APPLE',
    },
    {
      pattern: /\bipad\b/i,
      brand: 'APPLE',
    },
    {
      pattern: /\bmacbook\b/i,
      brand: 'APPLE',
    },
    {
      pattern: /\bairpods\b/i,
      brand: 'APPLE',
    },
    {
      pattern: /\bapple\s+watch\b/i,
      brand: 'APPLE',
    },

    // =========================
    // SAMSUNG
    // =========================

    {
      pattern: /\bsamsung\b/i,
      brand: 'SAMSUNG',
    },
    {
      pattern: /\bgalaxy\b/i,
      brand: 'SAMSUNG',
    },

    // =========================
    // XIAOMI / POCO / REDMI
    // =========================

    {
      pattern: /\bxiaomi\b/i,
      brand: 'XIAOMI',
    },
    {
      pattern: /\bredmi\b/i,
      brand: 'REDMI',
    },
    {
      pattern: /\bpoco\b/i,
      brand: 'POCO',
    },

    // =========================
    // ASUS
    // =========================

    {
      pattern: /\basus\b/i,
      brand: 'ASUS',
    },
    {
      pattern: /\brog\s+phone\b/i,
      brand: 'ASUS',
    },
    {
      pattern: /\bzenfone\b/i,
      brand: 'ASUS',
    },

    // =========================
    // LENOVO
    // =========================

    {
      pattern: /\blenovo\b/i,
      brand: 'LENOVO',
    },
    {
      pattern: /\bthinkpad\b/i,
      brand: 'LENOVO',
    },
    {
      pattern: /\bideapad\b/i,
      brand: 'LENOVO',
    },
    {
      pattern: /\blegion\b/i,
      brand: 'LENOVO',
    },

    // =========================
    // ACER
    // =========================

    {
      pattern: /\bacer\b/i,
      brand: 'ACER',
    },
    {
      pattern: /\baspire\b/i,
      brand: 'ACER',
    },
    {
      pattern: /\bnitro\b/i,
      brand: 'ACER',
    },
    {
      pattern: /\bpredator\b/i,
      brand: 'ACER',
    },
    {
      pattern: /\bswift\b/i,
      brand: 'ACER',
    },
  ];

  for (const { pattern, brand } of brands) {
    if (pattern.test(normalized)) {
      return brand;
    }
  }

  return undefined;
}
