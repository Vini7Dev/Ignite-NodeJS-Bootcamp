import { Router } from 'express';
import multer from 'multer';
import CreateCarController from '@models/cars/useCases/createCar/CreateCarController';
import CreateCarSpecificationController from '@models/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import ListAvailableCarsController from '@models/cars/useCases/listAvailableCars/ListAvailableCarsController';
import UploadCarImagesController from '@models/cars/useCases/uploadCarImages/UploadCarImagesController';
import uploadConfig from '@config/updload';
import ensureAdmin from '../middlewares/ensureAdmin';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const uploadCarImage = multer(uploadConfig);

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
    uploadCarImage.array('images'),
    createCarSpecificationController.handle,
);

carsRoutes.post(
    '/images/:id',
    ensureAuthenticated,
    ensureAdmin,
    uploadCarImagesController.handle,
);

export default carsRoutes;
