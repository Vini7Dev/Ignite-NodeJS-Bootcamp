import Category from '../model/Category';
import ICreateCategoryDTO from '../dtos/ICreateCategoryDTO';
import ICategoriesRepository from './ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
    private categories: Category[];

    constructor() {
        this.categories = [];
    }

    public findByName(name: string): Category {
        const findedCategory = this.categories.find(
            category => category.name === name,
        );

        return findedCategory;
    }

    public list(): Category[] {
        return this.categories;
    }

    public create({ name, description }: ICreateCategoryDTO): Category {
        const category = new Category();

        Object.assign(category, {
            name,
            description,
            created_at: new Date(),
        });

        this.categories.push(category);

        return category;
    }
}

export default CategoriesRepository;
