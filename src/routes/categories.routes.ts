import { Router } from 'express';
import createCategoryController from '../models/cars/useCases/createCategory';
import listCategoriesController from '../models/cars/useCases/listCategories';

const categoriesRoutes = Router();

categoriesRoutes.get('/', (request, response) => {
    return listCategoriesController.hanlde(request, response);
});

categoriesRoutes.post('/', (req, res) => {
    return createCategoryController.handle(req, res);
});

export default categoriesRoutes;
