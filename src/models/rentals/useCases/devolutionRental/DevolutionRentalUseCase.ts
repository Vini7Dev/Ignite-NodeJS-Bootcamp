import { inject, injectable } from 'tsyringe';
import ICarsRepository from '@models/cars/repositories/ICarsRepository';
import IRentalsRepository from '@models/rentals/repositories/IRentalsRepository';
import AppError from '@shared/errors/AppError';
import IDateProvider from '@shared/container/providers/DateProvider/IDateProvider';
import Rental from '@models/rentals/infra/typeorm/entities/Rental';

interface IRequest {
    id: string;
    user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
    constructor(
        @inject('RentalsRepository')
        private rentalsRepository: IRentalsRepository,
        @inject('CarsRepository')
        private carsRepository: ICarsRepository,
        @inject('DateProvider')
        private dateProvider: IDateProvider,
    ) {}

    public async execute({ id, user_id }: IRequest): Promise<Rental> {
        const minimum_daily = 1;
        const rental = await this.rentalsRepository.findById(id);

        if (!rental) {
            throw new AppError('rental not found.', 404);
        }

        const car = await this.carsRepository.findById(rental.car_id);

        if (!car) {
            throw new AppError('rental car not found.', 404);
        }

        const dateNow = this.dateProvider.dateNow();

        let dayly = this.dateProvider.compareInDays(rental.start_date, dateNow);

        if (dayly <= minimum_daily) {
            dayly = 1;
        }

        const delay = this.dateProvider.compareInDays(
            rental.expected_return_date,
            dateNow,
        );

        let total = 0;

        const calculate_fine = delay * car.fine_amount;

        total += calculate_fine;
        total += dayly * car.daily_rate;

        rental.end_date = this.dateProvider.dateNow();
        rental.total = total;

        await this.rentalsRepository.create(rental);
        await this.carsRepository.updateAvailable(car.id, true);

        return rental;
    }
}

export default DevolutionRentalUseCase;
