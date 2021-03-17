import { Request, Response } from 'express';
import CreateSpecificationService from './CreateSpecificationUseCase';

class CreateSpecificationController {
    private createSpecificationService: CreateSpecificationService;

    constructor(createSpecificationService: CreateSpecificationService) {
        this.createSpecificationService = createSpecificationService;
    }

    public handle(request: Request, response: Response): Response {
        const { name, description } = request.body;

        const specification = this.createSpecificationService.execute({
            name,
            description,
        });

        return response.status(201).json({ specification });
    }
}

export default CreateSpecificationController;
