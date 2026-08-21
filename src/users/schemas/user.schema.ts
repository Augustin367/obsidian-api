import z from 'zod';

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().nullable().optional(),
  clerkId: z.string().nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  role: z.enum(['USER', 'ADMIN']),
});
