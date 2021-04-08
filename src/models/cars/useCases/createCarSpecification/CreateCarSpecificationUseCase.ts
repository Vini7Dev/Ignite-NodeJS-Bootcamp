import Car from '@models/cars/infra/typeorm/entities/Car';
import ICarsRepository from '@models/cars/repositories/ICarsRepository';
import ISpecificationsRepository from '@models/cars/repositories/ISpecificationsRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
    car_id: string;
    specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
    constructor(
        @inject('CarsRepository')
        private carsRepository: ICarsRepository,

        @inject('SpecificationsRepository')
        private specificationsRepository: ISpecificationsRepository,
    ) {}

    public async execute({
        car_id,
        specifications_id,
    }: IRequest): Promise<Car> {
        const findedCar = await this.carsRepository.findById(car_id);

        if (!findedCar) {
            throw new AppError('car does not extis.');
        }

        const specifications = await this.specificationsRepository.findManyById(
            specifications_id,
        );

        findedCar.specifications = specifications;

        const updatedCar = await this.carsRepository.create(findedCar);

        return updatedCar;
    }
}

export default CreateCarSpecificationUseCase;
