import AppError from '@shared/errors/AppError';
import CategoriesRepositoryInMemory from '../../repositories/in-memory/CategoriesRepositoryInMemory';
import CreateCategoryUseCase from './CreateCategoryUseCase';

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;

describe('CreateCategory', () => {
    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(
            categoriesRepositoryInMemory,
        );
    });

    it('should be able to create a new category', async () => {
        const category = await createCategoryUseCase.execute({
            name: 'Category Name',
            description: 'Category Description',
        });

        expect(category).toHaveProperty('id');
    });

    it('should not be able to create category already exists', async () => {
        await createCategoryUseCase.execute({
            name: 'Category Already Exits',
            description: 'Category Description',
        });

        await expect(
            createCategoryUseCase.execute({
                name: 'Category Already Exits',
                description: 'Category Description',
            }),
        ).rejects.toEqual(new AppError('category already exists.'));
    });
});
