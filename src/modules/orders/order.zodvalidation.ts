import { z } from 'zod';

const orderValidationSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Email must be a valid email address' }),
  car: z
    .string()
    .min(1, { message: 'Car id required' })
    .regex(/^[a-zA-Z0-9\s]+$/, {
      message: 'Give me proper car id',
    }),
  quantity: z
    .number()
    .int({ message: 'Quantity must be integer' })
    .min(1, { message: 'Quantity at least 1' }),
  totalPrice: z.number().min(0, { message: 'Total Price positive number' }),
});

export default orderValidationSchema;
