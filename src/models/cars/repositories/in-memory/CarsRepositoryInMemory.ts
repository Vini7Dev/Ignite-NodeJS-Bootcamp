import ICreateCarDTO from '@models/cars/dtos/ICreateCarDTO';
import Car from '@models/cars/infra/typeorm/entities/Car';
import ICarsRepository from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
    private cars: Car[];

    constructor() {
        this.cars = [];
    }

    public async findById(id: string): Promise<Car> {
        const findedCar = this.cars.find(car => car.id === id);

        return findedCar;
    }

    public async findByLicensePlate(license_plate: string): Promise<Car> {
        const findedCar = this.cars.find(
            car => car.license_plate === license_plate,
        );

        return findedCar;
    }

    public async findAvailable(
        name?: string,
        category_id?: string,
        brand?: string,
    ): Promise<Car[]> {
        const findedCars = this.cars.filter(car => {
            if (
                car.available ||
                (name && car.name === name) ||
                (category_id && car.category_id === category_id) ||
                (brand && car.brand === brand)
            ) {
                return true;
            }

            return false;
        });

        return findedCars;
    }

    public async create({
        id,
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
        specifications,
    }: ICreateCarDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, {
            id,
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
            specifications,
        });

        this.cars.push(car);

        return car;
    }

    public async updateAvailable(
        id: string,
        available: boolean,
    ): Promise<void> {
        const findedCarIndex = await this.cars.findIndex(car => car.id === id);

        if (findedCarIndex !== -1) {
            this.cars[findedCarIndex].available = available;
        }
    }
}

export default CarsRepositoryInMemory;
