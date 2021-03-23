import Category from '../model/Category';
import ICreateCategoryDTO from '../dtos/ICreateCategoryDTO';
import ICategoriesRepository from './implementations/ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
    private static INSTANCE: CategoriesRepository;

    private categories: Category[];

    private constructor() {
        this.categories = [];
    }

    public static getInstance(): CategoriesRepository {
        if (!CategoriesRepository.INSTANCE) {
            CategoriesRepository.INSTANCE = new CategoriesRepository();
        }

        return CategoriesRepository.INSTANCE;
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