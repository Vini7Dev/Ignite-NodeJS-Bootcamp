import { Router } from 'express';
import categoriesRoutes from './categories.routes';
import specificationsRoutes from './specifications.routes';

const mainRoutes = Router();

mainRoutes.use('/categories', categoriesRoutes);
mainRoutes.use('/specifications', specificationsRoutes);

export default mainRoutes;
