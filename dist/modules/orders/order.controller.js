"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const order_service_1 = require("./order.service");
const order_zodvalidation_1 = __importDefault(require("./order.zodvalidation"));
const zod_1 = require("zod");
// Create Order
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body.orders;
        const zodOrderData = order_zodvalidation_1.default.parse(orderData);
        const result = yield order_service_1.orderServices.createOrderIntoDb(zodOrderData);
        res.status(200).json({
            message: 'Order created successfully',
            success: true,
            data: result,
        });
    }
    catch (err) {
        if (err instanceof zod_1.z.ZodError) {
            const errors = err.errors.reduce((acc, curr) => {
                acc[curr.path.join('.')] = {
                    message: curr.message,
                    name: 'ValidatorError',
                    properties: {
                        message: curr.message,
                    },
                    kind: curr.code,
                    path: curr.path.join('.'),
                };
                return acc;
            }, {});
            res.status(400).json({
                message: 'Validation failed',
                success: false,
                error: {
                    name: 'ValidationError',
                    errors,
                },
                stack: err.stack,
            });
        }
        else {
            const error = err;
            res.status(500).json({
                success: false,
                message: error.message || 'Order post is wrong',
            });
        }
    }
});
// Revenue
const createRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalRevenue = yield order_service_1.orderServices.createRevenueIntoDb();
        res.status(200).json({
            message: 'Revenue calculated successfully',
            status: true,
            data: {
                totalRevenue,
            },
        });
    }
    catch (err) {
        const error = err;
        res.status(500).json({
            success: false,
            message: error.message || 'Revenue calculating error',
        });
    }
});
// Get Order
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_service_1.orderServices.getOrderIntoDb();
        res.status(200).json({
            message: 'Order retrieved successfully',
            success: true,
            data: result,
        });
    }
    catch (err) {
        const error = err;
        res.status(500).json({
            success: false,
            message: error.message || 'Order retrieved is wrong',
        });
    }
});
// Get Order By ID
const getSingleOrderId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = req.params.orderId;
        const result = yield order_service_1.orderServices.getSingleOrderIntoDb(orderId);
        res.status(200).json({
            message: 'Order id retrieved successfully',
            success: true,
            data: result,
        });
    }
    catch (err) {
        const error = err;
        res.status(500).json({
            success: false,
            message: error.message || 'Order id retrieved is wrong',
        });
    }
});
// Update Order
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = req.params.orderId;
        const updatedData = req.body;
        const result = yield order_service_1.orderServices.updateOrderIntoDb(orderId, updatedData);
        res.status(200).json({
            message: 'Order updated successfully',
            success: true,
            data: result,
        });
    }
    catch (err) {
        const error = err;
        res.status(500).json({
            success: false,
            message: error.message || 'Order not updated yet',
        });
    }
});
// Delete Order
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = req.params.orderId;
        yield order_service_1.orderServices.deleteOrderIntoDb(orderId);
        res.status(200).json({
            message: 'Order deleted successfully',
            success: true,
            data: {},
        });
    }
    catch (err) {
        const error = err;
        res.status(500).json({
            success: false,
            message: error.message || 'Order not deleted yet',
        });
    }
});
exports.orderController = {
    createOrder,
    createRevenue,
    getOrder,
    getSingleOrderId,
    updateOrder,
    deleteOrder,
};
