import CategoriesRepository from '../../repositories/CategoriesRepository';
import ListCategoriesUseCase from './ListCategoriesUseCase';
import ListCategoryController from './ListCategoriesController';

const categoriesRepository = new CategoriesRepository();

const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);

const listCategoryController = new ListCategoryController(
    listCategoriesUseCase,
);

export default listCategoryController;
