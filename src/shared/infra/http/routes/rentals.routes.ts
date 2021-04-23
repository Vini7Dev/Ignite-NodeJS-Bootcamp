import CreateRentalController from '@models/rentals/useCases/createRental/CreateRentalController';
import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();

rentalsRoutes.post('/', ensureAuthenticated, createRentalController.handle);

export default rentalsRoutes;
