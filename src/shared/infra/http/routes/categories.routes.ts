import { Router } from 'express';
import multer from 'multer';
import CreateCategoryController from '@models/cars/useCases/createCategory/CreateCategoryController';
import ListCategoriesController from '@models/cars/useCases/listCategories/ListCategoriesController';
import ImportCategoryController from '@models/cars/useCases/importCategory/ImportCategoryController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ensureAdmin from '../middlewares/ensureAdmin';

const categoriesRoutes = Router();

const upload = multer({
    dest: './tmp',
});

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoryController = new ImportCategoryController();

categoriesRoutes.get('/', listCategoriesController.handle);

categoriesRoutes.post(
    '/',
    ensureAuthenticated,
    ensureAdmin,
    createCategoryController.handle,
);

categoriesRoutes.post(
    '/import',
    upload.single('file'),
    ensureAuthenticated,
    ensureAdmin,
    importCategoryController.handle,
);

export default categoriesRoutes;
