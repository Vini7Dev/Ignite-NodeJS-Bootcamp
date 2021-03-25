import { container } from 'tsyringe';
import CategoriesRepository from '../../models/cars/repositories/implementations/CategoriesRepository';
import ICategoriesRepository from '../../models/cars/repositories/ICategoriesRepository';
import ISpecificationsRepository from '../../models/cars/repositories/ISpecificationsRepository';
import SpecificationsRepository from '../../models/cars/repositories/implementations/SpecificationsRepository';
import IUsersRepository from '../../models/accounts/repositories/IUsersRepository';
import UsersRepository from '../../models/accounts/repositories/implementations/UsersRepository';

container.registerSingleton<ICategoriesRepository>(
    'CategoriesRepository',
    CategoriesRepository,
);

container.registerSingleton<ISpecificationsRepository>(
    'SpecificationsRepository',
    SpecificationsRepository,
);

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);
