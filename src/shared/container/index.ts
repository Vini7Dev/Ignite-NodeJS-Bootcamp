import { container } from 'tsyringe';
import CategoriesRepository from '../../models/cars/repositories/implementations/CategoriesRepository';
import ICategoriesRepository from '../../models/cars/repositories/ICategoriesRepository';

container.registerSingleton<ICategoriesRepository>(
    'CategoriesRepository',
    CategoriesRepository,
);
