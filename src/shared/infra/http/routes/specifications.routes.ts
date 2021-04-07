import { Router } from 'express';
import CreateSpecificationController from '@models/cars/useCases/createSpecification/CreateSpecificationController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ensureAdmin from '../middlewares/ensureAdmin';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post(
    '/',
    ensureAuthenticated,
    ensureAdmin,
    createSpecificationController.handle,
);

export default specificationsRoutes;
