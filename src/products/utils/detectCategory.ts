import type { ProductCategory } from '../../generated/prisma/enums';

export function detectCategory(title: string): ProductCategory | undefined {
  const normalized = title.toLowerCase().replace(/\s+/g, ' ').trim();

  // =========================
  // SMARTPHONE
  // =========================

  if (
    /\biphone\b/i.test(normalized) ||
    /\bgalaxy\s+(?:s|a|m)\d+/i.test(normalized) ||
    /\bgalaxy\s+(?:z\s+)?(?:fold|flip)/i.test(normalized) ||
    /\bredmi\b/i.test(normalized) ||
    /\bpoco\b/i.test(normalized) ||
    /\bzenfone\b/i.test(normalized) ||
    /\brog\s+phone\b/i.test(normalized)
  ) {
    return 'SMARTPHONE';
  }

  // =========================
  // TABLET
  // =========================

  if (
    /\bipad\b/i.test(normalized) ||
    /\bgalaxy\s+tab\b/i.test(normalized) ||
    /\btablet\b/i.test(normalized)
  ) {
    return 'TABLET';
  }

  // =========================
  // NOTEBOOK
  // =========================

  if (
    /\bmacbook\b/i.test(normalized) ||
    /\bnotebook\b/i.test(normalized) ||
    /\blaptop\b/i.test(normalized) ||
    /\bthinkpad\b/i.test(normalized) ||
    /\bideapad\b/i.test(normalized) ||
    /\binspiron\b/i.test(normalized) ||
    /\bxps\b/i.test(normalized) ||
    /\bvostro\b/i.test(normalized) ||
    /\blatitude\b/i.test(normalized) ||
    /\bpavilion\b/i.test(normalized) ||
    /\benvy\b/i.test(normalized) ||
    /\bvictus\b/i.test(normalized) ||
    /\baspire\b/i.test(normalized) ||
    /\bnitro\b/i.test(normalized) ||
    /\bpredator\b/i.test(normalized) ||
    /\blegion\b/i.test(normalized)
  ) {
    return 'NOTEBOOK';
  }

  // =========================
  // SMARTWATCH
  // =========================

  if (
    /\bapple\s+watch\b/i.test(normalized) ||
    /\bgalaxy\s+watch\b/i.test(normalized) ||
    /\bsmartwatch\b/i.test(normalized)
  ) {
    return 'SMARTWATCH';
  }

  // =========================
  // HEADPHONE
  // =========================

  if (
    /\bairpods\b/i.test(normalized) ||
    /\bgalaxy\s+buds\b/i.test(normalized) ||
    /\bfone\s+de\s+ouvido\b/i.test(normalized) ||
    /\bfone\s+bluetooth\b/i.test(normalized) ||
    /\bheadphone\b/i.test(normalized) ||
    /\bheadset\b/i.test(normalized) ||
    /\bearbuds\b/i.test(normalized)
  ) {
    return 'HEADPHONE';
  }

  // =========================
  // ACCESSORY
  // =========================

  if (
    /\bcase\b/i.test(normalized) ||
    /\bcapa\b/i.test(normalized) ||
    /\bpelícula\b/i.test(normalized) ||
    /\bpelicula\b/i.test(normalized) ||
    /\bcarregador\b/i.test(normalized) ||
    /\bcabo\b/i.test(normalized) ||
    /\badaptador\b/i.test(normalized) ||
    /\bsuporte\b/i.test(normalized) ||
    /\bmouse\b/i.test(normalized) ||
    /\bteclado\b/i.test(normalized)
  ) {
    return 'ACCESSORY';
  }

  return undefined;
}
