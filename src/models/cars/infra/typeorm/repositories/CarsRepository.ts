import ICreateCarDTO from '@models/cars/dtos/ICreateCarDTO';
import ICarsRepository from '@models/cars/repositories/ICarsRepository';
import { getRepository, Repository } from 'typeorm';
import Car from '../entities/Car';

class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car);
    }

    public async findByLicensePlate(license_plate: string): Promise<Car> {
        const findedCar = await this.repository.findOne({
            where: { license_plate },
        });

        return findedCar;
    }

    public async create({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
    }: ICreateCarDTO): Promise<Car> {
        const createdCar = this.repository.create({
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
        });

        await this.repository.save(createdCar);

        return createdCar;
    }
}

export default CarsRepository;
