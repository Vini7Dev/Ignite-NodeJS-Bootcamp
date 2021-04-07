import CreateCarController from '@models/cars/useCases/createCar/CreateCarController';
import ListAvailableCarsController from '@models/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { Router } from 'express';
import ensureAdmin from '../middlewares/ensureAdmin';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();

carsRoutes.post(
    '/',
    ensureAuthenticated,
    ensureAdmin,
    createCarController.handle,
);

carsRoutes.get('/available', listAvailableCarsController.handle);

export default carsRoutes;
