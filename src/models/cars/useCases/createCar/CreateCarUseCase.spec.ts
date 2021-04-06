import ICarsRepository from '@models/cars/repositories/ICarsRepository';
import CarsRepositoryInMemory from '@models/cars/repositories/in-memory/CarsRepositoryInMemory';
import AppError from '@shared/errors/AppError';
import CreateCarUseCase from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepository: ICarsRepository;

describe('CreateCar', () => {
    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepository);
    });

    it('shoud be able to create a new car', async () => {
        const createdCar = await createCarUseCase.execute({
            name: 'Example Name',
            description: 'Example Description',
            daily_rate: 100,
            license_plate: '12E4',
            fine_amount: 60,
            brand: 'Example Brand',
            category_id: 'Example-Category-ID',
        });

        expect(createdCar).toHaveProperty('id');
    });

    it('shoud not be able to create a new car with same license plate', async () => {
        await createCarUseCase.execute({
            name: 'Car 1',
            description: 'Example Description',
            daily_rate: 100,
            license_plate: 'same-plate',
            fine_amount: 60,
            brand: 'Example Brand',
            category_id: 'Example-Category-ID',
        });

        await expect(
            createCarUseCase.execute({
                name: 'Car 2',
                description: 'Example Description',
                daily_rate: 100,
                license_plate: 'same-plate',
                fine_amount: 60,
                brand: 'Example Brand',
                category_id: 'Example-Category-ID',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('shoud be able to create a new car with available true by default', async () => {
        const createdCar = await createCarUseCase.execute({
            name: 'Example Name',
            description: 'Example Description',
            daily_rate: 100,
            license_plate: '12E4',
            fine_amount: 60,
            brand: 'Example Brand',
            category_id: 'Example-Category-ID',
        });

        expect(createdCar.available).toBe(true);
    });
});
