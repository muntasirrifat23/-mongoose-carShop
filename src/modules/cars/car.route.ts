import express from 'express';
import { carController } from './car.controller';

const router = express.Router();

router.post('/cars', carController.createCar);
router.get('/cars', carController.getCar);
router.get('/cars/:carID', carController.getSingleCarId);
router.delete('/cars/:carID', carController.deleteCar);
router.put('/cars/:carID', carController.updateCar);

export const CarsRoutes = router;
