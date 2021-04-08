import ICarsRepository from '@models/cars/repositories/ICarsRepository';
import CarsRepositoryInMemory from '@models/cars/repositories/in-memory/CarsRepositoryInMemory';
import ListAvailableCarsUseCase from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepository: ICarsRepository;

describe('ListCars', () => {
    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepository);
    });

    it('shoud be able to list all available cars', async () => {
        const car1 = await carsRepository.create({
            name: 'Car 1',
            description: 'Example Description',
            daily_rate: 100,
            license_plate: 'ABC-1234',
            fine_amount: 60,
            brand: 'Example Brand',
            category_id: 'Example-Category-ID',
        });

        const car2 = await carsRepository.create({
            name: 'Car 2',
            description: 'Example Description',
            daily_rate: 110,
            license_plate: 'ABC-1234',
            fine_amount: 80,
            brand: 'Example Brand',
            category_id: 'Example-Category-ID',
        });

        const cars = await listAvailableCarsUseCase.execute({});

        expect(cars).toEqual([car1, car2]);
    });

    it('shoud be able to list all available cars by name', async () => {
        const car1 = await carsRepository.create({
            name: 'Car 1',
            description: 'Example Description',
            daily_rate: 100,
            license_plate: 'ABC-1234',
            fine_amount: 60,
            brand: 'Example Brand',
            category_id: 'Example-Category-ID',
        });

        const cars = await listAvailableCarsUseCase.execute({
            name: 'Car 1',
        });

        expect(cars).toEqual([car1]);
    });

    it('shoud be able to list all available cars by category id', async () => {
        const car1 = await carsRepository.create({
            name: 'Car 1',
            description: 'Example Description',
            daily_rate: 100,
            license_plate: 'ABC-1234',
            fine_amount: 60,
            brand: 'Example Brand',
            category_id: 'Example-Category-ID-1',
        });

        const cars = await listAvailableCarsUseCase.execute({
            category_id: 'Example-Category-ID-1',
        });

        expect(cars).toEqual([car1]);
    });

    it('shoud be able to list all available cars by brand', async () => {
        const car1 = await carsRepository.create({
            name: 'Car 1',
            description: 'Example Description',
            daily_rate: 100,
            license_plate: 'ABC-1234',
            fine_amount: 60,
            brand: 'Example Brand 1',
            category_id: 'Example-Category-ID-1',
        });

        const cars = await listAvailableCarsUseCase.execute({
            brand: 'Example Brand 1',
        });

        expect(cars).toEqual([car1]);
    });
});
