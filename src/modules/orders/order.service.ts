import { Orders } from './order.interface';
import { OrdersModel } from './order.model';

const createOrderIntoDb = async (orderData: Orders) => {
  const postOrder = new OrdersModel(orderData);
  return await postOrder.save();
};

export const orderServices = { createOrderIntoDb };
