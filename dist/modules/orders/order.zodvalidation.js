"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const orderValidationSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .min(1, { message: 'Email is required' })
        .email({ message: 'Email must be a valid email address' }),
    car: zod_1.z
        .string()
        .min(1, { message: 'Car id required' })
        .regex(/^[a-zA-Z0-9\s]+$/, {
        message: 'Give me proper car id',
    }),
    quantity: zod_1.z
        .number()
        .int({ message: 'Quantity must be integer' })
        .min(1, { message: 'Quantity at least 1' }),
    totalPrice: zod_1.z.number().min(0, { message: 'Total Price positive number' }),
});
exports.default = orderValidationSchema;
