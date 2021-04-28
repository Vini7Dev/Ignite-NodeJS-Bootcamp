import CreateRentalController from '@models/rentals/useCases/createRental/CreateRentalController';
import DevolutionRentalController from '@models/rentals/useCases/devolutionRental/DevolutionRentalController';
import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

rentalsRoutes.post('/', ensureAuthenticated, createRentalController.handle);

rentalsRoutes.post(
    '/devolution/:id',
    ensureAuthenticated,
    devolutionRentalController.handle,
);

export default rentalsRoutes;
