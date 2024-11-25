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

// Get Cr
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

export const carController = { createCar, getCar };
