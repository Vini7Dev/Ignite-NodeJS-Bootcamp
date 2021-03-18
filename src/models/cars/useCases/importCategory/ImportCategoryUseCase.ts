import fs from 'fs';
import csvParse from 'csv-parse';
import ICategoriesRepository from '../../repositories/implementations/ICategoriesRepository';
import Category from '../../model/Category';

interface IImportCategory {
    name: string;
    description: string;
}

class ImportCategoryUseCase {
    private categoriesRepository: ICategoriesRepository;

    constructor(categoriesRepository: ICategoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }

    private async loadCategories(
        file: Express.Multer.File,
    ): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path);

            const parseFile = csvParse();

            stream.pipe(parseFile);

            const importedCategories: IImportCategory[] = [];

            parseFile
                .on('data', async line => {
                    const [name, description] = line;

                    importedCategories.push({ name, description });
                })
                .on('end', () => {
                    resolve(importedCategories);
                })
                .on('error', error => {
                    reject(error);
                });
        });
    }

    public async execute(file: Express.Multer.File): Promise<Category[]> {
        const createdCategories: Category[] = [];

        const categories = await this.loadCategories(file);

        categories.map(async ({ name, description }) => {
            const categoryAlreadyExists = this.categoriesRepository.findByName(
                name,
            );

            if (!categoryAlreadyExists) {
                const category = this.categoriesRepository.create({
                    name,
                    description,
                });

                createdCategories.push(category);
            }
        });

        return createdCategories;
    }
}

export default ImportCategoryUseCase;
