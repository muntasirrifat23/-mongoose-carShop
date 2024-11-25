import { Model } from 'mongoose';

export type Orders = {
  email: string;
  car: string;
  quantity: number;
  totalPrice: number;
};

export type orderInterface = Model<Orders>;
