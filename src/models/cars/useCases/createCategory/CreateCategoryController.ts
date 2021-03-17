import { Request, Response } from 'express';

import CreateCategoryUseCase from './CreateCategoryUseCase';

class CreateCategoryController {
    private createCategoryUseCase: CreateCategoryUseCase;

    constructor(createCategoryUseCase: CreateCategoryUseCase) {
        this.createCategoryUseCase = createCategoryUseCase;
    }

    public create(request: Request, response: Response): Response {
        const { name, description } = request.body;

        const category = this.createCategoryUseCase.execute({
            name,
            description,
        });

        return response.status(201).json({ category });
    }
}

export default CreateCategoryController;
