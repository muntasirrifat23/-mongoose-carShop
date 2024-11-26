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
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderServices = void 0;
// import mongoose from 'mongoose';
const car_model_1 = require("../cars/car.model");
const order_model_1 = require("./order.model");
// Create Order
const createOrderIntoDb = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, car, quantity, totalPrice } = orderData;
    const carData = yield car_model_1.CarsModel.findOne({ _id: car });
    if (!carData) {
        throw new Error('Car not found in the database');
    }
    if (carData.quantity < quantity) {
        return { success: false, message: 'Not enough stock available' };
    }
    const order = new order_model_1.OrdersModel({ email, car, quantity, totalPrice });
    // Reducing stock quantity for cars after orders
    carData.quantity -= quantity;
    // If stock is zero then inStock is false
    if (carData.quantity === 0) {
        carData.inStock = false;
    }
    yield carData.save();
    const savedOrder = yield order.save();
    const findCarOrder = yield order_model_1.OrdersModel.findById(savedOrder._id).populate('car');
    return { success: true, data: findCarOrder };
});
// Revenue
const createRevenueIntoDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const revenueData = yield order_model_1.OrdersModel.aggregate([
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: { $multiply: ['$totalPrice', '$quantity'] } },
            },
        },
    ]);
    return revenueData.length > 0 ? revenueData[0].totalRevenue : 0;
});
// Get Orders
const getOrderIntoDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.OrdersModel.find();
    return result;
});
// Get Orders By ID
const getSingleOrderIntoDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.OrdersModel.findOne({ _id: id });
    return result;
});
// Update Order
const updateOrderIntoDb = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield order_model_1.OrdersModel.findByIdAndUpdate(id, data, { new: true });
});
// Delete Order
const deleteOrderIntoDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield order_model_1.OrdersModel.findByIdAndDelete(id);
});
exports.orderServices = {
    createOrderIntoDb,
    createRevenueIntoDb,
    getOrderIntoDb,
    getSingleOrderIntoDb,
    updateOrderIntoDb,
    deleteOrderIntoDb,
};
