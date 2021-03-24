import { container } from 'tsyringe';
import CategoriesRepository from '../../models/cars/repositories/implementations/CategoriesRepository';
import ICategoriesRepository from '../../models/cars/repositories/ICategoriesRepository';
import ISpecificationsRepository from '../../models/cars/repositories/ISpecificationsRepository';
import SpecificationsRepository from '../../models/cars/repositories/implementations/SpecificationsRepository';

container.registerSingleton<ICategoriesRepository>(
    'CategoriesRepository',
    CategoriesRepository,
);

container.registerSingleton<ISpecificationsRepository>(
    'SpecificationsRepository',
    SpecificationsRepository,
);
