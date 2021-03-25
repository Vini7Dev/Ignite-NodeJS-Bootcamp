import { Router } from 'express';
import AuthenticateUserController from '../models/accounts/usecases/authenticateUser/AuthenticateUserController';

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authenticateRoutes.post('/', authenticateUserController.handle);

export default authenticateRoutes;
