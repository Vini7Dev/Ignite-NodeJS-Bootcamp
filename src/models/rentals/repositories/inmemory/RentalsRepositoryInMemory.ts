import ICreateRentalDTO from '@models/rentals/dtos/ICreateRentalDTO';
import Rental from '@models/rentals/infra/typeorm/entities/Rental';
import IRentalsRepository from '../IRentalsRepository';

class RentalsRepositoryInMemory implements IRentalsRepository {
    private storage: Rental[];

    constructor() {
        this.storage = [];
    }

    public async findOpenRentalByCarId(car_id: string): Promise<Rental> {
        const rentalFinded = this.storage.find(
            rental => rental.car_id === car_id && !rental.end_date,
        );

        return rentalFinded;
    }

    public async findOpenRentalByUserId(user_id: string): Promise<Rental> {
        const findedRental = this.storage.find(
            rental => rental.user_id === user_id && !rental.end_date,
        );

        return findedRental;
    }

    public async create({
        car_id,
        user_id,
        expected_return_date,
    }: ICreateRentalDTO): Promise<Rental> {
        const rental = new Rental();

        Object.assign(rental, {
            car_id,
            user_id,
            expected_return_date,
            start_date: new Date(),
        });

        this.storage.push(rental);

        return rental;
    }
}

export default RentalsRepositoryInMemory;