import { Router } from 'express';
import AuthenticateUserController from '@models/accounts/usecases/authenticateUser/AuthenticateUserController';
import RefreshTokenController from '@models/accounts/usecases/refreshToken/RefreshTokenController';

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticateRoutes.post('/', authenticateUserController.handle);

authenticateRoutes.post('/refresh-token', refreshTokenController.handle);

export default authenticateRoutes;
