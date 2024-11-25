import { model, Schema } from 'mongoose';
import { Orders } from './order.interface';

const orderSchema = new Schema<Orders>(
  {
    email: { type: String, required: true },
    car: { type: String, required: true },
    quantity: { type: Number },
    totalPrice: { type: Number },
  },
  {
    timestamps: true,
  },
);

export const OrdersModel = model<Orders>('Orders', orderSchema);
