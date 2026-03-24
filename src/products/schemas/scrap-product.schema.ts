import z from 'zod';

export const ScrapProductSchema = z.object({
  title: z.string().optional(),
  color: z.string().optional(),
  memory: z.string().optional(),
  imageUrl: z.string().optional(),
  productUrl: z.string().optional(),
  source: z.enum(['amazon']).optional(),
  price: z.number().positive().optional(),
});

export type ScrapProductDto = z.infer<typeof ScrapProductSchema>;
