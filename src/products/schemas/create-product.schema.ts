import z from 'zod';
import { productSchema } from './product.schema';

export const createProductSchema = productSchema;

export type CreateProductType = z.infer<typeof createProductSchema>;
