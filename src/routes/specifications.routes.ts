import { Router } from 'express';
import CreateSpecificationController from '../models/cars/useCases/createSpecification/CreateSpecificationController';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post('/', createSpecificationController.handle);

export default specificationsRoutes;
