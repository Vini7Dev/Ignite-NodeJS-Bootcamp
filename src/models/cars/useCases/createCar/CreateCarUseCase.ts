import ICreateCarDTO from '@models/cars/dtos/ICreateCarDTO';
import Car from '@models/cars/infra/typeorm/entities/Car';
import ICarsRepository from '@models/cars/repositories/ICarsRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateCarUseCase {
    constructor(
        @inject('CarsRepository')
        private carsRepository: ICarsRepository,
    ) {}

    public async execute({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
    }: ICreateCarDTO): Promise<Car> {
        const carAlreadyExists = await this.carsRepository.findByLicensePlate(
            license_plate,
        );

        if (carAlreadyExists) {
            throw new AppError('car already exits.');
        }

        const car = await this.carsRepository.create({
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
        });

        return car;
    }
}

export default CreateCarUseCase;
