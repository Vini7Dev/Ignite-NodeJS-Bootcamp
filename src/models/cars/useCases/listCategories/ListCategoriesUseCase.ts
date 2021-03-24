import Category from '../../entities/Category';
import ICategoriesRepository from '../../repositories/ICategoriesRepository';

class ListCategoriesUseCase {
    private categoriesRepository: ICategoriesRepository;

    constructor(categoriesRepository: ICategoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }

    public execute(): Category[] {
        const categories = this.categoriesRepository.list();

        return categories;
    }
}

export default ListCategoriesUseCase;
