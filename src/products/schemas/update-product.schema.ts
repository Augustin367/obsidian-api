import z from 'zod';
import { productSchema } from './product.schema';

export const UpdateProductSchema = productSchema.partial();

export type UpdateProductInput = z.infer<typeof UpdateProductSchema>;
