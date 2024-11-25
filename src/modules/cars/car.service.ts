import { Cars } from './car.interface';
import { CarsModel } from './car.model';

const createCarIntoDB = async (carData: Cars) => {
  const postCar = new CarsModel(carData);
  return await postCar.save();
};

// Get All Cars
const getCarIntoDb = async () => {
  const result = await CarsModel.find();
  return result;
};

export const carServices = {
  createCarIntoDB,
  getCarIntoDb,
};
