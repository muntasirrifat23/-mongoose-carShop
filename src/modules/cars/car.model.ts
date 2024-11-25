import { model, Schema } from 'mongoose';
import { Cars } from './car.interface';

const carSchema = new Schema<Cars>(
  {
    _id: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'],
      required: true,
    },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true, default: true },
  },
  {
    timestamps: true,
  },
);

export const CarsModel = model<Cars>('Car', carSchema);
