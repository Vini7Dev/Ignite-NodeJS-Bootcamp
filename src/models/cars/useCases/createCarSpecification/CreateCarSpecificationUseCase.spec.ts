import ICarsRepository from '@models/cars/repositories/ICarsRepository';
import CarsRepositoryInMemory from '@models/cars/repositories/in-memory/CarsRepositoryInMemory';
import SpecificationsRepositoryInMemory from '@models/cars/repositories/in-memory/SpecificationsRepositoryInMemory';
import ISpecificationsRepository from '@models/cars/repositories/ISpecificationsRepository';
import AppError from '@shared/errors/AppError';
import CreateCarSpecificationUseCase from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: ICarsRepository;
let specificationsRepositoryInMemory: ISpecificationsRepository;

describe('CreateCarSpecification', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory,
            specificationsRepositoryInMemory,
        );
    });

    it('should be able to create a new specification to the car', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'Example Name',
            description: 'Example Description',
            daily_rate: 100,
            license_plate: '12E4',
            fine_amount: 60,
            brand: 'Example Brand',
            category_id: 'Example-Category-ID',
        });

        const specification1 = await specificationsRepositoryInMemory.create({
            name: 'Example Name 1',
            description: 'Description Example',
        });

        const specification2 = await specificationsRepositoryInMemory.create({
            name: 'Example Name 2',
            description: 'Description Example',
        });

        const specificationCar = await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id: [specification1.id, specification2.id],
        });

        expect(specificationCar).toHaveProperty('id');
        expect(specificationCar.specifications).toHaveLength(2);
    });

    it('should not be able to create a new specification to a inexisting car', async () => {
        const specification = await specificationsRepositoryInMemory.create({
            name: 'Example Name',
            description: 'Description Example',
        });

        await expect(
            createCarSpecificationUseCase.execute({
                car_id: 'invalid-id',
                specifications_id: [specification.id],
            }),
        ).rejects.toEqual(new AppError('car does not extis.'));
    });
});
