import Category from '../models/Category';
import ICreateCategoryDTO from '../dtos/ICreateCategoryDTO';

interface ICategoriesRepository {
    findByName(name: string): Category;
    list(): Category[];
    create(data: ICreateCategoryDTO): Category;
}

export default ICategoriesRepository;
