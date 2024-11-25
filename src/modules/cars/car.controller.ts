import { Request, Response } from 'express';
import { carServices } from './car.service';

// Create car
const createCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const carData = req.body.cars;
    const result = await carServices.createCarIntoDB(carData);
    res.status(200).json({
      message: 'Car created successfully',
      success: true,
      data: result,
    });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      message: error.message || 'Car post is wrong',
    });
  }
};

// Get Car
const getCar = async (req: Request, res: Response) => {
  try {
    const result = await carServices.getCarIntoDb();
    res.status(200).json({
      message: 'Car retrieved successfully',
      success: true,
      data: result,
    });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      message: error.message || 'Car retrieved is wrong',
    });
  }
};

// Get Car By ID
const getSingleCarId = async (req: Request, res: Response) => {
  try {
    const carID = req.params.carID;
    const result = await carServices.getSingleCarIntoDb(carID);
    res.status(200).json({
      message: 'Car id retrieved successfully',
      success: true,
      data: result,
    });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      message: error.message || 'Car id retrieved is wrong',
    });
  }
};

// Update Car

// Delete Car
const deleteCar = async (req: Request, res: Response) => {
  try {
    const carID = req.params.carID;
    await carServices.deleteCarIntoDb(carID);
    res.status(200).json({
      message: 'Car deleted successfully',
      success: true,
      data: {},
    });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      message: error.message || 'Car not deleted yet',
    });
  }
};

//Export
export const carController = {
  createCar,
  getCar,
  getSingleCarId,
  deleteCar,
};
