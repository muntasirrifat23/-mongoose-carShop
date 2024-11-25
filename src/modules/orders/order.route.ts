import express from 'express';
import { orderController } from './order.controller';

const router = express.Router();

router.post('/orders', orderController.createOrder);
router.get('/orders/revenue', orderController.createRevenue);
router.get('/orders', orderController.getOrder);
router.get('/orders/:orderId', orderController.getSingleOrderId);
router.delete('/orders/:orderId', orderController.deleteOrder);
router.put('/orders/:orderId', orderController.updateOrder);
export const orderRoute = router;
