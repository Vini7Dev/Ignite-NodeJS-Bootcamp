import { container } from 'tsyringe';
import CategoriesRepository from '@models/cars/infra/typeorm/repositories/CategoriesRepository';
import ICategoriesRepository from '@models/cars/repositories/ICategoriesRepository';
import ISpecificationsRepository from '@models/cars/repositories/ISpecificationsRepository';
import SpecificationsRepository from '@models/cars/infra/typeorm/repositories/SpecificationsRepository';
import IUsersRepository from '@models/accounts/repositories/IUsersRepository';
import UsersRepository from '@models/accounts/infra/typeorm/repositories/UsersRepository';
import ICarsRepository from '@models/cars/repositories/ICarsRepository';
import CarsRepository from '@models/cars/infra/typeorm/repositories/CarsRepository';
import ICarImagesRepository from '@models/cars/repositories/ICarImagesRepository';
import CarImagesRepository from '@models/cars/infra/typeorm/repositories/CarImagesRepository';

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

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);

container.registerSingleton<ICarImagesRepository>(
    'CarImagesRepository',
    CarImagesRepository,
);
