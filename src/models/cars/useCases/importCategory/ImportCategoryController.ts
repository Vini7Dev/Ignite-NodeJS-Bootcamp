import { Request, Response } from 'express';
import ImportCategoryUseCase from './ImportCategoryUseCase';

class ImportCategoryController {
    private importCategoryUseCase: ImportCategoryUseCase;

    constructor(importCategoryUseCase: ImportCategoryUseCase) {
        this.importCategoryUseCase = importCategoryUseCase;
    }

    public async handle(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { file } = request;

        const categories = await this.importCategoryUseCase.execute(file);

        return response.status(201).json(categories);
    }
}

export default ImportCategoryController;
