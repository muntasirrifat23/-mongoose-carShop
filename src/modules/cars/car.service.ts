import { Cars } from './car.interface';
import { CarsModel } from './car.model';

// const createCarIntoDB = async (car: Cars) => {
//   const result = await CarsModel.create(car);
//   return result;
// };
const createCarIntoDB = async (carData: Cars) => {
  const newCar = new CarsModel(carData);
  return await newCar.save();
};

export const carServices = { createCarIntoDB };
