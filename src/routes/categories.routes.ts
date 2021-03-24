import { Router } from 'express';
import multer from 'multer';
import createCategoryController from '../models/cars/useCases/createCategory';
import listCategoriesController from '../models/cars/useCases/listCategories';
import importCategoryController from '../models/cars/useCases/importCategory';

const categoriesRoutes = Router();

const upload = multer({
    dest: './tmp',
});

categoriesRoutes.get('/', (request, response) => {
    return listCategoriesController.hanlde(request, response);
});

categoriesRoutes.post('/', (req, res) => {
    return createCategoryController().handle(req, res);
});

categoriesRoutes.post('/import', upload.single('file'), (request, response) => {
    return importCategoryController.handle(request, response);
});

export default categoriesRoutes;
