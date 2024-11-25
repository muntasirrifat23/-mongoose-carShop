import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { CarsRoutes } from './modules/cars/car.route';

const app: Application = express();
app.use(express.json());
app.use(cors());

app.use('/api/', CarsRoutes);

app.get('/', (req: Request, res: Response) => {
  const a = 10;

  res.send(a);
});

export default app;
