import { Cars } from './car.interface';
import { CarsModel } from './car.model';

// Create Cars
const createCarIntoDB = async (carData: Cars) => {
  const postCar = new CarsModel(carData);
  return await postCar.save();
};

// Get All Cars
const getCarIntoDb = async () => {
  const result = await CarsModel.find();
  return result;
};

// Get Cars By ID
const getSingleCarIntoDb = async (id: string) => {
  const result = await CarsModel.findOne({ _id: id });
  return result;
};

// Update Car
const updateCarIntoDb = async (id: string, data: Partial<Cars>) => {
  return await CarsModel.findByIdAndUpdate(id, data, { new: true });
};

// Delete Car
const deleteCarIntoDb = async (id: string) => {
  const result = await CarsModel.findByIdAndDelete(id);
  return result;
};

export const carServices = {
  createCarIntoDB,
  getCarIntoDb,
  getSingleCarIntoDb,
  deleteCarIntoDb,
  updateCarIntoDb,
};
