import Category from '../../entities/Category';
import ICategoriesRepository from '../../repositories/implementations/ICategoriesRepository';

interface IRequest {
    name: string;
    description: string;
}

class CreateCategoryUseCase {
    private categoriesRepository: ICategoriesRepository;

    constructor(categoriesRepository: ICategoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }

    public async execute({ name, description }: IRequest): Promise<Category> {
        const categoryAlreadyExists = await this.categoriesRepository.findByName(
            name,
        );

        if (categoryAlreadyExists) {
            throw new Error('category already exists.');
        }

        const category = await this.categoriesRepository.create({
            name,
            description,
        });

        return category;
    }
}

export default CreateCategoryUseCase;
