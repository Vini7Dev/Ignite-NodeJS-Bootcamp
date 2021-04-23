import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Rental from '@models/rentals/infra/typeorm/entities/Rental';
import IRentalsRepository from '@models/rentals/repositories/IRentalsRepository';
import AppError from '@shared/errors/AppError';

dayjs.extend(utc);

interface IRequest {
    car_id: string;
    user_id: string;
    expected_return_date: Date;
}

class CreateRentalUseCase {
    constructor(private rentalsRepository: IRentalsRepository) {}

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
            throw new AppError('there1s a rental in progress for user.');
        }

        const expectedReturnDateformat = dayjs(expected_return_date)
            .utc()
            .local()
            .format();

        const dateNow = dayjs().utc().local().format();

        const compare = dayjs(expectedReturnDateformat).diff(dateNow, 'hours');

        const minimumHours = 24;

        if (compare < minimumHours) {
            throw new AppError('invalid return time.');
        }

        const createdRental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date,
        });

        return createdRental;
    }
}

export default CreateRentalUseCase;
