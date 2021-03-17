import { Router } from 'express';
import createCategoryController from '../models/cars/useCases/createCategory';

const categoriesRoutes = Router();

/*
categoriesRoutes.get('/', (request, response) => {
    const categories = categoriesRepository.list();

    return response.json({ categories });
});
*/

categoriesRoutes.post('/', (req, res) => {
    return createCategoryController.create(req, res);
});

export default categoriesRoutes;
