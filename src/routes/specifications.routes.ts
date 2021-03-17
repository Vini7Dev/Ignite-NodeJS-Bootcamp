import { Router } from 'express';
import SpecificationsRepository from '../models/cars/repositories/SpecificationsRepository';
import CreateSpecificationService from '../models/cars/services/CreateSpecificationService';

const specificationsRoutes = Router();

const specificationsRepository = new SpecificationsRepository();

specificationsRoutes.get('/', (request, response) => {
    const specifications = specificationsRepository.list();

    return response.json({ specifications });
});

specificationsRoutes.post('/', (request, response) => {
    const { name, description } = request.body;

    const createSpecificationService = new CreateSpecificationService(
        specificationsRepository,
    );

    try {
        const specification = createSpecificationService.execute({
            name,
            description,
        });

        return response.status(201).json({ specification });
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
});

export default specificationsRoutes;
