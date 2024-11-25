import express from 'express';
import { carController } from './car.controller';

const router = express.Router();

router.post('/cars', carController.createCar);

router.get('/cars', carController.getCar);

export const CarsRoutes = router;
