/* eslint-disable prettier/prettier */
import { Model } from 'mongoose';

export type Cars = {
  // _id?: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  category: string;
  description: string;
  quantity: number;
  inStock: boolean;
};

export type carInterface = Model<Cars>;
