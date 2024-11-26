import { Request, Response } from 'express';
import { carServices } from './car.service';
import validateCar from './car.zodvalidation';

// Create car
const createCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const carData = req.body.cars;
    const zodResult = validateCar.safeParse(carData);

    if (!zodResult.success) {
      const formatError = zodResult.error.errors.reduce(
        (acc, error) => {
          const path = error.path[0] as string;
          const errorDetails = {
            message: error.message,
            name: 'ValidatorError',
            properties: {
              message: error.message,
              type: error.code,
              min: 0,
              max: 0,
            },
            kind: error.code,
            path,
          };

          if ('minimum' in error) {
            errorDetails.properties.min = error.minimum as number;
          }
          if ('maximum' in error) {
            errorDetails.properties.max = error.maximum as number;
          }
          acc[path] = errorDetails;
          return acc;
        },
        {} as Record<string, unknown>,
      );

      res.status(400).json({
        message: 'Validation failed',
        success: false,
        error: {
          name: 'ValidationError',
          errors: formatError,
        },
        stack: new Error().stack,
      });
      return;
    }

    const result = await carServices.createCarIntoDB(zodResult.data);

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
