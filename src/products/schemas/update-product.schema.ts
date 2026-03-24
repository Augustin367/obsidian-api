import z from 'zod';
import { baseProductSchema } from './base-product.schema';

export const UpdateProductSchema = baseProductSchema.partial();

export type UpdateProductDto = z.infer<typeof UpdateProductSchema>;
