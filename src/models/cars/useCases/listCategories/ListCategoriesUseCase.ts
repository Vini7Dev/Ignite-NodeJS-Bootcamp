import Category from '../../model/Category';
import ICategoriesRepository from '../../repositories/implementations/ICategoriesRepository';

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
