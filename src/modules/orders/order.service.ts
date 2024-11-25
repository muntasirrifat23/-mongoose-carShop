// import mongoose from 'mongoose';
import { CarsModel } from '../cars/car.model';
import { OrdersModel } from './order.model';
import { Orders } from './order.interface';

const createOrderIntoDb = async (orderData: Orders) => {
  const { email, car, quantity, totalPrice } = orderData;
  const carData = await CarsModel.findOne({ _id: car });

  if (!carData) {
    throw new Error('Car not found in the database');
  }
  if (carData.quantity < quantity) {
    return { success: false, message: 'Not enough stock available' };
  }

  // Create new order
  const order = new OrdersModel({ email, car, quantity, totalPrice });

  // Reducing stock quantity for cars after orders
  carData.quantity -= quantity;

  // If stock is zero then inStock is false
  if (carData.quantity === 0) {
    carData.inStock = false;
  }

  await carData.save();
  const savedOrder = await order.save();

  const findCarOrder = await OrdersModel.findById(savedOrder._id).populate(
    'car',
  );

  return { success: true, data: findCarOrder };
};

export const orderServices = { createOrderIntoDb };
