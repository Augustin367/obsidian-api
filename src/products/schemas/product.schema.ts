import z from 'zod';

export const productSchema = z.object({
  title: z.string().min(1),
  family: z.string().min(1).optional(),

  ram: z.string().optional(),
  color: z.string().optional(),
  storage: z.string().optional(),
  description: z.string().optional(),

  sourceUrl: z.string().url(),

  model: z.string().min(1).optional(),

  imageUrl: z.string().url().optional(),
  images: z.array(z.string().url()).default([]),

  originalPrice: z.number().positive(),
  profit: z.number().nonnegative(),

  brand: z.enum(['APPLE', 'SAMSUNG']).optional(),
  source: z.enum(['AMAZON', 'SHOPEE', 'MERCADOLIVRE']),
  category: z
    .enum([
      'TABLET',
      'NOTEBOOK',
      'HEADPHONE',
      'ACCESSORY',
      'SMARTPHONE',
      'SMARTWATCH',
    ])
    .optional(),

  metadata: z.record(z.string(), z.any()).optional(),
});
