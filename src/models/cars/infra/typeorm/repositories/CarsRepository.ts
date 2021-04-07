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

    public async findAvailable(
        name?: string,
        category_id?: string,
        brand?: string,
    ): Promise<Car[]> {
        const carsQuery = this.repository
            .createQueryBuilder('c')
            .where('available = :available', { available: true });

        if (name) {
            carsQuery.andWhere('c.name = :name', { name });
        }

        if (brand) {
            carsQuery.andWhere('c.brand = :brand', { brand });
        }

        if (category_id) {
            carsQuery.andWhere('c.category_id = :category_id', { category_id });
        }

        const cars = await carsQuery.getMany();

        return cars;
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
