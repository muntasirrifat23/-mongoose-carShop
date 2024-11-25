// import mongoose from 'mongoose';
import { CarsModel } from '../cars/car.model';
import { OrdersModel } from './order.model';
import { Orders } from './order.interface';

// Create Order
const createOrderIntoDb = async (orderData: Orders) => {
  const { email, car, quantity, totalPrice } = orderData;
  const carData = await CarsModel.findOne({ _id: car });

  if (!carData) {
    throw new Error('Car not found in the database');
  }
  if (carData.quantity < quantity) {
    return { success: false, message: 'Not enough stock available' };
  }

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

// Revenue
const createRevenueIntoDb = async () => {
  const revenueData = await OrdersModel.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: { $multiply: ['$totalPrice', '$quantity'] } },
      },
    },
  ]);
  return revenueData.length > 0 ? revenueData[0].totalRevenue : 0;
};

// Get Orders
const getOrderIntoDb = async () => {
  const result = await OrdersModel.find();
  return result;
};

// Get Orders By ID
const getSingleOrderIntoDb = async (id: string) => {
  const result = await OrdersModel.findOne({ _id: id });
  return result;
};

// Update Order
const updateOrderIntoDb = async (id: string, data: Partial<Orders>) => {
  return await OrdersModel.findByIdAndUpdate(id, data, { new: true });
};

// Delete Order
const deleteOrderIntoDb = async (id: string) => {
  return await OrdersModel.findByIdAndDelete(id);
};

export const orderServices = {
  createOrderIntoDb,
  createRevenueIntoDb,
  getOrderIntoDb,
  getSingleOrderIntoDb,
  updateOrderIntoDb,
  deleteOrderIntoDb,
};
