import CreateCarController from '@models/cars/useCases/createCar/CreateCarController';
import CreateCarSpecificationController from '@models/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import ListAvailableCarsController from '@models/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { Router } from 'express';
import ensureAdmin from '../middlewares/ensureAdmin';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();

carsRoutes.post(
    '/',
    ensureAuthenticated,
    ensureAdmin,
    createCarController.handle,
);

carsRoutes.get('/available', listAvailableCarsController.handle);

carsRoutes.post(
    '/specifications/:id',
    ensureAuthenticated,
    ensureAdmin,
    createCarSpecificationController.handle,
);

export default carsRoutes;
