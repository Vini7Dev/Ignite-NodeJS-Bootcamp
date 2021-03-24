import { Router } from 'express';
import multer from 'multer';
import CreateCategoryController from '../models/cars/useCases/createCategory/CreateCategoryController';
import listCategoriesController from '../models/cars/useCases/listCategories';
import importCategoryController from '../models/cars/useCases/importCategory';

const categoriesRoutes = Router();

const upload = multer({
    dest: './tmp',
});

const createCategoryController = new CreateCategoryController();

categoriesRoutes.get('/', (request, response) => {
    return listCategoriesController.hanlde(request, response);
});

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.post('/import', upload.single('file'), (request, response) => {
    return importCategoryController.handle(request, response);
});

export default categoriesRoutes;
