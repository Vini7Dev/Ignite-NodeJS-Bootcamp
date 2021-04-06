import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ICreateCategoryDTO from '@models/cars/dtos/ICreateCategoryDTO';
import Category from '../../infra/typeorm/entities/Category';
import ICategoriesRepository from '../../repositories/ICategoriesRepository';

@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: ICategoriesRepository,
    ) {}

    public async execute({
        name,
        description,
    }: ICreateCategoryDTO): Promise<Category> {
        const categoryAlreadyExists = await this.categoriesRepository.findByName(
            name,
        );

        if (categoryAlreadyExists) {
            throw new AppError('category already exists.');
        }

        const category = await this.categoriesRepository.create({
            name,
            description,
        });

        return category;
    }
}

export default CreateCategoryUseCase;
