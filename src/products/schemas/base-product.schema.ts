import z from 'zod';

export const baseProductSchema = z.object({
  title: z.string().min(1),
  userId: z.string().min(2),
  sourceUrl: z.string().url(),
  price: z.number().positive(),

  color: z.string().optional(),
  brand: z.string().optional(),
  memory: z.string().optional(),
  description: z.string().optional(),

  type: z.enum(['GENERIC', 'SMARTPHONE']),
});
