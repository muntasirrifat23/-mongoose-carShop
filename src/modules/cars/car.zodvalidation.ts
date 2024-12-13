/* eslint-disable prettier/prettier */
import { z } from 'zod';

const carValidationSchema = z.object({
  brand: z.string().min(1, { message: 'Brand is required' }),
  model: z.string().min(1, { message: 'Model is required' }),
  year: z
    .number()
    .int()
    .positive({ message: 'Year must be a positive integer' }),
  price: z.number().positive({ message: 'Price must be a positive number' }),
  category: z.string().min(1, { message: 'Category is required' }),
  description: z.string().optional(),
  quantity: z
    .number()
    .int()
    .nonnegative({ message: 'Quantity must be a non-negative integer' }),
  inStock: z.boolean().optional(),
});
export const validateCar = (data: unknown) =>
  carValidationSchema.safeParse(data);

export default carValidationSchema;
