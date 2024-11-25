import { z } from 'zod';

const carValidationSchema = z.object({
  _id: z
    .string()
    .min(1, { message: 'Id is required' })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: 'Id must be a valid alphanumeric string',
    }),
  brand: z
    .string()
    .min(1, { message: 'Brand is required' })
    .regex(/^[a-zA-Z\s]+$/, {
      message: 'Brand must only contain letters and spaces',
    }),
  model: z
    .string()
    .min(1, { message: 'Model is required' })
    .regex(/^[a-zA-Z0-9\s]+$/, {
      message: 'Model must only contain alphanumeric characters and spaces',
    }),
  year: z
    .number()
    .int()
    .min(1990, { message: 'Year must be 1990 or later' })
    .max(new Date().getFullYear(), {
      message: `Year cannot exceed ${new Date().getFullYear()}`,
    }),
  price: z.number().min(0, { message: 'Price must be a positive number' }),
  category: z.enum(['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'], {
    errorMap: () => ({
      message: 'Category must be one of Sedan, SUV, Truck, Coupe, Convertible',
    }),
  }),
  description: z.string().min(1, { message: 'Description is required' }),
  quantity: z
    .number()
    .int()
    .min(0, { message: 'Quantity must be a non-negative integer' }),
  inStock: z.boolean({
    errorMap: () => ({
      message: 'InStock must be a boolean value',
    }),
  }),
});

export const validateCar = (data: unknown) =>
  carValidationSchema.safeParse(data);

export default carValidationSchema;
