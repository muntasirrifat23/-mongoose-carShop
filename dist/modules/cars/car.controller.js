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
exports.carController = void 0;
const car_service_1 = require("./car.service");
const car_zodvalidation_1 = __importDefault(require("./car.zodvalidation"));
// Create car
const createCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carData = req.body;
        const zodResult = car_zodvalidation_1.default.safeParse(carData);
        if (!zodResult.success) {
            const errors = zodResult.error.errors.reduce((acc, error) => {
                acc[error.path[0]] = {
                    message: error.message,
                    name: 'ValidatorError',
                    properties: {
                        message: error.message,
                        type: error.code,
                    },
                    kind: error.code,
                    path: error.path[0],
                    value: carData[error.path[0]],
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
                stack: new Error('Validation Error').stack,
            });
            return;
        }
        const result = yield car_service_1.carServices.createCarIntoDB(zodResult.data);
        res.status(201).json({
            message: 'Car created successfully',
            success: true,
            data: result,
        });
    }
    catch (err) {
        const error = err;
        res.status(500).json({
            success: false,
            message: error.message || 'An unexpected error occurred while creating the car.',
        });
    }
});
// Get Car
const getCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.query;
        const result = yield car_service_1.carServices.getCarIntoDb(searchTerm);
        res.status(200).json({
            message: 'Cars retrieved successfully',
            success: true,
            data: result,
        });
    }
    catch (err) {
        const error = err;
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to retrieve cars',
        });
    }
});
// Get Car By ID
const getSingleCarId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carID = req.params.carID;
        const result = yield car_service_1.carServices.getSingleCarIntoDb(carID);
        res.status(200).json({
            message: 'Car id retrieved successfully',
            success: true,
            data: result,
        });
    }
    catch (err) {
        const error = err;
        res.status(500).json({
            success: false,
            message: error.message || 'Car id retrieved is wrong',
        });
    }
});
// Update Car
const updateCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carID = req.params.carID;
        const updatedData = req.body.cars;
        const result = yield car_service_1.carServices.updateCarIntoDb(carID, updatedData);
        res.status(200).json({
            message: 'Car updated successfully',
            success: true,
            data: result,
        });
    }
    catch (err) {
        const error = err;
        res.status(500).json({
            success: false,
            message: error.message || 'Car not updated yet',
        });
    }
});
// Delete Car
const deleteCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carID = req.params.carID;
        yield car_service_1.carServices.deleteCarIntoDb(carID);
        res.status(200).json({
            message: 'Car deleted successfully',
            success: true,
            data: {},
        });
    }
    catch (err) {
        const error = err;
        res.status(500).json({
            success: false,
            message: error.message || 'Car not deleted yet',
        });
    }
});
// Export
exports.carController = {
    createCar,
    getCar,
    getSingleCarId,
    deleteCar,
    updateCar,
};
