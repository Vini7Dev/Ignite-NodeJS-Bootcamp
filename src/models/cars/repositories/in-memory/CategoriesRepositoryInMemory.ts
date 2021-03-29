import ICreateCategoryDTO from '../../dtos/ICreateCategoryDTO';
import Category from '../../infra/typeorm/entities/Category';
import ICategoriesRepository from '../ICategoriesRepository';

class CategoriesRepositoryInMemory implements ICategoriesRepository {
    private categories: Category[];

    constructor() {
        this.categories = [];
    }

    public async findByName(name: string): Promise<Category> {
        const category = this.categories.find(catg => catg.name === name);

        return category;
    }

    public async list(): Promise<Category[]> {
        return this.categories;
    }

    public async create({
        name,
        description,
    }: ICreateCategoryDTO): Promise<Category> {
        const category = new Category();

        Object.assign(category, { name, description });

        this.categories.push(category);

        return category;
    }
}

export default CategoriesRepositoryInMemory;
