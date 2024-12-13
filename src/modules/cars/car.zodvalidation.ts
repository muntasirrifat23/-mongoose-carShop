/* eslint-disable prettier/prettier */
import { z } from 'zod';

const carValidationSchema = z.object({
  _id: z
    .string()
    .min(1, { message: 'Id is required' })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: 'Please give valid id',
    })
    .optional(),
  brand: z
    .string()
    .min(1, { message: 'Brand is required' })
    .regex(/^[a-zA-Z\s]+$/, {
      message: 'Give brand as string',
    }),
  model: z
    .string()
    .min(1, { message: 'Model is required' })
    .regex(/^[a-zA-Z0-9\s]+$/, {
      message: 'Give model as string',
    }),
  year: z
    .number()
    .int()
    .min(1990, { message: 'Year must be 1990 or later' })
    .max(new Date().getFullYear(), {
      message: `Year cannot over ${new Date().getFullYear()}`,
    }),
  price: z.number().min(0, { message: 'Price positive number' }),
  category: z.enum(['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'], {
    errorMap: () => ({
      message: 'Category must be one of Sedan, SUV, Truck, Coupe, Convertible',
    }),
  }),
  description: z.string().min(1, { message: 'Description required' }),
  quantity: z.number().int().min(0, { message: 'Quantity positive integer' }),
  inStock: z.boolean({
    errorMap: () => ({
      message: 'InStock boolean value',
    }),
  }),
});

export const validateCar = (data: unknown) =>
  carValidationSchema.safeParse(data);

export default carValidationSchema;
