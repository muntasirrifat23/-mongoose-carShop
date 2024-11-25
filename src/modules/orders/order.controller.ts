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

// Get Order
const getOrder = async (req: Request, res: Response) => {
  try {
    const result = await orderServices.getOrderIntoDb();
    res.status(200).json({
      message: 'Order retrieved successfully',
      success: true,
      data: result,
    });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      message: error.message || 'Order retrieved is wrong',
    });
  }
};

// Get Order By ID
const getSingleOrderId = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.orderId;
    const result = await orderServices.getSingleOrderIntoDb(orderId);
    res.status(200).json({
      message: 'Order id retrieved successfully',
      success: true,
      data: result,
    });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      message: error.message || 'Order id retrieved is wrong',
    });
  }
};

// Update Order
const updateOrder = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.orderId;
    const updatedData = req.body;
    const result = await orderServices.updateOrderIntoDb(orderId, updatedData);
    res.status(200).json({
      message: 'Order updated successfully',
      success: true,
      data: result,
    });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      message: error.message || 'Order not updated yet',
    });
  }
};

// Delete Order
const deleteOrder = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.orderId;
    await orderServices.deleteOrderIntoDb(orderId);
    res.status(200).json({
      message: 'Order deleted successfully',
      success: true,
      data: {},
    });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      message: error.message || 'Order not deleted yet',
    });
  }
};

export const orderController = {
  createOrder,
  createRevenue,
  getOrder,
  getSingleOrderId,
  updateOrder,
  deleteOrder,
};
