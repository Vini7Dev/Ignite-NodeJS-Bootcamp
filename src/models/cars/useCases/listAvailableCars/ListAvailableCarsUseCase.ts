import Car from '@models/cars/infra/typeorm/entities/Car';
import ICarsRepository from '@models/cars/repositories/ICarsRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
    name?: string;
    category_id?: string;
    brand?: string;
}

@injectable()
class ListCarsUseCase {
    constructor(
        @inject('CarsRepository')
        private carsRepository: ICarsRepository,
    ) {}

    public async execute({
        name,
        category_id,
        brand,
    }: IRequest): Promise<Car[]> {
        const cars = await this.carsRepository.findAvailable(
            name,
            category_id,
            brand,
        );

        return cars;
    }
}

export default ListCarsUseCase;
