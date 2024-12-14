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
exports.carServices = void 0;
const car_model_1 = require("./car.model");
// Create Cars
const createCarIntoDB = (carData) => __awaiter(void 0, void 0, void 0, function* () {
    // const postCar = new CarsModel(carData);
    // return await postCar.save();
    return yield car_model_1.CarsModel.create(carData);
});
const getCarIntoDb = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {};
    if (searchTerm) {
        filter.$or = [
            { brand: { $regex: searchTerm, $options: 'i' } },
            { model: { $regex: searchTerm, $options: 'i' } },
            { category: { $regex: searchTerm, $options: 'i' } },
        ];
    }
    const result = yield car_model_1.CarsModel.find(filter);
    return result;
});
// Get Cars By ID
const getSingleCarIntoDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.CarsModel.findOne({ _id: id });
    return result;
});
// Update Car
const updateCarIntoDb = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield car_model_1.CarsModel.findByIdAndUpdate(id, data, { new: true });
});
// Delete Car
const deleteCarIntoDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.CarsModel.findByIdAndDelete(id);
    return result;
});
exports.carServices = {
    createCarIntoDB,
    getCarIntoDb,
    getSingleCarIntoDb,
    deleteCarIntoDb,
    updateCarIntoDb,
};
