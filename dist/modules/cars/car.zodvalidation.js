"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCar = void 0;
/* eslint-disable prettier/prettier */
const zod_1 = require("zod");
const carValidationSchema = zod_1.z.object({
    brand: zod_1.z.string().min(1, { message: 'Brand is required' }),
    model: zod_1.z.string().min(1, { message: 'Model is required' }),
    year: zod_1.z
        .number()
        .int()
        .positive({ message: 'Year must be a positive integer' }),
    price: zod_1.z.number().positive({ message: 'Price must be a positive number' }),
    category: zod_1.z.enum(['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible']),
    description: zod_1.z.string().optional(),
    quantity: zod_1.z
        .number()
        .int()
        .nonnegative({ message: 'Quantity must be a non-negative integer' }),
    inStock: zod_1.z.boolean().optional(),
});
const validateCar = (data) => carValidationSchema.safeParse(data);
exports.validateCar = validateCar;
exports.default = carValidationSchema;
