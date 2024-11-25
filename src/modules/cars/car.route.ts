import express from 'express';
import { carController } from './car.controller';

const router = express.Router();

router.post('/create-car', carController.createCar);

export const CarsRoutes = router;
