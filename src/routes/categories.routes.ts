import { Router } from 'express';
import CategoriesRepository from '../models/cars/repositories/CategoriesRepository';
import CreateCategoryService from '../models/cars/services/CreateCategoryService';

const categoriesRoutes = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRoutes.get('/', (request, response) => {
    const categories = categoriesRepository.list();

    return response.json({ categories });
});

categoriesRoutes.post('/', (request, response) => {
    const { name, description } = request.body;

    const createCategoryService = new CreateCategoryService(
        categoriesRepository,
    );

    try {
        const category = createCategoryService.execute({ name, description });

        return response.status(201).json({ category });
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
});

export default categoriesRoutes;
