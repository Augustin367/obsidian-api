// Back

import * as cheerio from 'cheerio';

import { apiClient } from '../http/api-client.js';
import { normalizeUrl } from '../utils/normalize-url.js';

import {
  ScrappedProductSchema,
  type ScrappedProductType,
} from '../schemas/scrapped-product.schema.js';

export async function scrapeAmazon(url: string): Promise<ScrappedProductType> {
  const response = await apiClient.get(url);

  if (
    typeof response.data === 'string' &&
    response.data.includes('Type the characters you see')
  ) {
    throw new Error('Amazon bloqueou o scrapping (CAPTCHA)');
  }

  const $ = cheerio.load(response.data);

  const rawTitle = $('#productTitle').text().trim();

  if (!rawTitle) {
    throw new Error('Título do produto não encontrado');
  }

  const whole = $('#apex-pricetopay-value .a-price-whole')
    .first()
    .text()
    .replace(/\./g, '')
    .trim();

  const fraction = $('#apex-pricetopay-value .a-price-fraction')
    .first()
    .text()
    .trim();

  const rawPriceText = $('#apex-pricetopay-accessibility-label')
    .first()
    .text()
    .trim();

  let originalPrice: number;

  if (rawPriceText) {
    originalPrice = Number(
      rawPriceText.replace(/[^\d,]/g, '').replace(',', '.'),
    );
  } else if (whole && fraction) {
    originalPrice = Number(`${whole}.${fraction}`);
  } else {
    throw new Error('Preço não encontrado no HTML da Amazon');
  }

  if (Number.isNaN(originalPrice) || originalPrice <= 0) {
    throw new Error('Preço inválido após parsing');
  }

  originalPrice = Math.round(originalPrice * 100) / 100;

  const specifications = new Map<string, string>();

  $('tr').each((_, element) => {
    const key = $(element).find('td').first().text().trim().toLowerCase();

    const value = $(element).find('td').last().text().trim();

    if (key && value) {
      specifications.set(key, value);
    }
  });

  const getSpecification = (...keys: string[]): string | undefined => {
    for (const key of keys) {
      for (const [currentKey, value] of specifications) {
        if (currentKey.includes(key.toLowerCase())) {
          return value;
        }
      }
    }

    return undefined;
  };

  const capacityRegex = /\d+(?:[.,]\d+)?\s*(?:GB|TB)/i;

  const extractSelectedDimension = (dimension: string): string | undefined => {
    const selector = `#inline-twister-expanded-dimension-text-${dimension}`;

    return $(selector).first().text().trim() || undefined;
  };

  const ramRaw = getSpecification(
    'tamanho instalado da memória ram',
    'ram memory',
    'memória ram',
  );

  const ramMatch = ramRaw?.match(/\d+(?:[.,]\d+)?\s*(?:GB|TB)/i);

  const ram = ramMatch ? ramMatch[0].replace(/\s+/g, '') : undefined;

  const style = extractSelectedDimension('style_name');
  const color = extractSelectedDimension('color_name');

  const extractCapacity = (): string | undefined => {
    const storageRaw = getSpecification(
      'capacidade de armazenamento de memória',
      'capacidade de armazenamento',
      'memory storage capacity',
      'armazenamento',
    );

    const tableMatch = storageRaw?.match(capacityRegex);

    if (tableMatch) {
      return tableMatch[0].replace(/\s+/g, '');
    }

    const styleMatch = style?.match(capacityRegex);

    if (styleMatch) {
      return styleMatch[0].replace(/\s+/g, '');
    }

    const twisterValues = $('.swatch-title-text-display');

    for (const element of twisterValues) {
      const text = $(element).text().trim();

      const match = text.match(capacityRegex);

      if (match) {
        return match[0].replace(/\s+/g, '');
      }
    }

    return undefined;
  };

  const storage = extractCapacity();

  const extractImages = (): string[] => {
    const images: string[] = [];

    const dynamicImageData = $('#imgTagWrapperId img').attr(
      'data-a-dynamic-image',
    );

    if (dynamicImageData) {
      try {
        const parsed = JSON.parse(dynamicImageData) as Record<
          string,
          [number, number]
        >;

        images.push(...Object.keys(parsed).filter(Boolean));
      } catch (error) {
        console.error('[SCRAP] Erro ao parsear data-a-dynamic-image:', error);
      }
    }

    const mainImage =
      $('#landingImage').attr('src') ?? $('#imgTagWrapperId img').attr('src');

    if (mainImage) {
      images.push(mainImage);
    }

    if (images.length === 0) {
      $('ul[aria-label="Miniaturas de imagem"] li.imageThumbnail img').each(
        (_, element) => {
          const src = $(element).attr('src');

          if (src) {
            images.push(src);
          }
        },
      );
    }

    return [...new Set(images)];
  };

  const images = extractImages();

  const imageUrl =
    $('#landingImage').attr('src') ??
    $('#imgTagWrapperId img').attr('src') ??
    images[0];

  const result = {
    ram,
    color,
    images,
    storage,
    imageUrl,
    originalPrice,
    title: rawTitle,
    source: 'AMAZON',
    sourceUrl: normalizeUrl(url),
  };

  console.log('Resultado do Scrap:', result);

  return ScrappedProductSchema.parse(result);
}
