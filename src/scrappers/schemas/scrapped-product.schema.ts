import z from 'zod';

export const ScrappedProductSchema = z.object({
  title: z.string(),
  originalPrice: z.number(),
  sourceUrl: z.string().url(),
  color: z.string().optional(),
  ram: z.string().optional(),
  storage: z.string().optional(),
  imageUrl: z.string().url().optional(),
  images: z.array(z.string().url()).default([]),
  source: z.enum(['AMAZON', 'SHOPEE', 'MERCADOLIVRE']),
});

export type ScrappedProductType = z.infer<typeof ScrappedProductSchema>;
