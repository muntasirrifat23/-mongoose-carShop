import express from 'express';
import { carController } from './car.controller';

const router = express.Router();

router.post('/cars', carController.createCar);

router.post('/', carController.createCar);

export const CarsRoutes = router;
