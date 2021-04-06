import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ICreateSpecificationsDTO from '@models/cars/dtos/ICreateSpecificationsDTO';
import Specification from '../../infra/typeorm/entities/Specification';
import ISpecificationsRepository from '../../repositories/ISpecificationsRepository';

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject('SpecificationsRepository')
        private specificationsRepository: ISpecificationsRepository,
    ) {}

    public async execute({
        name,
        description,
    }: ICreateSpecificationsDTO): Promise<Specification> {
        const specificationAlreadyExists = await this.specificationsRepository.findByName(
            name,
        );

        if (specificationAlreadyExists) {
            throw new AppError('Specification already exists.');
        }

        const specification = await this.specificationsRepository.create({
            name,
            description,
        });

        return specification;
    }
}

export default CreateSpecificationUseCase;
