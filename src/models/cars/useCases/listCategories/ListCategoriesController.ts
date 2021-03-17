import { Request, Response } from 'express';
import ListCategoriesUseCase from './ListCategoriesUseCase';

class listCategoriesController {
    private listCategoriesUseCase: ListCategoriesUseCase;

    constructor(listCategoriesUseCase: ListCategoriesUseCase) {
        this.listCategoriesUseCase = listCategoriesUseCase;
    }

    public hanlde(request: Request, response: Response) {
        const categories = this.listCategoriesUseCase.execute();

        return response.json({ categories });
    }
}

export default listCategoriesController;
