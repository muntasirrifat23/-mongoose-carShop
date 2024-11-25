import { model, Schema } from 'mongoose';
import { Orders } from './order.interface';

const orderSchema = new Schema<Orders>(
  {
    email: { type: String, required: true },
    car: { type: String, required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

export const OrdersModel = model<Orders>('Orders', orderSchema);
