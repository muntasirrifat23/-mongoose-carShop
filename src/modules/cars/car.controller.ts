import { Request, Response } from 'express';
import { carServices } from './car.service';

const createCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const carData = req.body.cars;
    // const { Cars: carData } = req.body;
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
      // error: error,
    });
  }
};

export const carController = { createCar };
