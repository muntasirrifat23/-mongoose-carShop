"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCar = void 0;
const zod_1 = require("zod");
const carValidationSchema = zod_1.z.object({
    _id: zod_1.z
        .string()
        .min(1, { message: 'Id is required' })
        .regex(/^[a-zA-Z0-9]+$/, {
        message: 'Please give valid id',
    }),
    brand: zod_1.z
        .string()
        .min(1, { message: 'Brand is required' })
        .regex(/^[a-zA-Z\s]+$/, {
        message: 'Give brand as string',
    }),
    model: zod_1.z
        .string()
        .min(1, { message: 'Model is required' })
        .regex(/^[a-zA-Z0-9\s]+$/, {
        message: 'Give model as string',
    }),
    year: zod_1.z
        .number()
        .int()
        .min(1990, { message: 'Year must be 1990 or later' })
        .max(new Date().getFullYear(), {
        message: `Year cannot over ${new Date().getFullYear()}`,
    }),
    price: zod_1.z.number().min(0, { message: 'Price positive number' }),
    category: zod_1.z.enum(['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'], {
        errorMap: () => ({
            message: 'Category must be one of Sedan, SUV, Truck, Coupe, Convertible',
        }),
    }),
    description: zod_1.z.string().min(1, { message: 'Description required' }),
    quantity: zod_1.z.number().int().min(0, { message: 'Quantity positive integer' }),
    inStock: zod_1.z.boolean({
        errorMap: () => ({
            message: 'InStock boolean value',
        }),
    }),
});
const validateCar = (data) => carValidationSchema.safeParse(data);
exports.validateCar = validateCar;
exports.default = carValidationSchema;
