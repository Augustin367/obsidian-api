import z from 'zod';
import { baseProductSchema } from './base-product.schema';

export const createProductSchema = baseProductSchema.refine(
  (data) => data.type !== 'SMARTPHONE' || !!data.memory,
  {
    message: 'memory is required when type is SMARTPHONE',
    path: ['memory'],
  },
);

export type CreateProductDto = z.infer<typeof createProductSchema>;
