import CategoriesRepository from '../../repositories/implementations/CategoriesRepository';
import ListCategoriesUseCase from './ListCategoriesUseCase';
import ListCategoryController from './ListCategoriesController';

const categoriesRepository = null;

const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);

const listCategoryController = new ListCategoryController(
    listCategoriesUseCase,
);

export default listCategoryController;
