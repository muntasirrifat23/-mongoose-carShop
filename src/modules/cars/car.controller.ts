/* eslint-disable prettier/prettier */
import { Request, Response } from 'express';
import { carServices } from './car.service';
import validateCar from './car.zodvalidation';
import { Cars } from './car.interface';

// Create car
const createCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const carData = req.body;
    const zodResult = validateCar.safeParse(carData);

    if (!zodResult.success) {
      const errors = zodResult.error.errors.reduce(
        (acc, error) => {
          acc[error.path[0] as string] = {
            message: error.message,
            name: 'ValidatorError',
            properties: {
              message: error.message,
              type: error.code,
            },
            kind: error.code,
            path: error.path[0],
            value: carData[error.path[0] as keyof typeof carData],
          };
          return acc;
        },
        {} as Record<string, unknown>,
      );

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

    const result = await carServices.createCarIntoDB(zodResult.data as Cars);

    res.status(201).json({
      message: 'Car created successfully',
      success: true,
      data: result,
    });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      message:
        error.message || 'An unexpected error occurred while creating the car.',
    });
  }
};

// Get Car
const getCar = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;

    const result = await carServices.getCarIntoDb(searchTerm as string);

    res.status(200).json({
      message: 'Cars retrieved successfully',
      success: true,
      data: result,
    });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to retrieve cars',
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
const updateCar = async (req: Request, res: Response) => {
  try {
    const carID = req.params.carID;
    const updatedData = req.body.cars;
    const result = await carServices.updateCarIntoDb(carID, updatedData);
    res.status(200).json({
      message: 'Car updated successfully',
      success: true,
      data: result,
    });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      message: error.message || 'Car not updated yet',
    });
  }
};

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

// Export
export const carController = {
  createCar,
  getCar,
  getSingleCarId,
  deleteCar,
  updateCar,
};
