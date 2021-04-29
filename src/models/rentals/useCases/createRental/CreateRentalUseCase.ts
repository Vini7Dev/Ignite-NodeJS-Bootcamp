import ICarsRepository from '@models/cars/repositories/ICarsRepository';
import Rental from '@models/rentals/infra/typeorm/entities/Rental';
import IRentalsRepository from '@models/rentals/repositories/IRentalsRepository';
import IDateProvider from '@shared/container/providers/DateProvider/IDateProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
    car_id: string;
    user_id: string;
    expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
    constructor(
        @inject('RentalsRepository')
        private rentalsRepository: IRentalsRepository,

        @inject('DateProvider')
        private dayProvider: IDateProvider,

        @inject('CarsRepository')
        private carsRepository: ICarsRepository,
    ) {}

    public async execute({
        car_id,
        user_id,
        expected_return_date,
    }: IRequest): Promise<Rental> {
        const carUnavailable = await this.rentalsRepository.findOpenRentalByCarId(
            car_id,
        );

        if (carUnavailable) {
            throw new AppError('this car is unavailable.');
        }

        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUserId(
            user_id,
        );

        if (rentalOpenToUser) {
            throw new AppError('there is a rental in progress for user.');
        }

        const dateNow = this.dayProvider.dateNow();

        const compareTime = this.dayProvider.compareInHours(
            dateNow,
            expected_return_date,
        );

        const minimumHours = 24;

        if (compareTime < minimumHours) {
            throw new AppError('invalid return time.');
        }

        const createdRental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date,
        });

        await this.carsRepository.updateAvailable(car_id, false);

        return createdRental;
    }
}

export default CreateRentalUseCase;
