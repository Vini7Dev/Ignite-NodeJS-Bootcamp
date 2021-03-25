import { Router } from 'express';
import categoriesRoutes from './categories.routes';
import specificationsRoutes from './specifications.routes';
import usersRoutes from './users.routes';

const mainRoutes = Router();

mainRoutes.use('/categories', categoriesRoutes);
mainRoutes.use('/specifications', specificationsRoutes);
mainRoutes.use('/users', usersRoutes);

export default mainRoutes;
