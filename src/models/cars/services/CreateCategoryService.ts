import Category from '../model/Category';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

interface IRequest {
    name: string;
    description: string;
}

class CreateCategoryService {
    private categoriesRepository: ICategoriesRepository;

    constructor(categoriesRepository: ICategoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }

    public execute({ name, description }: IRequest): Category {
        const categoryAlreadyExists = this.categoriesRepository.findByName(
            name,
        );

        if (categoryAlreadyExists) {
            throw new Error('category already exists.');
        }

        const category = this.categoriesRepository.create({
            name,
            description,
        });

        return category;
    }
}

export default CreateCategoryService;
