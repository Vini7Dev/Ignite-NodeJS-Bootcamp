import CreateRentalController from '@models/rentals/useCases/createRental/CreateRentalController';
import DevolutionRentalController from '@models/rentals/useCases/devolutionRental/DevolutionRentalController';
import ListRentalsByUserController from '@models/rentals/useCases/listRentalsByUser/ListRentalsByUserController';
import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalsRoutes.post('/', ensureAuthenticated, createRentalController.handle);

rentalsRoutes.post(
    '/devolution/:id',
    ensureAuthenticated,
    devolutionRentalController.handle,
);

rentalsRoutes.get(
    '/user',
    ensureAuthenticated,
    listRentalsByUserController.handle,
);

export default rentalsRoutes;
