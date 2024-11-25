import { Request, Response } from 'express';
import { orderServices } from './order.service';

// Create Order
const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderData = req.body.orders;
    const result = await orderServices.createOrderIntoDb(orderData);

    res.status(200).json({
      message: 'Order created successfully',
      success: true,
      data: result,
    });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      message: error.message || 'Order post is wrong',
    });
  }
};

// Revenue
const createRevenue = async (req: Request, res: Response): Promise<void> => {
  try {
    const totalRevenue = await orderServices.createRevenueIntoDb();
    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: {
        totalRevenue,
      },
    });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      message: error.message || 'Revenue calculating error',
    });
  }
};

export const orderController = { createOrder, createRevenue };
