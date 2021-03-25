import { Router } from 'express';
import categoriesRoutes from './categories.routes';
import specificationsRoutes from './specifications.routes';
import usersRoutes from './users.routes';
import authenticateRoutes from './authenticate.routes';

const mainRoutes = Router();

mainRoutes.use('/categories', categoriesRoutes);
mainRoutes.use('/specifications', specificationsRoutes);
mainRoutes.use('/users', usersRoutes);
mainRoutes.use('/sessions', authenticateRoutes);

export default mainRoutes;
