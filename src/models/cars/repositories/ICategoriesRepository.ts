import Category from '../infra/typeorm/entities/Category';
import ICreateCategoryDTO from '../dtos/ICreateCategoryDTO';

interface ICategoriesRepository {
    findByName(name: string): Promise<Category>;
    list(): Promise<Category[]>;
    create(data: ICreateCategoryDTO): Promise<Category>;
}

export default ICategoriesRepository;
