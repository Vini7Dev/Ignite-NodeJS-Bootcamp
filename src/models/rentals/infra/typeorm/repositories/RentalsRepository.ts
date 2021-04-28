import { getRepository, IsNull, Repository } from 'typeorm';
import ICreateRentalDTO from '@models/rentals/dtos/ICreateRentalDTO';
import IRentalsRepository from '@models/rentals/repositories/IRentalsRepository';
import Rental from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>;

    constructor() {
        this.repository = getRepository(Rental);
    }

    public async findById(id: string): Promise<Rental> {
        const rentalFinde = await this.repository.findOne(id);

        return rentalFinde;
    }

    public async findOpenRentalByCarId(car_id: string): Promise<Rental> {
        const rentalFinded = await this.repository.findOne({
            where: {
                car_id,
                end_date: IsNull(),
            },
        });

        return rentalFinded;
    }

    public async findOpenRentalByUserId(user_id: string): Promise<Rental> {
        const rentalFinded = await this.repository.findOne({
            where: {
                user_id,
                end_date: IsNull(),
            },
        });

        return rentalFinded;
    }

    public async create({
        id,
        end_date,
        total,
        car_id,
        user_id,
        expected_return_date,
    }: ICreateRentalDTO): Promise<Rental> {
        const createdRental = this.repository.create({
            id,
            end_date,
            total,
            car_id,
            user_id,
            expected_return_date,
        });

        await this.repository.save(createdRental);

        return createdRental;
    }
}

export default RentalsRepository;
