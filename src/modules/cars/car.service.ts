import { Cars } from './car.interface';
import { CarsModel } from './car.model';

const createCarIntoDB = async (carData: Cars) => {
  const postCar = new CarsModel(carData);
  return await postCar.save();
};

export const carServices = { createCarIntoDB };
