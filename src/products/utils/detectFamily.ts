import { BadRequestException } from '@nestjs/common';

export function detectFamily(title: string): string | undefined {
  const normalized = title.toLowerCase().replace(/\s+/g, ' ').trim();

  const patterns: Array<{
    pattern: RegExp;
    family: string;
  }> = [
    // =========================
    // APPLE
    // =========================

    {
      pattern: /\biphone\b/i,
      family: 'iPhone',
    },

    {
      pattern: /\bipad\s+pro\b/i,
      family: 'iPad Pro',
    },
    {
      pattern: /\bipad\s+air\b/i,
      family: 'iPad Air',
    },
    {
      pattern: /\bipad\s+mini\b/i,
      family: 'iPad mini',
    },
    {
      pattern: /\bipad\b/i,
      family: 'iPad',
    },

    {
      pattern: /\bmacbook\s+air\b/i,
      family: 'MacBook Air',
    },
    {
      pattern: /\bmacbook\s+pro\b/i,
      family: 'MacBook Pro',
    },
    {
      pattern: /\bmacbook\s+neo\b/i,
      family: 'MacBook Neo',
    },
    {
      pattern: /\bmacbook\b/i,
      family: 'MacBook',
    },

    {
      pattern: /\bapple\s+watch\s+ultra\b/i,
      family: 'Apple Watch Ultra',
    },
    {
      pattern: /\bapple\s+watch\s+series\b/i,
      family: 'Apple Watch Series',
    },
    {
      pattern: /\bapple\s+watch\s+se\b/i,
      family: 'Apple Watch SE',
    },
    {
      pattern: /\bapple\s+watch\b/i,
      family: 'Apple Watch',
    },

    {
      pattern: /\bairpods\s+pro\b/i,
      family: 'AirPods Pro',
    },
    {
      pattern: /\bairpods\s+max\b/i,
      family: 'AirPods Max',
    },
    {
      pattern: /\bairpods\b/i,
      family: 'AirPods',
    },

    // =========================
    // SAMSUNG
    // =========================

    {
      pattern: /\bgalaxy\s+s\d+/i,
      family: 'Galaxy S',
    },
    {
      pattern: /\bgalaxy\s+a\d+/i,
      family: 'Galaxy A',
    },
    {
      pattern: /\bgalaxy\s+m\d+/i,
      family: 'Galaxy M',
    },
    {
      pattern: /\bgalaxy\s+z\s+(?:fold|flip)/i,
      family: 'Galaxy Z',
    },
    {
      pattern: /\bgalaxy\s+tab\b/i,
      family: 'Galaxy Tab',
    },
    {
      pattern: /\bgalaxy\s+watch\b/i,
      family: 'Galaxy Watch',
    },
    {
      pattern: /\bgalaxy\s+buds\b/i,
      family: 'Galaxy Buds',
    },

    // =========================
    // XIAOMI
    // =========================

    {
      pattern: /\bredmi\s+note\b/i,
      family: 'Redmi Note',
    },
    {
      pattern: /\bredmi\b/i,
      family: 'Redmi',
    },
    {
      pattern: /\bpoco\b/i,
      family: 'POCO',
    },
    {
      pattern: /\bxiaomi\b/i,
      family: 'Xiaomi',
    },

    // =========================
    // ASUS
    // =========================

    {
      pattern: /\brog\s+phone\b/i,
      family: 'ROG Phone',
    },
    {
      pattern: /\bzenfone\b/i,
      family: 'Zenfone',
    },

    // =========================
    // LENOVO
    // =========================

    {
      pattern: /\bthinkpad\b/i,
      family: 'ThinkPad',
    },
    {
      pattern: /\bideapad\b/i,
      family: 'IdeaPad',
    },
    {
      pattern: /\blegion\b/i,
      family: 'Legion',
    },

    // =========================
    // ACER
    // =========================

    {
      pattern: /\baspire\b/i,
      family: 'Aspire',
    },
    {
      pattern: /\bnitro\b/i,
      family: 'Nitro',
    },
    {
      pattern: /\bswift\b/i,
      family: 'Swift',
    },
    {
      pattern: /\bpredator\b/i,
      family: 'Predator',
    },
  ];

  for (const { pattern, family } of patterns) {
    if (pattern.test(normalized)) {
      return family;
    }
  }

  return undefined;
}
